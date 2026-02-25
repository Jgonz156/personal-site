"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface RTProcess {
  name: string
  cost: number
  period: number
}

export interface SchedulabilityCalculatorProps {
  initialProcesses?: RTProcess[]
  className?: string
}

const defaultProcesses: RTProcess[] = [
  { name: "A", cost: 50, period: 100 },
  { name: "B", cost: 30, period: 200 },
  { name: "C", cost: 100, period: 500 },
]

export function SchedulabilityCalculator({
  initialProcesses = defaultProcesses,
  className,
}: SchedulabilityCalculatorProps) {
  const [processes, setProcesses] = useState<RTProcess[]>(initialProcesses)

  const updateProcess = (
    idx: number,
    field: keyof RTProcess,
    value: string
  ) => {
    setProcesses((prev) =>
      prev.map((p, i) => {
        if (i !== idx) return p
        if (field === "name") return { ...p, name: value }
        const num = parseInt(value) || 0
        return { ...p, [field]: Math.max(1, num) }
      })
    )
  }

  const addProcess = () => {
    const nextName = String.fromCharCode(65 + processes.length)
    setProcesses((prev) => [...prev, { name: nextName, cost: 10, period: 50 }])
  }

  const removeProcess = (idx: number) => {
    if (processes.length <= 1) return
    setProcesses((prev) => prev.filter((_, i) => i !== idx))
  }

  const ratios = processes.map((p) => p.cost / p.period)
  const totalUtilization = ratios.reduce((a, b) => a + b, 0)
  const schedulable = totalUtilization <= 1
  const rmsLimit =
    processes.length * (Math.pow(2, 1 / processes.length) - 1)

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Schedulability Calculator
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Edit the process parameters to explore schedulability. The sum of
        (Cost / Period) must be &le; 1.
      </p>

      {/* Process inputs */}
      <div className="space-y-2 mb-4">
        <div className="grid grid-cols-[60px_1fr_1fr_1fr_40px] gap-2 text-xs font-semibold text-muted-foreground">
          <span>Name</span>
          <span>Cost (C)</span>
          <span>Period (P)</span>
          <span>C / P</span>
          <span />
        </div>
        {processes.map((p, i) => {
          const ratio = ratios[i]
          return (
            <div
              key={i}
              className="grid grid-cols-[60px_1fr_1fr_1fr_40px] gap-2 items-center"
            >
              <input
                type="text"
                value={p.name}
                onChange={(e) => updateProcess(i, "name", e.target.value)}
                className="border rounded px-2 py-1 text-sm font-mono bg-background w-full"
                maxLength={4}
              />
              <input
                type="number"
                value={p.cost}
                onChange={(e) => updateProcess(i, "cost", e.target.value)}
                className="border rounded px-2 py-1 text-sm font-mono bg-background w-full"
                min={1}
              />
              <input
                type="number"
                value={p.period}
                onChange={(e) => updateProcess(i, "period", e.target.value)}
                className="border rounded px-2 py-1 text-sm font-mono bg-background w-full"
                min={1}
              />
              <div className="flex items-center gap-1">
                <div
                  className="h-3 rounded-sm"
                  style={{
                    width: `${Math.min(ratio * 100, 100)}%`,
                    backgroundColor:
                      ratio > 0.5
                        ? "#EF4444"
                        : ratio > 0.3
                          ? "#F59E0B"
                          : "#22C55E",
                    minWidth: "4px",
                  }}
                />
                <span className="text-xs font-mono text-muted-foreground">
                  {ratio.toFixed(3)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProcess(i)}
                className="text-xs h-7 w-7 p-0 text-muted-foreground"
                disabled={processes.length <= 1}
              >
                ✕
              </Button>
            </div>
          )
        })}
        <Button
          variant="outline"
          size="sm"
          onClick={addProcess}
          className="text-xs"
        >
          + Add Process
        </Button>
      </div>

      {/* Total utilization bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground font-semibold">
            Total Utilization
          </span>
          <span
            className={cn(
              "font-bold font-mono",
              schedulable
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            {(totalUtilization * 100).toFixed(1)}%
          </span>
        </div>
        <div className="h-5 rounded border bg-muted/30 overflow-hidden relative">
          {/* Stacked bars for each process */}
          <div className="h-full flex">
            {ratios.map((r, i) => (
              <div
                key={i}
                className="h-full border-r border-background/50"
                style={{
                  width: `${Math.min(r * 100, 100 - ratios.slice(0, i).reduce((a, b) => a + b, 0) * 100)}%`,
                  backgroundColor:
                    ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"][
                      i % 6
                    ],
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
          {/* 100% line */}
          <div className="absolute right-0 top-0 h-full w-px bg-foreground/30" />
          {/* RMS limit line */}
          {rmsLimit < 1 && (
            <div
              className="absolute top-0 h-full w-px bg-amber-500 border-l border-dashed border-amber-500"
              style={{ left: `${rmsLimit * 100}%` }}
              title={`RMS limit: ${(rmsLimit * 100).toFixed(1)}%`}
            />
          )}
        </div>
        <div className="flex justify-between text-xs mt-0.5 text-muted-foreground/60">
          <span>0%</span>
          {rmsLimit < 1 && (
            <span
              style={{ marginLeft: `${rmsLimit * 100 - 5}%` }}
              className="text-amber-600 dark:text-amber-400"
            >
              RMS: {(rmsLimit * 100).toFixed(0)}%
            </span>
          )}
          <span>100%</span>
        </div>
      </div>

      {/* Verdict */}
      <div
        className={cn(
          "rounded-lg p-3 border text-center",
          schedulable
            ? "bg-emerald-500/10 border-emerald-400/40"
            : "bg-red-500/10 border-red-400/40"
        )}
      >
        <div
          className={cn(
            "text-lg font-bold",
            schedulable
              ? "text-emerald-700 dark:text-emerald-300"
              : "text-red-700 dark:text-red-300"
          )}
        >
          {schedulable ? "Schedulable" : "NOT Schedulable"}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {schedulable
            ? `${((1 - totalUtilization) * 100).toFixed(1)}% wiggle room. ${
                totalUtilization <= rmsLimit
                  ? "Within RMS bound — both RMS and EDF can find valid schedules."
                  : "Above RMS bound (" +
                    (rmsLimit * 100).toFixed(0) +
                    "%) — only EDF is guaranteed to find a valid schedule."
              }`
            : "Utilization exceeds 100% — no valid schedule exists for any algorithm."}
        </div>
      </div>
    </div>
  )
}
