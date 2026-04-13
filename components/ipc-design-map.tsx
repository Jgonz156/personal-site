"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

type MechanismId = "pipe" | "fifo" | "signal" | "msgq" | "shm" | "uds"

interface AxisValue {
  label: string
  color: string
}

interface MechanismDef {
  name: string
  data: AxisValue
  structure: AxisValue
  direction: AxisValue
  naming: AxisValue
  coordination: AxisValue
  persistence: AxisValue
  summary: string
}

const chip = (label: string, color: string): AxisValue => ({ label, color })

const mechanisms: Record<MechanismId, MechanismDef> = {
  pipe: {
    name: "Pipe",
    data:         chip("Copy",     "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    structure:    chip("Stream",   "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    direction:    chip("→ Uni",    "bg-slate-500/15 text-slate-700 dark:text-slate-300"),
    naming:       chip("Anonymous","bg-slate-500/15 text-slate-700 dark:text-slate-300"),
    coordination: chip("Kernel",  "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    persistence:  chip("Transient","bg-slate-500/15 text-slate-700 dark:text-slate-300"),
    summary: "Lightest setup — anonymous, unidirectional, kernel-buffered. The engine behind every shell pipe.",
  },
  fifo: {
    name: "FIFO",
    data:         chip("Copy",      "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    structure:    chip("Stream",    "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    direction:    chip("→ Uni",     "bg-slate-500/15 text-slate-700 dark:text-slate-300"),
    naming:       chip("Named",     "bg-green-500/15 text-green-700 dark:text-green-300"),
    coordination: chip("Kernel",   "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    persistence:  chip("Persistent","bg-green-500/15 text-green-700 dark:text-green-300"),
    summary: "A pipe with a filesystem name — unrelated processes can discover each other without shared ancestry.",
  },
  signal: {
    name: "Signal",
    data:         chip("Notify",    "bg-amber-500/15 text-amber-700 dark:text-amber-300"),
    structure:    chip("Enum",      "bg-amber-500/15 text-amber-700 dark:text-amber-300"),
    direction:    chip("→ Uni",     "bg-slate-500/15 text-slate-700 dark:text-slate-300"),
    naming:       chip("By PID",    "bg-amber-500/15 text-amber-700 dark:text-amber-300"),
    coordination: chip("Kernel",   "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    persistence:  chip("Transient", "bg-slate-500/15 text-slate-700 dark:text-slate-300"),
    summary: "Almost no data — just a signal number. The only IPC that works without the receiver opting in.",
  },
  msgq: {
    name: "Msg Queue",
    data:         chip("Copy",      "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    structure:    chip("Messages",  "bg-purple-500/15 text-purple-700 dark:text-purple-300"),
    direction:    chip("↔ Bi",      "bg-green-500/15 text-green-700 dark:text-green-300"),
    naming:       chip("Named",     "bg-green-500/15 text-green-700 dark:text-green-300"),
    coordination: chip("Kernel",   "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    persistence:  chip("Persistent","bg-green-500/15 text-green-700 dark:text-green-300"),
    summary: "Kernel preserves message boundaries — no framing protocol needed. Supports message types and priority.",
  },
  shm: {
    name: "Shared Mem",
    data:         chip("Share",     "bg-red-500/15 text-red-700 dark:text-red-300"),
    structure:    chip("Raw",       "bg-red-500/15 text-red-700 dark:text-red-300"),
    direction:    chip("↔ Bi",      "bg-green-500/15 text-green-700 dark:text-green-300"),
    naming:       chip("Named",     "bg-green-500/15 text-green-700 dark:text-green-300"),
    coordination: chip("Process ⚠","bg-red-500/15 text-red-700 dark:text-red-300"),
    persistence:  chip("Persistent","bg-green-500/15 text-green-700 dark:text-green-300"),
    summary: "Zero-copy — fastest possible, but processes must synchronize themselves. Maximum speed, minimum safety.",
  },
  uds: {
    name: "Unix Socket",
    data:         chip("Copy",      "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    structure:    chip("Both",      "bg-teal-500/15 text-teal-700 dark:text-teal-300"),
    direction:    chip("↔ Bi",      "bg-green-500/15 text-green-700 dark:text-green-300"),
    naming:       chip("Named",     "bg-green-500/15 text-green-700 dark:text-green-300"),
    coordination: chip("Kernel",   "bg-blue-500/15 text-blue-700 dark:text-blue-300"),
    persistence:  chip("Persistent","bg-green-500/15 text-green-700 dark:text-green-300"),
    summary: "Same API as network sockets — stream or datagram, bidirectional, and one line away from distributed.",
  },
}

const mechanismIds: MechanismId[] = ["pipe", "fifo", "signal", "msgq", "shm", "uds"]
const axes = ["data", "structure", "direction", "naming", "coordination", "persistence"] as const
const axisLabels: Record<typeof axes[number], string> = {
  data: "Data",
  structure: "Structure",
  direction: "Direction",
  naming: "Naming",
  coordination: "Coordination",
  persistence: "Persistence",
}

export function IPCDesignMap({ className }: { className?: string }) {
  const [selected, setSelected] = useState<MechanismId | null>(null)

  return (
    <div className={cn("my-6 border rounded-lg bg-card overflow-hidden", className)}>
      <div className="px-4 py-3 bg-muted/50 border-b">
        <h4 className="text-sm font-semibold">IPC Design-Space Map</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Click a mechanism to see its design tradeoffs.
        </p>
      </div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-xs border-collapse min-w-[580px]">
          <thead>
            <tr>
              <th className="text-left pb-2 pr-3 font-semibold text-muted-foreground">Mechanism</th>
              {axes.map(a => (
                <th key={a} className="pb-2 px-1.5 font-semibold text-muted-foreground text-center">
                  {axisLabels[a]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mechanismIds.map(id => {
              const m = mechanisms[id]
              const isSelected = selected === id
              const isDimmed = selected !== null && !isSelected
              return (
                <tr
                  key={id}
                  onClick={() => setSelected(isSelected ? null : id)}
                  className={cn(
                    "cursor-pointer transition-all duration-200 border-t border-border/40",
                    isSelected && "bg-primary/5",
                    isDimmed && "opacity-35",
                  )}
                >
                  <td className="py-2 pr-3 font-semibold whitespace-nowrap">{m.name}</td>
                  {axes.map(a => {
                    const val = m[a]
                    return (
                      <td key={a} className="py-2 px-1.5 text-center">
                        <span className={cn(
                          "inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap transition-all",
                          val.color,
                        )}>
                          {val.label}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>

        {selected && (
          <div className="mt-3 p-2.5 rounded border bg-muted/30 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{mechanisms[selected].name}:</span>{" "}
            {mechanisms[selected].summary}
          </div>
        )}
      </div>
    </div>
  )
}
