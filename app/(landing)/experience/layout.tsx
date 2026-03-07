import type { Metadata } from "next"
import {
  personalInfo,
  professionalSummary,
  education,
  experience,
  achievements,
  previousExperience,
  teachingInterests,
  technicalSkills,
} from "@/lib/resume-data"

function buildJsonLd() {
  const occupations = experience.map((exp) => ({
    "@type": "Role",
    roleName: exp.title,
    startDate: exp.period.split(" - ")[0],
    description: [
      exp.overview,
      ...exp.responsibilities,
      ...(exp.subSections?.flatMap((section) =>
        section.items.flatMap((item) => [
          `[${section.title}] ${item.title}: ${item.description}`,
          ...(item.highlights?.map((h) => `  - ${h}`) ?? []),
          ...(item.quotes?.map((q) => `  Student feedback: "${q}"`) ?? []),
          ...(item.outcome ? [`  Outcome: ${item.outcome}`] : []),
        ])
      ) ?? []),
    ].join("\n"),
    "https://schema.org/memberOf": {
      "@type": "Organization",
      name: exp.institution,
      location: exp.location,
    },
  }))

  const alumniOf = education.map((edu) => ({
    "@type": "EducationalOrganization",
    name: edu.institution,
    location: edu.location,
    description: `${edu.degree} (${edu.year}) — ${edu.focus}${edu.thesis ? `. Thesis: ${edu.thesis}` : ""}. GPA: ${edu.gpa}${edu.deansListSemesters ? `. Dean's List: ${edu.deansListSemesters} semesters` : ""}`,
  }))

  const prevRoles = previousExperience.map((prev) => ({
    "@type": "Role",
    roleName: prev.role,
    description: prev.description,
    startDate: prev.period,
    "https://schema.org/memberOf": {
      "@type": "Organization",
      name: prev.organization,
    },
  }))

  const achievementList = achievements.map(
    (a) => `${a.title} (${a.organization}, ${a.period}): ${a.description}`
  )

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: professionalSummary,
    worksFor: {
      "@type": "EducationalOrganization",
      name: personalInfo.institution,
      location: personalInfo.location,
    },
    alumniOf,
    hasOccupation: [...occupations, ...prevRoles],
    knowsAbout: teachingInterests,
    skills: Object.entries(technicalSkills).flatMap(([, skills]) => skills),
    award: achievementList,
  }
}

export const metadata: Metadata = {
  title: "Experience & Education — Julian Gonzalez",
  description: professionalSummary,
  other: {
    "application-ld+json": JSON.stringify(buildJsonLd()),
  },
}

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />
      {children}
    </>
  )
}
