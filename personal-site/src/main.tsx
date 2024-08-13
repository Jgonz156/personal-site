import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "./pages/App.tsx"
import { CssVarsProvider } from "@mui/joy"
import CMSI2820 from "./pages/courses/cmsi2820/cmsi-2820-discrete-mathematics-for-cs.tsx"
import { SiteContextProvider } from "./components/site-context.tsx"
import "./index.css"
import CheatSheet from "./pages/courses/cmsi2820/cheat-sheet.tsx"
import Syllabus from "./pages/courses/cmsi2820/syllabus.tsx"
import LectureNotes0 from "./pages/courses/cmsi2820/notes/ln0.tsx"
import LectureNotes1 from "./pages/courses/cmsi2820/notes/ln1.tsx"
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

const router = [
  { path: "/", element: <App /> },
  { path: "/cmsi-2820", element: <CMSI2820 /> },
  { path: "/cmsi-2820/cheat-sheet", element: <CheatSheet /> },
  { path: "/cmsi-2820/syllabus", element: <Syllabus /> },
  { path: "/cmsi-2820/ln0", element: <LectureNotes0 /> },
  { path: "/cmsi-2820/ln1", element: <LectureNotes1 /> },
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
]

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SiteContextProvider>
      <MathJaxContext>
        <CssVarsProvider defaultMode="dark">
          <Router>
            <Routes>
              {router.map(({ path, element }, i) => (
                <Route key={i} path={path} element={element} />
              ))}
            </Routes>
          </Router>
        </CssVarsProvider>
      </MathJaxContext>
    </SiteContextProvider>
  </React.StrictMode>
)
