import type { CourseEvent } from "../../course-data"
import { createSchedule } from "../schedule-generator"
import { cmsi5850Schedule } from "./schedule"

// Create schedule generator (template for future use)
const schedule = createSchedule(cmsi5850Schedule)

// Template for course events - populate when course is taught
const allEvents: CourseEvent[] = [
  // Example structure (uncomment and modify when course starts):
  /*
  {
    id: "5850-ln0",
    title: "LN 0: Introduction to Programming Language Foundations",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln0"),
    description: "Introduction to formal semantics and programming language theory.",
    courseId: "cmsi-5850",
    standard: "Introduction",
    contentUrl: "/cmsi-5850/ln0",
    recordings: [],
  },
  */
]

// Filter events based on cutoff date
export const cmsi5850Events: CourseEvent[] = allEvents.filter(
  (event) => !schedule.shouldFilterEvent(event.date, event.pinned)
)
