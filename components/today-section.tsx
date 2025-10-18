"use client"

import * as React from "react"
import Link from "next/link"
import { CalendarDays } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  getTodaysEvents,
  getCourseTodaysEvents,
  getEventTypeColor,
  getEventTypeIcon,
} from "@/lib/course-data"
import { cn } from "@/lib/utils"

interface TodaySectionProps {
  courseId?: string // Optional: filter events by course
}

export function TodaySection({ courseId }: TodaySectionProps = {}) {
  // Use course-specific events if courseId provided, otherwise all events
  const todaysEvents = courseId
    ? getCourseTodaysEvents(courseId)
    : getTodaysEvents()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground flex items-center gap-2">
        <CalendarDays className="h-4 w-4" />
        Today
      </SidebarGroupLabel>
      <SidebarGroupContent>
        {todaysEvents.length === 0 ? (
          <div className="px-2 py-3 text-sm text-muted-foreground">
            No events scheduled for today
          </div>
        ) : (
          <SidebarMenu>
            {todaysEvents.map((event) => {
              const CardContent = (
                <div className="px-2 py-2 rounded-md hover:bg-sidebar-accent transition-colors">
                  <div className="flex items-start gap-2">
                    <span className="text-lg" title={event.type}>
                      {getEventTypeIcon(event.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full flex-shrink-0",
                            getEventTypeColor(event.type)
                          )}
                        />
                        <h4 className="text-sm font-medium truncate">
                          {event.title}
                        </h4>
                      </div>
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      {event.dueTime && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Due: {event.dueTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )

              return (
                <SidebarMenuItem key={event.id} className="mb-2">
                  {event.contentUrl ? (
                    <Link href={event.contentUrl} className="block">
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  )}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
