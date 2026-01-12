import { DateTime } from "luxon"
import type { ScheduleConfig } from "../schedule-generator"

/**
 * CMSI-3510 Operating Systems
 * Fall 2025 Schedule Configuration
 */
export const cmsi3510Fall2025Schedule: ScheduleConfig = {
  // Semester starts Tuesday, August 26, 2025
  startDate: DateTime.fromObject({ year: 2026, month: 1, day: 12 }),

  // Classes meet on Mondays (1) and Wednesdays (3)
  lectureDays: [1, 3],

  // Holidays and breaks (no classes on these days)
  skipDates: [
    DateTime.fromObject({ year: 2026, month: 1, day: 19 }), // Martin Luther King Jr. Day
    DateTime.fromObject({ year: 2026, month: 3, day: 31 }), // Ceasar Chavez Day
  ],

  // Full weeks to skip entirely (not just individual days)
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

  // Active schedule shifts
  shifts: [
  ],

  // Last day of instruction (before finals week)
  cutoffDate: DateTime.fromObject({ year: 2026, month: 5, day: 5 }),
}
