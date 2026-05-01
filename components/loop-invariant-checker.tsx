"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { waitForMathJax, MathShimmer } from "@/components/math"

export interface InvariantCandidate {
  /** Human-friendly label, e.g. "Candidate 1 (too weak)". */
  label: string
  /** LaTeX of the invariant itself, without surrounding $...$. */
  invariantLatex: string
  /** Whether this candidate ultimately succeeds — drives the verdict pill. */
  succeeds: boolean
}

export type InvariantStage =
  | "setup"
  | "init"
  | "preservation"
  | "termination"
  | "verdict"

export interface InvariantStep {
  /** Index into the candidates array — anchors the step to a specific attempt. */
  candidateIdx: number
  /** Which check we're inside. */
  stage: InvariantStage
  /** Optional sub-label like "Preservation (b)" or "Algebra". */
  substageLabel?: string
  /** Optional centered LaTeX claim shown above the explanation. */
  claimLatex?: string
  /** Plain text with optional inline $...$ math segments. */
  explanation: string
  /** Status badge for this step. */
  status?: "pass" | "fail" | "running"
}

export interface LoopInvariantCheckerProps {
  title?: string
  loopCode: string
  /** LaTeX of the postcondition, without surrounding $...$. */
  postcondition: string
  candidates: InvariantCandidate[]
  steps: InvariantStep[]
}

const STAGE_LABEL: Record<InvariantStage, string> = {
  setup: "Setup",
  init: "Initialization",
  preservation: "Preservation",
  termination: "Termination",
  verdict: "Verdict",
}

const STAGE_TINT: Record<InvariantStage, string> = {
  setup: "bg-muted/30 text-muted-foreground",
  init: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  preservation: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
  termination: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  verdict: "bg-primary/10 text-primary",
}

/**
 * Renders the active step's body — claim LaTeX (if any) and explanation prose
 * with inline `$...$` segments — inside a single ref'd container that gets one
 * MathJax typeset pass per step transition. This avoids the multi-region race
 * that the previous version of this component suffered from when two checkers
 * mounted on the same page.
 */
function StepBody({
  stepKey,
  claimLatex,
  explanation,
}: {
  stepKey: number
  claimLatex?: string
  explanation: string
}) {
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

    return () => {
      mounted = false
    }
  }, [stepKey])

  return (
    <div className="relative min-h-[120px]">
      {!rendered && <MathShimmer block />}
      <div
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {claimLatex && (
          <div className="my-2 text-center overflow-x-auto">
            {`$$${claimLatex}$$`}
          </div>
        )}
        <p className="text-sm leading-relaxed">{explanation}</p>
      </div>
    </div>
  )
}

/**
 * Renders the standing invariant + postcondition + loop code in the left
 * column. Re-typesets only when the active candidate changes (since the
 * invariant LaTeX is the only math that flips here).
 */
function ContextPanel({
  loopCode,
  postcondition,
  candidate,
  candidateNumber,
  candidateTotal,
}: {
  loopCode: string
  postcondition: string
  candidate: InvariantCandidate
  candidateNumber: number
  candidateTotal: number
}) {
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

    return () => {
      mounted = false
    }
  }, [candidate.invariantLatex, postcondition])

  return (
    <div className="p-3 space-y-3">
      <pre className="bg-muted/30 rounded px-3 py-2 font-mono text-xs overflow-x-auto leading-5">
        {loopCode}
      </pre>
      <div className="relative">
        {!rendered && <MathShimmer block />}
        <div
          ref={ref}
          style={{
            visibility: rendered ? "visible" : "hidden",
            position: rendered ? "static" : "absolute",
          }}
          className="space-y-2 text-xs"
        >
          <div>
            <div className="font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Postcondition
            </div>
            <div className="overflow-x-auto">{`$${postcondition}$`}</div>
          </div>
          <div>
            <div className="font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Attempting{" "}
              <span className="text-foreground/70 normal-case">
                ({candidateNumber} of {candidateTotal})
              </span>
            </div>
            <div className="font-medium text-foreground mb-1">
              {candidate.label}
            </div>
            <div className="overflow-x-auto">
              {`$I = ${candidate.invariantLatex}$`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoopInvariantChecker({
  title,
  loopCode,
  postcondition,
  candidates,
  steps,
}: LoopInvariantCheckerProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = steps[currentStep]
  const candidate = candidates[step.candidateIdx]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const stageBadge = STAGE_LABEL[step.stage]
  const stageTint = STAGE_TINT[step.stage]

  const statusBadge =
    step.status === "pass"
      ? { text: "✓ Pass", cls: "bg-green-500/20 text-green-700 dark:text-green-400" }
      : step.status === "fail"
      ? { text: "✗ Fail", cls: "bg-red-500/20 text-red-700 dark:text-red-400" }
      : null

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔍 ${title}` : "🔍 Loop Invariant Checker"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,260px)_1fr] border-b">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Loop &amp; Current Attempt
            </span>
          </div>
          <ContextPanel
            loopCode={loopCode}
            postcondition={postcondition}
            candidate={candidate}
            candidateNumber={step.candidateIdx + 1}
            candidateTotal={candidates.length}
          />
        </div>

        <div className="flex flex-col">
          <div className="px-3 py-1.5 bg-muted/30 border-b flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${stageTint}`}
              >
                {stageBadge}
              </span>
              {step.substageLabel && (
                <span className="text-xs text-muted-foreground">
                  {step.substageLabel}
                </span>
              )}
            </div>
            {statusBadge && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded ${statusBadge.cls}`}
              >
                {statusBadge.text}
              </span>
            )}
          </div>
          <div className="px-4 py-3">
            <StepBody
              stepKey={currentStep}
              claimLatex={step.claimLatex}
              explanation={step.explanation}
            />
          </div>
        </div>
      </div>

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
