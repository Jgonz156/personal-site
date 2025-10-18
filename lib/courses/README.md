# Course Data Structure

This directory contains individual course data files for each course offered on the website.

## Architecture

Each course has its own data file that exports an array of `CourseEvent` objects:

- `cmsi-2820-data.ts` - Discrete Mathematics for Computer Science
- `cmsi-3510-data.ts` - Operating Systems
- `cmsi-5850-data.ts` - Programming Languages Foundations

These files are aggregated in the parent `lib/course-data.ts` file.

## Adding a New Course

To add a new course:

1. Create a new file: `lib/courses/cmsi-XXXX-data.ts`
2. Import the `CourseEvent` type from the parent:
   ```typescript
   import type { CourseEvent } from "../course-data"
   ```
3. Export an array of events with a descriptive name:
   ```typescript
   export const cmsiXXXXEvents: CourseEvent[] = [
     // ... your course events
   ]
   ```
4. Import and include your events in `lib/course-data.ts`:

   ```typescript
   import { cmsiXXXXEvents } from "./courses/cmsi-XXXX-data"

   export const courseEvents: CourseEvent[] = [
     ...cmsi2820Events,
     ...cmsi3510Events,
     ...cmsi5850Events,
     ...cmsiXXXXEvents, // Add your new course here
   ]
   ```

## Using Course-Specific Data

The main `course-data.ts` file provides helper functions for filtering events by course:

```typescript
import { getCourseEvents, getCourseUpcomingEvents } from "@/lib/course-data"

// Get all events for a specific course
const cmsi2820Events = getCourseEvents("cmsi-2820")

// Get upcoming events for a specific course
const upcomingEvents = getCourseUpcomingEvents("cmsi-2820", 14)
```

### Available Course-Specific Functions

- `getCourseEvents(courseId: string)` - Get all events for a course
- `getCourseTodaysEvents(courseId: string)` - Get today's events for a course
- `getCourseUpcomingEvents(courseId: string, daysAhead: number)` - Get upcoming events
- `getCourseUpcomingHomeworkAndExams(courseId: string, daysAhead: number)` - Get upcoming homework/exams
- `getCourseEventsForDate(courseId: string, date: DateTime)` - Get events for a specific date
- `getCourseEventTypeForDate(courseId: string, date: DateTime)` - Get event type for a date
- `getCourseDatesWithEvents(courseId: string)` - Get all dates with events

## Event Structure

Each `CourseEvent` must have:

```typescript
{
  id: string              // Unique identifier (e.g., "ln1", "hw2", "ex0")
  title: string           // Display title
  type: EventType         // "lecture" | "homework" | "exam" | "office-hours" | "holiday"
  date: DateTime          // Due date (using Luxon DateTime)
  availableDate?: DateTime // Optional: When content becomes available
  description?: string    // Optional: Event description
  dueTime?: string       // Optional: Due time (e.g., "11:59 PM")
  courseId?: string      // Optional: Course identifier (e.g., "cmsi-2820")
  standard?: string      // Optional: Standard/unit name
  contentUrl?: string    // Optional: Link to content
  recordings?: Recording[] // Optional: Array of video recordings
}
```

## Backward Compatibility

The original API is fully maintained:

- `courseEvents` still exports all events from all courses
- All original helper functions still work
- Existing components don't need to be updated

This means you can gradually migrate to course-specific functions when needed.
