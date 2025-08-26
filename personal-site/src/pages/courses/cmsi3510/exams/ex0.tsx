import { DateTime } from "luxon"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import DueDateCalendar from "../../components/due-date-calendar"
import LinkButton from "../../components/link-button"
import MultiSelectQuestion from "../../components/multi-select-question"
import Speak from "../../components/speak"
import TopicBreak from "../../components/topic-break"

export default function Exam0() {
  return (
    <>
      <CoursePage
        type="exam"
        courseName="CMSI 3510: Operating Systems"
        courseNumber={3510}
      >
        <CourseBox>
          <TopicBreak title="What do Exam's Look Like?" />
          <Speak>
            Welcome to the exam page! Its relatively sparse here since this
            section serves only to present you with a button to go to
            brightspace to access the exam!
          </Speak>
          <Speak>
            Typically what would be here is any specific information pertaining
            to the exam that is necessary to know, such as what standards its
            based on, what topics will be covered, how many questions it has,
            when the due date and time is, and more.
          </Speak>
          <Speak>
            I'll take this space to explain a few things about my exams. They
            aren't really "exams" how you are probably used to them. They really
            are closer to what you might know as a "quiz". They aren't worth an
            insane amount of your grade and they aren't made to take very long
            to complete. The goal is to be a portable, third method for gaining
            points toward a standard in the event life gets in the way of
            learning and your scores on your main homework assignment and
            optional just didn't end up how you wanted them.
          </Speak>
          <Speak>
            They are NOT collaboratory and they are NOT open note. This is
            because they are comprehension questions (These would be difficult
            to look up anyway as they will mostly pertain directly to an example
            we referenced in class). For example, if this were a course on
            networks it would include a question like this:
          </Speak>
          <MultiSelectQuestion
            question="We've seen that in class, copper cables are still used as a common
          medium for setting up networking lines as they are cheap and efficient
          for small deployments, but they have some draw backs with
          electromagnetic interference, and long range data integrity. Which is
          NOT an example of a good location to deploy copper cable based
          networking, select all that apply:"
            choices={[
              <Speak>A) A small run between two at home access points</Speak>,
              <Speak>
                B) A "jumper" server communication cable between a router and a
                switch on the same rack
              </Speak>,
              <Speak>
                c) A data cable designed to transmit infrequent data from a
                car's backup sensor to its ECU (Engine Control Unit)
              </Speak>,
              <Speak>
                d) A data cable in an MRI (Magnetic Resonance Imaging) machine
                responsible for transmitting patient data to a local ethernet
                port.
              </Speak>,
              <Speak>
                e) A new high speed data transmission line under the ocean to
                connect Ireland to South Carolina.
              </Speak>,
            ]}
            answers={[0, 0, 0, 1, 1]}
            incorrectMessage={
              "In fairness to you, this is a subject that we are not covering in this class and this might literally be the first time you've ever been faced with a question like this, but unfortunately your answer is incorrect."
            }
            correctMessage={"Nice, that is correct!"}
          />
          <Speak>
            Now of course this example is a bit contrived as the problem
            description heavily implies the two answers, but the idea is the
            same; Exam questions will not require notes, calculators, or time
            consuming AI prompting to answer. Hence, why none of those things
            are allowed (If you are wondering about the problem, the answer is d
            and e).
          </Speak>
          <Speak>
            If I do make a question that requires outside information or tools I
            will state that they do and that you are allowed to use them. For
            instance, I might give a question about a fragment of Rust code. You
            are always allowed to use python to "test" your choices if testing
            is relevant to the question.
          </Speak>
          <Speak>
            Overall, my exams are less like "exams" and more like small pop
            quizzes. Now we should get on to what "this" exam is actually about!
          </Speak>
          <TopicBreak title="Syllabus Exam" />
          <Speak>This exam covers standard 0, the syllabus.</Speak>
          <Speak>The exam has unlimited attempts and no timer.</Speak>
          <Speak>
            The exam will cover the topics of what my only classroom rule is,
            course standards, grading, and syllabus material.
          </Speak>
          <Speak>This exam is worth in total 1 point</Speak>
          <Speak>This exam has 5 questions</Speak>
          <DueDateCalendar dueDate={DateTime.local(2025, 1, 31)} />
          <LinkButton to="" color="danger">
            To the Exam! (Broken due to Brightspace Maintenance)
          </LinkButton>
        </CourseBox>
      </CoursePage>
    </>
  )
}
