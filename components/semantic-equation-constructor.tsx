"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

/**
 * Interactive substitution-chain builder for denotational semantics.
 *
 * The student is given a starting goal form (e.g. E⟦3 + 5⟧ σ₀) and a palette
 * of named semantic equations. They build the derivation chain top-down: at
 * each step they pick which equation justifies the next rewrite. If they pick
 * correctly, the next form is revealed and connected with an "= (by R)" line.
 *
 * This is the denotational analogue of the proof-tree constructor for
 * operational semantics — every rewrite step is a deliberate choice of which
 * compositional equation to apply.
 */

interface EquationOption {
  /** Stable key matching ChainStep.equationKey. */
  key: string
  /** Short display label, e.g. "Addition" or "𝒩 valuation". */
  label: string
  /** LaTeX schema shown in the palette. */
  schema: string
  /** Optional plain-text hint describing when to use this equation. */
  hint?: string
}

interface ChainStep {
  /** Key of the equation that justifies this rewrite (must match an EquationOption). */
  equationKey: string
  /** LaTeX for the *result* form after this rewrite. */
  formula: string
  /** Optional short caption shown when this step is the freshly revealed one. */
  description?: string
}

interface SemanticEquationConstructorProps {
  title?: string
  /** Optional human-readable goal description shown above the chain. */
  goalDescription?: string
  /** The starting form of the chain (LaTeX). Always shown — no rule needed. */
  initialFormula: string
  /** Sequence of rewrites that transform initialFormula into the final answer. */
  steps: ChainStep[]
  /** Equations the student can pick from. Include both correct and distractor rules. */
  palette: EquationOption[]
}

function MathBlock({
  formula,
  display = false,
}: {
  formula: string
  display?: boolean
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
  }, [formula])

  const Tag = display ? "div" : "span"

  return (
    <Tag className={`relative ${display ? "block" : "inline-block"} align-middle`}>
      {!rendered && <MathShimmer block={display} />}
      <span
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {display ? `$$${formula}$$` : `$${formula}$`}
      </span>
    </Tag>
  )
}

export function SemanticEquationConstructor({
  title,
  goalDescription,
  initialFormula,
  steps,
  palette,
}: SemanticEquationConstructorProps) {
  // revealedCount = number of steps revealed (0 = only initial form is showing).
  const [revealedCount, setRevealedCount] = useState(0)
  const [feedback, setFeedback] = useState<{
    type: "ok" | "err"
    text: string
  } | null>(null)

  const total = steps.length
  const isComplete = revealedCount === total

  const nextStep = isComplete ? null : steps[revealedCount]

  const tryEquation = (key: string) => {
    if (!nextStep) return
    const option = palette.find((o) => o.key === key)
    const label = option?.label ?? key
    if (key === nextStep.equationKey) {
      setRevealedCount((c) => c + 1)
      setFeedback({
        type: "ok",
        text: `✓ Applied “${label}”. The chain advances.`,
      })
    } else {
      setFeedback({
        type: "err",
        text: `✗ “${label}” doesn’t apply at the highlighted form. Look at the outermost syntactic operator and try again.`,
      })
    }
  }

  const reset = () => {
    setRevealedCount(0)
    setFeedback(null)
  }

  const undo = () => {
    if (revealedCount === 0) return
    setRevealedCount((c) => Math.max(0, c - 1))
    setFeedback(null)
  }

  const equationLabelFor = (key: string) =>
    palette.find((o) => o.key === key)?.label ?? key

  const visibleSteps = useMemo(
    () => steps.slice(0, revealedCount),
    [steps, revealedCount]
  )

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🧮 ${title}` : "🧮 Semantic Equation Constructor"}
        </span>
        <span className="text-xs text-muted-foreground">
          Applied {revealedCount} / {total}
        </span>
      </div>

      {goalDescription && (
        <div className="px-4 py-2 border-b bg-muted/20">
          <p className="text-sm text-muted-foreground italic">
            {goalDescription}
          </p>
        </div>
      )}

      <div className="px-4 py-4 bg-background space-y-2 overflow-x-auto">
        <div
          className={`flex items-baseline gap-3 px-3 py-2 rounded ${
            !isComplete && revealedCount === 0 ? "bg-amber-500/10" : ""
          }`}
        >
          <span className="font-mono text-sm w-20 shrink-0 text-muted-foreground">
            goal
          </span>
          <MathBlock formula={initialFormula} />
        </div>

        {visibleSteps.map((step, i) => {
          const isLatest = i === visibleSteps.length - 1 && !isComplete
          const isFinal = i === visibleSteps.length - 1 && isComplete
          return (
            <div
              key={i}
              className={`flex items-baseline gap-3 px-3 py-2 rounded ${
                isLatest
                  ? "bg-amber-500/10"
                  : isFinal
                  ? "bg-primary/5 border border-primary/40"
                  : ""
              }`}
            >
              <span className="font-mono text-sm w-20 shrink-0 text-muted-foreground">
                = ({equationLabelFor(step.equationKey)})
              </span>
              <MathBlock formula={step.formula} />
            </div>
          )
        })}

        {!isComplete && (
          <div className="flex items-baseline gap-3 px-3 py-2 rounded border-2 border-dashed border-muted-foreground/30">
            <span className="font-mono text-sm w-20 shrink-0 text-muted-foreground">
              = (?)
            </span>
            <span className="text-sm text-muted-foreground italic">
              Pick the equation that applies to the highlighted form.
            </span>
          </div>
        )}
      </div>

      {feedback && (
        <div
          className={`px-4 py-2 border-t text-sm ${
            feedback.type === "ok"
              ? "bg-green-500/10 text-green-800 dark:text-green-300"
              : "bg-red-500/10 text-red-800 dark:text-red-300"
          }`}
        >
          {feedback.text}
        </div>
      )}

      {!isComplete && (
        <div className="px-4 py-3 border-t bg-muted/10 space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Equation palette
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {palette.map((opt) => (
              <button
                key={opt.key}
                onClick={() => tryEquation(opt.key)}
                className="text-left px-3 py-2 rounded border bg-background hover:bg-muted/40 transition"
              >
                <div className="text-sm font-semibold mb-1">{opt.label}</div>
                <div className="text-xs">
                  <MathBlock formula={opt.schema} />
                </div>
                {opt.hint && (
                  <div className="text-xs text-muted-foreground mt-1 italic">
                    {opt.hint}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {isComplete && nextStep === null && (
        <div className="px-4 py-3 border-t bg-primary/5 text-sm text-center">
          🎉 Chain complete! Every rewrite was justified by a semantic equation.
        </div>
      )}

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={undo}
          disabled={revealedCount === 0}
        >
          ← Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          disabled={revealedCount === 0}
        >
          ↺ Reset
        </Button>
        <span className="text-xs text-muted-foreground">
          {isComplete
            ? "All equations applied."
            : `Next: choose an equation (${total - revealedCount} left).`}
        </span>
      </div>
    </div>
  )
}
