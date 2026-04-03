"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface RAGNode {
  id: string
  type: "process" | "resource"
  x: number
  y: number
}

interface RAGEdge {
  from: string
  to: string
  kind: "holds" | "waits"
}

interface DetectionStep {
  highlighted: string[]
  highlightedEdges: [string, string][]
  cycleFound: boolean
  description: string
}

const NODES: RAGNode[] = [
  { id: "R1", type: "resource", x: 130, y: 70 },
  { id: "R2", type: "resource", x: 270, y: 70 },
  { id: "R3", type: "resource", x: 410, y: 70 },
  { id: "P1", type: "process", x: 130, y: 220 },
  { id: "P2", type: "process", x: 270, y: 220 },
  { id: "P3", type: "process", x: 410, y: 220 },
]

const NO_DEADLOCK_EDGES: RAGEdge[] = [
  { from: "R1", to: "P1", kind: "holds" },
  { from: "P1", to: "R2", kind: "waits" },
  { from: "R2", to: "P2", kind: "holds" },
  { from: "P2", to: "R3", kind: "waits" },
  { from: "R3", to: "P3", kind: "holds" },
]

const DEADLOCK_EDGES: RAGEdge[] = [
  { from: "R1", to: "P1", kind: "holds" },
  { from: "P1", to: "R2", kind: "waits" },
  { from: "R2", to: "P2", kind: "holds" },
  { from: "P2", to: "R3", kind: "waits" },
  { from: "R3", to: "P3", kind: "holds" },
  { from: "P3", to: "R1", kind: "waits" },
]

const NO_DEADLOCK_STEPS: DetectionStep[] = [
  {
    highlighted: [],
    highlightedEdges: [],
    cycleFound: false,
    description: "Resource Allocation Graph: solid arrows = \"held by\", dashed arrows = \"waits for\". Is there a cycle?",
  },
  {
    highlighted: ["P1"],
    highlightedEdges: [],
    cycleFound: false,
    description: "Start cycle detection at P1. P1 is waiting for R2.",
  },
  {
    highlighted: ["P1", "R2"],
    highlightedEdges: [["P1", "R2"]],
    cycleFound: false,
    description: "Follow the wait-for edge P1 \u2192 R2. R2 is held by P2.",
  },
  {
    highlighted: ["P1", "R2", "P2"],
    highlightedEdges: [["P1", "R2"], ["R2", "P2"]],
    cycleFound: false,
    description: "Follow: R2 \u2192 P2. P2 is waiting for R3.",
  },
  {
    highlighted: ["P1", "R2", "P2", "R3"],
    highlightedEdges: [["P1", "R2"], ["R2", "P2"], ["P2", "R3"]],
    cycleFound: false,
    description: "Follow: P2 \u2192 R3. R3 is held by P3.",
  },
  {
    highlighted: ["P1", "R2", "P2", "R3", "P3"],
    highlightedEdges: [["P1", "R2"], ["R2", "P2"], ["P2", "R3"], ["R3", "P3"]],
    cycleFound: false,
    description: "Follow: R3 \u2192 P3. P3 has no outgoing wait-for edge. Chain ends \u2014 no cycle. No deadlock!",
  },
]

const DEADLOCK_STEPS: DetectionStep[] = [
  {
    highlighted: [],
    highlightedEdges: [],
    cycleFound: false,
    description: "Resource Allocation Graph with a circular dependency. Can you spot the cycle?",
  },
  {
    highlighted: ["P1"],
    highlightedEdges: [],
    cycleFound: false,
    description: "Start cycle detection at P1. P1 is waiting for R2.",
  },
  {
    highlighted: ["P1", "R2"],
    highlightedEdges: [["P1", "R2"]],
    cycleFound: false,
    description: "Follow: P1 \u2192 R2. R2 is held by P2.",
  },
  {
    highlighted: ["P1", "R2", "P2"],
    highlightedEdges: [["P1", "R2"], ["R2", "P2"]],
    cycleFound: false,
    description: "Follow: R2 \u2192 P2. P2 is waiting for R3.",
  },
  {
    highlighted: ["P1", "R2", "P2", "R3"],
    highlightedEdges: [["P1", "R2"], ["R2", "P2"], ["P2", "R3"]],
    cycleFound: false,
    description: "Follow: P2 \u2192 R3. R3 is held by P3.",
  },
  {
    highlighted: ["P1", "R2", "P2", "R3", "P3"],
    highlightedEdges: [["P1", "R2"], ["R2", "P2"], ["P2", "R3"], ["R3", "P3"]],
    cycleFound: false,
    description: "Follow: R3 \u2192 P3. P3 is waiting for R1\u2026",
  },
  {
    highlighted: ["P1", "R2", "P2", "R3", "P3", "R1"],
    highlightedEdges: [["P1", "R2"], ["R2", "P2"], ["P2", "R3"], ["R3", "P3"], ["P3", "R1"]],
    cycleFound: false,
    description: "Follow: P3 \u2192 R1. R1 is held by P1. But P1 was our starting point!",
  },
  {
    highlighted: ["P1", "R2", "P2", "R3", "P3", "R1"],
    highlightedEdges: [["P1", "R2"], ["R2", "P2"], ["P2", "R3"], ["R3", "P3"], ["P3", "R1"], ["R1", "P1"]],
    cycleFound: true,
    description: "Cycle detected: P1 \u2192 R2 \u2192 P2 \u2192 R3 \u2192 P3 \u2192 R1 \u2192 P1. Deadlock!",
  },
]

interface Scenario {
  name: string
  label: string
  edges: RAGEdge[]
  steps: DetectionStep[]
}

const SCENARIOS: Scenario[] = [
  { name: "No Deadlock", label: "Safe", edges: NO_DEADLOCK_EDGES, steps: NO_DEADLOCK_STEPS },
  { name: "Deadlock", label: "Deadlock", edges: DEADLOCK_EDGES, steps: DEADLOCK_STEPS },
]

function arrowEndpoint(from: RAGNode, to: RAGNode, radius: number) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.sqrt(dx * dx + dy * dy)
  return { x: to.x - (dx / len) * radius, y: to.y - (dy / len) * radius }
}

export function DeadlockExplorer() {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)

  const scenario = SCENARIOS[scenarioIdx]
  const step = scenario.steps[stepIdx]

  const handleScenarioChange = (idx: number) => {
    setScenarioIdx(idx)
    setStepIdx(0)
  }

  const isEdgeHighlighted = (from: string, to: string) =>
    step.highlightedEdges.some(([a, b]) => a === from && b === to)

  const nodeRadius = (n: RAGNode) => (n.type === "process" ? 24 : 20)

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">Deadlock Explorer</span>
        <div className="flex gap-1">
          {SCENARIOS.map((s, i) => (
            <button
              key={i}
              onClick={() => handleScenarioChange(i)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                i === scenarioIdx
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <svg viewBox="0 0 540 290" className="w-full border rounded bg-background mb-4" style={{ maxHeight: "280px" }}>
          <defs>
            <marker id="arrow-default" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" className="fill-muted-foreground" />
            </marker>
            <marker id="arrow-active" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#3b82f6" />
            </marker>
            <marker id="arrow-cycle" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="#ef4444" />
            </marker>
          </defs>

          {/* Legend */}
          <line x1="15" y1="15" x2="35" y2="15" stroke="currentColor" className="text-muted-foreground" strokeWidth={2} />
          <text x="40" y="19" className="text-[10px] fill-muted-foreground">held by</text>
          <line x1="95" y1="15" x2="115" y2="15" stroke="currentColor" className="text-muted-foreground" strokeWidth={2} strokeDasharray="4 3" />
          <text x="120" y="19" className="text-[10px] fill-muted-foreground">waits for</text>

          {scenario.edges.map((e) => {
            const from = NODES.find((n) => n.id === e.from)!
            const to = NODES.find((n) => n.id === e.to)!
            const end = arrowEndpoint(from, to, nodeRadius(to) + 2)
            const highlighted = isEdgeHighlighted(e.from, e.to)
            const isCycle = step.cycleFound && highlighted

            let strokeColor = "currentColor"
            let markerEnd = "url(#arrow-default)"
            if (isCycle) {
              strokeColor = "#ef4444"
              markerEnd = "url(#arrow-cycle)"
            } else if (highlighted) {
              strokeColor = "#3b82f6"
              markerEnd = "url(#arrow-active)"
            }

            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={from.x} y1={from.y}
                x2={end.x} y2={end.y}
                stroke={strokeColor}
                className={strokeColor === "currentColor" ? "text-muted-foreground" : ""}
                strokeWidth={highlighted ? 3 : 2}
                strokeDasharray={e.kind === "waits" ? "6 4" : undefined}
                opacity={highlighted ? 1 : step.highlighted.length > 0 ? 0.25 : 0.7}
                markerEnd={markerEnd}
              />
            )
          })}

          {NODES.map((n) => {
            const isHighlighted = step.highlighted.includes(n.id)
            const isCycle = step.cycleFound && isHighlighted

            let fill = "transparent"
            let stroke = "currentColor"
            let textFill = "currentColor"

            if (isCycle) {
              fill = "#ef4444"
              stroke = "#b91c1c"
              textFill = "white"
            } else if (isHighlighted) {
              fill = "#3b82f6"
              stroke = "#1d4ed8"
              textFill = "white"
            }

            return (
              <g key={n.id}>
                {n.type === "process" ? (
                  <circle
                    cx={n.x} cy={n.y} r={24}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={2}
                    className={fill === "transparent" ? "text-muted-foreground" : ""}
                  />
                ) : (
                  <rect
                    x={n.x - 20} y={n.y - 20}
                    width={40} height={40}
                    rx={4}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={2}
                    className={fill === "transparent" ? "text-muted-foreground" : ""}
                  />
                )}
                <text
                  x={n.x} y={n.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-xs font-semibold"
                  fill={textFill}
                >
                  {n.id}
                </text>
              </g>
            )
          })}
        </svg>

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
          {scenario.steps.map((_, i) => (
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
          disabled={stepIdx === scenario.steps.length - 1}
        >
          Next &rarr;
        </Button>
      </div>
    </div>
  )
}
