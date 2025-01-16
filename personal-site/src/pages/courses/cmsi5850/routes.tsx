import CMSI5850 from "./cmsi-5850-programming-language-foundations"
import CheatSheet from "./cheat-sheet"
import Syllabus from "./syllabus"
import CMSI5850LectureRoutes from "./notes/lns"
//import CMSI5850HomeworkRoutes from "./assignments/hws"
//import CMSI5850ExamRoutes from "./exams/exs"

const CMSI5850Routes = [
  { path: "/cmsi-5850", element: <CMSI5850 /> },
  { path: "/cmsi-5850/cheat-sheet", element: <CheatSheet /> },
  { path: "/cmsi-5850/syllabus", element: <Syllabus /> },
  ...CMSI5850LectureRoutes,
  //...CMSI5850HomeworkRoutes,
  //...CMSI5850ExamRoutes,
]

export default CMSI5850Routes
