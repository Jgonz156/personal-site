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

export default function Homework2() {
  return (
    <>
      <CoursePage
        type="homework"
        courseName="CMSI 3510: Operating Systems"
        courseNumber={3510}
      >
        <CourseBox>
          <TitleBox title="HW2: Life of Pie" />
          <DueDateCalendar dueDate={DateTime.local(2025, 5, 14, 23, 59)} />
          <TopicBox topics={["Concurrency", "Threads", "Mutual Exclusion"]} />
          <Speak>
            This homework assignment is about getting our feet wet with modeling
            concurrent systems! We are going to be simulating the very
            concurrent and complex nature of making a Pizza from scratch in a
            Kitchen with multiple chefs!
          </Speak>
        </CourseBox>
        <CourseBox>
          <TitleBox title="Reading Section" />
          <Speak>
            This simulation is quite intricate and will leverage much of your
            current Rust knowledge. However, Rust's style of concurrent
            operation with Tokio and its synchronization primitives is a lot to
            read through. You will need to make good use of your reading
            resources to manage them successfully and not get overwhelmed! With
            what truly little time we have in class, you will need to rely on
            the reading material to get you the full picture. The sections below
            give you direct and indirect help with organizing your thoughts
            about threads, concurrent ownership, and use of synchronization
            primitives in Rust.
          </Speak>
          <QuestionBox qid={"R1"}>
            In "The Rust Language Book" read, Ch 9: Error Handling, Ch 15: Smart
            Pointers, Ch 16: Fearless Concurrency, Ch 17: Matching, and
            optionally for help with the homework Ch 15: Smart Pointers, and Ch
            17: Fundamentals of Asynchronous Programming: Async, Await, Futures,
            and Streams
          </QuestionBox>
          <QuestionBox qid={"R2"}>
            While its not one of your required materials, the Rust by Example
            docs are associated with the Rust Language Book and are a great
            resource for understanding the concepts in the book in a more direct
            programmatic way. You should go through all of it but for now, Read
            section 18: Error Handling and Section 19: Std Library Types.
            <LinkButton
              color="success"
              to="https://doc.rust-lang.org/rust-by-example/"
            >
              Rust By Example
            </LinkButton>
          </QuestionBox>
          <QuestionBox qid={"R3"}>
            Don't read this in its entirety, but the Rust Tokio library is a
            powerful tool for concurrent programming in Rust. It is a bit
            different from the standard library and is a bit more complex to
            understand. However, it is a great resource for looking up details
            related to the use of Futures, Channels, Async and Await, and more
            in the codebase.
            <LinkButton
              color="success"
              to="https://docs.rs/tokio/latest/tokio/"
            >
              Tokio Documentation
            </LinkButton>
          </QuestionBox>
        </CourseBox>
        <CourseBox>
          <TitleBox title="Programming Section" quote="Points: 30" />
          <DirectoryTree
            filesAsJSON={{
              "CMSI-3510-HW2": {
                "life-of-pie": {
                  src: {
                    parallel: {
                      "mod.rs": <></>,
                      "data_parallel.rs": <></>,
                      "task_parallel.rs": <></>,
                    },
                    "chef.rs": <></>,
                    "equipment.rs": <></>,
                    "error.rs": <></>,
                    "fridge.rs": <></>,
                    "ingredients.rs": <></>,
                    "kitchen.rs": <></>,
                    "proving_room.rs": <></>,
                    "lib.rs": <></>,
                    "main.rs": <></>,
                  },
                  "Cargo.toml": <></>,
                  "Cargo.lock": <></>,
                },
                ".gitignore": <></>,
                "README.md": <></>,
              },
            }}
          />
          <Speak>
            This programming homework is brought by Babish! Well not directly,
            but instead it is modeled after the pizza dough making process laid
            out in the following video linked below! Make sure to watch this as
            otherwise the simulator you will be programming will be more than a
            little confusing.
          </Speak>
          <LinkButton
            color="success"
            to="https://www.youtube.com/watch?v=n1O3uHPCOLA"
          >
            Pizza Dough | Basics with Babish
          </LinkButton>
          <Speak>
            Need a refresher on how to interact with the HW for this course?
            Watch the helper video posted to Zoom via button below!
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
          <LinkButton color="success" to="">
            GitHub Assignment
          </LinkButton>
          <LinkButton color="success" to="">
            Programming HW1 Turn In
          </LinkButton>
        </CourseBox>
      </CoursePage>
    </>
  )
}
