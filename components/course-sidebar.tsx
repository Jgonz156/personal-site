"use client"

import React from "react"
import { BookOpen, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { CourseCalendar } from "@/components/course-calendar"
import { TodaySection } from "@/components/today-section"
import { UpcomingSection } from "@/components/upcoming-section"
import { CalendarLegend } from "@/components/calendar-legend"

interface CourseSidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  courseId?: string // Optional: filter events by course
}

export function CourseSidebar({
  isOpen,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
  courseId,
}: CourseSidebarProps) {
  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  // Mobile sidebar (uses Sheet)
  const MobileSidebar = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-[320px] p-0">
        <SheetHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <SheetTitle>Course Planner</SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>
        <div className="flex flex-col h-full overflow-y-auto pb-20">
          <CourseCalendar courseId={courseId} />
          <Separator className="my-4" />
          <CalendarLegend />
          <Separator className="my-4" />
          <TodaySection courseId={courseId} />
          <Separator className="my-4" />
          <UpcomingSection courseId={courseId} />
        </div>
      </SheetContent>
    </Sheet>
  )

  // Desktop sidebar (fixed position)
  const DesktopSidebar = () => (
    <div
      className={`hidden md:flex flex-col h-full bg-background border-r border-border transition-all duration-300 relative ${
        isCollapsed ? "w-0" : "w-80"
      }`}
    >
      {!isCollapsed && (
        <>
          <div className="h-16 border-b flex items-center justify-center px-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Course Planner</h2>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CourseCalendar courseId={courseId} />
            <Separator />
            <CalendarLegend />
            <Separator />
            <TodaySection courseId={courseId} />
            <Separator />
            <UpcomingSection courseId={courseId} />
          </div>
        </>
      )}

      {/* Toggle button - positioned on the right edge of the sidebar */}
      <Button
        variant="outline"
        size="icon"
        onClick={toggleCollapse}
        className="absolute top-32 -right-6 h-8 w-6 rounded-r-md bg-background shadow-md border-border z-10"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>
    </div>
  )

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  )
}
