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
 * - Automatically extracts h2 headings and main QuestionBox components for navigation
 * - Uses IDs added by rehype-slug during MDX compilation
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
      const seenIds = new Set<string>()
      const headings = document.querySelectorAll(
        ".prose h2, .question-box"
      ) as NodeListOf<HTMLElement>

      headings.forEach((heading, index) => {
        // IDs are automatically added by rehype-slug during MDX compilation
        // Use the existing ID or generate a fallback if missing
        let id =
          heading.id ||
          heading.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") ||
          `section-${index}`

        // Ensure unique IDs by appending a counter if duplicate
        if (seenIds.has(id)) {
          let counter = 2
          while (seenIds.has(`${id}-${counter}`)) {
            counter++
          }
          id = `${id}-${counter}`
        }
        seenIds.add(id)

        // Determine the navigation level:
        // - Level 0: Special top-level sections (if topLevelSectionClass is provided and matches)
        // - Level 1: H2 headings and main QuestionBox components
        // - Sub-questions are skipped
        let level: number
        let title = heading.textContent || ""

        if (
          topLevelSectionClass &&
          heading.classList.contains(topLevelSectionClass)
        ) {
          // This is a special top-level section
          level = 0
        } else if (heading.classList.contains("question-box")) {
          // Only include main questions in navigation, skip sub-questions
          const questionType = heading.getAttribute("data-question-type")
          if (questionType !== "main") {
            // Skip sub-questions in navigation
            return
          }
          // Main question box - treat as level 1
          level = 1
          // Extract just the question ID for the title
          const qidElement = heading.querySelector('[class*="font-mono"]')
          title = qidElement?.textContent || heading.id.toUpperCase()
        } else {
          // H2 headings - treat as level 1
          level = 1
        }

        sections.push({
          id: id,
          title: title,
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
