"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

function MathBlock({ formula }: { formula: string }) {
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
  }, [formula])

  return (
    <div className="relative overflow-x-auto text-center">
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

interface InductionExample {
  name: string
  statement: string
  steps: {
    phase: "base" | "hypothesis" | "step" | "conclusion"
    label: string
    math: string
    explanation: string
  }[]
}

interface InductionStepperProps {
  examples: InductionExample[]
  className?: string
}

const PHASE_COLORS: Record<string, string> = {
  base: "bg-green-500",
  hypothesis: "bg-blue-500",
  step: "bg-amber-500",
  conclusion: "bg-purple-500",
}

const PHASE_LABELS: Record<string, string> = {
  base: "Base Case",
  hypothesis: "Inductive Hypothesis",
  step: "Inductive Step",
  conclusion: "Conclusion",
}

export function InductionStepper({
  examples,
  className = "",
}: InductionStepperProps) {
  const [exampleIdx, setExampleIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)

  const example = examples[exampleIdx]
  const currentStep = example.steps[stepIdx]

  const handleExampleChange = (idx: number) => {
    setExampleIdx(idx)
    setStepIdx(0)
  }

  const handleNext = () => {
    if (stepIdx < example.steps.length - 1) {
      setStepIdx((s) => s + 1)
    }
  }

  const handlePrev = () => {
    if (stepIdx > 0) {
      setStepIdx((s) => s - 1)
    }
  }

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">Induction Stepper</span>
        <div className="flex gap-1">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => handleExampleChange(i)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                i === exampleIdx
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </div>

      {/* Progress tracker */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-1 mb-2">
          {example.steps.map((s, i) => {
            const isReached = i <= stepIdx
            const isCurrent = i === stepIdx
            const color = PHASE_COLORS[s.phase] ?? "bg-muted"
            return (
              <button
                key={i}
                onClick={() => setStepIdx(i)}
                className={`flex-1 h-8 rounded transition-all duration-300 ${color} ${
                  isCurrent
                    ? "ring-2 ring-primary ring-offset-1"
                    : ""
                }`}
                style={{ opacity: isReached ? 1 : 0.2 }}
                aria-label={`Go to step ${i + 1}: ${s.label}`}
              />
            )
          })}
        </div>
        <div className="flex justify-center gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-green-500 inline-block" />
            Base
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" />
            Hypothesis
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" />
            Step
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-purple-500 inline-block" />
            Conclusion
          </span>
        </div>
      </div>

      {/* Statement */}
      <div className="px-4 py-2 border-t border-b bg-muted/10">
        <p className="text-xs text-muted-foreground">
          <strong>Prove:</strong> {example.statement}
        </p>
      </div>

      {/* Current step */}
      <div className="px-4 py-4 min-h-[140px]">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded text-white ${PHASE_COLORS[currentStep.phase]}`}
          >
            {PHASE_LABELS[currentStep.phase]}
          </span>
          <span className="text-xs text-muted-foreground">
            {currentStep.label}
          </span>
        </div>
        <MathBlock
          key={`${exampleIdx}-${stepIdx}`}
          formula={currentStep.math}
        />
        <p className="text-sm text-muted-foreground italic text-center mt-3">
          {currentStep.explanation}
        </p>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={stepIdx === 0}
        >
          ← Previous
        </Button>
        <div className="flex items-center gap-1.5">
          {example.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStepIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === stepIdx
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
          onClick={handleNext}
          disabled={stepIdx === example.steps.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
