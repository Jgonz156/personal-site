"use client"

import React, { useState } from "react"
import {
  Menu,
  Home,
  BookOpen,
  FileText,
  ChevronRight,
  X,
  Calendar,
  GraduationCap,
} from "lucide-react"
import ThemeSwitcher from "./theme-switcher"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useCourseSidebar } from "./course-sidebar-context"
import { useNavbar } from "./navbar-context"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [sectionsOpen, setSectionsOpen] = useState(true)
  const { pageSections } = useNavbar()
  const { toggleSidebar } = useCourseSidebar()
  const pathname = usePathname()

  // Extract current course from pathname
  const getCurrentCourse = () => {
    for (const course of courses) {
      if (pathname?.includes(`/${course.id}`)) {
        return course
      }
    }
    return courses[0]
  }

  const currentCourse = getCurrentCourse()
  const isCoursePage = pathname?.includes("/cmsi-")
  const isCourseHomePage =
    pathname === `/${currentCourse.id}` || pathname === `/${currentCourse.id}/`
  const isSyllabusPage = pathname?.includes("/syllabus")
  const isCheatSheetPage = pathname?.includes("/cheat-sheet")

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false) // Close drawer after navigation
    }
  }

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        {/* Left: Hamburger Menu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Center: Page Title or Course Code */}
        <div className="flex-1 text-center">
          {isCoursePage ? (
            <span className="text-sm font-semibold">{currentCourse.code}</span>
          ) : (
            <Link href="/" className="text-sm font-semibold">
              Course Hub
            </Link>
          )}
        </div>

        {/* Right: Theme Switcher */}
        <ThemeSwitcher />
      </div>

      {/* Mobile Navigation Drawer */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle>Navigation</SheetTitle>
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
            {/* Main Navigation */}
            <div className="px-6 space-y-2">
              {/* Home */}
              <Link href="/" onClick={handleNavClick}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  size="lg"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Button>
              </Link>

              {/* Course Planner (Sidebar) */}
              {isCoursePage && (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  size="lg"
                  onClick={() => {
                    toggleSidebar()
                    handleNavClick()
                  }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Course Planner</span>
                </Button>
              )}

              {/* Course-specific navigation */}
              {isCoursePage && (
                <>
                  {/* Course Home */}
                  <Link href={`/${currentCourse.id}`} onClick={handleNavClick}>
                    <Button
                      variant={isCourseHomePage ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3"
                      size="lg"
                    >
                      <GraduationCap className="w-5 h-5" />
                      <span>Course Home</span>
                    </Button>
                  </Link>

                  <Link
                    href={`/${currentCourse.id}/cheat-sheet`}
                    onClick={handleNavClick}
                  >
                    <Button
                      variant={isCheatSheetPage ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3"
                      size="lg"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Cheat Sheet</span>
                    </Button>
                  </Link>

                  <Link
                    href={`/${currentCourse.id}/syllabus`}
                    onClick={handleNavClick}
                  >
                    <Button
                      variant={isSyllabusPage ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3"
                      size="lg"
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>Syllabus</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Page Sections (if available) */}
            {pageSections.length > 0 && (
              <>
                <Separator className="my-4" />
                <Collapsible
                  open={sectionsOpen}
                  onOpenChange={setSectionsOpen}
                  className="px-6"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold">
                    <span>On This Page</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        sectionsOpen ? "rotate-90" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2">
                    {pageSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors ${
                          section.level === 2
                            ? "pl-6 text-muted-foreground"
                            : ""
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </>
            )}

            {/* Course Switcher */}
            {isCoursePage && (
              <>
                <Separator className="my-4" />
                <div className="px-6">
                  <label className="text-sm font-semibold mb-2 block">
                    Switch Course
                  </label>
                  <select
                    className="w-full bg-background border border-input rounded-md px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    value={currentCourse.id}
                    onChange={(e) => {
                      window.location.href = `/${e.target.value}`
                    }}
                  >
                    {courses.map((course) => (
                      <option
                        key={course.id}
                        value={course.id}
                        className="bg-background text-foreground"
                      >
                        {course.code} - {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
