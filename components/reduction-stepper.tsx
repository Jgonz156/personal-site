"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface ReductionStep {
  formula: string
  description?: string
}

interface ReductionStepperProps {
  title?: string
  steps: ReductionStep[]
}

/**
 * Wait for MathJax to be fully loaded and ready.
 * Same utility used in components/math.tsx.
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
 * ReductionStepper — An interactive step-through component for lambda calculus reductions.
 *
 * Usage in MDX:
 * <ReductionStepper
 *   title="Beta-Reduction: succ 2 = 3"
 *   steps={[
 *     { formula: "\\colorbox{yellow}{...} \\; \\colorbox{cyan}{...}", description: "Identify the redex" },
 *     { formula: "...", description: "Substitute and simplify" },
 *   ]}
 * />
 *
 * Use LaTeX \color{} and \colorbox{} commands inside the formula strings
 * to highlight redexes and results.
 */
/**
 * Inner component that renders a single MathJax formula.
 * Keyed by step index so React fully remounts on step change,
 * giving MathJax a fresh DOM node with clean $$...$$ text.
 */
function StepFormula({ formula }: { formula: string }) {
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

    return () => { mounted = false }
  }, [formula])

  return (
    <div
      ref={ref}
      className="overflow-x-auto text-center w-full transition-opacity duration-200"
      style={{ opacity: rendered ? 1 : 0.3 }}
    >
      {`$$${formula}$$`}
    </div>
  )
}

export function ReductionStepper({ title, steps }: ReductionStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const goToStep = (next: number) => {
    if (next < 0 || next >= steps.length) return
    setCurrentStep(next)
  }

  const step = steps[currentStep]

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔄 ${title}` : "🔄 Reduction Stepper"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* Formula display — key forces full remount so MathJax gets clean text */}
      <div className="px-4 py-6 min-h-[80px] flex items-center justify-center">
        <StepFormula key={currentStep} formula={step.formula} />
      </div>

      {/* Description */}
      {step.description && (
        <div className="px-4 pb-3">
          <p className="text-sm text-muted-foreground italic text-center">
            {step.description}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          ← Previous
        </Button>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentStep
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => goToStep(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
