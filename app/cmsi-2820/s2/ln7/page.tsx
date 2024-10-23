import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import ImageBox from "@/components/course/image-box"
import CodeBox from "@/components/course/code-box"
import { Sheet } from "@mui/joy"

export default function LectureNotes7() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN6",
          buttonColor: "primary",
          buttonName: "The Integers, The Booleans' Infinite In-laws",
          buttonSlug: "/cmsi-2820/ln6",
        },
        middle: {
          lectureId: "HW2",
          buttonColor: "success",
          buttonName: "Counting Sheep",
          buttonSlug: "/cmsi-2820/hw2",
        },
      }}
    >
      <CourseBox>
        <TitleBox
          title="Division without Decimals? Positive Numbers that Add 
                  to Zero? What is this Place?!?"
          quote={`"If you are sure you understand everything that is going on, you are hopelessly confused." - Walter F. Mondale`}
        />
        <Speak>
          Having used Integers to learn about operators was very useful as we
          know a lot about the instances of this type already and how they
          interact... Or do we?
        </Speak>
        <Speak>
          If we recall the closure property from last lecture, we will remember
          that it states that an operator that acts on types of the same input
          must produce and instance of the same type. It was very clear for our
          purposes that Addition, and by extension Multiplication, had this
          property.
        </Speak>
        <Speak>
          However, we offhandedly mentioned that division did not share this
          property, instead being able to produce rational numbers even with
          just the integers as input.
        </Speak>
        <Speak>
          While not the end of the world this could prove difficult if we
          create, and rely, on a system of operators only producing instances
          within the integers. Say we had some computer that had a restriction,
          being unable to store floating point values.
        </Speak>
        <Speak>
          This could result in our typical division operator producing
          un-storable values!
        </Speak>
        <Speak>
          We must make a new form of division to operate with to have the
          ability to maintain closure within the Integers. The idea could simply
          be to reject any non-integer solutions to our division operator. Doing
          so gives us Integer Division!
        </Speak>
        <TopicBreak title="Integer Division" />
        <MathJax>{`$$\\begin{matrix}
        \\div~:~(Int, Int)\\to Rational & |~:~(Int, Int)\\to Int
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This brand new Integer division, like old division, is intimately
          related to multiplication and thus it can be rewritten as solving a
          multiplication problem!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        a~|~b~\\equiv~b=ac \\\\
        \\text{Where} \\\\
        c:Int
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This relationship is not so different from typical division. However,
          now we have that "c" cannot be whatever it wants. It must be an
          Integer for this form of division to hold.
        </Speak>
        <Speak>
          The above statement is also "said" a different way as to draw greater
          distinction from typical division. It is read as "a divides b" or "b
          is a multiple of a" or "a is a factor of b". As a result, Integer
          division is read in the opposite manner as typical division which is
          "a is divided by b". We can see this in greater detail in the example
          below:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        1 \\div 2 \\equiv 2=1c & c=\\frac{1}{2} \\\\
        2~|~1 \\equiv 2=1c & c:Int=? \\\\
        4 \\div 2 \\equiv 4=2c & c=2 \\\\
        4~|~2 \\equiv 4=2c & c:Int=2
        \\end{matrix}$$`}</MathJax>
        <Speak>
          The difference between Integer division and normal division can be
          seen at an even more extreme level when attempting to solve the
          following problem. "Find, and list, everything that 'divides' 22".
        </Speak>
        <Speak>
          Attempting this problem with normal division is odd as solving this
          problem is simply listing every number as a value of x. Due to no
          restrictions on typical division, this has infinitely many solutions!
          It might be better to just graph y=22/x!
        </Speak>
        <Speak>
          However, this becomes a very different problem when we use integer
          division as we must restrict ourselves to only Integers, as it
          namesake suggests.
        </Speak>
        <Speak>
          Given what we've seen thus far, we know we must be looking for pairs
          of values that multiply to 22 as seen below:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        x~|~22~\\equiv~22=xc \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Well, might as well make a table and just go one integer at a time
          until we find all the pairs right? On the bright side, we can restrict
          our range of integers to test down to at least 1 through 22 for x.
          Why? This is because if x and c together were ever greater than 22,
          there is certainly no manner that would allow their multiplication to
          result in a smaller number! (This case being 22!)
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        x & c & type\\\\
        1 & 22 & Int! \\\\
        2 & 11 & Int! \\\\
        3 & 7.33... & not an Int! \\\\
        4 & 5.5 & not an Int! \\\\
        5 & 4.4 & not an Int! \\\\
        & . & \\\\
        & . & \\\\
        & . & \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Ok that was a lot of division and it turns out there are only two
          unique non-negative integer pairs that multiply to 22! Thats a lot
          less than infinite like before!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (1,22), (2,11)
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This feels odd as 22 is a pretty decently large number. I guess
          technically no number is relatively large or small without a range as
          their are infinitely many Integers to compare to but i digress! We
          would have expected a few more right? Lets try again with a much
          larger number, 100! This time however, I'll only make the table with
          integer pairs:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        x & c\\\\
        1 & 100 \\\\
        2 & 50 \\\\
        4 & 25 \\\\
        5 & 20  \\\\
        10 & 10  \\\\
        11 & ? 
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Really? Only 5 pairs? Thought we'd have many more but no matter.
          However, maybe there is a way to understand why there are so few. It's
          origins can be readily discovered by asking a unique question about
          the bottom of the table there!
        </Speak>
        <Speak>
          I included 11 to ask a simple question, "Why don't we need to check
          for a 'c' to pair with 11?" What fact do we know that makes checking
          11 pointless? Well, multiplication is Commutative! Since it is
          reversible, we know that each column can be reversed without changing
          the meaning. We can also see a very unique pattern forming, in that
          the two columns values are converging toward each other!
        </Speak>
        <Speak>
          For numbers with square roots that are integers we can also see the
          convergence occur! This means that if 11 were really going to have a
          "c" to pair with, it should have already showed up between (5,20) and
          (10,10)! However, since it didn't we can stop!
        </Speak>
        <Speak>
          This gives us a much better way to restrict the "x" column in our
          table! We know that we don't need to check any integer "x" greater
          than or equal to the square root of the number we are looking for!
        </Speak>
        <Speak>
          I made a cool Desmos interactive graph to show off the cool patterns
          that arise and display this visually!
        </Speak>
        <Sheet sx={{ height: "90vh" }}>
          <iframe
            src="https://www.desmos.com/calculator/u7ttqd9par?embed"
            width={"100%"}
            height={"100%"}
          />
          <a href="https://www.desmos.com/calculator/kiyedej7dh">link here!</a>
        </Sheet>
        <Speak>
          Exploring that Desmos interactive we may have noticed something
          interesting. While their may be an intuition that as numbers get
          larger they should have more of these pairs of factors, there are
          still some that seem to randomly only have 1 pair in total! Put
          another way, they only have 2 factors!
        </Speak>
        <Speak>
          You might already be familiar with these special numbers, they are
          called primes! Primes are any integer that is greater than 1 and the
          only integers that divide them are only 1 and themselves. To see logic
          make a triumphant return we can rewrite it as the below proposition!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        p>1 \\land 1~|~p \\land p~|~p \\land p:Int \\land \\text{"only 2 factors"}
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Well, that last part of the conjunction isn't as satisfying, but
          without it we wouldn't be restricting p enough for it to actually be
          only the primes. Regardless, below we can see a small list of example
          integers that fit this conjunction!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        2,3,5,7,11,13,...
        \\end{matrix}$$`}</MathJax>
        <Speak>
          A non-obvious fact about primes, discovered by Euclid in his work
          "Elements" is a powerful pattern that is given quite the prominent
          name! This fact is called "The Fundamental Theorem of Arithmetic". It
          states the following, "Any positive integer greater than 1 can be
          uniquely expressed as a product of only prime numbers."
        </Speak>
        <Speak>
          Seriously? Yes! While we won't go over the proof in extreme detail
          here, it has been shown and it lets us rewrite the typical number line
          in a very unique manner (I have removed all the primes multiplied by
          one for brevity):
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        2,2,2*2,5,2*3,7,2*2*2,3*3,2*5,11,2*2*3,13,2*7,...
        \\end{matrix}$$`}</MathJax>
        <Speak>
          There are a lot of cool patterns to be shown in the above reworking of
          the integers, but we must address and elephant in the room.
        </Speak>
        <TopicBreak title="Modulus" />
        <Speak>
          That elephant being that we kind of just hand waved away all the other
          "failing" portions of the division operator. It leaves us with the
          normal division operator having "holes" in its function. Could we
          potentially "repair" this by allowing for another mechanism in the
          division to cover up these potholes in our calculations?
        </Speak>
        <Speak>Well, lets investigate an example that leads to the gap:</Speak>
        <MathJax>{`$$\\begin{matrix}
        8~|~10 \\equiv 10=8c
        \\end{matrix}$$`}</MathJax>
        <Speak>
          In this case we can see that 8*1 is too little and 8*2 is too much and
          we either under or overshoot 10! However, we could repair this
          statement with only integers given we allow for another operator to
          join the statement. If we could just give ourselves a boost by the
          integer 2, we could reach a valid statement!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        8~|~10\\equiv 10=8c+2 \\\\
        \\text{where} \\\\
        c=1
        \\end{matrix}$$`}</MathJax>
        <Speak>
          However, in doing so we need to alter our division relationship
          otherwise it will be incorrect. We can do this simply by adjusting the
          dividend by the same amount we needed to cover the "pothole".
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        8~|~(10-2) \\equiv 10=8(1)+2
        \\end{matrix}$$`}</MathJax>

        <Speak>This gives us the following brand new relationship!</Speak>
        <MathJax>{`$$\\begin{matrix}
        a~|~(b-r) \\equiv 10=8c+r
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Before, we had gaps we could not fill with only integers. Now we have
          a way to cover them! This special addition cover is called the
          remainder. The remainder needed to cover the division potholes are
          illustrated by the number line below representing all the numbers that
          are divided by 3:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        & & 3 & & & 6 & & & 9 & & & 12 \\\\
        +0 & +1 & +2 & +0 & +1 & +2 & +0 & +1 & +2 & +0 & +1 & +2
        \\end{matrix}$$`}</MathJax>
        <Speak>
          It looks as though the divisor we are using defines the exact number
          of extra boosts, or remainders, we need to cover the gaps in the
          number line! It would be useful to have a method of seeking out the
          remainder amount, as it would be not only capable of telling us if a
          number is divided only by integers, but also that if it isn't, how
          much extra is needed to reach the next point where it is!
        </Speak>
        <Speak>
          The operator responsible for getting this remainder is known as
          Modulus! Due to the repeating self similar nature of the gaps and
          number of remainders needed to cover the "potholes" left by integer
          division, Modulus is used to define modular arithmetic!
        </Speak>
        <Speak>
          Due to the same remainder showing up for different integers, the
          modulus operator actually does something we may nit be familiar with.
          It seems to map many different integer pairs to the same output! We
          will investigate this property in more detail later, for now lets see
          this in action!
        </Speak>
        <Speak>
          Under a modulus of 3, we are searching for the remainders that are
          needed to complete the above arithmetic statement with only integers
          when dividing by 3.
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        3 ~mod~ 3 = 0 \\\\
        4 ~mod~ 3 = 1 \\\\
        5 ~mod~ 3 = 2 \\\\
        6 ~mod~ 3 = 0 \\\\
        7 ~mod~ 3 = 1 \\\\
        8 ~mod~ 3 = 2 \\\\
        9 ~mod~ 3 = 0 \\\\
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Above we can clearly see that "multiple mapping" issue. Whats odd is
          that under modulo 3 we seem to find the following:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        3 ~mod~ 3 = 0 = 6 ~mod~ 3 = 0 = 9 ~mod~ 3 \\\\
        3 = 6 = 9
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Well this feels odd. These are clearly all different from one another,
          however it seems to be that they are all equal to one another? This
          seems like an abuse of our "=" operator as these things are clearly
          not equal. If, like in normal algebra, we simply removed everything
          that was similar to all of them, namely the mod 3, we would seem to
          say that three, six, and nine are all equal?
        </Speak>
        <Speak>
          This is clearly non-sensical, so we need a new operator to handle this
          "equivalence". Or do we? Turns out we already have one that can! As we
          saw in the logic standard, this is a job for "triple" equals! Under
          some context, multiple non-identical statements come out the same!
          However, its not called logical equivalence when used for modular
          arithmetic. Instead, it is given a new name as the Congruence
          Operator.
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        (3 \\equiv 6 \\equiv 9) ~mod~ 3
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Given that we are using the congruence operator because modular
          arithmetic is present, we can forgo putting the other "mod 3"s. With
          that, we can now formally introduce modulo!
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        a \\equiv b ~mod~ m
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This is read as, "a is congruent to b modulo m". It also comes with
          another formal rewriting to help use our typical "=" operator again.
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        a ~mod~ m = b ~mod~ m
        \\end{matrix}$$`}</MathJax>
        <Speak>
          Pumping the break for a moment, we should ask ourselves something. Is
          Congruence really the same thing as Equivalence? Do the same
          properties hold as we might typically use with "=" or do we need to
          relearn new algebraic methods to use this new operator? The answer is
          actually no! It functions the same! Recall the following property of
          Equivalence:
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        a = b \\land b=c \\to a = c
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This property is known as transitivity, as it allows us to use another
          "transitionary" equivalence to generate a new, simpler equivalence.
          This is a crucial simplification property, but does it hold under
          Congruence?
        </Speak>
        <MathJax>{`$$\\begin{matrix}
        a \\equiv b \\land b \\equiv c \\to a \\equiv c
        \\end{matrix}$$`}</MathJax>
        <Speak>
          This looks like a job for Natural Deduction! Wait what! Yes! Natural
          Deduction is a system that allows us to make
          arguments/inferences/proofs as we saw in standard 1 and as such it
          should be able to deductively reason this new information into our
          system! A hypothetical Natural Deduction style proof is shown below!
        </Speak>
        <MathJax>{`$$\\begin{prooftree}
      \\AxiomC{[a \\(\\equiv \\) b mod m \\(\\land \\) b \\(\\equiv \\) c mod m]1}
        \\RightLabel{(\\(\\land\\) E1)}
        \\UnaryInfC{a\\(\\equiv \\) b mod m}
        \\RightLabel{(\\(\\equiv \\) E)}
        \\UnaryInfC{a mod m = b mod m}
        
      \\AxiomC{[a \\(\\equiv \\) b mod m \\(\\land \\) b \\(\\equiv \\) c mod m]1}
        \\RightLabel{(\\(\\land\\) E2)}
        \\UnaryInfC{b\\(\\equiv \\) c mod m}
        \\RightLabel{(\\(\\equiv\\) E)}
        \\UnaryInfC{b mod m = c mod m}
        \\RightLabel{(\\(=\\) I)}
      \\BinaryInfC{a mod m = c mod m}
      \\RightLabel{(\\(\\equiv\\) I)}
      \\UnaryInfC{a\\(\\equiv \\) c mod m}
      \\RightLabel{(\\(\\to\\) I)1}
      \\UnaryInfC{((a\\(\\equiv \\) b mod m)\\(\\land \\)(b\\(\\equiv \\) c mod m))\\(\\to\\) (a\\(\\equiv \\) c mod m)}
        \\end{prooftree}$$`}</MathJax>
        <Speak>
          We needed to make a few new rules to perform this, but we never added
          a rule that wasn't based in strong deductive reasoning that we've
          built up before!
        </Speak>
        <Speak>
          Many other properties can be proven to hold the same under Congruence
          as they do under Equivalence, but we unfortunately do not have the
          time to investigate them today.
        </Speak>
        <Speak>
          However, we can end by discussing why you might want to become
          proficient with these new operators! Hailing from the field of Number
          Theory, these operators are crucially used to develop pseudo-random
          number generators for computers, hashing functions to prevent data
          collisions, and are best known for their work in cryptology where they
          prevent your data from being stolen!
        </Speak>
        <Speak>
          And with that all said, we've completed our look into "numbers" in
          discrete mathematics. While their is much more to be said, we've been
          readily quipped with the tools to investigate more in the future, now
          it is instead time to begin grouping things together in Collections!
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
