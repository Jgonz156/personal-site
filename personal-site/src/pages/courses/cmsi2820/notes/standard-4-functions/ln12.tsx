import CourseBox from "../../../components/course-box"
import CoursePage from "../../../components/course-page"
import TitleBox from "../../../components/title-box"

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
