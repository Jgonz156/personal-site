"use client"

import React from "react"
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
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import LandingNav from "@/components/landing-nav"
import Footer from "@/components/footer"
import { downloadResumePdf } from "@/components/resume-pdf"
import {
  professionalSummary,
  education,
  experience,
  teachingInterests,
  courseDevelopment,
  achievements,
  independentStudies,
  previousExperience,
  technicalSkills,
} from "@/lib/resume-data"

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
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-primary font-semibold">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground font-medium">
                      {edu.year}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.location}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">{edu.focus}</p>
                {edu.thesis && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    Thesis Area: {edu.thesis}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Briefcase className="h-8 w-8 mr-3 text-primary" />
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-primary font-semibold">
                      {exp.institution}
                    </p>
                  </div>
                  <div className="flex items-center text-muted-foreground font-medium">
                    <Calendar className="h-4 w-4 mr-2" />
                    {exp.period}
                  </div>
                </div>
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
              </div>
            ))}
          </div>
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

        {/* Research & Mentorship */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Users className="h-8 w-8 mr-3 text-primary" />
            Research & Mentorship
          </h2>
          <div className="space-y-6">
            {independentStudies.map((study, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">
                      {study.title}
                    </h3>
                    <p className="text-primary font-semibold">
                      {study.student}
                    </p>
                  </div>
                  <div className="flex items-center text-muted-foreground font-medium">
                    <Calendar className="h-4 w-4 mr-2" />
                    {study.period}
                  </div>
                </div>
                <p className="text-muted-foreground mb-2">{study.description}</p>
                {study.outcome && (
                  <p className="text-sm text-primary font-medium italic">
                    → {study.outcome}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Course Development */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <BookOpen className="h-8 w-8 mr-3 text-primary" />
            Course Development & Curriculum Design
          </h2>
          <div className="space-y-6">
            {courseDevelopment.map((course, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-card-foreground mb-3">
                  {course.course}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {course.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-foreground">
                    Key Achievements:
                  </p>
                  <ul className="space-y-2 ml-4">
                    {course.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-muted-foreground flex items-start text-sm"
                      >
                        <span className="text-primary mr-2 mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
