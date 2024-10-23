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
          lectureId: "LN10",
          buttonColor: "primary",
          buttonName: "Settling Down",
          buttonSlug: "/cmsi-2820/ln10",
        },
        middle: {
          lectureId: "HW3",
          buttonColor: "success",
          buttonName: "Storage Wars",
          buttonSlug: "/cmsi-2820/hw3",
        },
      }}
    >
      <CourseBox>
        <TitleBox title="Relationship Counseling" quote={`"" - `} />
      </CourseBox>
    </CoursePage>
  )
}
