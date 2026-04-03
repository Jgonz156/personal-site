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

interface DecompStep {
  title: string
  description: string
  formula: string
}

const STEPS: DecompStep[] = [
  {
    title: "Start with the Lambda",
    description:
      "A familiar function from this course: the successor function on {0, 1, 2}.",
    formula:
      "\\lambda x.\\, x + 1 \\;:\\; \\{0, 1, 2\\} \\to \\{1, 2, 3\\}",
  },
  {
    title: "Function → Set of Ordered Pairs",
    description:
      "A function is a set of input-output pairs. Each pair maps an input to its output.",
    formula: "f = \\{(0, 1),\\; (1, 2),\\; (2, 3)\\}",
  },
  {
    title: "Ordered Pairs → Kuratowski Sets",
    description:
      "Each ordered pair (a, b) becomes the set {{a}, {a, b}}. The function is now a set of sets of sets.",
    formula:
      "f = \\Big\\{\\; \\{\\{0\\}, \\{0, 1\\}\\},\\;\\; \\{\\{1\\}, \\{1, 2\\}\\},\\;\\; \\{\\{2\\}, \\{2, 3\\}\\} \\;\\Big\\}",
  },
  {
    title: "The Von Neumann Key",
    description:
      "Before we substitute, here is the key. Each number is the set of all numbers before it.",
    formula:
      "\\begin{array}{rcl} 0 &=& \\emptyset \\\\ 1 &=& \\{\\emptyset\\} \\\\ 2 &=& \\{\\emptyset,\\, \\{\\emptyset\\}\\} \\\\ 3 &=& \\{\\emptyset,\\, \\{\\emptyset\\},\\, \\{\\emptyset, \\{\\emptyset\\}\\}\\} \\end{array}",
  },
  {
    title: "Substitute: The Pair (0, 1)",
    description:
      "Replace 0 = ∅ and 1 = {∅} in the first Kuratowski pair.",
    formula:
      "(0, 1) = \\{\\{0\\}, \\{0, 1\\}\\} = \\{\\{\\emptyset\\},\\; \\{\\emptyset, \\{\\emptyset\\}\\}\\}",
  },
  {
    title: "Substitute: The Pair (1, 2)",
    description:
      "Replace 1 = {∅} and 2 = {∅, {∅}} in the second pair. The nesting deepens.",
    formula:
      "(1, 2) = \\{\\{\\{\\emptyset\\}\\},\\; \\{\\{\\emptyset\\},\\, \\{\\emptyset, \\{\\emptyset\\}\\}\\}\\}",
  },
  {
    title: "Substitute: The Pair (2, 3)",
    description:
      "Replace 2 and 3. This is where things get serious.",
    formula:
      "(2, 3) = \\{\\;\\{\\{\\emptyset, \\{\\emptyset\\}\\}\\},\\;\\; \\{\\{\\emptyset, \\{\\emptyset\\}\\},\\, \\{\\emptyset, \\{\\emptyset\\}, \\{\\emptyset, \\{\\emptyset\\}\\}\\}\\}\\;\\}",
  },
  {
    title: "The Full Function in Set Notation",
    description:
      "Putting all three pairs together. The entire function is one enormous set.",
    formula:
      "f = \\left\\{\\begin{array}{l} \\{\\{\\emptyset\\},\\; \\{\\emptyset, \\{\\emptyset\\}\\}\\}, \\\\ \\{\\{\\{\\emptyset\\}\\},\\; \\{\\{\\emptyset\\}, \\{\\emptyset, \\{\\emptyset\\}\\}\\}\\}, \\\\ \\{\\{\\{\\emptyset, \\{\\emptyset\\}\\}\\},\\; \\{\\{\\emptyset, \\{\\emptyset\\}\\}, \\{\\emptyset, \\{\\emptyset\\}, \\{\\emptyset, \\{\\emptyset\\}\\}\\}\\}\\} \\end{array}\\right\\}",
  },
  {
    title: "Replace ∅ with {} — Pure Braces",
    description:
      "The empty set symbol ∅ is just shorthand for {}. Remove it, and everything you know and love is curly braces.",
    formula:
      "f = \\left\\{\\begin{array}{l} \\{\\{\\{\\}\\},\\; \\{\\{\\}, \\{\\{\\}\\}\\}\\}, \\\\ \\{\\{\\{\\{\\}\\}\\},\\; \\{\\{\\{\\}\\}, \\{\\{\\}, \\{\\{\\}\\}\\}\\}\\}, \\\\ \\{\\{\\{\\{\\}, \\{\\{\\}\\}\\}\\},\\; \\{\\{\\{\\}, \\{\\{\\}\\}\\}, \\{\\{\\}, \\{\\{\\}\\}, \\{\\{\\}, \\{\\{\\}\\}\\}\\}\\}\\} \\end{array}\\right\\}",
  },
]

export function SetDecompositionStepper() {
  const [currentStep, setCurrentStep] = useState(0)
  const step = STEPS[currentStep]

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <span className="font-semibold text-sm">
          Everything Is Sets
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {STEPS.length}
        </span>
      </div>

      <div className="p-4 space-y-3 min-h-[180px]">
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
