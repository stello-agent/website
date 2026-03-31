import { useState, useEffect, useRef } from 'react'

interface TypewriterTextProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  style?: React.CSSProperties
}

export function TypewriterText({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 3000,
  style,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const current = texts[textIndex]

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, typingSpeed)
      } else {
        timerRef.current = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, deletingSpeed)
      } else {
        setIsDeleting(false)
        setTextIndex((i) => (i + 1) % texts.length)
      }
    }

    return () => clearTimeout(timerRef.current)
  }, [displayed, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

  return (
    <span style={style}>
      {displayed}
      <span
        style={{
          display: 'inline-block',
          width: 2,
          height: '1em',
          background: '#3b82f6',
          marginLeft: 2,
          animation: 'blink 1s step-end infinite',
          verticalAlign: 'text-bottom',
        }}
      />
    </span>
  )
}
