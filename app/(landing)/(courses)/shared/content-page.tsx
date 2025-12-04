import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Suspense } from "react"
import { MDXPageContent } from "@/components/mdx-page-content"
import {
  ContentThemeProvider,
  type ContentType,
} from "@/components/content-theme-provider"
import { HomeworkIntro } from "@/components/homework-sections"
import { ExamIntro } from "@/components/exam-sections"
import { LectureIntro } from "@/components/lecture-sections"
import {
  getContentTypeFromId,
  getItemNumberFromId,
  getEventByContentUrl,
  deriveContentTypeCounts,
  getHomeworkFields,
  getExamFields,
  getLectureFields,
  getActivityFields,
  formatDate,
  type ContentTypeConfig,
} from "@/lib/content-types"
import type { CourseEvent } from "@/lib/course-data"

// ============================================================
// SHARED CONTENT PAGE COMPONENT (Server Component)
// Used by all course [id] pages to render MDX content with metadata
// ============================================================

interface ContentPageProps {
  courseId: string // e.g., "cmsi-2820"
  id: string // URL id, e.g., "hw3", "ln1"
  children?: React.ReactNode // MDX content passed as children
}

// Helper function to map content prefix to theme type
function getThemeType(prefix: string): ContentType {
  switch (prefix) {
    case "hw":
      return "homework"
    case "ex":
      return "exam"
    case "ln":
      return "lecture"
    case "ac":
      return "activity"
    default:
      return "default"
  }
}

// Render the appropriate intro component based on content type
function ContentIntro({
  event,
  contentType,
}: {
  event: CourseEvent | null
  contentType: ContentTypeConfig
}) {
  if (!event) return null

  const prefix = contentType.prefix

  if (prefix === "hw") {
    const fields = getHomeworkFields(event)
    return (
      <HomeworkIntro
        title={event.title}
        dueDate={formatDate(event.date)}
        dueTime={event.dueTime || "11:59 PM"}
        topics={fields.topics}
        description={event.description || ""}
      />
    )
  }

  if (prefix === "ex") {
    const fields = getExamFields(event)
    return (
      <ExamIntro
        title={event.title}
        examDate={formatDate(event.date)}
        examTime={event.dueTime}
        standard={event.standard || ""}
        topics={fields.topics}
        totalPoints={fields.totalPoints || 0}
        totalQuestions={fields.totalQuestions || 0}
        description={event.description}
        hasTimer={fields.hasTimer}
        allowedAttempts={fields.allowedAttempts}
        examUrl={fields.examUrl}
      />
    )
  }

  if (prefix === "ln") {
    const fields = getLectureFields(event)
    return (
      <LectureIntro
        title={event.title}
        lectureDate={formatDate(event.date)}
        standard={event.standard || ""}
        topics={fields.topics.length > 0 ? fields.topics : ["Coming soon"]}
        description={event.description}
        recordingUrls={event.recordings}
      />
    )
  }

  if (prefix === "ac") {
    const fields = getActivityFields(event)
    // Activities don't have a dedicated intro component yet, render basic info
    return (
      <div className="space-y-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
          <p className="text-lg text-muted-foreground">
            Standard: {event.standard}
          </p>
        </div>
        <div className="border-2 border-orange-500/30 bg-orange-500/5 rounded-lg p-6 space-y-4">
          {event.description && (
            <p className="text-base text-foreground">{event.description}</p>
          )}
          {fields.estimatedTime && (
            <p className="text-sm text-muted-foreground">
              Estimated Time: {fields.estimatedTime}
            </p>
          )}
          {fields.learningObjectives.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Learning Objectives
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {fields.learningObjectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

export function ContentPage({ courseId, id, children }: ContentPageProps) {
  // Determine the content type from the ID prefix
  const contentType = getContentTypeFromId(id)

  if (!contentType) {
    notFound()
  }

  // Extract the item number from the ID
  const itemNumber = getItemNumberFromId(id)

  if (itemNumber === null) {
    notFound()
  }

  // Get content counts from data.ts
  const counts = deriveContentTypeCounts(courseId)
  const total = counts[contentType.prefix] || 0

  // Validate the item number
  if (itemNumber < contentType.minNumber || itemNumber > total) {
    notFound()
  }

  // Get event data from data.ts
  const event = getEventByContentUrl(courseId, id)

  // Navigation
  const hasPrevious = itemNumber > contentType.minNumber
  const hasNext = itemNumber < total

  // Course URL base
  const courseUrl = `/${courseId}`

  return (
    <ContentThemeProvider contentType={getThemeType(contentType.prefix)}>
      <MDXPageContent topLevelSectionClass={contentType.topLevelSectionClass}>
        <div className="container mx-auto p-6 max-w-4xl">
          {/* Back to Course Link */}
          <div className="mb-6">
            <Link
              href={courseUrl}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              ← Back to Course
            </Link>
          </div>

          {/* Intro Component (renders metadata from data.ts) */}
          <ContentIntro event={event} contentType={contentType} />

          {/* Main Content - MDX passed as children */}
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            {children ? (
              <Suspense fallback={<div>Loading content...</div>}>
                {children}
              </Suspense>
            ) : (
              <div className="text-center p-8 border rounded-lg bg-muted/30">
                <p className="text-muted-foreground">
                  Content for this {contentType.label.toLowerCase()} is coming
                  soon.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create a file at{" "}
                  <code className="bg-muted px-2 py-1 rounded">
                    content/{courseId}/{contentType.folder}/{contentType.prefix}
                    {itemNumber}.mdx
                  </code>{" "}
                  to add content.
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t">
            {hasPrevious ? (
              <Link
                href={`${courseUrl}/${contentType.prefix}${itemNumber - 1}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>
                  {contentType.shortLabel} {itemNumber - 1}
                </span>
              </Link>
            ) : (
              <div></div>
            )}

            {hasNext ? (
              <Link
                href={`${courseUrl}/${contentType.prefix}${itemNumber + 1}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
              >
                <span>
                  {contentType.shortLabel} {itemNumber + 1}
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Quick Navigation */}
          <div className="mt-8 p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-3">All {contentType.label}s</h3>
            <div className={`grid ${contentType.gridColumns} gap-2`}>
              {Array.from(
                { length: total - contentType.minNumber + 1 },
                (_, i) => i + contentType.minNumber
              ).map((num) => (
                <Link
                  key={num}
                  href={`${courseUrl}/${contentType.prefix}${num}`}
                  className={`
                    text-center py-2 rounded border text-sm font-medium transition-colors
                    ${
                      num === itemNumber
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-muted border-border"
                    }
                  `}
                >
                  {num}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MDXPageContent>
    </ContentThemeProvider>
  )
}

