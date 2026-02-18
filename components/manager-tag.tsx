"use client"

import { cn } from "@/lib/utils"

export type ManagerType =
  | "pcb"
  | "pas"
  | "pec"
  | "scheduler"
  | "ipc"
  | "hierarchy"
  | "security"

const managerConfig: Record<
  ManagerType,
  { bg: string; text: string; border: string; label: string }
> = {
  pcb: {
    bg: "bg-sky-500/10 dark:bg-sky-500/15",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-400/40 dark:border-sky-500/30",
    label: "OS / PCB",
  },
  pas: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-400/40 dark:border-emerald-500/30",
    label: "Memory / PAS",
  },
  pec: {
    bg: "bg-purple-500/10 dark:bg-purple-500/15",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-400/40 dark:border-purple-500/30",
    label: "CPU / PEC",
  },
  scheduler: {
    bg: "bg-red-500/10 dark:bg-red-500/15",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-400/40 dark:border-red-500/30",
    label: "Scheduler",
  },
  ipc: {
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-400/40 dark:border-blue-500/30",
    label: "IPC",
  },
  hierarchy: {
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-400/40 dark:border-orange-500/30",
    label: "Hierarchy",
  },
  security: {
    bg: "bg-yellow-500/10 dark:bg-yellow-500/15",
    text: "text-yellow-700 dark:text-yellow-300",
    border: "border-yellow-400/40 dark:border-yellow-500/30",
    label: "Security",
  },
}

interface ManagerTagProps {
  manager: ManagerType
  children: React.ReactNode
  className?: string
}

export function ManagerTag({ manager, children, className }: ManagerTagProps) {
  const config = managerConfig[manager]
  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 rounded border text-xs font-semibold font-mono whitespace-nowrap",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {children}
    </span>
  )
}

export function ManagerLegend() {
  return (
    <div className="flex flex-wrap gap-2 my-4 p-3 border rounded-lg bg-card">
      <span className="text-xs text-muted-foreground font-semibold mr-1 self-center">
        Manager Legend:
      </span>
      {(Object.keys(managerConfig) as ManagerType[]).map((key) => (
        <ManagerTag key={key} manager={key}>
          {managerConfig[key].label}
        </ManagerTag>
      ))}
    </div>
  )
}
