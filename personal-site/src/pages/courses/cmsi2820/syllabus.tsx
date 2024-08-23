import { Button, Chip, Divider, Sheet } from "@mui/joy"
import CoursePage from "../components/course-page"
import { useState } from "react"
import Speak from "../components/speak"
import CourseInfoDump from "../../../components/course-info-dump"
import StandardsDiagram from "../components/standard-diagram"

export default function Syllabus() {
  const [tabState, setTabState] = useState("Introduction")
  return (
    <CoursePage type="syllabus">
      <Sheet
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <Button color="neutral" onClick={() => setTabState("Introduction")}>
          Introduction
        </Button>
        <Button
          color="neutral"
          onClick={() => setTabState("Required Materials")}
        >
          Required Materials
        </Button>
        <Button
          color="neutral"
          onClick={() => setTabState("Learning Outcomes")}
        >
          Learning Outcomes
        </Button>
        <Button color="neutral" onClick={() => setTabState("Grading")}>
          Grading
        </Button>
        <Button color="neutral" onClick={() => setTabState("Schedule")}>
          Schedule
        </Button>
        <Button
          color="neutral"
          onClick={() => setTabState("Student Rights and Responsibilities")}
        >
          Student Rights and Responsibilities
        </Button>
        <Button color="neutral" onClick={() => setTabState("FAQ")}>
          FAQ
        </Button>
      </Sheet>
      <Divider>
        <Chip>{tabState}</Chip>
      </Divider>
      {tabState === "Introduction" ? (
        <>
          <Speak>
            My Name is Professor Julian Gonzalez, Welcome to CMSI 2820: Discrete
            Mathematics for CS in Fall 2024!
          </Speak>
          <Speak>
            While there are three different sections of this course, this site
            will be home for all of the sections. You can find out which section
            you are in via prowl, this course's modal popup on this site's
            homepage, or even below this text here in the syllabus.
          </Speak>
          <CourseInfoDump
            sectionNumber={1}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="9:55 AM"
            timeEnd="11:35 AM"
            building="Pereira"
            roomNumber={206}
          />
          <CourseInfoDump
            sectionNumber={2}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="1:45 PM"
            timeEnd="3:25 PM"
            building="Pereira"
            roomNumber={109}
          />
          <CourseInfoDump
            sectionNumber={3}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="6:00 PM"
            timeEnd="7:40 PM"
            building="Seaver"
            roomNumber={304}
          />
          <Divider />
          <Speak>
            My contact information, which includes my office, office phone, and
            email, can be found in the footer of this site at all times on any
            page. I prefer contact by email, but if you come by my office and
            the door is open feel free to come in and chat!
          </Speak>
          <Speak>
            This course description, as stated before in this course's modal
            popup on the homepage, is a 4-unit/credit hour hands on course that
            infuses the learning of Discrete theory topics into direct
            application in Python. These topics include Intuitionistic
            Propositional and Predicate Logic, Number Theory, Type Theory,
            Combinatorics, Graph Theory, Set Theory, and a few more topic
            extensions to broaden the application of these topics in Computer
            Science.
          </Speak>
          <Speak>
            This course is and in-person, lecture style course. However, all my
            lectures for all sections will be uploaded for access to this site
            at anytime at least 2 days after initial recording. I will do my
            best to upload directly after class, however I cannot always
            guarantee this due to other obligations.
          </Speak>
          <Speak>
            This syllabus was specifically designed to group relevant
            information together in a more appealing manner than simply a long
            scrolling paper. To that end, this syllabus is designed to focus its
            discussion into a few main sections represented by the buttons
            above. By clicking them, you can find all relevant information
            regarding that topic and have easy access to it later.
          </Speak>
          <Speak>
            The recommended order of reading the topics is from left to right,
            up to down, but feel free to jump around.
          </Speak>
        </>
      ) : tabState === "Learning Outcomes" ? (
        <>
          <Speak>
            The short-hand idea for what we are trying to accomplish is gaining
            a rigorous foundation for the mathematics that underlies Computer
            Science. However, Since Computer Science can be understood as
            "teaching" computer's everything, we have an issue of scope so let's
            narrow things down.
          </Speak>
          <Speak>
            Many of the common problems you will solve and need to represent
            both conceptually and in code have distinct patterns. These distinct
            patterns come in many forms, but this course seeks to give you an
            array of knowledge and tools to work with those specifically
            discussed in Intuitionistic Propositional and Predicate Logic,
            Number Theory, Type Theory, Combinatorics, Graph Theory, and Set
            Theory.
          </Speak>
          <Speak>
            Due to the tentative nature of this new course and its layout, I
            unfortunately cannot guarantee we will dive deeply into, or even get
            to see all those topics. With that said, assuming all goes well, the
            following learning outcomes listed below will be added to your
            repertoire of skills.
          </Speak>
          <Speak>
            You will learn the fundamentals of Intuitionistic Logic, how it
            differs from other forms of logic such as Classical, how it takes
            form in propositional reasoning, how it takes form in predicated
            reasoning, how its higher-order extension functions, and how its
            related to the foundations of Type Theory.
          </Speak>
          <Speak>
            You will learn about the Boolean numbers and their relevance to
            logic, .
          </Speak>
        </>
      ) : tabState === "Required Materials" ? (
        <>
          <Speak>
            This course features NO required materials in the form of personal
            student monetary engagement, such as: textbooks, subscription
            access', paid web tools, or lab fees.
          </Speak>
          <Speak>
            This following materials are required, but can be requested from the
            university for no additional cost or can be found for FREE on any
            internet capable devices: a device capable of unfettered access to
            the terminal (typically any non-mobile computing device), Python 3,
            an interactive development environment (I recommend and personally
            use Microsoft's VSCode), and internet access.
          </Speak>
          <Speak>
            Any reading material in the form of textbooks, articles, videos, or
            compelled media will be given by me and posted on this site for
            immediate access.
          </Speak>
        </>
      ) : tabState === "Grading" ? (
        <>
          <Speak>
            Now that we have an idea of "what" we are trying to learn, let's see
            "how" we are going to learn it. This course is "Standards" based.
            However, the way that I prefer to use these standards is very
            different from typical so just pretend you've never heard of this
            before.
          </Speak>
          <Speak>
            This is going to be rather "long-winded" but I promise this course
            system was constructed with the student at its heart. To entice you
            to listen closer, this course features a total of 16 assignments.
            Not very enticing on its own, but what If I said that 9 of those
            were completely optional? Now that I've got you hooked, lets break
            it down.
          </Speak>
          <StandardsDiagram
            standards={[
              {
                standardID: "Syllabus",
                assignments: ["HW"],
                exams: ["EX"],
              },
              {
                standardID: "Logic",
                assignments: ["HW"],
              },
              {
                standardID: "Numbers",
                assignments: ["HW", "OHW"],
              },
              {
                standardID: "Collections",
                assignments: ["HW", "OHW"],
              },
              {
                standardID: "Midterm",
                exams: ["OEX"],
              },
              {
                standardID: "Functions",
                assignments: ["HW", "OHW"],
              },
              {
                standardID: "Combinatorics",
                assignments: ["HW", "OHW"],
              },
              {
                standardID: "Graph Theory",
                assignments: ["HW", "OHW"],
              },
              {
                standardID: "Set Theory",
                assignments: ["HW", "OHW"],
              },
              {
                standardID: "Final",
                exams: ["OEX"],
              },
            ]}
          />
        </>
      ) : tabState === "Schedule" ? (
        <></>
      ) : tabState === "Student Rights and Responsibilities" ? (
        <></>
      ) : tabState === "FAQ" ? (
        <></>
      ) : (
        <> Hey You're Not Supposed to See This! How Did You Get Back Here?</>
      )}
    </CoursePage>
  )
}
