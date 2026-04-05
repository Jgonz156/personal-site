"use client"

import { cn } from "@/lib/utils"

export type IOTagType = "block" | "character" | "network"

const tagConfig: Record<
  IOTagType,
  { bg: string; text: string; border: string; label: string }
> = {
  block: {
    bg: "bg-orange-500/10 dark:bg-orange-500/15",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-400/40 dark:border-orange-500/30",
    label: "Block",
  },
  character: {
    bg: "bg-sky-500/10 dark:bg-sky-500/15",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-400/40 dark:border-sky-500/30",
    label: "Character",
  },
  network: {
    bg: "bg-fuchsia-500/10 dark:bg-fuchsia-500/15",
    text: "text-fuchsia-700 dark:text-fuchsia-300",
    border: "border-fuchsia-400/40 dark:border-fuchsia-500/30",
    label: "Network",
  },
}

interface IOTagProps {
  type: IOTagType
  children: React.ReactNode
  className?: string
}

export function IOTag({ type, children, className }: IOTagProps) {
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

export function IOTagLegend() {
  return (
    <div className="flex flex-wrap gap-2 my-4 p-3 border rounded-lg bg-card">
      <span className="text-xs text-muted-foreground font-semibold mr-1 self-center">
        I/O Device Types:
      </span>
      {(Object.keys(tagConfig) as IOTagType[]).map((key) => (
        <IOTag key={key} type={key}>
          {tagConfig[key].label}
        </IOTag>
      ))}
    </div>
  )
}
