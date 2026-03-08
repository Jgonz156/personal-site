"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"

type Strategy = "deadlock" | "ordering" | "atomic"

interface PhilosopherState {
  id: number
  name: string
  leftFork: boolean
  rightFork: boolean
  state: "thinking" | "hungry" | "eating" | "waiting"
}

interface StepData {
  philosophers: PhilosopherState[]
  forks: boolean[]
  description: string
  hasCycle: boolean
}

function generateSteps(strategy: Strategy): StepData[] {
  const names = ["P0", "P1", "P2", "P3", "P4"]
  const makePhi = (overrides: Partial<PhilosopherState>[]): PhilosopherState[] =>
    names.map((name, i) => ({
      id: i,
      name,
      leftFork: false,
      rightFork: false,
      state: "thinking" as const,
      ...overrides[i],
    }))

  if (strategy === "deadlock") {
    return [
      {
        philosophers: makePhi([{}, {}, {}, {}, {}]),
        forks: [true, true, true, true, true],
        description: "All philosophers are thinking. All forks are on the table.",
        hasCycle: false,
      },
      {
        philosophers: makePhi([
          { state: "hungry" },
          { state: "hungry" },
          { state: "hungry" },
          { state: "hungry" },
          { state: "hungry" },
        ]),
        forks: [true, true, true, true, true],
        description: "All philosophers get hungry simultaneously.",
        hasCycle: false,
      },
      {
        philosophers: makePhi([
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
        ]),
        forks: [false, false, false, false, false],
        description:
          "Each philosopher picks up their LEFT fork. All forks taken!",
        hasCycle: false,
      },
      {
        philosophers: makePhi([
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
        ]),
        forks: [false, false, false, false, false],
        description:
          "Each philosopher tries to pick up their RIGHT fork... but it's held by their neighbor. DEADLOCK! Everyone waits forever.",
        hasCycle: true,
      },
    ]
  }

  if (strategy === "ordering") {
    return [
      {
        philosophers: makePhi([{}, {}, {}, {}, {}]),
        forks: [true, true, true, true, true],
        description:
          "Resource ordering: always pick up the LOWER-numbered fork first. This breaks circular wait.",
        hasCycle: false,
      },
      {
        philosophers: makePhi([
          { state: "hungry" },
          { state: "hungry" },
          { state: "hungry" },
          { state: "hungry" },
          { state: "hungry" },
        ]),
        forks: [true, true, true, true, true],
        description: "All philosophers get hungry.",
        hasCycle: false,
      },
      {
        philosophers: makePhi([
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "hungry" },
        ]),
        forks: [false, false, false, false, true],
        description:
          "P0-P3 pick up their left (lower-numbered) fork. P4 must pick up Fork 0 first (lower number), but it's held by P0. Fork 4 stays free!",
        hasCycle: false,
      },
      {
        philosophers: makePhi([
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "eating", leftFork: true, rightFork: true },
          { state: "hungry" },
        ]),
        forks: [false, false, false, false, false],
        description:
          "P3 grabs Fork 4 (free!) and starts eating. The cycle is broken — P3 will eventually release both forks, freeing P2 and P4.",
        hasCycle: false,
      },
      {
        philosophers: makePhi([
          { state: "waiting", leftFork: true },
          { state: "waiting", leftFork: true },
          { state: "eating", leftFork: true, rightFork: true },
          { state: "thinking" },
          { state: "hungry" },
        ]),
        forks: [false, false, false, true, true],
        description:
          "P3 finishes, releases Forks 3 and 4. P2 grabs Fork 3 and eats. Progress continues!",
        hasCycle: false,
      },
    ]
  }

  // atomic
  return [
    {
      philosophers: makePhi([{}, {}, {}, {}, {}]),
      forks: [true, true, true, true, true],
      description:
        "Atomic acquisition: pick up BOTH forks at once, or neither. This breaks hold-and-wait.",
      hasCycle: false,
    },
    {
      philosophers: makePhi([
        { state: "hungry" },
        { state: "hungry" },
        { state: "hungry" },
        { state: "hungry" },
        { state: "hungry" },
      ]),
      forks: [true, true, true, true, true],
      description: "All philosophers get hungry.",
      hasCycle: false,
    },
    {
      philosophers: makePhi([
        { state: "eating", leftFork: true, rightFork: true },
        { state: "hungry" },
        { state: "eating", leftFork: true, rightFork: true },
        { state: "hungry" },
        { state: "hungry" },
      ]),
      forks: [false, false, false, true, false],
      description:
        "P0 atomically grabs Forks 0+1, P2 grabs Forks 2+3. P1, P3, P4 cannot get both forks so they wait (without holding any).",
      hasCycle: false,
    },
    {
      philosophers: makePhi([
        { state: "thinking" },
        { state: "eating", leftFork: true, rightFork: true },
        { state: "thinking" },
        { state: "hungry" },
        { state: "hungry" },
      ]),
      forks: [true, false, false, true, true],
      description:
        "P0 and P2 finish, releasing forks. P1 atomically grabs Forks 1+2 and eats. Progress guaranteed.",
      hasCycle: false,
    },
  ]
}

export function DiningPhilosophersDemo({
  className,
}: {
  className?: string
}) {
  const [strategy, setStrategy] = useState<Strategy>("deadlock")
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<{ destroy: () => void } | null>(null)
  const [mounted, setMounted] = useState(false)

  const steps = generateSteps(strategy)
  const step = steps[stepIndex]

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error dynamic CSS import
    import("vis-network/styles/vis-network.css")
  }, [])

  const renderGraph = useCallback(async () => {
    if (!mounted || !containerRef.current) return

    if (networkRef.current) {
      networkRef.current.destroy()
      networkRef.current = null
    }

    const { Network } = await import("vis-network")
    const { DataSet } = await import("vis-data")

    if (!containerRef.current) return

    const phiColors: Record<string, string> = {
      thinking: "#6B7280",
      hungry: "#F59E0B",
      eating: "#22C55E",
      waiting: "#EF4444",
    }

    const cx = 200
    const cy = 180
    const outerR = 140
    const innerR = 80

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodes: any[] = []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const edges: any[] = []

    step.philosophers.forEach((p, i) => {
      const angle = (i / 5) * 2 * Math.PI - Math.PI / 2
      const x = cx + outerR * Math.cos(angle)
      const y = cy + outerR * Math.sin(angle)
      const col = phiColors[p.state]
      nodes.push({
        id: `phi-${i}`,
        label: `${p.name}\n${p.state}`,
        x,
        y,
        shape: "circle",
        size: 26,
        color: {
          background: col + "40",
          border: col,
          highlight: { background: col + "40", border: col },
        },
        font: { color: col, size: 11, face: "monospace", multi: "md" },
        borderWidth: step.hasCycle && p.state === "waiting" ? 4 : 2,
        fixed: true,
      })
    })

    for (let i = 0; i < 5; i++) {
      const angle = ((i + 0.5) / 5) * 2 * Math.PI - Math.PI / 2
      const x = cx + innerR * Math.cos(angle)
      const y = cy + innerR * Math.sin(angle)
      const available = step.forks[i]
      nodes.push({
        id: `fork-${i}`,
        label: `F${i}`,
        x,
        y,
        shape: "diamond",
        size: 14,
        color: {
          background: available ? "#D1FAE5" : "#FECACA",
          border: available ? "#10B981" : "#EF4444",
          highlight: {
            background: available ? "#D1FAE5" : "#FECACA",
            border: available ? "#10B981" : "#EF4444",
          },
        },
        font: { color: available ? "#065F46" : "#991B1B", size: 10, face: "monospace" },
        borderWidth: 2,
        fixed: true,
      })
    }

    step.philosophers.forEach((p, i) => {
      const leftForkIdx = i
      const rightForkIdx = (i + 1) % 5
      if (p.leftFork) {
        edges.push({
          from: `fork-${leftForkIdx}`,
          to: `phi-${i}`,
          arrows: "to",
          width: step.hasCycle ? 3 : 2,
          color: { color: step.hasCycle && p.state === "waiting" ? "#EF4444" : "#6B7280" },
          smooth: { type: "curvedCW", roundness: 0.15 },
        })
      }
      if (p.rightFork) {
        edges.push({
          from: `fork-${rightForkIdx}`,
          to: `phi-${i}`,
          arrows: "to",
          width: 2,
          color: { color: "#6B7280" },
          smooth: { type: "curvedCW", roundness: 0.15 },
        })
      }
      if (p.state === "waiting" && !p.rightFork) {
        edges.push({
          from: `phi-${i}`,
          to: `fork-${rightForkIdx}`,
          arrows: "to",
          dashes: true,
          width: step.hasCycle ? 3 : 2,
          color: { color: step.hasCycle ? "#EF4444" : "#F59E0B" },
          smooth: { type: "curvedCCW", roundness: 0.15 },
        })
      }
    })

    const options = {
      physics: { enabled: false },
      interaction: {
        dragNodes: false,
        dragView: false,
        zoomView: false,
        selectable: false,
      },
    }

    const network = new Network(
      containerRef.current,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { nodes: new DataSet(nodes), edges: new DataSet(edges) } as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options as any
    )
    networkRef.current = network
  }, [mounted, step])

  useEffect(() => {
    renderGraph()
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [renderGraph])

  useEffect(() => {
    if (!isPlaying) return
    if (stepIndex >= steps.length - 1) {
      setIsPlaying(false)
      return
    }
    const timer = setTimeout(() => setStepIndex((s) => s + 1), 2000)
    return () => clearTimeout(timer)
  }, [isPlaying, stepIndex, steps.length])

  const changeStrategy = (s: Strategy) => {
    setStrategy(s)
    setStepIndex(0)
    setIsPlaying(false)
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">
        {"Dining Philosophers Problem"}
      </h4>
      <p className="text-xs text-muted-foreground mb-3">
        5 philosophers, 5 forks. Each needs 2 adjacent forks to eat. Choose a
        strategy and step through the scenario.
      </p>

      {/* Strategy selector */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {([
          ["deadlock", "Deadlock Scenario"],
          ["ordering", "Resource Ordering Fix"],
          ["atomic", "Atomic Acquisition Fix"],
        ] as [Strategy, string][]).map(([s, label]) => (
          <Button
            key={s}
            variant={strategy === s ? "default" : "outline"}
            size="sm"
            className={cn(
              "text-xs h-7",
              strategy === s && s === "deadlock" && "bg-red-600 hover:bg-red-700",
              strategy === s && s !== "deadlock" && "bg-emerald-600 hover:bg-emerald-700"
            )}
            onClick={() => changeStrategy(s)}
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div
            ref={containerRef}
            className={cn(
              "border rounded bg-background",
              step.hasCycle && "border-red-500/50 ring-1 ring-red-500/20"
            )}
            style={{ height: "360px", width: "100%" }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="p-3 rounded border bg-muted/30">
            <div className="text-xs font-semibold mb-1 text-muted-foreground">
              Step {stepIndex + 1} / {steps.length}
            </div>
            <p className="text-sm">{step.description}</p>
          </div>

          {step.hasCycle && (
            <div className="p-3 rounded border-2 border-red-500 bg-red-500/10 text-center">
              <div className="text-lg font-black text-red-600 dark:text-red-400 animate-pulse">
                DEADLOCK
              </div>
              <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                Circular wait: each philosopher holds their left fork and waits
                for the right.
              </p>
            </div>
          )}

          {/* Philosopher states */}
          <div className="space-y-1">
            {step.philosophers.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 text-xs font-mono"
              >
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    p.state === "thinking" && "bg-gray-500",
                    p.state === "hungry" && "bg-amber-500",
                    p.state === "eating" && "bg-emerald-500",
                    p.state === "waiting" && "bg-red-500"
                  )}
                />
                <span className="w-6">{p.name}</span>
                <span className="text-muted-foreground">{p.state}</span>
                {p.leftFork && (
                  <span className="text-xs text-teal-600 dark:text-teal-400">
                    [L]
                  </span>
                )}
                {p.rightFork && (
                  <span className="text-xs text-teal-600 dark:text-teal-400">
                    [R]
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => {
              setStepIndex((s) => Math.max(0, s - 1))
              setIsPlaying(false)
            }}
            disabled={stepIndex === 0}
          >
            {"◀ Prev"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => {
              setStepIndex((s) => Math.min(steps.length - 1, s + 1))
              setIsPlaying(false)
            }}
            disabled={stepIndex === steps.length - 1}
          >
            {"Next ▶"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7"
            onClick={() => {
              setStepIndex(0)
              setIsPlaying(false)
            }}
          >
            {"↺ Reset"}
          </Button>
        </div>
        <div className="flex gap-1">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setStepIndex(i)
                setIsPlaying(false)
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === stepIndex
                  ? s.hasCycle
                    ? "bg-red-500"
                    : "bg-primary"
                  : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 pt-2 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-500/30 border-2 border-gray-500" />
          <span>Thinking</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-500/30 border-2 border-amber-500" />
          <span>Hungry</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500/30 border-2 border-emerald-500" />
          <span>Eating</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/30 border-2 border-red-500" />
          <span>Waiting</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rotate-45 bg-emerald-100 border-2 border-emerald-500" />
          <span>Fork (free)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rotate-45 bg-red-100 border-2 border-red-500" />
          <span>Fork (held)</span>
        </div>
      </div>
    </div>
  )
}
