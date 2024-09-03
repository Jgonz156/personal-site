import CourseBox from "../../components/course-box";
import CoursePage from "../../components/course-page";
import Speak from "../../components/speak";

export default function LectureNotes4() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        middle: {
          lectureId: "HW1",
          buttonColor: "success",
          buttonName: "Think Class, Think!",
          buttonSlug: "/cmsi-2820/hw1",
        },
      }}
    >
      <CourseBox>
        <Speak>Under Construction Please Come Back Later!</Speak>
      </CourseBox>
    </CoursePage>
  );
}
