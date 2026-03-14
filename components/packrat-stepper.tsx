"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface PackratStep {
  row: number
  col: number
  result: "match" | "fail" | "pending"
  isCacheHit: boolean
  description: string
}

interface PackratStepperProps {
  title?: string
  rules: string[]
  inputTokens: string[]
  steps: PackratStep[]
}

export function PackratStepper({ title, rules, inputTokens, steps }: PackratStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const grid = useMemo(() => {
    const g: (null | { result: "match" | "fail" | "pending"; isCacheHit: boolean })[][] = []
    for (let r = 0; r < rules.length; r++) {
      g.push(new Array(inputTokens.length + 1).fill(null))
    }

    for (let i = 0; i <= currentStep && i < steps.length; i++) {
      const s = steps[i]
      if (s.row < rules.length && s.col <= inputTokens.length) {
        g[s.row][s.col] = { result: s.result, isCacheHit: i < currentStep ? false : s.isCacheHit }
      }
    }

    return g
  }, [currentStep, steps, rules.length, inputTokens.length])

  const activeStep = currentStep < steps.length ? steps[currentStep] : null

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `📊 ${title}` : "📊 Packrat Memoization Table"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="px-4 py-4 overflow-x-auto">
        <table className="w-full border-collapse text-xs font-mono">
          <thead>
            <tr>
              <th className="p-2 border bg-muted/30 text-left text-muted-foreground font-semibold min-w-[100px]">
                Rule / Position
              </th>
              {inputTokens.map((tok, i) => (
                <th key={i} className="p-2 border bg-muted/30 text-center min-w-[50px]">
                  <div className="text-muted-foreground text-[10px]">{i}</div>
                  <div className="font-semibold text-foreground">{tok}</div>
                </th>
              ))}
              <th className="p-2 border bg-muted/30 text-center min-w-[50px]">
                <div className="text-muted-foreground text-[10px]">{inputTokens.length}</div>
                <div className="font-semibold text-foreground">EOF</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rules.map((rule, r) => (
              <tr key={r}>
                <td className="p-2 border bg-muted/20 font-semibold text-foreground">
                  {rule}
                </td>
                {Array.from({ length: inputTokens.length + 1 }, (_, c) => {
                  const cell = grid[r]?.[c]
                  const isActive = activeStep && activeStep.row === r && activeStep.col === c
                  const isCacheHit = isActive && activeStep.isCacheHit

                  if (!cell) {
                    return (
                      <td key={c} className={`p-2 border text-center transition-all duration-200 ${isActive ? "ring-2 ring-inset ring-primary" : ""}`}>
                        <span className="text-muted-foreground/20">·</span>
                      </td>
                    )
                  }

                  return (
                    <td
                      key={c}
                      className={`
                        p-2 border text-center transition-all duration-300
                        ${cell.result === "match"
                          ? "bg-green-500/15"
                          : cell.result === "fail"
                            ? "bg-red-500/10"
                            : "bg-amber-500/10"
                        }
                        ${isActive ? "ring-2 ring-inset ring-primary" : ""}
                        ${isCacheHit ? "ring-2 ring-inset ring-amber-400 shadow-[inset_0_0_12px_rgba(251,191,36,0.3)]" : ""}
                      `}
                    >
                      {cell.result === "match" ? (
                        <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                      ) : cell.result === "fail" ? (
                        <span className="text-red-500 dark:text-red-400 font-bold">✗</span>
                      ) : (
                        <span className="text-amber-500 font-bold">…</span>
                      )}
                      {isCacheHit && (
                        <div className="text-[9px] text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                          CACHED
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-2 border-t bg-muted/20">
        <p className="text-sm text-muted-foreground italic text-center">
          {activeStep?.description ?? "Parsing complete."}
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
