"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface StepDef {
  phase: "send" | "transit" | "receive"
  title: string
  description: string
  activeLayer: string
  packet: string[]
}

const steps: StepDef[] = [
  // ── Send Path ──
  {
    phase: "send", title: "Application: write()",
    description: "The process calls write() on a socket — a syscall, the same left-descent into the kernel we traced in LN19. Raw payload crosses the user/kernel boundary.",
    activeLayer: "s-app", packet: ["payload"],
  },
  {
    phase: "send", title: "Transport Layer",
    description: "The kernel's transport code adds a TCP header (source port, destination port, sequence number, checksum). The data is now a segment. For UDP it would be a datagram — same idea, fewer guarantees.",
    activeLayer: "s-transport", packet: ["tcp", "payload"],
  },
  {
    phase: "send", title: "Network Layer",
    description: "The kernel's IP code adds a network header (source IP, destination IP, TTL, protocol field). The data is now a packet — the unit that survives the entire journey.",
    activeLayer: "s-network", packet: ["ip", "tcp", "payload"],
  },
  {
    phase: "send", title: "Link Layer",
    description: "The kernel determines the next hop's MAC address (via ARP or neighbor cache), adds an Ethernet frame header and CRC. The data is now a frame — addressed for one physical hop.",
    activeLayer: "s-link", packet: ["eth", "ip", "tcp", "payload", "crc"],
  },
  {
    phase: "send", title: "NIC — DMA → Wire",
    description: "The NIC driver places the frame into a transmit descriptor ring and writes to the NIC's doorbell register. The NIC DMA's the frame, encodes it for the physical medium, and pushes the signal onto the wire.",
    activeLayer: "s-nic", packet: ["eth", "ip", "tcp", "payload", "crc"],
  },
  // ── Transit: Router 1 ──
  {
    phase: "transit", title: "Router 1 — NIC Receives",
    description: "Router 1's NIC detects a signal, decodes the frame, and DMA's it into a pre-allocated receive buffer. An interrupt is raised.",
    activeLayer: "r1-nic", packet: ["eth", "ip", "tcp", "payload", "crc"],
  },
  {
    phase: "transit", title: "Router 1 — Link Strips Frame",
    description: "The link layer validates the CRC and strips the frame header and trailer. If the CRC fails, the frame is dropped silently. The inner packet is revealed unchanged.",
    activeLayer: "r1-link", packet: ["ip", "tcp", "payload"],
  },
  {
    phase: "transit", title: "Router 1 — Net Driver Routes",
    description: "The network driver reads the destination IP, consults the routing table, and decrements TTL. The next hop is decided — the packet needs to reach Router 2.",
    activeLayer: "r1-driver", packet: ["ip", "tcp", "payload"],
  },
  {
    phase: "transit", title: "Router 1 — Link Wraps Frame",
    description: "The link layer builds a new frame for the next link — new source and destination MACs, a fresh CRC. The old frame is gone; only the inner packet persists.",
    activeLayer: "r1-link-out", packet: ["eth2", "ip", "tcp", "payload", "crc2"],
  },
  {
    phase: "transit", title: "Router 1 — NIC Transmits",
    description: "The NIC DMA's the new frame and encodes it for the outbound medium. The signal leaves Router 1 toward Router 2.",
    activeLayer: "r1-nic-out", packet: ["eth2", "ip", "tcp", "payload", "crc2"],
  },
  // ── Transit: Router 2 ──
  {
    phase: "transit", title: "Router 2 — NIC Receives",
    description: "Router 2's NIC captures the frame — same pattern as Router 1: DMA, interrupt, hand off to the driver.",
    activeLayer: "r2-nic", packet: ["eth2", "ip", "tcp", "payload", "crc2"],
  },
  {
    phase: "transit", title: "Router 2 — Link Strips Frame",
    description: "Link layer validates CRC and strips the frame. The inner packet is identical to what the sender originally built.",
    activeLayer: "r2-link", packet: ["ip", "tcp", "payload"],
  },
  {
    phase: "transit", title: "Router 2 — Net Driver Routes",
    description: "Network driver reads the destination IP — this time it's on a directly connected network. The final hop is decided: deliver to the destination machine's NIC.",
    activeLayer: "r2-driver", packet: ["ip", "tcp", "payload"],
  },
  {
    phase: "transit", title: "Router 2 — Link Wraps Frame",
    description: "Link layer builds the final frame. The destination MAC is the receiving machine's NIC. CRC is appended.",
    activeLayer: "r2-link-out", packet: ["eth3", "ip", "tcp", "payload", "crc3"],
  },
  {
    phase: "transit", title: "Router 2 — NIC Transmits",
    description: "NIC DMA's the frame and transmits onto the last link. The packet is one hop from its destination.",
    activeLayer: "r2-nic-out", packet: ["eth3", "ip", "tcp", "payload", "crc3"],
  },
  // ── Receive Path ──
  {
    phase: "receive", title: "NIC — Wire → DMA",
    description: "The destination NIC detects a signal on the wire, decodes it into a frame, and DMA's it into a pre-allocated receive buffer in host memory. An interrupt is raised — in interrupt context, just as in LN19.",
    activeLayer: "d-nic", packet: ["eth3", "ip", "tcp", "payload", "crc3"],
  },
  {
    phase: "receive", title: "Link Layer",
    description: "The kernel strips the frame header and checks the CRC for corruption. If the frame is invalid, it is dropped silently — no notification to the sender.",
    activeLayer: "d-link", packet: ["ip", "tcp", "payload"],
  },
  {
    phase: "receive", title: "Network Layer",
    description: "The kernel reads the IP header. Is this packet addressed to us? If yes, strip the IP header and pass upward. If not (and we are not a router), drop it.",
    activeLayer: "d-network", packet: ["tcp", "payload"],
  },
  {
    phase: "receive", title: "Transport Layer",
    description: "The kernel reads the TCP header. The port number identifies which local socket this belongs to. Data is placed in that socket's receive buffer.",
    activeLayer: "d-transport", packet: ["payload"],
  },
  {
    phase: "receive", title: "Application: read()",
    description: 'The process\'s read() returns with "hello". It had been sleeping in a blocked state — just like the sensor driver in LN19. The U-bend is complete.',
    activeLayer: "d-app", packet: ["payload"],
  },
]

const layerColors: Record<string, string> = {
  payload: "fill-emerald-500/25 stroke-emerald-500/50",
  tcp:     "fill-blue-500/25 stroke-blue-500/50",
  ip:      "fill-purple-500/25 stroke-purple-500/50",
  eth:     "fill-amber-500/25 stroke-amber-500/50",
  eth2:    "fill-orange-500/25 stroke-orange-500/50",
  eth3:    "fill-yellow-500/25 stroke-yellow-500/50",
  crc:     "fill-rose-500/25 stroke-rose-500/50",
  crc2:    "fill-red-500/25 stroke-red-500/50",
  crc3:    "fill-pink-500/25 stroke-pink-500/50",
}

const layerLabels: Record<string, string> = {
  payload: '"hello"', tcp: "TCP", ip: "IP",
  eth: "Eth", eth2: "Eth'", eth3: 'Eth"',
  crc: "CRC", crc2: "CRC'", crc3: 'CRC"',
}

const layerTextColors: Record<string, string> = {
  payload: "fill-emerald-700 dark:fill-emerald-300",
  tcp:     "fill-blue-700 dark:fill-blue-300",
  ip:      "fill-purple-700 dark:fill-purple-300",
  eth:     "fill-amber-700 dark:fill-amber-300",
  eth2:    "fill-orange-700 dark:fill-orange-300",
  eth3:    "fill-yellow-700 dark:fill-yellow-300",
  crc:     "fill-rose-700 dark:fill-rose-300",
  crc2:    "fill-red-700 dark:fill-red-300",
  crc3:    "fill-pink-700 dark:fill-pink-300",
}

const VW = 820
const VH = 370
const STACK_W = 100
const LAYER_H = 30

interface StackLayer { id: string; label: string; y: number }

const hostLayers = (prefix: string): StackLayer[] => [
  { id: `${prefix}-app`,       label: "Application", y: 30 },
  { id: `${prefix}-transport`, label: "Transport",   y: 72 },
  { id: `${prefix}-network`,   label: "Network",     y: 114 },
  { id: `${prefix}-link`,      label: "Link",        y: 156 },
  { id: `${prefix}-nic`,       label: "NIC",         y: 198 },
]

const senderLayers = hostLayers("s")
const receiverLayers = hostLayers("d")

const SENDER_X = 20
const R1_X = 205
const R2_X = 440
const RECEIVER_X = 700
const ROUTER_W = 115
const ROUTER_INNER_W = 95

function LayerStack({ layers, x, title, activeId, side }: {
  layers: StackLayer[]; x: number; title: string; activeId: string; side: "send" | "receive"
}) {
  return (
    <g>
      <text x={x + STACK_W / 2} y={18} textAnchor="middle"
        className="fill-foreground/70 font-bold" fontSize={10}>{title}</text>
      {layers.map((l, li) => {
        const isActive = l.id === activeId
        const isPast = (() => {
          const idx = layers.findIndex(la => la.id === activeId)
          const myIdx = li
          if (idx < 0) return false
          return side === "send" ? myIdx < idx : myIdx > idx
        })()
        return (
          <g key={l.id}>
            <rect x={x} y={l.y} width={STACK_W} height={LAYER_H} rx={5}
              className={cn(
                "stroke-[1.5] transition-all duration-300",
                isActive ? "fill-primary/15 stroke-primary" :
                isPast ? "fill-muted-foreground/5 stroke-muted-foreground/15" :
                "fill-slate-500/5 stroke-slate-500/15"
              )} />
            <text x={x + STACK_W / 2} y={l.y + 19} textAnchor="middle"
              className={cn(
                "font-semibold transition-all duration-300",
                isActive ? "fill-primary" :
                isPast ? "fill-muted-foreground/30" :
                "fill-muted-foreground/50"
              )} fontSize={9}>
              {l.label}
            </text>

            {li < layers.length - 1 && (
              <line
                x1={x + STACK_W / 2} y1={l.y + LAYER_H}
                x2={x + STACK_W / 2} y2={layers[li + 1].y}
                className="stroke-muted-foreground/10 stroke-1"
                markerEnd="url(#journey-arr)"
              />
            )}
          </g>
        )
      })}
    </g>
  )
}

function RouterBlock({ x, prefix, label, activeId }: {
  x: number; prefix: string; label: string; activeId: string
}) {
  const isRouterActive = activeId.startsWith(prefix)
  const containerY = 95
  const containerH = 148
  const innerX = x + (ROUTER_W - ROUTER_INNER_W) / 2

  const subLayers = [
    { id: `${prefix}-driver`,  label: "Net Driver", y: containerY + 12 },
    { id: `${prefix}-link`,    label: "Link",       y: containerY + 52 },
    { id: `${prefix}-nic`,     label: "NIC",        y: containerY + 92 },
    { id: `${prefix}-nic-out`, label: "NIC",        y: containerY + 92 },
  ]

  return (
    <g>
      <rect x={x} y={containerY} width={ROUTER_W} height={containerH} rx={8}
        className={cn(
          "stroke-[1.5] transition-all duration-300",
          isRouterActive
            ? "fill-amber-500/5 stroke-amber-500/40"
            : "fill-slate-500/5 stroke-slate-500/15"
        )} />
      <text x={x + ROUTER_W / 2} y={containerY - 8} textAnchor="middle"
        className={cn(
          "font-bold transition-all",
          isRouterActive ? "fill-amber-600 dark:fill-amber-400" : "fill-muted-foreground/40"
        )} fontSize={9}>
        {label}
      </text>

      {subLayers.slice(0, 3).map((sl, i) => {
        const isActive = sl.id === activeId
        || (sl.id === `${prefix}-nic` && activeId === `${prefix}-nic-out`)
        || (sl.id === `${prefix}-link` && activeId === `${prefix}-link-out`)
        return (
          <g key={sl.id}>
            <rect x={innerX} y={sl.y} width={ROUTER_INNER_W} height={LAYER_H} rx={4}
              className={cn(
                "stroke-[1.5] transition-all duration-300",
                isActive ? "fill-amber-500/15 stroke-amber-500/50" :
                isRouterActive ? "fill-slate-500/5 stroke-slate-500/20" :
                "fill-slate-500/5 stroke-slate-500/10"
              )} />
            <text x={innerX + ROUTER_INNER_W / 2} y={sl.y + 19} textAnchor="middle"
              className={cn(
                "font-semibold transition-all duration-300",
                isActive ? "fill-amber-700 dark:fill-amber-300" :
                "fill-muted-foreground/40"
              )} fontSize={8}>
              {sl.label}
            </text>

            {i < 2 && (
              <line
                x1={innerX + ROUTER_INNER_W / 2} y1={sl.y + LAYER_H}
                x2={innerX + ROUTER_INNER_W / 2} y2={subLayers[i + 1].y}
                className="stroke-muted-foreground/10 stroke-1"
              />
            )}
          </g>
        )
      })}
    </g>
  )
}

export function NetworkJourneyStepper({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const s = steps[step]

  const phaseColor = s.phase === "send" ? "text-blue-600 dark:text-blue-400" :
    s.phase === "transit" ? "text-amber-600 dark:text-amber-400" :
    "text-emerald-600 dark:text-emerald-400"

  const phaseLabel = s.phase === "send" ? "Send Path" :
    s.phase === "transit" ? "Transit" : "Receive Path"

  const senderNicY = 198 + LAYER_H / 2
  const r1NicY = 95 + 92 + LAYER_H / 2
  const r2NicY = r1NicY
  const receiverNicY = senderNicY

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={cn("text-xs font-bold uppercase", phaseColor)}>{phaseLabel}</span>
            <h4 className="text-sm font-semibold">{s.title}</h4>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
        </div>
        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap ml-2">{step + 1} / {steps.length}</span>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-4xl mx-auto">
          <defs>
            <marker id="journey-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" className="fill-muted-foreground/20" />
            </marker>
          </defs>

          <LayerStack layers={senderLayers} x={SENDER_X} title="Sender"
            activeId={s.activeLayer} side="send" />

          <RouterBlock x={R1_X} prefix="r1" label="Router 1" activeId={s.activeLayer} />
          <RouterBlock x={R2_X} prefix="r2" label="Router 2" activeId={s.activeLayer} />

          <LayerStack layers={receiverLayers} x={RECEIVER_X} title="Receiver"
            activeId={s.activeLayer} side="receive" />

          {/* Wire: Sender NIC → Router 1 NIC */}
          <line x1={SENDER_X + STACK_W} y1={senderNicY} x2={R1_X} y2={r1NicY}
            className={cn(
              "stroke-1 transition-all duration-300",
              (step === 4 || step === 5) ? "stroke-amber-500/60" : "stroke-muted-foreground/10"
            )} strokeDasharray="4 3" />
          <text x={(SENDER_X + STACK_W + R1_X) / 2} y={Math.min(senderNicY, r1NicY) - 6}
            textAnchor="middle" className="fill-muted-foreground/20" fontSize={6}>Link 1</text>

          {/* Wire: Router 1 → Router 2 */}
          <line x1={R1_X + ROUTER_W} y1={r1NicY} x2={R2_X} y2={r2NicY}
            className={cn(
              "stroke-1 transition-all duration-300",
              (step === 9 || step === 10) ? "stroke-amber-500/60" : "stroke-muted-foreground/10"
            )} strokeDasharray="4 3" />
          <text x={(R1_X + ROUTER_W + R2_X) / 2} y={r1NicY - 6}
            textAnchor="middle" className="fill-muted-foreground/20" fontSize={6}>Link 2</text>

          {/* Wire: Router 2 → Receiver NIC */}
          <line x1={R2_X + ROUTER_W} y1={r2NicY} x2={RECEIVER_X} y2={receiverNicY}
            className={cn(
              "stroke-1 transition-all duration-300",
              (step === 14 || step === 15) ? "stroke-amber-500/60" : "stroke-muted-foreground/10"
            )} strokeDasharray="4 3" />
          <text x={(R2_X + ROUTER_W + RECEIVER_X) / 2} y={Math.min(r2NicY, receiverNicY) - 6}
            textAnchor="middle" className="fill-muted-foreground/20" fontSize={6}>Link 3</text>

          {/* Packet visualization */}
          <text x={VW / 2} y={268} textAnchor="middle"
            className="fill-muted-foreground/40 font-semibold" fontSize={8}>
            Current Data Unit
          </text>
          {(() => {
            const parts = s.packet
            const partW = 44
            const totalW = parts.length * partW
            const sx = (VW - totalW) / 2
            return parts.map((p, i) => (
              <g key={`${step}-${i}`}>
                <rect x={sx + i * partW + 1} y={276} width={partW - 2} height={26} rx={4}
                  className={cn("stroke-1 transition-all duration-300", layerColors[p])} />
                <text x={sx + i * partW + partW / 2} y={293} textAnchor="middle"
                  className={cn("font-bold", layerTextColors[p])} fontSize={7}>
                  {layerLabels[p]}
                </text>
              </g>
            ))
          })()}

          {/* Phase indicator bar */}
          {(() => {
            const phases = [
              { label: "SEND",    start: 0,  end: 4,  color: "fill-blue-500" },
              { label: "TRANSIT", start: 5,  end: 14, color: "fill-amber-500" },
              { label: "RECEIVE", start: 15, end: 19, color: "fill-emerald-500" },
            ]
            const barY = VH - 16
            const barW = VW - 40
            const barX = 20
            return (
              <g>
                {phases.map((p, i) => {
                  const segW = barW * ((p.end - p.start + 1) / steps.length)
                  const segX = barX + barW * (p.start / steps.length)
                  const isActive = step >= p.start && step <= p.end
                  return (
                    <g key={i}>
                      <rect x={segX} y={barY} width={segW} height={4} rx={2}
                        className={cn(isActive ? p.color : "fill-muted-foreground/10")}
                        style={{ opacity: isActive ? 0.6 : 1 }} />
                      <text x={segX + segW / 2} y={barY - 4} textAnchor="middle"
                        className={cn("font-bold", isActive ? "fill-foreground/40" : "fill-muted-foreground/15")} fontSize={6}>
                        {p.label}
                      </text>
                    </g>
                  )
                })}
                {/* Current step indicator */}
                <circle
                  cx={barX + barW * ((step + 0.5) / steps.length)}
                  cy={barY + 2} r={3}
                  className="fill-foreground/50"
                />
              </g>
            )
          })()}
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
