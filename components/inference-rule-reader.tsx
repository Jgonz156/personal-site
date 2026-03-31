"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface RulePart {
  label: string
  latex: string
  description: string
}

interface Rule {
  ruleName: string
  conclusion: { left: RulePart; right: RulePart }
  premises: RulePart[]
  ruleDescription: string
}

interface InferenceRuleReaderProps {
  title?: string
  conclusion?: { left: RulePart; right: RulePart }
  premises?: RulePart[]
  ruleName?: string
  rules?: Rule[]
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

function MathBlock({ latex, className }: { latex: string; className?: string }) {
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
    <span
      ref={ref}
      className={className}
      style={{ opacity: rendered ? 1 : 0.3 }}
    >
      {`$${latex}$`}
    </span>
  )
}

type OmegaStep = {
  partType: "conclusion-left" | "premise" | "conclusion-right" | "overview" | "rule-intro"
  partIndex?: number
  ruleIndex: number
  label: string
  description: string
}

function buildSingleRuleSteps(
  conclusion: { left: RulePart; right: RulePart },
  premises: RulePart[],
  ruleIndex: number
): OmegaStep[] {
  const steps: OmegaStep[] = [
    {
      partType: "overview",
      ruleIndex,
      label: "The Full Rule",
      description:
        "This is the complete inference rule. We'll read it using the Ω (Omega) path: start at the bottom-left, loop up through the premises, then come back down to the bottom-right.",
    },
    {
      partType: "conclusion-left",
      ruleIndex,
      label: conclusion.left.label,
      description: conclusion.left.description,
    },
  ]

  premises.forEach((p, i) => {
    steps.push({
      partType: "premise",
      partIndex: i,
      ruleIndex,
      label: p.label,
      description: p.description,
    })
  })

  steps.push({
    partType: "conclusion-right",
    ruleIndex,
    label: conclusion.right.label,
    description: conclusion.right.description,
  })

  return steps
}

function buildMultiRuleSteps(rules: Rule[]): OmegaStep[] {
  const allSteps: OmegaStep[] = []

  rules.forEach((rule, ri) => {
    allSteps.push({
      partType: "rule-intro",
      ruleIndex: ri,
      label: rule.ruleName,
      description: rule.ruleDescription,
    })

    allSteps.push({
      partType: "conclusion-left",
      ruleIndex: ri,
      label: rule.conclusion.left.label,
      description: rule.conclusion.left.description,
    })

    rule.premises.forEach((p, pi) => {
      allSteps.push({
        partType: "premise",
        partIndex: pi,
        ruleIndex: ri,
        label: p.label,
        description: p.description,
      })
    })

    allSteps.push({
      partType: "conclusion-right",
      ruleIndex: ri,
      label: rule.conclusion.right.label,
      description: rule.conclusion.right.description,
    })
  })

  return allSteps
}

const COLORS = {
  active: {
    "conclusion-left":
      "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950/40 rounded px-1",
    premise:
      "ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-950/40 rounded px-1",
    "conclusion-right":
      "ring-2 ring-green-500 bg-green-50 dark:bg-green-950/40 rounded px-1",
    overview: "",
    "rule-intro": "",
  },
  badge: {
    "conclusion-left":
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    premise:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    "conclusion-right":
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    overview: "bg-muted text-muted-foreground",
    "rule-intro": "bg-muted text-muted-foreground",
  },
}

export function InferenceRuleReader({
  title,
  conclusion,
  premises,
  ruleName,
  rules,
}: InferenceRuleReaderProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const isMultiRule = !!rules && rules.length > 0

  const omegaSteps = useMemo(() => {
    if (isMultiRule) {
      return buildMultiRuleSteps(rules!)
    }
    return buildSingleRuleSteps(conclusion!, premises!, 0)
  }, [isMultiRule, rules, conclusion, premises])

  const step = omegaSteps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === omegaSteps.length - 1

  const activeRule = useMemo(() => {
    if (isMultiRule) {
      return rules![step.ruleIndex]
    }
    return { ruleName: ruleName ?? "", conclusion: conclusion!, premises: premises!, ruleDescription: "" }
  }, [isMultiRule, rules, step, ruleName, conclusion, premises])

  const activeConclusion = activeRule.conclusion
  const activePremises = activeRule.premises

  const getHighlight = useCallback(
    (
      partType: "conclusion-left" | "premise" | "conclusion-right",
      partIndex?: number
    ) => {
      if (step.partType === "overview" || step.partType === "rule-intro") return ""
      if (step.partType === partType) {
        if (partType === "premise" && step.partIndex !== partIndex) return ""
        return COLORS.active[partType]
      }
      return ""
    },
    [step]
  )

  const omegaPathLabel = (() => {
    if (step.partType === "overview" || step.partType === "rule-intro") return null
    if (step.partType === "conclusion-left") return "① Start here"
    if (step.partType === "premise")
      return `② Premise ${(step.partIndex ?? 0) + 1}`
    if (step.partType === "conclusion-right") return "③ Result"
    return null
  })()

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `Ω ${title}` : "Ω Inference Rule Reader"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {omegaSteps.length}
        </span>
      </div>

      {/* Rule indicator bar */}
      <div className="px-4 py-1.5 border-b bg-muted/10 text-center">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {isMultiRule
            ? `Rule ${step.ruleIndex + 1} of ${rules!.length} — ${activeRule.ruleName}`
            : activeRule.ruleName || "Inference Rule"}
        </span>
      </div>

      {/* The inference rule display */}
      <div className="px-6 py-6 flex flex-col items-center gap-1">
        {activePremises.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {activePremises.map((p, i) => (
              <span
                key={`${step.ruleIndex}-${i}`}
                className={`inline-block transition-all duration-300 ${getHighlight("premise", i)}`}
              >
                <MathBlock latex={p.latex} />
              </span>
            ))}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground italic py-1">
            (no premises — this is an axiom)
          </div>
        )}

        <div className="w-full max-w-lg border-t-2 border-foreground my-1" />

        <div className="flex flex-wrap items-center justify-center gap-x-2">
          <span
            className={`inline-block transition-all duration-300 ${getHighlight("conclusion-left")}`}
          >
            <MathBlock latex={activeConclusion.left.latex} />
          </span>
          <span
            className={`inline-block transition-all duration-300 ${getHighlight("conclusion-right")}`}
          >
            <MathBlock latex={activeConclusion.right.latex} />
          </span>
        </div>
      </div>

      {/* Omega path indicator and description */}
      <div className="px-4 py-3 border-t bg-muted/20">
        <div className="flex items-center justify-center gap-2 mb-2">
          {omegaPathLabel && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded ${
                COLORS.badge[step.partType]
              }`}
            >
              {omegaPathLabel}
            </span>
          )}
          <span className="text-xs font-semibold text-muted-foreground">
            {step.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground italic text-center">
          {step.description}
        </p>
      </div>

      {/* Omega path legend */}
      <div className="px-4 py-2 border-t bg-muted/10 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-blue-200 dark:bg-blue-800 border border-blue-400" />
          Input
        </span>
        <span>→</span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-amber-200 dark:bg-amber-800 border border-amber-400" />
          Premises
        </span>
        <span>→</span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded bg-green-200 dark:bg-green-800 border border-green-400" />
          Result
        </span>
      </div>

      {/* Nav buttons */}
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
            setCurrentStep((s) => Math.min(omegaSteps.length - 1, s + 1))
          }
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
