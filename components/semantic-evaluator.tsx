"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface ASTNode {
  id: string
  label: string
  isTerminal?: boolean
  level?: number
}

interface ASTEdge {
  from: string
  to: string
}

interface SemanticStep {
  astHighlight: string[]
  environment: Record<string, number>
  output: number[]
  description: string
}

interface SemanticEvaluatorProps {
  title?: string
  astNodes: ASTNode[]
  astEdges: ASTEdge[]
  steps: SemanticStep[]
  height?: string
}

export function SemanticEvaluator({
  title,
  astNodes,
  astEdges,
  steps,
  height = "320px",
}: SemanticEvaluatorProps) {
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
    if (!mounted || !containerRef.current || astNodes.length === 0) return

    const { Network } = await import("vis-network")
    const { DataSet } = await import("vis-data")

    if (!containerRef.current) return

    const step = steps[currentStep]
    const highlightSet = new Set(step.astHighlight)

    const nodesData = astNodes.map((node) => {
      const isHighlighted = highlightSet.has(node.id)

      const color = node.isTerminal
        ? {
            background: isHighlighted ? "#fbbf24" : "#dcfce7",
            border: isHighlighted ? "#d97706" : "#16a34a",
            highlight: { background: "#fde68a", border: "#d97706" },
          }
        : {
            background: isHighlighted ? "#fbbf24" : "#dbeafe",
            border: isHighlighted ? "#d97706" : "#3b82f6",
            highlight: { background: "#fde68a", border: "#d97706" },
          }

      return {
        id: node.id,
        label: node.label,
        color,
        shape: node.isTerminal ? "box" : "ellipse",
        borderWidth: isHighlighted ? 3 : 2,
        font: {
          size: 14,
          color: isHighlighted ? "#92400e" : node.isTerminal ? "#14532d" : "#1e3a5f",
          face: "monospace",
        },
        widthConstraint: { maximum: 80 },
        ...(node.level !== undefined ? { level: node.level } : {}),
      }
    })

    const edgesData = astEdges.map((edge) => ({
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
            levelSeparation: 55,
            nodeSpacing: 100,
            treeSpacing: 120,
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
  }, [mounted, currentStep, astNodes, astEdges, steps])

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
        <p className="text-muted-foreground">Loading evaluator...</p>
      </div>
    )
  }

  const step = steps[currentStep]
  const envEntries = Object.entries(step.environment)
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🧮 ${title}` : "🧮 Semantic Evaluator"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AST</span>
          </div>
          <div
            ref={containerRef}
            className="bg-background"
            style={{ height, width: "100%" }}
          />
        </div>

        <div className="flex flex-col">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Environment</span>
          </div>
          <div className="flex-1 px-3 py-2 overflow-auto" style={{ maxHeight: height }}>
            {envEntries.length === 0 ? (
              <p className="text-xs text-muted-foreground italic text-center py-4">
                (empty — no variables bound yet)
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1 px-2 text-xs font-semibold text-muted-foreground">Name</th>
                    <th className="text-right py-1 px-2 text-xs font-semibold text-muted-foreground">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {envEntries.map(([name, value]) => (
                    <tr key={name} className="border-b border-dashed">
                      <td className="py-1 px-2 font-mono text-sm">{name}</td>
                      <td className="py-1 px-2 font-mono text-sm text-right">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {step.output.length > 0 && (
              <div className="mt-3 pt-2 border-t">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Output</span>
                <div className="mt-1 bg-zinc-900 text-green-400 rounded px-3 py-2 font-mono text-sm">
                  {step.output.map((v, i) => (
                    <div key={i}>{v}</div>
                  ))}
                </div>
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
