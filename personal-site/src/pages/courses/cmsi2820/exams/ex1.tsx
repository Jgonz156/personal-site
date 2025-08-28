import { DateTime } from "luxon"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import DueDateCalendar from "../../components/due-date-calendar"
import LinkButton from "../../components/link-button"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"

const S1_EXAM_BS_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802314/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277"
const S2_EXAM_BS_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802315/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277"
const S3_EXAM_BS_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802316/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277"

export default function Exam1() {
  return (
    <CoursePage
      type="exam"
      courseName="CMSI 2820: Discrete Mathematics for CS"
      courseNumber={2820}
    >
      <CourseBox>
        <TitleBox title="Optional Midterm Exam 1" />
        <DueDateCalendar dueDate={DateTime.local(2025, 3, 31)} />
        <TopicBox topics={["S1: Logic", "S2: Numbers", "S3: Collections"]} />
        <Speak>
          Welcome to the optional midterm exam! Its closer to a quiz than
          anything else, but it functions as our half way point of the
          semesters. Hence why its called the midterm... because its the middle
          of the term.
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
        <TitleBox title="Standard 1: Logic" />
        <TopicBox
          topics={[
            "Logical Connectives",
            "Propositional Logic",
            "Intuitionistic Logic",
            "Natural Deduction",
          ]}
        />
        <Speak>This portion of the exam covers standard 1, Logic.</Speak>
        <Speak>
          This portion of the exam has 1 attempt and a 30 minute timer (If you
          have accommodations, they should be reflected automatically by
          Brightspace when you take your exam).
        </Speak>
        <Speak>
          This portion of the exam is worth in total 10 points for the Logic
          standard only.
        </Speak>
        <Speak>This exam has 5 questions</Speak>
        <LinkButton to={S1_EXAM_BS_LINK} color="danger">
          EX1 S1
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Standard 2: Numbers" />
        <TopicBox
          topics={[
            "Constructive Proofs",
            "Abstract Algebra",
            "Integers",
            "Booleans",
            "Arithmetic Evaluation",
          ]}
        />
        <Speak>This portion of the exam covers standard 2, Numbers.</Speak>
        <Speak>
          This portion of the exam has 1 attempt and a 30 minute timer (If you
          have accommodations, they should be reflected automatically by
          Brightspace when you take your exam).
        </Speak>
        <Speak>
          This portion of the exam is worth in total 10 points for the Numbers
          standard only.
        </Speak>
        <Speak>This exam has 5 questions</Speak>
        <LinkButton to={S2_EXAM_BS_LINK} color="danger">
          EX1 S2
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Standard 3: Collections" />
        <TopicBox
          topics={[
            "Tuples",
            "Sets",
            "Collection Operations",
            "Logical Quantification",
          ]}
        />
        <Speak>This portion of the exam covers standard 3, Collections.</Speak>
        <Speak>
          This portion of the exam has 1 attempt and a 30 minute timer (If you
          have accommodations, they should be reflected automatically by
          Brightspace when you take your exam).
        </Speak>
        <Speak>
          This portion of the exam is worth in total 10 points for the
          Collections standard only.
        </Speak>
        <Speak>This exam has 5 questions</Speak>
        <LinkButton to={S3_EXAM_BS_LINK} color="danger">
          EX1 S3
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
