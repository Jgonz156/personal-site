import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "./pages/App.tsx"
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles"
import {
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
} from "@mui/joy"
import CMSI2820 from "./pages/courses/cmsi2820/cmsi-2820-discrete-mathematics-for-cs.tsx"
import { SiteContextProvider } from "./components/site-context.tsx"
import "./index.css"
import CheatSheet from "./pages/courses/cmsi2820/cheat-sheet.tsx"
import Syllabus from "./pages/courses/cmsi2820/syllabus.tsx"
import LectureNotes0 from "./pages/courses/cmsi2820/notes/ln0.tsx"
import LectureNotes1 from "./pages/courses/cmsi2820/notes/ln1.tsx"
import LectureNotes2 from "./pages/courses/cmsi2820/notes/ln2.tsx"
import LectureNotes3 from "./pages/courses/cmsi2820/notes/ln3.tsx"
import LectureNotes4 from "./pages/courses/cmsi2820/notes/ln4.tsx"
import LectureNotes5 from "./pages/courses/cmsi2820/notes/ln5.tsx"
import HW0 from "./pages/courses/cmsi2820/assignments/hw0.tsx"
import HW1 from "./pages/courses/cmsi2820/assignments/hw1.tsx"
import HW2 from "./pages/courses/cmsi2820/assignments/hw2.tsx"
import HW3 from "./pages/courses/cmsi2820/assignments/hw3.tsx"
import HW4 from "./pages/courses/cmsi2820/assignments/hw4.tsx"
import HW5 from "./pages/courses/cmsi2820/assignments/hw5.tsx"
import HW6 from "./pages/courses/cmsi2820/assignments/hw6.tsx"
import HW7 from "./pages/courses/cmsi2820/assignments/hw7.tsx"
import EX0 from "./pages/courses/cmsi2820/exams/ex0.tsx"
import EX1 from "./pages/courses/cmsi2820/exams/ex1.tsx"
import EX2 from "./pages/courses/cmsi2820/exams/ex2.tsx"
import { MathJaxContext } from "better-react-mathjax"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import CMSIX998 from "./pages/courses/cmsiX998/cmsi-X998-independent-study.tsx"

const router = [
  { path: "/", element: <App /> },
  { path: "/cmsi-2820", element: <CMSI2820 /> },
  { path: "/cmsi-2820/cheat-sheet", element: <CheatSheet /> },
  { path: "/cmsi-2820/syllabus", element: <Syllabus /> },
  { path: "/cmsi-2820/ln0", element: <LectureNotes0 /> },
  { path: "/cmsi-2820/ln1", element: <LectureNotes1 /> },
  { path: "/cmsi-2820/ln2", element: <LectureNotes2 /> },
  { path: "/cmsi-2820/ln3", element: <LectureNotes3 /> },
  { path: "/cmsi-2820/ln4", element: <LectureNotes4 /> },
  { path: "/cmsi-2820/ln5", element: <LectureNotes5 /> },
  { path: "/cmsi-2820/hw0", element: <HW0 /> },
  { path: "/cmsi-2820/hw1", element: <HW1 /> },
  { path: "/cmsi-2820/hw2", element: <HW2 /> },
  { path: "/cmsi-2820/hw3", element: <HW3 /> },
  { path: "/cmsi-2820/hw4", element: <HW4 /> },
  { path: "/cmsi-2820/hw5", element: <HW5 /> },
  { path: "/cmsi-2820/hw6", element: <HW6 /> },
  { path: "/cmsi-2820/hw7", element: <HW7 /> },
  { path: "/cmsi-2820/ex0", element: <EX0 /> },
  { path: "/cmsi-2820/ex1", element: <EX1 /> },
  { path: "/cmsi-2820/ex2", element: <EX2 /> },
  { path: "/cmsi-X998", element: <CMSIX998 /> },
]

const materialTheme = materialExtendTheme()

const joyTheme = joyExtendTheme({
  colorSchemes: {
    light: { palette: { warning: { 500: "#c46d0a" } } },
    dark: { palette: { warning: { 500: "#c46d0a" } } },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SiteContextProvider>
      <MathJaxContext>
        <MaterialCssVarsProvider
          theme={{ [MATERIAL_THEME_ID]: materialTheme }}
          defaultMode="dark"
        >
          <JoyCssVarsProvider theme={joyTheme} defaultMode="dark">
            <LocalizationProvider
              dateAdapter={AdapterLuxon}
              adapterLocale="en"
              localeText={{
                calendarWeekNumberHeaderText: "School Week",
                calendarWeekNumberText: (weekNumber) => {
                  const weekOffset = (weekNumber + 34) % 34
                  return weekOffset <= 0 || weekOffset > 16
                    ? ""
                    : weekOffset % 10 === 1 && weekOffset !== 11
                    ? `${weekOffset}st`
                    : weekOffset % 10 === 2 && weekOffset !== 12
                    ? `${weekOffset}nd`
                    : weekOffset % 10 === 3 && weekOffset !== 13
                    ? `${weekOffset}rd`
                    : `${weekOffset}th`
                },
              }}
            >
              <Router>
                <Routes>
                  {router.map(({ path, element }, i) => (
                    <Route key={i} path={path} element={element} />
                  ))}
                </Routes>
              </Router>
            </LocalizationProvider>
          </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
      </MathJaxContext>
    </SiteContextProvider>
  </React.StrictMode>
)
