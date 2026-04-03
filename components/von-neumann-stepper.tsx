"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

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
    return () => {
      mounted = false
    }
  }, [formula])

  return (
    <div className="relative overflow-x-auto text-center w-full">
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

interface OrdinalStep {
  title: string
  description: string
  formula: string
}

const STEPS: OrdinalStep[] = [
  {
    title: "Define 0",
    description:
      "The number 0 is the empty set — a set with no elements.",
    formula:
      "0 \\;=\\; \\emptyset \\;=\\; \\{\\}",
  },
  {
    title: "Successor: S(0) = 1",
    description:
      "Apply the successor function S(n) = n ∪ {n}. The number 1 is the set containing 0.",
    formula:
      "S(0) = 0 \\cup \\{0\\} = \\{\\} \\cup \\{\\{\\}\\} = \\{\\{\\}\\} = \\{0\\} = 1",
  },
  {
    title: "Successor: S(1) = 2",
    description:
      "The number 2 is the set containing 0 and 1. Notice |2| = 2.",
    formula:
      "S(1) = 1 \\cup \\{1\\} = \\{0\\} \\cup \\{\\{0\\}\\} = \\{0,\\, \\{0\\}\\} = \\{0, 1\\} = 2",
  },
  {
    title: "Successor: S(2) = 3",
    description:
      "The number 3 is the set containing 0, 1, and 2. Each number is the set of all numbers before it.",
    formula:
      "S(2) = 2 \\cup \\{2\\} = \\{0, 1\\} \\cup \\{\\{0, 1\\}\\} = \\{0, 1, 2\\} = 3",
  },
  {
    title: "Successor: S(3) = 4",
    description:
      "The number 4 contains all its predecessors. In pure set notation, this is just nested braces.",
    formula:
      "S(3) = \\{0, 1, 2, 3\\} = 4",
  },
  {
    title: "The Pure Set View",
    description:
      "Replacing every number with its set definition, we get nothing but braces and the empty set.",
    formula:
      "\\begin{array}{rcl} 0 &=& \\{\\} \\\\ 1 &=& \\{\\{\\}\\} \\\\ 2 &=& \\{\\{\\},\\; \\{\\{\\}\\}\\} \\\\ 3 &=& \\{\\{\\},\\; \\{\\{\\}\\},\\; \\{\\{\\},\\{\\{\\}\\}\\}\\} \\\\ 4 &=& \\{\\{\\},\\; \\{\\{\\}\\},\\; \\{\\{\\},\\{\\{\\}\\}\\},\\; \\{\\{\\},\\{\\{\\}\\},\\{\\{\\},\\{\\{\\}\\}\\}\\}\\} \\end{array}",
  },
]

export function VonNeumannStepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const step = STEPS[currentStep]

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <span className="font-semibold text-sm">
          Von Neumann Ordinals
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {STEPS.length}
        </span>
      </div>

      <div className="p-4 space-y-3 min-h-[160px]">
        <div className="text-sm font-medium text-primary">
          {step.title}
        </div>
        <div className="text-sm text-muted-foreground">
          {step.description}
        </div>
        <StepFormula
          key={currentStep}
          formula={step.formula}
        />
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
        >
          ← Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(0)}
          disabled={currentStep === 0}
        >
          Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep((s) => s + 1)}
          disabled={currentStep === STEPS.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
