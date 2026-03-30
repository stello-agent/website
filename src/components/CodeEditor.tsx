// src/components/CodeEditor.tsx
import './CodeEditor.css'

interface Props {
  code: string
  filename?: string
  accentColor?: string
}

type TokenType = 'comment' | 'string' | 'number' | 'key' | 'keyword' | 'punct' | 'plain'

function tokenizeLine(line: string): Array<{ text: string; type: TokenType }> {
  const tokens: Array<{ text: string; type: TokenType }> = []
  let i = 0

  const addPlain = (ch: string) => {
    const last = tokens[tokens.length - 1]
    if (last?.type === 'plain') last.text += ch
    else tokens.push({ text: ch, type: 'plain' })
  }

  while (i < line.length) {
    // Comment
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ text: line.slice(i), type: 'comment' })
      break
    }

    // JSON key: "key":
    const keyM = line.slice(i).match(/^("(?:[^"\\]|\\.)*")(\s*:)/)
    if (keyM) {
      tokens.push({ text: keyM[1], type: 'key' })
      tokens.push({ text: keyM[2], type: 'punct' })
      i += keyM[0].length
      continue
    }

    // String value
    const strM = line.slice(i).match(/^"(?:[^"\\]|\\.)*"/)
    if (strM) {
      tokens.push({ text: strM[0], type: 'string' })
      i += strM[0].length
      continue
    }

    // Number (standalone)
    const numM = line.slice(i).match(/^\d+\.?\d*/)
    if (numM && (i === 0 || !/\w/.test(line[i - 1]))) {
      tokens.push({ text: numM[0], type: 'number' })
      i += numM[0].length
      continue
    }

    // Keywords
    const kwM = line.slice(i).match(
      /^(const|await|async|true|false|null|undefined|role|content|name|result|version)\b/
    )
    if (kwM) {
      tokens.push({ text: kwM[0], type: 'keyword' })
      i += kwM[0].length
      continue
    }

    // Punctuation
    if ('{}[]():,;→'.includes(line[i])) {
      tokens.push({ text: line[i], type: 'punct' })
      i++
      continue
    }

    addPlain(line[i])
    i++
  }

  return tokens
}

// CodeEditor 渲染 Monaco 风格的代码编辑器（纯 CSS，无外部库）
export function CodeEditor({ code, filename = 'snippet.ts', accentColor }: Props) {
  const lines = code.split('\n')

  return (
    <div
      className="monaco-wrap"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      {/* Title bar */}
      <div className="monaco-titlebar">
        <div className="monaco-dots">
          <span className="m-dot m-dot-red" />
          <span className="m-dot m-dot-yellow" />
          <span className="m-dot m-dot-green" />
        </div>
        <div className="monaco-tabs">
          <span className="monaco-tab monaco-tab--active">{filename}</span>
        </div>
      </div>

      {/* Code area */}
      <div className="monaco-body">
        <div className="monaco-gutter" aria-hidden="true">
          {lines.map((_, i) => (
            <span key={i} className="monaco-ln">{i + 1}</span>
          ))}
        </div>
        <pre className="monaco-code">
          <code>
            {lines.map((line, i) => {
              const tokens = tokenizeLine(line)
              const isLast = i === lines.length - 1
              return (
                <span key={i} className="monaco-line">
                  {tokens.map((tok, j) => (
                    <span key={j} className={`ce-${tok.type}`}>{tok.text}</span>
                  ))}
                  {isLast ? <span className="monaco-cursor" /> : '\n'}
                </span>
              )
            })}
          </code>
        </pre>
      </div>

      {/* Status bar */}
      <div className="monaco-statusbar">
        <span className="monaco-status-lang">TypeScript</span>
        <span className="monaco-status-lines">{lines.length} lines</span>
      </div>
    </div>
  )
}
