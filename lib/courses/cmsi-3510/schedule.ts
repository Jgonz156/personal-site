import { DateTime } from "luxon"
import type { ScheduleConfig } from "../schedule-generator"

/**
 * CMSI-3510 Operating Systems
 * Fall 2025 Schedule Configuration
 */
export const cmsi3510Fall2025Schedule: ScheduleConfig = {
  // Semester starts Tuesday, August 26, 2025
  startDate: DateTime.fromObject({ year: 2025, month: 8, day: 26 }),

  // Classes meet on Tuesdays (2) and Thursdays (4)
  lectureDays: [2, 4],

  // Holidays and breaks (no classes on these days)
  skipDates: [
    DateTime.fromObject({ year: 2025, month: 9, day: 1 }), // Labor Day
    DateTime.fromObject({ year: 2025, month: 10, day: 10 }), // Autumn Day
  ],

  // Full weeks to skip entirely (not just individual days)
  skipWeeks: [
    {
      startDate: DateTime.fromObject({ year: 2025, month: 11, day: 24 }),
      endDate: DateTime.fromObject({ year: 2025, month: 11, day: 30 }),
      description: "Thanksgiving Break - skip entire week",
    },
  ],

  // Active schedule shifts
  shifts: [
    {
      afterEventId: "3510-ln14",
      shiftDays: 7,
      description:
        "One week shift starting after LN 14 (ln15 and beyond shifted)",
    },
  ],

  // Last day of instruction (before finals week)
  cutoffDate: DateTime.fromObject({ year: 2025, month: 12, day: 5 }),
}
