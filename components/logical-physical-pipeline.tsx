"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const PHASES = [
  { id: "rust", label: "1. Rust Source", side: "logical" as const },
  { id: "asm", label: "2. Assembly (Logical)", side: "logical" as const },
  { id: "phys1", label: "3. Physical: one()", side: "physical" as const },
  { id: "phys2", label: "4. Physical: main()", side: "physical" as const },
]

const RUST_LINES = [
  { num: 1, code: "#[no_mangle]", cls: "text-amber-600 dark:text-amber-400" },
  { num: 2, code: "fn one() -> i32 {", cls: "text-blue-600 dark:text-blue-400" },
  { num: 3, code: "    1", cls: "text-emerald-600 dark:text-emerald-400" },
  { num: 4, code: "}", cls: "text-muted-foreground" },
  { num: 5, code: "", cls: "" },
  { num: 6, code: "#[no_mangle]", cls: "text-amber-600 dark:text-amber-400" },
  { num: 7, code: "pub fn main() {", cls: "text-blue-600 dark:text-blue-400" },
  { num: 8, code: "    one();", cls: "text-violet-600 dark:text-violet-400" },
  { num: 9, code: "}", cls: "text-muted-foreground" },
]

const ASM_LINES = [
  { addr: "0x0000", code: "one:", note: "← function label (logical addr 0x0000)" },
  { addr: "0x0000", code: "    mov eax, 1", note: "" },
  { addr: "0x0008", code: "    ret", note: "" },
  { addr: "", code: "", note: "" },
  { addr: "0x0010", code: "main:", note: "← function label (logical addr 0x0010)" },
  { addr: "0x0010", code: "    push rax", note: "" },
  { addr: "0x0018", code: "    call qword ptr [rip + @one]", note: "← rip jumps to @one = 0x0000" },
  { addr: "0x0020", code: "    pop rax", note: "" },
  { addr: "0x0028", code: "    ret", note: "" },
]

interface TapeBlock {
  label: string
  size: number
  color: string
  type: "code" | "free"
  addrStart?: string
  addrEnd?: string
}

const TAPE_PHASE3: TapeBlock[] = [
  { label: "", size: 15, color: "", type: "free" },
  { label: "one()", size: 12, color: "bg-blue-500", type: "code", addrStart: "0x7A20", addrEnd: "0x7A30" },
  { label: "", size: 73, color: "", type: "free" },
]

const TAPE_PHASE4: TapeBlock[] = [
  { label: "", size: 30, color: "", type: "free" },
  { label: "one()", size: 12, color: "bg-blue-500", type: "code", addrStart: "0x7A20", addrEnd: "0x7A30" },
  { label: "", size: 20, color: "", type: "free" },
  { label: "main()", size: 16, color: "bg-violet-500", type: "code", addrStart: "0xB100", addrEnd: "0xB128" },
  { label: "", size: 22, color: "", type: "free" },
]

function MemoryTape({ blocks, highlight }: { blocks: TapeBlock[]; highlight?: string }) {
  const total = blocks.reduce((s, b) => s + b.size, 0)
  return (
    <div className="flex h-12 rounded overflow-hidden border border-green-400/30">
      {blocks.map((b, i) => (
        <div
          key={i}
          className={cn(
            "flex items-center justify-center text-[9px] font-mono font-bold border-r last:border-r-0 overflow-hidden transition-all",
            b.type === "code"
              ? cn(b.color, "text-white/90 opacity-75", highlight === b.label && "ring-2 ring-yellow-400 opacity-100")
              : "bg-muted/10 text-muted-foreground/30"
          )}
          style={{ width: `${(b.size / total) * 100}%` }}
          title={b.type === "code" ? `${b.label}: ${b.addrStart} – ${b.addrEnd}` : "Free"}
        >
          {(b.size / total) * 100 > 6 && (
            <span className="truncate px-0.5">
              {b.type === "code" ? b.label : ""}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export function LogicalPhysicalPipeline({ className }: { className?: string }) {
  const [phase, setPhase] = useState(0)
  const current = PHASES[phase]
  const isLogical = current.side === "logical"

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">From Rust to Hardware — The Full Pipeline</h4>
      <p className="text-xs text-muted-foreground mb-3">
        Step through the transformation from source code to physical memory. The MMU sits between the logical and physical worlds.
      </p>

      {/* Phase tabs */}
      <div className="flex gap-1 mb-4 flex-wrap">
        {PHASES.map((p, i) => (
          <Button
            key={p.id}
            variant={phase === i ? "default" : "outline"}
            size="sm"
            className={cn(
              "text-xs h-7",
              phase === i && (p.side === "logical"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-600 hover:bg-green-700")
            )}
            onClick={() => setPhase(i)}
          >
            {p.label}
          </Button>
        ))}
      </div>

      {/* MMU divider — shown between logical and physical phases */}
      {phase >= 2 && (
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 border-t border-dashed border-amber-500/50" />
          <span className="px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-xs font-bold text-amber-700 dark:text-amber-300 whitespace-nowrap">
            MMU Translates Here
          </span>
          <div className="flex-1 border-t border-dashed border-amber-500/50" />
        </div>
      )}

      {/* Side badge */}
      <div className="mb-3 flex items-center gap-2">
        <span className={cn(
          "rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
          isLogical
            ? "border-blue-400/40 bg-blue-500/10 text-blue-700 dark:text-blue-300"
            : "border-green-400/40 bg-green-500/10 text-green-700 dark:text-green-300"
        )}>
          {isLogical ? "Logical / Programmer Side" : "Physical / Hardware Side"}
        </span>
      </div>

      {/* Phase content */}
      <div className={cn(
        "rounded-lg border-2 p-4 transition-colors",
        isLogical ? "border-blue-400/30" : "border-green-400/30"
      )}>
        {phase === 0 && (
          <div>
            <div className="text-xs font-semibold text-muted-foreground mb-2">Rust Source Code</div>
            <pre className="rounded bg-muted/30 p-3 text-[12px] font-mono leading-relaxed overflow-x-auto">
              {RUST_LINES.map((line) => (
                <div key={line.num} className="flex">
                  <span className="w-6 text-right mr-3 text-muted-foreground/40 select-none">{line.num}</span>
                  <span className={line.cls}>{line.code || "\u00A0"}</span>
                </div>
              ))}
            </pre>
            <p className="mt-3 text-xs text-muted-foreground">
              This is what you write. Line numbers, variable names, function names — all human-readable labels. The compiler turns this into machine code next.
            </p>
          </div>
        )}

        {phase === 1 && (
          <div>
            <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Compiled Assembly — Logical Addresses
            </div>
            <pre className="rounded bg-blue-500/5 border border-blue-400/20 p-3 text-[12px] font-mono leading-relaxed overflow-x-auto">
              {ASM_LINES.map((line, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  {line.addr ? (
                    <span className="w-14 text-right shrink-0 text-blue-600 dark:text-blue-400 text-[10px]">{line.addr}</span>
                  ) : (
                    <span className="w-14 shrink-0" />
                  )}
                  <span className={cn(
                    line.code.includes("call") ? "text-violet-600 dark:text-violet-400 font-bold" :
                    line.code.endsWith(":") ? "text-blue-600 dark:text-blue-400 font-bold" : ""
                  )}>
                    {line.code || "\u00A0"}
                  </span>
                  {line.note && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 whitespace-nowrap ml-2">
                      {line.note}
                    </span>
                  )}
                </div>
              ))}
            </pre>
            <p className="mt-3 text-xs text-muted-foreground">
              Addresses start at <span className="font-mono text-blue-600 dark:text-blue-400">0x0000</span> and increment. The <span className="font-mono font-bold">call</span> instruction uses <span className="font-mono">rip + @one</span> — the instruction pointer plus a label that resolves to logical address <span className="font-mono text-blue-600 dark:text-blue-400">0x0000</span>. Everything below this line is what the programmer sees.
            </p>
          </div>
        )}

        {phase === 2 && (
          <div>
            <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">
              Physical Memory — one() placed at 0x7A20
            </div>
            <MemoryTape blocks={TAPE_PHASE3} highlight="one()" />
            <div className="flex justify-between text-[8px] font-mono text-muted-foreground/50 mt-1">
              <span>0x0000</span>
              <span>0x7A20</span>
              <span>0xFFFF</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              The <span className="font-mono font-bold text-blue-600 dark:text-blue-400">one()</span> function was placed at physical address <span className="font-mono text-green-600 dark:text-green-400">0x7A20</span> — nowhere near logical address 0x0000. Empty space surrounds it. This is non-contiguous allocation: chunks go wherever frames are available.
            </p>
          </div>
        )}

        {phase === 3 && (
          <div>
            <div className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">
              Physical Memory — main() placed at 0xB100
            </div>
            <MemoryTape blocks={TAPE_PHASE4} />
            <div className="flex justify-between text-[8px] font-mono text-muted-foreground/50 mt-1">
              <span>0x0000</span>
              <span>0x7A20</span>
              <span>0xB100</span>
              <span>0xFFFF</span>
            </div>
            <div className="mt-3 p-3 rounded border border-amber-400/30 bg-amber-500/5 text-xs text-amber-700 dark:text-amber-300">
              <span className="font-semibold">Key insight:</span> The <span className="font-mono">call [rip + @one]</span> instruction still works! The label <span className="font-mono">@one</span> is a <em>logical</em> address. The MMU transparently translates it to physical address <span className="font-mono text-green-600 dark:text-green-400">0x7A20</span> at runtime. The CPU never knows the two functions are physically separated — it only sees the contiguous logical view.
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2 mt-4">
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={phase <= 0} onClick={() => setPhase(phase - 1)}>
          {"← Prev"}
        </Button>
        <div className="flex gap-1">
          {PHASES.map((_, i) => (
            <button
              key={i}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                i === phase ? (PHASES[i].side === "logical" ? "bg-blue-500" : "bg-green-500") :
                i < phase ? "bg-primary/40" : "bg-muted"
              )}
              onClick={() => setPhase(i)}
            />
          ))}
        </div>
        <Button variant="outline" size="sm" className="text-xs h-7" disabled={phase >= PHASES.length - 1} onClick={() => setPhase(phase + 1)}>
          {"Next →"}
        </Button>
      </div>
    </div>
  )
}
