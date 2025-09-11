import { DateTime } from "luxon"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
//import DirectoryTree from "../../components/directory-tree"
import DueDateCalendar from "../../components/due-date-calendar"
import LinkButton from "../../components/link-button"
import QuestionBox from "../../components/question-box"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"
import TopicBreak from "../../components/topic-break"
import { MathJax } from "better-react-mathjax"
import CodeBox from "../../components/code-box"

const HW_BS_WRITTEN_TURN_IN_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802244/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277"
//const HW_GH_ASSIGNMENT_LINK = null // No programming portion for this HW
//const HW_BS_PROGRAMMING_TURN_IN_LINK = null // No programming portion for this HW
const HW_BS_OPTIONAL_TURN_IN_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802245/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277"

export default function Homework4() {
  return (
    <CoursePage
      type="homework"
      courseName="CMSI 2820: Discrete Mathematics for CS"
      courseNumber={2820}
    >
      <CourseBox>
        <TitleBox title="HW4: Silence of the Lambdas" />
        <DueDateCalendar dueDate={DateTime.local(2025, 10, 31, 11, 59)} />
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
        <TitleBox title="Written Section" quote="Points: 100" />
        <QuestionBox qid={"Q1"} points={20}>
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
        <QuestionBox qid={"Q2"} points={"25 total"}>
          In this problem you are given 2 Python programs and 3 lambda calculus
          expressions. Your job is to identify the Free and Bound variables in
          the programs/expressions. Identify the free variables by
          highlighting/underlining all occurrences of them in the
          program/expression.
          <QuestionBox qid={"Q2 a"} points={"5"}>
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
          <QuestionBox qid={"Q2 b"} points={"5"}>
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
          <QuestionBox qid={"Q2 c"} points={"5"}>
            In this sub-problem you are given the following Lambda Calculus
            expression:
            <MathJax>{`$$
            x_1~(\\lambda x_2.~add~x_2~x_3)~x_4
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q2 d"} points={"5"}>
            In this sub-problem you are given the following Lambda Calculus
            expression:
            <MathJax>{`$$
            (\\lambda a.a~b~\\lambda c.a)~(\\lambda b.a~c~b)~d~a
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q2 e"} points={"5"}>
            In this sub-problem you are given the following Lambda Calculus
            expression:
            <MathJax>{`$$
            \\lambda x.~(\\lambda x.~y~x~w~x)~w~y~x~\\lambda w.~x~y~w~w~(\\lambda y.~w~y~x)~x
            $$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END OF LN13" />
        <QuestionBox qid={"Q3"} points={"30 total"}>
          In the following problem you are tasked with performing successful
          alpha, beta, and gamma conversions using proper substitution on the
          following lambda calculus expressions.
          <QuestionBox qid={"Q3 a"} points={2}>
            Perform an alpha conversion on the following lambda:
            <MathJax>{`$$
          \\lambda x.~x~y
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3 b"} points={2}>
            Perform a beta conversion on the following lambda expression:
            <MathJax>{`$$
          (\\lambda w.~add~w~w)~3
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3 c"} points={3}>
            Perform a gamma conversion on the following lambda:
            <MathJax>{`$$
          \\lambda xy.~mul~x~y
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3 d"} points={5}>
            Perform the following proper substitutions on the lambda calculus
            expression:
            <MathJax>{`$$
          ((\\lambda x.~\\lambda y.~x)[w/x])[z/w]
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3 e"} points={5}>
            Perform the following proper substitutions on the lambda calculus
            expression:
            <MathJax>{`$$
          (\\lambda z.w)[y/w])[(\\lambda f. \\lambda x.~f~x)/y]
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3 f"} points={6}>
            Perform the proper substitution on the following lambda:
            <MathJax>{`$$
          (\\lambda t.~(\\lambda x.~x~t~w))[t/w]
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3 g"} points={7}>
            Use all the conversion rules to simplify the following lambda
            expression as much as possible (Assume "mul" is a function that
            takes two arguments and multiplies them):
            <MathJax>{`$$
          (\\lambda x.~(\\lambda a.~\\lambda b.~x~x~a~b~x~a~b))~mul~2~3
          $$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END OF LN14" />
        <QuestionBox qid={"Q4"} points={"25 total"}>
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
          <QuestionBox qid={"Q4 a"} points={"6"}>
            State all the requested information for the following lambda:
            <MathJax>{`$$
            \\lambda x.~x^2:~\\mathbb{Z} \\to \\mathbb{Z}
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q4 b"} points={"6"}>
            State all the requested information for the following lambda:
            <MathJax>{`$$
            \\lambda a.~a~\\div~2:~\\mathbb{Z} \\to \\mathbb{R}
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q4 c"} points={"6"}>
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
          <QuestionBox qid={"Q4 d"} points={"7"}>
            State all the requested information for the following lambda:
            <MathJax>{`$$
            \\lambda w.~(2\\cdot w)+1:~\\mathbb{R} \\to \\mathbb{R}
            $$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END OF LN15" />
        <LinkButton color="success" to={HW_BS_WRITTEN_TURN_IN_LINK}>
          Written HW4 Turn In
        </LinkButton>
      </CourseBox>
      {/*
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
        <LinkButton color="success" to={HW_GH_ASSIGNMENT_LINK}>
          GitHub Assignment
        </LinkButton>
        <LinkButton color="success" to={HW_BS_PROGRAMMING_TURN_IN_LINK}>
          Programming HW4 Turn In
        </LinkButton>
      </CourseBox>
      */}
      <CourseBox>
        <TitleBox title="Optional Section For Collections" quote="Points: 20" />
        <Speak>
          As with the other creative endeavors from the previous Optional HW's,
          integrate your learning into a real world event/experience/memory!
          (However always remember that you can work out an alternate creative
          endeavour if you want to involve your hobbies! You can make creative
          works in any form such as games, drawings, paintings, dioramas,
          sculptures, videos, fake blogs, memes, anything!) (For instance, while
          I am working on this HW I am hungry and can imagine a number of ways
          that you could organize a grocery store into sets and tuples. Are
          shelves ordered? In what ways? what about bargain deal aisles, are
          they unordered? I could make a set/tuple representation of all of
          Ralphs!) (Just make sure to talk to me first!)
        </Speak>
        <Speak>
          We saw in class that Collections, while of course being responsible
          for holding other types, was more complicated than simply picking a
          basket to throw things in. When choosing to represent a collection of
          items, the decision between using a set or tuple was more fundamental
          than just needing to hold onto some values. Choosing a Set inherently
          suggested that membership was all that mattered and that there was no
          special meaning to being anywhere in the group. Choosing a Tuple
          suggested that order was important and that your collections of
          elements could not be understood in any other manner. With this said,
          my suggestion for your creative endeavour is to really feel what the
          difference between a set and a tuple is by taking something in your
          hobby that is ordered and attempt to engage with it in an unordered
          manner and take something that is normally unordered and engage with
          it in an ordered manner. Document the results to me!
        </Speak>
        <Speak>
          What does it mean to find something ordered in your hobby? Well, look
          for something that is always done in the same manner or something that
          is normally done with consistency and see what you can accomplish when
          you do it inconsistently! To give some examples, say you like building
          structures with Legos, what would happen if you bounced around the
          booklet of build instructions? Could you still make the build? Is it
          possible to assemble the varying built pieces together still? What
          type of builds "survive" this change? If you play Volleyball, what
          would happen if you allowed any one to go anywhere when a court
          rotation is typically done? Can the game be salvaged? Do you
          strategies change? If you are a musician, what would happen if you
          played the notes of a song in a different order? Would it still sound
          the same? Would it still be recognizable? Do certain songs "maintain"
          their identity more than others?
        </Speak>
        <Speak>
          What about finding something unordered in your hobby? Search for
          something that is typically done at any time or without conditions and
          see how things change when you enforce consistency upon it! For
          instance, if you absent mindedly scroll through your For You Page for
          funny posts, how would your experience be different if you forced
          yourself to go through the posts in alphabetical order by creator?
          Would you still enjoy your FYP? Does it make it more or less enjoyable
          to always see a certain content creator first? Would you end up
          unfollowing/unsubscribing to certain people? If you like eating food
          off your plate in any order, what would happen if you forced yourself
          to always eat in a clockwise manner? Would you still enjoy your meal?
          How would you change the plate to be more enjoyable under these
          constraints? Would you always eat mixed-bowl style meals to get around
          this? If you like to play video games with friends, what would happen
          if the only way to close the game was to be successful first ("End on
          a win")? How quick are certain games to get out of? How does adding
          more people to your group change your odds of success? Would you start
          avoiding certain game genres? Are certain genres of game unaffected?
        </Speak>
        <Speak>
          Take the ordered and unordered experiences you get from your hobby and
          write/show/display to me how they are different as a result.Explain to
          me what the experience is normally like and then explain what specific
          parts of that experience changes for better or for worse when you
          "switch the collection type" around!
        </Speak>
        <Speak>
          For instance, I enjoy lecturing for this course, I am your professor
          after all, and something that is typically ordered is how we go
          through lecture. Everything builds on the next thing, so what would
          happen if for one lecture I did the announcements at the end, the
          recap in the middle, put examples out of order? Would the lecture
          still be understandable? Would it still be enjoyable for me to teach
          this way or for you to learn in those conditions? What kind of
          lectures can survive this change? What I would do is try to lecture in
          this manner and identify what parts of the lecture are still
          successful and what parts are not and then I would write down how
          making it unordered specifically changed it. Then I would identify
          something that is typically unordered about my teaching, such as how I
          pick students to answer questions, and I would see what would happen
          if I always picked students in order from front of the class to back
          of the class. Would that shift students around the classroom? Would is
          make answering the question more or less stressful? Would more or less
          people show up to class? I would then try this process out for a
          lecture or two and then write down the changes I noticed that
          specifically arose due to the change in picking students.
        </Speak>
        <Speak>
          I am only asking that you perform this investigation for one ordered
          and one unordered experience in your hobby. If you want to do more
          that is great and will get you more points! However, the main way to
          gain points is to pick something interesting and be thoughtful in your
          description (and theories that you come up with along the way) about
          how swapping order for disorder and disorder for order changes the
          experience! The more properties you include and the more operations
          you find, the more points you earn!
        </Speak>
        <LinkButton color="success" to={HW_BS_OPTIONAL_TURN_IN_LINK}>
          Optional HW4 Turn in
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
