"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

type Strategy = "first-fit" | "best-fit" | "worst-fit" | "next-fit"

interface MemBlock {
  id: string
  label: string
  size: number
  color: string
  type: "process" | "free"
}

interface AddressedBlock extends MemBlock {
  start: number
  end: number
}

interface Event {
  action: "arrive" | "depart"
  name: string
  size: number
  color: string
}

const TOTAL = 120
const EVENTS: Event[] = [
  { action: "arrive", name: "A", size: 20, color: "bg-blue-500" },
  { action: "arrive", name: "B", size: 15, color: "bg-emerald-500" },
  { action: "arrive", name: "C", size: 25, color: "bg-amber-500" },
  { action: "arrive", name: "D", size: 10, color: "bg-purple-500" },
  { action: "arrive", name: "E", size: 18, color: "bg-rose-500" },
  { action: "depart", name: "B", size: 15, color: "bg-emerald-500" },
  { action: "depart", name: "D", size: 10, color: "bg-purple-500" },
  { action: "arrive", name: "F", size: 9, color: "bg-teal-500" },
  { action: "depart", name: "C", size: 25, color: "bg-amber-500" },
  { action: "arrive", name: "G", size: 12, color: "bg-indigo-500" },
  { action: "depart", name: "E", size: 18, color: "bg-rose-500" },
  { action: "arrive", name: "H", size: 24, color: "bg-pink-500" },
  { action: "arrive", name: "I", size: 21, color: "bg-cyan-500" },
]

function annotateBlocks(blocks: MemBlock[]): AddressedBlock[] {
  let cursor = 0
  return blocks.map((block) => {
    const addressed = {
      ...block,
      start: cursor,
      end: cursor + block.size,
    }
    cursor += block.size
    return addressed
  })
}

function mergeFree(blocks: MemBlock[]) {
  for (let i = 0; i < blocks.length - 1; i++) {
    if (blocks[i].type === "free" && blocks[i + 1].type === "free") {
      blocks[i] = { ...blocks[i], size: blocks[i].size + blocks[i + 1].size, id: `free-${i}` }
      blocks.splice(i + 1, 1)
      i--
    }
  }
}

interface StepResult {
  blocks: AddressedBlock[]
  scannedGaps: { start: number; end: number; size: number; chosen: boolean }[]
  failed: boolean
  description: string
  chosenReason?: string
  cursorStartAddr?: number
}

function simulate(strategy: Strategy, upToStep: number): { steps: StepResult[]; failures: number; finalBlocks: MemBlock[] } {
  const blocks: MemBlock[] = [{ id: "free-0", label: "Free", size: TOTAL, color: "", type: "free" }]
  let nextFitStartAddr = 0
  const steps: StepResult[] = []
  let failures = 0

  for (let s = 0; s <= upToStep && s < EVENTS.length; s++) {
    const ev = EVENTS[s]
    if (ev.action === "depart") {
      const idx = blocks.findIndex((b) => b.id === ev.name)
      if (idx >= 0) {
        blocks[idx] = { id: `freed-${ev.name}-${s}`, label: "Free", size: blocks[idx].size, color: "", type: "free" }
        mergeFree(blocks)
      }
      steps.push({
        blocks: annotateBlocks(blocks),
        scannedGaps: [],
        failed: false,
        description: `${ev.name} departs — gap freed`,
      })
      continue
    }

    const addressed = annotateBlocks(blocks)
    const freeBlocks = addressed.filter((b) => b.type === "free")
    const fittingBlocks = freeBlocks.filter((b) => b.size >= ev.size)

    if (fittingBlocks.length === 0) {
      failures++
      steps.push({
        blocks: addressed,
        scannedGaps: freeBlocks.map((b) => ({
          start: b.start,
          end: b.end,
          size: b.size,
          chosen: false,
        })),
        failed: true,
        description: `${ev.name} (${ev.size} KB) — NO FIT! Rejected.`,
      })
      continue
    }

    let chosenBlock: AddressedBlock
    let allocStart = 0
    let chosenReason = ""
    let scannedGaps: { start: number; end: number; size: number; chosen: boolean }[] = []

    const scanCursorBefore = nextFitStartAddr

    switch (strategy) {
      case "first-fit": {
        const scanned: AddressedBlock[] = []
        let found = fittingBlocks[0]
        for (const block of freeBlocks) {
          scanned.push(block)
          if (block.size >= ev.size) {
            found = block
            break
          }
        }
        chosenBlock = found
        allocStart = found.start
        chosenReason = "First usable gap in a linear scan from the front."
        scannedGaps = scanned.map((b) => ({
          start: b.start,
          end: b.end,
          size: b.size,
          chosen: b.start === found.start && b.end === found.end,
        }))
        break
      }
      case "best-fit": {
        const found = fittingBlocks.reduce((best, block) => block.size < best.size ? block : best, fittingBlocks[0])
        chosenBlock = found
        allocStart = found.start
        chosenReason = "Smallest usable gap after scanning all gaps."
        scannedGaps = freeBlocks.map((b) => ({
          start: b.start,
          end: b.end,
          size: b.size,
          chosen: b.start === found.start && b.end === found.end,
        }))
        break
      }
      case "worst-fit": {
        const found = fittingBlocks.reduce((best, block) => block.size > best.size ? block : best, fittingBlocks[0])
        chosenBlock = found
        allocStart = found.start
        chosenReason = "Largest usable gap after scanning all gaps."
        scannedGaps = freeBlocks.map((b) => ({
          start: b.start,
          end: b.end,
          size: b.size,
          chosen: b.start === found.start && b.end === found.end,
        }))
        break
      }
      case "next-fit": {
        const orderedBlocks = [
          ...freeBlocks.filter((b) => b.end > nextFitStartAddr),
          ...freeBlocks.filter((b) => b.end <= nextFitStartAddr),
        ]

        let foundBlock: AddressedBlock | null = null
        let foundStart = 0
        const scanned: { block: AddressedBlock; chosen: boolean }[] = []

        for (const block of orderedBlocks) {
          const scanStart = nextFitStartAddr > block.start && nextFitStartAddr < block.end
            ? nextFitStartAddr
            : block.start
          const available = block.end - scanStart
          const fits = available >= ev.size
          scanned.push({ block, chosen: fits && foundBlock === null })
          if (fits) {
            foundBlock = block
            foundStart = scanStart
            break
          }
        }

        chosenBlock = foundBlock ?? fittingBlocks[0]
        allocStart = foundBlock ? foundStart : chosenBlock.start
        chosenReason = `First usable gap encountered after cursor ${scanCursorBefore} KB.`
        scannedGaps = scanned.map(({ block, chosen }) => ({
          start: block.start,
          end: block.end,
          size: block.size,
          chosen,
        }))
        break
      }
    }

    const chosenIdx = addressed.findIndex((block) => block.start === chosenBlock.start && block.end === chosenBlock.end)
    const gap = addressed[chosenIdx]
    const beforeSize = allocStart - gap.start
    const afterSize = gap.end - (allocStart + ev.size)
    const newBlocks: MemBlock[] = []

    if (beforeSize > 0) {
      newBlocks.push({
        id: `free-before-${ev.name}-${s}`,
        label: "Free",
        size: beforeSize,
        color: "",
        type: "free",
      })
    }
    newBlocks.push({ id: ev.name, label: ev.name, size: ev.size, color: ev.color, type: "process" })
    if (afterSize > 0) {
      newBlocks.push({
        id: `free-after-${ev.name}-${s}`,
        label: "Free",
        size: afterSize,
        color: "",
        type: "free",
      })
    }

    blocks.splice(chosenIdx, 1, ...newBlocks)
    mergeFree(blocks)
    nextFitStartAddr = (allocStart + ev.size) % TOTAL

    steps.push({
      blocks: annotateBlocks(blocks),
      scannedGaps,
      failed: false,
      description: `${ev.name} (${ev.size} KB) → allocated at ${allocStart}-${allocStart + ev.size} KB`,
      chosenReason,
      cursorStartAddr: strategy === "next-fit" ? scanCursorBefore : undefined,
    })
  }

  return { steps, failures, finalBlocks: blocks.map((b) => ({ ...b })) }
}

const STRATEGY_LABELS: Record<Strategy, { label: string; short: string }> = {
  "first-fit": { label: "First-Fit", short: "FF" },
  "best-fit": { label: "Best-Fit", short: "BF" },
  "worst-fit": { label: "Worst-Fit", short: "WF" },
  "next-fit": { label: "Next-Fit", short: "NF" },
}

export function AllocationStrategyDemo({ className }: { className?: string }) {
  const [strategy, setStrategy] = useState<Strategy>("first-fit")
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  const maxStep = EVENTS.length - 1

  const result = useMemo(() => simulate(strategy, step), [strategy, step])
  const currentStep = result.steps[step] || result.steps[result.steps.length - 1]
  const blocks = currentStep?.blocks || []

  const totalUsed = blocks.filter((b) => b.type === "process").reduce((s, b) => s + b.size, 0)
  const freeBlocks = blocks.filter((b) => b.type === "free")
  const totalFree = freeBlocks.reduce((s, b) => s + b.size, 0)
  const numGaps = freeBlocks.filter((b) => b.size > 0).length

  const reset = useCallback(() => { setStep(0); setPlaying(false) }, [])

  useEffect(() => {
    if (!playing || step >= maxStep) { setPlaying(false); return }
    const timer = setTimeout(() => setStep((s) => s + 1), 800)
    return () => clearTimeout(timer)
  }, [playing, step, maxStep])

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Allocation Strategies — FF / BF / WF / NF Comparison
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Select a strategy, then step through the same sequence of arrivals and departures to compare behavior.
      </p>

      {/* Strategy selector */}
      <div className="flex gap-1 mb-4">
        {(Object.keys(STRATEGY_LABELS) as Strategy[]).map((s) => (
          <Button
            key={s}
            variant={strategy === s ? "default" : "outline"}
            size="sm"
            className={cn("text-xs h-7", strategy === s && "bg-violet-600 hover:bg-violet-700")}
            onClick={() => { setStrategy(s); reset() }}
          >
            {STRATEGY_LABELS[s].label}
          </Button>
        ))}
      </div>

      {/* Memory strip */}
      <div className="mb-3">
        <div className="flex h-12 rounded overflow-hidden border">
          {blocks.map((b, i) => (
            <div
              key={`${b.id}-${i}`}
              className={cn(
                "relative flex items-center justify-center text-[10px] font-mono font-bold border-r last:border-r-0 transition-all overflow-hidden",
                b.type === "process" ? cn(b.color, "text-white/90 opacity-70") : "bg-muted/20 text-muted-foreground/40"
              )}
              style={{ width: `${(b.size / TOTAL) * 100}%` }}
              title={`${b.label}: ${b.start}-${b.end} KB (${b.size} KB)`}
            >
              {(b.size / TOTAL) * 100 > 4 && (
                <span className="truncate px-0.5">{b.type === "process" ? b.label : b.size}</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5">
          <span>0 KB</span>
          <span>{TOTAL} KB</span>
        </div>
      </div>

      {currentStep?.scannedGaps.length > 0 && (
        <div className="mb-3 rounded border bg-muted/20 p-2">
          <div className="mb-2 flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
            <span className="font-semibold uppercase tracking-wide">Scan behavior</span>
            {strategy === "next-fit" && currentStep.cursorStartAddr !== undefined && (
              <span className="font-mono">cursor: {currentStep.cursorStartAddr} KB</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {currentStep.scannedGaps.map((gap) => (
              <div
                key={`${gap.start}-${gap.end}`}
                className={cn(
                  "rounded border px-2 py-1 text-[10px] font-mono",
                  gap.chosen
                    ? "border-violet-400/60 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                    : "border-muted-foreground/20 bg-background text-muted-foreground"
                )}
              >
                {gap.start}-{gap.end} KB ({gap.size} KB)
              </div>
            ))}
          </div>
          {currentStep.chosenReason && (
            <div className="mt-2 text-[10px] text-muted-foreground">
              {currentStep.chosenReason}
            </div>
          )}
        </div>
      )}

      {/* Step description */}
      <div className={cn(
        "mb-3 p-2 rounded border text-xs",
        currentStep?.failed ? "border-red-400/40 bg-red-500/5 text-red-700 dark:text-red-300" : "border-muted bg-muted/20 text-muted-foreground"
      )}>
        <span className="font-semibold">Step {step + 1}/{EVENTS.length}:</span>{" "}
        {currentStep?.description || "Ready"}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step <= 0} onClick={() => { setStep(step - 1); setPlaying(false) }}>
          {"← Prev"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs h-7"
          onClick={() => playing ? setPlaying(false) : (step >= maxStep ? (reset(), setPlaying(true)) : setPlaying(true))}
        >
          {playing ? "⏸ Pause" : "▶ Play"}
        </Button>
        <div className="flex gap-1">
          {EVENTS.map((_, i) => (
            <button
              key={i}
              className={cn("w-2 h-2 rounded-full transition-colors", i === step ? "bg-primary" : i < step ? "bg-primary/40" : "bg-muted")}
              onClick={() => { setStep(i); setPlaying(false) }}
            />
          ))}
        </div>
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step >= maxStep} onClick={() => { setStep(step + 1); setPlaying(false) }}>
          {"Next →"}
        </Button>
        <div className="flex-1" />
        <Button variant="outline" size="sm" className="text-xs h-7" onClick={reset}>
          {"↺ Reset"}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="p-2 rounded bg-muted/30 text-center">
          <div className="text-muted-foreground">Used</div>
          <div className="font-mono font-bold">{totalUsed} KB</div>
        </div>
        <div className="p-2 rounded bg-muted/30 text-center">
          <div className="text-muted-foreground">Free</div>
          <div className="font-mono font-bold">{totalFree} KB</div>
        </div>
        <div className="p-2 rounded bg-amber-500/10 text-center">
          <div className="text-amber-700 dark:text-amber-300">Gaps</div>
          <div className="font-mono font-bold text-amber-700 dark:text-amber-300">{numGaps}</div>
        </div>
        <div className="p-2 rounded bg-red-500/10 text-center">
          <div className="text-red-700 dark:text-red-300">Failures</div>
          <div className="font-mono font-bold text-red-700 dark:text-red-300">{result.failures}</div>
        </div>
      </div>
    </div>
  )
}
