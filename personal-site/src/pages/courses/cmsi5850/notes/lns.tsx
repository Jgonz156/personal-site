import TSPL from "./standard-1-theory-logic-and-math/the-study-of-programming-languages"
import L from "./standard-1-theory-logic-and-math/logic"
import TCS from "./standard-1-theory-logic-and-math/theories-in-computer-science.tsx"
import FM from "./standard-1-theory-logic-and-math/foundations-of-mathematics.tsx"

const CMSI5850LectureRoutes = [
  { path: "/cmsi-5850/the-study-of-programming-languages", element: <TSPL /> },
  { path: "/cmsi-5850/logic", element: <L /> },
  { path: "/cmsi-5850/theories-in-computer-science", element: <TCS /> },
  { path: "/cmsi-5850/foundations-of-mathematics", element: <FM /> },
]

export default CMSI5850LectureRoutes
