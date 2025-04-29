import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import LinkButton from "../../components/link-button"
import QuestionBox from "../../components/question-box"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"

export default function Activity2() {
  return (
    <CoursePage
      type="syllabus"
      courseName="CMSI 3510: Operating Systems"
      courseNumber={3510}
    >
      <CourseBox>
        <TitleBox title="AC 2: Saved by The Schedule" />
        <TopicBox
          topics={["Scheduling", "Batch, Interactive, and Real Time Systems"]}
        />
        Welcome to the second activity of CMSI 3510! In this activity, you will
        solving worksheets in a manner that forces you into the shoes of the CPU
        and the scheduler controlling it!
      </CourseBox>
      <CourseBox>
        <TitleBox title="Materials Required" />
        <Speak>
          In this game, we will be going straight back to elementary school! You
          will be tasked with completing as many worksheets under the given
          constraints as possible. The game will be multi-stage and receiving
          points is altered based on the stage so watch out!
        </Speak>
        <Speak>We will need the following materials:</Speak>
        <Speak>
          Roster of participants as this activity is graded by participation,
          not win or lose.
        </Speak>
        <Speak>
          A method of writing for each student. This can be a pen, pencil, or
          even a crayon if you are feeling adventurous! Ideally each student
          gets their own color.
        </Speak>
        <Speak>
          At least a ream or so of paper (with the appropriate amount of ink) to
          print all the worksheets.
        </Speak>
        <Speak>
          4 "buckets" of some kind to hold student submissions (The students are
          divided into 4 groups)
        </Speak>
        <Speak>
          A timer used to keep the "race" on track to ensure time to engage with
          every stage.
        </Speak>
        <Speak>
          A bell or some other method of signaling used to denote special events
          during each stage.
        </Speak>
        <QuestionBox qid="I2">
          Any worksheet that you can find online will work. However, note that
          the difficulty of the worksheet will adjust the takeaways from the
          activity overall. I recommend something easy to facilitate a fun and
          fast paced nature, but hard enough to keep the pace manageable! Linked
          below is Super Teach Work Worksheets which is a great place to get
          started!
          <LinkButton
            to="https://www.superteacherworksheets.com/"
            color="primary"
          >
            Super Teacher Worksheets
          </LinkButton>
        </QuestionBox>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Overall Activity Breakdown" />
        <Speak>
          Here is how the activity will work, step by step, until completion. It
          will be organized into 3 main stages.
        </Speak>
        <Speak>
          The preparation will see the proctor split the participants into four
          equal quarters. These will be the members of Teams 1 through 4.
          (Recommended manner to split the participants is by location in
          classroom, split room into four quadrants.)
        </Speak>
        <Speak>
          Once everyone is split up, give everyone writing utensils and then
          give the explanation for the Batch System stage.
        </Speak>
        <Speak>
          The Batch System stage will be the first stage of the activity. The
          stage can last as long as desired but ideally it is 15 min.
        </Speak>
        <Speak>
          Once the Batch System stage is over, count all collected worksheets
          and give each team a score, keep team submissions separate and use
          them for reflection on the activity.
        </Speak>
        <Speak>
          Once reflection, collection, and counting scores is over, move on to
          the Interactive System stage and give the explanation.
        </Speak>
        <Speak>
          The Interactive System stage will be the second stage of the activity.
          The stage can last as long as desired but ideally it is also around 15
          min.
        </Speak>
        <Speak>
          Once the Interactive System stage is over, repeat the same from
          before, reflect on submissions count scores and move to the last
          stage, Real-Time Systems.
        </Speak>
        <Speak>
          Repeat as before with the Real-Time System stage. Bring everyone
          together to reflect and read the discussion questions at the end. With
          that the activity and the day is over!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Batch System Stage" />
        <Speak>
          Batch Systems have the most straightforward scheduling priorities as
          they focus on getting the most work done in the least amount of time.
          These systems have the least restrictions on them to ensure high
          hardware utilization and job throughput. In this stage, you will be
          modeling those same priorities. The goal of this stage is to complete
          as many worksheets as possible in the given time, with the least
          number of activity restrictions.
        </Speak>
        <Speak>
          We will be modeling the most common batch scheduling algorithm during
          this stage: First Come First Serve. The proctor will serve as the
          scheduler, giving out the worksheets (tasks) to each student (core).
        </Speak>
        <Speak>
          Given that this is FCFS, students will come up to the proctor and must
          take the job given to them. Once they have the job, they must return
          to their desk and complete the worksheet before returning to the
          proctor to receive their next job. The proctor will check over the
          "completed" worksheets to determine if they are correct and if they
          are, they will be counted towards the team score. If they are not
          correct, the proctor will give them back to the student to fix. Once
          the worksheet is accepted, the student may get another worksheet and
          repeat the process.
        </Speak>
        <QuestionBox qid={"Game Rules"}>
          <QuestionBox qid={"R1"}>
            You may NOT have any of your teammates contribute to the completion
            of your worksheet. (You may speak to ask for help, chat, or have
            fun, but no one can write for you!)
          </QuestionBox>
          <QuestionBox qid={"R2"}>
            You are responsible for getting your own worksheets and returning
            them to the proctor. (You are not allowed to have someone else get
            your worksheets for you!)
          </QuestionBox>
          <QuestionBox qid={"R3"}>
            No "Cutting Corners", rushed worked that is not completed to the
            desired quality will not be accepted toward your teams points,
            however you do reserve the ability to fix the mistakes.(Your
            computer doesn't skip computation steps or return incomplete data,
            so you can't either!)
          </QuestionBox>
        </QuestionBox>
        <Speak>
          Other than the restrictions above, you are allowed to chat, have fun,
          get loud, and move around!
        </Speak>
        <Speak>
          Additionally, the proctor may pre-sort the jobs, give additional job
          choices while handing them out, or alter rules as fit to display neat
          data patterns through the activity.
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Interactive System Stage" />
        <Speak>
          Interactive Systems place a priority on responsiveness as it plays a
          crucial role in ensuring the device it not perceived as "sluggish" or
          "slow". As such, these systems focus less on overall job throughput
          and instead have more complex scheduling techniques the ensure many
          jobs get worked on as time progresses. In this stage, you will be
          modeling those same priorities. The goal of this stage is still to
          complete as many worksheets as possible in the given time, but now
          with some restrictions and a special event!
        </Speak>
        <Speak>
          We will be modeling the most common interactive scheduling algorithm
          during this stage: Round Robin. This alters each main area of the
          activity from previous. The proctor will serve as the scheduler and
          time quanta controller. Students are, within each group, now divided
          into workers and a runner. Starting with the proctor, they
          additionally control the time quanta of all students via a bell or
          other alert system. The proctor will ring the bell when they feel the
          time quanta is over. When the bell is heard, students must switch
          their job with the closest teammate and continue it from where they
          left off.
        </Speak>
        <Speak>
          As a recommendation, students should arrange their groups in a ring
          and choose counter-clockwise as the direction to send their job in
          when the bell is heard. However, this can be left as something the
          team can determine on their own if desired.
        </Speak>
        <Speak>
          Students are now subdivided into workers and a runner. A worker's job
          is to complete the task they are assigned by the runner. Workers stay
          at their seat and only submit and receive work from their teams
          runner. The runner is responsible for managing the teams workers. The
          runner collects completed work from their workers and submits it to
          the proctor for scoring. The runner is also responsible for collecting
          new work from the proctor and distributing it to their workers. A
          worker may only have one job at a time, but the runner, may have as
          many jobs in their possession as they have teammates. The runner may
          not work on any worksheets.
        </Speak>
        <Speak>
          Importantly, the last additional rule is that when the proctor rings
          the bell to alert the time quanta being over, not only do the workers
          worksheets swap, but the roles do as well. Meaning that the runner
          must now become a worker and the next worker must become the runner.
        </Speak>
        <QuestionBox qid={"Game Rules"}>
          <QuestionBox qid={"R1"}>
            As a Worker, You must only contribute work to the worksheet
            currently in your possession. (You may speak to ask for help, chat,
            or have fun, but no one can write for you!)
          </QuestionBox>
          <QuestionBox qid={"R2"}>
            As a Runner, You may NOT contribute to the completion of any of your
            teams worksheets. (You may speak to ask for help, chat, or have fun,
            but you can't write for anyone or have them run their own
            submissions!)
          </QuestionBox>
          <QuestionBox qid={"R3"}>
            As a Worker, You must stay seated and complete only the work
            assigned to you by your runner.
          </QuestionBox>
          <QuestionBox qid={"R4"}>
            As a Runner, You must sit as desired, but you may only manage
            others.
          </QuestionBox>
          <QuestionBox qid={"R5"}>
            No "Cutting Corners", rushed worked that is not completed to the
            desired quality will not be accepted toward your teams points,
            however you do reserve the ability to fix the mistakes.(Your
            computer doesn't skip computation steps or return incomplete data,
            so you can't either!)
          </QuestionBox>
        </QuestionBox>
        <Speak>
          Other than the restrictions above, you are allowed to chat, have fun,
          and get loud!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Real-Time System Stage" />
        <Speak>
          Real-Time Systems are designed to abide by deadlines set to user
          expectations as opposed to throughput, response time, etc. While these
          systems can benefit from those qualities, the major focus is on
          ensuring that when a computation is due, it arrives on time. As such,
          these systems are used in critical applications and embedded systems
          where computation ability is modest in scope or in power. In this
          stage, you will be model those same conditions. The goal of this stage
          is still to complete as many worksheets as possible in the given time,
          but now with even more restrictions and a more structured scoring
          system!
        </Speak>
        <Speak>
          We will be modeling the most common real-time scheduling algorithm
          during this stage: Earliest Deadline First. This alters each main area
          of the activity from previous again. The proctor will now only serve
          as the deadline controller. Students are, within each group, now all
          workers and may schedule themselves as desired. Starting with the
          proctor, they control the time deadline of all assigned student
          worksheets via a bell or other alert system. The proctor will ring the
          bell when they feel a deadline is reached. When the bell is heard,
          students must immediately stop performing work.
        </Speak>
        <Speak>
          Students are now only workers as defined in the Batch System stage.
          Students are now allowed to swap work with one another as they see fit
          within their group. However work submission and collection is
          modified. The proctor will now split all uncompleted worksheets into 4
          equally sized piles and assign one pile to each group. Scheduling of
          work from the pile to workers in the group is now solely managed by
          the group themselves. Additionally, completed work is now also
          completed by the group themselves. The proctor will only check the
          completed work once a deadline has been reached.
        </Speak>
        <Speak>
          When the proctor uses the bell it signals the end of a work period and
          all students must stop, the proctor will now consider the quality of
          the student-determined completed work for scoring. However, any work
          in an incomplete state now counts as negative points. When the proctor
          signals the start of another work period, the cycle continues until
          the stage is over.
        </Speak>
        <Speak>
          As an example a group may decide to take time to sort their assigned
          jobs and assign more than one job to workers in the group, but any
          incomplete work when the bell is heard now counts against that group.
        </Speak>
        <QuestionBox qid={"Game Rules"}>
          <QuestionBox qid={"R1"}>
            No "Cutting Corners", rushed worked that is not completed to the
            desired quality will not be accepted toward your teams points,
            however you do reserve the ability to fix the mistakes.(Your
            computer doesn't skip computation steps or return incomplete data,
            so you can't either!)
          </QuestionBox>
        </QuestionBox>
        <Speak>
          Other than the restrictions above, you are allowed to chat, have fun,
          and get loud!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Discussion Questions" />
        <Speak>
          After the activity is over, have the students sit down and discuss the
          following questions. Ensure that each response is reconnected back
          with how the student comments, frustrations, feelings, etc might map
          to hardware or software considerations.
        </Speak>
        <QuestionBox qid="D1">
          Thinking about your experience in the Batch System stage, what was
          your strategy for gaining points? Did you feel like you were
          successful? Would changing the way worksheets were given to you have
          changed your strategy? (ie, let you pick between multiple different
          jobs, if you could pick from an easy vs hard pile? etc)
        </QuestionBox>
        <QuestionBox qid="D2">
          Given your approach to the Batch System stage, what changes do you
          think would have helped your team complete more tasks? (More people,
          better tools, more time, etc)
        </QuestionBox>
        <QuestionBox qid="D3">
          What does the hypothetical "perfect" batch of jobs look like for a
          Batch System?
        </QuestionBox>
        <QuestionBox qid="D4">
          Thinking about your experience in the Interactive System stage, what
          was your strategy for being a worker and a runner? How did the bell
          play into your decision making? Did you feel like your peers should
          have done something differently?
        </QuestionBox>
        <QuestionBox qid="D5">
          Were you ever relieved at the bell? Was it always torture? How did
          your feelings change as the time quanta shrunk or got longer?
        </QuestionBox>
        <QuestionBox qid="D6">
          How many different colors did you notice on your worksheets? What was
          common amongst those with many colors and those with few? What was the
          quality like between sheet to sheet?
        </QuestionBox>
        <QuestionBox qid="D7">
          What does the hypothetical "perfect" batch of jobs look like for an
          Interactive System? (Consider the runner and the workers here)
        </QuestionBox>
        <QuestionBox qid="D8">
          Thinking about your experience in the Real-Time System stage, what was
          your group's strategy? How did the bell play into your decision
          making? Did you feel like your peers should have done something
          differently?
        </QuestionBox>
        <QuestionBox qid="D9">
          Were there any decisions you made that lead to a high loss of points
          or a low loss of points? Did you feel like you were able to make those
          decisions in a timely manner? Would you like to go back and do
          something differently?
        </QuestionBox>
        <QuestionBox qid="D10">
          When the deadlines got shorter or longer, how did your strategy
          change? Did you assign roles, or even have different jobs you had
          people in your group perform?
        </QuestionBox>
        <QuestionBox qid="D11">
          What does the hypothetical "perfect" batch of jobs look like for a
          Real-Time System? (Consider the deadline timing here)
        </QuestionBox>
        <QuestionBox qid="D12">
          Are there any final frustrations, comments, thoughts, recommendations,
          strategies, anything that you would like to contribute? Also do your
          best to map in onto what we've been learning. (Hardware or Software)
        </QuestionBox>
      </CourseBox>
    </CoursePage>
  )
}
