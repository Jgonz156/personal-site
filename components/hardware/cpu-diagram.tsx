"use client"

import { cn } from "@/lib/utils"

// Canonical dimensions - all internal calculations use these
const CANONICAL_WIDTH = 200
const CANONICAL_HEIGHT = 160
const CANONICAL_FONT_SIZE = 10
const CANONICAL_PADDING = 10

export interface CPUDiagramProps {
  width?: number
  height?: number
  highlightParts?: string[]
  showLabels?: boolean
  ringLevel?: 0 | 3
  className?: string
  onClick?: () => void
}

export function CPUDiagram({
  width = CANONICAL_WIDTH,
  height = CANONICAL_HEIGHT,
  highlightParts = [],
  showLabels = true,
  ringLevel = 3,
  className,
  onClick,
}: CPUDiagramProps) {
  // Use canonical dimensions for all internal calculations
  const fontSize = CANONICAL_FONT_SIZE
  const padding = CANONICAL_PADDING

  const isHighlighted = (part: string) => highlightParts.includes(part)

  // Calculate internal component positions using canonical dimensions
  const innerWidth = CANONICAL_WIDTH - padding * 2
  const innerHeight = CANONICAL_HEIGHT - padding * 2

  // Register grid (top-left area)
  const regGridCols = 4
  const regGridRows = 2
  const regWidth = (innerWidth * 0.35) / regGridCols
  const regHeight = (innerHeight * 0.25) / regGridRows
  const regStartX = padding + 4
  const regStartY = padding + 4

  // ALU (center-right)
  const aluSize = Math.min(innerWidth, innerHeight) * 0.25
  const aluX = CANONICAL_WIDTH * 0.6
  const aluY = CANONICAL_HEIGHT * 0.35

  // Control Unit (center-left)
  const cuWidth = innerWidth * 0.35
  const cuHeight = innerHeight * 0.25
  const cuX = padding + 4
  const cuY = CANONICAL_HEIGHT * 0.45

  // Security Ring Bit (bottom center)
  const ringSize = Math.min(innerWidth, innerHeight) * 0.12
  const ringX = CANONICAL_WIDTH * 0.5
  const ringY = CANONICAL_HEIGHT * 0.75

  // Edge components
  const mmuWidth = innerWidth * 0.3
  const mmuHeight = padding * 1.5
  const mmuX = CANONICAL_WIDTH * 0.15
  const mmuY = CANONICAL_HEIGHT - mmuHeight - 2

  const intWidth = innerWidth * 0.25
  const intHeight = padding * 1.5
  const intX = CANONICAL_WIDTH * 0.65
  const intY = CANONICAL_HEIGHT - intHeight - 2

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${CANONICAL_WIDTH} ${CANONICAL_HEIGHT}`}
      className={cn("cursor-pointer transition-transform hover:scale-105", className)}
      onClick={onClick}
    >
      {/* CPU Package outline with notch */}
      <rect
        x={2}
        y={2}
        width={CANONICAL_WIDTH - 4}
        height={CANONICAL_HEIGHT - 4}
        rx={8}
        ry={8}
        className={cn(
          "fill-purple-500/20 stroke-purple-600 stroke-2",
          "dark:fill-purple-500/30 dark:stroke-purple-400"
        )}
      />
      {/* Corner notch (top-left) */}
      <polygon
        points={`2,20 2,2 20,2`}
        className="fill-background stroke-purple-600 stroke-2 dark:stroke-purple-400"
      />

      {/* Registers - grid of small rectangles */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("registers") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        {Array.from({ length: regGridRows }).map((_, row) =>
          Array.from({ length: regGridCols }).map((_, col) => (
            <rect
              key={`reg-${row}-${col}`}
              x={regStartX + col * (regWidth + 2)}
              y={regStartY + row * (regHeight + 2)}
              width={regWidth}
              height={regHeight}
              rx={2}
              className={cn(
                "fill-purple-300/50 stroke-purple-500 stroke-1",
                "dark:fill-purple-400/40 dark:stroke-purple-300"
              )}
            />
          ))
        )}
        {showLabels && (
          <text
            x={regStartX + (regGridCols * (regWidth + 2)) / 2}
            y={regStartY + regGridRows * (regHeight + 2) + fontSize + 2}
            fontSize={fontSize}
            textAnchor="middle"
            className="fill-purple-700 dark:fill-purple-300"
          >
            Registers
          </text>
        )}
      </g>

      {/* ALU - Diamond/Hexagon shape */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("alu") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <polygon
          points={`
            ${aluX},${aluY - aluSize / 2}
            ${aluX + aluSize / 2},${aluY}
            ${aluX},${aluY + aluSize / 2}
            ${aluX - aluSize / 2},${aluY}
          `}
          className={cn(
            "fill-purple-400/60 stroke-purple-600 stroke-2",
            "dark:fill-purple-500/50 dark:stroke-purple-300"
          )}
        />
        {showLabels && (
          <text
            x={aluX}
            y={aluY + 4}
            fontSize={fontSize}
            textAnchor="middle"
            className="fill-purple-800 dark:fill-purple-200 font-semibold"
          >
            ALU
          </text>
        )}
      </g>

      {/* Control Unit - Rounded rectangle */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("cu") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={cuX}
          y={cuY}
          width={cuWidth}
          height={cuHeight}
          rx={6}
          className={cn(
            "fill-purple-300/50 stroke-purple-600 stroke-2",
            "dark:fill-purple-400/40 dark:stroke-purple-300"
          )}
        />
        {showLabels && (
          <text
            x={cuX + cuWidth / 2}
            y={cuY + cuHeight / 2 + fontSize / 3}
            fontSize={fontSize}
            textAnchor="middle"
            className="fill-purple-800 dark:fill-purple-200 font-semibold"
          >
            Control Unit
          </text>
        )}
      </g>

      {/* Security Ring Bit - Circle with 0 or 3 */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("ring") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <circle
          cx={ringX}
          cy={ringY}
          r={ringSize}
          className={cn(
            ringLevel === 0
              ? "fill-red-500/60 stroke-red-600 stroke-2"
              : "fill-green-500/60 stroke-green-600 stroke-2",
            ringLevel === 0
              ? "dark:fill-red-500/50 dark:stroke-red-400"
              : "dark:fill-green-500/50 dark:stroke-green-400"
          )}
        />
        <text
          x={ringX}
          y={ringY + fontSize / 3}
          fontSize={fontSize * 1.2}
          textAnchor="middle"
          className={cn(
            "font-bold",
            ringLevel === 0 ? "fill-red-900 dark:fill-red-200" : "fill-green-900 dark:fill-green-200"
          )}
        >
          {ringLevel}
        </text>
        {showLabels && (
          <text
            x={ringX}
            y={ringY + ringSize + fontSize + 2}
            fontSize={fontSize * 0.9}
            textAnchor="middle"
            className="fill-muted-foreground"
          >
            Ring
          </text>
        )}
      </g>

      {/* MMU - Edge component (bottom-left) */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("mmu") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={mmuX}
          y={mmuY}
          width={mmuWidth}
          height={mmuHeight}
          rx={3}
          className={cn(
            "fill-purple-200/60 stroke-purple-500 stroke-1",
            "dark:fill-purple-600/40 dark:stroke-purple-400"
          )}
        />
        {showLabels && (
          <text
            x={mmuX + mmuWidth / 2}
            y={mmuY + mmuHeight / 2 + fontSize / 3}
            fontSize={fontSize * 0.85}
            textAnchor="middle"
            className="fill-purple-700 dark:fill-purple-300"
          >
            MMU
          </text>
        )}
      </g>

      {/* Interrupt Handler - Edge component (bottom-right) with lightning bolt */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("interrupt") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={intX}
          y={intY}
          width={intWidth}
          height={intHeight}
          rx={3}
          className={cn(
            "fill-yellow-200/60 stroke-yellow-600 stroke-1",
            "dark:fill-yellow-600/40 dark:stroke-yellow-400"
          )}
        />
        {/* Lightning bolt icon */}
        <path
          d={`M${intX + 8},${intY + intHeight * 0.2} L${intX + 5},${intY + intHeight * 0.55} L${intX + 8},${intY + intHeight * 0.55} L${intX + 5},${intY + intHeight * 0.9}`}
          className="fill-none stroke-yellow-700 stroke-1 dark:stroke-yellow-300"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {showLabels && (
          <text
            x={intX + intWidth / 2 + 4}
            y={intY + intHeight / 2 + fontSize / 3}
            fontSize={fontSize * 0.75}
            textAnchor="middle"
            className="fill-yellow-800 dark:fill-yellow-200"
          >
            INT
          </text>
        )}
      </g>

      {/* Pin pattern at bottom edge (for puzzle piece connection) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={`pin-${i}`}
          x={padding + 10 + i * ((CANONICAL_WIDTH - padding * 2 - 20) / 8)}
          y={CANONICAL_HEIGHT - 4}
          width={6}
          height={4}
          className="fill-purple-400 dark:fill-purple-500"
        />
      ))}
    </svg>
  )
}
