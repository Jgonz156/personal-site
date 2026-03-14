"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface RDTreeNode {
  id: string
  label: string
  isTerminal?: boolean
  level?: number
}

interface RDTreeEdge {
  from: string
  to: string
}

interface RDStep {
  tokens: string[]
  cursor: number
  callStack: string[]
  treeNodes: RDTreeNode[]
  treeEdges?: RDTreeEdge[]
  description: string
  isError?: boolean
}

interface RecursiveDescentStepperProps {
  title?: string
  steps: RDStep[]
}

const STACK_COLORS = [
  { bg: "bg-blue-500/15", border: "border-blue-500/40", text: "text-blue-600 dark:text-blue-400" },
  { bg: "bg-purple-500/15", border: "border-purple-500/40", text: "text-purple-600 dark:text-purple-400" },
  { bg: "bg-amber-500/15", border: "border-amber-500/40", text: "text-amber-600 dark:text-amber-400" },
  { bg: "bg-green-500/15", border: "border-green-500/40", text: "text-green-600 dark:text-green-400" },
  { bg: "bg-rose-500/15", border: "border-rose-500/40", text: "text-rose-600 dark:text-rose-400" },
]

function getStackColor(index: number) {
  return STACK_COLORS[index % STACK_COLORS.length]
}

export function RecursiveDescentStepper({ title, steps }: RecursiveDescentStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const step = steps[currentStep]

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error - dynamic CSS import
    import("vis-network/styles/vis-network.css")
  }, [])

  const renderTree = useCallback(async () => {
    if (!mounted || !containerRef.current) return

    const nodes = step.treeNodes
    const edges = step.treeEdges ?? []

    if (nodes.length === 0) {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
      return
    }

    const { Network } = await import("vis-network")
    const { DataSet } = await import("vis-data")

    if (!containerRef.current) return

    const nodesData = nodes.map((node) => {
      const isLeaf = node.isTerminal ?? !edges.some((e) => e.from === node.id)
      return {
        id: node.id,
        label: node.label,
        color: isLeaf
          ? { background: "#dcfce7", border: "#16a34a", highlight: { background: "#bbf7d0", border: "#15803d" } }
          : { background: "#dbeafe", border: "#3b82f6", highlight: { background: "#bfdbfe", border: "#2563eb" } },
        shape: isLeaf ? "box" : "ellipse",
        borderWidth: 2,
        font: { size: 14, color: isLeaf ? "#14532d" : "#1e3a5f", face: "monospace" },
        ...(node.level !== undefined ? { level: node.level } : {}),
      }
    })

    const edgesData = edges.map((edge) => ({
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
      { nodes: new DataSet(nodesData as any), edges: new DataSet(edgesData as any) } as any,
      {
        layout: {
          hierarchical: {
            enabled: true,
            direction: "UD",
            sortMethod: "directed",
            levelSeparation: 50,
            nodeSpacing: 40,
            treeSpacing: 60,
          },
        },
        physics: { enabled: false },
        interaction: { dragNodes: false, dragView: false, zoomView: false, selectable: false },
        edges: { smooth: false },
      } as any
    )

    networkRef.current = network
  }, [mounted, step.treeNodes, step.treeEdges])

  useEffect(() => {
    renderTree()
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [renderTree])

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `📖 ${title}` : "📖 Recursive Descent Parser"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Token Stream
        </div>
        <div className="flex flex-wrap gap-1.5 p-3 rounded-md border bg-muted/20 font-mono text-sm">
          {step.tokens.map((tok, i) => (
            <span
              key={i}
              className={`
                px-2 py-1 rounded-md border text-xs transition-all duration-200
                ${i === step.cursor
                  ? "ring-2 ring-primary bg-primary/15 border-primary/40 text-primary font-bold scale-105"
                  : i < step.cursor
                    ? "bg-muted/30 border-border/50 text-muted-foreground/40 line-through"
                    : "bg-muted/10 border-border text-foreground"
                }
              `}
            >
              {tok}
            </span>
          ))}
          {step.cursor >= step.tokens.length && (
            <span className="px-2 py-1 rounded-md border border-dashed border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold">
              EOF
            </span>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Call Stack
          </div>
          <div className={`flex flex-col-reverse gap-1 p-3 rounded-md border min-h-[200px] ${step.isError ? "bg-red-500/5 border-red-500/30" : "bg-muted/10"}`}>
            {step.callStack.length === 0 && (
              <span className="text-xs text-muted-foreground/50 italic">Empty</span>
            )}
            {step.callStack.map((fn, i) => {
              const colors = getStackColor(i)
              const isTop = i === step.callStack.length - 1
              return (
                <div
                  key={i}
                  className={`
                    px-3 py-1.5 rounded-md border text-xs font-mono transition-all duration-200
                    ${colors.bg} ${colors.border} ${colors.text}
                    ${isTop ? "ring-2 ring-primary shadow-sm" : ""}
                    ${step.isError && isTop ? "ring-red-500 bg-red-500/20 border-red-500/50 text-red-600 dark:text-red-400" : ""}
                  `}
                >
                  {fn}()
                </div>
              )
            })}
            {step.isError && (
              <div className="px-3 py-1.5 rounded-md bg-red-500/20 border border-red-500/50 text-red-600 dark:text-red-400 text-xs font-bold text-center mt-1">
                Stack Overflow!
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Parse Tree
          </div>
          <div className="rounded-md border bg-muted/10 min-h-[200px] relative">
            {step.treeNodes.length === 0 ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <span className="text-xs text-muted-foreground/50 italic">No tree yet...</span>
              </div>
            ) : (
              <div ref={containerRef} style={{ height: "200px", width: "100%" }} />
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border-t bg-muted/20">
        <p className={`text-sm italic text-center ${step.isError ? "text-red-600 dark:text-red-400 font-semibold" : "text-muted-foreground"}`}>
          {step.description}
        </p>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep((s) => Math.max(0, s - 1))} disabled={currentStep === 0}>
          ← Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => setCurrentStep(0)} disabled={currentStep === 0}>
          ↺ Reset
        </Button>
        <Button variant="default" size="sm" onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))} disabled={currentStep >= steps.length - 1}>
          Next →
        </Button>
      </div>
    </div>
  )
}
