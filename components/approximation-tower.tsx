"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

/**
 * Vertically-stacking stepper for fixed-point approximation sequences.
 *
 * Unlike the FixedPointUnroller, which replaces its formula on every step,
 * this component *appends* each new equation row beneath the previous ones.
 * The student watches the same equation grow nested branch by nested branch,
 * with the freshly added clause boxed inside the LaTeX itself (option (i)).
 *
 * Each step's `formula` is expected to be a complete LaTeX RHS (typically an
 * `\begin{aligned} ... \end{aligned}` block) that includes a `\boxed{...}`
 * around the clause that was just added relative to the previous step.
 */

export interface TowerStep {
  /** Left-hand label, e.g. "w_2 = F(w_1)". Rendered inline-math. */
  label: string
  /**
   * Full LaTeX for the right-hand side of the equation. May span multiple
   * logical lines via `\\` inside `\begin{aligned}`. The newly added clause
   * (relative to the previous step) should be wrapped in `\boxed{...}`.
   */
  formula: string
  /** Optional caption shown when this step is the latest revealed row. */
  description?: string
}

export interface ApproximationTowerProps {
  title?: string
  steps: TowerStep[]
}

/**
 * Render one row of the tower: `label = formula` as a single block-mode equation.
 * MathJax handles all internal layout (boxed clause, aligned columns, etc.).
 */
function TowerRow({
  step,
  isLatest,
  isFinal,
}: {
  step: TowerStep
  isLatest: boolean
  isFinal: boolean
}) {
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
  }, [step.formula, step.label])

  return (
    <div
      className={`px-4 py-3 rounded border transition ${
        isLatest
          ? "bg-amber-500/10 border-amber-500/40"
          : isFinal
          ? "bg-primary/5 border-primary/40"
          : "bg-background border-border"
      }`}
    >
      <div className="relative overflow-x-auto">
        {!rendered && <MathShimmer block />}
        <div
          ref={ref}
          style={{
            visibility: rendered ? "visible" : "hidden",
            position: rendered ? "static" : "absolute",
          }}
        >
          {`$$${step.label} \\;=\\; ${step.formula}$$`}
        </div>
      </div>
    </div>
  )
}

export function ApproximationTower({ title, steps }: ApproximationTowerProps) {
  // revealedCount = how many rows are visible (0 = none, steps.length = all).
  // We always show at least the first row, so initial state is 1.
  const [revealedCount, setRevealedCount] = useState(1)

  const total = steps.length
  const isFirst = revealedCount === 1
  const isLast = revealedCount === total

  const visible = useMemo(
    () => steps.slice(0, revealedCount),
    [steps, revealedCount]
  )
  const latest = visible[visible.length - 1]

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🗼 ${title}` : "🗼 Approximation Tower"}
        </span>
        <span className="text-xs text-muted-foreground">
          Showing {revealedCount} / {total}
        </span>
      </div>

      <div className="px-4 py-4 space-y-3 bg-background">
        {visible.map((step, i) => {
          const isLatest = i === visible.length - 1 && revealedCount < total
          const isFinal = i === visible.length - 1 && revealedCount === total
          return (
            <TowerRow
              key={i}
              step={step}
              isLatest={isLatest}
              isFinal={isFinal}
            />
          )
        })}
      </div>

      {latest?.description && (
        <div className="px-4 py-2 border-t bg-muted/20">
          <p className="text-sm text-muted-foreground italic text-center">
            {latest.description}
          </p>
        </div>
      )}

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRevealedCount((c) => Math.max(1, c - 1))}
          disabled={isFirst}
        >
          ← Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRevealedCount(1)}
          disabled={isFirst}
        >
          ↺ Reset
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => setRevealedCount((c) => Math.min(total, c + 1))}
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
