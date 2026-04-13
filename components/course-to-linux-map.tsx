"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 640
const VH = 380
const CX = VW / 2
const CY = VH / 2

interface Concept {
  label: string
  sub: string
  lecture: string
  tool: string
  angle: number
  radius: number
  accent: { fill: string; stroke: string; text: string }
  walkthroughs: ("device" | "network")[]
}

const concepts: Concept[] = [
  {
    label: "Processes", sub: "unit of isolation", lecture: "LN9",
    tool: "ps", angle: 0, radius: 148,
    accent: { fill: "fill-blue-500/15", stroke: "stroke-blue-500/50", text: "fill-blue-700 dark:fill-blue-300" },
    walkthroughs: ["device", "network"],
  },
  {
    label: "Syscalls", sub: "user/kernel crossing", lecture: "LN19",
    tool: "strace", angle: 45, radius: 148,
    accent: { fill: "fill-green-500/15", stroke: "stroke-green-500/50", text: "fill-green-700 dark:fill-green-300" },
    walkthroughs: ["device", "network"],
  },
  {
    label: "Drivers", sub: "device dispatch", lecture: "LN18/19",
    tool: "/dev + dmesg", angle: 90, radius: 148,
    accent: { fill: "fill-orange-500/15", stroke: "stroke-orange-500/50", text: "fill-orange-700 dark:fill-orange-300" },
    walkthroughs: ["device"],
  },
  {
    label: "VFS", sub: "uniform file interface", lecture: "LN18",
    tool: "/dev, /proc, /sys", angle: 135, radius: 148,
    accent: { fill: "fill-purple-500/15", stroke: "stroke-purple-500/50", text: "fill-purple-700 dark:fill-purple-300" },
    walkthroughs: ["device"],
  },
  {
    label: "IPC", sub: "local communication", lecture: "LN20",
    tool: "pipes, FIFOs", angle: 180, radius: 148,
    accent: { fill: "fill-rose-500/15", stroke: "stroke-rose-500/50", text: "fill-rose-700 dark:fill-rose-300" },
    walkthroughs: [],
  },
  {
    label: "Packets", sub: "layered network data", lecture: "LN21",
    tool: "ip", angle: 225, radius: 148,
    accent: { fill: "fill-amber-500/15", stroke: "stroke-amber-500/50", text: "fill-amber-700 dark:fill-amber-300" },
    walkthroughs: ["network"],
  },
  {
    label: "Transport", sub: "TCP/UDP contracts", lecture: "LN22",
    tool: "ss", angle: 270, radius: 148,
    accent: { fill: "fill-cyan-500/15", stroke: "stroke-cyan-500/50", text: "fill-cyan-700 dark:fill-cyan-300" },
    walkthroughs: ["network"],
  },
  {
    label: "Sockets", sub: "endpoint abstraction", lecture: "LN22",
    tool: "ss, strace", angle: 315, radius: 148,
    accent: { fill: "fill-teal-500/15", stroke: "stroke-teal-500/50", text: "fill-teal-700 dark:fill-teal-300" },
    walkthroughs: ["network"],
  },
]

const NODE_W = 104
const NODE_H = 52

type Filter = "all" | "device" | "network"

export function CourseToLinuxMap({ className }: { className?: string }) {
  const [filter, setFilter] = useState<Filter>("all")

  const isLit = (c: Concept) =>
    filter === "all" || c.walkthroughs.includes(filter)

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between flex-wrap gap-2">
        <div>
          <h4 className="text-sm font-semibold">Course Abstractions in Linux</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Each concept connects to observable Linux surfaces. Filter by walkthrough.
          </p>
        </div>
        <div className="flex gap-1.5">
          {([
            ["all", "All"],
            ["device", "Device Walkthrough"],
            ["network", "Network Walkthrough"],
          ] as [Filter, string][]).map(([f, label]) => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-2.5 py-1 rounded text-xs font-medium border transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "hover:bg-muted border-border"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
          {/* Central kernel circle */}
          <circle cx={CX} cy={CY} r={42}
            className="fill-slate-500/10 stroke-slate-500/30 stroke-[1.5]" />
          <text x={CX} y={CY - 6} textAnchor="middle"
            className="fill-foreground/70 font-bold" fontSize={11}>
            Linux
          </text>
          <text x={CX} y={CY + 8} textAnchor="middle"
            className="fill-muted-foreground/40" fontSize={8}>
            Kernel
          </text>

          {/* Connector lines */}
          {concepts.map((c) => {
            const rad = (c.angle * Math.PI) / 180
            const nx = CX + Math.cos(rad) * c.radius
            const ny = CY + Math.sin(rad) * c.radius
            const lit = isLit(c)
            return (
              <line key={`line-${c.label}`}
                x1={CX} y1={CY}
                x2={nx} y2={ny}
                className={cn("stroke-1 transition-all duration-300",
                  lit ? "stroke-muted-foreground/20" : "stroke-muted-foreground/5"
                )}
                strokeDasharray="4 3"
              />
            )
          })}

          {/* Concept nodes */}
          {concepts.map((c) => {
            const rad = (c.angle * Math.PI) / 180
            const nx = CX + Math.cos(rad) * c.radius
            const ny = CY + Math.sin(rad) * c.radius
            const rx = nx - NODE_W / 2
            const ry = ny - NODE_H / 2
            const lit = isLit(c)

            return (
              <g key={c.label} className="transition-all duration-300">
                <rect x={rx} y={ry} width={NODE_W} height={NODE_H} rx={6}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    lit ? c.accent.fill : "fill-muted/20",
                    lit ? c.accent.stroke : "stroke-border/10",
                  )} />
                <text x={nx} y={ny - 10} textAnchor="middle"
                  className={cn("font-semibold transition-all duration-300",
                    lit ? c.accent.text : "fill-muted-foreground/15"
                  )} fontSize={9}>
                  {c.label}
                </text>
                <text x={nx} y={ny + 1} textAnchor="middle"
                  className={cn("transition-all duration-300",
                    lit ? "fill-muted-foreground/50" : "fill-muted-foreground/10"
                  )} fontSize={7}>
                  {c.sub}
                </text>
                <text x={nx} y={ny + 14} textAnchor="middle"
                  className={cn("font-mono transition-all duration-300",
                    lit ? "fill-muted-foreground/40" : "fill-muted-foreground/10"
                  )} fontSize={6}>
                  {c.tool}
                </text>
                <text x={rx + NODE_W - 4} y={ry + 10} textAnchor="end"
                  className={cn("transition-all duration-300",
                    lit ? "fill-muted-foreground/30" : "fill-muted-foreground/8"
                  )} fontSize={6}>
                  {c.lecture}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
