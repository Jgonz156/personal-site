"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

// ============================================================================
// Types
// ============================================================================

export interface DivisorPairVisualizerProps {
  maxValue?: number // Range to explore (default: 50)
  highlightPrimes?: boolean // Mark primes distinctly
  showDesmosLink?: boolean // Show link to Desmos
  desmosUrl?: string // Custom Desmos graph URL
  height?: string
  caption?: string
  className?: string
}

interface NumberData {
  n: number
  divisorCount: number
  isPrime: boolean
  divisors: number[]
}

// ============================================================================
// Helper Functions
// ============================================================================

function getDivisors(n: number): number[] {
  const divisors: number[] = []
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i)
    }
  }
  return divisors
}

function isPrime(n: number): boolean {
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false
  }
  return true
}

function generateNumberData(max: number): NumberData[] {
  const data: NumberData[] = []
  for (let n = 1; n <= max; n++) {
    const divisors = getDivisors(n)
    data.push({
      n,
      divisorCount: divisors.length,
      isPrime: isPrime(n),
      divisors,
    })
  }
  return data
}

// ============================================================================
// Component
// ============================================================================

export function DivisorPairVisualizer({
  maxValue = 50,
  highlightPrimes = true,
  showDesmosLink = true,
  desmosUrl = "https://www.desmos.com/calculator",
  height = "300px",
  caption,
  className = "",
}: DivisorPairVisualizerProps) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null)

  const data = useMemo(() => generateNumberData(maxValue), [maxValue])

  // Find max divisor count for scaling
  const maxDivisors = Math.max(...data.map((d) => d.divisorCount))

  // SVG dimensions
  const padding = { top: 30, right: 30, bottom: 50, left: 50 }
  const svgWidth = 700
  const svgHeight = parseInt(height)
  const chartWidth = svgWidth - padding.left - padding.right
  const chartHeight = svgHeight - padding.top - padding.bottom

  // Scaling functions
  const xScale = (n: number) =>
    padding.left + ((n - 1) / (maxValue - 1)) * chartWidth
  const yScale = (count: number) =>
    padding.top + chartHeight - (count / maxDivisors) * chartHeight

  // Point radius
  const pointRadius = Math.max(3, Math.min(8, 300 / maxValue))

  const activeNumber = hoveredNumber ?? selectedNumber
  const activeData = activeNumber ? data.find((d) => d.n === activeNumber) : null

  return (
    <div className={`my-6 ${className}`}>
      <div className="border-2 border-primary/30 rounded-lg bg-background overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full"
          style={{ height }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {Array.from({ length: maxDivisors + 1 }, (_, i) => (
            <line
              key={`grid-y-${i}`}
              x1={padding.left}
              y1={yScale(i)}
              x2={svgWidth - padding.right}
              y2={yScale(i)}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          ))}

          {/* X-axis */}
          <line
            x1={padding.left}
            y1={padding.top + chartHeight}
            x2={svgWidth - padding.right}
            y2={padding.top + chartHeight}
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          />

          {/* Y-axis */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + chartHeight}
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          />

          {/* X-axis labels */}
          {[1, Math.floor(maxValue / 4), Math.floor(maxValue / 2), Math.floor((3 * maxValue) / 4), maxValue].map(
            (n) => (
              <text
                key={`x-label-${n}`}
                x={xScale(n)}
                y={padding.top + chartHeight + 20}
                textAnchor="middle"
                className="text-xs fill-foreground/70"
              >
                {n}
              </text>
            )
          )}

          {/* X-axis title */}
          <text
            x={svgWidth / 2}
            y={svgHeight - 5}
            textAnchor="middle"
            className="text-sm fill-foreground/70"
          >
            Number (n)
          </text>

          {/* Y-axis labels */}
          {Array.from({ length: Math.min(maxDivisors + 1, 10) }, (_, i) => {
            const value = Math.round((i / Math.min(maxDivisors, 9)) * maxDivisors)
            return (
              <text
                key={`y-label-${i}`}
                x={padding.left - 10}
                y={yScale(value) + 4}
                textAnchor="end"
                className="text-xs fill-foreground/70"
              >
                {value}
              </text>
            )
          })}

          {/* Y-axis title */}
          <text
            x={15}
            y={svgHeight / 2}
            textAnchor="middle"
            transform={`rotate(-90, 15, ${svgHeight / 2})`}
            className="text-sm fill-foreground/70"
          >
            Divisor Count
          </text>

          {/* Data points */}
          {data.map((d) => {
            const isActive = d.n === activeNumber
            const isPrimePoint = highlightPrimes && d.isPrime

            return (
              <g key={d.n}>
                <circle
                  cx={xScale(d.n)}
                  cy={yScale(d.divisorCount)}
                  r={isActive ? pointRadius * 1.5 : pointRadius}
                  fill={
                    isPrimePoint
                      ? "#ef4444"
                      : isActive
                      ? "#3b82f6"
                      : "#6b7280"
                  }
                  stroke={isActive ? "#fff" : "none"}
                  strokeWidth={isActive ? 2 : 0}
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredNumber(d.n)}
                  onMouseLeave={() => setHoveredNumber(null)}
                  onClick={() =>
                    setSelectedNumber(selectedNumber === d.n ? null : d.n)
                  }
                />
              </g>
            )
          })}

          {/* Legend */}
          {highlightPrimes && (
            <g transform={`translate(${svgWidth - padding.right - 100}, ${padding.top})`}>
              <circle cx={10} cy={0} r={5} fill="#ef4444" />
              <text x={20} y={4} className="text-xs fill-foreground/70">
                Prime
              </text>
              <circle cx={10} cy={20} r={5} fill="#6b7280" />
              <text x={20} y={24} className="text-xs fill-foreground/70">
                Composite
              </text>
            </g>
          )}
        </svg>

        {/* Info panel */}
        {activeData && (
          <div className="p-4 border-t border-primary/20 bg-primary/5">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <span className="text-lg font-bold text-primary">
                  n = {activeData.n}
                </span>
                {activeData.isPrime && (
                  <span className="ml-2 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-semibold">
                    PRIME
                  </span>
                )}
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Divisor count:</span>{" "}
                <span className="font-semibold">{activeData.divisorCount}</span>
              </div>
              <div className="text-sm flex-1">
                <span className="text-muted-foreground">Divisors:</span>{" "}
                <span className="font-mono">
                  {activeData.divisors.join(", ")}
                </span>
              </div>
            </div>
          </div>
        )}

        {!activeData && (
          <div className="p-4 border-t border-primary/20 bg-primary/5 text-center text-muted-foreground text-sm">
            Hover or click a point to see its divisors
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-3 flex-wrap items-center">
        {showDesmosLink && (
          <Button asChild size="sm" variant="outline">
            <a href={desmosUrl} target="_blank" rel="noopener noreferrer">
              Open in Desmos ↗
            </a>
          </Button>
        )}
        {selectedNumber && (
          <Button
            onClick={() => setSelectedNumber(null)}
            size="sm"
            variant="ghost"
          >
            Clear Selection
          </Button>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  )
}
