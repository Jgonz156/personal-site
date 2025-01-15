import CMSI2820 from "./cmsi-2820-discrete-mathematics-for-cs"
import CheatSheet from "./cheat-sheet"
import Syllabus from "./syllabus"
import CMSI2820LectureRoutes from "./notes/lns"
import CMSI2820HomeworkRoutes from "./assignments/hws"
import CMSI2820ExamRoutes from "./exams/exs"

const CMSI2820Routes = [
  { path: "/cmsi-2820", element: <CMSI2820 /> },
  { path: "/cmsi-2820/cheat-sheet", element: <CheatSheet /> },
  { path: "/cmsi-2820/syllabus", element: <Syllabus /> },
  ...CMSI2820LectureRoutes,
  ...CMSI2820HomeworkRoutes,
  ...CMSI2820ExamRoutes,
]

export default CMSI2820Routes
