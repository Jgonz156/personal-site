import { courseEvents, type CourseEvent } from "./course-data"

/**
 * Get homework event data from course-data.ts
 * This is the single source of truth for dates and core information
 */
export function getHomeworkEvent(hwNumber: number): CourseEvent | null {
  const hwId = `hw${hwNumber}`
  return courseEvents.find((event) => event.id === hwId) || null
}

/**
 * Get lecture event data from course-data.ts
 */
export function getLectureEvent(lnNumber: number): CourseEvent | null {
  const lnId = `ln${lnNumber}`
  return courseEvents.find((event) => event.id === lnId) || null
}

/**
 * Get exam event data from course-data.ts
 */
export function getExamEvent(exNumber: number): CourseEvent | null {
  const exId = `ex${exNumber}`
  return courseEvents.find((event) => event.id === exId) || null
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
