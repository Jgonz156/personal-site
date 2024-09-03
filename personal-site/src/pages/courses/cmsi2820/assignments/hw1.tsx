import { DateTime } from "luxon";
import CourseBox from "../../components/course-box";
import CoursePage from "../../components/course-page";
import DirectoryTree from "../../components/directory-tree";
import DueDateCalendar from "../../components/due-date-calendar";
import ImageBox from "../../components/image-box";
import LinkButton from "../../components/link-button";
import QuestionBox from "../../components/question-box";
import Speak from "../../components/speak";
import TitleBox from "../../components/title-box";
import TopicBox from "../../components/topic-box";
import Vocab from "../../components/vocab";
import TopicBreak from "../../components/topic-break";
import { MathJax } from "better-react-mathjax";

export default function Homework1() {
  return (
    <CoursePage type="homework">
      <CourseBox>
        <TitleBox title="HW1: Think Class! Think!" />
        <DueDateCalendar dueDate={DateTime.local(2024, 9, 8, 23, 59)} />
        <TopicBox
          topics={[
            "Intuitionistic Logic",
            "Propositional Logic",
            "First Order Logic",
            "Natural Deduction",
            "Higher Order Logic",
          ]}
        />
        <Speak>
          This homework assignment is about learning to think like a logician!
          Logic is built up in steps, but luckily we did the heavy lifting in
          lecture! Here we will practice the creation, evaluation, combination,
          and operationalization of propositional statements! That's a mouth
          full! As well as that we will see how First Order logic combines with
          propositional logic to give us more power to evaluate statements! We
          will then practice making inferences by using natural deduction to
          build new facts to work with! Once we can make factual statements and
          reason more facts from them, we will see one more addition to help
          give us the ability to speak more specifically about objects and their
          relationships!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Written Section" quote="Points: 70" />
        <Speak>
          We saw in LN1 that logic is a wide and varied field with many
          interpretations. Here we will keep things simple with our mental model
          of what exists in reality and what might be considered absurd. We will
          practice first by moving away from the "informal" model of
          intuitionistic logic that uses our world an current knowledge as the
          context by which to evaluate statements. Instead we will stay more
          "formal" and I will be giving you a context to work with!
        </Speak>
        <Speak>
          When it comes to evaluating these contexts DO NOT place more into them
          than what is already there. We can only do that via the process of
          Inference with Natural Deduction (There are actually many more ways to
          do it, but that is what we are focusing on in this class)! We will
          practice that further "down the page" so lets begin simply and build
          up!
        </Speak>
        <Speak>
          I will give an example of what we are looking to do. Here is the
          context for just my example: "Haley is friends with a lot of people!
          Haley does not like pancakes made upside down." A context is made up
          of declarative statements we accept as fact. Sometimes its{" "}
          <Vocab
            definition={
              <>
                <Speak>Declarative statements that evaluate to True</Speak>
                <MathJax>{`$$T:True$$`}</MathJax>
              </>
            }
          >
            Positive Information
          </Vocab>{" "}
          like the first sentence or its{" "}
          <Vocab
            definition={
              <>
                <Speak>Declarative statements that evaluate to False</Speak>
                <MathJax>{`$$F:False$$`}</MathJax>
              </>
            }
          >
            Negative information
          </Vocab>{" "}
          like the second sentence. We have 2 facts and that is ALL we can work
          with to evaluate propositions. So lets formalize our above context
          like the below:
        </Speak>
        <MathJax>{`$$ \\top:Reality=
        \\begin{cases}
        \\text{Haley is friends with everyone},  & \\text{+ Fact 1} \\\\
        \\text{Haley does not like pancakes made upside down},  & \\text{$-$ Fact 2}
        \\end{cases}
        $$`}</MathJax>
        <Speak>
          I'm not entirely sure how to make a pancake upside down, but none the
          less it is a fact Haley doesn't like them that way. So if we were to
          be asked to, in this context, evaluate the following statement: "Rory
          is friends with Haley" then we know the statement is True. Simple
          enough. What about this one: "Haley likes her pancakes made right side
          up." True right? Actually no! That is Classical reasoning! We can't
          just assume the opposite when we know the negative in Intuitionism
          (This is why its very important that we mark our facts/information as
          plus and minus)! What if she doesn't like them right side up either
          because she does not like pancakes at all? We must take care to only
          use the information we have. So the previous statement is what then?
          Well we have no information to answer it "in Reality" so its absurd!
          In our limited reality we have no facts related to that statement so
          it is analogous to declaring something that doesn't exist! So, in the
          following homework make sure not to make this mistake!
        </Speak>

        <QuestionBox points={"10 total"} qid="Q1">
          <MathJax
            inline
          >{`Given the following context in informal english, write out the
        formalized version of reality (\\(\\top\\)), as shown above, then evaluate the
        following propositions in that context as only one of the following, \\(T:True,\\text{ } F:False,\\text{ or }\\bot :Absurd\\), and explain your reasoning`}</MathJax>
          <QuestionBox points={4} qid="Q1 a">
            Formalize the following reality: "There are three friends named Joy,
            John, and Juan. They call themselves 'The Three Jamigos'. Joy's
            favorite drinks are juices. Juan's favorite foods are jambalaya,
            jack fruit, and jalapeños. John does not like when words that start
            with 'J" are spelt wrong'."
          </QuestionBox>
          <QuestionBox points={1} qid="Q1 b">
            Evaluate: "Jared is allowed to join 'The Three Jamigos' because his
            name starts with 'J'." (subsequently forming 'The Four Jampadres')
          </QuestionBox>
          <QuestionBox points={1} qid="Q1 c">
            Evaluate: "Joy and Juan like to drink jack fruit juice."
          </QuestionBox>
          <QuestionBox points={1} qid="Q1 d">
            Evaluate: "John enjoys jambalaya."
          </QuestionBox>
          <QuestionBox points={1} qid="Q1 e">
            Evaluate: "There are only 2 friends."
          </QuestionBox>
          <QuestionBox points={1} qid="Q1 f">
            Evaluate: "John likes when a word that starts with 'J' is spelt
            right."
          </QuestionBox>
        </QuestionBox>

        <QuestionBox points={5} qid="Q2">
          As we saw in lecture the phrase, "I am something unknowable" provided
          a real challenge for evaluation. Restate and explain the issues
          evaluating this statement as True or False and then provide an
          explanation as to why we need absurdity in our logical system.
        </QuestionBox>
        <QuestionBox points={5} qid="Q3">
          The mental image we made in lecture is valuable as it helps us
          organize graphically what is occurring in reality. Redraw a different
          version of the same visual model with the following requirements:
          <MathJax>{`$$\\begin{matrix}
          \\text{1. Three Unique "Things"} \\\\
          \\text{2. Two "Properties" on each of those "Things"} \\\\
          \\text{3. One "Interaction" between each of those "Things"} \\\\
          \\text{4. The visual model clearly divides reality from absurdity} \\\\
          \\text{5. The visual model does not include previously discussed "Things"} \\\\

          \\end{matrix}$$`}</MathJax>
        </QuestionBox>

        <TopicBreak title="END OF LN1" />
        <Speak>
          In LN2 we "zoomed" in on these informal propositions we've been
          working on to discover the atomics we are actually working with when
          we informally reason about logic in the real world. This discussion
          begun with defining a few terms, discovering the intuition behind
          where they come from, and ten subsequently formalizing a small set of
          operators to use to create compound propositions.
        </Speak>
        <Speak>
          Here we will work with these reduced, yet more complicated
          propositions as variables rather than informal sentences as we
          discovered in lecture that english carries with it far more
          information than we can currently investigate.
        </Speak>
        <QuestionBox points={10} qid="Q4"></QuestionBox>
        <QuestionBox points={10} qid="Q5"></QuestionBox>
        <QuestionBox points={10} qid="Q6"></QuestionBox>
        <QuestionBox points={10} qid="Q7"></QuestionBox>
        <TopicBreak title="END OF LN2" />
        <Speak>
          In LN3 we built off our new set of operators we were using to
          "evaluate" compound propositions to discover and investigate the
          Inferential/Argumentative abilities that extend from them using
          Natural Deduction. Here we practice Natural Deduction to introduce a
          series of new pieces of information to our limited, finite
          contexts/realities.
        </Speak>
        <QuestionBox points={10} qid="Q8">
          <QuestionBox qid="Q1a"></QuestionBox>
        </QuestionBox>
        <TopicBreak title="END OF LN3" />
        <LinkButton color="success" to="">
          Written HW0 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 30" />
        <DirectoryTree filesAsJSON={{}} />

        <LinkButton color="success" to="">
          GitHub Assignment
        </LinkButton>
        <LinkButton color="success" to="">
          Programming HW0 Turn In
        </LinkButton>
      </CourseBox>
    </CoursePage>
  );
}
