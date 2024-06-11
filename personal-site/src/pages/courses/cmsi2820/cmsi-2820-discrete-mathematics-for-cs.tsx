import { Chip, Divider, IconButton, Sheet, Table, Typography } from "@mui/joy"
import Footer from "../../../components/footer"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import React from "react"
import CourseNavBar from "../components/course-nav-bar"
import AssignmentCard from "../components/assignment-card"
import ExamCard from "../components/exam-card"
import NotesCard from "../components/notes-card"

export default function CMSI2820() {
  const [open, setOpen] = React.useState(false)
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
          <Typography level="body-md">
            Below is a large table the represents a "one stop shop" for
            everything in this course from notes, lecture recordings,
            assignments, dates, etc.
          </Typography>
          <Table>
            <thead>
              <tr>
                <th style={{ width: "10%" }}></th>
                <th style={{ width: "10%" }}>#</th>
                <th>Standard</th>
                <th style={{ width: "70%" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <IconButton
                    variant="plain"
                    color="neutral"
                    size="sm"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                  </IconButton>
                </td>
                <td>0</td>
                <td>Syllabus</td>
                <td>
                  This standard is here to familiarize yourself with the layout
                  of course information! It is not graded for quality but
                  demonstrates where and how information is accessed! Clicking
                  on this row in the table will dropdown the relevent
                  information for the standard that is being covered in class.
                </td>
              </tr>
              <tr>
                {open ? (
                  <td colSpan={4}>
                    <Sheet
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                        gap: 2,
                        marginTop: 2,
                        marginBottom: 2,
                      }}
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
                            the process of recieving and submitting assignments!"
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
                    </Sheet>
                  </td>
                ) : null}
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </Sheet>
      <Footer />
    </>
  )
}
