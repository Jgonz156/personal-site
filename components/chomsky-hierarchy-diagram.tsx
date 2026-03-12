"use client"

import { useId } from "react"

interface ChomskyHierarchyDiagramProps {
  height?: string
  width?: string
  caption?: string
  showOuterLabel?: boolean
}

const LAYERS = [
  { label: "RE", sublabel: "Type 0 — Recursively Enumerable" },
  { label: "CS", sublabel: "Type 1 — Context-Sensitive" },
  { label: "CF", sublabel: "Type 2 — Context-Free" },
  { label: "REG", sublabel: "Type 3 — Regular" },
]

const COLORS = [
  { fill: "rgba(239, 68, 68, 0.12)", stroke: "#ef4444" },
  { fill: "rgba(234, 179, 8, 0.16)", stroke: "#eab308" },
  { fill: "rgba(34, 197, 94, 0.20)", stroke: "#22c55e" },
  { fill: "rgba(59, 130, 246, 0.25)", stroke: "#3b82f6" },
]

const VIEW_WIDTH = 520
const VIEW_HEIGHT = 340

export function ChomskyHierarchyDiagram({
  height = "340px",
  width = "100%",
  caption,
  showOuterLabel = true,
}: ChomskyHierarchyDiagramProps) {
  const idPrefix = useId().replace(/:/g, "")

  const cx = VIEW_WIDTH / 2
  const cy = VIEW_HEIGHT / 2 + 10

  const layerCount = LAYERS.length
  const maxRx = 230
  const maxRy = 130
  const minRx = 60
  const minRy = 35

  const rings = LAYERS.map((layer, i) => {
    const t = i / (layerCount - 1)
    const rx = minRx + (maxRx - minRx) * (1 - t)
    const ry = minRy + (maxRy - minRy) * (1 - t)
    return { ...layer, rx, ry, color: COLORS[i] }
  })

  return (
    <div className="my-6">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        style={{ height, width, maxWidth: "100%" }}
        className="border-2 border-primary/30 rounded-lg bg-background"
        role="img"
        aria-label="Chomsky Hierarchy: concentric rings showing REG ⊂ CF ⊂ CS ⊂ RE"
      >
        {showOuterLabel && (
          <text
            x={VIEW_WIDTH - 12}
            y={20}
            textAnchor="end"
            className="fill-muted-foreground"
            style={{ fontSize: "11px", fontStyle: "italic" }}
          >
            P(Σ*) — All Languages
          </text>
        )}

        {rings.map((ring, i) => (
          <g key={`${idPrefix}-ring-${i}`}>
            <ellipse
              cx={cx}
              cy={cy}
              rx={ring.rx}
              ry={ring.ry}
              fill={ring.color.fill}
              stroke={ring.color.stroke}
              strokeWidth={2}
              rx-anim={ring.rx}
            />
            <text
              x={cx + ring.rx - 8}
              y={cy - ring.ry + 18}
              textAnchor="end"
              className="fill-foreground font-bold"
              style={{ fontSize: "14px" }}
            >
              {ring.label}
            </text>
            <text
              x={cx + ring.rx - 8}
              y={cy - ring.ry + 32}
              textAnchor="end"
              className="fill-muted-foreground"
              style={{ fontSize: "9px" }}
            >
              {ring.sublabel}
            </text>
          </g>
        ))}

        <text
          x={cx}
          y={cy + 5}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground"
          style={{ fontSize: "10px", fontStyle: "italic" }}
        >
          (innermost = most restricted)
        </text>
      </svg>

      {caption && (
        <p className="mt-2 text-center text-sm text-muted-foreground italic">
          {caption}
        </p>
      )}
    </div>
  )
}
