"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TapeStep {
  tape: string[]
  head: number
  state: string
  description?: string
}

interface TuringMachineTapeProps {
  title?: string
  steps: TapeStep[]
}

/**
 * TuringMachineTape — An interactive step-through component for Turing Machine execution.
 *
 * Renders a horizontal tape of cells with a highlighted head pointer and state label.
 * Uses the same navigation pattern (Previous/Next + step dots) as ReductionStepper.
 *
 * Usage in MDX:
 * <TuringMachineTape
 *   title="Multiply by Four: 5 → 20"
 *   steps={[
 *     { tape: ["0","1","0","1","#","#"], head: 0, state: "Scanning", description: "Start" },
 *     { tape: ["0","1","0","1","#","#"], head: 1, state: "Scanning", description: "Move right" },
 *   ]}
 * />
 */
export function TuringMachineTape({ title, steps }: TuringMachineTapeProps) {
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
          {title ? `⚙️ ${title}` : "⚙️ Turing Machine"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* Tape visualization */}
      <div className="px-4 py-6 flex flex-col items-center gap-3">
        {/* State label */}
        <div className="text-sm font-semibold text-primary">
          State: <span className="font-mono">{step.state}</span>
        </div>

        {/* Tape cells */}
        <div className="flex items-end gap-0 overflow-x-auto max-w-full pb-2">
          {step.tape.map((cell, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Head indicator */}
              <div
                className={`text-xs font-bold mb-1 transition-opacity duration-200 ${
                  i === step.head ? "opacity-100 text-primary" : "opacity-0"
                }`}
              >
                ▼
              </div>
              {/* Cell */}
              <div
                className={`
                  w-10 h-10 flex items-center justify-center
                  border font-mono text-sm font-semibold
                  transition-all duration-200
                  ${
                    i === step.head
                      ? "border-primary border-2 bg-primary/15 text-primary scale-110"
                      : "border-border bg-muted/30 text-foreground"
                  }
                `}
              >
                {cell}
              </div>
              {/* Cell index */}
              <div className="text-[10px] text-muted-foreground/50 mt-0.5">
                {i}
              </div>
            </div>
          ))}
        </div>
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
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
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
