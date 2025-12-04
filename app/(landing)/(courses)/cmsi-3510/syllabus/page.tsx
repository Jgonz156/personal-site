"use client"

import { useEffect } from "react"
import { useNavbar } from "@/components/navbar-context"
import StandardsDiagram from "@/components/standards-diagram"

export default function CMSI3510Syllabus() {
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
      { id: "student-services", title: "Student Services", level: 1 },
      { id: "faq", title: "FAQ", level: 1 },
    ])

    return () => {
      setPageSections([])
    }
  }, [setPageSections])

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">CMSI 3510: Operating Systems</h1>
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
              <strong>Office Hours:</strong> By appointment
            </p>
            <p>
              <strong>Prerequisites:</strong> CMSI 2210 and/or CMSI 284 or EECE
              3140
            </p>
            <div className="pt-2">
              <p className="font-semibold mb-2">Section:</p>
              <div className="pl-4">
                <p>
                  <strong>Section 1:</strong> Pereira 127, 1:45 PM – 3:25 PM
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
              This 4-unit course combines the modern development of Operating
              Systems with practical application in Rust. Topics include
              Concurrent and Parallel Programming, investigations of computer
              hardware architecture, Scheduling, Memory Management, I/O
              management, and other concepts relevant to the view of Kernel
              Systems.
            </p>
            <p>
              This course is offered in a synchronous, lecture-based format,
              meeting in person. Recordings of all lectures will be uploaded to
              the course site for asynchronous access, typically after class.
              You are encouraged to ask questions at any time during lectures.
            </p>
            <p>
              Coursework consists of programming assignments, mandatory in-class
              activities, as well as optional creative projects and optional
              midterm and final assessments for additional credit. Collaboration
              is encouraged, but all submitted work must be your own original
              work. If you work with others or use outside sources, cite them
              appropriately so I can accurately assess each student&apos;s
              understanding.
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
            Modern computing often conceals its complexity behind layers of
            abstraction, allowing software engineers to treat systems as if they
            operate by "magic." In this course, we will strip away that sense of
            mystery by examining the principles and mechanisms that make modern
            computing possible. While the breadth of operating systems cannot be
            fully covered in a single semester, you will develop the following
            core competencies:
          </p>
          <ol className="list-decimal list-outside ml-6 space-y-3 text-muted-foreground">
            <li>
              <strong>Model and implement concurrent systems in Rust</strong>,
              explain the representations of concurrency (threads, processes,
              and tasks), and use synchronization primitives (e.g., mutexes,
              semaphores, channels) to coordinate concurrent execution.
            </li>
            <li>
              <strong>
                Analyze and explain computer hardware architecture
              </strong>{" "}
              at the level relevant to OS development, including memory
              hierarchies, processor modes, and I/O systems.
            </li>
            <li>
              <strong>Design and evaluate process scheduling algorithms</strong>
              , understanding trade-offs between throughput, response time, and
              fairness.
            </li>
            <li>
              <strong>
                Implement and reason about memory management systems
              </strong>
              , including virtual memory, paging, and allocation strategies.
            </li>
            <li>
              <strong>Develop system-level programs in Rust</strong> that
              interact with OS APIs, manage resources safely, and handle errors
              appropriately.
            </li>
            <li>
              <strong>Articulate the design principles and trade-offs</strong>{" "}
              that shape modern operating systems, including security,
              performance, and abstraction.
            </li>
            <li>
              Apply <strong>Rust</strong> to implement low-level system
              components and understand its advantages in systems programming.
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
            <li>Rust and an IDE (e.g., VSCode)</li>
            <li>Reliable internet access</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            All reading materials, including textbooks, articles, videos, and
            other media, will be available on the course site. Primary
            references include:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-6 mt-2">
            <li>
              <strong>The Rust Programming Language Book</strong> (free online
              at{" "}
              <a
                href="https://doc.rust-lang.org/book/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                doc.rust-lang.org/book/
              </a>
              )
            </li>
            <li>
              <strong>
                Operating Systems and Middleware: Supporting Controlled
                Interaction
              </strong>{" "}
              by Max Hailperin (available <a href="https://ia902302.us.archive.org/27/items/osm-rev1.2/osm-rev1.2.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">here</a>)
            </li>
          </ul>
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

          <div className="mb-6">
            <StandardsDiagram
              courseID="CMSI 3510: Operating Systems"
              coursePointTotal={240}
              standards={[
                {
                  standardID: "Syllabus",
                  pointTotal: 0,
                  homework: [
                    { id: "HW 0", points: 3, gradedWith: "Syllabus" },
                    { id: "OHW 0", points: 1, gradedWith: "Syllabus" },
                  ],
                  exams: [{ id: "EX S0", points: 1, gradedWith: "Syllabus" }],
                },
                {
                  standardID: "Concurrent Programming",
                  pointTotal: 80,
                  homework: [
                    {
                      id: "HW 1",
                      points: 30,
                      gradedWith: "Concurrent Programming",
                    },
                    {
                      id: "HW 2",
                      points: 30,
                      gradedWith: "Concurrent Programming",
                    },
                    {
                      id: "AC 1",
                      points: 30,
                      gradedWith: "Concurrent Programming",
                    },
                  ],
                },
                {
                  standardID: "Computer Hardware",
                  pointTotal: 80,
                  homework: [
                    {
                      id: "HW 3",
                      points: 30,
                      gradedWith: "Computer Hardware",
                    },
                    {
                      id: "HW 4",
                      points: 30,
                      gradedWith: "Computer Hardware",
                    },
                    {
                      id: "AC 2",
                      points: 30,
                      gradedWith: "Computer Hardware",
                    },
                    {
                      id: "OHW 1",
                      points: 20,
                      gradedWith: "Concurrent Programming",
                    },
                  ],
                },
                {
                  standardID: "Operating Systems",
                  pointTotal: 80,
                  homework: [
                    {
                      id: "HW 5",
                      points: 30,
                      gradedWith: "Operating Systems",
                    },
                    {
                      id: "HW 6",
                      points: 30,
                      gradedWith: "Operating Systems",
                    },
                    {
                      id: "AC 3",
                      points: 30,
                      gradedWith: "Operating Systems",
                    },
                    {
                      id: "OHW 2",
                      points: 20,
                      gradedWith: "Computer Hardware",
                    },
                  ],
                },
                {
                  standardID: "Final",
                  homework: [
                    {
                      id: "OHW 3",
                      points: 20,
                      gradedWith: "Operating Systems",
                    },
                  ],
                  exams: [
                    {
                      id: "OEX S1",
                      points: 10,
                      gradedWith: "Concurrent Programming",
                    },
                    {
                      id: "OEX S2",
                      points: 10,
                      gradedWith: "Computer Hardware",
                    },
                    {
                      id: "OEX S3",
                      points: 10,
                      gradedWith: "Operating Systems",
                    },
                  ],
                },
              ]}
            />
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="font-semibold mb-3">Course Structure</p>
            <p className="text-sm text-muted-foreground mb-3">
              The course is divided into three standards (modules), each worth
              80 points (total: 240). Assignments are organized as follows:
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
                  <td className="py-2">
                    HW0 (3 pts), OHW0 (1 pt), EX S0 (1 pt)
                  </td>
                  <td className="py-2 text-right">5 (bonus)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Concurrent Programming</td>
                  <td className="py-2">
                    HW1 (30 pts), HW2 (30 pts), AC1 (30 pts)
                  </td>
                  <td className="py-2 text-right">80 needed</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2">Computer Hardware</td>
                  <td className="py-2">
                    HW3 (30 pts), HW4 (30 pts), AC2 (30 pts), OHW1 (20 pts)
                  </td>
                  <td className="py-2 text-right">80 needed</td>
                </tr>
                <tr>
                  <td className="py-2">Operating Systems</td>
                  <td className="py-2">
                    HW5 (30 pts), HW6 (30 pts), AC3 (30 pts), OHW2 (20 pts)
                  </td>
                  <td className="py-2 text-right">80 needed</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-muted-foreground mt-3">
              Optional exams (Final) and homework (OHW3) provide additional
              opportunities to recover points in earlier standards. Activities
              (AC) are mandatory in-class participation days.
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
                homework (OHW) targeting the previous standard. Homeworks
                consist of hands-on Rust programming assignments that apply
                course concepts. All homework, optional or otherwise, is due on
                Fridays.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Activities</h3>
              <p className="text-muted-foreground">
                Activities (AC) are mandatory in-class participation days that
                provide hands-on experience with course concepts. These are
                graded on attendance and participation. Dates will be announced
                well in advance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Unexcused Extensions
              </h3>
              <p className="text-muted-foreground">
                Automatic, unexcused extensions are available: turning in a
                homework on Saturday results in a 5pt deduction. Turning it in
                on Sunday gives you the previous 5-point penalty and an
                additional 10-point deduction. Submitting after Sunday without
                an excuse results in the loss of all points.
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
                The Final is optional. It provides focused opportunities to
                boost scores in prior standards. If you have reached the point
                total required to pass a standard (80pts), then it is optional.
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

        <section id="student-services">
          <h2 className="text-2xl font-semibold mb-3">Student Services</h2>
          <p className="text-muted-foreground mb-4">
            As a student at LMU you have access to many services that you may
            not be aware of! I have linked as many as I can think of here to
            provide you with an easy way to find these services. You'll also
            find a small paragraph of the mission statement from each of these
            services.
          </p>
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (COC) Community of Care
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "The mission of the Loyola Marymount University Community of
                Care (COC) — a collaborative case-management program — is to
                enhance community safety and student well-being. The Community
                of Care provides prevention, assessment, and intervention for
                and with students as they navigate the challenges that stand in
                their way of academic and personal success."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/wellness/coc/learnmoreaboutus/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                LION Connect
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "LionConnect is a comprehensive portal designed to empower
                students to take control of their academic journey to achieve
                their goals. By offering a personalized dashboard, seamless
                scheduling, and direct access to dedicated support staff,
                LionConnect enhances communication and collaboration between
                students and the Web of Support staff. This innovative approach
                leverages technology and real-time data to provide personalized
                and timely interventions, ensuring students receive the support
                they need to succeed."
              </p>
              <a
                href="https://www.lmu.edu/academics/provost/resources/lionconnect/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (EIS) Ethnic and Intercultural Services
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "The mission of the department of Ethnic and Intercultural
                Services (EIS) is to support the intercultural learning and
                development of students, specifically those from historically
                underrepresented backgrounds at LMU. This area has played a
                central role to support the personal and academic success of
                students through programs and services focused on identity
                development, community building, and advocacy."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/community/ethnicandinterculturalservices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Center for Student Collegiate Recovery
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "Loyola Marymount University's Center for Student Collegiate
                Recovery, located on the first floor of Malone (Malone 113),
                provides a comfortable space and supportive community for
                students in recovery or seeking to create and sustain
                improvements in their wellness. Students will be empowered to
                take individual responsibility for their own health and
                well-being while belonging to a community of support."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/wellness/recovery/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (OISS) Office for International Students and Scholars
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "The Office for International Students and Scholars (OISS)
                serves as a resource to the University by ensuring regulatory
                compliance. OISS provides programs and services that support
                international students' and scholars' social, educational and
                professional success, thereby, creating an engaged global
                community."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/community/officeforinternationalstudentsandscholars/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (OSCCR) Office of Student Conduct and Community Responsibility
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "Loyola Marymount University's Office of Student Conduct &
                Community Responsibility (OSCCR) is committed to fostering an
                environment conducive to the pursuit of knowledge. Such an
                environment is based upon respect, trust, integrity and
                accountability. Through education and by upholding community
                standards detailed in the Student Conduct Code, OSCCR holds LMU
                students accountable for their violations and helps them grow
                into more responsible and community-minded persons."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/about/osccr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (CSA) Pam Rector Center for Service and Action
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "The Pam Rector Center for Service and Action at LMU offers
                students and graduates a range of opportunities to volunteer
                their time serving those disadvantaged or oppressed. Service
                opportunities are available on campus, locally in the Los
                Angeles area, and abroad through dedicated service groups or
                special events."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/activities/centerforserviceandaction/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (SES) Student Employment Services
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "Student Employment Services (SES) at LMU provides part-time
                employment opportunities, workshops, and services to further
                students' professional development and post-graduate success.
                More than 3,400 LMU students work in more than 5,300 positions
                across campus."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/activities/ses/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (SHS) Student Health Services
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "Student Health Services (SHS) remains committed to the health
                and safety of our campus community. We are a full-service
                medical office that is accredited by the Accreditation
                Association for Ambulatory Health Care (AAAHC). Our health care
                team includes physicians, nurse practitioners, registered
                nurses, and trained support staff."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/wellness/studenthealthservices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (SPS) Student Psychological Services
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "Student Psychological Services is committed to facilitating
                student growth and development of the whole person by providing
                high quality, confidential psychological services that is social
                justice oriented, ethical and culturally informed, to ensure the
                inclusivity and safety for students."
              </p>
              <a
                href="https://studentaffairs.lmu.edu/wellness/studentpsychologicalservices/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (ARC) Academic Resource Center
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "The Academic Resource Center (ARC) provides Course Tutoring,
                Writing Tutoring, and Academic Coaching. Our services are
                designed as a complement to the curriculum with the intentions
                of fostering academic success."
              </p>
              <a
                href="https://academics.lmu.edu/arc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (ITS) Information Technology Services
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "ITS enables technologically-rich learning environments,
                provides effective teaching and scholarship resources and
                maintains reliable, accessible, and integrated information
                systems. Information Technology Services (ITS) provides
                management and services in support of the University's
                information technology resources."
              </p>
              <a
                href="https://its.lmu.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (FERPA) Family Education Rights and Privacy Act
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "FERPA stands for the Family Education Rights and Privacy Act of
                1974. This law protects the privacy of student education records
                from kindergarten through graduate school. FERPA applies to all
                schools that receive funds through an applicable program of the
                U.S. Department of Education."
              </p>
              <a
                href="https://registrar.lmu.edu/ferpa-rightsandprivacyact/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                (ASLMU) Associated Students of LMU
              </h3>
              <p className="text-muted-foreground text-sm italic mb-2">
                "ASLMU, in keeping with the Jesuit and Marymount tradition,
                empowers the voice of the students and actively promotes a
                vibrant campus life. Driven by integrity, we devote ourselves to
                being persons for and with others."
              </p>
              <a
                href="https://www.aslmu.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Learn More →
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border border-border">
              <h3 className="font-semibold text-foreground mb-2">
                Professor Julian Gonzalez (ME)
              </h3>
              <p className="text-muted-foreground text-sm">
                This one, surprisingly, is not an acronym! It's literally
                referring to me, Professor Julian Gonzalez. If this is
                overwhelming and you are unsure where to go or what to do, you
                can talk to me personally as a guide through your resources!
                Feel free to email me to make a private appointment with me in
                my office for a private space to discuss your thoughts.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-muted-foreground mb-3">
              However, these services are not free (you are paying for them
              after all!). You keep access to these services by maintaining and
              upholding the Lion Code, which can be found below.
            </p>
            <h3 className="font-semibold text-foreground mb-2">Lion Code</h3>
            <p className="text-muted-foreground text-sm italic mb-2">
              "I am a Lion. Courageous of mind, charitable of heart, I stand in
              faith. I will own the actions of my mind, hand, and heart, and
              build the community that sustains us. The respect and support that
              nurtures me is born of my respect for others. The dignity of the
              other, the stranger, grants me dignity. The expectations of my
              community are my own, and I will discover how I may be more fully
              alive. I will join the discourse of the academy with honesty of
              voice and integrity of scholarship. Respecting peers,
              professionals, professors, and students, I will embrace the
              diverse perspectives, arts, and sciences to discover what it means
              to be human. I will shelter and support the intellectual
              adventures of others. In this tradition, within my community, a
              part of this academy, I stand in faith, prepared to learn to be
              one for others, ready to take up responsibility in the world."
            </p>
            <a
              href="https://studentaffairs.lmu.edu/about/studentaffairsdeansoffice/lionscode/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Lion Code Website →
            </a>
          </div>

          <p className="text-muted-foreground mt-4 italic">
            Golden Rule: "Don't Disturb the Learning of Others."
          </p>
        </section>

        <section id="faq">
          <h2 className="text-2xl font-semibold mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <details className="bg-muted/30 rounded-lg p-4 border border-border group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span>What if I miss the exam due date?</span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">
                Unlike the assignments, which have an optional unexcused
                extension you can take for a point-loss, if you miss the due
                date for an exam that's just it. I made the exams purposefully
                straightforward and non-time consuming to avoid any scheduling
                issues.
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-4 border border-border group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span>
                  Due to the University handling the assignment of Finals during
                  the last week of the semester, does that change how exams are
                  administered?
                </span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">
                No, they will still be over Brightspace digitally to be taken
                anytime during the week. However, since I am required to be in
                those assigned rooms for 2 hours I will provide them as open
                study days for help during finals week.
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-4 border border-border group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span>Are AI tools allowed in your course?</span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">
                Yes! I'd rather you know the appropriate use of a tool rather
                than trying to use it behind my back to disastrous results. What
                you shouldn't try to do is make it do all your HW. It is
                tempting, but I already know that AI tools perform poorly on our
                course material. However, AI tools are great at the
                comprehension of the topics! So don't ask ChatGPT to do the
                problem, ask it for ideas on what to do instead!
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-4 border border-border group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span>Is participation mandatory?</span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">
                Nope. If you are the type of learner that performs better just
                listening quietly feel free to do so! However, don't ever be
                afraid to ask questions! We are covering hard material (Because
                I adapted course materials from graduate level work from many
                colleges like Cornell, Carnegie Mellon, Stanford, and others) so
                don't just "bask", ask!
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-4 border border-border group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span>
                  Are the workload expectations the same as in other courses?
                </span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">
                Great question! I actually want to encourage "less" work by
                getting you all to work sooner in small chunks. Think about my
                grading system, if you do well on the homework by chiseling away
                at it early, you will avoid more than half of all the
                assignments and still get an A! So it might feel like the
                workload is higher, but really I just want it more often and for
                less time.
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-4 border border-border group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span>
                  Am I allowed to have my computer/phone out and open during
                  class?
                </span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">
                Yes. I'll be honest, the old system of keeping your tech out of
                sight so that I can monopolize your attention is pretty
                draconian (Old and reminiscent of Vampires). If a message that
                YOU think is important comes up and you feel you need to answer
                it, go ahead, just don't disrupt others is all. Also this is a
                computer science course, bit odd to have a policy against tech
                right?
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-4 border border-border group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span>Can I eat in class?</span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">
                This is a bit of a loaded question. My big rule is not to
                disrupt anyone. If you can eat it without bothering those in
                your immediate area, then you are good to go. Foods that emit an
                "area of effect" so to speak are not allowed as they may be
                disruptive to others. I also retain the ability to stop anyone
                from eating at any time for the purposes of class activities or
                enforcing other university policies.
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-4 border border-border group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span>Can I ask for extra-credit?</span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">
                While it may seem harsh, no. The course is made to provide all
                the opportunity necessary to succeed up front. If by the very
                end there is a serious issue we will work on it together, but if
                you are sitting at a B+ right on the edge of an A-, I will not
                invent work to boost your grade as it would be unfair to other
                students.
              </p>
            </details>

            <details className="bg-muted/30 rounded-lg p-4 border border-border group">
              <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                <span>Am I required to show up to class?</span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-muted-foreground text-sm mt-3">
                No, you are all adult enough by now to make that decision for
                yourself. I'd highly recommend showing up because I constructed
                this class to center around the in-person experience. But I will
                not be docking your grade if you do not attend. The only
                detriment you will receive is from the awkwardness that arises
                from missing material.
              </p>
            </details>
          </div>
          <p className="text-muted-foreground text-sm mt-4 italic">
            This list is subject to expand.
          </p>
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
