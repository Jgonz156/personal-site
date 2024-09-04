import { MathJax } from "better-react-mathjax"
import CourseBox from "../components/course-box"
import CoursePage from "../components/course-page"
import Speak from "../components/speak"

export default function CheatSheet() {
  return (
    <CoursePage type="cheat-sheet">
      <CourseBox>
        <Speak>
          This Cheat Sheet is a living document, much like the rest of this
          site! As we progress through the course standards this page will fill
          with more and more information to use as reference! It features
          dividers that separate each standard from each other and topic
          separations if the are relevant.
        </Speak>
      </CourseBox>
      <CourseBox>
        <MathJax>{`\\[\\top:Reality, \\bot:Absurdity, T:True, F:False\\]`}</MathJax>
        <MathJax>{`$$\\text{Propositional Variables: }X_{0},X_{1},X_{2},...$$`}</MathJax>
        <MathJax>{`$$\\begin{matrix}
        \\text{"Equals"} & \\equiv & Logical \\space Equivalence & A \\equiv B \\\\
        \\text{"Not"} & \\lnot & Negation & \\lnot A \\\\
        \\text{"And"} & \\land & Conjunction & A \\land B \\\\
        \\text{"And Or"} & \\lor & Disjunction & A \\lor B \\\\
        \\text{"Implies/If Then"} & \\to & Implication & A \\to B \\\\
        \\end{matrix}$$`}</MathJax>
        <MathJax>{`$$\\begin{matrix}
        A & B & A\\equiv B & \\neg A & A \\land B & A \\lor B & A \\to B \\\\
        T & T & T & F & T & T & T \\\\
        T & F & F & F & F & T & F\\\\
        F & T & F & T & F & T & T\\\\
        F & F & T & T & F & F & T\\\\
        \\end{matrix}$$`}</MathJax>
      </CourseBox>
    </CoursePage>
  )
}
