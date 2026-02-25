"use client"

import { cn } from "@/lib/utils"

export interface MLFQDiagramProps {
  className?: string
}

const queues = [
  {
    label: "Q0 — Round Robin (q=2u)",
    sublabel: "Highest Priority",
    color: "#3B82F6",
    processes: [
      { name: "P1", note: "new" },
      { name: "P4", note: "I/O return" },
    ],
  },
  {
    label: "Q1 — Round Robin (q=4u)",
    sublabel: "Medium Priority",
    color: "#F59E0B",
    processes: [{ name: "P2", note: "used full q=2u" }],
  },
  {
    label: "Q2 — FCFS",
    sublabel: "Lowest Priority",
    color: "#EF4444",
    processes: [
      { name: "P3", note: "used full q=4u" },
      { name: "P5", note: "compute-bound" },
    ],
  },
]

export function MLFQDiagram({ className }: MLFQDiagramProps) {
  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        Multi-Level Feedback Queue (MLFQ)
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        New processes enter at the top. Processes that use their full quantum
        demote downward. I/O-bound processes stay high. Periodic boost pushes
        everyone back up.
      </p>

      <div className="relative">
        {/* New process entry arrow */}
        <div className="flex items-center gap-2 mb-2 ml-4">
          <span className="text-xs text-muted-foreground font-semibold">
            New Process
          </span>
          <svg width="60" height="20" viewBox="0 0 60 20">
            <path
              d="M0,10 L50,10"
              className="stroke-emerald-500 dark:stroke-emerald-400"
              strokeWidth="2"
              fill="none"
            />
            <polygon
              points="48,5 58,10 48,15"
              className="fill-emerald-500 dark:fill-emerald-400"
            />
          </svg>
        </div>

        <div className="space-y-3">
          {queues.map((queue, qi) => (
            <div key={qi} className="relative">
              {/* Queue row */}
              <div
                className="border-2 rounded-lg p-3"
                style={{ borderColor: `${queue.color}60` }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span
                    className="text-sm font-bold"
                    style={{ color: queue.color }}
                  >
                    {queue.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {queue.sublabel}
                  </span>
                </div>

                {/* Process blocks in queue */}
                <div className="flex gap-2">
                  {queue.processes.map((proc, pi) => (
                    <div
                      key={pi}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded border"
                      style={{
                        backgroundColor: `${queue.color}15`,
                        borderColor: `${queue.color}40`,
                      }}
                    >
                      <span
                        className="font-bold text-sm font-mono"
                        style={{ color: queue.color }}
                      >
                        {proc.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({proc.note})
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center px-3 py-1.5 rounded border border-dashed border-muted-foreground/20">
                    <span className="text-xs text-muted-foreground/40">
                      ...
                    </span>
                  </div>
                </div>
              </div>

              {/* Demotion arrow between queues */}
              {qi < queues.length - 1 && (
                <div className="flex items-center justify-between px-8 my-1">
                  <div className="flex items-center gap-1">
                    <svg width="20" height="24" viewBox="0 0 20 24">
                      <path
                        d="M10,0 L10,16"
                        className="stroke-red-400 dark:stroke-red-500"
                        strokeWidth="2"
                        fill="none"
                      />
                      <polygon
                        points="5,14 10,22 15,14"
                        className="fill-red-400 dark:fill-red-500"
                      />
                    </svg>
                    <span className="text-xs text-red-600 dark:text-red-400 font-semibold">
                      Demote (used full quantum)
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Periodic boost arrow on the right side */}
        <div className="absolute right-0 top-12 bottom-8 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <svg width="20" height="80" viewBox="0 0 20 80">
              <path
                d="M10,75 L10,10"
                className="stroke-emerald-500 dark:stroke-emerald-400"
                strokeWidth="2"
                strokeDasharray="4,3"
                fill="none"
              />
              <polygon
                points="5,12 10,2 15,12"
                className="fill-emerald-500 dark:fill-emerald-400"
              />
            </svg>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold writing-mode-vertical [writing-mode:vertical-rl] rotate-180">
              Periodic Boost
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <span>Enter / Boost up</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-red-400" />
          <span>Demote down</span>
        </div>
        <span>I/O-bound processes stay high (yield before quantum)</span>
        <span>Compute-bound processes sink low (use full quantum)</span>
      </div>
    </div>
  )
}
