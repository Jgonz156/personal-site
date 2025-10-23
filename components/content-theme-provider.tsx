export type ContentType =
  | "homework"
  | "exam"
  | "lecture"
  | "activity"
  | "default"

interface ContentThemeProviderProps {
  contentType: ContentType
  children: React.ReactNode
}

/**
 * Content Theme Provider
 *
 * Server-side theme provider that applies color theming based on content type:
 * - homework: Green themed
 * - exam: Red themed
 * - lecture: Blue themed
 * - activity: Orange themed
 * - default: Purple themed (current theme)
 *
 * Uses a data attribute approach to avoid client-side flash
 */
export function ContentThemeProvider({
  contentType,
  children,
}: ContentThemeProviderProps) {
  return (
    <div data-content-theme={contentType} className="content-theme-wrapper">
      {children}
    </div>
  )
}
