import { DateTime } from "luxon"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import DueDateCalendar from "../../components/due-date-calendar"
import LinkButton from "../../components/link-button"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"

const S1_EXAM_BS_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283548/event/806056/detailsview?searchString=&year=2025&month=9&day=3&typefilterguid=8a6a9b31-7898-43b0-b61f-4ca429b0a731"
const S2_EXAM_BS_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283548/event/806057/detailsview?searchString=&year=2025&month=9&day=3&typefilterguid=8a6a9b31-7898-43b0-b61f-4ca429b0a731"
const S3_EXAM_BS_LINK = ""

export default function Exam1() {
  return (
    <CoursePage
      type="exam"
      courseName="CMSI 3510: Operating Systems"
      courseNumber={3510}
    >
      <CourseBox>
        <TitleBox title="Optional Final Exam 1" />
        <DueDateCalendar dueDate={DateTime.local(2024, 10, 20)} />
        <TopicBox
          topics={[
            "S1: Concurrent Programming",
            "S2: Computer Hardware",
            "S3: Operating Systems",
          ]}
        />
        <Speak>
          Welcome to the optional final exam! Its closer to a quiz than anything
          else, but it functions as our course capstone! However, realistically
          its just here to help pick up some points at the end of the semester.
        </Speak>
        <Speak>
          Anyway, this midterm is broken up into 3 mini-exams that cover each of
          the standards individually. You can can take them in any order (They
          do not rely on each other) and you can choose to take as many as you'd
          like (You are not required to do the portion for standard 1 if you
          already have an A).
        </Speak>
        <Speak>
          The exams are digitally available on brightspace via the buttons below
          and can be taken on their own time, at any time, during the
          availability window.
        </Speak>
        <Speak>
          Each constituent exam is linked below in its own section. If your were
          to take all of them then the complete midterm is 15 questions total
          and worth 30 points.
        </Speak>
        <Speak>
          All the portions of the exam are due by Sunday night as specified by
          the above due date calendar.
        </Speak>
        <Speak>
          Each portion of the exam is open everything, except soliciting
          answers. So no posting questions quickly to Stack Overflow or asking a
          friend in the class.
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Standard 1: Concurrent Programming" />
        <TopicBox topics={["Synchronization", "Resource Management", "", ""]} />
        <Speak>
          This portion of the exam covers standard 1, Concurrent Programming.
        </Speak>
        <Speak>
          This portion of the exam has 1 attempt and a 30 minute timer (If you
          have accommodations, they should be reflected automatically by
          Brightspace when you take your exam).
        </Speak>
        <Speak>
          This portion of the exam is worth in total 10 points for the
          concurrency standard only.
        </Speak>
        <Speak>This exam has 5 questions</Speak>
        <LinkButton to={S1_EXAM_BS_LINK} color="danger">
          EX1 S1
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Standard 2: Computer Hardware" />
        <TopicBox topics={["CPU", "RAM", "GPU", "", ""]} />
        <Speak>
          This portion of the exam covers standard 2, Computer Hardware.
        </Speak>
        <Speak>
          This portion of the exam has 1 attempt and a 30 minute timer (If you
          have accommodations, they should be reflected automatically by
          Brightspace when you take your exam).
        </Speak>
        <Speak>
          This portion of the exam is worth in total 10 points for the hardware
          standard only.
        </Speak>
        <Speak>This exam has 5 questions</Speak>
        <LinkButton to={S2_EXAM_BS_LINK} color="danger">
          EX1 S2
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Standard 3: Operating Systems" />
        <TopicBox topics={["Drivers", "Kernel", "Scheduling", ""]} />
        <Speak>
          This portion of the exam covers standard 3, Operating Systems.
        </Speak>
        <Speak>
          This portion of the exam has 1 attempt and a 30 minute timer (If you
          have accommodations, they should be reflected automatically by
          Brightspace when you take your exam).
        </Speak>
        <Speak>
          This portion of the exam is worth in total 10 points for the operating
          systems standard only.
        </Speak>
        <Speak>This exam has 5 questions</Speak>
        <LinkButton to={S3_EXAM_BS_LINK} color="danger">
          EX1 S3
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
