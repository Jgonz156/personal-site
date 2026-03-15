"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"

interface Process {
  name: string
  size: number
  color: string
}

const TOTAL_MEMORY = 128
const PROCESSES: Process[] = [
  { name: "P1", size: 18, color: "bg-blue-500" },
  { name: "P2", size: 7, color: "bg-emerald-500" },
  { name: "P3", size: 31, color: "bg-amber-500" },
  { name: "P4", size: 12, color: "bg-purple-500" },
  { name: "P5", size: 5, color: "bg-rose-500" },
]

export function FixedPartitionDemo({ className }: { className?: string }) {
  const [partSize, setPartSize] = useState(16)

  const result = useMemo(() => {
    const numPartitions = Math.floor(TOTAL_MEMORY / partSize)
    const allocations: { process: Process; partitionsUsed: number; wasted: number }[] = []
    let partitionsUsed = 0

    for (const proc of PROCESSES) {
      const needed = Math.ceil(proc.size / partSize)
      if (partitionsUsed + needed <= numPartitions) {
        const allocated = needed * partSize
        allocations.push({ process: proc, partitionsUsed: needed, wasted: allocated - proc.size })
        partitionsUsed += needed
      }
    }

    const totalAllocated = allocations.reduce((s, a) => s + a.partitionsUsed * partSize, 0)
    const totalUsed = allocations.reduce((s, a) => s + a.process.size, 0)
    const totalWasted = totalAllocated - totalUsed
    const fragPct = totalAllocated > 0 ? (totalWasted / totalAllocated) * 100 : 0

    return { numPartitions, allocations, partitionsUsed, totalAllocated, totalUsed, totalWasted, fragPct }
  }, [partSize])

  const trackingOverhead = result.numPartitions
  const isExtreme = partSize <= 2
  const isHuge = partSize >= 64

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Fixed Partitioning — Internal Fragmentation Explorer
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Drag the slider to change the partition size. Watch how internal fragmentation (wasted space within partitions) changes.
      </p>

      {/* Slider */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-muted-foreground w-28 shrink-0">
          Partition size: <strong className="text-foreground">{partSize} KB</strong>
        </span>
        <input
          type="range"
          min={2}
          max={64}
          step={2}
          value={partSize}
          onChange={(e) => setPartSize(parseInt(e.target.value))}
          className="flex-1 accent-violet-600"
        />
        <span className="text-xs text-muted-foreground">
          {result.numPartitions} partitions
        </span>
      </div>

      {/* Warnings */}
      {isExtreme && (
        <div className="mb-3 p-2 rounded border border-amber-400/40 bg-amber-500/5 text-xs text-amber-700 dark:text-amber-300">
          {"Tiny partitions = minimal waste but the tracking structure needs "}
          <span className="font-mono font-bold">{trackingOverhead}</span>
          {" entries! At partition size 1, the tracker would be as large as the memory itself."}
        </div>
      )}
      {isHuge && (
        <div className="mb-3 p-2 rounded border border-red-400/40 bg-red-500/5 text-xs text-red-700 dark:text-red-300">
          {"Huge partitions = massive internal fragmentation. Small processes waste most of their allocated space."}
        </div>
      )}

      {/* Memory strip */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-muted-foreground mb-1">
          Memory ({TOTAL_MEMORY} KB total — {result.numPartitions} partitions of {partSize} KB)
        </div>
        <div className="flex h-14 rounded overflow-hidden border">
          {Array.from({ length: result.numPartitions }).map((_, pi) => {
            let filled = false
            let proc: (typeof result.allocations)[0] | null = null
            let isWaste = false
            let fillPct = 0

            let offset = 0
            for (const alloc of result.allocations) {
              if (pi >= offset && pi < offset + alloc.partitionsUsed) {
                filled = true
                proc = alloc
                const withinProcPartIdx = pi - offset
                const remainingSize = alloc.process.size - withinProcPartIdx * partSize
                if (remainingSize <= 0) {
                  isWaste = true
                  fillPct = 0
                } else if (remainingSize < partSize) {
                  fillPct = (remainingSize / partSize) * 100
                } else {
                  fillPct = 100
                }
                break
              }
              offset += alloc.partitionsUsed
            }

            return (
              <div
                key={pi}
                className={cn(
                  "relative flex-1 border-r last:border-r-0 flex flex-col items-center justify-end overflow-hidden",
                  !filled && "bg-muted/30"
                )}
                title={filled && proc ? `${proc.process.name}: ${isWaste ? "wasted" : `${Math.min(proc.process.size - (pi - offset2(result.allocations, pi, partSize)) * partSize, partSize)} KB used`}` : "Free"}
              >
                {filled && proc && (
                  <>
                    {fillPct < 100 && fillPct > 0 && (
                      <div
                        className="absolute top-0 left-0 right-0 bg-red-500/20"
                        style={{ height: `${100 - fillPct}%` }}
                      />
                    )}
                    {isWaste && (
                      <div className="absolute inset-0 bg-red-500/20" />
                    )}
                    <div
                      className={cn("absolute bottom-0 left-0 right-0", proc.process.color, "opacity-60")}
                      style={{ height: `${fillPct}%` }}
                    />
                    <span className="relative text-[8px] font-mono font-bold z-10 mb-0.5 text-foreground">
                      {proc.process.name}
                    </span>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend bar */}
        <div className="flex mt-1 text-[9px] text-muted-foreground justify-between">
          <span>0 KB</span>
          <span>{TOTAL_MEMORY} KB</span>
        </div>
      </div>

      {/* Process list */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {PROCESSES.map((p) => {
          const alloc = result.allocations.find((a) => a.process.name === p.name)
          return (
            <div key={p.name} className={cn("rounded border p-1.5 text-center text-xs", alloc ? "border-foreground/20" : "border-red-400/40 opacity-50")}>
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <div className={cn("w-2.5 h-2.5 rounded-sm", p.color)} />
                <span className="font-semibold font-mono">{p.name}</span>
              </div>
              <div className="text-muted-foreground">{p.size} KB</div>
              {alloc && (
                <div className="text-red-600 dark:text-red-400 font-mono text-[10px]">
                  +{alloc.wasted} KB waste
                </div>
              )}
              {!alloc && <div className="text-red-500 text-[10px]">rejected</div>}
            </div>
          )
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="p-2 rounded bg-muted/30 text-center">
          <div className="text-muted-foreground">Allocated</div>
          <div className="font-mono font-bold">{result.totalAllocated} KB</div>
        </div>
        <div className="p-2 rounded bg-muted/30 text-center">
          <div className="text-muted-foreground">Actually Used</div>
          <div className="font-mono font-bold">{result.totalUsed} KB</div>
        </div>
        <div className="p-2 rounded bg-red-500/10 text-center">
          <div className="text-red-700 dark:text-red-300">Internal Frag.</div>
          <div className="font-mono font-bold text-red-700 dark:text-red-300">{result.totalWasted} KB</div>
        </div>
        <div className="p-2 rounded bg-red-500/10 text-center">
          <div className="text-red-700 dark:text-red-300">Waste %</div>
          <div className="font-mono font-bold text-red-700 dark:text-red-300">{result.fragPct.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  )
}

function offset2(allocations: { process: Process; partitionsUsed: number }[], pi: number, partSize: number): number {
  let off = 0
  for (const a of allocations) {
    if (pi >= off && pi < off + a.partitionsUsed) return off
    off += a.partitionsUsed
  }
  return 0
}
