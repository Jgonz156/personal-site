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

interface ReductionStep {
  math: string
  description: string
  tag: "graph" | "translate" | "algebra" | "bridge" | "conclusion"
}

interface ReductionCase {
  name: string
  subtitle: string
  steps: ReductionStep[]
}

const TAG_COLORS: Record<string, string> = {
  graph: "bg-blue-500",
  translate: "bg-amber-500",
  algebra: "bg-emerald-500",
  bridge: "bg-purple-500",
  conclusion: "bg-rose-500",
}

const TAG_LABELS: Record<string, string> = {
  graph: "Graph Theory",
  translate: "Translation",
  algebra: "Algebra (mod 2)",
  bridge: "Bridge Back",
  conclusion: "Conclusion",
}

const CASES: ReductionCase[] = [
  {
    name: "Odd Cycle",
    subtitle: "K₃ — impossible",
    steps: [
      {
        tag: "graph",
        math: "K_3: \\quad v_1 - v_2 - v_3 - v_1 \\qquad \\text{Can we 2-color this?}",
        description:
          "The triangle: 3 vertices, each connected to both others. We want to assign each vertex color 0 or 1 such that no edge connects same-colored vertices.",
      },
      {
        tag: "translate",
        math: "\\text{Edge } (v_i, v_j) \\;\\longrightarrow\\; x_i + x_j \\equiv 1 \\pmod{2}",
        description:
          'For each edge, require that the two endpoint colors sum to 1 mod 2. This forces them to differ — exactly what "proper coloring" means.',
      },
      {
        tag: "algebra",
        math: "\\begin{cases} x_1 + x_2 \\equiv 1 \\\\ x_2 + x_3 \\equiv 1 \\\\ x_1 + x_3 \\equiv 1 \\end{cases} \\pmod{2}",
        description:
          "Three edges produce three equations. This is now a system of linear equations over Z₂ — pure algebra from LN7.",
      },
      {
        tag: "algebra",
        math: "x_1 = 0 \\;\\implies\\; x_2 = 1 \\;\\implies\\; x_3 = 0",
        description:
          "Attempt to solve: choose x₁ = 0. The first equation forces x₂ = 1. The second forces x₃ = 0.",
      },
      {
        tag: "algebra",
        math: "x_1 + x_3 = 0 + 0 = 0 \\neq 1 \\qquad \\bot",
        description:
          "Check the third equation: x₁ + x₃ = 0 + 0 = 0 ≠ 1. Contradiction! The system has no solution.",
      },
      {
        tag: "bridge",
        math: "\\text{No solution in } \\mathbb{Z}_2 \\;\\iff\\; \\text{No proper 2-coloring} \\;\\iff\\; \\text{Odd cycle!}",
        description:
          "The algebraic contradiction maps back to the graph: K₃ is an odd cycle, so it is not bipartite. The algebra proved the graph theory result.",
      },
    ],
  },
  {
    name: "Even Cycle",
    subtitle: "C₄ — solvable",
    steps: [
      {
        tag: "graph",
        math: "C_4: \\quad v_1 - v_2 - v_3 - v_4 - v_1 \\qquad \\text{Can we 2-color this?}",
        description:
          "The 4-cycle: 4 vertices connected in a ring. Is there a proper 2-coloring?",
      },
      {
        tag: "translate",
        math: "\\begin{cases} x_1 + x_2 \\equiv 1 \\\\ x_2 + x_3 \\equiv 1 \\\\ x_3 + x_4 \\equiv 1 \\\\ x_4 + x_1 \\equiv 1 \\end{cases} \\pmod{2}",
        description:
          "Four edges produce four equations over Z₂. Same translation rule: adjacent vertices must have different colors.",
      },
      {
        tag: "algebra",
        math: "x_1 = 0 \\;\\implies\\; x_2 = 1 \\;\\implies\\; x_3 = 0 \\;\\implies\\; x_4 = 1",
        description:
          "Solve by propagation: choose x₁ = 0, then each equation determines the next variable.",
      },
      {
        tag: "algebra",
        math: "x_4 + x_1 = 1 + 0 = 1 \\equiv 1 \\pmod{2} \\qquad \\checkmark",
        description:
          "Check the last equation: x₄ + x₁ = 1 + 0 = 1. It holds! All four equations are satisfied.",
      },
      {
        tag: "bridge",
        math: "\\text{Solution: } (x_1, x_2, x_3, x_4) = (0, 1, 0, 1) \\;\\iff\\; \\text{2-coloring found!}",
        description:
          "Map the algebraic solution back: 0 = color A, 1 = color B. The coloring alternates around the cycle — a valid 2-coloring.",
      },
      {
        tag: "conclusion",
        math: "\\text{Consistent system in } \\mathbb{Z}_2 \\;\\iff\\; G \\text{ is bipartite}",
        description:
          "The algebra solved the graph problem. The 4-cycle is bipartite because its corresponding equation system is consistent. Same technique, opposite outcome.",
      },
    ],
  },
]

export function ReducibilityExplorer() {
  const [caseIdx, setCaseIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)

  const activeCase = CASES[caseIdx]
  const currentStep = activeCase.steps[stepIdx]

  const handleCaseChange = (idx: number) => {
    setCaseIdx(idx)
    setStepIdx(0)
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">Reducibility Explorer</span>
        <div className="flex gap-1">
          {CASES.map((c, i) => (
            <button
              key={i}
              onClick={() => handleCaseChange(i)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                i === caseIdx
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Progress tracker */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-1 mb-2">
          {activeCase.steps.map((s, i) => {
            const isReached = i <= stepIdx
            const isCurrent = i === stepIdx
            const color = TAG_COLORS[s.tag] ?? "bg-muted"
            return (
              <button
                key={i}
                onClick={() => setStepIdx(i)}
                className={`flex-1 h-8 rounded transition-all duration-300 ${color} ${
                  isCurrent ? "ring-2 ring-primary ring-offset-1" : ""
                }`}
                style={{ opacity: isReached ? 1 : 0.2 }}
                aria-label={`Go to step ${i + 1}`}
              />
            )
          })}
        </div>
        <div className="flex justify-center gap-3 text-[10px] text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" />
            Graph
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-amber-500 inline-block" />
            Translate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" />
            Algebra
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-purple-500 inline-block" />
            Bridge
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-sm bg-rose-500 inline-block" />
            Conclusion
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <div className="px-4 py-2 border-t border-b bg-muted/10">
        <p className="text-xs text-muted-foreground">
          <strong>{activeCase.subtitle}</strong>
        </p>
      </div>

      {/* Current step */}
      <div className="px-4 py-4 min-h-[140px]">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded text-white ${TAG_COLORS[currentStep.tag]}`}
          >
            {TAG_LABELS[currentStep.tag]}
          </span>
          <span className="text-xs text-muted-foreground">
            Step {stepIdx + 1} of {activeCase.steps.length}
          </span>
        </div>
        <MathBlock
          key={`${caseIdx}-${stepIdx}`}
          formula={currentStep.math}
        />
        <p className="text-sm text-muted-foreground italic text-center mt-3">
          {currentStep.description}
        </p>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => stepIdx > 0 && setStepIdx(stepIdx - 1)}
          disabled={stepIdx === 0}
        >
          ← Previous
        </Button>
        <div className="flex items-center gap-1.5">
          {activeCase.steps.map((_, i) => (
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
          onClick={() =>
            stepIdx < activeCase.steps.length - 1 && setStepIdx(stepIdx + 1)
          }
          disabled={stepIdx === activeCase.steps.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
