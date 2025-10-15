"use client"

import { useEffect } from "react"
import { useNavbar, PageSection } from "@/components/navbar-context"

interface MDXPageContentProps {
  children: React.ReactNode
  /**
   * Optional CSS class name that identifies special headers that should be
   * treated as top-level sections (level 0) in the navigation hierarchy.
   *
   * Example: "homework-section-header" for homework sections
   */
  topLevelSectionClass?: string
}

/**
 * Unified component for rendering MDX pages with automatic navigation extraction.
 * Works with any MDX page type (lectures, homeworks, exams, projects, activities, etc.)
 *
 * Features:
 * - Automatically extracts h2 and h3 headings for navigation
 * - Generates IDs for headings if not present
 * - Supports custom top-level sections via CSS class
 * - Clears navigation on unmount to prevent stale data
 */
export function MDXPageContent({
  children,
  topLevelSectionClass,
}: MDXPageContentProps) {
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

        // Determine the navigation level:
        // - Level 0: Special top-level sections (if topLevelSectionClass is provided and matches)
        // - Level 1: H2 headings (or all headings if no special class)
        // - Level 2: H3 headings
        let level: number

        if (
          topLevelSectionClass &&
          heading.classList.contains(topLevelSectionClass)
        ) {
          // This is a special top-level section
          level = 0
        } else {
          // Regular heading hierarchy
          level = heading.tagName === "H3" ? 2 : 1
        }

        sections.push({
          id: heading.id,
          title: heading.textContent || "",
          level,
        })
      })

      setPageSections(sections)
    }

    // Extract sections immediately
    extractSections()

    return () => {
      setPageSections([])
    }
  }, [setPageSections, topLevelSectionClass])

  return <>{children}</>
}
