"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Vertex {
  id: string
  x: number
  y: number
}

interface Edge {
  from: string
  to: string
  weight: number
}

interface DijkstraStep {
  current: string | null
  visited: string[]
  dist: Record<string, number | null>
  prev: Record<string, string | null>
  unvisited: string[]
  activeEdge: [string, string] | null
  pathHighlight: [string, string][]
  description: string
}

const VERTICES: Vertex[] = [
  { id: "A", x: 80, y: 150 },
  { id: "B", x: 200, y: 55 },
  { id: "C", x: 220, y: 245 },
  { id: "D", x: 370, y: 55 },
  { id: "E", x: 420, y: 245 },
]

const EDGES: Edge[] = [
  { from: "A", to: "B", weight: 1 },
  { from: "A", to: "C", weight: 4 },
  { from: "B", to: "C", weight: 2 },
  { from: "B", to: "D", weight: 7 },
  { from: "C", to: "D", weight: 1 },
  { from: "C", to: "E", weight: 5 },
  { from: "D", to: "E", weight: 3 },
]

const INF = null

const STEPS: DijkstraStep[] = [
  {
    current: null,
    visited: [],
    dist: { A: 0, B: INF, C: INF, D: INF, E: INF },
    prev: { A: null, B: null, C: null, D: null, E: null },
    unvisited: ["A", "B", "C", "D", "E"],
    activeEdge: null,
    pathHighlight: [],
    description: "Initialize: source A gets distance 0. All others start at \u221e.",
  },
  {
    current: "A",
    visited: ["A"],
    dist: { A: 0, B: 1, C: 4, D: INF, E: INF },
    prev: { A: null, B: "A", C: "A", D: null, E: null },
    unvisited: ["B", "C", "D", "E"],
    activeEdge: null,
    pathHighlight: [],
    description: "Visit A (cost 0). Relax neighbors: B gets 0+1 = 1, C gets 0+4 = 4.",
  },
  {
    current: "B",
    visited: ["A", "B"],
    dist: { A: 0, B: 1, C: 3, D: 8, E: INF },
    prev: { A: null, B: "A", C: "B", D: "B", E: null },
    unvisited: ["C", "D", "E"],
    activeEdge: ["B", "C"],
    pathHighlight: [],
    description: "Visit B (cost 1). C improves from 4 to 1+2 = 3. D gets 1+7 = 8.",
  },
  {
    current: "C",
    visited: ["A", "B", "C"],
    dist: { A: 0, B: 1, C: 3, D: 4, E: 8 },
    prev: { A: null, B: "A", C: "B", D: "C", E: "C" },
    unvisited: ["D", "E"],
    activeEdge: ["C", "D"],
    pathHighlight: [],
    description: "Visit C (cost 3). D improves from 8 to 3+1 = 4. E gets 3+5 = 8.",
  },
  {
    current: "D",
    visited: ["A", "B", "C", "D"],
    dist: { A: 0, B: 1, C: 3, D: 4, E: 7 },
    prev: { A: null, B: "A", C: "B", D: "C", E: "D" },
    unvisited: ["E"],
    activeEdge: ["D", "E"],
    pathHighlight: [],
    description: "Visit D (cost 4). E improves from 8 to 4+3 = 7.",
  },
  {
    current: "E",
    visited: ["A", "B", "C", "D", "E"],
    dist: { A: 0, B: 1, C: 3, D: 4, E: 7 },
    prev: { A: null, B: "A", C: "B", D: "C", E: "D" },
    unvisited: [],
    activeEdge: null,
    pathHighlight: [],
    description: "Visit E (cost 7). All vertices processed \u2014 algorithm complete.",
  },
  {
    current: null,
    visited: ["A", "B", "C", "D", "E"],
    dist: { A: 0, B: 1, C: 3, D: 4, E: 7 },
    prev: { A: null, B: "A", C: "B", D: "C", E: "D" },
    unvisited: [],
    activeEdge: null,
    pathHighlight: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "E"]],
    description: "Shortest path: A \u2192 B \u2192 C \u2192 D \u2192 E with total cost 7.",
  },
]

function edgeMidpoint(from: Vertex, to: Vertex, offset = 0) {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const nx = -dy / len
  const ny = dx / len
  return { x: mx + nx * offset, y: my + ny * offset }
}

export function DijkstraStepper() {
  const [stepIdx, setStepIdx] = useState(0)
  const step = STEPS[stepIdx]

  const isPathEdge = (from: string, to: string) =>
    step.pathHighlight.some(
      ([a, b]) => (a === from && b === to) || (a === to && b === from)
    )

  const isActiveEdge = (from: string, to: string) =>
    step.activeEdge !== null &&
    ((step.activeEdge[0] === from && step.activeEdge[1] === to) ||
      (step.activeEdge[0] === to && step.activeEdge[1] === from))

  const getVertexFill = (id: string) => {
    if (step.pathHighlight.length > 0) {
      const onPath = ["A", "B", "C", "D", "E"]
      if (onPath.includes(id)) return "#eab308"
    }
    if (id === step.current) return "#3b82f6"
    if (step.visited.includes(id)) return "#22c55e"
    return "transparent"
  }

  const getVertexStroke = (id: string) => {
    if (step.pathHighlight.length > 0) return "#a16207"
    if (id === step.current) return "#1d4ed8"
    if (step.visited.includes(id)) return "#15803d"
    return "currentColor"
  }

  const getTextColor = (id: string) => {
    if (step.pathHighlight.length > 0) return "#422006"
    if (id === step.current || step.visited.includes(id)) return "white"
    return "currentColor"
  }

  const getEdgeStyle = (from: string, to: string) => {
    if (isPathEdge(from, to)) return { color: "#eab308", width: 4, opacity: 1 }
    if (isActiveEdge(from, to)) return { color: "#3b82f6", width: 3, opacity: 1 }
    const bothVisited = step.visited.includes(from) && step.visited.includes(to)
    return { color: "currentColor", width: 2, opacity: bothVisited ? 0.7 : 0.25 }
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <span className="font-semibold text-sm">Dijkstra&rsquo;s Algorithm &mdash; Router Graph</span>
        <span className="text-xs text-muted-foreground">
          Step {stepIdx + 1} of {STEPS.length}
        </span>
      </div>

      <div className="p-4">
        <svg viewBox="0 0 500 300" className="w-full border rounded bg-background mb-4" style={{ maxHeight: "280px" }}>
          {EDGES.map((e) => {
            const from = VERTICES.find((v) => v.id === e.from)!
            const to = VERTICES.find((v) => v.id === e.to)!
            const style = getEdgeStyle(e.from, e.to)
            const mid = edgeMidpoint(from, to, -12)
            return (
              <g key={`${e.from}-${e.to}`}>
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke={style.color}
                  className={style.color === "currentColor" ? "text-muted-foreground" : ""}
                  strokeWidth={style.width}
                  opacity={style.opacity}
                />
                <rect
                  x={mid.x - 10} y={mid.y - 9}
                  width={20} height={18}
                  rx={4}
                  className="fill-background"
                  opacity={0.85}
                />
                <text
                  x={mid.x} y={mid.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[11px] font-bold fill-foreground"
                >
                  {e.weight}
                </text>
              </g>
            )
          })}
          {VERTICES.map((v) => (
            <g key={v.id}>
              <circle
                cx={v.x} cy={v.y} r={22}
                fill={getVertexFill(v.id)}
                stroke={getVertexStroke(v.id)}
                strokeWidth={2}
                className={getVertexFill(v.id) === "transparent" ? "text-muted-foreground" : ""}
              />
              <text
                x={v.x} y={v.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-sm font-semibold"
                fill={getTextColor(v.id)}
              >
                {v.id}
              </text>
            </g>
          ))}
        </svg>

        {/* Distance table */}
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-1 bg-muted/30 text-left text-xs">Vertex</th>
                {VERTICES.map((v) => (
                  <th key={v.id} className={`border px-3 py-1 text-center text-xs ${
                    v.id === step.current ? "bg-blue-500/15 font-bold" : "bg-muted/30"
                  }`}>
                    {v.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1 text-xs text-muted-foreground">dist</td>
                {VERTICES.map((v) => {
                  const d = step.dist[v.id]
                  return (
                    <td key={v.id} className={`border px-3 py-1 text-center font-mono text-xs ${
                      v.id === step.current ? "bg-blue-500/10" : ""
                    }`}>
                      {d === null ? "\u221e" : d}
                    </td>
                  )
                })}
              </tr>
              <tr>
                <td className="border px-2 py-1 text-xs text-muted-foreground">prev</td>
                {VERTICES.map((v) => (
                  <td key={v.id} className={`border px-3 py-1 text-center font-mono text-xs ${
                    v.id === step.current ? "bg-blue-500/10" : ""
                  }`}>
                    {step.prev[v.id] ?? "\u2013"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Unvisited set */}
        <div className="flex gap-4 mb-3">
          <div className="border rounded p-2 flex-1">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Unvisited</div>
            <div className="text-sm font-mono">
              {"{" + (step.unvisited.length > 0 ? step.unvisited.join(", ") : "\u2205") + "}"}
            </div>
          </div>
          <div className="border rounded p-2 flex-1">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Visited</div>
            <div className="text-sm font-mono">
              {"{" + step.visited.join(", ") + "}"}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground italic text-center">
          {step.description}
        </p>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepIdx(stepIdx - 1)}
          disabled={stepIdx === 0}
        >
          &larr; Previous
        </Button>
        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStepIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === stepIdx
                  ? "bg-primary"
                  : i < stepIdx
                    ? "bg-primary/40"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepIdx(stepIdx + 1)}
          disabled={stepIdx === STEPS.length - 1}
        >
          Next &rarr;
        </Button>
      </div>
    </div>
  )
}
