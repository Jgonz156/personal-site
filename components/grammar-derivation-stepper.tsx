"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface GrammarRule {
  variable: string
  productions: string[][]
}

interface GuidedStep {
  symbolIndex: number
  productionIndex: number
  description?: string
}

interface GrammarDerivationStepperProps {
  title?: string
  rules: GrammarRule[]
  startSymbol: string
  terminals: string[]
  guidedSteps?: GuidedStep[]
}

interface HistoryEntry {
  form: string[]
  description?: string
}

export function GrammarDerivationStepper({
  title,
  rules,
  startSymbol,
  terminals,
  guidedSteps,
}: GrammarDerivationStepperProps) {
  const terminalSet = useMemo(() => new Set(terminals), [terminals])
  const ruleMap = useMemo(() => {
    const map = new Map<string, string[][]>()
    for (const rule of rules) {
      map.set(rule.variable, rule.productions)
    }
    return map
  }, [rules])

  const [history, setHistory] = useState<HistoryEntry[]>([
    { form: [startSymbol], description: "Start with the start symbol" },
  ])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [guidedIndex, setGuidedIndex] = useState(0)
  const [isGuided, setIsGuided] = useState(!!guidedSteps?.length)
  const popoverRef = useRef<HTMLDivElement>(null)

  const currentForm = history[history.length - 1].form

  const isVariable = useCallback(
    (symbol: string) => !terminalSet.has(symbol) && symbol !== "ε",
    [terminalSet]
  )

  const isComplete = useMemo(
    () => currentForm.every((s) => !isVariable(s)),
    [currentForm, isVariable]
  )

  const generatedString = useMemo(() => {
    if (!isComplete) return null
    return currentForm.filter((s) => s !== "ε").join("") || "ε"
  }, [currentForm, isComplete])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setSelectedIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function applyProduction(symbolIndex: number, production: string[]) {
    const newForm = [...currentForm]
    newForm.splice(symbolIndex, 1, ...production)
    setHistory((prev) => [...prev, { form: newForm }])
    setSelectedIndex(null)
  }

  function applyGuidedStep() {
    if (!guidedSteps || guidedIndex >= guidedSteps.length) return
    const step = guidedSteps[guidedIndex]
    const variable = currentForm[step.symbolIndex]
    const productions = ruleMap.get(variable)
    if (!productions || step.productionIndex >= productions.length) return
    const production = productions[step.productionIndex]
    const newForm = [...currentForm]
    newForm.splice(step.symbolIndex, 1, ...production)
    setHistory((prev) => [
      ...prev,
      { form: newForm, description: step.description },
    ])
    setGuidedIndex((prev) => prev + 1)
    setSelectedIndex(null)
  }

  function undo() {
    if (history.length <= 1) return
    setHistory((prev) => prev.slice(0, -1))
    if (isGuided && guidedIndex > 0) {
      setGuidedIndex((prev) => prev - 1)
    }
    setSelectedIndex(null)
  }

  function reset() {
    setHistory([
      { form: [startSymbol], description: "Start with the start symbol" },
    ])
    setGuidedIndex(0)
    setSelectedIndex(null)
  }

  const lastDescription = history[history.length - 1].description
  const guidedDone =
    guidedSteps != null && guidedIndex >= guidedSteps.length

  return (
    <div className="my-6 border rounded-lg overflow-visible">
      <div className="px-4 py-3 bg-muted/50 border-b flex items-center justify-between gap-4 flex-wrap">
        <span className="font-semibold text-sm">
          {title ? `🌳 ${title}` : "🌳 Grammar Derivation"}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {history.length - 1} step{history.length - 1 !== 1 ? "s" : ""}
          </span>
          {guidedSteps && guidedSteps.length > 0 && (
            <button
              onClick={() => setIsGuided(!isGuided)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${
                isGuided
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              {isGuided ? "Guided" : "Free"}
            </button>
          )}
        </div>
      </div>

      <div className="px-4 py-2 border-b bg-muted/20">
        <div className="text-xs text-muted-foreground space-y-0.5">
          {rules.map((rule, i) => (
            <div key={i} className="font-mono">
              <span className="text-primary font-semibold italic">
                {rule.variable}
              </span>
              <span className="mx-1.5">→</span>
              {rule.productions.map((prod, j) => (
                <span key={j}>
                  {j > 0 && (
                    <span className="mx-1 text-muted-foreground/60">|</span>
                  )}
                  {prod.map((sym, k) => (
                    <span
                      key={k}
                      className={
                        isVariable(sym)
                          ? "text-primary italic"
                          : "text-foreground"
                      }
                    >
                      {sym === "ε" ? (
                        <span className="text-amber-500">ε</span>
                      ) : (
                        sym
                      )}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 min-h-[80px] flex flex-col items-center justify-center gap-3">
        {isComplete && generatedString && (
          <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">
            Derivation complete! Generated: &quot;
            <span className="font-mono">{generatedString}</span>&quot;
          </div>
        )}

        <div className="flex flex-wrap gap-1 justify-center items-center relative">
          {currentForm.map((symbol, i) => {
            const isVar = isVariable(symbol)
            const isSelected = selectedIndex === i
            const productions = isVar ? ruleMap.get(symbol) : null

            return (
              <div key={`${i}-${symbol}`} className="relative">
                <button
                  onClick={() => {
                    if (isVar && !isGuided) {
                      setSelectedIndex(isSelected ? null : i)
                    }
                  }}
                  disabled={!isVar || isGuided}
                  className={`
                    inline-flex items-center px-2.5 py-1 rounded-md text-sm font-mono
                    border transition-all duration-200
                    ${
                      isVar
                        ? isSelected
                          ? "border-primary bg-primary/20 text-primary font-bold italic scale-110 shadow-sm"
                          : isGuided
                            ? "border-primary/30 bg-primary/5 text-primary italic cursor-default"
                            : "border-primary/40 bg-primary/10 text-primary italic cursor-pointer hover:bg-primary/20 hover:scale-105"
                        : symbol === "ε"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 cursor-default"
                          : "border-border bg-background text-foreground cursor-default"
                    }
                  `}
                >
                  {symbol}
                </button>

                {isSelected && productions && (
                  <div
                    ref={popoverRef}
                    className="absolute z-50 top-full mt-1 left-1/2 -translate-x-1/2 min-w-[120px]
                               max-h-[200px] overflow-y-auto
                               border rounded-lg bg-popover shadow-lg p-1.5 space-y-0.5"
                  >
                    <div className="text-[10px] text-muted-foreground px-2 pb-1 border-b mb-1">
                      Replace <span className="italic font-semibold">{symbol}</span> with:
                    </div>
                    {productions.map((prod, j) => (
                      <button
                        key={j}
                        onClick={() => applyProduction(i, prod)}
                        className="w-full text-left px-2 py-1 rounded text-sm font-mono
                                   hover:bg-muted/80 transition-colors flex items-center gap-1"
                      >
                        {prod.map((sym, k) => (
                          <span
                            key={k}
                            className={
                              isVariable(sym)
                                ? "text-primary italic"
                                : sym === "ε"
                                  ? "text-amber-500"
                                  : "text-foreground"
                            }
                          >
                            {sym}
                          </span>
                        ))}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {lastDescription && (
          <p className="text-sm text-muted-foreground italic text-center mt-1">
            {lastDescription}
          </p>
        )}
      </div>

      <div className="px-4 py-3 border-t bg-muted/20 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={history.length <= 1}
          >
            ↩ Undo
          </Button>
          <Button variant="outline" size="sm" onClick={reset}>
            ↺ Reset
          </Button>
        </div>

        {isGuided && guidedSteps && !guidedDone && (
          <Button
            variant="default"
            size="sm"
            onClick={applyGuidedStep}
          >
            Next Guided Step →
          </Button>
        )}

        {!isGuided && !isComplete && (
          <span className="text-xs text-muted-foreground italic">
            Click a variable to expand it
          </span>
        )}
      </div>
    </div>
  )
}
