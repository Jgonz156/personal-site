"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface Block {
  id: string
  label: string
  size: number
  color: string
  type: "process" | "free"
}

interface StepEvent {
  action: "arrive" | "depart" | "reject"
  process: string
  size: number
  color: string
  description: string
}

const TOTAL = 100

const EVENTS: StepEvent[] = [
  { action: "arrive", process: "P1", size: 20, color: "bg-blue-500", description: "P1 (20 KB) arrives — allocated at front" },
  { action: "arrive", process: "P2", size: 15, color: "bg-emerald-500", description: "P2 (15 KB) arrives — allocated next" },
  { action: "arrive", process: "P3", size: 25, color: "bg-amber-500", description: "P3 (25 KB) arrives — allocated next" },
  { action: "arrive", process: "P4", size: 10, color: "bg-purple-500", description: "P4 (10 KB) arrives — allocated next" },
  { action: "arrive", process: "P5", size: 30, color: "bg-rose-500", description: "P5 (30 KB) arrives — memory is now completely full" },
  { action: "depart", process: "P2", size: 15, color: "bg-emerald-500", description: "P2 terminates — leaves a 15 KB gap" },
  { action: "arrive", process: "P6", size: 8, color: "bg-teal-500", description: "P6 (8 KB) arrives — fits in P2's old gap, leaving 7 KB free" },
  { action: "depart", process: "P4", size: 10, color: "bg-purple-500", description: "P4 terminates — leaves a 10 KB gap" },
  { action: "depart", process: "P1", size: 20, color: "bg-blue-500", description: "P1 terminates — leaves a 20 KB gap at front" },
  { action: "reject", process: "P7", size: 28, color: "bg-cyan-500", description: "P7 (28 KB) arrives — 37 KB free total, but the largest contiguous gap is only 20 KB. REJECTED." },
]

function computeBlocks(step: number): Block[] {
  const blocks: Block[] = [{ id: "free-init", label: "Free", size: TOTAL, color: "bg-muted/30", type: "free" }]

  function addProcess(name: string, size: number, color: string) {
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i]
      if (b.type === "free" && b.size >= size) {
        const newBlocks: Block[] = [{ id: name, label: name, size, color, type: "process" }]
        if (b.size > size) {
          newBlocks.push({ id: `free-${name}`, label: "Free", size: b.size - size, color: "bg-muted/30", type: "free" })
        }
        blocks.splice(i, 1, ...newBlocks)
        mergeFree(blocks)
        return true
      }
    }
    return false
  }

  function removeProcess(name: string) {
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].id === name) {
        blocks[i] = { id: `freed-${name}`, label: "Free", size: blocks[i].size, color: "bg-muted/30", type: "free" }
        mergeFree(blocks)
        return
      }
    }
  }

  for (let i = 0; i <= step && i < EVENTS.length; i++) {
    const ev = EVENTS[i]
    if (ev.action === "arrive") addProcess(ev.process, ev.size, ev.color)
    else if (ev.action === "depart") removeProcess(ev.process)
  }

  return blocks
}

function mergeFree(blocks: Block[]) {
  for (let i = 0; i < blocks.length - 1; i++) {
    if (blocks[i].type === "free" && blocks[i + 1].type === "free") {
      blocks[i] = { ...blocks[i], size: blocks[i].size + blocks[i + 1].size }
      blocks.splice(i + 1, 1)
      i--
    }
  }
}

function compact(blocks: Block[]): Block[] {
  const procs = blocks.filter((b) => b.type === "process")
  const freeTotal = blocks.filter((b) => b.type === "free").reduce((s, b) => s + b.size, 0)
  const result: Block[] = [...procs]
  if (freeTotal > 0) result.push({ id: "free-compacted", label: "Free", size: freeTotal, color: "bg-muted/30", type: "free" })
  return result
}

export function DynamicPartitionStepper({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const [compacted, setCompacted] = useState(false)

  const rawBlocks = useMemo(() => computeBlocks(step), [step])
  const blocks = compacted ? compact(rawBlocks) : rawBlocks

  const totalUsed = blocks.filter((b) => b.type === "process").reduce((s, b) => s + b.size, 0)
  const totalFree = TOTAL - totalUsed
  const freeBlocks = blocks.filter((b) => b.type === "free")
  const largestContig = freeBlocks.length > 0 ? Math.max(...freeBlocks.map((b) => b.size)) : 0
  const numGaps = freeBlocks.filter((b) => b.size > 0).length
  const isRejection = step < EVENTS.length && EVENTS[step].action === "reject"
  const requestedSize = isRejection ? EVENTS[step].size : 0

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Dynamic Partitioning — External Fragmentation
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Step through process arrivals and departures. Watch gaps form between processes, then try compaction.
      </p>

      {/* Memory strip */}
      <div className="mb-3">
        <div className="flex h-14 rounded overflow-hidden border transition-all">
          {blocks.map((b, i) => (
            <div
              key={`${b.id}-${i}`}
              className={cn(
                "flex items-center justify-center text-[10px] font-mono font-bold transition-all border-r last:border-r-0 overflow-hidden",
                b.type === "process" ? cn(b.color, "text-white/90 opacity-70") : "bg-muted/20 text-muted-foreground/40",
                b.type === "free" && numGaps > 1 && !compacted && "border-dashed border-red-400/30"
              )}
              style={{ width: `${(b.size / TOTAL) * 100}%` }}
              title={`${b.label}: ${b.size} KB`}
            >
              {b.size >= 5 && (
                <span className="truncate px-0.5">
                  {b.type === "process" ? b.label : `${b.size}`}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5">
          <span>0 KB</span>
          <span>{TOTAL} KB</span>
        </div>
      </div>

      {isRejection && (
        <div className="mb-3 rounded border border-red-400/30 bg-red-500/5 p-2">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-red-700 dark:text-red-300">
            Requested block vs. largest available gap
          </div>
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                <span>Largest contiguous gap</span>
                <span className="font-mono">{largestContig} KB</span>
              </div>
              <div className="h-3 rounded border bg-muted/20 overflow-hidden">
                <div
                  className="h-full bg-amber-500/60"
                  style={{ width: `${(largestContig / TOTAL) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-[10px] text-muted-foreground">
                <span>Incoming process {EVENTS[step].process}</span>
                <span className="font-mono">{requestedSize} KB</span>
              </div>
              <div className="h-3 rounded border bg-muted/20 overflow-hidden">
                <div
                  className="h-full border border-cyan-400/70 bg-cyan-500/35"
                  style={{ width: `${(requestedSize / TOTAL) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step description */}
      <div className={cn(
        "mb-3 p-2 rounded border text-xs",
        isRejection ? "border-red-400/40 bg-red-500/5 text-red-700 dark:text-red-300" : "border-muted bg-muted/20 text-muted-foreground"
      )}>
        <span className="font-semibold">Step {step + 1}/{EVENTS.length}:</span>{" "}
        {step < EVENTS.length ? EVENTS[step].description : "Done."}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step <= 0} onClick={() => { setStep(step - 1); setCompacted(false) }}>
          {"← Prev"}
        </Button>
        <div className="flex gap-1">
          {EVENTS.map((_, i) => (
            <button
              key={i}
              className={cn("w-2 h-2 rounded-full transition-colors", i === step ? "bg-primary" : i < step ? "bg-primary/40" : "bg-muted")}
              onClick={() => { setStep(i); setCompacted(false) }}
            />
          ))}
        </div>
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step >= EVENTS.length - 1} onClick={() => { setStep(step + 1); setCompacted(false) }}>
          {"Next →"}
        </Button>
        <div className="flex-1" />
        <Button
          variant={compacted ? "default" : "outline"}
          size="sm"
          className={cn("text-xs h-7", compacted && "bg-emerald-600 hover:bg-emerald-700")}
          onClick={() => setCompacted(!compacted)}
        >
          {compacted ? "Compacted ✓" : "Compact"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="p-2 rounded bg-muted/30 text-center">
          <div className="text-muted-foreground">Used</div>
          <div className="font-mono font-bold">{totalUsed} KB</div>
        </div>
        <div className="p-2 rounded bg-muted/30 text-center">
          <div className="text-muted-foreground">Free (total)</div>
          <div className="font-mono font-bold">{totalFree} KB</div>
        </div>
        <div className="p-2 rounded bg-amber-500/10 text-center">
          <div className="text-amber-700 dark:text-amber-300">Largest Contig.</div>
          <div className="font-mono font-bold text-amber-700 dark:text-amber-300">{largestContig} KB</div>
        </div>
        <div className="p-2 rounded bg-red-500/10 text-center">
          <div className="text-red-700 dark:text-red-300">Gaps</div>
          <div className="font-mono font-bold text-red-700 dark:text-red-300">{numGaps}</div>
        </div>
      </div>
    </div>
  )
}
