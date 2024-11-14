import { DateTime } from "luxon"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import DirectoryTree from "../../components/directory-tree"
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
        <DueDateCalendar dueDate={DateTime.local(2024, 11, 25, 23, 59)} />
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
              itinerary for the conference can be found below in a table (An x
              means that the event is happening at that time, a blank means it
              is not happening):
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
            Investigate the left hand side of the identity using the following:
            <MathJax>{`$$
          m=3,n=2,r=2
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q6 b"} points={4}>
            Investigate the right hand side of the identity and ensure it holds
            with the left hand side for the same values:
            <MathJax>{`$$
          m=3,n=2,r=2
          $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q6 c"} points={4}>
            Draw Pascal's Triangle out to the 5th row and use it to show that
            the left and right hand sides of Vandermonde's Identity are equal,
            for our previous values of m, n and r, by circling all entries that
            are used and draw a line to connect the entries that are multiplied
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
              Give an injective function from the Integers to the Reals and then
              explain why you cannot make one that is surjective
            </QuestionBox>
            <QuestionBox qid={"Q7 c 2"}>
              Give a surjective function from the Reals to the Integers and then
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
        <LinkButton
          color="success"
          to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?ou=253279&db=303709"
        >
          Written HW5 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 20" />
        <DirectoryTree
          filesAsJSON={{
            "CMSI-2820-HW5": {
              ".gitignore": <></>,
              "README.md": <></>,
              "court.py": <></>,
              "test_court.py": <></>,
              "proceedings.py": <></>,
            },
          }}
        />
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
        <LinkButton
          color="success"
          to="https://classroom.github.com/a/CW3A2-10"
        >
          GitHub Assignment
        </LinkButton>
        <LinkButton
          color="success"
          to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=303710&grpid=0&isprv=&bp=0&ou=253279"
        >
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
          sculptures, videos, fake blogs, memes, anything!) (Just make sure to
          talk to me first!)
        </Speak>
        <Speak>
          Functions are a bit too general as it stands right now to make a small
          creative project out of. Since they can be used to
          understand/define/simulate anything there is a distinct issue with
          applying them, in that they apply themselves everywhere. So instead of
          trying to "decode" something you enjoy into a bunch of tiny
          interactions, I'd rather use this optional assignment for reflection
          and sharing.
        </Speak>
        <Speak>
          Functions can be understood as a map from inputs to outputs. When you
          put something in, you get something out. So I would like you to do the
          same but for your hobby. Why do you enjoy your hobbies? When you put
          your effort into your personal projects, what do you get out of them?
          It is just the satisfaction of getting better? Do you like to make
          works an sell them for extra spending cash? I would like you to take
          this optional to give a brief reflection on why you keeping "using the
          same function" over an over again (That function being your hobby!).
        </Speak>
        <Speak>
          Once you've reflected on your hobby, then we will represent the other
          crucial part of a function, their "bodies". To reflect functions as
          ordered instructions, I would like you to put together a small
          guide/introduction of how to get into, and what someone might get out
          of, your hobby! After all, its hard to know whether you should be
          running a function or not unless you have some documentation!
        </Speak>
        <Speak>
          For instance, if I were to complete this optional, I would choose to
          reflect on my hobby of rock climbing. I would begin by reflecting on
          what I personally get out of it. This includes a number of things, but
          in short it keeps me active, its difficulty means I am always faced
          with a challenge to improve, and the focus required to follow a
          difficult{" "}
          <Vocab
            definition={
              "A beta in rock climbing is a set of move by move instructions for how you climb from the start to finish of a climb. These are usually used for difficult climbs where certain techniques may be required to reach the top"
            }
          >
            beta
          </Vocab>{" "}
          is a good way to clear my mind of distractions that are bothering me
          (like a meditation of sorts). Once I finished reflecting on what I get
          out of rock climbing, I would then make a guide to help introduce
          people to climbing. This could take the form of a cool flyer, a blog,
          a fake advertisement for a company, or a video. This is where you can
          get creative as for many hobbies there might be preferred or cool
          introductions to them that are personalized. Since rock climbing is so
          specific, I might create a montage of really mind bending moves you
          wouldn't expect to get people drawn in!
        </Speak>
        <Speak>
          Due to the open ended, and mostly personal, nature of this optional, I
          will be grading it purely on participation with the two major
          components, the reflection and the guide/intro. Each will be worth 10
          points.
        </Speak>
        <Speak>
          Once you have completed your reflection and guide/intro, you can turn
          it in via brightspace with the button below! If you have any questions
          about this optional feel free to ask me!
        </Speak>
        <LinkButton
          color="success"
          to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=303711&grpid=0&isprv=&bp=0&ou=253279"
        >
          Optional HW4 Turn in
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
