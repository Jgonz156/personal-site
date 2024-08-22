import {
  Badge,
  Chip,
  Divider,
  List,
  ListItem,
  Sheet,
  Typography,
} from "@mui/joy"
import CourseCard from "./course-card"
import { CourseStatusBadge, SiteContext } from "./site-context"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import FeedIcon from "@mui/icons-material/Feed"
import SchoolIcon from "@mui/icons-material/School"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import React from "react"
import CourseInfoDump from "./course-info-dump"
import PaperCard from "./paper-card"
import BookCard from "./book-card"
import ProjectCard from "./project-card"

export default function Home() {
  const { settings, dispatch } = React.useContext(SiteContext)
  const courses = [
    {
      title: "Discrete Mathematics for CS",
      code: "2820",
      imageUrl: "/lmu-identity/LMU-Campus-Ariel.jpg",
      slug: "/cmsi-2820",
      status: settings.Home.Courses.CMSI2820.StatusBadge,
      openModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              CMSI2820: {
                ...settings.Home.Courses.CMSI2820,
                ModalVisible: true,
              },
            },
          },
        }),
      closeModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              CMSI2820: {
                ...settings.Home.Courses.CMSI2820,
                ModalVisible: false,
              },
            },
          },
        }),
      modalState: settings.Home.Courses.CMSI2820.ModalVisible,
      courseCardDescription: (
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Sheet>
            Discrete Mathematics for CS is a 4-unit/credit hour hands on course
            that infuses the learning of Discrete theory topics into direct
            application in Python. These topics include Intuitionistic
            Propositional and Predicate Logic, Number Theory, Type Theory,
            Combinatorics, Graph Theory, Set Theory, and a few more topic
            extensions to broaden the application of these topics in Computer
            Science.
          </Sheet>
          <Divider>
            <Chip>Prerequisites</Chip>
          </Divider>
          <Sheet> CMSI 1010 or ENGR 160 or ENGR 1200</Sheet>

          <CourseInfoDump
            sectionNumber={1}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="9:55 AM"
            timeEnd="11:35 AM"
            building="Pereira"
            roomNumber={206}
          />
          <CourseInfoDump
            sectionNumber={2}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="1:45 PM"
            timeEnd="3:25 PM"
            building="Pereira"
            roomNumber={109}
          />
          <CourseInfoDump
            sectionNumber={3}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="6:00 PM"
            timeEnd="7:40 PM"
            building="Seaver"
            roomNumber={304}
          />
        </Sheet>
      ),
    },
  ]
  const selfPapers = [
    {
      title:
        "Investigating the Efficacy of Persistent Data Structures on Asymmetric Scheduling Algorithms for Heterogeneous CPU Architectures",
      authors: ["Gonzalez, Julian"],
      pages: 66,
      abstract:
        "Heterogeneous computing architectures offer performance gains but introduce complexities in scheduling for optimal efficiency. This thesis explores persistent data structures to address these challenges. Investigations revealed runtime overheads associated with the naive persistence implementations, highlighting need for targeted use. A theoretical analysis of the 'Doppler' problem demonstrated how persistence mitigates cache synchronization bottlenecks, particularly in workloads with compute-modify-write patterns on shared data. This research suggests that persistence is most beneficial in heterogeneous systems with significant core-speed disparities. These findings open paths for developing novel scheduling strategies, enhancing resilience, and improving debugging capabilities.",
      link: undefined,
      imageSlug:
        "/paper-covers/PAPER-Investigating the Efficacy of Persistent Data Structures on Asymmetric Scheduling Algorithms for Heterogeneous CPU Architectures-COVER.png",
    },
  ]
  //const otherPapers = [{}];
  const books = [{}]
  const projects = [{}]
  return (
    <Sheet
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Divider>
        <Chip variant="soft" startDecorator={<SchoolIcon />} size="lg">
          Courses
        </Chip>
      </Divider>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <List
          orientation="horizontal"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <ListItem>
            <Badge size="lg" variant="solid" color={"success"}>
              <Chip size="lg">Active</Chip>
            </Badge>
          </ListItem>
          <ListItem>
            <Badge size="lg" variant="solid" color={"danger"}>
              <Chip size="lg">Under Construction</Chip>
            </Badge>
          </ListItem>
          <ListItem>
            <Badge size="lg" variant="solid" color={"neutral"}>
              <Chip size="lg">Inactive</Chip>
            </Badge>
          </ListItem>
        </List>
      </Sheet>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      >
        {courses.map(
          (
            {
              title,
              code,
              imageUrl,
              slug,
              status,
              openModal,
              closeModal,
              modalState,
              courseCardDescription,
            },
            i
          ) => (
            <Badge
              key={i}
              size="lg"
              variant="solid"
              color={
                status === CourseStatusBadge.InProgress
                  ? "success"
                  : status === CourseStatusBadge.UnderConstruction
                  ? "danger"
                  : "neutral"
              }
            >
              <CourseCard
                Title={title}
                Code={code}
                ImageUrl={imageUrl}
                slug={slug}
                openModal={openModal}
                closeModal={closeModal}
                modalState={modalState}
              >
                {courseCardDescription}
              </CourseCard>
            </Badge>
          )
        )}
      </Sheet>
      <Divider>
        <Chip variant="soft" startDecorator={<FeedIcon />} size="lg">
          Papers
        </Chip>
      </Divider>
      <Typography>Here are some papers I have written...</Typography>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      >
        {selfPapers.map(
          ({ title, authors, pages, abstract, link, imageSlug }, i) => (
            <PaperCard
              key={i}
              title={title}
              authors={authors}
              pages={pages}
              abstract={abstract}
              link={link}
              imageSlug={imageSlug}
            />
          )
        )}
      </Sheet>
      <Typography>
        And here are some ones I've read that I find interesting!
      </Typography>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      ></Sheet>
      <Divider>
        <Chip variant="soft" startDecorator={<AutoStoriesIcon />} size="lg">
          Books
        </Chip>
      </Divider>
      <Typography>
        I haven't written any books but here are some great ones that I highly
        recommend! As a clarification for my students: These are NOT your
        textbooks! Those will be found in the course itself!
      </Typography>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      >
        {books.map(({}, i) => (
          <BookCard key={i} />
        ))}
      </Sheet>
      <Divider>
        <Chip variant="soft" startDecorator={<AccountTreeIcon />} size="lg">
          Open Source Projects
        </Chip>
      </Divider>
      <Typography>
        Here are some of the projects I have worked on, am working on currently,
        or just want to show off!
      </Typography>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      >
        {projects.map(({}, i) => (
          <ProjectCard key={i} />
        ))}
      </Sheet>
    </Sheet>
  )
}
