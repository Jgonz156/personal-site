"use client"

import * as React from "react"
import { DateTime } from "luxon"
import { ChevronLeft, ChevronRight, ExternalLink, Clock, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { useIsMobile } from "@/hooks/use-mobile"

interface CourseCalendarProps {
  onDateSelect?: (date: DateTime) => void
  courseId?: string // Optional: filter events by course
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

export function CourseCalendar({
  onDateSelect,
  courseId,
}: CourseCalendarProps) {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const [currentDate, setCurrentDate] = React.useState(DateTime.now())
  const [selectedDate, setSelectedDate] = React.useState<DateTime | undefined>(
    DateTime.now()
  )
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dialogDate, setDialogDate] = React.useState<DateTime | null>(null)
  const [dialogEvents, setDialogEvents] = React.useState<CourseEvent[]>([])

  // Close dialog when route changes
  React.useEffect(() => {
    if (dialogOpen) {
      setDialogOpen(false)
    }
  }, [pathname])

  const handleDateSelect = (date: DateTime) => {
    setSelectedDate(date)
    if (onDateSelect) {
      onDateSelect(date)
    }
  }

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.minus({ months: 1 }).startOf("month"))
  }

  const goToNextMonth = () => {
    setCurrentDate(currentDate.plus({ months: 1 }).startOf("month"))
  }

  // Generate calendar days
  const calendarDays = React.useMemo(() => {
    const year = currentDate.year
    const month = currentDate.month

    // First day of the month
    const firstDay = DateTime.fromObject({ year, month, day: 1 })
    const startingDayOfWeek = firstDay.weekday % 7 // Luxon uses 1-7 (Mon-Sun), convert to 0-6 (Sun-Sat)

    // Last day of the month
    const daysInMonth = firstDay.daysInMonth || 31

    // Days from previous month
    const previousMonth = firstDay.minus({ months: 1 })
    const daysInPreviousMonth = previousMonth.daysInMonth || 31

    const days: Array<{
      date: DateTime
      day: number
      isCurrentMonth: boolean
      isToday: boolean
      isSelected: boolean
    }> = []

    // Add previous month's days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPreviousMonth - i
      days.push({
        date: DateTime.fromObject({
          year: previousMonth.year,
          month: previousMonth.month,
          day,
        }),
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      })
    }

    // Add current month's days
    const today = DateTime.now().startOf("day")

    for (let day = 1; day <= daysInMonth; day++) {
      const date = DateTime.fromObject({ year, month, day })

      const isToday = date.hasSame(today, "day")
      const isSelected =
        selectedDate &&
        date.day === selectedDate.day &&
        date.month === selectedDate.month &&
        date.year === selectedDate.year

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
    const nextMonth = firstDay.plus({ months: 1 })
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: DateTime.fromObject({
          year: nextMonth.year,
          month: nextMonth.month,
          day,
        }),
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
      })
    }

    return days
  }, [currentDate, selectedDate])

  return (
    <>
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
                {MONTHS[currentDate.month - 1]} {currentDate.year}
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
                // Filter events by courseId if provided
                const allEvents = getEventsForDate(dayInfo.date)
                const events = courseId
                  ? allEvents.filter((e) => e.courseId === courseId)
                  : allEvents
                const eventType = events.length > 0 ? events[0].type : null
                const hasEvents = events.length > 0
                const eventStyle = eventType
                  ? getCalendarDayStyle(eventType)
                  : undefined

                // Handle click for days with events
                const handleDayClick = () => {
                  handleDateSelect(dayInfo.date)
                  if (isMobile && hasEvents && dayInfo.isCurrentMonth) {
                    setDialogDate(dayInfo.date)
                    setDialogEvents(events)
                    setDialogOpen(true)
                  }
                }

                // If the day has events and is in current month on desktop, wrap in Popover
                if (hasEvents && dayInfo.isCurrentMonth && !isMobile) {
                  return (
                    <Popover key={index}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          onClick={handleDayClick}
                          className={cn(
                            "h-9 w-9 p-0 font-normal text-sm transition-colors cursor-pointer",
                            dayInfo.isToday &&
                              "ring-2 ring-offset-1 ring-foreground/50",
                            dayInfo.isSelected &&
                              !eventType &&
                              "bg-primary text-primary-foreground"
                          )}
                          style={eventStyle}
                        >
                          {dayInfo.day}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="start">
                        <div className="p-4">
                          <h3 className="font-semibold mb-3 text-sm">
                            {MONTHS[dayInfo.date.month - 1]} {dayInfo.day},{" "}
                            {dayInfo.date.year}
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

                // Regular button (for days without events or mobile with events)
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={handleDayClick}
                    disabled={!dayInfo.isCurrentMonth}
                    className={cn(
                      "h-9 w-9 p-0 font-normal text-sm transition-colors",
                      !dayInfo.isCurrentMonth &&
                        "text-muted-foreground opacity-30",
                      dayInfo.isToday &&
                        "ring-2 ring-offset-1 ring-foreground/50",
                      dayInfo.isSelected &&
                        !eventType &&
                        "bg-primary text-primary-foreground"
                    )}
                    style={eventStyle}
                  >
                    {dayInfo.day}
                  </Button>
                )
              })}
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Mobile Dialog for Event Details */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[90vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogDate && (
                <>
                  {MONTHS[dialogDate.month - 1]} {dialogDate.day},{" "}
                  {dialogDate.year}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {dialogEvents.map((event) => (
              <EventDetails key={event.id} event={event} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
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
                className="text-primary hover:text-primary/80 transition-colors shrink-0 p-2 -m-2 touch-manipulation"
                title="View content"
              >
                <ExternalLink className="h-4 w-4" />
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
          {event.recordings && event.recordings.length > 0 && (
            <div className="mt-2 pt-2 border-t border-border/50">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Recordings:
              </p>
              <div className="flex flex-wrap gap-2">
                {event.recordings.map((recording, idx) => (
                  <Link
                    key={idx}
                    href={recording.url}
                    className="text-xs bg-primary/10 text-primary hover:bg-primary/20 px-3 py-2 rounded transition-colors touch-manipulation min-h-[44px] flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {recording.name}
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
