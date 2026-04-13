"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const VW = 640
const VH = 220

const PACKET_COUNT = 6
const CYCLE_MS = 4000

export function PacketVsConversationDiagram({ className }: { className?: string }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 120), CYCLE_MS / 120)
    return () => clearInterval(id)
  }, [])

  const progress = tick / 120

  const leftX = 0
  const divX = VW / 2
  const panelW = divX

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Packet Reality vs Application Intent</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          The network moves many packets. The programmer thinks in one conversation.
        </p>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          {/* Divider */}
          <line x1={divX} y1={10} x2={divX} y2={VH - 10}
            className="stroke-border/40" strokeDasharray="3 3" />

          {/* ── Left Panel: Packet Reality ── */}
          <text x={leftX + panelW / 2} y={22} textAnchor="middle"
            className="fill-amber-700 dark:fill-amber-300 font-bold" fontSize={10}>
            What the Network Sees
          </text>

          {/* Client and Server nodes */}
          <rect x={30} y={80} width={60} height={30} rx={5}
            className="fill-blue-500/10 stroke-blue-500/40 stroke-[1.5]" />
          <text x={60} y={99} textAnchor="middle"
            className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={8}>Client</text>

          <rect x={panelW - 90} y={80} width={60} height={30} rx={5}
            className="fill-purple-500/10 stroke-purple-500/40 stroke-[1.5]" />
          <text x={panelW - 60} y={99} textAnchor="middle"
            className="fill-purple-700 dark:fill-purple-300 font-semibold" fontSize={8}>Server</text>

          {/* Animated packets (outgoing) */}
          {Array.from({ length: PACKET_COUNT }).map((_, i) => {
            const phase = (progress + i * 0.15) % 1
            const isReturn = i >= PACKET_COUNT / 2
            const sx = isReturn ? panelW - 90 : 90
            const ex = isReturn ? 90 : panelW - 90
            const baseY = isReturn ? 100 : 88
            const x = sx + (ex - sx) * phase
            const wobble = Math.sin(phase * Math.PI * 3 + i) * 6
            const opacity = phase < 0.05 || phase > 0.95 ? 0.2 : 0.7

            return (
              <rect key={i} x={x} y={baseY + wobble} width={22} height={10} rx={2}
                className={cn("stroke-1",
                  isReturn ? "fill-purple-500/25 stroke-purple-500/40" : "fill-amber-500/25 stroke-amber-500/40"
                )}
                style={{ opacity }} />
            )
          })}

          {/* Noise labels */}
          <text x={panelW / 2} y={145} textAnchor="middle"
            className="fill-muted-foreground/25" fontSize={7}>
            reordering · timing gaps · possible loss
          </text>
          <text x={panelW / 2} y={158} textAnchor="middle"
            className="fill-muted-foreground/20" fontSize={6}>
            headers · hops · retransmissions · ACKs
          </text>

          {/* ── Right Panel: Conversation View ── */}
          <text x={divX + panelW / 2} y={22} textAnchor="middle"
            className="fill-emerald-700 dark:fill-emerald-300 font-bold" fontSize={10}>
            What the Programmer Thinks
          </text>

          {/* Client */}
          <rect x={divX + 40} y={60} width={80} height={32} rx={6}
            className="fill-blue-500/10 stroke-blue-500/40 stroke-[1.5]" />
          <text x={divX + 80} y={80} textAnchor="middle"
            className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={9}>Client</text>

          {/* Server */}
          <rect x={divX + panelW - 120} y={60} width={80} height={32} rx={6}
            className="fill-purple-500/10 stroke-purple-500/40 stroke-[1.5]" />
          <text x={divX + panelW - 80} y={80} textAnchor="middle"
            className="fill-purple-700 dark:fill-purple-300 font-semibold" fontSize={9}>Server</text>

          {/* Simple arrows */}
          <line x1={divX + 120} y1={72} x2={divX + panelW - 120} y2={72}
            className="stroke-emerald-500/50 stroke-[1.5]" markerEnd="url(#conv-arr)" />
          <text x={divX + panelW / 2} y={66} textAnchor="middle"
            className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize={8}>
            &quot;GET_TEMP&quot;
          </text>

          <line x1={divX + panelW - 120} y1={86} x2={divX + 120} y2={86}
            className="stroke-emerald-500/50 stroke-[1.5]" markerEnd="url(#conv-arr)" />
          <text x={divX + panelW / 2} y={98} textAnchor="middle"
            className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize={8}>
            &quot;42 C&quot;
          </text>

          <defs>
            <marker id="conv-arr" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" className="fill-emerald-500/50" />
            </marker>
          </defs>

          {/* Clean label */}
          <text x={divX + panelW / 2} y={130} textAnchor="middle"
            className="fill-emerald-600/40 dark:fill-emerald-400/30 font-semibold" fontSize={8}>
            request → reply
          </text>
          <text x={divX + panelW / 2} y={145} textAnchor="middle"
            className="fill-muted-foreground/25" fontSize={7}>
            The transport layer bridges this gap.
          </text>
        </svg>
      </div>
    </div>
  )
}
