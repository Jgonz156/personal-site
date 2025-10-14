"use client"

import { useState, useEffect } from "react"
import { courseEvents, CourseEvent } from "@/lib/course-data"
import { ChevronDown, ChevronRight, FileText, Video } from "lucide-react"
import Link from "next/link"
import { useNavbar } from "@/components/navbar-context"

// Define the 7 standards with metadata
const STANDARDS = [
  {
    id: 1,
    name: "Logic",
    description:
      "Propositional logic, truth tables, logical equivalence, and predicates",
  },
  {
    id: 2,
    name: "Numbers",
    description: "Number systems, modular arithmetic, divisibility, and primes",
  },
  {
    id: 3,
    name: "Collections",
    description: "Sequences, summations, and mathematical induction",
  },
  {
    id: 4,
    name: "Functions",
    description: "Function types, composition, inverses, and cardinality",
  },
  {
    id: 5,
    name: "Combinatorics",
    description: "Counting principles, permutations, and combinations",
  },
  {
    id: 6,
    name: "Graph Theory",
    description: "Graph representations, traversal algorithms, and properties",
  },
  {
    id: 7,
    name: "Set Theory",
    description: "Set operations, Venn diagrams, and set identities",
  },
]

export default function CMSI2820Home() {
  const { setPageSections } = useNavbar()
  const [expandedStandards, setExpandedStandards] = useState<Set<string>>(
    new Set()
  )

  useEffect(() => {
    // Clear sections when navigating to the main course page
    setPageSections([])

    return () => {
      setPageSections([])
    }
  }, [setPageSections])

  // Filter events for this course
  const courseSpecificEvents = courseEvents.filter(
    (event) => event.courseId === "cmsi-2820"
  )

  // Group events by standard
  const eventsByStandard: Record<string, CourseEvent[]> = {}
  STANDARDS.forEach((standard) => {
    eventsByStandard[standard.name] = courseSpecificEvents.filter(
      (event) => event.standard === standard.name
    )
  })

  // Toggle standard expansion
  const toggleStandard = (standard: string) => {
    const newExpanded = new Set(expandedStandards)
    if (newExpanded.has(standard)) {
      newExpanded.delete(standard)
    } else {
      newExpanded.add(standard)
    }
    setExpandedStandards(newExpanded)
  }

  // Determine current standard based on today's date
  const getCurrentStandard = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Find the most recent event (lecture, homework, or exam) that has already occurred
    const pastEvents = courseSpecificEvents
      .filter((event) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate <= today && event.standard
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime())

    if (pastEvents.length > 0) {
      return pastEvents[0].standard
    }

    // If no past events, find the next upcoming event
    const futureEvents = courseSpecificEvents
      .filter((event) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate > today && event.standard
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())

    return futureEvents.length > 0 ? futureEvents[0].standard : null
  }

  const currentStandard = getCurrentStandard()

  // Render event card
  const renderEventCard = (event: CourseEvent) => {
    const bgColor =
      event.type === "homework"
        ? "bg-green-500/10 border-green-500/30 hover:border-green-500"
        : event.type === "lecture"
        ? "bg-blue-500/10 border-blue-500/30 hover:border-blue-500"
        : event.type === "exam"
        ? "bg-red-500/10 border-red-500/30 hover:border-red-500"
        : event.type === "project"
        ? "bg-purple-500/10 border-purple-500/30 hover:border-purple-500"
        : "bg-muted/30 border-border"

    const textColor =
      event.type === "homework"
        ? "text-green-700 dark:text-green-400"
        : event.type === "lecture"
        ? "text-blue-700 dark:text-blue-400"
        : event.type === "exam"
        ? "text-red-700 dark:text-red-400"
        : event.type === "project"
        ? "text-purple-700 dark:text-purple-400"
        : "text-foreground"

    const typeIcon =
      event.type === "homework"
        ? "📝"
        : event.type === "lecture"
        ? "📚"
        : event.type === "exam"
        ? "📋"
        : event.type === "project"
        ? "💻"
        : "📌"

    // Get button text based on event type
    const getContentButtonText = () => {
      switch (event.type) {
        case "lecture":
          return "View Lecture"
        case "homework":
          return "View Assignment"
        case "exam":
          return "View Exam Details"
        case "project":
          return "View Project"
        default:
          return "View Details"
      }
    }

    return (
      <div
        key={event.id}
        className={`border-2 rounded-lg p-4 transition-all ${bgColor}`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{typeIcon}</span>
            <div>
              <h4 className={`font-semibold ${textColor}`}>{event.title}</h4>
              <p className="text-xs text-muted-foreground capitalize">
                {event.type}
              </p>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {event.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>
            {event.date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {event.dueTime && <span>{event.dueTime}</span>}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Main Content Button */}
          {event.contentUrl && (
            <Link
              href={event.contentUrl}
              className="block w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
                <FileText className="w-4 h-4" />
                {getContentButtonText()}
              </button>
            </Link>
          )}

          {/* Recording Buttons */}
          {event.recordingUrls && event.recordingUrls.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.recordingUrls.map((url, index) => (
                <Link
                  key={index}
                  href={url}
                  className="flex-1 min-w-[80px]"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md border border-border hover:bg-muted transition-colors text-xs font-medium">
                    <Video className="w-3.5 h-3.5" />
                    Recording {index + 1}
                  </button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          CMSI 2820: Discrete Mathematics for CS
        </h1>
        <p className="text-lg text-muted-foreground">
          Course materials organized by standard. Click on a standard to view
          lectures, homework, and exams.
        </p>
      </div>

      {/* Standards Table - Desktop */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-center p-4 font-semibold w-16">ID</th>
              <th className="text-left p-4 font-semibold w-48">Standard</th>
              <th className="text-left p-4 font-semibold">Description</th>
              <th className="text-center p-4 font-semibold w-32">Status</th>
            </tr>
          </thead>
          <tbody>
            {STANDARDS.map((standard, index) => {
              const events = eventsByStandard[standard.name] || []
              const isExpanded = expandedStandards.has(standard.name)
              const isCurrent = currentStandard === standard.name

              return (
                <>
                  <tr
                    key={standard.name}
                    onClick={() => toggleStandard(standard.name)}
                    className={`cursor-pointer transition-colors hover:bg-muted/30 ${
                      isCurrent ? "bg-primary/5" : ""
                    } ${
                      index !== STANDARDS.length - 1 || isExpanded
                        ? "border-b"
                        : ""
                    }`}
                  >
                    <td className="text-center p-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                        {standard.id}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className="font-semibold text-lg">
                          {standard.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-muted-foreground">
                        {standard.description}
                      </p>
                    </td>
                    <td className="text-center p-4">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 text-sm font-semibold">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                          Current
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </td>
                  </tr>
                  {isExpanded && events.length > 0 && (
                    <tr key={`${standard.name}-expanded`}>
                      <td colSpan={4} className="p-4 bg-muted/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {events.map((event) => renderEventCard(event))}
                        </div>
                      </td>
                    </tr>
                  )}
                  {isExpanded && events.length === 0 && (
                    <tr key={`${standard.name}-empty`}>
                      <td
                        colSpan={4}
                        className="p-4 bg-muted/10 text-center text-muted-foreground"
                      >
                        No materials available for this standard yet.
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Standards Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {STANDARDS.map((standard) => {
          const events = eventsByStandard[standard.name] || []
          const isExpanded = expandedStandards.has(standard.name)
          const isCurrent = currentStandard === standard.name

          return (
            <div
              key={standard.name}
              className={`border rounded-lg overflow-hidden transition-colors ${
                isCurrent ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <div
                onClick={() => toggleStandard(standard.name)}
                className="p-4 cursor-pointer active:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
                      {standard.id}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg truncate">
                          {standard.name}
                        </h3>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-semibold flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Now
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground pl-13">
                  {standard.description}
                </p>
              </div>

              {isExpanded && events.length > 0 && (
                <div className="border-t bg-muted/10 p-3">
                  <div className="space-y-3">
                    {events.map((event) => renderEventCard(event))}
                  </div>
                </div>
              )}
              {isExpanded && events.length === 0 && (
                <div className="border-t bg-muted/10 p-4 text-center text-sm text-muted-foreground">
                  No materials available for this standard yet.
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() =>
            setExpandedStandards(new Set(STANDARDS.map((s) => s.name)))
          }
          className="border rounded-lg p-4 hover:border-primary transition-colors text-left"
        >
          <h3 className="font-semibold mb-1">📂 Expand All</h3>
          <p className="text-sm text-muted-foreground">
            View all course materials at once
          </p>
        </button>
        <button
          onClick={() => setExpandedStandards(new Set())}
          className="border rounded-lg p-4 hover:border-primary transition-colors text-left"
        >
          <h3 className="font-semibold mb-1">📁 Collapse All</h3>
          <p className="text-sm text-muted-foreground">
            Hide all expanded standards
          </p>
        </button>
        <div className="border rounded-lg p-4 bg-muted/30">
          <h3 className="font-semibold mb-1">📊 Course Progress</h3>
          <p className="text-sm text-muted-foreground">
            {courseSpecificEvents.filter((e) => e.standard).length} items across{" "}
            {STANDARDS.length} standards
          </p>
          {currentStandard && (
            <p className="text-xs text-muted-foreground mt-1">
              Currently in:{" "}
              <span className="font-semibold">{currentStandard}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
