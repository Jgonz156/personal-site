import { DateTime } from "luxon"
import type { ScheduleConfig } from "../schedule-generator"

/**
 * CMSI-5850 Programming Languages Foundations
 * Spring 2026 Schedule Configuration
 */
export const cmsi5850Schedule: ScheduleConfig = {
  // Semester starts Monday, January 12, 2026
  startDate: DateTime.fromObject({ year: 2026, month: 1, day: 12 }),

  // Example: Classes meet on Thursdays (4)
  lectureDays: [4],

  // Holidays and breaks (adjust for actual semester)
  skipDates: [
    DateTime.fromObject({ year: 2026, month: 1, day: 19 }), // Martin Luther King Jr. Day
    DateTime.fromObject({ year: 2026, month: 3, day: 31 }), // Ceasar Chavez Day
  ],

  // Full weeks to skip (adjust for actual semester)
  skipWeeks: [
    {
      startDate: DateTime.fromObject({ year: 2026, month: 3, day: 2 }),
      endDate: DateTime.fromObject({ year: 2026, month: 3, day: 6 }),
      description: "Spring Break - skip entire week",
    },
    {
      startDate: DateTime.fromObject({ year: 2026, month: 3, day: 30 }),
      endDate: DateTime.fromObject({ year: 2026, month: 4, day: 3 }),
      description: "Easter Break - skip entire week",
    }
  ],

  // Schedule shifts (add as needed)
  shifts: [],

  // Last day of instruction (before finals week)
  cutoffDate: DateTime.fromObject({ year: 2026, month: 5, day: 6 }),
}
