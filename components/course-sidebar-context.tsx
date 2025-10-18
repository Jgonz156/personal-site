"use client"

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { usePathname } from "next/navigation"

interface CourseSidebarContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
  isMobile: boolean
}

const CourseSidebarContext = createContext<
  CourseSidebarContextType | undefined
>(undefined)

export function CourseSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close mobile sidebar when route changes
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  const toggleSidebar = () => {
    if (isMobile) {
      // On mobile, toggle the sheet
      setIsOpen(!isOpen)
    } else {
      // On desktop, toggle the collapse state
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <CourseSidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isCollapsed,
        setIsCollapsed,
        toggleSidebar,
        isMobile,
      }}
    >
      {children}
    </CourseSidebarContext.Provider>
  )
}

export function useCourseSidebar() {
  const context = useContext(CourseSidebarContext)
  if (context === undefined) {
    throw new Error(
      "useCourseSidebar must be used within a CourseSidebarProvider"
    )
  }
  return context
}
