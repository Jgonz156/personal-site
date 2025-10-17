"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface PageSection {
  id: string
  title: string
  level?: number // 1 for h2, 2 for h3, etc.
}

interface PageNavigationProps {
  sections: PageSection[]
  onSectionClick?: (sectionId: string) => void
}

export default function PageNavigation({
  sections,
  onSectionClick,
}: PageNavigationProps) {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const [activeSection, setActiveSection] = React.useState<string>("")
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    onSectionClick?.(sectionId)
  }

  // Track scroll position to highlight active section
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section.id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  if (sections.length === 0) return null

  return (
    <div className="border-b border-border bg-background">
      <div className="px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            On this page:
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            className="h-8 w-8 flex-shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex items-center gap-2 w-max">
              {sections.map((section, index) => {
                const isTopLevelSection = section.level === 0

                return (
                  <Button
                    key={`${section.id}-${index}`}
                    variant={
                      activeSection === section.id ? "secondary" : "ghost"
                    }
                    size="sm"
                    onClick={() => handleSectionClick(section.id)}
                    className={`whitespace-nowrap text-xs ${
                      isTopLevelSection
                        ? "font-semibold border border-primary/30"
                        : ""
                    }`}
                  >
                    {section.title}
                  </Button>
                )
              })}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            className="h-8 w-8 flex-shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
