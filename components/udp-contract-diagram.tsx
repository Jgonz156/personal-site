"use client"

import { cn } from "@/lib/utils"

const VW = 560
const VH = 220

interface Guarantee {
  label: string; provided: boolean
}

const guarantees: Guarantee[] = [
  { label: "Ports (endpoint naming)", provided: true },
  { label: "Checksum (error detection)", provided: true },
  { label: "Message boundaries", provided: true },
  { label: "Reliability", provided: false },
  { label: "Ordering", provided: false },
  { label: "Retransmission", provided: false },
  { label: "Connection state", provided: false },
]

export function UDPContractDiagram({ className }: { className?: string }) {
  const pathX = 20
  const pathW = 280
  const checkX = 320
  const checkW = 220

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">UDP — The Minimal Contract</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Fast, low-ceremony datagram delivery with very few promises.
        </p>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
          {/* ── Path visualization ── */}
          <text x={pathX + pathW / 2} y={18} textAnchor="middle"
            className="fill-foreground/60 font-bold" fontSize={9}>Temperature Service over UDP</text>

          {/* Client */}
          <rect x={pathX + 10} y={40} width={80} height={32} rx={5}
            className="fill-blue-500/10 stroke-blue-500/40 stroke-[1.5]" />
          <text x={pathX + 50} y={56} textAnchor="middle"
            className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={8}>Client</text>
          <text x={pathX + 50} y={67} textAnchor="middle"
            className="fill-muted-foreground/30 font-mono" fontSize={6}>:53014</text>

          {/* Server */}
          <rect x={pathX + pathW - 90} y={40} width={80} height={32} rx={5}
            className="fill-purple-500/10 stroke-purple-500/40 stroke-[1.5]" />
          <text x={pathX + pathW - 50} y={56} textAnchor="middle"
            className="fill-purple-700 dark:fill-purple-300 font-semibold" fontSize={8}>Server</text>
          <text x={pathX + pathW - 50} y={67} textAnchor="middle"
            className="fill-muted-foreground/30 font-mono" fontSize={6}>:4000</text>

          {/* Request datagram */}
          <line x1={pathX + 92} y1={50} x2={pathX + pathW - 92} y2={50}
            className="stroke-emerald-500/40 stroke-[1.5]"
            markerEnd="url(#udp-arr)" />
          <rect x={pathX + pathW / 2 - 40} y={34} width={80} height={16} rx={3}
            className="fill-emerald-500/10 stroke-emerald-500/30 stroke-1" />
          <text x={pathX + pathW / 2} y={45} textAnchor="middle"
            className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize={7}>
            &quot;GET_TEMP&quot;
          </text>

          {/* Reply datagram */}
          <line x1={pathX + pathW - 92} y1={66} x2={pathX + 92} y2={66}
            className="stroke-amber-500/40 stroke-[1.5]"
            markerEnd="url(#udp-arr-rev)" />
          <rect x={pathX + pathW / 2 - 25} y={70} width={50} height={16} rx={3}
            className="fill-amber-500/10 stroke-amber-500/30 stroke-1" />
          <text x={pathX + pathW / 2} y={81} textAnchor="middle"
            className="fill-amber-700 dark:fill-amber-300 font-semibold" fontSize={7}>
            &quot;42 C&quot;
          </text>

          <defs>
            <marker id="udp-arr" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" className="fill-emerald-500/40" />
            </marker>
            <marker id="udp-arr-rev" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" className="fill-amber-500/40" />
            </marker>
          </defs>

          {/* Labels */}
          <text x={pathX + pathW / 2} y={105} textAnchor="middle"
            className="fill-muted-foreground/25" fontSize={7}>
            No handshake · No connection state · No retry
          </text>
          <text x={pathX + pathW / 2} y={118} textAnchor="middle"
            className="fill-muted-foreground/20" fontSize={6}>
            Each datagram is independent
          </text>

          {/* ── Guarantee checklist ── */}
          <text x={checkX + checkW / 2} y={18} textAnchor="middle"
            className="fill-foreground/60 font-bold" fontSize={9}>Contract</text>

          {guarantees.map((g, i) => {
            const gy = 30 + i * 24
            return (
              <g key={g.label}>
                <text x={checkX + 16} y={gy + 12}
                  className={cn("font-semibold", g.provided ? "fill-emerald-600 dark:fill-emerald-400" : "fill-muted-foreground/25")} fontSize={11}>
                  {g.provided ? "✓" : "✗"}
                </text>
                <text x={checkX + 30} y={gy + 12}
                  className={cn("font-medium", g.provided ? "fill-foreground/60" : "fill-muted-foreground/25")} fontSize={8}>
                  {g.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
