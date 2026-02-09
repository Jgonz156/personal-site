"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type OpType = "compute" | "memory" | "idle"

interface ThreadTimeline {
  name: string
  color: string
  timeline: OpType[]
}

interface ExecutionModel {
  name: string
  description: string
  cores: number
  totalTime: number
  threads: ThreadTimeline[]
}

const threadColors = {
  T1: "#3B82F6", // blue
  T2: "#22C55E", // green
  T3: "#F59E0B", // amber
  T4: "#EF4444", // red
}

// Thread definitions:
// T1: 3ms compute
// T2: 2ms memory, 1ms compute
// T3: 1ms compute, 2ms memory
// T4: 1ms memory, 1ms compute, 1ms memory

const sequentialModel: ExecutionModel = {
  name: "Sequential",
  description: "1 core, no interleaving — each thread runs to completion before the next starts",
  cores: 1,
  totalTime: 12,
  threads: [
    {
      name: "T1",
      color: threadColors.T1,
      timeline: ["compute", "compute", "compute", "idle", "idle", "idle", "idle", "idle", "idle", "idle", "idle", "idle"],
    },
    {
      name: "T2",
      color: threadColors.T2,
      timeline: ["idle", "idle", "idle", "memory", "memory", "compute", "idle", "idle", "idle", "idle", "idle", "idle"],
    },
    {
      name: "T3",
      color: threadColors.T3,
      timeline: ["idle", "idle", "idle", "idle", "idle", "idle", "compute", "memory", "memory", "idle", "idle", "idle"],
    },
    {
      name: "T4",
      color: threadColors.T4,
      timeline: ["idle", "idle", "idle", "idle", "idle", "idle", "idle", "idle", "idle", "memory", "compute", "memory"],
    },
  ],
}

// Concurrent: 1 core, memory operations overlap with compute from other threads
// T1 runs compute at 0,1,2. T2's memory starts at 0,1 (overlapping with T1 compute).
// T2 compute at 3. T4's memory starts at 3 (overlapping with T2 compute).
// T3 compute at 4. T3 memory at 5,6 (overlapping with T4 compute at 5).
// T4 compute at 5. T4 last memory at 6 (overlapping).
const concurrentModel: ExecutionModel = {
  name: "Concurrent",
  description: "1 core, interleaved — memory waits overlap with other threads' computation",
  cores: 1,
  totalTime: 7,
  threads: [
    {
      name: "T1",
      color: threadColors.T1,
      timeline: ["compute", "compute", "compute", "idle", "idle", "idle", "idle"],
    },
    {
      name: "T2",
      color: threadColors.T2,
      timeline: ["memory", "memory", "idle", "compute", "idle", "idle", "idle"],
    },
    {
      name: "T3",
      color: threadColors.T3,
      timeline: ["idle", "idle", "idle", "idle", "compute", "memory", "memory"],
    },
    {
      name: "T4",
      color: threadColors.T4,
      timeline: ["idle", "idle", "idle", "memory", "idle", "compute", "memory"],
    },
  ],
}

// Parallel: 4 cores, each thread runs on its own core simultaneously
const parallelModel: ExecutionModel = {
  name: "Parallel",
  description: "4 cores — each thread runs on its own core simultaneously",
  cores: 4,
  totalTime: 3,
  threads: [
    {
      name: "T1",
      color: threadColors.T1,
      timeline: ["compute", "compute", "compute"],
    },
    {
      name: "T2",
      color: threadColors.T2,
      timeline: ["memory", "memory", "compute"],
    },
    {
      name: "T3",
      color: threadColors.T3,
      timeline: ["compute", "memory", "memory"],
    },
    {
      name: "T4",
      color: threadColors.T4,
      timeline: ["memory", "compute", "memory"],
    },
  ],
}

const models: ExecutionModel[] = [sequentialModel, concurrentModel, parallelModel]

const opStyles: Record<OpType, string> = {
  compute: "bg-blue-500/70 dark:bg-blue-400/60 border border-blue-600 dark:border-blue-400",
  memory: "bg-amber-400/50 dark:bg-amber-500/40 border-2 border-dashed border-amber-600 dark:border-amber-400",
  idle: "bg-transparent border border-dashed border-muted-foreground/20",
}

const opLabels: Record<OpType, string> = {
  compute: "C",
  memory: "M",
  idle: "",
}

function ModelPanel({ model }: { model: ExecutionModel }) {
  const maxTime = model.totalTime

  return (
    <div className="space-y-1">
      {/* Time header */}
      <div className="flex">
        <div className="w-12 shrink-0" />
        <div className="flex-1 flex">
          {Array.from({ length: maxTime }).map((_, i) => (
            <div
              key={i}
              className="flex-1 text-center text-xs font-mono text-muted-foreground border-r last:border-r-0 py-0.5"
            >
              {i}
            </div>
          ))}
        </div>
      </div>

      {/* Thread rows */}
      {model.threads.map((thread) => (
        <div key={thread.name} className="flex">
          <div
            className="w-12 shrink-0 text-xs font-bold flex items-center gap-1"
            style={{ color: thread.color }}
          >
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: thread.color }}
            />
            {thread.name}
          </div>
          <div className="flex-1 flex">
            {Array.from({ length: maxTime }).map((_, i) => {
              const op = thread.timeline[i] || "idle"
              return (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-7 flex items-center justify-center text-xs font-mono font-bold border-r last:border-r-0 rounded-sm mx-px",
                    opStyles[op]
                  )}
                >
                  {opLabels[op]}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Core assignment row */}
      <div className="flex pt-1 border-t border-muted-foreground/20 mt-1">
        <div className="w-12 shrink-0 text-xs font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-purple-500" />
          CPU
        </div>
        <div className="flex-1 flex">
          {Array.from({ length: maxTime }).map((_, i) => {
            // Find which threads are computing at this time
            const computing = model.threads.filter(
              (t) => t.timeline[i] === "compute"
            )
            return (
              <div
                key={i}
                className={cn(
                  "flex-1 h-7 flex items-center justify-center text-xs font-bold border-r last:border-r-0 rounded-sm mx-px",
                  computing.length > 0
                    ? "bg-purple-500/20 border border-purple-500/40"
                    : "bg-transparent border border-dashed border-muted-foreground/20"
                )}
              >
                {computing.length > 0 ? (
                  <span className="text-purple-600 dark:text-purple-400">
                    {computing.map((t) => t.name).join("+")}
                  </span>
                ) : (
                  <span className="text-muted-foreground/40">-</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Total time */}
      <div className="text-center pt-2">
        <span className="text-sm font-semibold">
          Total: <span className="text-primary">{model.totalTime}ms</span>
        </span>
        <span className="text-xs text-muted-foreground ml-2">
          ({model.cores} core{model.cores > 1 ? "s" : ""})
        </span>
      </div>
    </div>
  )
}

export function ExecutionModelComparison() {
  const [activeModel, setActiveModel] = useState(0)

  return (
    <div className="border rounded-lg p-4 bg-card my-6">
      <h4 className="font-semibold text-sm mb-1">
        Execution Model Comparison
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        4 threads: T1 = 3ms compute, T2 = 2ms memory + 1ms compute, T3 = 1ms
        compute + 2ms memory, T4 = 1ms memory + 1ms compute + 1ms memory
      </p>

      {/* Tab buttons */}
      <div className="flex gap-1 mb-4">
        {models.map((model, i) => (
          <Button
            key={model.name}
            variant={activeModel === i ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveModel(i)}
            className="flex-1"
          >
            {model.name}
          </Button>
        ))}
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground mb-3 italic">
        {models[activeModel].description}
      </p>

      {/* Active panel */}
      <ModelPanel model={models[activeModel]} />

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-4 bg-blue-500/70 dark:bg-blue-400/60 border border-blue-600 dark:border-blue-400 rounded-sm" />
          <span>Compute (C)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-4 bg-amber-400/50 dark:bg-amber-500/40 border-2 border-dashed border-amber-600 dark:border-amber-400 rounded-sm" />
          <span>Memory (M)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-4 bg-transparent border border-dashed border-muted-foreground/30 rounded-sm" />
          <span>Idle</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-4 bg-purple-500/20 border border-purple-500/40 rounded-sm" />
          <span>CPU Active</span>
        </div>
      </div>

      {/* Comparison summary */}
      <div className="mt-4 pt-3 border-t">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          {models.map((model) => (
            <div
              key={model.name}
              className={cn(
                "rounded-md p-2 border",
                models[activeModel].name === model.name
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/20"
              )}
            >
              <div className="font-semibold">{model.name}</div>
              <div className="text-lg font-bold text-primary">
                {model.totalTime}ms
              </div>
              <div className="text-muted-foreground">
                {model.cores} core{model.cores > 1 ? "s" : ""}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Speedup: Sequential → Concurrent ={" "}
          <strong>{(12 / 7).toFixed(1)}x</strong>, Sequential → Parallel ={" "}
          <strong>{(12 / 3).toFixed(1)}x</strong>
        </p>
      </div>
    </div>
  )
}
