import CourseBox from "../components/course-box"
import CoursePage from "../components/course-page"
import Speak from "../components/speak"

export default function CheatSheet() {
  return (
    <CoursePage type="cheat-sheet">
      <CourseBox>
        <Speak>
          This Cheat Sheet is a living document, much like the rest of this
          site! As we progress through the course standards this page will fill
          with more and more information to use as reference! It features
          dividers that separate each standard from each other and topic
          separations if the are relevant.
        </Speak>
      </CourseBox>
    </CoursePage>
  )
}
