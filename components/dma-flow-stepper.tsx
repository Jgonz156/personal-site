"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface StepDef {
  description: string
  activeComponents: string[]
  arrows: { from: string; to: string }[]
  cpuState: "busy" | "free"
  interruptFired: boolean
}

const withoutDmaSteps: StepDef[] = [
  {
    description: "CPU sends a read request to the I/O device's controller",
    activeComponents: ["cpu", "dev_ctrl"],
    arrows: [{ from: "cpu", to: "dev_ctrl" }],
    cpuState: "busy",
    interruptFired: false,
  },
  {
    description: "Device controller commands the functional hardware to load data into its buffer",
    activeComponents: ["dev_ctrl", "func_hw"],
    arrows: [{ from: "dev_ctrl", to: "func_hw" }],
    cpuState: "busy",
    interruptFired: false,
  },
  {
    description: "Controller sends data back to the CPU over the bus",
    activeComponents: ["dev_ctrl", "cpu"],
    arrows: [{ from: "dev_ctrl", to: "cpu" }],
    cpuState: "busy",
    interruptFired: false,
  },
  {
    description: "I/O device fires an interrupt to alert the CPU that data is ready",
    activeComponents: ["dev_ctrl", "cpu"],
    arrows: [{ from: "dev_ctrl", to: "cpu" }],
    cpuState: "busy",
    interruptFired: true,
  },
  {
    description: "CPU copies data into the memory buffer and resumes — repeat for every block (programmed I/O)",
    activeComponents: ["cpu", "dma_buffer"],
    arrows: [{ from: "cpu", to: "dma_buffer" }],
    cpuState: "busy",
    interruptFired: false,
  },
]

const withDmaSteps: StepDef[] = [
  {
    description: "CPU programs the DMA controller's registers with transfer parameters (address, count, direction)",
    activeComponents: ["cpu", "dma_regs"],
    arrows: [{ from: "cpu", to: "dma_regs" }],
    cpuState: "busy",
    interruptFired: false,
  },
  {
    description: "CPU resumes other work — it is now free to execute other instructions",
    activeComponents: ["cpu"],
    arrows: [],
    cpuState: "free",
    interruptFired: false,
  },
  {
    description: "DMA controller sends the read request to the I/O device's controller",
    activeComponents: ["dma_regs", "dev_ctrl"],
    arrows: [{ from: "dma_regs", to: "dev_ctrl" }],
    cpuState: "free",
    interruptFired: false,
  },
  {
    description: "Device controller commands the functional hardware to load data into its buffer",
    activeComponents: ["dev_ctrl", "func_hw"],
    arrows: [{ from: "dev_ctrl", to: "func_hw" }],
    cpuState: "free",
    interruptFired: false,
  },
  {
    description: "Controller sends data over the bus to the DMA controller",
    activeComponents: ["dev_ctrl", "dma_regs"],
    arrows: [{ from: "dev_ctrl", to: "dma_regs" }],
    cpuState: "free",
    interruptFired: false,
  },
  {
    description: "DMA controller writes data directly to the memory buffer — no CPU involvement",
    activeComponents: ["dma_regs", "dma_buffer"],
    arrows: [{ from: "dma_regs", to: "dma_buffer" }],
    cpuState: "free",
    interruptFired: false,
  },
  {
    description: "DMA fires an interrupt to alert the CPU that the entire transfer is complete (modern devices may use MSI/MSI-X)",
    activeComponents: ["dma_regs", "cpu"],
    arrows: [{ from: "dma_regs", to: "cpu" }],
    cpuState: "busy",
    interruptFired: true,
  },
  {
    description: "CPU reads the data from the memory buffer (not from the device) and resumes work",
    activeComponents: ["dma_buffer", "cpu"],
    arrows: [{ from: "dma_buffer", to: "cpu" }],
    cpuState: "busy",
    interruptFired: false,
  },
]

interface CompDef {
  label: string
  subtitle?: string
  x: number
  y: number
  w: number
  h: number
  color: string
  activeColor: string
}

interface WrapperDef {
  label: string
  x: number
  y: number
  w: number
  h: number
  color: string
  labelX: number
  labelY: number
  labelAnchor?: string
  ghostInWithout?: boolean
}

const VW = 700
const VH = 300

const wrappers: WrapperDef[] = [
  { label: "DMA Controller", x: 165, y: 8, w: 175, h: 110, color: "stroke-amber-400/40", labelX: 252, labelY: 24, labelAnchor: "middle", ghostInWithout: true },
  { label: "Main Memory", x: 395, y: 8, w: 280, h: 110, color: "stroke-cyan-400/40", labelX: 404, labelY: 24 },
  { label: "Disk Drive", x: 190, y: 170, w: 320, h: 120, color: "stroke-orange-400/40", labelX: 350, labelY: 186, labelAnchor: "middle" },
]

const components: Record<string, CompDef> = {
  cpu: { label: "CPU", subtitle: "ALU · CU · Regs", x: 25, y: 30, w: 95, h: 58, color: "fill-purple-500/10 stroke-purple-500/40", activeColor: "fill-purple-500/25 stroke-purple-500" },
  dma_regs: { label: "Registers", subtitle: "Addr · Count · Ctrl", x: 177, y: 34, w: 150, h: 58, color: "fill-amber-500/10 stroke-amber-500/40", activeColor: "fill-amber-500/25 stroke-amber-500" },
  dma_buffer: { label: "DMA Buffer", x: 407, y: 34, w: 120, h: 58, color: "fill-cyan-500/10 stroke-cyan-500/40", activeColor: "fill-cyan-500/25 stroke-cyan-500" },
  os_region: { label: "OS Region", x: 543, y: 34, w: 120, h: 58, color: "fill-cyan-400/5 stroke-cyan-400/25", activeColor: "fill-cyan-400/15 stroke-cyan-400" },
  dev_ctrl: { label: "Controller", x: 202, y: 198, w: 132, h: 58, color: "fill-orange-500/10 stroke-orange-500/40", activeColor: "fill-orange-500/25 stroke-orange-500" },
  func_hw: { label: "Platters / Flash", x: 366, y: 198, w: 132, h: 58, color: "fill-orange-400/10 stroke-orange-400/40", activeColor: "fill-orange-400/25 stroke-orange-400" },
}

const contextEdges = [
  ["cpu", "dma_regs"],
  ["dma_regs", "dma_buffer"],
  ["dma_regs", "dev_ctrl"],
  ["cpu", "dev_ctrl"],
  ["cpu", "dma_buffer"],
]

function getCenter(id: string) {
  const c = components[id]
  return { x: c.x + c.w / 2, y: c.y + c.h / 2 }
}

export function DMAFlowStepper({ className }: { className?: string }) {
  const [mode, setMode] = useState<"without" | "with">("without")
  const [step, setStep] = useState(0)

  const steps = mode === "without" ? withoutDmaSteps : withDmaSteps
  const currentStep = steps[step]

  const handleModeChange = (newMode: "without" | "with") => {
    setMode(newMode)
    setStep(0)
  }

  const isDmaGhosted = mode === "without"

  return (
    <div className={cn("w-full my-6", className)}>
      <div className="border rounded-lg bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">Data Transfer Flow</h4>
          <div className="flex gap-1 rounded-lg border p-0.5">
            <button
              onClick={() => handleModeChange("without")}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                mode === "without" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              Without DMA
            </button>
            <button
              onClick={() => handleModeChange("with")}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                mode === "with" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              With DMA
            </button>
          </div>
        </div>

        <svg width="100%" viewBox={`0 0 ${VW} ${VH}`} className="max-w-3xl mx-auto mb-3">
          {/* ── Layer 1: Wrapper rects ── */}
          {wrappers.map((w, i) => (
            <rect key={`wr-${i}`}
              x={w.x} y={w.y} width={w.w} height={w.h} rx={8}
              className={cn(
                "fill-none stroke-[1.5] stroke-dashed",
                w.ghostInWithout && isDmaGhosted ? "stroke-border/20" : w.color
              )}
            />
          ))}

          {/* ── Layer 2: Context edge lines ── */}
          {contextEdges.map(([a, b]) => {
            if (isDmaGhosted && (a === "dma_regs" || b === "dma_regs")) return null
            const from = getCenter(a)
            const to = getCenter(b)
            return (
              <line key={`ce-${a}-${b}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                className="stroke-border stroke-1" />
            )
          })}

          {/* Active step arrows */}
          {currentStep.arrows.map((arrow, i) => {
            const from = getCenter(arrow.from)
            const to = getCenter(arrow.to)
            const dx = to.x - from.x
            const dy = to.y - from.y
            const len = Math.sqrt(dx * dx + dy * dy)
            const nx = dx / len
            const ny = dy / len
            const startX = from.x + nx * 30
            const startY = from.y + ny * 30
            const endX = to.x - nx * 30
            const endY = to.y - ny * 30

            return (
              <line key={`sa-${i}`} x1={startX} y1={startY} x2={endX} y2={endY}
                className="stroke-primary stroke-[3]" markerEnd="url(#dma-arrow)" />
            )
          })}

          {/* ── Layer 3: Component rects ── */}
          {Object.entries(components).map(([id, comp]) => {
            const isActive = currentStep.activeComponents.includes(id)
            const isGhostedDma = isDmaGhosted && id === "dma_regs"

            return (
              <rect key={`cr-${id}`}
                x={comp.x} y={comp.y} width={comp.w} height={comp.h} rx={6}
                className={cn(
                  "stroke-2 transition-all duration-300",
                  isGhostedDma ? "fill-muted/20 stroke-border/30 stroke-1 stroke-dashed" :
                  isActive ? comp.activeColor : comp.color
                )}
              />
            )
          })}

          {/* ── Layer 4: All text (topmost) ── */}

          {/* Wrapper labels */}
          {wrappers.map((w, i) => (
            <text key={`wt-${i}`}
              x={w.labelX} y={w.labelY}
              textAnchor={(w.labelAnchor || "start") as "start" | "middle" | "end"}
              className={cn(
                "font-semibold",
                w.ghostInWithout && isDmaGhosted ? "fill-muted-foreground/20" : "fill-muted-foreground/60"
              )}
              fontSize={10}
            >
              {w.label}
            </text>
          ))}

          {/* Component labels */}
          {Object.entries(components).map(([id, comp]) => {
            const isActive = currentStep.activeComponents.includes(id)
            const isGhostedDma = isDmaGhosted && id === "dma_regs"

            return (
              <g key={`ct-${id}`}>
                <text
                  x={comp.x + comp.w / 2} y={comp.y + comp.h / 2 + (comp.subtitle ? -2 : 4)}
                  textAnchor="middle"
                  className={cn(
                    "font-semibold transition-colors",
                    isGhostedDma ? "fill-muted-foreground/20" :
                    isActive ? "fill-foreground" : "fill-muted-foreground"
                  )}
                  fontSize={comp.label.length > 12 ? 9 : 11}
                >
                  {isGhostedDma ? "(no DMA)" : id === "dma_buffer" && isDmaGhosted ? "Memory Buffer" : comp.label}
                </text>
                {comp.subtitle && !isGhostedDma && (
                  <text
                    x={comp.x + comp.w / 2} y={comp.y + comp.h / 2 + 12}
                    textAnchor="middle"
                    className="fill-muted-foreground/60" fontSize={7}
                  >
                    {comp.subtitle}
                  </text>
                )}
              </g>
            )
          })}

          {/* Interrupt indicator */}
          {currentStep.interruptFired && (
            <text x={VW / 2} y={VH - 6} textAnchor="middle" className="fill-amber-500 font-bold animate-pulse" fontSize={12}>
              INTERRUPT
            </text>
          )}

          <defs>
            <marker id="dma-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary" />
            </marker>
          </defs>
        </svg>

        {/* Step controls and description */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-30 hover:bg-muted transition-colors"
          >
            Back
          </button>
          <span className="text-xs text-muted-foreground font-mono">
            Step {step + 1} / {steps.length}
          </span>
          <button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            disabled={step === steps.length - 1}
            className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-30 hover:bg-muted transition-colors"
          >
            Next
          </button>

          <div className="ml-auto flex items-center gap-2 text-xs">
            <span className="font-medium">CPU:</span>
            <span className={cn(
              "px-2 py-0.5 rounded font-semibold",
              currentStep.cpuState === "busy"
                ? "bg-red-500/15 text-red-700 dark:text-red-300"
                : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
            )}>
              {currentStep.cpuState === "busy" ? "Busy" : "Free"}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {currentStep.description}
        </p>

        <p className="text-[11px] text-muted-foreground/60 mt-2 italic">
          Simplified model — modern devices often use bus-mastering DMA with descriptor rings and scatter/gather, bypassing a separate DMA controller chip entirely.
        </p>
      </div>
    </div>
  )
}
