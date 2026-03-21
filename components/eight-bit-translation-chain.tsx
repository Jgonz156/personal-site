"use client"

import { cn } from "@/lib/utils"

const PAGE_BITS = 3
const OFFSET_BITS = 5
const TOTAL_PAGES = 8
const LINES_PER_PAGE = 32

const PAGE_TABLE: { page: number; frame: number | null }[] = [
  { page: 0, frame: null },
  { page: 1, frame: 0 },
  { page: 2, frame: null },
  { page: 3, frame: null },
  { page: 4, frame: null },
  { page: 5, frame: 1 },
  { page: 6, frame: null },
  { page: 7, frame: null },
]

const SAMPLE_PAGE = 5
const SAMPLE_OFFSET = 10
const SAMPLE_LOGICAL = (SAMPLE_PAGE << OFFSET_BITS) | SAMPLE_OFFSET
const SAMPLE_FRAME = 1
const SAMPLE_PHYSICAL_6BIT = (SAMPLE_FRAME << OFFSET_BITS) | SAMPLE_OFFSET

function toBin(val: number, bits: number) {
  return val.toString(2).padStart(bits, "0")
}

const PAGE_COLORS = [
  "bg-blue-500/15",
  "bg-blue-400/15",
  "bg-blue-500/20",
  "bg-blue-400/10",
  "bg-blue-500/15",
  "bg-blue-400/15",
  "bg-blue-500/20",
  "bg-blue-400/10",
]

function BitRow({
  bits,
  pageBitCount,
  isPhysical,
  label,
}: {
  bits: string
  pageBitCount: number
  isPhysical: boolean
  label: string
}) {
  return (
    <div>
      <div className="text-[9px] font-semibold text-muted-foreground mb-0.5">{label}</div>
      <div className="flex">
        {bits.split("").map((b, i) => {
          const isPageBit = i < pageBitCount
          return (
            <div
              key={i}
              className={cn(
                "w-7 h-7 flex items-center justify-center border text-[11px] font-mono font-bold",
                isPageBit
                  ? isPhysical
                    ? "bg-green-500/20 text-green-700 dark:text-green-300 border-green-400/40"
                    : "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-400/40"
                  : "bg-muted/15 text-muted-foreground border-muted-foreground/20"
              )}
            >
              {b}
            </div>
          )
        })}
      </div>
      <div className="flex mt-px">
        <div
          style={{ width: `${(pageBitCount / bits.length) * 100}%` }}
          className={cn(
            "text-center text-[8px] font-semibold",
            isPhysical ? "text-green-700 dark:text-green-300" : "text-blue-700 dark:text-blue-300"
          )}
        >
          {isPhysical ? `frame ${SAMPLE_FRAME}` : `page ${SAMPLE_PAGE}`}
        </div>
        <div
          style={{ width: `${((bits.length - pageBitCount) / bits.length) * 100}%` }}
          className="text-center text-[8px] text-muted-foreground"
        >
          offset {SAMPLE_OFFSET}
        </div>
      </div>
    </div>
  )
}

export function EightBitTranslationChain({ className }: { className?: string }) {
  const logicalBits = toBin(SAMPLE_LOGICAL, 8)
  const physicalBits = toBin(SAMPLE_PHYSICAL_6BIT, 6)
  const frameBits = 1

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Full Translation — 8-Bit System with 3 Page Bits</h4>
      <p className="text-xs text-muted-foreground mb-4">
        Starting from the 3-bit page scenario (8 pages, 32 lines each), we choose a physical memory size, build the page table, and translate a logical address end-to-end.
      </p>

      {/* Row 1: LAS + Frame Sizing */}
      <div className="grid grid-cols-[140px_1fr] gap-4 mb-5">
        {/* LAS */}
        <div>
          <div className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Logical Address Space
          </div>
          <div className="border border-blue-400/30 rounded overflow-hidden">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-between px-1.5 h-6 border-b last:border-b-0 text-[8px] font-mono",
                  PAGE_COLORS[i],
                  i === SAMPLE_PAGE && "ring-2 ring-blue-400 relative z-10"
                )}
              >
                <span className="font-bold text-blue-700 dark:text-blue-300">
                  {toBin(i, 3)}
                </span>
                <span className="text-muted-foreground">
                  {i * LINES_PER_PAGE}–{(i + 1) * LINES_PER_PAGE - 1}
                </span>
              </div>
            ))}
          </div>
          <div className="text-[8px] text-muted-foreground text-center mt-0.5">8 pages × 32 lines</div>
        </div>

        {/* Frame sizing comparison */}
        <div>
          <div className="text-[10px] font-semibold text-green-700 dark:text-green-300 mb-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Physical Memory — Which Size Works?
          </div>
          <div className="text-[10px] text-muted-foreground mb-2">
            Each frame must be {LINES_PER_PAGE} bytes (same as a page). How many frames can each memory size hold?
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* 16 bytes */}
            <div className="rounded border border-red-400/30 bg-red-500/5 p-2 opacity-60">
              <div className="text-[10px] font-semibold text-red-700 dark:text-red-300 text-center">16 bytes</div>
              <div className="text-[9px] text-center text-muted-foreground mt-0.5">
                2<sup>4</sup> = 16
              </div>
              <div className="border border-red-400/20 rounded h-8 mt-1 flex items-center justify-center">
                <span className="text-[8px] text-red-500 font-mono">16 &lt; 32</span>
              </div>
              <div className="text-[8px] text-red-600 dark:text-red-400 text-center mt-1 font-semibold">
                ✗ Too small for even 1 frame
              </div>
            </div>

            {/* 32 bytes */}
            <div className="rounded border border-muted-foreground/20 bg-muted/5 p-2">
              <div className="text-[10px] font-semibold text-muted-foreground text-center">32 bytes</div>
              <div className="text-[9px] text-center text-muted-foreground mt-0.5">
                2<sup>5</sup> = 32
              </div>
              <div className="border border-green-400/30 rounded mt-1 overflow-hidden">
                <div className="h-8 bg-green-500/15 flex items-center justify-center text-[8px] font-mono text-green-700 dark:text-green-300">
                  frame 0
                </div>
              </div>
              <div className="text-[8px] text-muted-foreground text-center mt-1">
                Exactly 1 frame
              </div>
            </div>

            {/* 64 bytes — chosen */}
            <div className="rounded border-2 border-green-400/60 bg-green-500/5 p-2 ring-1 ring-green-400/30">
              <div className="text-[10px] font-semibold text-green-700 dark:text-green-300 text-center">64 bytes ✓</div>
              <div className="text-[9px] text-center text-muted-foreground mt-0.5">
                2<sup>6</sup> = 64
              </div>
              <div className="border border-green-400/30 rounded mt-1 overflow-hidden">
                <div className="h-4 bg-green-500/15 flex items-center justify-center text-[8px] font-mono text-green-700 dark:text-green-300 border-b border-green-400/20">
                  frame 0
                </div>
                <div className="h-4 bg-green-500/20 flex items-center justify-center text-[8px] font-mono text-green-700 dark:text-green-300">
                  frame 1
                </div>
              </div>
              <div className="text-[8px] text-green-700 dark:text-green-300 text-center mt-1 font-semibold">
                2 frames — we go with this
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Page Table + Translation Example */}
      <div className="grid grid-cols-[180px_1fr] gap-4">
        {/* Page Table */}
        <div>
          <div className="text-[10px] font-semibold text-muted-foreground mb-1">Page Table (8 rows)</div>
          <div className="border rounded overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_1fr] text-[8px] font-bold bg-muted/20 px-1.5 py-0.5 border-b">
              <span className="text-blue-700 dark:text-blue-300">Page</span>
              <span />
              <span className="text-green-700 dark:text-green-300 text-right">Frame</span>
            </div>
            {PAGE_TABLE.map((row) => {
              const isActive = row.page === SAMPLE_PAGE
              return (
                <div
                  key={row.page}
                  className={cn(
                    "grid grid-cols-[1fr_auto_1fr] text-[9px] font-mono px-1.5 py-1 border-b last:border-b-0",
                    isActive && row.frame !== null && "bg-green-500/10 ring-1 ring-green-400",
                    isActive && row.frame === null && "bg-red-500/10 ring-1 ring-red-400"
                  )}
                >
                  <span className="text-blue-700 dark:text-blue-300 font-bold">{toBin(row.page, 3)}</span>
                  <span className="text-muted-foreground px-1">→</span>
                  {row.frame !== null ? (
                    <span className="text-green-700 dark:text-green-300 font-bold text-right">
                      {toBin(row.frame, frameBits)} (f{row.frame})
                    </span>
                  ) : (
                    <span className="text-red-500 text-right text-[8px]">✗ fault</span>
                  )}
                </div>
              )
            })}
          </div>
          <div className="text-[8px] text-muted-foreground mt-1">
            Only 2 of 8 pages are loaded — the rest trigger page faults
          </div>
        </div>

        {/* Translation Example */}
        <div>
          <div className="text-[10px] font-semibold text-muted-foreground mb-1">Translation Example</div>

          <div className="space-y-3">
            {/* Step 1: Logical address */}
            <div className="p-2 rounded bg-blue-500/5 border border-blue-400/20">
              <div className="text-[9px] text-blue-700 dark:text-blue-300 font-semibold mb-1">
                ① Logical address arrives (8 bits)
              </div>
              <BitRow bits={logicalBits} pageBitCount={PAGE_BITS} isPhysical={false} label={`Logical: 0x${SAMPLE_LOGICAL.toString(16).toUpperCase().padStart(2, "0")} (decimal ${SAMPLE_LOGICAL})`} />
            </div>

            {/* Step 2: Page table lookup */}
            <div className="flex items-center gap-2 px-2">
              <div className="text-[9px] text-muted-foreground">
                Page bits <span className="font-mono font-bold text-blue-700 dark:text-blue-300">{toBin(SAMPLE_PAGE, 3)}</span> →
                page table lookup → frame <span className="font-mono font-bold text-green-700 dark:text-green-300">{toBin(SAMPLE_FRAME, frameBits)}</span>
              </div>
              <div className="flex-1 border-t border-dashed border-amber-500/40" />
              <span className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold">swap bits</span>
            </div>

            {/* Step 3: Physical address */}
            <div className="p-2 rounded bg-green-500/5 border border-green-400/20">
              <div className="text-[9px] text-green-700 dark:text-green-300 font-semibold mb-1">
                ② Physical address produced (6 bits)
              </div>
              <BitRow bits={physicalBits} pageBitCount={frameBits} isPhysical={true} label={`Physical: 0x${SAMPLE_PHYSICAL_6BIT.toString(16).toUpperCase().padStart(2, "0")} (decimal ${SAMPLE_PHYSICAL_6BIT})`} />
            </div>

            {/* Offset preservation highlight */}
            <div className="p-2 rounded border border-amber-400/30 bg-amber-500/5 text-[10px] text-amber-700 dark:text-amber-300">
              <span className="font-semibold">Offset preserved:</span>{" "}
              the lower {OFFSET_BITS} bits (<span className="font-mono">{toBin(SAMPLE_OFFSET, OFFSET_BITS)}</span> = {SAMPLE_OFFSET})
              are identical in both addresses. Only the upper page bits were replaced with frame bits.
            </div>
          </div>
        </div>
      </div>

      {/* Final callout */}
      <div className="mt-4 p-3 rounded border border-green-400/30 bg-green-500/5 text-xs">
        <span className="font-bold text-green-700 dark:text-green-300">Why is the physical address only 6 bits?</span>{" "}
        <span className="text-muted-foreground">
          Because 64 bytes of memory only needs 6 bits to address (2<sup>6</sup> = 64).
          We replaced 3 page bits with just 1 frame bit (since 2 frames need only 1 bit).
          The {OFFSET_BITS} offset bits pass through unchanged.
          Physical address = {frameBits} frame bit + {OFFSET_BITS} offset bits = {frameBits + OFFSET_BITS} bits.
          This is the whole point — the logical address space (256 addresses) is <strong>larger</strong> than the physical address space (64 addresses), and the page table bridges the gap.
        </span>
      </div>
    </div>
  )
}
