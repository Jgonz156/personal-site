"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CodeLine {
  rust: string
  asm: string
  addr: string
  highlight?: string
}

interface Program {
  name: string
  description: string
  lines: CodeLine[]
}

const PROGRAMS: Program[] = [
  {
    name: "Program A — calculate_sum",
    description: "A simple function that sums two values",
    lines: [
      { rust: "fn main() {", asm: "PUSH  RBP", addr: "0x0000", highlight: "bg-violet-500/10" },
      { rust: "    let x = 10;", asm: "MOV   [RBP-8], 10", addr: "0x0008", highlight: "bg-blue-500/10" },
      { rust: "    let y = 20;", asm: "MOV   [RBP-16], 20", addr: "0x0010", highlight: "bg-blue-500/10" },
      { rust: "    let sum = x + y;", asm: "ADD   RAX, [RBP-8]", addr: "0x0018", highlight: "bg-emerald-500/10" },
      { rust: "", asm: "ADD   RAX, [RBP-16]", addr: "0x0020" },
      { rust: "    println!(\"{}\", sum);", asm: "CALL  _print", addr: "0x0028", highlight: "bg-amber-500/10" },
      { rust: "}", asm: "POP   RBP", addr: "0x0030" },
      { rust: "", asm: "RET", addr: "0x0038" },
    ],
  },
  {
    name: "Program B — calculate_product",
    description: "A completely different program that multiplies — but reuses the same addresses!",
    lines: [
      { rust: "fn main() {", asm: "PUSH  RBP", addr: "0x0000", highlight: "bg-violet-500/10" },
      { rust: "    let x = 7;", asm: "MOV   [RBP-8], 7", addr: "0x0008", highlight: "bg-blue-500/10" },
      { rust: "    let y = 6;", asm: "MOV   [RBP-16], 6", addr: "0x0010", highlight: "bg-blue-500/10" },
      { rust: "    let prod = x * y;", asm: "IMUL  RAX, [RBP-8]", addr: "0x0018", highlight: "bg-emerald-500/10" },
      { rust: "", asm: "IMUL  RAX, [RBP-16]", addr: "0x0020" },
      { rust: "    println!(\"{}\", prod);", asm: "CALL  _print", addr: "0x0028", highlight: "bg-amber-500/10" },
      { rust: "}", asm: "POP   RBP", addr: "0x0030" },
      { rust: "", asm: "RET", addr: "0x0038" },
    ],
  },
]

export function CodeAddressMapping({ className }: { className?: string }) {
  const [programIdx, setProgIdx] = useState(0)
  const [hoveredLine, setHoveredLine] = useState<number | null>(null)

  const prog = PROGRAMS[programIdx]

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Logical Addresses — Code to Machine Code
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Hover over lines to see the mapping. Toggle between two completely different programs and notice: they use the <strong>exact same addresses</strong>.
      </p>

      {/* Program toggle */}
      <div className="flex gap-1 mb-4">
        {PROGRAMS.map((p, i) => (
          <Button
            key={i}
            variant={programIdx === i ? "default" : "outline"}
            size="sm"
            className={cn("text-xs h-7", programIdx === i && "bg-violet-600 hover:bg-violet-700")}
            onClick={() => setProgIdx(i)}
          >
            {p.name.split(" — ")[0]}
          </Button>
        ))}
      </div>

      <div className="text-xs text-muted-foreground mb-3 italic">{prog.description}</div>

      {/* Side by side */}
      <div className="grid grid-cols-2 gap-0 border rounded overflow-hidden">
        {/* Rust side */}
        <div>
          <div className="bg-muted/30 px-3 py-1.5 text-[10px] font-semibold border-b text-muted-foreground">
            Rust Source Code
          </div>
          {prog.lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                "px-3 py-1 font-mono text-[11px] border-b last:border-b-0 transition-colors cursor-default",
                hoveredLine === i ? (line.highlight || "bg-muted/50") : "",
                !line.rust && "text-transparent select-none"
              )}
              onMouseEnter={() => setHoveredLine(i)}
              onMouseLeave={() => setHoveredLine(null)}
            >
              {line.rust || "\u00A0"}
            </div>
          ))}
        </div>

        {/* Assembly side */}
        <div className="border-l">
          <div className="bg-muted/30 px-3 py-1.5 text-[10px] font-semibold border-b text-muted-foreground">
            Machine Code (Assembly)
          </div>
          {prog.lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                "px-3 py-1 font-mono text-[11px] border-b last:border-b-0 flex items-center gap-3 transition-colors cursor-default",
                hoveredLine === i ? (line.highlight || "bg-muted/50") : ""
              )}
              onMouseEnter={() => setHoveredLine(i)}
              onMouseLeave={() => setHoveredLine(null)}
            >
              <span className="text-muted-foreground/50 w-12 shrink-0 text-[10px]">{line.addr}</span>
              <span>{line.asm}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Callout */}
      <div className="mt-3 p-3 rounded-lg border border-red-400/30 bg-red-500/5 text-xs text-red-700 dark:text-red-300">
        <span className="font-semibold">Notice:</span> Both programs start at <span className="font-mono">0x0000</span> and use the exact same address range. Variable <span className="font-mono">x</span> lives at <span className="font-mono">RBP-8</span> in both. If we placed both programs in physical memory at these addresses simultaneously, they would <strong>collide</strong>. Every program thinks it owns all of memory starting from 0.
      </div>
    </div>
  )
}
