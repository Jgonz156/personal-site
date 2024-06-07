import { Badge, Box, Chip, Divider, List, ListItem, Sheet } from "@mui/joy"
import CourseCard from "./course-card"
import { CourseStatusBadge, SiteContext } from "./site-context"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import React from "react"

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
          ({
            title,
            code,
            imageUrl,
            slug,
            status,
            openModal,
            closeModal,
            modalState,
          }) => (
            <Badge
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
              />
            </Badge>
          )
        )}
      </Box>
      <Divider />
    </Sheet>
  )
}
