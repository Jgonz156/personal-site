import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import ImageBox from "@/components/course/image-box"

export default function LectureNotes9() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN8",
          buttonColor: "primary",
          buttonName: "Getting our Types in a Row",
          buttonSlug: "/cmsi-2820/ln8",
        },
        middle: {
          lectureId: "HW3",
          buttonColor: "success",
          buttonName: "Storage Wars",
          buttonSlug: "/cmsi-2820/hw3",
        },
        right: {
          lectureId: "LN10",
          buttonColor: "primary",
          buttonName: "Settling Down",
          buttonSlug: "/cmsi-2820/ln10",
        },
      }}
    >
      <CourseBox>
        <TitleBox
          title="Settling In"
          quote={`"Disorganization can scarcely fail to result in efficiency" - Dwight D. Eisenhower`}
        />
        <Speak>
          Recall Tuples. We investigated the way they took on instances of other
          types. They were ordered, finite in nature, and their uniqueness came
          from positional equality. We even saw how they could be used to
          represent many different structures we might see day to day.
        </Speak>
        <Speak>
          However, Tuples are not the only way to collect things together. Who
          says everything has to be ordered? When you throw things in a grocery
          basket do you ever care about which thing you grabbed first or that
          they need to be laid out in order? No! What about being finite? What
          if we would like to store all of our integers together? What if we
          only cared about whether we have everything that we needed? Like a
          checklist?
        </Speak>
        <Speak>
          Clearly, Tuples are not the "end all be all" of collecting things and
          those questions posed before are the introducing intuition behind the
          Set!
        </Speak>
        <Speak>
          A Set is a collection without order. It also, due to the extensive
          research in the space, does not mind being filled with infinite
          things. However, determining equality is unique due to one final
          property called "membership" that Sets have, but before we get ahead
          of ourselves, lets see some!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\{1,2,3\\} \\\\
        \\{True, \\bot\\} \\\\
        \\{\\{\\},\\{\\text{"dog"}\\}\\}
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Not going to lie, these look identical to Tuples thus far... Well,
          they might, however, they have no internal order! So it may seem
          bizarre but the following is true:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\{1,2,3\\} = \\{3,2,1\\} = \\{2,1,3\\} =\\{3,1,2\\} \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Alright, thats a little odd but no big deal, this just means that
          there are many different ways to right the same exact set! However,
          what happens if we have duplicates?
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\{1,1\\} = \\{1,1\\} = \\{1,1\\} =\\{1,1\\} \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          You can't really tell the difference between which set is a different
          order of the two different 1's and which one is the same two 1's in
          the same order. Well don't worry, such dilemmas don't matter any way
          since Sets also don't allow duplicates!
        </Speak>
        <Speak>
          This means that the set of twelve 1's is exactly the same as the set
          of any number of 1's!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\{1\\} = \\{1,1\\} = \\{1,1,1\\} =\\{1,1,1,1\\} \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          There is debate as to whether it is even improper to write a set with
          duplicates in it in the first place since they don't allow duplicates,
          however, it will be useful for us to allow this (at least when writing
          them) because Sets often come in when trying to address duplicates in
          the first place!
        </Speak>
        <Speak>
          Regardless, it is still important to note that the above equality of
          nothing but sets filled with 1 is most properly written as just the
          following:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\{1\\} = \\{1\\} = \\{1\\} =\\{1\\} \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This is due to Sets membership rules. Once you are in, you don't need
          to be restated!
        </Speak>
        <Speak>
          So far, as compared to Tuples, Sets seems to be the exact opposite way
          to collect things (In terms of the Tuple properties we saw). Rather
          than being ordered they are unordered, rather than being finite (or of
          fixed length), they are changing and infinite, and rather than
          allowing for duplicates, they reject them!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        Tuples & vs & Sets \\\\
        (a,b,c) & & \\{a,b,c\\} \\\\
        \\text{ordered} & & \\text{unordered} \\\\
        \\text{duplicates} & & \\text{no duplicates} \\\\
        \\text{finite} & & \\text{infinite} \\\\
        \\text{fixed length} & & \\text{changing length} \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          The last two properties are interesting as it seems like there is no
          real reason to force tuples and sets to be different there. However,
          in CS, we like to keep the dichotomy going by keeping Tuples opposed
          to Sets. We will reflect that in our math moving forward however it
          must be said that is a preference and is by no means required.
        </Speak>
        <Speak>
          With all this being said, equality must be very interesting to define
          for Sets right? Tuples were straightforward due to their order keeping
          everything directed. Well Sets have a simply rule for equality based
          on membership. This Membership Equality simply states that two Sets
          are identical when they contain exactly the same members/instances.
        </Speak>
        <Speak>
          To write this out formally we would need some operator or some visual
          notation to define this equality. The closest operator we have learned
          of so far, the downward arrow, doesn't make sense here! Even if it
          wasn't restricted to just Tuples, there is no order to a set so
          "indexing" one doesn't make sense!
        </Speak>
        <Speak>
          Looks like we need some new mathematical "Machinery" to accomplish
          this task and so we introduce a new operator called epsilon!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        1 \\in \\{1,2,3\\} = True \\\\
        2 \\in \\{1,2,3\\} = True \\\\
        3 \\in \\{1,2,3\\} = True \\\\
        4 \\in \\{1,2,3\\} = False
        \\end{matrix}$$`}</MathJax>
        <Speak>
          The Epsilon operator "checks" to see if the instance on the left is
          within the set on the right! It does not care about where the instance
          is, just that it can be found in the set somewhere. As a result it is
          more commonly called "in" or "is a member of" rather than its official
          name. For the above, we would say, "1 is in {"{1, 2, 3}"}" or that "1
          is a member of {"{1, 2, 3}"}".
        </Speak>
        <Speak>
          With this new way to check for membership, we can define equality
          between sets!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{where } A = \\{a_1,a_2,\\ldots, a_n\\} \\land B = \\{b_1,b_2,\\ldots, b_m\\} \\\\
        \\{a_1,a_2,\\ldots, a_n\\} = A = B = \\{b_1,b_2,\\ldots, b_m\\} \\\\
         \\equiv \\\\
         a_1 \\in B \\land a_2 \\in B \\land \\ldots \\land a_n \\in B \\\\
         \\land \\\\
         b_1 \\in A \\land b_2 \\in A \\land \\ldots \\land b_m \\in A \\\\
         \\land \\\\
         n = m
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Woah, that is cumbersome to say the least. However, it is stating (in
          a very unconcise manner) that every single instance in A must also be
          in B and that every instance in B must be in A and that the number of
          instances in both must match.
        </Speak>
        <Speak>
          If we think closely about this definition spending time declaring
          membership both ways rather than just one way we can investigate
          something else about sets. Why wasn't it good enough to just say that
          All the elements in A were in B? Well what if B had more in it!
        </Speak>
        <Speak>
          If we don't check both ways we would only being guaranteeing that all
          of A could be made from the members of B! This in and of itself is
          actually a very useful thing to know so its also an operator! Its
          called the subset operator.
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{where } A = \\{a_1,a_2,\\ldots, a_n\\} \\land B = \\{b_1,b_2,\\ldots, b_m\\} \\\\
        A \\subset B \\\\
         \\equiv \\\\
         a_1 \\in B \\land a_2 \\in B \\land \\ldots \\land a_n \\in B \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          As we can see, it only guarantees that A's elements can be found
          within B and thats it! Could we use this to rewrite and simplify our
          equivalence rule?
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{where } A = \\{a_1,a_2,\\ldots, a_n\\} \\land B = \\{b_1,b_2,\\ldots, b_m\\} \\\\
        A = B \\equiv A \\subset B \\land B \\subset A ?
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This might feel a bit odd to say however due to subset seemingly
          implying that A is smaller than B, and vice versa, so how could they
          come together to be equal? What about this situation?
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\{1\\} \\subset \\{1\\}?
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Well this doesn't feel right. How could the one on the left be a
          subset if its perfectly equal! It should be the equals operator there
          not the subset operator! Well, just like the analogous issue of
          defining number equality by saying something like this:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        a:int = b:int \\equiv a < b \\land b < a
        \\end{matrix}$$`}</MathJax>
        <Speak>
          it becomes clear that we need a version of our subset operator that is
          inclusive of its "endpoint" just like with less than and greater than!
          So just like how there is less than or equal to and greater than or
          equal to, there is subset or equal to as well! And that is our fix to
          trying to define equality in terms of subsetting!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        a:int = b:int \\equiv a \\leq b \\land b \\leq a
        \\end{matrix}$$`}</MathJax>
        <MathJax>{`$$\\begin{matrix}
        \\text{where } A = \\{a_1,a_2,\\ldots, a_n\\} \\land B = \\{b_1,b_2,\\ldots, b_m\\} \\\\
        A = B \\equiv A \\subseteq B \\land B \\subseteq A
        \\end{matrix}$$`}</MathJax>
        <Speak>Well thats a little more compact than before isn't it?</Speak>
        <PhilosophyBreak
          qa={[
            {
              question:
                "Couldn't we do something similar for the Tuple? Why didn't we see 'sub-tuples'?",
              answer: `This is a very fair question as there doesn't seem to be anything preventing 
              us for doing the exact same thing for tuples. In fact that investigation could be 
              just as interesting as being ordered would result in a plethora of new operators 
              for saying there are ordered and unordered subtuples. It is simply a matter of history
              that resulting in sets being more "fleshed out" since they were used to justify all
              of mathematics. So the answer is that we could do exactly the same for tuples as well, 
              however its just not done traditionally.`,
            },
          ]}
        />
        <Speak>
          Without having the same properties as one another, its probably easy
          to say that Sets can't really easily represent the same objects we saw
          Tuples represent. To bring back the email example, we could use a set
          to store all the same pieces as before, however, now they can go in
          any order? I guess sometimes I visually jump around the email, however
          there is a set order to look at it in so it would be very odd to use a
          set.
        </Speak>
        <Speak>
          As it goes for that cool way to represent a program, that doesn't work
          here either unfortunately. Since we can't define order, there is no
          way to ensure certain operations happen before others. However, if you
          had a set of operations where order didn't matter sets would be
          perfect!
        </Speak>
        <Speak>
          With this odd distinction made, you could possibly represent the
          parallelism in modern computer programs as a set!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\{\\text{Browser, Spotify, Email, Minecraft, Peripheral Software, Discord, etc}\\} \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This could get especially interesting if we combined tuples with sets
          to create minor order in the unorderedness or even unorderedness in
          the order. However, once again we are getting ahead of ourselves.
        </Speak>
        <Speak>
          Its valuable to know that there are multiple valid ways to create sets
          that aren't just listing out what is inside of them plainly. There are
          two other methods that are commonly used to create sets: Semantic
          Definitions, and Set Builder Notation.
        </Speak>
        <Speak>
          We will start by looking at semantic definitions. These are very
          straightforward as it literally means to just write out a definition
          in english to create a rule for what is a member, and what isn't, for
          the set. For instance, the sentence below could be used to define a
          set we are already very familiar with:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\{\\ldots, -2, -1, 0, 1 , 2, \\ldots\\} \\\\
        \\equiv \\\\
          \\text{"The set of all integers"}
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This is a very simple way to define a set and is very useful for
          defining sets that are very large or infinite. However, it is not the
          most precise way to define a set. For instance, how would you define
          the set of all even numbers? We could use a that last question to
          create the semantic definition, "The set of all even numbers", but
          this is not very "visual".
        </Speak>
        <Speak>
          In cases where writing a rule in mathematical notation is easier than
          writing out the english definition or simply writing out the entire
          set, set builder notation is used!
        </Speak>
        <Speak>
          It simply defines what a member looks like via some large logical
          expression that evaluates to true or false. for every instance where
          the logical expression is true, that instance is a member of the set.
          For every instance where the logical expression is false, that
          instance is not a member of the set. It looks like the following for
          that previous example set we brought up:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{"The set of all even integers"} \\\\
        \\equiv \\\\
          \\{a~|~a~mod~2=0 \\land a:int\\}
        \\end{matrix}$$`}</MathJax>
        <Speak>
          In this notation, the left hand side of the "|" is the "shape" of the
          instance in the set. We aren't doing anything complicated here other
          than integers, but it could also be a another instance of a type,
          tuple, set, or other nested data structure built up of other types.
          The right hand side of the "|" is the logical expression used as the
          rule to test for membership.
        </Speak>
        <Speak>
          Just for completions sake you might also see set builder notation
          mixed with semantic definition on occasion when it is more valuable to
          simply writ out a english sentence for the logical expression such as
          the below:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{"The set of all even integers"} \\\\
        \\equiv \\\\
          \\{a~|~a~mod~2=0 \\land a:int\\} \\\\
          \\equiv \\\\
          \\{a~|~\\text{"2 divides a"}\\}
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Given that these notations makes it quite difficult to determine the
          actual size of the set (As it trades a clearly defined number of
          members for an easier membership testing process) it is important to
          have a manner to understand the size of sets. This is done with the
          Cardinality operator.
        </Speak>
        <Speak>
          The cardinality operator simply exposes the underlying Cardinality of
          the set, which is a property of all sets that is simply defined as its
          number of members, or put another way, its length. It is written as
          the following:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        |\\{1,2,3\\}| = 3 \\\\
        |\\{\\}| = 0 \\\\
          |A| = n
        \\end{matrix}$$`}</MathJax>
        <Speak>
          It looks like "absolute value" but it is simply referring to the
          number of members. An entire operator is defined for this because it
          is very common to need to make logical/mathematical statements
          comparing the sizes of sets. For instance, if we wanted to say that
          two sets were the same size, we could use the following:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        |A| = |B| \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This might seem trivial, but the more we know about A and B, the more
          interesting this gets. Like for instance, to get your brain working
          take a look at the following statements:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        |\\{a~|~a~mod~2=0\\}| = |\\{\\ldots, -2,-1,0,1,-2, \\ldots\\}| \\\\
    |\\{a~|~\\text{"a is even"} \\}| = |\\{a~|~a:int\\}| \\\\
        |\\{\\ldots, -4, -2, 0, 2, 4, \\ldots\\}| = |\\mathbb{Z}|
        \\end{matrix}$$`}</MathJax>
        <Speak>
          They are all saying the same thing, just throwing in some practice
          with our notations! However, the underlying question is a very
          interesting one and it is the very type of question that George Cantor
          would be exploring during the creation of Set Theory!
        </Speak>
        <Speak>
          Are these statements true or false? It may seem simple to say that
          clearly the set of all the even integers is exactly half the size of
          the set of all integers, however they are both infinite sets so things
          can be tricky. We unfortunately do not currently have the tools to
          prove these statements true or false, however, it is a very
          interesting question to think about for the current moment!
        </Speak>
        <Speak>
          With these new operators and notations shown, we can now compare sets,
          in any of their notations, and subsets for equality. We will begin to
          investigate even more operators that can be used to manipulate sets
          next time!
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
