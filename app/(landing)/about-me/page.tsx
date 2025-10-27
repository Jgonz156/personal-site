"use client"

import React, { useState } from "react"
import {
  Mail,
  Linkedin,
  Github,
  BookOpen,
  Gamepad2,
  MessageCircle,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import LandingNav from "@/components/landing-nav"
import Footer from "@/components/footer"

type TabType = "story" | "interests" | "philosophy" | "connect"

export default function AboutMePage() {
  const [activeTab, setActiveTab] = useState<TabType>("story")

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
          <p className="text-xl text-muted-foreground mb-4">
            From broken PSPs to silicon cities, from manufacturing robots to
            teaching computers—
          </p>
          <p className="text-lg text-muted-foreground italic">
            Get to know the person behind the lectures
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            <Button
              variant={activeTab === "story" ? "default" : "ghost"}
              className="gap-2 whitespace-nowrap"
              onClick={() => setActiveTab("story")}
            >
              <BookOpen className="h-4 w-4" />
              My Story
            </Button>
            <Button
              variant={activeTab === "interests" ? "default" : "ghost"}
              className="gap-2 whitespace-nowrap"
              onClick={() => setActiveTab("interests")}
            >
              <Gamepad2 className="h-4 w-4" />
              Beyond the Classroom
            </Button>
            <Button
              variant={activeTab === "philosophy" ? "default" : "ghost"}
              className="gap-2 whitespace-nowrap"
              onClick={() => setActiveTab("philosophy")}
            >
              <GraduationCap className="h-4 w-4" />
              Teaching Philosophy
            </Button>
            <Button
              variant={activeTab === "connect" ? "default" : "ghost"}
              className="gap-2 whitespace-nowrap"
              onClick={() => setActiveTab("connect")}
            >
              <MessageCircle className="h-4 w-4" />
              Let's Connect
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* My Story Tab */}
        {activeTab === "story" && (
          <div className="animate-in fade-in duration-500">
            {/* Early Life */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-primary rounded"></div>
                <h2 className="text-3xl font-bold text-foreground">
                  Early Life: Silicon Cities
                </h2>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I grew up in the heart of Los Angeles—first on La Brea and
                  Rodeo (now Obama Boulevard) near Crenshaw, and later in
                  Hawthorne. I wasn't just raised by my grandparents; I was
                  community-raised by a collection of neighbors who helped shape
                  who I am today. Moving between these different parts of LA
                  gave me something invaluable: a deep, rooted connection to
                  this city and its people.
                </p>
                <p>
                  I'm part of the first generation to grow up with ready access
                  to the internet and social media—technology was exploding
                  around us as we came of age. My childhood was punctuated by an
                  ever-growing collection of gaming hardware: Game Boy Color and
                  Advance, DS, GameCube, Wii, Xbox (original through One), PSP,
                  PlayStation 2 through 4, and eventually a personal PC. These
                  weren't just devices—they were portals through which I made
                  formative memories, connecting with family and friends in ways
                  previous generations never could.
                </p>
                <p>
                  But here's the thing: I never saw myself as a "computer guy."
                  I was just someone who loved playing games. What I really
                  enjoyed was working with my hands—building things from wood,
                  Legos, metal, Play-Doh, whatever materials I could get my
                  hands on. I was a maker at heart, fascinated by how things
                  were put together.
                </p>

                <div className="my-8 pl-6 border-l-4 border-primary/30 bg-card/50 rounded-r-lg p-6">
                  <p className="text-foreground italic">
                    Most things you see day-to-day—chairs, tables—are simple to
                    understand. A few screws or nails, and you can see how it
                    all comes together. But computers? When you open one up, you
                    see an entire city of high-rises, streets, small buildings,
                    and intersections. Copper traces are the roads, capacitors
                    the buildings, the SoC the downtown district. I was enamored
                    with just staring at the components.
                  </p>
                </div>

                <p>
                  There's one memory that crystallizes this fascination: the day
                  my PSP broke. Was I devastated that I could no longer spend
                  nights hiding under blankets playing games? Absolutely. But
                  when I opened it up and saw the motherboard, the fan, the disc
                  tray—I couldn't look away. They were so intricate, so
                  detailed. No matter where you looked, there was always more to
                  see. Layer upon layer of complexity, all working together to
                  create something magical.
                </p>
                <p>
                  Years later, when I applied to LMU's Computer Science program,
                  I returned to this memory. I titled my personal statement
                  <span className="text-foreground font-semibold">
                    {" "}
                    "Technocivil Architecture"
                  </span>
                  —framing my desire to learn not just how to use computers, but
                  how to breathe life into these tiny silicon cities. That
                  broken PSP showed me a world I wanted to be part of building.
                </p>
              </div>
            </section>

            {/* PLTW - Middle School */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-primary rounded"></div>
                <h2 className="text-3xl font-bold text-foreground">
                  Middle School: Falling Into Engineering
                </h2>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I attended Richard Henry Dana Middle School (now Wiseburn
                  Middle School) in the Wiseburn School District. To be
                  completely honest, I was not a great student. Like most middle
                  schoolers, I was delinquent on homework, constantly watching
                  the clock until the bell rang for recess or lunch. I'd engage
                  meaningfully with class when I wanted to—getting excited about
                  history projects or asking for help with math homework when I
                  needed it—but I was hardly setting the world on fire
                  academically.
                </p>
                <p>
                  Then there was PLTW—Project Lead The Way—an early STEM
                  education program my school offered. I didn't seek it out or
                  make some conscious decision to pursue engineering. I simply
                  "fell" into it, choosing it as one of my electives without
                  much thought. PLTW and its curriculum did the rest.
                </p>
                <p>
                  What made PLTW different was that we didn't sit through boring
                  physics lectures or endless slide presentations. We{" "}
                  <em>made</em> things. We built mousetrap cars with coffee
                  stick axles, coin wheels, and playing card frames. We used
                  AutoDesk to 3D model trains and furniture through these huge
                  step-by-step packets. This was a form of education I could
                  actually latch onto. I hated sitting still and being told how
                  the world worked—PLTW let the world <em>show</em> me what it
                  was about. That difference was everything.
                </p>

                <div className="my-8 bg-primary/5 rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    The Mousetrap Car: Intellectually Naked
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    My memory of that time is hazy, but one project stands out
                    crystal clear: the mousetrap car. The instructions were
                    beautifully, terrifyingly simple:{" "}
                    <span className="text-foreground font-medium">
                      figure it out
                    </span>
                    .
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Never had I felt so intellectually "naked" before. I had no
                    idea where to start. I knew that cars connected wheels to
                    axles, but
                    <em>how</em> were we meant to connect coins to a coffee stir
                    stick? We ended up using some kind of pink Play-Doh-like
                    substance (I always think it was gum, though there's no way
                    it actually was).
                  </p>
                  <p className="text-muted-foreground mb-3">
                    But after solving that first problem—which felt like it
                    required genius—we hit the next wall: how did we get the
                    playing card body to sit on these makeshift wheel-and-axles?
                    Every time we laid it on top and let it roll, it simply
                    rolled off. How were we supposed to add weight when our
                    Play-Doh connections kept failing?
                  </p>
                  <p className="text-foreground italic">
                    I remember feeling so lost, and wanting more than anything
                    to learn so that I would never feel that lost again.
                  </p>
                </div>

                <p>
                  That experience taught me two crucial things. First, I didn't
                  like feeling lost—but not in a way that made me want to avoid
                  challenges. Rather, it lit a fire in me to learn, to build up
                  knowledge so I could tackle problems with confidence. Second,
                  and perhaps more importantly, I learned that I wanted to{" "}
                  <strong>make</strong> things.
                </p>
                <p>
                  Solving problems in math class felt pointless and flat, like
                  the paper we solved them on and eventually threw away. But
                  solving problems in PLTW? We crafted physical solutions. We
                  created things we could take home and use. No amount of
                  multiplication tables felt like progress, but learning how to
                  build something? That made an impact on the world by creating
                  something tangible, something you could touch and use. History
                  dates and facts felt hollow compared to the satisfaction of a
                  working mousetrap car.
                </p>
                <p>
                  I didn't like just "knowing" stuff—I liked{" "}
                  <strong>doing</strong> stuff. And I gained an appreciation for
                  knowledge and the brain being the major "muscle group" you
                  needed to work out to create things that mattered.
                </p>
                <p>
                  I wasn't a superstar in PLTW. I wasn't a genius or a big deal.
                  My grades never particularly stood out, and I got some special
                  recognition here and there, but nothing that made me different
                  from everyone else. I certainly remember the superstar
                  students who took to everything immediately, the ones teachers
                  always called on—but I wasn't one of them. And that's okay. I
                  was just a kid who liked working with his hands.
                </p>
                <p>
                  Most of my time in PLTW was spent creating non-electronic
                  things—cars, furniture, tools, even pieces of a board game if
                  I remember correctly. (It's not like they were going to let
                  middle schoolers mess around with live circuits!) My
                  fascination with "technocivil architecture" remained purely
                  physical. I imagined crafting structures on motherboards like
                  buildings: create a design document, CAD up a 3D model, run
                  stress simulations to ensure the structure would hold.
                </p>
                <p>
                  Of course, I had no idea that electronics aren't made the way
                  buildings are. But that's how I saw it anyway. I believed I
                  needed to learn how to make more things to eventually learn
                  how electronics worked—not knowing that mechanical engineering
                  doesn't cover that at all! Still, that misconception drove me
                  forward. By the end of middle school, I knew I wanted to work
                  with and build things, and that conviction led me to apply to
                  Da Vinci Science, a STEM-focused high school where I hoped to
                  continue this journey.
                </p>
              </div>
            </section>

            {/* FRC - High School */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-primary rounded"></div>
                <h2 className="text-3xl font-bold text-foreground">
                  High School: Building Robots, Becoming Myself
                </h2>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Getting into Da Vinci Science (DVS) was an exercise in luck.
                  As a public charter school operating outside the typical state
                  curriculum, admission was determined by lottery. If you lived
                  nearby, your odds were weighted higher—and I was lucky. I
                  actually knew friends whose parents had moved into the school
                  district just to boost their chances of getting in, but I had
                  no idea at the time. I walked into DVS thinking I was about to
                  have the same high school experience as everybody else in the
                  world.
                </p>
                <p>
                  That ignorant bliss meant I brought all my bad habits with me
                  from middle school. I wasn't a "good student" until junior
                  year, so early on I was just as delinquent as I'd always been.
                  Due to a funny quirk in Common Core 8, I'd learned a bit of
                  algebra, geometry, and trigonometry in 8th grade, which meant
                  I tested into geometry instead of algebra 2 in high school. My
                  geometry class was taught by Mr. Hurtado in a temporary
                  bungalow building with a long ramp out front. He'd check our
                  homework right at the door before we could sit down. So
                  naturally, when I'd forgotten to do my homework, I'd
                  purposefully go to the back of the line and hastily copy
                  answers from my friends. And I got away with it, too.
                </p>
                <p>
                  I bring this up because I wasn't a good student at the
                  beginning. It was FRC—FIRST Robotics Competition—that would
                  eventually "clean up" my act.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                  Two Weeks That Changed Everything
                </h3>
                <p>
                  After settling into school, we had a club day where booths
                  were set up in the lunch area for extracurriculars. Chess
                  club, CrossFit club, Youth and Government (which, ironically,
                  became the second largest club and later competed with us for
                  funding), and many others. I really didn't want to do
                  extracurriculars—it meant less time to go home and play games
                  with friends, less time to do my own thing.
                </p>
                <p>
                  But my brother pleaded with me to do what he'd done in high
                  school. He made me promise to try FRC for two weeks, and if I
                  didn't like it, I could leave and never look back. So I signed
                  up for two clubs: Game Club (the one I wanted) and FRC (the
                  one my brother told me to). I ended up surprising both of us—I
                  dropped Game Club to spend more time at FRC.
                </p>

                <div className="my-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
                  <h4 className="text-lg font-bold text-foreground mb-3">
                    What is FIRST Robotics Competition?
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    FRC is an international competition where teams of high
                    school students are given an enormous task:{" "}
                    <strong>you have six weeks</strong> to design, construct,
                    test, build, assemble, wire, program—everything under the
                    sun—a robot to complete a series of challenges on a game
                    field and compete against other teams' robots.
                  </p>
                  <p className="text-muted-foreground">
                    Looking back, it's sort of insane. But we had amazing
                    mentors from local engineering companies who wanted nothing
                    more than to see us succeed. And we did.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                  Four Years of Growth
                </h3>
                <p>
                  I joined Team 4201, the Vitruvian Bots—a team of around 50
                  students. My first year was about learning to learn and
                  figuring myself out as much as figuring out the robot. I
                  joined the mechanical side: I CADed parts, assembled field
                  elements, and used power tools to bring our collective vision
                  to life.
                </p>
                <p>
                  In my second year, I got my first-ever leadership position:
                  Field Construction Lead. Admittedly, it was a minor role—a
                  title to make us feel important—but I was responsible for
                  managing about five others. We'd be given design papers and
                  had to cut out wooden parts to assemble field elements for
                  practice.
                </p>
                <p>
                  After maturing greatly in my third year, I joined the coveted
                  CNC manufacturing part of the team. I learned MasterCAM and
                  how to command a massive machine to cut parts from metal
                  instead of wood. This was it—this was the future I wanted.
                </p>
                <p>
                  In my final year, I became our team's Manufacturing Lead,
                  responsible for everything concerning the budgeting, purchase,
                  delivery, handling, cutting, shaping, and cleaning of all
                  metal parts for the robot. I led around eight people to
                  accomplish it all. That year, we went to the FRC World
                  Championships in Houston and made it all the way to the final
                  game—the world championship game, held in a baseball stadium.{" "}
                  <strong>And we won.</strong>
                </p>

                <div className="my-8 pl-6 border-l-4 border-primary/30 bg-card/50 rounded-r-lg p-6">
                  <p className="text-foreground italic mb-3">
                    Here's what's funny about being a Computer Science professor
                    at LMU nowadays: I never programmed a single line of code in
                    FRC.
                  </p>
                  <p className="text-muted-foreground">
                    I was convinced I wanted to be a mechanical engineer focused
                    on efficient CNC manufacturing. I even dual-enrolled at El
                    Camino College through DVS's mechanical engineering
                    curriculum, taking actual college classes. In FRC, I always
                    worked with tools and my hands. The closest I ever got to
                    programming was getting CNC machines to cut parts. Even when
                    I had opportunities to work with electronics and wiring, I
                    ended up learning about pneumatics and solenoids instead—I
                    was wiring <em>air</em> through tubes rather than working
                    with what I do now!
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                  The Mountain I Didn't Mean to Climb
                </h3>
                <p>
                  If I had to list all the memorable moments from FRC—all the
                  events, competitions, long nights in the lab, the fears that
                  kept me engaged, the wins, the amazing people I shared months
                  of daily work with—we'd be here for years. But what's most
                  important isn't any one event. It's that FRC was a wholistic
                  transformation of myself and my desires. I wish every kid on
                  Earth could experience it, and I'm forever grateful I was one
                  of the lucky ones who got the chance.
                </p>
                <p>
                  FRC was an entire order of magnitude different from PLTW. PLTW
                  was a special elective designed to get kids engaged in STEM
                  through small, fun activities. FRC was a full-time job as a
                  worker at a company, designing brand-new machines from scratch
                  for unforgiving customers in only six weeks. If PLTW was what
                  got me into engineering, FRC was what made me <em>live</em>{" "}
                  what it truly was.
                </p>

                <div className="my-8 bg-primary/5 rounded-lg p-8 border-2 border-primary/20">
                  <p className="text-lg text-muted-foreground mb-4">
                    After all my time in FRC, I felt like I'd reached the top. I
                    was at the peak of mechanical engineering, staring at my
                    future in college from a summit I didn't even realize only a
                    few had climbed. When I stood up there, ready to become a
                    mechanical engineer at some prestigious university, I
                    paused.
                  </p>
                  <p className="text-lg text-foreground font-medium mb-4">
                    I blinked and realized something didn't feel right. I didn't
                    actually have a drive to go further. I didn't want to go to
                    college for what I'd just spent the best four years of my
                    life doing.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    Instead of leaping headfirst into mechanical engineering, I
                    stopped. And I applied for computer science
                    instead—something I had absolutely zero experience with.
                  </p>
                </div>

                <p>
                  I'm still unsure to this day why I never became a mechanical
                  engineer, but I can say it was the best decision I ever made.
                  I applied for a major I had no skills in, zero high school
                  experience to show for, at a college I'd never heard of (I
                  only knew schools with bleeding-edge mechanical programs). I
                  applied to Computer Science at Loyola Marymount University,
                  was accepted, and embarked into a scary place I knew nothing
                  about.
                </p>
                <p className="text-foreground font-medium">
                  I am no prodigy. I'm just a kid who got a lucky chance to
                  learn in a super engaging way, who stood at the top of one
                  mountain and had the courage to admit it wasn't the right one.
                </p>
              </div>
            </section>

            {/* LMU - Undergrad and Masters */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-primary rounded"></div>
                <h2 className="text-3xl font-bold text-foreground">
                  College: Learning to Swim in Deep Waters
                </h2>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Starting computer science with zero experience was terrifying.
                  I went from being "at the top of my game" to being the one
                  behind everyone else. Just like back in PLTW, I felt like I
                  "didn't know how to swim" while everyone else steamed
                  ahead—they'd all taken AP CS and already knew how to program.
                  It was brutal in the beginning. I tried to rationalize
                  concepts like variables and loops through physical
                  interpretations, but many of those base primitives in CS don't
                  map cleanly to things in mechanical engineering. Knowing how
                  to manufacture aluminum didn't help me understand
                  object-oriented programming.
                </p>

                <div className="my-8 bg-card rounded-lg p-6 border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    CSSI: A Lifeline
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    My saving grace was the CSSI (Computer Science Summer
                    Institute) program hosted by LMU and Google. I came to
                    campus two weeks before the semester started to learn
                    programming from scratch. We learned web design—JavaScript,
                    CSS, and HTML—building beginner sites like recipe
                    aggregators and compound interest calculators with hand-made
                    styling.
                  </p>
                  <p className="text-muted-foreground">
                    More importantly, I met many of my closest friends and built
                    a sense of community before I was thrown into the fire.
                    Learning to program felt just like learning to make things
                    did—like I was learning to walk. I constantly stumbled and
                    needed those extra pushes from my professors and peers to
                    keep me upright.
                  </p>
                </div>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                  The Aha Moments
                </h3>
                <p>
                  I had many "aha" moments throughout my time in CS. From
                  finally grasping static vs. dynamic in Java—which gave me the
                  mental model for class-based OOP—to realizing that trees and
                  nodes don't literally need to be stored as objects on the heap
                  because they can be accurately modeled by an array. But the
                  most important realization I ever made in CS wasn't about any
                  particular topic of efficiency or computational optimization.
                </p>

                <div className="my-8 pl-6 border-l-4 border-primary bg-primary/5 rounded-r-lg p-6">
                  <p className="text-lg text-foreground font-medium mb-3">
                    I realized that learning about CS felt like learning about
                    learning itself.
                  </p>
                  <p className="text-muted-foreground">
                    Especially in my AI courses, where we often needed to
                    self-reflect on how we operate to teach a computer to act
                    similarly. CS isn't about making computers calculate or
                    "making a rock think"—it's about how we efficiently teach
                    someone who has no background for what they're learning. The
                    more I looked around at topics in CS, the more I realized
                    that each space was a microcosm for teaching someone about
                    something brand new.
                  </p>
                </div>

                <p>
                  Some important undergraduate highlights, besides achieving key
                  milestones in my journey as a software engineer, were related
                  to the community I worked with and learned from every day.
                  From the early friends I made in CSSI who helped me get
                  through those hard freshman semesters, to the professors who
                  put contortionists to shame bending over backward to ensure we
                  learned during the COVID lockdowns, to the staff who work
                  equally hard to maintain our classrooms, labs, and workspaces
                  (many of whom I got to meet by staying late in labs—sometimes
                  until 1 in the morning!).
                </p>
                <p>
                  The community at LMU's CS department reminded me of the
                  special experience I'd had at FRC—a world-class experience
                  that I'd once again be removed from after four years. Except
                  this time, I had the ability to stay for at least one more
                  year through the 4+1 master's program.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                  The Realization: I've Always Been a Teacher
                </h3>
                <p>
                  I haven't mentioned this until now because it didn't seem to
                  fit anywhere else, but all throughout my life, I was teaching
                  people about everything I knew. I ran workshops in FRC. I led
                  people not by commanding their every move but by teaching them
                  the skills they needed to be self-sufficient. I'd always come
                  home from school excited to tell my parents what I'd learned,
                  amazed by everything there was to talk about. It was my
                  natural way of sharing with others.
                </p>
                <p>
                  It took me until the end of my undergraduate education to
                  realize this. I was always tutoring late nights in the CS lab
                  for courses I wasn't even a TA for, just because those moments
                  when someone else has their "aha" moment were, well,{" "}
                  <em>addicting</em>. To see someone's eyes light up with
                  excitement when all they were doing before was moping and
                  struggling—it's incredible! I was making a real positive
                  impact on others.
                </p>

                <div className="my-8 bg-card/50 rounded-lg p-6 border border-border">
                  <p className="text-muted-foreground mb-3">
                    I liked tutoring and teaching so much, did it so often and
                    so instinctually, that I actually got reprimanded for it.
                    Never thought you could get in trouble for teaching too
                    much, but believe it or not, it's possible for very
                    legitimate reasons—like accidentally being owed too much
                    money because I was tutoring on a limited work-study budget
                    and would constantly go over.
                  </p>
                  <p className="text-muted-foreground italic">
                    I started not billing tutoring hours to avoid putting my
                    supervisors in an awkward spot. Alas, this was not allowed
                    either.
                  </p>
                </div>

                <p>
                  I realized that learning in CS never got old for me—not
                  because it was a more interesting space than mechanical
                  engineering, but because I've always loved teaching. And in
                  essence, CS is just that: teaching someone who's struggling to
                  get it right, and by making minor communication differences, I
                  can help them reach that "aha" moment.
                </p>
                <p>
                  I pursued a master's degree not for more money, notoriety, or
                  recognition from others, but because I was going to learn{" "}
                  <strong>
                    the theory behind teaching in its most pure form
                  </strong>
                  , and I very selfishly needed to know how to teach better.
                </p>

                <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">
                  Master's: The Theory of Teaching
                </h3>
                <p>
                  After I had a better idea of why I enjoyed CS, my master's
                  experience clicked in a way an academic experience never has
                  for me. Every topic I learned—from computability theory to
                  complexity theory, language and automata theory—they're all
                  just the necessary building blocks to teach:
                </p>

                <div className="my-8 grid md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg p-5 border border-border">
                    <h4 className="font-bold text-foreground mb-2">
                      Language Theory
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      The underlying mechanics behind the efficient
                      communication of ideas
                    </p>
                  </div>
                  <div className="bg-card rounded-lg p-5 border border-border">
                    <h4 className="font-bold text-foreground mb-2">
                      Automata Theory
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      The underlying abilities of the people (computers) we're
                      trying to teach to move
                    </p>
                  </div>
                  <div className="bg-card rounded-lg p-5 border border-border">
                    <h4 className="font-bold text-foreground mb-2">
                      Complexity Theory
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      How many resources are necessary to get an automaton to
                      believe
                    </p>
                  </div>
                  <div className="bg-card rounded-lg p-5 border border-border">
                    <h4 className="font-bold text-foreground mb-2">
                      Computability Theory
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Whether there is a limit to what can be taught
                    </p>
                  </div>
                </div>

                <p>
                  This was where my ability to teach was given a world-class
                  deep dive into its every part, where I refined not only how I
                  learn but how I help others do so too. It's also where I got
                  the chance to explore where I truly love to work in CS:{" "}
                  <strong>low-level systems</strong>.
                </p>
                <p>
                  Learning about concurrent and parallel systems truly felt like
                  the real world—finally, the work I was programming reflected
                  how our day-to-day experiences function. And the lower-level I
                  went, the greater my ability to teach became as well. Automata
                  theory taught me that you need to understand the underlying
                  systems you're using to be optimal, and that I'd need to learn
                  about operating systems if I was ever going to prove something
                  about a piece of software all the way down to the very
                  architecture it relies on.
                </p>
                <p className="text-foreground font-medium">
                  Finally, I got to walk the streets of those small silicon
                  cities that had enamored me my whole life.
                </p>

                <div className="my-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-xl p-8 border-2 border-primary/20">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    My Thesis: Teaching Diverse Learners
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    This culminated in my master's thesis on heterogeneous
                    architecture and how to write efficient scheduling
                    algorithms for them. The problem is one we run into every
                    single day and is a perfect reflection of my desire to
                    teach:
                  </p>
                  <p className="text-lg text-foreground font-medium mb-4 italic">
                    How do you optimally teach given a collection of so many
                    different individuals? How do you craft an environment where
                    everyone wins when nobody is the same?
                  </p>
                  <p className="text-muted-foreground">
                    That is the question I decided I wanted to spend my whole
                    life answering. Good thing my master's education taught me
                    that solving this problem optimally can't be done in
                    general—so I'll certainly have my whole life to work on it.
                  </p>
                </div>

                <p className="text-lg">
                  After all my lived experiences, all the different spaces I
                  learned in, all the topics I got bored of and left and came
                  back to, the one thing that stayed with me through it all was
                  my natural inclination to teach.
                </p>
                <p className="text-lg text-foreground font-semibold">
                  And so my path from there became clear: I had to make it my
                  full-time job.
                </p>
              </div>
            </section>

            {/* Closing Reflection */}
            <section className="mb-16 bg-gradient-to-br from-primary/5 to-background rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
                Where I Am Today
              </h2>
              <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
                Today, I'm a professor of Computer Science at Loyola Marymount
                University—the same place that took a chance on a kid with zero
                CS experience but a lot of curiosity. I teach courses in
                discrete mathematics, operating systems, and foundations of
                computation, always working to help students have their own
                "aha" moments. I'm still learning how to teach better, still
                exploring those silicon cities, and still trying to solve that
                unsolvable problem of optimal education for diverse learners. I
                wouldn't have it any other way.
              </p>
            </section>
          </div>
        )}

        {/* Beyond the Classroom Tab */}
        {activeTab === "interests" && (
          <div className="animate-in fade-in duration-500">
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Coming Soon!
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                This section will feature things like games I've been playing,
                books I'm reading, projects I'm tinkering with, and other
                interests that help you see me as a whole person, not just a
                professor.
              </p>
              <div className="mt-8 p-6 bg-card rounded-lg border border-border max-w-md mx-auto">
                <p className="text-sm text-muted-foreground italic">
                  Check back soon for updates on what I'm up to outside the
                  classroom!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Teaching Philosophy Tab */}
        {activeTab === "philosophy" && (
          <div className="animate-in fade-in duration-500">
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Coming Soon!
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                This section will explore my approach to teaching, what I
                believe about education, and how I try to create an environment
                where all students can thrive—regardless of their background or
                prior experience.
              </p>
              <div className="mt-8 p-6 bg-card rounded-lg border border-border max-w-md mx-auto">
                <p className="text-sm text-muted-foreground italic">
                  Spoiler: It has a lot to do with heterogeneous scheduling
                  algorithms and that "unsolvable" problem from my thesis.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Let's Connect Tab */}
        {activeTab === "connect" && (
          <div className="animate-in fade-in duration-500">
            <section className="text-center py-12">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Thanks for Reading!
              </h2>
              <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
                If you've made it this far through my story, you've just spent a
                good chunk of time getting to know me. That means a lot.
              </p>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Now that you know my journey—from taking apart broken PSPs to
                teaching operating systems—how about we learn together? Whether
                you're a current student, prospective student, fellow educator,
                or just someone curious about CS education, I'd love to hear
                from you.
              </p>

              <div className="my-12 p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-xl border border-border max-w-2xl mx-auto">
                <p className="text-muted-foreground mb-6">
                  I'm always happy to chat about computer science, teaching, FRC
                  robotics, mechanical engineering turned software engineering
                  stories, or anything else that's on your mind.
                </p>
                <p className="text-foreground font-medium">
                  Real talk: I genuinely enjoy these conversations. Don't
                  hesitate to reach out.
                </p>
              </div>

              <div className="flex justify-center gap-4 flex-wrap mb-8">
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() =>
                    window.open("mailto:Julian.Gonzalez@lmu.edu", "_blank")
                  }
                >
                  <Mail className="h-5 w-5" />
                  Email Me
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/jgonz156/",
                      "_blank"
                    )
                  }
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  onClick={() =>
                    window.open("https://github.com/jgonz156", "_blank")
                  }
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </Button>
              </div>

              <div className="mt-12 p-6 bg-card rounded-lg border border-border max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Office Hours & Availability
                </h3>
                <p className="text-muted-foreground mb-3">
                  Current students: Check the course syllabus for my office
                  hours, or shoot me an email to set up a time to chat.
                </p>
                <p className="text-muted-foreground">
                  Everyone else: Feel free to reach out via email or LinkedIn. I
                  try to respond within a day or two.
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
