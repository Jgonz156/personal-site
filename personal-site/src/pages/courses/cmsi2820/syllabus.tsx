import { Button, Chip, Divider, Sheet } from "@mui/joy"
import CoursePage from "../components/course-page"
import { useState } from "react"
import Speak from "../components/speak"
import CourseInfoDump from "../../../components/course-info-dump"
import StandardsDiagram from "../components/standard-diagram"
import Vocab from "../components/vocab"
import TopicBreak from "../components/topic-break"

export default function Syllabus() {
  const [tabState, setTabState] = useState("Introduction")
  return (
    <CoursePage type="syllabus">
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
          onClick={() => setTabState("Student Rights and Responsibilities")}
        >
          Student Rights and Responsibilities
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
            My Name is Professor Julian Gonzalez, Welcome to CMSI 2820: Discrete
            Mathematics for CS in Fall 2024!
          </Speak>
          <Speak>
            While there are three different sections of this course, this site
            will be home for all of the sections. You can find out which section
            you are in via prowl, this course's modal popup on this site's
            homepage, or even below this text here in the syllabus.
          </Speak>
          <CourseInfoDump
            sectionNumber={1}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="9:55 AM"
            timeEnd="11:35 AM"
            building="Pereira"
            roomNumber={206}
          />
          <CourseInfoDump
            sectionNumber={2}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="1:45 PM"
            timeEnd="3:25 PM"
            building="Pereira"
            roomNumber={109}
          />
          <CourseInfoDump
            sectionNumber={3}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="6:00 PM"
            timeEnd="7:40 PM"
            building="Seaver"
            roomNumber={304}
          />
          <Divider />
          <Speak>
            My contact information, which includes my office, office phone, and
            email, can be found in the footer of this site at all times on any
            page. I prefer contact by email, but if you come by my office and
            the door is open feel free to come in and chat!
          </Speak>
          <Speak>
            This course description, as stated before in this course's modal
            popup on the homepage, is a 4-unit/credit hour hands on course that
            infuses the learning of Discrete theory topics into direct
            application in Python. These topics include Intuitionistic
            Propositional and Predicate Logic, Number Theory, Type Theory,
            Combinatorics, Graph Theory, Set Theory, and a few more topic
            extensions to broaden the application of these topics in Computer
            Science.
          </Speak>
          <Speak>
            This course is an in-person, lecture style course. However, all my
            lectures for all sections will be uploaded for access to this site
            at anytime at least 2 days after initial recording. I will do my
            best to upload directly after class, however I cannot always
            guarantee this due to other obligations.
          </Speak>
          <Speak>
            This syllabus was specifically designed to group relevant
            information together in a more appealing manner than simply a long
            scrolling paper. To that end, this syllabus is designed to focus its
            discussion into a few main sections represented by the buttons
            above. By clicking them, you can find all relevant information
            regarding that topic and have easy access to it later.
          </Speak>
          <Speak>
            The recommended order of reading the topics is from left to right,
            up to down, but feel free to jump around.
          </Speak>
        </>
      ) : tabState === "Learning Outcomes" ? (
        <>
          <Speak>
            The short-hand idea for what we are trying to accomplish is gaining
            a rigorous foundation for the mathematics that underlies Computer
            Science. However, Since Computer Science can be understood as
            "teaching" computer's everything, we have an issue of scope so let's
            narrow things down.
          </Speak>
          <Speak>
            Many of the common problems you will solve and need to represent
            both conceptually and in code have distinct patterns. These distinct
            patterns come in many forms, but this course seeks to give you an
            array of knowledge and tools to work with those specifically
            discussed in Intuitionistic Propositional and Predicate Logic,
            Number Theory, Type Theory, Combinatorics, Graph Theory, and Set
            Theory.
          </Speak>
          <Speak>
            Due to the tentative nature of this new course and its layout, I
            unfortunately cannot guarantee we will dive deeply into, or even get
            to see all those topics. With that said, assuming all goes well, the
            following learning outcomes listed below will be added to your
            repertoire of skills.
          </Speak>
          <Speak>
            You will learn the fundamentals of Intuitionistic Logic, how it
            differs from other forms of logic such as Classical, how it takes
            form in propositional reasoning, how it takes form in predicated
            reasoning, how its higher-order extension functions, and how its
            related to the foundations of Type Theory.
          </Speak>
          <Speak>
            You will learn about the Boolean numbers and their relevance to
            logic, .
          </Speak>
        </>
      ) : tabState === "Required Materials" ? (
        <>
          <Speak>
            This course features NO required materials in the form of personal
            student monetary engagement, such as: textbooks, subscription
            access', paid web tools, or lab fees.
          </Speak>
          <Speak>
            This following materials are required, but can be requested from the
            university for no additional cost or can be found for FREE on any
            internet capable devices: a device capable of unfettered access to
            the terminal (typically any non-mobile computing device like laptops
            or desktops), Python 3, an interactive development environment (I
            recommend and personally use Microsoft's VSCode), and internet
            access.
          </Speak>
          <Speak>
            Any reading material in the form of textbooks, articles, videos, or
            compelled media will be given by me and posted on this site for
            immediate access.
          </Speak>
        </>
      ) : tabState === "Grading" ? (
        <>
          <Speak>
            Now that we have an idea of "what" we are trying to learn, let's see
            "how" we are going to learn it. This course is "Standards" based.
            However, the way that I prefer to use these standards is very
            different from typical so just pretend you've never heard of this
            before.
          </Speak>
          <Speak>
            This is going to be rather "long-winded" but I promise this course
            system was constructed with the student at its heart. To entice you
            to listen closer, this course features a total of 16 assignments.
            Not very enticing on its own, but what If I said that 9 of those
            were completely optional? Now that I've got you hooked, lets break
            it down.
          </Speak>
          <StandardsDiagram
            courseID="CMSI 2820: Discrete Mathematics for CS"
            coursePointTotal={560}
            standards={[
              {
                standardID: "Syllabus",
                pointTotal: "0",
                assignments: [{ id: "HW 0", points: 3 }],
                exams: [{ id: "EX", points: 2, standards: "0" }],
              },
              {
                standardID: "Logic",
                pointTotal: "80",
                assignments: [{ id: "HW 1", points: 100 }],
              },
              {
                standardID: "Numbers",
                pointTotal: "80",
                assignments: [
                  { id: "HW 2", points: 100 },
                  { id: "OHW 1", points: 20 },
                ],
              },
              {
                standardID: "Collections",
                pointTotal: "80",
                assignments: [
                  { id: "HW 3", points: 100 },
                  { id: "OHW 2", points: 20 },
                ],
              },
              {
                standardID: "Midterm",
                exams: [{ id: "OEX", points: "10 per", standards: "[1-3]" }],
              },
              {
                standardID: "Functions",
                pointTotal: "80",
                assignments: [
                  { id: "HW 4", points: 100 },
                  { id: "OHW 3", points: 20 },
                ],
              },
              {
                standardID: "Combinatorics",
                pointTotal: "80",
                assignments: [
                  { id: "HW 5", points: 100 },
                  { id: "OHW 4", points: 20 },
                ],
              },
              {
                standardID: "Graph Theory",
                pointTotal: "80",
                assignments: [
                  { id: "HW 6", points: 100 },
                  { id: "OHW 5", points: 20 },
                ],
              },
              {
                standardID: "Set Theory",
                pointTotal: "80",
                assignments: [
                  { id: "HW 7", points: 100 },
                  { id: "OHW 6", points: 20 },
                ],
              },
              {
                standardID: "Final",
                exams: [{ id: "OEX", points: "10 per", standards: "[4-7]" }],
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
            Everything blue is a standard. These are mini modules the course is
            broken up into that you need to pass. The standard name is displayed
            at the top and directly underneath are the points you need to gather
            to reach an A in the standard. That's right, there is no averaging
            percentiles in my course, as that system only serves to average you
            future-self into a lower grade. My system is purely additive.
            Meaning that if you don't earn enough points in the beginning, you
            can always earn those points back later. That way older grades do
            not "hold back your grade". You can see the totals you are trying to
            earn as they are prefixed with "T: ". So for the course, all your
            standards should reach 560 (7 standards * 80 points). For each
            standard, all your assignments should reach at least 80. I will take
            the point total and divide them by your earned points to retrieve
            your grade for each standard and the course overall.
          </Speak>
          <Speak>
            Standards break the course into 2-week topic segments to help divide
            up the course material. They technically begin on Monday's to
            disperse the first lecture of the week on tuesday and any
            assignments that week, however the real start will be Tuesday since
            that is when class is held and I will introduce the new standard.
            They end on the following weeks' Sunday (The maximum unexcused
            extension length that will be explained below).
          </Speak>
          <TopicBreak title="Assignments" />
          <Speak>
            Inside each standard is an assignment that can earn you points
            toward that standards total and one that earns you points on the
            previous standard (This is incase things don't go well the first
            time, some of us need to see things more than once!). That is
            labeled "HW" and "OHW" respectively. The points earnable are labeled
            with "P: ". The homework assignment is worth more than the standard
            on purpose, as I do not believe small mistakes merit failure in the
            grade book. Thus, you can "earn a B" on every assignment and still
            pass the standard with an A. The "O" portion of the second
            assignment is denoting that it is completely optional. You don't
            need to do that assignment if you are already happy with your point
            total in your previous standard. Why is the optional homework for
            the previous standard and not the current one? This is because the
            standards follow a strict 2-week long structure and this is to
            ensure you have at least 4 weeks worth of time to work on a
            standard.
          </Speak>
          <Speak>
            Inside normal "HW" is a written and programming portion. They aren't
            displayed here for clarity as all the specifics of a homework will
            be specified on its page (accessible from the Blue Course Homepage
            button at the top of the screen). The written portion will be made
            up of course work that is either not-applicable to Python, Work that
            is unnecessarily difficult to perform in Python, or work that cannot
            be performed or accomplished in Python. As an example, while it is
            possible to work with venn diagrams through a graphical library with
            python, this would be unnecessarily strenuous given that the problem
            is only asking you to draw one (The difficulty of a HW should be
            purely from the course material, not trying to turn in your
            answers!). Otherwise all coursework will generally be in Python,
            distributed via Github Classroom assignment repositories.
          </Speak>
          <Speak>
            Now that we have an idea of what the assignments look like, when are
            they distributed? How long do I have to complete an assignment?
            Exact date specifics will be provided in the "Schedule" sections,
            however, the general pattern is that the HW will be released for a
            standard at the beginning of the 2 week cycle a standard lives in.
            Thus you have a little less than 2 weeks (11 days) to complete each
            assignment (the very first lecture on Tuesday the first week, till
            the due date the following week friday). Can I ask for extensions?
            Yes! I have an automatic HW extension policy that you may use
            without asking me. Since HW's are due on friday's (but I don't grade
            till Monday) you can turn in a HW on Saturday for a loss of 10
            points, or wait till Sunday and receive a loss of 15 more points. So
            Friday is all 100, Saturday is 90, and Sunday is just 75.
          </Speak>
          <TopicBreak title="Midterm and Final" />
          <Speak>
            The Midterm and Final Standards are special because they denote
            special exams in this course. Within each is a single exam that is
            completely optional. They are designed to give you a third
            opportunity to gather points toward previous standards. If you don't
            need the points, you can safely ignore these exams. However, if you
            do want to take them, they are generally going to be small and
            sectioned into a few problems per standard that the exam covers. So
            for the Midterm there might be just 6 questions, 2 per standard. The
            point total earnable toward a previous standard for answering those
            questions is labeled in the diagram. So the exam is optional, but if
            I chose to take it will I have to take the whole thing? No, you only
            have to do all the questions relevant to the standard you are trying
            to boost, the other questions will be ignored if they are left
            empty.
          </Speak>
          <TopicBreak title="Syllabus Standard" />
          <Speak>
            What about that first standard labeled Syllabus? Why is it so
            different than the others? This standard is special as it is only
            going to last for the week of school and its goal is to familiarize
            yourself with all{" "}
            <Vocab
              definition={
                "In reference to all the information you are reading now, and the rest of the course site"
              }
            >
              this
            </Vocab>
            ! The point total to pass is 0 because I'm not going to force you to
            engage with all this, but I will give a special benefit to those who
            put the effort in (&lt;---- a consistent theme with this course). If
            you complete the small practice HW you'll get a free 3 points to put
            into whatever standard you'd like! If you do the practice exam you
            will get 2 more free points for the same purpose (Looking at the
            table above, 5 points is an entire grade jump in a single
            standard!). How do I use these special points? I will keep track of
            every students special points, all you need to do is email me to use
            them!
          </Speak>
          <TopicBreak title="Student POV Example" />
          <Speak>
            This is a lot! So lets look at an example. Say we are currently 3
            weeks into the semester with 70 points in standard 1: Logic, I
            completed only the practice HW on week 1, and I wanna know where I
            stand. This means we are in standard 2: Numbers, currently you are
            assigned 1 homework for standard 2, an optional HW for standard 1,
            and 3 special points usable. If you weren't happy with your point
            total in standard 1 then you could use your 2 of your special point
            to go from 70/80 (B) to 72/80 (B+) for free by emailing me. You
            could save your special points and do the optional HW to earn up to
            20 points for standard 1 (This means you can get an A by earning
            only half the points on the optional HW!). Or you could Ignore the
            optional HW, save your special points for later, and wait until the
            optional midterm comes around to get up to 10 points (Thats also an
            A for standard 1). You can't sit around and do nothing however,
            because the upcoming friday is the due date for the current standard
            2 HW and the optional HW for standard 1.
          </Speak>
          <TopicBreak title="Turning Things In" />
          <Speak>
            Now that we know there are HW's and Exams, how do we turn everything
            in? LMU uses the learning management system known as Brightspace
            (Others include Google Classroom and Canvas). This is where all your
            assignment "turn in's" will be located. This is also where your
            exams will be held (they are all digital). This is where you will
            find your grades and any other materials I cannot legally post
            publicly on my course site. Assuming all goes well, you will access
            Brightspace only for turning in your HW and taking Exams. Everything
            else will be posted here on the current site (jag.prof).
          </Speak>
        </>
      ) : tabState === "Schedule" ? (
        <></>
      ) : tabState === "Student Rights and Responsibilities" ? (
        <>
          <Speak>
            As a student at LMU you have access to many services that you may
            not be aware of! I have linked as many as I can think of here to
            provide you with an easy way to find these services. You'll also
            find a small paragraph of the mission statement from each of these
            services.
          </Speak>
          <Speak>
            (COC) Community of Care: "The mission of the Loyola Marymount
            University Community of Care (COC) — a collaborative case-management
            program — is to enhance community safety and student well-being. The
            Community of Care provides prevention, assessment, and intervention
            for and with students as they navigate the challenges that stand in
            their way of academic and personal success.""
            https://studentaffairs.lmu.edu/wellness/coc/learnmoreaboutus/
          </Speak>
          <Speak>
            LION Connect: "LionConnect is a comprehensive portal designed to
            empower students to take control of their academic journey to
            achieve their goals. By offering a personalized dashboard, seamless
            scheduling, and direct access to dedicated support staff,
            LionConnect enhances communication and collaboration between
            students and the Web of Support staff. This innovative approach
            leverages technology and real-time data to provide personalized and
            timely interventions, ensuring students receive the support they
            need to succeed."
            https://www.lmu.edu/academics/provost/resources/lionconnect/#:~:text=By%20offering%20a%20personalized%20dashboard,%20seamless%20scheduling,%20and%20direct%20access
          </Speak>
          <Speak>
            (EIS) Ethnic and Intercultural Services: "The mission of the
            department of Ethnic and Intercultural Services (EIS) is to support
            the intercultural learning and development of students, specifically
            those from historically underrepresented backgrounds at LMU. This
            area has played a central role to support the personal and academic
            success of students through programs and services focused on
            identity development, community building, and advocacy. In an effort
            to build upon our mission, there are four primary goals that we will
            work on in three phases to further enhance our department
            operations, programmatically engage with students, and collaborate
            with campus partners."
            https://studentaffairs.lmu.edu/community/ethnicandinterculturalservices/
          </Speak>
          <Speak>
            Center for Student Collegiate Recovery: "Loyola Marymount
            University's Center for Student Collegiate Recovery, located on the
            first floor of Malone (Malone 113), provides a comfortable space and
            supportive community for students in recovery or seeking to create
            and sustain improvements in their wellness. Students will be
            empowered to take individual responsibility for their own health and
            well-being while belonging to a community of support. Staff
            facilitate access to support groups and provide programming for
            students and their allies in recovery. Weekly meetings are held each
            semester. No sign-up required."
            https://studentaffairs.lmu.edu/wellness/recovery/
          </Speak>
          <Speak>
            (OISS) Office for International Students and Scholars: "The Office
            for International Students and Scholars (OISS) serves as a resource
            to the University by ensuring regulatory compliance. OISS provides
            programs and services that support international students' and
            scholars' social, educational and professional success, thereby,
            creating an engaged global community."
            https://studentaffairs.lmu.edu/community/officeforinternationalstudentsandscholars/
          </Speak>
          <Speak>
            (OSCC) Office of Student Conduct and Community Responsibility:
            "Loyola Marymount University's Office of Student Conduct & Community
            Responsibility (OSCCR) is committed to fostering an environment
            conducive to the pursuit of knowledge. Such an environment is based
            upon respect, trust, integrity and accountability. Through education
            and by upholding community standards detailed in the Student Conduct
            Code, OSCCR holds LMU students accountable for their violations and
            helps them grow into more responsible and community-minded persons."
            https://studentaffairs.lmu.edu/about/osccr/#:~:text=Loyola%20Marymount%20University's%20Office%20of%20Student%20Conduct%20&%20Community%20Responsibility
          </Speak>
          <Speak>
            (CSA) Pam Rector Center for Service and Action: "The Pam Rector
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
            integrate Community-Based Learning programs into their curriculum."
            https://studentaffairs.lmu.edu/activities/centerforserviceandaction/#:~:text=Pam%20Rector%20Center%20for%20Service%20and%20Action.%20About%20CSA.%20Programs.
          </Speak>
          <Speak>
            (SES) Student Employment Services: "Student Employment Services
            (SES) at LMU provides part-time employment opportunities, workshops,
            and services to further students' professional development and
            post-graduate success. More than 3,400 LMU students work in more
            than 5,300 positions across campus. National reports and LMU
            retention statistics indicate that students who work are more
            successful because of the skills and experiences they obtain on the
            job."
          </Speak>
          <Speak>
            (SHS) Student Health Services: "Student Health Services (SHS)
            remains committed to the health and safety of our campus community.
            We are a full-service medical office that is accredited by the
            Accreditation Association for Ambulatory Health Care (AAAHC).Our
            health care team includes physicians, nurse practitioners,
            registered nurses, and trained support staff. Our services include
            treatment for illnesses and injuries, preventive care, Gynecological
            health services, vaccinations, health education/wellness programs,
            and much more."
            https://studentaffairs.lmu.edu/wellness/studenthealthservices/#:~:text=Student%20Health%20Services%20(SHS)%20remains%20committed%20to%20the%20health%20and
          </Speak>
          <Speak>
            (SPS) Student Psychological Services: "Student Psychological
            Services is committed to facilitating student growth and development
            of the whole person by providing high quality, confidential
            psychological services that is social justice oriented, ethical and
            culturally informed, to ensure the inclusivity and safety for
            students."
            https://studentaffairs.lmu.edu/wellness/studentpsychologicalservices/about/
          </Speak>
          <Speak>
            Student Housing Services: "In the spirit of Loyola Marymount
            University and Student Affairs missions, the Student Housing Office
            creates a living and learning environment by providing programs and
            services that empower students to realize their potential in mind,
            body and spirit within a community that honors human diversity and
            accepts students as individuals; each with rights and
            responsibilities."
            https://studentaffairs.lmu.edu/housing/studenthousing/#:~:text=Perched%20atop%20the%20bluff%20overlooking%20Los%20Angeles%20and%20the%20Pacific
          </Speak>
          <Speak>
            Student Media: "The Student Media Department at Loyola Marymount
            University offers unique opportunities to work at a fast-paced
            student-run media outlet in an environment that allows you to
            develop leadership skills that will make you a highly sought-after
            job candidate once you hit the real word. Opportunities to get
            involved include with The Los Angeles Loyolan newspaper, The Tower
            Yearbook, ROAR Studios and KXLU 88.9FM radio station."
            https://studentaffairs.lmu.edu/activities/campusactivitiesandentertainment/studentmedia/#:~:text=The%20Student%20Media%20Department%20at%20Loyola%20Marymount%20University%20offers%20unique
          </Speak>
          <Speak>
            Student Transition and Success: "The Student Success office is home
            to departments focused on providing programming and outreach to
            specific student populations to ensure their successful engagement,
            retention and transition into Loyola Marymount University."
            https://studentaffairs.lmu.edu/community/studentsuccess/#:~:text=The%20Student%20Success%20office%20is%20home%20to%20departments%20focused%20on
          </Speak>
          <Speak>
            Burns Recreational Center: "Welcome to the Burns Recreation Center!
            The Burns Recreation Center features a fitness center, group fitness
            studios, multi-purpose courts, tennis courts and an Olympic-sized
            outdoor swimming pool. Aquatics programs take place at the pool
            located at Burns Recreation Center. LMU's Burns Recreation Pool also
            has a lawn area as well as folding chairs around the pool deck
            providing ideal space for sun bathing."
            https://studentaffairs.lmu.edu/wellness/campusrecreationandstudentfacilities/facilities/burnsrecreationcenter/#:~:text=The%20Burns%20Recreation%20Center%20features%20a%20fitness%20center,%20group%20fitness
          </Speak>
          <Speak>
            The Lion's Den: "Visit LMU's only completely student-run coffee
            shop. Located on the first floor of Malone Student Center, the
            Lion's Den serves 100% Fair Trade organic coffee, espresso and tea,
            as well as a wide variety of delicious pastries. In addition, a
            large seating area gives LMU students a space to gather and study.
            The energetic, friendly student staff of the Lion's Den, which is
            managed by Campus Recreation and Student Facilities, creates a
            unique and inviting atmosphere that makes it one of the most popular
            places to be on campus."
            https://studentaffairs.lmu.edu/activities/campusactivitiesandentertainment/venuesandhangouts/lionsdencoffeeshop/#:~:text=Visit%20LMU's%20only%20completely%20student-run%20coffee%20shop.%20Located%20on%20the
          </Speak>
          <Speak>
            The Loft: "The Loft is LMU's craft beer and wine bar, which is
            managed by LMU's Campus Recreation and Student Facilities
            department. Open Monday through Friday, The Loft provides a
            dedicated space for current LMU students, faculty, staff, and alumni
            over the age of 21 to drink responsibly, socialize and learn about
            the world of craft beer."
            https://studentaffairs.lmu.edu/activities/campusactivitiesandentertainment/venuesandhangouts/theloftcraftbeerwine/#:~:text=Open%20Monday%20through%20Friday,%20The%20Loft%20provides%20a%20dedicated%20space
          </Speak>
          <Speak>
            (FERPA) Family Education Rights and Privacy Act: "FERPA stands for
            the Family Education Rights and Privacy Act of 1974. This law
            protects the privacy of student education records from kindergarten
            through graduate school. FERPA applies to all schools that receive
            funds through an applicable program of the U.S. Department of
            Education, and thus most postsecondary schools are covered by
            FERPA." https://registrar.lmu.edu/ferpa-rightsandprivacyact/
          </Speak>
          <Speak>
            (ASLMU) Associated Students of LMU: "ASLMU, in keeping with the
            Jesuit and Marymount tradition, empowers the voice of the students
            and actively promotes a vibrant campus life. Driven by integrity, we
            devote ourselves to being persons for and with others."
            https://www.aslmu.org/
          </Speak>
          <Speak>
            (ARC) Academic Resource Center: "The Academic Resource Center (ARC)
            provides Course Tutoring, Writing Tutoring, and Academic Coaching.
            Our services are designed as a compliment to the curriculum with the
            intentions of fostering academic success."
            https://academics.lmu.edu/arc/#:~:text=The%20Academic%20Resource%20Center%20(ARC)%20provides%20Course%20Tutoring,%20Writing%20Tutoring,
          </Speak>
          <Speak>
            (ITS) Information Technology Services: "ITS enables
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
            operations."
            https://its.lmu.edu/#:~:text=Introducing%20the%20Artificial%20Intelligence%20Hub.%20This%20collaborative%20AI%20hub%20is
          </Speak>
          <Speak>
            ME: This one, surprisingly, is not an acronym! It's literally
            referring to me, Professor Julian Gonzalez. If this is overwhelming
            and you are unsure where to go or what to do, you can talk to me
            personally as a guide through your resources! Feel free to email me
            to make a private appointment with me in my office for a private
            space to discuss your thoughts.
          </Speak>
          <Speak>
            However, these services are not free (you are paying for them after
            all!). You keep access to these services by maintaining and
            upholding the Lion Code, which can be found below.
          </Speak>
          <Speak>
            I don't have any rules in particular to provide, however I do have a
            golden rule that everyone should follow: "Don't Disturb the Learning
            of Others."
          </Speak>
        </>
      ) : tabState === "FAQ" ? (
        <></>
      ) : (
        <> Hey You're Not Supposed to See This! How Did You Get Back Here?</>
      )}
    </CoursePage>
  )
}
