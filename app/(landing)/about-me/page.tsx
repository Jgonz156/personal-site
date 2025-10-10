import React from "react"
import { Mail, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import LandingNav from "@/components/landing-nav"
import Footer from "@/components/footer"

export default function AboutMePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50">
        <LandingNav />
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground">
            Get to know the person behind the lectures
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Personal Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            My Journey
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              I've always been fascinated by the intersection of theory and
              practice in computer science. My journey began as an undergraduate
              at UC Berkeley, where I first discovered my passion for algorithms
              and their real-world applications.
            </p>
            <p>
              After completing my Ph.D. at Stanford, I knew I wanted to dedicate
              my career to both advancing the field through research and
              inspiring the next generation of computer scientists through
              teaching. There's nothing quite like the moment when a student's
              eyes light up as they grasp a complex concept or solve a
              challenging problem.
            </p>
            <p>
              Beyond the classroom and lab, I'm an advocate for making computer
              science education more accessible and inclusive. I believe that
              diverse perspectives lead to better solutions and more innovative
              thinking.
            </p>
          </div>
        </section>

        {/* Teaching Philosophy */}
        <section className="mb-16 bg-card rounded-xl p-8 shadow-md border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Teaching Philosophy
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I believe that the best learning happens when students are
              challenged to think critically and creatively. My courses are
              designed to push boundaries while providing the support needed for
              every student to succeed.
            </p>
            <p>
              I emphasize hands-on projects and real-world applications because
              I believe that understanding the "why" behind concepts is just as
              important as mastering the "how." My goal is not just to teach
              algorithms or data structures, but to help students develop
              problem- solving skills that will serve them throughout their
              careers.
            </p>
          </div>
        </section>

        {/* Personal Interests */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Beyond Academia
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <h3 className="text-xl font-bold text-card-foreground mb-3">
                Hobbies & Interests
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Contributing to open-source software projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Hiking and exploring national parks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Photography (especially landscape and nature)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Playing chess and solving puzzles</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <h3 className="text-xl font-bold text-card-foreground mb-3">
                Community Involvement
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Mentor for underrepresented students in STEM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Organizer of local coding bootcamps for youth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Speaker at tech conferences and meetups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Volunteer at community maker spaces</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-xl p-12 shadow-md border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always happy to chat with students, fellow researchers, or
            anyone interested in computer science. Feel free to reach out!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="gap-2">
              <Mail className="h-5 w-5" />
              Email Me
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Github className="h-5 w-5" />
              GitHub
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
