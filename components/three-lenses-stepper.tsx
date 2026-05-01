"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

export type LensId = "operational" | "denotational" | "axiomatic"

export interface LensView {
  lensId: LensId
  /** LaTeX body. Wrapped in $$...$$ when rendered. */
  body: string
  /** One-line caption shown beneath the body. */
  gloss: string
}

export interface ThreeLensesStepperProps {
  title?: string
  /** The program under examination, displayed verbatim above the lenses. */
  program: string
  /** Exactly three lens views, in operational/denotational/axiomatic order. */
  lenses: LensView[]
  /** Optional sentence shown on the final synthesis step. */
  finaleNote?: string
}

const LENS_META: Record<
  LensId,
  { label: string; question: string; tint: string }
> = {
  operational: {
    label: "Operational",
    question: "How does it run?",
    tint: "border-blue-500/40 bg-blue-500/5",
  },
  denotational: {
    label: "Denotational",
    question: "What does it compute?",
    tint: "border-emerald-500/40 bg-emerald-500/5",
  },
  axiomatic: {
    label: "Axiomatic",
    question: "What can we guarantee?",
    tint: "border-amber-500/40 bg-amber-500/5",
  },
}

function LensCard({
  lens,
  faded = false,
  rendererKey,
}: {
  lens: LensView
  faded?: boolean
  rendererKey: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)
  const meta = LENS_META[lens.lensId]

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
  }, [rendererKey, lens.body])

  return (
    <div
      className={`border rounded-lg p-3 transition-opacity ${meta.tint} ${
        faded ? "opacity-30" : "opacity-100"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <span className="font-semibold text-sm">{meta.label}</span>
        <span className="text-xs italic text-muted-foreground">
          {meta.question}
        </span>
      </div>
      <div className="relative min-h-[80px]">
        {!rendered && <MathShimmer block />}
        <div
          ref={ref}
          style={{
            visibility: rendered ? "visible" : "hidden",
            position: rendered ? "static" : "absolute",
          }}
        >
          <div className="my-1 text-center overflow-x-auto">
            {`$$${lens.body}$$`}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground italic text-center mt-2">
        {lens.gloss}
      </p>
    </div>
  )
}

export function ThreeLensesStepper({
  title,
  program,
  lenses,
  finaleNote,
}: ThreeLensesStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const total = lenses.length + 1
  const isFirst = currentStep === 0
  const isLast = currentStep === total - 1
  const isFinale = currentStep === lenses.length

  const focusLens = isFinale ? null : lenses[currentStep]

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔭 ${title}` : "🔭 Three Lenses, One Program"}
        </span>
        <span className="text-xs text-muted-foreground">
          {isFinale
            ? "Synthesis"
            : `Lens ${currentStep + 1} of ${lenses.length}`}
        </span>
      </div>

      <div className="px-4 py-3 border-b bg-muted/20">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Program
        </div>
        <pre className="font-mono text-sm">{program}</pre>
      </div>

      <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {lenses.map((l, i) => {
          const isFocused = !isFinale && currentStep === i
          const showFull = isFinale || isFocused
          return (
            <LensCard
              key={l.lensId}
              lens={l}
              faded={!showFull}
              rendererKey={isFinale ? -1 : currentStep}
            />
          )
        })}
      </div>

      {!isFinale && focusLens && (
        <div className="px-4 py-2 border-t bg-muted/20 text-center text-sm text-muted-foreground italic">
          Reading just the {LENS_META[focusLens.lensId].label.toLowerCase()}{" "}
          lens — the other two are dimmed.
        </div>
      )}

      {isFinale && (
        <div className="px-4 py-3 border-t bg-primary/5 text-center text-sm">
          <span className="font-semibold text-primary">All three agree.</span>{" "}
          {finaleNote ??
            "The same program admits three readings; each illuminates a different question."}
        </div>
      )}

      <div className="px-4 py-3 bg-muted/20 flex items-center justify-between gap-2 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={isFirst}
        >
          ← Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(0)}
          disabled={isFirst}
        >
          ↺ Reset
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => setCurrentStep((s) => Math.min(total - 1, s + 1))}
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
