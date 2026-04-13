"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 540
const VH = 340
const RUNG_W = 360
const RUNG_H = 40
const GAP = 8
const START_X = (VW - RUNG_W) / 2

interface Rung {
  label: string
  example: string
  scope: "educational" | "industrial"
  accent: { fill: string; stroke: string; text: string }
}

const rungs: Rung[] = [
  {
    label: "Full Subsystem",
    example: "filesystem, network protocol, scheduler class",
    scope: "industrial",
    accent: { fill: "fill-red-500/10", stroke: "stroke-red-500/30", text: "fill-red-700 dark:fill-red-300" },
  },
  {
    label: "Device Driver",
    example: "driver for a well-documented hardware device",
    scope: "industrial",
    accent: { fill: "fill-orange-500/10", stroke: "stroke-orange-500/30", text: "fill-orange-700 dark:fill-orange-300" },
  },
  {
    label: "/proc or /sys Entry",
    example: "module that exposes computed kernel data to user space",
    scope: "educational",
    accent: { fill: "fill-amber-500/15", stroke: "stroke-amber-500/40", text: "fill-amber-700 dark:fill-amber-300" },
  },
  {
    label: "Character Device",
    example: "pseudo-device responding to read/write (e.g., rustecho)",
    scope: "educational",
    accent: { fill: "fill-emerald-500/15", stroke: "stroke-emerald-500/40", text: "fill-emerald-700 dark:fill-emerald-300" },
  },
  {
    label: "Hello World Module",
    example: "prints to dmesg on load/unload — validates the workflow",
    scope: "educational",
    accent: { fill: "fill-green-500/15", stroke: "stroke-green-500/40", text: "fill-green-700 dark:fill-green-300" },
  },
]

const BRACKET_X = START_X + RUNG_W + 16
const BRACKET_W = 8

export function ScopeLadderDiagram({ className }: { className?: string }) {
  const [hover, setHover] = useState<number | null>(null)

  const eduStart = rungs.findIndex(r => r.scope === "educational")
  const eduEnd = rungs.length - 1
  const indStart = 0
  const indEnd = rungs.findIndex(r => r.scope === "educational") - 1

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Contribution Scope Ladder</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Meaningful work starts at the bottom. Hover a rung to learn more.
        </p>
      </div>
      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-xl mx-auto"
          onMouseLeave={() => setHover(null)}>

          {/* Vertical rail lines */}
          <line x1={START_X + 20} y1={24} x2={START_X + 20} y2={VH - 20}
            className="stroke-muted-foreground/10 stroke-1" />
          <line x1={START_X + RUNG_W - 20} y1={24} x2={START_X + RUNG_W - 20} y2={VH - 20}
            className="stroke-muted-foreground/10 stroke-1" />

          {/* Arrow at top (larger scope) */}
          <text x={START_X + 20} y={18}
            className="fill-muted-foreground/20" fontSize={10} textAnchor="middle">▲</text>
          <text x={START_X + RUNG_W - 20} y={18}
            className="fill-muted-foreground/20" fontSize={10} textAnchor="middle">▲</text>
          <text x={START_X + RUNG_W / 2} y={16} textAnchor="middle"
            className="fill-muted-foreground/15" fontSize={7}>
            larger scope
          </text>

          {/* Rungs */}
          {rungs.map((r, i) => {
            const y = 30 + i * (RUNG_H + GAP)
            const lit = hover === i
            const dimmed = hover !== null && hover !== i

            return (
              <g key={r.label}
                onMouseEnter={() => setHover(i)}
                className="cursor-pointer"
              >
                <rect x={START_X} y={y} width={RUNG_W} height={RUNG_H} rx={6}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    dimmed ? "fill-muted/10 stroke-border/10" : r.accent.fill,
                    dimmed ? "" : r.accent.stroke,
                  )} />
                <text x={START_X + 16} y={y + RUNG_H / 2 - 3} 
                  className={cn("font-semibold transition-all duration-300",
                    dimmed ? "fill-muted-foreground/10" : r.accent.text
                  )} fontSize={10}>
                  {r.label}
                </text>
                <text x={START_X + 16} y={y + RUNG_H / 2 + 11}
                  className={cn("transition-all duration-300",
                    dimmed ? "fill-muted-foreground/5" : "fill-muted-foreground/30"
                  )} fontSize={7}>
                  {r.example}
                </text>
              </g>
            )
          })}

          {/* Scope brackets */}
          {(() => {
            const eduTopY = 30 + eduStart * (RUNG_H + GAP) + 4
            const eduBotY = 30 + eduEnd * (RUNG_H + GAP) + RUNG_H - 4
            const indTopY = 30 + indStart * (RUNG_H + GAP) + 4
            const indBotY = 30 + indEnd * (RUNG_H + GAP) + RUNG_H - 4

            return (
              <>
                {/* Educational bracket */}
                <path d={`M ${BRACKET_X} ${eduTopY} L ${BRACKET_X + BRACKET_W} ${eduTopY} L ${BRACKET_X + BRACKET_W} ${eduBotY} L ${BRACKET_X} ${eduBotY}`}
                  fill="none" className="stroke-emerald-500/40 stroke-[1.5]" />
                <text x={BRACKET_X + BRACKET_W + 8} y={(eduTopY + eduBotY) / 2 - 4}
                  className="fill-emerald-600/50 dark:fill-emerald-400/40 font-semibold" fontSize={7}>
                  Educational scope
                </text>
                <text x={BRACKET_X + BRACKET_W + 8} y={(eduTopY + eduBotY) / 2 + 8}
                  className="fill-emerald-600/30 dark:fill-emerald-400/20" fontSize={6}>
                  achievable with this
                </text>
                <text x={BRACKET_X + BRACKET_W + 8} y={(eduTopY + eduBotY) / 2 + 18}
                  className="fill-emerald-600/30 dark:fill-emerald-400/20" fontSize={6}>
                  course&apos;s foundation
                </text>

                {/* Industrial bracket */}
                <path d={`M ${BRACKET_X} ${indTopY} L ${BRACKET_X + BRACKET_W} ${indTopY} L ${BRACKET_X + BRACKET_W} ${indBotY} L ${BRACKET_X} ${indBotY}`}
                  fill="none" className="stroke-red-500/30 stroke-[1.5]" />
                <text x={BRACKET_X + BRACKET_W + 8} y={(indTopY + indBotY) / 2 - 4}
                  className="fill-red-600/40 dark:fill-red-400/30 font-semibold" fontSize={7}>
                  Industrial scope
                </text>
                <text x={BRACKET_X + BRACKET_W + 8} y={(indTopY + indBotY) / 2 + 8}
                  className="fill-red-600/25 dark:fill-red-400/15" fontSize={6}>
                  years of kernel-specific
                </text>
                <text x={BRACKET_X + BRACKET_W + 8} y={(indTopY + indBotY) / 2 + 18}
                  className="fill-red-600/25 dark:fill-red-400/15" fontSize={6}>
                  experience
                </text>
              </>
            )
          })()}
        </svg>
      </div>
    </div>
  )
}
