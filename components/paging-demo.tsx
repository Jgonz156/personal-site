"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface Process {
  name: string
  size: number
  color: string
}

const PROCESSES: Process[] = [
  { name: "P1", size: 38, color: "bg-blue-500" },
  { name: "P2", size: 12, color: "bg-emerald-500" },
  { name: "P3", size: 25, color: "bg-amber-500" },
  { name: "P4", size: 9, color: "bg-purple-500" },
]

const LOGICAL_TOTAL = 128
const PHYSICAL_STRIPS = [
  { label: "RAM", totalFrames: 8, tier: "primary" as const },
  { label: "Cache", totalFrames: 2, tier: "fast" as const },
  { label: "Swap / HDD", totalFrames: 6, tier: "slow" as const },
]

interface PageEntry {
  processName: string
  processColor: string
  pageIndex: number
  usedKB: number
  wastedKB: number
}

interface MappingResult {
  pages: PageEntry[]
  frameAssignments: { strip: number; frame: number; page: PageEntry }[]
  totalPages: number
  totalFrames: number
  loadedPages: number
  swappedPages: number
  totalWaste: number
  totalUsed: number
}

function computeMapping(pageSize: number): MappingResult {
  const pages: PageEntry[] = []
  for (const proc of PROCESSES) {
    const numPages = Math.ceil(proc.size / pageSize)
    for (let i = 0; i < numPages; i++) {
      const remaining = proc.size - i * pageSize
      const used = Math.min(remaining, pageSize)
      pages.push({
        processName: proc.name,
        processColor: proc.color,
        pageIndex: i,
        usedKB: used,
        wastedKB: pageSize - used,
      })
    }
  }

  const strips = PHYSICAL_STRIPS.map((s) => ({
    ...s,
    totalFrames: Math.max(1, Math.floor(s.totalFrames * (16 / pageSize))),
  }))
  const totalFrames = strips.reduce((s, st) => s + st.totalFrames, 0)

  const frameAssignments: MappingResult["frameAssignments"] = []
  let pageIdx = 0
  for (let si = 0; si < strips.length && pageIdx < pages.length; si++) {
    for (let fi = 0; fi < strips[si].totalFrames && pageIdx < pages.length; fi++) {
      frameAssignments.push({ strip: si, frame: fi, page: pages[pageIdx] })
      pageIdx++
    }
  }

  const loadedPages = frameAssignments.length
  const swappedPages = pages.length - loadedPages
  const totalWaste = pages.reduce((s, p) => s + p.wastedKB, 0)
  const totalUsed = pages.reduce((s, p) => s + p.usedKB, 0)

  return {
    pages,
    frameAssignments,
    totalPages: pages.length,
    totalFrames,
    loadedPages,
    swappedPages,
    totalWaste,
    totalUsed,
  }
}

export function PagingDemo({ className }: { className?: string }) {
  const [pageSize, setPageSize] = useState(8)
  const [step, setStep] = useState(0)

  const mapping = useMemo(() => computeMapping(pageSize), [pageSize])
  const visibleAssignments = mapping.frameAssignments.slice(0, step)

  const strips = PHYSICAL_STRIPS.map((s) => ({
    ...s,
    totalFrames: Math.max(1, Math.floor(s.totalFrames * (16 / pageSize))),
  }))

  const maxStep = mapping.frameAssignments.length

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Paging — Pages and Frames</h4>
      <p className="text-xs text-muted-foreground mb-3">
        Logical pages (blue) are mapped to physical frames (green). Step through to see how each page gets a frame.
      </p>

      {/* Slider for page/frame size */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs text-muted-foreground w-32 shrink-0">
          Page / Frame size: <strong className="text-foreground">{pageSize} KB</strong>
        </span>
        <input
          type="range"
          min={4}
          max={32}
          step={4}
          value={pageSize}
          onChange={(e) => { setPageSize(parseInt(e.target.value)); setStep(0) }}
          className="flex-1 accent-blue-600"
        />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {mapping.totalPages} pages / {mapping.totalFrames} frames
        </span>
      </div>

      {/* Step controls */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step <= 0} onClick={() => setStep(step - 1)}>
          ← Prev
        </Button>
        <span className="text-xs text-muted-foreground font-mono">
          Step {step}/{maxStep}
        </span>
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step >= maxStep} onClick={() => setStep(step + 1)}>
          Next →
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs h-7"
          onClick={() => setStep(step >= maxStep ? 0 : maxStep)}
        >
          {step >= maxStep ? "Reset" : "Show All"}
        </Button>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* Logical strip */}
        <div>
          <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Logical Address Space
          </div>
          <div className="border border-blue-400/30 rounded overflow-hidden">
            {mapping.pages.map((page, i) => {
              const assigned = visibleAssignments.find(
                (a) => a.page.processName === page.processName && a.page.pageIndex === page.pageIndex
              )
              const isCurrentStep = step > 0 && i === step - 1
              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center border-b last:border-b-0 transition-all text-[10px] h-7",
                    isCurrentStep && "ring-2 ring-blue-400 z-10 relative"
                  )}
                >
                  <div className={cn("w-5 h-full flex items-center justify-center", page.processColor, "opacity-60")}>
                    <span className="text-white font-bold text-[8px]">{page.processName.replace("P", "")}</span>
                  </div>
                  <div className="flex-1 px-1.5 flex items-center justify-between">
                    <span className="font-mono text-blue-700 dark:text-blue-300">
                      pg {page.pageIndex}
                    </span>
                    <span className="text-muted-foreground">
                      {page.usedKB}/{pageSize} KB
                    </span>
                  </div>
                  {page.wastedKB > 0 && (
                    <div className="w-8 h-full bg-red-500/15 flex items-center justify-center text-[8px] text-red-600 dark:text-red-400 font-mono">
                      +{page.wastedKB}
                    </div>
                  )}
                  {assigned && (
                    <div className="w-5 h-full bg-green-500/20 flex items-center justify-center text-[8px] text-green-700 dark:text-green-300">
                      ✓
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mapping arrows */}
        <div className="flex flex-col items-center justify-center gap-1 pt-6">
          <div className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold">MMU</div>
          <div className="w-px h-16 border-l-2 border-dashed border-amber-500/40" />
          <div className="text-[9px] text-muted-foreground">maps</div>
          <div className="w-px h-16 border-l-2 border-dashed border-amber-500/40" />
          <div className="text-[9px] text-amber-600 dark:text-amber-400">→</div>
        </div>

        {/* Physical strips */}
        <div>
          <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Physical Address Space
          </div>
          <div className="space-y-3">
            {strips.map((strip, si) => {
              const stripAssignments = visibleAssignments.filter((a) => a.strip === si)
              return (
                <div key={si}>
                  <div className="text-[10px] text-muted-foreground mb-0.5 flex items-center justify-between">
                    <span className="font-semibold">{strip.label}</span>
                    <span className="font-mono">{strip.totalFrames} frames</span>
                  </div>
                  <div className="border border-green-400/30 rounded overflow-hidden">
                    {Array.from({ length: strip.totalFrames }).map((_, fi) => {
                      const assigned = stripAssignments.find((a) => a.frame === fi)
                      const isCurrentTarget =
                        step > 0 &&
                        visibleAssignments[step - 1]?.strip === si &&
                        visibleAssignments[step - 1]?.frame === fi
                      return (
                        <div
                          key={fi}
                          className={cn(
                            "flex items-center border-b last:border-b-0 h-7 text-[10px] transition-all",
                            isCurrentTarget && "ring-2 ring-green-400 z-10 relative",
                            !assigned && "bg-muted/10"
                          )}
                        >
                          <div className={cn(
                            "w-5 h-full flex items-center justify-center",
                            assigned ? cn(assigned.page.processColor, "opacity-60") : "bg-muted/20"
                          )}>
                            {assigned ? (
                              <span className="text-white font-bold text-[8px]">
                                {assigned.page.processName.replace("P", "")}
                              </span>
                            ) : (
                              <span className="text-muted-foreground/30 text-[8px]">—</span>
                            )}
                          </div>
                          <div className="flex-1 px-1.5 flex items-center justify-between">
                            <span className="font-mono text-green-700 dark:text-green-300">
                              f{fi}
                            </span>
                            {assigned ? (
                              <span className="text-muted-foreground">
                                ← {assigned.page.processName} pg{assigned.page.pageIndex}
                              </span>
                            ) : (
                              <span className="text-muted-foreground/40">empty</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats panel */}
      <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
        <div className="p-2 rounded bg-blue-500/10 text-center">
          <div className="text-blue-700 dark:text-blue-300">Total Pages</div>
          <div className="font-mono font-bold text-blue-700 dark:text-blue-300">{mapping.totalPages}</div>
        </div>
        <div className="p-2 rounded bg-green-500/10 text-center">
          <div className="text-green-700 dark:text-green-300">Total Frames</div>
          <div className="font-mono font-bold text-green-700 dark:text-green-300">{mapping.totalFrames}</div>
        </div>
        <div className="p-2 rounded bg-green-500/10 text-center">
          <div className="text-green-700 dark:text-green-300">Loaded / Swapped</div>
          <div className="font-mono font-bold text-green-700 dark:text-green-300">
            {Math.min(step, mapping.loadedPages)} / {mapping.totalPages - Math.min(step, mapping.loadedPages)}
          </div>
        </div>
        <div className="p-2 rounded bg-red-500/10 text-center">
          <div className="text-red-700 dark:text-red-300">Internal Frag.</div>
          <div className="font-mono font-bold text-red-700 dark:text-red-300">{mapping.totalWaste} KB</div>
        </div>
      </div>

      {/* Current step annotation */}
      {step > 0 && step <= maxStep && (
        <div className="mt-3 p-2 rounded border border-blue-400/30 bg-blue-500/5 text-xs">
          {(() => {
            const a = mapping.frameAssignments[step - 1]
            return (
              <span>
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  {a.page.processName} page {a.page.pageIndex}
                </span>
                {" → "}
                <span className="font-semibold text-green-700 dark:text-green-300">
                  {strips[a.strip].label} frame {a.frame}
                </span>
                {a.page.wastedKB > 0 && (
                  <span className="text-red-600 dark:text-red-400 ml-2">
                    ({a.page.wastedKB} KB internal fragmentation — last page of {a.page.processName})
                  </span>
                )}
              </span>
            )
          })()}
        </div>
      )}
    </div>
  )
}
