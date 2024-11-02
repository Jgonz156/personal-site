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
//import TopicBreak from "../../components/topic-break"
import { MathJax } from "better-react-mathjax"
import Vocab from "../../components/vocab"

export default function Homework5() {
  return (
    <CoursePage type="homework">
      <CourseBox>
        <TitleBox title="HW5: Order In The Court" />
        <DueDateCalendar dueDate={DateTime.local(2024, 11, 15, 23, 59)} />
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
        <TitleBox title="Written Section" quote="Points: 60" />
        <QuestionBox qid={"Q1"}>
          In your own words, describe the following rules/laws and give a
          real-world example of their use:
          <MathJax>{`$$\\begin{matrix}
          \\text{a. Rule of Sums} \\\\
          \\text{b. Rule of Products} \\\\
          \\text{c. Inclusion-Exclusion Principle} \\\\
          \\end{matrix}$$`}</MathJax>
        </QuestionBox>
        <QuestionBox qid={"Q2"}>
          Using the Rule of Sums, Rule of Products, and the Inclusion-Exclusion
          principle, give answers to the following questions:
          <QuestionBox qid={"Q2 a"}>
            You are visiting a conference with a team of 4 individuals besides
            yourself. You are responsible for setting up everyone schedules for
            the events. The conference features talks, workshops, lectures, Q &
            A's, and even some one-on-one experiences. The full itinerary for
            the conference can be found below in a table: Your 4 team members
            Sam, Martin, Heidi, and Terri have the following requests for the
            conference: Sam: Martin: Heidi: Terri: Give a set for each team
            member that represents the events you have set up for them to
            attend. Then give the total number of events visited by each team
            member.
          </QuestionBox>
          <QuestionBox qid={"Q2 b"}>
            A restaurant is testing 2 new menus. They would like to stand out by
            giving their customers the most options possible. They have outlined
            the menus below: Menu 1: Menu 2: Give the total numbers of possible
            3-course-meals for each menu and they say which menu has more
            potential 3-course-meals.
          </QuestionBox>
          <QuestionBox qid={"Q2 c"}>
            You work for an airport and work with ground teams to procure
            information about airplanes leaving and landing. Management has made
            a new financial plan to charge airline companies based on the number
            of unique aircraft that operate out of the hangars. You have
            collected flight-logs and must give the unique number of aircraft
            that have visited the airport. The flight logs are provided below:
            flight-logs:
          </QuestionBox>
        </QuestionBox>
        <QuestionBox qid={"Q3"}>
          You are shopping for locks so you can seal up your luggage for a
          flight. You pass many different designs in the airport, upset that
          many of them are overpriced. One cheap one in the back happens to
          catch your eye as it seems to be making an interesting claim: "World's
          Best Combination lock! 9/10 Combinatorialists recommend!" This doesn't
          make sense to you as Mathematicians are very careful with their
          language in combinatorics. Describe the difference between a
          combination and a permutation. Then use your answer to argue the
          following claim: "Combination locks should be called Permutation
          locks". Finally describe the function of an actual, mathematically
          accurate, "Combination" lock.
        </QuestionBox>
        <QuestionBox qid={"Q4"}>
          The following questions involve solving for permutations or
          combinations. Provide the work used to reach your final answer. An
          example is provided below:
          <MathJax>{`$$\\begin{matrix}
        \\text{Ex: Find the total number of size 3 groups in a 17 person class} \\\\
        \\text{Answer: } n=17,k=3 \\\\ choose(17, 3) \\\\ \\frac{17!}{3!(17-3)!} \\\\ 680
        \\end{matrix}$$`}</MathJax>
          <QuestionBox qid={"Q4 a"}>
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
          <QuestionBox qid={"Q4 b"}>
            You are working with a locksmith on repairing some{" "}
            <Vocab
              definition={
                "Think of this as the typical way we think of combinations locks (Which are actually permutation locks)"
              }
            >
              combination
            </Vocab>{" "}
            locks. You help sell repaired locks second-hand and guarantee that
            the repaired locks retain at least half of their original number of
            valid lock sequences or a refund is offered. One day a customer
            comes in complaining that a lock that was sold to them was defective
            and they want their money back. The customers says "Whenever I try a
            combo with a 3 on the second cylinder, the lock never locks! I
            deserve my money back for this!". They hand over the lock and allow
            you to inspect it. The combo lock is very old and of a very odd
            design. It has 4 total cylinders you can turn to make the lock
            sequence. However, the cylinders are octagonal only allowing for 0
            through 7 instead of the typical 0 through 9. The customers claim
            checks out as no matter how many sequences you try, if cylinder two
            is ever on 3 the lock sequence never allows the lock to close.
            Investigate how many original arrangements this lock had when it was
            new, then decide wether the defect violates the refund policy.
          </QuestionBox>
          <QuestionBox qid={"Q4 c"}>
            You are working as an event organizer for a large company. Any
            upcoming company wide event involving all employees is coming up and
            you are ensuring enough food is provided at each event without
            overloading each event space beyond capacity. the company has rented
            4 large event halls, each with their own capacity. The company has 8
            varying size departments that must fit into these event halls. TBC
          </QuestionBox>
        </QuestionBox>
        <QuestionBox qid={"Q5"}>
          Continuing your job with the locksmith, you notice your boss in a bad
          mood. You decide to ask why they are upset. "We've been giving so many
          refunds, we are about to go broke! I don't understand! I thought for
          sure having 50% of the original combos would be easy! How many locks
          do you come across where less than half the cylinders don't work!"
          They storm off to their office where you catch a glimpse of a
          spreadsheet filled with red before they close the door. You decide to
          investigate a few patterns to help out your boss.
          <QuestionBox qid={"Q5 a"}></QuestionBox>
          <QuestionBox qid={"Q5 b"}></QuestionBox>
          <QuestionBox qid={"Q5 c"}></QuestionBox>
        </QuestionBox>
        <LinkButton color="success" to="">
          Written HW5 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 40" />
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

        <LinkButton color="success" to="">
          Optional HW4 Turn in
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
