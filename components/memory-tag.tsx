"use client"

import { cn } from "@/lib/utils"

export type MemoryTagType =
  | "volatile"
  | "nonvolatile"
  | "semivolatile"
  | "speed"
  | "cost"
  | "hardware"
  | "logical"
  | "physical"

const tagConfig: Record<
  MemoryTagType,
  { bg: string; text: string; border: string; label: string }
> = {
  volatile: {
    bg: "bg-red-500/10 dark:bg-red-500/15",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-400/40 dark:border-red-500/30",
    label: "Volatile",
  },
  nonvolatile: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-400/40 dark:border-emerald-500/30",
    label: "Non-Volatile",
  },
  semivolatile: {
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-400/40 dark:border-amber-500/30",
    label: "Semi-Volatile",
  },
  speed: {
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-400/40 dark:border-violet-500/30",
    label: "Speed",
  },
  cost: {
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-400/40 dark:border-blue-500/30",
    label: "Cost",
  },
  hardware: {
    bg: "bg-teal-500/10 dark:bg-teal-500/15",
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-400/40 dark:border-teal-500/30",
    label: "Hardware",
  },
  logical: {
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-400/40 dark:border-blue-500/30",
    label: "Logical",
  },
  physical: {
    bg: "bg-green-500/10 dark:bg-green-500/15",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-400/40 dark:border-green-500/30",
    label: "Physical",
  },
}

interface MemoryTagProps {
  type: MemoryTagType
  children: React.ReactNode
  className?: string
}

export function MemoryTag({ type, children, className }: MemoryTagProps) {
  const config = tagConfig[type]
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

export function MemoryTagLegend() {
  return (
    <div className="flex flex-wrap gap-2 my-4 p-3 border rounded-lg bg-card">
      <span className="text-xs text-muted-foreground font-semibold mr-1 self-center">
        Color Legend:
      </span>
      {(Object.keys(tagConfig) as MemoryTagType[]).map((key) => (
        <MemoryTag key={key} type={key}>
          {tagConfig[key].label}
        </MemoryTag>
      ))}
    </div>
  )
}
