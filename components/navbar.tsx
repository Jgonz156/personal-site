"use client"

import React from "react"
import { Menu, Home, ChevronUp, ChevronDown, User } from "lucide-react"
import ThemeSwitcher from "./theme-switcher"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useNavbar } from "./navbar-context"

// Sample courses data
const courses = [
  { id: 1, code: "CS 101", name: "Introduction to Programming" },
  { id: 2, code: "CS 201", name: "Data Structures" },
  { id: 3, code: "CS 301", name: "Algorithms" },
]

export default function Navbar({ currentCourse = courses[0] }) {
  const { isCollapsed, toggleCollapsed } = useNavbar()
  const { toggleSidebar } = useSidebar()

  return (
    <div className="relative">
      {/* Collapsible Navbar */}
      <nav
        className={`bg-background transition-all duration-300 ease-in-out border-b border-border ${
          isCollapsed ? "h-0 overflow-hidden border-b-0" : "h-auto px-4 py-3"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="p-2"
              onClick={toggleSidebar}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-foreground hover:text-foreground/80"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Course Hub</span>
            </Button>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Course Selector */}
            <div className="relative">
              <select
                className="appearance-none bg-background border border-input rounded-md px-3 py-2 pr-8 text-sm font-medium text-foreground hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors cursor-pointer"
                defaultValue={currentCourse.id}
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

            {/* Theme Toggle */}
            <ThemeSwitcher />

            {/* Profile Avatar */}
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 border-0 hover:shadow-md transition-shadow"
              >
                <User className="w-5 h-5 text-primary-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Chevron Toggle Button */}
      <div className="absolute slide-out-to-bottom-0 right-3">
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
