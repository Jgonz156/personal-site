import CourseBox from "../../../components/course-box"
import CoursePage from "../../../components/course-page"
import TitleBox from "../../../components/title-box"

export default function LectureNotes13() {
  return (
    <CoursePage
      type="notes"
      courseName="CMSI 2820: Discrete Mathematics for CS"
      courseNumber={2820}
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
