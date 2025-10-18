import { ReactNode } from "react"
import Link from "next/link"

interface LectureIntroProps {
  title: string
  lectureDate: string
  standard: string
  topics: string[]
  description?: string
  recordingUrls?: { name: string; url: string }[]
}

export function LectureIntro({
  title,
  lectureDate,
  standard,
  topics,
  description,
  recordingUrls = [],
}: LectureIntroProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground">Standard: {standard}</p>
      </div>

      {/* Lecture Details Card */}
      <div className="border-2 border-blue-500/30 bg-blue-500/5 rounded-lg p-6 space-y-4">
        {/* Description */}
        {description && (
          <p className="text-base text-foreground leading-relaxed">
            {description}
          </p>
        )}

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Lecture Date
            </h3>
            <p className="text-base">📅 {lectureDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">
              Standard
            </h3>
            <p className="text-base">{standard}</p>
          </div>
        </div>

        {/* Topics */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Topics Covered
          </h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Recordings Section */}
        {recordingUrls.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              📹 Lecture Recordings
            </h3>
            <div className="space-y-2">
              {recordingUrls.map((recording, index) => (
                <Link
                  key={index}
                  href={recording.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
                    🎥 {recording.name}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface LectureNotesProps {
  children: ReactNode
}

export function LectureNotes({ children }: LectureNotesProps) {
  return (
    <div className="border-2 border-blue-500/30 bg-blue-500/5 rounded-lg p-6 my-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📝 Lecture Notes
      </h2>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  )
}

interface LectureResourcesProps {
  children: ReactNode
}

export function LectureResources({ children }: LectureResourcesProps) {
  return (
    <div className="border-2 border-purple-500/30 bg-purple-500/5 rounded-lg p-6 my-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📚 Additional Resources
      </h2>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  )
}
