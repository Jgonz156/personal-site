import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Chip,
  Divider,
  Sheet,
  Typography,
} from "@mui/joy"
import CoursePage from "../components/course-page"
import { useState } from "react"
import Speak from "../components/speak"
import CourseInfoDump from "../../../components/course-info-dump"
import StandardsDiagram from "../components/standard-diagram"
import TopicBreak from "../components/topic-break"
import TitleBox from "../components/title-box"
import CourseBox from "../components/course-box"
import CourseSchedule from "./course-schedule-5850"
import BookCard from "../../../components/book-card"

const textbook = {
  title:
    "Formal Syntax and Semantics of Programming Languages: A Laboratory Based Approach",
  authors: ["Slonneger, Kenneth", "Kurtz, Barry L."],
  pages: 654,
  abstract: (
    <>
      <Typography>
        This text developed out of our experiences teaching courses covering the
        formal semantics of programming languages. Independently we both
        developed laboratory exercises implementing small programming languages
        in Prolog following denotational definitions. Prolog proved to be an
        excellent tool for illustrating the formal semantics of programming
        languages. We found that these laboratory exercises were highly
        successful in motivating students since the hands-on experience helped
        demystify the study of formal semantics. At a professional meeting we
        became aware of each other's experiences with a laboratory approach to
        semantics, and this book evolved from that conference.
      </Typography>
      <Typography>
        Although this text has been carefully written so that the laboratory
        activities can be omitted without loss of continuity, we hope that most
        readers will try the laboratory approach and experience the same success
        that we have observed in our classes.
      </Typography>
    </>
  ),
  link: "https://cdn.preterhuman.net/texts/science_and_technology/artificial_intelligence/Formal%20Syntax%20and%20Semantics%20of%20Programming%20Languages%20-%20Kenneth%20Slonneger.pdf",
  imageSlug:
    "/book-covers/FormalSyntaxAndSemanticsOfProgrammingLanguages-ALaboratoryBasedApproach.png",
}

export default function Syllabus() {
  const [tabState, setTabState] = useState("Introduction")
  return (
    <CoursePage
      type="syllabus"
      courseName="CMSI 5850: Programming Language Foundations"
      courseNumber={5850}
    >
      <CourseBox>
        <Sheet
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Button color="neutral" onClick={() => setTabState("Introduction")}>
            Introduction
          </Button>
          <Button
            color="neutral"
            onClick={() => setTabState("Required Materials")}
          >
            Required Materials
          </Button>
          <Button
            color="neutral"
            onClick={() => setTabState("Learning Outcomes")}
          >
            Learning Outcomes
          </Button>
          <Button color="neutral" onClick={() => setTabState("Grading")}>
            Grading
          </Button>
          <Button color="neutral" onClick={() => setTabState("Schedule")}>
            Schedule
          </Button>
          <Button
            color="neutral"
            onClick={() => setTabState("Student Services")}
          >
            Student Services
          </Button>
          <Button
            color="neutral"
            onClick={() => setTabState("Student Responsibilities")}
          >
            Student Responsibilities
          </Button>
          <Button color="neutral" onClick={() => setTabState("FAQ")}>
            FAQ
          </Button>
        </Sheet>
        <Divider>
          <Chip>{tabState}</Chip>
        </Divider>
        {tabState === "Introduction" ? (
          <>
            <Speak>
              My Name is Professor Julian Gonzalez, Welcome to CMSI 5850:
              Programming Language Foundations. This site is where all our
              course material will be found. Brightspace will be used in a more
              supporting manner.
            </Speak>
            <Speak>
              The course was graciously provided by Dr. Ray Toal. It's material,
              organization, and assignments are borrowed due to their very
              intentional and careful design. I have made some personal
              modifications related to meta-course aspects such as turning in
              assignments via a different process and a different grading
              scheme. I have also added a few more assignments to the course to
              fully realize the grading system changes to the course.
            </Speak>
            {/* 
            <Divider>
              <Chip>Prerequisites</Chip>
            </Divider>
            <Sheet
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <Speak>CMSI 2210</Speak> and/or <Speak>CSMI 284</Speak> or
              <Speak>EECE 3140</Speak>
            </Sheet>
            */}
            <CourseInfoDump
              sectionNumber={1}
              daysOfWeek={["Thursday"]}
              timeStart="6:00 PM"
              timeEnd="8:30 PM"
              building="Seaver"
              roomNumber={211}
            />
            <Divider />
            <Speak>
              My contact information, which includes my office, office phone,
              and email, can be found in the footer of this site at all times on
              any page. I prefer contact in person via office hours or finding
              me in the lab space on campus, however I am always available via
              email.
            </Speak>
            <Speak>
              This course description, as stated before in this course's modal
              popup on the homepage, is a 4-unit/credit hour (3 units if its
              CMSI 585) hands on course that is designed to teach you the
              foundational principles behind Programming Languages. We will
              engage with these in pure math and a few programming languages.
              The overarching topics covered in this course include Language
              Theory, Operational and Denotational Semantics, and important
              cursory information such as Logic and Discrete Mathematical
              Foundations.
            </Speak>
            <Speak>
              This course is a fully synchronous, in-person, lecture style
              course. However, all my lectures for all sections will be uploaded
              for asynchronous access to this site after class. I will do my
              best to upload directly after class, however I cannot always
              guarantee this due to other obligations. During these lectures you
              are free to ask questions or interrupt with inquiry at any time!
            </Speak>
            <Speak>
              Course work takes the form of Written homeworks, some programming
              sections (I'll give you the dates well in advance), and an
              optional Final. Collaboration is encouraged! However, please turn
              in your own homework. If you worked with others or used outside
              sources for help you are not in trouble, just link what you needed
              to succeed so that I have an accurate idea of where you are, and
              everyone is, in the course.
            </Speak>
            <Speak>
              With that in mind, work-load expectations are in line with the
              University's credit hour policy. Since this is a 3 unit/credit
              hour course, it is expected that you spend a minimum of 3 hours of
              work per credit hour (9 hours per week for us).
            </Speak>
            <Speak>
              This syllabus was specifically designed to group relevant
              information together in a more appealing manner than simply a long
              scrolling paper. To that end, this syllabus is designed to focus
              its discussion into a few main sections represented by the buttons
              above. By clicking them, you can find all relevant information
              regarding that topic and have easy access to it later.
            </Speak>
            <Speak>
              The recommended order of reading the topics is from left to right,
              up to down, but feel free to jump around.
            </Speak>
            <Speak>
              Also this syllabus is TENTATIVE in nature. It is subject to
              alterations. Most changes will be made only to clarify
              pre-existing policies, but when major changes are made (Such as a
              mode change to Online or Async due to external circumstances) you
              will ALWAYS be emailed and informed of ALL changes made.
            </Speak>
          </>
        ) : tabState === "Learning Outcomes" ? (
          <>
            <Speak>By the end of this course you will:</Speak>
            <Speak>
              Mastered fundamental concepts that underlie programming language
              syntax and semantics through a comparative study of several
              languages and their features;
            </Speak>
            <Speak>
              Learned several new programming languages, language features, and
              programming paradigms, with a focus on recent advances in
              programming language technologies;
            </Speak>
            <Speak>
              Become able to write formal syntactic definitions of programming
              languages;
            </Speak>
            <Speak>
              Become able to write denotational and operational semantic
              definitions of programming languages;
            </Speak>
            <Speak>
              and Increase your mathematical maturity in domains related to
              programming language theory.
            </Speak>
          </>
        ) : tabState === "Required Materials" ? (
          <>
            <Speak>
              This course features ONE required material in the form of an
              online, FREE textbook. This textbook is an additional resource for
              you and homeworks will ask that you read chapters of the book that
              contain relevant information to the assignments.
            </Speak>
            <Speak>
              This course also requires you to have a computer, consistent
              internet access, an interactive development environment, and
              knowledge of operating a terminal. The terminal the course will
              use is Git Bash and Microsoft's VSCode for convenience, however
              you are not required to do so as well.
            </Speak>
            <Sheet
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BookCard {...textbook} />
            </Sheet>
          </>
        ) : tabState === "Grading" ? (
          <>
            <Speak>
              Now that we have an idea of "what" we are trying to learn, let's
              see "how" we are going to learn it. This course is "Standards"
              based. However, the way that I prefer to use these standards is
              very different from typical so just pretend you've never heard of
              this before.
            </Speak>
            <Speak>
              This is going to be rather "long-winded" but I promise this course
              system was constructed with the student at its heart. To entice
              you to listen closer, this course features a total of 11
              assignments and 3 in class activity days, but what If I said that
              7 of those assignments were completely optional? Now that I've got
              you hooked, lets break it down.
            </Speak>
            <StandardsDiagram
              courseID="CMSI 5850: Programming Language Foundations"
              coursePointTotal={400}
              standards={[
                {
                  standardID: "Theory, Logic, and Math",
                  pointTotal: 80,
                  homework: [
                    {
                      id: "HW 1",
                      points: 100,
                      gradedWith: "Theory, Logic, and Math",
                    },
                  ],
                },
                {
                  standardID: "Languages",
                  pointTotal: 80,
                  homework: [
                    { id: "HW 2", points: 100, gradedWith: "Languages" },
                    {
                      id: "OHW 1",
                      points: 20,
                      gradedWith: "Theory, Logic, and Math",
                    },
                  ],
                },
                {
                  standardID: "Syntax",
                  pointTotal: 80,
                  homework: [
                    { id: "HW 3", points: 100, gradedWith: "Syntax" },
                    { id: "OHW 2", points: 20, gradedWith: "Languages" },
                  ],
                },
                {
                  standardID: "Semantics",
                  pointTotal: 80,
                  homework: [
                    { id: "HW 4", points: 100, gradedWith: "Semantics" },
                    { id: "OHW 3", points: 20, gradedWith: "Syntax" },
                  ],
                },
                {
                  standardID: "More Semantics",
                  pointTotal: 80,
                  homework: [
                    { id: "HW 5", points: 100, gradedWith: "More Semantics" },
                    { id: "OHW 4", points: 20, gradedWith: "Semantics" },
                  ],
                },
                {
                  standardID: "Final",
                  homework: [
                    { id: "OHW 5", points: 20, gradedWith: "More Semantics" },
                  ],
                  exams: [
                    {
                      id: "OEX S1",
                      points: 20,
                      gradedWith: "Theory, Logic, and Math",
                    },
                    {
                      id: "OEX S2",
                      points: 20,
                      gradedWith: "Languages",
                    },
                    {
                      id: "OEX S3",
                      points: 20,
                      gradedWith: "Syntax",
                    },
                    {
                      id: "OEX S4",
                      points: 20,
                      gradedWith: "Semantics",
                    },
                    {
                      id: "OEX S5",
                      points: 20,
                      gradedWith: "More Semantics",
                    },
                  ],
                },
              ]}
            />
            <Speak>
              Above, you can see a "snapshot" of the entire course assignment
              structure and the grading table that is used to determine your
              grades. In that one diagram is everything you need to succeed in
              this course.
            </Speak>
            <TopicBreak title="Standards" />
            <Speak>
              Everything blue is a standard. These are mini modules the course
              is broken up into that you need to pass. The standard name is
              displayed at the top and directly underneath are the points you
              need to gather to reach an A in the standard. That's right, there
              is no averaging percentiles in my course, as that system only
              serves to average you future-self into a lower grade. My system is
              purely additive. Meaning that if you don't earn enough points in
              the beginning, you can always earn those points back later. That
              way older grades do not "hold back your grade". You can see the
              totals you are trying to earn as they are prefixed with "T: ". So
              for the course, all your standards should reach 240 (3 standards *
              80 points). For each standard, all your assignments should reach
              at least 80. I will take the point total and divide them by your
              earned points to retrieve your grade for each standard and the
              course overall.
            </Speak>
            <TopicBreak title="Assignments" />
            <Speak>
              Inside each standard is an assignment that can earn you points
              toward that standards total and one that earns you points on the
              previous standard (This is incase things don't go well the first
              time, some of us need to see things more than once!). That is
              labeled "HW" and "OHW" respectively. The points earnable are
              labeled with "P: ". The homework assignments together are worth
              more than the standard on purpose, as I do not believe small
              mistakes merit failure in the grade book. Thus, you can "earn a B"
              on every assignment and still pass the standard with an A. The "O"
              portion of the second assignment is denoting that it is completely
              optional. You don't need to do that assignment if you are already
              happy with your point total in your previous standard. Why is the
              optional homework for the previous standard and not the current
              one? This is because due dates follow a 2-week long structure and
              this is to ensure you have at least 4 weeks worth of time to work
              on a standard. Thus you turn in the optional with the following
              homework.
            </Speak>
            <Speak>
              Inside normal "HW" is a brief reading portion that points toward
              useful chapters in the textbook, the programming portion, and the
              optional section for the previous standard at the bottom. They
              aren't displayed here for clarity as all the specifics of a
              homework will be specified on its page (accessible from the Blue
              Course Homepage button at the top of the screen). The reading
              section will contain links to any potential YouTube videos,
              textbook chapters, or other media I believe enhances your learning
              experience. It might be there to help make the problem more
              "digestible" or even discuss useful programming patterns to keep
              in mind to prevent common issues.
            </Speak>
            <Speak>
              Now that we have an idea of what the assignments look like, when
              are they distributed? How long do I have to complete an
              assignment? Exact date specifics will be provided in the
              "Schedule" sections, however, the general pattern is that the HW
              will be released following the end of seeing the material in
              lecture, then you will have 2 weeks from then to turn it in. They
              are always due on Fridays at the end of the day. The optional HW
              for the previous standard will be released at the same time as the
              first homework for the next one and it will be due with that
              assignment.
            </Speak>
            <TopicBreak title="Late Policy" />
            <Speak>
              Since all homeworks will be due on Fridays at the end of the day,
              what happens if I turn something in on Saturday? Sunday? Monday?
              Well the late policy is broken up into two systems, Excused and
              Unexcused. The first is rather simple and what you are accustom
              to, assuming you contact me early about a serious reason for why
              you won't be able to make the due date, we can work out an
              alternate schedule for you to perform your work. This could be due
              to family issues disrupting school life, medical emergencies,
              natural disasters, etc.
            </Speak>
            <Speak>
              The Unexcused late policy however requires no form of
              communication to me directly, if you turn something into me late
              without notifying me I will assume you are taking advantage of
              this systems instead. The policy is as follows: If you turn in an
              assignment on Saturday it will lose 10 points regardless of the
              content. If you turn it in on Sunday instead, you will receive the
              minus 10 points from being after saturday and an additional lost
              of 15 points on top for turning it in on Sunday. If you turn it in
              on Monday (Without using the Excused late policy system from
              above) you will receive 0 points for the turn in. There is a 15
              min grace period at the end of each day where I will consider the
              assignment on the previous day instead. So if its due on Friday at
              11:59 PM and you turn it in on Saturday at 12:07 AM, I will
              consider it on Friday. However, were it to be turned in at 12:16
              AM, I would consider that on Saturday and you would receive the 10
              point deduction.
            </Speak>
            <TopicBreak title="Final" />
            <Speak>
              The Final Standard is special because they denote a special exam
              in this course. Within is a single exam that is completely
              optional. It is designed to give you a third opportunity to gather
              points toward previous standards. If you don't need the points,
              you can safely ignore this exam. It will be sectioned into a few
              problems per standard that the exam covers. The point total
              earnable toward a previous standard for answering those questions
              is labeled in the diagram. So the exam is optional, but if I chose
              to take it will I have to take the whole thing? No, you only have
              to do all the questions relevant to the standard you are trying to
              boost, the other questions will be ignored if they are left
              incomplete.
            </Speak>
            <TopicBreak title="Turning Things In" />
            <Speak>
              Now that we know there are HW's, activities, and an Exam, how do
              we turn everything in? LMU uses the learning management system
              known as Brightspace (Others include Google Classroom and Canvas).
              This is where all your assignment "turn in's" will be located.
              This is also where your exam will be held (it is all digital).
              This is where you will find your grades and any other materials I
              cannot legally post publicly on my course site. Assuming all goes
              well, you will access Brightspace only for turning in your HW and
              taking Exams. Everything else will be posted here on the current
              site (jag.prof).
            </Speak>
          </>
        ) : tabState === "Schedule" ? (
          <>
            <CourseSchedule />
          </>
        ) : tabState === "Student Responsibilities" ? (
          <>
            <Speak>
              This page is to break down all the University rules that relate to
              this course and our in-person classroom environment.
            </Speak>
            <TopicBreak title="General University Policies" />
            <TitleBox
              title="Academic Honesty Policy:"
              quote={`"Loyola Marymount University is a community dedicated to academic excellence. 
    Academic honesty in scholarship and creative work stands at the center of LMU's 
    academic life, and is essential for true learning and creation of knowledge to take 
    place. As a university in the Jesuit and Marymount traditions, this community expects 
    its members to act in accordance with the highest standards of honesty and ethics at 
    all times. Violations of academic honesty undermine the fundamental educational 
    mission of the University and cannot be tolerated. Students are responsible for 
    understanding the standards of academic honesty and determining how they apply to 
    their academic work and behavior. Students are responsible for contacting their 
    Instructor(s) before assignments are due to proactively resolve any questions they 
    may have."`}
              link="https://academics.lmu.edu/honesty/"
            />
            <TitleBox
              title="Disability Support Services:"
              quote={`"The mission of the Disability Support Services (DSS) Office at LMU is to provide equal access and opportunities for students with established disabilities. We are committed to promoting and celebrating the diversity of our students, staff, and faculty and work to eliminate systemic barriers, address individual bias, and maintain a respectful and equitable working environment.
    DSS envisions and aspires to promote a culture of inclusion and equal opportunity through a campus wide responsibility and commitment to access, where all individuals with disabilities at LMU can thrive, participate fully, and are regarded as valued and contributing members of society."`}
              link="https://academics.lmu.edu/dss/"
            />
            <TitleBox
              title="LMU Expectation For Classroom Behavior:"
              quote={`"Disruptive behavior which is persistent or significantly interferes
    with classroom activities may be subject to disciplinary action. A student may be referred to the Office of Student Conduct and Community Responsibility if their behavior constitutes a violation of the conduct code.
    "`}
              link="https://studentaffairs.lmu.edu/about/osccr/studentcodespolicies/"
            />
            <TitleBox
              title="Reporting of Sexual or Interpersonal Misconduct:"
              quote={`"Loyola Marymount University (“LMU”) recognizes the significant, unacceptable and nationwide
    existence of Sexual and Interpersonal Misconduct on college campuses. LMU is dedicated to
    the prevention of such misconduct and to providing a caring, supportive and effective response
    when such misconduct occurs. Accordingly, LMU encourages Students and University
    Community members to report instances of Sexual and Interpersonal Misconduct so that the
    University can take appropriate responsive action..."`}
              link="https://lmu.app.box.com/s/n8o56hqp4f7l6qroftzpkz29xs26oo2o"
            />
            <TitleBox
              title="Communication Expectations:"
              quote={`While the university doesn't have an explicit set of rules about this, what they do have rules on is "Official" communication channels. Ensure that any official communication (Defined roughly as any activity that includes any formal "written" communication between faculty and a student (Where written is non-verbal communication)) is done explicity from LMU approved sources (Your student email, Department Teams or Slacks, or letters on official LMU letterhead). You are also responsible for regularly checking your student email as the university will not contact you any other way. Other than that, understand the official channels of communication can be audited for the purposes of a misconduct case.`}
            />
            <TitleBox
              title="Emergency Preparedness:"
              quote={`"Building a more resilient LMU is a shared responsibility among all students, faculty, and staff. Emergency Management serves as an all-encompassing tool for campus emergency information, disaster readiness events at LMU, and tips on how to prepare for and respond to various emergencies.
    
    Utilize the resources available through Emergency Management to help ensure that you and LMU are prepared. Together, we strengthen the university's ability to respond to and recover from an emergency."`}
              link="https://safety.lmu.edu/em/"
            />
          </>
        ) : tabState === "Student Services" ? (
          <>
            <Speak>
              As a student at LMU you have access to many services that you may
              not be aware of! I have linked as many as I can think of here to
              provide you with an easy way to find these services. You'll also
              find a small paragraph of the mission statement from each of these
              services.
            </Speak>
            <TitleBox
              title="(COC) Community of Care:"
              quote={`"The mission of the Loyola Marymount
                University Community of Care (COC) — a collaborative case-management
                program — is to enhance community safety and student well-being. The
                Community of Care provides prevention, assessment, and intervention
                for and with students as they navigate the challenges that stand in
                their way of academic and personal success."`}
              link="https://studentaffairs.lmu.edu/wellness/coc/learnmoreaboutus/"
            />
            <TitleBox
              title="LION Connect:"
              quote={`"LionConnect is a comprehensive portal designed to
                empower students to take control of their academic journey to
                achieve their goals. By offering a personalized dashboard, seamless
                scheduling, and direct access to dedicated support staff,
                LionConnect enhances communication and collaboration between
                students and the Web of Support staff. This innovative approach
                leverages technology and real-time data to provide personalized and
                timely interventions, ensuring students receive the support they
                need to succeed."`}
              link="https://www.lmu.edu/academics/provost/resources/lionconnect/"
            />
            <TitleBox
              title="(EIS) Ethnic and Intercultural Services:"
              quote={`"The mission of the
                department of Ethnic and Intercultural Services (EIS) is to support
                the intercultural learning and development of students, specifically
                those from historically underrepresented backgrounds at LMU. This
                area has played a central role to support the personal and academic
                success of students through programs and services focused on
                identity development, community building, and advocacy. In an effort
                to build upon our mission, there are four primary goals that we will
                work on in three phases to further enhance our department
                operations, programmatically engage with students, and collaborate
                with campus partners."`}
              link="https://studentaffairs.lmu.edu/community/ethnicandinterculturalservices/"
            />
            <TitleBox
              title="Center for Student Collegiate Recovery:"
              quote={`"Loyola Marymount
                University's Center for Student Collegiate Recovery, located on the
                first floor of Malone (Malone 113), provides a comfortable space and
                supportive community for students in recovery or seeking to create
                and sustain improvements in their wellness. Students will be
                empowered to take individual responsibility for their own health and
                well-being while belonging to a community of support. Staff
                facilitate access to support groups and provide programming for
                students and their allies in recovery. Weekly meetings are held each
                semester. No sign-up required."`}
              link="https://studentaffairs.lmu.edu/wellness/recovery/"
            />
            <TitleBox
              title="(OISS) Office for International Students and Scholars:"
              quote={`"The Office
                for International Students and Scholars (OISS) serves as a resource
                to the University by ensuring regulatory compliance. OISS provides
                programs and services that support international students' and
                scholars' social, educational and professional success, thereby,
                creating an engaged global community."`}
              link="https://studentaffairs.lmu.edu/community/officeforinternationalstudentsandscholars/"
            />
            <TitleBox
              title="(OSCCR) Office of Student Conduct and Community Responsibility:"
              quote={`"Loyola Marymount University's Office of Student Conduct & Community
                Responsibility (OSCCR) is committed to fostering an environment
                conducive to the pursuit of knowledge. Such an environment is based
                upon respect, trust, integrity and accountability. Through education
                and by upholding community standards detailed in the Student Conduct
                Code, OSCCR holds LMU students accountable for their violations and
                helps them grow into more responsible and community-minded persons."`}
              link="https://studentaffairs.lmu.edu/about/osccr/"
            />
            <TitleBox
              title="(CSA) Pam Rector Center for Service and Action:"
              quote={`"The Pam Rector
                Center for Service and Action at LMU offers students and graduates a
                range of opportunities to volunteer their time serving those
                disadvantaged or oppressed. Service opportunities are available on
                campus, locally in the Los Angeles area, and abroad through
                dedicated service groups or special events. Participating LMU
                students develop a well-defined sense of self and confidence and
                they learn to spearhead meaningful contributions in their own
                community. First-year LMU students, in particular, quickly learn the
                university resources available to them and become more engaged in
                student life, while developing personal accountability, good
                judgment and independent thinking towards a balanced life. CSA also
                serves as an on-campus resource for faculty and students working to
                integrate Community-Based Learning programs into their curriculum."`}
              link="https://studentaffairs.lmu.edu/activities/centerforserviceandaction/"
            />
            <TitleBox
              title="(SES) Student Employment Services:"
              quote={`"Student Employment Services
                (SES) at LMU provides part-time employment opportunities, workshops,
                and services to further students' professional development and
                post-graduate success. More than 3,400 LMU students work in more
                than 5,300 positions across campus. National reports and LMU
                retention statistics indicate that students who work are more
                successful because of the skills and experiences they obtain on the
                job."`}
              link="https://studentaffairs.lmu.edu/activities/ses/"
            />
            <TitleBox
              title="(SHS) Student Health Services:"
              quote={`"Student Health Services (SHS)
                remains committed to the health and safety of our campus community.
                We are a full-service medical office that is accredited by the
                Accreditation Association for Ambulatory Health Care (AAAHC).Our
                health care team includes physicians, nurse practitioners,
                registered nurses, and trained support staff. Our services include
                treatment for illnesses and injuries, preventive care, Gynecological
                health services, vaccinations, health education/wellness programs,
                and much more."`}
              link="https://studentaffairs.lmu.edu/wellness/studenthealthservices/"
            />
            <TitleBox
              title="(SPS) Student Psychological Services:"
              quote={`"Student Psychological
                Services is committed to facilitating student growth and development
                of the whole person by providing high quality, confidential
                psychological services that is social justice oriented, ethical and
                culturally informed, to ensure the inclusivity and safety for
                students."`}
              link="https://studentaffairs.lmu.edu/wellness/studentpsychologicalservices/about/"
            />
            <TitleBox
              title="Student Housing Services:"
              quote={`"In the spirit of Loyola Marymount
                University and Student Affairs missions, the Student Housing Office
                creates a living and learning environment by providing programs and
                services that empower students to realize their potential in mind,
                body and spirit within a community that honors human diversity and
                accepts students as individuals; each with rights and
                responsibilities."`}
              link="https://studentaffairs.lmu.edu/housing/studenthousing/"
            />
            <TitleBox
              title="Student Media:"
              quote={`"The Student Media Department at Loyola Marymount
                University offers unique opportunities to work at a fast-paced
                student-run media outlet in an environment that allows you to
                develop leadership skills that will make you a highly sought-after
                job candidate once you hit the real word. Opportunities to get
                involved include with The Los Angeles Loyolan newspaper, The Tower
                Yearbook, ROAR Studios and KXLU 88.9FM radio station."`}
              link="https://studentaffairs.lmu.edu/activities/campusactivitiesandentertainment/studentmedia/"
            />
            <TitleBox
              title="Student Transition and Success:"
              quote={`"The Student Success office is home
                to departments focused on providing programming and outreach to
                specific student populations to ensure their successful engagement,
                retention and transition into Loyola Marymount University."`}
              link="https://studentaffairs.lmu.edu/community/studentsuccess/"
            />
            <TitleBox
              title="Burns Recreational Center:"
              quote={`"Welcome to the Burns Recreation Center!
                The Burns Recreation Center features a fitness center, group fitness
                studios, multi-purpose courts, tennis courts and an Olympic-sized
                outdoor swimming pool. Aquatics programs take place at the pool
                located at Burns Recreation Center. LMU's Burns Recreation Pool also
                has a lawn area as well as folding chairs around the pool deck
                providing ideal space for sun bathing."`}
              link="https://studentaffairs.lmu.edu/wellness/campusrecreationandstudentfacilities/facilities/burnsrecreationcenter/"
            />
            <TitleBox
              title="The Lion's Den:"
              quote={`"Visit LMU's only completely student-run coffee
                shop. Located on the first floor of Malone Student Center, the
                Lion's Den serves 100% Fair Trade organic coffee, espresso and tea,
                as well as a wide variety of delicious pastries. In addition, a
                large seating area gives LMU students a space to gather and study.
                The energetic, friendly student staff of the Lion's Den, which is
                managed by Campus Recreation and Student Facilities, creates a
                unique and inviting atmosphere that makes it one of the most popular
                places to be on campus."`}
              link="https://studentaffairs.lmu.edu/activities/campusactivitiesandentertainment/venuesandhangouts/lionsdencoffeeshop/"
            />
            <TitleBox
              title="The Loft:"
              quote={`"The Loft is LMU's craft beer and wine bar, which is
                managed by LMU's Campus Recreation and Student Facilities
                department. Open Monday through Friday, The Loft provides a
                dedicated space for current LMU students, faculty, staff, and alumni
                over the age of 21 to drink responsibly, socialize and learn about
                the world of craft beer."`}
              link="https://studentaffairs.lmu.edu/activities/campusactivitiesandentertainment/venuesandhangouts/theloftcraftbeerwine/"
            />
            <TitleBox
              title="(FERPA) Family Education Rights and Privacy Act:"
              quote={`"FERPA stands for
                the Family Education Rights and Privacy Act of 1974. This law
                protects the privacy of student education records from kindergarten
                through graduate school. FERPA applies to all schools that receive
                funds through an applicable program of the U.S. Department of
                Education, and thus most postsecondary schools are covered by
                FERPA."`}
              link="https://registrar.lmu.edu/ferpa-rightsandprivacyact/"
            />
            <TitleBox
              title="(ASLMU) Associated Students of LMU:"
              quote={`"ASLMU, in keeping with the
                Jesuit and Marymount tradition, empowers the voice of the students
                and actively promotes a vibrant campus life. Driven by integrity, we
                devote ourselves to being persons for and with others."`}
              link="https://www.aslmu.org/"
            />
            <TitleBox
              title="(ARC) Academic Resource Center:"
              quote={`"The Academic Resource Center (ARC)
                provides Course Tutoring, Writing Tutoring, and Academic Coaching.
                Our services are designed as a compliment to the curriculum with the
                intentions of fostering academic success."`}
              link="https://academics.lmu.edu/arc/"
            />
            <TitleBox
              title="(ITS) Information Technology Services:"
              quote={`"ITS enables
                technologically-rich learning environments, provides effective
                teaching and scholarship resources and maintains reliable,
                accessible, and integrated information systems. Information
                Technology Services (ITS) provides management and services in
                support of the University's information technology resources. These
                resources include: Network and telecommunications systems, Computer
                labs, Learning spaces, Administrative information systems, Web and
                instructional technology services. ITS provides these services in an
                effort to enhance the intellectual life and experience of students
                and the University community and to provide for efficient technology
                operations."`}
              link="https://its.lmu.edu/"
            />
            <TitleBox
              title="(ME):"
              quote={`This one, surprisingly, is not an acronym! It's literally
                referring to me, Professor Julian Gonzalez. If this is overwhelming
                and you are unsure where to go or what to do, you can talk to me
                personally as a guide through your resources! Feel free to email me
                to make a private appointment with me in my office for a private
                space to discuss your thoughts.`}
            />
            <Speak>
              However, these services are not free (you are paying for them
              after all!). You keep access to these services by maintaining and
              upholding the Lion Code, which can be found below.
            </Speak>
            <TitleBox
              title="Lion Code:"
              quote={`"I am a Lion. Courageous of mind, charitable of heart, I stand in
                faith. I will own the actions of my mind, hand, and heart, and build
                the community that sustains us. The respect and support that
                nurtures me is born of my respect for others. The dignity of the
                other, the stranger, grants me dignity. The expectations of my
                community are my own, and I will discover how I may be more fully
                alive. I will join the discourse of the academy with honesty of
                voice and integrity of scholarship. Respecting peers, professionals,
                professors, and students, I will embrace the diverse perspectives,
                arts, and sciences to discover what it means to be human. I will
                shelter and support the intellectual adventures of others. In this
                tradition, within my community, a part of this academy, I stand in
                faith, prepared to learn to be one for others, ready to take up
                responsibility in the world."`}
              link="https://studentaffairs.lmu.edu/about/studentaffairsdeansoffice/lionscode/"
            />
            <Speak>
              I don't have any rules in particular to provide, however I do have
              a golden rule that everyone should follow: "Don't Disturb the
              Learning of Others."
            </Speak>
          </>
        ) : tabState === "FAQ" ? (
          <>
            <Sheet
              color="primary"
              variant="soft"
              sx={{
                p: 4,
                borderRadius: 12,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <AccordionGroup
                color="primary"
                variant="soft"
                transition="0.4s"
                sx={{ borderRadius: 12 }}
              >
                <Accordion>
                  <AccordionSummary>
                    What if I miss the exam due date?
                  </AccordionSummary>
                  <AccordionDetails>
                    Unlike the assignments, which have an optional unexcused
                    extension you can take for a point-loss, if you miss the due
                    date for an exam thats just it. I made the exams
                    purposefully straightforward and non-time consuming to avoid
                    any scheduling issues.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>
                    Due to the University handling the assignment of Finals
                    during the last week of the semester, Does that change how
                    exams are administered?
                  </AccordionSummary>
                  <AccordionDetails>
                    No, they will still be over Brightspace digitally to be
                    taken anytime during the week, like the midterm. However,
                    since I am required to be in those assigned rooms for 2
                    hours I will provide them as an open study days for help
                    during finals week.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>
                    Are AI tools allowed in your course?
                  </AccordionSummary>
                  <AccordionDetails>
                    Yes! I'd rather you know the appropriate use of a tool
                    rather than trying to use it behind my back to disastrous
                    results. What you shouldn't try to do is make it do all your
                    HW. It is tempting, but I already know that AI tools perform
                    poorly on our course material. However, AI tools are great
                    at the comprehension of the topics! So don't ask ChatGPT to
                    do the problem, ask it for ideas on what to do instead!
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>
                    Is participation mandatory?
                  </AccordionSummary>
                  <AccordionDetails>
                    Nope. If you are the type of learner that performs better
                    just listening quietly feel free to do so! However, don't
                    ever be afraid to ask questions! We are covering hard
                    material (Because I adapted course materials from graduate
                    level work from many colleges like Cornell, Carnegie Melon,
                    Stanford, and others) so don't just "bask", ask!
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>
                    Are the workload expectations the same as in other course?
                  </AccordionSummary>
                  <AccordionDetails>
                    Great question! I actually want to encourage "less" work by
                    getting you all to work sooner in small chunks. Think about
                    my grading system, if you do well on the homework by
                    chiseling away at it early, you will avoid more than half of
                    all the assignments and still get an A! So it might feel
                    like the workload is higher, but really I just want it more
                    often and for less time.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>
                    Am I allowed to have my computer/phone out and open during
                    class?
                  </AccordionSummary>
                  <AccordionDetails>
                    Yes. I'll be honest, the old system of keeping your tech out
                    of sight so that I can monopolize your attention is pretty
                    draconian (Old and reminisce of Vampires). If a message that
                    YOU think is important comes up and you feel you need to
                    answer it, go ahead, just don't disrupt others is all. Also
                    this is a computer science course, bit odd to have a policy
                    against tech right?
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>Can I eat in class?</AccordionSummary>
                  <AccordionDetails>
                    This is a bit of a loaded question. My big rule is not to
                    disrupt anyone. If you can eat it without bothering those in
                    your immediate area, then you are good to go. Foods that
                    emit an "area of effect" so to speak are not allowed as they
                    may be disruptive others. I also retain the ability to stop
                    anyone from eating at any time for the purposes of class
                    activities or enforcing other university policies.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>
                    Can I ask for extra-credit?
                  </AccordionSummary>
                  <AccordionDetails>
                    While it may seem harsh, no. The course is made to provide
                    all the opportunity necessary to succeed up front, if by the
                    very end there is a serious issue we will work on it
                    together, but if you are sitting at a B+ right on the edge
                    of an A-, I will not invent work to boost your grade as it
                    would be unfair to other students.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>
                    Am I required to show up to class?
                  </AccordionSummary>
                  <AccordionDetails>
                    No, you are all adult enough by now to make that decision
                    for yourself. I'd highly recommend showing up because I
                    constructed this class to center around the in-person
                    experience. But I will not be docking your grade if you do
                    not attend. The only detriment you will receive is from the
                    awkwardness that arises from missing material.
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            </Sheet>
            <Speak>This list is subject to expand.</Speak>
          </>
        ) : (
          <>Hey You're Not Supposed to See This! How Did You Get Back Here?</>
        )}
      </CourseBox>
    </CoursePage>
  )
}
