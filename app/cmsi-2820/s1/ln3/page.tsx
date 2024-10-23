import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import PhilosophyBreak from "@/components/course/philosophy-break"

export default function LectureNotes3() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN2",
          buttonColor: "primary",
          buttonName: "Making Logical Connections",
          buttonSlug: "/cmsi-2820/ln2",
        },
        middle: {
          lectureId: "HW1",
          buttonColor: "success",
          buttonName: "Think Class, Think!",
          buttonSlug: "/cmsi-2820/hw1",
        },
      }}
    >
      <CourseBox>
        <TitleBox
          title="Assumptions Make an Argument out of You and Me"
          quote={`"Rational discussion is useful only when there is a significant base of shared assumptions" - Noam Chomsky`}
        />
        <Speak>
          At the end of LN2 we began to build a new intuition around how we can
          use our operators not just to evaluate propositions, but to validly
          introduce new ones into our finite contexts.
        </Speak>
        <Speak>
          By paying extra special attention to how Conjunction operated we found
          that we could always build these additional propositions without
          "adding brand new" information into the system. Rather the operator
          gave us the ability to explain underlying relationships we had yet to
          discover.
        </Speak>
        <PhilosophyBreak
          qa={[
            {
              question:
                "If we are just discovering what is already there rather than making something new, are we really ever able to expand our finite realities?",
              answer: `This is a really great question as is begins to harken to the argument 
              of mathematics as something we purely contracted or if it already preexisted and 
              we are just discovering it all. It turns out, especially for our purposes there 
              is functionally no difference between these two interpretations because we would 
              need God-like information in order to say if it was so. So the answer here is that
              this process of inference is either revealing to us, incrementally, everything 
              there is to know and it is all there already waiting to be discovered. Or you can
              interpret this as our ability to generate new ways to articulate ideas in which the
              only real limit is how long you spend making new constructions.`,
            },
          ]}
        />
        <Speak>
          If we are just "unearthing" information that was already there, when
          did we suddenly gain the ability to "dig it up"? This seems to have
          occurred the moment we defined our logical connectives and how they
          alter the evaluation of compound propositions. Within those patterns
          we gain the ability to seemingly unearth hidden relationships that
          only are discovered when we use our logical connectives.
        </Speak>
        <Speak>
          This is an amazing discovery as it means we can develop a complete
          process for expanding our finite knowledge bases. All we seemingly
          have to do it create new logical connectives with unique rules and
          effects and observe their outcomes in terms of our propositions. With
          this, we can find the unique situations they model and we can give
          names to them and use them in artificial systems to recreate their
          desired effects!
        </Speak>
        <Speak>
          With this discovery in place, does this set up the foundation for
          being able to preform our same investigation but with our other
          logical connectives? Why don't we give it a shot and find out!
        </Speak>
        <Speak>
          Using the simple finite context from before (Shown below), lets see if
          we can do the same thing we did with conjunction with disjunction
          instead! We learned last time that due to being duals they are
          necessarily related closely, so maybe we could even use the same
          process from before!
        </Speak>
        <MathJax>{`$$\\top:Reality=
        \\begin{cases}
        A \\\\
        B \\\\
        \\end{cases}$$`}</MathJax>

        <Speak>
          Before we recognize that it was safe to add A and B conjuncted
          together because their existence ensured that no matter what
          evaluation they took on, the simple fact they existed combined with
          the fact conjunction is defined on all possible evaluations, we would
          never be in a situation where the conjunction would never be
          un-evaluable.
        </Speak>
        <Speak>
          So ideally all we have to do is construct compound propositions that
          will always be evaluable under the rules of disjunction. Lets start
          with the same proposition as before with conjunction but we'll replace
          the conjunctor with a disjunctor instead.
        </Speak>
        <MathJax>{`$$\\top:Reality=
        \\begin{cases}
        A \\\\
        B \\\\
        A \\lor B \\\\
        \\end{cases}$$`}</MathJax>
        <Speak>
          Is this statement always evaluable? It seems so! No matter what A and
          B are we can still evaluate the proposition!
        </Speak>
        <Speak>
          We've seemingly hit a dead-end however. Are we stuck simply only being
          able to add compound propositions with just the base items of our
          finite world? To be honest, I can't say one way or another about that
          question as we can't even answer it about our own. Are we inventing
          new things into existence every time we make creative works such as
          movies, books, tv shows, and music? Or are we simply putting together
          pre-existing pieces we've always had, but have never seen in that
          specific order.
        </Speak>
        <Speak>
          For our purposes with our small finite contexts, we could make
          multiple arguments. Argument one is that we are the "god" of these
          finite contexts. We are literally making them up after all. If we say
          thats all there is to work with, then maybe thats really all there is,
          because we as "gods" ordained it to be this way. Or could we form a
          second argument? That since we are this finite worlds creator we could
          define ways to bring in new information. We could make rules that
          allows us to conjure new things, simply by nature of having the
          ability to describe them within our system.
        </Speak>
        <Speak>
          Is there truly any difference between argument one's complete creation
          of the finite context all at once versus argument two's incremental
          creation? Any incrementally built finite expanding system could be
          simply suddenly created under argument one assuming we chose to stop
          at a particular point.
        </Speak>
        <Speak>
          With this being said, for the sake of this last discussion of logic we
          will choose argument two as it certainly very difficult to write out
          all the infinite possible compound propositions into our reality
          before we can begin working with it. There wouldn't be anything to
          investigate if we had that omnipotent access to the information in our
          reality in the first place right?
        </Speak>
        <Speak>
          With this moving forward we must always include all the logical
          connectives we want to live in the finite realities so that we can
          justify them acting on things within the system, however it is nice to
          know we can always build new ones and build more in the future. So
          lets take a look at all the reality we can build so far.
        </Speak>
        <MathJax>{`$$\\top:Reality=
        \\begin{cases}
        A, B, C, D, ... : \\text{Propositional Variables} \\\\
        \\equiv,\\neg,\\land,\\lor,\\to: \\text{Logical Connectives} \\\\
        \\end{cases}$$`}</MathJax>
        <Speak>
          With our view of reality sorted, we can now formally investigate a
          mechanism for organizing the discovery of all those seemingly infinite
          compound propositions.
        </Speak>
        <Speak>
          The process we will look it is called Natural Deduction and it is very
          straight forward! Some might even say "Natural". It definitely is in
          concept, but lets see how that "pans out" in practice.
        </Speak>
        <Speak>
          We begin by defining introduction rules for our logical connectives
          based on how they operate during evaluation. They are juxtaposed by
          their following elimination rules as well. We use the introduction
          rules to help build brand new, deductively valid, propositions into
          our system. However, what's cool about these new propositions being
          deductively valid is that the new propositions also retroactively can
          be used to discover even more new information! We do this by
          deconstructing these new propositions with previously existing
          information to create more atomic pieces to work with! This is done
          with the elimination rules!
        </Speak>
        <Speak>
          This process is inherently iterative and it builds on previous
          information, so the visual structure created to help organize and
          operate these Introduction and Elimination rules are called derivation
          trees and they act as a complete history at each step of an
          Argument/Inference!
        </Speak>
        <Speak>
          The Derivation Trees are built directly by defining our Introduction
          and Elimination rules like "lego" bricks that visually fit together.
          Below is their general shape:
        </Speak>
        <MathJax>{`$$\\begin{prooftree}
      \\AxiomC{Justification}
      \\RightLabel{(~ R)}
      \\UnaryInfC{Application}
      \\end{prooftree}$$`}</MathJax>
        <Speak>
          The Justification portion of this large "fraction" is what allows us
          to build the logical connective up in the lower portion which I have
          called Application. The side parenthesis are used to denote what
          logical connective is being used (~ is a place holder) and wether it
          is an introduction or elimination rule. Typically we will state which
          one is used with I for introduction and E for elimination and they
          would take the place of the R in the above rule.
        </Speak>
        <Speak>
          The investigation we did early was less orgainzed but was essentially
          preforming the same act, justify the exist of the compound proposition
          and then add it to the system. That would look like the following in
          Natural Deduction:
        </Speak>
        <MathJax>{`$$\\begin{prooftree}
      \\AxiomC{A}
      \\AxiomC{B}
      \\RightLabel{(\\(\\land\\) I)}
      \\BinaryInfC{A \\(\\land\\) B}
      \\end{prooftree}$$`}</MathJax>
        <Speak>
          Something very cool here is that we can keep building up and up
          assuming we have more propositions! We can just keep building up in
          this pattern!
        </Speak>
        <MathJax>{`$$\\begin{prooftree}
      \\AxiomC{A}
      \\AxiomC{B}
      \\RightLabel{(\\(\\land\\) I)}
      \\BinaryInfC{A \\(\\land\\) B}
      \\AxiomC{C}
      \\RightLabel{(\\(\\land\\) I)}
      \\BinaryInfC{A \\(\\land\\) B \\(\\land\\) C}
      \\AxiomC{D}
      \\RightLabel{(\\(\\land\\) I)}
      \\BinaryInfC{A \\(\\land\\) B \\(\\land\\) C \\(\\land\\) D}
      \\end{prooftree}$$`}</MathJax>
        <Speak>
          We've done a lot of investigation to self-discover the origins of
          logic, but today we will depart from this and just take a look at
          everything we are going to be working with. Below we will see all the
          introduction and elimination rules for our logical operators and use
          these rules to discover cool and interesting deductions!
        </Speak>
        <MathJax>{`$$\\text{Assumption Rule }\\equiv \\begin{cases}\\begin{prooftree}

      \\AxiomC{}
      \\UnaryInfC{A}

      \\end{prooftree}\\end{cases}$$`}</MathJax>
        <Speak>
          Before we move into all these new and interesting deductions, we
          should explain how we are even able to begin this iterative process.
          We use this assumption rule. To be clear this is unique in definition
          due to it seemingly saying we can conjure things out of thin air.
        </Speak>
        <Speak>
          To begin an inference we need to have "givens" or general assumptions
          as to ideas we believe are stable and create the underlying foundation
          for the upcoming deductions in the tree.
        </Speak>
        <Speak>
          As an example, if you were going to create a shopping list for going
          to CostCo to get groceries, you have to make some underlying
          assumptions about their selection for the list to even be valid. What
          you put on it you are inherently assuming is there. Notice how this is
          slightly different than something simply existing in reality, which
          would be confirmation of that item at CostCo.
        </Speak>
        <Speak>
          An interesting property of making inferences or "educated guesses" is
          that they are allowed to begin by saying things that may not be
          necessarily true, just that they are NECESSARY for the following
          argument to make sense!
        </Speak>
        <Speak>
          In the CostCo grocery shopping situation, if you assume they have
          everything you need, then your grocery list does truly represent
          something logical! However, it could be shown later your assumptions
          were not valid and don't actually show up together how you assumed,
          and while your argument was valid assuming your assumptions were,
          since they aren't, neither is your subsequent inference.
        </Speak>
        <Speak>
          This is why the assumption rule allows us to introduce new ideas
          without justification, because showing something is the case and
          requiring something to be the case are not the same thing.
        </Speak>
        <Speak>Now lets take a look at using Conjunction more formally!</Speak>
        <MathJax>{`$$\\text{Conjunction Rules }\\equiv \\begin{cases}\\begin{prooftree}

      \\AxiomC{A}
      \\AxiomC{B}
      \\RightLabel{(\\(\\land\\) I)}
      \\BinaryInfC{A \\(\\land\\) B}

      \\AxiomC{A \\(\\land\\) B}
      \\RightLabel{(\\(\\land\\) E1)}
      \\UnaryInfC{A}

      \\AxiomC{A \\(\\land\\) B}
      \\RightLabel{(\\(\\land\\) E2)}
      \\UnaryInfC{B}

      \\end{prooftree}\\end{cases}$$`}</MathJax>
        <Speak>
          Wow thats a lot! However, if we just jump right into using these rules
          to build some deductions, things will stop seeming so overwhelming
          quite quickly.
        </Speak>
        <Speak>
          Beyond simply creating random combinations of smaller propositions
          into larger ones, we can actually prove that cool non-directional
          property of Conjunction! Well how do we show this? If we could use
          Natural Deduction to display that two separate statements evaluated in
          a different order will always end up the same regardless of their
          underlying evaluations, then we would be golden! Believe it or not, we
          can do exactly that with the derivation trees below!
        </Speak>
        <MathJax>{`$$\\text{Goal: }\\begin{prooftree}

      \\AxiomC{(A \\(\\land\\) B) \\(\\land\\) C}
      \\noLine
      \\UnaryInfC{A}
      \\AxiomC{(A \\(\\land\\) B) \\(\\land\\) C}
      \\noLine
      \\UnaryInfC{B \\(\\land\\) C}
      \\RightLabel{(\\(\\land\\) I)}
      \\BinaryInfC{A \\(\\land\\) (B \\(\\land\\) C)}

      \\end{prooftree}$$`}</MathJax>
        <MathJax>{`$$\\text{Left Branch: }\\begin{prooftree}
      \\AxiomC{(A \\(\\land\\) B) \\(\\land\\) C}
      \\RightLabel{(\\(\\land\\) E1)}
      \\UnaryInfC{A \\(\\land\\) B}
\\RightLabel{(\\(\\land\\) E1)}
\\UnaryInfC{A}

\\end{prooftree}$$`}</MathJax>
        <MathJax>{`$$\\text{Right Branch: } \\begin{prooftree}
      \\AxiomC{(A \\(\\land\\) B) \\(\\land\\) C}
      \\RightLabel{(\\(\\land\\) E1)}
      \\UnaryInfC{A \\(\\land\\) B}
\\RightLabel{(\\(\\land\\) E2)}
\\UnaryInfC{B}
\\AxiomC{(A \\(\\land\\) B) \\(\\land\\) C}
\\RightLabel{(\\(\\land\\) E2)}
\\UnaryInfC{C}
\\BinaryInfC{B \\(\\land\\) C}

\\end{prooftree}$$`}</MathJax>
        <MathJax>{`$$\\text{Full Proof: }\\begin{prooftree}
      \\AxiomC{(A \\(\\land\\) B) \\(\\land\\) C}
      \\RightLabel{(\\(\\land\\) E1)}
      \\UnaryInfC{A \\(\\land\\) B}
\\RightLabel{(\\(\\land\\) E1)}
\\UnaryInfC{A}
      \\AxiomC{(A \\(\\land\\) B) \\(\\land\\) C}
      \\RightLabel{(\\(\\land\\) E1)}
      \\UnaryInfC{A \\(\\land\\) B}
\\RightLabel{(\\(\\land\\) E2)}
\\UnaryInfC{B}
\\AxiomC{(A \\(\\land\\) B) \\(\\land\\) C}
\\RightLabel{(\\(\\land\\) E2)}
\\UnaryInfC{C}
\\RightLabel{(\\(\\land\\) I)}
\\BinaryInfC{B \\(\\land\\) C}
      \\RightLabel{(\\(\\land\\) I)}
      \\BinaryInfC{A \\(\\land\\) (B \\(\\land\\) C)}
\\end{prooftree}$$`}</MathJax>
        <Speak>
          Woah! That was a lot of inference! However, we reached our goal! The
          only assumption we to deduce the proposition with the opposite
          evaluation order was our original proposition! Notice how we did not
          use any additional information that what was available already within
          our original proposition!
        </Speak>
        <Speak>
          We already saw with earlier rules how we could build up these
          propositions individually as well so interesting we could "glue" their
          trees to this one and make an even larger tree that starts from even
          less information! Interestingly, we can even continually use
          elimination rules to find all the original foundational assumptions!
          This is the power of Natural Deduction!
        </Speak>
        <Speak>
          These sprawling trees capture nothing but valid argumentation along
          their entire structure and since their are "redo" and "undo" rules we
          can navigate the tree as we wish!
        </Speak>
        <Speak>
          Now lets gain some more deductive power by defining implication, which
          we will see is one of the most logically vital connectives to have!
        </Speak>
        <MathJax>{`$$\\text{Implication Rules }\\equiv \\begin{cases}\\begin{prooftree}

\\AxiomC{[A]1}
\\noLine
\\UnaryInfC{B}
\\RightLabel{(\\(\\to\\) I)1}
\\UnaryInfC{A \\(\\to\\) B}

\\AxiomC{A}
\\AxiomC{A \\(\\to\\) B}
\\RightLabel{(\\(\\to\\) E)}
\\BinaryInfC{B}

\\end{prooftree}\\end{cases}$$`}</MathJax>
        <Speak>
          The odd notation with the brackets is to denote what's called
          discharging. Implication is great because its introduction rule is
          essentially stating that "if to get to B you needed to assume A, then
          A must be required before you can get B". We can remove/"Discharge"
          the assumption of A by enforcing it as a requirement for the inference
          to be valid, rather than just accepting our assumptions as "floating
          around".
        </Speak>
        <Speak>
          This is very powerful as we can now ensure cause and effect
          relationships between our propositions! Also it should be noted that
          the elimination rule is exactly what you think it says, only when you
          have the cause and you have the cause and effect relationship can you
          get the effect.
        </Speak>
        <Speak>
          Lets see an example of how we can create "assumptionless" arguments.
          Lets begin by creating the argumentation with assumptions as is
          natural and then adjust from there:
        </Speak>
        <MathJax>{`$$\\text{Assumption-less Argumentation }$$`}</MathJax>
        <MathJax>{`$$\\begin{prooftree}
      \\AxiomC{[A]2}
      \\AxiomC{ [B]1}
      \\RightLabel{(\\(\\land\\) I)}
      \\BinaryInfC{A \\(\\land\\) B}
\\AxiomC{[(A \\(\\land\\) B)\\(\\to\\)C]3}
\\RightLabel{(\\(\\to\\) E)}
\\BinaryInfC{C}
\\RightLabel{(\\(\\to\\) I)1}
\\UnaryInfC{B \\(\\to\\) C}
\\RightLabel{(\\(\\to\\) I)2}
\\UnaryInfC{A\\(\\to\\) (B \\(\\to\\) C)}
\\RightLabel{(\\(\\to\\) I)3}
\\UnaryInfC{((A \\(\\land\\) B)\\(\\to\\)C)\\(\\to\\)(A\\(\\to\\) (B \\(\\to\\) C))}

\\end{prooftree}$$`}</MathJax>

        <MathJax>{`$$\\begin{prooftree}
      \\AxiomC{[A]1}
      \\RightLabel{(\\(\\to\\) I)1}
      \\UnaryInfC{A \\(\\to\\) A}

\\end{prooftree}$$`}</MathJax>
        <Speak>
          The last one is definitely weird as it seems to say that to have A you
          need to require it. This isn't non-sensical or anything, it is just
          funny to day out loud because it seems obvious.
        </Speak>
        <Speak>
          The next operator we will introduce is Disjunction, and it also
          incorporates this interesting assumption discharging.
        </Speak>
        <MathJax>{`$$\\text{Disjunction Rules }\\equiv \\begin{cases}\\begin{prooftree}

      \\AxiomC{A}
      \\RightLabel{(\\(\\lor\\) I1)}
      \\UnaryInfC{A \\(\\lor\\) B}

      \\AxiomC{B}
      \\RightLabel{(\\(\\lor\\) I2)}
      \\UnaryInfC{A \\(\\lor\\) B}

      \\AxiomC{A \\(\\lor\\) B}
      \\AxiomC{[A]1}
      \\noLine
      \\UnaryInfC{C}
      \\AxiomC{[B]1}
      \\noLine
      \\UnaryInfC{C}
      \\RightLabel{(\\(\\lor\\) E)1}
      \\TrinaryInfC{C}

\\end{prooftree}\\end{cases}$$`}</MathJax>
        <Speak>
          To explain these rules plainly, we have two introduction rules (the
          opposite of conjunction) that essentially state that so long as you
          have a single disjunct guaranteed you can always have a valid
          disjunction with any other idea. This reflects the internal evaluation
          behavior of only needing one thing to be true to pass overall!
        </Speak>
        <Speak>
          The elimination rule however requires discharging due to Disjunction
          allowing information "through" without checking all of them. Since we
          aren't sure where we are getting our single truth value from that
          could derail the whole disjunct, to remove the disjunction we need to
          be sure we have all the constituent parts prove what the disjunction
          was proving.
        </Speak>
        <Speak>
          Put another way, a disjunction allows many different propositions the
          ability to let "their information" through so if you want to get rid
          of the disjunction you need to ensure that all the disjuncts can reach
          what the disjunct is used to justify, otherwise we still need the
          disjunct to gather information from each other in order to make our
          conclusion.
        </Speak>
        <Speak>
          While that was slightly more awkward to understand than the others,
          now that we have both conjunction and disjunction defined, we can
          display their duality in a proof showing it definitively! We will do
          this by showing that they can imply each other as an equally valid way
          of upholding the same cause and effect relationship:
        </Speak>
        <MathJax>{`$$\\begin{prooftree}
      \\AxiomC{[A \\(\\lor\\) B]2}
        \\AxiomC{[A]1}
        \\AxiomC{[(A \\(\\to\\) C) \\(\\land\\) (B \\(\\to\\) C)]3}
        \\RightLabel{(\\(\\land\\)E1)}
        \\UnaryInfC{(A \\(\\to\\) C)}
      \\RightLabel{(\\(\\to\\) E)}
      \\BinaryInfC{C}
      \\AxiomC{[B]1}
        \\AxiomC{[(A \\(\\to\\) C) \\(\\land\\) (B \\(\\to\\) C)]3}
        \\RightLabel{(\\(\\land\\)E2)}
        \\UnaryInfC{(B \\(\\to\\) C)}
      \\RightLabel{(\\(\\to\\) E)}
      \\BinaryInfC{C}
      \\RightLabel{(\\(\\lor\\) E)1}
      \\TrinaryInfC{C}
        \\RightLabel{(\\(\\to\\) I)2}
      \\UnaryInfC{ ((A \\(\\lor\\) B) \\(\\to\\) C))}
      \\RightLabel{(\\(\\to\\) I)3}
      \\UnaryInfC{(((A \\(\\to\\) C) \\(\\land\\) (B \\(\\to\\) C)) \\(\\to\\) ((A \\(\\lor\\) B) \\(\\to\\) C))}


\\end{prooftree}$$`}</MathJax>
        <Speak>
          These trees may be massive but the end result is so worth it! It
          literally spells out directly to us that if you have our original
          compound proposition using Conjunction it inherently suggests the
          existence of an identical Disjunction that implies C equally as well.
        </Speak>
        <MathJax>{`$$\\text{Absurdity Elimination }\\equiv \\begin{cases}\\begin{prooftree}

\\AxiomC{\\(\\bot\\)}
\\RightLabel{(\\(\\bot\\) E)}
\\UnaryInfC{A}

\\end{prooftree}\\end{cases}$$`}</MathJax>
        <MathJax>{`$$\\neg A \\equiv (A \\to \\bot)$$`}</MathJax>
        <Speak>
          Hey wait a minute. I thought implication was an operation that
          evaluated to true or false within reality, how can it suddenly be
          sending things to absurdity now? Thats because this form of
          inferential implication is not evaluating true or false, it is
          evaluating the existence of the assumption in the way we've assumed it
          is. Remember, Natural Deduction does not care about the underlying
          true or false values, only the logical conditions generated by the
          patterns in them. So interestingly this rule is not saying "If you see
          negative information its absurd" instead it is saying "If you end up
          showing your proposition can't be assumed, there's now way it makes
          sense to include in an inference and thus is will lead to logical
          absurdities"
        </Speak>
        <Speak>
          Put another way, we are in control of our starting conditions via the
          assumption rule right? If we are staring our proof from a position of
          only negative information, we don't have the power in intuitionistic
          logic to prove something directly! Thats only a power of positive
          information. Put another way again, you can't prove the world is the
          way it is by only showing a few examples of how it isn't
        </Speak>
        <Speak>
          This is exactly the issue we've been seeing creeping up throughout
          lectures as we've been investigating intuitionism, its inability to
          show anything indirectly.
        </Speak>
        <Speak>
          Lastly, with this new understanding we can display and explain the
          rules of Negation.
        </Speak>
        <MathJax>{`$$\\text{Negation Rules }\\equiv \\begin{cases}\\begin{prooftree}

      \\AxiomC{[A]1}
      \\noLine
      \\UnaryInfC{B}
      \\AxiomC{[A]1}
      \\noLine
      \\UnaryInfC{\\(\\neg\\)B}
      \\RightLabel{(\\(\\neg\\) I)1}
      \\BinaryInfC{\\(\\neg\\)A}

      \\AxiomC{A}
      \\AxiomC{\\(\\neg\\)A}
      \\RightLabel{(\\(\\neg\\) E)}
      \\BinaryInfC{B}

\\end{prooftree}\\end{cases}$$`}</MathJax>
        <Speak>
          The introduction rule for Negation is quite interesting as it also
          contains discharging of assumptions. It says that if you assumed an
          idea and individually it can prove both the positive and negative
          version of the same idea directly, then there is no way that
          assumption was valid.
        </Speak>
        <Speak>
          This should hopefully clarify why negation is defined in Natural
          Deduction to imply absurdity, because your assumptions should not be
          able to prove two opposing facts about the same thing.
        </Speak>
        <Speak>
          Building on that, the elimination rule says that if you are going to
          assume or let your inference contain opposing facts, then you aren't
          super concerned with making a valid argument in the first place since
          you are inviting contradictions so you may as well justify whatever
          you want. This is an extension of the absurdity rule we saw above.
        </Speak>
        <Speak>
          That was a long lecture, however, this marks the end of where we will
          go with pure logic! There is an amazing amount more to explore in this
          topic, but unfortunately this is not a logic course and we must move
          to see the rest of the amazing world of discrete mathematics!
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
