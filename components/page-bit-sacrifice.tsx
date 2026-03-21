"use client"

import { cn } from "@/lib/utils"

const SCENARIOS = [
  {
    pageBits: 1,
    offsetBits: 7,
    pages: 2,
    linesPerPage: 128,
    annotation:
      "Sacrificing 1 bit gives us 2 pages: 0 and 1. Each page holds 2⁷ = 128 lines. The split falls at line 127→128 because seven 1s in a row in binary (1111111) equals 127 — one less than 2⁷. When the offset overflows past 127, it carries into the page bit, flipping us from page 0 to page 1.",
    pageLabels: ["0", "1"],
  },
  {
    pageBits: 2,
    offsetBits: 6,
    pages: 4,
    linesPerPage: 64,
    annotation:
      "Sacrificing 2 bits gives us 4 pages: 00, 01, 10, 11. Each page holds 2⁶ = 64 lines. The offset resets to 000000 at every page boundary because the carry rolls into the page bits — the offset is always 0-indexed within its page.",
    pageLabels: ["00", "01", "10", "11"],
  },
  {
    pageBits: 3,
    offsetBits: 5,
    pages: 8,
    linesPerPage: 32,
    annotation:
      "Sacrificing 3 bits gives us 8 pages: 000 through 111. Each page holds 2⁵ = 32 lines. The upper 3 bits tell you which page; the lower 5 bits tell you exactly where within that page. This is where we will build our full example.",
    pageLabels: ["000", "001", "010", "011", "100", "101", "110", "111"],
  },
]

const PAGE_COLORS = [
  "bg-blue-500/20 border-blue-400/40",
  "bg-blue-400/20 border-blue-300/40",
  "bg-blue-500/25 border-blue-400/50",
  "bg-blue-400/15 border-blue-300/30",
  "bg-blue-500/20 border-blue-400/40",
  "bg-blue-400/20 border-blue-300/40",
  "bg-blue-500/25 border-blue-400/50",
  "bg-blue-400/15 border-blue-300/30",
]

function InstructionBits({ pageBits }: { pageBits: number }) {
  const offsetBits = 8 - pageBits
  return (
    <div>
      <div className="flex">
        {Array.from({ length: 8 }).map((_, i) => {
          const isPage = i < pageBits
          return (
            <div
              key={i}
              className={cn(
                "w-9 h-9 flex items-center justify-center border text-xs font-mono font-bold",
                isPage
                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-400/40"
                  : "bg-muted/15 text-muted-foreground border-muted-foreground/20"
              )}
            >
              {isPage ? "P" : "O"}
            </div>
          )
        })}
      </div>
      <div className="flex mt-0.5">
        <div
          style={{ width: `${(pageBits / 8) * 100}%` }}
          className="text-center text-[9px] font-semibold text-blue-700 dark:text-blue-300"
        >
          {pageBits} page bit{pageBits > 1 ? "s" : ""}
        </div>
        <div
          style={{ width: `${(offsetBits / 8) * 100}%` }}
          className="text-center text-[9px] text-muted-foreground"
        >
          {offsetBits} offset bits
        </div>
      </div>
    </div>
  )
}

function LASStrip({ pages, linesPerPage, pageLabels }: { pages: number; linesPerPage: number; pageLabels: string[] }) {
  const totalHeight = 220
  const pageHeight = totalHeight / pages

  return (
    <div className="border border-blue-400/30 rounded overflow-hidden" style={{ height: totalHeight }}>
      {Array.from({ length: pages }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center justify-between px-1.5 border-b last:border-b-0",
            PAGE_COLORS[i % PAGE_COLORS.length]
          )}
          style={{ height: pageHeight }}
        >
          <span className="text-[8px] font-mono font-bold text-blue-700 dark:text-blue-300">
            {pageLabels[i]}
          </span>
          <span className="text-[7px] font-mono text-muted-foreground">
            {i * linesPerPage}–{(i + 1) * linesPerPage - 1}
          </span>
        </div>
      ))}
    </div>
  )
}

export function PageBitSacrifice({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Page Bit Sacrifice — Dividing the Logical Address Space</h4>
      <p className="text-xs text-muted-foreground mb-1">
        An 8-bit system can reference 2<sup>8</sup> = 256 logical addresses — its entire logical address space.
        Watch how sacrificing upper bits to create a page identifier progressively divides this space.
      </p>

      {/* 8-bit = 256 addresses intro */}
      <div className="mb-4 p-2 rounded bg-blue-500/5 border border-blue-400/20 text-xs text-blue-700 dark:text-blue-300">
        <span className="font-semibold">8-bit instruction</span> → addresses 0 to 255 → <span className="font-semibold">256 total logical addresses</span> (the full LAS)
      </div>

      <div className="space-y-5">
        {SCENARIOS.map((s, si) => (
          <div key={si} className="border border-blue-400/20 rounded-lg p-3 bg-blue-500/[0.02]">
            <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Sacrifice {s.pageBits} bit{s.pageBits > 1 ? "s" : ""} → {s.pages} pages of {s.linesPerPage} lines each
            </div>

            <div className="grid grid-cols-[1fr_120px] gap-3 items-start">
              {/* Left: Instruction + stats + annotation stacked */}
              <div>
                <div className="text-[9px] text-muted-foreground mb-1 font-semibold">Instruction</div>
                <InstructionBits pageBits={s.pageBits} />
                <div className="flex gap-3 mt-1.5 text-[9px] text-muted-foreground">
                  <span>2<sup>{s.pageBits}</sup> = {s.pages} pages</span>
                  <span>2<sup>{s.offsetBits}</sup> = {s.linesPerPage} lines/page</span>
                </div>
                <div className="mt-2 text-[10px] text-muted-foreground leading-relaxed">
                  {s.annotation}
                </div>
              </div>

              {/* Right: LAS strip */}
              <div>
                <div className="text-[9px] text-muted-foreground mb-1 font-semibold text-center">LAS (256 lines)</div>
                <LASStrip pages={s.pages} linesPerPage={s.linesPerPage} pageLabels={s.pageLabels} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key takeaway */}
      <div className="mt-4 p-3 rounded border border-blue-400/30 bg-blue-500/5 text-xs text-blue-700 dark:text-blue-300">
        <span className="font-bold">Key takeaway:</span> The upper page-identifier bits tell you <strong>how many</strong> pages you get.
        The lower payload/offset bits tell you the <strong>exact size</strong> of each page.
        Together they always account for all 8 bits — and therefore all 256 addresses.
      </div>
    </div>
  )
}
