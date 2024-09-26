import { MathJax } from "better-react-mathjax"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import Speak from "../../components/speak"
import PhilosophyBreak from "../../components/philosophy-break"
import TitleBox from "../../components/title-box"

export default function LectureNotes9() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        middle: {
          lectureId: "HW3",
          buttonColor: "success",
          buttonName: "Collections Agency",
          buttonSlug: "/cmsi-2820/hw3",
        },
      }}
    >
      <CourseBox>
        <TitleBox title="Settling In" quote={`"" - `} />
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
        \\{\\{\\},\\{"dog"\\}\\}
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
      </CourseBox>
    </CoursePage>
  )
}
