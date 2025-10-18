import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Suspense } from "react"
import { MDXPageContent } from "@/components/mdx-page-content"
import {
  ContentThemeProvider,
  type ContentType,
} from "@/components/content-theme-provider"

// Define the type for params (Next.js 13+ App Router)
type PageProps = {
  params: Promise<{ id: string }>
}

// Content type configuration - easily extensible for exams, projects, activities, etc.
type ContentTypeConfig = {
  prefix: string // URL prefix (e.g., "ln", "hw", "ex")
  folder: string // Folder name in content directory
  minNumber: number // Minimum item number (usually 0 or 1)
  total: number // Total number of items
  label: string // Display label (e.g., "Lecture Note", "Homework")
  shortLabel: string // Short label for navigation (e.g., "LN", "HW")
  gridColumns: string // Grid layout for quick navigation
  topLevelSectionClass?: string // Optional CSS class for top-level sections
}

/**
 * CONTENT_TYPES - Configuration for all MDX content types
 *
 * TODO: Update the total counts as you add more content
 */
const CONTENT_TYPES: Record<string, ContentTypeConfig> = {
  lecture: {
    prefix: "ln",
    folder: "notes",
    minNumber: 1,
    total: 0, // TODO: Update when you add lectures
    label: "Lecture Note",
    shortLabel: "LN",
    gridColumns: "grid-cols-7 sm:grid-cols-10",
  },
  homework: {
    prefix: "hw",
    folder: "homeworks",
    minNumber: 0,
    total: 0, // TODO: Update when you add homeworks
    label: "Homework",
    shortLabel: "HW",
    gridColumns: "grid-cols-7 sm:grid-cols-10",
    topLevelSectionClass: "homework-section-header",
  },
  exam: {
    prefix: "ex",
    folder: "exams",
    minNumber: 0,
    total: 0, // TODO: Update when you add exams
    label: "Exam",
    shortLabel: "EX",
    gridColumns: "grid-cols-5 sm:grid-cols-10",
  },
}

// Generic function to dynamically import MDX content for any content type
async function loadMDXContent(config: ContentTypeConfig, itemNumber: number) {
  try {
    const MDXContent = await import(
      `@/content/cmsi-5850/${config.folder}/${config.prefix}${itemNumber}.mdx`
    ).then((mod) => mod.default)
    return MDXContent
  } catch (error) {
    console.error(
      `MDX file for ${config.label} ${itemNumber} not found:`,
      error
    )
    return null
  }
}

// Helper function to detect content type from ID
function getContentTypeFromId(id: string): ContentTypeConfig | null {
  for (const config of Object.values(CONTENT_TYPES)) {
    if (id.startsWith(config.prefix)) {
      return config
    }
  }
  return null
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
    default:
      return "default"
  }
}

export default async function ContentPage({ params }: PageProps) {
  // Await the params object
  const { id } = await params

  // Determine the content type from the ID prefix
  const contentType = getContentTypeFromId(id)

  if (!contentType) {
    notFound()
  }

  // Extract the item number from the ID
  const itemNumber = parseInt(id.substring(contentType.prefix.length), 10)

  // Validate the item number (respects minNumber from content type config)
  if (
    isNaN(itemNumber) ||
    itemNumber < contentType.minNumber ||
    itemNumber > contentType.total
  ) {
    notFound()
  }

  // Determine if this is a lecture note, homework, or exam (for metadata lookup)
  const isLectureNote = contentType.prefix === "ln"
  const isHomework = contentType.prefix === "hw"
  const isExam = contentType.prefix === "ex"

  // Handle Lecture Notes
  if (isLectureNote) {
    const metadata = {
      title: `${contentType.label} ${itemNumber}`,
      date: "Spring 2025",
      topics: ["Coming soon"],
    }

    const MDXContent = await loadMDXContent(contentType, itemNumber)

    // Navigation
    const hasPrevious = itemNumber > contentType.minNumber
    const hasNext = itemNumber < contentType.total

    return (
      <ContentThemeProvider contentType={getThemeType(contentType.prefix)}>
        <MDXPageContent>
          <div className="container mx-auto p-6 max-w-4xl">
            {/* Header */}
            <div className="mb-6">
              <Link
                href="/cmsi-5850"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-4"
              >
                ← Back to Course
              </Link>
              <h1 className="text-4xl font-bold mb-2">{metadata.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>📅 {metadata.date}</span>
                <span>•</span>
                <span>
                  {contentType.label} {itemNumber} of {contentType.total}
                </span>
              </div>
            </div>

            {/* Topics Covered */}
            <div className="mb-6 p-4 border rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-2">Topics Covered:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {metadata.topics.map((topic: string, index: number) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>

            {/* Main Content - MDX */}
            <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
              {MDXContent ? (
                <Suspense fallback={<div>Loading content...</div>}>
                  <MDXContent />
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
                      content/cmsi-5850/{contentType.folder}/
                      {contentType.prefix}
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
                  href={`/cmsi-5850/${contentType.prefix}${itemNumber - 1}`}
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
                  href={`/cmsi-5850/${contentType.prefix}${itemNumber + 1}`}
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
                  { length: contentType.total - contentType.minNumber + 1 },
                  (_, i) => i + contentType.minNumber
                ).map((num) => (
                  <Link
                    key={num}
                    href={`/cmsi-5850/${contentType.prefix}${num}`}
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

  // Handle Homeworks
  if (isHomework) {
    const MDXContent = await loadMDXContent(contentType, itemNumber)

    // Navigation
    const hasPrevious = itemNumber > contentType.minNumber
    const hasNext = itemNumber < contentType.total

    return (
      <ContentThemeProvider contentType={getThemeType(contentType.prefix)}>
        <MDXPageContent topLevelSectionClass={contentType.topLevelSectionClass}>
          <div className="container mx-auto p-6 max-w-4xl">
            {/* Back to Course Link */}
            <div className="mb-6">
              <Link
                href="/cmsi-5850"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                ← Back to Course
              </Link>
            </div>

            {/* Main Content - MDX */}
            <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
              {MDXContent ? (
                <Suspense fallback={<div>Loading content...</div>}>
                  <MDXContent />
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
                      content/cmsi-5850/{contentType.folder}/
                      {contentType.prefix}
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
                  href={`/cmsi-5850/${contentType.prefix}${itemNumber - 1}`}
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
                  href={`/cmsi-5850/${contentType.prefix}${itemNumber + 1}`}
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
                  { length: contentType.total - contentType.minNumber + 1 },
                  (_, i) => i + contentType.minNumber
                ).map((num) => (
                  <Link
                    key={num}
                    href={`/cmsi-5850/${contentType.prefix}${num}`}
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

  // Handle Exams
  if (isExam) {
    const MDXContent = await loadMDXContent(contentType, itemNumber)

    // Navigation
    const hasPrevious = itemNumber > contentType.minNumber
    const hasNext = itemNumber < contentType.total

    return (
      <ContentThemeProvider contentType={getThemeType(contentType.prefix)}>
        <MDXPageContent topLevelSectionClass={contentType.topLevelSectionClass}>
          <div className="container mx-auto p-6 max-w-4xl">
            {/* Back to Course Link */}
            <div className="mb-6">
              <Link
                href="/cmsi-5850"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                ← Back to Course
              </Link>
            </div>

            {/* Main Content - MDX */}
            <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
              {MDXContent ? (
                <Suspense fallback={<div>Loading content...</div>}>
                  <MDXContent />
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
                      content/cmsi-5850/{contentType.folder}/
                      {contentType.prefix}
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
                  href={`/cmsi-5850/${contentType.prefix}${itemNumber - 1}`}
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
                  href={`/cmsi-5850/${contentType.prefix}${itemNumber + 1}`}
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
                  { length: contentType.total - contentType.minNumber + 1 },
                  (_, i) => i + contentType.minNumber
                ).map((num) => (
                  <Link
                    key={num}
                    href={`/cmsi-5850/${contentType.prefix}${num}`}
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

  // Fallback (should not reach here due to earlier notFound() check)
  notFound()
}

// Generate static params for all content types
export async function generateStaticParams() {
  const allParams: { id: string }[] = []

  // Dynamically generate params for each content type
  for (const config of Object.values(CONTENT_TYPES)) {
    const params = Array.from(
      { length: config.total - config.minNumber + 1 },
      (_, i) => ({
        id: `${config.prefix}${i + config.minNumber}`,
      })
    )
    allParams.push(...params)
  }

  return allParams
}

