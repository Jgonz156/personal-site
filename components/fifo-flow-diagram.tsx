"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

type ProcessState = "idle" | "writing" | "reading"

interface StepDef {
  description: string
  processes: { id: string; label: string; x: number; y: number; state: ProcessState; color: string }[]
  activeArrows: number[]
}

const P = {
  daemon:  { id: "daemon",  label: "Logger",    x: 40,  y: 15,  color: "purple" },
  monitor: { id: "monitor", label: "Monitor",   x: 40,  y: 115, color: "teal" },
  app:     { id: "app",     label: "App",        x: 40,  y: 215, color: "orange" },
  reader:  { id: "reader",  label: "Collector",  x: 430, y: 115, color: "green" },
}

const FIFO_X = 220
const FIFO_Y = 115

const steps: StepDef[] = [
  {
    description: "Three unrelated processes and a reader exist independently. No shared ancestry — they were started at different times by different users.",
    processes: [
      { ...P.daemon, state: "idle" },
      { ...P.monitor, state: "idle" },
      { ...P.app, state: "idle" },
      { ...P.reader, state: "idle" },
    ],
    activeArrows: [],
  },
  {
    description: "The Logger opens the FIFO at /tmp/sensor_pipe for writing. It discovers the rendezvous point through the filesystem name.",
    processes: [
      { ...P.daemon, state: "writing" },
      { ...P.monitor, state: "idle" },
      { ...P.app, state: "idle" },
      { ...P.reader, state: "idle" },
    ],
    activeArrows: [0],
  },
  {
    description: "The Monitor also opens the same FIFO for writing. No fork() needed — the filesystem name is the shared agreement.",
    processes: [
      { ...P.daemon, state: "writing" },
      { ...P.monitor, state: "writing" },
      { ...P.app, state: "idle" },
      { ...P.reader, state: "idle" },
    ],
    activeArrows: [0, 1],
  },
  {
    description: "All three writers send data. The Collector reads from the FIFO. Bytes flow through the kernel buffer, just like a pipe.",
    processes: [
      { ...P.daemon, state: "writing" },
      { ...P.monitor, state: "writing" },
      { ...P.app, state: "writing" },
      { ...P.reader, state: "reading" },
    ],
    activeArrows: [0, 1, 2, 3],
  },
]

const colorMap: Record<string, { fill: string; stroke: string; text: string; active: string }> = {
  purple: { fill: "fill-purple-500/10", stroke: "stroke-purple-500/30", text: "fill-purple-700 dark:fill-purple-300", active: "fill-purple-500/25 stroke-purple-500" },
  teal:   { fill: "fill-teal-500/10",   stroke: "stroke-teal-500/30",   text: "fill-teal-700 dark:fill-teal-300",     active: "fill-teal-500/25 stroke-teal-500" },
  orange: { fill: "fill-orange-500/10",  stroke: "stroke-orange-500/30", text: "fill-orange-700 dark:fill-orange-300",  active: "fill-orange-500/25 stroke-orange-500" },
  green:  { fill: "fill-green-500/10",   stroke: "stroke-green-500/30",  text: "fill-green-700 dark:fill-green-300",    active: "fill-green-500/25 stroke-green-500" },
}

const VW = 560
const VH = 280

export function FIFOFlowDiagram({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const current = steps[step]

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <h4 className="text-sm font-semibold">FIFO: Named Pipe Rendezvous</h4>
        <span className="text-xs text-muted-foreground font-mono">Step {step + 1} / {steps.length}</span>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
          <defs>
            <marker id="fifo-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary" />
            </marker>
            <marker id="fifo-arr-dim" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-border/30" />
            </marker>
          </defs>

          {/* FIFO node */}
          <rect x={FIFO_X} y={FIFO_Y - 20} width={140} height={40} rx={6}
            className="fill-amber-500/15 stroke-amber-500 stroke-2" />
          <text x={FIFO_X + 70} y={FIFO_Y - 2} textAnchor="middle"
            className="fill-amber-700 dark:fill-amber-300 font-bold font-mono" fontSize={10}>
            /tmp/sensor_pipe
          </text>
          <text x={FIFO_X + 70} y={FIFO_Y + 12} textAnchor="middle"
            className="fill-amber-600/50 dark:fill-amber-400/40" fontSize={7}>FIFO</text>
          <text x={FIFO_X + 70} y={FIFO_Y + 34} textAnchor="middle"
            className="fill-muted-foreground/30" fontSize={7}>filesystem rendezvous</text>

          {/* Arrows from writers to FIFO */}
          {[P.daemon, P.monitor, P.app].map((p, i) => {
            const isActive = current.activeArrows.includes(i)
            const fromX = p.x + 90
            const fromY = p.y + 20
            const toX = FIFO_X
            const toY = FIFO_Y
            return (
              <line key={`aw-${i}`}
                x1={fromX} y1={fromY} x2={toX} y2={toY}
                className={cn("transition-all duration-300",
                  isActive ? "stroke-primary stroke-2" : "stroke-border/20 stroke-1"
                )}
                markerEnd={isActive ? "url(#fifo-arr)" : "url(#fifo-arr-dim)"}
              />
            )
          })}

          {/* Arrow from FIFO to reader */}
          {(() => {
            const isActive = current.activeArrows.includes(3)
            return (
              <line
                x1={FIFO_X + 140} y1={FIFO_Y}
                x2={P.reader.x} y2={P.reader.y + 20}
                className={cn("transition-all duration-300",
                  isActive ? "stroke-primary stroke-2" : "stroke-border/20 stroke-1"
                )}
                markerEnd={isActive ? "url(#fifo-arr)" : "url(#fifo-arr-dim)"}
              />
            )
          })()}

          {/* Process boxes */}
          {current.processes.map(p => {
            const c = colorMap[p.color]
            const isActive = p.state !== "idle"
            return (
              <g key={p.id}>
                <rect x={p.x} y={p.y} width={86} height={40} rx={6}
                  className={cn("stroke-2 transition-all duration-300",
                    isActive ? c.active : cn(c.fill, c.stroke)
                  )} />
                <text x={p.x + 43} y={p.y + 18} textAnchor="middle"
                  className={cn("font-semibold", c.text)} fontSize={11}>{p.label}</text>
                <text x={p.x + 43} y={p.y + 32} textAnchor="middle"
                  className="fill-muted-foreground/40" fontSize={7}>
                  {p.state === "writing" ? "writing" : p.state === "reading" ? "reading" : "no relation"}
                </text>
              </g>
            )
          })}

          {/* "No fork()" indicators */}
          {step === 0 && (
            <g>
              <text x={85} y={80} textAnchor="middle"
                className="fill-muted-foreground/25" fontSize={7}>no fork()</text>
              <text x={85} y={185} textAnchor="middle"
                className="fill-muted-foreground/25" fontSize={7}>no fork()</text>
            </g>
          )}
        </svg>

        <p className="text-sm text-muted-foreground mt-2 mb-3">{current.description}</p>

        <div className="flex items-center gap-3">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-30 hover:bg-muted transition-colors">Back</button>
          <button onClick={() => setStep(0)}
            className="px-3 py-1 rounded border text-sm font-medium hover:bg-muted transition-colors">Reset</button>
          <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}
            className="px-3 py-1 rounded border text-sm font-medium disabled:opacity-30 hover:bg-muted transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}
