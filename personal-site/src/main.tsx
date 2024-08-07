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
import Assignment0 from "./pages/courses/cmsi2820/assignments/assignment0.tsx"
import Exam0 from "./pages/courses/cmsi2820/exams/ex0.tsx"
import LectureNotes1 from "./pages/courses/cmsi2820/notes/ln1.tsx"
import { MathJaxContext } from "better-react-mathjax"

const router = [
  { path: "/", element: <App /> },
  { path: "/cmsi-2820", element: <CMSI2820 /> },
  { path: "/cmsi-2820/cheat-sheet", element: <CheatSheet /> },
  { path: "/cmsi-2820/syllabus", element: <Syllabus /> },
  { path: "/cmsi-2820/ln0", element: <LectureNotes0 /> },
  { path: "/cmsi-2820/ln1", element: <LectureNotes1 /> },
  { path: "/cmsi-2820/hw0", element: <Assignment0 /> },
  { path: "/cmsi-2820/ex0", element: <Exam0 /> },
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
