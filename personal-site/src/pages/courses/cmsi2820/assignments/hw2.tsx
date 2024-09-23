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
            proposition as valid. Using this type information to guide our search, we could then declare a specific
             value to make the proposition true. We called this forming a Constructive Proof.
              In this problem I would like you to evaluate an expression and give its type. If there is no such instance that can 
            be constructed (You get an absurdity), then briefly explain why no instance within the Type required can make the statement valid. 
            Use the following information below to answer the sub-problems:
            $$\\begin{matrix}
            a:int~=~3 \\\\
            b:str~=~\\text{"3"} \\\\
            \\#:(str,~int)\\to str\\\\
            b~\\#~a~=~\\text{"333"}\\\\
            a~\\#~b~=~\\bot \\\\
            c:str~=~\\text{"three"} \\\\
            +:(int,~int)\\to int \\\\
            +:(str,~str)\\to str \\\\
            b + c~=~\\text{"3three"} \\\\
            d: rational = 1/2
            \\end{matrix}$$`}</MathJax>
          <QuestionBox points={"TBA"} qid={"Q2 EXAMPLE"}>
            <MathJax>{`Evaluate: $$
            b+b~\\#~a
            $$
            Answer: $$
            \\text{"333333"}:str
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q2 EXAMPLE"}>
            <MathJax>{`Evaluate: $$
            a + d
            $$
            Answer: $$
            \\bot:Absurd
            $$
            We know that "a" is an int and that "d" is a rational. However, we do not have a "+" operator that allows those types, thus there is no way to reduce this expression.`}</MathJax>
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q2 a"}>
            Evaluate "a + a"
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q2 b"}>
            Evaluate "b + b"
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q2 c"}>
            Evaluate "a + b"
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q2 d"}>
            Evaluate "b # b"
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q2 e"}>
            Evaluate "(b # (a + a)) + c "
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q2 f"}>
            Evaluate "d + d"
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q2 i"}>
            Evaluate "a + a +" NOTE: This is NOT a typo
          </QuestionBox>
        </QuestionBox>

        <TopicBreak title="END OF LN4" />
        <Speak>
          Within the Boolean type, their are special properties that let us
          simplify larger compound expressions. The questions in this section
          will be highlighting the interplay between Boolean Algebra on one hand
          and the Venn Diagram visual system on the other. We know they both
          have the same ability to display, and prove, properties within the
          Booleans. Lets Investigate some that we did not see in class below!
        </Speak>
        <QuestionBox points={"TBA"} qid={"Q3"}>
          <MathJax>{`One of the properties we investigated was the First
           Complement Law. We showed what it looked like in a table format
            and a series of venn diagrams. In this problem you must do the
             same as we did in class, justify the law using a table and 
             venn diagrams, expect this time for the Second 
             Complement Law shown below: 
             $$
             X \\lor \\neg X \\equiv 1
             $$`}</MathJax>
          <QuestionBox points={"TBA"} qid={"Q3 a"}>
            Justify the Second Complement Law with a Table
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q3 b"}>
            Justify the Second Complement Law with a Venn Diagram
          </QuestionBox>
        </QuestionBox>
        <QuestionBox points={"TBA"} qid={"Q4"}>
          <MathJax>{`One of the properties we investigated was the First
           Absorption Law. We showed what it looked like in a table format
            and a series of venn diagrams. In this problem you must do the
             same as we did in class, justify the law using a table and 
             venn diagrams, expect this time for the Second 
             Absorption Law shown below: 
             $$
             X \\lor (X \\land Y) \\equiv X
             $$`}</MathJax>
          <QuestionBox points={"TBA"} qid={"Q4 a"}>
            Justify the Second Absorption Law with a Table
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q4 b"}>
            Justify the Second Absorption Law with a series of Venn Diagrams
          </QuestionBox>
        </QuestionBox>
        <QuestionBox points={"TBA"} qid={"Q5"}>
          <MathJax>{`One of the properties we didn't see were the Annihilator Laws for Conjunction and Disjunction.
           In this problem you must do the
             same as we did in class, justify the laws tables and 
             venn diagrams, expect this time give a small explanation as to why these laws hold: 
             $$\\begin{matrix}
             X \\land 0 \\equiv 0 \\\\
             X \\lor 1 \\equiv 1 \\\\
             \\end{matrix}$$`}</MathJax>
          <QuestionBox points={"TBA"} qid={"Q5 a"}>
            Justify the Annihilator Laws with Tables
          </QuestionBox>
          <QuestionBox points={"TBA"} qid={"Q5 b"}>
            Justify the Annihilator Laws with a series of Venn Diagrams
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END OF LN5" />
        <Speak>
          In class we discovered the properties of operators by performing a
          deep dive into Addition with the help of 2 visual systems and an
          algebraic one. These systems were the dots with groups, number line,
          and typical algebra.
        </Speak>
        <Speak>
          However, the investigation we performed need not only have been done
          on Addition! You could do it for any operator to discover the
          properties that they have! We will do the same here, but this time for
          Multiplication and Subtraction!
        </Speak>
        <Speak>
          Here you will only need to use typical algebra and the number line, we
          can leave the dots with groups system for another time!
        </Speak>
        <QuestionBox points={"TBA"} qid={"Q6"}>
          <MathJax>{`The Associative Property is obtained by an operator between instances
          when the evaluation order amongst 3 or more of the instances, chained by that operator,
          does not alter the outcome of the larger statement. In this question you are tasked
          with showing that associativity holds on multiplication for at least one example. You must
           represent this example visually (using number lines) and algebraically. (You must use three numbers unique from one another and all of them must have an absolute value larger than 3)
          `}</MathJax>
        </QuestionBox>
        <QuestionBox points={"TBA"} qid={"Q6"}>
          <MathJax>{`The Commutative Property is obtained by an operator when the order of the 
          two input instances does not alter the outcome. In this question you are tasked
          with showing that commutativity holds on multiplication for at least one example. You must
           represent this example visually (using number lines) and algebraically. (You must use two numbers unique from one another and all of them must have an absolute value larger than 3)
          `}</MathJax>
        </QuestionBox>
        <QuestionBox points={"TBA"} qid={"Q7"}>
          <MathJax>{`The Associative Property is attained by many operators, but bot all. In this question
           you are tasked with showing that associativity does NOT hold on subtraction for at least one example. You must
           represent this example visually (using number lines) and algebraically. (You must use three numbers unique from one another and all of them must have an absolute value larger than 3)
          `}</MathJax>
        </QuestionBox>
        <QuestionBox points={"TBA"} qid={"Q7"}>
          <MathJax>{`The Commutative Property is attained by many operators, but not all. Just as before, In this question
           you are tasked with showing that commutativity does NOT hold on subtraction for at least one example. You must
           represent this example visually (using number lines) and algebraically. (You must use two numbers unique from one another and all of them must have an absolute value larger than 3)
          `}</MathJax>
        </QuestionBox>
        <QuestionBox points={"2"} qid={"Q8"}>
          <MathJax>{`We saw in class that the Identity property was obtained when there was a special instance
          within a type for an operator, such that when the operator was used, the non-special input instance
           remained unchanged. For Subtraction and Multiplication, give the special instances that prove
            Subtraction and Multiplication have this property.
          `}</MathJax>
        </QuestionBox>
        <TopicBreak title="END OF LN6" />
        <Speak>
          Our previous investigation led us naturally to do the same for
          Division, but we saw that when only using Integers, the Closure
          property was not obtained! This lead us to build a version of division
          that did obtain closure within the Integers.
        </Speak>
        <Speak>
          While Integer division worked, it was unsatisfying that it left the
          vast majority of Integers "out in the cold". Thus we needed a way to
          speak about the areas left behind. This gave us Modulus!
        </Speak>
        <Speak>
          Modulus and Integer division, as a pair, gave us the ability to fully
          describe the integers during factorization, and in the following
          section we will perform some practice with the operators!
        </Speak>

        <TopicBreak title="END OF LN7" />
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
