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
}

interface TraversalStep {
  current: string | null
  frontier: string[]
  visited: string[]
  order: string[]
  description: string
}

const VERTICES: Vertex[] = [
  { id: "A", x: 250, y: 45 },
  { id: "B", x: 110, y: 145 },
  { id: "C", x: 390, y: 145 },
  { id: "D", x: 50, y: 255 },
  { id: "E", x: 250, y: 255 },
  { id: "F", x: 450, y: 255 },
]

const EDGES: Edge[] = [
  { from: "A", to: "B" },
  { from: "A", to: "C" },
  { from: "B", to: "D" },
  { from: "B", to: "E" },
  { from: "C", to: "E" },
  { from: "C", to: "F" },
]

const BFS_STEPS: TraversalStep[] = [
  { current: null, frontier: ["A"], visited: [], order: [], description: "Initial state. Queue contains only the start vertex A." },
  { current: "A", frontier: ["B", "C"], visited: ["A"], order: ["A"], description: "Dequeue A. Add unvisited neighbors B, C to the back of the queue." },
  { current: "B", frontier: ["C", "D", "E"], visited: ["A", "B"], order: ["A", "B"], description: "Dequeue B (front of queue). Add unvisited neighbors D, E." },
  { current: "C", frontier: ["D", "E", "F"], visited: ["A", "B", "C"], order: ["A", "B", "C"], description: "Dequeue C. Add unvisited neighbor F. (E is already queued.)" },
  { current: "D", frontier: ["E", "F"], visited: ["A", "B", "C", "D"], order: ["A", "B", "C", "D"], description: "Dequeue D. No unvisited neighbors to add." },
  { current: "E", frontier: ["F"], visited: ["A", "B", "C", "D", "E"], order: ["A", "B", "C", "D", "E"], description: "Dequeue E. No unvisited neighbors remain." },
  { current: "F", frontier: [], visited: ["A", "B", "C", "D", "E", "F"], order: ["A", "B", "C", "D", "E", "F"], description: "Dequeue F. Queue empty — traversal complete. Layer by layer: A → {B,C} → {D,E,F}." },
]

const DFS_STEPS: TraversalStep[] = [
  { current: null, frontier: ["A"], visited: [], order: [], description: "Initial state. Stack contains only the start vertex A." },
  { current: "A", frontier: ["B", "C"], visited: ["A"], order: ["A"], description: "Pop A. Push unvisited neighbors B, C onto the stack." },
  { current: "C", frontier: ["B", "E", "F"], visited: ["A", "C"], order: ["A", "C"], description: "Pop C (top of stack — LIFO!). Push unvisited neighbors E, F." },
  { current: "F", frontier: ["B", "E"], visited: ["A", "C", "F"], order: ["A", "C", "F"], description: "Pop F. No unvisited neighbors. DFS went deep: A → C → F." },
  { current: "E", frontier: ["B"], visited: ["A", "C", "F", "E"], order: ["A", "C", "F", "E"], description: "Pop E. Neighbor B is unvisited but already on the stack." },
  { current: "B", frontier: ["D"], visited: ["A", "C", "F", "E", "B"], order: ["A", "C", "F", "E", "B"], description: "Pop B. Push unvisited neighbor D." },
  { current: "D", frontier: [], visited: ["A", "C", "F", "E", "B", "D"], order: ["A", "C", "F", "E", "B", "D"], description: "Pop D. Stack empty — traversal complete. Deep path first: A → C → F, then backtrack." },
]

interface TraversalMode {
  name: string
  label: string
  frontierLabel: string
  steps: TraversalStep[]
}

const MODES: TraversalMode[] = [
  { name: "BFS", label: "Breadth-First Search", frontierLabel: "Queue", steps: BFS_STEPS },
  { name: "DFS", label: "Depth-First Search", frontierLabel: "Stack", steps: DFS_STEPS },
]

export function TraversalExplorer() {
  const [modeIdx, setModeIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)

  const mode = MODES[modeIdx]
  const step = mode.steps[stepIdx]

  const handleModeChange = (idx: number) => {
    setModeIdx(idx)
    setStepIdx(0)
  }

  const getVertexColor = (id: string) => {
    if (id === step.current) return { fill: "#3b82f6", stroke: "#1d4ed8", text: "white" }
    if (step.visited.includes(id)) return { fill: "#22c55e", stroke: "#15803d", text: "white" }
    return { fill: "transparent", stroke: "currentColor", text: "currentColor" }
  }

  const getEdgeOpacity = (from: string, to: string) => {
    const bothVisited = step.visited.includes(from) && step.visited.includes(to)
    return bothVisited ? 1 : 0.25
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">Traversal Explorer</span>
        <div className="flex gap-1">
          {MODES.map((m, i) => (
            <button
              key={i}
              onClick={() => handleModeChange(i)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                i === modeIdx
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Graph SVG */}
        <svg viewBox="0 0 500 300" className="w-full border rounded bg-background mb-4" style={{ maxHeight: "260px" }}>
          {EDGES.map((e) => {
            const from = VERTICES.find((v) => v.id === e.from)!
            const to = VERTICES.find((v) => v.id === e.to)!
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke="currentColor"
                className="text-muted-foreground"
                strokeWidth={2}
                opacity={getEdgeOpacity(e.from, e.to)}
              />
            )
          })}
          {VERTICES.map((v) => {
            const colors = getVertexColor(v.id)
            return (
              <g key={v.id}>
                <circle
                  cx={v.x} cy={v.y} r={22}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={2}
                  className={colors.fill === "transparent" ? "text-muted-foreground" : ""}
                />
                <text
                  x={v.x} y={v.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-sm font-semibold"
                  fill={colors.text}
                >
                  {v.id}
                </text>
              </g>
            )
          })}
        </svg>

        {/* State display */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div className="border rounded p-2">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">{mode.frontierLabel}</div>
            <div className="text-sm font-mono">
              [{step.frontier.join(", ")}]
            </div>
          </div>
          <div className="border rounded p-2">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Visited</div>
            <div className="text-sm font-mono">
              {"{"}{step.visited.join(", ")}{"}"}
            </div>
          </div>
          <div className="border rounded p-2">
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Order</div>
            <div className="text-sm font-mono">
              [{step.order.join(" → ")}]
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground italic text-center">
          {step.description}
        </p>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStepIdx(stepIdx - 1)}
          disabled={stepIdx === 0}
        >
          ← Previous
        </Button>
        <div className="flex items-center gap-1.5">
          {mode.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStepIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === stepIdx
                  ? "bg-primary"
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
          disabled={stepIdx === mode.steps.length - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
