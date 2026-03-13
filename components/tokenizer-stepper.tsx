"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

interface Token {
  type: string
  value: string
  start: number
  end: number
}

interface TokenizerStepperProps {
  title?: string
  source: string
  tokens: Token[]
}

const TOKEN_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  keyword: {
    bg: "bg-purple-500/15",
    border: "border-purple-500/40",
    text: "text-purple-600 dark:text-purple-400",
  },
  identifier: {
    bg: "bg-blue-500/15",
    border: "border-blue-500/40",
    text: "text-blue-600 dark:text-blue-400",
  },
  number: {
    bg: "bg-amber-500/15",
    border: "border-amber-500/40",
    text: "text-amber-600 dark:text-amber-400",
  },
  symbol: {
    bg: "bg-slate-500/15",
    border: "border-slate-500/40",
    text: "text-slate-600 dark:text-slate-400",
  },
  operator: {
    bg: "bg-rose-500/15",
    border: "border-rose-500/40",
    text: "text-rose-600 dark:text-rose-400",
  },
  string: {
    bg: "bg-green-500/15",
    border: "border-green-500/40",
    text: "text-green-600 dark:text-green-400",
  },
  comment: {
    bg: "bg-gray-500/10",
    border: "border-gray-400/30",
    text: "text-gray-400 dark:text-gray-500",
  },
  whitespace: {
    bg: "bg-transparent",
    border: "border-transparent",
    text: "text-muted-foreground/40",
  },
}

const DEFAULT_COLOR = {
  bg: "bg-muted/30",
  border: "border-border",
  text: "text-foreground",
}

function getTokenColor(type: string) {
  return TOKEN_COLORS[type] ?? DEFAULT_COLOR
}

export function TokenizerStepper({
  title,
  source,
  tokens,
}: TokenizerStepperProps) {
  const totalSteps = tokens.length + 1
  const [currentStep, setCurrentStep] = useState(0)

  const visibleTokens = tokens.slice(0, currentStep)
  const activeToken = currentStep > 0 && currentStep <= tokens.length ? tokens[currentStep - 1] : null

  const charAnnotations = useMemo(() => {
    const annotations: (Token | null)[] = new Array(source.length).fill(null)
    for (let ti = 0; ti < Math.min(currentStep, tokens.length); ti++) {
      const token = tokens[ti]
      for (let ci = token.start; ci < token.end; ci++) {
        if (ci < annotations.length) {
          annotations[ci] = token
        }
      }
    }
    return annotations
  }, [source, tokens, currentStep])

  const description = useMemo(() => {
    if (currentStep === 0) {
      return "The scanner reads the source code as a stream of characters. Click Next to begin tokenization."
    }
    if (currentStep > tokens.length) {
      return `Tokenization complete! ${tokens.filter(t => t.type !== "whitespace" && t.type !== "comment").length} tokens produced.`
    }
    const tok = tokens[currentStep - 1]
    if (tok.type === "whitespace" || tok.type === "comment") {
      return `Skip ${tok.type}: "${tok.value.replace(/\n/g, "\\n").replace(/\t/g, "\\t")}"`
    }
    return `Recognize ${tok.type}: "${tok.value}"`
  }, [currentStep, tokens])

  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🔍 ${title}` : "🔍 Tokenizer"}
        </span>
        <span className="text-xs text-muted-foreground">
          Step {currentStep} of {totalSteps - 1}
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Source Code
        </div>
        <div className="font-mono text-sm leading-relaxed p-3 rounded-md border bg-muted/20 whitespace-pre-wrap break-all">
          {source.split("").map((char, i) => {
            const annotation = charAnnotations[i]
            const isActive = activeToken && i >= activeToken.start && i < activeToken.end

            if (annotation) {
              const colors = getTokenColor(annotation.type)
              return (
                <span
                  key={i}
                  className={`${isActive ? "ring-2 ring-primary ring-offset-1 rounded-sm" : ""} ${colors.bg} ${colors.text} transition-all duration-200`}
                >
                  {char === " " ? "\u00A0" : char === "\n" ? "↵\n" : char}
                </span>
              )
            }

            return (
              <span key={i} className="text-muted-foreground/60">
                {char === " " ? "\u00A0" : char === "\n" ? "↵\n" : char}
              </span>
            )
          })}
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Token Stream
        </div>
        <div className="flex flex-wrap gap-1.5 min-h-[40px] items-center p-3 rounded-md border bg-muted/10">
          {visibleTokens.filter(t => t.type !== "whitespace" && t.type !== "comment").length === 0 && (
            <span className="text-xs text-muted-foreground/50 italic">
              No tokens yet...
            </span>
          )}
          {visibleTokens.map((token, i) => {
            if (token.type === "whitespace" || token.type === "comment") return null
            const colors = getTokenColor(token.type)
            const isNewest = token === activeToken
            return (
              <span
                key={i}
                className={`
                  inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono
                  border transition-all duration-300
                  ${colors.bg} ${colors.border} ${colors.text}
                  ${isNewest ? "ring-2 ring-primary shadow-sm scale-105" : ""}
                `}
              >
                <span className="opacity-50 text-[10px] uppercase font-sans">
                  {token.type}
                </span>
                <span className="font-semibold">{token.value}</span>
              </span>
            )
          })}
        </div>
      </div>

      <div className="px-4 py-2 border-t bg-muted/20">
        <p className="text-sm text-muted-foreground italic text-center">
          {description}
        </p>
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
        >
          ← Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentStep(0)}
          disabled={currentStep === 0}
        >
          ↺ Reset
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => setCurrentStep((s) => Math.min(totalSteps - 1, s + 1))}
          disabled={currentStep >= totalSteps - 1}
        >
          Next →
        </Button>
      </div>
    </div>
  )
}
