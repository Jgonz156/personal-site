"use client"

import { useState, ReactNode } from "react"

interface MultiSelectQuestionProps {
  question: string
  choices: (string | ReactNode)[]
  answers: number[] // 1 for correct, 0 for incorrect
  correctMessage: string
  incorrectMessage: string
}

export function MultiSelectQuestion({
  question,
  choices,
  answers,
  correctMessage,
  incorrectMessage,
}: MultiSelectQuestionProps) {
  const [selected, setSelected] = useState<boolean[]>(
    new Array(choices.length).fill(false)
  )
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const toggleChoice = (index: number) => {
    if (hasSubmitted) return // Don't allow changes after submission
    const newSelected = [...selected]
    newSelected[index] = !newSelected[index]
    setSelected(newSelected)
  }

  const handleSubmit = () => {
    // Check if the selected answers match the correct answers
    const correct = selected.every(
      (isSelected, index) => (isSelected ? 1 : 0) === answers[index]
    )
    setIsCorrect(correct)
    setHasSubmitted(true)
  }

  const handleReset = () => {
    setSelected(new Array(choices.length).fill(false))
    setHasSubmitted(false)
    setIsCorrect(false)
  }

  return (
    <div className="border-2 border-primary/30 bg-muted/20 rounded-lg p-6 my-6">
      {/* Question */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Example Question:</h3>
        <p className="text-base">{question}</p>
      </div>

      {/* Choices */}
      <div className="space-y-2 mb-4">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => toggleChoice(index)}
            disabled={hasSubmitted}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
              selected[index]
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            } ${
              hasSubmitted ? "cursor-not-allowed opacity-75" : "cursor-pointer"
            }`}
          >
            <div className="flex items-start gap-2">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  selected[index]
                    ? "border-primary bg-primary"
                    : "border-muted-foreground"
                }`}
              >
                {selected[index] && (
                  <svg
                    className="w-3 h-3 text-primary-foreground"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <div className="flex-1">
                {typeof choice === "string" ? choice : choice}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Submit/Reset Button */}
      <div className="flex gap-2 mb-4">
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium"
          >
            Try Again
          </button>
        )}
      </div>

      {/* Feedback */}
      {hasSubmitted && (
        <div
          className={`p-4 rounded-lg ${
            isCorrect
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
          }`}
        >
          <p className="font-semibold mb-1">
            {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
          </p>
          <p className="text-sm">
            {isCorrect ? correctMessage : incorrectMessage}
          </p>
        </div>
      )}
    </div>
  )
}
