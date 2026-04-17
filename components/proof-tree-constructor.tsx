"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"
import type { ProofTreeNode } from "@/components/proof-tree-reader"

/**
 * Interactive top-down proof tree builder.
 *
 * The student is given a goal judgment and a palette of available rules.
 * They select rules to expand "open goals" upward — building the proof tree
 * from root to leaves, mirroring how a mathematician actually constructs a proof.
 *
 * The component takes a *target* tree describing the canonical solution.
 * Each rule application in the target is identified by `ruleName`. The student
 * must pick the right ruleName for each open goal to expand it.
 */

interface RuleOption {
  /** Stable key matching ProofTreeNode.ruleName */
  ruleName: string
  /** Short display label, e.g. "Big-Step: Numeral" */
  label: string
  /** LaTeX schema for the rule (shown in the palette) */
  schema: string
  /** Plain-text hint about when to use this rule */
  hint?: string
}

interface ProofTreeConstructorProps {
  title?: string
  /** The complete target proof tree the student should construct. */
  target: ProofTreeNode
  /** All rules the student can pick from. Should include the correct ones plus distractors. */
  rules: RuleOption[]
  /** Optional: a description of the goal shown above the tree at the start. */
  goalDescription?: string
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

/**
 * Find the next open goal in the partial tree, in DFS order.
 * An open goal is any node whose id is NOT in `expanded` — including axioms.
 * Axioms still require a deliberate rule application (e.g. selecting "Numeral"
 * to fire the bridge ⟦n̄⟧ = n); the student must walk every leaf as well as
 * every internal node.
 */
function findFocusedGoal(
  node: ProofTreeNode,
  expanded: Set<string>
): ProofTreeNode | null {
  if (!expanded.has(node.id)) {
    return node
  }
  for (const p of node.premises ?? []) {
    const found = findFocusedGoal(p, expanded)
    if (found) return found
  }
  return null
}

interface ConstructorRenderProps {
  node: ProofTreeNode
  expanded: Set<string>
  focusedId: string | null
}

function ConstructorRender({
  node,
  expanded,
  focusedId,
}: ConstructorRenderProps) {
  const isExpanded = expanded.has(node.id)
  const isFocused = node.id === focusedId
  const isOpen = !isExpanded

  // If not expanded, render as an "open goal" — just the conclusion with a "?" cap above.
  if (isOpen) {
    return (
      <div
        className={`inline-flex flex-col items-center min-w-fit border-2 border-dashed rounded px-2 py-1 transition-colors ${
          isFocused
            ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/30"
            : "border-muted-foreground/40 bg-muted/20"
        }`}
      >
        <div
          className={`text-[10px] font-mono font-semibold mb-1 ${
            isFocused
              ? "text-amber-700 dark:text-amber-300"
              : "text-muted-foreground"
          }`}
        >
          {isFocused ? "?  CURRENT GOAL  ?" : "? open goal ?"}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-1">
          <MathBlock latex={node.conclusion.left} />
          <MathBlock latex={node.conclusion.right} />
        </div>
      </div>
    )
  }

  // Expanded: render premises above, bar, conclusion below.
  const hasAbove =
    (node.premises?.length ?? 0) > 0 || (node.sideConditions?.length ?? 0) > 0

  return (
    <div className="inline-flex flex-col items-center min-w-fit">
      {hasAbove && (
        <div className="flex items-end justify-center gap-6 px-3 pb-1">
          {node.premises?.map((p) => (
            <ConstructorRender
              key={p.id}
              node={p}
              expanded={expanded}
              focusedId={focusedId}
            />
          ))}
          {node.sideConditions?.map((sc, i) => (
            <span
              key={`sc-${i}`}
              className="inline-block text-sm self-end pb-1 text-purple-700 dark:text-purple-300"
            >
              <MathBlock latex={sc.latex} />
            </span>
          ))}
        </div>
      )}

      <div className="min-w-[60px] border-t-2 border-foreground" style={{ width: "100%" }} />

      <div className="flex flex-wrap items-center justify-center gap-x-1 px-1 pt-1">
        <MathBlock latex={node.conclusion.left} />
        <MathBlock latex={node.conclusion.right} />
      </div>

      <div className="text-[10px] font-mono text-green-700 dark:text-green-300 mt-1 px-2 py-0.5 rounded bg-green-50 dark:bg-green-950/40">
        ✓ {node.ruleName}
      </div>
    </div>
  )
}

type Feedback =
  | { kind: "idle" }
  | { kind: "wrong"; message: string }
  | { kind: "ok"; message: string }
  | { kind: "done" }

export function ProofTreeConstructor({
  title,
  target,
  rules,
  goalDescription,
}: ProofTreeConstructorProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [feedback, setFeedback] = useState<Feedback>({ kind: "idle" })

  const focused = useMemo(
    () => findFocusedGoal(target, expanded),
    [target, expanded]
  )

  const tryRule = (ruleName: string) => {
    if (!focused) return
    if (focused.ruleName === ruleName) {
      const next = new Set(expanded)
      next.add(focused.id)
      setExpanded(next)

      const isAxiom = (focused.premises?.length ?? 0) === 0
      const stillOpen = findFocusedGoal(target, next)
      if (stillOpen) {
        setFeedback({
          kind: "ok",
          message: isAxiom
            ? `Correct — "${ruleName}" fires as an axiom. The side condition above the bar is the bridge that justifies it; no recursive premise to discharge. On to the next open goal.`
            : `Correct — "${ruleName}" matches. New sub-goal(s) appeared above the bar; keep building upward.`,
        })
      } else {
        setFeedback({ kind: "done" })
      }
    } else {
      const focusedRule = rules.find((r) => r.ruleName === focused.ruleName)
      setFeedback({
        kind: "wrong",
        message: `Not a match. The current goal's conclusion shape requires "${focused.ruleName}"${
          focusedRule ? ` — ${focusedRule.label}` : ""
        }. Look at the goal's syntactic structure: which rule has a conclusion of that shape?`,
      })
    }
  }

  const reset = () => {
    setExpanded(new Set())
    setFeedback({ kind: "idle" })
  }

  const autoStep = () => {
    if (!focused) return
    tryRule(focused.ruleName)
  }

  // Count progress over every rule application (axioms included).
  const totalNodes = useMemo(() => {
    let n = 0
    const walk = (node: ProofTreeNode) => {
      n++
      for (const p of node.premises ?? []) walk(p)
    }
    walk(target)
    return n
  }, [target])
  const appliedRules = useMemo(() => {
    let n = 0
    const walk = (node: ProofTreeNode) => {
      if (expanded.has(node.id)) n++
      for (const p of node.premises ?? []) walk(p)
    }
    walk(target)
    return n
  }, [target, expanded])

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🛠 ${title}` : "🛠 Proof Tree Constructor"}
        </span>
        <span className="text-xs text-muted-foreground">
          {appliedRules} / {totalNodes} rules applied
        </span>
      </div>

      {goalDescription && (
        <div className="px-4 py-2 border-b bg-muted/10 text-center">
          <p className="text-xs text-muted-foreground italic">
            {goalDescription}
          </p>
        </div>
      )}

      <div className="px-3 py-6 bg-background overflow-x-auto">
        <div className="min-w-fit mx-auto flex justify-center">
          <ConstructorRender
            node={target}
            expanded={expanded}
            focusedId={focused?.id ?? null}
          />
        </div>
      </div>

      {/* Rule palette */}
      <div className="px-4 py-3 border-t bg-muted/10">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
          Pick a rule to apply to the current goal
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {rules.map((r) => (
            <button
              key={r.ruleName}
              onClick={() => tryRule(r.ruleName)}
              disabled={!focused}
              className="text-left border rounded p-2 hover:bg-muted/40 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <div className="text-xs font-semibold mb-1">{r.label}</div>
              <div className="text-sm">
                <MathBlock latex={r.schema} />
              </div>
              {r.hint && (
                <div className="text-[10px] text-muted-foreground italic mt-1">
                  {r.hint}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback */}
      {feedback.kind !== "idle" && (
        <div
          className={`px-4 py-2 border-t text-center text-sm ${
            feedback.kind === "wrong"
              ? "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300"
              : feedback.kind === "ok"
                ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300"
                : "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-semibold"
          }`}
        >
          {feedback.kind === "done"
            ? "✓ Proof complete — every open goal has been discharged. The root judgment is established."
            : feedback.kind === "wrong"
              ? `✗ ${feedback.message}`
              : `✓ ${feedback.message}`}
        </div>
      )}

      <div className="px-4 py-3 bg-muted/20 border-t flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={reset}>
          ↺ Reset
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={autoStep}
          disabled={!focused}
        >
          ⏵ Auto-apply correct rule
        </Button>
      </div>
    </div>
  )
}
