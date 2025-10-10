"use client"

import { useEffect } from "react"
import { useNavbar, PageSection } from "@/components/navbar-context"

interface LectureNotePageContentProps {
  children: React.ReactNode
}

export function LectureNotePageContent({
  children,
}: LectureNotePageContentProps) {
  const { setPageSections } = useNavbar()

  useEffect(() => {
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

        sections.push({
          id: heading.id,
          title: heading.textContent || "",
          level: heading.tagName === "H3" ? 2 : 1,
        })
      })

      setPageSections(sections)
    }

    // Small delay to ensure content is rendered
    const timer = setTimeout(extractSections, 100)

    return () => {
      clearTimeout(timer)
      setPageSections([])
    }
  }, [setPageSections])

  return <>{children}</>
}
