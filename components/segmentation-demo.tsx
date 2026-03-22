"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Segment {
  id: string
  process: string
  label: string
  size: number
  color: string
}

interface PhysBlock {
  segId: string
  process: string
  label: string
  size: number
  color: string
  offset: number
}

interface StepState {
  annotation: string
  segments: Segment[]
  physical: PhysBlock[]
  physCapacity: number
  highlightSeg?: string
  showFragWarning?: boolean
  isCompaction?: boolean
}

const PHYS_CAPACITY = 64

const P1_COLOR = "bg-blue-500"
const P2_COLOR = "bg-amber-500"
const P3_COLOR = "bg-purple-500"

const STEPS: StepState[] = (() => {
  const p1Code: Segment = { id: "p1-code", process: "P1", label: "Code", size: 12, color: P1_COLOR }
  const p1Stack: Segment = { id: "p1-stack", process: "P1", label: "Stack", size: 8, color: P1_COLOR }
  const p1Heap: Segment = { id: "p1-heap", process: "P1", label: "Heap", size: 6, color: P1_COLOR }

  const p2Code: Segment = { id: "p2-code", process: "P2", label: "Code", size: 10, color: P2_COLOR }
  const p2Stack: Segment = { id: "p2-stack", process: "P2", label: "Stack", size: 5, color: P2_COLOR }
  const p2Array: Segment = { id: "p2-array", process: "P2", label: "Array", size: 14, color: P2_COLOR }

  const p3Code: Segment = { id: "p3-code", process: "P3", label: "Code", size: 11, color: P3_COLOR }

  function placeBlocks(segs: Segment[]): PhysBlock[] {
    const blocks: PhysBlock[] = []
    let offset = 0
    for (const s of segs) {
      blocks.push({ segId: s.id, process: s.process, label: s.label, size: s.size, color: s.color, offset })
      offset += s.size
    }
    return blocks
  }

  const step0Segs = [p1Code, p1Stack, p1Heap]
  const step0Phys = placeBlocks(step0Segs)

  const step1Segs = [...step0Segs, p2Code, p2Stack, p2Array]
  const step1Phys = placeBlocks(step1Segs)

  const step2Segs = [p1Code, p1Heap, p2Code, p2Stack, p2Array]
  const step2Phys: PhysBlock[] = [
    { ...p1Code, segId: p1Code.id, offset: 0 },
    { ...p1Heap, segId: p1Heap.id, offset: p1Code.size + p1Stack.size },
    { ...p2Code, segId: p2Code.id, offset: p1Code.size + p1Stack.size + p1Heap.size },
    { ...p2Stack, segId: p2Stack.id, offset: p1Code.size + p1Stack.size + p1Heap.size + p2Code.size },
    { ...p2Array, segId: p2Array.id, offset: p1Code.size + p1Stack.size + p1Heap.size + p2Code.size + p2Stack.size },
  ]

  const step3Segs = [p1Code, p1Heap, p2Code, p2Array]
  const step3Phys: PhysBlock[] = [
    { ...p1Code, segId: p1Code.id, offset: 0 },
    { ...p1Heap, segId: p1Heap.id, offset: p1Code.size + p1Stack.size },
    { ...p2Code, segId: p2Code.id, offset: p1Code.size + p1Stack.size + p1Heap.size },
    { ...p2Array, segId: p2Array.id, offset: p1Code.size + p1Stack.size + p1Heap.size + p2Code.size + p2Stack.size },
  ]

  const freeInGap1 = p1Stack.size
  const freeInGap2 = p2Stack.size
  const freeAtEnd = PHYS_CAPACITY - (p1Code.size + p1Stack.size + p1Heap.size + p2Code.size + p2Stack.size + p2Array.size) + p1Stack.size + p2Stack.size
  const totalFree = freeInGap1 + freeInGap2 + freeAtEnd

  const step4Segs = [...step3Segs, p3Code]

  const step5Segs = step4Segs
  const step5Phys: PhysBlock[] = [
    { ...p1Code, segId: p1Code.id, offset: 0 },
    { ...p1Heap, segId: p1Heap.id, offset: p1Code.size },
    { ...p2Code, segId: p2Code.id, offset: p1Code.size + p1Heap.size },
    { ...p2Array, segId: p2Array.id, offset: p1Code.size + p1Heap.size + p2Code.size },
  ]

  const compactedEnd = p1Code.size + p1Heap.size + p2Code.size + p2Array.size
  const step6Phys: PhysBlock[] = [
    ...step5Phys,
    { ...p3Code, segId: p3Code.id, offset: compactedEnd },
  ]

  return [
    {
      annotation: "Process P1 is born with three segments: Code (12 KB), Stack (8 KB), and Heap (6 KB). Each segment is its own logical address space starting at 0. They are placed contiguously in physical memory.",
      segments: step0Segs,
      physical: step0Phys,
      physCapacity: PHYS_CAPACITY,
      highlightSeg: undefined,
    },
    {
      annotation: "Process P2 arrives with Code (10 KB), Stack (5 KB), and Array (14 KB). Its segments are placed after P1's, wherever there is room. Total used: 55 KB of 64 KB.",
      segments: step1Segs,
      physical: step1Phys,
      physCapacity: PHYS_CAPACITY,
    },
    {
      annotation: "P1's Stack segment is deallocated (function returned). This leaves an 8 KB gap between P1's Code and Heap. External fragmentation has appeared.",
      segments: step2Segs,
      physical: step2Phys,
      physCapacity: PHYS_CAPACITY,
    },
    {
      annotation: `P2's Stack is also deallocated, creating a second gap of 5 KB. Total free space: ${totalFree} KB (gaps of ${freeInGap1} KB + ${freeInGap2} KB + ${freeAtEnd} KB at end), but no single contiguous region larger than ${Math.max(freeInGap1, freeInGap2, freeAtEnd)} KB.`,
      segments: step3Segs,
      physical: step3Phys,
      physCapacity: PHYS_CAPACITY,
    },
    {
      annotation: "P3 needs an 11 KB Code segment. There are 22 KB free total, but no single gap is large enough! This is external fragmentation — the exact same problem we saw with dynamic partitioning.",
      segments: step4Segs,
      physical: step3Phys,
      physCapacity: PHYS_CAPACITY,
      highlightSeg: "p3-code",
      showFragWarning: true,
    },
    {
      annotation: "Compaction: we shift all segments down to eliminate gaps. P1 Code, P1 Heap, P2 Code, and P2 Array are now contiguous, freeing 22 KB at the end.",
      segments: step5Segs,
      physical: step5Phys,
      physCapacity: PHYS_CAPACITY,
      isCompaction: true,
    },
    {
      annotation: "After compaction, P3's Code segment (11 KB) fits perfectly into the freed contiguous space. Segmentation still needs compaction, just like dynamic partitioning.",
      segments: step4Segs,
      physical: step6Phys,
      physCapacity: PHYS_CAPACITY,
      highlightSeg: "p3-code",
    },
  ]
})()

export function SegmentationDemo({ className }: { className?: string }) {
  const [step, setStep] = useState(0)
  const state = STEPS[step]

  const usedByProcess = (proc: string) =>
    state.segments.filter((s) => s.process === proc)

  const processes = [...new Set(state.segments.map((s) => s.process))]

  const totalUsed = state.physical.reduce((s, b) => s + b.size, 0)
  const totalFree = state.physCapacity - totalUsed

  const gaps: { offset: number; size: number }[] = []
  const sorted = [...state.physical].sort((a, b) => a.offset - b.offset)
  let cursor = 0
  for (const block of sorted) {
    if (block.offset > cursor) {
      gaps.push({ offset: cursor, size: block.offset - cursor })
    }
    cursor = block.offset + block.size
  }
  if (cursor < state.physCapacity) {
    gaps.push({ offset: cursor, size: state.physCapacity - cursor })
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Segmentation — Virtual Dynamic Partitioning</h4>
      <p className="text-xs text-muted-foreground mb-3">
        Each data structure gets its own logical address space (segment). Segments are exactly sized (no internal fragmentation) but external fragmentation still occurs.
      </p>

      {/* Step controls */}
      <div className="flex items-center gap-2 mb-3">
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step <= 0} onClick={() => setStep(step - 1)}>
          ← Prev
        </Button>
        <span className="text-xs text-muted-foreground font-mono">
          Step {step + 1}/{STEPS.length}
        </span>
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step >= STEPS.length - 1} onClick={() => setStep(step + 1)}>
          Next →
        </Button>
      </div>

      {/* Annotation */}
      <div className={cn(
        "mb-4 p-2 rounded text-xs border",
        state.showFragWarning
          ? "border-red-400/30 bg-red-500/5 text-red-700 dark:text-red-300"
          : state.isCompaction
            ? "border-amber-400/30 bg-amber-500/5 text-amber-700 dark:text-amber-300"
            : "border-muted-foreground/15 bg-muted/5 text-muted-foreground"
      )}>
        {state.annotation}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* Logical side: multiple LAS strips */}
        <div>
          <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Logical — Segments
          </div>
          <div className="space-y-2">
            {processes.map((proc) => {
              const segs = usedByProcess(proc)
              return (
                <div key={proc}>
                  <div className="text-[9px] font-semibold text-muted-foreground mb-0.5">{proc}</div>
                  <div className="flex gap-1 flex-wrap">
                    {segs.map((seg) => {
                      const isHighlighted = state.highlightSeg === seg.id
                      const isUnplaced = !state.physical.some((b) => b.segId === seg.id)
                      return (
                        <div
                          key={seg.id}
                          className={cn(
                            "relative rounded border overflow-hidden",
                            isHighlighted && "ring-2 ring-blue-400",
                            isUnplaced && "opacity-50 border-dashed"
                          )}
                          style={{ width: Math.max(40, seg.size * 3), height: 36 }}
                        >
                          <div className={cn("absolute inset-0 opacity-40", seg.color)} />
                          <div className="relative flex flex-col items-center justify-center h-full px-1">
                            <span className="text-[8px] font-bold text-foreground">{seg.label}</span>
                            <span className="text-[7px] text-muted-foreground">{seg.size} KB</span>
                          </div>
                          {isUnplaced && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[8px] text-red-500 font-bold">?</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-2 text-[9px] text-muted-foreground">
            Each segment is its own LAS (starts at address 0)
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center justify-center gap-1 pt-6">
          <div className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold">MMU</div>
          <div className="w-px h-12 border-l-2 border-dashed border-amber-500/40" />
          <div className="text-[9px] text-muted-foreground">maps</div>
          <div className="w-px h-12 border-l-2 border-dashed border-amber-500/40" />
          <div className="text-[9px] text-amber-600 dark:text-amber-400">→</div>
        </div>

        {/* Physical side */}
        <div>
          <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Physical Memory ({state.physCapacity} KB)
          </div>
          <div className="border border-green-400/30 rounded overflow-hidden" style={{ height: 200 }}>
            {(() => {
              const all: { type: "block" | "gap"; data: PhysBlock | { offset: number; size: number } }[] = []
              let c = 0
              for (const block of sorted) {
                if (block.offset > c) {
                  all.push({ type: "gap", data: { offset: c, size: block.offset - c } })
                }
                all.push({ type: "block", data: block })
                c = block.offset + block.size
              }
              if (c < state.physCapacity) {
                all.push({ type: "gap", data: { offset: c, size: state.physCapacity - c } })
              }

              return all.map((item, i) => {
                const heightPct = (item.data.size / state.physCapacity) * 100
                if (item.type === "gap") {
                  const gapData = item.data as { offset: number; size: number }
                  return (
                    <div
                      key={`gap-${i}`}
                      className={cn(
                        "flex items-center justify-center border-b last:border-b-0",
                        state.showFragWarning
                          ? "bg-red-500/10 border-red-400/20"
                          : "bg-muted/5 border-muted-foreground/10"
                      )}
                      style={{ height: `${heightPct}%` }}
                    >
                      <span className={cn(
                        "text-[8px] font-mono",
                        state.showFragWarning ? "text-red-500" : "text-muted-foreground/40"
                      )}>
                        {gapData.size} KB free
                      </span>
                    </div>
                  )
                }
                const block = item.data as PhysBlock
                const isHighlighted = state.highlightSeg === block.segId
                return (
                  <div
                    key={block.segId}
                    className={cn(
                      "relative flex items-center border-b last:border-b-0 overflow-hidden",
                      isHighlighted && "ring-2 ring-green-400 z-10"
                    )}
                    style={{ height: `${heightPct}%` }}
                  >
                    <div className={cn("absolute inset-0 opacity-40", block.color)} />
                    <div className="relative flex items-center w-full h-full px-1.5">
                      <div className={cn("w-4 h-full flex items-center justify-center", block.color, "opacity-70")}>
                        <span className="text-white font-bold text-[7px]">
                          {block.process.replace("P", "")}
                        </span>
                      </div>
                      <div className="flex-1 px-1 flex items-center justify-between">
                        <span className="text-[8px] font-semibold text-green-700 dark:text-green-300">
                          {block.label}
                        </span>
                        <span className="text-[7px] text-muted-foreground font-mono">
                          {block.size} KB
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
        <div className="p-2 rounded bg-blue-500/10 text-center">
          <div className="text-blue-700 dark:text-blue-300">Segments</div>
          <div className="font-mono font-bold text-blue-700 dark:text-blue-300">{state.segments.length}</div>
        </div>
        <div className="p-2 rounded bg-green-500/10 text-center">
          <div className="text-green-700 dark:text-green-300">Used</div>
          <div className="font-mono font-bold text-green-700 dark:text-green-300">{totalUsed} KB</div>
        </div>
        <div className={cn(
          "p-2 rounded text-center",
          gaps.length > 1 ? "bg-red-500/10" : "bg-muted/10"
        )}>
          <div className={gaps.length > 1 ? "text-red-700 dark:text-red-300" : "text-muted-foreground"}>
            Free ({gaps.filter(g => g.size > 0).length} gap{gaps.filter(g => g.size > 0).length !== 1 ? "s" : ""})
          </div>
          <div className={cn("font-mono font-bold", gaps.length > 1 ? "text-red-700 dark:text-red-300" : "text-muted-foreground")}>
            {totalFree} KB
          </div>
        </div>
      </div>
    </div>
  )
}
