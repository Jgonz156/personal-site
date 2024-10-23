import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"

export default function LectureNotes4() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        middle: {
          lectureId: "HW2",
          buttonColor: "success",
          buttonName: "Counting Sheep",
          buttonSlug: "/cmsi-2820/hw2",
        },
        right: {
          lectureId: "LN5",
          buttonColor: "primary",
          buttonName: "Meet The Booleans, Don't Worry There's only Two of Them",
          buttonSlug: "/cmsi-2820/ln5",
        },
      }}
    >
      <CourseBox>
        <TitleBox
          title="Primitive Beginnings"
          quote={`"A journey of a thousand miles begins with a single step." - Lao Tzu`}
        />
        <Speak>
          Now that we have a strong logical foundation for discovering and
          speaking declaratively about the world around us, we will now build
          the mathematical world from scratch.
        </Speak>
        <Speak>
          However, we are faced with a similar problem to what we encountered
          with logic. In what system does arithmetic live? Where does algebra
          come from? What rules govern why numbers act the way they do?
        </Speak>
        <Speak>
          These are the questions we seek to answer, and without going through
          around 2000 years of mathematical history, we will skip to the modern
          era, where we have access to 3 main systems to base our mathematics
          off of!
        </Speak>

        <Speak>
          These major systems are Set Theory, Category Theory and last but not
          least, our favorite for this course, Type Theory. Lets see them each
          in turn and see which one is most useful for our purposes. Hint: Its
          Type Theory!
        </Speak>
        <TopicBreak title="Set Theory" />
        <Speak>
          Without getting into some very serious mathematics, we will summarize
          set theory by analyzing a few of its most basic properties. Set Theory
          is, sort of a misnomer as well because there is no one Set Theory,
          instead the closest one to being the defacto standard is called ZFC.
        </Speak>
        <Speak>
          Set Theory specifies that most, if not all of mathematic can be
          represented as just sets with a sufficient number of axioms (rules)
          that specify how each group of sets interact with one another.
        </Speak>
        <Speak>
          Wait, so everything is just a set? Like a collection of stuff? Yes.
          One of the most famous works in this space is the Principa
          Mathematica, which sought to build all of mathematics from the very
          ground up by defining everything as sets and rules.
        </Speak>
        <Speak>
          We won't see what sets are directly until the collections unit, but to
          describe what Set Theory does in the terms we want to use going
          forward is that it defines one type of primitive, the set. Primitives
          are simply those things that make up the very "floor" of our system,
          they are the atomic building blocks just like we saw with true, false,
          absurdity, and the atomic propositions. Wherein logic we wanted to
          find a way to build all possible compound propositions, in set theory,
          we want to build all of Arithemtic, Alegbra, Calculus, etc with just
          sets.
        </Speak>
        <Speak>
          Prior to around the 1870's, before the work of George Cantor and
          others, there didn't seem to be a need to rigorously define where all
          math comes from since everything just seemed to work together on its
          own. However, Set Theory provided a method of describing our number
          systems in a manner that allowed us to speak of what infinity "looked"
          like, which was a large motivator for making these formalized rules.
        </Speak>
        <Speak>
          Potentially, if you could make a system that could formally describe
          infinity, we could have a better grasp of a whole different nature of
          mathematics.
        </Speak>
        <Speak>
          However, the system has some draw backs. Intuitively, because
          everything is a set, nothing is truly different from each other. Each
          "thing" is all just the same and so weird mostly "ignorable" issues
          arose where you could make non-sensical statements about how two
          complete different items compare to one another.
        </Speak>
        <Speak>
          Not to mention that the system is non-self constructing. You need to
          have axioms, or accepted rules, to make the system work from the
          ground up and whether to make certain axioms, reform them in specific
          ways, or even include them at all is of great debate and leaves this
          major system fractured.
        </Speak>
        <Speak>
          We will speak more of this system as we learn Boolean Algebra, Sets
          themselves, and at the very end of the course where we briefly dive
          into how choosing it as our foundational system alters some of what we
          will do in the course moving forward.
        </Speak>
        <TopicBreak title="Category Theory" />
        <Speak>
          While Set Theory wasn't formalized until the 1870's, its "bones" go
          way back. Category Theory however is much newer. Starting only back in
          the early-to-mid 20th century in the 1940's, it was born to help
          describe and solve problems in algebraic topology.
        </Speak>
        <Speak>
          While I definitely cannot speak to such a field, topology is the study
          of surfaces. This involves Torus's (Donut), Mobius strips, Klein
          Bottles, and many other unique shapes.
        </Speak>
        <Speak>
          This field is to thank for an amazing theorem known as the Wobbly
          Table Theorem. Which simply states that given a square table of even
          legs, a surface that is differentiable (smooth) should contain a
          unique rotational angle that results in the table no longer being
          wobbly. As far as I understand it the table needs to be perfect, but
          the floor can be terrible and the theorem will hold!
        </Speak>
        <Speak>
          So unfortunately if you have a bad table, you'll need to stuff the
          legs, but if you have a bad floor, just try rotating the table and see
          if that fixes it!
        </Speak>
        <Speak>
          Anyway, Category Theory is a general extension of algebraic topology
          where you define everything in terms of structures and morphisms that
          can mutate the structures into new ones. This is interesting as the
          primitives present in this system are different to Set Theory!
        </Speak>
        <Speak>
          Instead, structures can be defined as the starting point and mutated
          into new ones via these "functions" that take them as inputs and
          "spits" them back as as something new!
        </Speak>
        <Speak>
          This lends Category Theory well to programming as it feels like the
          very nature of functions and objects! Much of Category Theory is
          actually used to help formalize computer systems that rely on semantic
          models and functional programming.
        </Speak>
        <Speak>
          However, due to the youth of the system and its use in CS being mostly
          limited to very special algebraic applications of functions, it
          doesn't come up often enough to describe simpler situations in CS.
          This is not to say that it couldn't, just that it isn't used much for
          this.
        </Speak>
        <TopicBreak title="Type Theory" />
        <Speak>
          This brings our discussion to Type Theory. Type Theory splits the
          difference in age between Set Theory and Category Theory as it was
          born to solve issues with some of the very first formalized versions
          of Type Theory. Interestingly, Set Theory ran into issues with
          paradoxes, and in the Principia Mathematica, "types" or what are
          better called hexarchies were used to help distinguish certain sets
          with greater specificity to avoid paradoxes involving infinite sets.
        </Speak>
        <Speak>
          This all occurred around 1902 to 1912. Creating Type systems became
          popular as it gave a way to distinguish and categorize separate
          entities from one another and define how they interacted with each
          other. These Type Systems eventually ballooned into systems designed
          to allow for the production of any number of types, thus giving these
          systems the ability to "learn" and capture more and more unique types
          as they grew.
        </Speak>
        <Speak>
          This lead to two major influential works for creating a new foundation
          for all of mathematics called Alonso Church's Lambda Calculus (Which
          formed the basis of Higher Order Logic) and per Martin Lof's
          intuitionistic type theory.
        </Speak>
        <Speak>
          These two seminal works are important as Alonso Church developed and
          formalized his work alongside a little known individual, his PhD
          advisee, Alan Turing.
        </Speak>
        <Speak>
          Per Martin Lof's intuitionistic type theory formalized most of the
          basis for constructive mathematics, a branch of mathematics that
          heavily follows the "intuitions" we discovered in the logic standard!
        </Speak>
        <Speak>
          Combining these two works to create the simply typed lambda calculus
          created a system that is still used today to define most computer
          systems formally.
        </Speak>
        <Speak>
          What are the primitives of this system? Well, types! Types are sort of
          like the "ideas" we covered in logic, they themselves are one unique
          intangible classification for a potentially infinite number of
          "things" that represent them. Those familiar with Object Oriented
          Programming in languages like C++, Java, Python, JavaScript, Swift,
          Rust, you know what pretty much any language that includes OOP uses
          this method.
        </Speak>
        <Speak>
          They all call it different things, use different syntax, and even
          build up the concept in different manners, but at the end of the day
          they are all using some form of Type Theory to give a foundation for
          validating their systems.
        </Speak>
        <Speak>
          These primitive types allow or new types to be made on command, given
          a few pieces of information. Formally, you need to display your type
          adheres to some interesting properties, but informally we will
          describe them as the following: You need properties/attributes to
          define your type (What is your type made up of that differentiates it
          from other types?) or you need interactions that type can make with
          other types and you need to define how members/instances/objects of
          the type are.
        </Speak>
        <Speak>
          Admittedly that is an odd list. Technically you don't even need all
          those pieces but it makes it super intuitive as to what comes next.
          When making a class in python, for instance, we need to do a few
          things: We need to give it a name, give it some attributes, and some
          methods!
        </Speak>
        <Speak>
          This directly reflects the requirements to make a type! (As a brief
          hint to where we are going this is NOT a coincidence) This is exactly
          why as programmers we are going to want to learn Type Theory as it
          directly reflects the reality of the tools we use day to day in
          software development!
        </Speak>
        <Speak>
          With this brief history lesson over, why don't we look at Type Theory
          more formally.
        </Speak>
        <TopicBreak title="A New World" />
        <Speak>
          Type theory starts from a very basic foundation, discovering and
          making a type. The easiest way to discover one, is to find an object!
          We can then use that object to discover the type! This is formalized
          as the following:
        </Speak>
        <MathJax>{`$$a:A$$`}</MathJax>
        <Speak>
          This says that "a" is proof of the existence of "A". This is because
          type theory is Constructive in nature. This means that when we want to
          show a larger pattern or idea it must be shown to have an actual
          instance of itself occurring. Equally, we can say that "a" is an
          instance of the type "A".
        </Speak>
        <PhilosophyBreak
          qa={[
            {
              question:
                "Does this mean that something doesn't really exist if there isn't an example of it?",
              answer: `According to a constructive perspective, Yes! This appeals to this argument 
            "If an Idea has no tangible example to base its existence on, than it is no different 
            in its power to represent the world as something that doesn't exist"`,
            },
          ]}
        />
        <Speak>
          To give a concrete example of this using some basic algebra, take the
          following:
        </Speak>
        <MathJax>{`$$\\begin{matrix} 
        \\text{Find x:}\\\\
         10 > x > 3 
         \\end{matrix}$$`}</MathJax>
        <Speak>
          This example is simple enough, we can choose many different numbers to
          solve this problem right? A constructive system in nature does NOT
          want you to prove "x" exists by suggesting that it should via rules
          about 10, 3, and the great than sign. Instead a true constructive
          proof shows this pattern is real by finding an actual instance of "x"
          that fulfills the pattern. In this case would could use 7. By finding
          7, we can directly show that the pattern holds!
        </Speak>
        <Speak>
          However we need to "pump the brakes". How did we know 7 would work?
          Why doesn't the string "dogs" work to solve this problem? Thats
          because the string "dogs" is not the same "type"!
        </Speak>
        <Speak>
          Our greater than operator is only defined to work on "numbers" and so
          of course it seems silly to place something else there, but could we
          define a method by which putting a string would be valid? What if we
          just took the length of the string? Then would "dogs" work? In a
          sense, yes! with that new interaction in place that could make sense!
        </Speak>
        <Speak>
          This work of defining types, what their objects\instances look like,
          and defining operators on them is what we will be doing for the rest
          of the semester! The fact that Type Theory can capture this process
          moving forward is why we are learning it as a foundation for all of
          mathematics! Or at the very least in our case for just CS
        </Speak>
        <Speak>
          To end, lets take a sneak peak at what types are used in that
          previous, small algebraic example!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{Find x: int | string: }\\\\
         10:int \\space >:(int|string)\\to boolean \\space x:int|string >:(int|string)\\to boolean \\space 3:int 
         \\end{matrix}$$`}</MathJax>
        <Speak>
          Of course we will refrain from writing things like this exactly as it
          is brutal to read, but this is an interesting way of seeing this all
          written out!
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
