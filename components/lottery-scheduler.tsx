"use client"

import { cn } from "@/lib/utils"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface LotteryProcess {
  name: string
  tickets: number
  color: string
}

const defaultProcesses: LotteryProcess[] = [
  { name: "P1", tickets: 50, color: "#3B82F6" },
  { name: "P2", tickets: 30, color: "#22C55E" },
  { name: "P3", tickets: 15, color: "#F59E0B" },
  { name: "P4", tickets: 5, color: "#EF4444" },
]

export interface LotterySchedulerProps {
  className?: string
}

export function LotteryScheduler({ className }: LotterySchedulerProps) {
  const [processes, setProcesses] = useState<LotteryProcess[]>(defaultProcesses)
  const [history, setHistory] = useState<string[]>([])
  const [lastWinner, setLastWinner] = useState<string | null>(null)
  const [lastTicket, setLastTicket] = useState<number | null>(null)

  const totalTickets = processes.reduce((s, p) => s + p.tickets, 0)

  const updateTickets = (idx: number, value: string) => {
    const num = Math.max(0, parseInt(value) || 0)
    setProcesses((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, tickets: num } : p))
    )
  }

  const draw = useCallback(() => {
    if (totalTickets === 0) return
    const winning = Math.floor(Math.random() * totalTickets)
    let cumulative = 0
    for (const proc of processes) {
      cumulative += proc.tickets
      if (winning < cumulative) {
        setLastWinner(proc.name)
        setLastTicket(winning)
        setHistory((prev) => [...prev, proc.name])
        break
      }
    }
  }, [processes, totalTickets])

  const reset = () => {
    setHistory([])
    setLastWinner(null)
    setLastTicket(null)
  }

  const winCounts: Record<string, number> = {}
  for (const name of history) {
    winCounts[name] = (winCounts[name] || 0) + 1
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Lottery Scheduler — Interactive
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        Assign tickets to each process, then hit Draw to see who wins CPU time.
        More tickets = better odds.
      </p>

      {/* Ticket assignment */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {processes.map((proc, i) => {
          const pct =
            totalTickets > 0
              ? ((proc.tickets / totalTickets) * 100).toFixed(1)
              : "0"
          return (
            <div
              key={proc.name}
              className={cn(
                "border rounded-lg p-2 text-center transition-all",
                lastWinner === proc.name
                  ? "ring-2 ring-primary bg-primary/10"
                  : ""
              )}
              style={{ borderColor: `${proc.color}60` }}
            >
              <div
                className="font-bold text-sm font-mono"
                style={{ color: proc.color }}
              >
                {proc.name}
              </div>
              <input
                type="number"
                value={proc.tickets}
                onChange={(e) => updateTickets(i, e.target.value)}
                className="w-full border rounded px-2 py-1 text-center text-sm font-mono bg-background mt-1"
                min={0}
              />
              <div className="text-xs text-muted-foreground mt-1">
                {pct}% of tickets
              </div>
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-4">
        <Button onClick={draw} disabled={totalTickets === 0} size="sm">
          Draw!
        </Button>
        <Button
          onClick={() => {
            for (let i = 0; i < 10; i++) draw()
          }}
          disabled={totalTickets === 0}
          variant="outline"
          size="sm"
        >
          Draw 10x
        </Button>
        <Button onClick={reset} variant="outline" size="sm">
          Reset
        </Button>
        {lastTicket !== null && (
          <span className="text-xs text-muted-foreground ml-2">
            Ticket #{lastTicket} of {totalTickets} drawn
          </span>
        )}
      </div>

      {/* Schedule history tape */}
      {history.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-muted-foreground font-semibold mb-1">
            Schedule History ({history.length} draws):
          </div>
          <div className="flex flex-wrap gap-0.5">
            {history.map((name, i) => {
              const proc = processes.find((p) => p.name === name)
              return (
                <div
                  key={i}
                  className="w-6 h-6 rounded-sm flex items-center justify-center text-xs font-mono font-bold"
                  style={{
                    backgroundColor: `${proc?.color || "#666"}40`,
                    color: proc?.color,
                    border: `1px solid ${proc?.color || "#666"}60`,
                  }}
                  title={`Draw #${i + 1}: ${name}`}
                >
                  {name.replace("P", "")}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Stats comparison */}
      {history.length > 0 && (
        <div className="border-t pt-3">
          <div className="text-xs text-muted-foreground font-semibold mb-2">
            Expected vs Actual CPU Share:
          </div>
          <div className="space-y-1.5">
            {processes.map((proc) => {
              const expected =
                totalTickets > 0
                  ? (proc.tickets / totalTickets) * 100
                  : 0
              const actual =
                history.length > 0
                  ? ((winCounts[proc.name] || 0) / history.length) * 100
                  : 0
              const diff = actual - expected
              return (
                <div key={proc.name} className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono font-bold w-8"
                    style={{ color: proc.color }}
                  >
                    {proc.name}
                  </span>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 h-4 bg-muted/30 rounded overflow-hidden relative">
                      {/* Expected bar (outline) */}
                      <div
                        className="absolute inset-y-0 left-0 border-r-2 border-dashed"
                        style={{
                          width: `${expected}%`,
                          borderColor: proc.color,
                        }}
                      />
                      {/* Actual bar (filled) */}
                      <div
                        className="h-full rounded-sm"
                        style={{
                          width: `${actual}%`,
                          backgroundColor: `${proc.color}50`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-28 text-right font-mono">
                      {actual.toFixed(1)}%{" "}
                      <span
                        className={cn(
                          "text-xs",
                          Math.abs(diff) < 5
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                        )}
                      >
                        ({diff >= 0 ? "+" : ""}
                        {diff.toFixed(1)})
                      </span>
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Dashed line = expected share from ticket ratio. Filled bar = actual
            share so far. With more draws, actual converges to expected.
          </p>
        </div>
      )}
    </div>
  )
}
