import { DateTime } from "luxon"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import DirectoryTree from "../../components/directory-tree"
import DueDateCalendar from "../../components/due-date-calendar"
import LinkButton from "../../components/link-button"
import QuestionBox from "../../components/question-box"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"
import TopicBreak from "../../components/topic-break"

export default function Homework3() {
  return (
    <CoursePage type="homework">
      <CourseBox>
        <TitleBox title="HW3: Storage Wars" />
        <DueDateCalendar dueDate={DateTime.local(2024, 10, 18, 23, 59)} />
        <TopicBox
          topics={[
            "Collections",
            "Abstract Algebra",
            "Relations",
            "Operations",
          ]}
        />
        <Speak></Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Written Section" quote="Points: 20" />
        <QuestionBox qid={"Q1"} points={5}>
          What is the most fundamental property of a Tuple and describe the
          function of its two main operators. Give an example for both
          operators.
        </QuestionBox>
        <TopicBreak title="END OF LN8" />
        <QuestionBox qid={"Q2"} points={5}>
          What is the most fundamental property of a set and summarize the
          differences between sets and tuples (Discuss the table we made in
          class). Give an example of a set and a tuple when contrasting the two.
        </QuestionBox>
        <TopicBreak title="END OF LN9" />
        <QuestionBox qid={"Q3"} points={5}>
          We discussed previously how performing logic was contained within
          performing algebra on the integers. Put another way we discovered that
          the operations of the logical connectives were the same as the
          arithmetic operations on the integers 1 and 0. Explain how a similar
          relationship exists from the arithmetic operations on the integers to
          the operations of sets. Put another way, how might the operations of
          sets be thought of as superseding the arithmetic operations on the
          integers?
        </QuestionBox>
        <TopicBreak title="END OF LN10" />
        <QuestionBox qid={"Q4"} points={5}>
          We discussed how abstract algebra described operations in terms of
          properties. We then saw new properties that describe the behavior of
          relations, a subset of the operators that only produced booleans.
          Equivalence relations were required to be reflexive, symmetric, and
          transitive. However, do they also need to be Associative and
          commutative? Explain why or why not by using examples.
        </QuestionBox>
        <TopicBreak title="END OF LN11" />
        <LinkButton
          color="success"
          to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=253279&db=299877"
        >
          Written HW3 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 80" />
        <DirectoryTree
          filesAsJSON={{
            "CMSI-2820-HW3": {
              expected_outputs: {
                "demo_1.txt": <></>,
                "demo_2.txt": <></>,
                "demo_3.txt": <></>,
                "demo_5.txt": <></>,
                "demo_6.txt": <></>,
                "demo_7.txt": <></>,
                "demo_9.txt": <></>,
                "demo_10.txt": <></>,
                "set_1.txt": <></>,
                "set_2.txt": <></>,
                "set_3.txt": <></>,
                "set_4.txt": <></>,
                "set_5.txt": <></>,
                "set_6.txt": <></>,
                "set_7.txt": <></>,
              },
              ".gitignore": <></>,
              "mappa.py": <></>,
              "README.md": <></>,
              "setflix_titles.csv": <></>,
              "setflix.py": <></>,
              "test_storage_wars.py": <></>,
              "tiktup.py": <></>,
              "type_helper.py": <></>,
            },
          }}
        />
        <Speak>
          As a refresher, here is the helper video that goes from complete start
          to finish for the process of receiving, setting up, and turning in
          your programming portion of the HW.
        </Speak>
        <LinkButton
          color="success"
          to="https://lmula.zoom.us/rec/share/LHMwk2fFto5pKnfMEKK5ZBdiwkRO0WacAkDyfbdqMrDz8Eo9dwyFlnYq5a_I8iX3.aa-YDE0MpCpp2sK8"
        >
          Helper Video
        </LinkButton>
        <Speak>
          Linked below is the GitHub Classroom assignment link and the
          Brightspace turn in link both as buttons
        </Speak>
        <LinkButton
          color="success"
          to="https://classroom.github.com/a/LqxxHjBK"
        >
          GitHub Assignment
        </LinkButton>
        <LinkButton
          color="success"
          to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=299878&grpid=0&isprv=&bp=0&ou=253279"
        >
          Programming HW3 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Optional Section For Numbers" quote="Points: 20" />
        <Speak>
          The creative endeavor I am suggesting for the Numbers standard is the
          same as with the Logic standard, integrate your learning into a real
          world event/experience/memory! (However always remember that you can
          work out an alternate creative endeavour if you want to involve your
          hobbies! You can make creative works in any form such as games,
          drawings, paintings, dioramas, sculptures, videos, fake blogs, memes,
          anything!) (For instance, while I am working on this HW I am
          remembering what it was like to visit the grand canyon! Want to break
          down a hiking trail into Venn diagrams? Create your own rock climbing
          beta guided by the integers? Go for it!) (Just make sure to talk to me
          first!)
        </Speak>
        <Speak>
          We saw in class that Numbers, while being an instance in their own
          right, were a "cover" of sorts for a large world of abstract algebra.
          We were able to perform what we typically know as "addition" without
          numbers at all! With that said, the creative endeavor I am suggesting
          for the number standard is to find abstract algebraic operations in
          your hobbies!
        </Speak>
        <Speak>
          How do you find abstract algebra in your hobbies? Well, consider what
          is really means to be associative or commutative and see if you can
          find that in the interactions of your hobbies! For instance, if you
          are a dancer, you could consider the commutative property in the way
          moves lead into one another! If you are a musician, you could consider
          the associative property in the way you play your instrument! Does
          your hobby include addition or subtraction? What about closure?
        </Speak>
        <Speak>
          Take your abstract algebraic patterns in your hobby and write to me
          about how they inherently display the properties of abstract algebra!
          Then try and create a collection of "arithmetic" operations within
          your hobby!
        </Speak>
        <Speak>
          For instance, I enjoy rock climbing, and a sample process would be
          potentially investigating the link between addition and combining
          climbs together that are next to each other. I could even investigate
          if "down climbing" is a form of beta negation! I could then try and
          find see if their are ways in which I can rock climb that seem to
          represent subtraction!
        </Speak>
        <Speak>
          The more properties you include and the more operations you find, the
          more points you earn!
        </Speak>
        <LinkButton
          color="success"
          to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=299879&grpid=0&isprv=&bp=0&ou=253279"
        >
          Optional HW2 Turn in
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
