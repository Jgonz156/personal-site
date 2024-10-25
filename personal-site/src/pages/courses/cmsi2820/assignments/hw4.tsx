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
import { MathJax } from "better-react-mathjax"
import CodeBox from "../../components/code-box"

export default function Homework4() {
  return (
    <CoursePage type="homework">
      <CourseBox>
        <TitleBox title="HW4: Silence of the Lambdas" />
        <DueDateCalendar dueDate={DateTime.local(2024, 11, 1, 8, 59)} />
        <TopicBox
          topics={[
            "Lambda Calculus",
            "Reductions",
            "Free and Bound Variables",
            "Function Classes",
            "Function Properties",
          ]}
        />
        <Speak></Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Written Section" quote="Points: 60" />
        <QuestionBox qid={"Q1"} points={10}>
          In this problem you are tasked with matching items from the
          left-hand-side to the right-hand side. The items are general to
          lambdas/functions, so make the best matching pairs that you can,
          however there is an intended match for each item. There are no "extra"
          items, there are 10 pairs in total that must be constructed, and there
          are no pairs made from items on the same side.
          <MathJax>{`$$\\begin{matrix}
          \\text{a. named function} & \\text{1. } \\lambda a.~a~a \\to \\lambda b.~b~b \\\\ 
          \\text{b. } \\alpha\\text{-conversion} & \\text{2. } \\lambda w.~print~w \\to print \\\\
          \\text{c. } \\lambda xy.~x \\cdot y & \\text{3. lambda x, y: x(y)} \\\\
          \\text{d. } \\lambda xy.~mul~x~y & \\text{4. lambda x, y: x * y} \\\\
          \\text{e. unnamed function} & \\text{5. lambda } a:~\\text{lambda }b:~a \\\\
          \\text{f. } \\lambda xy.~x~y & \\text{6. lambda } b:~\\text{lambda }a:~b \\\\
          \\text{g. } \\beta\\text{-conversion} & \\text{7. def mul(x, y): return x * y } \\\\
          \\text{h. } \\eta \\text{-conversion} & \\text{8. } \\lambda a.a \\\\
          \\text{i. } \\lambda b.~\\lambda a.~b & \\text{9. lambda x, y: mul(x, y)} \\\\
          \\text{j. } \\lambda a.~\\lambda b.~a & \\text{10. } (\\lambda bc.~b~+~c)~1~2 \\to 1~+~2\\\\
          \\end{matrix}$$`}</MathJax>
        </QuestionBox>
        <TopicBreak title="END OF LN12" />
        <QuestionBox qid={"Q2"} points={"15 total"}>
          In this problem you are given 2 Python programs and 3 lambda calculus
          expressions. Your job is to identify the Free and Bound variables in
          the programs/expressions. Identify the free variables by
          highlighting/underling all occurrences of them in the
          program/expression.
          <QuestionBox qid={"Q2 a"} points={"3"}>
            In this sub-problem you are given the following Python program:
            <CodeBox
              height="14rem"
              code={`
x = 12
y = "I'm free, I promise ;)"
w = "Hello"
w += " World!"
def B(a, b, x):
    if True:
        return a, b
    else:
        return x
              `}
            />
          </QuestionBox>
          <QuestionBox qid={"Q2 b"} points={"3"}>
            In this sub-problem you are given the following Python program:
            <CodeBox
              height="14rem"
              code={`
"I'm Free!"
augend = 10
addend = 27
def A(a, b, m):
    return m * (augend + b)
multiplier = 2
def B(f, y, x):
    x * multiplier
    print(f(y + addend))
              `}
            />
          </QuestionBox>
          <QuestionBox qid={"Q2 c"} points={"3"}>
            In this sub-problem you are given the following Lambda Calculus
            expression:
            <MathJax>{`$$
            x_1~(\\lambda x_2.~add~x_2~x_3)~x_4
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q2 d"} points={"3"}>
            In this sub-problem you are given the following Lambda Calculus
            expression:
            <MathJax>{`$$
            (\\lambda a.a~b~\\lambda c.a)~(\\lambda b.a~c~b)~d~a
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q2 e"} points={"3"}>
            In this sub-problem you are given the following Lambda Calculus
            expression:
            <MathJax>{`$$
            \\lambda x.~(\\lambda x.~y~x~w~x)~w~y~x~\\lambda w.~x~y~w~w~(\\lambda y.~w~y~x)~x
            $$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END OF LN13" />
        <QuestionBox qid={"Q3"} points={"15 total"}>
          In the following problem you are tasked with performing successful
          alpha, beta, and gamma conversions using proper substitution on 5
          lambda calculus expressions.
          <QuestionBox qid={"Q3"} points={1}>
            Perform an alpha conversion on the following lambda:
            <MathJax>{`$$
          \\lambda x.~x~y
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3"} points={1}>
            Perform a beta conversion on the following lambda expression:
            <MathJax>{`$$
          (\\lambda w.~add~w~w)~3
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3"} points={1}>
            Perform a gamma conversion on the following lambda:
            <MathJax>{`$$
          \\lambda xy.~mul~x~y
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3"} points={3}>
            Perform the following proper substitutions on the lambda calculus
            expression:
            <MathJax>{`$$
          ((\\lambda x.~\\lambda y.~x)[w/x])[z/w]
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3"} points={3}>
            Perform the following proper substitutions on the lambda calculus
            expression:
            <MathJax>{`$$
          (\\lambda z.w)[y/w])[(\\lambda f. \\lambda x.~f~x)/y]
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3"} points={3}>
            Perform the proper substitution on the following lambda:
            <MathJax>{`$$
          (\\lambda t.~(\\lambda x.~x~t~w))[t/w]
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3"} points={3}>
            Use all the conversion rules to simplify the following lambda
            expression as much as possible (Assume "mul" is a function that
            takes two arguments and multiplies them):
            <MathJax>{`$$
          (\\lambda x.~(\\lambda a.~\\lambda b.~x~x~a~b~x~a~b))~mul~2~3
          $$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END OF LN14" />
        <QuestionBox qid={"Q4"} points={"20 total"}>
          In this problem you are tasked with identifying the Domain, Codomain,
          Image, and Pre-image for a number of lambdas. For each of the lambdas
          you must also identify if the function is Injective, Surjective,
          and/or Bijective. Accompany each lambda with a two oval mapping
          diagram to organize your information. The type information is given in
          the following new format:
          <MathJax>{`$$
          \\lambda x.~x:~\\mathbb{Z} \\to \\mathbb{Z}
          $$`}</MathJax>
          In this new format the left-hand-side of the colon is the lambda
          expression and the right-hand-side features the input type with an
          arrow pointing toward the output type.
          <QuestionBox qid={"Q4 a"} points={"5"}>
            State all the requested information for the following lambda:
            <MathJax>{`$$
            \\lambda x.~x^2:~\\mathbb{Z} \\to \\mathbb{Z}
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q4 b"} points={"5"}>
            State all the requested information for the following lambda:
            <MathJax>{`$$
            \\lambda a.~a~\\div~2:~\\mathbb{Z} \\to \\mathbb{R}
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q4 c"} points={"5"}>
            For the following lambda, a new unary operator is introduced. The
            new operator is the floor operation which rounds a real number down
            to the nearest integer. It is visually represented similarly to
            absolute value except it uses two "hockey sticks" as opposed to two
            pipes. Here are a few examples:
            <MathJax>{`$$
            \\lfloor ~3.14~ \\rfloor = 3, \\lfloor ~-3.14~ \\rfloor = -4, \\lfloor ~0~ \\rfloor = 0
            $$`}</MathJax>
            State all the requested information for the following lambda:
            <MathJax>{`$$
            \\lambda y.\\lfloor ~y~ \\rfloor:~\\mathbb{R} \\to \\mathbb{Z}
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q4 d"} points={"5"}>
            State all the requested information for the following lambda:
            <MathJax>{`$$
            \\lambda w.~(2\\cdot w)+1:~\\mathbb{R} \\to \\mathbb{R}
            $$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END OF LN15" />
        <LinkButton color="success" to="">
          Written HW4 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 40" />
        <DirectoryTree
          filesAsJSON={{
            "CMSI-2820-HW4": {
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
          GitHub Assignment
        </LinkButton>
        <LinkButton color="success" to="">
          Programming HW4 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Optional Section For Collections" quote="Points: 20" />
        <Speak></Speak>
        <LinkButton color="success" to="">
          Optional HW3 Turn in
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
