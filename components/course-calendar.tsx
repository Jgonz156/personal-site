"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Calendar } from "@/components/ui/calendar"
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"
import {
  getDatesWithEvents,
  getEventTypeForDate,
  getCalendarDayColor,
  getCalendarDayStyle,
  EventType,
} from "@/lib/course-data"
import { cn } from "@/lib/utils"

interface CourseCalendarProps {
  onDateSelect?: (date: Date) => void
}

export function CourseCalendar({ onDateSelect }: CourseCalendarProps) {
  const { theme, resolvedTheme } = useTheme()
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  )
  const eventDates = getDatesWithEvents()

  // Determine if dark mode is active
  const isDark = resolvedTheme === "dark" || theme === "dark"

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date && onDateSelect) {
      onDateSelect(date)
    }
  }

  // Group dates by event type
  const datesByType = React.useMemo(() => {
    const grouped: Record<EventType, Date[]> = {
      lecture: [],
      exam: [],
      homework: [],
      "office-hours": [],
      holiday: [],
      project: [],
      lab: [],
      reading: [],
      other: [],
    }

    eventDates.forEach((date) => {
      const eventType = getEventTypeForDate(date)
      if (eventType) {
        grouped[eventType].push(date)
      }
    })

    return grouped
  }, [eventDates])

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className={cn(
            "[&_[role=gridcell]]:w-[33px]",
            // Default day styling
            "[&_.rdp-day:not(.rdp-day_outside)]:hover:bg-sidebar-accent",
            "[&_.rdp-day:not(.rdp-day_outside)]:hover:text-sidebar-accent-foreground"
          )}
          classNames={{
            day: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          }}
          modifiers={{
            lecture: datesByType.lecture,
            exam: datesByType.exam,
            homework: datesByType.homework,
            officeHours: datesByType["office-hours"],
            holiday: datesByType.holiday,
            project: datesByType.project,
            lab: datesByType.lab,
            reading: datesByType.reading,
          }}
          modifiersStyles={{
            lecture: getCalendarDayStyle("lecture", isDark),
            exam: getCalendarDayStyle("exam", isDark),
            homework: getCalendarDayStyle("homework", isDark),
            officeHours: getCalendarDayStyle("office-hours", isDark),
            holiday: getCalendarDayStyle("holiday", isDark),
            project: getCalendarDayStyle("project", isDark),
            lab: getCalendarDayStyle("lab", isDark),
            reading: getCalendarDayStyle("reading", isDark),
          }}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
