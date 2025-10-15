"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Clock } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  getEventTypeForDate,
  getCalendarDayStyle,
  getEventsForDate,
  getEventTypeIcon,
  type CourseEvent,
} from "@/lib/course-data"
import { cn } from "@/lib/utils"

interface CourseCalendarProps {
  onDateSelect?: (date: Date) => void
}

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function CourseCalendar({ onDateSelect }: CourseCalendarProps) {
  const { theme, resolvedTheme } = useTheme()
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  )

  // Determine if dark mode is active
  const isDark = resolvedTheme === "dark" || theme === "dark"

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  // Generate calendar days
  const calendarDays = React.useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    const startingDayOfWeek = firstDay.getDay()

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    // Days from previous month
    const previousMonth = new Date(year, month, 0)
    const daysInPreviousMonth = previousMonth.getDate()

    const days: Array<{
      date: Date
      day: number
      isCurrentMonth: boolean
      isToday: boolean
      isSelected: boolean
    }> = []

    // Add previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPreviousMonth - i
      days.push({
        date: new Date(year, month - 1, day),
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      })
    }

    // Add current month's days
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      date.setHours(0, 0, 0, 0)

      const isToday = date.getTime() === today.getTime()
      const isSelected =
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()

      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday,
        isSelected: isSelected || false,
      })
    }

    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(year, month + 1, day),
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      })
    }

    return days
  }, [currentDate, selectedDate])

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <div className="p-3">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPreviousMonth}
              className="h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextMonth}
              className="h-7 w-7"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="text-center text-xs text-muted-foreground font-normal h-9 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dayInfo, index) => {
              const eventType = getEventTypeForDate(dayInfo.date)
              const events = getEventsForDate(dayInfo.date)
              const hasEvents = events.length > 0
              const eventStyle = eventType
                ? getCalendarDayStyle(eventType, isDark)
                : {}

              // If the day has events and is in current month, wrap in Popover
              if (hasEvents && dayInfo.isCurrentMonth) {
                return (
                  <Popover key={index}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => handleDateSelect(dayInfo.date)}
                        className={cn(
                          "h-9 w-9 p-0 font-normal text-sm transition-colors cursor-pointer",
                          dayInfo.isToday &&
                            "ring-2 ring-offset-1 ring-foreground/50",
                          dayInfo.isSelected &&
                            !eventType &&
                            "bg-primary text-primary-foreground",
                          eventType && "font-semibold"
                        )}
                        style={eventType ? eventStyle : {}}
                      >
                        {dayInfo.day}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="start">
                      <div className="p-4">
                        <h3 className="font-semibold mb-3 text-sm">
                          {MONTHS[dayInfo.date.getMonth()]} {dayInfo.day},{" "}
                          {dayInfo.date.getFullYear()}
                        </h3>
                        <div className="space-y-3">
                          {events.map((event) => (
                            <EventDetails key={event.id} event={event} />
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                )
              }

              // Regular button for days without events
              return (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleDateSelect(dayInfo.date)}
                  disabled={!dayInfo.isCurrentMonth}
                  className={cn(
                    "h-9 w-9 p-0 font-normal text-sm transition-colors",
                    !dayInfo.isCurrentMonth &&
                      "text-muted-foreground opacity-30",
                    dayInfo.isToday &&
                      "ring-2 ring-offset-1 ring-foreground/50",
                    dayInfo.isSelected &&
                      !eventType &&
                      "bg-primary text-primary-foreground",
                    eventType && "font-semibold"
                  )}
                  style={eventType ? eventStyle : {}}
                >
                  {dayInfo.day}
                </Button>
              )
            })}
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

// Component to display individual event details
function EventDetails({ event }: { event: CourseEvent }) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <span className="text-lg mt-0.5">{getEventTypeIcon(event.type)}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm leading-tight">{event.title}</h4>
            {event.contentUrl && (
              <Link
                href={event.contentUrl}
                className="text-primary hover:text-primary/80 transition-colors shrink-0"
                title="View content"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
          {event.dueTime && (
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{event.dueTime}</span>
            </div>
          )}
          {event.description && (
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              {event.description}
            </p>
          )}
          {event.standard && (
            <div className="mt-1.5">
              <span className="inline-block text-xs bg-muted px-2 py-0.5 rounded-md">
                {event.standard}
              </span>
            </div>
          )}
          {event.recordingUrls && event.recordingUrls.length > 0 && (
            <div className="mt-2 pt-2 border-t border-border/50">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Recordings:
              </p>
              <div className="flex flex-wrap gap-1">
                {event.recordingUrls.map((url, idx) => (
                  <Link
                    key={idx}
                    href={url}
                    className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-2 py-0.5 rounded transition-colors"
                  >
                    Recording {idx + 1}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Separator className="!mt-3" />
    </div>
  )
}
