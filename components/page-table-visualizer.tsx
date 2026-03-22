"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

function buildPageTable(pageBits: number): Map<number, number | null> {
  const totalPages = 1 << pageBits
  const table = new Map<number, number | null>()
  const frameCount = Math.min(totalPages, Math.max(4, Math.floor(totalPages * 0.6)))

  const indices = Array.from({ length: totalPages }, (_, i) => i)
  let seed = 37
  for (let i = indices.length - 1; i > 0; i--) {
    seed = (seed * 31 + 17) & 0x7fffffff
    const j = seed % (i + 1)
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }
  const loadedSet = new Set(indices.slice(0, frameCount))

  let frame = 0
  for (let p = 0; p < totalPages; p++) {
    if (loadedSet.has(p)) {
      table.set(p, frame++)
    } else {
      table.set(p, null)
    }
  }
  return table
}

function toBinary(val: number, bits: number): string {
  return val.toString(2).padStart(bits, "0")
}

interface PageTableVisualizerProps {
  className?: string
  totalBits?: number
  initialPageBits?: number
  minPageBits?: number
  maxPageBits?: number
}

export function PageTableVisualizer({
  className,
  totalBits = 16,
  initialPageBits = 4,
  minPageBits = 2,
  maxPageBits = 8,
}: PageTableVisualizerProps) {
  const [pageBits, setPageBits] = useState(initialPageBits)
  const [step, setStep] = useState(0)

  const offsetBits = totalBits - pageBits
  const totalPages = 1 << pageBits
  const addressesPerPage = 1 << offsetBits

  const pageTable = useMemo(() => buildPageTable(pageBits), [pageBits])

  const sampleLogical = useMemo(() => {
    let pagePart = Math.min(totalPages - 1, 5)
    for (const [p, f] of pageTable.entries()) {
      if (f !== null) { pagePart = p; break }
    }
    const offsetPart = Math.min(addressesPerPage - 1, 42)
    return (pagePart << offsetBits) | offsetPart
  }, [totalPages, addressesPerPage, offsetBits, pageTable])

  const samplePageNum = sampleLogical >> offsetBits
  const sampleOffset = sampleLogical & ((1 << offsetBits) - 1)
  const sampleFrame = pageTable.get(samplePageNum) ?? null
  const isPageFault = sampleFrame === null
  const samplePhysical = sampleFrame !== null ? (sampleFrame << offsetBits) | sampleOffset : null

  const logicalBits = toBinary(sampleLogical, totalBits)
  const physicalBits = samplePhysical !== null ? toBinary(samplePhysical, totalBits) : null

  const STEPS = [
    `Show the ${totalBits}-bit logical address with page/offset split`,
    "Extract the page number bits",
    "Look up page number in the page table",
    isPageFault
      ? "Page Fault! Page not loaded in any frame"
      : "Found! Replace page bits with frame bits",
    isPageFault
      ? "Translation cannot complete — page must be swapped in"
      : `Result: ${totalBits}-bit physical address`,
  ]

  const maxStep = STEPS.length - 1

  const faultPageNum = useMemo(() => {
    for (const [p, f] of pageTable.entries()) {
      if (f === null) return p
    }
    return null
  }, [pageTable])

  const [showFault, setShowFault] = useState(false)

  const activePageNum = showFault && faultPageNum !== null ? faultPageNum : samplePageNum
  const activeOffset = showFault && faultPageNum !== null ? sampleOffset : sampleOffset
  const activeLogical = (activePageNum << offsetBits) | activeOffset
  const activeFrame = pageTable.get(activePageNum) ?? null
  const activeIsFault = activeFrame === null
  const activePhysical = activeFrame !== null ? (activeFrame << offsetBits) | activeOffset : null
  const activeLogicalBits = toBinary(activeLogical, totalBits)
  const activePhysicalBits = activePhysical !== null ? toBinary(activePhysical, totalBits) : null

  const activeSteps = [
    `Show the ${totalBits}-bit logical address with page/offset split`,
    "Extract the page number bits",
    "Look up page number in the page table",
    activeIsFault
      ? "Page Fault! Page not loaded in any frame"
      : "Found! Replace page bits with frame bits",
    activeIsFault
      ? "Translation cannot complete — page must be swapped in"
      : `Result: ${totalBits}-bit physical address`,
  ]

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Page Table — Bit-Level Translation</h4>
      <p className="text-xs text-muted-foreground mb-3">
        See how a {totalBits}-bit logical address is split into page number and offset bits, looked up in the page table, and translated to a physical address.
      </p>

      {/* Slider for page bits */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs text-muted-foreground w-28 shrink-0">
          Page bits: <strong className="text-foreground">{pageBits}</strong>
        </span>
        <input
          type="range"
          min={minPageBits}
          max={maxPageBits}
          step={1}
          value={pageBits}
          onChange={(e) => { setPageBits(parseInt(e.target.value)); setStep(0); setShowFault(false) }}
          className="flex-1 accent-blue-600"
        />
      </div>

      {/* Bit split info */}
      <div className="flex gap-4 mb-3 text-xs">
        <div className="p-2 rounded bg-blue-500/10 border border-blue-400/30 flex-1 text-center">
          <div className="text-blue-700 dark:text-blue-300 font-semibold">{pageBits} page bits</div>
          <div className="text-muted-foreground">
            2<sup>{pageBits}</sup> = {totalPages} possible pages
          </div>
        </div>
        <div className="p-2 rounded bg-muted/30 border flex-1 text-center">
          <div className="font-semibold">{offsetBits} offset bits</div>
          <div className="text-muted-foreground">
            2<sup>{offsetBits}</sup> = {addressesPerPage} addresses/page
          </div>
        </div>
      </div>

      {/* Fault toggle */}
      {faultPageNum !== null && (
        <div className="flex items-center gap-2 mb-3">
          <Button
            variant={!showFault ? "default" : "outline"}
            size="sm"
            className={cn("text-xs h-7", !showFault && "bg-green-600 hover:bg-green-700")}
            onClick={() => { setShowFault(false); setStep(0) }}
          >
            Normal Translation
          </Button>
          <Button
            variant={showFault ? "default" : "outline"}
            size="sm"
            className={cn("text-xs h-7", showFault && "bg-red-600 hover:bg-red-700")}
            onClick={() => { setShowFault(true); setStep(0) }}
          >
            Page Fault Demo
          </Button>
        </div>
      )}

      {/* Bit display */}
      <div className="mb-4">
        <div className="text-[10px] font-semibold text-muted-foreground mb-1">
          {step >= 4 && !activeIsFault ? "Physical Address" : "Logical Address"}: 0x{(step >= 4 && !activeIsFault && activePhysical !== null ? activePhysical : activeLogical).toString(16).toUpperCase().padStart(Math.ceil(totalBits / 4), "0")}
        </div>
        <div className="flex flex-wrap">
          {(step >= 4 && !activeIsFault ? activePhysicalBits! : activeLogicalBits).split("").map((bit, i) => {
            const isPageBit = i < pageBits
            const highlight =
              step >= 1 && step <= 3 && isPageBit ? "ring-2 ring-blue-400" :
              step >= 4 && !activeIsFault && isPageBit ? "ring-2 ring-green-400" : ""
            return (
              <div
                key={i}
                className={cn(
                  "w-6 h-8 flex items-center justify-center border text-xs font-mono font-bold transition-all",
                  isPageBit
                    ? (step >= 4 && !activeIsFault
                      ? "bg-green-500/15 text-green-700 dark:text-green-300 border-green-400/30"
                      : "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/30")
                    : "bg-muted/10 border-muted-foreground/20",
                  highlight
                )}
              >
                {bit}
              </div>
            )
          })}
        </div>
        <div className="flex mt-0.5">
          <div style={{ width: `${(pageBits / totalBits) * 100}%` }} className="text-center text-[9px] font-semibold text-blue-700 dark:text-blue-300">
            {step >= 4 && !activeIsFault ? (
              <span className="text-green-700 dark:text-green-300">Frame #{activeFrame}</span>
            ) : (
              <>Page #{activePageNum}</>
            )}
          </div>
          <div style={{ width: `${(offsetBits / totalBits) * 100}%` }} className="text-center text-[9px] text-muted-foreground">
            Offset ({activeOffset})
          </div>
        </div>
      </div>

      {/* Step description */}
      <div className={cn(
        "mb-3 p-2 rounded text-xs font-semibold text-center border",
        activeIsFault && step >= 3
          ? "bg-red-500/10 text-red-700 dark:text-red-300 border-red-400/30"
          : "bg-muted/30 border-transparent"
      )}>
        Step {step + 1}/{activeSteps.length}: {activeSteps[step]}
      </div>

      {/* Page table (compact) */}
      {step >= 2 && (
        <div className="mb-4">
          <div className="text-[10px] font-semibold text-muted-foreground mb-1">Page Table (showing loaded entries)</div>
          <div className="grid grid-cols-4 gap-1 max-h-32 overflow-y-auto">
            {[...pageTable.entries()].slice(0, Math.min(totalPages, 32)).map(([page, frame]) => {
              const isActive = page === activePageNum && step >= 2
              return (
                <div
                  key={page}
                  className={cn(
                    "flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono border transition-all",
                    isActive
                      ? (frame !== null
                        ? "border-green-400 bg-green-500/10 ring-1 ring-green-400"
                        : "border-red-400 bg-red-500/10 ring-1 ring-red-400")
                      : "border-transparent bg-muted/10"
                  )}
                >
                  <span className="text-blue-700 dark:text-blue-300">p{page}</span>
                  <span className="text-muted-foreground">→</span>
                  {frame !== null ? (
                    <span className="text-green-700 dark:text-green-300">f{frame}</span>
                  ) : (
                    <span className="text-red-500 text-[8px]">✗</span>
                  )}
                </div>
              )
            })}
          </div>
          {totalPages > 32 && (
            <div className="text-[9px] text-muted-foreground mt-1">
              ...and {totalPages - 32} more entries
            </div>
          )}
        </div>
      )}

      {/* Result */}
      {step >= 4 && (
        <div className={cn(
          "mb-4 p-3 rounded border text-xs",
          activeIsFault
            ? "border-red-400/30 bg-red-500/5"
            : "border-green-400/30 bg-green-500/5"
        )}>
          {activeIsFault ? (
            <div className="text-red-700 dark:text-red-300">
              <span className="font-bold">Page Fault!</span> Page {activePageNum} is not loaded in any frame. The MMU must trigger an interrupt, swap a victim page out to storage, load page {activePageNum} from storage into the freed frame, then retry this translation.
            </div>
          ) : (
            <div className="text-green-700 dark:text-green-300">
              <span className="font-bold">Translation complete.</span>{" "}
              Logical <span className="font-mono">0x{activeLogical.toString(16).toUpperCase().padStart(Math.ceil(totalBits / 4), "0")}</span>{" "}
              → Physical <span className="font-mono">0x{activePhysical!.toString(16).toUpperCase().padStart(Math.ceil(totalBits / 4), "0")}</span>{" "}
              (page {activePageNum} → frame {activeFrame}, offset {activeOffset} preserved)
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step <= 0} onClick={() => setStep(step - 1)}>
          ← Prev
        </Button>
        <div className="flex gap-1">
          {activeSteps.map((_, i) => (
            <button
              key={i}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                i === step
                  ? (activeIsFault && i >= 3 ? "bg-red-500" : "bg-blue-500")
                  : i < step ? "bg-primary/40" : "bg-muted"
              )}
              onClick={() => setStep(i)}
            />
          ))}
        </div>
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={step >= maxStep} onClick={() => setStep(step + 1)}>
          Next →
        </Button>
      </div>
    </div>
  )
}
