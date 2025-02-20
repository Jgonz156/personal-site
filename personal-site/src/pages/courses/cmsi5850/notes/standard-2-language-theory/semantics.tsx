import CoursePage from "../../../components/course-page"
import CourseBox from "../../../components/course-box"

export default function SE() {
  return (
    <CoursePage
      type="notes"
      courseName="CMSI 5850: Programming Language Foundations"
      courseNumber={5850}
      /* 
      stepperInfo={{
        middle: {
          lectureId: "HW1",
          buttonColor: "success",
          buttonName: "Think Class, Think!",
          buttonSlug: "/cmsi-2820/hw1",
        },
        right: {
          lectureId: "LN2",
          buttonColor: "primary",
          buttonName: "Making Logical Connections",
          buttonSlug: "/cmsi-2820/ln2",
        },
      }}
        */
    >
      <CourseBox>
        <iframe
          style={{ height: "17500px" }}
          src="https://cs.lmu.edu/~ray/notes/semantics/"
        />
      </CourseBox>
    </CoursePage>
  )
}
