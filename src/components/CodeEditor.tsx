// src/components/CodeEditor.tsx
import './CodeEditor.css'

interface Props {
  code: string
  lang?: string
}

// CodeEditor 展示带语法高亮的代码块（纯 CSS 高亮，无外部库）
export function CodeEditor({ code }: Props) {
  // Simple tokenization: highlight comments (// ...) and string values
  const lines = code.split('\n')
  return (
    <pre className="code-editor">
      <code>
        {lines.map((line, i) => {
          const isComment = line.trimStart().startsWith('//')
          const isKey = /^\s*"[^"]+":/.test(line)
          return (
            <span key={i} className={isComment ? 'ce-comment' : isKey ? 'ce-key' : 'ce-default'}>
              {line}
              {i < lines.length - 1 ? '\n' : ''}
            </span>
          )
        })}
      </code>
    </pre>
  )
}
