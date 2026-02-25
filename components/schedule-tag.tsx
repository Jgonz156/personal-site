"use client"

import { cn } from "@/lib/utils"

export type ScheduleTagType = "feature" | "ready" | "running" | "blocked"

const tagConfig: Record<
  ScheduleTagType,
  { bg: string; text: string; border: string }
> = {
  feature: {
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-400/40 dark:border-orange-500/30",
  },
  ready: {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-400/40 dark:border-emerald-500/30",
  },
  running: {
    bg: "bg-purple-500/10 dark:bg-purple-500/15",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-400/40 dark:border-purple-500/30",
  },
  blocked: {
    bg: "bg-red-500/10 dark:bg-red-500/15",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-400/40 dark:border-red-500/30",
  },
}

interface ScheduleTagProps {
  type: ScheduleTagType
  children: React.ReactNode
  className?: string
}

export function ScheduleTag({ type, children, className }: ScheduleTagProps) {
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

export function ScheduleTagLegend() {
  return (
    <div className="flex flex-wrap gap-2 my-4 p-3 border rounded-lg bg-card">
      <span className="text-xs text-muted-foreground font-semibold mr-1 self-center">
        Color Legend:
      </span>
      <ScheduleTag type="feature">Key Feature</ScheduleTag>
      <ScheduleTag type="ready">Ready</ScheduleTag>
      <ScheduleTag type="running">Running</ScheduleTag>
      <ScheduleTag type="blocked">Blocked</ScheduleTag>
    </div>
  )
}
