"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ProcessBlock {
  name: string
  size: number
  color: string
  logicalStart: number
}

const TOTAL_PHYSICAL = 384
const PROCESSES: ProcessBlock[] = [
  { name: "P1 (sum)", size: 40, color: "bg-blue-500", logicalStart: 0 },
  { name: "P2 (product)", size: 30, color: "bg-emerald-500", logicalStart: 0 },
  { name: "P1' (sum copy)", size: 40, color: "bg-blue-400", logicalStart: 0 },
  { name: "P3 (parser)", size: 24, color: "bg-amber-500", logicalStart: 0 },
  { name: "P4 (shell)", size: 36, color: "bg-purple-500", logicalStart: 0 },
]

const BASES = [0, 56, 112, 176, 240]
const GRID_MARKS = [0, 64, 128, 192, 256, 320, 384]
type Phase = "overlap" | "resolved"

export function AddressTranslationDemo({ className }: { className?: string }) {
  const [phase, setPhase] = useState<Phase>("overlap")

  const handleReset = () => setPhase("overlap")

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Address Translation — Logical to Physical
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        All of these processes start at logical address 0x0000. Watch what happens when we map them directly to physical memory, then apply base offsets to slide each one into its own physical region.
      </p>

      <div className="mb-3 flex items-center gap-2 text-[10px]">
        <span className="font-semibold uppercase tracking-wide text-muted-foreground">Phase</span>
        <span className={cn(
          "rounded border px-2 py-0.5 font-semibold",
          phase === "overlap"
            ? "border-red-400/40 bg-red-500/10 text-red-700 dark:text-red-300"
            : "border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
        )}>
          {phase === "overlap" ? "Collision" : "Translated"}
        </span>
      </div>

      {/* Phase controls */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={phase === "overlap" ? "default" : "outline"}
          size="sm"
          className={cn("text-xs h-7", phase === "overlap" && "bg-red-600 hover:bg-red-700")}
          onClick={handleReset}
        >
          Direct Mapping (Collision!)
        </Button>
        <Button
          variant={phase === "resolved" ? "default" : "outline"}
          size="sm"
          className={cn("text-xs h-7", phase === "resolved" && "bg-emerald-600 hover:bg-emerald-700")}
          onClick={() => setPhase("resolved")}
        >
          Apply Base Offset (MMU)
        </Button>
      </div>

      {/* Physical memory strip */}
      <div className="relative mb-4">
        <div className="text-[10px] font-semibold text-muted-foreground mb-1">
          Physical Memory ({TOTAL_PHYSICAL} KB)
        </div>
        <div className="relative h-20 border rounded bg-muted/10 overflow-hidden">
          {/* Grid lines */}
          {GRID_MARKS.map((addr) => (
            <div
              key={addr}
              className="absolute top-0 bottom-0 border-l border-dashed border-muted-foreground/10"
              style={{ left: `${(addr / TOTAL_PHYSICAL) * 100}%` }}
            />
          ))}

          {/* Process blocks */}
          {PROCESSES.map((proc, i) => {
            const isOverlap = phase === "overlap"
            const base = isOverlap ? 0 : BASES[i]
            const leftPct = (base / TOTAL_PHYSICAL) * 100
            const widthPct = (proc.size / TOTAL_PHYSICAL) * 100

            return (
              <div
                key={proc.name}
                className={cn(
                  "absolute top-1 flex items-center justify-center text-[9px] font-mono font-bold rounded border-2 transition-all duration-700 ease-in-out overflow-hidden",
                  proc.color,
                  isOverlap
                    ? "border-red-500 opacity-60"
                    : "border-white/30 opacity-80"
                )}
                style={{
                  left: `${leftPct}%`,
                  width: `${widthPct}%`,
                  height: isOverlap ? "24px" : "58px",
                  top: isOverlap ? `${4 + i * 7}px` : "10px",
                  zIndex: 20 - i,
                }}
              >
                <span className="text-white truncate px-1">{proc.name}</span>
              </div>
            )
          })}

          {/* Collision indicator */}
          {phase === "overlap" && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 dark:text-red-400 text-xs font-bold animate-pulse">
              COLLISION!
            </div>
          )}
        </div>

        {/* Address labels */}
        <div className="flex justify-between text-[8px] font-mono text-muted-foreground/50 mt-0.5">
          {GRID_MARKS.map((addr) => (
            <span key={addr}>0x{addr.toString(16).padStart(4, "0").toUpperCase()}</span>
          ))}
        </div>
      </div>

      {/* Address table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-semibold">Process</th>
              <th className="text-left p-2 font-semibold">Logical Start</th>
              <th className="text-left p-2 font-semibold">Base Offset</th>
              <th className="text-left p-2 font-semibold">Physical Start</th>
              <th className="text-left p-2 font-semibold">Physical End</th>
              <th className="text-left p-2 font-semibold">Translation</th>
            </tr>
          </thead>
          <tbody>
            {PROCESSES.map((proc, i) => {
              const base = phase === "overlap" ? 0 : BASES[i]
              const physStart = proc.logicalStart + base
              const physEnd = physStart + proc.size - 1
              return (
                <tr key={proc.name} className="border-b">
                  <td className="p-2">
                    <div className="flex items-center gap-1.5">
                      <div className={cn("w-3 h-3 rounded-sm", proc.color)} />
                      <span className="font-mono">{proc.name}</span>
                    </div>
                  </td>
                  <td className="p-2 font-mono text-muted-foreground">0x0000</td>
                  <td className="p-2 font-mono">
                    <span className={cn(phase !== "overlap" ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-muted-foreground")}>
                      {phase === "overlap" ? "—" : `+0x${base.toString(16).padStart(4, "0").toUpperCase()}`}
                    </span>
                  </td>
                  <td className="p-2 font-mono">
                    <span className={cn(phase === "overlap" && i > 0 ? "text-red-600 dark:text-red-400" : "")}>
                      0x{physStart.toString(16).padStart(4, "0").toUpperCase()}
                    </span>
                  </td>
                  <td className="p-2 font-mono">
                    0x{physEnd.toString(16).padStart(4, "0").toUpperCase()}
                  </td>
                  <td className="p-2 font-mono text-[11px]">
                    <span className={cn(
                      phase === "resolved"
                        ? "rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-700 dark:text-emerald-300"
                        : "text-muted-foreground"
                    )}>
                      0x0000 {phase === "overlap" ? "+ —" : `+ 0x${base.toString(16).padStart(4, "0").toUpperCase()}`} = 0x{physStart.toString(16).padStart(4, "0").toUpperCase()}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {phase === "resolved" && (
        <div className="mb-4 rounded border border-emerald-400/30 bg-emerald-500/5 p-3 text-xs text-emerald-700 dark:text-emerald-300">
          <span className="font-semibold">MMU translation rule:</span>{" "}
          <span className="font-mono">physical = logical + base</span>.
          {" "}Every process still uses the same logical start address, but hardware adds a different base before the memory lookup.
        </div>
      )}

      {/* Callouts */}
      {phase === "overlap" && (
        <div className="p-3 rounded-lg border border-red-400/30 bg-red-500/5 text-xs text-red-700 dark:text-red-300">
          <span className="font-semibold">Problem:</span> Every process begins at logical address 0x0000, so direct mapping makes them collide immediately. Even P1{"'"} (a duplicate of P1) still needs its own physical slot range.
        </div>
      )}
      {phase === "resolved" && (
        <div className="p-3 rounded-lg border border-emerald-400/30 bg-emerald-500/5 text-xs text-emerald-700 dark:text-emerald-300">
          <span className="font-semibold">Solution:</span> The MMU (Memory Management Unit) adds a <span className="font-mono font-bold">base offset</span> to every logical address, translating it to a unique physical address. <span className="font-mono">physical = logical + base</span>. This happens entirely in hardware — programmers and their code are completely unaware. Each process still {"\""}thinks{"\""} it starts at address 0.
        </div>
      )}
    </div>
  )
}
