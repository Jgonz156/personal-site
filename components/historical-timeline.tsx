"use client"

import { cn } from "@/lib/utils"

export interface TimelineEvent {
  year: string
  label: string
  description?: string
}

export interface HistoricalTimelineProps {
  events: TimelineEvent[]
  title?: string
  highlightIndex?: number
  compact?: boolean
  className?: string
}

export function HistoricalTimeline({
  events,
  title,
  highlightIndex,
  compact = false,
  className,
}: HistoricalTimelineProps) {
  return (
    <div className={cn("w-full", className)}>
      {title && (
        <h4 className="text-sm font-semibold text-muted-foreground mb-2">{title}</h4>
      )}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-3 left-0 right-0 h-0.5 bg-border" />
        
        {/* Events */}
        <div className="flex justify-between relative">
          {events.map((event, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center text-center",
                compact ? "max-w-16" : "max-w-24"
              )}
            >
              {/* Dot */}
              <div
                className={cn(
                  "w-3 h-3 rounded-full border-2 bg-background z-10 transition-all",
                  highlightIndex === index
                    ? "border-primary bg-primary scale-125"
                    : "border-muted-foreground"
                )}
              />
              
              {/* Year */}
              <span
                className={cn(
                  "text-xs font-semibold mt-1",
                  highlightIndex === index
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {event.year}
              </span>
              
              {/* Label */}
              <span
                className={cn(
                  "text-xs leading-tight",
                  compact ? "hidden sm:block" : "",
                  highlightIndex === index
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {event.label}
              </span>
              
              {/* Description (optional, only shown when highlighted) */}
              {event.description && highlightIndex === index && !compact && (
                <span className="text-xs text-muted-foreground mt-1 max-w-20">
                  {event.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Pre-defined timelines for the lecture
export const hardwareEvolutionTimeline: TimelineEvent[] = [
  { year: "1940s", label: "Vacuum Tubes" },
  { year: "1950s", label: "Transistors" },
  { year: "1960s", label: "ICs" },
  { year: "1970s", label: "Microprocessors" },
  { year: "2000s+", label: "Multi-core" },
]

export const processEvolutionTimeline: TimelineEvent[] = [
  { year: "1950s", label: "Single Program" },
  { year: "Late 50s", label: "Batch" },
  { year: "1960s", label: "Multiprogramming" },
  { year: "1970s", label: "Time-Sharing" },
  { year: "1980s+", label: "Preemptive" },
]

export const memoryEvolutionTimeline: TimelineEvent[] = [
  { year: "1950s", label: "Flat Memory" },
  { year: "1960s", label: "Base+Bounds" },
  { year: "1970s", label: "Segmentation" },
  { year: "1980s", label: "Paging" },
  { year: "1990s+", label: "Virtual Memory" },
]

export const threadEvolutionTimeline: TimelineEvent[] = [
  { year: "1970s", label: "Processes Only" },
  { year: "1980s", label: "Kernel Threads" },
  { year: "1995", label: "POSIX Threads" },
  { year: "2000s", label: "Green Threads" },
  { year: "2010s+", label: "M:N Models" },
]
