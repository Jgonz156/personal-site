import { ReactNode } from "react"

interface QuestionBoxProps {
  qid?: string
  title?: string
  points?: number | string
  children: ReactNode
  variant?: "main" | "sub"
}

export function QuestionBox({
  qid,
  title,
  points,
  children,
  variant = "main",
}: QuestionBoxProps) {
  const isMain = variant === "main"
  const hasHeader = qid || title || points

  return (
    <div
      id={qid ? qid.toLowerCase() : undefined}
      data-question-type={isMain ? "main" : "sub"}
      className={`
        question-box scroll-mt-24
        ${
          isMain
            ? "border-2 border-primary/30 bg-muted/20 rounded-lg p-6 mb-6"
            : "inline-block border-l-4 border-primary/50 bg-muted/10 rounded-r-md pl-4 pr-4 py-3 mb-3 align-top"
        }
      `}
    >
      {/* Question Header - Only show if we have qid, title, or points */}
      {hasHeader && (
        <div
          className={`
            flex items-baseline justify-between gap-4 mb-3
            ${isMain ? "flex-wrap" : "flex-nowrap"}
          `}
        >
          <div className="flex items-baseline gap-2 flex-1">
            {qid && (
              <span
                className={`
                  font-mono font-bold
                  ${
                    isMain
                      ? "text-lg text-primary"
                      : "text-base text-primary/90"
                  }
                `}
              >
                {qid}
              </span>
            )}
            {title && (
              <>
                {qid && <span className="text-muted-foreground">—</span>}
                <span
                  className={`
                    font-semibold
                    ${isMain ? "text-lg" : "text-base"}
                  `}
                >
                  {title}
                </span>
              </>
            )}
          </div>

          {points !== undefined && (
            <div
              className={`
                flex-shrink-0 font-semibold
                ${
                  isMain
                    ? "px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm"
                    : "px-2 py-0.5 bg-primary/20 text-primary rounded text-xs"
                }
              `}
            >
              {typeof points === "number" ? (
                <>
                  {points} {points === 1 ? "pt" : "pts"}
                </>
              ) : (
                points
              )}
            </div>
          )}
        </div>
      )}

      {/* Question Content */}
      <div
        className={`
          prose prose-neutral dark:prose-invert
          ${
            isMain
              ? "prose-base max-w-none flex flex-wrap justify-around items-start gap-x-3 gap-y-2 [&>p]:w-full [&>img]:w-full [&>ul]:w-full [&>ol]:w-full [&>.MathJax]:w-full [&>mjx-container]:w-full"
              : "prose-sm max-w-fit"
          }
        `}
      >
        {children}
      </div>
    </div>
  )
}

// Convenience wrapper for compact sub-questions
interface SubQuestionProps {
  qid: string
  points: number | string
  children: ReactNode
}

export function SubQuestion({ qid, points, children }: SubQuestionProps) {
  return (
    <QuestionBox qid={qid} points={points} variant="sub">
      {children}
    </QuestionBox>
  )
}
