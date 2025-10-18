import { ReactNode } from "react"
import Link from "next/link"

interface ExamIntroProps {
  title: string
  examDate: string
  examTime?: string
  standard: string
  topics: string[]
  totalPoints: number
  totalQuestions: number
  description?: string
  hasTimer?: boolean
  allowedAttempts?: string
  examUrl?: string // Optional: only show button if provided
}

export function ExamIntro({
  title,
  examDate,
  examTime = "11:59 PM",
  standard,
  topics,
  totalPoints,
  totalQuestions,
  description,
  hasTimer = false,
  allowedAttempts = "Unlimited",
  examUrl,
}: ExamIntroProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground">
          Standard {standard} Assessment
        </p>
      </div>

      {/* Exam Details Card */}
      <div className="border-2 border-red-500/30 bg-red-500/5 rounded-lg p-6 space-y-4">
        {/* Description */}
        {description && (
          <p className="text-base text-foreground">{description}</p>
        )}

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Due Date
            </h3>
            <p className="text-base">
              📅 {examDate} at {examTime}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Standard
            </h3>
            <p className="text-base">{standard}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Points
            </h3>
            <p className="text-base">🎯 {totalPoints} points</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Questions
            </h3>
            <p className="text-base">📋 {totalQuestions} questions</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Attempts
            </h3>
            <p className="text-base">🔄 {allowedAttempts}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Timer
            </h3>
            <p className="text-base">{hasTimer ? "⏱️ Yes" : "⏱️ No timer"}</p>
          </div>
        </div>

        {/* Topics */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Topics Covered
          </h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Exam Link Button - Only show if examUrl is provided */}
        {examUrl && (
          <div className="pt-4">
            <Link href={examUrl} target="_blank" rel="noopener noreferrer">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-base transition-colors">
                📝 Take the Exam
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

interface ExamRulesProps {
  children: ReactNode
}

export function ExamRules({ children }: ExamRulesProps) {
  return (
    <div className="border-2 border-yellow-500/30 bg-yellow-500/5 rounded-lg p-6 my-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        ⚠️ Exam Rules & Guidelines
      </h2>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  )
}
