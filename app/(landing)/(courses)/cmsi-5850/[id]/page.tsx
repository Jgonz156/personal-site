import { ContentPage } from "../../shared/content-page"
import {
  getContentTypeFromId,
  getItemNumberFromId,
  deriveContentTypeCounts,
  CONTENT_TYPE_CONFIG,
} from "@/lib/content-types"

// Define the type for params (Next.js 13+ App Router)
type PageProps = {
  params: Promise<{ id: string }>
}

const COURSE_ID = "cmsi-5850"

// Generic function to dynamically import MDX content
async function loadMDXContent(folder: string, prefix: string, itemNumber: number) {
  try {
    const MDXContent = await import(
      `@/content/${COURSE_ID}/${folder}/${prefix}${itemNumber}.mdx`
    ).then((mod) => mod.default)
    return MDXContent
  } catch (error) {
    console.error(`MDX file not found:`, error)
    return null
  }
}

export default async function CoursePage({ params }: PageProps) {
  const { id } = await params

  // Get content type config
  const contentType = getContentTypeFromId(id)
  if (!contentType) {
    return <ContentPage courseId={COURSE_ID} id={id} />
  }

  // Get item number
  const itemNumber = getItemNumberFromId(id)
  if (itemNumber === null) {
    return <ContentPage courseId={COURSE_ID} id={id} />
  }

  // Load MDX content
  const MDXContent = await loadMDXContent(
    contentType.folder,
    contentType.prefix,
    itemNumber
  )

  return (
    <ContentPage courseId={COURSE_ID} id={id}>
      {MDXContent && <MDXContent />}
    </ContentPage>
  )
}

// Generate static params for all content types
export async function generateStaticParams() {
  const counts = deriveContentTypeCounts(COURSE_ID)
  const allParams: { id: string }[] = []

  for (const config of Object.values(CONTENT_TYPE_CONFIG)) {
    const total = counts[config.prefix] || 0
    if (total > 0) {
      const params = Array.from(
        { length: total - config.minNumber + 1 },
        (_, i) => ({
          id: `${config.prefix}${i + config.minNumber}`,
        })
      )
      allParams.push(...params)
    }
  }

  return allParams
}
