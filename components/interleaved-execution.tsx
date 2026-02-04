"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export interface Program {
  name: string
  color: string
  timeline: ("run" | "io" | "blocked" | "idle")[]
}

export interface InterleavedExecutionProps {
  programs: Program[]
  showCPURow?: boolean
  animated?: boolean
  timeUnit?: string
  className?: string
}

const stateStyles = {
  run: "bg-current opacity-80",
  io: "bg-current opacity-30 border-2 border-dashed border-current",
  blocked: "bg-red-500/30 border-2 border-red-500",
  idle: "bg-transparent border border-dashed border-muted-foreground/30",
}

const stateLabels = {
  run: "RUN",
  io: "I/O",
  blocked: "BLK",
  idle: "",
}

export function InterleavedExecution({
  programs,
  showCPURow = true,
  animated = true,
  timeUnit = "ms",
  className,
}: InterleavedExecutionProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const maxTime = Math.max(...programs.map((p) => p.timeline.length))

  useEffect(() => {
    if (isPlaying && animated) {
      const timer = setTimeout(() => {
        setCurrentTime((prev) => {
          if (prev >= maxTime - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isPlaying, currentTime, maxTime, animated])

  // Determine which program is running on CPU at each time slot
  const getCPUOwner = (time: number): string | null => {
    for (const program of programs) {
      if (program.timeline[time] === "run") {
        return program.name
      }
    }
    return null
  }

  const reset = () => {
    setCurrentTime(0)
    setIsPlaying(false)
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card", className)}>
      {/* Controls */}
      {animated && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-sm">Interleaved Execution</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentTime((prev) => Math.max(0, prev - 1))}
              disabled={currentTime === 0}
            >
              ◀
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? "⏸" : "▶"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentTime((prev) => Math.min(maxTime - 1, prev + 1))}
              disabled={currentTime >= maxTime - 1}
            >
              ▶
            </Button>
            <Button variant="outline" size="sm" onClick={reset}>
              ↺
            </Button>
          </div>
        </div>
      )}

      {/* Timeline header */}
      <div className="flex mb-2">
        <div className="w-24 shrink-0 text-xs text-muted-foreground font-semibold">
          Time ({timeUnit})
        </div>
        <div className="flex-1 flex">
          {Array.from({ length: maxTime }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 text-center text-xs font-mono border-r last:border-r-0 py-1",
                animated && i === currentTime && "bg-primary/20 font-bold"
              )}
            >
              {i}
            </div>
          ))}
        </div>
      </div>

      {/* Program rows */}
      {programs.map((program) => (
        <div key={program.name} className="flex mb-1">
          <div
            className="w-24 shrink-0 text-xs font-semibold flex items-center gap-2"
            style={{ color: program.color }}
          >
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: program.color }}
            />
            {program.name}
          </div>
          <div className="flex-1 flex">
            {Array.from({ length: maxTime }).map((_, i) => {
              const state = program.timeline[i] || "idle"
              const isActive = animated && i <= currentTime
              return (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-8 flex items-center justify-center text-xs font-mono border-r last:border-r-0 transition-all duration-300",
                    stateStyles[state],
                    !isActive && animated && "opacity-20"
                  )}
                  style={{ color: program.color }}
                >
                  {stateLabels[state]}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* CPU row */}
      {showCPURow && (
        <div className="flex mt-2 pt-2 border-t">
          <div className="w-24 shrink-0 text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-purple-500" />
            CPU
          </div>
          <div className="flex-1 flex">
            {Array.from({ length: maxTime }).map((_, i) => {
              const owner = getCPUOwner(i)
              const ownerProgram = programs.find((p) => p.name === owner)
              const isActive = animated && i <= currentTime
              return (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-8 flex items-center justify-center text-xs font-bold border-r last:border-r-0 transition-all duration-300",
                    owner ? "opacity-90" : "opacity-20",
                    !isActive && animated && "opacity-10"
                  )}
                  style={{
                    backgroundColor: ownerProgram
                      ? `${ownerProgram.color}40`
                      : "transparent",
                    color: ownerProgram?.color,
                  }}
                >
                  {owner ? owner.charAt(0) : "-"}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-4 mt-4 pt-2 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-muted-foreground/60 rounded" />
          <span>Running</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-muted-foreground/20 border-2 border-dashed border-muted-foreground rounded" />
          <span>Waiting I/O</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-500/30 border-2 border-red-500 rounded" />
          <span>Blocked</span>
        </div>
      </div>
    </div>
  )
}

// Pre-defined example for the lecture
export const multiprogrammingExample: Program[] = [
  {
    name: "Program A",
    color: "#3B82F6", // blue
    timeline: ["run", "run", "io", "io", "run", "run", "idle", "idle"],
  },
  {
    name: "Program B",
    color: "#22C55E", // green
    timeline: ["idle", "idle", "run", "run", "io", "io", "run", "run"],
  },
]
