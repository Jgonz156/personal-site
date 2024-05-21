import * as React from "react"
import Sheet from "@mui/joy/Sheet"
import {
  Badge,
  Box,
  Chip,
  Divider,
  ListItemDecorator,
  Tab,
  tabClasses,
  TabList,
  Tabs,
} from "@mui/joy"
import CourseCard from "../components/course-card"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import SchoolIcon from "@mui/icons-material/School"
import Person from "@mui/icons-material/Person"
import Footer from "../components/footer"
import {
  CourseStatusBadge,
  HomeNavBarState,
  SiteContext,
} from "../components/site-context"

const tabs = [
  { title: "Home", icon: <HomeRoundedIcon /> },
  { title: "About Me", icon: <Person /> },
  { title: "CV", icon: <SchoolIcon /> },
]

export default function Home() {
  const { settings, dispatch } = React.useContext(SiteContext)
  const colors = ["primary", "success", "danger"] as const
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
    <Box sx={{ width: "100vw" }}>
      <Box
        sx={{
          zIndex: 1,
          flexGrow: 1,
          height: "40vh",
          //width: "100vw",
          //minHeight: "100vh",
          position: "relative",
          backgroundImage: `url(/lmu-identity/LMU-Campus-Ariel.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      />
      <Sheet>
        <Sheet>
          <Box
            sx={{
              zIndex: 2,
              position: "relative",
              flexGrow: 1,
              marginTop: -3,
              p: 4,
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              bgcolor: `${colors[settings.Home.NavBarState]}.500`,
            }}
          >
            <Tabs
              size="lg"
              aria-label="Bottom Navigation"
              value={settings.Home.NavBarState}
              onChange={(_event, value) =>
                dispatch({
                  field: "Home",
                  value: { ...settings.Home, NavBarState: value },
                })
              }
              sx={(theme) => ({
                p: 1,
                borderRadius: 16,
                maxWidth: "95vw",
                mx: "auto",
                boxShadow: theme.shadow.sm,
                "--joy-shadowChannel":
                  theme.vars.palette[colors[settings.Home.NavBarState]]
                    .darkChannel,
                [`& .${tabClasses.root}`]: {
                  py: 1,
                  flex: 1,
                  transition: "0.3s",
                  fontWeight: "md",
                  fontSize: "md",
                  [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                    opacity: 0.7,
                  },
                },
              })}
            >
              <TabList
                variant="plain"
                size="sm"
                disableUnderline
                sx={{ borderRadius: "lg", p: 0 }}
              >
                {tabs.map(({ title, icon }) => (
                  <Tab
                    disableIndicator
                    orientation="vertical"
                    {...(settings.Home.NavBarState === 0 && {
                      color: colors[0],
                    })}
                  >
                    <ListItemDecorator>{icon}</ListItemDecorator>
                    {title}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
            <Sheet sx={{ marginTop: 4, p: 4, borderRadius: 12 }}>
              {settings.Home.NavBarState === HomeNavBarState.Home ? (
                <Sheet
                  sx={{
                    height: 1000,
                    gap: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Divider>
                    <Chip
                      variant="soft"
                      startDecorator={<AutoStoriesIcon />}
                      size="lg"
                    >
                      Courses
                    </Chip>
                  </Divider>
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
                        //slug,
                        status,
                        openModal,
                        closeModal,
                        modalState,
                      }) => (
                        <Badge
                          size="sm"
                          variant="solid"
                          color={
                            status === CourseStatusBadge.InProgress
                              ? "success"
                              : status === CourseStatusBadge.UnderConstruction
                              ? "danger"
                              : "neutral"
                          }
                          badgeContent={status as string}
                        >
                          <CourseCard
                            Title={title}
                            Code={code}
                            ImageUrl={imageUrl}
                            //slug={slug}
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
              ) : settings.Home.NavBarState === HomeNavBarState.AboutMe ? (
                <Sheet sx={{ height: 1000 }}></Sheet>
              ) : settings.Home.NavBarState === HomeNavBarState.CV ? (
                <Sheet sx={{ height: 1000 }}></Sheet>
              ) : (
                <Sheet sx={{ height: 1000 }}></Sheet>
              )}
            </Sheet>
          </Box>
        </Sheet>
      </Sheet>
      <Footer />
    </Box>
  )
}
