"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface TapeHardware {
  name: string
  shortName: string
  heightPercent: number
  color: string
  bgColor: string
  borderColor: string
}

interface ProcessBlock {
  processId: string
  label: string
  color: string
  bgColor: string
  placements: {
    tape: string
    startPercent: number
    heightPercent: number
    label: string
  }[]
}

const tapes: TapeHardware[] = [
  { name: "Registers", shortName: "REG", heightPercent: 5, color: "text-violet-700 dark:text-violet-300", bgColor: "bg-violet-500/10", borderColor: "border-violet-400/40" },
  { name: "L1/L2 Cache", shortName: "Cache", heightPercent: 10, color: "text-indigo-700 dark:text-indigo-300", bgColor: "bg-indigo-500/10", borderColor: "border-indigo-400/40" },
  { name: "RAM", shortName: "RAM", heightPercent: 30, color: "text-blue-700 dark:text-blue-300", bgColor: "bg-blue-500/10", borderColor: "border-blue-400/40" },
  { name: "SSD", shortName: "SSD", heightPercent: 60, color: "text-emerald-700 dark:text-emerald-300", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-400/40" },
  { name: "HDD", shortName: "HDD", heightPercent: 100, color: "text-amber-700 dark:text-amber-300", bgColor: "bg-amber-500/10", borderColor: "border-amber-400/40" },
]

const processes: ProcessBlock[] = [
  {
    processId: "web-browser",
    label: "Web Browser",
    color: "text-rose-700 dark:text-rose-300",
    bgColor: "bg-rose-500",
    placements: [
      { tape: "Registers", startPercent: 10, heightPercent: 40, label: "PC, SP" },
      { tape: "L1/L2 Cache", startPercent: 5, heightPercent: 30, label: "Hot loop" },
      { tape: "RAM", startPercent: 5, heightPercent: 35, label: "DOM, JS heap" },
      { tape: "SSD", startPercent: 5, heightPercent: 15, label: "Cache files" },
    ],
  },
  {
    processId: "database",
    label: "Database",
    color: "text-sky-700 dark:text-sky-300",
    bgColor: "bg-sky-500",
    placements: [
      { tape: "Registers", startPercent: 55, heightPercent: 35, label: "Idx reg" },
      { tape: "L1/L2 Cache", startPercent: 40, heightPercent: 25, label: "B-tree node" },
      { tape: "RAM", startPercent: 42, heightPercent: 30, label: "Buffer pool" },
      { tape: "SSD", startPercent: 22, heightPercent: 25, label: "Tablespace" },
      { tape: "HDD", startPercent: 5, heightPercent: 30, label: "WAL / archive" },
    ],
  },
  {
    processId: "os-kernel",
    label: "OS Kernel",
    color: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-500",
    placements: [
      { tape: "L1/L2 Cache", startPercent: 70, heightPercent: 20, label: "Syscall path" },
      { tape: "RAM", startPercent: 75, heightPercent: 20, label: "Page tables" },
      { tape: "SSD", startPercent: 50, heightPercent: 10, label: "Swap" },
    ],
  },
]

export function MemoryHardwareTapes({ className }: { className?: string }) {
  const [highlighted, setHighlighted] = useState<string | null>(null)

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Memory Across Hardware — Processes Live Everywhere
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        Each tape represents a different storage medium, scaled by relative capacity. Hover over a process to see its footprint across all tapes — a process is never confined to just one piece of hardware.
      </p>

      {/* Process legend / buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs text-muted-foreground self-center mr-1 font-semibold">Processes:</span>
        {processes.map((proc) => (
          <button
            key={proc.processId}
            className={cn(
              "px-2 py-1 rounded border text-xs font-semibold transition-all",
              proc.color,
              highlighted === proc.processId
                ? cn(proc.bgColor.replace("bg-", "bg-") + "/20", "ring-1", "ring-offset-1 ring-offset-background", proc.bgColor.replace("bg-", "ring-"))
                : "bg-muted/30 border-muted hover:bg-muted/50"
            )}
            onMouseEnter={() => setHighlighted(proc.processId)}
            onMouseLeave={() => setHighlighted(null)}
            onClick={() => setHighlighted(highlighted === proc.processId ? null : proc.processId)}
          >
            {proc.label}
          </button>
        ))}
      </div>

      {/* Tapes */}
      <div className="flex items-end gap-3 justify-center" style={{ height: "400px" }}>
        {tapes.map((tape) => {
          const tapeHeight = (tape.heightPercent / 100) * 380
          const placements = processes.flatMap((proc) =>
            proc.placements
              .filter((p) => p.tape === tape.name)
              .map((p) => ({ ...p, processId: proc.processId, bgColor: proc.bgColor, color: proc.color }))
          )

          return (
            <div key={tape.name} className="flex flex-col items-center flex-1 max-w-[120px]">
              {/* Tape body */}
              <div
                className={cn(
                  "w-full rounded-t-md border-2 relative overflow-hidden transition-all",
                  tape.bgColor,
                  tape.borderColor
                )}
                style={{ height: `${tapeHeight}px` }}
              >
                {/* Process blocks */}
                {placements.map((p, i) => {
                  const isActive = !highlighted || highlighted === p.processId
                  const top = (p.startPercent / 100) * tapeHeight
                  const h = Math.max(16, (p.heightPercent / 100) * tapeHeight)
                  return (
                    <div
                      key={`${p.processId}-${i}`}
                      className={cn(
                        "absolute left-1 right-1 rounded-sm border flex items-center justify-center text-[8px] font-mono font-semibold transition-all overflow-hidden",
                        p.bgColor + "/30",
                        p.bgColor.replace("bg-", "border-") + "/50",
                        p.color,
                        isActive ? "opacity-100" : "opacity-15"
                      )}
                      style={{ top: `${top}px`, height: `${h}px` }}
                      onMouseEnter={() => setHighlighted(p.processId)}
                      onMouseLeave={() => setHighlighted(null)}
                      title={`${p.label} (${processes.find((pr) => pr.processId === p.processId)?.label})`}
                    >
                      {h > 14 && <span className="truncate px-0.5">{p.label}</span>}
                    </div>
                  )
                })}

                {/* Empty space lines */}
                {placements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[9px] text-muted-foreground/30 font-mono">empty</span>
                  </div>
                )}
              </div>

              {/* Label */}
              <div className={cn("mt-1.5 text-center", tape.color)}>
                <div className="text-[11px] font-semibold">{tape.shortName}</div>
                <div className="text-[9px] text-muted-foreground">{tape.name}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Size reference */}
      <div className="flex justify-center gap-6 mt-3 pt-2 border-t text-[10px] text-muted-foreground">
        <span>Registers: ~bytes</span>
        <span>Cache: ~KB–MB</span>
        <span>RAM: ~GB</span>
        <span>SSD: ~TB</span>
        <span>HDD: ~TB+</span>
      </div>

      <div className="mt-3 p-2 rounded border border-muted text-xs text-muted-foreground text-center">
        Each tape is a finite {"\""}roll of toilet paper.{"\""} Processes dynamically color parts of every roll — their data, code, and state live scattered across the entire memory hierarchy simultaneously.
      </div>
    </div>
  )
}
