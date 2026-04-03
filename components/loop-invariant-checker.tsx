"use client"

import { useEffect, useRef, useState } from "react"
import { waitForMathJax, MathShimmer } from "@/components/math"

interface InvariantCheck {
  passes: boolean
  explanation: string
}

interface InvariantCandidate {
  label: string
  latex: string
  initialization: InvariantCheck
  preservation: InvariantCheck
  termination: InvariantCheck
}

interface LoopInvariantCheckerProps {
  title?: string
  loopCode: string
  postcondition: string
  candidates: InvariantCandidate[]
}

function MathBlock({ latex }: { latex: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    setRendered(false)

    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })

    return () => {
      mounted = false
    }
  }, [latex])

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
        {`$${latex}$`}
      </span>
    </span>
  )
}

function ExplanationBlock({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    setRendered(false)

    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })

    return () => {
      mounted = false
    }
  }, [text])

  return (
    <div className="relative text-sm text-muted-foreground">
      {!rendered && <MathShimmer block />}
      <div
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  )
}

function CheckPanel({
  label,
  check,
}: {
  label: string
  check: InvariantCheck
}) {
  return (
    <div
      className={`rounded-lg border-2 p-3 ${
        check.passes
          ? "border-green-500/40 bg-green-500/5"
          : "border-red-500/40 bg-red-500/5"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-lg ${check.passes ? "text-green-600" : "text-red-600"}`}
        >
          {check.passes ? "✓" : "✗"}
        </span>
        <span className="font-semibold text-sm">{label}</span>
      </div>
      <ExplanationBlock text={check.explanation} />
    </div>
  )
}

export function LoopInvariantChecker({
  title,
  loopCode,
  postcondition,
  candidates,
}: LoopInvariantCheckerProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const postcondRef = useRef<HTMLSpanElement>(null)
  const [postcondRendered, setPostcondRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    setPostcondRendered(false)

    waitForMathJax().then(() => {
      if (mounted && postcondRef.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([postcondRef.current]).then(() => {
          if (mounted) setPostcondRendered(true)
        })
      }
    })

    return () => {
      mounted = false
    }
  }, [postcondition])

  const candidate = candidates[selectedIdx]
  const allPass =
    candidate.initialization.passes &&
    candidate.preservation.passes &&
    candidate.termination.passes

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔍 ${title}` : "🔍 Loop Invariant Checker"}
        </span>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded ${
            allPass
              ? "bg-green-500/20 text-green-700 dark:text-green-400"
              : "bg-red-500/20 text-red-700 dark:text-red-400"
          }`}
        >
          {allPass ? "Valid Invariant ✓" : "Invalid Invariant ✗"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Loop Program
            </span>
          </div>
          <div className="p-3">
            <pre className="bg-zinc-900 text-green-400 rounded px-3 py-2 font-mono text-sm overflow-x-auto">
              {loopCode}
            </pre>
            <div className="mt-2 text-xs text-muted-foreground">
              Postcondition:{" "}
              <span className="relative">
                {!postcondRendered && <MathShimmer />}
                <span
                  ref={postcondRef}
                  style={{
                    visibility: postcondRendered ? "visible" : "hidden",
                    position: postcondRendered ? "static" : "absolute",
                  }}
                >
                  {`$${postcondition}$`}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Candidate Invariant
            </span>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {candidates.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                    selectedIdx === i
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/50 hover:bg-muted border-border"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">$I$ = </span>
              <MathBlock key={selectedIdx} latex={candidate.latex} />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <CheckPanel
          label="1. Initialization"
          check={candidate.initialization}
        />
        <CheckPanel
          label="2. Preservation"
          check={candidate.preservation}
        />
        <CheckPanel
          label="3. Termination"
          check={candidate.termination}
        />
      </div>
    </div>
  )
}
