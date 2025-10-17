"use client"

import * as React from "react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Info } from "lucide-react"

export function CalendarLegend() {
  const legendItems = [
    { color: "bg-blue-500", label: "Lectures" },
    { color: "bg-red-500", label: "Exams" },
    { color: "bg-green-500", label: "Homework" },
    //{ color: "bg-purple-500", label: "Projects" },
    //{ color: "bg-teal-500", label: "Labs" },
    //{ color: "bg-orange-500", label: "Reading" },
    { color: "bg-gray-500", label: "Office Hours" },
    { color: "bg-yellow-500", label: "Holidays" },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground flex items-center gap-2">
        <Info className="h-4 w-4" />
        Color Guide
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 py-2 space-y-2">
          {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${item.color}`} />
              <span className="text-xs text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
