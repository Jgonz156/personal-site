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
import { Typography } from "@mui/joy"
import BookCard from "../../../../components/book-card"
import Vocab from "../../components/vocab"
import CodeBox from "../../components/code-box"

const textbook = {
  title:
    "Formal Syntax and Semantics of Programming Languages: A Laboratory Based Approach",
  authors: ["Slonneger, Kenneth", "Kurtz, Barry L."],
  pages: 654,
  abstract: (
    <>
      <Typography>
        This text developed out of our experiences teaching courses covering the
        formal semantics of programming languages. Independently we both
        developed laboratory exercises implementing small programming languages
        in Prolog following denotational definitions. Prolog proved to be an
        excellent tool for illustrating the formal semantics of programming
        languages. We found that these laboratory exercises were highly
        successful in motivating students since the hands-on experience helped
        demystify the study of formal semantics. At a professional meeting we
        became aware of each other's experiences with a laboratory approach to
        semantics, and this book evolved from that conference.
      </Typography>
      <Typography>
        Although this text has been carefully written so that the laboratory
        activities can be omitted without loss of continuity, we hope that most
        readers will try the laboratory approach and experience the same success
        that we have observed in our classes.
      </Typography>
    </>
  ),
  link: "https://cdn.preterhuman.net/texts/science_and_technology/artificial_intelligence/Formal%20Syntax%20and%20Semantics%20of%20Programming%20Languages%20-%20Kenneth%20Slonneger.pdf",
  imageSlug:
    "/book-covers/FormalSyntaxAndSemanticsOfProgrammingLanguages-ALaboratoryBasedApproach.png",
}

export default function Homework2() {
  return (
    <>
      <CoursePage
        type="homework"
        courseName="CMSI 5850: Programming Language Foundations"
        courseNumber={5850}
      >
        <CourseBox>
          <TitleBox title="HW2: Syntax R Us" />
          <DueDateCalendar dueDate={DateTime.local(2025, 3, 21, 23, 59)} />
          <TopicBox
            topics={["Generative/Analytic Grammars", "Syntax", "Context"]}
          />
          <Speak>With this assignment you will demonstrate:</Speak>
          <Speak>
            An understanding of formal language theory and its importance within
            computer science. The ability to write grammars for both simple
            formal languages and for simple programming languages. The ability
            to write abstract syntax specifications. The ability to construct
            abstract syntax trees.
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
            <LinkButton color="primary" to="/cmsi-5850/language-theory">
              Language Theory
            </LinkButton>
            <LinkButton color="primary" to="/cmsi-5850/syntax">
              Syntax
            </LinkButton>
            <LinkButton color="primary" to="/cmsi-5850/semantics">
              Semantics
            </LinkButton>
          </QuestionBox>
          <QuestionBox qid={"R2"}>
            Here is another textbook to check out! Its about formally defining
            the complicated mathematics that underpins the legitimacy of
            Denotational Semantic techniques. However, you should read the
            Introduction and Chapter 1 as they contain good information about
            Abstract Syntax for our ASTs.
            <LinkButton
              color="success"
              to="https://people.cs.ksu.edu/~schmidt/text/ds0122.pdf"
            >
              Denotational Semantics: A Methodology for Language Development
            </LinkButton>
          </QuestionBox>
          <QuestionBox qid={"R3"}>
            Read our course textbook's Chapter 1 as it contains a full featured
            look at Grammars and Abstract Syntax. (Linked here for Convenience)
            <BookCard {...textbook} />
          </QuestionBox>
          <QuestionBox qid={"W1"}>
            Watch the videos in the course notes pages linked above! Some cover
            our topic directly and others give you a broader understanding of
            the topic!
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
          <QuestionBox points={"20 total"} qid="Q1">
            Give{" "}
            <Vocab
              definition={
                <Speak>
                  Remember that we use two different forms of Grammars! When we
                  use a Generative one, we set up substitution rules that can be
                  applied infinitely one after another and are applied in a
                  nondeterministic manner. Look at the notes regarding Language
                  Definition by Generation for a refresher!
                </Speak>
              }
            >
              generative grammars
            </Vocab>{" "}
            for the following mini-languages:
            <QuestionBox points={4} qid={"Q1 a"}>
              Odd-length Palindromes of strings made from Unicode letters only
              (You may assume the existence of a rule named "unicode" for the
              letters)
            </QuestionBox>
            <QuestionBox points={4} qid={"Q1 b"}>
              <MathJax>{`All strings over the alphabet \\(\\{a,b,c,d,e\\}\\) where
               the symbols are in decreasing alphabetic order`}</MathJax>
            </QuestionBox>
            <QuestionBox points={4} qid={"Q1 c"}>
              <MathJax>{`$$
            \\{ 0^i1^j2^k \\mid i=j \\vee j=k \\}
            $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={4} qid={"Q1 d"}>
              <MathJax>{`$$
            \\{ w \\in \\{0,1\\}^* \\mid w \\textrm{ does not contain the substring 000} \\}
            $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={4} qid={"Q1 e"}>
              <MathJax>{`$$
            \\{ w \\in \\{a,b\\}^* \\mid w \\textrm{ has twice as many \\(a\\)'s as \\(b\\)'s} \\}
            $$`}</MathJax>
            </QuestionBox>
            <QuestionBox points={5} qid={"Q1 EXTRA CREDIT"}>
              <MathJax>{`$$
            \\{ a^nb^na^nb^n \\mid n \\geq 0 \\}
            $$`}</MathJax>
            </QuestionBox>
          </QuestionBox>
          <QuestionBox points={20} qid="Q2">
            <MathJax>{`
            Give an \\(\\textrm{analytic grammar}\\), using the notation from class, for the programming language
            described as follows. Programs are made up of a possibly empty
            sequence of function declarations, followed by a single expression.
            Each function declaration is of the form \\(f = (p_1, \\ldots, p_m) \\Rightarrow e\\) where \\(f\\) is the function name
            (an identifier), each is a parameter (also identifiers) and the
            result (the “body”) is an expression. Expressions can be numeric
            literals, string literals, identifiers, function calls, or can be
            made up of other expressions with the usual binary arithmetic
            operators (plus, minus, times, divide, remainder) and a unary prefix
            negation and a unary postfix factorial \\((!)\\). There's a conditional
            expression with the syntax \\(x ? y : z\\). Parentheses are used, as in
            most other languages, to group subexpressions. Numeric literals are
            non-empty sequences of decimal digits with an optional fractional
            part and an optional exponent part. String literals delimited with
            double quotes with the escape sequences \\', \\", \\n, \\\, and \\u{\\(hhhhhh\\)}
            where \\(hhhhhh\\) is a sequence of one-to-six hexadecimal digits. Identifiers
            are non-empty sequences of letters, decimal digits, underscores, and
            dollar signs, beginning with a letter or dollar sign. Function calls
            are formed with an identifier followed by a parenthesized,
            comma-separated list of expressions.
`}</MathJax>
          </QuestionBox>
          <QuestionBox points={20} qid="Q3">
            For the language in the previous problem, write an abstract syntax
            specification (A Tree Grammar). Use only the first of the two
            notations for tree grammars presented in the course notes on syntax.
          </QuestionBox>
          <QuestionBox points={10} qid="Q4">
            For the language in the previous problem, give an abstract syntax
            tree for the program:
            <CodeBox
              language="javascript"
              height="15vh"
              code={`gcd = (x, y) => y ? gcd(y, x % y) : x
cube = (x) => x * x * x
"The answer is" + cube(gcd(30, 4!)) + "😦😦"`}
            />
          </QuestionBox>
          <QuestionBox points={10} qid="Q5">
            For the following complete JavaScript program, draw the AST. Using
            an equivalent amount of detail as the ASTs in the notes (Remove all
            structure based symbols and only keep what is necessary to
            differentiate between nodes). You can Dr. Toal's JavaScript AST
            explorer to guide you and check your work, but remember, the drawing
            you need to produce for full credit will be far less verbose than
            the explorer's output (which is based on a third-party parser).
            <LinkButton color="primary" to="https://rtoal.github.io/js-ast/">
              Dr. Toal's JS AST Explorer
            </LinkButton>
            <CodeBox
              language="javascript"
              height="10vh"
              code={`import x from "x"
console.log(93.8 * {x} << x.r[z])`}
            />
          </QuestionBox>
          <QuestionBox points={20} qid={"Q6"}>
            For each of the following code fragments, state whether it is either
            a lexical error (meaning that tokens/lexicons can not be formed), a
            syntax error (meaning that a typical context-free-ish programming
            language grammar cannot catch the problem), a contextual error
            (detectable without running the program), a runtime error
            (detectable only at runtime, not by a compiler that will cause a
            crash or panic), or no error. All fragments refer to the Java
            language. Fragments may be simple expressions or statements; do not
            expect them to be complete programs:
            <QuestionBox points={2} qid={"Q6 a"}>
              <CodeBox
                language="java"
                height="20vh"
                code={`class Hero {
      String name;
      java.util.Date birthday;
      boolean super;
    }`}
              />
            </QuestionBox>
            <QuestionBox points={2} qid={"Q6 b"}>
              <CodeBox
                language="java"
                height="10vh"
                code={`void f(int y) {int y = 8;}`}
              />
            </QuestionBox>
            <QuestionBox points={2} qid={"Q6 c"}>
              <CodeBox
                language="java"
                height="10vh"
                code={`String \`ohana = "family";`}
              />
            </QuestionBox>
            <QuestionBox points={2} qid={"Q6 d"}>
              <CodeBox
                language="java"
                height="10vh"
                code={`Object pet = "dog";`}
              />
            </QuestionBox>
            <QuestionBox points={2} qid={"Q6 e"}>
              <CodeBox
                language="java"
                height="15vh"
                code={`String pet = "cat";
    pet[0] = 'r';`}
              />
            </QuestionBox>
            <QuestionBox points={2} qid={"Q6 f"}>
              <CodeBox
                language="java"
                height="10vh"
                code={`System.out.println(5 / 0);`}
              />
            </QuestionBox>
            <QuestionBox points={2} qid={"Q6 g"}>
              <CodeBox
                language="java"
                height="10vh"
                code={`int f(double y) {System.out.println(y)}`}
              />
            </QuestionBox>
            <QuestionBox points={2} qid={"Q6 h"}>
              <CodeBox
                language="java"
                height="10vh"
                code={`int g(double y) {}`}
              />
            </QuestionBox>
            <QuestionBox points={2} qid={"Q6 i"}>
              <CodeBox language="java" height="10vh" code={`x < y < z`} />
            </QuestionBox>
            <QuestionBox points={2} qid={"Q6 j"}>
              <CodeBox
                language="java"
                height="10vh"
                code={`void f() { f(); }`}
              />
            </QuestionBox>
          </QuestionBox>
          <Speak>
            Phew! I'm pretty sure the last time I learned about spelling and
            sentence rules for languages is was much easier than all this! On
            the bright side, practicing these tools has given us an invaluable
            skill set! We can now formally define the lexical and phrase
            patterns of languages! Not so sure about that claim yet? Don't worry
            there will be more practice!
          </Speak>
          <Speak>
            Below is a link to the Brightspace assignment for turning in your
            HW!
          </Speak>
          <LinkButton
            color="success"
            to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=323986&grpid=0&isprv=0&bp=0&ou=267867"
          >
            Written HW2 Turn In
          </LinkButton>
        </CourseBox>
        {/*}
        <CourseBox>
          <TitleBox
            title="Optional Section For Theory, Logic, and Math"
            quote="Points: 20"
          />
          <Speak>
            In this optional section you will be working on a small beginner
            Rust project of your choosing! After looking around for some fun
            project ideas, I found this great article from ZTM.io's Jayson
            Lennon!
          </Speak>
          <LinkButton
            color="success"
            to="https://zerotomastery.io/blog/rust-practice-projects/"
          >
            Jayson Lennon's Rust Practice Projects
          </LinkButton>
          <Speak>
            Whilst the intermediate and advanced projects are certainly "out of
            our league" at the moment, the beginner projects Jayson lays out are
            insightful, simple, and fun!
          </Speak>
          <Speak>
            For this optional I want you to read that article and pick one of
            the beginner projects that Jayson recommends! Complete the basic
            implementation of the project and then provide at least 5 to 10 unit
            tests that display your implementations working as expected.
          </Speak>
          <Speak>
            I have made an empty Github assignment for you to pull and create
            your Rust project from scratch (This is out of convenience so that I
            can use Github classroom to collate all your projects rather than go
            through being added to all the repos). Feel free to architect your
            project as you choose, however at a minimum you must have at least 5
            unit tests that are run and pass with the cargo test command.
          </Speak>
          <Speak>
            Additionally, provide a brief README.md file that explains what
            project you chose and how to interact with it. If you are doing
            anything "non-standard" that is Ok, just document that in the
            README.md.
          </Speak>
          <Speak>
            Since the repository is private, feel free after you are done to
            copy it over into a public repository to show off on your Github!
          </Speak>
          <Speak>
            Earning points in this optional is not as rigid since you may pick
            your own project. With that said, to earn full points you must fully
            implement one of the beginner projects as stated by Jayson, have a
            README.md, and have at a minimum 5 unit tests pass with the cargo
            test command. You do not have to do any of the add-ons or extensions
            that Jayson recommends.
          </Speak>
          <Speak>
            As an example, if you did the beginner project about remaking core
            terminal utilities than I would expect to be able to run your
            version of echo, cat, ls, find, and grep, that I could figure out
            where to start by looking at your project README (Your commands
            don't need to be terminal integrated or anything, but there
            functionality should be intact through whatever medium you choose),
            and that I could clone the repository to run cargo test and see at
            least 5 passes (In this case one for each command).
          </Speak>
          <Speak>
            Below are buttons that link to the Brightspace turn in and the empty
            Github assignment repository to pull and work in respectively.
          </Speak>
          <LinkButton
            color="success"
            to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=328348&grpid=0&isprv=0&bp=0&ou=267829"
          >
            Optional HW1 Turn in
          </LinkButton>
          <LinkButton
            color="success"
            to="https://classroom.github.com/a/CS11VMb4"
          >
            Github Optional Assignment
          </LinkButton>
        </CourseBox>
        */}
      </CoursePage>
    </>
  )
}
