//import { MathJax } from "better-react-mathjax"
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
//import TopicBreak from "../../components/topic-break"
//import Vocab from "../../components/vocab"

export default function Homework6() {
  return (
    <CoursePage type="homework">
      <CourseBox>
        <TitleBox title="HW6: (Warning: Graphic Content)" />
        <DueDateCalendar dueDate={DateTime.local(2024, 12, 13, 23, 59)} />
        <TopicBox topics={[]} />
        <Speak></Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Written Section" quote="Points: " />
        <QuestionBox qid={"Q1"} points={"TBD"}></QuestionBox>

        <LinkButton color="success" to="">
          Written HW6 Turn In (Not Yet Available)
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 20" />
        <DirectoryTree
          filesAsJSON={{
            "CMSI-2820-HW6": {
              ".gitignore": <></>,
              "README.md": <></>,
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
        <LinkButton color="success" to="">
          GitHub Assignment (Not Yet Available)
        </LinkButton>
        <LinkButton color="success" to="">
          Programming HW6 Turn In (Not Yet Available)
        </LinkButton>
      </CourseBox>

      <CourseBox>
        <TitleBox
          title="Optional Section For Combinatorics"
          quote="Points: 20"
        />
        {/* 
        <Speak>
          As with the other creative endeavors from the previous Optional HW's,
          integrate your learning into a real world event/experience/memory!
          (However always remember that you can work out an alternate creative
          endeavour if you want to involve your hobbies! You can make creative
          works in any form such as games, drawings, paintings, dioramas,
          sculptures, videos, fake blogs, memes, anything!) (Just make sure to
          talk to me first!)
        </Speak>
        <Speak>
          Functions are a bit too general as it stands right now to make a small
          creative project out of. Since they can be used to
          understand/define/simulate anything there is a distinct issue with
          applying them, in that they apply themselves everywhere. So instead of
          trying to "decode" something you enjoy into a bunch of tiny
          interactions, I'd rather use this optional assignment for reflection
          and sharing.
        </Speak>
        <Speak>
          Functions can be understood as a map from inputs to outputs. When you
          put something in, you get something out. So I would like you to do the
          same but for your hobby. Why do you enjoy your hobbies? When you put
          your effort into your personal projects, what do you get out of them?
          It is just the satisfaction of getting better? Do you like to make
          works an sell them for extra spending cash? I would like you to take
          this optional to give a brief reflection on why you keeping "using the
          same function" over an over again (That function being your hobby!).
        </Speak>
        <Speak>
          Once you've reflected on your hobby, then we will represent the other
          crucial part of a function, their "bodies". To reflect functions as
          ordered instructions, I would like you to put together a small
          guide/introduction of how to get into, and what someone might get out
          of, your hobby! After all, its hard to know whether you should be
          running a function or not unless you have some documentation!
        </Speak>
        <Speak>
          For instance, if I were to complete this optional, I would choose to
          reflect on my hobby of rock climbing. I would begin by reflecting on
          what I personally get out of it. This includes a number of things, but
          in short it keeps me active, its difficulty means I am always faced
          with a challenge to improve, and the focus required to follow a
          difficult{" "}
          <Vocab
            definition={
              "A beta in rock climbing is a set of move by move instructions for how you climb from the start to finish of a climb. These are usually used for difficult climbs where certain techniques may be required to reach the top"
            }
          >
            beta
          </Vocab>{" "}
          is a good way to clear my mind of distractions that are bothering me
          (like a meditation of sorts). Once I finished reflecting on what I get
          out of rock climbing, I would then make a guide to help introduce
          people to climbing. This could take the form of a cool flyer, a blog,
          a fake advertisement for a company, or a video. This is where you can
          get creative as for many hobbies there might be preferred or cool
          introductions to them that are personalized. Since rock climbing is so
          specific, I might create a montage of really mind bending moves you
          wouldn't expect to get people drawn in!
        </Speak>
        <Speak>
          Due to the open ended, and mostly personal, nature of this optional, I
          will be grading it purely on participation with the two major
          components, the reflection and the guide/intro. Each will be worth 10
          points.
        </Speak>
        <Speak>
          Once you have completed your reflection and guide/intro, you can turn
          it in via brightspace with the button below! If you have any questions
          about this optional feel free to ask me!
        </Speak>
        */}
        <LinkButton color="success" to="">
          Optional HW5 Turn in (Not Yet Available)
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
