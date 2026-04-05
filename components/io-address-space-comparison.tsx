"use client"

import { cn } from "@/lib/utils"

export function IOAddressSpaceComparison({ className }: { className?: string }) {
  const W = 700
  const H = 440

  const stripW = 90
  const stripH = 240
  const topY = 70

  // Port-mapped side
  const pmLasX = 80
  const pmPortX = 200
  const pmCpuX = 140

  // Memory-mapped side
  const mmLasX = 480
  const mmCpuX = 440

  const regions = [
    { label: "Code", h: 40, color: "fill-blue-500/15 stroke-blue-500/40" },
    { label: "Stack", h: 50, color: "fill-emerald-500/15 stroke-emerald-500/40" },
    { label: "Heap", h: 55, color: "fill-violet-500/15 stroke-violet-500/40" },
    { label: "...", h: 30, color: "fill-muted/30 stroke-border" },
    { label: "Free", h: 65, color: "fill-muted/10 stroke-border stroke-dashed" },
  ]

  const ioDevices = [
    { label: "Device A Regs", color: "fill-orange-500/20 stroke-orange-500/50" },
    { label: "Device B Regs", color: "fill-rose-500/20 stroke-rose-500/50" },
  ]

  function drawLAS(x: number, y: number, w: number, includeIO: boolean) {
    let currentY = y
    const elements: React.ReactNode[] = []

    regions.forEach((region, i) => {
      elements.push(
        <g key={`region-${i}`}>
          <rect x={x} y={currentY} width={w} height={region.h} className={cn("stroke-1", region.color)} />
          <text x={x + w / 2} y={currentY + region.h / 2 + 3} textAnchor="middle"
            className="fill-muted-foreground" fontSize={8}>{region.label}</text>
        </g>
      )
      currentY += region.h
    })

    if (includeIO) {
      ioDevices.forEach((dev, i) => {
        const devH = 30
        elements.push(
          <g key={`io-${i}`}>
            <rect x={x} y={currentY} width={w} height={devH} className={cn("stroke-[1.5]", dev.color)} />
            <text x={x + w / 2} y={currentY + devH / 2 + 3} textAnchor="middle"
              className="fill-foreground font-medium" fontSize={7}>{dev.label}</text>
          </g>
        )
        currentY += devH
      })
    }

    // Top/bottom addresses
    elements.push(
      <text key="addr-top" x={x - 4} y={y + 4} textAnchor="end" className="fill-muted-foreground/60 font-mono" fontSize={7}>0x0000</text>
    )
    elements.push(
      <text key="addr-bot" x={x - 4} y={currentY} textAnchor="end" className="fill-muted-foreground/60 font-mono" fontSize={7}>
        {includeIO ? "0xFFFF" : "0xBFFF"}
      </text>
    )

    return elements
  }

  return (
    <div className={cn("w-full my-6 flex justify-center", className)}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="max-w-3xl border rounded-lg bg-card">
        {/* Divider */}
        <line x1={W / 2} y1={20} x2={W / 2} y2={H - 10} className="stroke-border stroke-1 stroke-dashed" />

        {/* === PORT-MAPPED I/O === */}
        <text x={170} y={28} textAnchor="middle" className="fill-foreground font-bold" fontSize={13}>
          Port-Mapped I/O
        </text>
        <text x={170} y={44} textAnchor="middle" className="fill-muted-foreground" fontSize={9}>
          Two separate address spaces
        </text>

        {/* Main LAS */}
        <text x={pmLasX + stripW / 2} y={topY - 8} textAnchor="middle" className="fill-foreground font-semibold" fontSize={9}>
          Main LAS
        </text>
        <rect x={pmLasX} y={topY} width={stripW} height={stripH} rx={4} className="fill-none stroke-border stroke-2" />
        {drawLAS(pmLasX, topY, stripW, false)}

        {/* Port Address Space */}
        <text x={pmPortX + 50} y={topY - 8} textAnchor="middle" className="fill-foreground font-semibold" fontSize={9}>
          Port Space
        </text>
        <rect x={pmPortX + 5} y={topY} width={stripW} height={80} rx={4} className="fill-none stroke-orange-500/50 stroke-2 stroke-dashed" />
        {ioDevices.map((dev, i) => (
          <g key={i}>
            <rect x={pmPortX + 5} y={topY + i * 38 + 2} width={stripW} height={36} className={cn("stroke-[1.5]", dev.color)} />
            <text x={pmPortX + 5 + stripW / 2} y={topY + i * 38 + 22} textAnchor="middle" className="fill-foreground font-medium" fontSize={7}>{dev.label}</text>
          </g>
        ))}

        {/* CPU arrow to LAS */}
        <text x={pmCpuX} y={topY + stripH + 34} textAnchor="middle" className="fill-purple-600 dark:fill-purple-400 font-bold" fontSize={10}>CPU</text>
        <line x1={pmCpuX - 20} y1={topY + stripH + 22} x2={pmLasX + stripW / 2} y2={topY + stripH + 4} className="stroke-purple-500/60 stroke-[1.5]" markerEnd="url(#pm-arrow)" />
        <line x1={pmCpuX + 20} y1={topY + stripH + 22} x2={pmPortX + 5 + stripW / 2} y2={topY + 82} className="stroke-orange-500/60 stroke-[1.5]" markerEnd="url(#pm-arrow)" />

        {/* Label between */}
        <text x={170} y={topY + stripH + 52} textAnchor="middle" className="fill-red-600 dark:fill-red-400 font-semibold" fontSize={8}>
          Special I/O instructions
        </text>
        <text x={170} y={topY + stripH + 62} textAnchor="middle" className="fill-red-600/70 dark:fill-red-400/70" fontSize={7}>
          (IN / OUT assembly)
        </text>

        {/* === MEMORY-MAPPED I/O === */}
        <text x={W / 2 + 140} y={28} textAnchor="middle" className="fill-foreground font-bold" fontSize={13}>
          Memory-Mapped I/O
        </text>
        <text x={W / 2 + 140} y={44} textAnchor="middle" className="fill-muted-foreground" fontSize={9}>
          One unified address space (kernel-managed)
        </text>

        {/* Unified LAS */}
        <text x={mmLasX + stripW / 2} y={topY - 8} textAnchor="middle" className="fill-foreground font-semibold" fontSize={9}>
          Unified Address Space
        </text>
        <rect x={mmLasX} y={topY} width={stripW} height={stripH + 60} rx={4} className="fill-none stroke-border stroke-2" />
        {drawLAS(mmLasX, topY, stripW, true)}

        {/* CPU arrow */}
        <text x={mmCpuX} y={topY + stripH + 94} textAnchor="middle" className="fill-purple-600 dark:fill-purple-400 font-bold" fontSize={10}>CPU</text>
        <line x1={mmCpuX} y1={topY + stripH + 82} x2={mmLasX + stripW / 2} y2={topY + stripH + 64} className="stroke-purple-500/60 stroke-[1.5]" markerEnd="url(#pm-arrow)" />

        <text x={W / 2 + 140} y={topY + stripH + 100} textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-semibold" fontSize={8}>
          Normal memory instructions
        </text>
        <text x={W / 2 + 140} y={topY + stripH + 110} textAnchor="middle" className="fill-emerald-600/70 dark:fill-emerald-400/70" fontSize={7}>
          (MOV / LOAD / STORE)
        </text>

        {/* Uncacheable annotation for device regions */}
        <text x={mmLasX + stripW + 6} y={topY + stripH + 24} className="fill-orange-600/70 dark:fill-orange-400/70 font-medium" fontSize={6.5}>
          uncacheable
        </text>
        <text x={mmLasX + stripW + 6} y={topY + stripH + 33} className="fill-orange-600/50 dark:fill-orange-400/50" fontSize={6}>
          (volatile access)
        </text>

        <defs>
          <marker id="pm-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" className="fill-muted-foreground" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}
