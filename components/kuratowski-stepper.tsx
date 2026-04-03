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

interface PairStep {
  title: string
  description: string
  formula: string
}

const STEPS: PairStep[] = [
  {
    title: "The Problem",
    description:
      "Sets are unordered: {1, 2} = {2, 1}. But we need ordered pairs where (1, 2) ≠ (2, 1). How do we recover ordering from an unordered construction?",
    formula:
      "\\{1, 2\\} = \\{2, 1\\} \\qquad \\text{but we need} \\qquad (1, 2) \\neq (2, 1)",
  },
  {
    title: "The Definition",
    description:
      "Kuratowski's trick: encode the ordered pair (a, b) as a set that distinguishes the first and second components by nesting.",
    formula: "(a,\\, b) \\;=\\; \\{\\{a\\},\\; \\{a, b\\}\\}",
  },
  {
    title: "Example: (1, 2)",
    description:
      "The element that appears in both inner sets ({1}) identifies the first component. The other element in the larger set identifies the second.",
    formula:
      "(1, 2) = \\{\\{1\\},\\; \\{1, 2\\}\\}",
  },
  {
    title: "Example: (2, 1)",
    description:
      "Now the first component is 2, so {2} appears in both inner sets. Compare this to the previous step — the sets are different.",
    formula:
      "(2, 1) = \\{\\{2\\},\\; \\{2, 1\\}\\} = \\{\\{2\\},\\; \\{1, 2\\}\\}",
  },
  {
    title: "Ordering Preserved",
    description:
      "The plain set {1, 2} equals {2, 1}, but the Kuratowski pairs are different sets. Ordering is recovered from an unordered construction.",
    formula:
      "\\underbrace{\\{\\{1\\},\\; \\{1, 2\\}\\}}_{(1,\\,2)} \\;\\neq\\; \\underbrace{\\{\\{2\\},\\; \\{1, 2\\}\\}}_{(2,\\,1)}",
  },
  {
    title: "Longer Tuples",
    description:
      "Tuples of any length are built by nesting pairs. A triple (a, b, c) is a pair of a pair and a third element.",
    formula:
      "(a, b, c) = ((a, b),\\, c) = \\{\\{\\{\\{a\\}, \\{a,b\\}\\}\\},\\; \\{\\{\\{a\\}, \\{a,b\\}\\},\\, c\\}\\}",
  },
]

export function KuratowskiStepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const step = STEPS[currentStep]

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <span className="font-semibold text-sm">Kuratowski Pairs</span>
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
        <StepFormula key={currentStep} formula={step.formula} />
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
