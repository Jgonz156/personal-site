"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"

export interface RAGStep {
  description: string
  code?: string
  nodes: RAGNode[]
  edges: RAGEdge[]
  cycleEdges?: string[]
}

export interface RAGNode {
  id: string
  label: string
  type: "process" | "resource"
  instances?: number
}

export interface RAGEdge {
  id: string
  from: string
  to: string
  type: "request" | "assignment"
}

export interface RAGScenario {
  name: string
  steps: RAGStep[]
}

interface ResourceAllocationStepperProps {
  scenarios: RAGScenario[]
  className?: string
}

export function ResourceAllocationStepper({
  scenarios,
  className,
}: ResourceAllocationStepperProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<{ destroy: () => void } | null>(null)
  const [mounted, setMounted] = useState(false)

  const scenario = scenarios[scenarioIndex]
  const step = scenario.steps[stepIndex]
  const hasCycle = step.cycleEdges && step.cycleEdges.length > 0

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

    const cycleEdgeSet = new Set(step.cycleEdges || [])
    const cycleNodeSet = new Set<string>()
    if (step.cycleEdges) {
      step.edges
        .filter((e) => cycleEdgeSet.has(e.id))
        .forEach((e) => {
          cycleNodeSet.add(e.from)
          cycleNodeSet.add(e.to)
        })
    }

    const processColors: Record<string, string> = {}
    const palette = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"]
    let pi = 0
    step.nodes
      .filter((n) => n.type === "process")
      .forEach((n) => {
        processColors[n.id] = palette[pi % palette.length]
        pi++
      })

    const visNodes = new DataSet(
      step.nodes.map((n) => {
        const inCycle = cycleNodeSet.has(n.id)
        const isProcess = n.type === "process"

        let bg: string
        let border: string
        if (inCycle) {
          bg = "#FCA5A5"
          border = "#EF4444"
        } else if (isProcess) {
          bg = processColors[n.id] + "40"
          border = processColors[n.id]
        } else {
          bg = "#D1D5DB"
          border = "#6B7280"
        }

        const instanceDots =
          !isProcess && n.instances
            ? "\n" + "●".repeat(n.instances)
            : ""

        return {
          id: n.id,
          label: n.label + instanceDots,
          shape: isProcess ? "circle" : "box",
          size: isProcess ? 28 : 20,
          color: {
            background: bg,
            border: border,
            highlight: { background: bg, border: border },
          },
          font: {
            color: inCycle ? "#DC2626" : isProcess ? processColors[n.id] : "#374151",
            size: 13,
            face: "monospace",
            multi: "md",
            bold: { color: inCycle ? "#DC2626" : "#374151" },
          },
          borderWidth: inCycle ? 4 : 2,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    )

    const visEdges = new DataSet(
      step.edges.map((e) => {
        const inCycle = cycleEdgeSet.has(e.id)
        return {
          id: e.id,
          from: e.from,
          to: e.to,
          arrows: "to",
          dashes: e.type === "request",
          width: inCycle ? 4 : 2,
          color: {
            color: inCycle ? "#EF4444" : e.type === "request" ? "#F59E0B" : "#6B7280",
            highlight: inCycle ? "#EF4444" : "#3B82F6",
          },
          smooth: { type: "curvedCW", roundness: 0.2 },
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    )

    const options = {
      layout: {
        improvedLayout: true,
      },
      physics: {
        enabled: true,
        forceAtlas2Based: {
          gravitationalConstant: -80,
          centralGravity: 0.005,
          springLength: 120,
          springConstant: 0.06,
          damping: 0.5,
          avoidOverlap: 1,
        },
        solver: "forceAtlas2Based",
        stabilization: { enabled: true, iterations: 150, updateInterval: 25 },
      },
      interaction: {
        dragNodes: true,
        dragView: true,
        zoomView: true,
        selectable: false,
      },
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const network = new Network(containerRef.current, { nodes: visNodes, edges: visEdges } as any, options as any)
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
    if (stepIndex >= scenario.steps.length - 1) {
      setIsPlaying(false)
      return
    }
    const timer = setTimeout(() => setStepIndex((s) => s + 1), 2000)
    return () => clearTimeout(timer)
  }, [isPlaying, stepIndex, scenario.steps.length])

  const handleScenarioChange = (idx: number) => {
    setScenarioIndex(idx)
    setStepIndex(0)
    setIsPlaying(false)
  }

  return (
    <div className={cn("border rounded-lg p-4 bg-card my-6", className)}>
      <h4 className="font-semibold text-sm mb-1">Resource Allocation Graph</h4>
      <p className="text-xs text-muted-foreground mb-3">
        Step through resource requests and assignments. Dashed arrows = request,
        solid arrows = assignment. Red = cycle detected (deadlock).
      </p>

      {/* Scenario selector */}
      {scenarios.length > 1 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {scenarios.map((s, i) => (
            <Button
              key={i}
              variant={scenarioIndex === i ? "default" : "outline"}
              size="sm"
              className="text-xs h-7"
              onClick={() => handleScenarioChange(i)}
            >
              {s.name}
            </Button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Graph */}
        <div className="lg:col-span-2">
          <div
            ref={containerRef}
            className={cn(
              "border rounded bg-background transition-all",
              hasCycle && "border-red-500/50 ring-1 ring-red-500/20"
            )}
            style={{ height: "320px", width: "100%" }}
          />
        </div>

        {/* Code + description panel */}
        <div className="flex flex-col gap-3">
          <div className="p-3 rounded border bg-muted/30">
            <div className="text-xs font-semibold mb-1 text-muted-foreground">
              Step {stepIndex + 1} / {scenario.steps.length}
            </div>
            <p className="text-sm">{step.description}</p>
          </div>

          {step.code && (
            <div className="rounded border bg-zinc-900 text-zinc-100 p-3 overflow-x-auto">
              <pre className="text-xs font-mono whitespace-pre">{step.code}</pre>
            </div>
          )}

          {hasCycle && (
            <div className="p-2 rounded border border-red-500/40 bg-red-500/5 text-xs text-red-700 dark:text-red-300 font-semibold text-center">
              Cycle detected — DEADLOCK!
            </div>
          )}
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
              setStepIndex((s) => Math.min(scenario.steps.length - 1, s + 1))
              setIsPlaying(false)
            }}
            disabled={stepIndex === scenario.steps.length - 1}
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

        {/* Step dots */}
        <div className="flex gap-1">
          {scenario.steps.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setStepIndex(i)
                setIsPlaying(false)
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                i === stepIndex
                  ? s.cycleEdges && s.cycleEdges.length > 0
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
          <div className="w-4 h-4 rounded-full bg-blue-500/30 border-2 border-blue-500" />
          <span>Process</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded-sm bg-gray-300 border-2 border-gray-500" />
          <span>Resource</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 border-t-2 border-dashed border-amber-500" />
          <span>Request</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 border-t-2 border-gray-500" />
          <span>Assignment</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-red-200 border-2 border-red-500" />
          <span>In cycle</span>
        </div>
      </div>
    </div>
  )
}
