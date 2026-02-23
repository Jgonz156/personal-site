"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SystemType {
  name: string
  tagline: string
  description: string
  examples: string[]
  optimizeFor: { label: string; importance: number }[]
  scheduling: string
  cpuUtilization: string
  fairness: string
  color: string
  borderColor: string
  bgColor: string
}

const systemTypes: SystemType[] = [
  {
    name: "Batch",
    tagline: "Set it and forget it",
    description:
      "Compute clusters with no interactive users. Jobs are submitted, queued, and processed as fast as possible without interruption.",
    examples: [
      "ILM render farm",
      "Scientific simulation clusters",
      "ML training jobs",
      "Nightly data pipelines",
    ],
    optimizeFor: [
      { label: "Throughput (jobs/hour)", importance: 5 },
      { label: "Turnaround time", importance: 4 },
      { label: "CPU utilization", importance: 5 },
      { label: "Response time", importance: 1 },
      { label: "Deadline adherence", importance: 1 },
    ],
    scheduling: "Cooperative / Non-preemptive",
    cpuUtilization: "Maximum (100% target)",
    fairness: "Queue order — first come, first served",
    color: "text-amber-700 dark:text-amber-300",
    borderColor: "border-amber-500/40",
    bgColor: "bg-amber-500/5 dark:bg-amber-500/10",
  },
  {
    name: "Interactive",
    tagline: "Always responsive",
    description:
      "Consumer devices with active users watching and waiting. The system must feel fast and fair, balancing many competing processes.",
    examples: [
      "Laptops and desktops",
      "Smartphones and tablets",
      "Web servers handling requests",
      "Game consoles",
    ],
    optimizeFor: [
      { label: "Response time", importance: 5 },
      { label: "Proportionality", importance: 4 },
      { label: "Fairness", importance: 5 },
      { label: "Throughput", importance: 3 },
      { label: "Deadline adherence", importance: 2 },
    ],
    scheduling: "Preemptive (time-sliced)",
    cpuUtilization: "Balanced (room for bursts)",
    fairness: "Proportional — user perception matters",
    color: "text-blue-700 dark:text-blue-300",
    borderColor: "border-blue-500/40",
    bgColor: "bg-blue-500/5 dark:bg-blue-500/10",
  },
  {
    name: "Real-Time",
    tagline: "Never miss a deadline",
    description:
      "Systems where missing a computation deadline can be catastrophic. Predictability matters more than speed or fairness.",
    examples: [
      "Flight computers",
      "Car engine ECUs",
      "Medical device controllers",
      "Industrial robots",
    ],
    optimizeFor: [
      { label: "Deadline adherence", importance: 5 },
      { label: "Predictability", importance: 5 },
      { label: "Response time", importance: 3 },
      { label: "Throughput", importance: 1 },
      { label: "Fairness", importance: 1 },
    ],
    scheduling: "Deadline-driven (EDF, RMS)",
    cpuUtilization: "Intentionally low (spare capacity)",
    fairness: "Irrelevant — priority is everything",
    color: "text-red-700 dark:text-red-300",
    borderColor: "border-red-500/40",
    bgColor: "bg-red-500/5 dark:bg-red-500/10",
  },
]

function PriorityBar({
  label,
  importance,
  color,
}: {
  label: string
  importance: number
  color: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground w-36 shrink-0 text-right">
        {label}
      </span>
      <div className="flex-1 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 flex-1 rounded-sm transition-all",
              i < importance
                ? color
                : "bg-muted-foreground/10"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export function SystemTypeComparison() {
  const [activeType, setActiveType] = useState(0)
  const system = systemTypes[activeType]

  const barColors = [
    "bg-amber-500/60 dark:bg-amber-400/50",
    "bg-blue-500/60 dark:bg-blue-400/50",
    "bg-red-500/60 dark:bg-red-400/50",
  ]

  return (
    <div className="border rounded-lg p-4 bg-card my-6">
      <h4 className="font-semibold text-sm mb-1">System Type Comparison</h4>
      <p className="text-xs text-muted-foreground mb-3">
        Each system type prioritizes different scheduling concerns.
      </p>

      {/* Tab buttons */}
      <div className="flex gap-1 mb-4">
        {systemTypes.map((s, i) => (
          <Button
            key={s.name}
            variant={activeType === i ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveType(i)}
            className="flex-1"
          >
            {s.name}
          </Button>
        ))}
      </div>

      {/* Active system detail */}
      <div className={cn("border rounded-lg p-4", system.borderColor, system.bgColor)}>
        <div className="flex items-baseline gap-2 mb-1">
          <h5 className={cn("font-bold text-lg", system.color)}>
            {system.name}
          </h5>
          <span className="text-xs text-muted-foreground italic">
            &ldquo;{system.tagline}&rdquo;
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-3">
          {system.description}
        </p>

        {/* Examples */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {system.examples.map((ex) => (
            <span
              key={ex}
              className="text-xs px-2 py-0.5 rounded-full border bg-card"
            >
              {ex}
            </span>
          ))}
        </div>

        {/* Priority bars */}
        <div className="space-y-1.5 mb-4">
          <span className="text-xs font-semibold text-muted-foreground">
            Priority Rankings:
          </span>
          {system.optimizeFor.map((item) => (
            <PriorityBar
              key={item.label}
              label={item.label}
              importance={item.importance}
              color={barColors[activeType]}
            />
          ))}
        </div>

        {/* Key properties */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="border rounded p-2 bg-card">
            <span className="text-muted-foreground block">Scheduling</span>
            <span className="font-semibold">{system.scheduling}</span>
          </div>
          <div className="border rounded p-2 bg-card">
            <span className="text-muted-foreground block">CPU Utilization</span>
            <span className="font-semibold">{system.cpuUtilization}</span>
          </div>
          <div className="border rounded p-2 bg-card">
            <span className="text-muted-foreground block">Fairness</span>
            <span className="font-semibold">{system.fairness}</span>
          </div>
        </div>
      </div>

      {/* Quick comparison footer */}
      <div className="mt-4 pt-3 border-t grid grid-cols-3 gap-2 text-center text-xs">
        {systemTypes.map((s, i) => (
          <div
            key={s.name}
            className={cn(
              "rounded-md p-2 border cursor-pointer transition-all",
              activeType === i
                ? cn(s.borderColor, s.bgColor, "ring-1", s.borderColor)
                : "border-muted-foreground/20 hover:border-muted-foreground/40"
            )}
            onClick={() => setActiveType(i)}
          >
            <div className={cn("font-semibold", activeType === i ? s.color : "")}>
              {s.name}
            </div>
            <div className="text-muted-foreground">{s.tagline}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
