"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TranspilerStep {
  petalHighlight: string
  jsCode: string
  jsHighlight: string
  equation: string
  description: string
}

interface TranspilerOutputProps {
  title?: string
  petalSource: string
  steps: TranspilerStep[]
}

export function TranspilerOutput({
  title,
  petalSource,
  steps,
}: TranspilerOutputProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const step = steps[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === steps.length - 1

  const highlightLine = (source: string, highlight: string) => {
    if (!highlight) return source
    const lines = source.split("\n")
    return lines.map((line, i) => {
      const isHighlighted = highlight && line.trim() && highlight.includes(line.trim())
      return (
        <div
          key={i}
          className={`px-3 ${
            isHighlighted
              ? "bg-amber-500/20 border-l-2 border-amber-500"
              : ""
          }`}
        >
          {line || "\u00A0"}
        </div>
      )
    })
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔄 ${title}` : "🔄 Transpiler Output"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-b">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Petal Source
            </span>
          </div>
          <div className="font-mono text-sm py-2 overflow-x-auto bg-zinc-950 text-zinc-300 min-h-[120px]">
            {highlightLine(petalSource, step.petalHighlight)}
          </div>
        </div>

        <div>
          <div className="px-3 py-1.5 bg-muted/30 border-b">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Generated JavaScript
            </span>
          </div>
          <div className="font-mono text-sm py-2 overflow-x-auto bg-zinc-950 text-zinc-300 min-h-[120px]">
            {highlightLine(step.jsCode, step.jsHighlight)}
          </div>
        </div>
      </div>

      {step.equation && (
        <div className="px-4 py-2 border-b bg-blue-500/5">
          <p className="text-sm text-center font-mono text-blue-700 dark:text-blue-400">
            {step.equation}
          </p>
        </div>
      )}

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
