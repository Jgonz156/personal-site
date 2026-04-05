"use client"

import { cn } from "@/lib/utils"

interface DataTransferPatternsProps {
  type: "block" | "character" | "network"
  className?: string
}

const W = 600
const H = 160

const blockColors = [
  { fill: "fill-orange-400 dark:fill-orange-500", stroke: "stroke-orange-600 dark:stroke-orange-400" },
  { fill: "fill-sky-400 dark:fill-sky-500", stroke: "stroke-sky-600 dark:stroke-sky-400" },
  { fill: "fill-emerald-400 dark:fill-emerald-500", stroke: "stroke-emerald-600 dark:stroke-emerald-400" },
  { fill: "fill-rose-400 dark:fill-rose-500", stroke: "stroke-rose-600 dark:stroke-rose-400" },
]

function BlockPattern() {
  const wireY = H / 2
  const blockW = 36
  const blockH = 24
  const gap = 12
  const startX = 130
  const sequence = [0, 1, 0, 2, 1, 3, 0, 2]

  return (
    <>
      <text x={W / 2} y={18} textAnchor="middle" className="fill-foreground text-sm font-semibold" fontSize={13}>
        Block Transfer — Fixed-Size Chunks, Interleaved Requests
      </text>

      {/* Sender device */}
      <rect x={20} y={wireY - 30} width={80} height={60} rx={6} className="fill-muted stroke-border stroke-2" />
      <text x={60} y={wireY + 4} textAnchor="middle" className="fill-foreground text-xs font-medium" fontSize={10}>Sender</text>

      {/* Sender buffer */}
      <rect x={100} y={wireY - 16} width={22} height={32} rx={3} className="fill-muted/50 stroke-border stroke-[1.5]" />
      <rect x={102} y={wireY + 2} width={18} height={12} rx={1} className={cn(blockColors[0].fill, "opacity-60")} />

      {/* Wire */}
      <line x1={122} y1={wireY} x2={W - 122} y2={wireY} className="stroke-border stroke-2" />

      {/* Blocks on wire */}
      {sequence.map((colorIdx, i) => {
        const x = startX + i * (blockW + gap)
        const color = blockColors[colorIdx]
        return (
          <rect
            key={i}
            x={x}
            y={wireY - blockH / 2}
            width={blockW}
            height={blockH}
            rx={3}
            className={cn(color.fill, color.stroke, "stroke-[1.5]")}
          />
        )
      })}

      {/* Receiver buffer */}
      <rect x={W - 122} y={wireY - 16} width={22} height={32} rx={3} className="fill-muted/50 stroke-border stroke-[1.5]" />
      <rect x={W - 120} y={wireY - 14} width={18} height={12} rx={1} className={cn(blockColors[1].fill, "opacity-60")} />

      {/* Receiver device */}
      <rect x={W - 100} y={wireY - 30} width={80} height={60} rx={6} className="fill-muted stroke-border stroke-2" />
      <text x={W - 60} y={wireY + 4} textAnchor="middle" className="fill-foreground text-xs font-medium" fontSize={10}>Receiver</text>

      {/* Legend */}
      {blockColors.map((color, i) => (
        <g key={i}>
          <rect x={140 + i * 90} y={H - 28} width={14} height={14} rx={2} className={cn(color.fill, color.stroke, "stroke-1")} />
          <text x={158 + i * 90} y={H - 17} className="fill-muted-foreground text-xs" fontSize={9}>Request {String.fromCharCode(65 + i)}</text>
        </g>
      ))}

      {/* Directional arrow */}
      <polygon points={`${W / 2 + 60},${wireY - 30} ${W / 2 + 70},${wireY - 25} ${W / 2 + 60},${wireY - 20}`} className="fill-muted-foreground" />
    </>
  )
}

function CharacterPattern() {
  const wireY = H / 2

  return (
    <>
      <text x={W / 2} y={18} textAnchor="middle" className="fill-foreground text-sm font-semibold" fontSize={13}>
        Character Stream — Continuous, Sequential Flow
      </text>

      {/* Sender device */}
      <rect x={20} y={wireY - 30} width={80} height={60} rx={6} className="fill-muted stroke-border stroke-2" />
      <text x={60} y={wireY + 4} textAnchor="middle" className="fill-foreground text-xs font-medium" fontSize={10}>Sender</text>

      {/* Sender buffer (emptying) */}
      <rect x={100} y={wireY - 20} width={26} height={40} rx={3} className="fill-muted/50 stroke-border stroke-[1.5]" />
      <rect x={102} y={wireY + 6} width={22} height={12} rx={1} className="fill-sky-400/60 dark:fill-sky-500/60" />
      <text x={113} y={wireY} textAnchor="middle" className="fill-muted-foreground" fontSize={7}>drain</text>

      {/* Wire — dense continuous stream */}
      <line x1={126} y1={wireY} x2={W - 126} y2={wireY} className="stroke-border stroke-2" />

      {/* Dense character stream filling the wire */}
      <rect x={132} y={wireY - 8} width={W - 264} height={16} rx={2} className="fill-sky-400/80 dark:fill-sky-500/70 stroke-sky-500 dark:stroke-sky-400 stroke-1" />
      {/* Tick marks to show individual characters */}
      {Array.from({ length: 28 }).map((_, i) => (
        <line
          key={i}
          x1={144 + i * 12}
          y1={wireY - 8}
          x2={144 + i * 12}
          y2={wireY + 8}
          className="stroke-sky-600/30 dark:stroke-sky-300/30 stroke-[0.5]"
        />
      ))}

      {/* Receiver buffer (filling) */}
      <rect x={W - 126} y={wireY - 20} width={26} height={40} rx={3} className="fill-muted/50 stroke-border stroke-[1.5]" />
      <rect x={W - 124} y={wireY - 2} width={22} height={20} rx={1} className="fill-sky-400/60 dark:fill-sky-500/60" />
      <text x={W - 113} y={wireY - 8} textAnchor="middle" className="fill-muted-foreground" fontSize={7}>fill</text>

      {/* Receiver device */}
      <rect x={W - 100} y={wireY - 30} width={80} height={60} rx={6} className="fill-muted stroke-border stroke-2" />
      <text x={W - 60} y={wireY + 4} textAnchor="middle" className="fill-foreground text-xs font-medium" fontSize={10}>Receiver</text>

      {/* Directional arrow */}
      <polygon points={`${W / 2 + 60},${wireY - 24} ${W / 2 + 70},${wireY - 19} ${W / 2 + 60},${wireY - 14}`} className="fill-muted-foreground" />

      <text x={W / 2} y={H - 14} textAnchor="middle" className="fill-muted-foreground text-xs" fontSize={9}>
        Each tick = one character, processed in arrival order — no random access
      </text>
    </>
  )
}

function NetworkPattern() {
  const wireY = H / 2
  const packetW = 32
  const headerW = 8
  const packetH = 22
  const gap = 6

  const devices = [
    { label: "Dev A", y: 36 },
    { label: "Dev B", y: wireY },
    { label: "Dev C", y: H - 36 },
  ]

  const packets = [
    { colorIdx: 0, x: 200 },
    { colorIdx: 1, x: 200 + packetW + headerW + gap },
    { colorIdx: 0, x: 200 + 2 * (packetW + headerW + gap) },
    { colorIdx: 2, x: 200 + 3 * (packetW + headerW + gap) },
    { colorIdx: 1, x: 200 + 4 * (packetW + headerW + gap) },
    { colorIdx: 0, x: 200 + 5 * (packetW + headerW + gap) },
    { colorIdx: 2, x: 200 + 6 * (packetW + headerW + gap) },
  ]

  return (
    <>
      <text x={W / 2} y={18} textAnchor="middle" className="fill-foreground text-sm font-semibold" fontSize={13}>
        Network Packets — Hybrid Stream of Addressed Blocks
      </text>

      {/* Sender device */}
      <rect x={20} y={wireY - 30} width={80} height={60} rx={6} className="fill-muted stroke-border stroke-2" />
      <text x={60} y={wireY + 4} textAnchor="middle" className="fill-foreground text-xs font-medium" fontSize={10}>Sender</text>

      {/* Router */}
      <rect x={W - 130} y={wireY - 36} width={50} height={72} rx={6} className="fill-fuchsia-500/15 dark:fill-fuchsia-500/20 stroke-fuchsia-500/50 stroke-2" />
      <text x={W - 105} y={wireY + 4} textAnchor="middle" className="fill-fuchsia-700 dark:fill-fuchsia-300 text-xs font-semibold" fontSize={9}>Router</text>

      {/* Wires from sender to router */}
      <line x1={100} y1={wireY} x2={W - 130} y2={wireY} className="stroke-border stroke-2" />

      {/* Wires from router to destinations */}
      {devices.map((dev, i) => (
        <g key={i}>
          <line x1={W - 80} y1={wireY} x2={W - 50} y2={dev.y} className="stroke-border stroke-[1.5]" />
          <rect x={W - 50} y={dev.y - 14} width={40} height={28} rx={4} className="fill-muted stroke-border stroke-[1.5]" />
          <text x={W - 30} y={dev.y + 4} textAnchor="middle" className="fill-foreground text-xs" fontSize={8}>{dev.label}</text>
        </g>
      ))}

      {/* Packets on wire (header cap + body) */}
      {packets.map((pkt, i) => {
        const color = blockColors[pkt.colorIdx]
        return (
          <g key={i}>
            {/* Header cap */}
            <rect
              x={pkt.x}
              y={wireY - packetH / 2}
              width={headerW}
              height={packetH}
              rx={2}
              className="fill-fuchsia-300 dark:fill-fuchsia-600 stroke-fuchsia-500 stroke-1"
            />
            {/* Payload */}
            <rect
              x={pkt.x + headerW}
              y={wireY - packetH / 2}
              width={packetW}
              height={packetH}
              rx={2}
              className={cn(color.fill, color.stroke, "stroke-1")}
            />
          </g>
        )
      })}

      {/* Directional arrow */}
      <polygon points={`${180},${wireY - 24} ${190},${wireY - 19} ${180},${wireY - 14}`} className="fill-muted-foreground" />

      {/* Legend */}
      <g>
        <rect x={120} y={H - 28} width={headerW + 2} height={14} rx={2} className="fill-fuchsia-300 dark:fill-fuchsia-600 stroke-fuchsia-500 stroke-1" />
        <text x={134} y={H - 17} className="fill-muted-foreground text-xs" fontSize={9}>Header</text>
        <rect x={180} y={H - 28} width={20} height={14} rx={2} className={cn(blockColors[0].fill, "stroke-1", blockColors[0].stroke)} />
        <text x={204} y={H - 17} className="fill-muted-foreground text-xs" fontSize={9}>Payload</text>
      </g>
    </>
  )
}

export function DataTransferPatterns({ type, className }: DataTransferPatternsProps) {
  return (
    <div className={cn("w-full my-6 flex justify-center", className)}>
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        className="max-w-2xl border rounded-lg bg-card p-2"
      >
        {type === "block" && <BlockPattern />}
        {type === "character" && <CharacterPattern />}
        {type === "network" && <NetworkPattern />}
      </svg>
    </div>
  )
}
