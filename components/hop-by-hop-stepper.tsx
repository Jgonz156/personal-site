"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 640
const VH = 280

interface NodeDef {
  id: string; label: string; sub: string; x: number; kind: "machine" | "router"
}

const nodes: NodeDef[] = [
  { id: "src",  label: "Source",      sub: "10.0.1.2",   x: 60,  kind: "machine" },
  { id: "r1",   label: "Router 1",    sub: "Gateway",    x: 230, kind: "router" },
  { id: "r2",   label: "Router 2",    sub: "Gateway",    x: 400, kind: "router" },
  { id: "dst",  label: "Destination", sub: "10.0.3.5",   x: 570, kind: "machine" },
]

const linkLabels = ["Ethernet", "WiFi", "Ethernet"]

type PacketPart = "eth-a" | "eth-b" | "eth-c" | "ip" | "tcp" | "payload" | "crc"

const partColors: Record<PacketPart, string> = {
  "eth-a":  "fill-amber-500/20 stroke-amber-500/50",
  "eth-b":  "fill-orange-500/20 stroke-orange-500/50",
  "eth-c":  "fill-yellow-500/20 stroke-yellow-500/50",
  ip:       "fill-purple-500/15 stroke-purple-500/40",
  tcp:      "fill-blue-500/15 stroke-blue-500/40",
  payload:  "fill-emerald-500/15 stroke-emerald-500/40",
  crc:      "fill-rose-500/20 stroke-rose-500/50",
}

const partTextColors: Record<PacketPart, string> = {
  "eth-a":  "fill-amber-700 dark:fill-amber-300",
  "eth-b":  "fill-orange-700 dark:fill-orange-300",
  "eth-c":  "fill-yellow-700 dark:fill-yellow-300",
  ip:       "fill-purple-700 dark:fill-purple-300",
  tcp:      "fill-blue-700 dark:fill-blue-300",
  payload:  "fill-emerald-700 dark:fill-emerald-300",
  crc:      "fill-rose-700 dark:fill-rose-300",
}

const partLabels: Record<PacketPart, string> = {
  "eth-a": "Eth A", "eth-b": "Eth B", "eth-c": "Eth C",
  ip: "IP hdr", tcp: "TCP hdr", payload: '"hello"', crc: "CRC",
}

interface StepDef {
  title: string
  description: string
  activeLink: number | null
  frameAt: string | null
  frameLabel: string
  strippedAt: string | null
  packet: PacketPart[]
}

const steps: StepDef[] = [
  {
    title: "Packet Created",
    description: "Source wraps payload in IP + TCP headers. IP src/dst stay constant for the entire journey.",
    activeLink: null, frameAt: null, frameLabel: "", strippedAt: null,
    packet: ["ip", "tcp", "payload"],
  },
  {
    title: "Frame A — Source → Router 1",
    description: "Source wraps packet in Ethernet Frame A (dst MAC: Router 1). Frame is specific to Link 1.",
    activeLink: 0, frameAt: "src", frameLabel: "Frame A", strippedAt: null,
    packet: ["eth-a", "ip", "tcp", "payload", "crc"],
  },
  {
    title: "Router 1 Strips Frame A",
    description: "Router 1 receives frame, checks CRC, strips Ethernet header. Inner packet is revealed unchanged.",
    activeLink: null, frameAt: null, frameLabel: "", strippedAt: "r1",
    packet: ["ip", "tcp", "payload"],
  },
  {
    title: "Frame B — Router 1 → Router 2",
    description: "Router 1 wraps packet in Frame B for WiFi link. New MACs, same IP header inside.",
    activeLink: 1, frameAt: "r1", frameLabel: "Frame B", strippedAt: null,
    packet: ["eth-b", "ip", "tcp", "payload", "crc"],
  },
  {
    title: "Router 2 Strips Frame B",
    description: "Router 2 receives frame, strips WiFi header. The inner packet is still identical.",
    activeLink: null, frameAt: null, frameLabel: "", strippedAt: "r2",
    packet: ["ip", "tcp", "payload"],
  },
  {
    title: "Frame C — Router 2 → Destination",
    description: "Router 2 wraps packet in Frame C (dst MAC: Destination NIC). Final hop.",
    activeLink: 2, frameAt: "r2", frameLabel: "Frame C", strippedAt: null,
    packet: ["eth-c", "ip", "tcp", "payload", "crc"],
  },
  {
    title: "Destination Receives",
    description: "Destination strips Frame C and processes the packet up the stack. IP addresses confirmed, payload delivered.",
    activeLink: null, frameAt: null, frameLabel: "", strippedAt: "dst",
    packet: ["ip", "tcp", "payload"],
  },
]

const NODE_Y = 80
const NODE_H = 60
const NODE_W_MACHINE = 80
const NODE_W_ROUTER = 60

function getNodeRect(n: NodeDef) {
  const w = n.kind === "machine" ? NODE_W_MACHINE : NODE_W_ROUTER
  return { x: n.x - w / 2, y: NODE_Y, w, h: NODE_H }
}

function PacketBar({ parts }: { parts: PacketPart[] }) {
  const PART_W = 52
  const PART_H = 24
  const totalW = parts.length * PART_W
  const sx = (VW - totalW) / 2
  const barY = 195

  const hasFrame = parts.length > 3

  return (
    <g>
      {/* Outer bracket for the full frame when frame headers are present */}
      {hasFrame && (
        <rect x={sx - 3} y={barY - 3} width={totalW + 6} height={PART_H + 6} rx={5}
          className="fill-amber-500/5 stroke-amber-500/25 stroke-1" />
      )}

      {parts.map((p, i) => (
        <g key={`${p}-${i}`}>
          <rect x={sx + i * PART_W + 1} y={barY} width={PART_W - 2} height={PART_H} rx={3}
            className={cn("stroke-1 transition-all duration-300", partColors[p])} />
          <text x={sx + i * PART_W + PART_W / 2} y={barY + 15} textAnchor="middle"
            className={cn("font-bold", partTextColors[p])} fontSize={7}>
            {partLabels[p]}
          </text>
        </g>
      ))}

      <text x={VW / 2} y={barY + PART_H + 16} textAnchor="middle"
        className="fill-muted-foreground/30 font-semibold" fontSize={7}>
        {hasFrame
          ? "↑ frame wraps the packet for one link"
          : "↑ inner packet — never changes during transit"}
      </text>
    </g>
  )
}

export function HopByHopStepper({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const s = steps[step]

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold">{s.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
        </div>
        <span className="text-xs text-muted-foreground font-mono">Step {step + 1} / {steps.length}</span>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          {/* Links */}
          {nodes.slice(0, -1).map((n, i) => {
            const next = nodes[i + 1]
            const r1 = getNodeRect(n)
            const r2 = getNodeRect(next)
            const isActive = s.activeLink === i
            return (
              <g key={`link-${i}`}>
                <line
                  x1={r1.x + r1.w} y1={NODE_Y + NODE_H / 2}
                  x2={r2.x} y2={NODE_Y + NODE_H / 2}
                  className={cn(
                    "stroke-[1.5] transition-all duration-300",
                    isActive ? "stroke-amber-500" : "stroke-muted-foreground/15"
                  )}
                  strokeDasharray={isActive ? undefined : "3 3"}
                />
                <text
                  x={(n.x + next.x) / 2} y={NODE_Y + NODE_H / 2 - 8}
                  textAnchor="middle"
                  className={cn(
                    "transition-all duration-300",
                    isActive ? "fill-amber-600 dark:fill-amber-400" : "fill-muted-foreground/25"
                  )} fontSize={7}>
                  {linkLabels[i]}
                </text>

                {isActive && s.frameLabel && (
                  <g>
                    <rect
                      x={(n.x + next.x) / 2 - 28} y={NODE_Y + NODE_H / 2 + 4}
                      width={56} height={18} rx={3}
                      className="fill-amber-500/20 stroke-amber-500/50 stroke-1" />
                    <text
                      x={(n.x + next.x) / 2} y={NODE_Y + NODE_H / 2 + 16}
                      textAnchor="middle"
                      className="fill-amber-700 dark:fill-amber-300 font-bold" fontSize={8}>
                      {s.frameLabel}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map(n => {
            const r = getNodeRect(n)
            const isStripped = s.strippedAt === n.id
            const isMachine = n.kind === "machine"
            const fill = isMachine ? "fill-blue-500/10" : "fill-slate-500/10"
            const stroke = isMachine ? "stroke-blue-500/40" : "stroke-slate-500/30"
            const textFill = isMachine
              ? "fill-blue-700 dark:fill-blue-300"
              : "fill-slate-600 dark:fill-slate-300"

            return (
              <g key={n.id}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={isMachine ? 8 : 20}
                  className={cn(
                    "stroke-[1.5] transition-all duration-300",
                    isStripped ? "fill-purple-500/10 stroke-purple-500/40" : cn(fill, stroke)
                  )} />
                <text x={n.x} y={NODE_Y + 24} textAnchor="middle"
                  className={cn("font-semibold transition-all", textFill)} fontSize={9}>
                  {n.label}
                </text>
                <text x={n.x} y={NODE_Y + 38} textAnchor="middle"
                  className="fill-muted-foreground/40" fontSize={7}>
                  {n.sub}
                </text>

                {isStripped && (
                  <text x={n.x} y={NODE_Y + NODE_H + 16} textAnchor="middle"
                    className="fill-purple-600 dark:fill-purple-400 font-semibold" fontSize={7}>
                    ▲ packet revealed
                  </text>
                )}
              </g>
            )
          })}

          {/* Dynamic packet visualization */}
          <PacketBar parts={s.packet} />
        </svg>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <button onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors disabled:opacity-30 hover:bg-muted">
            ← Previous
          </button>
          <button onClick={() => setStep(0)}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors hover:bg-muted">
            Reset
          </button>
          <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
            disabled={step === steps.length - 1}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors disabled:opacity-30 hover:bg-muted">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
