"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

interface Condition {
  id: string
  name: string
  short: string
  description: string
  escapeRoute: string
}

const conditions: Condition[] = [
  {
    id: "mutual-exclusion",
    name: "Mutual Exclusion",
    short: "ME",
    description: "Only one process can hold a resource at a time.",
    escapeRoute:
      "Use spooling or virtualization (e.g., a print spooler lets many processes 'print' simultaneously). Share read-only resources freely.",
  },
  {
    id: "hold-and-wait",
    name: "Hold & Wait",
    short: "HW",
    description:
      "A process holding at least one resource is blocked waiting to acquire another.",
    escapeRoute:
      "Require processes to request all resources upfront (atomic acquisition), or release all held resources before requesting new ones.",
  },
  {
    id: "no-preemption",
    name: "No Preemption",
    short: "NP",
    description:
      "Resources cannot be forcibly taken from a process — only voluntarily released.",
    escapeRoute:
      "Allow the OS to preempt resources (checkpoint and roll back the process). Use preemptive scheduling that can forcibly reclaim CPU time.",
  },
  {
    id: "circular-wait",
    name: "Circular Wait",
    short: "CW",
    description:
      "A cycle exists: each process waits for a resource held by the next process in the chain.",
    escapeRoute:
      "Impose a total ordering on all resources. Processes must acquire resources in ascending order, making cycles structurally impossible.",
  },
]

export function CoffmanConditionsPanel({
  className,
}: {
  className?: string
}) {
  const [active, setActive] = useState<Record<string, boolean>>({
    "mutual-exclusion": true,
    "hold-and-wait": true,
    "no-preemption": true,
    "circular-wait": true,
  })

  const activeCount = Object.values(active).filter(Boolean).length
  const isDeadlock = activeCount === 4
  const inactiveConditions = conditions.filter((c) => !active[c.id])

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        {"Coffman's Four Conditions"}
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        Toggle conditions to see when deadlock is possible. All four must hold
        simultaneously.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {conditions.map((cond) => {
          const isOn = active[cond.id]
          return (
            <button
              key={cond.id}
              onClick={() =>
                setActive((prev) => ({ ...prev, [cond.id]: !prev[cond.id] }))
              }
              className={cn(
                "relative rounded-lg border-2 p-3 text-left transition-all",
                isOn
                  ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15"
                  : "border-muted bg-muted/30 opacity-60"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    "text-xs font-bold font-mono",
                    isOn
                      ? "text-amber-700 dark:text-amber-300"
                      : "text-muted-foreground"
                  )}
                >
                  {cond.short}
                </span>
                <div
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    isOn ? "bg-amber-500" : "bg-muted-foreground/30"
                  )}
                />
              </div>
              <div
                className={cn(
                  "text-xs font-semibold leading-tight",
                  isOn ? "" : "text-muted-foreground"
                )}
              >
                {cond.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1 leading-snug">
                {cond.description}
              </div>
            </button>
          )
        })}
      </div>

      {/* Deadlock indicator */}
      <div
        className={cn(
          "rounded-lg border-2 p-4 text-center transition-all",
          isDeadlock
            ? "border-red-500 bg-red-500/10 dark:bg-red-500/15"
            : "border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15"
        )}
      >
        {isDeadlock ? (
          <>
            <div className="text-2xl font-black text-red-600 dark:text-red-400 animate-pulse">
              DEADLOCK
            </div>
            <p className="text-xs text-red-700 dark:text-red-300 mt-1">
              All 4 conditions are met — deadlock is guaranteed. Toggle any
              condition off to break it.
            </p>
          </>
        ) : (
          <>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              SAFE
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeCount}/4 conditions active — deadlock is impossible.
            </p>
            {inactiveConditions.length > 0 && (
              <div className="mt-3 space-y-2 text-left">
                {inactiveConditions.map((cond) => (
                  <div
                    key={cond.id}
                    className="text-xs p-2 rounded bg-emerald-500/5 border border-emerald-400/30"
                  >
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                      {cond.name} broken:
                    </span>{" "}
                    <span className="text-muted-foreground">
                      {cond.escapeRoute}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* AND relationship visualization */}
      <div className="flex items-center justify-center gap-1 mt-4 text-xs font-mono text-muted-foreground">
        {conditions.map((cond, i) => (
          <span key={cond.id} className="flex items-center gap-1">
            <span
              className={cn(
                "px-1.5 py-0.5 rounded font-bold",
                active[cond.id]
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                  : "bg-muted text-muted-foreground line-through"
              )}
            >
              {cond.short}
            </span>
            {i < conditions.length - 1 && <span className="opacity-50">AND</span>}
          </span>
        ))}
        <span className="mx-1">=</span>
        <span
          className={cn(
            "px-2 py-0.5 rounded font-bold",
            isDeadlock
              ? "bg-red-500/20 text-red-600 dark:text-red-400"
              : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
          )}
        >
          {isDeadlock ? "DEADLOCK" : "SAFE"}
        </span>
      </div>
    </div>
  )
}
