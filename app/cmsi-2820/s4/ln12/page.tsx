import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import ImageBox from "@/components/course/image-box"
import CodeBox from "@/components/course/code-box"

export default function LectureNotes12() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        middle: {
          lectureId: "HW3",
          buttonColor: "success",
          buttonName: "Collections Agency",
          buttonSlug: "/cmsi-2820/hw3",
        },
        right: {
          lectureId: "LN13",
          buttonColor: "primary",
          buttonName: "Free Range Variables",
          buttonSlug: "/cmsi-2820/ln13",
        },
      }}
    >
      <CourseBox>
        <TitleBox title="This Lamb Don't Baa" quote={`"" - `} />
      </CourseBox>
    </CoursePage>
  )
}
