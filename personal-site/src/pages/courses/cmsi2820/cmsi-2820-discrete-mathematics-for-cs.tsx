import { Chip, Divider, Sheet, Table } from "@mui/joy"
import Footer from "../../../components/footer"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import CourseNavBar from "../components/course-nav-bar"
import AssignmentCard from "../components/assignment-card"
import ExamCard from "../components/exam-card"
import NotesCard from "../components/notes-card"
import Standard from "../components/standard"
import Speak from "../components/speak"

export default function CMSI2820() {
  return (
    <>
      <Sheet
        color="primary"
        variant="solid"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
          p: 4,
          gap: 4,
        }}
      >
        <CourseNavBar />
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            borderRadius: 12,
            gap: 4,
          }}
        >
          <Divider>
            <Chip variant="soft" startDecorator={<AutoStoriesIcon />} size="lg">
              Course Information
            </Chip>
          </Divider>
          <Speak>
            Below is a large table the represents a "one stop shop" for
            everything in this course from notes, lecture recordings,
            assignments, dates, etc. This is a "living" page. It will continue
            to expand as we move forward into the semester!
          </Speak>
          <Table>
            <thead>
              <tr>
                <th style={{ width: "5%" }}></th>
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "15%" }}>Standard</th>
                <th style={{ width: "50%" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <Standard
                number={0}
                title="Syllabus"
                description="This standard is here to familiarize yourself with the layout
                  of course information! It is not graded for quality but
                  demonstrates where and how information is accessed! Clicking
                  on this row in the table will dropdown the relevant
                  information for the standard that is being covered in class."
              >
                <NotesCard
                  title="LN 0: Reading Course Material!"
                  description="Here is a sample of what the lecture notes will look
                            like! This one just explains the color coding I use
                            for information and displays the small interactive
                            modules I might have throughout the notes."
                  notesSlug="/cmsi-2820/ln0"
                />
                <AssignmentCard
                  title="HW 0: Practicing Homework"
                  description="This is a small assignment to get you familiar with
                            the process of receiving and submitting assignments!"
                  assignmentSlug="/cmsi-2820/hw0"
                />
                <ExamCard
                  title="EX 0: Syllabus"
                  description="Exams are an important part of how you communicate
                            your understanding of the material! Here you will
                            take one on the most vital parts of the course
                            syllabus! I promise its not hard."
                  examSlug="/cmsi-2820/ex0"
                />
              </Standard>
              {/*
              <Standard
                number={1}
                title="Logic"
                description="In this standard we will investigate the mathematical
                  underpinnings of logical argumentation, deductive reasoning,
                  and the symbology that is used to represent these ideas. This
                  means taking a brief look at different systems of logic, a deeper
                  dive into intuitionistic logic, and what that means for
                  propositional and predicate reasoning"
              >
                <NotesCard
                  title="LN 1: Information and Its Consequences..."
                  description="This lecture will cover the basics of many different 
                  systems of logic, where they came from, how they were used, and 
                  what it even means to craft a valid line of reasoning."
                  notesSlug="/cmsi-2820/ln1"
                />
                <NotesCard
                  title="LN 2: Assumptions Make an Argument out of You and Me"
                  description="This lecture will be an introduction to 
                  intuitionistic logic. We will cover propositions, their 
                  variables, compound formulas, logical connectives, natural 
                  deductive inference rules, and proofs."
                  notesSlug="/cmsi-2820/ln2"
                />
                <NotesCard
                  title="LN 3: Properties are Predicated... Predicated on What?"
                  description="This lecture expands on propositional logic by 
                  extending it to objects and statements about their properties, 
                  what is formalized as predicate logic. We will cover new 
                  forms of equality, predicated statements, their variables, 
                  their constants, and their composites, new existential and 
                  universal quantifiers, and their natural deductive inference rules."
                  notesSlug="/cmsi-2820/ln3"
                />
                <AssignmentCard
                  title="HW 1: Think Class! Think!"
                  description="In this homework you will get practice with logical 
                  terminology, creating propositional and predicate logic statements, 
                  translating natural language into logic, and natural deduction proofs!"
                  assignmentSlug="/cmsi-2820/hw1"
                />
              </Standard>
              
              <Standard
                number={2}
                title="Numbers"
                description="In this standard we will investigate the mathematical
                  underpinnings of numbers! Yep, you heard me right! We will be 
                  going over the arithmetic of the Booleans and the Integers."
              >
                <NotesCard
                  title="LN 5: Primitive Beginnings"
                  description=""
                  notesSlug="/cmsi-2820/ln5"
                />
                <NotesCard
                  title="LN 6: Meet The Booleans, Don't Worry There's only Two of Them"
                  description=""
                  notesSlug="/cmsi-2820/ln6"
                />
                <NotesCard
                  title="LN 7: The Integers, The Booleans' Infinite In-laws"
                  description=""
                  notesSlug="/cmsi-2820/ln7"
                />
                <NotesCard
                  title="LN 8: Division without Decimals? Positive Numbers that Add 
                  to Zero? What is this Place?!?"
                  description=""
                  notesSlug="/cmsi-2820/ln8"
                />
                <AssignmentCard
                  title="HW 2: Numbers"
                  description=""
                  assignmentSlug="/cmsi-2820/hw2"
                />
              </Standard>
              <Standard
                number={3}
                title="Collections"
                description="In this standard we will investigate the mathematical
                  underpinnings of mathematical structures that hold other primitives! 
                  This includes working with tuples, sets, and their many operations."
              >
                <NotesCard
                  title="LN 9: Tuples"
                  description=""
                  notesSlug="/cmsi-2820/ln9"
                />
                <NotesCard
                  title="LN 10: Sets"
                  description=""
                  notesSlug="/cmsi-2820/ln10"
                />
                <NotesCard
                  title="LN 11: More Sets"
                  description=""
                  notesSlug="/cmsi-2820/ln11"
                />
                <NotesCard
                  title="LN 12: Relations"
                  description=""
                  notesSlug="/cmsi-2820/ln12"
                />
                <AssignmentCard
                  title="HW 3: Collections Agency"
                  description=""
                  assignmentSlug="/cmsi-2820/hw3"
                />
              </Standard>
              <Standard
                number={"MIDTERM"}
                title="Standards 1-3"
                description="This is the optional midterm exam that covers the first 
                three standards."
              >
                <ExamCard
                  title="EX 1: Midterm Exam"
                  description=""
                  examSlug="/cmsi-2820/ex1"
                />
              </Standard>
              <Standard
                number={4}
                title="Functions"
                description="In this standard we will investigate functions. This 
                includes their formalized mathematical definition in the lambda 
                calculus, their reductions, their properties, and how they are 
                used in conjunction with logic to formalize Type Theory."
              >
                <NotesCard
                  title="LN 13: This Lamb Don't Baa"
                  description=""
                  notesSlug="/cmsi-2820/ln13"
                />
                <NotesCard
                  title="LN 14: Functions 2"
                  description=""
                  notesSlug="/cmsi-2820/ln14"
                />
                <NotesCard
                  title="LN 15: Functions 3"
                  description=""
                  notesSlug="/cmsi-2820/ln15"
                />
                <NotesCard
                  title="LN 16: Programs are Proofs too!"
                  description=""
                  notesSlug="/cmsi-2820/ln16"
                />
                <AssignmentCard
                  title="HW 4: Input an Inch and They'll Output a Mile!"
                  description=""
                  assignmentSlug="/cmsi-2820/hw4"
                />
              </Standard>
              <Standard
                number={5}
                title="Combinatorics"
                description="In this standard we will investigate combinations and 
                permutations."
              >
                <NotesCard
                  title="LN 17: Combinatorics 1"
                  description=""
                  notesSlug="/cmsi-2820/ln17"
                />
                <NotesCard
                  title="LN 18: Combinatorics 2"
                  description=""
                  notesSlug="/cmsi-2820/ln18"
                />
                <NotesCard
                  title="LN 19: Combinatorics 3"
                  description=""
                  notesSlug="/cmsi-2820/ln19"
                />
                <NotesCard
                  title="LN 20: Combinatorics 4"
                  description=""
                  notesSlug="/cmsi-2820/ln20"
                />
                <AssignmentCard
                  title="HW 5: Combinatorics!"
                  description=""
                  assignmentSlug="/cmsi-2820/hw5"
                />
              </Standard>
              <Standard
                number={6}
                title="Graph Theory"
                description="In this standard we will investigate the mathematical 
                underpinnings of graph theory."
              >
                <NotesCard
                  title="LN 21: Graph Theory 1"
                  description=""
                  notesSlug="/cmsi-2820/ln21"
                />
                <NotesCard
                  title="LN 22: Graph Theory 2"
                  description=""
                  notesSlug="/cmsi-2820/ln22"
                />
                <NotesCard
                  title="LN 23: Graph Theory 3"
                  description=""
                  notesSlug="/cmsi-2820/ln23"
                />
                <NotesCard
                  title="LN 24: Graph Theory 4"
                  description=""
                  notesSlug="/cmsi-2820/ln24"
                />
                <AssignmentCard
                  title="HW 6: Graph Theory!"
                  description=""
                  assignmentSlug="/cmsi-2820/hw5"
                />
              </Standard>
              <Standard
                number={7}
                title="Set Theory"
                description="In this standard we will investigate the mathematical 
                underpinnings of Set theory."
              >
                <NotesCard
                  title="LN 25: Set Theory 1"
                  description=""
                  notesSlug="/cmsi-2820/ln25"
                />
                <NotesCard
                  title="LN 26: Set Theory 2"
                  description=""
                  notesSlug="/cmsi-2820/ln26"
                />
                <AssignmentCard
                  title="HW 7: Set Theory!"
                  description=""
                  assignmentSlug="/cmsi-2820/hw5"
                />
              </Standard>
              <Standard
                number={"SPECIAL"}
                title="Extensions"
                description="Not a true standard, this section houses the notes for 
                the special non-graded topics that are covered in class."
              >
                <NotesCard
                  title="LN 27: Pure Discrete Mathematics and Artificial Intelligence"
                  description=""
                  notesSlug="/cmsi-2820/ln25"
                />
                <NotesCard
                  title="LN 28: Games and Systems Architecture Pipelines"
                  description=""
                  notesSlug="/cmsi-2820/ln26"
                />
              </Standard>
              <Standard
                number={"FINAL"}
                title="Standards 4-7"
                description="This is the optional final exam that covers the last 
                four standards."
              >
                <ExamCard
                  title="EX 2: FINAL Exam"
                  description=""
                  examSlug="/cmsi-2820/ex2"
                />
              </Standard>
               */}
            </tbody>
          </Table>
        </Sheet>
      </Sheet>
      <Footer />
    </>
  )
}
