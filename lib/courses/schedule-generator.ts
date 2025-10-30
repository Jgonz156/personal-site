import { DateTime } from "luxon"

/**
 * Weekday numbers for luxon DateTime.weekday:
 * 1 = Monday
 * 2 = Tuesday
 * 3 = Wednesday
 * 4 = Thursday
 * 5 = Friday
 * 6 = Saturday
 * 7 = Sunday
 *
 * Note: This differs from JavaScript's Date.getDay() which uses 0=Sunday!
 */

export interface ScheduleShift {
  afterEventId: string // Apply shift after this event
  shiftDays: number // Days to shift (positive or negative)
  description?: string // Optional: why this shift (e.g., "Snow day makeup")
}

export interface ScheduleWeekSkip {
  startDate: DateTime // First day to skip (inclusive)
  endDate: DateTime // Last day to skip (inclusive)
  description?: string // e.g., "Thanksgiving Break"
}

export interface ScheduleConfig {
  startDate: DateTime
  lectureDays: number[] // 1 = Monday, 2 = Tuesday, etc.
  skipDates: DateTime[] // Holidays, breaks, etc.
  skipWeeks?: ScheduleWeekSkip[] // Full weeks/ranges to skip entirely
  shifts?: ScheduleShift[]
  cutoffDate?: DateTime // Events shifted past this date are filtered (unless pinned)
}

export class ScheduleGenerator {
  private config: ScheduleConfig
  private currentDate: DateTime
  private eventOrder: string[] = [] // Track event IDs in order as they're generated
  private shifts: ScheduleShift[]
  private skipWeeks: ScheduleWeekSkip[]

  constructor(config: ScheduleConfig) {
    this.config = config
    this.currentDate = config.startDate
    this.shifts = config.shifts || []
    this.skipWeeks = config.skipWeeks || []
  }

  // Check if a date falls within any skip week range
  private isInSkipWeek(date: DateTime): boolean {
    const dateMs = date.startOf("day").toMillis()
    return this.skipWeeks.some((skipWeek) => {
      const startMs = skipWeek.startDate.startOf("day").toMillis()
      const endMs = skipWeek.endDate.startOf("day").toMillis()
      return dateMs >= startMs && dateMs <= endMs
    })
  }

  // Bounce a date past any skip weeks it falls within
  private bounceOverSkipWeeks(date: DateTime): DateTime {
    let bouncedDate = date
    const originalDayOfWeek = date.weekday % 7 // Preserve the original day of week
    let maxIterations = 10 // Safety limit
    let iterations = 0

    while (this.isInSkipWeek(bouncedDate) && iterations < maxIterations) {
      // Find which skip week we're in
      const skipWeek = this.skipWeeks.find((sw) => {
        const dateMs = bouncedDate.startOf("day").toMillis()
        const startMs = sw.startDate.startOf("day").toMillis()
        const endMs = sw.endDate.startOf("day").toMillis()
        return dateMs >= startMs && dateMs <= endMs
      })

      if (skipWeek) {
        // Jump to the day after the skip week ends
        let nextDate = skipWeek.endDate.plus({ days: 1 })

        // Find the next occurrence of the original day of week
        while (nextDate.weekday % 7 !== originalDayOfWeek) {
          nextDate = nextDate.plus({ days: 1 })
        }

        bouncedDate = nextDate
      }

      iterations++
    }

    return bouncedDate
  }

  // Calculate cumulative shift for a given event position
  private calculateCumulativeShift(eventId: string): number {
    let totalShift = 0

    // Find the index of this event in the order
    const currentIndex = this.eventOrder.indexOf(eventId)
    if (currentIndex === -1) return 0

    // Apply all shifts that come before this event
    for (const shift of this.shifts) {
      const shiftIndex = this.eventOrder.indexOf(shift.afterEventId)

      // If this shift point comes before the current event, apply it
      if (shiftIndex !== -1 && shiftIndex < currentIndex) {
        totalShift += shift.shiftDays
      }
    }

    return totalShift
  }

  // Get the next recurring date (for lectures)
  getNextRecurringDate(eventId?: string, pinned?: boolean): DateTime {
    let attempts = 0
    const maxAttempts = 365

    while (attempts < maxAttempts) {
      // Move to next valid day of week
      while (!this.config.lectureDays.includes(this.currentDate.weekday % 7)) {
        this.currentDate = this.currentDate.plus({ days: 1 })
        attempts++
      }

      // Check if this date falls in a skip week
      if (this.isInSkipWeek(this.currentDate)) {
        this.currentDate = this.currentDate.plus({ days: 1 })
        attempts++
        continue
      }

      // Check if this date should be skipped (individual holidays)
      const shouldSkip = this.config.skipDates.some(
        (skipDate) =>
          skipDate.hasSame(this.currentDate, "day") &&
          skipDate.hasSame(this.currentDate, "month") &&
          skipDate.hasSame(this.currentDate, "year")
      )

      if (!shouldSkip) {
        const baseDate = this.currentDate

        // Track event order if ID provided
        if (eventId) {
          this.eventOrder.push(eventId)

          // Pinned events don't get shifted
          if (pinned) {
            this.currentDate = this.currentDate.plus({ days: 1 })
            return baseDate
          }

          // Apply cumulative shifts
          const shift = this.calculateCumulativeShift(eventId)
          let shiftedDate = baseDate.plus({ days: shift })

          // Bounce over any skip weeks
          shiftedDate = this.bounceOverSkipWeeks(shiftedDate)

          this.currentDate = this.currentDate.plus({ days: 1 })
          return shiftedDate
        }

        this.currentDate = this.currentDate.plus({ days: 1 })
        return baseDate
      }

      this.currentDate = this.currentDate.plus({ days: 1 })
      attempts++
    }

    throw new Error("Could not find valid date within reasonable timeframe")
  }

  // Get a specific date (for non-recurring events)
  getSpecificDate(
    year: number,
    month: number,
    day: number,
    eventId?: string,
    pinned?: boolean
  ): DateTime {
    const baseDate = DateTime.fromObject({ year, month, day })

    if (eventId) {
      this.eventOrder.push(eventId)

      // Pinned events don't get shifted
      if (pinned) {
        return baseDate
      }

      const shift = this.calculateCumulativeShift(eventId)
      let shiftedDate = baseDate.plus({ days: shift })

      // Bounce over any skip weeks
      shiftedDate = this.bounceOverSkipWeeks(shiftedDate)

      return shiftedDate
    }

    return baseDate
  }

  // Check if an event should be filtered based on cutoff date
  shouldFilterEvent(eventDate: DateTime, pinned?: boolean): boolean {
    // Pinned events are always visible
    if (pinned) return false

    // If no cutoff date, don't filter
    if (!this.config.cutoffDate) return false

    // Filter if event date is after cutoff
    return eventDate > this.config.cutoffDate
  }

  // Helper to get shift summary for debugging
  getShiftSummary(): string {
    if (this.shifts.length === 0) return "No active shifts"

    return this.shifts
      .map(
        (s, i) =>
          `Shift ${i + 1}: ${s.shiftDays > 0 ? "+" : ""}${
            s.shiftDays
          } days after '${s.afterEventId}'${
            s.description ? ` (${s.description})` : ""
          }`
      )
      .join("\n")
  }

  // Validate shifts are week multiples (warning only)
  validateShifts(): void {
    const invalidShifts = this.shifts.filter(
      (shift) => Math.abs(shift.shiftDays) % 7 !== 0
    )

    if (invalidShifts.length > 0) {
      console.warn(
        "Warning: Non-week shifts detected. These may change the day of week:",
        invalidShifts
      )
    }
  }
}

export function createSchedule(config: ScheduleConfig): ScheduleGenerator {
  const generator = new ScheduleGenerator(config)
  generator.validateShifts() // Optional validation
  return generator
}
