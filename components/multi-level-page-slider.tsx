"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

const TOTAL_BITS = 16
const NUM_LEVELS = 4
const MIN_OFFSET = 1
const MIN_LEVEL_BITS = 1

const LEVEL_COLORS = [
  { bg: "bg-blue-600/20", text: "text-blue-700 dark:text-blue-300", border: "border-blue-500/40", label: "L1 (Outer)" },
  { bg: "bg-sky-500/20", text: "text-sky-700 dark:text-sky-300", border: "border-sky-400/40", label: "L2" },
  { bg: "bg-cyan-500/20", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-400/40", label: "L3" },
  { bg: "bg-teal-500/20", text: "text-teal-700 dark:text-teal-300", border: "border-teal-400/40", label: "L4 (Inner)" },
]

const OFFSET_STYLE = {
  bg: "bg-muted/15",
  text: "text-muted-foreground",
  border: "border-muted-foreground/20",
}

function getDefaultLevels(): number[] {
  return [4, 3, 2, 3]
}

export function MultiLevelPageSlider({ className }: { className?: string }) {
  const [levels, setLevels] = useState(getDefaultLevels)
  const offsetBits = TOTAL_BITS - levels.reduce((a, b) => a + b, 0)
  const totalPageBits = levels.reduce((a, b) => a + b, 0)

  const canIncrement = (idx: number) => offsetBits > MIN_OFFSET
  const canDecrement = (idx: number) => levels[idx] > MIN_LEVEL_BITS

  const increment = (idx: number) => {
    if (!canIncrement(idx)) return
    setLevels((prev) => prev.map((v, i) => (i === idx ? v + 1 : v)))
  }

  const decrement = (idx: number) => {
    if (!canDecrement(idx)) return
    setLevels((prev) => prev.map((v, i) => (i === idx ? v - 1 : v)))
  }

  const reset = () => setLevels(getDefaultLevels())

  const stats = useMemo(() => {
    const perLevel = levels.map((bits) => ({
      bits,
      entries: 1 << bits,
    }))

    const singleLevelEntries = 1 << totalPageBits
    const singleLevelBytes = singleLevelEntries * 2

    let multiLevelTotal = 0
    let cumulativeProduct = 1
    const perLevelPopulated = perLevel.map((l) => {
      const tablesAtThisLevel = cumulativeProduct
      const entriesPerTable = l.entries
      const totalEntries = tablesAtThisLevel * entriesPerTable
      multiLevelTotal += totalEntries
      cumulativeProduct *= entriesPerTable
      return { ...l, tablesAtThisLevel, totalEntries }
    })

    const chainEntries = perLevel.reduce((s, l) => s + l.entries, 0)
    const chainBytes = chainEntries * 2

    return {
      perLevel: perLevelPopulated,
      singleLevelEntries,
      singleLevelBytes,
      multiLevelTotal,
      multiLevelBytes: multiLevelTotal * 2,
      chainEntries,
      chainBytes,
    }
  }, [levels, totalPageBits])

  let bitPosition = 0
  const segments: { level: number; startBit: number; endBit: number }[] = []
  for (let i = 0; i < NUM_LEVELS; i++) {
    segments.push({ level: i, startBit: bitPosition, endBit: bitPosition + levels[i] })
    bitPosition += levels[i]
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Multi-Level Page Table — Bit Allocation</h4>
      <p className="text-xs text-muted-foreground mb-3">
        Divide a 16-bit instruction&apos;s page-identifier bits across 4 levels of tables. Adjust how many bits each level gets and compare to a single-level table.
      </p>

      {/* 16-bit instruction display */}
      <div className="mb-4">
        <div className="text-[10px] font-semibold text-muted-foreground mb-1">16-bit instruction</div>
        <div className="flex">
          {Array.from({ length: TOTAL_BITS }).map((_, i) => {
            const seg = segments.find((s) => i >= s.startBit && i < s.endBit)
            const isOffset = !seg
            const style = seg ? LEVEL_COLORS[seg.level] : OFFSET_STYLE
            return (
              <div
                key={i}
                className={cn(
                  "w-7 h-9 flex items-center justify-center border text-[11px] font-mono font-bold",
                  style.bg,
                  style.text,
                  style.border
                )}
              >
                {seg ? `L${seg.level + 1}` : "O"}
              </div>
            )
          })}
        </div>
        <div className="flex mt-0.5">
          {segments.map((seg) => (
            <div
              key={seg.level}
              style={{ width: `${(levels[seg.level] / TOTAL_BITS) * 100}%` }}
              className={cn("text-center text-[8px] font-semibold", LEVEL_COLORS[seg.level].text)}
            >
              {levels[seg.level]}b
            </div>
          ))}
          <div
            style={{ width: `${(offsetBits / TOTAL_BITS) * 100}%` }}
            className="text-center text-[8px] text-muted-foreground"
          >
            {offsetBits}b offset
          </div>
        </div>
      </div>

      {/* Per-level controls and stats */}
      <div className="space-y-1.5 mb-4">
        {stats.perLevel.map((level, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={cn("w-20 text-[10px] font-semibold shrink-0", LEVEL_COLORS[i].text)}>
              {LEVEL_COLORS[i].label}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0 text-xs"
              disabled={!canDecrement(i)}
              onClick={() => decrement(i)}
            >
              −
            </Button>
            <div className={cn(
              "w-8 text-center font-mono font-bold text-sm",
              LEVEL_COLORS[i].text
            )}>
              {level.bits}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0 text-xs"
              disabled={!canIncrement(i)}
              onClick={() => increment(i)}
            >
              +
            </Button>
            <div className="flex-1 text-[10px] text-muted-foreground">
              2<sup>{level.bits}</sup> = {level.entries.toLocaleString()} entries/table
              {level.tablesAtThisLevel > 1 && (
                <span className="ml-1">
                  × {level.tablesAtThisLevel.toLocaleString()} tables = {level.totalEntries.toLocaleString()} entries total
                </span>
              )}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-20 text-[10px] font-semibold text-muted-foreground shrink-0">Offset</div>
          <div className="w-[calc(1.5rem+0.5rem+2rem+0.5rem+1.5rem)]" />
          <div className="flex-1 text-[10px] text-muted-foreground">
            {offsetBits} bits → 2<sup>{offsetBits}</sup> = {(1 << offsetBits).toLocaleString()} addresses/page
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="sm" className="text-xs h-7" onClick={reset}>
          Reset to 4|3|2|3|4
        </Button>
        <span className="text-[10px] text-muted-foreground">
          Page bits: {levels.join(" + ")} = {totalPageBits} | Offset: {offsetBits}
        </span>
      </div>

      {/* Comparison table */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded border border-blue-400/20 bg-blue-500/5">
          <div className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 mb-1">Single-Level Table</div>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <div>
              2<sup>{totalPageBits}</sup> = <span className="font-mono font-bold text-foreground">{stats.singleLevelEntries.toLocaleString()}</span> entries
            </div>
            <div>
              At 2 bytes/entry: <span className="font-mono font-bold text-foreground">{stats.singleLevelBytes.toLocaleString()} bytes</span>
              {stats.singleLevelBytes >= 1024 && (
                <span> ({(stats.singleLevelBytes / 1024).toFixed(1)} KiB)</span>
              )}
            </div>
            <div className="text-amber-700 dark:text-amber-300 font-semibold mt-1">
              All entries must be in memory
            </div>
          </div>
        </div>

        <div className="p-3 rounded border border-green-400/20 bg-green-500/5">
          <div className="text-[10px] font-semibold text-green-700 dark:text-green-300 mb-1">Multi-Level (fully populated)</div>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <div>
              <span className="font-mono font-bold text-foreground">{stats.multiLevelTotal.toLocaleString()}</span> total entries
            </div>
            <div>
              At 2 bytes/entry: <span className="font-mono font-bold text-foreground">{stats.multiLevelBytes.toLocaleString()} bytes</span>
              {stats.multiLevelBytes >= 1024 && (
                <span> ({(stats.multiLevelBytes / 1024).toFixed(1)} KiB)</span>
              )}
            </div>
            <div className="text-green-700 dark:text-green-300 font-semibold mt-1">
              Min. resident per chain: <span className="font-mono">{stats.chainEntries}</span> entries ({stats.chainBytes} bytes)
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-3 p-2 rounded border border-green-400/30 bg-green-500/5 text-[10px] text-green-700 dark:text-green-300">
        <span className="font-bold">Key insight:</span> Fully populated, multi-level uses{" "}
        <strong>{stats.multiLevelTotal > stats.singleLevelEntries ? "more" : "fewer"}</strong>{" "}
        total entries ({stats.multiLevelTotal.toLocaleString()} vs {stats.singleLevelEntries.toLocaleString()}) due to intermediate tables.
        But only <strong>{stats.chainEntries} entries ({stats.chainBytes} bytes)</strong> need to be in memory per translation chain — the rest can stay on storage.
        Single-level demands all {stats.singleLevelBytes.toLocaleString()} bytes resident at all times.
      </div>
    </div>
  )
}
