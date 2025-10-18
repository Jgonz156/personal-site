"use client"

import React from "react"
import { CourseSidebar } from "@/components/course-sidebar"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCourseSidebar } from "./course-sidebar-context"
import { usePathname } from "next/navigation"

interface LayoutWrapperProps {
  children: React.ReactNode
}

// Available courses - must match the list in navbar.tsx
const courses = [
  { id: "cmsi-2820", code: "CMSI 2820", name: "Discrete Math for CS" },
  { id: "cmsi-3510", code: "CMSI 3510", name: "Operating Systems" },
  {
    id: "cmsi-5850",
    code: "CMSI 5850",
    name: "Programming Languages Foundations",
  },
]

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isOpen, setIsOpen, isCollapsed, setIsCollapsed } = useCourseSidebar()
  const pathname = usePathname()

  // Extract current course from pathname
  const getCurrentCourseId = () => {
    for (const course of courses) {
      if (pathname?.includes(`/${course.id}`)) {
        return course.id
      }
    }
    return undefined // No course detected
  }

  const currentCourseId = getCurrentCourseId()

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <CourseSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        courseId={currentCourseId}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  )
}
