import CourseBox from "../../components/course-box";
import CoursePage from "../../components/course-page";
import Speak from "../../components/speak";

export default function LectureNotes3() {
  return (
    <CoursePage
      type="notes"
      stepperInfo={{
        left: {
          lectureId: "LN2",
          buttonColor: "primary",
          buttonName: "Assumptions Make an Argument out of You and Me",
          buttonSlug: "/cmsi-2820/ln2",
        },
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
