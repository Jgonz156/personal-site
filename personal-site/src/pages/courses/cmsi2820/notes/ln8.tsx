import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"

export default function LectureNotes6() {
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
      }}
    >
      <CourseBox>b</CourseBox>
    </CoursePage>
  )
}
