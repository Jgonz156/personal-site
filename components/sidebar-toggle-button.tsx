"use client"

import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarToggleButton({ className }: { className?: string }) {
  const { state, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div className={` ${isCollapsed ? "collapsed" : "expanded"}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="h-8 w-6 rounded-r-md border-t border-r border-b border-border bg-background hover:bg-accent shadow-sm transition-all duration-200"
        aria-label={isCollapsed ? "Show sidebar" : "Hide sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </Button>
    </div>
  )
}
