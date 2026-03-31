"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface TypeNode {
  id: string
  label: string
  typeLabel: string
  isTerminal?: boolean
  level?: number
}

interface TypeEdge {
  from: string
  to: string
}

interface Constraint {
  left: string
  right: string
  resolved?: boolean
}

interface TypeInferenceStep {
  nodes: TypeNode[]
  edges: TypeEdge[]
  constraints: Constraint[]
  substitution: Record<string, string>
  description: string
}

interface TypeInferenceStepperProps {
  title?: string
  steps: TypeInferenceStep[]
  height?: string
}

export function TypeInferenceStepper({
  title,
  steps,
  height = "280px",
}: TypeInferenceStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error - dynamic CSS import
    import("vis-network/styles/vis-network.css")
  }, [])

  const step = steps[currentStep]

  const renderTree = useCallback(async () => {
    if (!mounted || !containerRef.current || !step) return

    const { Network } = await import("vis-network")
    const { DataSet } = await import("vis-data")

    if (!containerRef.current) return

    const nodesData = step.nodes.map((node) => ({
      id: node.id,
      label: `${node.label}\n: ${node.typeLabel}`,
      color: node.isTerminal
        ? {
            background: "#dcfce7",
            border: "#16a34a",
            highlight: { background: "#bbf7d0", border: "#15803d" },
          }
        : {
            background: "#dbeafe",
            border: "#3b82f6",
            highlight: { background: "#bfdbfe", border: "#2563eb" },
          },
      shape: node.isTerminal ? "box" : "ellipse",
      borderWidth: 2,
      font: {
        size: 13,
        color: node.isTerminal ? "#14532d" : "#1e3a5f",
        face: "monospace",
        multi: "md",
      },
      ...(node.level !== undefined ? { level: node.level } : {}),
    }))

    const edgesData = step.edges.map((edge) => ({
      from: edge.from,
      to: edge.to,
      arrows: "",
      color: { color: "#94a3b8", highlight: "#64748b" },
      width: 2,
      smooth: false,
    }))

    if (networkRef.current) {
      networkRef.current.destroy()
    }

    const network = new Network(
      containerRef.current,
      {
        nodes: new DataSet(nodesData as any),
        edges: new DataSet(edgesData as any),
      } as any,
      {
        layout: {
          hierarchical: {
            enabled: true,
            direction: "UD",
            sortMethod: "directed",
            levelSeparation: 60,
            nodeSpacing: 50,
            treeSpacing: 70,
          },
        },
        physics: { enabled: false },
        interaction: {
          dragNodes: false,
          dragView: false,
          zoomView: false,
          selectable: false,
        },
        edges: { smooth: false },
      } as any
    )

    networkRef.current = network
  }, [mounted, step])

  useEffect(() => {
    renderTree()
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [renderTree])

  if (!mounted || !step) {
    return (
      <div
        className="my-6 border rounded-lg bg-muted/30 flex items-center justify-center"
        style={{ height: "400px" }}
      >
        <p className="text-muted-foreground">Loading stepper...</p>
      </div>
    )
  }

  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1
  const subEntries = Object.entries(step.substitution)

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔍 ${title}` : "🔍 Type Inference"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AST with Type Variables</span>
          </div>
          <div
            ref={containerRef}
            className="bg-background"
            style={{ height, width: "100%" }}
          />
        </div>

        <div className="flex flex-col">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Constraints</span>
          </div>
          <div className="px-3 py-2 flex-1 overflow-auto" style={{ maxHeight: `calc(${height} / 2)` }}>
            {step.constraints.length === 0 ? (
              <span className="text-xs text-muted-foreground italic">(none yet)</span>
            ) : (
              <div className="space-y-1">
                {step.constraints.map((c, i) => (
                  <div
                    key={i}
                    className={`font-mono text-sm flex items-center gap-2 ${
                      c.resolved
                        ? "text-green-600 dark:text-green-400 line-through opacity-60"
                        : ""
                    }`}
                  >
                    <span>{c.left}</span>
                    <span className="text-muted-foreground">=</span>
                    <span>{c.right}</span>
                    {c.resolved && <span className="text-green-500">✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-3 py-1.5 bg-muted/30 border-t border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Substitution</span>
          </div>
          <div className="px-3 py-2 flex-1 overflow-auto" style={{ maxHeight: `calc(${height} / 2)` }}>
            {subEntries.length === 0 ? (
              <span className="text-xs text-muted-foreground italic">(empty)</span>
            ) : (
              <div className="space-y-0.5">
                {subEntries.map(([k, v]) => (
                  <div key={k} className="flex justify-between font-mono text-sm">
                    <span className="text-blue-600 dark:text-blue-400">{k}</span>
                    <span>= {v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {step.description && (
        <div className="px-4 py-2 border-b bg-muted/20">
          <p className="text-sm text-muted-foreground italic text-center">
            {step.description}
          </p>
        </div>
      )}

      <div className="px-4 py-3 bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={isFirst}
        >
          ← Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(0)}
          disabled={isFirst}
        >
          ↺ Reset
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
