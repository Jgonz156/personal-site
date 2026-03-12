"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface StringSetExpanderProps {
  title?: string
  alphabet: string[]
  maxPower?: number
}

function generateStrings(alphabet: string[], length: number): string[] {
  if (length === 0) return ["ε"]
  if (length === 1) return [...alphabet]
  const shorter = generateStrings(alphabet, length - 1)
  const result: string[] = []
  for (const s of shorter) {
    for (const c of alphabet) {
      result.push((s === "ε" ? "" : s) + c)
    }
  }
  return result
}

export function StringSetExpander({
  title,
  alphabet,
  maxPower = 3,
}: StringSetExpanderProps) {
  const totalSteps = maxPower + 2
  const [currentStep, setCurrentStep] = useState(0)

  const steps = useMemo(() => {
    const result: {
      label: string
      description: string
      strings: string[]
      operation: string
    }[] = []

    result.push({
      label: "Alphabet",
      description: "We begin with our alphabet — a finite set of symbols.",
      strings: alphabet,
      operation: `Σ = { ${alphabet.join(", ")} }`,
    })

    for (let k = 0; k <= maxPower; k++) {
      const strings = generateStrings(alphabet, k)
      const count = strings.length
      if (k === 0) {
        result.push({
          label: "Σ⁰",
          description: `All strings of length 0. There is exactly one: the empty string ε.`,
          strings,
          operation: `Σ⁰ = { ε }  — ${count} string`,
        })
      } else {
        const superscript = k.toString().split("").map(d =>
          "⁰¹²³⁴⁵⁶⁷⁸⁹"[parseInt(d)]
        ).join("")
        result.push({
          label: `Σ${superscript}`,
          description:
            k === 1
              ? `All strings of length 1 — just the symbols of Σ themselves.`
              : `All strings of length ${k}. We get these by concatenating every string in Σ${
                  (k - 1).toString().split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[parseInt(d)]).join("")
                } with every symbol in Σ.`,
          strings,
          operation: `Σ${superscript} — ${count} string${count > 1 ? "s" : ""} (|Σ|${superscript} = ${alphabet.length}${superscript} = ${count})`,
        })
      }
    }

    const allStrings: string[] = []
    for (let k = 0; k <= maxPower; k++) {
      allStrings.push(...generateStrings(alphabet, k))
    }
    result.push({
      label: "Σ*",
      description: `The Kleene closure: the union of all Σᵏ for k ≥ 0. This set is countably infinite — we show strings up to length ${maxPower}.`,
      strings: [...allStrings, "..."],
      operation: `Σ* = Σ⁰ ∪ Σ¹ ∪ Σ² ∪ Σ³ ∪ ⋯  (infinite!)`,
    })

    return result
  }, [alphabet, maxPower])

  const step = steps[currentStep]

  const goToStep = (next: number) => {
    if (next < 0 || next >= totalSteps) return
    setCurrentStep(next)
  }

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `📚 ${title}` : "📚 String Set Expander"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="text-center mb-3">
          <span className="font-mono text-sm font-semibold text-primary">
            {step.operation}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 justify-center min-h-[60px] items-center">
          {step.strings.map((s, i) => (
            <span
              key={`${currentStep}-${i}`}
              className={`
                inline-flex items-center px-2.5 py-1 rounded-md text-sm font-mono
                border transition-all duration-300
                ${s === "..."
                  ? "border-dashed border-muted-foreground/40 text-muted-foreground bg-transparent"
                  : s === "ε"
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "border-primary/30 bg-primary/5 text-foreground"
                }
              `}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {step.description && (
        <div className="px-4 pb-3">
          <p className="text-sm text-muted-foreground italic text-center">
            {step.description}
          </p>
        </div>
      )}

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          ← Previous
        </Button>

        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentStep
                  ? "bg-primary"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => goToStep(currentStep + 1)}
          disabled={currentStep === totalSteps - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
