"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"

function generateTriangle(rows: number): number[][] {
  const tri: number[][] = [[1]]
  for (let r = 1; r < rows; r++) {
    const prev = tri[r - 1]
    const row = [1]
    for (let k = 1; k < r; k++) {
      row.push(prev[k - 1] + prev[k])
    }
    row.push(1)
    tri.push(row)
  }
  return tri
}

interface PascalTriangleBuilderProps {
  className?: string
}

export function PascalTriangleBuilder({
  className = "",
}: PascalTriangleBuilderProps) {
  const [numRows, setNumRows] = useState(5)
  const [buildStep, setBuildStep] = useState(0)

  const triangle = useMemo(() => generateTriangle(numRows), [numRows])
  const lastRow = triangle[numRows - 1]
  const totalSteps = numRows >= 2 ? lastRow.length : 0

  const handleRowChange = useCallback((val: number) => {
    setNumRows(val)
    setBuildStep(0)
  }, [])

  const isParentHighlighted = (r: number, k: number) => {
    if (r !== numRows - 2 || numRows < 2 || buildStep === 0) return false
    const childK = buildStep - 1
    if (childK === 0 || childK === lastRow.length - 1) return false
    return k === childK - 1 || k === childK
  }

  const isChildHighlighted = (r: number, k: number) => {
    if (r !== numRows - 1 || buildStep === 0) return false
    return k === buildStep - 1
  }

  const currentChildK = buildStep > 0 ? buildStep - 1 : -1
  const isEdgeCase =
    currentChildK === 0 || currentChildK === lastRow.length - 1

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          Pascal&apos;s Triangle Builder
        </span>
        <div className="flex items-center gap-3">
          <label className="text-xs text-muted-foreground" htmlFor="row-slider">
            Rows: {numRows}
          </label>
          <input
            id="row-slider"
            type="range"
            min={1}
            max={10}
            value={numRows}
            onChange={(e) => handleRowChange(Number(e.target.value))}
            className="w-28 accent-primary"
          />
        </div>
      </div>

      <div className="px-4 py-6 flex flex-col items-center gap-1 overflow-x-auto">
        {triangle.map((row, r) => (
          <div key={r} className="flex items-center justify-center gap-1">
            {row.map((val, k) => {
              const parent = isParentHighlighted(r, k)
              const child = isChildHighlighted(r, k)
              let bg = ""
              if (child) bg = "bg-primary text-primary-foreground"
              else if (parent) bg = "bg-primary/20 ring-2 ring-primary/50"

              return (
                <div
                  key={k}
                  className={`w-10 h-10 flex items-center justify-center rounded text-sm font-mono transition-all ${bg}`}
                >
                  {val}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {buildStep > 0 && numRows >= 2 && (
        <div className="px-4 pb-3">
          <p className="text-sm text-muted-foreground italic text-center">
            {isEdgeCase ? (
              <>
                Edge cell — always <strong>1</strong>
              </>
            ) : (
              <>
                {triangle[numRows - 2][currentChildK - 1]} +{" "}
                {triangle[numRows - 2][currentChildK]} ={" "}
                <strong>{lastRow[currentChildK]}</strong>
              </>
            )}
          </p>
        </div>
      )}

      {numRows >= 2 && (
        <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBuildStep(Math.max(0, buildStep - 1))}
            disabled={buildStep === 0}
          >
            ← Previous
          </Button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setBuildStep(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === buildStep
                    ? "bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to step ${i}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setBuildStep(Math.min(totalSteps, buildStep + 1))}
            disabled={buildStep === totalSteps}
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  )
}
