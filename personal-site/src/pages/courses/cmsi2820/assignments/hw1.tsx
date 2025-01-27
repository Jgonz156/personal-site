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
import Vocab from "../../components/vocab"
import TopicBreak from "../../components/topic-break"
import { MathJax } from "better-react-mathjax"
import ImageBox from "../../components/image-box"

export default function Homework1() {
  return (
    <CoursePage
      type="homework"
      courseName="CMSI 2820: Discrete Mathematics for CS"
      courseNumber={2820}
    >
      <CourseBox>
        <TitleBox title="HW1: Think Class! Think!" />
        <DueDateCalendar dueDate={DateTime.local(2025, 2, 7, 23, 59)} />
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
        <TitleBox title="Written Section" quote="Points: 75" />
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
                <Speak>
                  Declarative statements that tell you how reality is
                </Speak>
              </>
            }
          >
            Positive Information
          </Vocab>{" "}
          like the first sentence or its{" "}
          <Vocab
            definition={
              <>
                <Speak>
                  Declarative statements that tell you how reality isn't
                </Speak>
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
        \\text{Haley is friends with a lot of people!},  & \\text{+ Fact 1} \\\\
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
        {/* 
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
          <QuestionBox points={1} qid="Q1 g">
            Evaluate: "John does not like the word 'jalapenos'" (Note the n)
          </QuestionBox>
        </QuestionBox>
*/}
        <QuestionBox points={"10 total"} qid="Q1">
          <MathJax inline>
            {`Given the following Image, based on the popular Children's Book Series I Spy
            , evaluate the following propositions. The reality that we are working with is
             the image below, nothing more and nothing less.
            Evaluate the propositions in that context as only one of the following,
             \\(T:True,\\text{ } F:False,\\text{ or }\\bot :Absurd\\), and explain your reasoning`}
          </MathJax>
          <ImageBox
            images={[{ url: "/cmsi-2820/HW1-ISPY.png", caption: "" }]}
          />
          <QuestionBox points={1} qid="Q1 a">
            Evaluate: "There are exactly 2 Nutcrackers."
          </QuestionBox>
          <QuestionBox points={1} qid="Q1 b">
            Evaluate: "In between 2 oranges there is a christmas tree."
          </QuestionBox>
          <QuestionBox points={1} qid="Q1 c">
            Evaluate: "There are 4 planes."
          </QuestionBox>
          <QuestionBox points={1} qid="Q1 d">
            Evaluate: "There is a hairbrush." (Careful)
          </QuestionBox>
          <QuestionBox points={2} qid="Q1 e">
            Evaluate: "There is a red coin with a Snow Man on it."
          </QuestionBox>
          <QuestionBox points={2} qid="Q1 f">
            Evaluate: "There is no such thing as a pine cone."
          </QuestionBox>
          <QuestionBox points={2} qid="Q1 g">
            Evaluate: "There is a little Santa."
          </QuestionBox>
        </QuestionBox>
        {/**
        <QuestionBox points={5} qid="Q2">
          As we saw in lecture the phrase, "I am something unknowable" provided
          a real challenge for evaluation. Restate and explain the issues
          evaluating this statement as True or False and then provide an
          explanation as to why we need absurdity in our logical system.
        </QuestionBox>
         */}
        <QuestionBox points={5} qid="Q2">
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
          where they come from, and then subsequently formalizing a small set of
          operators to use to create compound propositions.
        </Speak>
        <Speak>
          Here we will work with these reduced, yet more complicated
          propositions as variables rather than informal sentences as we
          discovered in lecture that english carries with it far more
          information than we can currently investigate.
        </Speak>
        <Speak>
          Due to LN2 not reaching Implication in the notes, this section has
          been adjusted to reflect this and those problems have been moved to
          LN3's section.
        </Speak>
        <QuestionBox points={"10 total"} qid="Q3">
          In class we saw 5 logical connectives that we can use to form larger
          compound propositions. In your own words, give a brief explanation as
          to how each of these logical connectives operate and give an example
          usage for each.
          <QuestionBox points={2} qid={"Q3 a"}>
            Describe and give an example of Logical Equivalence. (Make sure to
            specify some reality)
          </QuestionBox>
          <QuestionBox points={2} qid={"Q3 b"}>
            Describe and give an example of Negation.
          </QuestionBox>
          <QuestionBox points={2} qid={"Q3 c"}>
            Describe and give an example of Conjunction.
          </QuestionBox>
          <QuestionBox points={2} qid={"Q3 d"}>
            Describe and give an example of Disjunction.
          </QuestionBox>
          <QuestionBox points={2} qid={"Q3 d"}>
            Describe and give an example of Implication.
          </QuestionBox>
        </QuestionBox>
        <QuestionBox points={"12 total"} qid="Q4">
          <MathJax>{`Given the following finite context below, evaluate whether the
          following compound propositions are True, False, or Absurd. Since we
          have not defined the exact order of operations (PEMDAS) I will define it now.
          The operator that has the highest precedence (do this one first) is Negation.
           It is followed by the rest of the operators in exactly this order Conjunction,
            Disjunction, Implication, then the lowest precedence operator is Logical
             Equivalence. This forms PNCDILe as our equivalent to PEMDAS. Admittedly it 
             is not as nice and that hanging e is due to it being Logical "E"quivalence.
              Also the P is the front is still Parenthesis because you always due parenthesis first.
          $$ \\top:Reality =\\begin{cases}
          A:True \\\\
          B:False 
          \\end{cases}$$`}</MathJax>
          <QuestionBox points={1} qid={"Q4 a"}>
            <MathJax>{`$$A\\land \\bot$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={1} qid={"Q4 b"}>
            <MathJax>{`$$B\\lor \\bot$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={1} qid={"Q4 c"}>
            <MathJax>{`$$(B \\lor A) \\land B$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={1} qid={"Q4 d"}>
            <MathJax>{`$$\\neg(A \\land B)$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={1} qid={"Q4 e"}>
            <MathJax>{`$$(A \\lor \\bot) \\lor B$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={1} qid={"Q4 f"}>
            <MathJax>{`$$\\neg(A \\lor B) \\equiv (\\neg A \\land \\neg B)$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={2} qid={"Q4 g"}>
            <MathJax>{`$$\\bot\\equiv \\bot$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={2} qid={"Q4 h"}>
            <MathJax>{`$$\\neg \\bot$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={2} qid={"Q4 i"}>
            <MathJax>{`$$((A \\lor B) \\land A) \\equiv ((A \\land B) \\lor B)$$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <QuestionBox points={5} qid={"Q5"}>
          Interestingly, logical connectives can be used to explain properties
          of one another. We saw that in class we could use logical equivalence
          to help define the operation of other operators and that negation
          allowed us to "flip" from True to False. With that said, Can you write
          the compound propositions that displays that Conjunction and
          Disjunction are duals (Opposites)? (It helps to investigate this with
          a truth table)
        </QuestionBox>
        <TopicBreak title="END OF LN2" />
        <Speak>
          In LN3 we built off our new set of operators we were using to
          "evaluate" compound propositions to discover and investigate the
          Inferential/Argumentative abilities that extend from them using
          Natural Deduction. Here we practice Natural Deduction to introduce a
          series of new pieces of information to our limited, finite
          contexts/realities.
        </Speak>
        <QuestionBox points={"5 total"} qid="Q6">
          As we saw in lecture, propositions can declare affirmative (positive)
          information about reality or non-affirmative (negative) information
          about reality. In the following question you will be asked about this
          distinction.
          <QuestionBox points={2} qid="Q6 a">
            Explain what positive information is in your own words and give an
            example of its use.
          </QuestionBox>
          <QuestionBox points={3} qid="Q6 b">
            Explain what Negative information is in your own words and give an
            example of its use.
          </QuestionBox>
        </QuestionBox>
        <QuestionBox points={"10 total"} qid="Q7">
          In class we saw that logical connectives act as "information glue" and
          can connect pre-existing propositions together to form larger ones.
          Below you are given a list of propositional variables assigned to
          propositions and you are tasked with combining them together using a
          given compound proposition as a blueprint. Give the resulting compound
          proposition as an English statement for your answer. (Don't worry if
          the resulting propositions are true, false, or absurd as some of them
          say very funny things!)
          <MathJax>{`$$\\begin{matrix}
          A \\equiv \\text{"It is a nice day today."} \\\\
          B \\equiv \\text{"There is no way today is Friday."} \\\\
          C \\equiv \\text{"I like the cold."} \\\\
          D \\equiv \\text{"Housing prices are low."} \\\\
          E \\equiv \\text{"Homework is due."} \\\\
          F \\equiv \\text{"It is not winter."} \\\\
          G \\equiv \\text{"It is summer."} \\\\
          \\end{matrix}$$`}</MathJax>
          <QuestionBox points={2} qid="Q7 a">
            <MathJax>{`$$
            D \\to C
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={2} qid="Q7 b">
            <MathJax>{`$$
            A \\to (B \\land D)
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={2} qid="Q7 c">
            <MathJax>{`$$
            G \\equiv \\neg F
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={2} qid="Q7 d">
            <MathJax>{`$$
            E \\equiv \\neg B
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={2} qid="Q7 e">
            <MathJax>{`$$
            (A \\land B) \\equiv (\\neg E \\land G)
            $$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <QuestionBox points={"15 total"} qid="Q8">
          In class we spoke at length about the philosophy surrounding the
          creation and use of logic systems. In the following question you will
          be asked to comment on why specific design decisions for
          Intuitionistic logic were made.
          <QuestionBox points={5} qid="Q8 a">
            Why is it beneficial for Intuitionistic logic to recognize the
            "limited Knowledge" of individuals and what is the atypical
            foundational atomic that we gain as a result?
          </QuestionBox>
          <QuestionBox points={5} qid="Q8 b">
            Why is it beneficial for Intuitionistic logic to distinguish between
            positive and negative information?
          </QuestionBox>
          <QuestionBox points={5} qid="Q8 c">
            Explain what is meant by referring to Classical Logic as the "Logic
            of God" and Intuitionistic Logic as the "Logic of People"
          </QuestionBox>
        </QuestionBox>
        <QuestionBox points={3} qid="Q9">
          Given that realities allow us to contextualize our reasoning and that
          everyone has a different one associated with their own experiences,
          give an example of a reality that you have and how it might differ
          from someone else's by showing how it would change a proposition from
          True to False or vice versa in the respective realities.
        </QuestionBox>
        {/** 
        <QuestionBox points={"28 total"} qid="Q8">
          As we saw in class, Natural Deduction's inference rules give us the
          ability to produce new information into our finite contexts. The
          following deductions below can be made and you should produce your
          answer in the form of a derivation tree. You may stop once you have
          reached the goal condition at the bottom of the derivation tree having
          started with the assumptions in the following deductions at the top of
          the tree:
          <QuestionBox points={8} qid="Q8 a">
            <MathJax>{`$$\\text{Show that }(A \\land B) \\land (B \\land A) \\text{ can be deduced from just assuming A and B}$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={6} qid="Q8 b">
            <MathJax>{`$$\\text{Show that }(A \\lor B) \\lor C \\text{ can be deduced from just assuming A}$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={6} qid="Q8 c">
            <MathJax>{`$$\\text{Show that to deduce } A \\to (B \\to C) \\text{ you must assume and discharge A and B}$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={4} qid="Q8 d">
            <MathJax>{`$$\\text{Show that }(A \\to C) \\text{ can be deduced from } (A \\to B) \\land (B \\to C)$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={"0"} qid="Q8 e">
            <MathJax>{`$$\\text{Show that assuming }(A \\land (A \\to B)) \\land \\neg B \\text{ leads to a contradiction/absurdity}$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={4} qid="Q8 f">
            <MathJax>{`$$\\text{Show that given } (A \\lor B) \\to C \\text{ you can deduce } (A \\to C)\\land(B \\to C)$$`}</MathJax>
          </QuestionBox>
          <QuestionBox points={"0"} qid="Q8 g">
            <MathJax>{`$$\\text{Show that given } \\neg(A \\land B) \\text{ you can deduce } (\\neg A \\lor \\neg B)$$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        */}
        <TopicBreak title="END OF LN3" />
        <Speak>
          Whew! That was a lot about logic, and unfortunately for the purposes
          of this foundational course we will take intuitionistic logic no
          further. Of course the topics we practiced and the intuition we
          gathered from our investigations will become useful again as we
          discover more topics in discrete mathematics, however we will not be
          expanding further into pure logic.
        </Speak>
        <Speak>
          There is a wide range of more logical connectives we could have
          discovered and understood. This foundational look at viewing how to
          evaluate and infer information from new operators will always be valid
          if you choose to dive into this topic further on your in in an
          independent study or research! There is plenty more to discover in
          discrete however so we move forward from here ready to take on
          Numbers!
        </Speak>
        <LinkButton
          color="success"
          to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=319885&grpid=0&isprv=0&bp=0&ou=267815"
        >
          Written HW1 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 25" />
        <DirectoryTree
          filesAsJSON={{
            "CMSI-2820-HW1": {
              ".gitignore": <></>,
              "logical_connectives.py": <></>,
              "logical_connectives_test.py": <></>,
              "lllof.py": <></>,
              "README.md": <></>,
            },
          }}
        />
        <Speak>
          In this programming assignment you will look into how we can represent
          our logical connectives programmatically in Python! The motivation for
          this is to investigate how we can operationalize what we discovered in
          class into code! Once we see how this is done, we will always have it
          in the back of our "tool belt" for handling complex conditionals or
          branching code!
        </Speak>
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
        <LinkButton
          color="success"
          to="https://classroom.github.com/a/rYvKRVOv"
        >
          GitHub Assignment
        </LinkButton>
        <LinkButton
          color="success"
          to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=319886&grpid=0&isprv=0&bp=0&ou=267815"
        >
          Programming HW1 Turn In
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
