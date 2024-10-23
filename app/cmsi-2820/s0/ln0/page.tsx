import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import ImageBox from "@/components/course/image-box"
import CodeBox from "@/components/course/code-box"
import MultiSelectQuestion from "@/components/course/multi-select-question"
import Vocab from "@/components/course/vocab"
import BookCard from "@/components/global/book-card"
import { Typography } from "@mui/material"

export default function LectureNotes0() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        middle: {
          lectureId: "HW0",
          buttonColor: "success",
          buttonName: "Practicing Homework",
          buttonSlug: "/cmsi-2820/hw0",
        },
      }}
      footerInfo={
        <>
          <BookCard
            {...{
              title: "Parallel Programming: Concepts and Practice",
              authors: [
                "Schmidt, Bertil",
                "Gonzalez-Martinez, Jorge",
                "Hundt, Christian",
                "Schlarb, Moritz",
              ],
              pages: 416,
              abstract: (
                <>
                  <Typography>
                    Parallel Programming: Concepts and Practice provides an
                    upper level introduction to parallel programming. In
                    addition to covering general parallelism concepts, this text
                    teaches practical programming skills for both shared memory
                    and distributed memory architectures. The authors'
                    open-source system for automated code evaluation provides
                    easy access to parallel computing resources, making the book
                    particularly suitable for classroom settings.
                  </Typography>
                  <Typography>
                    Covers parallel programming approaches for single computer
                    nodes and HPC clusters: OpenMP, multithreading, SIMD
                    vectorization, MPI, UPC++.
                  </Typography>
                  <Typography>
                    Contains numerous practical parallel programming exercises.
                  </Typography>
                  <Typography>
                    Includes access to an automated code evaluation tool that
                    enables students the opportunity to program in a web browser
                    and receive immediate feedback on the result validity of
                    their program.
                  </Typography>
                  <Typography>
                    Features an example-based teaching of concept to enhance
                    learning outcomes.
                  </Typography>
                </>
              ),
              link: undefined,
              imageSlug:
                "/book-covers/ParallelProgramming-ConceptsAndPractice.jpg",
            }}
          />
        </>
      }
    >
      <CourseBox>
        <TitleBox
          title="Reading Course Material"
          quote={`"Tell me and I forget. Teach me and I remember. Involve me and I learn." - Benjamin Franklin`}
        />
        <TopicBreak title="Speak Component" />
        <Speak>
          Hello reader! This "lecture" of sorts is here to provide you with a
          small introduction to using this course site. The text you see here is
          in a "Speak" component, which is used functionally like a script of my
          voice in the site. It doesn't look like much and thats on purpose
          since its meant to be the base of the site's information thats being
          presented. I prefer to teach through conversation rather than a more
          "medical" feeling list of topics and their descriptions. For those who
          prefer that style there are other additions we will go over in this
          lecture to support that style of learning.
        </Speak>
        <Speak>
          Additionally, we have already passed by 3 other site components that
          should be mentioned before we continue! At the very top of the page
          you find the course navigation bar. A button to access the course's
          homepage with its "one-stop-shop" table is provided in blue, a button
          to access the course's "cheat sheet" full of good information at a
          glance is provided in green, and a button to access the course's
          syllabus is provided in orange. The course navigation bar is a great
          way to quickly access the main pages of the course site.
        </Speak>
        <Speak>
          Beneath that is a simple title box that holds, well, the title of the
          lecture in question and a nice quote to accompany the discussion that
          will follow in the lecture. Simple as that!
        </Speak>
        <Speak>
          The third and final component we have passed by is the topic break.
          It's a simple component that serves to separate topics from one
          another. This is useful for quickly skimming the lecture notes incase
          you need to find a specific topic quickly. It's a simple addition but
          it's honest work. Lets move onto the next component of the site, the
          Philosophy Break.
        </Speak>
        <TopicBreak title="Philosophy Break Component" />
        <Speak>
          The following component beneath this speak component is the philosophy
          Break component. It's job is quite simple, it just provides a way for
          me to separate out cool and thought provoking questions that arise
          from the lecture material. They have an accordion style design so that
          the answer is hidden to give you a brief moment to ponder the
          questions as well!
        </Speak>
        <PhilosophyBreak
          qa={[
            {
              question: "I am thought provoking question number 1!",
              answer:
                "You know, if you really think about the fact that question just spoke to you, its quite demeaning to just sum up its whole existence with this response.",
            },
            {
              question: "I am the second thought provoking question!",
              answer: `I don't really like being paired with that question above me, he's a bit of a downer. Get it? Downer? Because he's the top part of the accordion and he let's me "down"? or wait, am I the downer because I drop down from underneath? Wait, please don't close me yet, I'm not ready to go back into the box!`,
            },
          ]}
        />
        <Speak>
          An important note as a student is that nothing found in these boxes
          will ever be required for you to know and you won't ever be tested on
          the information in them either. They are simply a space to provide a
          small break from material and enjoy a small "philosophical" moment.
          The next component is for those who prefer direct definitions.
        </Speak>
        <TopicBreak title="Vocab Component" />
        <Speak>
          The vocab component is really quite simple. It highlights words of
          interest in green and then presents a tooltip with additional
          information about it. This is important because the conversational
          nature of this course site means that when I use a word that I mean to
          have a direct definition relating to course material, there will be no
          ambiguity versus when I use the same word in a conversational manner.
          An example of this is the word "component" in the previous sentence.
          It was used in a conversational manner to describe the different parts
          of the site, but it could also be used in a more technical manner to
          describe a reusable piece of code in a website designed using the
          React framework (just like this site!). So I might say the{" "}
          <Vocab definition="Components are functions that return HTML elements. They are independent and reusable bits of code (This definition brought to you by w3schools slightly modified by me)">
            component
          </Vocab>{" "}
          that makes this very speech box is useful, while simultaneously saying
          that it makes up a useful component of my site. There it was! And
          that's all it is. A simple way to provide clarity in my speech. The
          next component is provided so that you don't have to view my bad
          handwriting in place of proper symbology!
        </Speak>
        <TopicBreak title="LaTeX Component" />
        <Speak>
          This next component of my site is very straightforward. I will need to
          display direct symbology from time to time and rather than just
          uploading an image of my handwriting, I will use the LaTeX system
          "under the hood" to display it instead. Below is some representative
          symbology that will most likely be destroyed by my handwriting.
        </Speak>
        <MathJax>{`$$ \\sum_{n = 100}^{1000}\\left(\\frac{10\\sqrt{n}}{n}\\right) $$`}</MathJax>
        <MathJax>{`I can also display inline math symbols too \\(A=\\{a_{0}, a_{1}, ..., a_{n}\\}\\), Cool right?`}</MathJax>
        <Speak>
          Thats a{" "}
          <Vocab definition="A collection of unique items with no inherent order">
            set
          </Vocab>{" "}
          if you are wondering, they thing above it is a summation of all
          numbers from 100 to 1000 of the fraction of 10 times the square root
          of n divided by n where n is of of the number in that 100 to 1000
          range. It's a bit of a mess but it's a good example of what we are up
          against here.
        </Speak>
        <Speak>
          I guess explaining that what your seeing is actually LaTeX under the
          hood doesn't really matter that much to you, but now you at least know
          what to use when you want to display similar symbols in code when
          interacting with a graphical interface.
        </Speak>
        <TopicBreak title="Image Component" />
        <Speak>
          This next one is pretty self-explanatory, but this lecture is meant to
          be a comprehensive collection of all the reoccurring portions of the
          site. This one is the image component. It's used to display relevant
          images or my drawings/diagrams.
        </Speak>
        <ImageBox
          images={[
            {
              url: "/lmu-identity/LMU-Campus-Ariel.jpg",
              caption: <Speak>This is an ariel view of LMU!</Speak>,
            },
            {
              url: "/lmu-identity/LMU-Campus-Ariel.jpg",
              caption: (
                <>
                  <Speak>
                    I duplicated the image so you can see what multiple images
                    looks like. I also did it to show you that the caption can
                    have more than just text!
                  </Speak>
                  <TopicBreak title="Example" />
                  <Speak>
                    Vocab still{" "}
                    <Vocab
                      definition={`I'll be honest. Not sure I really want to define the exact way I just used "works" in here`}
                    >
                      works
                    </Vocab>{" "}
                    as well!
                  </Speak>
                </>
              ),
            },
          ]}
        />
        <TopicBreak title="Multi-select Question Component" />
        <Speak>
          This component is for practicing your conception of the course
          material as we are making progress! These are important to pay
          attention to as they represent direct examples of problems you will
          encounter on homework assignments and exams.
        </Speak>
        <Speak>
          This component is for practicing your conception of the course
          material as we are making progress! These are important to pay
          attention to as they represent direct examples of problems you will
          encounter on homework assignments and exams.
        </Speak>
        <MultiSelectQuestion
          question="Here is the question you are trying to solve! Try and solve the problem! Worst case you get it wrong and the hint can direct you closer to the right one!"
          choices={["Here is selectable 1", "Here is selectable 2"]}
          answers={[1, 1]}
          incorrectMessage={
            "I am the message that displays when you get the problem wrong! This is a bit unfortunate since it looks like you are wrong, but don't worry, selecting both will pass this question!"
          }
          correctMessage={
            "I am the message that displays if you select all the correct answers and none of the others. If you needed the hint to get here, don't worry, these are always practice! These question boxes are not tracked or managed so feel free to mess around."
          }
        />
        <Speak>
          They are made of a few parts, the question itself, an optional image
          to allow for questions from diagrams, the toggle buttons that
          represents your answer choices, and the check answers toggle for
          displaying both the correct and incorrect message. There can be any
          number of multi-select answers to deal with, but these question boxes
          will always be displayed right in the middle of the area to find all
          the answers. These aren't made to be tricks, they made to ensure you
          get a grasp on what I expect you to take away from my notes.
        </Speak>
        <TopicBreak title="Lecture Stepper" />.
        <Speak>
          This component is simple but does warrant some explanation due to it
          being dynamic. At the bottom of the screen you will find another black
          box before the footer with 3 circles. This is the lecture stepper
          component. Its job is to act as a "Next" and "Previous" page button
          but for lectures. It will always lead you to the next lecture on the
          right and the previous on the left if it exists. The middle position
          is special as it designates what the lectures are helping you with. It
          might be an exam (In which case it will be red) or it might be a
          homework assignment (In which case it will be green).
        </Speak>
        <Speak>
          This component will only direct you to sources within a standard. This
          is to ensure that you don't endlessly scroll all the lectures when
          they are directed toward specific discrete "modules" of learning. At
          the moment it just displays the homework for this standard (with blank
          spaces left and right due to their only being one lecture in this
          standard).
        </Speak>
        <Speak>All in all this component is simply a navigational aid</Speak>
        <TopicBreak title="Footer Sources" />
        <Speak>
          The last component of note on the site is the very bottom, which
          you've most likely become familiar with without be describing it. Its
          simply the website footer! It displays when, where, and how to contact
          me. It also displays the university logo (which is a link) and two
          helpful buttons beneath it. The gear is the settings menu. At the
          moment it doesn't feature too much, but in the future in will have
          accessibility settings to alter text size, color, and other site wide
          aspects to promote a more personal site atmosphere. Next to that is
          the home button which will take you all the way back to the homepage
          of the site.
        </Speak>
        <Speak>
          However, you'll notice this footer is slightly different, it features
          a third section displaying a book! This section won't always look like
          this, but if you see something here, it means it was a source used for
          the page you are viewing. In this case the book isn't actually a
          source otherwise we'd be reading some very different things!
        </Speak>
        <TopicBreak title="Conclusion" />
        <Speak>
          This is the end of the site component tour. More may be added in the
          future but you are free to move on now.
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
