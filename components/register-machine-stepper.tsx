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

interface TranslationStep {
  highlightNodes: string[]
  generatedSoFar: string[]
  description: string
}

interface RegisterExecutionStep {
  pc: number
  registers: Record<string, number | null>
  memory?: Record<string, number>
  highlightRegister?: string
  highlightNodes?: string[]
  description: string
}

interface RegisterMachineStepperProps {
  title?: string
  astNodes: ASTNode[]
  astEdges: ASTEdge[]
  instructions: string[]
  translationSteps: TranslationStep[]
  executionSteps: RegisterExecutionStep[]
}

export function RegisterMachineStepper({
  title,
  astNodes,
  astEdges,
  instructions,
  translationSteps,
  executionSteps,
}: RegisterMachineStepperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<"translate" | "execute">("translate")
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setMounted(true)
    // @ts-expect-error - dynamic CSS import
    import("vis-network/styles/vis-network.css")
  }, [])

  const steps =
    mode === "translate" ? translationSteps : executionSteps
  const step = steps[currentStep]

  const highlightSet = new Set(
    mode === "translate"
      ? (step as TranslationStep)?.highlightNodes ?? []
      : (step as RegisterExecutionStep)?.highlightNodes ?? []
  )

  const renderTree = useCallback(async () => {
    if (!mounted || !containerRef.current || astNodes.length === 0) return

    const { Network } = await import("vis-network")
    const { DataSet } = await import("vis-data")

    if (!containerRef.current) return

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
          color: isHighlighted
            ? "#92400e"
            : node.isTerminal
              ? "#14532d"
              : "#1e3a5f",
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
            levelSeparation: 50,
            nodeSpacing: 80,
            treeSpacing: 100,
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
  }, [mounted, astNodes, astEdges, highlightSet])

  useEffect(() => {
    renderTree()
    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [renderTree])

  const switchMode = (newMode: "translate" | "execute") => {
    setMode(newMode)
    setCurrentStep(0)
  }

  if (!mounted) {
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

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔧 ${title}` : "🔧 Register Machine"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="px-4 py-2 border-b bg-muted/10 flex items-center justify-center gap-2">
        <Button
          variant={mode === "translate" ? "default" : "outline"}
          size="sm"
          onClick={() => switchMode("translate")}
        >
          Translate (AST → Instructions)
        </Button>
        <Button
          variant={mode === "execute" ? "default" : "outline"}
          size="sm"
          onClick={() => switchMode("execute")}
        >
          Execute (Instructions → Registers)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        {/* AST Panel */}
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              AST
            </span>
          </div>
          <div
            ref={containerRef}
            className="bg-background"
            style={{ height: "260px", width: "100%" }}
          />
        </div>

        {/* Right panel */}
        <div className="flex flex-col">
          {mode === "translate" ? (
            <TranslatePanel
              generatedSoFar={
                (step as TranslationStep)?.generatedSoFar ?? []
              }
              allInstructions={instructions}
            />
          ) : (
            <RegisterExecutePanel
              instructions={instructions}
              pc={(step as RegisterExecutionStep)?.pc ?? 0}
              registers={
                (step as RegisterExecutionStep)?.registers ?? {}
              }
              memory={(step as RegisterExecutionStep)?.memory}
              highlightRegister={
                (step as RegisterExecutionStep)?.highlightRegister
              }
            />
          )}
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

function TranslatePanel({
  generatedSoFar,
  allInstructions,
}: {
  generatedSoFar: string[]
  allInstructions: string[]
}) {
  return (
    <>
      <div className="px-3 py-1.5 bg-muted/30 border-b">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Generated Instructions ({generatedSoFar.length}/
          {allInstructions.length})
        </span>
      </div>
      <div className="flex-1 px-3 py-2 space-y-0.5 min-h-[120px] max-h-[240px] overflow-y-auto">
        {generatedSoFar.length === 0 ? (
          <p className="text-xs text-muted-foreground italic text-center py-4">
            (no instructions generated yet)
          </p>
        ) : (
          generatedSoFar.map((instr, i) => {
            const isNew = i === generatedSoFar.length - 1
            return (
              <div
                key={i}
                className={`flex items-center gap-2 px-2 py-1 rounded font-mono text-sm transition-colors ${
                  isNew
                    ? "bg-green-100 dark:bg-green-900/40 text-green-900 dark:text-green-200 font-bold"
                    : "text-foreground"
                }`}
              >
                <span className="w-5 text-right text-xs text-muted-foreground shrink-0">
                  {i}
                </span>
                <span>{instr}</span>
                {isNew && (
                  <span className="text-xs text-green-600 dark:text-green-400 ml-auto">
                    ← new
                  </span>
                )}
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

function RegisterExecutePanel({
  instructions,
  pc,
  registers,
  memory,
  highlightRegister,
}: {
  instructions: string[]
  pc: number
  registers: Record<string, number | null>
  memory?: Record<string, number>
  highlightRegister?: string
}) {
  const regEntries = Object.entries(registers)
  const memEntries = Object.entries(memory ?? {})

  return (
    <>
      <div className="grid grid-cols-2 flex-1">
        {/* Instruction list with PC */}
        <div className="border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              PC = {pc >= 0 && pc < instructions.length ? pc : "—"}
            </span>
          </div>
          <div className="px-2 py-1 space-y-0.5 max-h-[220px] overflow-y-auto">
            {instructions.map((instr, i) => {
              const isActive = i === pc
              return (
                <div
                  key={i}
                  className={`flex items-center gap-1 px-1 py-0.5 rounded font-mono text-xs transition-colors ${
                    isActive
                      ? "bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 font-bold"
                      : i < pc
                        ? "text-muted-foreground/50 line-through"
                        : "text-foreground"
                  }`}
                >
                  <span className="w-4 text-right text-muted-foreground shrink-0">
                    {i}
                  </span>
                  <span className="shrink-0">
                    {isActive ? "→" : " "}
                  </span>
                  <span>{instr}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Register File + Memory */}
        <div>
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Registers
            </span>
          </div>
          <div className="px-2 py-1">
            {regEntries.length === 0 ? (
              <p className="text-xs text-muted-foreground italic text-center py-2">
                (no registers allocated)
              </p>
            ) : (
              <div className="space-y-0.5">
                {regEntries.map(([name, value]) => {
                  const isHighlighted = name === highlightRegister
                  return (
                    <div
                      key={name}
                      className={`flex items-center justify-between px-2 py-1 rounded font-mono text-sm transition-colors ${
                        isHighlighted
                          ? "bg-purple-100 dark:bg-purple-900/40 border border-purple-400 dark:border-purple-600 text-purple-900 dark:text-purple-200 font-bold"
                          : "text-foreground"
                      }`}
                    >
                      <span>{name}</span>
                      <span>
                        {value !== null ? value : "—"}
                        {isHighlighted && (
                          <span className="ml-1 text-xs text-purple-600 dark:text-purple-400">
                            ←
                          </span>
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}

            {memEntries.length > 0 && (
              <div className="mt-2 pt-2 border-t">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Memory
                </span>
                <div className="mt-1 space-y-0.5">
                  {memEntries.map(([name, value]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between px-2 py-1 rounded bg-muted/30 font-mono text-sm"
                    >
                      <span>{name}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
