import CoursePage from "../../../components/course-page"
//import TitleBox from "../../../components/title-box"
import CourseBox from "../../../components/course-box"

export default function TSPL() {
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
        {/* 
        <TitleBox
          title="Information and Its Consequences..."
          quote={`"Education is the kindling of a flame, not the filling of a vessel" - Socrates`}
        />
        */}
        <iframe
          style={{ height: "33000px" }}
          src="https://cs.lmu.edu/~ray/notes/plstudy/"
        />
      </CourseBox>
    </CoursePage>
  )
}
