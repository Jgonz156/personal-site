"use client"

import { cn } from "@/lib/utils"

const VW = 600
const VH = 280

const networkLayers = [
  "write() on socket",
  "Transport header added",
  "IP header added",
  "Frame + CRC added",
  "NIC → DMA → wire",
  "Router strip/rebuild",
  "NIC → DMA → host",
  "Frame stripped",
  "IP header stripped",
  "TCP header stripped",
  "read() returns",
]

const LAYER_H = 20
const COL_W = 220

function NetworkPath() {
  const x = 30
  const startY = 30

  return (
    <g>
      <text x={x + COL_W / 2} y={18} textAnchor="middle"
        className="fill-amber-700 dark:fill-amber-300 font-bold" fontSize={10}>Network Path</text>

      {networkLayers.map((label, i) => {
        const y = startY + i * (LAYER_H + 3)
        const isEndpoint = i === 0 || i === networkLayers.length - 1
        const isWire = i >= 4 && i <= 6
        const fill = isEndpoint ? "fill-blue-500/15 stroke-blue-500/40"
          : isWire ? "fill-amber-500/10 stroke-amber-500/30"
          : "fill-slate-500/10 stroke-slate-500/20"
        const textFill = isEndpoint ? "fill-blue-700 dark:fill-blue-300"
          : isWire ? "fill-amber-700 dark:fill-amber-300"
          : "fill-muted-foreground/50"

        return (
          <g key={i}>
            <rect x={x} y={y} width={COL_W} height={LAYER_H} rx={4}
              className={cn("stroke-1", fill)} />
            <text x={x + COL_W / 2} y={y + 14} textAnchor="middle"
              className={cn("font-medium", textFill)} fontSize={7}>
              {label}
            </text>
            {i < networkLayers.length - 1 && (
              <line x1={x + COL_W / 2} y1={y + LAYER_H} x2={x + COL_W / 2} y2={y + LAYER_H + 3}
                className="stroke-muted-foreground/10 stroke-1" />
            )}
          </g>
        )
      })}
    </g>
  )
}

function LocalPath() {
  const x = VW - COL_W - 30
  const midY = VH / 2

  return (
    <g>
      <text x={x + COL_W / 2} y={18} textAnchor="middle"
        className="fill-emerald-700 dark:fill-emerald-300 font-bold" fontSize={10}>Local IPC Path</text>

      <rect x={x} y={midY - 60} width={COL_W} height={28} rx={5}
        className="fill-blue-500/15 stroke-blue-500/40 stroke-[1.5]" />
      <text x={x + COL_W / 2} y={midY - 42} textAnchor="middle"
        className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={9}>
        write() on socket
      </text>

      <line x1={x + COL_W / 2} y1={midY - 32} x2={x + COL_W / 2} y2={midY - 15}
        className="stroke-emerald-500/40 stroke-1" />

      <rect x={x + 20} y={midY - 15} width={COL_W - 40} height={30} rx={6}
        className="fill-emerald-500/15 stroke-emerald-500/50 stroke-[1.5]" />
      <text x={x + COL_W / 2} y={midY + 4} textAnchor="middle"
        className="fill-emerald-700 dark:fill-emerald-300 font-semibold" fontSize={9}>
        Kernel buffer copy
      </text>

      <line x1={x + COL_W / 2} y1={midY + 15} x2={x + COL_W / 2} y2={midY + 32}
        className="stroke-emerald-500/40 stroke-1" />

      <rect x={x} y={midY + 32} width={COL_W} height={28} rx={5}
        className="fill-blue-500/15 stroke-blue-500/40 stroke-[1.5]" />
      <text x={x + COL_W / 2} y={midY + 50} textAnchor="middle"
        className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={9}>
        read() returns
      </text>

      <text x={x + COL_W / 2} y={midY + 80} textAnchor="middle"
        className="fill-emerald-600/40 dark:fill-emerald-400/30" fontSize={7}>
        No headers · No NIC · No wire · No routing
      </text>
      <text x={x + COL_W / 2} y={midY + 92} textAnchor="middle"
        className="fill-emerald-600/40 dark:fill-emerald-400/30" fontSize={7}>
        The kernel replaces the entire network.
      </text>

      <line x1={x - 8} y1={midY - 60} x2={x - 8} y2={midY + 60}
        className="stroke-emerald-500/30 stroke-1" />
      <text x={x - 12} y={midY} textAnchor="end"
        className="fill-emerald-600/40 dark:fill-emerald-400/30 font-semibold"
        fontSize={7} transform={`rotate(-90, ${x - 12}, ${midY})`}>
        short
      </text>
    </g>
  )
}

export function IPCMirrorDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">The IPC Mirror — What the Kernel Collapses</h4>
        <p className="text-xs text-muted-foreground mt-0.5">Same API. The kernel replaces the entire network.</p>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          <line x1={VW / 2} y1={24} x2={VW / 2} y2={VH - 10}
            className="stroke-border/50" strokeDasharray="3 3" />

          <NetworkPath />
          <LocalPath />

          <text x={VW / 2} y={VH / 2} textAnchor="middle"
            className="fill-muted-foreground/20 font-bold" fontSize={14}>vs</text>
        </svg>
      </div>
    </div>
  )
}
