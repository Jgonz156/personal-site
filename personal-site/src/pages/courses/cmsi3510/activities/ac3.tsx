import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"

export default function Activity3() {
  return (
    <CoursePage
      type="syllabus"
      courseName="CMSI 3510: Operating Systems"
      courseNumber={3510}
    >
      <CourseBox>
        <TitleBox title="" />
        <TopicBox topics={[""]} />
        Under Construction
      </CourseBox>
    </CoursePage>
  )
}
