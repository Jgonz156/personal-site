"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

type HoverRegion = "descriptors" | "scatter" | "msi" | null

const VW = 780
const VH = 400

interface WrapperDef {
  label: string
  x: number; y: number; w: number; h: number
  color: string
  labelX: number; labelY: number
  labelAnchor?: string
}

interface NodeDef {
  id: string
  label: string
  subtitle?: string
  x: number; y: number; w: number; h: number
  color: string
  activeColor: string
}

const wrappers: WrapperDef[] = [
  { label: "SoC", x: 12, y: 6, w: 148, h: 160, color: "stroke-purple-400/40", labelX: 22, labelY: 20 },
  { label: "Main Memory", x: 195, y: 6, w: 318, h: 388, color: "stroke-cyan-400/40", labelX: 205, labelY: 20 },
  { label: "NVMe SSD", x: 548, y: 6, w: 220, h: 210, color: "stroke-orange-400/40", labelX: 558, labelY: 20 },
]

const subWrappers: WrapperDef[] = [
  { label: "Descriptor Ring", x: 207, y: 76, w: 216, h: 82, color: "stroke-primary/20", labelX: 315, labelY: 90, labelAnchor: "middle" },
  { label: "Scatter/Gather Buffers", x: 207, y: 188, w: 294, h: 130, color: "stroke-cyan-500/20", labelX: 354, labelY: 202, labelAnchor: "middle" },
]

const nodes: NodeDef[] = [
  { id: "cpu", label: "CPU", subtitle: "ALU · CU · Regs", x: 24, y: 28, w: 124, h: 48, color: "fill-purple-500/10 stroke-purple-500/40", activeColor: "fill-purple-500/25 stroke-purple-500" },
  { id: "mmu", label: "MMU", subtitle: "Mem Ctrl · PCIe", x: 24, y: 96, w: 124, h: 50, color: "fill-purple-400/10 stroke-purple-400/40", activeColor: "fill-purple-400/25 stroke-purple-400" },
  { id: "ctrl", label: "Controller", subtitle: "PCIe Interface", x: 560, y: 38, w: 196, h: 44, color: "fill-orange-500/10 stroke-orange-500/40", activeColor: "fill-orange-500/25 stroke-orange-500" },
  { id: "dma", label: "DMA Engine", x: 560, y: 100, w: 196, h: 44, color: "fill-amber-500/10 stroke-amber-500/40", activeColor: "fill-amber-500/25 stroke-amber-500" },
  { id: "flash", label: "Flash Array", x: 560, y: 162, w: 196, h: 44, color: "fill-orange-400/10 stroke-orange-400/40", activeColor: "fill-orange-400/25 stroke-orange-400" },
]

const ringSlots = 4
const ringSlotW = 36
const ringSlotH = 28
const ringSlotGap = 6
const ringAreaX = 207
const ringAreaW = 216
const ringSlotStartX = ringAreaX + (ringAreaW - ringSlots * (ringSlotW + ringSlotGap) + ringSlotGap) / 2
const ringSlotY = 105

const scatterBufs = [
  { label: "Buffer A", x: 217, y: 218, w: 85, h: 34 },
  { label: "Buffer B", x: 322, y: 218, w: 85, h: 34 },
  { label: "Buffer C", x: 217, y: 268, w: 85, h: 34 },
]

const osRegion = { label: "OS Memory", x: 207, y: 340, w: 294, h: 34 }

function getCenter(n: { x: number; y: number; w: number; h: number }) {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 }
}

function ArrowLine({ x1, y1, x2, y2, active, variant = "primary", markerId }: {
  x1: number; y1: number; x2: number; y2: number
  active: boolean; variant?: "primary" | "msi"; markerId: string
}) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      className={cn(
        "transition-all duration-200",
        active
          ? variant === "msi"
            ? "stroke-rose-500 dark:stroke-rose-400 stroke-[3]"
            : "stroke-primary stroke-[3]"
          : "stroke-border stroke-[1.5]"
      )}
      markerEnd={active ? `url(#${markerId})` : undefined}
    />
  )
}

export function ModernDMADiagram({ className }: { className?: string }) {
  const [hovered, setHovered] = useState<HoverRegion>(null)

  const descActive = hovered === "descriptors"
  const scatActive = hovered === "scatter"
  const msiActive = hovered === "msi"
  const anyActive = hovered !== null

  const isHighlighted = (id: string) => {
    if (!anyActive) return false
    if (descActive) return ["cpu", "mmu", "ctrl", "dma"].includes(id)
    if (scatActive) return ["mmu", "ctrl", "dma"].includes(id)
    if (msiActive) return ["cpu", "mmu", "ctrl", "dma"].includes(id)
    return false
  }

  const mmu = nodes.find(n => n.id === "mmu")!
  const ctrl = nodes.find(n => n.id === "ctrl")!
  const dma = nodes.find(n => n.id === "dma")!
  const cpu = nodes.find(n => n.id === "cpu")!

  const mmuCenter = getCenter(mmu)
  const ctrlCenter = getCenter(ctrl)
  const dmaCenter = getCenter(dma)
  const cpuCenter = getCenter(cpu)

  const ringRightX = ringSlotStartX + ringSlots * (ringSlotW + ringSlotGap) - ringSlotGap
  const ringCenterY = ringSlotY + ringSlotH / 2

  return (
    <div className={cn("w-full my-6", className)}>
      <div className="border rounded-lg bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">Modern Bus-Mastering DMA</h4>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          Hover over a highlighted region to trace how descriptor rings, scatter/gather, and MSI signaling work together. All data paths flow through the MMU (memory controller).
        </p>

        <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} className="max-w-3xl mx-auto mb-3">

          {/* ── Layer 1: Wrapper rects ── */}
          {wrappers.map((w, i) => (
            <rect key={`w-${i}`} x={w.x} y={w.y} width={w.w} height={w.h} rx={8}
              className={cn("fill-none stroke-[1.5] stroke-dashed", w.color)} />
          ))}
          {subWrappers.map((w, i) => (
            <rect key={`sw-${i}`} x={w.x} y={w.y} width={w.w} height={w.h} rx={6}
              className={cn("fill-none stroke-[1] stroke-dashed transition-all duration-200",
                i === 0
                  ? descActive ? "stroke-primary/60" : "stroke-primary/20"
                  : scatActive ? "stroke-cyan-500/60" : "stroke-cyan-500/20"
              )} />
          ))}
          <rect x={osRegion.x} y={osRegion.y} width={osRegion.w} height={osRegion.h} rx={4}
            className="fill-muted/20 stroke-border/30 stroke-1 stroke-dashed" />

          {/* ── Layer 2: Connections / arrows ── */}

          {/* Context lines (thin, always visible) */}
          <line x1={mmu.x + mmu.w} y1={mmuCenter.y} x2={ringAreaX} y2={ringCenterY}
            className="stroke-border/40 stroke-1 stroke-dashed" />
          <line x1={ringRightX} y1={ringCenterY} x2={ctrl.x} y2={ctrlCenter.y}
            className="stroke-border/40 stroke-1 stroke-dashed" />

          {/* CPU fills ring: MMU right → Ring left */}
          <ArrowLine
            x1={mmu.x + mmu.w} y1={mmuCenter.y}
            x2={ringSlotStartX} y2={ringCenterY}
            active={descActive} markerId="mdma-arrow" />

          {/* Device reads descriptors: Ring right → Controller left */}
          <ArrowLine
            x1={ringRightX} y1={ringCenterY}
            x2={ctrl.x} y2={ctrlCenter.y}
            active={descActive} markerId="mdma-arrow" />

          {/* Device DMA writes scatter buffers */}
          {scatterBufs.map((buf, i) => (
            <ArrowLine key={`sca-${i}`}
              x1={dma.x} y1={dmaCenter.y + (i - 1) * 8}
              x2={buf.x + buf.w} y2={buf.y + buf.h / 2}
              active={scatActive} markerId="mdma-arrow" />
          ))}

          {/* MSI path: DMA Engine → CPU */}
          <ArrowLine
            x1={dma.x} y1={dma.y + 8}
            x2={cpu.x + cpu.w + 4} y2={cpuCenter.y + 8}
            active={msiActive} variant="msi" markerId="mdma-arrow-msi" />

          {/* ── Layer 3: Node rects ── */}
          {nodes.map((node) => (
            <rect key={`nr-${node.id}`}
              x={node.x} y={node.y} width={node.w} height={node.h} rx={6}
              className={cn("stroke-2 transition-all duration-200",
                isHighlighted(node.id) ? node.activeColor : node.color
              )} />
          ))}

          {/* Descriptor ring slots (hoverable) */}
          <g
            onMouseEnter={() => setHovered("descriptors")}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <rect x={ringAreaX} y={76} width={ringAreaW + 8} height={82} className="fill-transparent" />
            {Array.from({ length: ringSlots }).map((_, i) => {
              const sx = ringSlotStartX + i * (ringSlotW + ringSlotGap)
              const isCurrent = i === 1
              return (
                <rect key={`rs-${i}`} x={sx} y={ringSlotY} width={ringSlotW} height={ringSlotH} rx={3}
                  className={cn("stroke-[1.5] transition-all duration-200",
                    isCurrent ? "fill-primary/20 stroke-primary"
                    : descActive ? "fill-muted stroke-primary/50"
                    : "fill-muted/50 stroke-border"
                  )} />
              )
            })}
          </g>

          {/* Scatter buffer rects (hoverable) */}
          <g
            onMouseEnter={() => setHovered("scatter")}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer"
          >
            <rect x={subWrappers[1].x} y={subWrappers[1].y} width={subWrappers[1].w} height={subWrappers[1].h} className="fill-transparent" />
            {scatterBufs.map((buf, i) => (
              <rect key={`sb-${i}`} x={buf.x} y={buf.y} width={buf.w} height={buf.h} rx={4}
                className={cn("stroke-[1.5] transition-all duration-200",
                  scatActive ? "fill-cyan-500/15 stroke-cyan-500 stroke-dashed"
                  : "fill-muted/30 stroke-border stroke-dashed"
                )} />
            ))}
          </g>

          {/* MSI hover target (along the arrow path) */}
          <rect
            x={165} y={28} width={390} height={26} rx={4}
            className={cn("transition-all duration-200 cursor-pointer",
              msiActive ? "fill-rose-500/8 stroke-rose-500/30 stroke-[1.5]" : "fill-transparent stroke-transparent"
            )}
            onMouseEnter={() => setHovered("msi")}
            onMouseLeave={() => setHovered(null)}
          />

          {/* ── Layer 4: All text (topmost) ── */}

          {/* Wrapper labels */}
          {wrappers.map((w, i) => (
            <text key={`wl-${i}`} x={w.labelX} y={w.labelY}
              className="fill-muted-foreground/60 font-semibold" fontSize={10}>
              {w.label}
            </text>
          ))}

          {/* Sub-wrapper labels */}
          {subWrappers.map((w, i) => (
            <text key={`swl-${i}`} x={w.labelX} y={w.labelY}
              textAnchor={(w.labelAnchor || "start") as "start" | "middle" | "end"}
              className={cn("font-semibold transition-colors",
                i === 0
                  ? descActive ? "fill-primary" : "fill-muted-foreground/50"
                  : scatActive ? "fill-cyan-500" : "fill-muted-foreground/50"
              )}
              fontSize={9}>
              {w.label}
            </text>
          ))}

          {/* OS Region label */}
          <text x={osRegion.x + osRegion.w / 2} y={osRegion.y + osRegion.h / 2 + 4}
            textAnchor="middle" className="fill-muted-foreground/30" fontSize={8}>
            {osRegion.label}
          </text>

          {/* Node labels + subtitles */}
          {nodes.map((node) => (
            <g key={`nt-${node.id}`}>
              <text x={node.x + node.w / 2} y={node.y + node.h / 2 + (node.subtitle ? -2 : 4)}
                textAnchor="middle"
                className={cn("font-semibold transition-colors",
                  isHighlighted(node.id) ? "fill-foreground" : "fill-muted-foreground"
                )}
                fontSize={node.label.length > 12 ? 9 : 11}>
                {node.label}
              </text>
              {node.subtitle && (
                <text x={node.x + node.w / 2} y={node.y + node.h / 2 + 12}
                  textAnchor="middle" className="fill-muted-foreground/60" fontSize={7}>
                  {node.subtitle}
                </text>
              )}
            </g>
          ))}

          {/* Descriptor slot labels */}
          {Array.from({ length: ringSlots }).map((_, i) => {
            const sx = ringSlotStartX + i * (ringSlotW + ringSlotGap)
            const isCurrent = i === 1
            return (
              <text key={`rsl-${i}`} x={sx + ringSlotW / 2} y={ringSlotY + ringSlotH / 2 + 3}
                textAnchor="middle"
                className={cn("transition-colors", isCurrent ? "fill-primary font-bold" : "fill-muted-foreground")}
                fontSize={7}>
                {isCurrent ? "curr" : "desc"}
              </text>
            )
          })}

          {/* Scatter buffer labels */}
          {scatterBufs.map((buf, i) => (
            <text key={`sbl-${i}`} x={buf.x + buf.w / 2} y={buf.y + buf.h / 2 + 3}
              textAnchor="middle"
              className={cn("font-medium transition-colors", scatActive ? "fill-foreground" : "fill-muted-foreground/60")}
              fontSize={8}>
              {buf.label}
            </text>
          ))}

          {/* Descriptor hover annotations */}
          {descActive && (
            <>
              <text x={mmu.x + mmu.w + 18} y={mmuCenter.y - 8}
                className="fill-primary font-semibold" fontSize={7}>CPU fills ring</text>
              <text x={ringRightX + 12} y={ringCenterY - 8}
                className="fill-primary font-semibold" fontSize={7}>device reads via PCIe</text>
            </>
          )}

          {/* Scatter hover annotation */}
          {scatActive && (
            <text x={548} y={dmaCenter.y + 28} textAnchor="end"
              className="fill-primary font-semibold" fontSize={7}>non-contiguous writes via PCIe</text>
          )}

          {/* MSI label (always visible, bold on hover) */}
          <text x={(dma.x + cpu.x + cpu.w) / 2} y={36} textAnchor="middle"
            className={cn("font-bold transition-colors",
              msiActive ? "fill-rose-600 dark:fill-rose-400" : "fill-muted-foreground/50"
            )}
            fontSize={9}>MSI / MSI-X</text>
          {msiActive && (
            <text x={(dma.x + cpu.x + cpu.w) / 2} y={48} textAnchor="middle"
              className="fill-rose-600/70 dark:fill-rose-400/70" fontSize={7}>(memory write, not a wire)</text>
          )}

          <defs>
            <marker id="mdma-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary" />
            </marker>
            <marker id="mdma-arrow-msi" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-rose-500 dark:fill-rose-400" />
            </marker>
          </defs>
        </svg>

        {/* Legend (hoverable) */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className={cn("transition-colors cursor-pointer", descActive && "text-foreground font-medium")}
            onMouseEnter={() => setHovered("descriptors")} onMouseLeave={() => setHovered(null)}>
            <span className="inline-block w-2 h-2 rounded-full bg-primary/60 mr-1" />
            Descriptor Ring
          </span>
          <span className={cn("transition-colors cursor-pointer", scatActive && "text-foreground font-medium")}
            onMouseEnter={() => setHovered("scatter")} onMouseLeave={() => setHovered(null)}>
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-500/60 mr-1" />
            Scatter/Gather
          </span>
          <span className={cn("transition-colors cursor-pointer", msiActive && "text-foreground font-medium")}
            onMouseEnter={() => setHovered("msi")} onMouseLeave={() => setHovered(null)}>
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500/60 mr-1" />
            MSI/MSI-X
          </span>
        </div>
      </div>
    </div>
  )
}
