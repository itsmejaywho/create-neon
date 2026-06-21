import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(() =>
    typeof window === 'undefined' ? true : !('IntersectionObserver' in window),
  )

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    if (!('IntersectionObserver' in window)) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        'reveal',
        isVisible ? 'is-visible' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
