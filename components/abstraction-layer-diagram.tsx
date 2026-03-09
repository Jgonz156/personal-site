"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface Layer {
  id: string
  name: string
  role: string
  memoryView: string
  representation: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
}

const layers: Layer[] = [
  {
    id: "highlevel",
    name: "High-Level (SQL, Web)",
    role: "Query & request layer",
    memoryView: "No direct memory control — only queries, requests, and responses",
    color: "text-pink-700 dark:text-pink-300",
    bgColor: "bg-pink-500/10 dark:bg-pink-500/15",
    borderColor: "border-pink-400/40",
    representation: (
      <div className="font-mono text-[10px] leading-tight space-y-0.5 text-pink-700 dark:text-pink-300">
        <div className="opacity-60">SELECT * FROM users</div>
        <div className="opacity-60">WHERE id = 42;</div>
        <div className="mt-1 text-[9px] text-muted-foreground">Memory? What memory?</div>
      </div>
    ),
  },
  {
    id: "application",
    name: "Application Developer",
    role: "Stack & heap abstraction",
    memoryView: "Stack variables, heap allocations (Box, Vec, malloc), garbage collection",
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-500/10 dark:bg-blue-500/15",
    borderColor: "border-blue-400/40",
    representation: (
      <div className="font-mono text-[10px] leading-tight space-y-0.5 text-blue-700 dark:text-blue-300">
        <div className="flex gap-2">
          <div className="px-1 rounded bg-blue-500/20">Stack</div>
          <div className="px-1 rounded bg-green-500/20">Heap</div>
        </div>
        <div className="opacity-70">let x = 5; // stack</div>
        <div className="opacity-70">let v = vec![1,2,3]; // heap</div>
      </div>
    ),
  },
  {
    id: "os",
    name: "OS / Systems Programmer",
    role: "64-bit instruction blocks, PAS, ISA",
    memoryView: "Process Address Space: code, data, heap, stack as 64-bit-wide instruction tape",
    color: "text-violet-700 dark:text-violet-300",
    bgColor: "bg-violet-500/10 dark:bg-violet-500/15",
    borderColor: "border-violet-400/40",
    representation: (
      <div className="font-mono text-[10px] leading-tight text-violet-700 dark:text-violet-300">
        <div className="flex gap-0.5 mb-0.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-4 h-3 rounded-sm bg-violet-500/20 border border-violet-400/30 text-center text-[7px] leading-3">
              {["MOV", "ADD", "CMP", "JMP", "PUSH", "POP", "CALL", "RET"][i]}
            </div>
          ))}
        </div>
        <div className="text-[9px] opacity-70">64-bit instruction blocks</div>
      </div>
    ),
  },
  {
    id: "ee",
    name: "Electrical Engineer",
    role: "Gates, transistors, signals",
    memoryView: "Binary signals, voltage levels, flip-flops, capacitor charges",
    color: "text-teal-700 dark:text-teal-300",
    bgColor: "bg-teal-500/10 dark:bg-teal-500/15",
    borderColor: "border-teal-400/40",
    representation: (
      <div className="font-mono text-[10px] leading-tight text-teal-700 dark:text-teal-300">
        <div className="flex gap-0.5">
          {["1", "0", "1", "1", "0", "0", "1", "0", "1", "1", "0", "1", "0", "0", "1", "1"].map((b, i) => (
            <span
              key={i}
              className={cn(
                "w-3 h-4 flex items-center justify-center rounded-sm text-[8px] font-bold",
                b === "1" ? "bg-teal-500/30" : "bg-muted/50"
              )}
            >
              {b}
            </span>
          ))}
        </div>
        <div className="text-[9px] opacity-70 mt-0.5">Voltage levels → bits</div>
      </div>
    ),
  },
]

export function AbstractionLayerDiagram({ className }: { className?: string }) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Memory Through Abstraction Layers
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        Click a layer to see how memory looks from that perspective. Each layer builds an API wall
        that hides the complexity below — your optimization ceiling is the layer below you.
      </p>

      <div className="flex flex-col items-center max-w-lg mx-auto">
        {layers.map((layer, i) => {
          const isSelected = selected === layer.id
          return (
            <div key={layer.id} className="w-full">
              {/* Layer block */}
              <div
                className={cn(
                  "border-2 rounded-lg p-3 cursor-pointer transition-all",
                  layer.bgColor,
                  layer.borderColor,
                  isSelected && "ring-2 ring-offset-1 ring-offset-background",
                  isSelected && layer.borderColor.replace("border-", "ring-").replace("/40", "")
                )}
                onClick={() => setSelected(isSelected ? null : layer.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className={cn("font-semibold text-sm", layer.color)}>
                      {layer.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {layer.role}
                    </div>
                    {isSelected && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="font-semibold">View of memory:</span> {layer.memoryView}
                      </div>
                    )}
                  </div>
                  <div className={cn(
                    "flex-shrink-0 p-2 rounded border transition-all",
                    layer.borderColor,
                    isSelected ? "opacity-100 scale-105" : "opacity-70"
                  )}>
                    {layer.representation}
                  </div>
                </div>
              </div>

              {/* API wall between layers */}
              {i < layers.length - 1 && (
                <div className="flex items-center justify-center py-1.5">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <div className="w-16 h-px bg-muted-foreground/30 border-t border-dashed border-muted-foreground/30" />
                    <span className="font-semibold whitespace-nowrap tracking-wide uppercase">
                      {i === 0 ? "ORM / Driver API" : i === 1 ? "System Call API" : "ISA / HAL"}
                    </span>
                    <div className="w-16 h-px bg-muted-foreground/30 border-t border-dashed border-muted-foreground/30" />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-3 rounded-lg border bg-muted/30 text-xs text-muted-foreground text-center">
        <span className="font-semibold">Key insight:</span> Your optimization ceiling is your abstraction layer{"'"}s floor.
        You can only optimize for what your layer lets you see.
      </div>
    </div>
  )
}
