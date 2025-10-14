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
  standard?: string // e.g., "Logic", "Numbers", "Collections", etc.
  contentUrl?: string // Link to lecture notes, homework spec, exam details page
  recordingUrls?: string[] // Array of zoom recording links (max 5)
}

// Sample course data - this can be expanded and moved to a database later
export const courseEvents: CourseEvent[] = [
  // Today's event
  {
    id: "0",
    title: "Introduction to Logic",
    type: "lecture",
    date: new Date(2025, 9, 7), // October 7, 2025 (Today)
    description: "Propositional logic and truth tables",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Logic",
    contentUrl: "#",
    recordingUrls: ["#", "#"],
  },
  {
    id: "1",
    title: "Chapter 1-3 Reading",
    type: "reading",
    date: new Date(2025, 9, 8), // October 8, 2025
    description: "Read chapters 1-3 on logic fundamentals",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
    standard: "Logic",
  },
  {
    id: "1b",
    title: "Logical Equivalence",
    type: "lecture",
    date: new Date(2025, 9, 9), // October 9, 2025
    description: "Understanding logical operators and equivalence",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Logic",
    contentUrl: "#",
    recordingUrls: ["#", "#", "#"],
  },
  {
    id: "2",
    title: "Homework 1: Logic Problems",
    type: "homework",
    date: new Date(2025, 9, 10), // October 10, 2025
    description: "Complete problems on truth tables and logical equivalence",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
    standard: "Logic",
    contentUrl: "/cmsi-2820/hw1",
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
    title: "Number Systems",
    type: "lecture",
    date: new Date(2025, 9, 14), // October 14, 2025
    description: "Binary, octal, and hexadecimal systems",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "#",
    recordingUrls: ["#"],
  },
  {
    id: "3",
    title: "Midterm Exam 1",
    type: "exam",
    date: new Date(2025, 9, 15), // October 15, 2025
    description: "Covers Logic and basic number theory",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Logic",
    contentUrl: "#",
  },
  {
    id: "3b",
    title: "Modular Arithmetic",
    type: "lecture",
    date: new Date(2025, 9, 16), // October 16, 2025
    description: "Properties of modular arithmetic and applications",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "#",
    recordingUrls: ["#", "#"],
  },
  {
    id: "4",
    title: "Homework 2: Number Systems",
    type: "homework",
    date: new Date(2025, 9, 17), // October 17, 2025
    description:
      "Convert between number systems and solve modular arithmetic problems",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "/cmsi-2820/hw2",
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
    title: "Introduction to Sets",
    type: "lecture",
    date: new Date(2025, 9, 21), // October 21, 2025
    description: "Set operations and Venn diagrams",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Set Theory",
  },
  {
    id: "6",
    title: "Lab 3: Set Operations",
    type: "lab",
    date: new Date(2025, 9, 22), // October 22, 2025
    description: "Hands-on practice with set operations",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
    standard: "Set Theory",
  },
  {
    id: "6b",
    title: "Functions and Relations",
    type: "lecture",
    date: new Date(2025, 9, 23), // October 23, 2025
    description: "Types of functions and their properties",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Functions",
  },
  {
    id: "5",
    title: "Project 1: Function Analysis",
    type: "project",
    date: new Date(2025, 9, 24), // October 24, 2025
    description: "Analyze and classify various mathematical functions",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
    standard: "Functions",
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
  {
    id: "8",
    title: "Lists and Sequences",
    type: "lecture",
    date: new Date(2025, 9, 28), // October 28, 2025
    description: "Working with ordered collections",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Collections",
  },
  {
    id: "9",
    title: "Homework 3: Set Theory",
    type: "homework",
    date: new Date(2025, 9, 29), // October 29, 2025
    description: "Solve problems on set operations and proofs",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
    standard: "Set Theory",
    contentUrl: "/cmsi-2820/hw3",
  },
  {
    id: "10",
    title: "Counting Principles",
    type: "lecture",
    date: new Date(2025, 9, 30), // October 30, 2025
    description: "Basic counting, permutations, and combinations",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Combinatorics",
  },
  {
    id: "11",
    title: "Homework 4: Functions",
    type: "homework",
    date: new Date(2025, 10, 1), // November 1, 2025
    description: "Problems on injective, surjective, and bijective functions",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
    standard: "Functions",
    contentUrl: "/cmsi-2820/hw4",
  },
  {
    id: "12",
    title: "Introduction to Graphs",
    type: "lecture",
    date: new Date(2025, 10, 4), // November 4, 2025
    description: "Graph definitions and representations",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Graph Theory",
  },
  {
    id: "13",
    title: "Homework 5: Combinatorics",
    type: "homework",
    date: new Date(2025, 10, 7), // November 7, 2025
    description: "Counting problems and combinatorial proofs",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
    standard: "Combinatorics",
    contentUrl: "/cmsi-2820/hw5",
  },
  {
    id: "14",
    title: "Graph Traversal Algorithms",
    type: "lecture",
    date: new Date(2025, 10, 11), // November 11, 2025
    description: "BFS and DFS algorithms",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Graph Theory",
  },
  {
    id: "15",
    title: "Midterm Exam 2",
    type: "exam",
    date: new Date(2025, 10, 14), // November 14, 2025
    description: "Covers Sets, Functions, and Collections",
    dueTime: "2:00 PM",
    courseId: "cmsi-2820",
    standard: "Set Theory",
  },
  {
    id: "16",
    title: "Homework 6: Graph Theory",
    type: "homework",
    date: new Date(2025, 10, 18), // November 18, 2025
    description: "Problems on graph properties and traversal",
    dueTime: "11:59 PM",
    courseId: "cmsi-2820",
    standard: "Graph Theory",
    contentUrl: "/cmsi-2820/hw6",
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
