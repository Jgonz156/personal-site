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

interface OpSemStep {
  highlightNodes: string[]
  rule: string
  environment: Record<string, number>
  output: number[]
  description: string
}

interface OperationalSemanticsStepperProps {
  title?: string
  astNodes: ASTNode[]
  astEdges: ASTEdge[]
  smallSteps: OpSemStep[]
  bigSteps: OpSemStep[]
  height?: string
}

function waitForMathJax(): Promise<void> {
  return new Promise((resolve) => {
    const check = () => {
      if (typeof window !== "undefined" && window.MathJax?.typesetPromise) {
        resolve()
      } else {
        setTimeout(check, 100)
      }
    }
    check()
  })
}

function RuleDisplay({ rule }: { rule: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    setRendered(false)

    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })

    return () => { mounted = false }
  }, [rule])

  return (
    <div
      ref={ref}
      className="overflow-x-auto text-center w-full transition-opacity duration-200"
      style={{ opacity: rendered ? 1 : 0.3 }}
    >
      {`$$${rule}$$`}
    </div>
  )
}

export function OperationalSemanticsStepper({
  title,
  astNodes,
  astEdges,
  smallSteps,
  bigSteps,
  height = "280px",
}: OperationalSemanticsStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [mode, setMode] = useState<"small" | "big">("big")

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error - dynamic CSS import
    import("vis-network/styles/vis-network.css")
  }, [])

  const steps = mode === "small" ? smallSteps : bigSteps
  const step = steps[currentStep]

  const renderTree = useCallback(async () => {
    if (!mounted || !containerRef.current || astNodes.length === 0) return

    const { Network } = await import("vis-network")
    const { DataSet } = await import("vis-data")

    if (!containerRef.current) return

    const highlightSet = new Set(step?.highlightNodes ?? [])

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
            levelSeparation: 50,
            nodeSpacing: 35,
            treeSpacing: 60,
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
  }, [mounted, step, astNodes, astEdges])

  useEffect(() => {
    renderTree()
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [renderTree])

  const switchMode = (newMode: "small" | "big") => {
    setMode(newMode)
    setCurrentStep(0)
  }

  if (!mounted) {
    return (
      <div
        className="my-6 border rounded-lg bg-muted/30 flex items-center justify-center"
        style={{ height: "500px" }}
      >
        <p className="text-muted-foreground">Loading stepper...</p>
      </div>
    )
  }

  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1
  const envEntries = Object.entries(step?.environment ?? {})

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `⚙️ ${title}` : "⚙️ Operational Semantics"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="px-4 py-2 border-b bg-muted/10 flex items-center justify-center gap-2">
        <Button
          variant={mode === "big" ? "default" : "outline"}
          size="sm"
          onClick={() => switchMode("big")}
        >
          Big-Step (⇓)
        </Button>
        <Button
          variant={mode === "small" ? "default" : "outline"}
          size="sm"
          onClick={() => switchMode("small")}
        >
          Small-Step (→)
        </Button>
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
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Inference Rule
            </span>
          </div>
          <div className="px-3 py-3 min-h-[80px] flex items-center justify-center">
            {step?.rule ? (
              <RuleDisplay key={`${mode}-${currentStep}`} rule={step.rule} />
            ) : (
              <span className="text-sm text-muted-foreground italic">No rule applied yet</span>
            )}
          </div>

          <div className="px-3 py-1.5 bg-muted/30 border-t border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Environment</span>
          </div>
          <div className="px-3 py-2 flex-1">
            {envEntries.length === 0 ? (
              <span className="text-xs text-muted-foreground italic">(empty)</span>
            ) : (
              <div className="space-y-0.5">
                {envEntries.map(([name, value]) => (
                  <div key={name} className="flex justify-between font-mono text-sm">
                    <span>{name}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            )}
            {step?.output && step.output.length > 0 && (
              <div className="mt-2 pt-2 border-t">
                <span className="text-xs font-semibold text-muted-foreground">Output: </span>
                <span className="font-mono text-sm text-green-600 dark:text-green-400">
                  [{step.output.join(", ")}]
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {step?.description && (
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
