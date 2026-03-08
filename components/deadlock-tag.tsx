"use client"

import { cn } from "@/lib/utils"

export type DeadlockTagType =
  | "resource"
  | "condition"
  | "danger"
  | "safe"
  | "technique"

const tagConfig: Record<
  DeadlockTagType,
  { bg: string; text: string; border: string; label: string }
> = {
  resource: {
    bg: "bg-teal-500/10 dark:bg-teal-500/15",
    text: "text-teal-700 dark:text-teal-300",
    border: "border-teal-400/40 dark:border-teal-500/30",
    label: "Resource",
  },
  condition: {
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-400/40 dark:border-amber-500/30",
    label: "Condition",
  },
  danger: {
    bg: "bg-red-500/10 dark:bg-red-500/15",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-400/40 dark:border-red-500/30",
    label: "Danger",
  },
  safe: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-400/40 dark:border-emerald-500/30",
    label: "Safe",
  },
  technique: {
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-400/40 dark:border-violet-500/30",
    label: "Technique",
  },
}

interface DeadlockTagProps {
  type: DeadlockTagType
  children: React.ReactNode
  className?: string
}

export function DeadlockTag({ type, children, className }: DeadlockTagProps) {
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

export function DeadlockTagLegend() {
  return (
    <div className="flex flex-wrap gap-2 my-4 p-3 border rounded-lg bg-card">
      <span className="text-xs text-muted-foreground font-semibold mr-1 self-center">
        Color Legend:
      </span>
      {(Object.keys(tagConfig) as DeadlockTagType[]).map((key) => (
        <DeadlockTag key={key} type={key}>
          {tagConfig[key].label}
        </DeadlockTag>
      ))}
    </div>
  )
}
