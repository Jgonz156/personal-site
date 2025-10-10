import React from "react"
import {
  BookOpen,
  FileText,
  Github,
  ExternalLink,
  Users,
  Star,
  Home,
  User,
  FileUser,
} from "lucide-react"
import ThemeSwitcher from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/footer"

export default function SiteHome() {
  const courses = [
    {
      title: "Advanced Data Structures",
      code: "CS 341",
      semester: "Spring 2025",
      description:
        "Deep dive into complex data structures and their applications in modern computing.",
      link: "/courses/cs341",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Machine Learning Fundamentals",
      code: "CS 485",
      semester: "Fall 2024",
      description:
        "Introduction to ML algorithms, neural networks, and practical applications.",
      link: "/courses/cs485",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcbae5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Software Engineering",
      code: "CS 320",
      semester: "Spring 2025",
      description:
        "Best practices in software development, testing, and project management.",
      link: "/courses/cs320",
      image:
        "https://images.unsplash.com/photo-1551288049-ff6e48b1e5ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ]

  const papers = [
    {
      title: "Efficient Algorithms for Large-Scale Graph Processing",
      journal: "Journal of Computer Science",
      year: "2024",
      authors: "Dr. Smith, J. Doe, M. Johnson",
      link: "#",
    },
    {
      title: "Machine Learning Approaches to Code Optimization",
      journal: "ACM Computing Surveys",
      year: "2023",
      authors: "Dr. Smith, A. Chen",
      link: "#",
    },
    {
      title: "Scalable Database Design for Modern Applications",
      journal: "IEEE Transactions on Knowledge and Data Engineering",
      year: "2023",
      authors: "Dr. Smith, R. Wilson, K. Martinez",
      link: "#",
    },
  ]

  const books = [
    {
      title: "Modern Algorithms: Theory and Practice",
      publisher: "Academic Press",
      year: "2024",
      isbn: "978-0123456789",
      description:
        "A comprehensive guide to contemporary algorithmic approaches and their real-world applications.",
      link: "#",
    },
    {
      title: "Data Structures for the Digital Age",
      publisher: "Tech Publications",
      year: "2022",
      isbn: "978-0987654321",
      description:
        "Exploring how traditional data structures adapt to modern computing challenges.",
      link: "#",
    },
  ]

  const projects = [
    {
      title: "Campus Event Management System",
      author: "Sarah Chen",
      description:
        "Full-stack web application for managing university events with real-time notifications.",
      tech: ["React", "Node.js", "PostgreSQL", "Socket.io"],
      stars: 47,
      link: "https://github.com/student/campus-events",
      type: "student",
    },
    {
      title: "ML-Powered Code Review Assistant",
      author: "Alex Rodriguez",
      description:
        "AI tool that provides intelligent code review suggestions using natural language processing.",
      tech: ["Python", "TensorFlow", "Flask", "Docker"],
      stars: 134,
      link: "https://github.com/student/ml-code-review",
      type: "student",
    },
    {
      title: "Distributed Computing Framework",
      author: "Dr. Smith",
      description:
        "Open-source framework for simplified distributed computing across multiple nodes.",
      tech: ["Go", "gRPC", "Docker", "Kubernetes"],
      stars: 892,
      link: "https://github.com/professor/distributed-framework",
      type: "personal",
    },
    {
      title: "Interactive Algorithm Visualizer",
      author: "Maria Garcia",
      description:
        "Educational tool for visualizing complex algorithms with step-by-step animations.",
      tech: ["TypeScript", "D3.js", "React", "Tailwind"],
      stars: 203,
      link: "https://github.com/student/algo-visualizer",
      type: "student",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Sticky Background */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative flex items-center justify-center h-full">
          <div className="text-center text-white px-6">
            <h1 className="text-6xl font-bold mb-6 tracking-tight">
              Julian Gonzalez
            </h1>
            <p className="text-2xl mb-4 font-light">
              Professor of Computer Science
            </p>
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              Advancing the frontiers of algorithms, machine learning, and
              software engineering through research, teaching, and innovation
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
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
                  className="flex items-center space-x-2 text-primary"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Course Hub</span>
                </Button>
              </Link>

              <Link href="/cv">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-foreground hover:text-foreground/80"
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
      <div className="relative bg-background">
        {/* Courses Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Current Courses
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore my current course offerings designed to challenge and
                inspire the next generation of computer scientists
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border group"
                >
                  {/* Mobile Layout (vertical) */}
                  <div className="block md:hidden">
                    <div className="relative">
                      <img
                        src={
                          course.image ||
                          `https://images.unsplash.com/photo-${
                            index === 0
                              ? "1555066931-4365d14bab8c"
                              : index === 1
                              ? "1555949963-aa79dcbae5bb"
                              : "1551288049-ff6e48b1e5ad"
                          }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`
                        }
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      {/* Course code overlay on mobile */}
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                        {course.code}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <BookOpen className="h-5 w-5 text-primary mr-2" />
                        <span className="text-muted-foreground text-sm font-medium">
                          {course.semester}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-card-foreground mb-4 leading-relaxed">
                        {course.description}
                      </p>
                      <a
                        href={course.link}
                        className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
                      >
                        View Course <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </div>
                  </div>

                  {/* Desktop Layout (horizontal) */}
                  <div className="hidden md:flex min-h-[200px]">
                    {/* Course Image */}
                    <div className="w-48 flex-shrink-0">
                      <img
                        src={
                          course.image ||
                          `https://images.unsplash.com/photo-${
                            index === 0
                              ? "1555066931-4365d14bab8c"
                              : index === 1
                              ? "1555949963-aa79dcbae5bb"
                              : "1551288049-ff6e48b1e5ad"
                          }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`
                        }
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Course Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center mb-3">
                          <BookOpen className="h-5 w-5 text-primary mr-2" />
                          <span className="text-muted-foreground text-sm font-medium">
                            {course.semester}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-card-foreground mb-4 leading-relaxed">
                          {course.description}
                        </p>
                      </div>
                      <div>
                        <a
                          href={course.link}
                          className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
                        >
                          View Course <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </div>
                    </div>

                    {/* Vertical Course Code */}
                    <div className="w-12 bg-gradient-to-b from-primary to-primary/90 flex items-center justify-center">
                      <div
                        className="text-primary-foreground font-bold text-sm tracking-widest whitespace-nowrap"
                        style={{
                          transform: "rotate(90deg)",
                          transformOrigin: "center",
                        }}
                      >
                        {course.code}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Work Section */}
        <section className="py-20 px-6 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Papers */}
              <div>
                <div className="flex items-center mb-8">
                  <FileText className="h-8 w-8 text-foreground mr-3" />
                  <h2 className="text-3xl font-bold text-foreground">
                    Recent Publications
                  </h2>
                </div>
                <div className="space-y-6">
                  {papers.map((paper, index) => (
                    <div
                      key={index}
                      className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-bold text-card-foreground mb-2 leading-tight">
                        {paper.title}
                      </h3>
                      <p className="text-primary font-medium mb-1">
                        {paper.journal} ({paper.year})
                      </p>
                      <p className="text-muted-foreground text-sm mb-3">
                        {paper.authors}
                      </p>
                      <a
                        href={paper.link}
                        className="text-primary hover:text-primary/80 font-semibold text-sm inline-flex items-center"
                      >
                        Read Paper <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Books */}
              <div>
                <div className="flex items-center mb-8">
                  <BookOpen className="h-8 w-8 text-foreground mr-3" />
                  <h2 className="text-3xl font-bold text-foreground">
                    Published Books
                  </h2>
                </div>
                <div className="space-y-8">
                  {books.map((book, index) => (
                    <div
                      key={index}
                      className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <h3 className="font-bold text-card-foreground mb-2 text-lg leading-tight">
                        {book.title}
                      </h3>
                      <div className="text-sm text-muted-foreground mb-3">
                        <p>
                          {book.publisher} • {book.year}
                        </p>
                        <p>ISBN: {book.isbn}</p>
                      </div>
                      <p className="text-card-foreground mb-4 leading-relaxed">
                        {book.description}
                      </p>
                      <a
                        href={book.link}
                        className="text-primary hover:text-primary/80 font-semibold text-sm inline-flex items-center"
                      >
                        View Book <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <Github className="h-8 w-8 text-foreground mr-3" />
                <h2 className="text-4xl font-bold text-foreground">
                  Featured Projects
                </h2>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Showcasing exceptional student work and personal research
                projects that push the boundaries of technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border group"
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        {project.type === "student" ? (
                          <Users className="h-5 w-5 text-emerald-600 mr-2" />
                        ) : (
                          <Github className="h-5 w-5 text-primary mr-2" />
                        )}
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            project.type === "student"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {project.type === "student"
                            ? "Student Project"
                            : "Personal"}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">
                          {project.stars}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 font-medium">
                      by {project.author}
                    </p>
                    <p className="text-card-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
