import CourseBox from "../../../components/course-box"
import CoursePage from "../../../components/course-page"
import TitleBox from "../../../components/title-box"

export default function LectureNotes10() {
  return (
    <CoursePage
      type="notes"
      courseName="CMSI 2820: Discrete Mathematics for CS"
      courseNumber={2820}
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
