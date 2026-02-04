"use client"

import { cn } from "@/lib/utils"

export interface MemoryLayoutDiagramProps {
  width?: number
  height?: number
  highlightSection?: "text" | "data" | "heap" | "stack" | "gap"
  showAddresses?: boolean
  showLabels?: boolean
  heapSize?: number // 0-50 (percentage of available space)
  stackSize?: number // 0-50 (percentage of available space)
  className?: string
}

export function MemoryLayoutDiagram({
  width = 180,
  height = 300,
  highlightSection,
  showAddresses = true,
  showLabels = true,
  heapSize = 25,
  stackSize = 20,
  className,
}: MemoryLayoutDiagramProps) {
  const padding = 8
  const innerWidth = width - padding * 2
  const innerHeight = height - padding * 2

  // Section heights (relative)
  const textHeight = innerHeight * 0.15
  const dataHeight = innerHeight * 0.12
  const heapHeight = innerHeight * (heapSize / 100)
  const stackHeight = innerHeight * (stackSize / 100)
  const gapHeight = innerHeight - textHeight - dataHeight - heapHeight - stackHeight

  // Y positions (from top: high addresses at top, low at bottom)
  const stackY = padding
  const gapY = stackY + stackHeight
  const heapY = gapY + gapHeight
  const dataY = heapY + heapHeight
  const textY = dataY + dataHeight

  const fontSize = 10

  const isHighlighted = (section: string) => highlightSection === section

  const Section = ({
    y,
    height: h,
    label,
    sublabel,
    section,
    colorClass,
    addressHigh,
    addressLow,
    growDirection,
  }: {
    y: number
    height: number
    label: string
    sublabel?: string
    section: string
    colorClass: string
    addressHigh?: string
    addressLow?: string
    growDirection?: "up" | "down"
  }) => (
    <g
      className={cn(
        "transition-opacity",
        isHighlighted(section) ? "opacity-100" : highlightSection ? "opacity-40" : "opacity-100"
      )}
    >
      <rect
        x={padding + 30}
        y={y}
        width={innerWidth - 30}
        height={h}
        rx={4}
        className={cn(
          colorClass,
          isHighlighted(section) && "stroke-2"
        )}
      />
      {showLabels && h > 20 && (
        <>
          <text
            x={padding + 30 + (innerWidth - 30) / 2}
            y={y + h / 2 - (sublabel ? 4 : 0)}
            fontSize={fontSize}
            textAnchor="middle"
            className="fill-foreground font-semibold"
          >
            {label}
          </text>
          {sublabel && (
            <text
              x={padding + 30 + (innerWidth - 30) / 2}
              y={y + h / 2 + 10}
              fontSize={fontSize * 0.8}
              textAnchor="middle"
              className="fill-muted-foreground"
            >
              {sublabel}
            </text>
          )}
        </>
      )}
      {showAddresses && addressHigh && (
        <text
          x={padding + 25}
          y={y + 10}
          fontSize={fontSize * 0.7}
          textAnchor="end"
          className="fill-muted-foreground font-mono"
        >
          {addressHigh}
        </text>
      )}
      {showAddresses && addressLow && (
        <text
          x={padding + 25}
          y={y + h - 4}
          fontSize={fontSize * 0.7}
          textAnchor="end"
          className="fill-muted-foreground font-mono"
        >
          {addressLow}
        </text>
      )}
      {/* Growth direction arrow */}
      {growDirection && h > 30 && (
        <g>
          <line
            x1={width - padding - 15}
            y1={growDirection === "down" ? y + 10 : y + h - 10}
            x2={width - padding - 15}
            y2={growDirection === "down" ? y + h - 10 : y + 10}
            className="stroke-foreground/50 stroke-1"
            markerEnd="url(#growth-arrow)"
          />
          <text
            x={width - padding - 8}
            y={y + h / 2}
            fontSize={fontSize * 0.7}
            className="fill-muted-foreground"
            transform={`rotate(90, ${width - padding - 8}, ${y + h / 2})`}
          >
            grows
          </text>
        </g>
      )}
    </g>
  )

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("", className)}
    >
      {/* Border */}
      <rect
        x={padding}
        y={padding}
        width={innerWidth}
        height={innerHeight}
        rx={6}
        className="fill-none stroke-border stroke-1"
      />

      {/* Stack (high addresses) */}
      <Section
        y={stackY}
        height={stackHeight}
        label="Stack"
        sublabel="Local vars, calls"
        section="stack"
        colorClass="fill-blue-500/30 stroke-blue-500 dark:fill-blue-500/20"
        growDirection="down"
      />

      {/* Gap (unallocated) */}
      <Section
        y={gapY}
        height={gapHeight}
        label=""
        section="gap"
        colorClass="fill-transparent stroke-dashed stroke-muted-foreground/30"
      />
      {gapHeight > 40 && (
        <text
          x={padding + 30 + (innerWidth - 30) / 2}
          y={gapY + gapHeight / 2}
          fontSize={fontSize * 0.9}
          textAnchor="middle"
          className="fill-muted-foreground/50"
        >
          ↕ free space ↕
        </text>
      )}

      {/* Heap */}
      <Section
        y={heapY}
        height={heapHeight}
        label="Heap"
        sublabel="Dynamic alloc"
        section="heap"
        colorClass="fill-green-500/30 stroke-green-500 dark:fill-green-500/20"
        growDirection="up"
      />

      {/* Data/Static */}
      <Section
        y={dataY}
        height={dataHeight}
        label="Data"
        sublabel="Globals"
        section="data"
        colorClass="fill-yellow-500/30 stroke-yellow-500 dark:fill-yellow-500/20"
      />

      {/* Text (low addresses) */}
      <Section
        y={textY}
        height={textHeight}
        label="Text"
        sublabel="Code"
        section="text"
        colorClass="fill-purple-500/30 stroke-purple-500 dark:fill-purple-500/20"
      />

      {/* High/Low address labels - positioned outside the diagram */}
      {showAddresses && (
        <>
          <text
            x={padding + 30 + (innerWidth - 30) / 2}
            y={padding - 2}
            fontSize={fontSize * 0.7}
            textAnchor="middle"
            className="fill-muted-foreground font-semibold"
          >
            High Addresses (0xFFFF...)
          </text>
          <text
            x={padding + 30 + (innerWidth - 30) / 2}
            y={height - padding + fontSize + 4}
            fontSize={fontSize * 0.7}
            textAnchor="middle"
            className="fill-muted-foreground font-semibold"
          >
            Low Addresses (0x0000...)
          </text>
        </>
      )}

      {/* Arrow marker */}
      <defs>
        <marker
          id="growth-arrow"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" className="fill-foreground/50" />
        </marker>
      </defs>
    </svg>
  )
}
