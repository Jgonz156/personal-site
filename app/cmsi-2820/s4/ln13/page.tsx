import { MathJax } from "better-react-mathjax"

import CoursePage from "@/components/course/course-page"
import CourseBox from "@/components/course/course-box"
import TitleBox from "@/components/course/title-box"
import Speak from "@/components/course/speak"
import TopicBreak from "@/components/course/topic-break"
import PhilosophyBreak from "@/components/course/philosophy-break"
import ImageBox from "@/components/course/image-box"
import CodeBox from "@/components/course/code-box"

export default function LectureNotes13() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN12",
          buttonColor: "primary",
          buttonName: "This Lamb Don't Baa",
          buttonSlug: "/cmsi-2820/ln12",
        },
        middle: {
          lectureId: "HW4",
          buttonColor: "success",
          buttonName: "Silence of the Lambdas",
          buttonSlug: "/cmsi-2820/hw4",
        },
        /*
        right: {
          lectureId: "LN14",
          buttonColor: "primary",
          buttonName: "",
          buttonSlug: "/cmsi-2820/ln14",
        },*/
      }}
    >
      <CourseBox>
        <TitleBox title="This Lamb Don't Baa" quote={`"" - `} />
      </CourseBox>
    </CoursePage>
  )
}
