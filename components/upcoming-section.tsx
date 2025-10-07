"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { getUpcomingHomeworkAndExams, getEventTypeColor, getEventTypeIcon } from "@/lib/course-data"
import { cn } from "@/lib/utils"

export function UpcomingSection() {
  const upcomingEvents = getUpcomingHomeworkAndExams(30)

  const formatDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const eventDate = new Date(date)
    eventDate.setHours(0, 0, 0, 0)
    
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays < 7) return `In ${diffDays} days`
    
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  const getDaysUntil = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const eventDate = new Date(date)
    eventDate.setHours(0, 0, 0, 0)
    
    const diffTime = eventDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Upcoming
      </SidebarGroupLabel>
      <SidebarGroupContent>
        {upcomingEvents.length === 0 ? (
          <div className="px-2 py-3 text-sm text-muted-foreground">
            No upcoming homework or exams
          </div>
        ) : (
          <SidebarMenu>
            {upcomingEvents.map((event) => {
              const daysUntil = getDaysUntil(event.date)
              const isUrgent = daysUntil <= 3
              
              return (
                <SidebarMenuItem key={event.id} className="mb-2">
                  <div
                    className={cn(
                      "px-2 py-2 rounded-md hover:bg-sidebar-accent transition-colors",
                      isUrgent && "border border-orange-500/30 bg-orange-500/5"
                    )}
                  >
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
                        <div className="flex items-center justify-between mt-1">
                          <p
                            className={cn(
                              "text-xs",
                              isUrgent
                                ? "text-orange-600 dark:text-orange-400 font-medium"
                                : "text-muted-foreground"
                            )}
                          >
                            {formatDate(event.date)}
                          </p>
                          {event.dueTime && (
                            <p className="text-xs text-muted-foreground">
                              {event.dueTime}
                            </p>
                          )}
                        </div>
                        {event.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

