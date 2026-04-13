"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 600
const VH = 380
const CX = VW / 2
const CY = VH / 2

interface BugClass {
  label: string
  damage: string
  example: string
  angle: number
  radius: number
  accent: { fill: string; stroke: string; text: string }
}

const bugs: BugClass[] = [
  {
    label: "Use-After-Free",
    damage: "Data structure corruption, privilege escalation",
    example: "dev->status = READY after kfree(dev)",
    angle: -90, radius: 140,
    accent: { fill: "fill-red-500/15", stroke: "stroke-red-500/50", text: "fill-red-700 dark:fill-red-300" },
  },
  {
    label: "Double Free",
    damage: "Allocator corruption, overlapping allocations",
    example: "kfree(buf) called twice",
    angle: -18, radius: 140,
    accent: { fill: "fill-orange-500/15", stroke: "stroke-orange-500/50", text: "fill-orange-700 dark:fill-orange-300" },
  },
  {
    label: "Buffer Overrun",
    damage: "Adjacent memory corruption, code execution",
    example: "memcpy(buf, data, user_len) where user_len > 64",
    angle: 54, radius: 140,
    accent: { fill: "fill-amber-500/15", stroke: "stroke-amber-500/50", text: "fill-amber-700 dark:fill-amber-300" },
  },
  {
    label: "Data Race",
    damage: "Inconsistent state, intermittent failures",
    example: "shared->count++ from two contexts without lock",
    angle: 126, radius: 140,
    accent: { fill: "fill-purple-500/15", stroke: "stroke-purple-500/50", text: "fill-purple-700 dark:fill-purple-300" },
  },
  {
    label: "Invalid Dereference",
    damage: "Silent wrong-data access or kernel panic",
    example: "Uninitialized pointer dereferenced in Ring 0",
    angle: 198, radius: 140,
    accent: { fill: "fill-rose-500/15", stroke: "stroke-rose-500/50", text: "fill-rose-700 dark:fill-rose-300" },
  },
]

const NODE_W = 120
const NODE_H = 42

export function BugClassMap({ className }: { className?: string }) {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">Memory Safety: The Common Thread</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Every critical bug class converges on unsupervised memory access. Hover to see the damage.
        </p>
      </div>
      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto"
          onMouseLeave={() => setHover(null)}>

          {/* Central hub */}
          <circle cx={CX} cy={CY} r={50}
            className="fill-red-500/10 stroke-red-500/30 stroke-[1.5]" />
          <text x={CX} y={CY - 8} textAnchor="middle"
            className="fill-red-700 dark:fill-red-300 font-bold" fontSize={10}>
            Memory
          </text>
          <text x={CX} y={CY + 6} textAnchor="middle"
            className="fill-red-700 dark:fill-red-300 font-bold" fontSize={10}>
            Safety
          </text>
          <text x={CX} y={CY + 20} textAnchor="middle"
            className="fill-muted-foreground/30" fontSize={7}>
            root cause
          </text>

          {/* Connector lines + nodes */}
          {bugs.map((b, i) => {
            const rad = (b.angle * Math.PI) / 180
            const nx = CX + Math.cos(rad) * b.radius
            const ny = CY + Math.sin(rad) * b.radius
            const lit = hover === i
            const dimmed = hover !== null && hover !== i

            return (
              <g key={b.label}
                onMouseEnter={() => setHover(i)}
                className="cursor-pointer"
              >
                {/* Connector */}
                <line x1={CX} y1={CY} x2={nx} y2={ny}
                  className={cn("stroke-1 transition-all duration-300",
                    dimmed ? "stroke-muted-foreground/5" :
                    lit ? "stroke-red-500/30" : "stroke-muted-foreground/15"
                  )}
                  strokeDasharray="4 3"
                />

                {/* Node */}
                <rect x={nx - NODE_W / 2} y={ny - NODE_H / 2}
                  width={NODE_W} height={NODE_H} rx={6}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    dimmed ? "fill-muted/20 stroke-border/10" : b.accent.fill,
                    dimmed ? "" : b.accent.stroke,
                  )} />
                <text x={nx} y={ny - 4} textAnchor="middle"
                  className={cn("font-semibold transition-all duration-300",
                    dimmed ? "fill-muted-foreground/10" : b.accent.text
                  )} fontSize={9}>
                  {b.label}
                </text>
                <text x={nx} y={ny + 10} textAnchor="middle"
                  className={cn("transition-all duration-300",
                    dimmed ? "fill-muted-foreground/5" : "fill-muted-foreground/30"
                  )} fontSize={6}>
                  {b.damage.split(",")[0]}
                </text>
              </g>
            )
          })}

          {/* Detail panel */}
          {hover !== null && (() => {
            const b = bugs[hover]
            return (
              <g>
                <rect x={10} y={VH - 52} width={VW - 20} height={42} rx={6}
                  className={cn("stroke-[1.5]", b.accent.fill, b.accent.stroke)} />
                <text x={20} y={VH - 36}
                  className={cn("font-bold", b.accent.text)} fontSize={9}>
                  {b.label}
                </text>
                <text x={20} y={VH - 22}
                  className="fill-muted-foreground/50" fontSize={7}>
                  Damage: {b.damage}
                </text>
                <text x={VW - 20} y={VH - 28} textAnchor="end"
                  className="fill-muted-foreground/30 font-mono" fontSize={6}>
                  {b.example}
                </text>
              </g>
            )
          })()}

          {hover === null && (
            <text x={CX} y={VH - 28} textAnchor="middle"
              className="fill-muted-foreground/20" fontSize={8}>
              ↑ hover a bug class to see its kernel-level damage ↑
            </text>
          )}
        </svg>
      </div>
    </div>
  )
}
