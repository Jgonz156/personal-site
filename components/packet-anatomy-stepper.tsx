"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

type Stage = 0 | 1 | 2 | 3

interface LayerDef {
  label: string
  fields: string
  color: string
  textColor: string
}

const layers: LayerDef[] = [
  { label: "Application Data", fields: '"hello"', color: "fill-emerald-500/20 stroke-emerald-500/50", textColor: "fill-emerald-700 dark:fill-emerald-300" },
  { label: "TCP/UDP hdr", fields: "ports · seq · chksum", color: "fill-blue-500/20 stroke-blue-500/50", textColor: "fill-blue-700 dark:fill-blue-300" },
  { label: "IP hdr", fields: "src/dst IP · TTL", color: "fill-purple-500/20 stroke-purple-500/50", textColor: "fill-purple-700 dark:fill-purple-300" },
  { label: "Eth hdr", fields: "MACs · type", color: "fill-amber-500/20 stroke-amber-500/50", textColor: "fill-amber-700 dark:fill-amber-300" },
]

const crcDef = {
  label: "CRC",
  color: "fill-rose-500/20 stroke-rose-500/50",
  textColor: "fill-rose-700 dark:fill-rose-300",
}

const stageInfo: { title: string; subtitle: string }[] = [
  { title: "Stage 0 — Raw Payload", subtitle: "What IPC moved: just raw bytes, no metadata needed." },
  { title: "Stage 1 — Transport", subtitle: "The kernel adds ports, sequence numbers, and a checksum." },
  { title: "Stage 2 — Network", subtitle: "The kernel adds IP addresses, TTL, and a protocol identifier." },
  { title: "Stage 3 — Link (Complete Frame)", subtitle: "MAC addresses and a CRC complete the frame for the wire." },
]

const VW = 560
const VH = 120
const PAYLOAD_W = 120
const HDR_W = 90
const CRC_W = 40
const BAR_H = 50
const BAR_Y = 35

function PacketSVG({ stage }: { stage: Stage }) {
  const visibleLayers = stage
  const hasCRC = stage === 3
  const headerCount = visibleLayers
  const totalW = headerCount * HDR_W + PAYLOAD_W + (hasCRC ? CRC_W : 0)
  const startX = (VW - totalW) / 2

  const blocks: { x: number; w: number; layer: LayerDef; isPayload?: boolean }[] = []

  // Headers from outermost to innermost (link, network, transport)
  const headerOrder = [3, 2, 1]
  let cx = startX
  for (const li of headerOrder) {
    if (li <= visibleLayers) {
      blocks.push({ x: cx, w: HDR_W, layer: layers[li] })
      cx += HDR_W
    }
  }

  // Payload
  blocks.push({ x: cx, w: PAYLOAD_W, layer: layers[0], isPayload: true })
  cx += PAYLOAD_W

  // CRC
  if (hasCRC) {
    blocks.push({ x: cx, w: CRC_W, layer: { ...crcDef, fields: "" } as LayerDef })
  }

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
      {/* Blocks */}
      {blocks.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={BAR_Y} width={b.w} height={BAR_H} rx={4}
            className={cn("stroke-[1.5] transition-all duration-300", b.layer.color)} />
          <text x={b.x + b.w / 2} y={BAR_Y + 18} textAnchor="middle"
            className={cn("font-bold transition-all duration-300", b.layer.textColor)}
            fontSize={b.isPayload ? 10 : 8}>
            {b.layer.label}
          </text>
          {b.layer.fields && (
            <text x={b.x + b.w / 2} y={BAR_Y + 34} textAnchor="middle"
              className="fill-muted-foreground/50" fontSize={6}>
              {b.layer.fields}
            </text>
          )}
        </g>
      ))}

      {/* Overall bracket label */}
      <text x={VW / 2} y={BAR_Y + BAR_H + 22} textAnchor="middle"
        className="fill-muted-foreground/40 font-mono" fontSize={7}>
        {stage === 0 ? "payload" : stage === 1 ? "segment / datagram" : stage === 2 ? "packet" : "frame"}
      </text>
    </svg>
  )
}

export function PacketAnatomyStepper({ className }: { className?: string }) {
  const [stage, setStage] = useState<Stage>(0)

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold">{stageInfo[stage].title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{stageInfo[stage].subtitle}</p>
        </div>
        <span className="text-xs text-muted-foreground font-mono">Stage {stage} of 3</span>
      </div>

      <div className="p-4">
        <PacketSVG stage={stage} />

        <div className="flex items-center justify-center gap-2 mt-4">
          <button onClick={() => setStage(s => Math.max(0, s - 1) as Stage)}
            disabled={stage === 0}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors disabled:opacity-30 hover:bg-muted">
            ← Previous
          </button>
          <button onClick={() => setStage(0)}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors hover:bg-muted">
            Reset
          </button>
          <button onClick={() => setStage(s => Math.min(3, s + 1) as Stage)}
            disabled={stage === 3}
            className="px-3 py-1.5 rounded-md text-xs font-medium border transition-colors disabled:opacity-30 hover:bg-muted">
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export function PacketAnatomyStage({ stage, className }: { stage: Stage; className?: string }) {
  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">{stageInfo[stage].title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{stageInfo[stage].subtitle}</p>
      </div>
      <div className="p-4">
        <PacketSVG stage={stage} />
      </div>
    </div>
  )
}
