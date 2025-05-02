//import { Sheet } from "@mui/joy"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import LinkButton from "../../components/link-button"
import QuestionBox from "../../components/question-box"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"

export default function Activity1() {
  return (
    <CoursePage
      type="syllabus"
      courseName="CMSI 3510: Operating Systems"
      courseNumber={3510}
    >
      <CourseBox>
        <TitleBox title="AC 1: Getting Folded" />

        <TopicBox
          topics={["Partitioning", "Parallelism", "Data/Task Parallelism"]}
        />
        <Speak>
          Welcome to the first activity of CMSI 3510! In this activity, we will
          be engaging in a game that emphasizes the feeling of partitioning a
          sequential program into a parallel one by focusing on Data or Task
          decompositions!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Materials Required" />
        <Speak>
          In this game, we will engaging in the age old practice of Origami!
          Now, we really should be doing this with proper Origami-style papers,
          however we are going to be using normal printer paper instead so be
          careful!
        </Speak>
        <Speak>We will need the following materials:</Speak>
        <Speak>
          Roster of participants as this activity is graded by participation,
          not win or lose.
        </Speak>
        <Speak>
          A method of cutting paper for at least a little more than half the
          participants. So for a 30 person group, we need around 16 to 17 pairs
          of scissors.
        </Speak>
        <Speak>
          At least a ream or two of printer paper to facilitate restarts and the
          "mass production" that the activity relies on.
        </Speak>
        <Speak>
          Ideally also trash cans to hold cut paper and "failed" attempts.
        </Speak>
        <Speak>
          A timer used to keep the "race" on track to ensure time to engage with
          every stage.
        </Speak>
        <Speak>
          Printed instructions for each students per origami being made or
          access to a mobile device for viewing instructions linked below.
        </Speak>
        <QuestionBox qid="I1">
          Here is a link to the first set of instructions hosted by Origami.me
          for our Sanbou-box!
          <LinkButton to="https://origami.me/sanbou-box/" color="primary">
            Sanbou-box Instructions!
          </LinkButton>
        </QuestionBox>
        <QuestionBox qid="I2">
          Here is a link to the second set of instructions hosted by Origami.me
          for our Tulip!
          <LinkButton to="https://origami.me/tulip/" color="primary">
            Tulip Instructions!
          </LinkButton>
        </QuestionBox>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Overall Activity Breakdown" />
        <Speak>
          Here is how the activity will work, step by step, until completion. It
          will be organized into 4 main stages and an optional 5th stage if time
          allows.
        </Speak>
        <Speak>
          The preparation will see the proctor split the participants into two
          equal halves. These will be the members of Team 1 and Team 2.
          (Recommended manner to split the participants is by location in
          classroom, just split it in half simply.)
        </Speak>
        <Speak>
          Then for stage 1 assign Team 1 or Team 2 to be Data Parallel and the
          other to be Task parallel.
        </Speak>
        <Speak>
          Pick one of the Origami instructions sets for both teams to do first.
          They must be working on the same instruction set.
        </Speak>
        <Speak>
          Then once time is given for students to open the instructions and
          prepare themselves, explain what it means for a team to be data or
          task parallel and how that defines the limits of their task completion
          techniques.
        </Speak>
        <Speak>
          For the team that is Data parallel, everyone will have to work
          individually through the steps till completion on their own when
          constructing the origami item. The idea is to represent threads that
          each have an identical set of instructions to complete, but they are
          given different data to work on. This is Batching.
        </Speak>
        <Speak>
          For the team that is Task parallel, everyone will be assigned to a
          specific instruction in the entire set to make the origami item and
          that is all they will do. The idea is to represent threads that each
          have their own unique sub part of the overall instructions to
          complete, where they will pass their data to the next thread to
          complete the next step. This is Pipelining.
        </Speak>
        <Speak>
          Once the teams understand their roles and are ready, begin the timer
          and have the activity begin! Students will be trying their hardest to
          work together to make as many origami items as the 20min time block
          allows. The team that creates more than the other wins the stage.
        </Speak>
        <Speak>
          Students must cut their own paper in accordance with their
          restriction, so each and every data parallel student will need to cut
          and collect their own paper each time. For the task parallel students,
          one can be assigned to cut paper, or a few depending on need and
          number of instructions mapped to each student, or the proctor can act
          as an aid.
        </Speak>
        <Speak>
          Once stage 1 is over, stage 2 will be the same except now the teams
          are swapped from data to task and task to data parallel.
        </Speak>
        <Speak>
          Once stage 2 is over, stage 3 and 4 will take an identical approach
          accept we repeat the game with a new set of origami instructions.
        </Speak>
        <Speak>
          If time allows, an optional stage 5 can be added in which students can
          combine the techniques of data and task parallelism together in their
          own balance in an attempt to beat the other side. Say making multiple
          data parallel task pipelines, having helpers that go around an support
          areas that are un load balanced, etc. Students may used origami.me to
          find a new set of instructions to "battle" with or rematch or previous
          ones.
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Data Parallel Team Instructions" />
        <Speak>
          Data team, your job is to emphasize pure data parallelism, a form of
          program partitioning that seeks to add efficiency by taking advantage
          of a problem whose solution is better with friends! To stay in line
          with pure data parallelism, you must follow the restrictions below!
        </Speak>
        <QuestionBox qid={"Game Rules"}>
          <QuestionBox qid={"R1"}>
            You may NOT have any of your team mates contribute to the creation
            of your origami item. (You may speak to ask for help, chat, or have
            fun, but no one can physically support you!)
          </QuestionBox>
          <QuestionBox qid={"R2"}>
            You are responsible for getting your own paper, cutting it to size,
            managing your item, and turning it in to the proctor to add to your
            teams score.
          </QuestionBox>
          <QuestionBox qid={"R3"}>
            No "Cutting Corners", both literally and metaphorically. You are NOT
            allowed to cut paper beyond what is necessary to make it a square
            for folding and you may not skip steps to speed up. We are folding
            and practicing origami, not hedge trimming! (Your computer doesn't
            skip computation steps or return incomplete data, so you can't
            either!)
          </QuestionBox>
          <QuestionBox qid={"R4"}>
            Whilst the official QA is left to the proctor, your origami item may
            be disqualified if it appears as though rushing steps was used to
            get ahead of the other team. (If your computer returned garbled data
            you wouldn't count that as a success!)
          </QuestionBox>
        </QuestionBox>
        <Speak>
          Other than the restrictions above, you are allowed to chat, have fun,
          get loud, and move around!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Task Parallel Team Instructions" />
        <Speak>
          Task team, your job is to emphasize pure Task parallelism, a form of
          program partitioning that seeks to add efficiency by creating a
          pipeline of operations where one thread completes a task and passes it
          to the next stage (Think assembly line for cars)! To stay in line with
          pure data parallelism, you must follow the restrictions below!
        </Speak>
        <QuestionBox qid={"Game Rules"}>
          <QuestionBox qid={"R1"}>
            Once you are assigned a task, you must only complete that task and
            pass it to the next person in line. You may not help others with
            their tasks. (You may take on multiple people to the same task, or
            have people with multiple tasks to ensure your team can complete all
            the instructions)
          </QuestionBox>
          <QuestionBox qid={"R2"}>
            You are responsible for only what is necessary for your task. You
            receive input from the person assigned to the task before you, and
            you give your output only to the person assigned to the instruction
            after you. So if you were cutting paper for everyone, that is all
            you should be working on and you should only pass the cut paper to
            the person with the first instruction. (Adjust the restriction
            accordingly in the case where multiple people have the same task, or
            a person had multiple tasks to alleviate instructions to player
            matching issues.)
          </QuestionBox>
          <QuestionBox qid={"R3"}>
            No "Cutting Corners", both literally and metaphorically. You are NOT
            allowed to have someone perform "QA" with scissors as the end to
            "clean up" mistakes in the folding or leave some instructions
            unmapped to teammates to try and skip to get ahead of the other
            team. We are folding and practicing origami, not hedge trimming!
            (Your computer doesn't skip computation steps or return incomplete
            data, so you can't either!)
          </QuestionBox>
          <QuestionBox qid={"R4"}>
            Whilst the official QA is left to the proctor, your origami item may
            be disqualified if it appears as though rushing steps was used to
            get ahead of the other team. (If your computer returned garbled data
            you wouldn't count that as a success!)
          </QuestionBox>
        </QuestionBox>
        <Speak>
          Other than the restrictions above, you are allowed to chat, have fun,
          get loud, and move around!
        </Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Discussion Questions" />
        <Speak>
          After the activity is over, have the students sit down and discuss the
          following questions.
        </Speak>
        <QuestionBox qid="D1">
          What was the most difficult part of the activity for the Data Parallel
          approach?
        </QuestionBox>
        <QuestionBox qid="D2">
          What was the most difficult part of the activity for the Task Parallel
          approach?
        </QuestionBox>
        <QuestionBox qid="D3">
          What does the hypothetical "perfect" origami instructions look like
          for a Data Parallel approach to be most efficient?
        </QuestionBox>
        <QuestionBox qid="D4">
          What does the hypothetical "perfect" origami instructions look like
          for a Task Parallel approach to be most efficient?
        </QuestionBox>
        <QuestionBox qid="D5">
          How might we map what difficulties and solutions we encountered in the
          activity to working with threads in a program?
        </QuestionBox>
      </CourseBox>
      {/*}
      <CourseBox>
              <TitleBox title="Activity 1 Alternate Assignment" quote="Points: 30" />
              <Speak>
                For those of you who could unfortunately not make it to the activity,
                you can make up the points by completing this alternate assignment!
                This assignment takes the form of watching a video and answering some
                questions via turning in a PDF to a Brightspace assignment.
              </Speak>
              <Speak>
                Begin by watching this video from the YouTube channel Core Dumped! The
                video covers the same topic as we did in the activity: Scheduling.
                George, the host, does a great job explaining the algorithms and their
                issues. Whilst watching, try to keep the 3 major machine types we
                discussed in class in mind to answer the questions below: Batch,
                Interactive, and Real-Time Systems.
              </Speak>
              <Sheet sx={{ display: "flex", justifyContent: "center" }}>
                <Sheet
                  sx={{ width: "70%", position: "relative", paddingTop: "39.375%" }}
                >
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      //border: 0,
                    }}
                    src="https://www.youtube.com/embed/O2tV9q6784k"
                    title="The Fancy Algorithms That Make Your Computer Feel Smoother"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </Sheet>
              </Sheet>
              <Speak>
                Give your answers to the following questions below and turn them in to
                the Brightspace assignment linked via the button at the bottom of the
                page!
              </Speak>
              <QuestionBox qid="Q1">
                What specific scheduling algorithms mentioned in the video would be
                most appropriate for each system type (Batch, Interactive, and
                Real-Time), and why? Provide specific examples of applications where
                each would be optimal. (Since Real-Time scheduling techniques are not
                brought up directly, consider what algorithms would work best for
                these systems)
              </QuestionBox>
      
              <QuestionBox qid="Q2">
                The video mentions different metrics like turnaround time, waiting
                time, and throughput. Explain how the relative importance of these
                metrics shifts across Batch, Interactive, and Real-Time systems.
              </QuestionBox>
      
              <QuestionBox qid="Q3">
                Suppose you're designing an operating system for a hospital's medical
                equipment. What equipment in the hospital would you prioritize as
                batch, interactive, or real-time ? Justify your answers and explain
                which scheduling techniques would be most appropriate.
              </QuestionBox>
      
              <QuestionBox qid="Q4">
                Compare and contrast how starvation might occur in each system type.
                How do the scheduling algorithms for each type attempt to prevent
                starvation?
              </QuestionBox>
      
              <QuestionBox qid="Q5">
                How might modern multi-core processors change the scheduling
                approaches discussed in the video? Consider how parallelism affects
                each system type differently.
              </QuestionBox>
      
              <QuestionBox qid="Q6">
                The video discusses the concept of preemption. How does the importance
                and implementation of preemption differ between Batch, Interactive,
                and Real-Time systems?
              </QuestionBox>
      
              <QuestionBox qid="Q7">
                The video mentions predicting CPU bursts to optimize scheduling. You
                do not have to come up with a mathematical solution like in the video,
                however, consider all 3 system types and how you would go about
                predicting the CPU bursts for each. What factors would you consider?
              </QuestionBox>
      
              <QuestionBox qid="Q8">
                If you were to create a visual metaphor or analogy to explain the
                differences between the three system types to someone with no
                technical background, what would it be and why?
              </QuestionBox>
      
              <LinkButton
                to="https://brightspace.lmu.edu/d2l/lms/dropbox/user/folder_submit_files.d2l?db=328748&grpid=0&isprv=0&bp=0&ou=267829"
                color="success"
              >
                Alternate Assignment Submission
              </LinkButton>
            </CourseBox>
      */}
    </CoursePage>
  )
}
