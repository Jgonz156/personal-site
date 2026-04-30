"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

type Evidence = "true" | "false" | "unknown"

interface NodeState {
  evidence: Evidence
}

const NODES = [
  { id: "burglary", label: "Burglary", x: 90, y: 60, prior: 0.001 },
  { id: "earthquake", label: "Earthquake", x: 310, y: 60, prior: 0.002 },
  { id: "alarm", label: "Alarm", x: 200, y: 170, prior: null },
  { id: "john", label: "John Calls", x: 100, y: 280, prior: null },
  { id: "mary", label: "Mary Calls", x: 300, y: 280, prior: null },
] as const

const EDGES = [
  { from: "burglary", to: "alarm" },
  { from: "earthquake", to: "alarm" },
  { from: "alarm", to: "john" },
  { from: "alarm", to: "mary" },
] as const

// P(Alarm | Burglary, Earthquake)
const ALARM_CPT: Record<string, number> = {
  "true,true": 0.95,
  "true,false": 0.94,
  "false,true": 0.29,
  "false,false": 0.001,
}

const JOHN_GIVEN_ALARM: Record<string, number> = {
  true: 0.9,
  false: 0.05,
}

const MARY_GIVEN_ALARM: Record<string, number> = {
  true: 0.7,
  false: 0.01,
}

type World = {
  burglary: boolean
  earthquake: boolean
  alarm: boolean
  john: boolean
  mary: boolean
}

function jointProbability(w: World): number {
  const pB = w.burglary ? 0.001 : 0.999
  const pE = w.earthquake ? 0.002 : 0.998
  const pAGivenBE = ALARM_CPT[`${w.burglary},${w.earthquake}`]
  const pA = w.alarm ? pAGivenBE : 1 - pAGivenBE
  const pJGivenA = JOHN_GIVEN_ALARM[String(w.alarm)]
  const pJ = w.john ? pJGivenA : 1 - pJGivenA
  const pMGivenA = MARY_GIVEN_ALARM[String(w.alarm)]
  const pM = w.mary ? pMGivenA : 1 - pMGivenA
  return pB * pE * pA * pJ * pM
}

function enumerate(states: Record<string, NodeState>): Record<string, number> {
  // Enumerate all 2^5 = 32 worlds, sum joint probabilities matching evidence,
  // then compute P(node = true | evidence) for every node.
  const evidence = states
  let total = 0
  const trueMass: Record<string, number> = {
    burglary: 0,
    earthquake: 0,
    alarm: 0,
    john: 0,
    mary: 0,
  }

  for (let i = 0; i < 32; i++) {
    const w: World = {
      burglary: !!(i & 1),
      earthquake: !!(i & 2),
      alarm: !!(i & 4),
      john: !!(i & 8),
      mary: !!(i & 16),
    }
    // Skip if inconsistent with evidence
    let consistent = true
    for (const id of Object.keys(evidence)) {
      const ev = evidence[id].evidence
      if (ev === "unknown") continue
      const wantTrue = ev === "true"
      if ((w as Record<string, boolean>)[id] !== wantTrue) {
        consistent = false
        break
      }
    }
    if (!consistent) continue
    const p = jointProbability(w)
    total += p
    for (const id of Object.keys(trueMass)) {
      if ((w as Record<string, boolean>)[id]) trueMass[id] += p
    }
  }

  if (total === 0) {
    return { burglary: NaN, earthquake: NaN, alarm: NaN, john: NaN, mary: NaN }
  }

  const result: Record<string, number> = {}
  for (const id of Object.keys(trueMass)) result[id] = trueMass[id] / total
  return result
}

const NODE_W = 110
const NODE_H = 38

export function BayesianNetworkExplorer() {
  const [states, setStates] = useState<Record<string, NodeState>>(() =>
    Object.fromEntries(NODES.map((n) => [n.id, { evidence: "unknown" }])),
  )

  const posteriors = useMemo(() => enumerate(states), [states])

  const cycle = (id: string) => {
    setStates((prev) => {
      const cur = prev[id].evidence
      const next: Evidence =
        cur === "unknown" ? "true" : cur === "true" ? "false" : "unknown"
      return { ...prev, [id]: { evidence: next } }
    })
  }

  const reset = () =>
    setStates(
      Object.fromEntries(NODES.map((n) => [n.id, { evidence: "unknown" }])),
    )

  const fillForNode = (ev: Evidence, p: number) => {
    if (ev === "true") return "#16a34a"
    if (ev === "false") return "#dc2626"
    if (isNaN(p)) return "#9ca3af"
    // gradient by posterior probability
    const t = p
    const r = Math.round(255 * (1 - t) + 134 * t)
    const g = Math.round(255 * (1 - t) + 239 * t)
    const b = Math.round(255 * (1 - t) + 172 * t)
    return `rgb(${r},${g},${b})`
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <span className="font-semibold text-sm">
          Bayesian Network — burglary / alarm / witness calls
        </span>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-green-600" />
            observed true
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-red-600" />
            observed false
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 text-xs"
            onClick={reset}
          >
            Reset
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_240px]">
        <svg viewBox="0 0 400 340" className="w-full h-auto">
          <defs>
            <marker
              id="bn-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#6366f1" />
            </marker>
          </defs>

          {EDGES.map(({ from, to }) => {
            const a = NODES.find((n) => n.id === from)!
            const b = NODES.find((n) => n.id === to)!
            const dx = b.x - a.x
            const dy = b.y - a.y
            const dist = Math.hypot(dx, dy)
            const ux = dx / dist
            const uy = dy / dist
            const ax = a.x + ux * (NODE_W / 2 + 2)
            const ay = a.y + uy * (NODE_H / 2 + 2)
            const bx = b.x - ux * (NODE_W / 2 + 8)
            const by = b.y - uy * (NODE_H / 2 + 8)
            return (
              <line
                key={`${from}-${to}`}
                x1={ax}
                y1={ay}
                x2={bx}
                y2={by}
                stroke="#6366f1"
                strokeWidth={1.5}
                markerEnd="url(#bn-arrow)"
              />
            )
          })}

          {NODES.map((n) => {
            const ev = states[n.id].evidence
            const p = posteriors[n.id]
            const fill = fillForNode(ev, p)
            const textColor =
              ev === "true" || ev === "false" || (!isNaN(p) && p > 0.55)
                ? "white"
                : "currentColor"
            return (
              <g
                key={n.id}
                onClick={() => cycle(n.id)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={n.x - NODE_W / 2}
                  y={n.y - NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx={10}
                  fill={fill}
                  stroke="#374151"
                  strokeWidth={ev === "unknown" ? 1.25 : 2.25}
                />
                <text
                  x={n.x}
                  y={n.y - 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={textColor}
                  className={textColor === "currentColor" ? "fill-foreground" : ""}
                  style={{ pointerEvents: "none" }}
                >
                  {n.label}
                </text>
                <text
                  x={n.x}
                  y={n.y + 11}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="monospace"
                  fill={textColor}
                  className={textColor === "currentColor" ? "fill-muted-foreground" : ""}
                  style={{ pointerEvents: "none" }}
                >
                  {ev === "true"
                    ? "= true"
                    : ev === "false"
                      ? "= false"
                      : isNaN(p)
                        ? "—"
                        : `P = ${(p * 100).toFixed(1)}%`}
                </text>
              </g>
            )
          })}
        </svg>

        <div className="border-l p-3 text-xs space-y-2 bg-muted/20">
          <p className="font-semibold text-sm">How to read it</p>
          <p className="text-muted-foreground leading-relaxed">
            Click any node to cycle{" "}
            <span className="font-mono">unknown → true → false → unknown</span>.
            Observed nodes turn green/red. Other nodes show their{" "}
            <em>posterior probability</em> given everything else you have set.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Try observing <span className="font-mono">John Calls = true</span>:
            P(Burglary) jumps from 0.1% to ~1.6%. Then add{" "}
            <span className="font-mono">Mary Calls = true</span> and watch it
            rocket to ~28%. That is{" "}
            <em>enumeration inference</em> — the engine of CMSI 3300.
          </p>
        </div>
      </div>
    </div>
  )
}
