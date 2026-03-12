"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface TreeNode {
  id: string
  label: string
  isTerminal?: boolean
  isEpsilon?: boolean
  level?: number
}

interface TreeEdge {
  from: string
  to: string
}

interface TreeStep {
  nodes: TreeNode[]
  edges: TreeEdge[]
  description?: string
  highlightNodes?: string[]
}

interface DerivationTreeStepperProps {
  title?: string
  steps: TreeStep[]
  height?: string
}

export function DerivationTreeStepper({
  title,
  steps,
  height = "350px",
}: DerivationTreeStepperProps) {
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

    const nodesData = step.nodes.map((node) => {
      const isHighlighted = highlightSet.has(node.id)
      let color, fontColor, shape, borderWidth

      if (node.isEpsilon) {
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
        font: { size: 16, color: fontColor, face: "monospace" },
        ...(node.level !== undefined ? { level: node.level } : {}),
      }
    })

    const edgesData = step.edges.map((edge) => ({
      from: edge.from,
      to: edge.to,
      arrows: "",
      color: { color: "#94a3b8", highlight: "#64748b" },
      width: 2,
      smooth: false,
    }))

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
            levelSeparation: 60,
            nodeSpacing: 50,
            treeSpacing: 80,
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

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🌲 ${title}` : "🌲 Derivation Tree"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
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
