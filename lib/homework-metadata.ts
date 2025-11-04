import { courseEvents, getCourseEvents, type CourseEvent } from "./course-data"

/**
 * Get homework event data from course-data.ts
 * This is the single source of truth for dates and core information
 */
export function getHomeworkEvent(
  hwNumber: number,
  courseId?: string
): CourseEvent | null {
  const hwId = `hw${hwNumber}`
  const events = courseId ? getCourseEvents(courseId) : courseEvents
  // Try to find by exact ID match first (e.g., "hw1")
  // Then try to find by ID ending (e.g., "2820-hw1", "3510-hw1")
  return (
    events.find((event) => event.id === hwId) ||
    events.find((event) => event.id.endsWith(`-${hwId}`)) ||
    null
  )
}

/**
 * Get lecture event data from course-data.ts
 */
export function getLectureEvent(
  lnNumber: number,
  courseId?: string
): CourseEvent | null {
  const lnId = `ln${lnNumber}`
  const events = courseId ? getCourseEvents(courseId) : courseEvents
  // Try to find by exact ID match first (e.g., "ln1")
  // Then try to find by ID ending (e.g., "2820-ln1", "3510-ln1")
  return (
    events.find((event) => event.id === lnId) ||
    events.find((event) => event.id.endsWith(`-${lnId}`)) ||
    null
  )
}

/**
 * Get exam event data from course-data.ts
 */
export function getExamEvent(
  exNumber: number,
  courseId?: string
): CourseEvent | null {
  const exId = `ex${exNumber}`
  const events = courseId ? getCourseEvents(courseId) : courseEvents
  // Try to find by exact ID match first (e.g., "ex1")
  // Then try to find by ID ending (e.g., "2820-ex1", "3510-ex1")
  return (
    events.find((event) => event.id === exId) ||
    events.find((event) => event.id.endsWith(`-${exId}`)) ||
    null
  )
}

/**
 * Format a Luxon DateTime to a readable date string
 */
export function formatDate(date: any): string {
  if (!date) return "TBD"
  return date.toFormat("MMMM d, yyyy")
}

/**
 * Metadata type that can be exported from MDX files
 */
export interface HomeworkMetadata {
  hwNumber: number
  title: string
  topics: string[]
  points: {
    written: number
    programming?: number
    optional?: number
  }
}

export interface LectureMetadata {
  lnNumber: number
  title: string
  topics: string[]
}

export interface ExamMetadata {
  exNumber: number
  title: string
  standard: string
  topics: string[]
  totalPoints: number
  totalQuestions: number
  hasTimer?: boolean
  allowedAttempts?: string
  examUrl?: string // Optional: for multi-part exams, individual sections have their own links
}
