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
export function waitForMathJax(): Promise<void> {
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
 * Shimmer placeholder shown while MathJax renders client-side.
 */
export function MathShimmer({ block = false }: { block?: boolean }) {
  if (block) {
    return (
      <div className="my-4 flex justify-center">
        <div className="h-8 w-48 rounded bg-muted animate-pulse" />
      </div>
    )
  }
  return (
    <span className="inline-block h-4 w-16 rounded bg-muted animate-pulse align-middle" />
  )
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
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })

    return () => { mounted = false }
  }, [formula])

  return (
    <div className="relative my-4 overflow-x-auto text-center">
      {!rendered && <MathShimmer block />}
      <div
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {`$$${formula}$$`}
      </div>
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
    <span className="relative">
      {!rendered && <MathShimmer />}
      <span
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {`$${formula}$`}
      </span>
    </span>
  )
}

