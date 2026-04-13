"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const VW = 640
const VH = 200

interface LoopStep {
  label: string
  command: string
  check: string
  risk: string
}

const loopSteps: LoopStep[] = [
  {
    label: "Edit",
    command: "vim rustecho.rs",
    check: "Code compiles locally",
    risk: "Syntax or type errors caught by rustc",
  },
  {
    label: "Build",
    command: "make",
    check: "No compiler errors or warnings",
    risk: "Rust catches memory bugs at compile time",
  },
  {
    label: "Load",
    command: "sudo insmod rustecho.ko",
    check: "dmesg shows init message",
    risk: "Init failure → check dmesg for error",
  },
  {
    label: "Observe",
    command: "lsmod | grep rustecho\nls /dev/rustecho",
    check: "Module listed, device node exists",
    risk: "Missing device → registration failed",
  },
  {
    label: "Interact",
    command: "echo \"test\" > /dev/rustecho\ncat /dev/rustecho",
    check: "Expected output returned",
    risk: "Panic → restart VM, check trace",
  },
  {
    label: "Observe",
    command: "dmesg | tail\nstrace cat /dev/rustecho",
    check: "Kernel log + syscalls look correct",
    risk: "Unexpected behavior → add logging",
  },
  {
    label: "Unload",
    command: "sudo rmmod rustecho",
    check: "dmesg shows cleanup, device gone",
    risk: "Refuses to unload → close open fds",
  },
  {
    label: "Verify",
    command: "lsmod | grep rustecho\nls /dev/rustecho",
    check: "Module gone, device gone, system clean",
    risk: "Leftover state → full VM restart",
  },
]

const NODE_R = 22
const NODE_GAP = 50
const START_X = 60
const Y_CENTER = 70

const accentByLabel: Record<string, { fill: string; stroke: string; text: string }> = {
  Edit:      { fill: "fill-blue-500/15",    stroke: "stroke-blue-500/50",    text: "fill-blue-700 dark:fill-blue-300" },
  Build:     { fill: "fill-purple-500/15",  stroke: "stroke-purple-500/50",  text: "fill-purple-700 dark:fill-purple-300" },
  Load:      { fill: "fill-green-500/15",   stroke: "stroke-green-500/50",   text: "fill-green-700 dark:fill-green-300" },
  Observe:   { fill: "fill-amber-500/15",   stroke: "stroke-amber-500/50",   text: "fill-amber-700 dark:fill-amber-300" },
  Interact:  { fill: "fill-emerald-500/15", stroke: "stroke-emerald-500/50", text: "fill-emerald-700 dark:fill-emerald-300" },
  Unload:    { fill: "fill-orange-500/15",  stroke: "stroke-orange-500/50",  text: "fill-orange-700 dark:fill-orange-300" },
  Verify:    { fill: "fill-cyan-500/15",    stroke: "stroke-cyan-500/50",    text: "fill-cyan-700 dark:fill-cyan-300" },
}

export function DevLoopStepper({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const s = loopSteps[step]
  const accent = accentByLabel[s.label] ?? accentByLabel["Observe"]

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold">{s.label}</h4>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted font-medium text-muted-foreground">
              Step {step + 1} of {loopSteps.length}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{s.check}</p>
        </div>
        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
          {step + 1} / {loopSteps.length}
        </span>
      </div>

      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-3xl mx-auto">
          <defs>
            <marker id="dl-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" className="fill-primary/40" />
            </marker>
            <marker id="dl-dim" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" className="fill-muted-foreground/10" />
            </marker>
          </defs>

          {/* Nodes */}
          {loopSteps.map((ls, i) => {
            const x = START_X + i * NODE_GAP + i * (NODE_R * 2 - NODE_GAP + NODE_GAP)
            const nodeX = START_X + i * (NODE_R * 2 + 12)
            const nAccent = accentByLabel[ls.label] ?? accentByLabel["Observe"]
            const isCurrent = i === step
            const isPast = i < step
            const dimmed = !isCurrent && !isPast

            return (
              <g key={i}
                onClick={() => setStep(i)}
                className="cursor-pointer"
              >
                {/* Connector to next */}
                {i < loopSteps.length - 1 && (
                  <line
                    x1={nodeX + NODE_R} y1={Y_CENTER}
                    x2={nodeX + NODE_R * 2 + 12 - NODE_R} y2={Y_CENTER}
                    className={cn("stroke-1 transition-all duration-300",
                      i < step ? "stroke-primary/30" :
                      i === step ? "stroke-primary/20" :
                      "stroke-muted-foreground/10"
                    )}
                    markerEnd={i === step ? "url(#dl-arr)" : i < step ? "url(#dl-arr)" : "url(#dl-dim)"}
                  />
                )}

                {/* Node circle */}
                <circle cx={nodeX} cy={Y_CENTER} r={NODE_R}
                  className={cn("stroke-[1.5] transition-all duration-300",
                    isCurrent ? nAccent.fill : isPast ? "fill-muted-foreground/5" : "fill-muted/20",
                    isCurrent ? nAccent.stroke : isPast ? "stroke-muted-foreground/15" : "stroke-border/10",
                  )} />
                <text x={nodeX} y={Y_CENTER + 3} textAnchor="middle"
                  className={cn("font-semibold transition-all duration-300",
                    isCurrent ? nAccent.text : isPast ? "fill-muted-foreground/30" : "fill-muted-foreground/10"
                  )} fontSize={7}>
                  {ls.label}
                </text>

                {/* Step number */}
                <text x={nodeX} y={Y_CENTER - NODE_R - 6} textAnchor="middle"
                  className={cn("transition-all duration-300",
                    isCurrent ? "fill-foreground/40" : "fill-muted-foreground/10"
                  )} fontSize={6}>
                  {i + 1}
                </text>
              </g>
            )
          })}

          {/* Recovery arc from rightmost back to Edit */}
          {(() => {
            const lastX = START_X + (loopSteps.length - 1) * (NODE_R * 2 + 12)
            const firstX = START_X
            const arcY = Y_CENTER + NODE_R + 28
            return (
              <g>
                <path
                  d={`M ${lastX} ${Y_CENTER + NODE_R} Q ${(firstX + lastX) / 2} ${arcY + 20}, ${firstX} ${Y_CENTER + NODE_R}`}
                  fill="none"
                  className="stroke-red-500/20 stroke-1"
                  strokeDasharray="4 3"
                  markerEnd="url(#dl-arr)"
                />
                <text x={(firstX + lastX) / 2} y={arcY + 18} textAnchor="middle"
                  className="fill-red-500/25 dark:fill-red-400/20" fontSize={6}>
                  failure → restart VM → edit
                </text>
              </g>
            )
          })()}

          {/* Command callout */}
          <rect x={60} y={Y_CENTER + NODE_R + 44} width={VW - 120} height={40} rx={5}
            className={cn("stroke-[1.5]", accent.fill, accent.stroke)} />
          <text x={80} y={Y_CENTER + NODE_R + 60}
            className="fill-muted-foreground/40 font-mono" fontSize={7}>
            $ {s.command.split("\n")[0]}
          </text>
          {s.command.split("\n")[1] && (
            <text x={80} y={Y_CENTER + NODE_R + 72}
              className="fill-muted-foreground/30 font-mono" fontSize={7}>
              $ {s.command.split("\n")[1]}
            </text>
          )}
          <text x={VW - 80} y={Y_CENTER + NODE_R + 66} textAnchor="end"
            className="fill-muted-foreground/20" fontSize={6}>
            {s.risk}
          </text>
        </svg>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-3">
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
            onClick={() => setStep(Math.min(loopSteps.length - 1, step + 1))}
            disabled={step === loopSteps.length - 1}
            className="px-3 py-1.5 rounded-md text-xs font-medium border disabled:opacity-30 hover:bg-muted transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
