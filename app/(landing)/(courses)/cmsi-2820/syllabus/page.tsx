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
      { id: "learning-outcomes", title: "Learning Outcomes", level: 1 },
      { id: "required-materials", title: "Required Materials", level: 1 },
      {
        id: "grading-system",
        title: "Grading & Standards-Based System",
        level: 1,
      },
      { id: "assignments-policies", title: "Assignments & Policies", level: 1 },
      {
        id: "student-responsibilities",
        title: "Student Responsibilities",
        level: 1,
      },
    ])

    return () => {
      setPageSections([])
    }
  }, [setPageSections])

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        CMSI 2820: Discrete Mathematics for Computer Science
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Loyola Marymount University | Fall 2025
      </p>

      <div className="space-y-6">
        <section id="course-information">
          <h2 className="text-2xl font-semibold mb-3">Course Information</h2>
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p>
              <strong>Instructor:</strong> Professor Julian Gonzalez
            </p>
            <p>
              <strong>Office:</strong> Foley Annex 139
            </p>
            <p>
              <strong>Email:</strong> Julian.Gonzalez@lmu.edu
            </p>
            <p>
              <strong>Office Hours:</strong> Monday & Wednesday, 2:00 PM - 5:00
              PM
            </p>
            <p>
              <strong>Prerequisites:</strong> CMSI 1010 or ENGR 160 or ENGR 1200
            </p>
            <div className="pt-2">
              <p className="font-semibold mb-2">Sections:</p>
              <div className="pl-4 space-y-1">
                <p>
                  <strong>Section 1:</strong> Pereira 207, 9:55 AM – 11:35 AM
                </p>
                <p>
                  <strong>Section 2:</strong> Pereira 207, 6:00 PM – 7:40 PM
                </p>
              </div>
            </div>
            <p className="pt-2 text-sm">
              Email is the preferred contact method. If my office door is open,
              feel free to stop by.
            </p>
          </div>
        </section>

        <section id="course-description">
          <h2 className="text-2xl font-semibold mb-3">Course Description</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              This 4-unit course combines discrete mathematics theory with
              practical application in Python. Topics include Intuitionistic
              Propositional and Predicate Logic, Number Theory, Type Theory,
              Combinatorics, Graph Theory, Set Theory, and other concepts
              relevant to the Discrete Foundations of Computer Science.
            </p>
            <p>
              This course meets in person in a synchronous, lecture-based
              format. Recordings of all lectures will be uploaded to the course
              site for asynchronous access, typically after class. You are
              encouraged to ask questions at any time during lectures.
            </p>
            <p>
              Coursework consists of written and programming assignments, as
              well as optional creative projects and optional midterm and final
              assessments for additional credit. Collaboration is encouraged,
              but all submitted work must be your own original work. If you work
              with others or use outside sources, cite them appropriately so I
              can accurately assess each student's understanding.
            </p>
            <p>
              This 4-unit course requires a minimum of 12 hours of work per
              week, in accordance with University policy. I encourage students
              to work consistently in manageable segments ("chiseling") to avoid
              last-minute stress. Homework assignments include checkpoints to
              help track progress and reinforce understanding.
            </p>
          </div>
        </section>

        <section id="learning-outcomes">
          <h2 className="text-2xl font-semibold mb-3">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">
            This course aims to provide a rigorous foundation in the mathematics
            underlying Computer Science. Many of the common problems you will
            solve and need to represent both conceptually and in code have
            distinct patterns. While the course may not cover all topics in
            depth, you will develop the following core competencies:
          </p>
          <ol className="list-decimal list-outside ml-6 space-y-3 text-muted-foreground">
            <li>
              Understand the fundamentals of{" "}
              <strong>Intuitionistic Logic</strong>, including differences from
              Classical Logic, and its applications in propositional and
              predicative reasoning, higher-order extensions, and its
              relationship to Type Theory.
            </li>
            <li>
              Explore <strong>Boolean numbers</strong> and their role in
              computer logic, Venn diagrams, natural numbers, algebraic
              properties of operations (commutativity, associativity), and
              arithmetic operations such as modular arithmetic and integer
              division.
            </li>
            <li>
              Examine fundamental <strong>collection types</strong>, including
              sets and tuples, their operations (union, intersection, powerset,
              Cartesian product), and the representation of relationships
              through set membership.
            </li>
            <li>
              Study <strong>functions</strong> in the context of the Lambda
              Calculus and typed lambda calculus, including their reductions
              (Alpha, Beta, Gamma) and comparison to set-theoretic functions.
            </li>
            <li>
              Investigate <strong>combinatorics</strong>, including
              combinations, permutations, factorial algebra, tetration, the
              pigeonhole principle, and inductive proof techniques.
            </li>
            <li>
              Develop a strong understanding of <strong>graph theory</strong>,
              covering simple and directed graphs, trees, paths, cycles,
              connectivity, and graph isomorphisms, and apply these concepts to
              solve complex problems such as the traveling salesman problem and
              minimum spanning trees.
            </li>
            <li>
              Recognize how previous concepts are reinterpreted through{" "}
              <strong>Set Theory versus Type Theory</strong>.
            </li>
            <li>
              Apply <strong>Python</strong> to analyze, solve, and engage with
              discrete mathematics problems and algorithmic techniques.
            </li>
          </ol>
        </section>

        <section id="required-materials">
          <h2 className="text-2xl font-semibold mb-3">Required Materials</h2>
          <p className="text-muted-foreground mb-3">
            This course does not require students to purchase textbooks,
            subscriptions, paid web tools, or lab fees. You will need:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>A laptop/desktop with unrestricted terminal access</li>
            <li>Python 3 and an IDE (e.g., VSCode)</li>
            <li>Reliable internet access</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            All reading materials, including textbooks, articles, videos, and
            other media, will be available on the course site.
          </p>
        </section>

        <section id="grading-system">
          <h2 className="text-2xl font-semibold mb-3">
            Grading & Standards-Based System
          </h2>
          <p className="text-muted-foreground mb-4">
            This course uses a standards-based grading system. Grades are earned
            additively rather than averaged. You can recover points later if
            needed, ensuring early struggles do not lock in a lower grade.
          </p>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="font-semibold mb-3">Course Structure</p>
            <p className="text-sm text-muted-foreground mb-3">
              The course is divided into six standards (modules), each worth 80
              points (total: 480). Assignments are organized as follows:
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 text-left font-semibold">Standard</th>
                  <th className="py-2 text-left font-semibold">Assignments</th>
                  <th className="py-2 text-right font-semibold">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2">Syllabus</td>
                  <td className="py-2">HW0 (3 pts), EX S0 (2 pts)</td>
                  <td className="py-2 text-right">5 (bonus)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Logic</td>
                  <td className="py-2">HW1 (100 pts)</td>
                  <td className="py-2 text-right">80 needed</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Numbers</td>
                  <td className="py-2">HW2 (100 pts), OHW1 (20 pts)</td>
                  <td className="py-2 text-right">80 needed</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Collections</td>
                  <td className="py-2">HW3 (100 pts), OHW2 (20 pts)</td>
                  <td className="py-2 text-right">80 needed</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Functions</td>
                  <td className="py-2">HW4 (100 pts), OHW3 (20 pts)</td>
                  <td className="py-2 text-right">80 needed</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Combinatorics</td>
                  <td className="py-2">HW5 (100 pts), OHW4 (20 pts)</td>
                  <td className="py-2 text-right">80 needed</td>
                </tr>
                <tr>
                  <td className="py-2">Graph Theory</td>
                  <td className="py-2">HW6 (100 pts), OHW5 (20 pts)</td>
                  <td className="py-2 text-right">80 needed</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-muted-foreground mt-3">
              Optional exams (Midterm, Final) provide additional opportunities
              to recover points in earlier standards.
            </p>
          </div>
        </section>

        <section id="assignments-policies">
          <h2 className="text-2xl font-semibold mb-3">
            Assignments & Policies
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Homework</h3>
              <p className="text-muted-foreground">
                Each standard has a primary homework (HW) and an optional
                homework (OHW) targeting the previous standard. Homeworks are
                broken down into two major areas: <strong>written</strong> and{" "}
                <strong>programming</strong>. The written portion will consist
                of theoretical problems that are best solved on paper. The
                programming portion will be distributed as a Python skeleton
                that must be completed to pass a series of unit tests that
                require applying our theory into practice. All homework,
                optional or otherwise, is due on Fridays.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Unexcused Extensions
              </h3>
              <p className="text-muted-foreground">
                Automatic, unexcused extensions are available: turning in one
                portion of the Homework (written or programming) on Saturday
                results in a 5pt deduction. Turning in a portion on Sunday gives
                you the previous 5-point penalty and an additional 10-point
                deduction. Submitting a portion after Sunday without an excuse
                results in the loss of all points.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Excused Extensions
              </h3>
              <p className="text-muted-foreground">
                Medical or personal emergencies can receive additional
                extensions with email communication requesting it.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Exams</h3>
              <p className="text-muted-foreground">
                The Midterm and Final are optional. They provide focused
                opportunities to boost scores in prior standards. If you have
                reached the point total required to pass a standard (80pts),
                then they are optional.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Submission</h3>
              <p className="text-muted-foreground">
                Assignments and exams are submitted through Brightspace. Grades
                and private materials will be posted there as well.
              </p>
            </div>
          </div>
        </section>

        <section id="student-responsibilities">
          <h2 className="text-2xl font-semibold mb-3">
            Student Responsibilities
          </h2>
          <p className="text-muted-foreground mb-4">
            This section summarizes the University rules that relate to this
            course and our in-person classroom environment.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Academic Honesty Policy
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "Loyola Marymount University is a community dedicated to
                academic excellence. Academic honesty in scholarship and
                creative work stands at the center of LMU's academic life, and
                is essential for true learning and creation of knowledge to take
                place. As a university in the Jesuit and Marymount traditions,
                this community expects its members to act in accordance with the
                highest standards of honesty and ethics at all times. Violations
                of academic honesty undermine the fundamental educational
                mission of the University and cannot be tolerated. Students are
                responsible for understanding the standards of academic honesty
                and determining how they apply to their academic work and
                behavior."
              </p>
              <a
                href="https://academics.lmu.edu/honesty/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Academic Honesty Policy Website →
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Disability Support Services
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "The mission of the Disability Support Services (DSS) Office at
                LMU is to provide equal access and opportunities for students
                with established disabilities. We are committed to promoting and
                celebrating the diversity of our students, staff, and faculty
                and work to eliminate systemic barriers, address individual
                bias, and maintain a respectful and equitable working
                environment."
              </p>
              <a
                href="https://academics.lmu.edu/dss/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Disability Support Services Website →
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                LMU Expectation for Classroom Behavior
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "Disruptive behavior which is persistent or significantly
                interferes with classroom activities may be subject to
                disciplinary action. A student may be referred to the Office of
                Student Conduct and Community Responsibility if their behavior
                constitutes a violation of the conduct code."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/student-conduct/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                OSCCR Website →
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Reporting of Sexual or Interpersonal Misconduct
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "Loyola Marymount University ("LMU") recognizes the significant,
                unacceptable and nationwide existence of Sexual and
                Interpersonal Misconduct on college campuses. LMU is dedicated
                to the prevention of such misconduct and to providing a caring,
                supportive and effective response when such misconduct occurs."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/wellness/title9/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Misconduct Reporting Information →
              </a>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Communication Expectations
              </h3>
              <p className="text-muted-foreground text-sm">
                Official communication must occur through LMU-approved channels
                (student email, Department Teams/Slack, or letters on official
                LMU letterhead). Students are responsible for regularly checking
                their LMU email. Other official channels may be audited in cases
                of misconduct.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Emergency Preparedness
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "Building a more resilient LMU is a shared responsibility among
                all students, faculty, and staff. Emergency Management serves as
                an all-encompassing tool for campus emergency information,
                disaster readiness events at LMU, and tips on how to prepare for
                and respond to various emergencies."
              </p>
              <a
                href="https://admin.lmu.edu/emergency/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Emergency Preparedness Website →
              </a>
            </div>
          </div>
        </section>

        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
          <p className="text-sm text-muted-foreground italic text-center">
            This syllabus is tentative and subject to change. Updates will be
            communicated promptly via email.
          </p>
        </div>
      </div>
    </div>
  )
}
