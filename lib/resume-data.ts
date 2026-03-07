// Shared resume data used by both the experience page and PDF generator
// Update this file to keep both in sync automatically

export const personalInfo = {
  name: "Julian Gonzalez",
  title: "Visiting Assistant Professor of Computer Science",
  institution: "Loyola Marymount University",
  location: "Los Angeles, CA",
  email: "julian.gonzalez@lmu.edu or jag.prof@outlook.com",
}

export const professionalSummary = `Computer science educator passionate about making complex technical concepts accessible to all students. My path from mechanical engineering and FRC robotics to computer science gives me a unique perspective on systems-level thinking and hands-on learning. I believe in creating engaging learning environments where students from any background can thrive—a philosophy directly informed by my master's thesis on heterogeneous architecture and optimal resource scheduling.`

export interface Education {
  degree: string
  institution: string
  location: string
  year: string
  focus: string
  thesis?: string
  gpa: number
  deansListSemesters?: number
  transcriptDegreeId: string
}

export const education: Education[] = [
  {
    degree: "M.S. in Computer Science",
    institution: "Loyola Marymount University",
    location: "Los Angeles, CA",
    year: "2023-2024",
    focus: "Specialization in Operating Systems and Parallel Computing",
    thesis: "Heterogeneous Architecture and Efficient Scheduling Algorithms",
    gpa: 4.0,
    transcriptDegreeId: "ms",
  },
  {
    degree: "B.S. in Computer Science",
    institution: "Loyola Marymount University",
    location: "Los Angeles, CA",
    year: "2019-2023",
    focus: "Minor in Applied Mathematics",
    gpa: 3.46,
    deansListSemesters: 5,
    transcriptDegreeId: "bs",
  },
]

export interface ExperienceSubItem {
  title: string
  subtitle?: string
  period?: string
  description: string
  highlights?: string[]
  quotes?: string[]
  outcome?: string
}

export interface ExperienceSubSection {
  title: string
  items: ExperienceSubItem[]
}

export interface Experience {
  id: string
  title: string
  institution: string
  location: string
  period: string
  overview: string
  responsibilities: string[]
  subSections?: ExperienceSubSection[]
}

export const experience: Experience[] = [
  {
    id: "vap",
    title: "Visiting Assistant Professor of Computer Science",
    institution: "Loyola Marymount University",
    location: "Los Angeles, CA",
    period: "Fall 2024 - Present",
    overview:
      "Teaching 3 core CS courses, mentoring 3 independent studies, and redesigning curriculum for 80+ students per semester",
    responsibilities: [
      "Increased student engagement across 3 core CS courses (Discrete Mathematics, Operating Systems, Programming Language Foundations) serving 80+ students per semester by developing interactive course websites with custom lecture notes and hands-on examples",
      "Redesigned Discrete Mathematics curriculum from scratch, creating 6 new problem sets composed of both theoretical and programming exercises with interactive demonstrations that bridge theoretical concepts with practical CS applications",
      "Modernized Operating Systems course by introducing Rust-based lab assignments and parallel computing concepts, preparing students for contemporary systems programming careers",
      "Mentored 3 independent study students on advanced research projects, with one project receiving university research funding and being deployed as an official tool for detecting AI-generated code in student assignments",
      "Guided student research spanning graphics programming (GLSL shaders), full-stack systems development (multi-threaded Rust servers), and kernel-level security (anti-cheat systems)",
      "Developed a distinctive pedagogical framework combining formal-practical bidirectional learning, isomorphic learning through everyday experience analogies, and custom interactive lecture components across all courses",
      "Generated unprecedented cross-course enrollment demand, leading to Operating Systems class size expansion from 20 to 32 seats and the first-ever Fall semester offering of the course in department history",
    ],
    subSections: [
      {
        title: "Course Development & Curriculum Design",
        items: [
          {
            title: "CMSI 2820: Discrete Mathematics for Computer Science",
            description:
              "Completely redesigned course curriculum to emphasize practical applications of discrete math in computer science. Developed new problem sets, interactive examples, and assessment strategies focused on building intuition alongside formal understanding.",
            highlights: [
              "Built comprehensive course website with 25+ interactive lecture notes, increasing student resource accessibility and engagement outside of class",
              "Designed balanced assessments combining theoretical proofs with practical applications, improving student ability to connect abstract concepts to real-world problems",
              "Integrated CS applications (logic gates, graph algorithms, cryptography) throughout curriculum, helping students see direct relevance to their other coursework",
            ],
          },
          {
            title: "CMSI 3510: Operating Systems",
            description:
              "Rebuilt course from the ground up to reflect modern operating systems concepts and parallel computing paradigms. Focused on how design decisions affect real-world use of devices by incorporating how common software use is altered by small changes to hardware or software features.",
            highlights: [
              "Developed 6+ new lab assignments using Rust, introducing students to memory-safe systems programming practices used in industry",
              "Incorporated parallel programming and concurrency concepts throughout the course, preparing students for multi-core and distributed computing environments",
              "Created materials connecting low-level architecture (CPU scheduling, memory management) to high-level OS abstractions students interact with daily",
            ],
          },
          {
            title: "CMSI 5850: Programming Language Foundations",
            description:
              "Redesigning the curriculum to retell the material with a far more interactive approach, structuring the entire course around building from nothing using only tools formally proven from the ground up. Transforming homework from purely written formal work into application projects that teach students to mechanize formal theory into language-agnostic programming assignments, demonstrating how foundational theory underlies all modern systems.",
            highlights: [
              "Reorganized course structure to build concepts incrementally from first principles, using only formally verified tools and constructions",
              "Replaced written-only formal assignments with hands-on application projects bridging theory and practice",
              "Designed curriculum to expose how programming language foundations underlie all software systems",
            ],
          },
        ],
      },
      {
        title: "Teaching Philosophy & Pedagogical Innovation",
        items: [
          {
            title: "Formal-Practical Bidirectional Learning",
            description:
              "Enforces a bidirectional system of learning across all courses, exploring tools alongside their formal theoretical foundations and demonstrating how formal systems manifest in practical tooling. Students build a fully formed intuition for how formal theory enhances their programming abilities in practice, rather than treating theory and application as separate domains.",
            highlights: [
              "Every practical tool introduced is grounded in its formal specification or theoretical origin",
              "Every formal concept is demonstrated through its real-world implementation in production systems",
              "Students develop the ability to move fluidly between theoretical reasoning and applied problem-solving",
            ],
          },
          {
            title: "Isomorphic Learning",
            description:
              "Employs a teaching methodology rooted in the belief that if computer science genuinely models the world, then every topic should have a grounded analogue in everyday human experience. Each new concept is paired with a familiar scenario — social interactions, commuting, cooking, management — giving students an intuitive head start by showing them they have already encountered the underlying pattern; they are now learning to formalize and apply it in code.",
            highlights: [
              "Every major topic is introduced alongside a concrete, relatable human experience analogy",
              "Students report faster conceptual uptake by recognizing patterns they already navigate daily",
              "Reduces intimidation factor of abstract topics by anchoring them in lived experience",
            ],
          },
          {
            title: "Interactive Lecture Components",
            description:
              "All lectures include custom-built, interactive website components that allow students to directly manipulate and explore the topic under discussion. These components provide a hands-on, exploratory feel for abstract concepts, enabling students to build physical intuition for computational ideas through direct experimentation rather than passive observation.",
            highlights: [
              "Custom interactive widgets embedded in course websites for each major topic",
              "Students can modify parameters, observe outcomes, and develop intuition through exploration",
              "Bridges the gap between static lecture content and active, experiential learning",
            ],
          },
        ],
      },
      {
        title: "Departmental Service & Curriculum Impact",
        items: [
          {
            title: "Curriculum Language & Tooling Review",
            description:
              "Participated in departmental curriculum review committee, providing targeted analysis of how programming language pragmatics directly affect student learning outcomes. Recommendations were adopted across 5 courses spanning all four year levels.",
            highlights: [
              "Data Structures: Python to Java — stronger type discipline for ADT implementation",
              "Algorithms: Python to Java — consistent with Data Structures, better for complexity analysis tooling",
              "Operating Systems: C to Rust — memory safety guarantees while retaining systems-level control",
              "Discrete Mathematics for CS: no programming to Python — bridging formal proofs with computational verification",
              "Languages & Automata: expanded Rust inclusion — leveraging ownership/borrowing as a teaching vehicle for type theory concepts",
            ],
            outcome:
              "Recommendations adopted department-wide, reshaping the programming language experience for students from freshman through senior year",
          },
        ],
      },
      {
        title: "Student Impact & Enrollment",
        items: [
          {
            title: "Cross-Course Enrollment Pipeline",
            description:
              "Discrete Mathematics (CMSI 2820), as the first CS-dedicated alternative to the Math department's equivalent offerings, became a preferred entry point for freshmen and sophomores. Students who took Discrete Math subsequently enrolled in Operating Systems (CMSI 3510) at unprecedented rates, with many requesting prerequisite overrides to take the OS prerequisite concurrently.",
            highlights: [
              "Operating Systems class size manually expanded from 20 to 32 seats to meet demand",
              "Enrollment demand led to OS being offered in Fall for the first time in department history (previously Spring-only)",
              "Students created custom degree paths to take courses ahead of the standard curriculum sequence",
              "Advising faculty processed an unusually high number of prerequisite overrides to accommodate demand",
            ],
          },
          {
            title: "ICPC Competition Coaching",
            description:
              "Organized and led extracurricular lecture series to prepare LMU's ICPC teams for regional competition. Identified a critical gap between the department's industry-focused curriculum and competition requirements: students were strong software engineers but lacked the specialized skills needed for timed algorithmic contests without access to standard tooling — memorizing key mathematical properties, super-optimized compact prime filtering, minimized-memory format designs for dynamic programming, and performing under pressure.",
            highlights: [
              "Designed and delivered targeted extracurricular lectures covering competition-specific algorithmic techniques not emphasized in the standard curriculum",
              "Provided students with tooling strategies and experience-based preparation drawn from prior ICPC competitions",
              "Coaching resulted in the highest-performing result across all teams in the department's history",
            ],
          },
          {
            title: "Student Outcomes & Placements",
            description:
              "Students taught and mentored have secured positions at major technology companies, competitive graduate programs, and entrepreneurial ventures, reflecting the department's and the instructor's emphasis on producing well-rounded, industry-ready and research-capable computer scientists.",
            highlights: [
              "4 students placed at Google across SWE and ML roles",
              "8 students placed in industry roles at companies including Amazon, Paramount, PayPal, C3.ai, Marvell, Vast, 2K Games, and Skechers",
              "1 student founded an AI startup",
              "3 students admitted to graduate programs at UIUC, USC, and UC Santa Barbara, with 1 publishing a first-author IEEE paper",
            ],
          },
          {
            title: "Student Evaluations",
            description:
              "Across 8 course sections (7 Discrete Mathematics, 2 Operating Systems) serving 182 students over 3 semesters, received consistently strong evaluation scores with a clear upward trajectory. Fall 2025 CMSI 2820 Section 02 achieved a perfect 5.00/5.00 overall effectiveness — above department average on every metric. The primary area for early growth — grading turnaround time across 3 simultaneous sections — directly motivated investment in automated grading tooling (Gradeflows/PostCommit), and subsequent semesters show measurable improvement in feedback scores, demonstrating a commitment to converting student feedback into systemic improvement.",
            highlights: [
              "Fall 2025 CMSI 2820-02: perfect 5.00/5.00 overall effectiveness (dept avg 4.53), 100% Very Good ratings, above department average on all 8 metrics",
              "Spring 2025 CMSI 2820: 4.70/5.00 overall effectiveness (dept avg 4.43), above department average on all 8 metrics",
              "6 of 8 sections scored above department average for overall instructional effectiveness",
              "5 of 7 Discrete Mathematics sections scored above department average, with 2 sections achieving perfect or near-perfect overall scores",
              "Consistent praise themes across 3 semesters: enthusiasm/passion, recorded lectures, interactive course websites, innovative standards-based grading, activity days, approachability",
              "Clear improvement trajectory from Fall 2024 to Fall 2025, with grading feedback scores rising from below-department to above-department average by the third semester",
            ],
            quotes: [
              "A truly magnificent professor. Clear about his expectations from day one. Knows how to start slow and build up effectively. As a new professor, he handled teaching a difficult course impressively well.",
              "The passion you show for it makes it so much more fun for all of us... you are such a talented teacher that it is crazy it is only your first year doing it officially.",
              "Phenomenal teacher. I loved the simple explanations, and the set up of the overall course being standards based. Loved this class and professor — I wish he taught data structures.",
              "Professor Gonzalez's ability to articulate complex concepts clearly demonstrated both his intelligence and knowledge of the field. He answered every question with ease and frequently expanded upon initial inquiries to present more challenging scenarios.",
              "I think Julian understands closely what it was like in our shoes as a student so he's very sympathetic and always wants us to succeed.",
              "Every one of the professor's lectures were entertaining, which led to a deeper understanding of the complex course content. The activities throughout the semester were extremely fun.",
              "The professor is a great lecturer and down-to-earth.",
            ],
          },
        ],
      },
      {
        title: "Research & Mentorship",
        items: [
          {
            title: "Real-Time Graphics & Shader Development",
            subtitle: "CMSI 4999: Senior Undergraduate Independent Study",
            period: "Fall 2024",
            description:
              "Guided student through computer graphics fundamentals and GLSL shader programming, culminating in custom hand-built shaders for the video game Minecraft.",
            outcome:
              "Student gained practical experience in GPU programming and real-time rendering techniques.",
          },
          {
            title: "Gradeflows and PostCommit: AI Faculty Support Tool",
            subtitle: "CMSI 6999: Graduate Independent Study",
            period: "Spring 2025",
            description:
              "Mentored development of a full-stack, multi-threaded HTTP REST server written in Rust that uses containerization to run student code in a sandboxed environment to provide faculty with additional support in grading student assignments with analytics. Went on to receive additional faculty support and university research funding and is now deployed as an official tool used by faculty across the Computer Science department.",
            outcome:
              "Project received additional faculty support and university research funding and is now deployed as an official tool used by faculty across the Computer Science department.",
          },
          {
            title: "Kernel-Level Anti-Cheat Development",
            subtitle: "CMSI 4999: Senior Undergraduate Independent Study",
            period: "Fall 2025 - Present",
            description:
              "Advising student research on kernel-level anti-cheat systems for video games with dedicated servers, exploring low-level security and driver development.",
          },
        ],
      },
    ],
  },
  {
    id: "ta",
    title: "Teaching Assistant - CMSI 3801/3802: Languages & Automata I and II",
    institution: "Loyola Marymount University",
    location: "Los Angeles, CA",
    period: "2022 - 2024",
    overview:
      "Supported 100+ students across 3 years in programming language theory and formal automata",
    responsibilities: [
      "Supported 100+ students across upper-division theory courses (CMSI 3801/3802) over 3 years, providing tutoring in programming language theory and formal automata",
      "Guided students through mastery of 5 programming languages (Python, JavaScript, Java, C++, Swift) by conducting weekly tutoring sessions and code reviews",
      "Mentored students in designing and implementing complete interpreters and compilers from scratch, reinforcing theoretical concepts through hands-on project work",
      "Extended tutoring support to freshman and sophomore courses, helping students build foundational programming skills and computational thinking",
    ],
    subSections: [
      {
        title: "Per-Course Contributions",
        items: [
          {
            title: "CMSI 3801: Languages & Automata I",
            description:
              "Provided weekly tutoring sessions and code reviews as students worked through 5 programming languages (Python, JavaScript, Java, C++, Swift), helping them understand each language's unique paradigms and strengths.",
            highlights: [
              "Conducted weekly tutoring sessions covering language-specific idioms and best practices across 5 languages",
              "Reviewed student code for multi-language problem sets, providing feedback on idiomatic usage and design patterns",
              "Helped students navigate the transition between imperative, object-oriented, and functional paradigms",
            ],
          },
          {
            title: "CMSI 3802: Languages & Automata II",
            description:
              "Mentored students through the design and implementation of complete interpreters and compilers from scratch, reinforcing formal automata theory through hands-on project work.",
            highlights: [
              "Guided students through building lexers, parsers, and code generators for custom programming languages",
              "Reinforced theoretical concepts (context-free grammars, finite automata, regular expressions) through practical compiler construction",
              "Provided detailed feedback on compiler design decisions and implementation correctness",
            ],
          },
          {
            title: "Lower-Division Support",
            description:
              "Extended tutoring support to freshman and sophomore courses, helping students build foundational programming skills and computational thinking.",
            highlights: [
              "Assisted students in introductory programming courses with core concepts like data structures, algorithms, and debugging",
              "Helped bridge the gap between introductory coursework and the rigor of upper-division theory courses",
            ],
          },
        ],
      },
    ],
  },
]

export const teachingInterests: string[] = [
  "Operating Systems & Low-Level Systems Programming",
  "Parallel & Concurrent Computing",
  "Discrete Mathematics & Formal Logic",
  "Automata & Computational Theory",
  "Programming Language Theory",
  "CS Education & Pedagogy",
]

export interface Achievement {
  title: string
  organization: string
  period: string
  description: string
}

export const achievements: Achievement[] = [
  {
    title: "ICPC Competitor - Record-Setting Performance",
    organization: "International Collegiate Programming Competition",
    period: "2022 - 2024",
    description:
      "Competed 3 times at ICPC regionals hosted at Riverside Community College. Led team of 3 to achieve the highest point total in LMU history through self-taught competitive programming skills, as the university curriculum does not specifically prepare students for algorithmic competitions.",
  },
]

export interface PreviousExperience {
  role: string
  organization: string
  period: string
  description: string
}

export const previousExperience: PreviousExperience[] = [
  {
    role: "CSSIx Pre-College Summer Program Participant",
    organization: "Google & Loyola Marymount University",
    period: "Summer 2019",
    description:
      "Completed Google's Computer Science Summer Institute extension program hosted at LMU, building web applications using Python, Google App Engine, and Jinja2 templating. Created an ASL learning platform and a recipe web app. Included visits to Google's Venice Beach offices and mentorship from Google engineers.",
  },
  {
    role: "FRC Robotics - Manufacturing Lead",
    organization: "Team 4201 Vitruvian Bots, Da Vinci Science High School",
    period: "2018 - 2019",
    description:
      "Led manufacturing division of 8 team members to World Championship victory by managing CNC machining operations, coordinating $3K+ budget, and ensuring precision fabrication of competition robot components.",
  },
]

export interface TechnicalSkills {
  [category: string]: string[]
}

export const technicalSkills: TechnicalSkills = {
  "Programming Languages": [
    "Python",
    "JavaScript/TypeScript",
    "Java/Kotlin",
    "C/C++",
    "Swift",
    "Rust",
    "HTML/CSS",
  ],
  "Systems & Tools": ["Linux/Unix", "Git", "React/Next.js", "Node.js", "Bash"],
  "Teaching & Development": [
    "LaTeX",
    "Markdown/MDX",
    "Web Development",
    "Course Management Systems",
    "AutoCAD/MasterCAM (from FRC)",
  ],
}
