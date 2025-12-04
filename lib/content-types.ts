import { getCourseEvents, type CourseEvent, type EventType } from "./course-data"

// ============================================================
// CONTENT TYPE CONFIGURATION
// Maps URL prefixes to folders, labels, and event types
// ============================================================

export interface ContentTypeConfig {
  prefix: string // URL prefix (e.g., "ln", "hw", "ex", "ac")
  folder: string // Folder name in content directory
  eventType: EventType // Corresponding event type in data.ts
  label: string // Display label (e.g., "Lecture Note", "Homework")
  shortLabel: string // Short label for navigation (e.g., "LN", "HW")
  gridColumns: string // Grid layout for quick navigation
  topLevelSectionClass?: string // Optional CSS class for top-level sections
  minNumber: number // Minimum item number (usually 0 or 1)
}

// Shared configuration for all content types
export const CONTENT_TYPE_CONFIG: Record<string, ContentTypeConfig> = {
  lecture: {
    prefix: "ln",
    folder: "notes",
    eventType: "lecture",
    label: "Lecture Note",
    shortLabel: "LN",
    gridColumns: "grid-cols-7 sm:grid-cols-10",
    minNumber: 1,
  },
  homework: {
    prefix: "hw",
    folder: "homeworks",
    eventType: "homework",
    label: "Homework",
    shortLabel: "HW",
    gridColumns: "grid-cols-7 sm:grid-cols-10",
    topLevelSectionClass: "homework-section-header",
    minNumber: 0,
  },
  exam: {
    prefix: "ex",
    folder: "exams",
    eventType: "exam",
    label: "Exam",
    shortLabel: "EX",
    gridColumns: "grid-cols-5 sm:grid-cols-10",
    minNumber: 0,
  },
  activity: {
    prefix: "ac",
    folder: "activities",
    eventType: "activity",
    label: "Activity",
    shortLabel: "AC",
    gridColumns: "grid-cols-5 sm:grid-cols-10",
    minNumber: 1,
  },
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Get content type config from URL id prefix
 */
export function getContentTypeFromId(id: string): ContentTypeConfig | null {
  for (const config of Object.values(CONTENT_TYPE_CONFIG)) {
    if (id.startsWith(config.prefix)) {
      return config
    }
  }
  return null
}

/**
 * Extract item number from URL id (e.g., "hw3" -> 3)
 */
export function getItemNumberFromId(id: string): number | null {
  const config = getContentTypeFromId(id)
  if (!config) return null

  const numberStr = id.substring(config.prefix.length)
  const num = parseInt(numberStr, 10)
  return isNaN(num) ? null : num
}

/**
 * Derive content type counts from data.ts events
 * Returns the highest item number for each content type
 */
export function deriveContentTypeCounts(
  courseId: string
): Record<string, number> {
  const events = getCourseEvents(courseId)
  const counts: Record<string, number> = {}

  for (const config of Object.values(CONTENT_TYPE_CONFIG)) {
    // Find all events of this type with contentUrl
    const typeEvents = events.filter(
      (e) => e.type === config.eventType && e.contentUrl
    )

    // Extract numbers from contentUrl and find the max
    let maxNumber = 0
    for (const event of typeEvents) {
      if (event.contentUrl) {
        // contentUrl format: "/cmsi-XXXX/hw3" or "/cmsi-XXXX/ln1"
        const match = event.contentUrl.match(
          new RegExp(`/${config.prefix}(\\d+)$`)
        )
        if (match) {
          const num = parseInt(match[1], 10)
          if (num > maxNumber) maxNumber = num
        }
      }
    }

    counts[config.prefix] = maxNumber
  }

  return counts
}

/**
 * Get event by course ID and content URL path
 * @param courseId - e.g., "cmsi-3510"
 * @param urlPath - e.g., "hw3" or "ln1"
 */
export function getEventByContentUrl(
  courseId: string,
  urlPath: string
): CourseEvent | null {
  const events = getCourseEvents(courseId)
  const fullUrl = `/${courseId}/${urlPath}`

  return events.find((e) => e.contentUrl === fullUrl) || null
}

/**
 * Get all events of a specific type for a course
 */
export function getEventsByType(
  courseId: string,
  eventType: EventType
): CourseEvent[] {
  return getCourseEvents(courseId).filter((e) => e.type === eventType)
}

// ============================================================
// PREFIXED FIELD EXTRACTORS
// Helper functions to extract typed metadata from events
// ============================================================

export interface HomeworkFields {
  topics: string[]
  points: {
    written?: number
    programming?: number
    reading?: number
    optional?: number
  }
  githubClassroomUrl?: string
  brightspaceUrl?: string
}

export function getHomeworkFields(event: CourseEvent): HomeworkFields {
  return {
    topics: event.hwTopics || [],
    points: event.hwPoints || {},
    githubClassroomUrl: event.hwGithubClassroomUrl,
    brightspaceUrl: event.hwBrightspaceUrl,
  }
}

export interface ExamFields {
  topics: string[]
  totalPoints?: number
  totalQuestions?: number
  hasTimer: boolean
  allowedAttempts: string
  examUrl?: string
  brightspaceUrl?: string
}

export function getExamFields(event: CourseEvent): ExamFields {
  return {
    topics: event.exTopics || [],
    totalPoints: event.exTotalPoints,
    totalQuestions: event.exTotalQuestions,
    hasTimer: event.exHasTimer || false,
    allowedAttempts: event.exAllowedAttempts || "Unlimited",
    examUrl: event.exExamUrl,
    brightspaceUrl: event.exBrightspaceUrl,
  }
}

export interface LectureFields {
  topics: string[]
}

export function getLectureFields(event: CourseEvent): LectureFields {
  return {
    topics: event.lnTopics || [],
  }
}

export interface ActivityFields {
  topics: string[]
  learningObjectives: string[]
  estimatedTime?: string
  materials: string[]
}

export function getActivityFields(event: CourseEvent): ActivityFields {
  return {
    topics: event.acTopics || [],
    learningObjectives: event.acLearningObjectives || [],
    estimatedTime: event.acEstimatedTime,
    materials: event.acMaterials || [],
  }
}

// ============================================================
// DATE FORMATTING
// ============================================================

/**
 * Format a Luxon DateTime to a readable date string
 */
export function formatDate(date: any): string {
  if (!date) return "TBD"
  return date.toFormat("MMMM d, yyyy")
}

