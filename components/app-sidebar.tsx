import * as React from "react"
import { BookOpen } from "lucide-react"

import { CourseCalendar } from "@/components/course-calendar"
import { TodaySection } from "@/components/today-section"
import { UpcomingSection } from "@/components/upcoming-section"
import { CalendarLegend } from "@/components/calendar-legend"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" className="border-r" {...props}>
      <SidebarHeader className="h-16 border-b flex items-center justify-center">
        <div className="flex items-center gap-2 px-4">
          <BookOpen className="h-5 w-5 text-sidebar-primary" />
          <h2 className="font-semibold text-lg">Course Planner</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <CourseCalendar />
        <SidebarSeparator className="mx-0" />
        <CalendarLegend />
        <SidebarSeparator className="mx-0" />
        <TodaySection />
        <SidebarSeparator className="mx-0" />
        <UpcomingSection />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
