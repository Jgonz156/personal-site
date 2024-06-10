import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Sheet,
  Table,
  Typography,
} from "@mui/joy"
import Footer from "../../components/footer"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import BackpackIcon from "@mui/icons-material/Backpack"
import DescriptionIcon from "@mui/icons-material/Description"
import HomeIcon from "@mui/icons-material/Home"
import React from "react"

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
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            p: 4,
            borderRadius: 12,
            gap: 4,
          }}
        >
          <Button color="primary" startDecorator={<HomeIcon />}>
            CMSI 2820: Discrete Mathematics for CS
          </Button>
          <Button color="success" startDecorator={<BackpackIcon />}>
            Course Info Cheat Sheet!
          </Button>
          <Button color="warning" startDecorator={<DescriptionIcon />}>
            Syllabus
          </Button>
        </Sheet>
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
                      <Card
                        color="primary"
                        orientation="vertical"
                        size="md"
                        variant="soft"
                        sx={{ maxWidth: "40%", minWidth: "2in" }}
                      >
                        <CardContent>
                          <Typography level="title-sm">
                            LN 1: Reading Course Material!
                          </Typography>
                          <Typography level="body-sm">
                            Here is a sample of what the lecture notes will look
                            like! This one just explains the color coding I use
                            for information and displays the small interactive
                            modules I might have throughout the notes.
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            color="primary"
                            variant="solid"
                            sx={{ maxWidth: "1in" }}
                          >
                            Open
                          </Button>
                        </CardActions>
                      </Card>
                      <Card
                        color="success"
                        orientation="vertical"
                        size="md"
                        variant="soft"
                        sx={{ maxWidth: "40%", minWidth: "2in" }}
                      >
                        <CardContent>
                          <Typography level="title-sm">
                            HW 0: Practicing Homework
                          </Typography>
                          <Typography level="body-sm">
                            This is a small assignment to get you familiar with
                            the process of recieving and submitting assignments!
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            color="success"
                            variant="solid"
                            sx={{ maxWidth: "1in" }}
                          >
                            Open
                          </Button>
                        </CardActions>
                      </Card>
                      <Card
                        color="danger"
                        orientation="vertical"
                        size="md"
                        variant="soft"
                        sx={{ maxWidth: "40%", minWidth: "2in" }}
                      >
                        <CardContent>
                          <Typography level="title-sm">
                            EX 0: Syllabus
                          </Typography>
                          <Typography level="body-sm">
                            Exams are an important part of how you communicate
                            your understanding of the material! Here you will
                            take one on the most vital parts of the course
                            syllabus! I promise its not hard.
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            color="danger"
                            variant="solid"
                            sx={{ maxWidth: "1in" }}
                          >
                            Open
                          </Button>
                        </CardActions>
                      </Card>
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
