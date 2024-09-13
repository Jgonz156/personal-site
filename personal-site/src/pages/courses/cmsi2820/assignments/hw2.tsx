import { DateTime } from "luxon"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import DirectoryTree from "../../components/directory-tree"
import DueDateCalendar from "../../components/due-date-calendar"
import LinkButton from "../../components/link-button"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"
import QuestionBox from "../../components/question-box"
import TopicBreak from "../../components/topic-break"
import { MathJax } from "better-react-mathjax"

export default function Homework2() {
  return (
    <CoursePage type="homework">
      <CourseBox>
        <TitleBox title="HW2: Counting Sheep" />
        <DueDateCalendar dueDate={DateTime.local(2024, 10, 4, 23, 59)} />
        <TopicBox
          topics={[
            "Type Theory",
            "Boolean Algebra",
            "Venn Diagrams",
            "Integer Arithmetic",
            "Modular Arithmetic",
          ]}
        />
        <Speak>
          In class we've see the beginnings of Type Theory! We started with
          gathering an intuition for how Type Theory underlies mathematics and
          then investigated two unique numerical types and their operations.
          These numeric types being the Booleans and the Integers. After
          learning about each in depth, we are here to now practice how these
          types interact with themselves and each other!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Written Section" quote="Points: TBA" />
        <Speak>
          After an informal history lesson of Set Theory, Category Theory, and
          Type Theory, we have chosen Type Theory as our foundation moving
          forward! (Well, actually I chose it, but I'm the professor so you'll
          have to put up with it).
        </Speak>
        <Speak>
          We saw that Type Theory makes its arguments through a Constructive
          perspective, where by we need to find an instance of something
          happening to understand and define a greater type that objects
          informs.
        </Speak>
        <Speak>
          Below, we will now get practice with the formal notation used to
          denote this relationship (And the greater philosophical argument that
          it represents)
        </Speak>
        <QuestionBox points={"TBA"} qid={"Q1"}>
          <MathJax>{`We saw in class that the formal notation for an instance
           proving the existence of a Type was the following:
           $$\\begin{matrix}
           a:A \\\\
           10:Integer \\\\
           \\text{"dog"}:String
           \\end{matrix}$$
            In the sub-problems below, give your answers in the exact same format.`}</MathJax>
          <QuestionBox points={"TBA"} qid={"Q1 a"}>
            Give 5 unique real-world examples of an instance proving the
            existence of a type
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q1 b"}>
            Give 5 unique real-world instances that all prove the existence of
            the SAME type
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q1 c"}>
            Give 5 unique real-world types whose existence is proven by the SAME
            instance
          </QuestionBox>
        </QuestionBox>
        <QuestionBox points={"TBA"} qid={"Q2"}>
          <MathJax>{`In class we saw that Type information could be used to intuit
           the kind of instance we would need to search for to show some greater
            proposition as valid. We called this forming a Constructive Proof of 
            something. In this problem I would like you to determine the Type of x 
            and give an instance to prove the statement, only using type information from the rest of the 
            compound proposition. Say that there is no such instance that can 
            be constructed, then show that no instance within the Type that X 
            must be can make the statement valid. Use the following information below to answer the sub-problems:
            $$\\begin{matrix}
            Fact 1 \\\\
            Fact 2 \\\\
            Fact 3 \\\\
            Fact 4 \\\\
            Fact 5 \\\\
            Fact 6 \\\\
            \\end{matrix}$$`}</MathJax>
        </QuestionBox>
        <TopicBreak title="END OF LN4" />
        <Speak>
          INCLUDE: Absorption laws, Complement Laws, Annihilator/Annulment,
          Involution, Identity
        </Speak>
        <TopicBreak title="END OF LN5" />
        <LinkButton color="success" to="">
          Written HW2 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: TBA" />
        <DirectoryTree filesAsJSON={{}} />
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
          GitHub Assignment
        </LinkButton>
        <LinkButton color="success" to="">
          Programming HW2 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Optional Section For Logic" quote="Points: 20" />
        <Speak>
          The creative endeavor I am suggesting for Logic is to apply your logic
          knowledge to a real world event/experience/memory! (However always
          remember that you can work out an alternate creative endeavour if you
          want to involve your hobbies! You can make creative works in any form
          such as games, drawings, paintings, dioramas, sculptures, videos, fake
          blogs, memes, anything!) (For instance, while I am working on this HW
          I am listening to music! Want to analyze a song with logic? Write your
          own logical song? Go for it!) (Just make sure to talk to me first!)
        </Speak>
        <Speak>
          We saw in class that Logic, while being a greater philosophical topic,
          is about evaluation of truth and the inference of new truths! I would
          like you to take any "playground" argument and convince me of your
          beliefs about it!
        </Speak>
        <Speak>
          What is a playground argument? Any argument with no stakes in harming
          others, such as "is water wet?", "Is a hotdog a sandwich?", "Is a
          Poptart a calzone?", etc. You are allowed to make your own
          "playground" argument if you'd like.
        </Speak>
        <Speak>
          Take your playground argument and use the tools (Intuitionistic Logic,
          Propositional Logic, Logical Connectives, Natural Deduction) we saw in
          class to prove to me your stance on the matter is correct! You don't
          need to use all the tools we saw in class to make a good argument to
          me, however, the more tools you do use, the more points you get!
        </Speak>
        <Speak>
          For instance, you could take a collection of propositions that
          represent your argument and display why they are a valid stance using
          Natural Deduction! You could also argue from intuitionism in prose!
          Give me an intuitionistic argument for why you are right by arguing
          that other stances lead to absurdities or falsehoods!
        </Speak>
        <LinkButton color="success" to="">
          Optional HW0 turn in
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
