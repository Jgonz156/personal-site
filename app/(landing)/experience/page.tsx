"use client"

import React from "react"
import Link from "next/link"
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Code,
  Mail,
  Calendar,
  Lightbulb,
  Trophy,
  User,
  Download,
  Award,
  ChevronDown,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import LandingNav from "@/components/landing-nav"
import Footer from "@/components/footer"
import { downloadResumePdf } from "@/components/resume-pdf"
import {
  professionalSummary,
  education,
  experience,
  teachingInterests,
  achievements,
  previousExperience,
  technicalSkills,
  type ExperienceSubSection,
  type ExperienceSubItem,
} from "@/lib/resume-data"
import {
  transcript,
  generalEducation,
  type TranscriptCourse,
} from "@/lib/transcript-data"

function groupCoursesByTerm(
  courses: TranscriptCourse[]
): { term: string; courses: TranscriptCourse[] }[] {
  const groups: { term: string; courses: TranscriptCourse[] }[] = []
  for (const course of courses) {
    const existing = groups.find((g) => g.term === course.term)
    if (existing) {
      existing.courses.push(course)
    } else {
      groups.push({ term: course.term, courses: [course] })
    }
  }
  return groups
}

function GradeBadge({ grade }: { grade: string }) {
  const colorClass =
    grade === "A" || grade === "A-"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      : grade === "B+" || grade === "B" || grade === "B-"
        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
        : grade === "CR"
          ? "bg-muted text-muted-foreground border-border"
          : "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold border ${colorClass}`}
    >
      {grade}
    </span>
  )
}

function CourseCards({ courses }: { courses: TranscriptCourse[] }) {
  const expandable = courses.filter((c) => c.projects.length > 0)
  const static_ = courses.filter((c) => c.projects.length === 0)

  return (
    <div className="space-y-3">
      {expandable.length > 0 && (
        <Accordion type="multiple" className="space-y-3">
          {expandable.map((course, idx) => (
            <AccordionItem
              key={`${course.subject}-${course.courseNumber}-${course.title}-${idx}`}
              value={`${course.subject}-${course.courseNumber}-${idx}`}
              className="bg-muted/30 rounded-lg border border-border overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <CourseCardContent course={course} />
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3 pt-2">
                  {course.projects.map((project, pidx) => (
                    <div
                      key={pidx}
                      className="bg-card rounded-lg p-4 border border-border"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h5 className="font-semibold text-card-foreground">
                          {project.name}
                        </h5>
                        {project.link && (
                          <Link
                            href={project.link}
                            className="text-primary hover:text-primary/80 shrink-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {static_.map((course, idx) => (
        <div
          key={`${course.subject}-${course.courseNumber}-${course.title}-${idx}`}
          className="bg-muted/30 rounded-lg border border-border px-4 py-3"
        >
          <CourseCardContent course={course} />
        </div>
      ))}
    </div>
  )
}

function CourseCardContent({ course }: { course: TranscriptCourse }) {
  const projectSummary =
    course.projects.length > 0
      ? course.projects.map((p) => p.name).join(", ")
      : null

  return (
    <div className="w-full text-left">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-card-foreground text-sm">
            {course.subject} {course.courseNumber}: {course.title}
          </span>
          {course.crossLink && (
            <Link
              href={course.crossLink}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
            >
              Now teaching
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <GradeBadge grade={course.grade} />
          <span className="text-xs text-muted-foreground">
            {course.creditHours} cr
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
        {course.description}
      </p>
      {projectSummary && (
        <p className="text-xs text-primary mt-1 font-medium">
          Projects: {projectSummary}
        </p>
      )}
      {course.languages && course.languages.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {course.languages.map((lang) => (
            <span
              key={lang}
              className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-xs"
            >
              {lang}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function GeneralEducationSection() {
  const [isOpen, setIsOpen] = React.useState(false)
  const coursesWithProjects = generalEducation.filter(
    (c) => c.projects && c.projects.length > 0
  )
  const simpleCourses = generalEducation.filter(
    (c) => !c.projects || c.projects.length === 0
  )
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6">
      <CollapsibleTrigger className="w-full">
        <div className="bg-card rounded-lg px-6 py-4 shadow-md border border-border hover:shadow-lg transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold text-card-foreground">
              General Education & Liberal Arts
            </span>
            <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs font-medium">
              {generalEducation.length} courses
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-card rounded-b-lg border border-t-0 border-border px-6 py-4 shadow-md">
          {coursesWithProjects.length > 0 && (
            <Accordion type="multiple" className="mb-3">
              {coursesWithProjects.map((course, idx) => (
                <AccordionItem
                  key={`gen-ed-proj-${idx}`}
                  value={`gen-ed-proj-${idx}`}
                  className="bg-muted/30 rounded-lg border border-border mb-2"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="w-full text-left">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-card-foreground text-sm">
                            {course.subject} {course.courseNumber}:{" "}
                            {course.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <GradeBadge grade={course.grade} />
                          <span className="text-xs text-muted-foreground">
                            {course.term}
                          </span>
                        </div>
                      </div>
                      {course.description && (
                        <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                          {course.description}
                        </p>
                      )}
                      {course.projects && (
                        <p className="text-xs text-primary mt-1 font-medium">
                          Projects:{" "}
                          {course.projects.map((p) => p.name).join(", ")}
                        </p>
                      )}
                      {course.languages && course.languages.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {course.languages.map((lang) => (
                            <span
                              key={lang}
                              className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-xs"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3 pt-2">
                      {course.projects!.map((project, pidx) => (
                        <div
                          key={pidx}
                          className="bg-card rounded-lg p-4 border border-border"
                        >
                          <h5 className="font-semibold text-card-foreground mb-2">
                            {project.name}
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>
                          {project.technologies && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
          <div className="grid gap-2">
            {simpleCourses.map((course, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-1.5 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-card-foreground">
                    {course.subject} {course.courseNumber}:
                  </span>
                  <span className="text-muted-foreground">{course.title}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground">
                    {course.term}
                  </span>
                  <GradeBadge grade={course.grade} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function ExperienceSubSectionBlock({
  section,
}: {
  section: ExperienceSubSection
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {section.title}
        </span>
        <Separator className="flex-1" />
      </div>
      <Accordion type="multiple" className="space-y-2">
        {section.items.map((item, idx) => (
          <AccordionItem
            key={idx}
            value={`${section.title}-${idx}`}
            className="bg-muted/30 rounded-lg border border-border"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="w-full text-left">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                  <div>
                    <h4 className="font-semibold text-card-foreground">
                      {item.title}
                    </h4>
                    {item.subtitle && (
                      <p className="text-sm text-primary font-medium">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  {item.period && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {item.period}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3 pt-2">
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                {item.highlights && item.highlights.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1.5">
                      Key Achievements:
                    </p>
                    <ul className="space-y-1.5 ml-4">
                      {item.highlights.map((highlight, hidx) => (
                        <li
                          key={hidx}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <span className="text-primary mr-2 mt-0.5">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.outcome && (
                  <p className="text-sm text-primary font-medium italic">
                    &rarr; {item.outcome}
                  </p>
                )}
                {item.quotes && item.quotes.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1.5">
                      Student Feedback:
                    </p>
                    <div className="space-y-2 ml-4">
                      {item.quotes.map((quote, qidx) => (
                        <blockquote
                          key={qidx}
                          className="text-sm text-muted-foreground italic border-l-2 border-primary/40 pl-3"
                        >
                          &ldquo;{quote}&rdquo;
                        </blockquote>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50">
        <LandingNav />
      </div>

      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-4">
                Experience & Education
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                From building championship robots to redesigning core CS
                courses—here's my journey in education and technology.
              </p>
            </div>
            <div>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={downloadResumePdf}
              >
                <Download className="h-5 w-5" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Professional Summary */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 shadow-md border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              <User className="h-8 w-8 mr-3 text-primary" />
              About
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {professionalSummary}
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <GraduationCap className="h-8 w-8 mr-3 text-primary" />
            Education
          </h2>

          <Accordion type="multiple" className="space-y-6">
            {education.map((edu) => {
              const degreeData = transcript.find(
                (d) => d.id === edu.transcriptDegreeId
              )
              const coursesByTerm = degreeData
                ? groupCoursesByTerm(degreeData.courses)
                : []

              return (
                <AccordionItem
                  key={edu.transcriptDegreeId}
                  value={edu.transcriptDegreeId}
                  className="bg-card rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 w-full text-left pr-4">
                      <div>
                        <h3 className="text-xl font-bold text-card-foreground">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-primary font-semibold">
                          {edu.institution}
                        </p>
                        <p className="text-muted-foreground mt-1">
                          {edu.focus}
                        </p>
                        {edu.thesis && (
                          <p className="text-sm text-muted-foreground mt-1 italic">
                            Thesis: {edu.thesis}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full text-sm font-medium border border-primary/20">
                            GPA: {edu.gpa.toFixed(2)}
                          </span>
                          {edu.deansListSemesters && (
                            <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-0.5 rounded-full text-sm font-medium border border-amber-500/20">
                              Dean&apos;s List: {edu.deansListSemesters}{" "}
                              semesters
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-muted-foreground font-medium">
                          {edu.year}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.location}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6 pt-2">
                      {coursesByTerm.map(({ term, courses }) => (
                        <div key={term}>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              {term}
                            </span>
                            <Separator className="flex-1" />
                          </div>
                          <CourseCards courses={courses} />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>

          <GeneralEducationSection />
        </section>

        {/* Professional Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Briefcase className="h-8 w-8 mr-3 text-primary" />
            Professional Experience
          </h2>
          <Accordion type="multiple" className="space-y-6">
            {experience.map((exp) => (
              <AccordionItem
                key={exp.id}
                value={exp.id}
                className="bg-card rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 w-full text-left pr-4">
                    <div>
                      <h3 className="text-xl font-bold text-card-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-primary font-semibold">
                        {exp.institution}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exp.overview}
                      </p>
                      {exp.subSections && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {exp.subSections.map((section) => (
                            <span
                              key={section.title}
                              className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-medium border border-primary/20"
                            >
                              {section.title}: {section.items.length}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center text-muted-foreground font-medium">
                        <Calendar className="h-4 w-4 mr-2" />
                        {exp.period}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {exp.location}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-2">
                    <ul className="space-y-2 ml-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="text-muted-foreground flex items-start"
                        >
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.subSections?.map((section) => (
                      <ExperienceSubSectionBlock
                        key={section.title}
                        section={section}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Achievements & Competitions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Award className="h-8 w-8 mr-3 text-primary" />
            Achievements & Competitions
          </h2>
          <div className="space-y-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">
                      {achievement.title}
                    </h3>
                    <p className="text-lg text-primary font-semibold">
                      {achievement.organization}
                    </p>
                  </div>
                  <div className="flex items-center text-muted-foreground font-medium">
                    <Calendar className="h-4 w-4 mr-2" />
                    {achievement.period}
                  </div>
                </div>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>


        {/* Teaching Interests */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Lightbulb className="h-8 w-8 mr-3 text-primary" />
            Teaching & Research Interests
          </h2>
          <div className="bg-card rounded-lg p-8 shadow-md border border-border">
            <div className="flex flex-wrap gap-3">
              {teachingInterests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Trophy className="h-8 w-8 mr-3 text-primary" />
            Additional Experience
          </h2>
          <div className="space-y-4">
            {previousExperience.map((exp, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-primary font-semibold">
                      {exp.organization}
                    </p>
                  </div>
                  <p className="text-muted-foreground font-medium text-sm">
                    {exp.period}
                  </p>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Code className="h-8 w-8 mr-3 text-primary" />
            Technical Skills
          </h2>
          <div className="space-y-6">
            {Object.entries(technicalSkills).map(([category, skills]) => (
              <div
                key={category}
                className="bg-card rounded-lg p-6 shadow-md border border-border"
              >
                <h3 className="text-lg font-bold text-card-foreground mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-muted text-muted-foreground px-3 py-1 rounded-md font-medium text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-12">
          <Separator className="mb-8" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Let's Connect
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're a current student, prospective student, or fellow
            educator interested in course design and CS pedagogy, I'd love to
            hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => (window.location.href = "/about-me")}
            >
              <Mail className="h-5 w-5" />
              Get in Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={downloadResumePdf}
            >
              <Download className="h-5 w-5" />
              Download Resume
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
