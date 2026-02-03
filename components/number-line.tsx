"use client"

import { useState, useEffect, useId } from "react"
import { Button } from "@/components/ui/button"

// ============================================================================
// Types
// ============================================================================

export interface NumberLineProps {
  // Display configuration
  min?: number // Left bound (default: 0)
  max?: number // Right bound (default: 10)
  showNumbers?: boolean // Whether to show tick labels (default: true)
  showTickMarks?: boolean // Whether to show tick marks (default: true)

  // Animation
  start: number // Starting position
  hops: number[] // Array of hop distances (positive = right, negative = left)
  animated?: boolean // Enable step-through animation (default: true)
  showResult?: boolean // Show final position highlighted (default: true)
  hopLabels?: string[] // Optional labels for each hop (e.g., ["+1", "+4"])

  // Styling
  height?: string // CSS height (default: "120px")
  width?: string // CSS width (default: "100%")
  caption?: string // Optional caption below
  className?: string
}

// ============================================================================
// Component
// ============================================================================

export function NumberLine({
  min = 0,
  max = 10,
  showNumbers = true,
  showTickMarks = true,
  start,
  hops,
  animated = true,
  showResult = true,
  hopLabels,
  height = "120px",
  width = "100%",
  caption,
  className = "",
}: NumberLineProps) {
  const id = useId()
  const [currentStep, setCurrentStep] = useState(animated ? -1 : hops.length)
  const [isPlaying, setIsPlaying] = useState(false)

  // Calculate positions
  const range = max - min
  const padding = 40 // SVG padding
  const svgWidth = 600
  const svgHeight = 100
  const lineY = 60
  const tickHeight = 8

  // Convert value to x coordinate
  const valueToX = (value: number) => {
    return padding + ((value - min) / range) * (svgWidth - 2 * padding)
  }

  // Calculate current position based on step
  const calculatePosition = (step: number) => {
    let pos = start
    for (let i = 0; i <= step && i < hops.length; i++) {
      pos += hops[i]
    }
    return pos
  }

  const currentPosition = currentStep >= 0 ? calculatePosition(currentStep) : start
  const finalPosition = calculatePosition(hops.length - 1)

  // Generate tick marks
  const ticks = []
  for (let i = min; i <= max; i++) {
    ticks.push(i)
  }

  // Auto-play animation
  useEffect(() => {
    if (isPlaying && currentStep < hops.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    } else if (isPlaying && currentStep >= hops.length - 1) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentStep, hops.length])

  // Generate hop arc path
  const generateArc = (fromX: number, toX: number, hopIndex: number) => {
    const midX = (fromX + toX) / 2
    const arcHeight = 25 + (hopIndex % 2) * 10 // Alternate heights for overlapping hops
    const direction = toX > fromX ? 1 : -1
    
    // Create a smooth arc
    return `M ${fromX} ${lineY} Q ${midX} ${lineY - arcHeight} ${toX} ${lineY}`
  }

  // Calculate all hops up to current step
  const visibleHops = []
  let hopStart = start
  for (let i = 0; i <= currentStep && i < hops.length; i++) {
    const hopEnd = hopStart + hops[i]
    visibleHops.push({
      fromX: valueToX(hopStart),
      toX: valueToX(hopEnd),
      label: hopLabels?.[i] || `${hops[i] >= 0 ? "+" : ""}${hops[i]}`,
      index: i,
    })
    hopStart = hopEnd
  }

  const handleStep = () => {
    if (currentStep < hops.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleReset = () => {
    setCurrentStep(-1)
    setIsPlaying(false)
  }

  const handlePlayAll = () => {
    setCurrentStep(-1)
    setTimeout(() => {
      setCurrentStep(0)
      setIsPlaying(true)
    }, 100)
  }

  const handleShowAll = () => {
    setCurrentStep(hops.length - 1)
    setIsPlaying(false)
  }

  // Colors
  const hopColors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // purple
    "#ec4899", // pink
  ]

  return (
    <div className={`my-6 ${className}`}>
      <div
        className="border-2 border-primary/30 rounded-lg bg-background overflow-hidden"
        style={{ height, width }}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Main line */}
          <line
            x1={padding - 10}
            y1={lineY}
            x2={svgWidth - padding + 10}
            y2={lineY}
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground"
          />

          {/* Arrowheads */}
          <polygon
            points={`${svgWidth - padding + 10},${lineY} ${svgWidth - padding},${lineY - 5} ${svgWidth - padding},${lineY + 5}`}
            fill="currentColor"
            className="text-foreground"
          />

          {/* Tick marks and labels */}
          {ticks.map((tick) => (
            <g key={tick}>
              {showTickMarks && (
                <line
                  x1={valueToX(tick)}
                  y1={lineY - tickHeight / 2}
                  x2={valueToX(tick)}
                  y2={lineY + tickHeight / 2}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-foreground/70"
                />
              )}
              {showNumbers && (
                <text
                  x={valueToX(tick)}
                  y={lineY + 20}
                  textAnchor="middle"
                  className="text-xs fill-foreground/70"
                  style={{ fontSize: "11px" }}
                >
                  {tick}
                </text>
              )}
            </g>
          ))}

          {/* Hop arcs */}
          {visibleHops.map((hop, i) => (
            <g key={`hop-${hop.index}`}>
              {/* Arc path */}
              <path
                d={generateArc(hop.fromX, hop.toX, hop.index)}
                fill="none"
                stroke={hopColors[hop.index % hopColors.length]}
                strokeWidth="2.5"
                strokeLinecap="round"
                markerEnd={`url(#arrowhead-${id}-${hop.index})`}
              />
              {/* Arrowhead definition */}
              <defs>
                <marker
                  id={`arrowhead-${id}-${hop.index}`}
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 6 3, 0 6"
                    fill={hopColors[hop.index % hopColors.length]}
                  />
                </marker>
              </defs>
              {/* Hop label */}
              <text
                x={(hop.fromX + hop.toX) / 2}
                y={lineY - 30 - (hop.index % 2) * 12}
                textAnchor="middle"
                fill={hopColors[hop.index % hopColors.length]}
                style={{ fontSize: "12px", fontWeight: "bold" }}
              >
                {hop.label}
              </text>
            </g>
          ))}

          {/* Starting position marker */}
          <circle
            cx={valueToX(start)}
            cy={lineY}
            r="6"
            fill="#6b7280"
            stroke="white"
            strokeWidth="2"
          />

          {/* Current position marker */}
          {currentStep >= 0 && (
            <circle
              cx={valueToX(currentPosition)}
              cy={lineY}
              r="8"
              fill={
                showResult && currentStep === hops.length - 1
                  ? "#22c55e"
                  : "#3b82f6"
              }
              stroke="white"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          )}

          {/* Result highlight */}
          {showResult && currentStep === hops.length - 1 && (
            <text
              x={valueToX(finalPosition)}
              y={lineY + 35}
              textAnchor="middle"
              className="fill-green-500"
              style={{ fontSize: "12px", fontWeight: "bold" }}
            >
              = {finalPosition}
            </text>
          )}
        </svg>
      </div>

      {/* Controls */}
      {animated && (
        <div className="flex gap-2 mt-3 flex-wrap">
          <Button
            onClick={handleStep}
            size="sm"
            variant="outline"
            disabled={currentStep >= hops.length - 1}
          >
            Step →
          </Button>
          <Button
            onClick={handlePlayAll}
            size="sm"
            variant="outline"
            disabled={isPlaying}
          >
            ▶ Play
          </Button>
          <Button
            onClick={handleShowAll}
            size="sm"
            variant="outline"
          >
            Show All
          </Button>
          <Button onClick={handleReset} size="sm" variant="ghost">
            Reset
          </Button>
        </div>
      )}

      {/* Caption */}
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </p>
      )}
    </div>
  )
}
