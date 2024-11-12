import { DateTime } from "luxon"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
//import DirectoryTree from "../../components/directory-tree"
import DueDateCalendar from "../../components/due-date-calendar"
import LinkButton from "../../components/link-button"
import QuestionBox from "../../components/question-box"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"
import { MathJax } from "better-react-mathjax"
import Vocab from "../../components/vocab"
import TopicBreak from "../../components/topic-break"

export default function Homework5() {
  return (
    <CoursePage type="homework">
      <CourseBox>
        <TitleBox title="HW5: Order In The Court" />
        <DueDateCalendar dueDate={DateTime.local(2024, 11, 22, 23, 59)} />
        <TopicBox
          topics={[
            "Rule of Sums and Products",
            "Inclusion-Exclusion Principle",
            "Permutations",
            "Combinations",
            "Double Counting",
            "Bijective Proof",
            "Pigeonhole Principle",
          ]}
        />
        <Speak></Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Written Section" quote="Points: 80" />
        <QuestionBox qid={"Q1"} points={3}>
          In your own words, describe the following rules/laws and give a
          real-world example of their use:
          <MathJax>{`$$\\begin{matrix}
          \\text{a. Rule of Sums} \\\\
          \\text{b. Rule of Products} \\\\
          \\text{c. Inclusion-Exclusion Principle} \\\\
          \\end{matrix}$$`}</MathJax>
        </QuestionBox>
        <QuestionBox qid={"Q2"} points={"12 total"}>
          Using the Rule of Sums, Rule of Products, and the Inclusion-Exclusion
          principle, give answers to the following questions:
          <QuestionBox qid={"Q2 a"} points={4}>
            <Speak>
              You are visiting a conference with a team of 4 individuals besides
              yourself. You are responsible for setting up everyone schedules
              for the events. The conference features talks, workshops,
              lectures, Q & A's, and even some one-on-one experiences. The full
              itinerary for the conference can be found below in a table:
            </Speak>
            <MathJax>{`$$\\begin{matrix}
            \\text{Event} & \\text{8am - 10am} & \\text{10am - 12pm} & \\text{12pm - 2pm} & \\text{2pm - 4pm} \\\\
            \\text{Talk} & x & x & x &  \\\\
            \\text{Workshop} &  & x &  & x \\\\
            \\text{Lecture} & x & x &  &  \\\\
            \\text{Q & A} &  &  & x & x \\\\
            \\text{One-on-One} &  &  & x & x \\\\
            \\end{matrix}$$`}</MathJax>
            <Speak>
              Your 4 team members Sam, Martin, Heidi, and Terri have the
              following requests for the conference:
            </Speak>
            <Speak>
              Sam: "I'd like to go to only workshops, I prefer to be hands on."
            </Speak>
            <Speak>
              Martin: "Send me to one of everything if possible please!"
            </Speak>
            <Speak>
              Heidi: "I want to meet new people, so send me to all the events
              that Sam, Martin, and Terri are not going to!"
            </Speak>
            <Speak>
              Terri: "I don't mind going to any events you send me to as long as
              you send me to as many as possible!"
            </Speak>
            <Speak>
              Give a set for each team member that represents the events you
              have set up for them to attend that fulfills each members
              requests. Then give the total number of events visited by each
              team member.
            </Speak>
          </QuestionBox>
          <QuestionBox qid={"Q2 b"} points={4}>
            <Speak>
              A restaurant is testing 2 new menus. They would like to stand out
              by giving their customers the most options possible. They have
              outlined the menus in counts below:
            </Speak>
            Menu 1:
            <MathJax>{`$$\\begin{matrix}
            \\text{Appetizer} & 3 \\\\
            \\text{Entree} & 8 \\\\
            \\text{Dessert} & 4 \\\\
            \\end{matrix}$$`}</MathJax>
            Menu 2:
            <MathJax>{`$$\\begin{matrix}
            \\text{Appetizer} & 5 \\\\
            \\text{Entree} & 2 \\\\
            \\text{Dessert} & 12 \\\\
            \\end{matrix}$$`}</MathJax>
            <Speak>
              Give the total numbers of possible 3-course-meals for each menu
              and they say which menu has more potential 3-course-meals.
            </Speak>
          </QuestionBox>
          <QuestionBox qid={"Q2 c"} points={4}>
            You work for an airport and work with ground teams to procure
            information about airplanes leaving and landing. Management has made
            a new financial plan to charge airline companies based on the number
            of unique aircraft that operate out of the hangars. You have
            collected flight-logs and must give the unique number of aircraft
            that have visited the airport. The flight logs are provided below:
            flight-logs:
            <MathJax>{`$$\\begin{matrix}
\\textbf{Flight} & \\textbf{From} & \\textbf{To} & \\textbf{Departure}  & \\textbf{Aircraft ID} \\\\
AA123  & JFK & LAX & 08:00 & N123AA \\\\
BA456  & LHR & JFK & 09:30  & G-BA456 \\\\
DL789  & ATL & ORD & 10:15  & JA606NH \\\\
UA101  & SFO & SEA & 11:00  & N101UA \\\\
AF202  & CDG & JFK & 07:45  & F-GAF202 \\\\
LH303  & FRA & LAX & 12:00  & F-GAF202 \\\\
QF404  & SYD & LAX & 22:00  & VH-QF404 \\\\
EK505  & DXB & JFK & 02:30  & N123AA \\\\
NH606  & NRT & LAX & 23:00  & JA606NH \\\\
AC707  & YYZ & LAX & 08:30  & N123AA \\\\
\\end{matrix}$$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END LN17" />
        <QuestionBox qid={"Q3"} points={"8 total"}>
          You are shopping for locks so you can seal up your luggage for a
          flight. You pass many different designs in the airport, upset that
          many of them are overpriced. One cheap one in the back happens to
          catch your eye as it seems to be making an interesting claim: "World's
          Best Combination lock! 9/10 Combinatorialists recommend!" This doesn't
          make sense to you as Mathematicians are very careful with their
          language in combinatorics. Use this intuition to answer the following
          questions:
          <QuestionBox qid={"Q3 a"} points={2}>
            Describe the difference between a combination and a permutation.
          </QuestionBox>
          <QuestionBox qid={"Q3 b"} points={2}>
            Argue the following claim: "Combination locks should be called
            Permutation locks".
          </QuestionBox>
          <QuestionBox qid={"Q3 c"} points={2}>
            Describe the function of an actual, mathematically accurate,
            "Combination" lock.
          </QuestionBox>
          <QuestionBox qid={"Q3 d"} points={2}>
            Assuming you had a "permutation" lock and a "combination" lock,
            where each lock featured 4 cylinders with 10 choices each, divide
            the number of "combinations" by the number of "permutations" to find
            the ratio of the number of possible sequences for each lock. Which
            would you prefer to have on your luggage?
          </QuestionBox>
        </QuestionBox>
        <QuestionBox qid={"Q4"} points={"15 total"}>
          The following questions involve solving for permutations or
          combinations. Provide the work used to reach your final answer. An
          example is provided below:
          <MathJax>{`$$\\begin{matrix}
        \\text{Ex: Find the total number of size 3 groups in a 17 person class} \\\\
        \\text{Answer: } n=17,k=3 \\\\ \\binom{17}{3} \\\\ \\frac{17!}{3!(17-3)!} \\\\ 680
        \\end{matrix}$$`}</MathJax>
          <QuestionBox qid={"Q4 a"} points={5}>
            You are interning at a library when you notice a pile of books with
            only 1 letter in bold on their spines. Since it was your birthday
            last week and your coworkers played a small prank on your to
            celebrate it, you decided some payback is in order. You devise a
            devious plan to spell out their names with the 1 letter books on the
            shelf. After setting up with books for John and Rachel, you realize
            that you do not remember the names of the other two coworkers
            involved. The only thing you can remember is that their names were 8
            letters and 12 letters respectively. You have 24 books to use to
            spell their names, how many arrangements would you have to search to
            put their names on the shelf?
          </QuestionBox>
          <QuestionBox qid={"Q4 b"} points={5}>
            <Speak>
              You are working with a locksmith on repairing some{" "}
              <Vocab
                definition={
                  "Think of this as the typical way we think of combinations locks (Which are actually permutation locks)"
                }
              >
                combination
              </Vocab>{" "}
              locks. You help sell repaired locks second-hand and guarantee that
              the repaired locks retain at least half of their original number
              of valid lock sequences or a refund is offered. One day a customer
              comes in complaining that a lock that was sold to them was
              defective and they want their money back. The customers says
              "Whenever I try a combo with a 3 on the second cylinder, the lock
              never locks! I deserve my money back for this!". They hand over
              the lock and allow you to inspect it. The combo lock is very old
              and of a very odd design. It has 4 total cylinders you can turn to
              make the lock sequence. However, the cylinders are octagonal only
              allowing for 0 through 7 instead of the typical 0 through 9. The
              customers claim checks out. No matter how many sequences you try,
              if cylinder two is ever on 3, the lock sequence never allows the
              lock to close. Investigate how many original arrangements this
              lock had when it was new, then decide wether the defect violates
              the refund policy.
            </Speak>
          </QuestionBox>
          <QuestionBox qid={"Q4 c"} points={5}>
            You are working as an event organizer for a large company. Any
            upcoming company wide event involving all employees is coming up and
            you are ensuring enough food is provided at each event without
            overloading each event space beyond capacity. the company has rented
            4 large event halls, each with their own capacity. The company has 8
            varying size departments that must fit into these event halls. TBC
          </QuestionBox>
        </QuestionBox>
        <QuestionBox qid={"Q5"} points={"10 total"}>
          Continuing your job with the locksmith, you notice your boss in a bad
          mood. You decide to ask why they are upset. "We've been giving so many
          refunds, we are about to go broke! I don't understand! I thought for
          sure having 50% of the original combos would be easy! How many locks
          do you come across where less than half the cylinders don't work!"
          They storm off to their office where you catch a glimpse of a
          spreadsheet filled with red before they close the door. You decide to
          investigate a few patterns to help out your boss.
          <QuestionBox qid={"Q5 a"} points={3}>
            Your boss mentioned the following: "How many locks do you come
            across where less than half the cylinders don't work!" This gets you
            wondering. What do you have to lose on the combo lock for your lock
            to lose half of your lock sequences? Is it actually half the
            cylinders? Investigate the following: If you have a combination lock
            with 0-9 on each cylinder and 5 total cylinders, How many sequences
            are lost if you lose just a single choice on one cylinder.
          </QuestionBox>
          <QuestionBox qid={"Q5 b"} points={3}>
            On the same lock as before, how many lock sequences are lost if you
            lose 2 entire cylinders?
          </QuestionBox>
          <QuestionBox qid={"Q5 c"} points={3}>
            Given how the previous two answers came out, what do you have to
            lose on a lock to lose exactly half your lock sequences?
          </QuestionBox>
          <QuestionBox qid={"Q5 d"} points={1}>
            Given how your investigation went, explain to your boss why a refund
            policy of half the combos is actually much easier to have happen
            than they thought!
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END LN18" />
        <QuestionBox qid={"Q6"} points={"16 total"}>
          <Speak>
            Vandermonde's Identity, is a combinatorics identity that represents
            the following equivalence on the Integers:
          </Speak>
          <MathJax>
            {`$$
          \\text{where: } 0 \\lt r \\lt m+n$$`}
          </MathJax>
          <MathJax>
            {`$$
        \\binom{m+n}{r} = \\sum_{k=0}^{r} \\binom{m}{k} \\binom{n}{r-k}
        $$`}
          </MathJax>
          <Speak>
            As an example of how its read, when can make groups between cats and
            dogs. Given m dogs and n cats, making groups of r size would be m+n
            choose r. This gives us the left hand side, however, the right hand
            side is less obvious. Given m dogs and n cats, we can find the total
            ways to make groups of r size by summing the ways to make groups of
            only dogs from size 0 to k, and multiply it with the number of ways
            to make groups of only cats of size r to 0. In a simplified manner,
            the left hand side is trying to communicate the idea that making
            groups of cats and dogs can be done by simply making groups out of
            the dogs and cats combined or, what the right hand side is trying to
            communicate, by finding all the ways to make a group filled with
            just dogs and then find the number of ways we could fill the
            remaining spots with just cats.
          </Speak>
          <Speak>
            In the following sub-problems you will investigate a double counting
            proof of Vandermonde's Identity
          </Speak>
          <QuestionBox qid={"Q6 a"} points={4}>
            Investigate the left hand side of the identity and ensure it holds
            for the following values:
            <MathJax>{`$$
          m=3,n=2,r=2
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q6 b"} points={4}>
            Investigate the right hand side of the identity and ensure it holds
            for the same values:
            <MathJax>{`$$
          m=3,n=2,r=2
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q6 c"} points={4}>
            Draw Pascals Triangle out to the 5th row and use it to show that the
            left and right hand sides of Vandermonde's Identity are equal, for
            our previous values of m, n and r, by circling all entries that are
            used and draw a line to connect the entries that are multiplied
            together. Then place a square around the entry the represents the
            answer.
          </QuestionBox>
          <QuestionBox qid={"Q6 d"} points={4}>
            Having completed the previous parts, summarize the process used for
            the right hand side of Vandermonde's Identity. Then, in your own
            words, give an explanation as to why it performs the same action as
            the left hand side.
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END LN19" />
        <QuestionBox qid={"Q7"} points={"15 total"}>
          George Cantor was famous for proving that there are different sizes of
          infinity. More specifically, that while the set of Integers and Real
          numbers are both infinite, the set of Real numbers is actually a
          larger infinity. Using a Bijective argument, we can show this fact.
          The following sub-problems will investigate this concept.
          <QuestionBox qid={"Q7 a"} points={5}>
            Prove that the domain of the Integers and the Codomain of just the
            even integers are the same size by making a bijective function that
            maps one to the other in the following sub-problems:
            <QuestionBox qid={"Q7 a 1"}>
              Give the function that maps all Integers to all Even Integers
            </QuestionBox>
            <QuestionBox qid={"Q7 a 2"}>
              Explain why your function is injective
            </QuestionBox>
            <QuestionBox qid={"Q7 a 3"}>
              Explain why your function is surjective
            </QuestionBox>
          </QuestionBox>
          <QuestionBox qid={"Q7 b"} points={5}>
            Explain why drawing the previous bjiection shows that the set of all
            integers and the set of all even integers are the same size.
          </QuestionBox>
          <QuestionBox qid={"Q7 c"} points={5}>
            Prove that the domains of the Integers and the Real numbers are not
            the same size by explaining why it is impossible to make a bijective
            function between them by answering the following:
            <QuestionBox qid={"Q7 c 1"}>
              Give an Injective function from the Integers to the Reals and then
              explain why you cannot make one that is surjective
            </QuestionBox>
            <QuestionBox qid={"Q7 c 2"}>
              Give a Surjective function from the Reals to the Integers and then
              explain why you cannot make one that is injective.
            </QuestionBox>
          </QuestionBox>
        </QuestionBox>
        <QuestionBox qid={"Q8"} points={"4 total"}>
          The Pigeonhole Principle is a simple concept that states that if you
          have more pigeons than pigeonholes, at least one pigeonhole will have
          more than one pigeon. Put more generally, if you have a limited number
          of slots and have more items to place in those slots than you have
          slots, you will have to grapple with the resulting overflow. These
          "overflows" lead to very interesting an non-intuitive facts. The
          following sub-problems will display to you a few of them.
          <QuestionBox qid={"Q8 a"} points={1}>
            Explain why in any 27 word English sentence, at least 2 words must
            start with the same letter.
          </QuestionBox>
          <QuestionBox qid={"Q8 b"} points={1}>
            Explain why if you pick 5 numbers from the integers 1 to 8, then two
            of them must add up to 9.
          </QuestionBox>
          <QuestionBox qid={"Q8 c"} points={1}>
            Given only names with English letters, explain why it takes only 677
            people to guarantee that at least 2 people have the same initials.
          </QuestionBox>
          <QuestionBox qid={"Q8 d"} points={1}>
            Given a infinite container holding an infinite number of colored
            balls, being either red, blue, black, or green, give the minimum of
            grabs out of this drawer to make a pair of balls that is the same
            color.
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END LN20" />
        <LinkButton color="success" to="">
          Written HW5 Turn In (Not linked yet)
        </LinkButton>
      </CourseBox>
      {/*
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 20" />
        <DirectoryTree filesAsJSON={{}} />
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
        <LinkButton color="success" to="">
          GitHub Assignment
        </LinkButton>
        <LinkButton color="success" to="">
          Programming HW5 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Optional Section For Functions" quote="Points: 20" />
        <Speak>
          As with the other creative endeavors from the previous Optional HW's,
          integrate your learning into a real world event/experience/memory!
          (However always remember that you can work out an alternate creative
          endeavour if you want to involve your hobbies! You can make creative
          works in any form such as games, drawings, paintings, dioramas,
          sculptures, videos, fake blogs, memes, anything!) (For instance, while
          I am working on this HW I am hungry and can imagine a number of ways
          that you could organize a grocery store into sets and tuples. Are
          shelves ordered? In what ways? what about bargain deal aisles, are
          they unordered? I could make a set/tuple representation of all of
          Ralphs!) (Just make sure to talk to me first!)
        </Speak>
        <Speak>
          We saw in class that Collections, while of course being responsible
          for holding other types, was more complicated than simply picking a
          basket to throw things in. When choosing to represent a collection of
          items, the decision between using a set or tuple was more fundamental
          than just needing to hold onto some values. Choosing a Set inherently
          suggested that membership was all that mattered and that there was no
          special meaning to being anywhere in the group. Choosing a Tuple
          suggested that order was important and that your collections of
          elements could not be understood in any other manner. With this said,
          my suggestion for your creative endeavour is to really feel what the
          difference between a set and a tuple is by taking something in your
          hobby that is ordered and attempt to engage with it in an unordered
          manner and take something that is normally unordered and engage with
          it in an ordered manner. Document the results to me!
        </Speak>
        <Speak>
          What does it mean to find something ordered in your hobby? Well, look
          for something that is always done in the same manner or something that
          is normally done with consistency and see what you can accomplish when
          you do it inconsistently! To give some examples, say you like building
          structures with Legos, what would happen if you bounced around the
          booklet of build instructions? Could you still make the build? Is it
          possible to assemble the varying built pieces together still? What
          type of builds "survive" this change? If you play Volleyball, what
          would happen if you allowed any one to go anywhere when a court
          rotation is typically done? Can the game be salvaged? Do you
          strategies change? If you are a musician, what would happen if you
          played the notes of a song in a different order? Would it still sound
          the same? Would it still be recognizable? Do certain songs "maintain"
          their identity more than others?
        </Speak>
        <Speak>
          What about finding something unordered in your hobby? Search for
          something that is typically done at any time or without conditions and
          see how things change when you enforce consistency upon it! For
          instance, if you absent mindedly scroll through your For You Page for
          funny posts, how would your experience be different if you forced
          yourself to go through the posts in alphabetical order by creator?
          Would you still enjoy your FYP? Does it make it more or less enjoyable
          to always see a certain content creator first? Would you end up
          unfollowing/unsubscribing to certain people? If you like eating food
          off your plate in any order, what would happen if you forced yourself
          to always eat in a clockwise manner? Would you still enjoy your meal?
          How would you change the plate to be more enjoyable under these
          constraints? Would you always eat mixed-bowl style meals to get around
          this? If you like to play video games with friends, what would happen
          if the only way to close the game was to be successful first ("End on
          a win")? How quick are certain games to get out of? How does adding
          more people to your group change your odds of success? Would you start
          avoiding certain game genres? Are certain genres of game unaffected?
        </Speak>
        <Speak>
          Take the ordered and unordered experiences you get from your hobby and
          write/show/display to me how they are different as a result.Explain to
          me what the experience is normally like and then explain what specific
          parts of that experience changes for better or for worse when you
          "switch the collection type" around!
        </Speak>
        <Speak>
          For instance, I enjoy lecturing for this course, I am your professor
          after all, and something that is typically ordered is how we go
          through lecture. Everything builds on the next thing, so what would
          happen if for one lecture I did the announcements at the end, the
          recap in the middle, put examples out of order? Would the lecture
          still be understandable? Would it still be enjoyable for me to teach
          this way or for you to learn in those conditions? What kind of
          lectures can survive this change? What I would do is try to lecture in
          this manner and identify what parts of the lecture are still
          successful and what parts are not and then I would write down how
          making it unordered specifically changed it. Then I would identify
          something that is typically unordered about my teaching, such as how I
          pick students to answer questions, and I would see what would happen
          if I always picked students in order from front of the class to back
          of the class. Would that shift students around the classroom? Would is
          make answering the question more or less stressful? Would more or less
          people show up to class? I would then try this process out for a
          lecture or two and then write down the changes I noticed that
          specifically arose due to the change in picking students.
        </Speak>
        <Speak>
          I am only asking that you perform this investigation for one ordered
          and one unordered experience in your hobby. If you want to do more
          that is great and will get you more points! However, the main way to
          gain points is to pick something interesting and be thoughtful in your
          description (and theories that you come up with along the way) about
          how swapping order for disorder and disorder for order changes the
          experience! The more properties you include and the more operations
          you find, the more points you earn!
        </Speak>
        <LinkButton color="success" to="">
          Optional HW4 Turn in
        </LinkButton>
      </CourseBox>
      */}
    </CoursePage>
  )
}
