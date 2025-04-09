import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import QuestionBox from "../../components/question-box"
import TopicBox from "../../components/topic-box"
import LinkButton from "../../components/link-button"
import DueDateCalendar from "../../components/due-date-calendar"
import { DateTime } from "luxon"
import { Typography } from "@mui/joy"
import BookCard from "../../../../components/book-card"

const textbook = {
  title:
    "Formal Syntax and Semantics of Programming Languages: A Laboratory Based Approach",
  authors: ["Slonneger, Kenneth", "Kurtz, Barry L."],
  pages: 654,
  abstract: (
    <>
      <Typography>
        This text developed out of our experiences teaching courses covering the
        formal semantics of programming languages. Independently we both
        developed laboratory exercises implementing small programming languages
        in Prolog following denotational definitions. Prolog proved to be an
        excellent tool for illustrating the formal semantics of programming
        languages. We found that these laboratory exercises were highly
        successful in motivating students since the hands-on experience helped
        demystify the study of formal semantics. At a professional meeting we
        became aware of each other's experiences with a laboratory approach to
        semantics, and this book evolved from that conference.
      </Typography>
      <Typography>
        Although this text has been carefully written so that the laboratory
        activities can be omitted without loss of continuity, we hope that most
        readers will try the laboratory approach and experience the same success
        that we have observed in our classes.
      </Typography>
    </>
  ),
  link: "https://cdn.preterhuman.net/texts/science_and_technology/artificial_intelligence/Formal%20Syntax%20and%20Semantics%20of%20Programming%20Languages%20-%20Kenneth%20Slonneger.pdf",
  imageSlug:
    "/book-covers/FormalSyntaxAndSemanticsOfProgrammingLanguages-ALaboratoryBasedApproach.png",
}

export default function Homework3() {
  return (
    <>
      <CoursePage
        type="homework"
        courseName="CMSI 5850: Programming Language Foundations"
        courseNumber={5850}
      >
        <CourseBox>
          <TitleBox title="HW3: Do Semantics Dream of Electric Lambdas?" />
          <DueDateCalendar dueDate={DateTime.local(2025, 4, 25, 23, 59)} />
          <TopicBox topics={["Lambda Calculus", "Operational Semantics"]} />
          <Speak>With this assignment you will demonstrate:</Speak>
          <Speak>
            Increased fluency with the Lambda Calculus, The ability to write
            big-step operational semantic specifications, The ability to write
            small-step operational semantic specifications, and An understanding
            of the various forms of operational semantic descriptions
          </Speak>
        </CourseBox>
        <CourseBox>
          <TitleBox title="Reading Section" />
          <Speak>
            With what little time we find ourselves with in class, you will need
            to rely on reading material, and watching supporting videos, to get
            yourself a full understanding of the dense and specific topics we
            cover. The following material will help you organize your thoughts
            and give you the tools to complete the homework.
          </Speak>
          <QuestionBox qid={"R1"}>
            On our course site, make sure to review the following course notes
            linked here for convenience:
            <LinkButton color="primary" to="/cmsi-5850/syntax">
              Syntax
            </LinkButton>
            <LinkButton color="primary" to="/cmsi-5850/semantics">
              Semantics
            </LinkButton>
            <LinkButton color="primary" to="/cmsi-5850/ohm">
              Ohm
            </LinkButton>
            <LinkButton color="primary" to="/cmsi-5850/astro">
              Astro
            </LinkButton>
            <LinkButton color="primary" to="/cmsi-5850/bella">
              Bella
            </LinkButton>
            <LinkButton color="primary" to="/cmsi-5850/operational-semantics">
              Operational Semantics
            </LinkButton>
            <LinkButton color="primary" to="/cmsi-5850/lambda-calculus">
              Lambda Calculus
            </LinkButton>
          </QuestionBox>
          <QuestionBox qid={"R2"}>
            Review Chapter 1 and read Chapters 5 and 8. They are about the
            Lambda Calculus and Operational Semantics respectively. (Linked here
            for Convenience)
            <BookCard {...textbook} />
          </QuestionBox>
          <QuestionBox qid={"W1"}>
            Watch the videos in the course notes pages linked above! Some cover
            our topic directly and others give you a broader understanding of
            the topic!
          </QuestionBox>
        </CourseBox>
        <CourseBox>
          <TitleBox title="Written Section" quote="Points: 100" />
          <Speak>
            A quick tip for those of you using digital type setting through
            LaTeX specifically: My site is built using React MathJax, a library
            designed to embed LaTeX code for visualization! Right clicking on
            any LaTeX symbols you see in the site below will give you a MathJax
            context menu for copying the exact LaTeX code used to produce whats
            on screen! (Same thing for the note pages too!).
          </Speak>
          <Speak>
            Whilst writing by hand is convenient, it often leads to messy work
            that is hard to share with others. Take this time to learn LaTeX as
            it is a valuable tool used to create research papers, flyers, and
            even textbooks! It is a skill that will serve you well in enhancing
            your digital presence or even in your future career!
          </Speak>
          <Speak>
            For those of you who aren't sure where to get started with LaTeX, I
            recommend Overleaf. It is a free online LaTeX editor that is easy to
            use, has many templates and guides, and is a great way to get
            started with LaTeX without having to install anything on your
            computer!
          </Speak>
          <QuestionBox points={9} qid="Q1">
            Write a syntax checker for the language of Problem 2 of Homework 2
            as a Node.js command line application using the Ohm Language
            Library. Your project should be hosted on Replit.com and must be
            completed by forking the Replit starter project linked in the button
            below. Fill in the missing portions as instructed by the comments.
            Note that I've included a full set of unit tests for you.
            <LinkButton
              color="primary"
              to="https://replit.com/@rtoal/585-Homework-3-Starter-Code"
            >
              Replit Starter Project!
            </LinkButton>
          </QuestionBox>
          <QuestionBox points={9} qid="Q2">
            Problem 1.4.3 in Slonneger and Kurtz
          </QuestionBox>
          <QuestionBox points={9} qid="Q3">
            Problem 5.1.1 in Slonneger and Kurtz
          </QuestionBox>
          <QuestionBox points={9} qid="Q4">
            Problem 5.1.2 in Slonneger and Kurtz
          </QuestionBox>
          <QuestionBox points={9} qid="Q5">
            Problem 5.1.3 in Slonneger and Kurtz
          </QuestionBox>
          <QuestionBox points={9} qid={"Q6"}>
            Problem 5.2.3 in Slonneger and Kurtz
          </QuestionBox>
          <QuestionBox points={9} qid={"Q7"}>
            Problem 5.2.7 (a) in Slonneger and Kurtz
          </QuestionBox>
          <QuestionBox points={9} qid={"Q8"}>
            Problem 8.5.1 in Slonneger and Kurtz
          </QuestionBox>
          <QuestionBox points={9} qid={"Q9"}>
            Problem 8.5.9 in Slonneger and Kurtz
          </QuestionBox>
          <QuestionBox points={9} qid={"Q10"}>
            Problem 8.6.3 (a) and (c) in Slonneger and Kurtz. You may use either
            Natural Semantics or Structural Operational Semantics.
          </QuestionBox>
          <QuestionBox points={10} qid={"Q11"}>
            Problem 8.6.6 in Slonneger and Kurtz. You may use either Natural
            Semantics or Structural Operational Semantics.
          </QuestionBox>
          <Speak>
            Magical right?! Well, probably a bit tiring more like, but we
            finally filled our Syntax with something! We operationalized the
            process of adding meaning to our syntax with semantics and next time
            we will take a denotational approach! "Writing to an abstract
            machine" would not have been as straightforward were it not for
            leveraging the calculus of function to define rigorous interactions
            and transformations!
          </Speak>
          <Speak>
            Below is a link to the Brightspace assignment for turning in your
            HW!
          </Speak>
          <LinkButton
            color="success"
            to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=326565&grpid=0&isprv=0&bp=0&ou=267867"
          >
            Written HW3 Turn In
          </LinkButton>
        </CourseBox>
      </CoursePage>
    </>
  )
}
