"use client"

import { useEffect, useRef, useState } from "react"

interface DisplayMathProps {
  formula: string
}

interface InlineMathProps {
  formula: string
}

// Extend Window interface for MathJax
declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>
      typeset?: (elements?: HTMLElement[]) => void
      startup?: {
        promise: Promise<void>
      }
    }
  }
}

/**
 * Wait for MathJax to be fully loaded and ready
 */
function waitForMathJax(): Promise<void> {
  return new Promise((resolve) => {
    const check = () => {
      if (typeof window !== "undefined" && window.MathJax?.typesetPromise) {
        resolve()
      } else {
        setTimeout(check, 100)
      }
    }
    check()
  })
}

/**
 * DisplayMath component for block-level math equations.
 * Usage: <DisplayMath formula="\frac{A}{B}" />
 * 
 * The formula prop is a string, so MDX won't try to parse curly braces as JSX.
 * This component uses MathJax to render the formula client-side.
 */
export function DisplayMath({ formula }: DisplayMathProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    
    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        // Clear any previous MathJax output
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })

    return () => { mounted = false }
  }, [formula])

  return (
    <div 
      ref={ref} 
      className="my-4 overflow-x-auto text-center"
      style={{ opacity: rendered ? 1 : 0.5 }}
    >
      {`$$${formula}$$`}
    </div>
  )
}

/**
 * InlineMath component for inline math expressions.
 * Usage: <InlineMath formula="\alpha + \beta" />
 */
export function InlineMath({ formula }: InlineMathProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    
    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })

    return () => { mounted = false }
  }, [formula])

  return (
    <span 
      ref={ref}
      style={{ opacity: rendered ? 1 : 0.5 }}
    >
      {`$${formula}$`}
    </span>
  )
}

