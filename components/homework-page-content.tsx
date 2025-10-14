"use client"

import { useEffect } from "react"
import { useNavbar, PageSection } from "@/components/navbar-context"

interface HomeworkPageContentProps {
  children: React.ReactNode
}

export function HomeworkPageContent({ children }: HomeworkPageContentProps) {
  const { setPageSections } = useNavbar()

  useEffect(() => {
    // Clear sections immediately to prevent stale data from previous pages
    setPageSections([])

    // Extract headings from the page to build navigation
    const extractSections = () => {
      const sections: PageSection[] = []
      const headings = document.querySelectorAll(
        ".prose h2, .prose h3"
      ) as NodeListOf<HTMLHeadingElement>

      headings.forEach((heading, index) => {
        // Create an ID if it doesn't exist
        if (!heading.id) {
          const id = heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
          heading.id = id || `section-${index}`
        }

        // Homework section headers get level 0 (top-level sections)
        // Regular content headers get level 1 (h2) or level 2 (h3)
        const isHomeworkSection = heading.classList.contains(
          "homework-section-header"
        )

        sections.push({
          id: heading.id,
          title: heading.textContent || "",
          level: isHomeworkSection ? 0 : heading.tagName === "H3" ? 2 : 1,
        })
      })

      setPageSections(sections)
    }

    // Extract sections immediately
    extractSections()

    return () => {
      setPageSections([])
    }
  }, [setPageSections])

  return <>{children}</>
}
