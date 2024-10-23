import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import ImageBox from "@/components/course/image-box"

export default function LectureNotes5() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN4",
          buttonColor: "primary",
          buttonName: "Primitive Beginnings",
          buttonSlug: "/cmsi-2820/ln4",
        },
        middle: {
          lectureId: "HW2",
          buttonColor: "success",
          buttonName: "Counting Sheep",
          buttonSlug: "/cmsi-2820/hw2",
        },

        right: {
          lectureId: "LN6",
          buttonColor: "primary",
          buttonName: "The Integers, The Booleans' Infinite In-laws",
          buttonSlug: "/cmsi-2820/ln6",
        },
      }}
    >
      <CourseBox>
        <TitleBox
          title="Meet The Booleans, Don't Worry There's only Two of Them"
          quote={`"Our mind is capable of passing beyond the dividing line we have drawn for it. Beyond the pairs of opposites of which the world consists, other, new insights begin." - Hermann Hesse `}
        />
        <Speak>
          With Type Theory as our base for mathematics moving forward, all we
          need to do now is build up our mathematics in terms of it to get a
          feel for the full representative abilities of our foundational system!
          Starting from the beginning and working upward, we will start with one
          of types Computer Scientists used to build modern computing.
        </Speak>
        <Speak>
          However, remember, the instance(s) inform the type, so we must figure
          out the instances we will be talking about and build from there.
          Today, we discuss two humble objects, True and False.
        </Speak>
        <Speak>
          Just on their own, what world can we discover, and what types can we
          conceptualize? Today we use them to fully inform the world of the
          Boolean type.
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        True:Boolean \\\\
        False:Boolean
        \\end{matrix}$$`}</MathJax>

        <Speak>
          However, before we continue I would like to bring up an important
          equality that we use in CS when speaking of the Booleans. True and
          False are used to represent logical operation, however in CS we prefer
          to use 0 and 1:
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        1:Boolean \\\\
        0:Boolean
        \\end{matrix}$$`}</MathJax>
        <Speak>
          But why bring numbers into this? Why should we allow 1 and 0 to be
          replaceable equivalents in the Booleans? Well it turns out that using
          our typical algebraic rules between just 0 and 1 seems to represent
          logical operation quite well!
        </Speak>
        <Speak>
          From here on out, to draw a distinction between the work we did in
          intuitionistic logic and what is about to come next, I will only use 1
          and 0 in reference to Boolean Algebra and True and False in reference
          to Logic. However, the line between these two will begin to close very
          quickly as we continue.
        </Speak>
        <TopicBreak title="Boolean Algebra" />
        <Speak>
          What is Boolean Algebra? I refer to it simply as "The arithmetic of 0
          and 1". What does "math" begin to look like when we only have these
          two numbers?
        </Speak>
        <Speak>
          We will discover this by beginning as we did back in grade school,
          what does plus, multiply, subtract, and divide do? We could
          investigate this purely through symbols in what you might call a more
          "algebraic" style investigation or would could also use a more visual
          style and investigate things "graphically". Today we will do both to
          ensure we build a strong foundation for the Boolean Type at large.
        </Speak>
        <Speak>
          We begin by algebraically investigating plus! We will use tables and
          our operators to investigate their interactions more closely, just as
          we did back then.
        </Speak>
        <TopicBreak title="Algebraic Investigation" />
        <Speak>
          Naturally, lets start by adding all the different combinations of 0
          and 1 together with our plus operator and see what happens! We can
          summarize this with the below graphic:
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        0+0=0 \\\\
        0+1=1 \\\\
        1+0=1 \\\\
        1+1=? \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Well wait a second, normally the last operation would result in 2, but
          since 2 doesn't exist here, where does plus go? Well, while it might
          seem like we have a lot of different options, we actually only have
          two, 0 or 1. After all, they are the only two things we have to work
          with. If we pick 0 then it kinda feels like we wrapped around and if
          we pick 1 then it feels like we didn't go anywhere at all!
        </Speak>
        <Speak>
          These two situations are very familiar to computer scientists as it is
          the issue of modularity or saturation. Today we will chose 1 and go
          with saturation, however, we will also see what happens when we use
          modularity in the future.
        </Speak>
        <Speak>
          Well, whats the intuition for 1+1 giving 1? We could say that the plus
          operator is simply always attempting to go in the positive direction.
          After all, it would be weird if the addition of two positive number
          resulted in less than before. We can summarize the table as this now:
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        0+0=0 \\\\
        0+1=1 \\\\
        1+0=1 \\\\
        1+1=1 \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Well that is odd, but maybe this is just plus right? Why don't we try
          the same thing for "multiply" now:
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        0*0=0 \\\\
        0*1=0 \\\\
        1*0=0 \\\\
        1*1=1 \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Luckily, it seems nothing is out of the ordinary here. As expected,
          the only way for us to receive 1 is through multiplying it with
          itself! The rest are just 0's. How about "subtract" now, maybe it will
          work out in a similarly good way!
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        0-0=0 \\\\
        0-1=? \\\\
        1-0=1 \\\\
        1-1=0 \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Oh no, we have the same situation as addition. We have encountered a
          situation where it isn't obvious whether to pick 0 and 1 again. Well,
          continuing with the hopes of saturation, we'll have to say they trying
          to take away from nothing is simply more nothing and go with 0:
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        0-0=0 \\\\
        0-1=0 \\\\
        1-0=1 \\\\
        1-1=0 \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Well, we've gotten this far, lets see how "divide" ends up!
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        0/0=Undefined \\\\
        0/1=0 \\\\
        1/0=Undefined \\\\
        1/1=1 \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Well, this is probably the worst one by far. We can't seem to fully
          rely on our algebra background anymore to justify this one. We know
          well that any divisions by zero should not be touched with a 10 foot
          pole. Since Algebra has broken down on us, maybe we can rely on our
          modern context that booleans are typically used to define logic, but
          why is this? Why do 0 and 1 in this weird system represent False and
          True respectively?
        </Speak>
        <Speak>
          If they do represent True and False, lets replace them in our tables:
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        False+False=False \\\\
        False+True=True \\\\
        True+False=True \\\\
        True+True=True \\\\
        \\end{matrix}$$`}</MathJax>
        <MathJax>{`$$ \\begin{matrix}
        False*False=False \\\\
        False*True=False \\\\
        True*False=False \\\\
        True*True=True \\\\
        \\end{matrix}$$`}</MathJax>
        <MathJax>{`$$ \\begin{matrix}
        False-False=False \\\\
        False-True=False \\\\
        True-False=True \\\\
        True-True=False \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Ignoring division as it seems to have gone nowhere, there happens to
          be something very familiar about the tables for "plus" and "multiply".
          They look identical to Conjunction and Disjunction!
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        +\\equiv \\lor \\\\
        *\\equiv \\land
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Thats amazing! No wonder we use this at the heart of our computers,
          with just typical algebra (Which we make Computers do for us all the
          time) we have a way to encode logic directly for free!
        </Speak>
        <Speak>
          What about that last table though? It doesn't seem to look like
          anything we've seem before... It almost looks as if it is implication
          but negated? Wait, where is negation!
        </Speak>
        <Speak>
          We saw in logic that Negation was very valuable as it helped represent
          negative information! It was a crucial portion of our logic, what
          could it be here?
        </Speak>
        <Speak>
          We can't really use our typical algebraic negation as that would imply
          negative numbers, which we don't have in this current system! However,
          in a binary system it is actually quite simple to figure out Negation
          as it can be simply reasoned by answering the following question, "In
          a binary system of 1 and 0, if I am 1, then what is NOT 1?" Reasonably
          the only thing that isn't 1 is zero! This logic works in vice versa
          too!
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        -0=1 \\\\
        -1=0 \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          While I suppose at this point it could be pertinent to use all our
          algebraic operators to see if we can uncover more logic hidden in just
          0 and 1, but lets give another strategy a shot. Why don't we
          graphically analyze 1 and 0 instead!
        </Speak>
        <Speak>
          However, to do this we will need to define a robust visual system.
          Luckily, John Venn did that work back in the 1880's! He invented
          Eulerian Circles (Well actually he adapted an idea from about 100
          years of work done by previous mathematicians)! Don't know what those
          are? Well, the name he gave them never stuck around, instead his work
          got named after him! We will now see how to use Venn diagrams for
          their original purpose, Logic!
        </Speak>
        <TopicBreak title="Graphical Investigation" />
        <Speak>
          How should we use Venn diagrams to investigate boolean algebra? Well,
          if we began using variables, like x or y, as we typically would in
          math then we need a circle for each variable! Below are the diagrams
          used for one and two variables respectively:
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/1varvenn.png",
              caption:
                "Above is the Venn representation of a single variable. The distinct regions represent the possible options the variable can take on!",
            },
            {
              url: "/cmsi-2820/2varvenn.png",
              caption:
                "Above is the Venn representation of two variables. The distinct regions represent the possible options the variables can take on!",
            },
          ]}
        />
        <Speak>
          Well, how do we represent the value our variables take on? Well if a
          region is highlighted, it refers to which region is currently
          representing a 1. With this we could see the following the case of
          just one variable x taking on either 0 or 1:
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/1venn.png",
              caption: "Above is the Venn representation of x being 1",
            },
            {
              url: "/cmsi-2820/0venn.png",
              caption: "Above is the Venn representation of x being 0",
            },
          ]}
        />
        <Speak>
          And the following is what we could see for a two variable situation.
          By highlighting each region we can attain each combination of 1 and 0:
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/10venn.png",
              caption:
                "Above is the Venn representation of x being 1 and y being 0",
            },
          ]}
        />
        <Speak>
          Neat! With this system in place, how can we begin to use it to
          describe our operators? Well, we can actually color multiple regions
          and describe the relationship being shown between the variables that
          allow that form of highlighting to be valid!
        </Speak>
        <Speak>
          By highlighting just the inner most portion of the venn diagram, we
          can display only what represents what is both x and y! We can also
          describe the exterior "blank" region to find its negation, which is
          exactly what is not x and y!
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/xandyvenn.png",
              caption:
                "Above is the Venn representation of x and y with its negation and its dual",
            },
          ]}
        />
        <Speak>
          However, you may have imagined calling that outer region something
          different! Maybe you thought of it as what is not x or not y! Does
          this mean that those statements are equal logically? Yes! It's
          referred to as DeMorgan's Laws and they formalize the duality between
          conjunction and disjunction!
        </Speak>
        <MathJax>{`$$ \\begin{matrix}
        \\neg X \\land \\neg Y \\equiv \\neg (X \\lor Y) \\\\
        \\neg X \\lor \\neg Y \\equiv \\neg (X \\land Y)
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This is great! Our graphical investigation seems to be revealing much
          more than our algebraic one did. However, could our algebraic
          investigation have done exactly the same? Could we prove that these
          two investigations really are looking at the same thing? Lets take the
          diagram below:
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/xoryvenn.png",
              caption:
                "Above is the Venn representation of x + y = w and how each region relates to our tables from before.",
            },
          ]}
        />
        <Speak>
          What about a diagram of 3 variables? Does the 3 column table hold up?
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/3varvenn.png",
              caption:
                "Above is the Venn representation of 3 variables and how each region relates to every combination of each variable in a table.",
            },
          ]}
        />
        <PhilosophyBreak
          qa={[
            {
              question:
                "What is the major benefit of even connecting our algebra and Venn diagrams?",
              answer:
                "It actually points toward a more general conclusion about how patterns emerge. Interestingly, it is NOT the system of evaluation that determines the pattern, but rather it seems that the pattern determines the operation of the system! This is great as it concludes that any method of investigation or operation, when performed correctly, will produce the same patterns as another when talking about the same instances. We are discovering different looks for our types!",
            },
            {
              question:
                "Is the is process general to everything or was it just convenient here?",
              answer:
                " This process of relating two separate systems is called a reducibility proof and they are used all the time in higher level mathematics to search for more solutions to really hard problems. Some times all it takes to solve a problem is a new perspective on it and that is exactly what makes these proofs so powerful!",
            },
          ]}
        />
        <Speak>
          These mechanisms are equivalent and so we can actually use one to
          solve problems in the other! For example, here you can ask "How many
          distinct regions can be made with n boolean variables?" and that is
          exactly (Not related, but literally exactly) the same as asking "how
          many distinct numbers can be encoded within an n-digit binary number?"
        </Speak>
        <Speak>
          With that amazing fact out of the way, lets look further at two of the
          interesting properties of our instances and their operations!
        </Speak>
        <Speak>
          We will look at what's called the First Absorption Law! It displays a
          powerful simplification technique between Conjunctions and
          Disjunctions in compound propositions here in boolean algebra. It
          looks like the following in algebra and Venn diagrams:
        </Speak>
        <MathJax>{`$$
        X \\land (X \\lor Y) \\equiv X
        $$`}</MathJax>

        <ImageBox
          images={[
            {
              url: "/cmsi-2820/firstabsorpvenn.png",
              caption:
                "Above is the Venn representation of the First Absorption Law happening in multiple stages to help display whats happening.",
            },
          ]}
        />
        <Speak>
          Amazing right? How a conjunction can simply "eat" a disjunction like
          that. More interestingly, using our next law, we can have our
          variables "cancel" out, leaving us only with a direct answer! The
          first Complement Law defined what happens when complements come into
          contact over a Conjunction. Lets see both interpretations view of this
          law!
        </Speak>
        <MathJax>{`$$
        X \\land \\neg X  \\equiv 0
        $$`}</MathJax>
        <MathJax>{`$$ \\begin{matrix}
        X & \\neg X & X \\land \\neg X \\\\
        0 & 1 & 0\\\\
        1 & 0 & 0\\\\
        0 & 1 & 0\\\\
        1 & 0 & 0\\\\
        \\end{matrix}$$`}</MathJax>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/1varvenn.png",
              caption:
                "Above is the Venn representation of the First Complement Law.",
            },
          ]}
        />
        <Speak>
          There are many more cool interactions to find and discover! (Some of
          which you will self discover in the Homework!) This ends our look at
          the booleans now that we have a very strong foundation to understand
          and investigate new ideas with them for the future!
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
