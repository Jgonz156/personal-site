import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import QuestionBox from "../../components/question-box"
import TopicBox from "../../components/topic-box"
import LinkButton from "../../components/link-button"
import DueDateCalendar from "../../components/due-date-calendar"
import { DateTime } from "luxon"
import DirectoryTree from "../../components/directory-tree"

const HW_GH_ASSIGNMENT_LINK = "https://classroom.github.com/a/qN_FYjrX"
const HW_BS_PROGRAMMING_TURN_IN_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283548/event/802210/detailsview?searchString=&year=2025&month=9&day=3&typefilterguid=a2d8e13e-30f9-4dfb-a907-cba23f3502bf"

export default function Homework1() {
  return (
    <CoursePage
      type="homework"
      courseName="CMSI 3510: Operating Systems"
      courseNumber={3510}
    >
      <CourseBox>
        <TitleBox title="HW1: Doughmain Expansion" />
        <DueDateCalendar dueDate={DateTime.local(2025, 2, 17, 23, 59)} />
        <TopicBox topics={["Structs", "Ownership", "References"]} />
        <Speak>
          This homework assignment is about getting used to programming in Rust
          with a small yet substantial project! The project is implementing a
          complete self contained simulation of a file system with a custom CLI
          interface!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Reading Section" />
        <Speak>
          As this project is quite all encompassing as it goes for foundational
          Rust features, you will need to make good use of your reading
          resources! With what truly little time we have in class, you will need
          to rely on the reading material to get you the full picture. The
          sections below give you direct and indirect help with organizing your
          thoughts about structs, memory management, and references in Rust.
        </Speak>
        <QuestionBox qid={"R1"}>
          In "The Rust Language Book" read, Ch 4: Understanding Ownership, Ch 5:
          Using Structs to Structure Related Data, Ch 6: Enums and Pattern
          Matching, and optionally for help with the homework Ch 15: Smart
          Pointers Ch 17: Object Oriented Programming Features of Rust (These
          are a bit of a stretch goal, but it will help you understand the
          concepts of the homework better)
        </QuestionBox>
        <QuestionBox qid={"R2"}>
          While its not one of your required materials, the Rust by Example docs
          are associated with the Rust Language Book and are a great resource
          for understanding the concepts in the book in a more direct
          programmatic way. You should go through all of it but for now, Read
          section 3: Custom Types and Section 9: Functions.
          <LinkButton
            color="success"
            to="https://doc.rust-lang.org/rust-by-example/"
          >
            Rust By Example
          </LinkButton>
        </QuestionBox>
        <QuestionBox qid={"W1"}>
          Watch the later half of this amazing guided talk about data-driven
          programming by Nic Barker! While its not in Rust (Its in C# for
          Unity), the concepts are universal and will help you understand the
          importance of structuring your data in a way that makes the best use
          of your resources! (The link should take you to the correct time
          stamp, but if it doesn't, skip to 25:50. The previous content is still
          good, but it is mostly review of general programming concepts)
          <LinkButton color="success" to="https://youtu.be/WwkuAqObplU?t=1550">
            Intro to Data Oriented Design for Games
          </LinkButton>
        </QuestionBox>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 30" />
        <DirectoryTree
          filesAsJSON={{
            "CMSI-3510-HW1": {
              ".gitignore": <></>,
              doughmain_expansion: {
                "Cargo.toml": <></>,
                src: {
                  cli_commands: {
                    "mod.rs": <></>,
                    "cd.rs": <></>,
                    "ls.rs": <></>,
                    "mkdir.rs": <></>,
                    "pwd.rs": <></>,
                    "rmd.rs": <></>,
                    "rmf.rs": <></>,
                    "touch.rs": <></>,
                    "signin.rs": <></>,
                    "signout.rs": <></>,
                    "read.rs": <></>,
                    "write.rs": <></>,
                  },
                  "lib.rs": <></>,
                  "main.rs": <></>,
                },
              },
              "README.md": <></>,
            },
          }}
        />
        <Speak>
          Need a refresher on how to interact with the HW for this course? Watch
          the helper video posted to Zoom via button below!
        </Speak>
        <LinkButton
          color="success"
          to="https://lmula.zoom.us/rec/share/qZJRL5B3_zx8vvp2ei9qfijhG6Yjqr0g_pap6h6THg_ffJ7_cuuvjdKq-xMF5g0P.rbEK6SGsg5zYXxMi"
        >
          Helper Video
        </LinkButton>
        <Speak>
          You can find the GitHub Classroom assignment link as a button below
          and the Brightspace turn in link next to it.
        </Speak>
        <LinkButton color="success" to={HW_GH_ASSIGNMENT_LINK}>
          GitHub Assignment
        </LinkButton>
        <LinkButton color="success" to={HW_BS_PROGRAMMING_TURN_IN_LINK}>
          Programming HW1 Turn In
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
