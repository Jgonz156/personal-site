"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface CSTNode {
  id: string
  label: string
  isTerminal?: boolean
  isOperator?: boolean
  removed?: boolean
  level?: number
}

interface CSTEdge {
  from: string
  to: string
  removed?: boolean
}

interface CSTASTStep {
  nodes: CSTNode[]
  edges: CSTEdge[]
  description?: string
  highlightNodes?: string[]
  removedNodes?: string[]
}

interface CSTtoASTStepperProps {
  title?: string
  steps: CSTASTStep[]
  height?: string
}

export function CSTtoASTStepper({
  title,
  steps,
  height = "380px",
}: CSTtoASTStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error - dynamic CSS import
    import("vis-network/styles/vis-network.css")
  }, [])

  const renderTree = useCallback(async () => {
    if (!mounted || !containerRef.current || steps.length === 0) return

    const { Network } = await import("vis-network")
    const { DataSet } = await import("vis-data")

    if (!containerRef.current) return

    const step = steps[currentStep]
    const highlightSet = new Set(step.highlightNodes ?? [])
    const removedSet = new Set(step.removedNodes ?? [])

    const nodesData = step.nodes.map((node) => {
      const isHighlighted = highlightSet.has(node.id)
      const isRemoved = removedSet.has(node.id) || node.removed

      let color, fontColor, shape, borderWidth, borderDashes
      borderDashes = false

      if (isRemoved) {
        color = {
          background: "rgba(200, 200, 200, 0.15)",
          border: "rgba(160, 160, 160, 0.3)",
          highlight: { background: "rgba(200, 200, 200, 0.15)", border: "rgba(160, 160, 160, 0.3)" },
        }
        fontColor = "rgba(140, 140, 140, 0.5)"
        shape = node.isTerminal || node.isOperator ? "box" : "ellipse"
        borderWidth = 1
        borderDashes = [4, 4]
      } else if (node.isOperator) {
        color = {
          background: isHighlighted ? "#fbbf24" : "#fef3c7",
          border: "#f59e0b",
          highlight: { background: "#fde68a", border: "#d97706" },
        }
        fontColor = "#92400e"
        shape = "box"
        borderWidth = isHighlighted ? 3 : 2
      } else if (node.isTerminal) {
        color = {
          background: isHighlighted ? "#bbf7d0" : "#dcfce7",
          border: "#16a34a",
          highlight: { background: "#bbf7d0", border: "#15803d" },
        }
        fontColor = "#14532d"
        shape = "box"
        borderWidth = isHighlighted ? 3 : 2
      } else {
        color = {
          background: isHighlighted ? "#bfdbfe" : "#dbeafe",
          border: "#3b82f6",
          highlight: { background: "#bfdbfe", border: "#2563eb" },
        }
        fontColor = "#1e3a5f"
        shape = "ellipse"
        borderWidth = isHighlighted ? 3 : 2
      }

      return {
        id: node.id,
        label: node.label,
        color,
        shape,
        borderWidth,
        borderDashes,
        font: {
          size: isRemoved ? 13 : 16,
          color: fontColor,
          face: "monospace",
        },
        opacity: isRemoved ? 0.3 : 1,
        ...(node.level !== undefined ? { level: node.level } : {}),
      }
    })

    const edgesData = step.edges.map((edge) => {
      const isRemoved = edge.removed ||
        removedSet.has(edge.from) ||
        removedSet.has(edge.to)
      return {
        from: edge.from,
        to: edge.to,
        arrows: "",
        color: {
          color: isRemoved ? "rgba(160, 160, 160, 0.2)" : "#94a3b8",
          highlight: isRemoved ? "rgba(160, 160, 160, 0.2)" : "#64748b",
        },
        width: isRemoved ? 1 : 2,
        dashes: isRemoved ? [4, 4] : false,
        smooth: false,
      }
    })

    const nodesDataSet = new DataSet(nodesData as any)
    const edgesDataSet = new DataSet(edgesData as any)

    if (networkRef.current) {
      networkRef.current.destroy()
    }

    const network = new Network(
      containerRef.current,
      { nodes: nodesDataSet, edges: edgesDataSet } as any,
      {
        layout: {
          hierarchical: {
            enabled: true,
            direction: "UD",
            sortMethod: "directed",
            levelSeparation: 55,
            nodeSpacing: 45,
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
  }, [mounted, currentStep, steps])

  useEffect(() => {
    renderTree()
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [renderTree])

  if (!mounted) {
    return (
      <div
        className="my-6 border rounded-lg bg-muted/30 flex items-center justify-center"
        style={{ height }}
      >
        <p className="text-muted-foreground">Loading tree...</p>
      </div>
    )
  }

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const stageLabel = isFirst
    ? "CST (Concrete Syntax Tree)"
    : isLast
      ? "AST (Abstract Syntax Tree)"
      : "Simplifying..."

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔄 ${title}` : "🔄 CST → AST"}
        </span>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
            isFirst
              ? "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400"
              : isLast
                ? "border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400"
                : "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          }`}>
            {stageLabel}
          </span>
          <span className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="bg-background"
        style={{ height, width: "100%" }}
      />

      {step?.description && (
        <div className="px-4 py-2 border-t bg-muted/20">
          <p className="text-sm text-muted-foreground italic text-center">
            {step.description}
          </p>
        </div>
      )}

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
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
          onClick={() =>
            setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
          }
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
