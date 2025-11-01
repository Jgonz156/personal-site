import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, GraduationCap } from "lucide-react"

interface HomeworkIntroProps {
  title: string
  dueDate: string
  dueTime: string
  topics: string[]
  description: string
}

export function HomeworkIntro({
  title,
  dueDate,
  dueTime,
  topics,
  description,
}: HomeworkIntroProps) {
  return (
    <div className="not-prose mb-8 space-y-4">
      <div className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Due Date:</span>
            <span className="text-muted-foreground">{dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Due Time:</span>
            <span className="text-muted-foreground">{dueTime}</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Topics Covered:</h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="text-muted-foreground">{description}</div>
      </div>
    </div>
  )
}

interface SectionHeaderProps {
  title: string
  points: number
  icon?: string
}

export function SectionHeader({ title, points, icon }: SectionHeaderProps) {
  // Generate a stable ID from the title
  const sectionId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  return (
    <div className="not-prose flex items-center justify-between mb-4 pb-2 border-b-2 border-primary">
      <h2
        id={sectionId}
        className="homework-section-header text-2xl font-bold flex items-center gap-2"
      >
        {icon && <span className="text-3xl">{icon}</span>}
        {title}
      </h2>
      <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold">
        {points} {points === 1 ? "point" : "points"}
      </div>
    </div>
  )
}

interface WrittenSectionProps {
  points: number
  children: ReactNode
  brightspaceUrl?: string
}

export function WrittenSection({
  points,
  children,
  brightspaceUrl,
}: WrittenSectionProps) {
  return (
    <div className="mb-8">
      <SectionHeader title="Written Section" points={points} icon="📝" />
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
      {brightspaceUrl && (
        <div className="not-prose mt-4">
          <Button asChild variant="default" size="lg">
            <a href={brightspaceUrl} target="_blank" rel="noopener noreferrer">
              <GraduationCap className="w-4 h-4 mr-2" />
              Submit to Brightspace
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}

interface ProgrammingSectionProps {
  points: number
  description?: string
  children?: ReactNode
  githubRepoUrl?: string
  githubClassroomUrl?: string
  brightspaceUrl?: string
}

export function ProgrammingSection({
  points,
  description,
  children,
  githubRepoUrl,
  githubClassroomUrl,
  brightspaceUrl,
}: ProgrammingSectionProps) {
  return (
    <div className="mb-8">
      <SectionHeader title="Programming Section" points={points} icon="💻" />

      {/* Description (if provided as prop) */}
      {description && (
        <div className="not-prose mb-4">
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}

      {/* MDX Content (if provided as children) */}
      {children && (
        <div className="prose prose-neutral dark:prose-invert max-w-none mb-4">
          {children}
        </div>
      )}

      {/* Action Buttons */}
      <div className="not-prose flex flex-wrap gap-3">
        {githubClassroomUrl && (
          <Button asChild variant="default" size="lg">
            <a
              href={githubClassroomUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              Accept GitHub Classroom Assignment
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        )}

        {githubRepoUrl && (
          <Button asChild variant="outline" size="lg">
            <a href={githubRepoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View Repository
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        )}

        {brightspaceUrl && (
          <Button asChild variant="default" size="lg">
            <a href={brightspaceUrl} target="_blank" rel="noopener noreferrer">
              <GraduationCap className="w-4 h-4 mr-2" />
              Submit to Brightspace
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

interface ReadingSectionProps {
  points?: number
  children: ReactNode
}

export function ReadingSection({
  points = 0,
  children,
}: ReadingSectionProps) {
  return (
    <div className="mb-8">
      <SectionHeader title="Reading Section" points={points} icon="📚" />
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  )
}

interface OptionalSectionProps {
  points: number
  children: ReactNode
  brightspaceUrl?: string
}

export function OptionalSection({
  points,
  children,
  brightspaceUrl,
}: OptionalSectionProps) {
  return (
    <div className="mb-8">
      <SectionHeader title="Optional Section" points={points} icon="⭐" />
      <div className="prose prose-neutral dark:prose-invert max-w-none bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border-2 border-amber-200 dark:border-amber-900">
        {children}
      </div>
      {brightspaceUrl && (
        <div className="not-prose mt-4">
          <Button asChild variant="default" size="lg">
            <a href={brightspaceUrl} target="_blank" rel="noopener noreferrer">
              <GraduationCap className="w-4 h-4 mr-2" />
              Submit Extra Credit to Brightspace
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
