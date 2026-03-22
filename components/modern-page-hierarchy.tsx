"use client"

import { cn } from "@/lib/utils"

const LEVELS = [
  {
    level: 5,
    linux: "P4D",
    windows: "PML5E",
    bits: "57-bit",
    optional: true,
  },
  {
    level: 4,
    linux: "PGD / PML4",
    windows: "PML4E",
    bits: "48-bit",
    optional: false,
  },
  {
    level: 3,
    linux: "PUD",
    windows: "PDPTE",
    bits: "",
    optional: false,
  },
  {
    level: 2,
    linux: "PMD",
    windows: "PDE",
    bits: "",
    optional: false,
  },
  {
    level: 1,
    linux: "PTE",
    windows: "PTE",
    bits: "",
    optional: false,
  },
]

const ANNOTATIONS = [
  {
    icon: "⚙️",
    text: "FS/GS registers: the last vestige of segmentation — used only for thread-local storage",
  },
  {
    icon: "🐧",
    text: "Linux: Transparent Huge Pages automatically promote 4 KB → 2 MB without programmer intervention",
  },
  {
    icon: "🪟",
    text: "Windows: Virtual Address Descriptors (VADs) track committed, reserved, and free virtual regions",
  },
  {
    icon: "💾",
    text: "Both: swap to disk when physical memory is full (Linux swap partition vs. Windows pagefile.sys)",
  },
]

export function ModernPageHierarchy({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Modern Page Table Hierarchy — x86-64</h4>
      <p className="text-xs text-muted-foreground mb-4">
        Both Linux and Windows use the same hardware page table structure on x86-64. The naming differs, but the mechanism is identical — because the hardware dictates it.
      </p>

      {/* Segmentation crossed out */}
      <div className="flex justify-end mb-2">
        <div className="text-[10px] font-bold text-red-500/60 line-through decoration-2 px-2 py-0.5 rounded border border-red-400/20 bg-red-500/5">
          Segmentation
        </div>
      </div>

      {/* Virtual address at top */}
      <div className="text-center mb-3">
        <div className="inline-block px-4 py-2 rounded border border-blue-400/30 bg-blue-500/10">
          <div className="text-[10px] font-semibold text-blue-700 dark:text-blue-300">Virtual Address</div>
          <div className="text-[9px] text-muted-foreground">48-bit (or 57-bit with LA57)</div>
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center mb-1">
        <div className="w-px h-4 bg-muted-foreground/30" />
      </div>

      {/* Hierarchy */}
      <div className="space-y-1 max-w-lg mx-auto mb-3">
        {LEVELS.map((lvl, i) => (
          <div key={lvl.level}>
            <div
              className={cn(
                "grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-2 rounded border",
                lvl.optional
                  ? "border-dashed border-muted-foreground/20 bg-muted/5 opacity-70"
                  : "border-muted-foreground/15 bg-muted/10"
              )}
            >
              {/* Linux name */}
              <div className="text-right">
                <span className="text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300">
                  {lvl.linux}
                </span>
              </div>

              {/* Level label */}
              <div className="text-center">
                <div className="text-[9px] font-semibold text-muted-foreground">
                  Level {lvl.level}
                </div>
                {lvl.optional && (
                  <div className="text-[8px] text-amber-600 dark:text-amber-400">
                    LA57 only
                  </div>
                )}
                {lvl.bits && !lvl.optional && (
                  <div className="text-[8px] text-muted-foreground">
                    {lvl.bits}
                  </div>
                )}
              </div>

              {/* Windows name */}
              <div className="text-left">
                <span className="text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300">
                  {lvl.windows}
                </span>
              </div>
            </div>

            {/* Connector between levels */}
            {i < LEVELS.length - 1 && (
              <div className="flex justify-center">
                <div className="w-px h-2 bg-muted-foreground/20" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Connector to physical */}
      <div className="flex justify-center mb-1">
        <div className="w-px h-4 bg-muted-foreground/30" />
      </div>

      {/* Physical frame */}
      <div className="text-center mb-4">
        <div className="inline-block px-4 py-2 rounded border border-green-400/30 bg-green-500/10">
          <div className="text-[10px] font-semibold text-green-700 dark:text-green-300">Physical Frame + Offset</div>
          <div className="text-[9px] text-muted-foreground">Hardware resolves the final physical address</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mb-4 text-[10px]">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-500/20 border border-blue-400/30" />
          <span className="font-semibold text-blue-700 dark:text-blue-300">Linux</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-purple-500/20 border border-purple-400/30" />
          <span className="font-semibold text-purple-700 dark:text-purple-300">Windows</span>
        </div>
      </div>

      {/* Annotations */}
      <div className="space-y-1.5">
        {ANNOTATIONS.map((a, i) => (
          <div key={i} className="flex items-start gap-2 text-[10px] text-muted-foreground">
            <span className="shrink-0 mt-px">{a.icon}</span>
            <span>{a.text}</span>
          </div>
        ))}
      </div>

      {/* LA57 callout */}
      <div className="mt-3 p-2 rounded border border-amber-400/20 bg-amber-500/5 text-[10px] text-amber-700 dark:text-amber-300">
        <span className="font-bold">Intel LA57 extension:</span> Adds a 5th level of page tables, extending virtual addressing from 48 bits to 57 bits. This expands the addressable virtual space from 256 TiB to 128 PiB — but both Linux and Windows must opt in at boot time.
      </div>
    </div>
  )
}
