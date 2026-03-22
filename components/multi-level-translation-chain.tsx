"use client"

import { cn } from "@/lib/utils"

const SPLIT = [4, 3, 2, 3] as const
const OFFSET_BITS = 4
const TOTAL_BITS = 16

const LEVEL_COLORS = [
  { bg: "bg-blue-600/20", text: "text-blue-700 dark:text-blue-300", border: "border-blue-500/40", ring: "ring-blue-400" },
  { bg: "bg-sky-500/20", text: "text-sky-700 dark:text-sky-300", border: "border-sky-400/40", ring: "ring-sky-400" },
  { bg: "bg-cyan-500/20", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-400/40", ring: "ring-cyan-400" },
  { bg: "bg-teal-500/20", text: "text-teal-700 dark:text-teal-300", border: "border-teal-400/40", ring: "ring-teal-400" },
]

const SAMPLE_LOGICAL = 0b1010_011_01_101_1001
const SAMPLE_VALUES = [
  (SAMPLE_LOGICAL >> 12) & 0xF,
  (SAMPLE_LOGICAL >> 9) & 0x7,
  (SAMPLE_LOGICAL >> 7) & 0x3,
  (SAMPLE_LOGICAL >> 4) & 0x7,
]
const SAMPLE_OFFSET = SAMPLE_LOGICAL & 0xF
const SAMPLE_FRAME = 5

function toBin(val: number, bits: number) {
  return val.toString(2).padStart(bits, "0")
}

function TableVis({
  level,
  bits,
  activeIndex,
  totalEntries,
}: {
  level: number
  bits: number
  activeIndex: number
  totalEntries: number
}) {
  const color = LEVEL_COLORS[level]
  const maxShow = Math.min(totalEntries, 16)
  const showEllipsis = totalEntries > maxShow

  return (
    <div className="flex-1 min-w-0">
      <div className={cn("text-[9px] font-semibold mb-0.5", color.text)}>
        L{level + 1} Table ({totalEntries} rows)
      </div>
      <div className={cn("border rounded overflow-hidden", color.border)}>
        {Array.from({ length: maxShow }).map((_, i) => {
          const isActive = i === activeIndex
          return (
            <div
              key={i}
              className={cn(
                "h-4 flex items-center justify-between px-1 text-[7px] font-mono border-b last:border-b-0 transition-all",
                isActive
                  ? cn(color.bg, "ring-1", color.ring, "font-bold relative z-10")
                  : "bg-muted/5 opacity-30"
              )}
            >
              <span className={isActive ? color.text : "text-muted-foreground"}>
                {toBin(i, bits)}
              </span>
              {isActive && (
                <span className={cn("text-[7px]", color.text)}>
                  {level < 3 ? "→" : `f${SAMPLE_FRAME}`}
                </span>
              )}
            </div>
          )
        })}
        {showEllipsis && (
          <div className="h-3 flex items-center justify-center text-[7px] text-muted-foreground/40">
            ⋮
          </div>
        )}
      </div>
    </div>
  )
}

export function MultiLevelTranslationChain({ className }: { className?: string }) {
  const logicalBits = toBin(SAMPLE_LOGICAL, TOTAL_BITS)
  const physicalBits = toBin((SAMPLE_FRAME << OFFSET_BITS) | SAMPLE_OFFSET, TOTAL_BITS)

  let bitPos = 0
  const bitSegments: { level: number; start: number; end: number }[] = []
  for (let i = 0; i < SPLIT.length; i++) {
    bitSegments.push({ level: i, start: bitPos, end: bitPos + SPLIT[i] })
    bitPos += SPLIT[i]
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Multi-Level Translation — Walking 4 Tables</h4>
      <p className="text-xs text-muted-foreground mb-3">
        A single logical address walks through 4 chained page tables. Only one row per table is consulted — the rest can stay on storage.
      </p>

      {/* Logical address */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold text-muted-foreground mb-0.5">
          Logical Address: 0x{SAMPLE_LOGICAL.toString(16).toUpperCase().padStart(4, "0")}
        </div>
        <div className="flex">
          {logicalBits.split("").map((bit, i) => {
            const seg = bitSegments.find((s) => i >= s.start && i < s.end)
            const isOffset = !seg
            const style = seg ? LEVEL_COLORS[seg.level] : { bg: "bg-muted/15", text: "text-muted-foreground", border: "border-muted-foreground/20" }
            return (
              <div
                key={i}
                className={cn(
                  "w-6 h-7 flex items-center justify-center border text-[10px] font-mono font-bold",
                  style.bg, style.text, style.border
                )}
              >
                {bit}
              </div>
            )
          })}
        </div>
        <div className="flex mt-0.5">
          {bitSegments.map((seg) => (
            <div
              key={seg.level}
              style={{ width: `${(SPLIT[seg.level] / TOTAL_BITS) * 100}%` }}
              className={cn("text-center text-[8px] font-semibold", LEVEL_COLORS[seg.level].text)}
            >
              L{seg.level + 1}: {toBin(SAMPLE_VALUES[seg.level], SPLIT[seg.level])} ({SAMPLE_VALUES[seg.level]})
            </div>
          ))}
          <div
            style={{ width: `${(OFFSET_BITS / TOTAL_BITS) * 100}%` }}
            className="text-center text-[8px] text-muted-foreground"
          >
            off: {SAMPLE_OFFSET}
          </div>
        </div>
      </div>

      {/* Table chain */}
      <div className="flex items-start gap-2 mb-3">
        {SPLIT.map((bits, level) => (
          <div key={level} className="flex items-start gap-1 flex-1 min-w-0">
            <TableVis
              level={level}
              bits={bits}
              activeIndex={SAMPLE_VALUES[level]}
              totalEntries={1 << bits}
            />
            {level < SPLIT.length - 1 && (
              <div className="flex flex-col items-center justify-center pt-6 shrink-0">
                <div className="w-4 border-t border-dashed border-muted-foreground/30" />
                <span className="text-[7px] text-muted-foreground">→</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Physical address result */}
      <div className="mb-3">
        <div className="text-[10px] font-semibold text-green-700 dark:text-green-300 mb-0.5">
          Physical Address: 0x{((SAMPLE_FRAME << OFFSET_BITS) | SAMPLE_OFFSET).toString(16).toUpperCase().padStart(4, "0")}
        </div>
        <div className="flex">
          {physicalBits.split("").map((bit, i) => {
            const isFrameBit = i < (TOTAL_BITS - OFFSET_BITS)
            return (
              <div
                key={i}
                className={cn(
                  "w-6 h-7 flex items-center justify-center border text-[10px] font-mono font-bold",
                  isFrameBit
                    ? "bg-green-500/20 text-green-700 dark:text-green-300 border-green-400/40"
                    : "bg-muted/15 text-muted-foreground border-muted-foreground/20"
                )}
              >
                {bit}
              </div>
            )
          })}
        </div>
        <div className="flex mt-0.5">
          <div style={{ width: `${((TOTAL_BITS - OFFSET_BITS) / TOTAL_BITS) * 100}%` }} className="text-center text-[8px] font-semibold text-green-700 dark:text-green-300">
            Frame {SAMPLE_FRAME}
          </div>
          <div style={{ width: `${(OFFSET_BITS / TOTAL_BITS) * 100}%` }} className="text-center text-[8px] text-muted-foreground">
            Offset {SAMPLE_OFFSET} (preserved)
          </div>
        </div>
      </div>

      {/* Callout */}
      <div className="p-2 rounded border border-amber-400/30 bg-amber-500/5 text-[10px] text-amber-700 dark:text-amber-300">
        <span className="font-bold">Only 4 tables consulted per translation.</span>{" "}
        Each level has many possible tables (L2 alone could have up to {(1 << SPLIT[0]).toLocaleString()} different tables, one for each L1 entry),
        but a single translation only follows <strong>one chain</strong> of 4 tables. The other tables at each level do not need to be in memory — they can stay on storage until a page fault forces them in.
      </div>
    </div>
  )
}
