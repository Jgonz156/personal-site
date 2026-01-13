import { DateTime } from "luxon"
import type { ScheduleConfig } from "../schedule-generator"

/**
 * CMSI-2820 Discrete Mathematics for Computer Science
 * Spring 2026 Schedule Configuration
 */
export const cmsi2820Fall2025Schedule: ScheduleConfig = {
  // Semester starts Monday, January 12, 2026
  startDate: DateTime.fromObject({ year: 2026, month: 1, day: 12 }),

  // Classes meet on Tuesdays (2) and Thursdays (4)
  lectureDays: [2, 4],

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
  cutoffDate: DateTime.fromObject({ year: 2026, month: 5, day: 6 }),
}
