// src/components/CodeEditor.tsx
import './CodeEditor.css'

interface Props {
  code: string
  filename?: string
  accentColor?: string
}

type TokenType =
  | 'comment'
  | 'string'
  | 'number'
  | 'key'
  | 'keyword'
  | 'punct'
  | 'plain'
  | 'md-h'
  | 'md-bold'
  | 'md-code'
  | 'md-list'
  | 'md-link'
  | 'md-muted'

function getLang(filename: string): string {
  if (filename.endsWith('.jsonl') || filename.endsWith('.json')) return 'JSONL'
  if (filename.endsWith('.md')) return 'Markdown'
  if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'TypeScript'
  if (filename.endsWith('.js')) return 'JavaScript'
  return 'Plain Text'
}

/* ── Markdown tokenizer ──────────────────────────── */

function tokenizeMarkdownLine(
  line: string,
): Array<{ text: string; type: TokenType }> {
  // 标题 #
  const hMatch = line.match(/^(#{1,3})\s(.+)/)
  if (hMatch) return [{ text: line, type: 'md-h' }]

  // 分隔线
  if (/^---+$/.test(line.trim())) return [{ text: line, type: 'md-muted' }]

  // 列表项 - / *
  const listMatch = line.match(/^(\s*[-*])\s(.*)/)
  if (listMatch) {
    return [
      { text: listMatch[1] + ' ', type: 'md-list' },
      ...tokenizeInlineMarkdown(listMatch[2]),
    ]
  }

  // 任务列表 - [ ] / - [x]
  const taskMatch = line.match(/^(\s*[-*]\s\[[ x]\])\s(.*)/)
  if (taskMatch) {
    return [
      { text: taskMatch[1] + ' ', type: 'md-list' },
      ...tokenizeInlineMarkdown(taskMatch[2]),
    ]
  }

  return tokenizeInlineMarkdown(line)
}

function tokenizeInlineMarkdown(
  text: string,
): Array<{ text: string; type: TokenType }> {
  const tokens: Array<{ text: string; type: TokenType }> = []
  let i = 0

  while (i < text.length) {
    // **bold**
    if (text[i] === '*' && text[i + 1] === '*') {
      const end = text.indexOf('**', i + 2)
      if (end !== -1) {
        tokens.push({ text: text.slice(i, end + 2), type: 'md-bold' })
        i = end + 2
        continue
      }
    }
    // `inline code`
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1)
      if (end !== -1) {
        tokens.push({ text: text.slice(i, end + 1), type: 'md-code' })
        i = end + 1
        continue
      }
    }
    // accumulate plain
    const last = tokens[tokens.length - 1]
    if (last?.type === 'plain') last.text += text[i]
    else tokens.push({ text: text[i], type: 'plain' })
    i++
  }

  return tokens
}

/* ── JSON / JSONL tokenizer ──────────────────────── */

function tokenizeJsonLine(
  line: string,
): Array<{ text: string; type: TokenType }> {
  const tokens: Array<{ text: string; type: TokenType }> = []
  let i = 0

  const addPlain = (ch: string) => {
    const last = tokens[tokens.length - 1]
    if (last?.type === 'plain') last.text += ch
    else tokens.push({ text: ch, type: 'plain' })
  }

  while (i < line.length) {
    if (line[i] === '/' && line[i + 1] === '/') {
      tokens.push({ text: line.slice(i), type: 'comment' })
      break
    }
    const keyM = line.slice(i).match(/^("(?:[^"\\]|\\.)*")(\s*:)/)
    if (keyM) {
      tokens.push({ text: keyM[1], type: 'key' })
      tokens.push({ text: keyM[2], type: 'punct' })
      i += keyM[0].length
      continue
    }
    const strM = line.slice(i).match(/^"(?:[^"\\]|\\.)*"/)
    if (strM) {
      tokens.push({ text: strM[0], type: 'string' })
      i += strM[0].length
      continue
    }
    const numM = line.slice(i).match(/^\d+\.?\d*/)
    if (numM && (i === 0 || !/\w/.test(line[i - 1]))) {
      tokens.push({ text: numM[0], type: 'number' })
      i += numM[0].length
      continue
    }
    const kwM = line.slice(i).match(/^(true|false|null)\b/)
    if (kwM) {
      tokens.push({ text: kwM[0], type: 'keyword' })
      i += kwM[0].length
      continue
    }
    if ('{}[]():,;'.includes(line[i])) {
      tokens.push({ text: line[i], type: 'punct' })
      i++
      continue
    }
    addPlain(line[i])
    i++
  }

  return tokens
}

function tokenizeLine(
  line: string,
  lang: string,
): Array<{ text: string; type: TokenType }> {
  if (lang === 'Markdown') return tokenizeMarkdownLine(line)
  if (lang === 'JSONL') return tokenizeJsonLine(line)
  return tokenizeJsonLine(line) // TypeScript/JS 复用 JSON tokenizer
}

// CodeEditor 渲染 Monaco 风格的代码编辑器（纯 CSS，无外部库）
export function CodeEditor({
  code,
  filename = 'snippet.ts',
  accentColor,
}: Props) {
  const lines = code.split('\n')
  const lang = getLang(filename)

  return (
    <div
      className="monaco-wrap"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
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

      <div className="monaco-body">
        <div className="monaco-gutter" aria-hidden="true">
          {lines.map((_, i) => (
            <span key={i} className="monaco-ln">
              {i + 1}
            </span>
          ))}
        </div>
        <pre className="monaco-code">
          <code>
            {lines.map((line, i) => {
              const tokens = tokenizeLine(line, lang)
              const isLast = i === lines.length - 1
              return (
                <span key={i} className="monaco-line">
                  {tokens.map((tok, j) => (
                    <span key={j} className={`ce-${tok.type}`}>
                      {tok.text}
                    </span>
                  ))}
                  {isLast ? <span className="monaco-cursor" /> : '\n'}
                </span>
              )
            })}
          </code>
        </pre>
      </div>

      <div className="monaco-statusbar">
        <span className="monaco-status-lang">{lang}</span>
        <span className="monaco-status-lines">{lines.length} lines</span>
      </div>
    </div>
  )
}
