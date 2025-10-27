"use client"

import React from "react"
import {
  Menu,
  Home,
  ChevronUp,
  ChevronDown,
  BookOpen,
  FileText,
  Settings,
  GraduationCap,
} from "lucide-react"
import ThemeSwitcher from "./theme-switcher"
import MobileNav from "./mobile-nav"
import { Button } from "@/components/ui/button"
import { useCourseSidebar } from "./course-sidebar-context"
import { useNavbar } from "./navbar-context"
import PageNavigation from "./page-navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Available courses - update this list when adding new courses
const courses = [
  { id: "cmsi-2820", code: "CMSI 2820", name: "Discrete Math for CS" },
  { id: "cmsi-3510", code: "CMSI 3510", name: "Operating Systems" },
  {
    id: "cmsi-5850",
    code: "CMSI 5850",
    name: "Programming Languages Foundations",
  },
]

export default function Navbar() {
  const { isCollapsed, toggleCollapsed, pageSections } = useNavbar()
  const { toggleSidebar } = useCourseSidebar()
  const pathname = usePathname()

  // Extract current course from pathname
  const getCurrentCourse = () => {
    for (const course of courses) {
      if (pathname?.includes(`/${course.id}`)) {
        return course
      }
    }
    return courses[0] // Default to first course
  }

  const currentCourse = getCurrentCourse()
  const isCoursePage = pathname?.includes("/cmsi-")

  // Determine active page
  const isCourseHomePage =
    pathname === `/${currentCourse.id}` || pathname === `/${currentCourse.id}/`
  const isSyllabusPage = pathname?.includes("/syllabus")
  const isCheatSheetPage = pathname?.includes("/cheat-sheet")

  return (
    <div className="relative">
      {/* Mobile Navigation - Shows on small screens */}
      <MobileNav />

      {/* Desktop Navigation - Shows on medium+ screens */}
      <nav
        className={`hidden md:block bg-background transition-all duration-300 ease-in-out border-b border-border ${
          isCollapsed ? "h-0 overflow-hidden border-b-0" : "h-auto"
        }`}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center space-x-2">
              {/* Sidebar Toggle (Course Planner) */}
              {isCoursePage && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2"
                  onClick={toggleSidebar}
                  title="Toggle Course Planner"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}

              {/* Landing Page Link */}
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Button>
              </Link>

              {/* Course-specific buttons (only show in course pages) */}
              {isCoursePage && (
                <>
                  {/* Course Home Link */}
                  <Link href={`/${currentCourse.id}`}>
                    <Button
                      variant={isCourseHomePage ? "secondary" : "ghost"}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span className="hidden sm:inline">Course</span>
                    </Button>
                  </Link>

                  <Link href={`/${currentCourse.id}/cheat-sheet`}>
                    <Button
                      variant={isCheatSheetPage ? "secondary" : "ghost"}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span className="hidden sm:inline">Cheat Sheet</span>
                    </Button>
                  </Link>
                  <Link href={`/${currentCourse.id}/syllabus`}>
                    <Button
                      variant={isSyllabusPage ? "secondary" : "ghost"}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="hidden sm:inline">Syllabus</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-2">
              {/* Course Switcher */}
              {isCoursePage && (
                <div className="relative">
                  <select
                    className="appearance-none bg-background border border-input rounded-md px-3 py-2 pr-8 text-sm font-medium text-foreground hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors cursor-pointer"
                    value={currentCourse.id}
                    onChange={(e) => {
                      // Navigate to the selected course
                      window.location.href = `/${e.target.value}`
                    }}
                  >
                    {courses.map((course) => (
                      <option
                        key={course.id}
                        value={course.id}
                        className="bg-background text-foreground"
                      >
                        {course.code}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Site Settings (Theme Toggle) */}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navbar - Page-Specific Navigation (Desktop only) */}
      {!isCollapsed && pageSections.length > 0 && (
        <div className="hidden md:block">
          <PageNavigation sections={pageSections} />
        </div>
      )}

      {/* Chevron Toggle Button (Desktop only) */}
      <div className="hidden md:block absolute slide-out-to-bottom-0 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className="p-1 h-auto rounded-b-md border-l border-r border-b border-border bg-background hover:bg-accent"
          aria-label={isCollapsed ? "Show navbar" : "Hide navbar"}
        >
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
