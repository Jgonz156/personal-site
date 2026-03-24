"use client"

import { useState, useMemo } from "react"

const NUM_ROWS = 8

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

type PatternKey =
  | "none"
  | "natural"
  | "triangular"
  | "tetrahedral"
  | "hockey"
  | "squaring"
  | "powers11"
  | "binomial"
  | "sierpinski"

const PATTERNS: { key: PatternKey; label: string }[] = [
  { key: "none", label: "None" },
  { key: "natural", label: "Natural Numbers" },
  { key: "triangular", label: "Triangular Numbers" },
  { key: "tetrahedral", label: "Tetrahedral Numbers" },
  { key: "hockey", label: "Hockey Stick" },
  { key: "squaring", label: "Squaring" },
  { key: "powers11", label: "Powers of 11" },
  { key: "binomial", label: "Binomial Coefficients" },
  { key: "sierpinski", label: "Sierpinski Triangle" },
]

function isDiagonal(r: number, k: number, diag: number): boolean {
  return k === diag && r >= diag
}

function getHighlightInfo(
  pattern: PatternKey,
  r: number,
  k: number,
  triangle: number[][]
): { highlighted: boolean; label?: string } {
  switch (pattern) {
    case "none":
      return { highlighted: false }
    case "natural":
      return {
        highlighted: isDiagonal(r, k, 1),
        label: isDiagonal(r, k, 1) ? String(triangle[r][k]) : undefined,
      }
    case "triangular":
      return {
        highlighted: isDiagonal(r, k, 2),
        label: isDiagonal(r, k, 2) ? String(triangle[r][k]) : undefined,
      }
    case "tetrahedral":
      return {
        highlighted: isDiagonal(r, k, 3),
        label: isDiagonal(r, k, 3) ? String(triangle[r][k]) : undefined,
      }
    case "hockey": {
      const stickCells = [
        [2, 2],
        [3, 2],
        [4, 2],
        [5, 2],
        [6, 3],
      ]
      const isStick = stickCells.some(([sr, sk]) => sr === r && sk === k)
      return { highlighted: isStick }
    }
    case "squaring": {
      const pairs: [number, number][][] = [
        [[2, 1], [2, 2]],
        [[3, 1], [3, 2]],
        [[4, 1], [4, 2]],
        [[5, 1], [5, 2]],
        [[6, 1], [6, 2]],
        [[7, 1], [7, 2]],
      ]
      for (const pair of pairs) {
        if (pair.some(([pr, pk]) => pr === r && pk === k)) {
          const sum = triangle[pair[0][0]][pair[0][1]] + triangle[pair[1][0]][pair[1][1]]
          const n = pair[0][0]
          if (r === pair[0][0] && k === pair[0][1]) {
            return { highlighted: true, label: `${triangle[r][k]} + ${triangle[pair[1][0]][pair[1][1]]} = ${sum} = ${n}²` }
          }
          return { highlighted: true }
        }
      }
      return { highlighted: false }
    }
    case "powers11":
      return { highlighted: true }
    case "binomial":
      return { highlighted: true }
    case "sierpinski":
      return { highlighted: triangle[r][k] % 2 === 1 }
    default:
      return { highlighted: false }
  }
}

function getPowers11Label(row: number[]): string {
  let carry = 0
  const digits: number[] = []
  for (let i = row.length - 1; i >= 0; i--) {
    const total = row[i] + carry
    digits.unshift(total % 10)
    carry = Math.floor(total / 10)
  }
  while (carry > 0) {
    digits.unshift(carry % 10)
    carry = Math.floor(carry / 10)
  }
  return digits.join("")
}

function getBinomialLabel(r: number, k: number): string {
  if (r === 0) return "1"
  const aExp = r - k
  const bExp = k
  const aPart = aExp === 0 ? "" : aExp === 1 ? "a" : `a${superscript(aExp)}`
  const bPart = bExp === 0 ? "" : bExp === 1 ? "b" : `b${superscript(bExp)}`
  return aPart + bPart || "1"
}

function superscript(n: number): string {
  const sups: Record<string, string> = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
  }
  return String(n)
    .split("")
    .map((d) => sups[d] || d)
    .join("")
}

interface PascalTrianglePatternsProps {
  className?: string
}

export function PascalTrianglePatterns({
  className = "",
}: PascalTrianglePatternsProps) {
  const [activePattern, setActivePattern] = useState<PatternKey>("none")
  const triangle = useMemo(() => generateTriangle(NUM_ROWS), [])

  const hockeySum = "1 + 3 + 6 + 10 = 20"

  return (
    <div className={`my-6 border rounded-lg overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <span className="font-semibold text-sm">
          Pascal&apos;s Triangle — Hidden Patterns
        </span>
      </div>

      <div className="px-4 py-6 flex flex-col items-center gap-1 overflow-x-auto">
        {triangle.map((row, r) => (
          <div key={r} className="flex items-center justify-center gap-1">
            {row.map((val, k) => {
              const info = getHighlightInfo(activePattern, r, k, triangle)
              let bg = ""
              if (activePattern === "sierpinski") {
                bg = info.highlighted
                  ? "bg-primary text-primary-foreground"
                  : "opacity-10"
              } else if (activePattern !== "none" && info.highlighted) {
                bg = "bg-primary/20 ring-1 ring-primary/40"
              }

              let displayLabel: string | undefined
              if (activePattern === "binomial" && info.highlighted) {
                displayLabel = getBinomialLabel(r, k)
              }

              return (
                <div key={k} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded text-sm font-mono transition-all ${bg}`}
                  >
                    {val}
                  </div>
                  {displayLabel && (
                    <span className="text-[10px] text-primary font-medium mt-0.5">
                      {displayLabel}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        {activePattern === "powers11" && (
          <div className="mt-3 flex flex-col items-center gap-0.5 text-xs text-muted-foreground font-mono">
            {triangle.map((row, r) => (
              <span key={r}>
                11{superscript(r)} = {getPowers11Label(row)}
              </span>
            ))}
          </div>
        )}

        {activePattern === "hockey" && (
          <p className="mt-3 text-xs text-muted-foreground italic">
            {hockeySum} — the sum appears at the &quot;bend&quot; of the hockey
            stick
          </p>
        )}

        {activePattern === "squaring" && (
          <p className="mt-3 text-xs text-muted-foreground italic">
            Each pair in the second and third diagonals sums to a perfect square:
            1+0=1, 2+1=3... More precisely, n² = C(n,1) + 2·C(n,2)
          </p>
        )}

        {activePattern === "sierpinski" && (
          <p className="mt-3 text-xs text-muted-foreground italic">
            Coloring odd entries reveals a fractal — Sierpinski&apos;s Triangle.
            The pattern becomes even more striking with hundreds of rows.
          </p>
        )}
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex flex-wrap items-center justify-center gap-2">
        {PATTERNS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActivePattern(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activePattern === key
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
