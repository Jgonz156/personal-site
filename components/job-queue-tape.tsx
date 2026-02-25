"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

export interface Job {
  name: string
  runtime: number
  color: string
}

export interface JobQueueTapeProps {
  jobs: Job[]
  label?: string
  showContextSwitches?: boolean
  contextSwitchCost?: number
  highlightIndex?: number
  animated?: boolean
  className?: string
}

interface TapeSegment {
  type: "job" | "switch"
  jobIndex?: number
  name: string
  duration: number
  color: string
  startTime: number
}

function buildSegments(
  jobs: Job[],
  showSwitches: boolean,
  switchCost: number
): TapeSegment[] {
  const segments: TapeSegment[] = []
  let time = 0
  jobs.forEach((job, i) => {
    if (showSwitches && i > 0) {
      segments.push({
        type: "switch",
        name: "CS",
        duration: switchCost,
        color: "#6B7280",
        startTime: time,
      })
      time += switchCost
    }
    segments.push({
      type: "job",
      jobIndex: i,
      name: job.name,
      duration: job.runtime,
      color: job.color,
      startTime: time,
    })
    time += job.runtime
  })
  return segments
}

export function JobQueueTape({
  jobs,
  label,
  showContextSwitches = false,
  contextSwitchCost = 1,
  highlightIndex,
  animated = false,
  className,
}: JobQueueTapeProps) {
  const segments = buildSegments(jobs, showContextSwitches, contextSwitchCost)
  const totalTime = segments.reduce((s, seg) => s + seg.duration, 0)

  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(false)

  const reset = useCallback(() => {
    setElapsed(0)
    setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing || !animated) return
    if (elapsed >= totalTime) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(() => setElapsed((e) => e + 1), 200)
    return () => clearTimeout(timer)
  }, [playing, elapsed, totalTime, animated])

  const currentSegment = segments.find(
    (s) => elapsed >= s.startTime && elapsed < s.startTime + s.duration
  )

  const jobTime = segments
    .filter((s) => s.type === "job")
    .reduce((a, s) => a + s.duration, 0)
  const switchTime = totalTime - jobTime

  return (
    <div className={cn("border rounded-lg p-3 bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {label && (
            <span className="text-sm font-semibold">{label}</span>
          )}
          <span className="text-xs text-muted-foreground">
            Total: {totalTime}u
            {switchTime > 0 && (
              <span className="ml-1">
                (work: {jobTime}u, switches: {switchTime}u,{" "}
                overhead: {((switchTime / totalTime) * 100).toFixed(1)}%)
              </span>
            )}
          </span>
        </div>
        {animated && (
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPlaying(!playing)}
              className="text-xs h-7"
            >
              {playing ? "⏸" : "▶"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              className="text-xs h-7"
            >
              ↺
            </Button>
          </div>
        )}
      </div>

      {/* Tape */}
      <div className="relative">
        <div className="flex rounded overflow-hidden border">
          {segments.map((seg, i) => {
            const widthPercent = (seg.duration / totalTime) * 100
            const isActive =
              animated && currentSegment === seg
            const isHighlighted =
              highlightIndex !== undefined && seg.jobIndex === highlightIndex
            const isPast = animated && elapsed > seg.startTime + seg.duration

            return (
              <div
                key={i}
                className={cn(
                  "relative flex items-center justify-center text-xs font-mono border-r last:border-r-0 transition-all overflow-hidden",
                  seg.type === "switch"
                    ? "bg-gray-400/30 dark:bg-gray-600/30"
                    : "",
                  isActive && "ring-2 ring-primary z-10",
                  isHighlighted && "ring-2 ring-yellow-400 z-10",
                  animated && !isPast && !isActive && "opacity-40"
                )}
                style={{
                  width: `${widthPercent}%`,
                  minWidth: seg.type === "switch" ? "8px" : "24px",
                  height: "40px",
                  backgroundColor:
                    seg.type === "job"
                      ? `${seg.color}50`
                      : undefined,
                  borderLeft:
                    seg.type === "job"
                      ? `3px solid ${seg.color}`
                      : undefined,
                }}
              >
                {widthPercent > 4 && (
                  <span
                    className={cn(
                      "font-bold text-xs truncate px-1",
                      seg.type === "switch"
                        ? "text-muted-foreground"
                        : ""
                    )}
                    style={
                      seg.type === "job"
                        ? { color: seg.color }
                        : undefined
                    }
                  >
                    {seg.name}
                    {seg.type === "job" && widthPercent > 8 && (
                      <span className="font-normal opacity-70 ml-0.5">
                        ({seg.duration}u)
                      </span>
                    )}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Read head */}
        {animated && elapsed < totalTime && (
          <div
            className="absolute top-0 h-full w-0.5 bg-primary z-20 transition-all"
            style={{
              left: `${(elapsed / totalTime) * 100}%`,
            }}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-mono text-primary font-bold">
              {elapsed}u
            </div>
          </div>
        )}
      </div>

      {/* Current status */}
      {animated && (
        <div className="mt-2 text-xs text-muted-foreground">
          {elapsed >= totalTime ? (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              Complete!
            </span>
          ) : currentSegment ? (
            <span>
              t={elapsed}u:{" "}
              {currentSegment.type === "switch" ? (
                <span className="text-muted-foreground">Context switching...</span>
              ) : (
                <span style={{ color: currentSegment.color }} className="font-semibold">
                  {currentSegment.name}
                </span>
              )}
            </span>
          ) : null}
        </div>
      )}

      {/* Time axis */}
      <div className="flex mt-1">
        {segments.map((seg, i) => {
          const widthPercent = (seg.duration / totalTime) * 100
          return (
            <div
              key={i}
              className="text-center text-xs text-muted-foreground/60 font-mono"
              style={{
                width: `${widthPercent}%`,
                minWidth: seg.type === "switch" ? "8px" : "24px",
              }}
            >
              {widthPercent > 6 ? seg.startTime : ""}
            </div>
          )
        })}
      </div>
    </div>
  )
}
