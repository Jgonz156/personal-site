"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Scope {
  name: string
  bindings: Record<string, number>
  parentIndex: number | null
}

interface ScopeStep {
  scopes: Scope[]
  lookupVariable?: string
  lookupPath?: number[]
  resolvedValue?: number | null
  description: string
}

interface ScopeChainVisualizerProps {
  title?: string
  lexicalSteps: ScopeStep[]
  dynamicSteps: ScopeStep[]
}

function ScopeChain({
  step,
}: {
  step: ScopeStep
}) {
  const lookupPathSet = new Set(step.lookupPath ?? [])

  return (
    <div className="flex flex-col items-center gap-2 py-3 px-2">
      {step.scopes.map((scope, idx) => {
        const isOnLookupPath = lookupPathSet.has(idx)
        const hasResolvedVar =
          step.lookupVariable && scope.bindings[step.lookupVariable] !== undefined
        const isResolved = isOnLookupPath && hasResolvedVar

        return (
          <div key={idx} className="flex flex-col items-center w-full max-w-xs">
            {idx > 0 && (
              <div className={`w-0.5 h-4 ${isOnLookupPath ? "bg-amber-500" : "bg-muted-foreground/30"}`} />
            )}
            <div
              className={`w-full border rounded-lg overflow-hidden ${
                isResolved
                  ? "ring-2 ring-green-500 border-green-500"
                  : isOnLookupPath
                    ? "ring-2 ring-amber-500 border-amber-500"
                    : "border-border"
              }`}
            >
              <div className={`px-3 py-1.5 text-xs font-semibold ${
                isResolved
                  ? "bg-green-500/15 text-green-700 dark:text-green-400"
                  : isOnLookupPath
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                    : "bg-muted/50 text-muted-foreground"
              }`}>
                {scope.name}
                {scope.parentIndex !== null && (
                  <span className="ml-1 opacity-60">
                    (parent: {step.scopes[scope.parentIndex]?.name})
                  </span>
                )}
              </div>
              <div className="px-3 py-1.5">
                {Object.entries(scope.bindings).length === 0 ? (
                  <span className="text-xs text-muted-foreground italic">(empty)</span>
                ) : (
                  <div className="space-y-0.5">
                    {Object.entries(scope.bindings).map(([name, value]) => (
                      <div
                        key={name}
                        className={`flex justify-between font-mono text-sm ${
                          name === step.lookupVariable && isOnLookupPath
                            ? "text-green-700 dark:text-green-400 font-bold"
                            : ""
                        }`}
                      >
                        <span>{name}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {step.lookupVariable && step.resolvedValue !== undefined && (
        <div className="mt-2 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-green-500/15 text-green-700 dark:text-green-400 text-sm font-mono">
            {step.lookupVariable} = {step.resolvedValue === null ? "undefined" : step.resolvedValue}
          </span>
        </div>
      )}
    </div>
  )
}

export function ScopeChainVisualizer({
  title,
  lexicalSteps,
  dynamicSteps,
}: ScopeChainVisualizerProps) {
  const [mode, setMode] = useState<"lexical" | "dynamic">("lexical")
  const [currentStep, setCurrentStep] = useState(0)

  const steps = mode === "lexical" ? lexicalSteps : dynamicSteps
  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const switchMode = (newMode: "lexical" | "dynamic") => {
    setMode(newMode)
    setCurrentStep(0)
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔗 ${title}` : "🔗 Scope Chain Visualizer"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="px-4 py-2 border-b bg-muted/10 flex items-center justify-center gap-2">
        <Button
          variant={mode === "lexical" ? "default" : "outline"}
          size="sm"
          onClick={() => switchMode("lexical")}
        >
          Lexical Scope
        </Button>
        <Button
          variant={mode === "dynamic" ? "default" : "outline"}
          size="sm"
          onClick={() => switchMode("dynamic")}
        >
          Dynamic Scope
        </Button>
      </div>

      <div className="min-h-[200px]">
        <ScopeChain step={step} />
      </div>

      {step.description && (
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
          onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={isLast}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
