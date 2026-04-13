"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const SLOTS = 8

interface StepDef {
  description: string
  filled: number
  writerState: "active" | "blocked"
  readerState: "active" | "blocked" | "waiting"
  flowDirection: "write" | "read" | "none"
}

const steps: StepDef[] = [
  { description: "Buffer is empty. The reader calls read() but there is nothing to consume — reader blocks.",           filled: 0, writerState: "active",  readerState: "blocked", flowDirection: "none" },
  { description: "Writer calls write(). Bytes are copied into the kernel buffer. Writer continues.",                     filled: 3, writerState: "active",  readerState: "blocked", flowDirection: "write" },
  { description: "Writer continues writing. The buffer accumulates data.",                                                filled: 6, writerState: "active",  readerState: "waiting", flowDirection: "write" },
  { description: "Buffer is full. Writer calls write() again — writer blocks until the reader drains some data.",         filled: 8, writerState: "blocked", readerState: "waiting", flowDirection: "none" },
  { description: "Reader calls read(). Bytes are copied out of the kernel buffer. Reader continues.",                     filled: 4, writerState: "active",  readerState: "active",  flowDirection: "read" },
  { description: "Reader drains the rest. Buffer is empty again — the cycle repeats.",                                    filled: 0, writerState: "active",  readerState: "blocked", flowDirection: "none" },
]

const VW = 540
const VH = 160

function ProcessBox({ x, y, label, sub, state }: { x: number; y: number; label: string; sub: string; state: "active" | "blocked" | "waiting" }) {
  const fills = {
    active:  "fill-green-500/20 stroke-green-500",
    blocked: "fill-red-500/15 stroke-red-500/60",
    waiting: "fill-slate-500/10 stroke-border",
  }
  const texts = {
    active:  "fill-green-700 dark:fill-green-300",
    blocked: "fill-red-600 dark:fill-red-400",
    waiting: "fill-muted-foreground/50",
  }
  return (
    <g>
      <rect x={x} y={y} width={90} height={60} rx={6}
        className={cn("stroke-2 transition-all duration-300", fills[state])}
        strokeDasharray={state === "blocked" ? "4 3" : undefined}
      />
      <text x={x + 45} y={y + 26} textAnchor="middle"
        className={cn("font-semibold transition-all", texts[state])} fontSize={12}>{label}</text>
      <text x={x + 45} y={y + 42} textAnchor="middle"
        className="fill-muted-foreground/50" fontSize={8}>{sub}</text>
      {state === "blocked" && (
        <text x={x + 45} y={y + 74} textAnchor="middle"
          className="fill-red-500/60 dark:fill-red-400/50 font-semibold" fontSize={8}>blocked</text>
      )}
    </g>
  )
}

export function PipeFlowDiagram({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const current = steps[step]

  const bufX = 160
  const bufY = 40
  const bufW = 220
  const bufH = 40
  const slotW = bufW / SLOTS

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <h4 className="text-sm font-semibold">Pipe: Kernel-Buffered Byte Stream</h4>
        <span className="text-xs text-muted-foreground font-mono">Step {step + 1} / {steps.length}</span>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
          <defs>
            <marker id="pipe-arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" className="fill-primary" />
            </marker>
          </defs>

          {/* Writer */}
          <ProcessBox x={10} y={25} label="Writer" sub="fd[1]" state={current.writerState} />

          {/* Kernel buffer */}
          <rect x={bufX} y={bufY - 14} width={bufW} height={bufH + 28} rx={8}
            className="fill-blue-500/5 stroke-blue-500/20 stroke-1" strokeDasharray="4 3" />
          <text x={bufX + bufW / 2} y={bufY - 2} textAnchor="middle"
            className="fill-blue-600/50 dark:fill-blue-400/40 font-semibold" fontSize={8}>Kernel Buffer</text>

          {current.flowDirection === "write" && (
            <line x1={108} y1={55} x2={bufX - 4} y2={55}
              className="stroke-primary stroke-2" markerEnd="url(#pipe-arr)" />
          )}
          {current.flowDirection === "read" && (
            <line x1={bufX + bufW + 4} y1={55} x2={432} y2={55}
              className="stroke-primary stroke-2" markerEnd="url(#pipe-arr)" />
          )}

          {Array.from({ length: SLOTS }).map((_, i) => (
            <rect key={i}
              x={bufX + i * slotW + 1} y={bufY} width={slotW - 2} height={bufH} rx={2}
              className={cn(
                "transition-all duration-300 stroke-1",
                i < current.filled
                  ? "fill-blue-500/30 stroke-blue-500/50"
                  : "fill-muted/30 stroke-border/30"
              )}
            />
          ))}

          <text x={bufX + bufW / 2} y={bufY + bufH + 14} textAnchor="middle"
            className="fill-muted-foreground/40" fontSize={8}>
            {current.filled}/{SLOTS} slots
          </text>

          {/* Reader */}
          <ProcessBox x={440} y={25} label="Reader" sub="fd[0]" state={current.readerState} />

          {/* Direction indicator */}
          <text x={bufX + bufW / 2} y={VH - 4} textAnchor="middle"
            className="fill-muted-foreground/30" fontSize={9}>
            → unidirectional →
          </text>
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
