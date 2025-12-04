import { DateTime } from "luxon"
import { cmsi2820Events } from "./courses/cmsi-2820/data"
import { cmsi3510Events } from "./courses/cmsi-3510/data"
import { cmsi5850Events } from "./courses/cmsi-5850/data"

// Types for course events
export type EventType =
  | "homework"
  | "exam"
  | "lecture"
  | "activity"
  //  | "lab"
  //  | "project"
  //  | "reading"
  | "office-hours"
  | "holiday"
//  | "other"

export interface Recording {
  name: string
  url: string
}

export interface CourseEvent {
  id: string
  title: string
  type: EventType
  date: DateTime // Using Luxon DateTime for human-readable dates (due date for homework/exams)
  availableDate?: DateTime // Optional: When content becomes available to students (defaults to date if not set)
  description?: string
  dueTime?: string // e.g., "11:59 PM"
  courseId?: string
  completed?: boolean
  standard?: string // e.g., "Logic", "Numbers", "Collections", etc.
  contentUrl?: string // Link to lecture notes, homework spec, exam details page
  recordings?: Recording[] // Array of named recording links
  pinned?: boolean // If true, event date is not affected by schedule shifts

  // ============================================================
  // PREFIXED CONTENT METADATA
  // Type the prefix (hw, ex, ln, ac) for IDE IntelliSense autocomplete
  // ============================================================

  // hw* - Homework-specific fields
  hwTopics?: string[]
  hwPoints?: {
    written?: number
    programming?: number
    reading?: number
    optional?: number
  }
  hwGithubClassroomUrl?: string
  hwBrightspaceUrl?: string

  // ex* - Exam-specific fields
  exTopics?: string[]
  exTotalPoints?: number
  exTotalQuestions?: number
  exHasTimer?: boolean
  exAllowedAttempts?: string
  exExamUrl?: string
  exBrightspaceUrl?: string

  // ln* - Lecture-specific fields
  lnTopics?: string[]

  // ac* - Activity-specific fields
  acTopics?: string[]
  acLearningObjectives?: string[]
  acEstimatedTime?: string
  acMaterials?: string[]
}

// Aggregate all course events from individual course files
export const courseEvents: CourseEvent[] = [
  ...cmsi2820Events,
  ...cmsi3510Events,
  ...cmsi5850Events,
]

// Helper functions
export function getEventsForDate(date: DateTime): CourseEvent[] {
  return courseEvents.filter(
    (event) =>
      event.date.day === date.day &&
      event.date.month === date.month &&
      event.date.year === date.year
  )
}

export function getTodaysEvents(): CourseEvent[] {
  return getEventsForDate(DateTime.now())
}

export function getUpcomingEvents(daysAhead: number = 14): CourseEvent[] {
  const today = DateTime.now().startOf("day")
  const futureDate = today.plus({ days: daysAhead })

  return courseEvents
    .filter((event) => event.date >= today && event.date <= futureDate)
    .sort((a, b) => a.date.toMillis() - b.date.toMillis())
}

export function getUpcomingHomeworkAndExams(
  daysAhead: number = 30
): CourseEvent[] {
  const today = DateTime.now().startOf("day")
  const futureDate = today.plus({ days: daysAhead })

  return courseEvents
    .filter(
      (event) =>
        (event.type === "homework" ||
          event.type === "exam" ||
          event.type === "activity") &&
        event.date >= today &&
        event.date <= futureDate
    )
    .sort((a, b) => a.date.toMillis() - b.date.toMillis())
}

export function getDatesWithEvents(): DateTime[] {
  return courseEvents.map((event) => event.date)
}

export function getEventTypeForDate(date: DateTime): EventType | null {
  const events = getEventsForDate(date)
  if (events.length === 0) return null

  // Priority order: exam > activity > homework > project > lecture > office-hours > holiday > others
  const priorityOrder: EventType[] = [
    "exam",
    "activity",
    "homework",
    //"project",
    "lecture",
    "office-hours",
    "holiday",
    //"lab",
    //"reading",
    //"other",
  ]

  for (const type of priorityOrder) {
    const event = events.find((e) => e.type === type)
    if (event) return event.type
  }

  return events[0].type
}

// New: Course-specific helper functions
export function getCourseEvents(courseId: string): CourseEvent[] {
  return courseEvents.filter((event) => event.courseId === courseId)
}

export function getCourseTodaysEvents(courseId: string): CourseEvent[] {
  const today = DateTime.now()
  return getCourseEvents(courseId).filter(
    (event) =>
      event.date.day === today.day &&
      event.date.month === today.month &&
      event.date.year === today.year
  )
}

export function getCourseUpcomingEvents(
  courseId: string,
  daysAhead: number = 14
): CourseEvent[] {
  const today = DateTime.now().startOf("day")
  const futureDate = today.plus({ days: daysAhead })

  return getCourseEvents(courseId)
    .filter((event) => event.date >= today && event.date <= futureDate)
    .sort((a, b) => a.date.toMillis() - b.date.toMillis())
}

export function getCourseUpcomingHomeworkAndExams(
  courseId: string,
  daysAhead: number = 30
): CourseEvent[] {
  const today = DateTime.now().startOf("day")
  const futureDate = today.plus({ days: daysAhead })

  return getCourseEvents(courseId)
    .filter(
      (event) =>
        (event.type === "homework" ||
          event.type === "exam" ||
          event.type === "activity") &&
        event.date >= today &&
        event.date <= futureDate
    )
    .sort((a, b) => a.date.toMillis() - b.date.toMillis())
}

export function getCourseEventsForDate(
  courseId: string,
  date: DateTime
): CourseEvent[] {
  return getCourseEvents(courseId).filter(
    (event) =>
      event.date.day === date.day &&
      event.date.month === date.month &&
      event.date.year === date.year
  )
}

export function getCourseEventTypeForDate(
  courseId: string,
  date: DateTime
): EventType | null {
  const events = getCourseEventsForDate(courseId, date)
  if (events.length === 0) return null

  // Priority order: exam > activity > homework > project > lecture > office-hours > holiday > others
  const priorityOrder: EventType[] = [
    "exam",
    "activity",
    "homework",
    "lecture",
    "office-hours",
    "holiday",
  ]

  for (const type of priorityOrder) {
    const event = events.find((e) => e.type === type)
    if (event) return event.type
  }

  return events[0].type
}

export function getCourseDatesWithEvents(courseId: string): DateTime[] {
  return getCourseEvents(courseId).map((event) => event.date)
}

export function getCalendarDayColor(type: EventType): string {
  switch (type) {
    case "lecture":
      return "!bg-blue-500 !text-white hover:!bg-blue-600 border-2 !border-blue-600 font-semibold"
    case "exam":
      return "!bg-red-500 !text-white hover:!bg-red-600 border-2 !border-red-600 font-semibold"
    case "homework":
      return "!bg-green-500 !text-white hover:!bg-green-600 border-2 !border-green-600 font-semibold"
    case "activity":
      return "!bg-orange-500 !text-white hover:!bg-orange-600 border-2 !border-orange-600 font-semibold"
    case "office-hours":
      return "!bg-gray-500 !text-white hover:!bg-gray-600 border-2 !border-gray-600 font-semibold"
    case "holiday":
      return "!bg-yellow-500 !text-gray-900 hover:!bg-yellow-600 border-2 !border-yellow-600 font-semibold"
    /*
    case "project":
      return "!bg-purple-500 !text-white hover:!bg-purple-600 border-2 !border-purple-600 font-semibold"
    case "lab":
      return "!bg-teal-500 !text-white hover:!bg-teal-600 border-2 !border-teal-600 font-semibold"
    case "reading":
      return "!bg-pink-500 !text-white hover:!bg-pink-600 border-2 !border-pink-600 font-semibold"
    */
    default:
      return "!bg-gray-400 !text-white hover:!bg-gray-500 border-2 !border-gray-500 font-semibold"
  }
}

export function getCalendarDayStyle(type: EventType): React.CSSProperties {
  // Use CSS custom properties that respond to light/dark mode
  switch (type) {
    case "lecture":
      return {
        backgroundColor: "rgb(var(--calendar-lecture-bg))",
        color: "rgb(var(--calendar-lecture-fg))",
        fontWeight: "600",
      }
    case "exam":
      return {
        backgroundColor: "rgb(var(--calendar-exam-bg))",
        color: "rgb(var(--calendar-exam-fg))",
        fontWeight: "600",
      }
    case "homework":
      return {
        backgroundColor: "rgb(var(--calendar-homework-bg))",
        color: "rgb(var(--calendar-homework-fg))",
        fontWeight: "600",
      }
    case "activity":
      return {
        backgroundColor: "rgb(var(--calendar-activity-bg))",
        color: "rgb(var(--calendar-activity-fg))",
        fontWeight: "600",
      }
    case "office-hours":
      return {
        backgroundColor: "rgb(var(--calendar-office-bg))",
        color: "rgb(var(--calendar-office-fg))",
        fontWeight: "600",
      }
    case "holiday":
      return {
        backgroundColor: "rgb(var(--calendar-holiday-bg))",
        color: "rgb(var(--calendar-holiday-fg))",
        fontWeight: "600",
      }
    default:
      return {
        backgroundColor: "rgb(var(--calendar-office-bg))",
        color: "rgb(var(--calendar-office-fg))",
        fontWeight: "600",
      }
  }
}

export function getEventTypeColor(type: EventType): string {
  switch (type) {
    case "lecture":
      return "bg-blue-500"
    case "exam":
      return "bg-red-500"
    case "homework":
      return "bg-green-500"
    case "activity":
      return "bg-orange-500"
    case "office-hours":
      return "bg-gray-500"
    case "holiday":
      return "bg-yellow-500"
    /*
    case "project":
      return "bg-purple-500"
    case "lab":
      return "bg-teal-500"
    case "reading":
      return "bg-pink-500"
    */
    default:
      return "bg-gray-400"
  }
}

export function getEventTypeIcon(type: EventType): string {
  switch (type) {
    case "lecture":
      return "📚"
    case "exam":
      return "📋"
    case "homework":
      return "📝"
    case "activity":
      return "🎯"
    case "office-hours":
      return "👥"
    case "holiday":
      return "🎉"
    /*
    case "project":
      return "💻"
    case "lab":
      return "🔬"
    case "reading":
      return "📖"
    case "other":
      return "📌"
    */
    default:
      return "📌"
  }
}
