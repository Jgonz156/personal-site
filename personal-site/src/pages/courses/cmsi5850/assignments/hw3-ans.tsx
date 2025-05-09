import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"

export default function Homework1Answers() {
  return (
    <CoursePage
      type="homework"
      courseName="CMSI 5850: Programming Language Foundations"
      courseNumber={5850}
    >
      <CourseBox>
        <iframe
          style={{ height: "5500px" }}
          src="https://cs.lmu.edu/~ray/classes/pls/assignment/3/answers/"
        />
      </CourseBox>
    </CoursePage>
  )
}
