"use client"

import { cn } from "@/lib/utils"

// Canonical dimensions - all internal calculations use these
const CANONICAL_WIDTH = 260
const CANONICAL_HEIGHT = 70
const CANONICAL_FONT_SIZE = 9
const CANONICAL_PADDING = 6

export interface RAMDiagramProps {
  width?: number
  height?: number
  highlightParts?: string[]
  showLabels?: boolean
  activeAddress?: number
  className?: string
  onClick?: () => void
}

export function RAMDiagram({
  width = CANONICAL_WIDTH,
  height = CANONICAL_HEIGHT,
  highlightParts = [],
  showLabels = true,
  activeAddress,
  className,
  onClick,
}: RAMDiagramProps) {
  // Use canonical dimensions for all internal calculations
  const fontSize = CANONICAL_FONT_SIZE
  const padding = CANONICAL_PADDING

  const isHighlighted = (part: string) => highlightParts.includes(part)

  // NAND chip grid
  const chipCols = 8
  const chipRows = 2
  const chipAreaWidth = CANONICAL_WIDTH * 0.7
  const chipWidth = (chipAreaWidth - (chipCols - 1) * 3) / chipCols
  const chipHeight = (CANONICAL_HEIGHT - padding * 2 - 20) / chipRows - 2
  const chipStartX = padding + 8
  const chipStartY = padding + 6

  // Memory controller
  const ctrlWidth = CANONICAL_WIDTH * 0.2
  const ctrlHeight = CANONICAL_HEIGHT - padding * 2 - 8
  const ctrlX = CANONICAL_WIDTH - ctrlWidth - padding - 4
  const ctrlY = padding + 4

  // Notch positions (for DIMM slot connection)
  const notchWidth = 8
  const notchHeight = 6
  const notch1X = CANONICAL_WIDTH * 0.35
  const notch2X = CANONICAL_WIDTH * 0.65

  // Calculate which chip is "active" based on activeAddress
  const activeChipIndex = activeAddress !== undefined 
    ? activeAddress % (chipCols * chipRows) 
    : -1

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${CANONICAL_WIDTH} ${CANONICAL_HEIGHT}`}
      className={cn("cursor-pointer transition-transform hover:scale-105", className)}
      onClick={onClick}
    >
      {/* DIMM stick outline */}
      <rect
        x={2}
        y={2}
        width={CANONICAL_WIDTH - 4}
        height={CANONICAL_HEIGHT - 4}
        rx={4}
        ry={4}
        className={cn(
          "fill-cyan-500/20 stroke-cyan-600 stroke-2",
          "dark:fill-cyan-500/30 dark:stroke-cyan-400"
        )}
      />

      {/* Notches at bottom edge (DIMM slot keying) */}
      <rect
        x={notch1X - notchWidth / 2}
        y={CANONICAL_HEIGHT - notchHeight}
        width={notchWidth}
        height={notchHeight}
        className="fill-background stroke-cyan-600 stroke-1 dark:stroke-cyan-400"
      />
      <rect
        x={notch2X - notchWidth / 2}
        y={CANONICAL_HEIGHT - notchHeight}
        width={notchWidth}
        height={notchHeight}
        className="fill-background stroke-cyan-600 stroke-1 dark:stroke-cyan-400"
      />

      {/* NAND Chips - Grid of small squares */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("nand") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        {Array.from({ length: chipRows }).map((_, row) =>
          Array.from({ length: chipCols }).map((_, col) => {
            const chipIndex = row * chipCols + col
            const isActive = chipIndex === activeChipIndex
            return (
              <rect
                key={`chip-${row}-${col}`}
                x={chipStartX + col * (chipWidth + 3)}
                y={chipStartY + row * (chipHeight + 4)}
                width={chipWidth}
                height={chipHeight}
                rx={2}
                className={cn(
                  isActive
                    ? "fill-cyan-400 stroke-cyan-600 stroke-2"
                    : "fill-cyan-300/50 stroke-cyan-500 stroke-1",
                  isActive
                    ? "dark:fill-cyan-500 dark:stroke-cyan-300"
                    : "dark:fill-cyan-400/40 dark:stroke-cyan-400"
                )}
              />
            )
          })
        )}
        {showLabels && (
          <text
            x={chipStartX + chipAreaWidth / 2 - 10}
            y={CANONICAL_HEIGHT - 8}
            fontSize={fontSize}
            textAnchor="middle"
            className="fill-cyan-700 dark:fill-cyan-300"
          >
            NAND Flash
          </text>
        )}
      </g>

      {/* Memory Controller */}
      <g className={cn(
        "transition-opacity",
        isHighlighted("controller") ? "opacity-100" : highlightParts.length > 0 ? "opacity-40" : "opacity-100"
      )}>
        <rect
          x={ctrlX}
          y={ctrlY}
          width={ctrlWidth}
          height={ctrlHeight}
          rx={4}
          className={cn(
            "fill-cyan-400/60 stroke-cyan-600 stroke-2",
            "dark:fill-cyan-500/50 dark:stroke-cyan-300"
          )}
        />
        {showLabels && (
          <text
            x={ctrlX + ctrlWidth / 2}
            y={ctrlY + ctrlHeight / 2}
            fontSize={fontSize * 0.9}
            textAnchor="middle"
            className="fill-cyan-800 dark:fill-cyan-200"
          >
            <tspan x={ctrlX + ctrlWidth / 2} dy="-0.3em">Mem</tspan>
            <tspan x={ctrlX + ctrlWidth / 2} dy="1.1em">Ctrl</tspan>
          </text>
        )}
      </g>

      {/* Connection traces from chips to controller */}
      <g className="stroke-cyan-400/50 dark:stroke-cyan-500/50 stroke-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={`trace-${i}`}
            x1={chipStartX + chipAreaWidth - 5}
            y1={chipStartY + 5 + i * ((chipRows * (chipHeight + 4)) / 4)}
            x2={ctrlX}
            y2={ctrlY + 8 + i * (ctrlHeight / 4)}
          />
        ))}
      </g>

      {/* Edge pins for connection to motherboard slot */}
      {Array.from({ length: 12 }).map((_, i) => {
        // Skip positions where notches are
        const pinX = padding + 8 + i * ((CANONICAL_WIDTH - padding * 2 - 16) / 12)
        const isNotchArea = 
          (pinX > notch1X - notchWidth && pinX < notch1X + notchWidth) ||
          (pinX > notch2X - notchWidth && pinX < notch2X + notchWidth)
        if (isNotchArea) return null
        return (
          <rect
            key={`pin-${i}`}
            x={pinX}
            y={CANONICAL_HEIGHT - 4}
            width={4}
            height={4}
            className="fill-cyan-400 dark:fill-cyan-500"
          />
        )
      })}
    </svg>
  )
}
