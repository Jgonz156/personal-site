import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBreak from "../../components/topic-break"
import Vocab from "../../components/vocab"
import QuestionBox from "../../components/question-box"
import TopicBox from "../../components/topic-box"
import LinkButton from "../../components/link-button"
import ImageBox from "../../components/image-box"
import DueDateCalendar from "../../components/due-date-calendar"
import { DateTime } from "luxon"
import DirectoryTree from "../../components/directory-tree"

export default function Homework0() {
  return (
    <>
      <CoursePage
        type="homework"
        courseName="CMSI 3510: Operating Systems"
        courseNumber={3510}
      >
        <CourseBox>
          <TopicBreak title="What do Homeworks look like?" />
          <Speak>
            Homeworks, as stated in the syllabus, are made up of one main
            programming section and an optional Section for the previous
            standard. There might be additional contextual information before
            hand such as a passage to read or engage with from the textbook,
            however that won't always be the case.
          </Speak>
          <Speak>
            The programming portion of the Homework, since it can't exist purely
            here on my site, will be in Github Repositories given through Github
            Classroom. I will give a description of each of the files on this
            page (if there happens to be more than one) and will give you extra
            information describing the assignment when necessary. For
            convenience I will also point out where, and which, files have TODO
            sections in them so that you don't have to go "digging" to complete
            your homework.
          </Speak>
          <Speak>
            You will always simply be given an existing repository and then you
            will be directed to fill in the "skeleton". This does NOT mean I
            won't ever ask you to do things, like making your own function,
            class, or other advanced data structures, just that It will be clear
            where and what you are trying to do and I won't ask you to preform
            "design" level work. What I mean by that is I will never ask you to
            "architect" an entire repository from scratch on your own. I may ask
            you to import and use certain libraries if that becomes necessary
            for an assignment (Some massive libraries in Python the CS
            department regularly uses are SciKitLearn, Pandas, NumPy, PyGame,
            PyTorch, SimPy, and maybe a few more I can't remember right now).
            However, if we do need a library then I will provide a short{" "}
            <Vocab
              definition={
                "A usually additional, small explanation of something"
              }
            >
              "blurb"
            </Vocab>{" "}
            about how to use it on the Homework page it is relevant to.
          </Speak>
          <Speak>
            At the bottom of most homeworks you will find the optional homework
            for the previous standard. These are creative endeavor/real-world
            uses and they are always open ended and available for modification
            to fit a passion of yours! That portion of the site will almost
            always be smaller and will give guidance on what your are trying to
            do with your creative endeavor to ensure you gain points. Most of it
            will be made of up "ideation" or "brainstorming" for what you could
            do to get your "creative juices flowing".
          </Speak>
          <Speak>
            Now that we've described what homeworks look like at a high level,
            lets meet your practice homework, which features the 2 sections
            described above!
          </Speak>
        </CourseBox>
        <CourseBox>
          <TitleBox title="HW0: Practicing Homework!" />
          <DueDateCalendar dueDate={DateTime.local(2025, 1, 31, 23, 59)} />
          <TopicBox
            topics={[
              "There are no particular topics for this HW",
              "However if there were multiple",
              `They would show up here`,
            ]}
          />
          <Speak>
            This homework assignment is about letting me learn a little about
            you! The questions I asked here are important to me as they give me
            a "feel" for who I'm talking to in class. As I said in class I am
            very conversational and you can't have a proper conversation with
            someone you know nothing about! I mean you can, they just aren't as
            fun!
          </Speak>
        </CourseBox>
        <CourseBox>
          <TitleBox title="Reading Section" />
          <Speak>
            This section is just here as an example to display what it would
            look like if I asked you to read a specific section of the textbook
            for the homework assignment.
          </Speak>
          <Speak>
            It will also outline the sections of the textbook that are relevant
            to the information covered in class.
          </Speak>

          <QuestionBox qid={"R1"}></QuestionBox>
          <QuestionBox qid={"R2"}></QuestionBox>
        </CourseBox>
        <CourseBox>
          <TitleBox title="Programming Section" quote="Points: 1" />
          <DirectoryTree
            filesAsJSON={{
              "CMSI-3510-HW0": {
                ".gitignore": <></>,
                "questions.rs": <></>,
                "README.md": <></>,
                "test_questions.rs": <></>,
              },
            }}
          />
          <Speak>
            For the programming section of this homework we will be getting used
            to the flow of receiving our code skeleton as a template repository
            from GitHub Classroom.
          </Speak>

          <Speak>
            The content of this homework will be to make a PyTest unit test
            pass. It is a very simple problem, since we are only trying to get
            familiar with the process of receiving, completing, and turning in
            HW.
          </Speak>
          <Speak>
            NOTE!!! Pass this point make sure you are signed into the github
            account you wish to use for schoolwork. If you have multiple, make
            sure you do not have the wrong one signed in as your account will be
            attached to my class from then on!
          </Speak>
          <Speak>
            ANOTHER NOTE!!! If at any point you are following the instruction
            down below and are finding it difficult, you don't remember how this
            works, or you've never done this before; I have made a video
            tutorial displaying the entire process from start to finish on
            Brightspace! A link to it is provided via the button below
          </Speak>
          <LinkButton
            color="success"
            to="https://lmula.zoom.us/rec/share/LHMwk2fFto5pKnfMEKK5ZBdiwkRO0WacAkDyfbdqMrDz8Eo9dwyFlnYq5a_I8iX3.aa-YDE0MpCpp2sK8"
          >
            Helper Video
          </LinkButton>
          <Speak>
            Below you will find an amazing guide designed by Dr. Forney that
            helps get all your software in order! He likes using MyPy which is
            an additional feature library that we do NOT need for this course so
            feel free to ignore that portion of the guide, but installing it
            anyway is good for the future and won't interfere with our course
            material. This guide is found in the button below!
          </Speak>
          <LinkButton
            color="success"
            to="https://forns.lmu.build/classes/tutorials/python-dev-setup.html"
          >
            Dr. Forney's Python Setup Guide!
          </LinkButton>
          <Speak>
            Since, via GitHub Classrooms rules, you are joining the class for
            the first time you will be prompted to identify yourself. It should
            be pre-populated with everyone's names and all you need to do is
            find yours and select it, then you can accept the HW assignment and
            it will automatically make a repository for you on GitHub. If you
            manage to select the wrong name it will bind you to that name,
            meaning you become that individual. If this happens on accident,
            email me so that I can unbind you from that name and you can try
            again. (Don't get this wrong otherwise you are violating LMU policy
            on classroom behavior! Remember? Nothing illegal, and this is
            Identity Fraud! Luckily I can bail you out, but I won't always be
            able to...)
          </Speak>
          <Speak>
            Once you've accepted the assignment, clone the repository locally to
            your device and use the IDE of your choice to edit the file to pass
            the unit test.
          </Speak>
          <Speak>
            To run the unit test, open a terminal (VSCode's built in terminal is
            convenient here), ensure your working directory is on the same
            <Vocab
              definition={
                "Keep in mind that your terminal lives in your devices file structure system! The level you are on refers to the depth of the folder you are in! If you aren't sure where you terminal instance is located, use pwd (print working directory) to see which folder you are in. If you aren't in the right spot remember to use cd (change directory) to navigate to the correct folder (We want pwd to display that we are in the cloned repo folder made by the git clone operation!)!"
              }
            >
              "level"
            </Vocab>{" "}
            as the Python files, and type the "pytest" command into your
            terminal and hit enter. If the command is not found make sure to
            install it via Python's Package Manager "pip" by doing "pip install
            pytest" and then try again. If that still doesn't work, it means the
            terminal doesn't have the command aliased, which is ok! Just run
            this command instead "python -m pytest"
          </Speak>
          <Speak>
            Once you are passing all the tests make sure to use your git
            commands to add your changes, commit them, and then push them to the
            cloud repository so I can grade it! This is "turning in the code" to
            me so I can grade. However, as an extra step, go to brightspace and
            find the "Programming" HW0 assignment and just turn in a small
            message as an indicator to me you are done! (I need you to do this
            so I can track what time YOU say you finished your HW! Otherwise, I
            might accidentally take points away thinking you turned it in on
            Sunday! Save those 25 points!)
          </Speak>
          <Speak>
            You can find the GitHub Classroom assignment link as a button below
            and the Brightspace turn in link next to it.
          </Speak>
          <LinkButton
            color="success"
            to="https://classroom.github.com/a/q8fEFsGq"
          >
            GitHub Assignment
          </LinkButton>
          <LinkButton
            color="success"
            to="https://brightspace.lmu.edu/d2l/le/calendar/253279/event/684892/detailsview#684892"
          >
            Programming HW0 Turn In
          </LinkButton>
        </CourseBox>
        <CourseBox>
          <TitleBox title="Optional Section" quote="Points: 1" />
          <Speak>
            The creative endeavor i'd like you to embark on for this homework is
            simple. Since this Homework has all been about you, i'd like you to
            submit to me something you identify with. Whether its an arts and
            crafts project you are working on, a painting you are making, a game
            you love to play, a meme account you like to follow, a video of a
            search algorithm you like to watch work, or anything that you
            publicly enjoy and are fine sharing with me. Whatever it happens to
            be, give me a snap shot of it with no explanation. Just send a
            picture, a pdf, or whatever format Brightspace will let you turn in.
            As an example I have provided a meme that a student showed me that I
            probably laughed a little too hard at. Do this, and you get your
            special point!
          </Speak>
          <ImageBox
            images={[{ url: "/cmsi-2820/HW0-Meme.jpg", caption: undefined }]}
          />
          <LinkButton
            color="success"
            to="https://brightspace.lmu.edu/d2l/le/calendar/253279/event/684893/detailsview#684893"
          >
            Optional HW0 Turn in
          </LinkButton>
        </CourseBox>
      </CoursePage>
    </>
  )
}
