"use client"
import * as React from "react"
import {
  Sheet,
  ListItemDecorator,
  Tab,
  tabClasses,
  TabList,
  Tabs,
} from "@mui/joy"

import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import SchoolIcon from "@mui/icons-material/School"
import Person from "@mui/icons-material/Person"
import Footer from "../components/global/footer"
import { HomeNavBarState, SiteContext } from "@/contexts/site-context"
import About from "../components/global/about"
import CurriculumVitae from "../components/global/cv"
import Home from "../components/global/home"

const tabs = [
  { title: "Home", icon: <HomeRoundedIcon /> },
  { title: "About Me", icon: <Person /> },
  { title: "CV", icon: <SchoolIcon /> },
]

export default function App() {
  const { settings, dispatch } = React.useContext(SiteContext)
  const colors = ["primary", "success", "danger"] as const

  return (
    <Sheet sx={{ width: "100%", minHeight: "100vh" }}>
      <Sheet
        sx={{
          //zIndex: 1,
          //flexGrow: 1,
          height: "40vh",
          //width: "100vw",
          //minHeight: "100vh",
          //position: "relative",
          backgroundImage: `url(/lmu-identity/LMU-Campus-Ariel.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      />
      <Sheet
        color={colors[settings.Home.NavBarState]}
        variant="solid"
        sx={{
          //zIndex: 2,
          //position: "relative",
          //flexGrow: 1,
          marginTop: -3,
          p: 4,
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          //bgcolor: `${colors[settings.Home.NavBarState]}.500`,
        }}
      >
        <Tabs
          //color={colors[settings.Home.NavBarState]}
          size="lg"
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
              theme.vars.palette[colors[settings.Home.NavBarState]].darkChannel,
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
            {tabs.map(({ title, icon }, i) => (
              <Tab
                key={i}
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
        <Sheet
          sx={{
            marginTop: 4,
            p: 4,
            borderRadius: 12,
            display: "flex",
            //flexDirection: "column",
          }}
        >
          {settings.Home.NavBarState === HomeNavBarState.Home ? (
            <Home />
          ) : settings.Home.NavBarState === HomeNavBarState.AboutMe ? (
            <About />
          ) : settings.Home.NavBarState === HomeNavBarState.CV ? (
            <CurriculumVitae />
          ) : (
            <Sheet>
              I Don't Know How You Got Here, But Uh... You Are Not Mean't To See
              This
            </Sheet>
          )}
        </Sheet>
      </Sheet>
      <Footer />
    </Sheet>
  )
}
