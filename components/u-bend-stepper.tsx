"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 700
const VH = 430
const BOUNDARY_Y = 82

type NodeId =
  | "read" | "trap" | "dispatch" | "hardware"
  | "sleep" | "device"
  | "interrupt" | "deferred" | "wake" | "bytes"

type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
type VisualState = "active" | "done" | "dimmed" | "dormant"

interface NodeDef {
  cx: number; cy: number; w: number; h: number
  label: string; sub?: string
}

const N: Record<NodeId, NodeDef> = {
  read:      { cx: 120, cy: 42,  w: 118, h: 38, label: "read()",         sub: "Process calls" },
  trap:      { cx: 120, cy: 144, w: 118, h: 38, label: "Trap",           sub: "Syscall entry" },
  dispatch:  { cx: 120, cy: 234, w: 118, h: 38, label: "Dispatch",       sub: "Route to driver" },
  hardware:  { cx: 270, cy: 318, w: 128, h: 38, label: "Hardware",       sub: "Program device" },
  sleep:     { cx: 270, cy: 390, w: 116, h: 30, label: "Process Sleeps" },
  device:    { cx: 430, cy: 390, w: 116, h: 30, label: "Device Runs" },
  interrupt: { cx: 430, cy: 318, w: 128, h: 38, label: "Interrupt",      sub: "IRQ fires" },
  deferred:  { cx: 580, cy: 234, w: 128, h: 38, label: "Deferred Work",  sub: "Bottom half" },
  wake:      { cx: 580, cy: 144, w: 118, h: 38, label: "Wake",           sub: "Process resumes" },
  bytes:     { cx: 580, cy: 42,  w: 118, h: 38, label: "Continue",       sub: "Bytes received" },
}

const nodeIds = Object.keys(N) as NodeId[]

const activeColors: Record<NodeId, { fill: string; stroke: string; text: string; sub: string }> = {
  read:      { fill: "fill-green-500/20",   stroke: "stroke-green-500",   text: "fill-green-700 dark:fill-green-300",   sub: "fill-green-600/60 dark:fill-green-400/60" },
  bytes:     { fill: "fill-green-500/20",   stroke: "stroke-green-500",   text: "fill-green-700 dark:fill-green-300",   sub: "fill-green-600/60 dark:fill-green-400/60" },
  trap:      { fill: "fill-blue-500/20",    stroke: "stroke-blue-500",    text: "fill-blue-700 dark:fill-blue-300",     sub: "fill-blue-600/60 dark:fill-blue-400/60" },
  wake:      { fill: "fill-blue-500/20",    stroke: "stroke-blue-500",    text: "fill-blue-700 dark:fill-blue-300",     sub: "fill-blue-600/60 dark:fill-blue-400/60" },
  dispatch:  { fill: "fill-purple-500/20",  stroke: "stroke-purple-500",  text: "fill-purple-700 dark:fill-purple-300", sub: "fill-purple-600/60 dark:fill-purple-400/60" },
  deferred:  { fill: "fill-purple-500/20",  stroke: "stroke-purple-500",  text: "fill-purple-700 dark:fill-purple-300", sub: "fill-purple-600/60 dark:fill-purple-400/60" },
  hardware:  { fill: "fill-orange-500/20",  stroke: "stroke-orange-500",  text: "fill-orange-700 dark:fill-orange-300", sub: "fill-orange-600/60 dark:fill-orange-400/60" },
  interrupt: { fill: "fill-amber-500/20",   stroke: "stroke-amber-500",   text: "fill-amber-700 dark:fill-amber-300",   sub: "fill-amber-600/60 dark:fill-amber-400/60" },
  sleep:     { fill: "fill-red-500/15",     stroke: "stroke-red-500/70",  text: "fill-red-600 dark:fill-red-400",       sub: "" },
  device:    { fill: "fill-emerald-500/20", stroke: "stroke-emerald-500", text: "fill-emerald-700 dark:fill-emerald-300", sub: "" },
}

function nodeState(id: NodeId, phase: Phase): VisualState {
  if (phase === 0) return "active"
  switch (phase) {
    case 1:
      if (id === "read" || id === "trap") return "active"
      return "dimmed"
    case 2:
      if (id === "dispatch") return "active"
      if (id === "read" || id === "trap") return "done"
      return "dimmed"
    case 3:
      if (id === "hardware") return "active"
      if (id === "read" || id === "trap" || id === "dispatch") return "done"
      return "dimmed"
    case 4:
      if (id === "device") return "active"
      if (id === "sleep") return "dormant"
      if (id === "read" || id === "trap" || id === "dispatch" || id === "hardware") return "done"
      return "dimmed"
    case 5:
      if (id === "interrupt" || id === "device") return "active"
      if (id === "read" || id === "trap" || id === "dispatch" || id === "hardware" || id === "sleep") return "done"
      return "dimmed"
    case 6:
      if (id === "deferred" || id === "wake") return "active"
      if (id === "read" || id === "trap" || id === "dispatch" || id === "hardware" || id === "device" || id === "sleep" || id === "interrupt") return "done"
      return "dimmed"
    case 7:
      if (id === "bytes") return "active"
      return "done"
    default:
      return "dimmed"
  }
}

interface EdgeDef {
  d: string
  phase: Phase
  fork?: "sleep" | "device"
}

const edges: EdgeDef[] = [
  { d: "M 120 61 L 120 125",                phase: 1 },
  { d: "M 120 163 L 120 215",               phase: 2 },
  { d: "M 120 253 Q 120 318 206 318",       phase: 3 },
  { d: "M 270 337 L 270 375",               phase: 4, fork: "sleep" },
  { d: "M 270 337 Q 370 375 430 375",       phase: 4, fork: "device" },
  { d: "M 430 375 L 430 337",               phase: 5 },
  { d: "M 494 318 Q 580 318 580 253",       phase: 6 },
  { d: "M 580 215 L 580 163",               phase: 6 },
  { d: "M 580 125 L 580 61",                phase: 7 },
]

function edgeState(e: EdgeDef, phase: Phase): VisualState {
  if (phase === 0) return "active"
  if (e.phase === phase) {
    if (e.fork === "sleep") return "dormant"
    return "active"
  }
  if (e.phase < phase) return "done"
  return "dimmed"
}

const phaseInfo: { title: string; desc: string }[] = [
  { title: "The Request Path",    desc: "Follow one read() call through the full U-shaped journey — from user space down into the kernel, through the driver to hardware, and back up again." },
  { title: "The Trap",            desc: "The process calls read() and the CPU executes a trap, crossing from user space (Ring 3) into kernel space (Ring 0)." },
  { title: "Dispatch",            desc: "The kernel consults file descriptor tables and driver registrations to route the generic read() to the correct device driver." },
  { title: "Hardware Interface",  desc: "The driver's .read() runs at the deepest privilege level — reading status registers, writing commands, programming the device." },
  { title: "The Fork",            desc: "The process goes to sleep and the device runs on its own clock. Two timelines that were traveling together split apart." },
  { title: "The Interrupt",       desc: "The device fires an interrupt — on its schedule, not ours. The interrupt handler runs in a different execution context with severe restrictions: no sleeping, no user-buffer access, must be fast." },
  { title: "Deferred Work & Wake", desc: "Deferred work bridges the gap from interrupt context back to process context. The bottom half completes the transfer, wakes the sleeping process, and restores its execution environment." },
  { title: "The Complete Path",   desc: "The full U-bend in one view. The process called read(), descended into the kernel, reached hardware, forked into independent timelines, and reassembled through interrupt, deferred work, and wake — returning bytes to user space." },
]

function edgeStroke(state: VisualState, fork?: "sleep" | "device"): string {
  switch (state) {
    case "active":
      if (fork === "device") return "stroke-emerald-500 stroke-2"
      return "stroke-primary stroke-2"
    case "dormant":
      return "stroke-red-500/40 stroke-1"
    case "done":
      return "stroke-muted-foreground/30 stroke-1"
    default:
      return "stroke-border/15 stroke-1"
  }
}

function edgeMarker(state: VisualState, fork?: "sleep" | "device"): string {
  switch (state) {
    case "active":
      if (fork === "device") return "url(#ub-emerald)"
      return "url(#ub-active)"
    case "dormant":
      return "url(#ub-red)"
    case "done":
      return "url(#ub-muted)"
    default:
      return "url(#ub-dim)"
  }
}

function UBendSVG({ phase }: { phase: Phase }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ maxHeight: 520 }}>
      <defs>
        <marker id="ub-active" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" className="fill-primary" />
        </marker>
        <marker id="ub-muted" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" className="fill-muted-foreground/40" />
        </marker>
        <marker id="ub-dim" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" className="fill-border/30" />
        </marker>
        <marker id="ub-red" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" className="fill-red-500/50" />
        </marker>
        <marker id="ub-emerald" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" className="fill-emerald-500" />
        </marker>
      </defs>

      {/* Background U-path */}
      <path
        d="M 120 61 L 120 253 Q 120 318 206 318 L 494 318 Q 580 318 580 253 L 580 61"
        fill="none"
        className="stroke-border/15 stroke-1"
        strokeDasharray="6 4"
      />

      {/* Boundary line */}
      <line
        x1={40} y1={BOUNDARY_Y} x2={660} y2={BOUNDARY_Y}
        className="stroke-muted-foreground/25 stroke-1"
        strokeDasharray="6 4"
      />

      {/* Zone labels */}
      <text x={350} y={BOUNDARY_Y - 10} textAnchor="middle"
        className="fill-green-600/40 dark:fill-green-400/30 font-semibold" fontSize={10}>
        User Space
      </text>
      <text x={350} y={BOUNDARY_Y + 18} textAnchor="middle"
        className="fill-red-600/40 dark:fill-red-400/30 font-semibold" fontSize={10}>
        Kernel Space
      </text>

      {/* Fork zone indicator */}
      {(phase === 0 || phase === 4 || phase === 5 || phase === 7) && (
        <g>
          <rect x={200} y={366} width={300} height={46} rx={8}
            className={cn(
              "fill-none stroke-1",
              phase === 4
                ? "stroke-muted-foreground/30"
                : "stroke-border/15"
            )}
            strokeDasharray="4 3"
          />
          {phase === 4 && (
            <text x={350} y={422} textAnchor="middle"
              className="fill-muted-foreground/40" fontSize={8}>
              ← independent timelines →
            </text>
          )}
        </g>
      )}

      {/* Edges */}
      {edges.map((edge, i) => {
        const state = edgeState(edge, phase)
        return (
          <path key={i} d={edge.d} fill="none"
            className={cn("transition-all duration-300", edgeStroke(state, edge.fork))}
            markerEnd={edgeMarker(state, edge.fork)}
            strokeDasharray={state === "dormant" ? "4 3" : undefined}
          />
        )
      })}

      {/* Boundary crossing highlights */}
      {(phase === 0 || phase === 1) && (
        <circle cx={120} cy={BOUNDARY_Y} r={4}
          className={cn("transition-all duration-300",
            phase === 1 ? "fill-yellow-500" : "fill-yellow-500/30"
          )}
        />
      )}
      {(phase === 0 || phase === 7) && (
        <circle cx={580} cy={BOUNDARY_Y} r={4}
          className={cn("transition-all duration-300",
            phase === 7 ? "fill-yellow-500" : "fill-yellow-500/30"
          )}
        />
      )}

      {/* Nodes */}
      {nodeIds.map((id) => {
        const node = N[id]
        const state = nodeState(id, phase)
        const ac = activeColors[id]
        const rx = node.cx - node.w / 2
        const ry = node.cy - node.h / 2

        let rectCls: string
        let labelCls: string
        let subCls: string

        switch (state) {
          case "active":
            rectCls = cn(ac.fill, ac.stroke, "stroke-2")
            labelCls = cn(ac.text, "font-semibold")
            subCls = ac.sub
            break
          case "done":
            rectCls = "fill-muted/40 stroke-muted-foreground/20 stroke-1"
            labelCls = "fill-muted-foreground/50 font-medium"
            subCls = "fill-muted-foreground/30"
            break
          case "dormant":
            rectCls = "fill-red-500/10 stroke-red-500/25 stroke-1"
            labelCls = "fill-red-500/40 dark:fill-red-400/40 font-medium"
            subCls = "fill-red-500/25"
            break
          default:
            rectCls = "fill-muted/20 stroke-border/12 stroke-1"
            labelCls = "fill-muted-foreground/18"
            subCls = "fill-muted-foreground/12"
            break
        }

        return (
          <g key={id} className="transition-all duration-300">
            <rect x={rx} y={ry} width={node.w} height={node.h} rx={6}
              className={rectCls}
              strokeDasharray={state === "dormant" ? "4 3" : undefined}
            />
            <text
              x={node.cx}
              y={node.cy + (node.sub ? -2 : 4)}
              textAnchor="middle"
              className={labelCls}
              fontSize={11}
            >
              {node.label}
            </text>
            {node.sub && (
              <text
                x={node.cx}
                y={node.cy + 12}
                textAnchor="middle"
                className={subCls}
                fontSize={8}
              >
                {node.sub}
              </text>
            )}
          </g>
        )
      })}

      {/* Interrupt lightning bolt (phase 5) */}
      {(phase === 5 || phase === 6) && (
        <text x={430} y={295} textAnchor="middle"
          className={cn("font-bold", phase === 5 ? "fill-amber-500 animate-pulse" : "fill-amber-500/30")} fontSize={14}>
          ⚡
        </text>
      )}

      {/* Process wakes label (phase 6) */}
      {(phase === 6 || phase === 7) && (
        <text x={270} y={414} textAnchor="middle"
          className="fill-blue-500/50 dark:fill-blue-400/40" fontSize={7}>
          blocked → ready
        </text>
      )}
    </svg>
  )
}

export function UBendStepper({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>(0)
  const info = phaseInfo[phase]

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <h4 className="text-sm font-semibold">{info.title}</h4>
        <span className="text-xs text-muted-foreground font-mono">
          {phase === 0 ? "Overview" : `Phase ${phase} of 7`}
        </span>
      </div>
      <div className="p-4">
        <UBendSVG phase={phase} />
        <p className="text-sm text-muted-foreground mt-3 mb-3">{info.desc}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPhase(Math.max(0, phase - 1) as Phase)}
            disabled={phase === 0}
            className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-30 hover:bg-muted transition-colors"
          >
            Back
          </button>
          <button
            onClick={() => setPhase(0)}
            className="px-3 py-1 rounded border text-sm font-medium hover:bg-muted transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setPhase(Math.min(7, phase + 1) as Phase)}
            disabled={phase === 7}
            className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-30 hover:bg-muted transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export function UBendDiagram({ phase, className }: { phase: 1 | 2 | 3 | 4 | 5 | 6 | 7; className?: string }) {
  return (
    <div className={cn("my-6", className)}>
      <UBendSVG phase={phase} />
    </div>
  )
}
