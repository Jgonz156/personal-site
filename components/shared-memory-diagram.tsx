"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect, useRef } from "react"

const CELLS = 6

interface CellState {
  value: string
  writer: "A" | "B" | null
  conflict: boolean
}

type Mode = "synchronized" | "unsynchronized"

function makeCleanCells(): CellState[] {
  return Array.from({ length: CELLS }, () => ({ value: "—", writer: null, conflict: false }))
}

function makeSyncDemo(): CellState[] {
  return [
    { value: "42", writer: "A", conflict: false },
    { value: "17", writer: "A", conflict: false },
    { value: "—",  writer: null, conflict: false },
    { value: "—",  writer: null, conflict: false },
    { value: "99", writer: "B", conflict: false },
    { value: "—",  writer: null, conflict: false },
  ]
}

function makeRaceDemo(): CellState[] {
  return [
    { value: "42", writer: "A", conflict: false },
    { value: "??", writer: null, conflict: true },
    { value: "??", writer: null, conflict: true },
    { value: "—",  writer: null, conflict: false },
    { value: "99", writer: "B", conflict: false },
    { value: "??", writer: null, conflict: true },
  ]
}

const VW = 560
const VH = 220
const REGION_X = 155
const REGION_W = 250
const CELL_W = REGION_W / CELLS

export function SharedMemoryDiagram({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("synchronized")
  const [cells, setCells] = useState<CellState[]>(makeCleanCells())
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const startDemo = (m: Mode) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setMode(m)
    setCells(makeCleanCells())
    setRunning(true)

    let tick = 0
    intervalRef.current = setInterval(() => {
      tick++
      if (tick === 1) {
        setCells(m === "synchronized" ? makeSyncDemo() : makeRaceDemo())
      } else if (tick >= 3) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setRunning(false)
      }
    }, 800)
  }

  const writerColors = {
    A: { text: "fill-blue-700 dark:fill-blue-300", bg: "fill-blue-500/25 stroke-blue-500/50" },
    B: { text: "fill-orange-700 dark:fill-orange-300", bg: "fill-orange-500/25 stroke-orange-500/50" },
  }

  const hasConflict = cells.some(c => c.conflict)

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between">
        <h4 className="text-sm font-semibold">Shared Memory: Zero-Copy, You Own Coordination</h4>
        <div className="flex gap-1 rounded-lg border p-0.5">
          <button
            onClick={() => startDemo("synchronized")}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-medium transition-colors",
              mode === "synchronized" && !running ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}
          >Synchronized</button>
          <button
            onClick={() => startDemo("unsynchronized")}
            className={cn(
              "px-3 py-1 rounded-md text-xs font-medium transition-colors",
              mode === "unsynchronized" && !running ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}
          >Unsynchronized</button>
        </div>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-2xl mx-auto">
          {/* Process A */}
          <rect x={10} y={50} width={90} height={60} rx={6}
            className="fill-blue-500/15 stroke-blue-500/50 stroke-2" />
          <text x={55} y={75} textAnchor="middle"
            className="fill-blue-700 dark:fill-blue-300 font-semibold" fontSize={12}>Process A</text>
          <text x={55} y={92} textAnchor="middle"
            className="fill-muted-foreground/40" fontSize={8}>read/write</text>

          {/* Process B */}
          <rect x={460} y={50} width={90} height={60} rx={6}
            className="fill-orange-500/15 stroke-orange-500/50 stroke-2" />
          <text x={505} y={75} textAnchor="middle"
            className="fill-orange-700 dark:fill-orange-300 font-semibold" fontSize={12}>Process B</text>
          <text x={505} y={92} textAnchor="middle"
            className="fill-muted-foreground/40" fontSize={8}>read/write</text>

          {/* Arrows to shared region */}
          <line x1={100} y1={80} x2={REGION_X - 4} y2={80}
            className="stroke-blue-500/40 stroke-1" strokeDasharray="3 3" />
          <line x1={460} y1={80} x2={REGION_X + REGION_W + 4} y2={80}
            className="stroke-orange-500/40 stroke-1" strokeDasharray="3 3" />

          {/* Shared region */}
          <rect x={REGION_X - 8} y={30} width={REGION_W + 16} height={100} rx={8}
            className={cn(
              "stroke-2 transition-all duration-300",
              hasConflict
                ? "fill-red-500/5 stroke-red-500/40"
                : "fill-slate-200/50 dark:fill-slate-700/30 stroke-slate-300 dark:stroke-slate-600/30"
            )} />
          <text x={REGION_X + REGION_W / 2} y={24} textAnchor="middle"
            className="fill-muted-foreground/50 font-semibold" fontSize={9}>Shared Memory Region</text>

          {/* NO kernel buffer notice */}
          <text x={REGION_X + REGION_W / 2} y={148} textAnchor="middle"
            className="fill-muted-foreground/25" fontSize={8}>
            no kernel buffer — direct memory access
          </text>

          {/* Memory cells */}
          {cells.map((cell, i) => {
            const cx = REGION_X + i * CELL_W
            return (
              <g key={i}>
                <rect x={cx + 2} y={52} width={CELL_W - 4} height={40} rx={3}
                  className={cn(
                    "stroke-1 transition-all duration-300",
                    cell.conflict
                      ? "fill-red-500/20 stroke-red-500/50"
                      : cell.writer
                      ? writerColors[cell.writer].bg
                      : "fill-slate-200/40 dark:fill-slate-700/20 stroke-slate-300/50 dark:stroke-slate-600/30"
                  )} />
                <text x={cx + CELL_W / 2} y={77} textAnchor="middle"
                  className={cn(
                    "font-mono font-bold transition-all duration-300",
                    cell.conflict
                      ? "fill-red-500 animate-pulse"
                      : cell.writer
                      ? writerColors[cell.writer].text
                      : "fill-muted-foreground/30"
                  )} fontSize={cell.conflict ? 14 : 12}>
                  {cell.value}
                </text>
                {cell.conflict && (
                  <text x={cx + CELL_W / 2} y={100} textAnchor="middle"
                    className="fill-red-500/60 font-bold" fontSize={7}>RACE</text>
                )}
              </g>
            )
          })}

          {/* Warning icon for unsync mode */}
          {hasConflict && (
            <text x={REGION_X + REGION_W / 2} y={170} textAnchor="middle"
              className="fill-red-500 font-bold animate-pulse" fontSize={11}>
              ⚠ concurrent writes without synchronization — data corrupted
            </text>
          )}

          {mode === "synchronized" && !hasConflict && cells.some(c => c.writer) && (
            <text x={REGION_X + REGION_W / 2} y={170} textAnchor="middle"
              className="fill-green-600/60 dark:fill-green-400/50" fontSize={10}>
              ✓ mutex held — orderly access, no conflicts
            </text>
          )}

          {/* Legend */}
          <g>
            <rect x={REGION_X} y={192} width={12} height={10} rx={2}
              className="fill-blue-500/25 stroke-blue-500/50 stroke-1" />
            <text x={REGION_X + 16} y={200} className="fill-muted-foreground/50" fontSize={8}>Written by A</text>
            <rect x={REGION_X + 100} y={192} width={12} height={10} rx={2}
              className="fill-orange-500/25 stroke-orange-500/50 stroke-1" />
            <text x={REGION_X + 116} y={200} className="fill-muted-foreground/50" fontSize={8}>Written by B</text>
            <rect x={REGION_X + 200} y={192} width={12} height={10} rx={2}
              className="fill-red-500/20 stroke-red-500/50 stroke-1" />
            <text x={REGION_X + 216} y={200} className="fill-muted-foreground/50" fontSize={8}>Race condition</text>
          </g>
        </svg>

        <p className="text-sm text-muted-foreground mt-2">
          {mode === "synchronized"
            ? "With a mutex, processes take turns. Each write completes before the other begins — no corruption."
            : "Without synchronization, both processes write to overlapping cells simultaneously. The result is undefined — data is garbled."
          }
        </p>

        <p className="text-[11px] text-muted-foreground/50 mt-2 italic">
          Click Synchronized or Unsynchronized to run the demo. Shared memory is the fastest IPC — and the only one where safety is entirely your responsibility.
        </p>
      </div>
    </div>
  )
}
