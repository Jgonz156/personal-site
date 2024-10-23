import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import ImageBox from "@/components/course/image-box"

export default function LectureNotes8() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        middle: {
          lectureId: "HW3",
          buttonColor: "success",
          buttonName: "Storage Wars",
          buttonSlug: "/cmsi-2820/hw3",
        },
        right: {
          lectureId: "LN9",
          buttonColor: "primary",
          buttonName: "Setting In",
          buttonSlug: "/cmsi-2820/ln9",
        },
      }}
    >
      <CourseBox>
        <TitleBox
          title="Getting Our Types in a Row"
          quote={`"Good order is the foundation of all great things" - Edmund Burke`}
        />
        <Speak>
          We begin our look into collection types by with the humble tuple. What
          is a tuple? what are its operations? what are its instances? As
          motivation for tuples, think of Python and its "tuples".
        </Speak>
        <Speak>
          As we've seen every step in this course so far, nothing in Python was
          conjured up on a whim by its designers. Instead, the diligent process
          of mathematical research informed rigorous manner in which to
          understand our types.
        </Speak>
        <Speak>
          Like all the collection types we will see, the tuple is made up of
          many other instances. How is does so however sets it apart from the
          rest we will see.
        </Speak>
        <Speak>
          The Tuple is quite humble as it maintains two pivotal properties. They
          are Ordered and they are finite. They appear as a sequence of
          elements, delimited by parentheses:
        </Speak>
        <MathJax>{`$$
        (a_1, a_2, a_3, \\ldots, a_n)
        $$`}</MathJax>
        <Speak>
          They are also sometimes referred to as "pairs" (for tuples of length
          2) and "sequences". They are read from left to right, and the order of
          the elements follows suit. This is to say that for any "i"th element
          where there exists an "i+1"th element, the "i"th element is understood
          to come earlier in the ordering.
        </Speak>
        <Speak>
          To more formally state this property, each element is given an "index"
          that denotes its position within the tuple. However, before we dive
          deeper into the formal construction of the tuple, lets see what we can
          do with them.
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        ("a", "b") \\\\
        (1, T) \\\\
        ((12, 4), ()) \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Not only can they except other instances, but they may also contain
          themselves. They can have only a Natural Number of elements make them
          up however, so no "negative" tuples.
        </Speak>
        <Speak>
          To really display the "collecting" abilities of the tuple type, here
          are some additional examples:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (+, -, /) \\\\
        (\\top, \\bot) \\\\
        (1 + 1 + 2, 3 * 4) \\\\
        (Integer, Boolean)
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Tuples can not only hold instances of types, but the operators that
          affect them, other major collections like realities (they are sets and
          we will see those next time), absurdities, propositions, and even
          other types!
        </Speak>
        <PhilosophyBreak
          qa={[
            {
              question:
                "How can the tuple hold an absurdity? Doesn't containing an absurdity not make sense?",
              answer: `
            The answer to this is both yes and no. No, it doesn't make sense, because an absurdity isn't something that can be
            interacted with in the same way other instances of types can. However, unlike our operators, a tuple does not need to
            interact with its contents in order to be "evaluated" as a tuple. It is simply a collection of instances, and as such, can hold anything.
            This means tuples can be used to organize and store information, even if that information is nonsensical. This is representative of the
            meta-logic we couldn't formally define in our logic system, but could still reason about informally. We could store a proposition in the
            first position of a tuple, and its evaluation in the second, and then reason about the tuple as a whole. Allowing us to organize propositions
            that can be evaluated, and those that can't, in a single collection!
            `,
            },
          ]}
        />
        <Speak>
          The ability to organize everything we've spoken of up until this point
          gives us a way to more formally display things we "hand-waved" away
          previously. Take for example graphing a function. We can store the
          inputs in the first position of a tuple, and the outputs in the
          second. By collecting all these pairs, we can begin to plot them on a
          coordinate plane and visualize the function!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (y, x^2) \\\\
        (0, 0) \\\\
        (1, 1) \\\\
        (2, 4) \\\\
        (3, 9) \\\\
        (4, 16) \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          By building tuples into on another, we can create larger data
          organizations for representing related data! Take for example an
          email! We can store the sender, the recipient, the subject, and the
          body in a single tuple! This allows us to keep all the information
          related to the email in a single instance!
        </Speak>
        <MathJax>{`$$
        (\\text{sender}, \\text{recipient}, \\text{subject}, \\text{body})
        $$`}</MathJax>
        <Speak>
          We could make it more exhaustive and include more order to increase
          the granularity of our data structure!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{header_info}=(\\text{sender}, \\text{recipient}, \\text{CC}, \\text{BCC}, \\text{Importance level}, \\text{subject}) \\\\
        \\text{body}=(\\text{text}, \\text{attachments}, \\text{signature}) \\\\
        \\text{email}=(\\text{header_info}, \\text{body})
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Hey this sort of looks like object-oriented programming if you squint
          really hard. Python designers agreed and actually implemented a larger
          system for tuples to make them more readable and useable for your
          programs! They are called named tuples!
        </Speak>
        <Speak>
          On a slightly more radical note, what if we used tuples to organize
          actions we were going to take? After all we saw that they could
          compound statements and operators that have yet to be used...
        </Speak>
        <Speak>
          Could we use tuples to represent programs?? Consider the idea that we
          could store, in order, every operation a program was going to evaluate
          and each line it was going to read in a tuple in order like below!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (\\text{do }x, \\text{do }y, \\text{do }z) \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          What if we wanted to make a distinction between actions taken by the
          interpreter for the language and evaluations made on each line? Such
          as representing conditional execution as a special tuple pattern like
          the following?
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (\\text{do }x, (\\text{cond}, (\\text{do }a), (\\text{do }b)), \\text{do }y) \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Believe it or not, we are not the first to come up with a similar
          idea! The programming language Clojure organizing itself into a ton of
          parenthesis that take on a tuple execution order appearance as we've
          described here!
        </Speak>
        <Speak>
          However, we are getting ahead of ourselves. Lets formally describe the
          properties and operations that allows us to interact, and interpret,
          the instances held within!
        </Speak>
        <Speak>
          A crucial operation that we took for granted with our previous
          instances becomes quite odd here. Consider the following use of
          equivalence.
        </Speak>
        <MathJax>{`$$
        (1, 2) = (2, 1)
        $$`}</MathJax>
        <Speak>
          These tuples are the exact same length and have exactly the same
          instances held within! However, they are not equivalent! This is due
          to the ordering of the instances as discussed earlier! This is to say
          that the order of the instances is crucial to the identity of the
          tuple! Thus the previous equivalence is false!
        </Speak>
        <MathJax>{`$$
        (1, 2) \\neq (2, 1)
        $$`}</MathJax>
        <Speak>
          Only when the lengths of a tuple are the same, the instances are
          identical, and they are held in the same order, can we say for sure
          that two tuples are equal to one another!
        </Speak>
        <MathJax>{`$$
        (a_1, a_2, a_3, \\ldots, a_n) = (b_1, b_2, b_3, \\ldots, b_n) \\equiv a_1 = b_1 \\land a_2 = b_2 \\land a_3 = b_3 \\land \\ldots \\land a_n = b_n 
        $$`}</MathJax>
        <Speak>
          This form of equivalence for tuples points out an interesting form of
          equivalence! Tuples must be "positionally equivalent" and that the
          equivalence must be "passed" through to the instances that make it up
          to ensure equivalence holds.
        </Speak>
        <Speak>
          Before, we took for granted that each instance was simply uniquely
          different from one another by definition. However, here we must test
          further for it here! We can no longer simply "look at the instances"
          to determine equality! Take the following example:
        </Speak>
        <MathJax>{`$$
        (\\_, \\_) = (\\_, \\_)
        $$`}</MathJax>
        <Speak>
          We cannot yet determine the equality of these tuples as the instances
          held within them are integral to their implementation of equality! The
          only exception to this rule is the empty tuple! This is because it has
          no instances to compare!
        </Speak>
        <MathJax>{`$$
        () = ()
        $$`}</MathJax>
        <Speak>
          Due to the empty tuples odd nature, it is given a special name and
          used to define many special properties in the use of tuples. It is
          called Unit.
        </Speak>
        <MathJax>{`$$
        ():Unit
        $$`}</MathJax>
        <Speak>
          This actually brings up an important point that needs to be made about
          tuples. How are they formally represented in our Type Theory? Is the
          following enough?
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (12):Tuple \\\\
        (12, 4):Tuple \\\\
        (12, 4, 3):Tuple \\\\
        (12, 4, 3, 2):Tuple
        \\end{matrix}$$`}</MathJax>
        <Speak>
          I suppose that it could be as it gets the point across that they are
          all tuples. However, the crucial elements of a tuple are not being
          readily represented by this notation! How can we represent the fact
          that tuples are integrally made up of other type instances? What about
          the ordering of those instances?
        </Speak>
        <Speak>
          As a result of this dilemma, the following notation is actually used
          to formally represent tuples!
        </Speak>
        <MathJax>{`$$
        (a, b, c, \\ldots, n): (A \\times B \\times X \\times, \\ldots, \\times N) \\\\
        $$`}</MathJax>
        <Speak>
          If you'd like to see an example of why using the naive type
          representation of data structures is a bad idea in programming,
          investigate how old Java generics worked and why the Diamond Operator
          needed to be added to fix an enormous number of type bugs in old Java!
        </Speak>
        <Speak>
          With this new notation, we can not only see the underlying types of
          the instances, but also the order in which we expect to see them
          appear within the tuple!
        </Speak>
        <Speak>
          Due to this notation, and how the ordering property react with other
          operators later, Tuples are also known as Product Types. If you are
          starting to feel that Tuples are sort of like multiplication, you are
          on the right track! However, we will see that come to fruition another
          time.
        </Speak>
        <Speak>
          Right now, we must investigate the operators that work between tuples!
          This also forces me to recognize that I have some explaining to do...
        </Speak>
        <Speak>
          Nearly as crucial as the definition of an operator itself is the type
          that is use to represent it! Now that we've seen tuples, we can
          actually formally recognize the type that represents operators!
        </Speak>
        <MathJax>{`$$
        \\text{~} = (A, B, C, \\ldots, N)\\to X = (A \\times B \\times C \\times \\ldots \\times N) \\to X
        $$`}</MathJax>
        <Speak>
          It was a combination of the implication operator and tuples of some
          length this whole time! Operators are represented by order inputs of
          other types that logically imply an output type! Given this clarity,
          we can now investigate the operators that work between tuples!
        </Speak>
        <Speak>
          The first operator we will investigate is the "concatenation" operator
          for tuples. This operator takes two tuples and combines them into a
          single tuple. It is represented by the following:
        </Speak>
        <MathJax>{`$$
        (a, b) + (c, d) = (a, b, c, d)
        $$`}</MathJax>
        <Speak>
          Since the operation being performed here feels most like simply
          "Adding" the two tuples to one another, the "+" symbol is used.
          However, it is represented many different ways and is very different
          property-wise compared to actual arithmetic addition.
        </Speak>
        <Speak>
          We can see for instance that the operation is non-commutative, yet it
          is associative:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (a, b) + (c, d) = (a, b, c, d) \\\\
        (c, d) + (a, b) = (c, d, a, b) \\\\
        ((a, b) + c) = (a, b, c) \\\\
        (a, (b + c)) = (a, b, c)
        \\end{matrix}$$`}</MathJax>
        <Speak>
          The concatenation operators type is large and complex yet legible:
        </Speak>
        <MathJax>{`$$
        + = (A \\times B \\times \\ldots \\times C) \\times (X \\times Y \\times \\ldots \\times Z) \\to (A \\times B \\times \\ldots \\times C \\times X \\times Y \\times \\ldots \\times Z)
        $$`}</MathJax>
        <Speak>
          The other operation we will be investigating is the Indexing operator.
          This operator allows us to simply a tuple down to just one of its
          instances by calling upon the instance stored at the given index of
          its position within the tuple. It is represented by the following:
        </Speak>
        <MathJax>{`$$
        (a, b, c, d) \\downarrow 2 = c
        $$`}</MathJax>
        <Speak>
          We begin labeling the indexes as zero and move from left to right in
          the tuple incrementing each index by one as each instance is
          encountered.
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (a, b, c, d, e, f, \\ldots, z) \\\\
        0, 1, 2, 3, 4, 5, \\ldots, 25
        \\end{matrix}$$`}</MathJax>
        <Speak>
          The Indexing operator takes the tuple being indexed into as its first
          argument (always), and its second argument as a Natural Number
          representing a valid index to pull the instance from.
        </Speak>
        <PhilosophyBreak
          qa={[
            {
              question: "Why not use all the integers?",
              answer:
                "Our typical system of counting indexes usually uses just the positive integers to prevent confusion, however, with some novel use of modular arithmetic, it is more than possible to define how all integers would map to a specific instance within a tuple! Python, for instance, uses negative integers to index from the end of the tuple! However, their implementation does not implement a fully modular system for indexing.",
            },
          ]}
        />
        <Speak>
          Here are some more examples of the Indexing operator in action:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (a, b, c, d) \\downarrow 0 = a \\\\
        (a, b, c, d) \\downarrow 1 = b \\\\
        (a, b, c, d) \\downarrow 2 = c \\\\
        (a, b, c, d) \\downarrow 3 = d \\\\
        (a, b, c, d) \\downarrow 4 = \\bot \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          The indexing operator is also represented formally by a large type.
          However, it is much simpler than concatenation due to the use of the
          Natural numbered index. It has the following type:
        </Speak>
        <MathJax>{`$$
        \\downarrow = (A \\times B \\times \\ldots \\times C) \\times \\mathbb{N} \\to X
        $$`}</MathJax>
        <Speak>
          Indexing by its very nature is non-commutative due to its special
          interpretation and is also not associative due to its inherently
          unchainable nature. This can be seen below:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (a, b) \\downarrow 0 = a \\\\
        (a, b) \\downarrow 1 = b \\\\
        0 \\downarrow (a, b) = \\bot \\\\
        ((a, (b, c)) \\downarrow 1) \\downarrow 0 = b \\\\
        (a, (b, c)) \\downarrow (1 \\downarrow 0) = \\bot \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          For now we will end our discussion of Tuples here, however, while
          their simplicity makes them straightforward, when paired with other
          operations, its ability to represent granular ideas allows for great
          complexity and expressibility.
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
