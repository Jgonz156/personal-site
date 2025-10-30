import { DateTime } from "luxon"
import type { ScheduleConfig } from "../schedule-generator"

/**
 * CMSI-5850 Programming Languages Foundations
 * Template Schedule Configuration (Not taught Fall 2025)
 */
export const cmsi5850Schedule: ScheduleConfig = {
  // Example: Semester starts (adjust for actual semester)
  startDate: DateTime.fromObject({ year: 2026, month: 1, day: 12 }),

  // Example: Classes meet on Mondays (1) and Wednesdays (3)
  lectureDays: [1, 3],

  // Holidays and breaks (adjust for actual semester)
  skipDates: [],

  // Full weeks to skip (adjust for actual semester)
  skipWeeks: [],

  // Schedule shifts (add as needed)
  shifts: [],

  // Last day of instruction (adjust for actual semester)
  cutoffDate: DateTime.fromObject({ year: 2026, month: 5, day: 1 }),
}
