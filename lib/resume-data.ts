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
}

export const education: Education[] = [
  {
    degree: "M.S. in Computer Science",
    institution: "Loyola Marymount University",
    location: "Los Angeles, CA",
    year: "2023-2024",
    focus: "Specialization in Operating Systems and Parallel Computing",
    thesis: "Heterogeneous Architecture and Efficient Scheduling Algorithms",
  },
  {
    degree: "B.S. in Computer Science",
    institution: "Loyola Marymount University",
    location: "Los Angeles, CA",
    year: "2019-2023",
    focus: "Minor in Applied Mathematics",
  },
]

export interface Experience {
  title: string
  institution: string
  location: string
  period: string
  responsibilities: string[]
}

export const experience: Experience[] = [
  {
    title: "Visiting Assistant Professor of Computer Science",
    institution: "Loyola Marymount University",
    location: "Los Angeles, CA",
    period: "Fall 2024 - Present",
    responsibilities: [
      "Increased student engagement across 3 core CS courses (Discrete Mathematics, Operating Systems, Programming Language Foundations) serving 80+ students per semester by developing interactive course websites with custom lecture notes and hands-on examples",
      "Redesigned Discrete Mathematics curriculum from scratch, creating 6 new problem sets composed of both theoretical and programming exercises with interactive demonstrations that bridge theoretical concepts with practical CS applications",
      "Modernized Operating Systems course by introducing Rust-based lab assignments and parallel computing concepts, preparing students for contemporary systems programming careers",
      "Mentored 3 independent study students on advanced research projects, with one project receiving university research funding and being deployed as an official tool for detecting AI-generated code in student assignments",
      "Guided student research spanning graphics programming (GLSL shaders), full-stack systems development (multi-threaded Rust servers), and kernel-level security (anti-cheat systems)",
    ],
  },
  {
    title: "Teaching Assistant - CMSI 3801/3802: Languages & Automata I and II",
    institution: "Loyola Marymount University",
    location: "Los Angeles, CA",
    period: "2022 - 2024",
    responsibilities: [
      "Supported 100+ students across upper-division theory courses (CMSI 3801/3802) over 3 years, providing tutoring in programming language theory and formal automata",
      "Guided students through mastery of 5 programming languages (Python, JavaScript, Java, C++, Swift) by conducting weekly tutoring sessions and code reviews",
      "Mentored students in designing and implementing complete interpreters and compilers from scratch, reinforcing theoretical concepts through hands-on project work",
      "Extended tutoring support to freshman and sophomore courses, helping students build foundational programming skills and computational thinking",
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

export interface CourseDevelopment {
  course: string
  description: string
  highlights: string[]
}

export const courseDevelopment: CourseDevelopment[] = [
  {
    course: "CMSI 2820: Discrete Mathematics for Computer Science",
    description:
      "Completely redesigned course curriculum to emphasize practical applications of discrete math in computer science. Developed new problem sets, interactive examples, and assessment strategies focused on building intuition alongside formal understanding.",
    highlights: [
      "Built comprehensive course website with 25+ interactive lecture notes, increasing student resource accessibility and engagement outside of class",
      "Designed balanced assessments combining theoretical proofs with practical applications, improving student ability to connect abstract concepts to real-world problems",
      "Integrated CS applications (logic gates, graph algorithms, cryptography) throughout curriculum, helping students see direct relevance to their other coursework",
    ],
  },
  {
    course: "CMSI 3510: Operating Systems",
    description:
      "Rebuilt course from the ground up to reflect modern operating systems concepts and parallel computing paradigms. Focused on how design decisions affect real-world use of devices by incorporating how common software use is altered by small changes to hardware or software features.",
    highlights: [
      "Developed 6+ new lab assignments using Rust, introducing students to memory-safe systems programming practices used in industry",
      "Incorporated parallel programming and concurrency concepts throughout the course, preparing students for multi-core and distributed computing environments",
      "Created materials connecting low-level architecture (CPU scheduling, memory management) to high-level OS abstractions students interact with daily",
    ],
  },
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

export interface IndependentStudy {
  title: string
  student: string
  period: string
  description: string
  outcome?: string
}

export const independentStudies: IndependentStudy[] = [
    {
      title: "Real-Time Graphics & Shader Development",
      student: "CMSI 4999: Senior Undergraduate Independent Study",
      period: "Fall 2024",
      description:
        "Guided student through computer graphics fundamentals and GLSL shader programming, culminating in custom hand-built shaders for the video game Minecraft.",
      outcome:
        "Student gained practical experience in GPU programming and real-time rendering techniques.",
    },
  {
    title: "Gradeflows and PostCommit: AI Faculty Support Tool",
    student: "CMSI 6999: Graduate Independent Study",
    period: "Spring 2025",
    description:
      "Mentored development of a full-stack, multi-threaded HTTP REST server written in Rust that uses containerization to run student code in a sandboxed environment to provide faculty with additional support in grading student assignments with analytics. Went on to receive additional faculty support and university research funding and is now deployed as an official tool used by faculty across the Computer Science department.",
    outcome:
      "Project received additional faculty support and university research funding and is now deployed as an official tool used by faculty across the Computer Science department.",
  },
  {
    title: "Kernel-Level Anti-Cheat Development",
    student: "CMSI 4999: Senior Undergraduate Independent Study",
    period: "Fall 2025 - Present",
    description:
      "Advising student research on kernel-level anti-cheat systems for video games with dedicated servers, exploring low-level security and driver development.",
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
