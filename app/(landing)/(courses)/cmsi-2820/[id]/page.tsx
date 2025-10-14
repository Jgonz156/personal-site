import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Suspense } from "react"
import { LectureNotePageContent } from "@/components/lecture-note-page-content"
import { HomeworkPageContent } from "@/components/homework-page-content"

// Define the type for params (Next.js 13+ App Router)
type PageProps = {
  params: Promise<{ id: string }>
}

// Configuration: total number of lecture notes and homeworks
const TOTAL_NOTES = 28
const TOTAL_HOMEWORKS = 10

// Metadata for each lecture note
const lectureMetadata: Record<
  number,
  { title: string; date: string; topics: string[] }
> = {
  1: {
    title: "Lecture Note 1: Introduction to Discrete Math",
    date: "Spring 2025",
    topics: [
      "Course overview",
      "Introduction to mathematical reasoning",
      "Basic logic concepts",
    ],
  },
  2: {
    title: "Lecture Note 2: Propositional Logic",
    date: "Spring 2025",
    topics: [
      "Propositions and truth values",
      "Logical operators",
      "Truth tables",
    ],
  },
  3: {
    title: "Lecture Note 3: Predicate Logic and Quantifiers",
    date: "Spring 2025",
    topics: ["Predicates", "Universal and existential quantifiers", "Negation"],
  },
  // Add metadata for all 28 notes...
  // You can expand this as you create your content
}

// Metadata for each homework
const homeworkMetadata: Record<
  number,
  { title: string; dueDate: string; dueTime: string; topics: string[] }
> = {
  1: {
    title: "Homework 1: Logic Fundamentals",
    dueDate: "January 20, 2025",
    dueTime: "11:59 PM",
    topics: ["Propositional Logic", "Truth Tables", "Logical Equivalence"],
  },
  2: {
    title: "Homework 2: Number Systems",
    dueDate: "February 3, 2025",
    dueTime: "11:59 PM",
    topics: ["Binary", "Hexadecimal", "Modular Arithmetic"],
  },
  3: {
    title: "Homework 3: Set Theory",
    dueDate: "February 17, 2025",
    dueTime: "11:59 PM",
    topics: ["Set Operations", "Venn Diagrams", "Proofs"],
  },
  // Add metadata for all homeworks as needed
}

// Dynamically import lecture note MDX content
async function loadLectureMDX(noteNumber: number) {
  try {
    const MDXContent = await import(
      `@/content/cmsi-2820/ln${noteNumber}.mdx`
    ).then((mod) => mod.default)
    return MDXContent
  } catch (error) {
    console.error(`MDX file for note ${noteNumber} not found:`, error)
    return null
  }
}

// Dynamically import homework MDX content
async function loadHomeworkMDX(homeworkNumber: number) {
  try {
    const MDXContent = await import(
      `@/content/cmsi-2820/hw${homeworkNumber}.mdx`
    ).then((mod) => mod.default)
    return MDXContent
  } catch (error) {
    console.error(`MDX file for homework ${homeworkNumber} not found:`, error)
    return null
  }
}

export default async function ContentPage({ params }: PageProps) {
  // Await the params object
  const { id } = await params

  // Determine if this is a lecture note or homework
  const isLectureNote = id.startsWith("ln")
  const isHomework = id.startsWith("hw")

  if (!isLectureNote && !isHomework) {
    notFound()
  }

  // Handle Lecture Notes
  if (isLectureNote) {
    const noteNumber = parseInt(id.substring(2), 10)

    // Validate the note number
    if (isNaN(noteNumber) || noteNumber < 1 || noteNumber > TOTAL_NOTES) {
      notFound()
    }

    // Get metadata and MDX content
    const metadata = lectureMetadata[noteNumber] || {
      title: `Lecture Note ${noteNumber}`,
      date: "Spring 2025",
      topics: ["Coming soon"],
    }

    const MDXContent = await loadLectureMDX(noteNumber)

    // Navigation
    const hasPrevious = noteNumber > 1
    const hasNext = noteNumber < TOTAL_NOTES

    return (
      <LectureNotePageContent>
        <div className="container mx-auto p-6 max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/cmsi-2820"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-4"
            >
              ← Back to Course
            </Link>
            <h1 className="text-4xl font-bold mb-2">{metadata.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>📅 {metadata.date}</span>
              <span>•</span>
              <span>
                Note {noteNumber} of {TOTAL_NOTES}
              </span>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="mb-6 p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-2">Topics Covered:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {metadata.topics.map((topic, index) => (
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
                  Content for this lecture note is coming soon.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create a file at{" "}
                  <code className="bg-muted px-2 py-1 rounded">
                    content/cmsi-2820/ln{noteNumber}.mdx
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
                href={`/cmsi-2820/ln${noteNumber - 1}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>LN {noteNumber - 1}</span>
              </Link>
            ) : (
              <div></div>
            )}

            {hasNext ? (
              <Link
                href={`/cmsi-2820/ln${noteNumber + 1}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
              >
                <span>LN {noteNumber + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Quick Navigation */}
          <div className="mt-8 p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-3">All Lecture Notes</h3>
            <div className="grid grid-cols-7 sm:grid-cols-10 gap-2">
              {Array.from({ length: TOTAL_NOTES }, (_, i) => i + 1).map(
                (num) => (
                  <Link
                    key={num}
                    href={`/cmsi-2820/ln${num}`}
                    className={`
                  text-center py-2 rounded border text-sm font-medium transition-colors
                  ${
                    num === noteNumber
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-muted border-border"
                  }
                `}
                  >
                    {num}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </LectureNotePageContent>
    )
  }

  // Handle Homeworks
  if (isHomework) {
    const homeworkNumber = parseInt(id.substring(2), 10)

    // Validate the homework number
    if (
      isNaN(homeworkNumber) ||
      homeworkNumber < 1 ||
      homeworkNumber > TOTAL_HOMEWORKS
    ) {
      notFound()
    }

    // Get metadata and MDX content
    const metadata = homeworkMetadata[homeworkNumber] || {
      title: `Homework ${homeworkNumber}`,
      dueDate: "TBD",
      dueTime: "11:59 PM",
      topics: ["Coming soon"],
    }

    const MDXContent = await loadHomeworkMDX(homeworkNumber)

    // Navigation
    const hasPrevious = homeworkNumber > 1
    const hasNext = homeworkNumber < TOTAL_HOMEWORKS

    return (
      <HomeworkPageContent>
        <div className="container mx-auto p-6 max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/cmsi-2820"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 mb-4"
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
                  Content for this homework is coming soon.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Create a file at{" "}
                  <code className="bg-muted px-2 py-1 rounded">
                    content/cmsi-2820/hw{homeworkNumber}.mdx
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
                href={`/cmsi-2820/hw${homeworkNumber - 1}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>HW {homeworkNumber - 1}</span>
              </Link>
            ) : (
              <div></div>
            )}

            {hasNext ? (
              <Link
                href={`/cmsi-2820/hw${homeworkNumber + 1}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors"
              >
                <span>HW {homeworkNumber + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Quick Navigation */}
          <div className="mt-8 p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-3">All Homeworks</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {Array.from({ length: TOTAL_HOMEWORKS }, (_, i) => i + 1).map(
                (num) => (
                  <Link
                    key={num}
                    href={`/cmsi-2820/hw${num}`}
                    className={`
                    text-center py-2 rounded border text-sm font-medium transition-colors
                    ${
                      num === homeworkNumber
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-muted border-border"
                    }
                  `}
                  >
                    {num}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </HomeworkPageContent>
    )
  }

  // Fallback (should not reach here due to earlier notFound() check)
  notFound()
}

// Generate static params for all lecture notes and homeworks
export async function generateStaticParams() {
  const lectureParams = Array.from({ length: TOTAL_NOTES }, (_, i) => ({
    id: `ln${i + 1}`,
  }))

  const homeworkParams = Array.from({ length: TOTAL_HOMEWORKS }, (_, i) => ({
    id: `hw${i + 1}`,
  }))

  return [...lectureParams, ...homeworkParams]
}
