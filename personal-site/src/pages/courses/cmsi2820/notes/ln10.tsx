import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import TitleBox from "../../components/title-box"

export default function LectureNotes9() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN9",
          buttonColor: "primary",
          buttonName: "Setting In",
          buttonSlug: "/cmsi-2820/ln9",
        },
        middle: {
          lectureId: "HW3",
          buttonColor: "success",
          buttonName: "Collections Agency",
          buttonSlug: "/cmsi-2820/hw3",
        },
      }}
    >
      <CourseBox>
        <TitleBox title="Settling Down" quote={`"" - `} />
      </CourseBox>
    </CoursePage>
  )
}
