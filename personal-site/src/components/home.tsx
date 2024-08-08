import { Badge, Box, Chip, Divider, List, ListItem, Sheet } from "@mui/joy"
import CourseCard from "./course-card"
import { CourseStatusBadge, SiteContext } from "./site-context"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import React from "react"
import CourseInfoDump from "./course-info-dump"

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
            Discrete Mathematics for CS is a hands on course that infuses the
            learning of Discrete theory topics into direct application in
            Python. These topics include Intuitionistic Propositional and
            Predicate Logic, Number Theory, Type Theory, Combinatorics, Graph
            Theory, Set Theory, and a few more topic extensions to broaden the
            application of these topics in Computer Science.
          </Sheet>
          <Divider>
            <Chip>Prerequisites</Chip>
          </Divider>
          <Sheet> CMSI 1010 or ENGR 160 or ENGR 1200</Sheet>

          <CourseInfoDump
            sectionNumber={1}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="9:55AM"
            timeEnd="11:35AM"
            building="Pereira"
            roomNumber={206}
          />
          <CourseInfoDump
            sectionNumber={2}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="1:45PM"
            timeEnd="3:25AM"
            building="Pereira"
            roomNumber={109}
          />
          <CourseInfoDump
            sectionNumber={3}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="6:00PM"
            timeEnd="7:40PM"
            building="Seaver"
            roomNumber={304}
          />
        </Sheet>
      ),
    },
  ]
  return (
    <Sheet
      sx={{
        height: 1000,
        gap: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Divider>
        <Chip variant="soft" startDecorator={<AutoStoriesIcon />} size="lg">
          Courses
        </Chip>
      </Divider>
      <Box
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
      </Box>
      <Box
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
      </Box>
      <Divider />
    </Sheet>
  )
}
