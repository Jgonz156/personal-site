import CMSI3510 from "./cmsi-3510-operating-systems"
import CheatSheet from "./cheat-sheet"
import Syllabus from "./syllabus"
import CMSI3510LectureRoutes from "./notes/lns"
import CMSI3510ActivityRoutes from "./activities/acs"
import CMSI3510HomeworkRoutes from "./assignments/hws"
import CMSI3510ExamRoutes from "./exams/exs"

const CMSI3510Routes = [
  { path: "/cmsi-3510", element: <CMSI3510 /> },
  { path: "/cmsi-3510/cheat-sheet", element: <CheatSheet /> },
  { path: "/cmsi-3510/syllabus", element: <Syllabus /> },
  ...CMSI3510LectureRoutes,
  ...CMSI3510ActivityRoutes,
  ...CMSI3510HomeworkRoutes,
  ...CMSI3510ExamRoutes,
]

export default CMSI3510Routes
