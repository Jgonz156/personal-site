import { MathJax } from "better-react-mathjax"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBreak from "../../components/topic-break"
import ImageBox from "../../components/image-box"
import PhilosophyBreak from "../../components/philosophy-break"

export default function LectureNotes6() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN5",
          buttonColor: "primary",
          buttonName: "Meet The Booleans, Don't Worry There's only Two of Them",
          buttonSlug: "/cmsi-2820/ln5",
        },
        middle: {
          lectureId: "HW2",
          buttonColor: "success",
          buttonName: "Counting Sheep",
          buttonSlug: "/cmsi-2820/hw2",
        },
        /*
        right: {
          lectureId: "LN7",
          buttonColor: "primary",
          buttonName: "",
          buttonSlug: "/cmsi-2820/ln",
        },*/
      }}
    >
      <CourseBox>
        <TitleBox
          title="The Integers, The Booleans' Infinite In-laws"
          quote={`"" - `}
        />
        <Speak>
          The other day we used operators as a way to intuitively discover why
          boolean algebra, a system for logic, could be completely represented
          by algebraic operations on just 1 and 0. However, what about the
          operators themselves?
        </Speak>
        <Speak>
          This allowed us to discover the Boolean Type, but what about we go the
          other way around and use a type we have pre-existing knowledge of to
          introspectively discover more about what operators even are.
        </Speak>
        <Speak>
          Today we use the investigate operators using The Integers. While we
          won't get to define operators directly today (We need the Lambda
          Calculus for that), we will discover much about them in the way of
          properties and patterns.
        </Speak>
        <Speak>
          We begin by clarifying the Integers. We will be discussing all whole
          numbers out to "negative infinity", 0, and all whole numbers out to
          "positive infinity".
        </Speak>
        <MathJax>{`$$
        Integers = \\{-\\infty , ..., -2,-1,0,1,2, ..., \\infty\\}
        $$`}</MathJax>
        <Speak>
          Now, where do we begin with operators? They come in many "flavors" but
          the most common are binary. This means they take two instances to
          function and they reduce to some singular instance.
        </Speak>
        <MathJax>{`$$
        a \\sim b = ~ ...
        $$`}</MathJax>
        <Speak>
          The tilde in the above statement is meant to be a placeholder for
          other binary operators. We can see some real examples below that we
          are familiar with in terms of the Integers:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        a + b = ~ ... \\\\
        a - b = ~ ... \\\\
        a * b = ~ ... \\\\
        a \\div b = ~ ... \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          However, just to ensure we don't restrict ourselves too greatly, just
          know that the binary operators does not need to appear "infix" which
          means that it is in between the two instances. It could also be
          prefix, or suffix:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{prefix addition: } (+~a~b) = ~ ... \\\\
        \\text{suffix division: } (a~b~\\div) = ~ ... \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          However, we never see addition and division like this, it is possible
          and below we can see some "actual" operators that are not infix:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        log_b(a) \\\\
        a^b \\\\
        \\frac{a}{b}
        \\end{matrix}$$`}</MathJax>
        <Speak>
          In the event of logarithms and division we have to be careful in an
          Integer context as they are not closed over the integers (We will see
          what that means later!), but this displays a good visual for the
          unique visual representation operators can take on.
        </Speak>
        <Speak>
          I guess you could argue about the last two, as the operator sorta
          "shows" up in between but this is a game of semantics we don't need to
          investigate today. This is just an aside to display the visual
          creativity of many operators.
        </Speak>
        <Speak>
          There are also Unary operators, like negation and factorials, that we
          are familiar with:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        -a \\\\
        a! \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          However, operators can be defined to take "n" instances as input!
          While it doesn't work exclusively with the Integers, if we include our
          Booleans we can actual see a widely used operator with three inputs!
          It's called the ternary operator:
        </Speak>
        <MathJax>{`$$\\text{Ternary: } a~?~ b ~:~c$$`}</MathJax>
        <Speak>
          Wait, seeing this new operator points out something obvious but
          interesting. We've learned to ingrain instructions with symbols like +
          and *, however, the symbol tells you nothing about what the operation
          actually is!
        </Speak>
        <Speak>
          What does the ternary actually do? This is where type information is
          extraordinarily useful! If I were to add type information, we get a
          better idea as to what its doing!
        </Speak>
        <MathJax>{`$$\\text{Ternary: } a:Boolean~?~ b:Instance ~:~c:Instance$$`}</MathJax>
        <Speak>
          While cluttered, now we can begin to see what's happening! However, we
          can't define it formally without the Lambda Calculus later, so for
          now, we will accept it as is.
        </Speak>
        <Speak>
          As we can begin to see, there is a lot to learn about operators, so
          lets see how much we can uncover with a thorough investigation of the
          simplest one within the Integers: Addition!
        </Speak>
        <TopicBreak title="Addition?" />
      </CourseBox>
    </CoursePage>
  )
}
