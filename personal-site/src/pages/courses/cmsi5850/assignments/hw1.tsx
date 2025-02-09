import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import QuestionBox from "../../components/question-box"
import TopicBox from "../../components/topic-box"
import LinkButton from "../../components/link-button"
import DueDateCalendar from "../../components/due-date-calendar"
import { DateTime } from "luxon"
import { MathJax } from "better-react-mathjax"

export default function Homework1() {
  return (
    <>
      <CoursePage
        type="homework"
        courseName="CMSI 5850: Programming Language Foundations"
        courseNumber={5850}
      >
        <CourseBox>
          <TitleBox title="HW1: Digging to Bedrock" />
          <DueDateCalendar dueDate={DateTime.local(2025, 2, 21, 23, 59)} />
          <TopicBox topics={["Logic", "Functions", "Sets", "Numbers"]} />
          <Speak>
            With this assignment you will demonstrate and develop the following
            skills:
          </Speak>
          <Speak>
            An understanding of what the study of programming languages entails.
            The ability to write and execute a program on an online programming
            platform. A familiarity with the basics of the four major
            computation theories. The ability to translate statements into logic
            formulas An understanding of some metalogical concepts. A working
            knowledge of mathematical sets, relations, and functions.
          </Speak>
        </CourseBox>
        <CourseBox>
          <TitleBox title="Reading Section" />
          <Speak>
            With what little time we find ourselves with in class, you will need
            to rely on reading material, and watching supporting videos, to get
            yourself a full understanding of the dense and specific topics we
            cover. The following material will help you organize your thoughts
            and give you the tools to complete the homework.
          </Speak>
          <QuestionBox qid={"R1"}>
            On our course site, make sure to review the following course notes
            linked here for convenience:
            <LinkButton
              color="primary"
              to="/cmsi-5850/the-study-of-programming-languages"
            >
              The Study of Programming Languages
            </LinkButton>
            <LinkButton
              color="primary"
              to="/cmsi-5850/theories-in-computer-science"
            >
              Theories in Computer Science
            </LinkButton>
            <LinkButton color="primary" to="/cmsi-5850/logic">
              Logic
            </LinkButton>
            <LinkButton
              color="primary"
              to="/cmsi-5850/foundations-of-mathematics"
            >
              Foundations of Mathematics
            </LinkButton>
          </QuestionBox>
          <QuestionBox qid={"R2"}>
            Here is a great resource that gives a run down of many of the set
            operators and the logic that is used to define them. This is a great
            review of what our foundations look like when set in Set Theory!
            <LinkButton
              color="success"
              to="https://www.cs.virginia.edu/~robins/basics.pdf"
            >
              Basic Concepts and Notation
            </LinkButton>
          </QuestionBox>
          <QuestionBox qid={"R3"}>
            Here is another great resource that is used by Gabriel Robins to
            teach Discrete Math at the University of Virginia. While the
            material include information we didn't see in class, it holds many
            valuable nuggets of information for us as well!
            <LinkButton
              color="success"
              to="https://www.cs.virginia.edu/~robins/discrete_math_review_slides.pdf"
            >
              Discrete Math Review Slides
            </LinkButton>
          </QuestionBox>
          <QuestionBox qid={"W1"}>
            Watch the videos in the course notes pages linked above! Some cover
            our topic directly and others give you a broader understanding of
            the topic!
          </QuestionBox>
          <QuestionBox qid={"O1"}>
            This is just a fun reading from Scott Aaron's blog about naming the
            biggest number for those with a curious mind!
            <LinkButton
              color="success"
              to="https://www.scottaaronson.com/writings/bignumbers.html"
            >
              Who Can Name The Bigger Number?
            </LinkButton>
          </QuestionBox>
        </CourseBox>
        <CourseBox>
          <TitleBox title="Written Section" quote="Points: 100" />
          <Speak>
            A quick tip for those of you using digital type setting through
            LaTeX specifically: My site is built using React MathJax, a library
            designed to embed LaTeX code for visualization! Right clicking on
            any LaTeX symbols you see in the site below will give you a MathJax
            context menu for copying the exact LaTeX code used to produce whats
            on screen! (Same thing for the note pages too!).
          </Speak>
          <Speak>
            Whilst writing by hand is convenient, it often leads to messy work
            that is hard to share with others. Take this time to learn LaTeX as
            it is a valuable tool used to create research papers, flyers, and
            even textbooks! It is a skill that will serve you well in enhancing
            your digital presence or even in your future career!
          </Speak>
          <Speak>
            For those of you who aren't sure where to get started with LaTeX, I
            recommend Overleaf. It is a free online LaTeX editor that is easy to
            use, has many templates and guides, and is a great way to get
            started with LaTeX without having to install anything on your
            computer!
          </Speak>
          <QuestionBox points={10} qid="Q1">
            On the course notes page entitled "The Study of Programming
            Languages" we saw the sum of even squares problem solved by a
            function written in several different languages. Write this function
            in a language not on the list. Prove that your function works on
            tio.run or replit.com page. Include the link to your code in your
            answer.
          </QuestionBox>
          <QuestionBox points={"10 total"} qid="Q2">
            In your own words, write one sentence for each of the four major
            theories of computation, conveying its central question and its
            areas of concern. We also covered that one of the major purposes of
            theories, in the scientific sense, is to provide a framework for
            prediction and explanation. Along side your single sentence
            summaries of each theory, provide an example of a prediction or
            explanation that could be made using each theory (Think about what
            each theory is trying to help describe about computation!).
          </QuestionBox>
          <QuestionBox points={10} qid="Q3">
            In the course notes page entitled "Theories in Computer Science" we
            we saw how to express the odd-number test in Lambda Calculus
            notation, Lisp, Python, JavaScript, Java, Ruby, Clojure, Swift, and
            Rust. Show how, in each of these notations or languages, to express
            a function to cube a number. Add Kotlin, Go, and Haskell. (Research
            may be required).
          </QuestionBox>
          <QuestionBox points={"10 total"} qid="Q4">
            Translate the following sentences into logical notation (Do not
            worry if what is being expressed is disagreeable or nonsense).
            Additionally, as logical notation is dense, provide a key for your
            notation.
            <QuestionBox points={1} qid={"Q4 a"}>
              If you don't leave now, you will not win the prize.
            </QuestionBox>
            <QuestionBox points={1} qid={"Q4 b"}>
              Ani or her sisters might have been late.
            </QuestionBox>
            <QuestionBox points={1} qid={"Q4 c"}>
              Some dogs like cats who live in the capital of Turkey.
            </QuestionBox>
            <QuestionBox points={1} qid={"Q4 d"}>
              The person who won the race prefers orange juice to tea.
            </QuestionBox>
            <QuestionBox points={1} qid={"Q4 e"}>
              3 will never be greater than 7.
            </QuestionBox>
            <QuestionBox points={1} qid={"Q4 f"}>
              Not every odd number is greater than its own square.
            </QuestionBox>
            <QuestionBox points={1} qid={"Q4 g"}>
              Something evil caused all evil things except itself.
            </QuestionBox>
            <QuestionBox points={1} qid={"Q4 h"}>
              Some day, it will be possible that all players will have the same
              score.
            </QuestionBox>
            <QuestionBox points={1} qid={"Q4 i"}>
              War is peace, freedom is slavery, and ignorance is strength.
            </QuestionBox>
            <QuestionBox points={1} qid={"Q4 j"}>
              All that was once true will someday necessarily be forever false.
            </QuestionBox>
          </QuestionBox>
          <QuestionBox points={10} qid="Q5">
            <MathJax>{`
            In classical logic \\(\\exists\\) and \\(\\forall\\) are duals of one another, because
            \\((\\neg \\exists x.P) \\equiv \\forall x. \\neg P\\) and \\((\\neg \\forall x.P) \\equiv \\exists x. \\neg P\\).
            Are the temporal operators \\(\\textbf{F}\\) and \\(\\textbf{G}\\) duals of one another? Why or why not?
            `}</MathJax>
          </QuestionBox>
          <QuestionBox points={10} qid={"Q6"}>
            Mark each of the following formulas as true or false.
            <QuestionBox points={1} qid={"Q6 a"}>
              <MathJax>{`$$
              \\varnothing \\in \\varnothing
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={1} qid={"Q6 b"}>
              <MathJax>{`$$
              \\varnothing \\in \\{\\varnothing \\}
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={1} qid={"Q6 c"}>
              <MathJax>{`$$
              \\varnothing \\subseteq \\varnothing
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={1} qid={"Q6 d"}>
              <MathJax>{`$$
              \\varnothing \\in \\{\\varnothing \\}
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={1} qid={"Q6 e"}>
              <MathJax>{`$$
              \\{ x,y \\} \\subseteq \\mathcal{P}(\\{ x,y, \\{x,y \\} \\})
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={1} qid={"Q6 f"}>
              <MathJax>{`$$
              \\mathcal{P}(\\varnothing) = \\{ \\varnothing \\}
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={1} qid={"Q6 g"}>
              <MathJax>{`$$
              \\{ x,y,z \\}^3 - \\{ s |~|s| \\leq \\} \\neq \\varnothing
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={1} qid={"Q6 h"}>
              <MathJax>{`$$
              \\bigcup \\{ \\mathbb{N}, \\mathbb{B}, \\mathbb{Q} \\} - \\mathbb{B} = \\mathbb{Q}
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={1} qid={"Q6 i"}>
              <MathJax>{`$$
              (9,3,F) \\in \\mathbb{Z} \\times \\mathbb{B} \\times \\mathbb{R} \\wedge (1,2)\\!\\downarrow\\!1 = 2
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={1} qid={"Q6 j"}>
              <MathJax>{`$$
              |\\mathcal{P}(\\{a,b,c\\}) - \\mathcal{P}(\\{a,b\\})| = 5
              $$`}</MathJax>
            </QuestionBox>
          </QuestionBox>
          <QuestionBox points={10} qid="Q7">
            Suppose you had a classical, bivalent logistic system powerful
            enough to express statements about the provability of its own
            formulas, for example, "This formula is not provable" or
            equivalently "I am not provable." Show that such a system, if
            consistent, must be incomplete, and if complete, must be
            inconsistent.
          </QuestionBox>
          <QuestionBox points={10} qid="Q8">
            Is the intersection of two partial orders a partial order? If so,
            prove it. if not, provide a counter example.
          </QuestionBox>
          <QuestionBox points={"10 total"} qid="Q9">
            <MathJax
              inline
            >{`Let \\(f = \\lambda x. 2x+1\\) and \\(g = \\lambda x. \\lambda y. 3xy\\). 
            Reduce each of the following expressions (or if they cannot be reduced say why):`}</MathJax>
            <QuestionBox points={2} qid={"Q9 a"}>
              <MathJax>{`$$
              f^5(20)
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={2} qid={"Q9 b"}>
              <MathJax>{`$$
              f \\circ f
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={2} qid={"Q9 c"}>
              <MathJax>{`$$
              g(f[5/3](3)-f[5/3](2))
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={2} qid={"Q9 d"}>
              <MathJax>{`$$
              (\\lambda w. (f^{-1}(71),w(5),w(1)))(f \\circ (g~1))
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={2} qid={"Q9 e"}>
              <MathJax>{`$$
              (\\lambda x. (x~x))(\\lambda x. (x~x))
              $$`}</MathJax>
            </QuestionBox>
          </QuestionBox>
          <QuestionBox points={"10 total"} qid="Q10">
            Simplify each of the following expressions as much as possible
            without introducing any roundoff error. Your simplified expressions
            must still be exact:
            <QuestionBox points={2} qid={"Q10 a"}>
              <MathJax>{`$$
              3 \\uparrow \\uparrow 2
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={2} qid={"Q10 b"}>
              <MathJax>{`$$
              2 \\uparrow \\uparrow \\uparrow 3
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={2} qid={"Q10 c"}>
              <MathJax>{`$$
              790912853^{3892359}~mod~90277
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={2} qid={"Q10 d"}>
              This expression refers to quaternion multiplication!
              <MathJax>{`$$
              (3+2i-8k) \\times (8i+2j-k)
              $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={2} qid={"Q10 e"}>
              <MathJax>{`$$
              log_8{2^{333333333}}
              $$`}</MathJax>
            </QuestionBox>
          </QuestionBox>
          <Speak>
            Wow! That was a lot of foundational material to cover! However these
            tools we've learned will be invaluable to us as we go on to define
            explicit formal mechanisms for handling computation!
          </Speak>
          <Speak>
            Below is a link to the Brightspace assignment for turning in your
            HW!
          </Speak>
          <LinkButton
            color="success"
            to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=321793&grpid=0&isprv=0&bp=0&ou=267867"
          >
            Written HW1 Turn In
          </LinkButton>
        </CourseBox>
      </CoursePage>
    </>
  )
}
