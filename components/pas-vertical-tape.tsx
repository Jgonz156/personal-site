"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface InstructionRow {
  label: string
  type: "code" | "data" | "heap" | "stack" | "gap"
  detail?: string
}

const codeRows: InstructionRow[] = [
  { label: "MOV  R1, #0x42", type: "code", detail: "Load immediate value into register" },
  { label: "CALL fn_main  ", type: "code", detail: "Jump to main function entry point" },
  { label: "ADD  R2, R1, R3", type: "code", detail: "Arithmetic operation on registers" },
  { label: "CMP  R2, #0xFF", type: "code", detail: "Compare register to immediate" },
  { label: "JNE  0x001C   ", type: "code", detail: "Conditional branch if not equal" },
  { label: "PUSH R4       ", type: "code", detail: "Push register onto stack" },
  { label: "LOAD R5, [R6] ", type: "code", detail: "Load from memory address in R6" },
  { label: "RET           ", type: "code", detail: "Return from function call" },
]

const dataRows: InstructionRow[] = [
  { label: "0x48656C6C6F  ", type: "data", detail: 'Static string: "Hello"' },
  { label: "0x00000064    ", type: "data", detail: "Global constant: 100" },
  { label: "0xDEADBEEF    ", type: "data", detail: "Debug sentinel value" },
  { label: "<lib_printf>  ", type: "data", detail: "Linked library reference" },
]

const heapRows: InstructionRow[] = [
  { label: "Vec{ptr,len,cap}", type: "heap", detail: "Heap-allocated vector metadata" },
  { label: "[0x01, 0x02, ...]", type: "heap", detail: "Vector backing storage" },
  { label: "Box<Node>{...}  ", type: "heap", detail: "Boxed struct on heap" },
  { label: "String{ptr,len} ", type: "heap", detail: "Heap-allocated string" },
  { label: "(free)          ", type: "heap", detail: "Deallocated / available" },
]

const stackRows: InstructionRow[] = [
  { label: "(free)          ", type: "stack", detail: "Available stack space" },
  { label: "frame: fn_bar   ", type: "stack", detail: "Stack frame for fn_bar" },
  { label: "  local x = 7   ", type: "stack", detail: "Local variable in fn_bar" },
  { label: "  ret_addr      ", type: "stack", detail: "Return address to caller" },
  { label: "frame: fn_main  ", type: "stack", detail: "Stack frame for main" },
  { label: "  local y = 42  ", type: "stack", detail: "Local variable in main" },
  { label: "  argc, argv    ", type: "stack", detail: "Program arguments" },
]

const sectionConfig: Record<string, { color: string; bg: string; border: string; label: string; sublabel: string }> = {
  code: { color: "text-violet-700 dark:text-violet-300", bg: "bg-violet-500/15", border: "border-violet-400/30", label: "Code (Text)", sublabel: "Compiled machine instructions" },
  data: { color: "text-amber-700 dark:text-amber-300", bg: "bg-amber-500/15", border: "border-amber-400/30", label: "Data / Static", sublabel: "Globals, constants, library links" },
  heap: { color: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-500/15", border: "border-emerald-400/30", label: "Heap", sublabel: "Dynamic allocation (grows ↓)" },
  gap: { color: "text-muted-foreground", bg: "bg-muted/20", border: "border-muted-foreground/20", label: "", sublabel: "" },
  stack: { color: "text-blue-700 dark:text-blue-300", bg: "bg-blue-500/15", border: "border-blue-400/30", label: "Stack", sublabel: "Function frames (grows ↑)" },
}

function BitHeader() {
  return (
    <div className="flex items-center mb-1">
      <div className="w-12 shrink-0" />
      <div className="flex-1 flex">
        {[0, 8, 16, 24, 32, 40, 48, 56, 63].map((bit) => (
          <div
            key={bit}
            className="text-[8px] font-mono text-muted-foreground/50"
            style={{ position: "absolute" as const, left: `${(bit / 64) * 100}%` }}
          >
            {bit}
          </div>
        ))}
      </div>
    </div>
  )
}

function TapeRow({
  row,
  address,
  isSelected,
  onClick,
}: {
  row: InstructionRow
  address: string
  isSelected: boolean
  onClick: () => void
}) {
  const config = sectionConfig[row.type]
  return (
    <div
      className={cn(
        "flex items-stretch cursor-pointer transition-all group",
        isSelected && "ring-1 ring-offset-0",
        isSelected && config.border.replace("border-", "ring-")
      )}
      onClick={onClick}
    >
      <div className="w-12 shrink-0 text-[8px] font-mono text-muted-foreground/40 pr-1 text-right flex items-center justify-end">
        {address}
      </div>
      <div
        className={cn(
          "flex-1 border-x border-b px-2 py-0.5 font-mono text-[10px] flex items-center justify-between gap-2 transition-colors",
          config.bg,
          config.border,
          config.color,
          "group-hover:brightness-110"
        )}
      >
        <span className="truncate">{row.label}</span>
        {isSelected && row.detail && (
          <span className="text-[9px] text-muted-foreground italic shrink-0">
            {row.detail}
          </span>
        )}
      </div>
    </div>
  )
}

export function PASVerticalTape({ className }: { className?: string }) {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  let globalIdx = 0
  let address = 0x0000

  const sections: { label: string; sublabel: string; type: string; rows: InstructionRow[]; startIdx: number; startAddr: number }[] = []

  const codeSection = { label: sectionConfig.code.label, sublabel: sectionConfig.code.sublabel, type: "code", rows: codeRows, startIdx: globalIdx, startAddr: address }
  sections.push(codeSection)
  globalIdx += codeRows.length
  address += codeRows.length * 8

  const dataSection = { label: sectionConfig.data.label, sublabel: sectionConfig.data.sublabel, type: "data", rows: dataRows, startIdx: globalIdx, startAddr: address }
  sections.push(dataSection)
  globalIdx += dataRows.length
  address += dataRows.length * 8

  const heapSection = { label: sectionConfig.heap.label, sublabel: sectionConfig.heap.sublabel, type: "heap", rows: heapRows, startIdx: globalIdx, startAddr: address }
  sections.push(heapSection)
  globalIdx += heapRows.length
  address += heapRows.length * 8

  const gapStartIdx = globalIdx
  const gapAddr = address

  address += 3 * 8
  globalIdx += 3

  const stackSection = { label: sectionConfig.stack.label, sublabel: sectionConfig.stack.sublabel, type: "stack", rows: stackRows, startIdx: globalIdx, startAddr: address }
  sections.push(stackSection)

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Process Address Space — The 64-Bit Tape
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Each row is a 64-bit (8-byte) machine instruction or data word. Click any row to see what it represents. This is what memory looks like from the OS programmer{"'"}s perspective — a vertical roll of toilet paper, 64 bits wide.
      </p>

      <div className="max-w-md mx-auto">
        {/* Bit-width ruler */}
        <div className="flex items-center mb-1 ml-12">
          <div className="flex-1 relative">
            <div className="h-px bg-muted-foreground/30 w-full" />
            <div className="flex justify-between text-[7px] font-mono text-muted-foreground/50 -mt-0.5">
              <span>bit 0</span>
              <span>64-bit wide</span>
              <span>bit 63</span>
            </div>
          </div>
        </div>

        {/* Low addresses label */}
        <div className="text-[9px] font-mono text-muted-foreground/40 text-center mb-1">
          Low Addresses (0x0000...)
        </div>

        {/* Code section */}
        <SectionBracket config={sectionConfig.code}>
          {codeSection.rows.map((row, i) => {
            const idx = codeSection.startIdx + i
            const addr = codeSection.startAddr + i * 8
            return (
              <TapeRow
                key={idx}
                row={row}
                address={`0x${addr.toString(16).padStart(4, "0").toUpperCase()}`}
                isSelected={selectedRow === idx}
                onClick={() => setSelectedRow(selectedRow === idx ? null : idx)}
              />
            )
          })}
        </SectionBracket>

        {/* Data section */}
        <SectionBracket config={sectionConfig.data}>
          {dataSection.rows.map((row, i) => {
            const idx = dataSection.startIdx + i
            const addr = dataSection.startAddr + i * 8
            return (
              <TapeRow
                key={idx}
                row={row}
                address={`0x${addr.toString(16).padStart(4, "0").toUpperCase()}`}
                isSelected={selectedRow === idx}
                onClick={() => setSelectedRow(selectedRow === idx ? null : idx)}
              />
            )
          })}
        </SectionBracket>

        {/* Heap section */}
        <SectionBracket config={sectionConfig.heap}>
          {heapSection.rows.map((row, i) => {
            const idx = heapSection.startIdx + i
            const addr = heapSection.startAddr + i * 8
            return (
              <TapeRow
                key={idx}
                row={row}
                address={`0x${addr.toString(16).padStart(4, "0").toUpperCase()}`}
                isSelected={selectedRow === idx}
                onClick={() => setSelectedRow(selectedRow === idx ? null : idx)}
              />
            )
          })}
        </SectionBracket>

        {/* Gap */}
        <div className="flex items-stretch">
          <div className="w-12 shrink-0" />
          <div className="flex-1 border-x border-dashed border-muted-foreground/20 bg-muted/10 py-3 flex flex-col items-center justify-center gap-0.5">
            <div className="text-emerald-600 dark:text-emerald-400 text-sm">↓</div>
            <div className="text-[10px] text-muted-foreground/50 font-mono">free space</div>
            <div className="text-blue-600 dark:text-blue-400 text-sm">↑</div>
          </div>
        </div>

        {/* Stack section */}
        <SectionBracket config={sectionConfig.stack}>
          {stackSection.rows.map((row, i) => {
            const idx = stackSection.startIdx + i
            const addr = stackSection.startAddr + i * 8
            return (
              <TapeRow
                key={idx}
                row={row}
                address={`0x${addr.toString(16).padStart(4, "0").toUpperCase()}`}
                isSelected={selectedRow === idx}
                onClick={() => setSelectedRow(selectedRow === idx ? null : idx)}
              />
            )
          })}
        </SectionBracket>

        {/* High addresses label */}
        <div className="text-[9px] font-mono text-muted-foreground/40 text-center mt-1">
          High Addresses (0xFFFF...)
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-2 border-t text-xs text-muted-foreground justify-center">
        {(["code", "data", "heap", "stack"] as const).map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded-sm", sectionConfig[type].bg, "border", sectionConfig[type].border)} />
            <span>{sectionConfig[type].label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionBracket({
  config,
  children,
}: {
  config: { label: string; sublabel: string; color: string; border: string }
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      {/* Section label */}
      <div className={cn("text-[10px] font-semibold ml-12 mb-0.5 flex items-center gap-1.5", config.color)}>
        <span>{config.label}</span>
        <span className="text-[9px] font-normal text-muted-foreground">— {config.sublabel}</span>
      </div>
      {children}
    </div>
  )
}
