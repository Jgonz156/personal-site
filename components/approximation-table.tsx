"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

/**
 * A single cell in the approximation table.
 *  - `null` means ⊥ (diverges / no information).
 *  - `string` is rendered verbatim. May be a final state like "x↦0", or a
 *    trace such as "3 → 2 → 1 → 0" (landed) or "3 → 2 → ⊥" (probed but
 *    ran out of unfoldings). Strings whose trimmed form ends in "⊥" are
 *    treated as "still divergent" for the just-landed highlight rule.
 */
export type ApproxCell = string | null

/**
 * Heuristic: does this cell still represent a divergent / incomplete result?
 * `null` is the canonical ⊥; trace strings ending in "⊥" are partial probes
 * that should also count as "not yet landed" for the highlight transition.
 */
function endsInBottom(value: ApproxCell): boolean {
  if (value === null) return true
  return value.trim().endsWith("⊥")
}

/**
 * A cell "just landed" at this step if the previous row's value was still
 * divergent (null or trailing ⊥) and the current row's value is terminal.
 */
function justLanded(prev: ApproxCell | undefined, curr: ApproxCell): boolean {
  if (curr === null) return false
  if (endsInBottom(curr)) return false
  return prev === undefined || endsInBottom(prev)
}

/**
 * One row in the table — one fixed-point approximation step.
 */
export interface ApproximationRow {
  /** Label for the row, e.g. "w_0", "w_1". Rendered as inline math. */
  label: string
  /** One value per input column — `null` means ⊥. */
  values: ApproxCell[]
  /** Optional caption that shows alongside the active row. */
  description?: string
}

export interface ApproximationTableProps {
  title?: string
  /** Header text for the row-label column, defaults to "Approximation". */
  approximationHeader?: string
  /** Column header that introduces the inputs, e.g. "x" or "n". */
  inputHeader: string
  /** The sample inputs to show as columns (string for full freedom in formatting). */
  inputs: (string | number)[]
  /** The successive approximations. Each row is revealed one step at a time. */
  rows: ApproximationRow[]
  /** Optional final row representing fix(F) = ⊔ wᵢ — shown after the last regular row. */
  fixedPoint?: ApproximationRow
}

function MathInline({ formula }: { formula: string }) {
  const ref = useRef<HTMLSpanElement>(null)
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
    <span className="relative inline-block align-middle">
      {!rendered && <MathShimmer />}
      <span
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {`$${formula}$`}
      </span>
    </span>
  )
}

/**
 * Render a single cell. ⊥ rendered as math, real values rendered as monospace text.
 */
function CellContent({
  value,
  justRevealed,
  justChanged,
}: {
  value: ApproxCell
  justRevealed: boolean
  justChanged: boolean
}) {
  if (value === null) {
    return (
      <span
        className={`text-muted-foreground ${
          justRevealed ? "font-semibold" : ""
        }`}
      >
        <MathInline formula="\bot" />
      </span>
    )
  }
  return (
    <span
      className={`font-mono text-sm ${
        justChanged
          ? "text-green-700 dark:text-green-400 font-semibold"
          : justRevealed
          ? "text-foreground"
          : "text-foreground"
      }`}
    >
      {value}
    </span>
  )
}

export function ApproximationTable({
  title,
  approximationHeader = "Approximation",
  inputHeader,
  inputs,
  rows,
  fixedPoint,
}: ApproximationTableProps) {
  // currentStep ranges 0..rows.length. At step k we show rows[0..k] (inclusive of k).
  // If fixedPoint is provided, the last index reveals it.
  const totalSteps = rows.length + (fixedPoint ? 1 : 0)
  const [currentStep, setCurrentStep] = useState(0)

  const isFirst = currentStep === 0
  const isLast = currentStep === totalSteps - 1

  // Build the visible rows sequence.
  const visibleRows: ApproximationRow[] = []
  for (let i = 0; i <= currentStep && i < rows.length; i++) {
    visibleRows.push(rows[i])
  }
  const showFixedPoint = !!fixedPoint && currentStep >= rows.length

  // Active row description: either the row just revealed, or the fixed point.
  const activeDescription = showFixedPoint
    ? fixedPoint?.description
    : visibleRows[visibleRows.length - 1]?.description

  // For the "just changed" highlight, compare to the previous row of the same column.
  const previousRow =
    visibleRows.length >= 2 ? visibleRows[visibleRows.length - 2] : undefined

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `📊 ${title}` : "📊 Fixed-Point Approximation Table"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      <div className="px-4 py-4 overflow-x-auto bg-background">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {approximationHeader}
              </th>
              <th
                className="text-center py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                colSpan={inputs.length}
              >
                {inputHeader}
              </th>
            </tr>
            <tr className="border-b border-border">
              <th />
              {inputs.map((input, i) => (
                <th
                  key={i}
                  className="text-center py-1 px-3 text-xs font-mono text-muted-foreground"
                >
                  {String(input)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIdx) => {
              const isLastVisible = rowIdx === visibleRows.length - 1
              return (
                <tr
                  key={rowIdx}
                  className={`border-b border-dashed ${
                    isLastVisible && !showFixedPoint ? "bg-amber-500/5" : ""
                  }`}
                >
                  <td className="py-2 px-3">
                    <MathInline formula={row.label} />
                  </td>
                  {row.values.map((value, colIdx) => {
                    const prevValue = previousRow?.values[colIdx]
                    const justChanged =
                      isLastVisible &&
                      !showFixedPoint &&
                      justLanded(prevValue, value)
                    return (
                      <td
                        key={colIdx}
                        className="py-2 px-3 text-center align-middle"
                      >
                        <CellContent
                          value={value}
                          justRevealed={isLastVisible && !showFixedPoint}
                          justChanged={justChanged}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            {showFixedPoint && fixedPoint && (
              <tr className="border-t-2 border-primary bg-primary/5">
                <td className="py-2 px-3">
                  <MathInline formula={fixedPoint.label} />
                </td>
                {fixedPoint.values.map((value, colIdx) => (
                  <td
                    key={colIdx}
                    className="py-2 px-3 text-center align-middle"
                  >
                    <CellContent
                      value={value}
                      justRevealed
                      justChanged={justLanded(
                        rows[rows.length - 1]?.values[colIdx],
                        value
                      )}
                    />
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {activeDescription && (
        <div className="px-4 py-2 border-b border-t bg-muted/20">
          <p className="text-sm text-muted-foreground italic text-center">
            {activeDescription}
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
          onClick={() =>
            setCurrentStep((s) => Math.min(totalSteps - 1, s + 1))
          }
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
