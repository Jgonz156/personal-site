import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import PhilosophyBreak from "@/components/course/philosophy-break"
import Vocab from "@/components/course/vocab"

export default function LectureNotes2() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN1",
          buttonColor: "primary",
          buttonName: "Information and It's Consequences...",
          buttonSlug: "/cmsi-2820/ln1",
        },
        middle: {
          lectureId: "HW1",
          buttonColor: "success",
          buttonName: "Think Class, Think!",
          buttonSlug: "/cmsi-2820/hw1",
        },
        right: {
          lectureId: "LN3",
          buttonColor: "primary",
          buttonName: "Assumptions Make an Argument out of You and Me",
          buttonSlug: "/cmsi-2820/ln3",
        },
      }}
    >
      <CourseBox>
        <TitleBox
          title="Making Logical Connections"
          quote={`"All the world is a laboratory to the inquiring mind" - Martin Fisher`}
        />
        <Speak>
          As a brief recap of last lecture, we are investigating the system of
          logic known as intuitionism. Within it we are studying propositions
          (Declarative Sentences). We saw that within intuitionism we are bound
          to reality and more specifically the balance between positive and
          negative information and its ability to help us deduce other facts.
        </Speak>
        <Speak>
          Depending on the proposition we were looking at, the difficulty of our
          ability to classify specific parts of it increased rapidly for even
          basic sentences. This is due to the informal terms we have been
          working in up until now.
        </Speak>
        <Speak>
          There was also a disturbing feeling coming from trying to understand
          what argumentation is as it is very difficult without formal rules to
          extend old facts into a basket of new ones.
        </Speak>
        <PhilosophyBreak
          qa={[
            {
              question:
                "In fact, if we think closely about making new facts from old ones, don't we need to 'make stuff up' at some point? How can we create brand new information when being constrained to only what we already have?",
              answer:
                "Amazingly, this is the subject of fierce debate among logicians. If you create to restricted a view of our ability to infer new facts, then you end up without thew ability to discover much of what we actually do know, under realizing the universe. However, give too much power to inference without restraint and you could end up treating your imagination as reality by over realizing what isn't!",
            },
            {
              question: "What's your contribution to this debate professor?",
              answer:
                "Well, I'm not one way or the other, but I do implore you to place this debate into the context of our world rather than pure theory. We come into being into a pre-existing world and are tasked to make sense of it. We don't know all of what makes up our world and we don't know if we ever will, but what I do know is that on the spectrum from weak to powerful inference, we know the world sits somewhere in it only because of our world gives us the imagination to imagine an infinite number of ways that aren't how it actually is.",
            },
          ]}
        />
        <Speak>
          Today we discover the methods of operationalizing propositional logic
          to avoid the ambiguity that comes with language and understand the
          rules regarding the creation of new facts, known as argumentation or
          inference.
        </Speak>
        <Speak>
          To do this, we slow down, and piece by piece separate out every part
          of declarative propositions and build a system for how they function
          with definite rules. Of course, as mathematicians do, we will also
          give it all new symbology to help produce a mechanistic system of
          operation to work with.
        </Speak>
        <Speak>
          First we will start with symbolizing "atomic" propositions. These are
          the smallest, completely indivisible statements of fact we can
          express. This is the information we spoke of in LN1. Since they are so
          small they are odd to produce in natural language as they tend to be
          quite singular. Lets work our way down to them.
        </Speak>
        <Speak>
          Take the following proposition, "Dogs are cool". Simple right? Well we
          can go lower as there is actually a lot of information in this small
          sentence. First we know a "Dog" is a Thing and that "coolness" is a
          property attainable by them. Then we happen to notice this is speaking
          of multiple of these "dog" things. This complicates matters as we are
          ensure if it is referring to all dogs or just some, or even if its
          about a specific dog or just the idea of dogs.
        </Speak>
        <Speak>
          Look at all this information floating around, we must reduce the
          sentence to gain greater perspective of atomic information. So what
          about this, "a dog is cool". Ok better, but still too much. Rather
          than continuously pointing out what is wrong with each, follow this
          journey of statements and see if you can "feel" out what is happening.
        </Speak>
        <Speak>
          "Dogs are cool", "A dog is cool", "a dog is", "dogs are", "dog", "🐕".
        </Speak>
        <Speak>
          This is why in natural language atomics are uncomfortable because they
          are just simply the existence of the thing that is naturally true. As
          the sentence progressed it was reducing more and more information
          until we stopped "Talking" anymore. Communication with others is about
          sharing information. At the atomic level however, communication is
          unnecessary are some things just "are". To summarize this another way,
          think of existence as the ultimate "declarative" of anything.
        </Speak>

        <PhilosophyBreak
          qa={[
            {
              question:
                "Why is 'existence' an atomic, aren't we made up of things?",
              answer: `Harkening back to Descartes, "I Think, Therefore I am." To stand
          boldly before all with no need for justification is the ultimate
          expression of reality. Existence is the most communicable idea ever as
          we are born with "us" as our starting point. It is simple to reason that if we "weren't"
          it would be impossible to even reason we "weren't" in the first place. While we are made of of things,
           those things themselves exist and while we may not know why, it would be foolish
           to pretend they don't when we can behold them.`,
            },
            {
              question:
                "Is existence always positive information or can it be negative information?",
              answer: `Great question! The answer is that it depends hugely on the system you
                 work within. It is of great philosophical debate as to whether the idea of 
                 "falsey-ness" even exists. The history of this discussion usually re-interprets
                  it as good versus evil. Th Privation Theory of Evil for instance says that evil
                   isn't even a "thing", instead it is the absence of "thing-ness". This 
                   is because "goodness" is defined as existence! Therefore how could something
                    evil even be? It literally is the absence of existence. There is a LOT of great
                    philosophy about this and I implore you to research further as it has huge implications!`,
            },
          ]}
        />
        <Speak>
          We could be absolute reductionists and pedantically mention that
          technically those are still symbols that represent the idea of a dog
          and that they are still not the absolute atomic itself, but this is a
          pointless assertion to make as we eventually need some way to
          represent an idea in symbols to share with one another. Other wise we
          could not work together as agents in reality and we'd be alone.
        </Speak>
        <Speak>
          With that out of the way, we now introduce symbology to help represent
          these atomics. We will represent them with variables, as
          mathematicians usually do. These are called propositional variables
          formally and we will use a small subset of our alphabet in English to
          identify them.
        </Speak>
        <MathJax>{`$$\\text{Propositional Variables: }X_{0},X_{1},X_{2},...$$`}</MathJax>
        <Speak>
          They are always uppercase. The reason being that they represent ideas
          usually, while the "instances", or items of that idea, are lowercase
          to denote where they come from. However we can ignore the idea of
          "object instances" today as we will discover the logical tools for
          them next lecture (LN3).
        </Speak>
        <Speak>
          Now that we are "at the bottom" so to speak, we can build up to the
          rest of what we know, but "pumping the breaks" for a second, do we
          even know what we we doing before? Taking a look back at the dog
          sentences, what were we losing at each step? Time to figure that out!
        </Speak>
        <Speak>
          First we construct a method to combine atomics to form larger
          propositional sentences. We do this by defining what are called
          "Logical Connectives". They are symbols defined to do specific things
          in the presence of true or false atomic propositions.
        </Speak>
        <Speak>
          When used between two atomic propositions we can build what are called
          Compound Propositions. These larger propositions are closer to what we
          know when we speak informally, but they are still far smaller than
          we'd ever actually use in day to day conversation. Lets take a look at
          how to make some:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{"Equals"} & \\equiv & Logical \\space Equivalence & A \\equiv B \\\\
        \\text{"Not"} & \\lnot & Negation & \\lnot A \\\\
        \\text{"And"} & \\land & Conjunction & A \\land B \\\\
        \\text{"And Or"} & \\lor & Disjunction & A \\lor B \\\\
        \\text{"Implies/If Then"} & \\to & Implication & A \\to B \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Unfortunately for completeness, This list is no where near exhaustive
          however it represents a powerful and common subset of the logical
          connectives we can use.
        </Speak>
        <Speak>
          We will now investigate each in turn and see how they operate on our
          propositions. Starting with the simplest, Equivalence.
        </Speak>
        <MathJax>{`$$\\equiv: Equivalence$$`}</MathJax>
        <Speak>
          To be clear this is not this symbol "=". It will take a different
          meaning later and it is known as Material Equivalence. Right now we
          are looking at Logical Equivalence. Informally, we know this to mean
          two things are the same. But in logic we want to be more specific
          about what "being the same" means. Does it mean two things are
          literally the same thing? Like there actually is no difference, we are
          just confusing symbols and we are actually trying to talk about the
          same propositional sentence? No. Here we mean that two separate,
          non-identical propositions are "logically" interchangeable.
        </Speak>
        <Speak>
          This is to say that when brought into a similar context, two differing
          propositions end up always producing the same evaluation, True or
          False.
        </Speak>
        <Speak>
          As an example, let's say you are looking for an excuse to not go to a
          birthday party because there are people their you have "bad blood". In
          this, unfortunately, common situation, we are looking for a "good
          reason" to avoid going. In this context, we find that many different
          propositions can produce the desired outcome. For instance, in this
          context, the propositions, "I have a terrible stomach ache" and "My
          house is on fire" are expressing completely different ideas. However,
          for the purpose of not going to the birthday party, they would
          "logically" allow you to do the same things. Which, in this case is
          deflecting any calls to the birthday party. So we could summarize the
          situation like this:
        </Speak>
        <MathJax>{`$$\\text{Within }\\top:Reality=
        \\begin{cases} \\text{"Birthday party is avoidable with any serious situation"} \\\\
        \\text{"Birthday party has 'bad blood'"} \\end{cases}$$`}</MathJax>
        <MathJax>{`$$ \\text{"I have a terrible stomach ache"} \\equiv \\text{"My house is on fire"}
        $$`}</MathJax>
        <Speak>
          Now of course in a wider context this is a ridiculous conclusion, but
          here they will do the same: let us avoid the party. This is why we
          specify "Logical" equivalence this way. If we defined it as absolute
          identity it would make the following box is{" "}
          <Vocab
            definition={
              <Speak>
                The term prima facie is used in modern legal English (including
                both civil law and criminal law) to signify that upon initial
                examination, sufficient corroborating evidence appears to exist
                to support a case. In common law jurisdictions, a reference to
                prima facie evidence denotes evidence that, unless rebutted,
                would be sufficient to prove a particular proposition or fact.
                The term is used similarly in academic philosophy.
              </Speak>
            }
          >
            prima facie
          </Vocab>
          :
        </Speak>
        <MathJax>{`$$ \\text{"I have a terrible stomach ache"} \\equiv \\text{"I have a terrible stomach ache"}
        $$`}</MathJax>
        <Speak>Now that we understand Equivalence, we move onto Negation</Speak>
        <MathJax>{`$$\\lnot: Negation$$`}</MathJax>
        <Speak>
          Know usually by its informal name "Not", this operator is Unary. This
          means it operates on only a single propositional statement as opposed
          to binary which acts on two separate propositions. Its not a "Logical
          Connective" in the typical sense since it doesn't build up multiple
          statements, however, it is very valuable as it allows us to express
          the duality in our system between True and False. It also "builds up"
          more information into a single proposition. It is defined to work as
          follows:
        </Speak>
        <MathJax>{`$$\\text{if }A \\equiv T:True, \\text{ then } \\lnot A \\equiv F:False $$`}</MathJax>
        <MathJax>{`$$\\text{if }A \\equiv F:False, \\text{ then } \\lnot A \\equiv T:True $$`}</MathJax>
        <Speak>
          Its important to note here that simply because True and False are
          duals, does NOT mean that all information is either True or False.
          They can of course be Absurd as we know, or not answerable yet. The
          idea to display here is that Negation is used to express the Negative
          information equivalent of the Positive information it is used with and
          vice versa. Such as the following:
        </Speak>
        <MathJax>{`$$\\text{If }A\\equiv\\text{"I like cats" then } \\lnot A \\equiv \\text{"I do not like cats"}$$`}</MathJax>
        <Speak>
          These statements are of course logically opposites and we can obtain
          them by using Negation on one or the other! The next operation to look
          at is Conjunction!
        </Speak>
        <MathJax>{`$$\\land: Conjunction$$`}</MathJax>
        <Speak>
          Conjunction, better known as "and", is for ensuring that the truth
          value of two propositions is linked in such as way as to ensure the
          greater compound statement is only the case when Both of the smaller
          ones are. Combining a False proposition and a True proposition
          together with and will always produce a false, greater proposition.
        </Speak>
        <Speak>
          Put another way, for Conjunction to ever produce propositions that are
          true when evaluated, they must always be made up of ONLY true
          information in a context.
        </Speak>
        <Speak>
          An important clarification here is that we are not saying it is made
          up of Positive information only, just that the propositions must
          actually be true when evaluated. Remember, just because Negative
          information is "falsey", in that is describes how something "isn't" as
          opposed to how it "is", doesn't mean its always false. For example,
          the following propositions will display that Positive information and
          Negative information in any combination still allow a larger
          Conjunctive proposition to evaluate to true.
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        + \\land + & \\text{"The sky is blue"}\\land\\text{"The sun is hot"}&\\equiv T:True \\\\
        + \\land - & \\text{"The sky is blue"}\\land\\text{"The sun is not cold"}&\\equiv T:True \\\\
        - \\land + & \\text{"The sky is not green"}\\land\\text{"The sun is hot"}&\\equiv T:True \\\\
        - \\land - & \\text{"The sky is not green"}\\land\\text{"The sun is not cold"}&\\equiv T:True \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          It should be readily apparent that this is not some special property
          of positive or negative information yet to be defined, but rather due
          to the fact that the underlying propositions are true when evaluated.
        </Speak>
        <Speak>
          Another important notion of Conjunction is that it is NOT
          "directional". In the case of positive information combined with the
          negative information, it could have been put the other way without
          changed the result. This is the case with Logical Equivalence as well,
          however this fact is more readily apparent with logical equivalence
          due to its nature. This is important as not every operator we will see
          is this way! However, the next one we will look at, Disjunction, is.
        </Speak>
        <MathJax>{`$$\\lor: Disjunction$$`}</MathJax>
        <Speak>
          Informally, this operator is known in English as the phrase "And or".
          Wait, what? This is odd, but this has to do with the fact that this
          version of "or" is NOT the one we use in English (The version of "or"
          we use is actually called the Exclusive Disjunction and we will see it
          in later standards).
        </Speak>
        <Speak>
          Disjunction operates as the direct dual, or opposite, of Conjunction.
          Since conjunction can only be true if, and only if, the smaller
          propositions that it binds together are evaluated as true, then
          disjunction can be understood as being true in the 3 other cases (In
          the event you are only combining 2 smaller propositions.)
        </Speak>
        <Speak>To illustrate its operation, lets look at some examples:</Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{"The sky is blue"}:True\\lor\\text{"The sun is hot"}:True &\\equiv T:True \\\\
        \\text{"The sky is blue"}:True\\lor\\text{"The sun is cold"}:False &\\equiv T:True \\\\
        \\text{"The sky is green"}:False\\lor\\text{"The sun is hot"}:True &\\equiv T:True \\\\
        \\text{"The sky is green"}:False\\lor\\text{"The sun is cold"}:False &\\equiv F:False \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          We can see its use is not similar to the English use of "or" with
          example 1. It seems incorrect to use "or" here because we typically
          use "or" two separate, distinct, non-mutually existing situations. A
          classic example is the phrase, "Soup or Salad?" at a restaurant. We
          don't think of having both as a valid outcome to the question.
        </Speak>
        <Speak>
          This is why the English Phrase "And Or" is used, as this displays the
          intuition that you are not making a distinct choice, but rather that
          you are just being prompted for any combination of at least one being
          true. This brings us to a more "direct" method of understanding
          Disjunction. It is only true if ANY of the smaller propositions are
          true. The only way it is false is if ALL the statements are false.
        </Speak>
        <PhilosophyBreak
          qa={[
            {
              question:
                "Why not start with the direct definition? Why define it first in terms of Conjunction?",
              answer: `Besides the "teaching" reason being that this more directly displays
               the related nature of the two operators, but also that is gives us valuable
                insight into how we can understand new ideas. Negative information is equally
                 as valid as Positive information when it comes to understanding a topic. In fact,
                  it can sometimes be more intuitive! Don't always search for Positive displays of
                   a topic as you may mis the entire underlying world of Negative displays! When
                    investigating operations, there is a sense that it could be important to "undo"
                     it and recover previous situations. Not only is this perfectly displayed by
                      Conjunction and Disjunction, but other operators too. What would Addition
                       be without Subtraction? What would Multiplication be without Division?
                        What would Exponentials be without Logarithms? Integration without
                         Differentiation?`,
            },
          ]}
        />
        <Speak>
          With that explained, there is but one last operator for us to see
          today, Implication.
        </Speak>
        <MathJax>{`$$\\to: Implication$$`}</MathJax>
        <Speak>
          This one is the most interesting as it is directional. It can only be
          understood moving from left to right. A strong intuition for this
          operator is "cause and effect". Here we will start with a direct
          definition in terms of its evaluation and begin from there:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        A:True\\to B:True &\\equiv T:True \\\\
        A:True\\to B:False &\\equiv F:False \\\\
        A:False\\to B:True &\\equiv T:True \\\\
        A:False\\to B:False &\\equiv T:True \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This might not seem intuitive but imagine the left hand side as being
          a toggle for when we are expecting the cause to create the effect. If
          the cause is True, meaning that it is exerting itself to create an
          effect, and the effect is true, meaning we see that it caused the
          effect to occur, then clearly the cause and effect relationship is
          True and is real. To clarify, we are NOT investigating wether the
          components are true or false, we are investigating if the cause and
          effect relationship exists between 2 propositions and if it does then
          it is True and if it isn't than its false.
        </Speak>
        <Speak>
          In the second case, we are saying that we expect A, when true, to
          cause B, to be true as well. Since B is actually false, the cause and
          effect is broken and thus the overall operation is false.
        </Speak>
        <Speak>
          To understand the last two cases, imagine now that we are not
          expecting A to cause B. In this case, since B is "unlinked" from the
          influence of A, bu definition, it attaining any value ,true or false,
          must have been of its own volition, separate from A. So oddly, we are
          correct in asserting that A doesn't cause B and thus the NON-cause and
          effect relationship is true.
        </Speak>
        <Speak>
          This is odd to wrap our heads around and using the tools of natural
          deduction we will see how to deconstruct Implication into other
          operators that help to explain this interesting behavior. But for the
          sake of completion here, lets see some examples:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{"Gravity exists"}\\to \\text{"The basket ball falls"} &\\equiv T:True \\\\
        \\text{"Gravity exists"}\\to \\text{"The basket ball does not fall"} &\\equiv F:False \\\\
        \\text{"Gravity does not exist"}\\to \\text{"The basket ball falls"} &\\equiv T:True \\\\
        \\text{"Gravity does not exist"}\\to \\text{"The basket ball does not fall"} &\\equiv T:True \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Here it becomes more clear as to why implication functions the way it
          does. If we search for a cause and effect relationship between these
          things, the only time the cause and effect relationship is called into
          question is when gravity should be exerting force on the ball but it
          does not actually cause the ball to move.
        </Speak>
        <Speak>
          With that we have completed our initial understanding of our small
          subset of operations on propositions! Now we can evaluate more complex
          compound propositions! No longer will the scourge of two statements
          best us!
        </Speak>
        <Speak>
          However, there is something important missing from this discussion.
          While we have given ourselves the ability to evaluate more "powerful"
          statements, we have yet to understand what we can infer from them.
          Without these operators, only having pure atomic propositions, what
          can we infer from a set of finite facts?
        </Speak>
        <Speak>
          Well the simplest atomic proposition we know of right now is just
          existence. Without a direct, given definition we choose to accept "at
          face value", for how something exists, we actually can't extrapolate
          much from it.
        </Speak>
        <Speak>
          We can extrapolate and infer that things exist, but beyond that we
          can't really say much else. For instance, we can observe that dogs and
          cats exist, but we can't say how they relate to one another. We can
          only understand them being there.
        </Speak>
        <Speak>
          We can't even say we understand how "things" don't exist because then
          we would be in an absurdity like in LN1! We need to introduce our
          operations to gain to inference abilities, because at the moment, we
          essentially can't bring new information into our finite contexts! But
          how is this possible?
        </Speak>
        <Speak>
          An important note of clarification here is that we are NOT referring
          to evaluating information as true or false. Instead we are asking how
          to get new information that can be true or false in the first place.
          This is why the second vocabulary term of Argumentation is used in
          place of Inference on occasion.
        </Speak>
        <Speak>
          What we are saying, in other words, is how can we ARGUE about new
          information in our system as true or false if we have nothing to ARGUE
          about since we all start from the point of understanding the things
          that exist? You can't argue something doesn't exist if you are looking
          at it. It has to exist for you to even try this in the first place so
          this exercise is obviously self-defeating.
        </Speak>
        <Speak>
          By Including our new operations between simple propositions, we can
          recognize the relationships between the two statements and declare new
          information from them!
        </Speak>
        <Speak>
          As A brief example of this, lets take a look at how Conjunction can be
          used to introduce new information.
        </Speak>
        <MathJax>{`$$\\top:Reality=
        \\begin{cases}
        A:True \\\\
        B:True
        \\end{cases}$$`}</MathJax>
        <Speak>
          While this reality isn't very exciting, it is always this way. The
          fact that it will always be like this is interesting as Conjunction
          gives us an intuitive manner to describe a relationship between them!
          Since it is always the case that A is True and that B is True, the
          statement A and B is True will always be the case! We can now add that
          fact to our reality! We can see this below:
        </Speak>
        <MathJax>{`$$\\top:Reality=
        \\begin{cases}
        A:True \\\\
        B:True \\\\
        A\\land B:True \\\\
        \\end{cases}$$`}</MathJax>
        <Speak>
          More interestingly, even without knowing the actual evaluations of the
          things that exist, we can still assume the relationship is a piece of
          information we can add to the reality because it is just a
          relationship that has yet to be evaluated! Put another way, since A
          and B always exist, it will always be possible to construct a
          Conjunctive proposition about the both of them! This can be seen as
          the below:
        </Speak>
        <MathJax>{`$$\\top:Reality=
        \\begin{cases}
        A \\\\
        B \\\\
        A\\land B \\\\
        \\end{cases}$$`}</MathJax>
        <Speak>
          In this case it becomes more clear that we need to define Conjunction
          in terms of all possible cases, otherwise we could come across a case
          that derails our ability to include it as new valid information.
        </Speak>
        <PhilosophyBreak
          qa={[
            {
              question:
                "What if we weren't using just true and false? What if we had multi-valued logics?",
              answer:
                "This is a very insightful question, as you can see the definition for Conjunction in such a system would need to be more expansive! This image becomes more complicated if you imagine the worst case scenario of having an infinite range of probability based truth values. You could have a version of conjunction that reduces different valued probabilities down to just true and false, displaying something like the mathematic operations of floor and ceiling. But why crush that data? Why not have a version of Conjunction that simply sides with that higher probability while maintaining its sense of fuzz-ness, such that the conjunction could suddenly take different probabilities than the constituent propositions that make it up!",
            },
          ]}
        />
      </CourseBox>
    </CoursePage>
  )
}
