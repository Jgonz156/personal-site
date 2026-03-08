"use client"

import { cn } from "@/lib/utils"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface BankerProcess {
  name: string
  allocation: number[]
  max: number[]
}

interface BankersAlgorithmProps {
  initialProcesses: BankerProcess[]
  resourceNames?: string[]
  initialAvailable: number[]
  className?: string
}

function computeSafety(
  processes: BankerProcess[],
  available: number[]
): { safe: boolean; sequence: string[]; steps: SafetyStep[] } {
  const n = processes.length
  const m = available.length

  const work = [...available]
  const finish = new Array(n).fill(false)
  const sequence: string[] = []
  const steps: SafetyStep[] = []

  let found = true
  while (found) {
    found = false
    for (let i = 0; i < n; i++) {
      if (finish[i]) continue
      const need = processes[i].max.map(
        (mx, j) => mx - processes[i].allocation[j]
      )
      const canFinish = need.every((nd, j) => nd <= work[j])
      if (canFinish) {
        steps.push({
          process: processes[i].name,
          need: [...need],
          workBefore: [...work],
          workAfter: work.map((w, j) => w + processes[i].allocation[j]),
          granted: true,
        })
        for (let j = 0; j < m; j++) {
          work[j] += processes[i].allocation[j]
        }
        finish[i] = true
        sequence.push(processes[i].name)
        found = true
      }
    }
  }

  return {
    safe: finish.every(Boolean),
    sequence,
    steps,
  }
}

interface SafetyStep {
  process: string
  need: number[]
  workBefore: number[]
  workAfter: number[]
  granted: boolean
}

export function BankersAlgorithm({
  initialProcesses,
  resourceNames,
  initialAvailable,
  className,
}: BankersAlgorithmProps) {
  const [processes, setProcesses] = useState<BankerProcess[]>(initialProcesses)
  const [available, setAvailable] = useState<number[]>(initialAvailable)
  const m = available.length
  const rNames = resourceNames || available.map((_, i) => String.fromCharCode(65 + i))

  const result = useMemo(
    () => computeSafety(processes, available),
    [processes, available]
  )

  const updateAlloc = (pi: number, ri: number, val: number) => {
    setProcesses((prev) =>
      prev.map((p, i) =>
        i === pi
          ? { ...p, allocation: p.allocation.map((a, j) => (j === ri ? Math.max(0, val) : a)) }
          : p
      )
    )
  }

  const updateMax = (pi: number, ri: number, val: number) => {
    setProcesses((prev) =>
      prev.map((p, i) =>
        i === pi
          ? { ...p, max: p.max.map((mx, j) => (j === ri ? Math.max(0, val) : mx)) }
          : p
      )
    )
  }

  const updateAvailable = (ri: number, val: number) => {
    setAvailable((prev) => prev.map((a, j) => (j === ri ? Math.max(0, val) : a)))
  }

  const addProcess = () => {
    setProcesses((prev) => [
      ...prev,
      {
        name: `P${prev.length}`,
        allocation: new Array(m).fill(0),
        max: new Array(m).fill(1),
      },
    ])
  }

  const removeProcess = (idx: number) => {
    if (processes.length <= 1) return
    setProcesses((prev) => prev.filter((_, i) => i !== idx))
  }

  const reset = () => {
    setProcesses(initialProcesses)
    setAvailable(initialAvailable)
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        {"Banker's Algorithm — Safe State Calculator"}
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        {"Edit allocation, max need, and available resources. The algorithm determines if a safe execution sequence exists."}
      </p>

      {/* Available resources */}
      <div className="mb-4">
        <div className="text-xs font-semibold mb-1">Available Resources</div>
        <div className="flex gap-2 flex-wrap">
          {available.map((a, ri) => (
            <div key={ri} className="flex flex-col items-center gap-1">
              <span className="text-xs font-mono text-muted-foreground">
                {rNames[ri]}
              </span>
              <input
                type="number"
                min={0}
                value={a}
                onChange={(e) => updateAvailable(ri, parseInt(e.target.value) || 0)}
                className="w-14 h-8 text-center text-sm border rounded bg-background font-mono"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Process table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-semibold">Process</th>
              <th
                colSpan={m}
                className="text-center p-2 font-semibold border-l"
              >
                Allocation
              </th>
              <th
                colSpan={m}
                className="text-center p-2 font-semibold border-l"
              >
                Max Need
              </th>
              <th
                colSpan={m}
                className="text-center p-2 font-semibold border-l"
              >
                Need (Max - Alloc)
              </th>
              <th className="p-2 border-l"></th>
            </tr>
            <tr className="border-b text-muted-foreground">
              <td className="p-1"></td>
              {rNames.map((r) => (
                <td key={`a-${r}`} className="text-center p-1 border-l font-mono">
                  {r}
                </td>
              ))}
              {rNames.map((r) => (
                <td key={`m-${r}`} className="text-center p-1 border-l font-mono">
                  {r}
                </td>
              ))}
              {rNames.map((r) => (
                <td key={`n-${r}`} className="text-center p-1 border-l font-mono">
                  {r}
                </td>
              ))}
              <td className="p-1 border-l"></td>
            </tr>
          </thead>
          <tbody>
            {processes.map((p, pi) => {
              const need = p.max.map((mx, j) => mx - p.allocation[j])
              const hasInvalid = need.some((n) => n < 0)
              return (
                <tr
                  key={pi}
                  className={cn(
                    "border-b",
                    hasInvalid && "bg-red-500/5"
                  )}
                >
                  <td className="p-2 font-mono font-semibold">{p.name}</td>
                  {p.allocation.map((a, ri) => (
                    <td key={`a-${ri}`} className="p-1 border-l text-center">
                      <input
                        type="number"
                        min={0}
                        value={a}
                        onChange={(e) =>
                          updateAlloc(pi, ri, parseInt(e.target.value) || 0)
                        }
                        className="w-10 h-6 text-center text-xs border rounded bg-background font-mono"
                      />
                    </td>
                  ))}
                  {p.max.map((mx, ri) => (
                    <td key={`m-${ri}`} className="p-1 border-l text-center">
                      <input
                        type="number"
                        min={0}
                        value={mx}
                        onChange={(e) =>
                          updateMax(pi, ri, parseInt(e.target.value) || 0)
                        }
                        className="w-10 h-6 text-center text-xs border rounded bg-background font-mono"
                      />
                    </td>
                  ))}
                  {need.map((n, ri) => (
                    <td
                      key={`n-${ri}`}
                      className={cn(
                        "p-1 border-l text-center font-mono",
                        n < 0
                          ? "text-red-600 dark:text-red-400 font-bold"
                          : "text-muted-foreground"
                      )}
                    >
                      {n}
                    </td>
                  ))}
                  <td className="p-1 border-l text-center">
                    <button
                      onClick={() => removeProcess(pi)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                      title="Remove process"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mb-4">
        <Button variant="outline" size="sm" className="text-xs h-7" onClick={addProcess}>
          + Add Process
        </Button>
        <Button variant="outline" size="sm" className="text-xs h-7" onClick={reset}>
          ↺ Reset
        </Button>
      </div>

      {/* Result */}
      <div
        className={cn(
          "rounded-lg border-2 p-4 transition-all",
          result.safe
            ? "border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15"
            : "border-red-500 bg-red-500/10 dark:bg-red-500/15"
        )}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              "text-xl font-black",
              result.safe
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            )}
          >
            {result.safe ? "SAFE STATE" : "UNSAFE STATE"}
          </div>
        </div>

        {result.safe ? (
          <>
            <p className="text-xs text-muted-foreground mb-2">
              A safe execution sequence exists. The banker can satisfy all
              customers.
            </p>
            <div className="flex items-center gap-1 font-mono text-xs flex-wrap">
              <span className="text-muted-foreground">Safe sequence:</span>
              {result.sequence.map((name, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold">
                    {name}
                  </span>
                  {i < result.sequence.length - 1 && (
                    <span className="text-muted-foreground">{"→"}</span>
                  )}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs text-red-700 dark:text-red-300">
            No safe sequence exists. Granting this request could lead to
            deadlock. The banker should deny it.
          </p>
        )}

        {/* Step details */}
        {result.steps.length > 0 && (
          <div className="mt-3 pt-2 border-t border-current/10">
            <div className="text-xs font-semibold mb-1 text-muted-foreground">
              Algorithm trace:
            </div>
            <div className="space-y-1">
              {result.steps.map((s, i) => (
                <div key={i} className="text-xs font-mono flex items-center gap-2 flex-wrap">
                  <span className="font-bold">{i + 1}.</span>
                  <span className="px-1 rounded bg-muted">{s.process}</span>
                  <span className="text-muted-foreground">
                    need=[{s.need.join(",")}]
                  </span>
                  <span className="text-muted-foreground">{"≤"}</span>
                  <span className="text-muted-foreground">
                    work=[{s.workBefore.join(",")}]
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400">{"✓"}</span>
                  <span className="text-muted-foreground">
                    {"→"} work=[{s.workAfter.join(",")}]
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
