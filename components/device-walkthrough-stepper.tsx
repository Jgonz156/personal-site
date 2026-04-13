"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 700
const VH = 360
const BOUNDARY_Y = 80

interface StepDef {
  title: string
  description: string
  active: string[]
  strace?: string
  concept: string
}

const steps: StepDef[] = [
  {
    title: "Overview",
    description: "dd reads 16 bytes from /dev/urandom. Follow the request through the full U-bend — from the user-space read() call down into the kernel, through VFS dispatch and driver code, and back up to the process with random bytes.",
    active: ["dd", "read", "vfs", "devnode", "driver", "rng", "copy", "return"],
    concept: "The full path",
  },
  {
    title: "dd calls read()",
    description: "The dd process calls read(fd, buf, 16). The file descriptor fd was obtained from an earlier openat(\"/dev/urandom\") call. The CPU traps into the kernel — this is the left side of the U-bend descending through the syscall boundary.",
    active: ["dd", "read"],
    strace: "read(3, ..., 16)",
    concept: "Syscall boundary (LN19)",
  },
  {
    title: "VFS Resolves the Path",
    description: "The kernel's Virtual File System layer looks up the file descriptor and finds that it points to a device node. VFS reads the major/minor numbers encoded in /dev/urandom and uses them to locate the registered driver — the same dispatch mechanism from LN18.",
    active: ["vfs", "devnode"],
    concept: "VFS + major/minor dispatch (LN18)",
  },
  {
    title: "Driver Code Runs",
    description: "VFS calls the driver's .read() function. For /dev/urandom, this is the kernel's random number generator. The driver code runs entirely in kernel context with Ring 0 privilege — the deepest point of the U-bend.",
    active: ["driver", "rng"],
    concept: "Driver in kernel space (LN19)",
  },
  {
    title: "Data Copied to User Buffer",
    description: "The driver generates 16 random bytes and copies them into the process's user-space buffer via copy_to_user(). The data crosses back over the user/kernel boundary — the right side of the U ascending.",
    active: ["copy"],
    concept: "Kernel → user data transfer (LN19)",
  },
  {
    title: "read() Returns",
    description: "The read() syscall returns 16, indicating 16 bytes were successfully read. dd now holds random bytes in its buffer and writes them to stdout, which xxd formats as hex. The full U-bend is complete.",
    active: ["return", "dd"],
    strace: "read(3, \"\\x4a\\xf1...\", 16) = 16",
    concept: "U-bend completion (LN19)",
  },
]

type NodeId = "dd" | "read" | "vfs" | "devnode" | "driver" | "rng" | "copy" | "return"

interface NodeDef {
  cx: number; cy: number; w: number; h: number
  label: string; sub?: string
  accent: { fill: string; stroke: string; text: string }
}

const nodes: Record<NodeId, NodeDef> = {
  dd:      { cx: 130, cy: 38,  w: 120, h: 36, label: "dd",                sub: "user process",
    accent: { fill: "fill-green-500/15",  stroke: "stroke-green-500/50",  text: "fill-green-700 dark:fill-green-300" } },
  read:    { cx: 130, cy: 130, w: 120, h: 36, label: "read(fd, buf, 16)", sub: "syscall trap",
    accent: { fill: "fill-blue-500/15",   stroke: "stroke-blue-500/50",   text: "fill-blue-700 dark:fill-blue-300" } },
  vfs:     { cx: 250, cy: 210, w: 120, h: 36, label: "VFS Lookup",        sub: "resolve fd → inode",
    accent: { fill: "fill-purple-500/15", stroke: "stroke-purple-500/50", text: "fill-purple-700 dark:fill-purple-300" } },
  devnode: { cx: 250, cy: 290, w: 130, h: 36, label: "/dev/urandom",      sub: "char 1:9",
    accent: { fill: "fill-amber-500/15",  stroke: "stroke-amber-500/50",  text: "fill-amber-700 dark:fill-amber-300" } },
  driver:  { cx: 390, cy: 290, w: 120, h: 36, label: "Driver .read()",    sub: "random subsystem",
    accent: { fill: "fill-orange-500/15", stroke: "stroke-orange-500/50", text: "fill-orange-700 dark:fill-orange-300" } },
  rng:     { cx: 390, cy: 210, w: 130, h: 36, label: "Generate Bytes",    sub: "entropy pool → buf",
    accent: { fill: "fill-red-500/15",    stroke: "stroke-red-500/50",    text: "fill-red-700 dark:fill-red-300" } },
  copy:    { cx: 500, cy: 130, w: 130, h: 36, label: "copy_to_user()",    sub: "kernel → user buf",
    accent: { fill: "fill-cyan-500/15",   stroke: "stroke-cyan-500/50",   text: "fill-cyan-700 dark:fill-cyan-300" } },
  return:  { cx: 570, cy: 38,  w: 120, h: 36, label: "Return 16",        sub: "bytes in buffer",
    accent: { fill: "fill-emerald-500/15", stroke: "stroke-emerald-500/50", text: "fill-emerald-700 dark:fill-emerald-300" } },
}

const nodeIds = Object.keys(nodes) as NodeId[]

interface EdgeDef { from: NodeId; to: NodeId }

const edges: EdgeDef[] = [
  { from: "dd",      to: "read" },
  { from: "read",    to: "vfs" },
  { from: "vfs",     to: "devnode" },
  { from: "devnode", to: "driver" },
  { from: "driver",  to: "rng" },
  { from: "rng",     to: "copy" },
  { from: "copy",    to: "return" },
]

function edgePath(e: EdgeDef): string {
  const a = nodes[e.from], b = nodes[e.to]
  if (a.cx === b.cx) {
    return `M ${a.cx} ${a.cy + a.h / 2} L ${b.cx} ${b.cy - b.h / 2}`
  }
  const startY = a.cy + (b.cy > a.cy ? a.h / 2 : -a.h / 2)
  const endY = b.cy + (b.cy > a.cy ? -b.h / 2 : b.h / 2)
  const midY = (startY + endY) / 2
  return `M ${a.cx} ${startY} C ${a.cx} ${midY}, ${b.cx} ${midY}, ${b.cx} ${endY}`
}

function stepActiveSet(step: number): Set<string> {
  return new Set(steps[step].active)
}

export function DeviceWalkthroughStepper({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const s = steps[step]
  const active = stepActiveSet(step)

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold">{s.title}</h4>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted font-medium text-muted-foreground">
              {s.concept}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
        </div>
        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
          {step === 0 ? "Overview" : `${step} / ${steps.length - 1}`}
        </span>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          <defs>
            <marker id="dw-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary/60" />
            </marker>
            <marker id="dw-dim" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-muted-foreground/10" />
            </marker>
          </defs>

          {/* Boundary line */}
          <line x1={40} y1={BOUNDARY_Y} x2={VW - 40} y2={BOUNDARY_Y}
            className="stroke-muted-foreground/20 stroke-1" strokeDasharray="6 4" />
          <text x={60} y={BOUNDARY_Y - 8}
            className="fill-green-600/40 dark:fill-green-400/30 font-semibold" fontSize={9}>
            User Space
          </text>
          <text x={60} y={BOUNDARY_Y + 16}
            className="fill-red-600/40 dark:fill-red-400/30 font-semibold" fontSize={9}>
            Kernel Space
          </text>

          {/* Boundary crossing dots */}
          {(active.has("read") || step === 0) && (
            <circle cx={130} cy={BOUNDARY_Y} r={4}
              className={cn("transition-all duration-300",
                active.has("read") && step !== 0 ? "fill-yellow-500" : "fill-yellow-500/30"
              )} />
          )}
          {(active.has("copy") || step === 0) && (
            <circle cx={500} cy={BOUNDARY_Y} r={4}
              className={cn("transition-all duration-300",
                active.has("copy") && step !== 0 ? "fill-yellow-500" : "fill-yellow-500/30"
              )} />
          )}

          {/* Background U-path */}
          <path
            d="M 130 56 L 130 130 Q 130 170 250 210 L 250 290 L 390 290 L 390 210 Q 500 170 500 130 L 570 56"
            fill="none" className="stroke-border/10 stroke-1" strokeDasharray="6 4"
          />

          {/* Edges */}
          {edges.map((e, i) => {
            const fromActive = active.has(e.from)
            const toActive = active.has(e.to)
            const lit = fromActive && toActive && step !== 0
            return (
              <path key={i} d={edgePath(e)} fill="none"
                className={cn("transition-all duration-300",
                  lit ? "stroke-primary/60 stroke-[1.5]" :
                  step === 0 ? "stroke-muted-foreground/15 stroke-1" :
                  "stroke-border/10 stroke-1"
                )}
                markerEnd={lit ? "url(#dw-arr)" : "url(#dw-dim)"}
              />
            )
          })}

          {/* Nodes */}
          {nodeIds.map((id) => {
            const n = nodes[id]
            const lit = active.has(id)
            const rx = n.cx - n.w / 2
            const ry = n.cy - n.h / 2
            return (
              <g key={id} className="transition-all duration-300">
                <rect x={rx} y={ry} width={n.w} height={n.h} rx={6}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    lit ? n.accent.fill : "fill-muted/20",
                    lit ? n.accent.stroke : "stroke-border/10",
                  )} />
                <text x={n.cx} y={n.cy + (n.sub ? -3 : 3)} textAnchor="middle"
                  className={cn("font-semibold transition-all duration-300",
                    lit ? n.accent.text : "fill-muted-foreground/15"
                  )} fontSize={9}>
                  {n.label}
                </text>
                {n.sub && (
                  <text x={n.cx} y={n.cy + 10} textAnchor="middle"
                    className={cn("transition-all duration-300",
                      lit ? "fill-muted-foreground/50" : "fill-muted-foreground/10"
                    )} fontSize={7}>
                    {n.sub}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* strace callout */}
        {s.strace && (
          <div className="mt-2 px-3 py-1.5 rounded bg-muted/50 border border-border/50 text-xs font-mono text-muted-foreground">
            <span className="text-foreground/60 font-semibold mr-1.5">strace:</span>
            {s.strace}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 rounded-md text-xs font-medium border disabled:opacity-30 hover:bg-muted transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={() => setStep(0)}
            className="px-3 py-1.5 rounded-md text-xs font-medium border hover:bg-muted transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            disabled={step === steps.length - 1}
            className="px-3 py-1.5 rounded-md text-xs font-medium border disabled:opacity-30 hover:bg-muted transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
