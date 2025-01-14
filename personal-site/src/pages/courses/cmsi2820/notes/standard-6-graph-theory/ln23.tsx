import CourseBox from "../../../components/course-box"
import CoursePage from "../../../components/course-page"
//import TitleBox from "../../../components/title-box"
//import TopicBreak from "../../../components/topic-break"

export default function LectureNotes23() {
  return (
    <CoursePage
      type="notes"
      courseName="CMSI 2820: Discrete Mathematics for CS"
      courseNumber={2820}
      stepperInfo={{
        left: {
          lectureId: "LN22",
          buttonColor: "primary",
          buttonName: "",
          buttonSlug: "/cmsi-2820/ln22",
        },
        middle: {
          lectureId: "HW6",
          buttonColor: "success",
          buttonName: "(Warning: Graphic Content)",
          buttonSlug: "/cmsi-2820/hw6",
        },
      }}
    >
      <CourseBox>Under Construction</CourseBox>
    </CoursePage>
  )
}
