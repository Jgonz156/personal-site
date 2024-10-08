import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import TitleBox from "../../components/title-box"

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
