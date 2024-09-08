import { DateTime } from "luxon";
import CourseBox from "../../components/course-box";
import CoursePage from "../../components/course-page";
import DirectoryTree from "../../components/directory-tree";
import DueDateCalendar from "../../components/due-date-calendar";
import LinkButton from "../../components/link-button";
import Speak from "../../components/speak";
import TitleBox from "../../components/title-box";
import TopicBox from "../../components/topic-box";

export default function Homework1() {
  return (
    <CoursePage type="homework">
      <CourseBox>
        <TitleBox title="HW2:" />
        <DueDateCalendar dueDate={DateTime.local(2024, 9, 20, 23, 59)} />
        <TopicBox topics={[]} />
        <Speak></Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Written Section" quote="Points: " />

        <LinkButton color="success" to="">
          Written HW2 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: " />
        <DirectoryTree filesAsJSON={{}} />
        <Speak>
          As a refresher, here is the helper video that goes from complete start
          to finish for the process of receiving, setting up, and turning in
          your programming portion of the HW.
        </Speak>
        <LinkButton
          color="success"
          to="https://lmula.zoom.us/rec/share/LHMwk2fFto5pKnfMEKK5ZBdiwkRO0WacAkDyfbdqMrDz8Eo9dwyFlnYq5a_I8iX3.aa-YDE0MpCpp2sK8"
        >
          Helper Video
        </LinkButton>
        <Speak>
          Linked below is the GitHub Classroom assignment link and the
          Brightspace turn in link both as buttons
        </Speak>
        <LinkButton color="success" to="">
          GitHub Assignment
        </LinkButton>
        <LinkButton color="success" to="">
          Programming HW2 Turn In
        </LinkButton>
      </CourseBox>
    </CoursePage>
  );
}
