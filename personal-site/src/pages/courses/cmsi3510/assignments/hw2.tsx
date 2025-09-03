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

const HW_GH_ASSIGNMENT_LINK = "https://classroom.github.com/a/gu_K8XCD"
const HW_BS_PROGRAMMING_TURN_IN_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283548/event/802217/detailsview?searchString=&year=2025&month=9&day=3&typefilterguid=a2d8e13e-30f9-4dfb-a907-cba23f3502bf"
const HW_BS_OPTIONAL_TURN_IN_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283548/event/802215/detailsview?searchString=&year=2025&month=9&day=3&typefilterguid=a2d8e13e-30f9-4dfb-a907-cba23f3502bf"
const HW_GH_OPTIONAL_ASSIGNMENT_LINK = "https://classroom.github.com/a/jnJhV7YB"

export default function Homework2() {
  return (
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
          concurrent systems! We are going to be simulating the very concurrent
          and complex nature of making a Pizza from scratch in a Kitchen with
          multiple chefs!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Reading Section" />
        <Speak>
          This simulation is quite intricate and will leverage much of your
          current Rust knowledge. However, Rust's style of concurrent operation
          with Tokio and its synchronization primitives is a lot to read
          through. You will need to make good use of your reading resources to
          manage them successfully and not get overwhelmed! With what truly
          little time we have in class, you will need to rely on the reading
          material to get you the full picture. The sections below give you
          direct and indirect help with organizing your thoughts about threads,
          concurrent ownership, and use of synchronization primitives in Rust.
        </Speak>
        <QuestionBox qid={"R1"}>
          In "The Rust Language Book" read, Ch 9: Error Handling, Ch 15: Smart
          Pointers, Ch 16: Fearless Concurrency, Ch 17: Matching, and optionally
          for help with the homework Ch 15: Smart Pointers, and Ch 17:
          Fundamentals of Asynchronous Programming: Async, Await, Futures, and
          Streams
        </QuestionBox>
        <QuestionBox qid={"R2"}>
          While its not one of your required materials, the Rust by Example docs
          are associated with the Rust Language Book and are a great resource
          for understanding the concepts in the book in a more direct
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
          related to the use of Futures, Channels, Async and Await, and more in
          the codebase.
          <LinkButton color="success" to="https://docs.rs/tokio/latest/tokio/">
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
          This programming homework is brought by Babish! Well not directly, but
          instead it is modeled after the pizza dough making process laid out in
          the following video linked below! Make sure to watch this as otherwise
          the simulator you will be programming will be more than a little
          confusing.
        </Speak>
        <LinkButton
          color="success"
          to="https://www.youtube.com/watch?v=n1O3uHPCOLA"
        >
          Pizza Dough | Basics with Babish
        </LinkButton>
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
          Programming HW2 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox
          title="Optional Section For Concurrent Programming"
          quote="Points: 20"
        />
        <Speak>
          In this optional section you will be working on a small beginner Rust
          project of your choosing! After looking around for some fun project
          ideas, I found this great article from ZTM.io's Jayson Lennon!
        </Speak>
        <LinkButton
          color="success"
          to="https://zerotomastery.io/blog/rust-practice-projects/"
        >
          Jayson Lennon's Rust Practice Projects
        </LinkButton>
        <Speak>
          Whilst the intermediate and advanced projects are certainly "out of
          our league" at the moment, the beginner projects Jayson lays out are
          insightful, simple, and fun!
        </Speak>
        <Speak>
          For this optional I want you to read that article and pick one of the
          beginner projects that Jayson recommends! Complete the basic
          implementation of the project and then provide at least 5 to 10 unit
          tests that display your implementations working as expected.
        </Speak>
        <Speak>
          I have made an empty Github assignment for you to pull and create your
          Rust project from scratch (This is out of convenience so that I can
          use Github classroom to collate all your projects rather than go
          through being added to all the repos). Feel free to architect your
          project as you choose, however at a minimum you must have at least 5
          unit tests that are run and pass with the cargo test command.
        </Speak>
        <Speak>
          Additionally, provide a brief README.md file that explains what
          project you chose and how to interact with it. If you are doing
          anything "non-standard" that is Ok, just document that in the
          README.md.
        </Speak>
        <Speak>
          Since the repository is private, feel free after you are done to copy
          it over into a public repository to show off on your Github!
        </Speak>
        <Speak>
          Earning points in this optional is not as rigid since you may pick
          your own project. With that said, to earn full points you must fully
          implement one of the beginner projects as stated by Jayson, have a
          README.md, and have at a minimum 5 unit tests pass with the cargo test
          command. You do not have to do any of the add-ons or extensions that
          Jayson recommends.
        </Speak>
        <Speak>
          As an example, if you did the beginner project about remaking core
          terminal utilities than I would expect to be able to run your version
          of echo, cat, ls, find, and grep, that I could figure out where to
          start by looking at your project README (Your commands don't need to
          be terminal integrated or anything, but there functionality should be
          intact through whatever medium you choose), and that I could clone the
          repository to run cargo test and see at least 5 passes (In this case
          one for each command).
        </Speak>
        <Speak>
          Below are buttons that link to the Brightspace turn in and the empty
          Github assignment repository to pull and work in respectively.
        </Speak>
        <LinkButton color="success" to={HW_BS_OPTIONAL_TURN_IN_LINK}>
          Optional HW1 Turn in
        </LinkButton>
        <LinkButton color="success" to={HW_GH_OPTIONAL_ASSIGNMENT_LINK}>
          Github Optional Assignment
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
