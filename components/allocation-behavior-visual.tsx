"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Segment {
  label: string
  size: number
  type: "process" | "free"
  color: string
}

interface AlgSnapshot {
  id: string
  label: string
  shortLabel: string
  annotation: string
  insight: string
  segments: Segment[]
  highlightColor: string
}

const snapshots: AlgSnapshot[] = [
  {
    id: "ff",
    label: "First-Fit",
    shortLabel: "FF",
    annotation: "Natural behavioral sorting",
    insight: "Small processes churn at the front, leaving the back for large, stable processes. The memory self-organizes into a hot zone (fast turnover) and a cold zone (slow turnover) — just like MLFQ naturally sorts by burst length!",
    highlightColor: "border-emerald-500",
    segments: [
      { label: "s1", size: 3, type: "process", color: "bg-rose-400" },
      { label: "", size: 2, type: "free", color: "" },
      { label: "s2", size: 4, type: "process", color: "bg-pink-400" },
      { label: "s3", size: 3, type: "process", color: "bg-orange-400" },
      { label: "", size: 3, type: "free", color: "" },
      { label: "s4", size: 5, type: "process", color: "bg-sky-400" },
      { label: "", size: 2, type: "free", color: "" },
      { label: "BIG-1", size: 25, type: "process", color: "bg-blue-500" },
      { label: "BIG-2", size: 20, type: "process", color: "bg-indigo-500" },
      { label: "", size: 33, type: "free", color: "" },
    ],
  },
  {
    id: "bf",
    label: "Best-Fit",
    shortLabel: "BF",
    annotation: "Creates maximum tiny fragments",
    insight: "By always picking the smallest fitting gap, every allocation leaves a tiny leftover sliver. After many cycles, memory is peppered with unusable 1-2 KB gaps — compaction must handle many more fragments despite each being tiny.",
    highlightColor: "border-red-500",
    segments: [
      { label: "A", size: 12, type: "process", color: "bg-blue-500" },
      { label: "", size: 1, type: "free", color: "" },
      { label: "B", size: 8, type: "process", color: "bg-emerald-500" },
      { label: "", size: 2, type: "free", color: "" },
      { label: "C", size: 15, type: "process", color: "bg-amber-500" },
      { label: "", size: 1, type: "free", color: "" },
      { label: "D", size: 10, type: "process", color: "bg-purple-500" },
      { label: "", size: 1, type: "free", color: "" },
      { label: "E", size: 20, type: "process", color: "bg-rose-500" },
      { label: "", size: 2, type: "free", color: "" },
      { label: "F", size: 14, type: "process", color: "bg-teal-500" },
      { label: "", size: 1, type: "free", color: "" },
      { label: "", size: 13, type: "free", color: "" },
    ],
  },
  {
    id: "wf",
    label: "Worst-Fit",
    shortLabel: "WF",
    annotation: "Preserves large gaps",
    insight: "By always choosing the largest gap, leftover space remains large enough for future processes. Fewer fragments form, but more total space sits unused. Better than BF because compaction handles fewer, bigger gaps.",
    highlightColor: "border-amber-500",
    segments: [
      { label: "A", size: 12, type: "process", color: "bg-blue-500" },
      { label: "B", size: 8, type: "process", color: "bg-emerald-500" },
      { label: "", size: 12, type: "free", color: "" },
      { label: "C", size: 15, type: "process", color: "bg-amber-500" },
      { label: "", size: 18, type: "free", color: "" },
      { label: "D", size: 10, type: "process", color: "bg-purple-500" },
      { label: "", size: 25, type: "free", color: "" },
    ],
  },
  {
    id: "nf",
    label: "Next-Fit",
    shortLabel: "NF",
    annotation: "No gap management",
    insight: "By always scanning from where it left off, gaps are distributed evenly across all of memory. No hot/cold zones emerge, no gap-size optimization occurs. Fast per-allocation but accumulates fragmentation everywhere.",
    highlightColor: "border-blue-500",
    segments: [
      { label: "A", size: 12, type: "process", color: "bg-blue-500" },
      { label: "", size: 6, type: "free", color: "" },
      { label: "B", size: 8, type: "process", color: "bg-emerald-500" },
      { label: "", size: 5, type: "free", color: "" },
      { label: "C", size: 15, type: "process", color: "bg-amber-500" },
      { label: "", size: 7, type: "free", color: "" },
      { label: "D", size: 10, type: "process", color: "bg-purple-500" },
      { label: "", size: 8, type: "free", color: "" },
      { label: "E", size: 14, type: "process", color: "bg-rose-500" },
      { label: "", size: 15, type: "free", color: "" },
    ],
  },
]

export function AllocationBehaviorVisual({ className }: { className?: string }) {
  const [selected, setSelected] = useState("ff")
  const snap = snapshots.find((s) => s.id === selected)!

  const totalSize = snap.segments.reduce((s, seg) => s + seg.size, 0)
  const gaps = snap.segments.filter((s) => s.type === "free")
  const numGaps = gaps.length
  const avgGapSize = numGaps > 0 ? (gaps.reduce((s, g) => s + g.size, 0) / numGaps).toFixed(1) : "0"

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Why Does First-Fit Win? — Allocation Behavior
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Each tab shows what memory looks like after many allocation cycles with that strategy. Notice the gap patterns.
      </p>

      {/* Tab selector */}
      <div className="flex gap-1 mb-4">
        {snapshots.map((s) => (
          <Button
            key={s.id}
            variant={selected === s.id ? "default" : "outline"}
            size="sm"
            className={cn("text-xs h-7", selected === s.id && "bg-violet-600 hover:bg-violet-700")}
            onClick={() => setSelected(s.id)}
          >
            {s.label}
          </Button>
        ))}
      </div>

      {/* Memory strip */}
      <div className={cn("rounded-lg border-2 p-3 transition-all", snap.highlightColor)}>
        <div className="flex h-10 rounded overflow-hidden border mb-2">
          {snap.segments.map((seg, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center justify-center text-[9px] font-mono font-bold border-r last:border-r-0 overflow-hidden",
                seg.type === "process"
                  ? cn(seg.color, "text-white/80 opacity-70")
                  : "bg-red-500/10 text-red-500/50 border-dashed border-red-300/30"
              )}
              style={{ width: `${(seg.size / totalSize) * 100}%` }}
            >
              {(seg.size / totalSize) * 100 > 3 && (
                <span className="truncate px-0.5">{seg.type === "process" ? seg.label : `${seg.size}`}</span>
              )}
            </div>
          ))}
        </div>

        {/* Annotation */}
        <div className="text-sm font-semibold mb-1">{snap.annotation}</div>
        <p className="text-xs text-muted-foreground">{snap.insight}</p>

        {/* Gap stats */}
        <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground">
          <span>Gaps: <span className="font-mono font-bold">{numGaps}</span></span>
          <span>Avg gap size: <span className="font-mono font-bold">{avgGapSize} KB</span></span>
        </div>
      </div>

      {snap.id === "ff" && (
        <div className="mt-3 flex gap-2 text-[10px] text-muted-foreground">
          <div className="flex-1 p-2 rounded border border-rose-400/30 bg-rose-500/5 text-center">
            <div className="font-semibold text-rose-700 dark:text-rose-300">Hot Zone (front)</div>
            Small fast processes churn here
          </div>
          <div className="flex-1 p-2 rounded border border-blue-400/30 bg-blue-500/5 text-center">
            <div className="font-semibold text-blue-700 dark:text-blue-300">Cold Zone (back)</div>
            Large stable processes settle here
          </div>
        </div>
      )}
    </div>
  )
}
