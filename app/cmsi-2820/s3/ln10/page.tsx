import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import ImageBox from "@/components/course/image-box"
import CodeBox from "@/components/course/code-box"

export default function LectureNotes10() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN9",
          buttonColor: "primary",
          buttonName: "Settling In",
          buttonSlug: "/cmsi-2820/ln9",
        },
        middle: {
          lectureId: "HW3",
          buttonColor: "success",
          buttonName: "Storage Wars",
          buttonSlug: "/cmsi-2820/hw3",
        },
        right: {
          lectureId: "LN11",
          buttonColor: "primary",
          buttonName: "Relationship Counseling",
          buttonSlug: "/cmsi-2820/ln11",
        },
      }}
    >
      <CourseBox>
        <TitleBox title="Settling Down" quote={`"" - `} />
      </CourseBox>
    </CoursePage>
  )
}
