"use client"

import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarToggleButton } from "@/components/sidebar-toggle-button"
import Navbar from "@/components/navbar"
import { useNavbar } from "./navbar-context"
import { useSidebar } from "@/components/ui/sidebar"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isCollapsed: navbarCollapsed } = useNavbar()
  const { state: sidebarState } = useSidebar()
  const sidebarCollapsed = sidebarState === "collapsed"

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 layout-grid ${
        navbarCollapsed ? "navbar-collapsed" : "navbar-expanded"
      } ${sidebarCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}
      style={{
        gridTemplateRows: navbarCollapsed ? "0px 1fr" : "auto 1fr",
        gridTemplateColumns: sidebarCollapsed ? "0px 1fr" : "auto 1fr",
      }}
    >
      <div className="col-span-2 w-full">
        <Navbar />
      </div>
      <div
        className={`sidebar-container ${sidebarCollapsed ? "collapsed" : ""}`}
      >
        <AppSidebar />
      </div>
      <main className="flex-1 overflow-auto h-full">{children}</main>
    </div>
  )
}
