"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

// ── Helpers ────────────────────────────────────────────────────────────────────

const SUB = "₀₁₂₃₄₅₆₇₈₉"
function toSub(n: number): string {
  return String(n)
    .split("")
    .map((d) => SUB[parseInt(d)])
    .join("")
}

function circlePos(i: number, n: number, r: number) {
  const a = (2 * Math.PI * i) / n - Math.PI / 2
  return { x: Math.round(r * Math.cos(a)), y: Math.round(r * Math.sin(a)) }
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface GNode {
  id: string
  label: string
  x: number
  y: number
}
interface GEdge {
  from: string
  to: string
}
interface Preset {
  name: string
  subtitle: string
  nodes: GNode[]
  edges: GEdge[]
  solvable: boolean
}
type Asgn = Record<string, 0 | 1 | null>

function emptyAsgn(preset: Preset): Asgn {
  const a: Asgn = {}
  for (const n of preset.nodes) a[n.id] = null
  return a
}

function getViolationSet(edges: GEdge[], asgn: Asgn): Set<number> {
  const s = new Set<number>()
  edges.forEach((e, i) => {
    if (asgn[e.from] !== null && asgn[e.to] !== null && asgn[e.from] === asgn[e.to])
      s.add(i)
  })
  return s
}

function eqStatus(
  e: GEdge,
  asgn: Asgn
): "satisfied" | "violated" | "unknown" {
  const a = asgn[e.from]
  const b = asgn[e.to]
  if (a === null || b === null) return "unknown"
  return (a + b) % 2 === 1 ? "satisfied" : "violated"
}

function nodeIdx(id: string): number {
  return parseInt(id.replace("v", ""))
}

function computePropagation(preset: Preset): { id: string; val: 0 | 1 }[] {
  const order: { id: string; val: 0 | 1 }[] = []
  const done: Record<string, 0 | 1> = {}
  const start = preset.nodes[0].id
  done[start] = 0
  order.push({ id: start, val: 0 })
  const queue = [start]
  while (queue.length > 0) {
    const cur = queue.shift()!
    for (const e of preset.edges) {
      const nbr = e.from === cur ? e.to : e.to === cur ? e.from : null
      if (nbr && done[nbr] === undefined) {
        const v: 0 | 1 = done[cur] === 0 ? 1 : 0
        done[nbr] = v
        order.push({ id: nbr, val: v })
        queue.push(nbr)
      }
    }
  }
  return order
}

// ── Graph Presets ──────────────────────────────────────────────────────────────

const C4: Preset = {
  name: "C₄",
  subtitle: "4-cycle — warm-up",
  solvable: true,
  nodes: [0, 1, 2, 3].map((i) => ({
    id: `v${i}`,
    label: `v${toSub(i)}`,
    ...circlePos(i, 4, 100),
  })),
  edges: [
    { from: "v0", to: "v1" },
    { from: "v1", to: "v2" },
    { from: "v2", to: "v3" },
    { from: "v3", to: "v0" },
  ],
}

// Q₃ (cube graph) arranged in a circle — bipartite partition {v0,v3,v5,v6}
// and {v1,v2,v4,v7} is NOT visually obvious in this layout
const CUBE: Preset = {
  name: "Q₃",
  subtitle: "Cube graph — can you 2-color it?",
  solvable: true,
  nodes: Array.from({ length: 8 }, (_, i) => ({
    id: `v${i}`,
    label: `v${toSub(i)}`,
    ...circlePos(i, 8, 120),
  })),
  edges: [
    { from: "v0", to: "v1" },
    { from: "v0", to: "v2" },
    { from: "v0", to: "v4" },
    { from: "v1", to: "v3" },
    { from: "v1", to: "v5" },
    { from: "v2", to: "v3" },
    { from: "v2", to: "v6" },
    { from: "v3", to: "v7" },
    { from: "v4", to: "v5" },
    { from: "v4", to: "v6" },
    { from: "v5", to: "v7" },
    { from: "v6", to: "v7" },
  ],
}

const PETERSEN: Preset = {
  name: "Petersen",
  subtitle: "The Petersen graph — can you 2-color it?",
  solvable: false,
  nodes: [
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `v${i}`,
      label: `v${toSub(i)}`,
      ...circlePos(i, 5, 140),
    })),
    ...Array.from({ length: 5 }, (_, i) => ({
      id: `v${i + 5}`,
      label: `v${toSub(i + 5)}`,
      ...circlePos(i, 5, 60),
    })),
  ],
  edges: [
    { from: "v0", to: "v1" },
    { from: "v1", to: "v2" },
    { from: "v2", to: "v3" },
    { from: "v3", to: "v4" },
    { from: "v4", to: "v0" },
    { from: "v0", to: "v5" },
    { from: "v1", to: "v6" },
    { from: "v2", to: "v7" },
    { from: "v3", to: "v8" },
    { from: "v4", to: "v9" },
    { from: "v5", to: "v7" },
    { from: "v7", to: "v9" },
    { from: "v9", to: "v6" },
    { from: "v6", to: "v8" },
    { from: "v8", to: "v5" },
  ],
}

const PRESETS = [C4, CUBE, PETERSEN]

const SPEED_RUN: Preset = {
  name: "Speed Run",
  subtitle: "20-node bipartite graph",
  solvable: true,
  nodes: [
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `v${i}`,
      label: `v${toSub(i)}`,
      x: -180 + i * 40,
      y: -55,
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `v${i + 10}`,
      label: `v${toSub(i + 10)}`,
      x: -180 + i * 40,
      y: 55,
    })),
  ],
  edges: [
    ...Array.from({ length: 10 }, (_, i) => ({
      from: `v${i}`,
      to: `v${i + 10}`,
    })),
    ...Array.from({ length: 9 }, (_, i) => ({
      from: `v${i}`,
      to: `v${i + 11}`,
    })),
    { from: "v0", to: "v13" },
    { from: "v2", to: "v15" },
    { from: "v4", to: "v17" },
    { from: "v6", to: "v19" },
    { from: "v1", to: "v14" },
    { from: "v3", to: "v16" },
    { from: "v5", to: "v18" },
    { from: "v8", to: "v10" },
  ],
}

// ── Phase 4 Formal Walkthrough Data ────────────────────────────────────────────

interface FormalStep {
  math: string
  description: string
  tag: "graph" | "translate" | "algebra" | "bridge" | "conclusion"
}

interface FormalCase {
  name: string
  subtitle: string
  steps: FormalStep[]
}

const TAG_COLORS: Record<string, string> = {
  graph: "bg-blue-500",
  translate: "bg-amber-500",
  algebra: "bg-emerald-500",
  bridge: "bg-purple-500",
  conclusion: "bg-rose-500",
}

const TAG_LABELS: Record<string, string> = {
  graph: "Graph Theory",
  translate: "Translation",
  algebra: "Algebra (mod 2)",
  bridge: "Bridge Back",
  conclusion: "Conclusion",
}

const FORMAL_CASES: FormalCase[] = [
  {
    name: "Odd Cycle",
    subtitle: "K₃ — impossible",
    steps: [
      {
        tag: "graph",
        math: "K_3: \\quad v_1 - v_2 - v_3 - v_1 \\qquad \\text{Can we 2-color this?}",
        description:
          "The triangle: 3 vertices, each connected to both others. We want to assign each vertex color 0 or 1 such that no edge connects same-colored vertices.",
      },
      {
        tag: "translate",
        math: "\\text{Edge } (v_i, v_j) \\;\\longrightarrow\\; x_i + x_j \\equiv 1 \\pmod{2}",
        description:
          'For each edge, require that the two endpoint colors sum to 1 mod 2. This forces them to differ — exactly what "proper coloring" means.',
      },
      {
        tag: "algebra",
        math: "\\begin{cases} x_1 + x_2 \\equiv 1 \\\\ x_2 + x_3 \\equiv 1 \\\\ x_1 + x_3 \\equiv 1 \\end{cases} \\pmod{2}",
        description:
          "Three edges produce three equations. This is now a system of linear equations over ℤ₂.",
      },
      {
        tag: "algebra",
        math: "x_1 = 0 \\;\\implies\\; x_2 = 1 \\;\\implies\\; x_3 = 0",
        description:
          "Attempt to solve: choose x₁ = 0. The first equation forces x₂ = 1. The second forces x₃ = 0.",
      },
      {
        tag: "algebra",
        math: "x_1 + x_3 = 0 + 0 = 0 \\neq 1 \\qquad \\bot",
        description:
          "Check the third equation: x₁ + x₃ = 0 + 0 = 0 ≠ 1. Contradiction! The system has no solution.",
      },
      {
        tag: "bridge",
        math: "\\text{No solution in } \\mathbb{Z}_2 \\;\\iff\\; \\text{No proper 2-coloring} \\;\\iff\\; \\text{Odd cycle!}",
        description:
          "The algebraic contradiction maps back to the graph: K₃ is an odd cycle, so it is not bipartite. The algebra proved the graph theory result.",
      },
    ],
  },
  {
    name: "Even Cycle",
    subtitle: "C₄ — solvable",
    steps: [
      {
        tag: "graph",
        math: "C_4: \\quad v_1 - v_2 - v_3 - v_4 - v_1 \\qquad \\text{Can we 2-color this?}",
        description:
          "The 4-cycle: 4 vertices connected in a ring. Is there a proper 2-coloring?",
      },
      {
        tag: "translate",
        math: "\\begin{cases} x_1 + x_2 \\equiv 1 \\\\ x_2 + x_3 \\equiv 1 \\\\ x_3 + x_4 \\equiv 1 \\\\ x_4 + x_1 \\equiv 1 \\end{cases} \\pmod{2}",
        description:
          "Four edges produce four equations over ℤ₂. Same translation rule: adjacent vertices must have different colors.",
      },
      {
        tag: "algebra",
        math: "x_1 = 0 \\;\\implies\\; x_2 = 1 \\;\\implies\\; x_3 = 0 \\;\\implies\\; x_4 = 1",
        description:
          "Solve by propagation: choose x₁ = 0, then each equation determines the next variable.",
      },
      {
        tag: "algebra",
        math: "x_4 + x_1 = 1 + 0 = 1 \\equiv 1 \\pmod{2} \\qquad \\checkmark",
        description:
          "Check the last equation: x₄ + x₁ = 1 + 0 = 1. It holds! All four equations are satisfied.",
      },
      {
        tag: "bridge",
        math: "\\text{Solution: } (x_1, x_2, x_3, x_4) = (0, 1, 0, 1) \\;\\iff\\; \\text{2-coloring found!}",
        description:
          "Map the algebraic solution back: 0 = color A, 1 = color B. The coloring alternates around the cycle.",
      },
      {
        tag: "conclusion",
        math: "\\text{Consistent system in } \\mathbb{Z}_2 \\;\\iff\\; G \\text{ is bipartite}",
        description:
          "The algebra solved the graph problem. The 4-cycle is bipartite because its corresponding equation system is consistent. Same technique, opposite outcome.",
      },
    ],
  },
]

// ── Phase tab configuration ────────────────────────────────────────────────────

const PHASE_TABS = [
  "Color the Graph",
  "Solve Equations",
  "The Bridge",
  "Speed Run",
  "The Proof",
]

// ── Node color palette (works on both light/dark canvas backgrounds) ───────────

const NODE_STYLES = {
  empty: {
    border: "#9ca3af",
    background: "#d1d5db",
    highlight: { border: "#6b7280", background: "#e5e7eb" },
  },
  color0: {
    border: "#3b82f6",
    background: "#93c5fd",
    highlight: { border: "#2563eb", background: "#bfdbfe" },
  },
  color1: {
    border: "#f43f5e",
    background: "#fda4af",
    highlight: { border: "#e11d48", background: "#fecdd3" },
  },
}

function nodeColor(val: 0 | 1 | null) {
  if (val === 0) return NODE_STYLES.color0
  if (val === 1) return NODE_STYLES.color1
  return NODE_STYLES.empty
}

// ── VisGraph (vis.js sub-component) ────────────────────────────────────────────

function VisGraph({
  preset,
  assignments,
  onNodeClick,
  height = "350px",
}: {
  preset: Preset
  assignments: Asgn
  onNodeClick?: (nodeId: string) => void
  height?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const callbackRef = useRef(onNodeClick)
  callbackRef.current = onNodeClick
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    // @ts-expect-error
    import("vis-network/styles/vis-network.css")
  }, [])

  const asgnKey = JSON.stringify(assignments)

  useEffect(() => {
    if (!ready || !containerRef.current) return

    let net: any = null
    let destroyed = false

    const init = async () => {
      const { Network } = await import("vis-network")
      const { DataSet } = await import("vis-data")
      if (destroyed || !containerRef.current) return

      const violations = getViolationSet(preset.edges, assignments)

      const nodesDS = new DataSet(
        preset.nodes.map((n) => ({
          id: n.id,
          label: n.label,
          x: n.x,
          y: n.y,
          fixed: { x: true, y: true },
          shape: "circle",
          size: 30,
          font: { size: 14, color: "#1e293b" },
          borderWidth: 3,
          color: nodeColor(assignments[n.id]),
        })) as any
      )

      const edgesDS = new DataSet(
        preset.edges.map((e, i) => ({
          id: `e${i}`,
          from: e.from,
          to: e.to,
          width: violations.has(i) ? 4 : 2,
          color: { color: violations.has(i) ? "#ef4444" : "#94a3b8" },
          smooth: false,
        })) as any
      )

      net = new Network(
        containerRef.current,
        { nodes: nodesDS, edges: edgesDS } as any,
        {
          physics: { enabled: false },
          interaction: {
            dragNodes: false,
            dragView: false,
            zoomView: false,
            hover: true,
          },
        } as any
      )
      networkRef.current = net

      net.on("click", (params: any) => {
        if (params.nodes.length > 0 && callbackRef.current) {
          callbackRef.current(params.nodes[0])
        }
      })
    }

    init()

    return () => {
      destroyed = true
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, preset, asgnKey])

  if (!ready) {
    return (
      <div
        className="border rounded-lg bg-muted/30 flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-muted-foreground text-sm">Loading graph...</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="border rounded-lg bg-background"
      style={{ height, width: "100%" }}
    />
  )
}

// ── EquationPanel (shared sub-component) ───────────────────────────────────────

function EquationPanel({
  preset,
  assignments,
  onToggle,
  pulsingIndices,
}: {
  preset: Preset
  assignments: Asgn
  onToggle?: (nodeId: string) => void
  pulsingIndices?: Set<number>
}) {
  const interactive = !!onToggle
  const nodeIds = preset.nodes.map((n) => n.id)

  const counts = useMemo(() => {
    let satisfied = 0,
      violated = 0,
      unknown = 0
    for (const e of preset.edges) {
      const s = eqStatus(e, assignments)
      if (s === "satisfied") satisfied++
      else if (s === "violated") violated++
      else unknown++
    }
    return { satisfied, violated, unknown }
  }, [preset, assignments])

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Variable toggle row */}
      <div className="px-3 py-2 border-b bg-muted/30">
        <div className="text-xs font-medium text-muted-foreground mb-1.5">
          Variables
        </div>
        <div className="flex flex-wrap gap-1.5">
          {nodeIds.map((id) => {
            const val = assignments[id]
            return (
              <button
                key={id}
                onClick={() => onToggle?.(id)}
                disabled={!interactive}
                className={`px-2 py-1 text-xs rounded border font-mono transition-colors min-w-[48px] ${
                  val === 0
                    ? "bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-300"
                    : val === 1
                      ? "bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300"
                      : "bg-muted border-border text-muted-foreground"
                } ${interactive ? "hover:opacity-80 cursor-pointer" : "cursor-default"}`}
              >
                x{toSub(nodeIdx(id))}:{" "}
                {val === null ? "?" : val}
              </button>
            )
          })}
        </div>
      </div>

      {/* Equation list */}
      <div className="max-h-[240px] overflow-y-auto">
        {preset.edges.map((e, i) => {
          const status = eqStatus(e, assignments)
          const pulsing = pulsingIndices?.has(i)
          const a = assignments[e.from]
          const b = assignments[e.to]
          return (
            <div
              key={i}
              className={`flex items-center justify-between px-3 py-1.5 text-sm border-b last:border-0 transition-colors duration-300 ${
                pulsing ? "bg-amber-500/20" : ""
              } ${
                status === "violated"
                  ? "bg-red-500/10"
                  : status === "satisfied"
                    ? "bg-green-500/5"
                    : ""
              }`}
            >
              <span className="font-mono text-xs">
                x{toSub(nodeIdx(e.from))} + x{toSub(nodeIdx(e.to))} ≡ 1
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {a !== null && b !== null ? (
                  <span
                    className={
                      status === "satisfied"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {a}+{b}={((a + b) % 2)}{" "}
                    {status === "satisfied" ? "✓" : "✗"}
                  </span>
                ) : (
                  <span>—</span>
                )}
              </span>
            </div>
          )
        })}
      </div>

      {/* Status summary */}
      <div className="px-3 py-2 border-t bg-muted/20 flex gap-4 text-xs">
        <span className="text-green-600 dark:text-green-400">
          ✓ {counts.satisfied}
        </span>
        <span className="text-red-600 dark:text-red-400">
          ✗ {counts.violated}
        </span>
        <span className="text-muted-foreground">— {counts.unknown}</span>
        <span className="text-muted-foreground ml-auto">
          {preset.edges.length} equations
        </span>
      </div>
    </div>
  )
}

// ── MathBlock (for Phase 4) ────────────────────────────────────────────────────

function MathBlock({ formula }: { formula: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    setRendered(false)
    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })
    return () => {
      mounted = false
    }
  }, [formula])

  return (
    <div className="relative overflow-x-auto text-center">
      {!rendered && <MathShimmer block />}
      <div
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {`$$${formula}$$`}
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function ReducibilityWorkshop() {
  // Phase navigation
  const [phase, setPhase] = useState(0)
  const [unlocked, setUnlocked] = useState([true, false, false, false, false])

  function unlock(idx: number) {
    setUnlocked((prev) => {
      if (prev[idx]) return prev
      const next = [...prev]
      next[idx] = true
      return next
    })
  }

  // Phase 1 state — graph coloring
  const [p1Preset, setP1Preset] = useState(0)
  const [p1Colors, setP1Colors] = useState<Asgn>(() => emptyAsgn(PRESETS[0]))
  const [p1History, setP1History] = useState<Asgn[]>([])
  const [p1Clicks, setP1Clicks] = useState(0)

  const p1Graph = PRESETS[p1Preset]
  const p1Violations = useMemo(
    () => getViolationSet(p1Graph.edges, p1Colors),
    [p1Graph, p1Colors]
  )
  const p1AllColored = p1Graph.nodes.every((n) => p1Colors[n.id] !== null)
  const p1Solved = p1AllColored && p1Violations.size === 0

  function handleP1PresetChange(idx: number) {
    setP1Preset(idx)
    setP1Colors(emptyAsgn(PRESETS[idx]))
    setP1History([])
    setP1Clicks(0)
  }

  function handleP1NodeClick(nodeId: string) {
    setP1History((prev) => [...prev, { ...p1Colors }])
    setP1Colors((prev) => {
      const next = { ...prev }
      next[nodeId] = prev[nodeId] === null ? 0 : prev[nodeId] === 0 ? 1 : null
      return next
    })
    setP1Clicks((c) => c + 1)
    unlock(1)
  }

  function handleP1Undo() {
    if (p1History.length === 0) return
    setP1Colors(p1History[p1History.length - 1])
    setP1History((h) => h.slice(0, -1))
  }

  function handleP1Reset() {
    setP1Colors(emptyAsgn(PRESETS[p1Preset]))
    setP1History([])
  }

  // Phase 2 state — equation sandbox
  const [p2Preset, setP2Preset] = useState(0)
  const [p2Asgn, setP2Asgn] = useState<Asgn>(() => emptyAsgn(PRESETS[0]))
  const [p2Pulsing, setP2Pulsing] = useState<Set<number>>(new Set())
  const pulseTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  const p2Graph = PRESETS[p2Preset]

  function handleP2PresetChange(idx: number) {
    pulseTimers.current.forEach(clearTimeout)
    pulseTimers.current = []
    setP2Preset(idx)
    setP2Asgn(emptyAsgn(PRESETS[idx]))
    setP2Pulsing(new Set())
  }

  function handleP2Toggle(nodeId: string) {
    pulseTimers.current.forEach(clearTimeout)
    pulseTimers.current = []
    setP2Pulsing(new Set())

    setP2Asgn((prev) => {
      const next = { ...prev }
      next[nodeId] =
        prev[nodeId] === null ? 0 : prev[nodeId] === 0 ? 1 : null
      return next
    })

    unlock(2)

    const affected = p2Graph.edges
      .map((e, i) => (e.from === nodeId || e.to === nodeId ? i : -1))
      .filter((i) => i >= 0)

    const timers: ReturnType<typeof setTimeout>[] = []
    affected.forEach((eqIdx, order) => {
      timers.push(
        setTimeout(() => {
          setP2Pulsing((prev) => new Set([...prev, eqIdx]))
        }, order * 150)
      )
    })
    timers.push(
      setTimeout(
        () => setP2Pulsing(new Set()),
        affected.length * 150 + 500
      )
    )
    pulseTimers.current = timers
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      pulseTimers.current.forEach(clearTimeout)
    }
  }, [])

  // Phase 3 state — synced bridge
  const [p3Preset, setP3Preset] = useState(0)
  const [p3Asgn, setP3Asgn] = useState<Asgn>(() => emptyAsgn(PRESETS[0]))

  const p3Graph = PRESETS[p3Preset]

  function handleP3PresetChange(idx: number) {
    setP3Preset(idx)
    setP3Asgn(emptyAsgn(PRESETS[idx]))
  }

  function handleP3Interact(nodeId: string) {
    setP3Asgn((prev) => {
      const next = { ...prev }
      next[nodeId] =
        prev[nodeId] === null ? 0 : prev[nodeId] === 0 ? 1 : null
      return next
    })
    unlock(3)
  }

  // Phase 3.5 state — speed run animation
  const srOrder = useMemo(() => computePropagation(SPEED_RUN), [])
  const [srRunning, setSrRunning] = useState(false)
  const [srAsgn, setSrAsgn] = useState<Asgn>(() => emptyAsgn(SPEED_RUN))
  const [srStep, setSrStep] = useState(0)

  useEffect(() => {
    if (!srRunning) return
    if (srStep >= srOrder.length) {
      setSrRunning(false)
      unlock(4)
      return
    }
    const timer = setTimeout(() => {
      setSrAsgn((prev) => ({
        ...prev,
        [srOrder[srStep].id]: srOrder[srStep].val,
      }))
      setSrStep((s) => s + 1)
    }, 120)
    return () => clearTimeout(timer)
  }, [srRunning, srStep, srOrder])

  function startSpeedRun() {
    setSrAsgn(emptyAsgn(SPEED_RUN))
    setSrStep(0)
    setSrRunning(true)
  }

  function resetSpeedRun() {
    setSrRunning(false)
    setSrAsgn(emptyAsgn(SPEED_RUN))
    setSrStep(0)
  }

  // Phase 4 state — formal walkthrough
  const [formalCase, setFormalCase] = useState(0)
  const [formalStep, setFormalStep] = useState(0)

  const activeCase = FORMAL_CASES[formalCase]
  const activeStep = activeCase.steps[formalStep]

  function handleFormalCaseChange(idx: number) {
    setFormalCase(idx)
    setFormalStep(0)
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      {/* Phase tabs */}
      <div className="flex overflow-x-auto border-b bg-muted/30">
        {PHASE_TABS.map((label, i) => (
          <button
            key={i}
            onClick={() => unlocked[i] && setPhase(i)}
            className={`px-3 py-2 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
              i === phase
                ? "border-primary text-primary bg-primary/10"
                : unlocked[i]
                  ? "border-transparent text-muted-foreground hover:text-foreground cursor-pointer"
                  : "border-transparent text-muted-foreground/40 cursor-not-allowed"
            }`}
            disabled={!unlocked[i]}
          >
            {!unlocked[i] && "🔒 "}
            {label}
          </button>
        ))}
      </div>

      {/* ── Phase 1: Color the Graph ─────────────────────────────────────── */}
      {phase === 0 && (
        <div>
          <div className="px-4 py-3 border-b bg-muted/10 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="font-semibold text-sm">
                {p1Graph.subtitle}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                Click nodes to assign colors
              </span>
            </div>
            <div className="flex gap-1">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleP1PresetChange(i)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    i === p1Preset
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <VisGraph
              preset={p1Graph}
              assignments={p1Colors}
              onNodeClick={handleP1NodeClick}
              height="340px"
            />
          </div>

          {/* Status bar */}
          <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between flex-wrap gap-2">
            <div className="flex gap-4 text-xs">
              <span>
                Violations:{" "}
                <strong
                  className={
                    p1Violations.size > 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }
                >
                  {p1Violations.size}
                </strong>
              </span>
              <span className="text-muted-foreground">
                Moves: {p1Clicks}
              </span>
              <span className="text-muted-foreground">
                Search space: 2
                <sup>{p1Graph.nodes.length}</sup> ={" "}
                {Math.pow(2, p1Graph.nodes.length).toLocaleString()} colorings
              </span>
              {p1Solved && (
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  Solved!
                </span>
              )}
            </div>
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={handleP1Undo}
                disabled={p1History.length === 0}
                className="text-xs"
              >
                Undo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleP1Reset}
                className="text-xs"
              >
                Reset
              </Button>
              {p1Clicks >= 6 && !p1Graph.solvable && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    unlock(1)
                    setPhase(1)
                  }}
                  className="text-xs"
                >
                  I need a different approach →
                </Button>
              )}
            </div>
          </div>

          {/* Color legend */}
          <div className="px-4 py-2 border-t flex gap-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border-2 inline-block"
                style={{
                  borderColor: NODE_STYLES.empty.border,
                  backgroundColor: NODE_STYLES.empty.background,
                }}
              />
              Uncolored
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border-2 inline-block"
                style={{
                  borderColor: NODE_STYLES.color0.border,
                  backgroundColor: NODE_STYLES.color0.background,
                }}
              />
              Color A (0)
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border-2 inline-block"
                style={{
                  borderColor: NODE_STYLES.color1.border,
                  backgroundColor: NODE_STYLES.color1.background,
                }}
              />
              Color B (1)
            </span>
          </div>
        </div>
      )}

      {/* ── Phase 2: Solve the Equations ──────────────────────────────────── */}
      {phase === 1 && (
        <div>
          <div className="px-4 py-3 border-b bg-muted/10 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="font-semibold text-sm">
                Same problem, different language
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                Toggle variables to solve the system
              </span>
            </div>
            <div className="flex gap-1">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleP2PresetChange(i)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    i === p2Preset
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-3">
              Each edge (v<sub>i</sub>, v<sub>j</sub>) becomes the equation x
              <sub>i</sub> + x<sub>j</sub> ≡ 1 (mod 2): the two endpoints must
              have <em>different</em> values. Can you satisfy every equation?
            </p>
            <EquationPanel
              preset={p2Graph}
              assignments={p2Asgn}
              onToggle={handleP2Toggle}
              pulsingIndices={p2Pulsing}
            />
          </div>

          <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setP2Asgn(emptyAsgn(PRESETS[p2Preset]))}
              className="text-xs"
            >
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                unlock(2)
                setPhase(2)
              }}
              className="text-xs"
            >
              What if these are connected? →
            </Button>
          </div>
        </div>
      )}

      {/* ── Phase 3: The Bridge ──────────────────────────────────────────── */}
      {phase === 2 && (
        <div>
          <div className="px-4 py-3 border-b bg-muted/10 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="font-semibold text-sm">
                Two views, one problem
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                Click nodes or toggle variables — they stay in sync
              </span>
            </div>
            <div className="flex gap-1">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleP3PresetChange(i)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    i === p3Preset
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1.5">
                  Graph — click nodes to color
                </div>
                <VisGraph
                  preset={p3Graph}
                  assignments={p3Asgn}
                  onNodeClick={handleP3Interact}
                  height="300px"
                />
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1.5">
                  Equations — toggle variables
                </div>
                <EquationPanel
                  preset={p3Graph}
                  assignments={p3Asgn}
                  onToggle={handleP3Interact}
                />
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setP3Asgn(emptyAsgn(PRESETS[p3Preset]))}
              className="text-xs"
            >
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                unlock(3)
                setPhase(3)
              }}
              className="text-xs"
            >
              Watch it at scale →
            </Button>
          </div>
        </div>
      )}

      {/* ── Phase 3.5: Speed Run ─────────────────────────────────────────── */}
      {phase === 3 && (
        <div>
          <div className="px-4 py-3 border-b bg-muted/10">
            <span className="font-semibold text-sm">
              Auto-propagation: the right representation solves itself
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              {srRunning
                ? `Solving... (${srStep}/${srOrder.length})`
                : srStep >= srOrder.length
                  ? "Complete — every node colored, every equation satisfied"
                  : "20 nodes, 27 equations. Click below to watch the cascade."}
            </span>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1.5">
                  Graph
                </div>
                <VisGraph
                  preset={SPEED_RUN}
                  assignments={srAsgn}
                  height="260px"
                />
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground mb-1.5">
                  Equations
                </div>
                <EquationPanel
                  preset={SPEED_RUN}
                  assignments={srAsgn}
                />
              </div>
            </div>
          </div>

          <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between flex-wrap gap-2">
            <div className="flex gap-1.5">
              {!srRunning && srStep === 0 && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={startSpeedRun}
                  className="text-xs"
                >
                  Watch it solve →
                </Button>
              )}
              {(srRunning || srStep > 0) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSpeedRun}
                  className="text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
            {srStep >= srOrder.length && (
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  unlock(4)
                  setPhase(4)
                }}
                className="text-xs"
              >
                See the formal proof →
              </Button>
            )}
          </div>
        </div>
      )}

      {/* ── Phase 4: The Proof ───────────────────────────────────────────── */}
      {phase === 4 && (
        <div>
          <div className="px-4 py-3 border-b bg-muted/10 flex items-center justify-between flex-wrap gap-2">
            <span className="font-semibold text-sm">Formal Walkthrough</span>
            <div className="flex gap-1">
              {FORMAL_CASES.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleFormalCaseChange(i)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    i === formalCase
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Progress tracker */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex gap-1 mb-2">
              {activeCase.steps.map((s, i) => {
                const isReached = i <= formalStep
                const isCurrent = i === formalStep
                const color = TAG_COLORS[s.tag] ?? "bg-muted"
                return (
                  <button
                    key={i}
                    onClick={() => setFormalStep(i)}
                    className={`flex-1 h-7 rounded transition-all duration-300 ${color} ${
                      isCurrent ? "ring-2 ring-primary ring-offset-1" : ""
                    }`}
                    style={{ opacity: isReached ? 1 : 0.2 }}
                    aria-label={`Go to step ${i + 1}`}
                  />
                )
              })}
            </div>
            <div className="flex justify-center gap-3 text-[10px] text-muted-foreground flex-wrap">
              {Object.entries(TAG_LABELS).map(([key, label]) => (
                <span key={key} className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-sm inline-block ${TAG_COLORS[key]}`}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <div className="px-4 py-2 border-t border-b bg-muted/10">
            <p className="text-xs text-muted-foreground">
              <strong>{activeCase.subtitle}</strong>
            </p>
          </div>

          {/* Step content */}
          <div className="px-4 py-4 min-h-[140px]">
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded text-white ${TAG_COLORS[activeStep.tag]}`}
              >
                {TAG_LABELS[activeStep.tag]}
              </span>
              <span className="text-xs text-muted-foreground">
                Step {formalStep + 1} of {activeCase.steps.length}
              </span>
            </div>
            <MathBlock
              key={`${formalCase}-${formalStep}`}
              formula={activeStep.math}
            />
            <p className="text-sm text-muted-foreground italic text-center mt-3">
              {activeStep.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => formalStep > 0 && setFormalStep(formalStep - 1)}
              disabled={formalStep === 0}
            >
              ← Previous
            </Button>
            <div className="flex items-center gap-1.5">
              {activeCase.steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFormalStep(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === formalStep
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
              onClick={() =>
                formalStep < activeCase.steps.length - 1 &&
                setFormalStep(formalStep + 1)
              }
              disabled={formalStep === activeCase.steps.length - 1}
            >
              Next →
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
