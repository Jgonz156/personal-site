"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

interface AnnotatedLine {
  code: string
  precondition?: string
  postcondition?: string
  isActive?: boolean
}

interface HoareStep {
  programLines: AnnotatedLine[]
  rule: string
  description: string
}

interface HoareTripleStepperProps {
  title?: string
  steps: HoareStep[]
}

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

function RulePanel({ rule }: { rule: string }) {
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
  }, [rule])

  return (
    <div
      ref={ref}
      className="overflow-x-auto text-center w-full transition-opacity duration-200"
      style={{ opacity: rendered ? 1 : 0.3 }}
    >
      {`$$${rule}$$`}
    </div>
  )
}

export function HoareTripleStepper({ title, steps }: HoareTripleStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔒 ${title}` : "🔒 Hoare Triple Stepper"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Annotated Program
            </span>
          </div>
          <div className="py-2 font-mono text-sm min-h-[200px]">
            {step.programLines.map((line, i) => (
              <div key={i}>
                {line.precondition && (
                  <div className="px-4 py-0.5 text-xs text-purple-600 dark:text-purple-400 bg-purple-500/5">
                    {"// {" + line.precondition + "}"}
                  </div>
                )}
                <div
                  className={`px-4 py-0.5 ${
                    line.isActive
                      ? "bg-amber-500/15 border-l-2 border-amber-500 font-bold"
                      : ""
                  }`}
                >
                  {line.code || "\u00A0"}
                </div>
                {line.postcondition && (
                  <div className="px-4 py-0.5 text-xs text-green-600 dark:text-green-400 bg-green-500/5">
                    {"// {" + line.postcondition + "}"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Hoare Rule Applied
            </span>
          </div>
          <div className="flex-1 px-3 py-4 flex items-center justify-center min-h-[100px]">
            {step.rule ? (
              <RulePanel key={currentStep} rule={step.rule} />
            ) : (
              <span className="text-sm text-muted-foreground italic">No rule applied yet</span>
            )}
          </div>
        </div>
      </div>

      {step.description && (
        <div className="px-4 py-2 border-b bg-muted/20">
          <p className="text-sm text-muted-foreground italic text-center">
            {step.description}
          </p>
        </div>
      )}

      <div className="px-4 py-3 bg-muted/20 flex items-center justify-between gap-2">
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
          onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
