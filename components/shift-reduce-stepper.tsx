"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SRStep {
  stack: string[]
  input: string[]
  action: string
  description: string
  highlightStack?: number[]
}

interface ShiftReduceStepperProps {
  title?: string
  steps: SRStep[]
}

export function ShiftReduceStepper({ title, steps }: ShiftReduceStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = steps[currentStep]
  const highlightSet = new Set(step.highlightStack ?? [])

  const isShift = step.action.startsWith("SHIFT")
  const isReduce = step.action.startsWith("REDUCE")
  const isAccept = step.action.startsWith("ACCEPT")

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `⚙️ ${title}` : "⚙️ Shift-Reduce Parser"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
          <div>
            <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Stack
            </div>
            <div className="flex flex-col-reverse gap-1 p-3 rounded-md border bg-muted/10 min-h-[120px]">
              {step.stack.length === 0 && (
                <span className="text-xs text-muted-foreground/50 italic">Empty</span>
              )}
              {step.stack.map((item, i) => {
                const isHighlighted = highlightSet.has(i)
                const isNonTerminal = item[0] === item[0].toUpperCase() && item !== "$"
                return (
                  <div
                    key={i}
                    className={`
                      px-3 py-1.5 rounded-md border text-xs font-mono text-center transition-all duration-200
                      ${isHighlighted
                        ? "ring-2 ring-amber-500 bg-amber-500/20 border-amber-500/50 text-amber-600 dark:text-amber-400 font-bold"
                        : isNonTerminal
                          ? "bg-blue-500/15 border-blue-500/40 text-blue-600 dark:text-blue-400"
                          : "bg-muted/30 border-border text-foreground"
                      }
                    `}
                  >
                    {item}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-[120px] gap-2">
            <div
              className={`
                px-4 py-2 rounded-lg border-2 text-sm font-bold text-center transition-all duration-300 min-w-[100px]
                ${isShift
                  ? "bg-green-500/15 border-green-500/50 text-green-600 dark:text-green-400"
                  : isReduce
                    ? "bg-amber-500/15 border-amber-500/50 text-amber-600 dark:text-amber-400"
                    : isAccept
                      ? "bg-purple-500/15 border-purple-500/50 text-purple-600 dark:text-purple-400"
                      : "bg-muted/30 border-border text-muted-foreground"
                }
              `}
            >
              {step.action}
            </div>
            {isShift && <span className="text-lg">→</span>}
            {isReduce && <span className="text-lg">⇐</span>}
            {isAccept && <span className="text-lg">✓</span>}
          </div>

          <div>
            <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Remaining Input
            </div>
            <div className="flex flex-col gap-1 p-3 rounded-md border bg-muted/10 min-h-[120px]">
              {step.input.length === 0 && (
                <span className="text-xs text-muted-foreground/50 italic">Empty</span>
              )}
              {step.input.map((item, i) => (
                <div
                  key={i}
                  className={`
                    px-3 py-1.5 rounded-md border text-xs font-mono text-center transition-all duration-200
                    ${i === 0
                      ? "ring-1 ring-primary/50 bg-primary/10 border-primary/30 text-primary font-bold"
                      : "bg-muted/30 border-border text-foreground"
                    }
                  `}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border-t bg-muted/20">
        <p className="text-sm text-muted-foreground italic text-center">
          {step.description}
        </p>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep((s) => Math.max(0, s - 1))} disabled={currentStep === 0}>
          ← Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCurrentStep(0)} disabled={currentStep === 0}>
          ↺ Reset
        </Button>
        <Button variant="default" size="sm" onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))} disabled={currentStep >= steps.length - 1}>
          Next →
        </Button>
      </div>
    </div>
  )
}
