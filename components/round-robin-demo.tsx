"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { JobQueueTape, type Job } from "@/components/job-queue-tape"

export interface RoundRobinDemoProps {
  jobs: Job[]
  contextSwitchCost?: number
  className?: string
}

function buildRoundRobinSchedule(
  jobs: Job[],
  quantum: number
): Job[] {
  const remaining = jobs.map((j) => ({ ...j, left: j.runtime }))
  const schedule: Job[] = []
  let active = true

  while (active) {
    active = false
    for (const job of remaining) {
      if (job.left <= 0) continue
      active = true
      const slice = Math.min(quantum, job.left)
      schedule.push({
        name: job.name,
        runtime: slice,
        color: job.color,
      })
      job.left -= slice
    }
  }

  return schedule
}

export function RoundRobinDemo({
  jobs,
  contextSwitchCost = 1,
  className,
}: RoundRobinDemoProps) {
  const maxRuntime = Math.max(...jobs.map((j) => j.runtime))
  const [quantum, setQuantum] = useState(Math.min(10, maxRuntime))

  const schedule = useMemo(
    () => buildRoundRobinSchedule(jobs, quantum),
    [jobs, quantum]
  )

  const workTime = schedule.reduce((a, j) => a + j.runtime, 0)
  const numSwitches = Math.max(0, schedule.length - 1)
  const switchTime = numSwitches * contextSwitchCost
  const totalTime = workTime + switchTime
  const overheadPct = totalTime > 0 ? (switchTime / totalTime) * 100 : 0

  const isFCFS = quantum >= maxRuntime
  const isDegenerate = quantum <= contextSwitchCost

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Round Robin — Time Quantum Explorer
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Drag the slider to see how the time quantum affects context switch
        overhead. Context switch cost = {contextSwitchCost}u.
      </p>

      {/* Slider */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs text-muted-foreground w-20 shrink-0">
          Quantum: <strong className="text-foreground">{quantum}u</strong>
        </span>
        <input
          type="range"
          min={1}
          max={maxRuntime}
          value={quantum}
          onChange={(e) => setQuantum(Number(e.target.value))}
          className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <span className="text-xs text-muted-foreground w-12 text-right">
          {maxRuntime}u
        </span>
      </div>

      {/* Warning badges */}
      {isFCFS && (
        <div className="mb-3 p-2 rounded border border-amber-400/40 bg-amber-500/5 text-xs text-amber-700 dark:text-amber-300">
          {"Quantum >= longest job — this is just FCFS! No preemption occurs."}
        </div>
      )}
      {isDegenerate && (
        <div className="mb-3 p-2 rounded border border-red-400/40 bg-red-500/5 text-xs text-red-700 dark:text-red-300">
          Quantum &lt;= context switch cost — more time switching than computing!
        </div>
      )}

      {/* The schedule tape */}
      <JobQueueTape
        jobs={schedule}
        label={`Round Robin (q=${quantum}u)`}
        showContextSwitches
        contextSwitchCost={contextSwitchCost}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        <div className="border rounded p-2 text-center">
          <div className="text-xs text-muted-foreground">Total Time</div>
          <div className="text-lg font-bold">{totalTime}u</div>
        </div>
        <div className="border rounded p-2 text-center">
          <div className="text-xs text-muted-foreground">Switches</div>
          <div className="text-lg font-bold">{numSwitches}</div>
        </div>
        <div className="border rounded p-2 text-center">
          <div className="text-xs text-muted-foreground">Switch Time</div>
          <div className="text-lg font-bold">{switchTime}u</div>
        </div>
        <div className="border rounded p-2 text-center">
          <div className="text-xs text-muted-foreground">Overhead</div>
          <div
            className={cn(
              "text-lg font-bold",
              overheadPct > 40
                ? "text-red-600 dark:text-red-400"
                : overheadPct > 20
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-emerald-600 dark:text-emerald-400"
            )}
          >
            {overheadPct.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  )
}
