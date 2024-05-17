import * as React from "react"
import Sheet from "@mui/joy/Sheet"
import {
  Box,
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

const tabs = [
  { title: "Home", icon: <HomeRoundedIcon /> },
  { title: "Courses", icon: <AutoStoriesIcon /> },
  { title: "About Me", icon: <Person /> },
  { title: "CV", icon: <SchoolIcon /> },
]

const courses = [
  {
    title: "Discrete Mathematics for CS",
    code: "2820",
    imageUrl: "/lmu-identity/LMU-Campus-Ariel.jpg",
    slug: "/cmsi-2820",
  },
]

export default function Home() {
  const [index, setIndex] = React.useState(0)
  const colors = ["primary", "danger", "success", "warning"] as const
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
              bgcolor: `${colors[index]}.500`,
            }}
          >
            <Tabs
              size="lg"
              aria-label="Bottom Navigation"
              value={index}
              onChange={(_event, value) => setIndex(value as number)}
              sx={(theme) => ({
                p: 1,
                borderRadius: 16,
                maxWidth: "95vw",
                mx: "auto",
                boxShadow: theme.shadow.sm,
                "--joy-shadowChannel":
                  theme.vars.palette[colors[index]].darkChannel,
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
                    {...(index === 0 && { color: colors[0] })}
                  >
                    <ListItemDecorator>{icon}</ListItemDecorator>
                    {title}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
            <Sheet sx={{ marginTop: 4, p: 1, borderRadius: 12 }}>
              {index === 0 ? (
                <></>
              ) : index === 1 ? (
                <>
                  {courses.map(({ title, code, imageUrl, slug }) => (
                    <CourseCard
                      Title={title}
                      Code={code}
                      ImageUrl={imageUrl}
                      slug={slug}
                    />
                  ))}
                </>
              ) : index === 2 ? (
                <></>
              ) : index === 3 ? (
                <></>
              ) : (
                <></>
              )}
            </Sheet>
          </Box>
        </Sheet>
      </Sheet>
      <Footer />
    </Box>
  )
}
