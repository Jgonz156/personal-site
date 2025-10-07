// Types for course events
export type EventType =
  | "homework"
  | "exam"
  | "lecture"
  | "lab"
  | "project"
  | "reading"
  | "office-hours"
  | "holiday"
  | "other"

export interface CourseEvent {
  id: string
  title: string
  type: EventType
  date: Date
  description?: string
  dueTime?: string // e.g., "11:59 PM"
  courseId?: string
  completed?: boolean
}

// Sample course data - this can be expanded and moved to a database later
export const courseEvents: CourseEvent[] = [
  // Today's event
  {
    id: "0",
    title: "Algorithm Design Lecture",
    type: "lecture",
    date: new Date(2025, 9, 7), // October 7, 2025 (Today)
    description: "Introduction to dynamic programming",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "1",
    title: "Chapter 1-3 Reading",
    type: "reading",
    date: new Date(2025, 9, 8), // October 8, 2025
    description: "Read chapters 1-3 on algorithm fundamentals",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "1b",
    title: "Lecture: Complexity Analysis",
    type: "lecture",
    date: new Date(2025, 9, 9), // October 9, 2025
    description: "Understanding Big-O notation",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "2",
    title: "Homework 1: Big-O Analysis",
    type: "homework",
    date: new Date(2025, 9, 10), // October 10, 2025
    description: "Complete problems 1-5 on time complexity",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "2b",
    title: "Office Hours with Prof. Smith",
    type: "office-hours",
    date: new Date(2025, 9, 11), // October 11, 2025
    description: "Drop in for homework help",
    dueTime: "3:00 PM - 5:00 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "2c",
    title: "Lecture: Sorting Algorithms I",
    type: "lecture",
    date: new Date(2025, 9, 14), // October 14, 2025
    description: "Merge sort and quick sort",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "3",
    title: "Midterm Exam 1",
    type: "exam",
    date: new Date(2025, 9, 15), // October 15, 2025
    description: "Covers chapters 1-5, algorithms and data structures",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "3b",
    title: "Lecture: Sorting Algorithms II",
    type: "lecture",
    date: new Date(2025, 9, 16), // October 16, 2025
    description: "Heap sort and counting sort",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "4",
    title: "Homework 2: Sorting Algorithms",
    type: "homework",
    date: new Date(2025, 9, 17), // October 17, 2025
    description: "Implement and analyze merge sort and quick sort",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "4b",
    title: "Office Hours with TA Johnson",
    type: "office-hours",
    date: new Date(2025, 9, 18), // October 18, 2025
    description: "Get help with homework 2",
    dueTime: "4:00 PM - 6:00 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "4c",
    title: "Fall Break - No Class",
    type: "holiday",
    date: new Date(2025, 9, 20), // October 20, 2025
    description: "University holiday",
    courseId: "cmsi-2820",
  },
  {
    id: "4d",
    title: "Lecture: Graph Theory Basics",
    type: "lecture",
    date: new Date(2025, 9, 21), // October 21, 2025
    description: "Introduction to graphs and basic algorithms",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "6",
    title: "Lab 3: Graph Traversal",
    type: "lab",
    date: new Date(2025, 9, 22), // October 22, 2025
    description: "Hands-on practice with BFS and DFS",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "6b",
    title: "Lecture: Advanced Graph Algorithms",
    type: "lecture",
    date: new Date(2025, 9, 23), // October 23, 2025
    description: "Dijkstra's and A* algorithms",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "5",
    title: "Project 1: Search Algorithm Implementation",
    type: "project",
    date: new Date(2025, 9, 24), // October 24, 2025
    description: "Build a search engine using various search algorithms",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
  },
  {
    id: "7",
    title: "Office Hours",
    type: "office-hours",
    date: new Date(2025, 9, 25), // October 25, 2025
    description: "Final project help",
    dueTime: "3:00 PM - 5:00 PM",
    courseId: "cmsi-2820",
  },
]

// Helper functions
export function getEventsForDate(date: Date): CourseEvent[] {
  return courseEvents.filter(
    (event) =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
  )
}

export function getTodaysEvents(): CourseEvent[] {
  return getEventsForDate(new Date())
}

export function getUpcomingEvents(daysAhead: number = 14): CourseEvent[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const futureDate = new Date(today)
  futureDate.setDate(futureDate.getDate() + daysAhead)

  return courseEvents
    .filter((event) => event.date >= today && event.date <= futureDate)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function getUpcomingHomeworkAndExams(
  daysAhead: number = 30
): CourseEvent[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const futureDate = new Date(today)
  futureDate.setDate(futureDate.getDate() + daysAhead)

  return courseEvents
    .filter(
      (event) =>
        (event.type === "homework" ||
          event.type === "exam" ||
          event.type === "project") &&
        event.date >= today &&
        event.date <= futureDate
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function getDatesWithEvents(): Date[] {
  return courseEvents.map((event) => event.date)
}

export function getEventTypeForDate(date: Date): EventType | null {
  const events = getEventsForDate(date)
  if (events.length === 0) return null

  // Priority order: exam > homework > project > lecture > office-hours > holiday > others
  const priorityOrder: EventType[] = [
    "exam",
    "homework",
    "project",
    "lecture",
    "office-hours",
    "holiday",
    "lab",
    "reading",
    "other",
  ]

  for (const type of priorityOrder) {
    const event = events.find((e) => e.type === type)
    if (event) return event.type
  }

  return events[0].type
}

export function getCalendarDayColor(type: EventType): string {
  switch (type) {
    case "lecture":
      return "!bg-blue-500 !text-white hover:!bg-blue-600 border-2 !border-blue-600 font-semibold"
    case "exam":
      return "!bg-red-500 !text-white hover:!bg-red-600 border-2 !border-red-600 font-semibold"
    case "homework":
      return "!bg-green-500 !text-white hover:!bg-green-600 border-2 !border-green-600 font-semibold"
    case "office-hours":
      return "!bg-gray-500 !text-white hover:!bg-gray-600 border-2 !border-gray-600 font-semibold"
    case "holiday":
      return "!bg-yellow-500 !text-gray-900 hover:!bg-yellow-600 border-2 !border-yellow-600 font-semibold"
    case "project":
      return "!bg-purple-500 !text-white hover:!bg-purple-600 border-2 !border-purple-600 font-semibold"
    case "lab":
      return "!bg-teal-500 !text-white hover:!bg-teal-600 border-2 !border-teal-600 font-semibold"
    case "reading":
      return "!bg-orange-500 !text-white hover:!bg-orange-600 border-2 !border-orange-600 font-semibold"
    default:
      return "!bg-gray-400 !text-white hover:!bg-gray-500 border-2 !border-gray-500 font-semibold"
  }
}

export function getCalendarDayStyle(
  type: EventType,
  isDark: boolean
): React.CSSProperties {
  switch (type) {
    case "lecture":
      return {
        backgroundColor: isDark ? "#1e40af" : "#93c5fd",
        color: isDark ? "#dbeafe" : "#1e3a8a",
        fontWeight: "600",
      }
    case "exam":
      return {
        backgroundColor: isDark ? "#b91c1c" : "#fca5a5",
        color: isDark ? "#fecaca" : "#7f1d1d",
        fontWeight: "600",
      }
    case "homework":
      return {
        backgroundColor: isDark ? "#15803d" : "#86efac",
        color: isDark ? "#d1fae5" : "#14532d",
        fontWeight: "600",
      }
    case "office-hours":
      return {
        backgroundColor: isDark ? "#374151" : "#d1d5db",
        color: isDark ? "#e5e7eb" : "#1f2937",
        fontWeight: "600",
      }
    case "holiday":
      return {
        backgroundColor: isDark ? "#a16207" : "#fde047",
        color: isDark ? "#fef3c7" : "#713f12",
        fontWeight: "600",
      }
    case "project":
      return {
        backgroundColor: isDark ? "#7e22ce" : "#d8b4fe",
        color: isDark ? "#f3e8ff" : "#581c87",
        fontWeight: "600",
      }
    case "lab":
      return {
        backgroundColor: isDark ? "#0f766e" : "#5eead4",
        color: isDark ? "#ccfbf1" : "#134e4a",
        fontWeight: "600",
      }
    case "reading":
      return {
        backgroundColor: isDark ? "#c2410c" : "#fdba74",
        color: isDark ? "#fed7aa" : "#7c2d12",
        fontWeight: "600",
      }
    default:
      return {
        backgroundColor: isDark ? "#4b5563" : "#d1d5db",
        color: isDark ? "#e5e7eb" : "#1f2937",
        fontWeight: "600",
      }
  }
}

export function getEventTypeColor(type: EventType): string {
  switch (type) {
    case "lecture":
      return "bg-blue-500"
    case "exam":
      return "bg-red-500"
    case "homework":
      return "bg-green-500"
    case "office-hours":
      return "bg-gray-500"
    case "holiday":
      return "bg-yellow-500"
    case "project":
      return "bg-purple-500"
    case "lab":
      return "bg-teal-500"
    case "reading":
      return "bg-orange-500"
    default:
      return "bg-gray-400"
  }
}

export function getEventTypeIcon(type: EventType): string {
  switch (type) {
    case "lecture":
      return "📚"
    case "exam":
      return "📋"
    case "homework":
      return "📝"
    case "office-hours":
      return "👥"
    case "holiday":
      return "🎉"
    case "project":
      return "💻"
    case "lab":
      return "🔬"
    case "reading":
      return "📖"
    default:
      return "📌"
  }
}
