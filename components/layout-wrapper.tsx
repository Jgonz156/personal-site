"use client"

import React from "react"
import { CourseSidebar } from "@/components/course-sidebar"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useCourseSidebar } from "./course-sidebar-context"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isOpen, setIsOpen, isCollapsed, setIsCollapsed } = useCourseSidebar()

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <CourseSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
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
