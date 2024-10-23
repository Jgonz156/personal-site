import { Sheet, Typography } from "@mui/joy"
import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import Vocab from "@/components/course/vocab"
import MultiSelectQuestion from "@/components/course/multi-select-question"

export default function LectureNotes1() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        middle: {
          lectureId: "HW1",
          buttonColor: "success",
          buttonName: "Think Class, Think!",
          buttonSlug: "/cmsi-2820/hw1",
        },
        right: {
          lectureId: "LN2",
          buttonColor: "primary",
          buttonName: "Making Logical Connections",
          buttonSlug: "/cmsi-2820/ln2",
        },
      }}
    >
      <CourseBox>
        <TitleBox
          title="Information and Its Consequences..."
          quote={`"Education is the kindling of a flame, not the filling of a vessel" - Socrates`}
        />
        <TopicBreak title="Starting From Nothing" />
        <Speak>
          Let's start from the very beginning, no math, no knowledge, just the
          world around us and our senses...
        </Speak>
        <PhilosophyBreak
          qa={[
            {
              question: "What can we find? What can we begin to know?",
              answer: (
                <Sheet color="primary" variant="soft">
                  <Typography>
                    We might find things: cars, trees, birds, rocks, tables,
                    phones, dirt, etc
                  </Typography>
                  <Typography>
                    We might find properties on things: looks red, looks large,
                    sounds loud, sounds far, tastes bitter, feels rough, smells
                    bad, etc
                  </Typography>
                  <Typography>
                    We might find patterns things adhere to (or patterns between
                    things): gravity, social pressure, hearts "beat", seasons
                    change, etc
                  </Typography>
                  <Typography>
                    Things and Properties on things can be determined in a
                    snapshot, but patterns arise over time
                  </Typography>
                </Sheet>
              ),
            },
          ]}
        />
        <Speak>
          This investigation leads to the collection of
          <Vocab definition="A discrete (indivisible) truth-functional statement about the world">
            information
          </Vocab>
          , discrete pieces of truth in the world around us. With this we can
          draw our world as the below image.
        </Speak>
        <Speak>
          Neat right? This image helps represent some of the facts we find about
          information, such as things being made up of other things and that
          interactions between things aren't necessarily their own "thing" but
          do actually exist. But what is that outside area called? and what do
          we know about it? Well, it can't be felt by the senses, and the only
          way to get there seems to be to build something that doesn't exist.
          This area is what is absurd, it's what is patently unobservable in the
          world. Some might be tempted to call this region what is false, but
          thats not quite right. Something being false is a fact about the
          world, which means its a "truth" about the world around us. For
          instance, the statement "the sky is green" is false, which is saying
          that its an incorrect conclusion as compared to the statement "the sky
          is blue", but its still made up of things that are real. However, if I
          asked you to give me something that doesn't exist, this is absurd,
          because it's not possible. The "thing" I just asked for is not real,
          and so it can't be false, it's just absurd. This is a very important
          point moving forward because to converse in a "valid" manner about
          truth, or what might better be called reality, we need to be able to
          distinguish between what can be false and what is absurd. So lets
          introduce some symbols to help us out.
        </Speak>
        <Speak>
          <MathJax>{`\\[\\top:Reality, \\bot:Absurdity, T:True, F:False\\]`}</MathJax>
        </Speak>
        <Speak>
          These symbols help us draw conclusions about statements, Let's try
          some now:
        </Speak>
        <MultiSelectQuestion
          question={`Evaluate the following statement: "1 + 1
          is 3" (Select all that apply)`}
          choices={[
            <MathJax>{`\\[\\top\\]`}</MathJax>,
            <MathJax>{`\\[\\bot\\]`}</MathJax>,
            <MathJax>{`\\[T\\]`}</MathJax>,
            <MathJax>{`\\[F\\]`}</MathJax>,
          ]}
          answers={[1, 0, 0, 1]}
          correctMessage={
            <>
              Correct! The answers are
              <MathJax>{`\\[\\top,F\\]`}</MathJax>! This is because something
              can only be false in reality! This statement is opposed to the
              true statement "1 + 1 is 2" which is a fact about the world around
              us! However, make sure to remember that this statement is not
              absurd (we can comprehend it just fine), it's just false!
            </>
          }
          incorrectMessage={
            <>
              Incorrect! Keep trying! But keep this in mind, for something to be
              absurd it must necessarily be beyond comprehension, can you
              comprehend what is being asked? And if you can then it must be
              realistic in some manner. And if that's the case, we should be
              able to evaluate whether its true or not! Also remember where True
              and False fit in the grand scheme of things! where do they exist?
            </>
          }
        />
        <MultiSelectQuestion
          question={`Evaluate the following statement:
          "Computer's have finite storage" (don't @ me about cloud storage
          technically allowing infinite scalability) (Select all that apply)`}
          choices={[
            <MathJax>{`\\[\\top\\]`}</MathJax>,
            <MathJax>{`\\[\\bot\\]`}</MathJax>,
            <MathJax>{`\\[T\\]`}</MathJax>,
            <MathJax>{`\\[F\\]`}</MathJax>,
          ]}
          answers={[1, 0, 1, 0]}
          correctMessage={
            <>
              Correct! Of course computers have finite storage! Otherwise there
              wouldn't be such a big market for it O.o . Keep in mind that truth
              must be in reality!
            </>
          }
          incorrectMessage={
            <>
              Incorrect! Keep trying! But remember, the statement is not absurd
              since we can comprehend it! Also remember where True and False fit
              in the grand scheme of things! where do they exist?
            </>
          }
        />
        <MultiSelectQuestion
          question={`Evaluate the following statement: "The
          car in this image is red" (Select all that apply)`}
          image={<>add car image here</>}
          choices={[
            <MathJax>{`\\[\\top\\]`}</MathJax>,
            <MathJax>{`\\[\\bot\\]`}</MathJax>,
            <MathJax>{`\\[T\\]`}</MathJax>,
            <MathJax>{`\\[F\\]`}</MathJax>,
          ]}
          answers={[1, 0, 1, 0]}
          correctMessage={
            <>Correct! The car is red! Y'all are getting the hang of this!</>
          }
          incorrectMessage={
            <>
              Incorrect! Keep trying! But remember, the statement is not absurd
              since we can comprehend it! Also remember where True and False fit
              in the grand scheme of things! where do they exist?
            </>
          }
        />
        <PhilosophyBreak
          qa={[
            {
              question: `The last question brings up an interesting idea,
          what if you are colorblind and can't evaluate the previous question?
          How does our conversation change? What if you are blind and can't see
          any colors? What if you are deaf and can't hear the car?`,
              answer: `What is very
          interesting is that our discussion is the same! The car didn't stop
          being red as a result of the perceiver being colorblind, it just
          became less easy to tell that it is. This is a very important because
          our senses are not what develop the world around us, they are what let
          us easily collect "truth"'s about the world around us. In the example
          of someone being deaf, if we gave them a decibel meter, they could
          still tell that a car driving by is loud, even if they can't hear it.
          In learning this we recognize a few things: that with our limited
          senses we can still collect information about the world, it just might
          be harder to do so without them, that we don't need the senses at all
          to justify, or prove truths about the world, and that the world around
          us is not dependent on us to exist they way it does. The last one put
          another way is the same as saying that information exists independent
          of anything. More can be said, but we must continue....`,
            },
          ]}
        />
        <MultiSelectQuestion
          question={`Evaluate the following statement: "I am
          something that is unknowable" (Select all that apply)`}
          choices={[
            <MathJax>{`\\[\\top\\]`}</MathJax>,
            <MathJax>{`\\[\\bot\\]`}</MathJax>,
            <MathJax>{`\\[T\\]`}</MathJax>,
            <MathJax>{`\\[F\\]`}</MathJax>,
          ]}
          answers={[0, 1, 0, 0]}
          correctMessage={
            <>
              Correct! This is patently absurd! Even if we tried to believe the
              statement by assuming its true, it selfs contradicts by saying its
              true that it is unknowable! Ok well what about assuming the
              sentence is false? If we do that then we assume its lying to us
              and that it actually is knowable, but if that was the case where
              is it? It should be knowable and yet we don't know it! It makes no
              sense!
            </>
          }
          incorrectMessage={
            <>
              Incorrect! Think more carefully about what this statement is
              saying. Think about if the statement was true, what would that
              mean? What if it was false? Can we find what its pointing us
              toward?
            </>
          }
        />
        <Speak>
          An interesting pattern emerges in answering those questions, what is
          true and false must necessarily be reality, while anything absurd is
          just that, there's nothing that can be said about it.
        </Speak>
        <Speak>
          Also we've been keeping our statements simple, what happens if we
          include more detail? What about things happening across time? What
          about things that are both kinda true and kinda false? What about
          things that are true only under specific conditions? What if I need to
          convince someone what I am saying is even true?? If only there was a
          system that could help us with this...
        </Speak>
        <TopicBreak title="Systems of Logic" />
        <Speak>
          Logic is a system that helps us draw conclusions about the world, it
          was once described as "the science of reasoning". The previous system
          we were using in our previous discussion is one that feels right or
          feels pretty intuitive, but its not all there is. It's called
          intuitionistic logic and its a system built on the idea that we can
          only draw conclusions about the world that we can prove. It's what the
          course will use going forward, but lets introduce a few more systems
          to help us out.
        </Speak>
        <TopicBreak title="Formal vs Informal" />
        <Speak>
          First we make the distinction between formal and informal logics. We
          are very used to informal logics as they are the ones we use in
          everyday conversation. There are "rules" to how they function but can
          be mired in ambiguity due to natural language. The meaning of a
          statement, and wether it is "perceived" (another key point since
          listeners can interpret statements differently) as true or not, is
          highly dependent on context. Due to the mildly obtuse nature of
          informal logic we will be avoiding it, but it is valuable to know
          research is being done in this portion of logic to support endeavors
          like natural language processing.
        </Speak>
        <Speak>
          Formal logics on the other hand are purpose built to remove ambiguity
          and enforce purpose-built rules to breakdown the logic in statements
          mechanically. These rules vary from system to system, but they all
          attempt to create a way to converse about truth in a mathematically
          rigorous manner. Rather than beginning formal logics with a very high
          level overview, it seems pertinent to actually dive into how to use
          these systems first. This will give a greater appreciation for the
          differences between formal systems which we will overview later.
        </Speak>
        <TopicBreak title="Classical Logic" />
        <Speak>
          Lets just dive straight into the most widely known and well-formed
          system called Classical Logic. This logic refers to declarative
          statements as propositions and attempts to decode the propositions
          ideas as True or False. As a brief reminder, there are four main types
          of sentences, Declarative, Interrogative, Imperative, and Exclamatory.
          Declarative are those that make direct statements, Interrogative are
          those that question, Imperative are those that command, and
          Exclamatory are those that express great emotion. Since attempting to
          say wether exclamations of emotion, questioning of the world, or
          commands to do something are true or false is a bit odd, we will be
          focusing on declarative statements. as a brief clarification, since we
          are attempting to evaluate the truth of an entire sentence, if a
          sentence is not declarative in nature it doesn't really follow to
          evaluate in this manner. Within these propositions includes
          first-order logic, but these specific only currently serve to
          complicate things so we will proceed with just the propositional
          portion.
        </Speak>
        <Speak>
          Propositions are said to be "truth bearers" or "False bearers" and to
          create a concrete system of logic we need to collect as many of them
          as possible and label them as such. This is the first step in creating
          a larger picture of what is objectively true (The earlier stated
          purpose for such a system). So what do these propositions look like?
          and how do we evaluate them? Well, lets start with the basics.
          Propositions can be simple or complex, simple propositions are those
          that convey a singular idea to be evaluated. Complex propositions are
          simply the compounding of multiple simple propositions via logical
          connectives. Depending on which connective you use, instructs how you
          evaluate the more complex truth value. Lets take this simple
          proposition, "Cats are animals". One idea is being conveyed and as
          such only this one idea needs to be evaluated. In this case it is
          True. Now lets take this complex proposition, "Cats are animals and
          Dogs are not animals". This is a compound of two simple propositions
          with the connective "and". The connective "and" instructs that both
          simple propositions must be true for the complex proposition to be
          true. In this case, the first simple proposition is true, but the
          second is false, so the complex proposition is false. Easy enough
          right? Well, unfortunately it gets a bit more complicated...
        </Speak>
        <Speak>
          Even with such a simple system thus far we have to point out a few key
          distinctions. Before even delving into all the different logical
          connectives, we need to talk about an issue that comes up with the
          proposition, "cats are animals or cats are not animals". This poses a
          unique situation in our system. One might quickly come to the answer
          that this is True, which is correct don't worry. But why is it True?
          Is it simply due to cats being animals? Well something interesting
          arises here, since our propositions can only be True or False
          exclusively, and we can construct propositions that either produce
          True or False only, we can construct propositions that are actually
          True no matter what, because no matter the idea being evaluated we
          always produce True upon evaluation. As another example, "This lesson
          is good or this lesson is bad". These are propositions are called
          "Logically True".
        </Speak>
        <TopicBreak title="Argumentation" />
        <Speak>
          Now we have a system that can help instruct us on how to evaluate the
          "truth-ity" or "false-ity" of statements. However, one of the major
          goals of a system of logic is not just evaluation, but argumentation.
          Being able to tell if "reasoning" being made from statements is valid
          or not. An Argument is not just a statement, but a collection of
          Premises and a Conclusion they point to. The idea is to use a
          collection of truths to inform the truth of another. This process of
          building from your premises to your conclusion is called Inference.
          Since argument and inference can be used interchangeably in this
          context, I will use the term inference going forward since it has a
          more individualistic sense to it then argument which has a more debate
          feel. An inference can be correct or incorrect. A correct inference is
          one whose premises support its conclusion and an incorrect inference
          is one that does not support its conclusion. The way in which you
          generate this support is made one of multiple ways, but to simplify
          the conversation I will divide them into deductive and non-deductive.
        </Speak>
        <Speak>
          A deductive inference is the most powerful form of inference, as it
          guarantees the truth of the conclusion. This is because the premises
          truth value doesn't actually matter! (Very similar to the logical
          truths from before) To display this lets form a deductive argument:
          "all planets are round, no asteroids are round, therefore no planets
          are asteroids". The inference being made that "no planets are
          asteroids" is a logical conclusion due to the premises requiring no
          overlap between the ideas being expressed. Since this inference is one
          that follows from the premises, it is a called a Valid inference. Note
          that this being a Valid inference is not guaranteeing the truth of the
          conclusion, just that it logically follows. To clarify this idea
          further, look at this Valid inference within a new deductive argument:
          "Humans are featherless bipeds, a plucked chicken is a featherless
          biped, therefore plucked chickens are humans." Now it should be more
          clear why validity is a separate notion. If the propositions that make
          up the premises are all True and the inference is Valid, then it is
          called a Sound inference. This is the highest level of inference that
          can be made and does guarantee the conclusion's truth value is True.
          The previous example about plucked chickens is called Unsound, since
          it is valid but its premises aren't all correct. However the first
          example is Sound since its premises are true (to a certain extent of
          course, I'm a computer scientist not an astrophysicist).
        </Speak>
        <Speak>
          Non-deductive reasoning is a bit more complicated, as it technically
          cannot guarantee the conclusion, only provide that it may be more
          likely than not. Referred to by many terms and different inference
          types, such as ampliative, inductive, conductive, and abductive, these
          forms of inference are more complicated and less clear. These forms of
          reasoning are usually associated to a greater degree with informal
          logics and are used more naturally in language and scientific
          reasoning in general. The only one of these forms of reasoning that we
          will see come back later is inductive reasoning so a brief look will
          be provided here.
        </Speak>
        <Speak>
          Inductive reasoning is a form of inference that draws its strength
          from statistics and probability. The idea is that if the premises
          display a pattern that is relatively consistent, then the conclusion
          is more likely to be true is it seems to line up with it. Take this
          inductive inference for example: "Every time I have dropped a ball it
          has fallen, therefore the next time I drop a ball it will fall." While
          this line of reasoning seems as ironclad as what we were doing before
          with deductive reasoning, it technically cannot guarantee its
          conclusion. Gravity explains why this is a good line of reasoning but
          its one, not in in our premises, and two, still technically not a
          guarantee since a gust of wind could come by and overcome it. However,
          we still want a way to say this is a "valid" line of reasoning, but
          due to it being inductive we say it is "strong" instead. Once again,
          like validity, strength is not about the truth of the conclusion, only
          that the inference is a good one. If the premises are true and the
          inductive reasoning strong, then the inference is called Cogent.
        </Speak>
        <Speak>
          Before taking a small tour around how all of what we talked about gets
          altered in different systems of logic, it helps to talk about one of
          the oldest and most well known form of deductive inference making,
          Modes Ponens. This form of inference is a simple one, but it is
          incontrovertibly valid. An example of this form of the inference is as
          follows: "If it rains the ground becomes wet, It is raining, therefore
          the ground is wet". Straightforwardly the inferences that come from
          following this line of reasoning are always valid since they are the
          combination of a conditional statement and the antecedent of that
          statement. However once again this does not bring soundness as the
          premises must be shown to be True.
        </Speak>
        <TopicBreak title="A Tour of Logics" />
        <Speak>
          To round off this discussion, lets end with a brief look at how much
          of this changes in different systems of logic. Originally there was
          traditional, or aristotelian logic. Rather than evaluating any
          declarative statements, this form of logic required the formation of
          syllogisms, which are a form of deductive reasoning that requires the
          formation of a major premise, a minor premise, and a conclusion. An
          example would be "All men are mortal, Socrates is a man, therefore
          Socrates is mortal"
        </Speak>
        <Speak>
          Then along came the propositional logic we talked about earlier, which
          in addition to first order logic formed Classical logic. First order
          logic seeks to help breakdown the inside of propositions into symbolic
          representations of the same ideas. It seeks to help breakdown the
          connections between objects and their properties. For example, the
          previous example of "Planets are round" would be broken down into a
          singular term (used for objects) "p" for planets and "R(x)" a
          predicate (used to display properties) for round, turning the sentence
          into "R(p)". This helps condense the information into clear parts to
          help evaluate the truth of the statement. Getting to classical logic
          from here is straightforward as compound propositions are formed with
          symbols for the logical connectives. For "Cats are animals and Dogs
          are not animals" the sentence would be broken down into "A(x)" the
          property of being an animal, "d" for dogs, "c" for cats, and "&" for
          the connective to form "A(c)&!A(d)". However classical logic also
          comes with some intuitive additions for making inferences. This
          includes the law of the excluded middle, which states that for all
          propositions either it or its negation (opposite) is true, and the
          principle of bivalence, which states that all propositions be true or
          false, double negation elimination, which states that if a proposition
          is not False then it is True and vice versa, and the principle of
          explosion, which states that if a contradiction is found then any
          proposition can be proven. The last one is a bit odd, but it is the
          mathematical way of stating that if your gonna contradict yourself
          while arguing, you might as well say anything you want since being
          valid wasn't a concern for your argument.
        </Speak>
        <Speak>
          However, this form of classical logic on its own is still not strong
          enough to cover even many of the situations we find daily, and thus
          gives rise to what are called "Extended" logics, where the classical
          system is appended with new rules and symbology to capture new
          meaning. These extensions take one of two forms, they can be about
          adding "qualifying" information or "quantifying" information. When
          quantifying additional information is added, the system is called
          Higher-order, as it allows you to discuss either singular
          "existential" cases or plural "universal" cases for properties and the
          objects. For instance, "There exists a cat that is black" or "All cats
          are black" becomes "E.B(c)" and "A.B(c)" respectively. When adding
          qualifying information, the system is called Modal. Since there are
          many different "modes" that come up there are many different modal
          logics to reflect them. There's Alethic, which is about necessity and
          possibility, Deontic, which is about obligation and permission,
          Temporal, which is about time, Epistemic, which is about knowing,
          Doxastic which is about believing, Dynamic which is about the order of
          events, and more.
        </Speak>
        <Speak>
          The next family of logics are sometimes referred to as "Deviant"
          because they separate themselves in some way from classical logic.
          Interestingly, each of those previously discussed laws in Classical
          Logic can be removed to produce these new deviant ones! The first
          deviant logics reject the principle of bivalence, and they are called
          multi-valued logics. This is because they allow for more than just
          true or false, they allow for a third option, "undetermined". This can
          be taken as far as desired to have n-ary truth values for the logic!
          When you allow for all real numbers between 0 and 1 then you get a
          fuzzy logic since its truth value begins to take on a more "fuzzy"
          probabilistic state. The next deviant logics reject the principle of
          explosion, and they are called paraconsistent logics. This is because
          they allow for contradictions to exist in the system without causing
          the system to break down. This is a bit odd, but it is useful in
          certain contexts where contradictions are unavoidable. The last
          deviant logics reject the law of the excluded middle (and by extension
          double negation elimination), and they are called intuitionistic
          logics. This is because they reject the idea that all propositions
          must be true or its negation true (This removes that odd situation
          where a proposition or'ed with its negation is always true!). Instead
          this system emphasizes "proof by construction" where everything that
          is true should be shown directly. This is the system we will be using
          going forward in the course as it lends itself well to a field called
          constructive mathematics which gives the rigorous mathematical
          underpinnings for some very cool computer systems!
        </Speak>
        <Speak>
          Well that was a lot about logic! With this discussion ended we can now
          say this course will feature Higher Order Intuitionistic Logic!
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
