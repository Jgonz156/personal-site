"use client"

import { useMemo } from "react"

// ============================================================================
// Types
// ============================================================================

export interface HyperbolaGraphProps {
  numerator?: number // The k in y = k/x (default: 22)
  xRange?: [number, number] // X-axis range (default: [-10, 10])
  yRange?: [number, number] // Y-axis range (default: [-10, 10])
  highlightPoints?: number[] // X-values to mark on the curve
  showEquation?: boolean // Show the equation label
  height?: string
  caption?: string
  className?: string
}

// ============================================================================
// Component
// ============================================================================

export function HyperbolaGraph({
  numerator = 22,
  xRange = [-10, 10],
  yRange = [-10, 10],
  highlightPoints = [1, 2, 4, 11, 22, -1, -2],
  showEquation = true,
  height = "350px",
  caption,
  className = "",
}: HyperbolaGraphProps) {
  const svgWidth = 500
  const svgHeight = 350
  const padding = { top: 40, right: 40, bottom: 40, left: 50 }
  const chartWidth = svgWidth - padding.left - padding.right
  const chartHeight = svgHeight - padding.top - padding.bottom

  // Scaling functions
  const xScale = (x: number) => {
    const range = xRange[1] - xRange[0]
    return padding.left + ((x - xRange[0]) / range) * chartWidth
  }

  const yScale = (y: number) => {
    const range = yRange[1] - yRange[0]
    return padding.top + ((yRange[1] - y) / range) * chartHeight
  }

  // Generate hyperbola path points
  const generateHyperbolaPath = useMemo(() => {
    const paths: { positive: string; negative: string } = {
      positive: "",
      negative: "",
    }

    // Positive branch (x > 0)
    const positivePoints: string[] = []
    for (let x = 0.1; x <= xRange[1]; x += 0.1) {
      const y = numerator / x
      if (y >= yRange[0] && y <= yRange[1]) {
        const px = xScale(x)
        const py = yScale(y)
        positivePoints.push(`${px},${py}`)
      }
    }
    if (positivePoints.length > 0) {
      paths.positive = `M ${positivePoints.join(" L ")}`
    }

    // Negative branch (x < 0)
    const negativePoints: string[] = []
    for (let x = -0.1; x >= xRange[0]; x -= 0.1) {
      const y = numerator / x
      if (y >= yRange[0] && y <= yRange[1]) {
        const px = xScale(x)
        const py = yScale(y)
        negativePoints.push(`${px},${py}`)
      }
    }
    if (negativePoints.length > 0) {
      paths.negative = `M ${negativePoints.join(" L ")}`
    }

    return paths
  }, [numerator, xRange, yRange])

  // Generate highlighted points with their y values
  const points = useMemo(() => {
    return highlightPoints
      .filter((x) => x !== 0 && x >= xRange[0] && x <= xRange[1])
      .map((x) => {
        const y = numerator / x
        return {
          x,
          y,
          px: xScale(x),
          py: yScale(y),
          visible: y >= yRange[0] && y <= yRange[1],
        }
      })
      .filter((p) => p.visible)
  }, [highlightPoints, numerator, xRange, yRange])

  // Generate axis ticks
  const xTicks = useMemo(() => {
    const ticks: number[] = []
    const step = Math.ceil((xRange[1] - xRange[0]) / 10)
    for (let x = Math.ceil(xRange[0]); x <= xRange[1]; x += step) {
      if (x !== 0) ticks.push(x)
    }
    return ticks
  }, [xRange])

  const yTicks = useMemo(() => {
    const ticks: number[] = []
    const step = Math.ceil((yRange[1] - yRange[0]) / 10)
    for (let y = Math.ceil(yRange[0]); y <= yRange[1]; y += step) {
      if (y !== 0) ticks.push(y)
    }
    return ticks
  }, [yRange])

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
          {xTicks.map((x) => (
            <line
              key={`grid-x-${x}`}
              x1={xScale(x)}
              y1={padding.top}
              x2={xScale(x)}
              y2={svgHeight - padding.bottom}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          ))}
          {yTicks.map((y) => (
            <line
              key={`grid-y-${y}`}
              x1={padding.left}
              y1={yScale(y)}
              x2={svgWidth - padding.right}
              y2={yScale(y)}
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
          ))}

          {/* X-axis */}
          <line
            x1={padding.left}
            y1={yScale(0)}
            x2={svgWidth - padding.right}
            y2={yScale(0)}
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          />
          {/* X-axis arrow */}
          <polygon
            points={`${svgWidth - padding.right + 5},${yScale(0)} ${svgWidth - padding.right - 5},${yScale(0) - 5} ${svgWidth - padding.right - 5},${yScale(0) + 5}`}
            fill="currentColor"
            className="text-foreground"
          />

          {/* Y-axis */}
          <line
            x1={xScale(0)}
            y1={padding.top}
            x2={xScale(0)}
            y2={svgHeight - padding.bottom}
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          />
          {/* Y-axis arrow */}
          <polygon
            points={`${xScale(0)},${padding.top - 5} ${xScale(0) - 5},${padding.top + 5} ${xScale(0) + 5},${padding.top + 5}`}
            fill="currentColor"
            className="text-foreground"
          />

          {/* Axis labels */}
          <text
            x={svgWidth - padding.right + 15}
            y={yScale(0) + 5}
            className="text-sm fill-foreground/70"
          >
            x
          </text>
          <text
            x={xScale(0) + 10}
            y={padding.top - 10}
            className="text-sm fill-foreground/70"
          >
            y
          </text>

          {/* X-axis tick labels */}
          {xTicks.map((x) => (
            <text
              key={`x-label-${x}`}
              x={xScale(x)}
              y={yScale(0) + 18}
              textAnchor="middle"
              className="text-xs fill-foreground/70"
            >
              {x}
            </text>
          ))}

          {/* Y-axis tick labels */}
          {yTicks.map((y) => (
            <text
              key={`y-label-${y}`}
              x={xScale(0) - 10}
              y={yScale(y) + 4}
              textAnchor="end"
              className="text-xs fill-foreground/70"
            >
              {y}
            </text>
          ))}

          {/* Hyperbola curves */}
          <path
            d={generateHyperbolaPath.positive}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={generateHyperbolaPath.negative}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Highlighted points */}
          {points.map((point, i) => (
            <g key={`point-${point.x}`}>
              <circle
                cx={point.px}
                cy={point.py}
                r={6}
                fill="#ef4444"
                stroke="#fff"
                strokeWidth={2}
              />
              <text
                x={point.px + (point.x > 0 ? 12 : -12)}
                y={point.py - 8}
                textAnchor={point.x > 0 ? "start" : "end"}
                className="text-xs fill-foreground font-mono"
              >
                ({point.x}, {point.y.toFixed(1)})
              </text>
            </g>
          ))}

          {/* Equation label */}
          {showEquation && (
            <text
              x={svgWidth - padding.right - 10}
              y={padding.top + 20}
              textAnchor="end"
              className="text-base fill-blue-500 font-semibold"
            >
              y = {numerator}/x
            </text>
          )}

          {/* Annotation: infinite solutions */}
          <text
            x={svgWidth / 2}
            y={svgHeight - 10}
            textAnchor="middle"
            className="text-sm fill-foreground/60 italic"
          >
            Every point on this curve is a valid solution!
          </text>
        </svg>
      </div>

      {/* Info box */}
      <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>The problem:</strong> When we ask "find x such that {numerator}/x = y", almost{" "}
          <em>every</em> non-zero x is a valid answer! The solution space is
          continuous and infinite — not a useful question.
        </p>
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
