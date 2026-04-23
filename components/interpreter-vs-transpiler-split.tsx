"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

/**
 * Side-by-side comparison of the operational and denotational implementations
 * for the same Petal program — the adequacy theorem made tactile.
 *
 * Each step represents a single statement-level execution event. For that
 * event we display:
 *  • the source line being executed (highlighted in the Petal panel),
 *  • the line of the transpiled JavaScript that does the same work,
 *  • the interpreter's environment / output trace at that point,
 *  • the transpiler's "JavaScript engine state" at the same point.
 *
 * The whole component drives home a single point: at every step, both lanes
 * show the same `σ` and the same `output`. That equality is the adequacy
 * theorem in miniature.
 */

export interface AdequacyStep {
  /** Line in the Petal source that is being executed at this step. */
  petalHighlight?: string
  /** Line in the transpiled JS that corresponds to this step. */
  jsHighlight?: string
  /** Interpreter environment after this step. */
  interpreterEnv: Record<string, string | number>
  /** Interpreter accumulated output after this step. */
  interpreterOutput: (string | number)[]
  /** Transpiled JS environment after this step (should match interpreterEnv). */
  transpilerEnv: Record<string, string | number>
  /** Transpiled JS accumulated console output after this step. */
  transpilerOutput: (string | number)[]
  /** Optional caption tying the two lanes together. */
  description?: string
}

export interface InterpreterVsTranspilerSplitProps {
  title?: string
  petalSource: string
  /** The fully transpiled JS that is shown in the right column. */
  jsSource: string
  steps: AdequacyStep[]
}

function CodePanel({
  source,
  highlight,
  language,
}: {
  source: string
  highlight?: string
  language: string
}) {
  const lines = source.split("\n")
  return (
    <div className="font-mono text-sm overflow-x-auto bg-muted/20 min-h-[140px]">
      {lines.map((line, i) => {
        const trimmed = line.trim()
        const isHighlighted =
          !!highlight && !!trimmed && highlight.includes(trimmed)
        return (
          <div
            key={`${language}-${i}`}
            className={`px-3 ${
              isHighlighted ? "bg-amber-500/20 border-l-2 border-amber-500" : ""
            }`}
          >
            {line || "\u00A0"}
          </div>
        )
      })}
    </div>
  )
}

function StatePanel({
  env,
  output,
  envLabel,
  outputLabel,
}: {
  env: Record<string, string | number>
  output: (string | number)[]
  envLabel: string
  outputLabel: string
}) {
  const entries = Object.entries(env)
  return (
    <div className="px-3 py-3 space-y-2">
      <div>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {envLabel}
        </div>
        {entries.length === 0 ? (
          <div className="text-xs text-muted-foreground italic">(empty)</div>
        ) : (
          <div className="space-y-0.5">
            {entries.map(([name, value]) => (
              <div
                key={name}
                className="flex justify-between font-mono text-sm"
              >
                <span>{name}</span>
                <span>↦ {String(value)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {outputLabel}
        </div>
        {output.length === 0 ? (
          <div className="text-xs text-muted-foreground italic">(empty)</div>
        ) : (
          <div className="font-mono text-sm text-green-700 dark:text-green-400">
            [{output.join(", ")}]
          </div>
        )}
      </div>
    </div>
  )
}

function envEqual(
  a: Record<string, string | number>,
  b: Record<string, string | number>
) {
  const ak = Object.keys(a)
  const bk = Object.keys(b)
  if (ak.length !== bk.length) return false
  for (const k of ak) {
    if (a[k] !== b[k]) return false
  }
  return true
}

function outputEqual(a: (string | number)[], b: (string | number)[]) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export function InterpreterVsTranspilerSplit({
  title,
  petalSource,
  jsSource,
  steps,
}: InterpreterVsTranspilerSplitProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const envMatches = envEqual(step.interpreterEnv, step.transpilerEnv)
  const outputMatches = outputEqual(step.interpreterOutput, step.transpilerOutput)
  const allMatches = envMatches && outputMatches

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `⚖️ ${title}` : "⚖️ Interpreter vs Transpiler"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Interpreter (LN 11) — Petal source
            </span>
          </div>
          <CodePanel
            source={petalSource}
            highlight={step.petalHighlight}
            language="petal"
          />
          <div className="border-t bg-background">
            <StatePanel
              env={step.interpreterEnv}
              output={step.interpreterOutput}
              envLabel="env σ (after step)"
              outputLabel="output o"
            />
          </div>
        </div>

        <div>
          <div className="px-3 py-1.5 bg-muted/30 border-b flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Transpiler (LN 12) — generated JS
            </span>
          </div>
          <CodePanel
            source={jsSource}
            highlight={step.jsHighlight}
            language="js"
          />
          <div className="border-t bg-background">
            <StatePanel
              env={step.transpilerEnv}
              output={step.transpilerOutput}
              envLabel="JS engine state (after step)"
              outputLabel="console output"
            />
          </div>
        </div>
      </div>

      <div
        className={`px-4 py-2 border-b text-sm text-center ${
          allMatches
            ? "bg-green-500/10 text-green-800 dark:text-green-300"
            : "bg-red-500/10 text-red-800 dark:text-red-300"
        }`}
      >
        {allMatches
          ? "✓ Both lanes agree on environment and output — adequacy holds at this step."
          : "✗ The lanes disagree at this step (this should never happen — recheck the trace)."}
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
