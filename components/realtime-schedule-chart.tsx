"use client"

import { cn } from "@/lib/utils"
import { useMemo } from "react"

export interface RTProcess {
  name: string
  cost: number
  period: number
  deadline: number
  color: string
}

export interface ScheduleSlot {
  processIndex: number
  start: number
  end: number
}

export interface ScheduleAttempt {
  name: string
  slots: ScheduleSlot[]
}

export interface RealtimeScheduleChartProps {
  processes: RTProcess[]
  schedules: ScheduleAttempt[]
  totalTime: number
  cellWidth?: number
  className?: string
}

function checkDeadlines(
  process: RTProcess,
  processIndex: number,
  slots: ScheduleSlot[],
  totalTime: number
): { time: number; met: boolean }[] {
  const results: { time: number; met: boolean }[] = []
  let periodStart = 0

  while (periodStart < totalTime) {
    const deadlineTime = periodStart + process.deadline
    if (deadlineTime > totalTime) break

    // How much of the process's cost has been completed by the deadline?
    let completed = 0
    for (const slot of slots) {
      if (slot.processIndex !== processIndex) continue
      const overlapStart = Math.max(slot.start, periodStart)
      const overlapEnd = Math.min(slot.end, deadlineTime)
      if (overlapStart < overlapEnd) {
        completed += overlapEnd - overlapStart
      }
    }

    results.push({ time: deadlineTime, met: completed >= process.cost })
    periodStart += process.period
  }

  return results
}

export function RealtimeScheduleChart({
  processes,
  schedules,
  totalTime,
  cellWidth = 20,
  className,
}: RealtimeScheduleChartProps) {
  const timeSlots = Array.from({ length: totalTime }, (_, i) => i)
  const chartWidth = totalTime * cellWidth

  const scheduleValidations = useMemo(() => {
    return schedules.map((schedule) => {
      const allDeadlines = processes.flatMap((proc, pi) =>
        checkDeadlines(proc, pi, schedule.slots, totalTime)
      )
      const allMet = allDeadlines.every((d) => d.met)
      return { deadlines: allDeadlines, valid: allMet }
    })
  }, [processes, schedules, totalTime])

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Real-Time Schedule Chart
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Top: process requirements (colored blocks = computation needed, stars = deadlines).
        Bottom: schedule attempts. Scroll horizontally for longer timelines.
      </p>

      <div className="overflow-x-auto">
        <div style={{ minWidth: `${chartWidth + 100}px` }}>
          {/* Time axis header */}
          <div className="flex">
            <div className="w-24 shrink-0" />
            <div className="flex">
              {timeSlots.map((t) => (
                <div
                  key={t}
                  className="text-center text-xs font-mono text-muted-foreground/60 border-r border-muted-foreground/10"
                  style={{ width: `${cellWidth}px` }}
                >
                  {t % 5 === 0 ? t : ""}
                </div>
              ))}
            </div>
          </div>

          {/* Section label: Processes */}
          <div className="text-xs font-bold text-muted-foreground mt-2 mb-1 border-b pb-1">
            Process Requirements
          </div>

          {/* Process rows */}
          {processes.map((proc, pi) => {
            const periods: { start: number; end: number }[] = []
            let ps = 0
            while (ps < totalTime) {
              periods.push({ start: ps, end: ps + proc.cost })
              ps += proc.period
            }

            const deadlines: number[] = []
            ps = 0
            while (ps < totalTime) {
              const dl = ps + proc.deadline
              if (dl <= totalTime) deadlines.push(dl)
              ps += proc.period
            }

            return (
              <div key={pi} className="flex items-center">
                <div
                  className="w-24 shrink-0 text-xs font-semibold flex items-center gap-1.5 pr-2"
                  style={{ color: proc.color }}
                >
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: proc.color }}
                  />
                  <span className="truncate">{proc.name}</span>
                  <span className="text-muted-foreground font-normal">
                    c={proc.cost} p={proc.period}
                  </span>
                </div>
                <div className="flex relative">
                  {timeSlots.map((t) => {
                    const inPeriod = periods.some(
                      (p) => t >= p.start && t < p.end
                    )
                    const isDeadline = deadlines.includes(t)
                    return (
                      <div
                        key={t}
                        className={cn(
                          "border-r border-muted-foreground/10 relative",
                          inPeriod ? "border-b-2" : ""
                        )}
                        style={{
                          width: `${cellWidth}px`,
                          height: "24px",
                          backgroundColor: inPeriod
                            ? `${proc.color}30`
                            : "transparent",
                          borderBottomColor: inPeriod
                            ? proc.color
                            : "transparent",
                        }}
                      >
                        {isDeadline && (
                          <div
                            className="absolute -top-0.5 -right-1 text-xs z-10"
                            style={{ color: proc.color }}
                            title={`Deadline at t=${t}`}
                          >
                            ★
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Section label: Schedules */}
          <div className="text-xs font-bold text-muted-foreground mt-3 mb-1 border-b pb-1">
            Schedule Attempts
          </div>

          {/* Schedule rows */}
          {schedules.map((schedule, si) => {
            const validation = scheduleValidations[si]
            return (
              <div key={si} className="flex items-center">
                <div className="w-24 shrink-0 text-xs font-semibold pr-2 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold",
                      validation.valid
                        ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                        : "bg-red-500/20 text-red-700 dark:text-red-300"
                    )}
                  >
                    {validation.valid ? "✓" : "✗"}
                  </span>
                  <span className="truncate">{schedule.name}</span>
                </div>
                <div className="flex relative">
                  {timeSlots.map((t) => {
                    const slot = schedule.slots.find(
                      (s) => t >= s.start && t < s.end
                    )
                    const proc = slot
                      ? processes[slot.processIndex]
                      : null

                    // Check if this time overlaps a missed deadline
                    const missedHere = validation.deadlines.some(
                      (d) => d.time === t && !d.met
                    )

                    return (
                      <div
                        key={t}
                        className={cn(
                          "border-r border-muted-foreground/10 flex items-center justify-center text-xs font-mono",
                          missedHere && "ring-1 ring-red-500"
                        )}
                        style={{
                          width: `${cellWidth}px`,
                          height: "24px",
                          backgroundColor: proc
                            ? `${proc.color}50`
                            : "transparent",
                          color: proc?.color,
                        }}
                      >
                        {proc && (
                          <span className="font-bold text-xs leading-none">
                            {proc.name.charAt(0)}
                          </span>
                        )}
                        {missedHere && (
                          <span className="absolute text-red-500 text-xs -top-0.5 -right-0.5">
                            !
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 pt-2 border-t text-xs text-muted-foreground">
        {processes.map((proc) => (
          <div key={proc.name} className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: proc.color }}
            />
            <span>{proc.name}</span>
          </div>
        ))}
        <div className="flex items-center gap-1">
          <span>★</span>
          <span>Deadline</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-emerald-600">✓</span>
          <span>Valid</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-red-600">✗</span>
          <span>Invalid</span>
        </div>
      </div>
    </div>
  )
}
