"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 520
const VH = 360
const CX = VW / 2
const CY = VH / 2 + 10

interface Zone {
  label: string
  sub: string
  radius: number
  concept: string
  blastRadius: string
  fill: string
  stroke: string
  text: string
  ringText: string
}

const zones: Zone[] = [
  {
    label: "Hardware Registers",
    sub: "A bad write can misconfigure a device",
    radius: 44,
    concept: "Device I/O (LN18)",
    blastRadius: "Physical device damage",
    fill: "fill-red-500/20", stroke: "stroke-red-500/50",
    text: "fill-red-700 dark:fill-red-300",
    ringText: "fill-red-600/40 dark:fill-red-400/30",
  },
  {
    label: "Kernel Data Structures",
    sub: "Corruption affects all processes",
    radius: 90,
    concept: "Kernel internals (LN9, LN19)",
    blastRadius: "System-wide corruption",
    fill: "fill-orange-500/15", stroke: "stroke-orange-500/40",
    text: "fill-orange-700 dark:fill-orange-300",
    ringText: "fill-orange-600/35 dark:fill-orange-400/25",
  },
  {
    label: "Driver / Module Code",
    sub: "Bugs crash the kernel or open security holes",
    radius: 132,
    concept: "Drivers & modules (LN19, LN23)",
    blastRadius: "Kernel panic, privilege escalation",
    fill: "fill-amber-500/10", stroke: "stroke-amber-500/30",
    text: "fill-amber-700 dark:fill-amber-300",
    ringText: "fill-amber-600/30 dark:fill-amber-400/20",
  },
  {
    label: "User Space",
    sub: "Bugs are contained to one process",
    radius: 168,
    concept: "Process isolation (LN9)",
    blastRadius: "One process crashes",
    fill: "fill-blue-500/5", stroke: "stroke-blue-500/20",
    text: "fill-blue-700 dark:fill-blue-300",
    ringText: "fill-blue-600/25 dark:fill-blue-400/15",
  },
]

export function BlastRadiusDiagram({ className }: { className?: string }) {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">The Asymmetry of Consequence</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Closer to hardware means greater privilege and larger blast radius. Hover a zone.
        </p>
      </div>
      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-lg mx-auto"
          onMouseLeave={() => setHover(null)}>

          {/* Zones rendered outermost first so inner zones paint on top */}
          {[...zones].reverse().map((z, ri) => {
            const i = zones.length - 1 - ri
            const lit = hover === i
            const dimmed = hover !== null && hover !== i

            return (
              <g key={z.label}
                onMouseEnter={() => setHover(i)}
                className="cursor-pointer"
              >
                <circle cx={CX} cy={CY} r={z.radius}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    dimmed ? "fill-muted/10 stroke-border/10" : z.fill,
                    dimmed ? "" : z.stroke,
                  )} />
              </g>
            )
          })}

          {/* Labels rendered separately so they're always on top */}
          {zones.map((z, i) => {
            const lit = hover === i
            const dimmed = hover !== null && hover !== i
            const labelY = CY - z.radius + (i === 0 ? 20 : 16)

            return (
              <g key={`lbl-${z.label}`}
                onMouseEnter={() => setHover(i)}
                className="cursor-pointer"
              >
                <text x={CX} y={labelY} textAnchor="middle"
                  className={cn("font-semibold transition-all duration-300",
                    dimmed ? "fill-muted-foreground/10" : z.text
                  )} fontSize={i === 0 ? 8 : 9}>
                  {z.label}
                </text>
              </g>
            )
          })}

          {/* Privilege boundary label */}
          <text x={CX} y={CY + zones[2].radius + 20} textAnchor="middle"
            className="fill-muted-foreground/15" fontSize={7}>
            ← increasing privilege · increasing danger →
          </text>

          {/* Hover detail panel */}
          {hover !== null && (() => {
            const z = zones[hover]
            const panelY = 16
            return (
              <g>
                <rect x={10} y={panelY} width={VW - 20} height={44} rx={6}
                  className={cn("stroke-[1.5]", z.fill, z.stroke)} />
                <text x={20} y={panelY + 16}
                  className={cn("font-bold", z.text)} fontSize={9}>
                  {z.label}
                </text>
                <text x={20} y={panelY + 28}
                  className="fill-muted-foreground/50" fontSize={7}>
                  {z.sub}
                </text>
                <text x={VW - 20} y={panelY + 16} textAnchor="end"
                  className="fill-muted-foreground/30 font-mono" fontSize={7}>
                  {z.concept}
                </text>
                <text x={VW - 20} y={panelY + 28} textAnchor="end"
                  className={cn("font-medium", z.ringText)} fontSize={7}>
                  Blast radius: {z.blastRadius}
                </text>
              </g>
            )
          })()}

          {hover === null && (
            <text x={CX} y={24} textAnchor="middle"
              className="fill-muted-foreground/20" fontSize={8}>
              ↑ hover a zone to see its blast radius ↑
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
