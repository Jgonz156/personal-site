"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

type Scenario = "device-writes" | "cpu-writes" | "coherent"

interface NodeDef {
  id: string
  label: string
  subtitle?: string
  x: number; y: number; w: number; h: number
  color: string
  activeColor: string
}

interface WrapperDef {
  label: string
  x: number; y: number; w: number; h: number
  color: string
  labelX: number; labelY: number
}

interface ScenarioDef {
  label: string
  description: string
  activeBoxes: string[]
  arrows: { from: string; to: string; stale?: boolean; label?: string }[]
  badges: { box: string; state: "stale" | "fresh" }[]
}

const VW = 700
const VH = 310

const wrappers: WrapperDef[] = [
  { label: "SoC", x: 15, y: 6, w: 148, h: 250, color: "stroke-purple-400/40", labelX: 25, labelY: 20 },
  { label: "Main Memory", x: 200, y: 128, w: 148, h: 100, color: "stroke-cyan-400/40", labelX: 210, labelY: 142 },
  { label: "I/O Device", x: 400, y: 6, w: 168, h: 165, color: "stroke-orange-400/40", labelX: 410, labelY: 20 },
]

const nodes: NodeDef[] = [
  { id: "cpu", label: "CPU Core", x: 27, y: 28, w: 124, h: 48, color: "fill-purple-500/10 stroke-purple-500/40", activeColor: "fill-purple-500/25 stroke-purple-500" },
  { id: "cache", label: "Cache", subtitle: "L1 / L2", x: 27, y: 92, w: 124, h: 48, color: "fill-purple-400/10 stroke-purple-400/40", activeColor: "fill-purple-400/25 stroke-purple-400" },
  { id: "mmu", label: "MMU", subtitle: "Mem Ctrl", x: 27, y: 158, w: 124, h: 48, color: "fill-purple-300/10 stroke-purple-300/40", activeColor: "fill-purple-300/25 stroke-purple-300" },
  { id: "dram", label: "DRAM", x: 212, y: 158, w: 124, h: 48, color: "fill-cyan-500/10 stroke-cyan-500/40", activeColor: "fill-cyan-500/25 stroke-cyan-500" },
  { id: "ctrl", label: "Controller", x: 412, y: 30, w: 144, h: 44, color: "fill-orange-500/10 stroke-orange-500/40", activeColor: "fill-orange-500/25 stroke-orange-500" },
  { id: "dma_engine", label: "DMA Engine", x: 412, y: 92, w: 144, h: 44, color: "fill-amber-500/10 stroke-amber-500/40", activeColor: "fill-amber-500/25 stroke-amber-500" },
  { id: "iommu", label: "IOMMU", x: 400, y: 210, w: 168, h: 50, color: "fill-teal-500/10 stroke-teal-500/40", activeColor: "fill-teal-500/25 stroke-teal-500" },
]

const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

function getCenter(id: string) {
  const n = nodeMap[id]
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 }
}

function edgePoints(fromId: string, toId: string) {
  const from = getCenter(fromId)
  const to = getCenter(toId)
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const nx = dx / len
  const ny = dy / len
  return {
    x1: from.x + nx * 35,
    y1: from.y + ny * 25,
    x2: to.x - nx * 35,
    y2: to.y - ny * 25,
  }
}

const scenarios: Record<Scenario, ScenarioDef> = {
  "device-writes": {
    label: "Device Writes, CPU Stale",
    description:
      "The device\u2019s DMA engine wrote new data to DRAM, but the CPU\u2019s cache still holds the old value. The CPU reads stale data unless the cache line is invalidated.",
    activeBoxes: ["dma_engine", "ctrl", "mmu", "dram", "cache", "cpu"],
    arrows: [
      { from: "dma_engine", to: "dram" },
      { from: "cache", to: "cpu", stale: true },
    ],
    badges: [
      { box: "dram", state: "fresh" },
      { box: "cache", state: "stale" },
    ],
  },
  "cpu-writes": {
    label: "CPU Writes, Device Stale",
    description:
      "The CPU wrote new data into its cache, but the dirty line hasn\u2019t been flushed to DRAM. The device\u2019s DMA engine reads stale data from RAM.",
    activeBoxes: ["cpu", "cache", "dram", "dma_engine", "ctrl"],
    arrows: [
      { from: "cpu", to: "cache" },
      { from: "dram", to: "dma_engine", stale: true },
    ],
    badges: [
      { box: "cache", state: "fresh" },
      { box: "dram", state: "stale" },
    ],
  },
  coherent: {
    label: "Coherent (Solved)",
    description:
      "With IOMMU-mediated address translation and cache-coherent interconnects, DMA writes go through snoop filters. The CPU\u2019s cache and device see the same view of memory.",
    activeBoxes: ["cpu", "cache", "mmu", "dram", "ctrl", "dma_engine", "iommu"],
    arrows: [
      { from: "dma_engine", to: "iommu", label: "translate + protect" },
      { from: "iommu", to: "dram" },
      { from: "cache", to: "mmu", label: "snoop / flush" },
    ],
    badges: [
      { box: "cache", state: "fresh" },
      { box: "dram", state: "fresh" },
    ],
  },
}

const contextEdges = [
  ["cpu", "cache"],
  ["cache", "mmu"],
  ["mmu", "dram"],
  ["dma_engine", "ctrl"],
]

export function CoherenceDiagram({ className }: { className?: string }) {
  const [scenario, setScenario] = useState<Scenario>("device-writes")
  const s = scenarios[scenario]

  return (
    <div className={cn("w-full my-6", className)}>
      <div className="border rounded-lg bg-card p-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h4 className="text-sm font-semibold">I/O Coherence Scenarios</h4>
          <div className="flex gap-1 rounded-lg border p-0.5">
            {(Object.keys(scenarios) as Scenario[]).map((key) => (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                  scenario === key ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                {scenarios[key].label}
              </button>
            ))}
          </div>
        </div>

        <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} className="max-w-3xl mx-auto mb-3">

          {/* ── Layer 1: Wrapper rects ── */}
          {wrappers.map((w, i) => (
            <rect key={`wr-${i}`} x={w.x} y={w.y} width={w.w} height={w.h} rx={8}
              className={cn("fill-none stroke-[1.5] stroke-dashed", w.color)} />
          ))}

          {/* ── Layer 2: Connections ── */}

          {/* Context topology (always visible, thin) */}
          {contextEdges.map(([a, b]) => {
            const pts = edgePoints(a, b)
            return (
              <line key={`ctx-${a}-${b}`}
                x1={pts.x1} y1={pts.y1} x2={pts.x2} y2={pts.y2}
                className="stroke-border stroke-1" />
            )
          })}

          {/* Direct DMA↔DRAM path (non-coherent scenarios) */}
          {scenario !== "coherent" && (() => {
            const pts = edgePoints("dma_engine", "dram")
            return (
              <line x1={pts.x1} y1={pts.y1} x2={pts.x2} y2={pts.y2}
                className="stroke-border stroke-1" />
            )
          })()}

          {/* IOMMU path context (coherent scenario) */}
          {scenario === "coherent" && (() => {
            const pts1 = edgePoints("dma_engine", "iommu")
            const pts2 = edgePoints("iommu", "dram")
            return (
              <>
                <line x1={pts1.x1} y1={pts1.y1} x2={pts1.x2} y2={pts1.y2}
                  className="stroke-border stroke-1" />
                <line x1={pts2.x1} y1={pts2.y1} x2={pts2.x2} y2={pts2.y2}
                  className="stroke-border stroke-1" />
              </>
            )
          })()}

          {/* Active scenario arrows */}
          {s.arrows.map((arrow, i) => {
            const pts = edgePoints(arrow.from, arrow.to)
            return (
              <line key={`arr-${i}`}
                x1={pts.x1} y1={pts.y1} x2={pts.x2} y2={pts.y2}
                className={cn(
                  "stroke-[3] transition-all duration-300",
                  arrow.stale ? "stroke-red-500 dark:stroke-red-400" : "stroke-primary"
                )}
                markerEnd={arrow.stale ? "url(#coh-arrow-stale)" : "url(#coh-arrow)"}
              />
            )
          })}

          {/* ── Layer 3: Node rects ── */}
          {nodes.map((node) => {
            const isActive = s.activeBoxes.includes(node.id)
            const isGhosted = node.id === "iommu" && scenario !== "coherent"

            return (
              <rect key={`nr-${node.id}`}
                x={node.x} y={node.y} width={node.w} height={node.h} rx={6}
                className={cn(
                  "stroke-2 transition-all duration-300",
                  isGhosted ? "fill-muted/20 stroke-border/30 stroke-1 stroke-dashed" :
                  isActive ? node.activeColor : node.color
                )} />
            )
          })}

          {/* ── Layer 4: All text (topmost) ── */}

          {/* Wrapper labels */}
          {wrappers.map((w, i) => (
            <text key={`wl-${i}`} x={w.labelX} y={w.labelY}
              className="fill-muted-foreground/60 font-semibold" fontSize={10}>
              {w.label}
            </text>
          ))}

          {/* Node labels + subtitles */}
          {nodes.map((node) => {
            const isActive = s.activeBoxes.includes(node.id)
            const isGhosted = node.id === "iommu" && scenario !== "coherent"

            return (
              <g key={`nt-${node.id}`}>
                <text
                  x={node.x + node.w / 2} y={node.y + node.h / 2 + (node.subtitle && !isGhosted ? -2 : 4)}
                  textAnchor="middle"
                  className={cn(
                    "font-semibold transition-colors",
                    isGhosted ? "fill-muted-foreground/30" :
                    isActive ? "fill-foreground" : "fill-muted-foreground"
                  )}
                  fontSize={node.label.length > 10 ? 9 : 11}>
                  {node.label}
                </text>
                {node.subtitle && !isGhosted && (
                  <text x={node.x + node.w / 2} y={node.y + node.h / 2 + 12}
                    textAnchor="middle" className="fill-muted-foreground/60" fontSize={7}>
                    {node.subtitle}
                  </text>
                )}
              </g>
            )
          })}

          {/* Arrow edge labels */}
          {s.arrows.map((arrow, i) => {
            if (!arrow.label) return null
            const from = getCenter(arrow.from)
            const to = getCenter(arrow.to)
            return (
              <text key={`al-${i}`}
                x={(from.x + to.x) / 2 + 10} y={(from.y + to.y) / 2 - 6}
                className="fill-teal-600 dark:fill-teal-400 font-semibold" fontSize={8}>
                {arrow.label}
              </text>
            )
          })}

          {/* Stale / Fresh badges */}
          {s.badges.map((badge, i) => {
            const node = nodeMap[badge.box]
            const bx = node.x + node.w - 8
            const by = node.y - 4
            const isStale = badge.state === "stale"
            return (
              <g key={`badge-${i}`}>
                <rect x={bx} y={by} width={42} height={16} rx={3}
                  className={cn(
                    "stroke-[1.5] transition-all duration-300",
                    isStale ? "fill-red-500/15 stroke-red-500/70" : "fill-emerald-500/15 stroke-emerald-500/70"
                  )} />
                <text x={bx + 21} y={by + 12} textAnchor="middle"
                  className={cn(
                    "font-bold transition-colors",
                    isStale ? "fill-red-600 dark:fill-red-400" : "fill-emerald-600 dark:fill-emerald-400"
                  )}
                  fontSize={8}>
                  {isStale ? "STALE" : "FRESH"}
                </text>
              </g>
            )
          })}

          {/* Bottom mode label */}
          <text x={10} y={VH - 10} className="fill-muted-foreground/50 font-semibold" fontSize={10}>
            {scenario === "device-writes" ? "DEVICE \u2192 RAM (CPU STALE)" :
             scenario === "cpu-writes" ? "CPU \u2192 CACHE (RAM STALE)" :
             "COHERENT VIEW"}
          </text>

          <defs>
            <marker id="coh-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary" />
            </marker>
            <marker id="coh-arrow-stale" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-red-500 dark:fill-red-400" />
            </marker>
          </defs>
        </svg>

        <p className="text-sm text-muted-foreground">
          {s.description}
        </p>
      </div>
    </div>
  )
}
