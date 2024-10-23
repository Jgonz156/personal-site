import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import ImageBox from "@/components/course/image-box"
import CodeBox from "@/components/course/code-box"

export default function LectureNotes6() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN5",
          buttonColor: "primary",
          buttonName: "Meet The Booleans, Don't Worry There's only Two of Them",
          buttonSlug: "/cmsi-2820/ln5",
        },
        middle: {
          lectureId: "HW2",
          buttonColor: "success",
          buttonName: "Counting Sheep",
          buttonSlug: "/cmsi-2820/hw2",
        },

        right: {
          lectureId: "LN7",
          buttonColor: "primary",
          buttonName:
            "Division without Decimals? Positive Numbers that Add to Zero? What is this Place?!?",
          buttonSlug: "/cmsi-2820/ln7",
        },
      }}
    >
      <CourseBox>
        <TitleBox
          title="The Integers, The Booleans' Infinite In-laws"
          quote={`"It's on the strength of observation
and reflection that one finds
a way. So we must dig
and delve unceasingly." - Claude Monet`}
        />
        <Speak>
          The other day we used operators as a way to intuitively discover why
          boolean algebra, a system for logic, could be completely represented
          by algebraic operations on just 1 and 0. However, what about the
          operators themselves?
        </Speak>
        <Speak>
          This allowed us to discover the Boolean Type, but what about we go the
          other way around and use a type we have pre-existing knowledge of to
          introspectively discover more about what operators even are.
        </Speak>
        <Speak>
          Today we use the investigate operators using The Integers. While we
          won't get to define operators directly today (We need the Lambda
          Calculus for that), we will discover much about them in the way of
          properties and patterns.
        </Speak>
        <Speak>
          We begin by clarifying the Integers. We will be discussing all whole
          numbers out to "negative infinity", 0, and all whole numbers out to
          "positive infinity".
        </Speak>
        <MathJax>{`$$
        Integers = \\{-\\infty , ..., -2,-1,0,1,2, ..., \\infty\\}
        $$`}</MathJax>
        <Speak>
          Now, where do we begin with operators? They come in many "flavors" but
          the most common are binary. This means they take two instances to
          function and they reduce to some singular instance.
        </Speak>
        <MathJax>{`$$
        a \\sim b = ~ ...
        $$`}</MathJax>
        <Speak>
          The tilde in the above statement is meant to be a placeholder for
          other binary operators. We can see some real examples below that we
          are familiar with in terms of the Integers:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        a + b = ~ ... \\\\
        a - b = ~ ... \\\\
        a * b = ~ ... \\\\
        a \\div b = ~ ... \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          However, just to ensure we don't restrict ourselves too greatly, just
          know that the binary operators does not need to appear "infix" which
          means that it is in between the two instances. It could also be
          prefix, or suffix:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        \\text{prefix addition: } (+~a~b) = ~ ... \\\\
        \\text{suffix division: } (a~b~\\div) = ~ ... \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          However, we never see addition and division like this, it is possible
          and below we can see some "actual" operators that are not infix:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        log_b(a) \\\\
        a^b \\\\
        \\frac{a}{b}
        \\end{matrix}$$`}</MathJax>
        <Speak>
          In the event of logarithms and division we have to be careful in an
          Integer context as they are not closed over the integers (We will see
          what that means later!), but this displays a good visual for the
          unique visual representation operators can take on.
        </Speak>
        <Speak>
          I guess you could argue about the last two, as the operator sorta
          "shows" up in between but this is a game of semantics we don't need to
          investigate today. This is just an aside to display the visual
          creativity of many operators.
        </Speak>
        <Speak>
          There are also Unary operators, like negation and factorials, that we
          are familiar with:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        -a \\\\
        a! \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          However, operators can be defined to take "n" instances as input!
          While it doesn't work exclusively with the Integers, if we include our
          Booleans we can actual see a widely used operator with three inputs!
          It's called the ternary operator:
        </Speak>
        <MathJax>{`$$\\text{Ternary: } a~?~ b ~:~c$$`}</MathJax>
        <Speak>
          Wait, seeing this new operator points out something obvious but
          interesting. We've learned to ingrain instructions with symbols like +
          and *, however, the symbol tells you nothing about what the operation
          actually is!
        </Speak>
        <Speak>
          What does the ternary actually do? This is where type information is
          extraordinarily useful! If I were to add type information, we get a
          better idea as to what its doing!
        </Speak>
        <MathJax>{`$$\\text{Ternary: } a:Boolean~?~ b:Instance ~:~c:Instance$$`}</MathJax>
        <Speak>
          While cluttered, now we can begin to see what's happening! However, we
          can't define it formally without the Lambda Calculus later, so for
          now, we will accept it as is.
        </Speak>
        <Speak>
          As we can begin to see, there is a lot to learn about operators, so
          lets see how much we can uncover with a thorough investigation of the
          simplest one within the Integers: Addition!
        </Speak>
        <TopicBreak title="Addition?" />
        <Speak>
          We start by asking ourselves, what is addition? That's easy right? Its
          just adding multiple instances together! Well what does that mean?
          What's adding?
        </Speak>
        <Speak>
          Turns out that for a very long time, addition was understood in a very
          informal manner. Through either counting, or using a number line we
          could discover what adding numbers together did. This process was
          self-contained however, and not until abstract algebra came along did
          we have a formal way of discussing the "addition" we use with numbers
          nowadays.
        </Speak>
        <Speak>
          In fact, the intuition that addition can be defined multiple ways
          should make sense after seeing that boolean venn diagrams and our
          logical algebra preformed the same actions.
        </Speak>
        <Speak>
          Lets look at addition in terms of counting as that is where you
          probably first learned how to add. For our simple counting I will use
          dots and groups. The idea is that a field of dots can be drawn and the
          groups bring dots together.
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/dotsandgroups.png",
              caption:
                "The image above displays our dots on the left and what groups look like on the right.",
            },
          ]}
        />
        <Speak>
          With this, lets begin counting dots by grouping them together!
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/dotsandgroups3.png",
              caption:
                "The image above displays counting dots by grouping them together. In this case the dots are brought together to form a 3.",
            },
          ]}
        />
        <Speak>
          So this process of grouping is addition? Ok not so bad. So we can say
          addition is just bringing things together? In a sense yes! So lets
          look at more addition in this little system.
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/dotsandgroupsaddition.png",
              caption:
                "The image above displays Addition between pre-made dot groups, by joining them together.",
            },
          ]}
        />
        <Speak>
          Wait, bringing groups together also feels like addition too. This is
          because what we did before is counting all the elements in a group
          (Which is analogous to adding one over and over for each dot). This
          addition however is bring together two separate counts from before.
        </Speak>
        <Speak>
          Lets say for the sake of argument however that you don't appreciate
          this form of addition. Its not "real" addition, you say in your head.
          Well lets upgrade to something else, the number line!
        </Speak>
        <Speak>
          Addition here is exactly what we learned in grade school. We start at
          some point on the line and then hop along the line for the number we
          are given! Thats addition right?
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/numberlineaddition.png",
              caption: "The image above displays Addition with number lines.",
            },
          ]}
        />
        <Speak>
          If that were the case however, why can we "make sense" of the previous
          example? If addition is directly defined to only be about number on
          the number line than what did we do before?
        </Speak>
        <Speak>
          The answer is that we are definitely doing "addition" just not the
          same form of addition. But if there are different forms than what is
          addition?
        </Speak>
        <Speak>
          The answer to this issue is that addition is actually a more general
          process than we give it credit. Than what is it actually?
        </Speak>
        <Speak>
          Modern abstract algebra gives us the tools to investigate this.
          However, it gives a potentially non-intuitive answer. Addition isn't
          necessarily just the sequence of steps you go through to "add" things
          together. Instead it is the collection of properties shared by all
          operations that seem to "add" things together.
        </Speak>
        <Speak>
          Just as we did with Venn diagrams and Boolean Algebra, lets see these
          properties in action in all the systems we've seen so far. The first
          to investigate is Associativity.
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/associativity.png",
              caption:
                "The image above displays Associativity within grouping dots, number lines, and typical algebra.",
            },
          ]}
        />
        <Speak>
          Informally, associativity is defined as a property of an operator that
          specifically states that the order of performing the operation amongst
          more than two instances doesn't matter.
        </Speak>
        <Speak>
          Formally it is defined by the following statement about any binary
          operator "~":
        </Speak>
        <MathJax>{`$$(a\\sim b) \\sim c \\equiv a\\sim (b \\sim c)$$`}</MathJax>
        <Speak>
          The second property is Commutativity. It appears as the following in
          our three previous systems.
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/commutativity.png",
              caption:
                "The image above displays Commutativity within grouping dots, number lines, and typical algebra.",
            },
          ]}
        />
        <Speak>
          Informally, commutativity is defined as a property of a binary
          operator whose operation is not directional. Put another way, the
          order of instances around the operator doesn't matter.
        </Speak>
        <Speak>
          Formally it is defined by the following statement about any binary
          operator "~":
        </Speak>
        <MathJax>{`$$a\\sim b \\equiv b \\sim a$$`}</MathJax>
        <Speak>
          The third property is Identity. It appears as the following in our
          previous systems.
        </Speak>
        <ImageBox
          images={[
            {
              url: "/cmsi-2820/identity.png",
              caption:
                "The image above displays Identity within grouping dots, number lines, and typical algebra.",
            },
          ]}
        />
        <Speak>
          Informally, Identity is defined as a property on a binary operator
          that has a special instance that when operated with any other instance
          results in the other instance being "unaffected".
        </Speak>
        <Speak>
          Formally it is defined by the following statement about any binary
          operator "~" with some special instance "i":
        </Speak>
        <MathJax>{`$$a\\sim i \\equiv a$$`}</MathJax>
        <Speak>
          The last property we will look at is Closure. Closure is an important
          property for us as it is defined via our type information! It is the
          hardest to show in our previous systems as it is a property that is
          impossible to display without seeing every single combination of our
          operator being used.
        </Speak>
        <Speak>
          Informally, Closure is a property on an operator that says that the
          operator, given any combination of instances of the same type, can
          never produce an instance of another type. Put another way, it must
          always produce an instance of the same type as its input, hence it is
          "closed" as it cannot "escape" its parent Type.
        </Speak>
        <Speak>
          Formally, it can be defined with the following statement in Type
          Theoretic notation about some operator "~" and some type "A".
        </Speak>
        <MathJax>{`$$\\sim : (A~x~A~...) \\to A$$`}</MathJax>
        <Speak>
          While this notation is foreign to us at the moment, it is simply a
          concise way of saying that any number of input instances of some
          shared type "A" when used with "~" will always produce some other
          instance within Type "A".
        </Speak>
        <Speak>
          Addition between Integers cannot produce anything other than another
          Integer so it is "closed" or displays the closure property over the
          integers.
        </Speak>
        <Speak>
          This is important moving forward as investigating division within the
          Integers shows that it is NOT closed as it can produce rational
          numbers, which is another type!.
        </Speak>
        <Speak>
          These properties are powerful, as they are generalizations that can
          apply to ANY operation! In fact, they are so fundamental to operators,
          in Abstract Algebra, they are used to define them!
        </Speak>
        <Speak>
          Addition, within abstract algebra, is actually defined as any
          operation that is associative and commutative! (Well kind of, its far
          more complicated than just that, but for our purposes this lets us
          extend "addition" to other types!)
        </Speak>
        <Speak>
          So Addition is defined without numbers at all? Correct! We need only
          ensure our associative and commutative properties are upheld and we
          will receive an operators that functions in an "additive" manner!
        </Speak>
        <Speak>
          To prove how fundamental these properties are, we will now define a
          custom type (class) in python that has a special "add" method that
          uses no numbers, but none the less creates addition!
        </Speak>
        <CodeBox
          code={`class Dot:
    def __repr__(self):
        return "."
    def __int__(self):
        return 1

class Group:
    def __init__(self):
        self.dots = []

    def __add__(self, other):
        new_group = Group()
        for dot in self.dots:
            new_group.dots.append(Dot())

        if type(other) == Group:
            for dot in other.dots:
                new_group.dots.append(Dot())

        elif type(other) == Dot:
            new_group.dots.append(Dot())
        return new_group
    
    def __int__(self):
        total = 0
        for dot in self.dots:
            total += 1
        return total
    
    def __repr__(self):
        return f"[{"." * len(self.dots)}]"

group_1 = Group() + Dot() + Dot()
group_2 = Group() + Dot()
group_3 = Group() + Dot() + Dot() + Dot() + Dot()

print("Should be Equal if Commutative:", group_1 + group_2, "=", group_2 + group_1)
print("Should be Equal if Associative:", (group_1 + group_2) + group_3, "=", group_1 + (group_2 + group_3) )`}
        />
        <Speak>
          What is the major take away here? Learning that Addition is not just
          for numbers is interesting, however that is not the larger take away.
          The reason we performed this investigation was to see what operators
          are like. While we can't define them directly in math just yet, we can
          still learn about their underlying properties.
        </Speak>
        <Speak>
          In a larger sense, it also uncovers that Mathematics is not just the
          study of numbers, but rather the fundamental ability to use math to
          recognize similar patterns in the world around us using numbers as a
          short hand.
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
