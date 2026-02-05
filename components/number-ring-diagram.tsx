"use client"

import { useMemo } from "react"

// ============================================================================
// Types
// ============================================================================

export interface NumberRingDiagramProps {
  modulus: number // The mod value (e.g., 5, 12)
  highlight?: number[] // Values to highlight on the ring (mod will be applied)
  showLabels?: boolean // Show position numbers (default: true)
  equivalentValues?: number[] // Show multiple values mapping to same position
  showArrows?: boolean // Show directional arrows between consecutive points
  size?: number // SVG size in pixels
  caption?: string
  className?: string
}

// ============================================================================
// Helper Functions
// ============================================================================

function getPointPosition(
  index: number,
  total: number,
  centerX: number,
  centerY: number,
  radius: number
): { x: number; y: number } {
  // Start at top (12 o'clock position) and go clockwise
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  }
}

// ============================================================================
// Component
// ============================================================================

export function NumberRingDiagram({
  modulus,
  highlight = [],
  showLabels = true,
  equivalentValues = [],
  showArrows = false,
  size = 280,
  caption,
  className = "",
}: NumberRingDiagramProps) {
  const centerX = size / 2
  const centerY = size / 2
  const radius = size * 0.35
  const pointRadius = Math.max(8, Math.min(16, 120 / modulus))
  const labelOffset = pointRadius + 15

  // Normalize highlight values to modulus
  const highlightedPositions = useMemo(() => {
    const positions = new Set<number>()
    highlight.forEach((v) => {
      const pos = ((v % modulus) + modulus) % modulus
      positions.add(pos)
    })
    return positions
  }, [highlight, modulus])

  // Group equivalent values by their mod position
  const equivalentByPosition = useMemo(() => {
    const map = new Map<number, number[]>()
    equivalentValues.forEach((v) => {
      const pos = ((v % modulus) + modulus) % modulus
      if (!map.has(pos)) {
        map.set(pos, [])
      }
      map.get(pos)!.push(v)
    })
    return map
  }, [equivalentValues, modulus])

  // Generate points
  const points = useMemo(() => {
    return Array.from({ length: modulus }, (_, i) => ({
      index: i,
      position: getPointPosition(i, modulus, centerX, centerY, radius),
      isHighlighted: highlightedPositions.has(i),
      equivalents: equivalentByPosition.get(i) || [],
    }))
  }, [modulus, centerX, centerY, radius, highlightedPositions, equivalentByPosition])

  return (
    <div className={`my-6 flex flex-col items-center ${className}`}>
      <div className="border-2 border-primary/30 rounded-lg bg-background overflow-hidden p-4">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block"
        >
          {/* Ring circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground/30"
          />

          {/* Directional arrows (optional) */}
          {showArrows &&
            points.map((point, i) => {
              const nextPoint = points[(i + 1) % modulus]
              const midAngle =
                ((i + 0.5) / modulus) * 2 * Math.PI - Math.PI / 2
              const arrowRadius = radius
              const arrowX = centerX + arrowRadius * Math.cos(midAngle)
              const arrowY = centerY + arrowRadius * Math.sin(midAngle)

              // Arrow direction (tangent to circle)
              const tangentAngle = midAngle + Math.PI / 2
              const arrowLength = 6
              const dx = Math.cos(tangentAngle) * arrowLength
              const dy = Math.sin(tangentAngle) * arrowLength

              return (
                <polygon
                  key={`arrow-${i}`}
                  points={`
                    ${arrowX},${arrowY}
                    ${arrowX - dx - dy * 0.5},${arrowY - dy + dx * 0.5}
                    ${arrowX - dx + dy * 0.5},${arrowY - dy - dx * 0.5}
                  `}
                  fill="currentColor"
                  className="text-foreground/40"
                />
              )
            })}

          {/* Points */}
          {points.map((point) => (
            <g key={point.index}>
              {/* Point circle */}
              <circle
                cx={point.position.x}
                cy={point.position.y}
                r={pointRadius}
                fill={point.isHighlighted ? "#3b82f6" : "currentColor"}
                stroke={point.isHighlighted ? "#fff" : "none"}
                strokeWidth={point.isHighlighted ? 2 : 0}
                className={point.isHighlighted ? "" : "text-foreground"}
              />

              {/* Position label (inside or near point) */}
              {showLabels && (
                <text
                  x={point.position.x}
                  y={point.position.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`text-xs font-bold ${
                    point.isHighlighted
                      ? "fill-white"
                      : "fill-background"
                  }`}
                  style={{ fontSize: `${Math.max(10, pointRadius - 2)}px` }}
                >
                  {point.index}
                </text>
              )}

              {/* Equivalent values label (outside the ring) */}
              {point.equivalents.length > 0 && (
                <text
                  x={
                    centerX +
                    (radius + labelOffset) *
                      Math.cos(
                        (point.index / modulus) * 2 * Math.PI - Math.PI / 2
                      )
                  }
                  y={
                    centerY +
                    (radius + labelOffset) *
                      Math.sin(
                        (point.index / modulus) * 2 * Math.PI - Math.PI / 2
                      )
                  }
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-xs fill-primary font-mono"
                >
                  {point.equivalents.join(", ")}
                </text>
              )}
            </g>
          ))}

          {/* Center label showing modulus */}
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-lg font-bold fill-foreground/50"
          >
            mod {modulus}
          </text>
        </svg>
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
