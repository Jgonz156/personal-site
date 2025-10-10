"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

export interface PageSection {
  id: string
  title: string
  level?: number
}

interface NavbarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
  pageSections: PageSection[]
  setPageSections: (sections: PageSection[]) => void
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [pageSections, setPageSections] = useState<PageSection[]>([])

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed)

  return (
    <NavbarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        toggleCollapsed,
        pageSections,
        setPageSections,
      }}
    >
      {children}
    </NavbarContext.Provider>
  )
}

export function useNavbar() {
  const context = useContext(NavbarContext)
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider")
  }
  return context
}
