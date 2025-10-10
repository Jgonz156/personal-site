import React from "react"
import {
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Code,
  Globe,
  Mail,
  MapPin,
  Download,
  Calendar,
  Users,
  Lightbulb,
  FileText,
  Presentation,
  Trophy,
  Home,
  User,
  FileUser,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import ThemeSwitcher from "@/components/theme-switcher"
import Link from "next/link"
import Footer from "@/components/footer"

export default function CVPage() {
  const education = [
    {
      degree: "Ph.D. in Computer Science",
      institution: "Stanford University",
      location: "Stanford, CA",
      year: "2015",
      focus: "Specialization in Machine Learning and Algorithms",
      dissertation: "Efficient Algorithms for Large-Scale Graph Processing",
    },
    {
      degree: "M.S. in Computer Science",
      institution: "MIT",
      location: "Cambridge, MA",
      year: "2010",
      focus: "Focus on Distributed Systems",
    },
    {
      degree: "B.S. in Computer Science",
      institution: "UC Berkeley",
      location: "Berkeley, CA",
      year: "2008",
      focus: "Summa Cum Laude, Honors Program",
    },
  ]

  const experience = [
    {
      title: "Professor of Computer Science",
      institution: "University Name",
      location: "City, State",
      period: "2020 - Present",
      responsibilities: [
        "Lead research initiatives in machine learning and algorithm design",
        "Teach graduate and undergraduate courses in data structures, algorithms, and ML",
        "Supervise 8 Ph.D. students and mentor numerous undergraduate researchers",
        "Secure over $2M in research funding from NSF and industry partners",
      ],
    },
    {
      title: "Associate Professor",
      institution: "University Name",
      location: "City, State",
      period: "2018 - 2020",
      responsibilities: [
        "Developed new curriculum for Advanced Data Structures course",
        "Published 12 peer-reviewed papers in top-tier conferences",
        "Served on departmental curriculum committee",
      ],
    },
    {
      title: "Assistant Professor",
      institution: "University Name",
      location: "City, State",
      period: "2015 - 2018",
      responsibilities: [
        "Established research lab focused on algorithmic efficiency",
        "Taught foundational computer science courses",
        "Built partnerships with tech industry for student internships",
      ],
    },
  ]

  const researchInterests = [
    "Machine Learning & Deep Learning",
    "Algorithm Design & Analysis",
    "Distributed Systems",
    "Graph Theory & Networks",
    "Data Structures",
    "Code Optimization",
    "Software Engineering",
    "Natural Language Processing",
  ]

  const awards = [
    {
      title: "Outstanding Teaching Award",
      organization: "University Name",
      year: "2024",
      description: "Recognition for excellence in undergraduate education",
    },
    {
      title: "NSF CAREER Award",
      organization: "National Science Foundation",
      year: "2022",
      description: "$500,000 grant for research in efficient algorithms",
    },
    {
      title: "Best Paper Award",
      organization: "ACM Conference on Computing",
      year: "2021",
      description: "For groundbreaking work on graph processing algorithms",
    },
    {
      title: "Early Career Researcher Award",
      organization: "IEEE Computer Society",
      year: "2019",
      description: "Recognition of innovative research contributions",
    },
  ]

  const publications = [
    {
      title: "Efficient Algorithms for Large-Scale Graph Processing",
      authors: "J. Gonzalez, M. Johnson, A. Chen",
      venue: "Journal of Computer Science",
      year: "2024",
      citations: 127,
    },
    {
      title: "Machine Learning Approaches to Code Optimization",
      authors: "J. Gonzalez, R. Wilson",
      venue: "ACM Computing Surveys",
      year: "2023",
      citations: 89,
    },
    {
      title: "Scalable Database Design for Modern Applications",
      authors: "J. Gonzalez, K. Martinez, L. Anderson",
      venue: "IEEE Transactions on Knowledge and Data Engineering",
      year: "2023",
      citations: 156,
    },
    {
      title: "Deep Learning for Natural Language Understanding in Code",
      authors: "J. Gonzalez, S. Park",
      venue: "Conference on Neural Information Processing Systems (NeurIPS)",
      year: "2022",
      citations: 234,
    },
  ]

  const technicalSkills = {
    "Programming Languages": [
      "Python",
      "JavaScript/TypeScript",
      "Java",
      "C++",
      "Go",
      "Rust",
      "SQL",
      "R",
    ],
    "Frameworks & Tools": [
      "TensorFlow",
      "PyTorch",
      "React",
      "Node.js",
      "Docker",
      "Kubernetes",
      "Git",
      "PostgreSQL",
    ],
    "Research Tools": ["MATLAB", "LaTeX", "Jupyter", "Apache Spark", "Hadoop"],
  }

  const service = [
    {
      role: "Program Committee Member",
      organization: "International Conference on Machine Learning (ICML)",
      period: "2023 - Present",
    },
    {
      role: "Associate Editor",
      organization: "Journal of Algorithms and Computational Technology",
      period: "2022 - Present",
    },
    {
      role: "Department Curriculum Committee Chair",
      organization: "University Name",
      period: "2021 - 2024",
    },
    {
      role: "Reviewer",
      organization: "ACM, IEEE, NeurIPS, ICML conferences and journals",
      period: "2015 - Present",
    },
  ]

  const presentations = [
    {
      title: "The Future of Algorithm Design in the Age of AI",
      event: "Keynote Speaker, International Symposium on Algorithms",
      location: "Tokyo, Japan",
      date: "October 2024",
    },
    {
      title: "Teaching Computer Science in a Rapidly Evolving Field",
      event: "SIGCSE Technical Symposium",
      location: "Portland, OR",
      date: "March 2024",
    },
    {
      title: "Practical Applications of Graph Algorithms",
      event: "Tech Industry Panel, Google Research",
      location: "Mountain View, CA",
      date: "June 2023",
    },
  ]

  const memberships = [
    "Association for Computing Machinery (ACM) - Senior Member",
    "IEEE Computer Society - Senior Member",
    "SIGCSE - Special Interest Group on Computer Science Education",
    "American Association for Artificial Intelligence (AAAI)",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50">
        <nav
          className={`bg-background transition-all duration-300 ease-in-out border-b border-border h-auto px-4 py-3`}
        >
          <div className="flex items-center justify-between">
            {/* Left section */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-foreground hover:text-foreground/80"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Course Hub</span>
                </Button>
              </Link>

              <Link href="/cv">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-primary"
                >
                  <FileUser className="w-5 h-5" />
                  <span className="font-medium">CV</span>
                </Button>
              </Link>

              <Link href="/about-me">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-foreground hover:text-foreground/80"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">About Me</span>
                </Button>
              </Link>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeSwitcher />

              {/* Profile Avatar */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 border-0 hover:shadow-md transition-shadow"
                >
                  <User className="w-5 h-5 text-primary-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-5xl font-bold text-foreground mb-4">
                Julian Gonzalez
              </h1>
              <p className="text-2xl text-muted-foreground mb-6">
                Professor of Computer Science
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>University Name, Department of Computer Science</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>julian.gonzalez@university.edu</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Globe className="h-4 w-4 mr-2" />
                  <span>www.juliangonzalez.edu</span>
                </div>
              </div>
            </div>
            <Button className="flex items-center gap-2" size="lg">
              <Download className="h-5 w-5" />
              Download CV (PDF)
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Professional Summary */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 shadow-md border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              <Lightbulb className="h-8 w-8 mr-3 text-primary" />
              Professional Summary
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Accomplished computer science educator and researcher with over 10
              years of experience in academia and industry. Specializing in
              machine learning, algorithm design, and distributed systems with a
              proven track record of impactful research publications, successful
              grant acquisitions, and innovative teaching methodologies.
              Passionate about mentoring the next generation of computer
              scientists and pushing the boundaries of computational theory and
              practice.
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
                {edu.dissertation && (
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    Dissertation: {edu.dissertation}
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

        {/* Research Interests */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <BookOpen className="h-8 w-8 mr-3 text-primary" />
            Research Interests
          </h2>
          <div className="bg-card rounded-lg p-8 shadow-md border border-border">
            <div className="flex flex-wrap gap-3">
              {researchInterests.map((interest, index) => (
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

        {/* Selected Publications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-primary" />
            Selected Publications
          </h2>
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-card-foreground mb-2">
                  {pub.title}
                </h3>
                <p className="text-muted-foreground mb-2">{pub.authors}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="text-primary font-semibold">
                    {pub.venue}
                  </span>
                  <span className="text-muted-foreground">{pub.year}</span>
                  <span className="bg-muted px-3 py-1 rounded-full text-muted-foreground font-medium">
                    {pub.citations} citations
                  </span>
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <p className="text-muted-foreground">
                See{" "}
                <a
                  href="#"
                  className="text-primary hover:underline font-semibold"
                >
                  Google Scholar profile
                </a>{" "}
                for complete list of publications (50+ papers, h-index: 28)
              </p>
            </div>
          </div>
        </section>

        {/* Awards & Honors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Trophy className="h-8 w-8 mr-3 text-primary" />
            Awards & Honors
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Award className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-card-foreground">
                      {award.title}
                    </h3>
                    <p className="text-primary font-semibold">
                      {award.organization}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {award.year}
                </p>
                <p className="text-muted-foreground">{award.description}</p>
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

        {/* Professional Service */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Users className="h-8 w-8 mr-3 text-primary" />
            Professional Service
          </h2>
          <div className="space-y-4">
            {service.map((item, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-5 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-card-foreground">
                      {item.role}
                    </h3>
                    <p className="text-muted-foreground">{item.organization}</p>
                  </div>
                  <p className="text-muted-foreground font-medium text-sm">
                    {item.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Invited Talks & Presentations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Presentation className="h-8 w-8 mr-3 text-primary" />
            Invited Talks & Presentations
          </h2>
          <div className="space-y-4">
            {presentations.map((pres, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-card-foreground mb-2">
                  {pres.title}
                </h3>
                <p className="text-primary font-semibold mb-1">{pres.event}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pres.location}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pres.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Memberships */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center">
            <Award className="h-8 w-8 mr-3 text-primary" />
            Professional Memberships
          </h2>
          <div className="bg-card rounded-lg p-8 shadow-md border border-border">
            <ul className="space-y-3">
              {memberships.map((membership, index) => (
                <li
                  key={index}
                  className="text-muted-foreground flex items-start text-lg"
                >
                  <span className="text-primary mr-3 mt-1">•</span>
                  <span>{membership}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="text-center py-12">
          <Separator className="mb-8" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Interested in Collaboration?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            I'm always open to discussing research opportunities, speaking
            engagements, and collaborations with fellow academics and industry
            professionals.
          </p>
          <Button size="lg" className="gap-2">
            <Mail className="h-5 w-5" />
            Get in Touch
          </Button>
        </section>
      </div>
      <Footer />
    </div>
  )
}
