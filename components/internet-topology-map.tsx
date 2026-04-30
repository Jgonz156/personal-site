"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"

type Tier = "edge" | "isp" | "backbone"

interface Node {
  id: string
  label: string
  tier: Tier
  x: number
  y: number
}

interface Edge {
  a: string
  b: string
  weight: number // ms latency
}

const NODES: Node[] = [
  // Backbone tier (top)
  { id: "B1", label: "IXP-West", tier: "backbone", x: 140, y: 70 },
  { id: "B2", label: "IXP-Central", tier: "backbone", x: 360, y: 70 },
  { id: "B3", label: "IXP-East", tier: "backbone", x: 580, y: 70 },
  // ISP tier (middle)
  { id: "I1", label: "ISP-A", tier: "isp", x: 80, y: 200 },
  { id: "I2", label: "ISP-B", tier: "isp", x: 240, y: 200 },
  { id: "I3", label: "ISP-C", tier: "isp", x: 400, y: 200 },
  { id: "I4", label: "ISP-D", tier: "isp", x: 560, y: 200 },
  { id: "I5", label: "ISP-E", tier: "isp", x: 660, y: 200 },
  // Edge tier (bottom): laptops, phones, IoT
  { id: "E1", label: "Phone", tier: "edge", x: 50, y: 320 },
  { id: "E2", label: "Laptop", tier: "edge", x: 130, y: 320 },
  { id: "E3", label: "IoT", tier: "edge", x: 220, y: 320 },
  { id: "E4", label: "Server", tier: "edge", x: 320, y: 320 },
  { id: "E5", label: "Phone", tier: "edge", x: 420, y: 320 },
  { id: "E6", label: "Laptop", tier: "edge", x: 520, y: 320 },
  { id: "E7", label: "IoT", tier: "edge", x: 600, y: 320 },
  { id: "E8", label: "Server", tier: "edge", x: 690, y: 320 },
]

const EDGES: Edge[] = [
  // Backbone–backbone (very fast, fat pipes)
  { a: "B1", b: "B2", weight: 8 },
  { a: "B2", b: "B3", weight: 9 },
  { a: "B1", b: "B3", weight: 16 },
  // ISP–backbone (fast)
  { a: "I1", b: "B1", weight: 12 },
  { a: "I2", b: "B1", weight: 14 },
  { a: "I2", b: "B2", weight: 13 },
  { a: "I3", b: "B2", weight: 11 },
  { a: "I4", b: "B3", weight: 13 },
  { a: "I5", b: "B3", weight: 10 },
  // ISP–ISP (peering, mid speed)
  { a: "I3", b: "I4", weight: 18 },
  // Edge–ISP (slow last mile)
  { a: "E1", b: "I1", weight: 25 },
  { a: "E2", b: "I1", weight: 22 },
  { a: "E3", b: "I2", weight: 28 },
  { a: "E4", b: "I2", weight: 18 },
  { a: "E5", b: "I3", weight: 24 },
  { a: "E6", b: "I4", weight: 26 },
  { a: "E7", b: "I4", weight: 32 },
  { a: "E8", b: "I5", weight: 19 },
]

const NODE_R: Record<Tier, number> = {
  edge: 9,
  isp: 14,
  backbone: 20,
}

const NODE_FILL: Record<Tier, string> = {
  edge: "#bae6fd",
  isp: "#a78bfa",
  backbone: "#1e3a8a",
}

const NODE_STROKE: Record<Tier, string> = {
  edge: "#0284c7",
  isp: "#6d28d9",
  backbone: "#1e3a8a",
}

function buildAdj() {
  const adj: Record<string, { neighbor: string; weight: number }[]> = {}
  for (const n of NODES) adj[n.id] = []
  for (const e of EDGES) {
    adj[e.a].push({ neighbor: e.b, weight: e.weight })
    adj[e.b].push({ neighbor: e.a, weight: e.weight })
  }
  return adj
}

function dijkstra(src: string, dst: string): { path: string[]; cost: number } {
  const adj = buildAdj()
  const dist: Record<string, number> = {}
  const prev: Record<string, string | null> = {}
  for (const n of NODES) {
    dist[n.id] = Infinity
    prev[n.id] = null
  }
  dist[src] = 0
  const visited = new Set<string>()
  while (visited.size < NODES.length) {
    let u: string | null = null
    let best = Infinity
    for (const n of NODES) {
      if (visited.has(n.id)) continue
      if (dist[n.id] < best) {
        best = dist[n.id]
        u = n.id
      }
    }
    if (u === null) break
    if (u === dst) break
    visited.add(u)
    for (const { neighbor, weight } of adj[u]) {
      const nd = dist[u] + weight
      if (nd < dist[neighbor]) {
        dist[neighbor] = nd
        prev[neighbor] = u
      }
    }
  }
  const path: string[] = []
  let cur: string | null = dst
  while (cur !== null) {
    path.unshift(cur)
    cur = prev[cur]
  }
  if (path[0] !== src) return { path: [], cost: Infinity }
  return { path, cost: dist[dst] }
}

export function InternetTopologyMap() {
  const [src, setSrc] = useState<string>("E1")
  const [dst, setDst] = useState<string>("E8")
  const [hopIndex, setHopIndex] = useState<number>(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const { path, cost } = useMemo(() => dijkstra(src, dst), [src, dst])

  useEffect(() => {
    setHopIndex(0)
    setRunning(false)
  }, [src, dst])

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setHopIndex((h) => {
        if (h >= path.length - 1) {
          setRunning(false)
          return h
        }
        return h + 1
      })
    }, 700)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, path.length])

  const pathSet = new Set(path)
  const pathEdgeSet = new Set<string>()
  for (let i = 0; i < path.length - 1; i++) {
    const key = [path[i], path[i + 1]].sort().join("|")
    pathEdgeSet.add(key)
  }

  const animatedHopSet = new Set<string>()
  for (let i = 0; i <= hopIndex && i < path.length - 1; i++) {
    animatedHopSet.add([path[i], path[i + 1]].sort().join("|"))
  }
  const packetNode = path[hopIndex] ?? null
  const packetPos = packetNode
    ? NODES.find((n) => n.id === packetNode)
    : null

  const nodesByTier = (t: Tier) => NODES.filter((n) => n.tier === t)

  return (
    <div className="my-6 border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <span className="font-semibold text-sm">
          Internet Topology — three-tier hierarchical packet routing
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          path cost <strong className="text-foreground">{cost === Infinity ? "—" : `${cost} ms`}</strong>
        </span>
      </div>

      <div className="px-4 py-3 border-b grid sm:grid-cols-2 gap-3 text-xs">
        <label className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-muted-foreground">source</span>
          <select
            className="border rounded h-8 px-2 bg-background flex-1"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
          >
            {nodesByTier("edge").map((n) => (
              <option key={n.id} value={n.id}>
                {n.id} ({n.label})
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-muted-foreground">destination</span>
          <select
            className="border rounded h-8 px-2 bg-background flex-1"
            value={dst}
            onChange={(e) => setDst(e.target.value)}
          >
            {nodesByTier("edge").map((n) => (
              <option key={n.id} value={n.id}>
                {n.id} ({n.label})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="px-4 py-3 border-b flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={() => setHopIndex((h) => Math.max(0, h - 1))}
          disabled={running}
        >
          ← hop
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs"
          onClick={() => setHopIndex((h) => Math.min(path.length - 1, h + 1))}
          disabled={running}
        >
          hop →
        </Button>
        <Button
          size="sm"
          variant={running ? "default" : "outline"}
          className="h-7 text-xs"
          onClick={() => {
            if (hopIndex >= path.length - 1) setHopIndex(0)
            setRunning(!running)
          }}
        >
          {running ? "Pause" : "Animate packet"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 text-xs ml-auto"
          onClick={() => {
            setHopIndex(0)
            setRunning(false)
          }}
        >
          Reset
        </Button>
      </div>

      <div className="px-2 pt-2">
        <svg viewBox="0 0 740 380" className="w-full h-auto">
          {/* Tier band labels */}
          <text
            x={730}
            y={50}
            textAnchor="end"
            fontSize="10"
            letterSpacing="1"
            className="fill-muted-foreground"
            fontWeight="700"
          >
            BACKBONE / IXPs
          </text>
          <text
            x={730}
            y={180}
            textAnchor="end"
            fontSize="10"
            letterSpacing="1"
            className="fill-muted-foreground"
            fontWeight="700"
          >
            ISP / ROUTERS
          </text>
          <text
            x={730}
            y={300}
            textAnchor="end"
            fontSize="10"
            letterSpacing="1"
            className="fill-muted-foreground"
            fontWeight="700"
          >
            EDGE DEVICES
          </text>

          <line x1={20} y1={120} x2={720} y2={120} stroke="#e5e7eb" strokeDasharray="4 4" />
          <line x1={20} y1={250} x2={720} y2={250} stroke="#e5e7eb" strokeDasharray="4 4" />

          {/* Edges */}
          {EDGES.map((e) => {
            const a = NODES.find((n) => n.id === e.a)!
            const b = NODES.find((n) => n.id === e.b)!
            const key = [e.a, e.b].sort().join("|")
            const onPath = pathEdgeSet.has(key)
            const animated = animatedHopSet.has(key)
            const baseColor = onPath ? "#dc2626" : "#94a3b8"
            const w = a.tier === "backbone" && b.tier === "backbone" ? 4 : a.tier === "edge" || b.tier === "edge" ? 1 : 2
            return (
              <line
                key={key}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={animated ? "#16a34a" : baseColor}
                strokeWidth={onPath ? w + 1 : w}
                opacity={onPath ? 0.95 : 0.55}
              />
            )
          })}

          {/* Nodes */}
          {NODES.map((n) => {
            const r = NODE_R[n.tier]
            const isEnd = n.id === src || n.id === dst
            const onPath = pathSet.has(n.id)
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill={NODE_FILL[n.tier]}
                  stroke={isEnd ? "#dc2626" : NODE_STROKE[n.tier]}
                  strokeWidth={isEnd ? 3 : onPath ? 2 : 1.25}
                />
                <text
                  x={n.x}
                  y={n.y + r + 11}
                  textAnchor="middle"
                  fontSize="9"
                  className="fill-foreground"
                  fontFamily="monospace"
                >
                  {n.id}
                </text>
                {n.tier === "backbone" && (
                  <text
                    x={n.x}
                    y={n.y + 4}
                    textAnchor="middle"
                    fontSize="8"
                    fill="white"
                    fontWeight="700"
                  >
                    {n.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* Packet */}
          {packetPos && (
            <circle
              cx={packetPos.x}
              cy={packetPos.y}
              r={6}
              fill="#facc15"
              stroke="#ca8a04"
              strokeWidth={1.5}
            >
              <animate
                attributeName="r"
                values="6;9;6"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </svg>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 text-xs leading-relaxed">
        <p className="mb-1">
          <strong className="text-foreground">Path:</strong>{" "}
          {path.length === 0 ? (
            <span className="text-muted-foreground">no route</span>
          ) : (
            <span className="font-mono">
              {path
                .map((id, i) => (i === hopIndex ? `[${id}]` : id))
                .join(" → ")}
            </span>
          )}
        </p>
        <p className="text-muted-foreground">
          Edge devices (light blue) connect through ISP routers (purple) and
          finally over the backbone (dark blue, fat pipes between IXPs). The
          weights are latencies; Dijkstra picks the cheapest end-to-end route —
          almost always pulling the packet <em>up</em> to the backbone before
          it can come back <em>down</em>. CMSI 3550 generalizes this to BGP
          (between ISPs) and OSPF (within an ISP), both of which use shortest
          paths from LN23.
        </p>
      </div>
    </div>
  )
}
