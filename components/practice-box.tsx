"use client"

import { useState, type ReactNode } from "react"

interface PracticeBoxProps {
  question: string | ReactNode
  choices: (string | ReactNode)[]
  correctIndex: number | number[]
  explanation: string | ReactNode
  hint?: string
  title?: string
  multiSelect?: boolean
}

export function PracticeBox({
  question,
  choices,
  correctIndex,
  explanation,
  hint,
  title,
  multiSelect = false,
}: PracticeBoxProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const correctSet = new Set(
    Array.isArray(correctIndex) ? correctIndex : [correctIndex]
  )

  const handleSelect = (index: number) => {
    if (hasSubmitted) return
    setSelected((prev) => {
      const next = new Set(prev)
      if (multiSelect) {
        if (next.has(index)) next.delete(index)
        else next.add(index)
      } else {
        if (next.has(index)) next.clear()
        else {
          next.clear()
          next.add(index)
        }
      }
      return next
    })
  }

  const handleSubmit = () => {
    if (selected.size === 0) return
    const correct =
      selected.size === correctSet.size &&
      [...selected].every((i) => correctSet.has(i))
    setIsCorrect(correct)
    setHasSubmitted(true)
  }

  const handleReset = () => {
    setSelected(new Set())
    setHasSubmitted(false)
    setIsCorrect(false)
    setShowHint(false)
  }

  return (
    <div className="border-2 border-primary/30 bg-muted/20 rounded-lg p-6 my-6">
      {title && (
        <h4 className="text-base font-semibold text-primary mb-3">{title}</h4>
      )}

      <div className="mb-4 text-sm">
        {typeof question === "string" ? <p>{question}</p> : question}
      </div>

      {hint && !hasSubmitted && (
        <div className="mb-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {showHint ? "Hide hint" : "Show hint"}
          </button>
          {showHint && (
            <p className="mt-1 text-xs text-muted-foreground italic pl-2 border-l-2 border-primary/20">
              {hint}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2 mb-4">
        {choices.map((choice, index) => {
          const isSelected = selected.has(index)
          const isAnswer = correctSet.has(index)

          let borderClass = "border-border hover:border-primary/50"
          let bgClass = ""
          if (isSelected && !hasSubmitted) {
            borderClass = "border-primary"
            bgClass = "bg-primary/10"
          } else if (hasSubmitted && isAnswer) {
            borderClass = "border-green-500"
            bgClass = "bg-green-500/10"
          } else if (hasSubmitted && isSelected && !isAnswer) {
            borderClass = "border-red-500"
            bgClass = "bg-red-500/10"
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={hasSubmitted}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${borderClass} ${bgClass} ${
                hasSubmitted
                  ? "cursor-not-allowed opacity-75"
                  : "cursor-pointer"
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`w-5 h-5 flex-shrink-0 mt-0.5 flex items-center justify-center border-2 transition-colors ${
                    multiSelect ? "rounded" : "rounded-full"
                  } ${
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {isSelected &&
                    (multiSelect ? (
                      <svg
                        className="w-3 h-3 text-primary-foreground"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
                    ))}
                </div>
                <div className="flex-1 text-sm">{choice}</div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex gap-2 mb-4">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected.size === 0}
            className="px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-5 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm"
          >
            Try Again
          </button>
        )}
      </div>

      {hasSubmitted && (
        <div
          className={`p-4 rounded-lg text-sm ${
            isCorrect
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
          }`}
        >
          <p className="font-semibold mb-1">
            {isCorrect ? "Correct!" : "Not quite."}
          </p>
          <div>{typeof explanation === "string" ? <p>{explanation}</p> : explanation}</div>
        </div>
      )}
    </div>
  )
}
