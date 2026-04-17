"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

/**
 * A node in a proof tree. Each node represents one rule application.
 * Premises are sub-proofs (recursive). Side conditions are non-recursive
 * "bridges" — things like N⟦n̄⟧ = n, σ(x) = v, v ≠ 0, etc.
 */
export interface ProofTreeNode {
  id: string
  ruleName: string
  conclusion: { left: string; right: string }
  premises?: ProofTreeNode[]
  sideConditions?: { latex: string; description?: string }[]
  description?: string
}

interface ProofTreeReaderProps {
  title?: string
  tree: ProofTreeNode
}

type StepPart =
  | "enter-rule"
  | "conclusion-left"
  | "side-cond"
  | "conclusion-right"

interface OmegaStep {
  nodeId: string
  part: StepPart
  sideCondIndex?: number
  description: string
  badge: string
  depth: number
}

function generateSteps(node: ProofTreeNode, depth = 0): OmegaStep[] {
  const steps: OmegaStep[] = []

  steps.push({
    nodeId: node.id,
    part: "enter-rule",
    description:
      depth === 0
        ? `Begin reading the proof tree for the root goal. We trace the Ω at every level: bottom-left → premises (recurse into each one) → bottom-right. The first rule to apply is "${node.ruleName}" because its conclusion shape matches the goal.`
        : `Recurse into a premise. The current sub-goal is the conclusion of this rule application: "${node.ruleName}". Start a new Ω here — we'll prove this premise before bubbling back up to the parent rule.`,
    badge: depth === 0 ? "⊢ Root goal" : `↑ Premise (depth ${depth})`,
    depth,
  })

  steps.push({
    nodeId: node.id,
    part: "conclusion-left",
    description:
      "① Bottom-left of the conclusion: this is the input configuration we want to evaluate. To know the result, we need to discharge every premise above the bar.",
    badge: "① Input",
    depth,
  })

  for (const premise of node.premises ?? []) {
    steps.push(...generateSteps(premise, depth + 1))
  }

  for (let i = 0; i < (node.sideConditions ?? []).length; i++) {
    const sc = node.sideConditions![i]
    steps.push({
      nodeId: node.id,
      part: "side-cond",
      sideCondIndex: i,
      description:
        sc.description ??
        "Check this side condition. Side conditions are bridges from syntax to semantics — they don't recurse into the proof relation, they relate values directly.",
      badge: "◊ Side condition",
      depth,
    })
  }

  steps.push({
    nodeId: node.id,
    part: "conclusion-right",
    description:
      depth === 0
        ? "③ Bottom-right of the root: every premise has been discharged, so the root judgment holds. The proof tree is complete — the program's result is established."
        : "③ This sub-proof resolves. The premise's result is now available; bubble back up to the parent rule and continue its Ω from where we left off.",
    badge: depth === 0 ? "③ Final result" : "↓ Bubble up",
    depth,
  })

  return steps
}

function MathBlock({
  latex,
  className,
}: {
  latex: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
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

    return () => {
      mounted = false
    }
  }, [latex])

  return (
    <span className={`relative ${className ?? ""}`}>
      {!rendered && <MathShimmer />}
      <span
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {`$${latex}$`}
      </span>
    </span>
  )
}

const HIGHLIGHT = {
  active:
    "ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-950/40 rounded px-1",
  input:
    "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/40 rounded px-1",
  output:
    "ring-2 ring-green-500 bg-green-50 dark:bg-green-950/40 rounded px-1",
  sideCond:
    "ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/40 rounded px-1",
  visited: "opacity-60",
}

interface ProofTreeRenderProps {
  node: ProofTreeNode
  step: OmegaStep
  visitedRights: Set<string>
}

function ProofTreeRender({ node, step, visitedRights }: ProofTreeRenderProps) {
  const isActive = step.nodeId === node.id
  const isLeftActive = isActive && step.part === "conclusion-left"
  const isRightActive = isActive && step.part === "conclusion-right"
  const isVisited = visitedRights.has(node.id) && !isActive

  const hasAbove =
    (node.premises?.length ?? 0) > 0 || (node.sideConditions?.length ?? 0) > 0

  return (
    <div
      className={`inline-flex flex-col items-center min-w-fit transition-opacity duration-200 ${
        isVisited ? "opacity-70" : ""
      }`}
    >
      {hasAbove && (
        <div className="flex items-end justify-center gap-6 px-3 pb-1">
          {node.premises?.map((p) => (
            <ProofTreeRender
              key={p.id}
              node={p}
              step={step}
              visitedRights={visitedRights}
            />
          ))}
          {node.sideConditions?.map((sc, i) => {
            const isScActive =
              isActive &&
              step.part === "side-cond" &&
              step.sideCondIndex === i
            return (
              <span
                key={`sc-${i}`}
                className={`inline-block text-sm self-end pb-1 transition-all duration-200 ${
                  isScActive ? HIGHLIGHT.sideCond : ""
                }`}
              >
                <MathBlock latex={sc.latex} />
              </span>
            )
          })}
        </div>
      )}

      <div
        className={`min-w-[60px] border-t-2 transition-colors duration-200 ${
          isActive
            ? "border-amber-500"
            : isVisited
              ? "border-foreground/40"
              : "border-foreground"
        }`}
        style={{ width: "100%" }}
      />

      <div className="flex flex-wrap items-center justify-center gap-x-1 px-1 pt-1">
        <span
          className={`inline-block transition-all duration-200 ${
            isLeftActive ? HIGHLIGHT.input : ""
          }`}
        >
          <MathBlock latex={node.conclusion.left} />
        </span>
        <span
          className={`inline-block transition-all duration-200 ${
            isRightActive ? HIGHLIGHT.output : ""
          }`}
        >
          <MathBlock latex={node.conclusion.right} />
        </span>
      </div>

      {isActive && step.part === "enter-rule" && (
        <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 mt-1 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40">
          {node.ruleName}
        </div>
      )}
    </div>
  )
}

export function ProofTreeReader({ title, tree }: ProofTreeReaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = useMemo(() => generateSteps(tree), [tree])
  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  // Track which nodes have been "resolved" (their conclusion-right has been visited).
  const visitedRights = useMemo(() => {
    const set = new Set<string>()
    for (let i = 0; i < currentStep; i++) {
      if (steps[i].part === "conclusion-right") {
        set.add(steps[i].nodeId)
      }
    }
    return set
  }, [steps, currentStep])

  const badgeColor = (() => {
    switch (step.part) {
      case "enter-rule":
        return "bg-muted text-muted-foreground"
      case "conclusion-left":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "side-cond":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "conclusion-right":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    }
  })()

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `Ω ${title}` : "Ω Proof Tree Reader"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length} · depth {step.depth}
        </span>
      </div>

      <div className="px-4 py-1.5 border-b bg-muted/10 text-center">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Active rule: {findRuleName(tree, step.nodeId) ?? "—"}
        </span>
      </div>

      <div className="px-3 py-6 bg-background overflow-x-auto">
        <div className="min-w-fit mx-auto flex justify-center">
          <ProofTreeRender
            node={tree}
            step={step}
            visitedRights={visitedRights}
          />
        </div>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20">
        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded ${badgeColor}`}
          >
            {step.badge}
          </span>
          {step.depth > 0 && (
            <span className="text-xs text-muted-foreground">
              {"·".repeat(step.depth)} nested rule
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground italic text-center">
          {step.description}
        </p>
      </div>

      <div className="px-4 py-2 border-t bg-muted/10 flex items-center justify-center gap-3 text-xs text-muted-foreground flex-wrap">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-blue-200 dark:bg-blue-800 border border-blue-400" />
          ① Input
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-amber-200 dark:bg-amber-800 border border-amber-400" />
          ↑ Recursing
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-purple-200 dark:bg-purple-800 border border-purple-400" />
          ◊ Side cond
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-green-200 dark:bg-green-800 border border-green-400" />
          ③ Result
        </span>
      </div>

      <div className="px-4 py-3 bg-muted/20 border-t flex items-center justify-between gap-2">
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

function findRuleName(tree: ProofTreeNode, id: string): string | null {
  if (tree.id === id) return tree.ruleName
  for (const p of tree.premises ?? []) {
    const found = findRuleName(p, id)
    if (found) return found
  }
  return null
}
