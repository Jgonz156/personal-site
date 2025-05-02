import TSPL from "./standard-1-theory-logic-and-math/the-study-of-programming-languages"
import L from "./standard-1-theory-logic-and-math/logic"
import TCS from "./standard-1-theory-logic-and-math/theories-in-computer-science.tsx"
import FM from "./standard-1-theory-logic-and-math/foundations-of-mathematics.tsx"
import LT from "./standard-2-language-theory/language-theory.tsx"
import SY from "./standard-2-language-theory/syntax.tsx"
import SE from "./standard-2-language-theory/semantics.tsx"
import O from "./standard-3-syntax/ohm.tsx"
import A from "./standard-3-syntax/astro.tsx"
import B from "./standard-3-syntax/bella.tsx"
import OS from "./standard-3-syntax/operational-semantics.tsx"
import LC from "./standard-3-syntax/lambda-calculus.tsx"
import DS from "./standard-3-syntax/denotational-semantics.tsx"

const CMSI5850LectureRoutes = [
  { path: "/cmsi-5850/the-study-of-programming-languages", element: <TSPL /> },
  { path: "/cmsi-5850/logic", element: <L /> },
  { path: "/cmsi-5850/theories-in-computer-science", element: <TCS /> },
  { path: "/cmsi-5850/foundations-of-mathematics", element: <FM /> },
  { path: "/cmsi-5850/language-theory", element: <LT /> },
  { path: "/cmsi-5850/syntax", element: <SY /> },
  { path: "/cmsi-5850/semantics", element: <SE /> },
  { path: "/cmsi-5850/ohm", element: <O /> },
  { path: "/cmsi-5850/astro", element: <A /> },
  { path: "/cmsi-5850/bella", element: <B /> },
  { path: "/cmsi-5850/operational-semantics", element: <OS /> },
  { path: "/cmsi-5850/denotational-semantics", element: <DS /> },
  { path: "/cmsi-5850/lambda-calculus", element: <LC /> },
]

export default CMSI5850LectureRoutes
