import React from "react"
import {
  BookOpen,
  FileText,
  Github,
  ExternalLink,
  Users,
  Star,
} from "lucide-react"
import LandingNav from "@/components/landing-nav"
import Footer from "@/components/footer"

export default function SiteHome() {
  const courses = [
    {
      title: "Discrete Math for CS",
      code: "CMSI 2820",
      level: "Sophomore",
      description:
        "Deep dive into the mathematics that forms the foundation of computer science.",
      link: "/cmsi-2820",
      image: "/landing/discrete-landing-photo.webp",
    },
    {
      title: "Operating Systems",
      code: "CMSI 3510",
      level: "Junior",
      description:
        'Demystifying the "magic" that supports your everyday computing.',
      link: "/cmsi-3510",
      image: "/landing/operating-systems-landing-photo.jpg",
    },
    {
      title: "Programming Language Foundations",
      code: "CMSI 5850",
      level: "Graduate",
      description:
        "Mathematical foundations of the syntax and semantics of programming languages.",
      link: "/cmsi-5850",
      image: "/landing/foundations-landing-photo.webp",
    },
  ]

  const papers = [
    {
      title:
        "Investigating the Efficacy of Persistent Data Structures on Asymmetric Scheduling Algorithms for Heterogenous CPU Architectures",
      journal: "Master's Thesis",
      year: "2024",
      authors: "Gonzalez, Julian",
      link: "",
      image: "",
    },
  ]

  const books = [
    {
      title: "Concurrency Theory",
      publisher: "Springer London",
      year: "2006",
      isbn: "978-1-84628-336-1",
      description:
        "This book provides a comprehensive introduction to the theory of concurrent systems, covering topics such as process synchronization, message passing, and distributed systems.",
      link: "https://link.springer.com/book/10.1007/1-84628-336-1",
      image:
        "/landing/ConcurrencyTheory-CalculiAndAutomataForModellingUntimedAndTimedConcurrentSystems.png",
    },
    {
      title: "Operating Systems and Middleware",
      publisher: "Gustavus Adolphus College",
      year: "2015",
      description:
        "This book provides a comprehensive introduction to the theory of operating systems and middleware, covering topics such as process synchronization, message passing, and distributed systems.",
      link: "https://ia902302.us.archive.org/27/items/osm-rev1.2.pdf",
      image:
        "/landing/OperatingSystemsAndMiddleware-SupportingControlledInteractions.png",
    },
    {
      title: "Parallel Programming",
      publisher: "Morgan Kaufmann",
      year: "2017",
      isbn: "978-0128498903",
      description:
        "This book provides an upper level introduction to parallel programming. In addition to covering general parallelism concepts, this text teaches practical programming skills for both shared memory and distributed memory architectures.",
      link: "https://shop.elsevier.com/books/parallel-programming/schmidt/978-0-12-849890-3",
      image: "/landing/ParallelProgrammingConceptsAndPractice.jpg",
    },
    {
      title: "The Rust Programming Language",
      publisher: "No Starch Press",
      year: "2024",
      isbn: "978-1718503106",
      description:
        "This book provides a comprehensive introduction to the Rust programming language.",
      link: "https://doc.rust-lang.org/book/",
      image: "/landing/TheRustProgrammingLanguage2ndEdition.png",
    },
  ]

  const projects = [
    {
      title: "This Course Site!",
      author: "Julian Gonzalez",
      description:
        "This is the website you are currently on! It is built with NextJS, React, and More!",
      tech: ["NextJS", "React", "Tailwind", "TypeScript", "MDX"],
      stars: 0,
      link: "https://github.com/Jgonz156/personal-site",
      deploymentLink: "https://jag.prof",
      type: "personal",
    },
    {
      title: "GradeFlows and PostCommit",
      author: "Aidan Srouji",
      description:
        "AI-powered educational platform with personalized quiz generation and automated grading workflows",
      tech: ["React", "NextJS", "Docker", "TypeScript", "Tailwind"],
      stars: 0,
      link: "",
      deploymentLink: "https://gradeflows.com/",
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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/landing/Loyola-Marymount-University.jpeg')`,
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
            {/*
            <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
              "What if I told you that you already knew Computer Science? Don't Believe me? Let me show you then!"
            </p>
            */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="sticky top-0 z-50">
        <LandingNav />
      </div>
      <div className="relative bg-background">
        {/* Courses Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Courses
              </h2>
              {/*
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore my current course offerings designed to challenge and
                inspire the next generation of computer scientists
              </p>
              */}
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
                          {course.level}
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
                            {course.level}
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
                      className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div
                        className={
                          paper.image ? "flex flex-col sm:flex-row" : ""
                        }
                      >
                        {paper.image && (
                          <div className="sm:w-48 flex-shrink-0">
                            <img
                              src={paper.image}
                              alt={paper.title}
                              className="w-full h-48 sm:h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-1">
                          <h3 className="font-bold text-card-foreground mb-2 leading-tight">
                            {paper.title}
                          </h3>
                          {(paper.journal || paper.year) && (
                            <p className="text-primary font-medium mb-1">
                              {paper.journal}
                              {paper.journal && paper.year && " ("}
                              {paper.year}
                              {paper.journal && paper.year && ")"}
                            </p>
                          )}
                          {paper.authors && (
                            <p className="text-muted-foreground text-sm mb-3">
                              {paper.authors}
                            </p>
                          )}
                          {paper.link && (
                            <a
                              href={paper.link}
                              className="text-primary hover:text-primary/80 font-semibold text-sm inline-flex items-center"
                            >
                              Read Paper{" "}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Books */}
              <div>
                <div className="flex items-center mb-8">
                  <BookOpen className="h-8 w-8 text-foreground mr-3" />
                  <h2 className="text-3xl font-bold text-foreground">Books</h2>
                </div>
                <div className="space-y-8">
                  {books.map((book, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div
                        className={
                          book.image ? "flex flex-col sm:flex-row" : ""
                        }
                      >
                        {book.image && (
                          <div className="sm:w-48 flex-shrink-0">
                            <img
                              src={book.image}
                              alt={book.title}
                              className="w-full h-64 sm:h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6 flex-1">
                          <h3 className="font-bold text-card-foreground mb-2 text-lg leading-tight">
                            {book.title}
                          </h3>
                          {(book.publisher || book.year || book.isbn) && (
                            <div className="text-sm text-muted-foreground mb-3">
                              {(book.publisher || book.year) && (
                                <p>
                                  {book.publisher}
                                  {book.publisher && book.year && " • "}
                                  {book.year}
                                </p>
                              )}
                              {book.isbn && <p>ISBN: {book.isbn}</p>}
                            </div>
                          )}
                          {book.description && (
                            <p className="text-card-foreground mb-4 leading-relaxed">
                              {book.description}
                            </p>
                          )}
                          {book.link && (
                            <a
                              href={book.link}
                              className="text-primary hover:text-primary/80 font-semibold text-sm inline-flex items-center"
                            >
                              View Book{" "}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
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
                Below are some projects of mine and some exceptional student
                projects I have been apart of!
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
                      {project.stars !== undefined && project.stars > 0 && (
                        <div className="flex items-center text-muted-foreground">
                          <Star className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">
                            {project.stars}
                          </span>
                        </div>
                      )}
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

                    <div className="flex flex-wrap gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          View on GitHub
                        </a>
                      )}
                      {project.deploymentLink && (
                        <a
                          href={project.deploymentLink}
                          className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live Project
                        </a>
                      )}
                    </div>
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
