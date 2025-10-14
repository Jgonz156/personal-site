"use client"

import { useEffect } from "react"
import { useNavbar } from "@/components/navbar-context"

export default function Syllabus() {
  const { setPageSections } = useNavbar()

  useEffect(() => {
    // Clear sections immediately to prevent stale data from previous pages
    setPageSections([])

    // Set page sections for navigation
    setPageSections([
      { id: "course-information", title: "Course Information", level: 1 },
      { id: "course-description", title: "Course Description", level: 1 },
      { id: "learning-objectives", title: "Learning Objectives", level: 1 },
      { id: "required-materials", title: "Required Materials", level: 1 },
      { id: "grading-policy", title: "Grading Policy", level: 1 },
      { id: "course-topics", title: "Course Topics", level: 1 },
      { id: "policies", title: "Policies", level: 1 },
    ])

    return () => {
      setPageSections([])
    }
  }, [setPageSections])

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        CMSI 2820: Discrete Mathematics for CS
      </h1>
      <div className="space-y-6">
        <section id="course-information">
          <h2 className="text-2xl font-semibold mb-3">Course Information</h2>
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p>
              <strong>Instructor:</strong> Prof. Smith
            </p>
            <p>
              <strong>Email:</strong> prof.smith@university.edu
            </p>
            <p>
              <strong>Office Hours:</strong> Tuesday & Thursday, 3:00 PM - 5:00
              PM
            </p>
            <p>
              <strong>Class Time:</strong> Monday & Wednesday, 2:00 PM - 3:30 PM
            </p>
            <p>
              <strong>Location:</strong> Engineering Building, Room 201
            </p>
          </div>
        </section>

        <section id="course-description">
          <h2 className="text-2xl font-semibold mb-3">Course Description</h2>
          <p className="text-muted-foreground">
            This course provides a comprehensive introduction to discrete
            mathematics with applications to computer science. Topics include
            logic, number theory, set theory, functions, combinatorics, and
            graph theory. Students will develop mathematical reasoning skills
            essential for computer science, including proof techniques and
            problem-solving strategies.
          </p>
        </section>

        <section id="learning-objectives">
          <h2 className="text-2xl font-semibold mb-3">Learning Objectives</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              Apply logical reasoning and construct valid mathematical proofs
            </li>
            <li>
              Work with sets, functions, and relations to model computational
              problems
            </li>
            <li>Solve counting problems using combinatorial techniques</li>
            <li>Analyze properties of graphs and apply graph algorithms</li>
            <li>
              Understand number theory concepts including modular arithmetic
            </li>
            <li>
              Develop mathematical maturity for advanced computer science
              courses
            </li>
          </ul>
        </section>

        <section id="required-materials">
          <h2 className="text-2xl font-semibold mb-3">Required Materials</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Textbook:</strong> Discrete Mathematics and Its
              Applications (8th Edition) by Kenneth H. Rosen
            </li>
            <li>Access to online course materials via Canvas</li>
            <li>Graphing calculator or mathematical software (optional)</li>
          </ul>
        </section>

        <section id="grading-policy">
          <h2 className="text-2xl font-semibold mb-3">Grading Policy</h2>
          <div className="bg-muted/50 rounded-lg p-4">
            <table className="w-full">
              <tbody className="space-y-2">
                <tr className="border-b border-border">
                  <td className="py-2">Homework Assignments</td>
                  <td className="py-2 text-right font-semibold">30%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Labs</td>
                  <td className="py-2 text-right font-semibold">15%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Midterm Exam</td>
                  <td className="py-2 text-right font-semibold">20%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Final Project</td>
                  <td className="py-2 text-right font-semibold">20%</td>
                </tr>
                <tr>
                  <td className="py-2">Final Exam</td>
                  <td className="py-2 text-right font-semibold">15%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="course-topics">
          <h2 className="text-2xl font-semibold mb-3">
            Course Topics (Standards-Based)
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Logic:</strong> Propositional logic, truth tables, logical
              equivalence, predicates, and quantifiers
            </li>
            <li>
              <strong>Numbers:</strong> Number systems, modular arithmetic,
              divisibility, and prime numbers
            </li>
            <li>
              <strong>Set Theory:</strong> Set operations, Venn diagrams, power
              sets, and set identities
            </li>
            <li>
              <strong>Functions:</strong> Types of functions, composition,
              inverse functions, and cardinality
            </li>
            <li>
              <strong>Collections:</strong> Sequences, summations, and
              mathematical induction
            </li>
            <li>
              <strong>Combinatorics:</strong> Counting principles, permutations,
              combinations, and pigeonhole principle
            </li>
            <li>
              <strong>Graph Theory:</strong> Graph definitions, representations,
              traversal algorithms, and applications
            </li>
          </ol>
        </section>

        <section id="policies">
          <h2 className="text-2xl font-semibold mb-3">Policies</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Late Submission Policy
              </h3>
              <p>
                Late assignments will be accepted up to 48 hours after the due
                date with a 10% penalty per day. No submissions will be accepted
                after 48 hours.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Academic Integrity
              </h3>
              <p>
                All work must be your own. Collaboration is encouraged for
                understanding concepts, but code and written solutions must be
                produced independently. Plagiarism will result in disciplinary
                action.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Attendance</h3>
              <p>
                Regular attendance is expected. Missing more than 3 classes
                without valid reason may affect your participation grade.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
