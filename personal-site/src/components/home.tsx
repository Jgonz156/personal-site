import {
  Badge,
  Chip,
  Divider,
  List,
  ListItem,
  Sheet,
  Typography,
} from "@mui/joy"
import CourseCard from "./course-card"
import { CourseStatusBadge, SiteContext } from "./site-context"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import FeedIcon from "@mui/icons-material/Feed"
import SchoolIcon from "@mui/icons-material/School"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import React from "react"
import CourseInfoDump from "./course-info-dump"
import PaperCard from "./paper-card"
import BookCard from "./book-card"
import ProjectCard from "./project-card"

export default function Home() {
  const { settings, dispatch } = React.useContext(SiteContext)
  const courses: {
    title: string
    code: string
    gradeLevel: string
    color: "primary" | "danger"
    imageUrl: string
    slug: string
    status: CourseStatusBadge
    openModal: () => void
    closeModal: () => void
    modalState: boolean
    courseCardDescription: React.ReactNode
  }[] = [
    {
      title: "Discrete Mathematics for CS",
      code: "2820",
      gradeLevel: "Sophomore-Undergraduate",
      color: "primary",
      imageUrl: "/lmu-identity/LMU-Campus-Ariel.jpg",
      slug: "/cmsi-2820",
      status: settings.Home.Courses.CMSI2820.StatusBadge,
      openModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              CMSI2820: {
                ...settings.Home.Courses.CMSI2820,
                ModalVisible: true,
              },
            },
          },
        }),
      closeModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              CMSI2820: {
                ...settings.Home.Courses.CMSI2820,
                ModalVisible: false,
              },
            },
          },
        }),
      modalState: settings.Home.Courses.CMSI2820.ModalVisible,
      courseCardDescription: (
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Sheet>
            Discrete Mathematics for CS is a 4-unit/credit hour hands on course
            that infuses the learning of Discrete theory topics into direct
            application in Python. These topics include Intuitionistic
            Propositional and Predicate Logic, Number Theory, Type Theory,
            Combinatorics, Graph Theory, Set Theory, and a few more topic
            extensions to broaden the application of these topics in Computer
            Science.
          </Sheet>
          <Divider>
            <Chip>Prerequisites</Chip>
          </Divider>
          <Sheet> CMSI 1010 or ENGR 160 or ENGR 1200</Sheet>
          <CourseInfoDump
            sectionNumber={1}
            daysOfWeek={["Tuesday", "Thursday"]}
            timeStart="1:45 PM"
            timeEnd="3:25 PM"
            building="Pereira"
            roomNumber={206}
          />
        </Sheet>
      ),
    },
    {
      title: "Operating Systems",
      code: "3510",
      gradeLevel: "Junior-Undergraduate",
      color: "primary",
      imageUrl: "/lmu-identity/LMU-Campus-Ariel.jpg",
      slug: "/cmsi-3510",
      status: settings.Home.Courses.CMSI3510.StatusBadge,
      openModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              CMSI3510: {
                ...settings.Home.Courses.CMSI3510,
                ModalVisible: true,
              },
            },
          },
        }),
      closeModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              CMSI3510: {
                ...settings.Home.Courses.CMSI3510,
                ModalVisible: false,
              },
            },
          },
        }),
      modalState: settings.Home.Courses.CMSI3510.ModalVisible,
      courseCardDescription: (
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Sheet>
            Operating Systems is a 4-unit/credit hour hands on course that
            covers the foundational programming concepts related to, and
            proliferated within, operating systems. Topics include Concurrent
            Programming, Memory Management, File Systems, Process Scheduling,
            and more. The course uses Rust as its primary language for examples,
            activities, homeworks, and is supplemented by other languages where
            necessary.
          </Sheet>
          <Divider>
            <Chip>Prerequisites</Chip>
          </Divider>
          <Sheet> CMSI 2210 and/or CMSI 284 160 or EECE 3140</Sheet>
          <CourseInfoDump
            sectionNumber={1}
            daysOfWeek={["Monday", "Wednesday"]}
            timeStart="1:45 PM"
            timeEnd="3:25 PM"
            building="Seaver"
            roomNumber={304}
          />
        </Sheet>
      ),
    },
    {
      title: "Programming Language Foundations",
      code: "5850",
      gradeLevel: "Graduate",
      color: "danger",
      imageUrl: "/lmu-identity/LMU-Campus-Ariel.jpg",
      slug: "/cmsi-5850",
      status: settings.Home.Courses.CMSI5850.StatusBadge,
      openModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              CMSI5850: {
                ...settings.Home.Courses.CMSI5850,
                ModalVisible: true,
              },
            },
          },
        }),
      closeModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              CMSI5850: {
                ...settings.Home.Courses.CMSI5850,
                ModalVisible: false,
              },
            },
          },
        }),
      modalState: settings.Home.Courses.CMSI5850.ModalVisible,
      courseCardDescription: (
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Sheet>
            Programming Language Foundations is a 4-unit/credit hour (3 if CMSI
            585) course that covers the foundational mathematics that underlies
            the realization and implementation of programming languages. Topics
            include Lambda Calculus, Type Theory, Denotational Semantics,
            Operational Semantics, and more. The course uses a variety of
            languages for examples, and homeworks.
          </Sheet>
          <CourseInfoDump
            sectionNumber={1}
            daysOfWeek={["Thursday"]}
            timeStart="6:00 PM"
            timeEnd="8:30 PM"
            building="Seaver"
            roomNumber={211}
          />
        </Sheet>
      ),
    },
    /* 
    {
      title: "Independent Study",
      code: "X998",
      imageUrl: "/lmu-identity/LMU-Campus-Ariel.jpg",
      slug: "/cmsi-X998",
      status: settings.Home.Courses.cmsiX999.StatusBadge,
      openModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              cmsiX999: {
                ...settings.Home.Courses.cmsiX999,
                ModalVisible: true,
              },
            },
          },
        }),
      closeModal: () =>
        dispatch({
          field: "Home",
          value: {
            ...settings.Home,
            Courses: {
              ...settings.Home.Courses,
              cmsiX999: {
                ...settings.Home.Courses.cmsiX999,
                ModalVisible: false,
              },
            },
          },
        }),
      modalState: settings.Home.Courses.cmsiX999.ModalVisible,
      courseCardDescription: (
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Sheet>
            Independent Study is an adjustable credit hour course designed to
            give students the flexibility to study, engage with, and produce
            projects in topic areas not investigated directly by the University
            CS curriculum. The independent study is built as a collaborative
            effort between a student and proctor to ensure University guidelines
            are being followed while allowing for novel studies and software
            production.
          </Sheet>
          <Divider>
            <Chip>Prerequisites</Chip>
          </Divider>
          <Sheet>Student, Proctor, Chair and Dean Approval</Sheet>
        </Sheet>
      ),
    },*/
  ]
  const selfPapers = [
    {
      title:
        "Investigating the Efficacy of Persistent Data Structures on Asymmetric Scheduling Algorithms for Heterogeneous CPU Architectures",
      authors: ["Gonzalez, Julian"],
      pages: 66,
      abstract: (
        <>
          <Typography>
            Heterogeneous computing architectures offer performance gains but
            introduce complexities in scheduling for optimal efficiency. This
            thesis explores persistent data structures to address these
            challenges. Investigations revealed runtime overheads associated
            with the naive persistence implementations, highlighting need for
            targeted use. A theoretical analysis of the 'Doppler' problem
            demonstrated how persistence mitigates cache synchronization
            bottlenecks, particularly in workloads with compute-modify-write
            patterns on shared data. This research suggests that persistence is
            most beneficial in heterogeneous systems with significant core-speed
            disparities. These findings open paths for developing novel
            scheduling strategies, enhancing resilience, and improving debugging
            capabilities.
          </Typography>
        </>
      ),
      link: undefined,
      imageSlug:
        "/paper-covers/PAPER-Investigating the Efficacy of Persistent Data Structures on Asymmetric Scheduling Algorithms for Heterogeneous CPU Architectures-COVER.png",
    },
  ]
  //const otherPapers = [{}];
  const books = [
    {
      title:
        "Concurrency Theory: Calculi and Automata for Modelling Untimed and Timed Concurrent Systems",
      authors: ["Bowman, Howard", "Gomez, Rodolfo"],
      pages: 422,
      abstract: (
        <>
          <Typography>
            Concurrency Theory is a synthesis of one of the major threads of
            theoretical computer science research focusing on languages and
            graphical notions for describing collections of simultaneously
            evolving components that interact through synchronous communication.
            The main specification notation focused on in this book is LOTOS. An
            extensive introduction to this particular process calculus is given,
            highlighting how the approach differs from competitor techniques,
            such as CCS and CSP.
          </Typography>
          <Typography>
            The book covers linear-time semantics, based on traces;
            branching-time semantics, using both labeled transition systems and
            refusals; and true concurrency semantics, using (bundle) event
            structures. In addition, the book discusses communicating automata
            approaches (both finite and infinite state); how the theory can be
            generalized to the timed setting; and, finally, the authors
            generalize the (finite and infinite state) communicating automata
            notations to yield timed automata and discrete timed automata.
          </Typography>
          <Typography>
            This book represents a comprehensive pass through the spectrum of
            concurrency theory research: From untimed to timed syntax and
            semantics and process calculi to automata. Researchers and
            practitioners in the field of concurrency theory, as well as MSc and
            PhD students, will find the comprehensive coverage in this book
            essential reading.
          </Typography>
        </>
      ),
      link: "https://link.springer.com/book/10.1007/1-84628-336-1",
      imageSlug:
        "/book-covers/ConcurrencyTheory-CalculiAndAutomataForModellingUntimedAndTimedConcurrentSystems.png",
    },
    {
      title:
        "Operating Systems and Middleware: Supporting Controlled Interaction",
      authors: ["Hailperin, Max"],
      pages: 559,
      abstract: (
        <>
          <Typography>
            Suppose you sit down at your computer to check your email. One of
            the messages includes an attached document, which you are to edit.
            You click the attachment, and it opens up in another window. After
            you start edit- ing the document, you realize you need to leave for
            a trip. You save the document in its partially edited state and shut
            down the computer to save energy while you are gone. Upon returning,
            you boot the computer back up, open the document, and continue
            editing.
          </Typography>
          <Typography>
            This scenario illustrates that computations interact. In fact, it
            demonstrates at least three kinds of interactions between
            computations. In each case, one computation provides data to
            another. First, your email program retrieves new mail from the
            server, using the Internet to bridge space. Sec- ond, your email
            program provides the attachment to the word processor, using the
            operating system's services to couple the two application pro-
            grams. Third, the invocation of the word processor that is running
            before your trip provides the partially edited document to the
            invocation running after your return, using disk storage to bridge
            time.
          </Typography>
          <Typography>
            In this book, you will learn about all three kinds of interaction.
            In all three cases, interesting software techniques are needed in
            order to bring the computations into contact, yet keep them
            sufficiently at arm's length that they don't compromise each other's
            reliability. The exciting challenge, then, is supporting controlled
            interaction. This includes support for computations that share a
            single computer and interact with one another, as your email and
            word processing programs do. It also includes support for data
            storage and network communication. This book describes how all these
            kinds of support are provided both by operating systems and by
            additional software layered on top of operating systems, which is
            known as middleware.
          </Typography>
        </>
      ),
      link: "https://gustavus.edu/academics/departments/mathematics-computer-science-and-statistics/max/os-book/osm-rev1.2.1.pdf",
      imageSlug:
        "/book-covers/OperatingSystemsAndMiddleware-SupportingControlledInteractions.png",
    },
    {
      title: "Parallel Programming: Concepts and Practice",
      authors: [
        "Schmidt, Bertil",
        "Gonzalez-Martinez, Jorge",
        "Hundt, Christian",
        "Schlarb, Moritz",
      ],
      pages: 416,
      abstract: (
        <>
          <Typography>
            Parallel Programming: Concepts and Practice provides an upper level
            introduction to parallel programming. In addition to covering
            general parallelism concepts, this text teaches practical
            programming skills for both shared memory and distributed memory
            architectures. The authors' open-source system for automated code
            evaluation provides easy access to parallel computing resources,
            making the book particularly suitable for classroom settings.
          </Typography>
          <Typography>
            Covers parallel programming approaches for single computer nodes and
            HPC clusters: OpenMP, multithreading, SIMD vectorization, MPI,
            UPC++.
          </Typography>
          <Typography>
            Contains numerous practical parallel programming exercises.
          </Typography>
          <Typography>
            Includes access to an automated code evaluation tool that enables
            students the opportunity to program in a web browser and receive
            immediate feedback on the result validity of their program.
          </Typography>
          <Typography>
            Features an example-based teaching of concept to enhance learning
            outcomes.
          </Typography>
        </>
      ),
      link: undefined,
      imageSlug: "/book-covers/ParallelProgramming-ConceptsAndPractice.jpg",
    },
  ]
  const projects = [{}]
  return (
    <Sheet
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Divider>
        <Chip variant="soft" startDecorator={<SchoolIcon />} size="lg">
          Courses
        </Chip>
      </Divider>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <List
          orientation="horizontal"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <ListItem>
            <Badge size="lg" variant="solid" color={"success"}>
              <Chip size="lg">Active</Chip>
            </Badge>
          </ListItem>
          <ListItem>
            <Badge size="lg" variant="solid" color={"danger"}>
              <Chip size="lg">Under Construction</Chip>
            </Badge>
          </ListItem>
          <ListItem>
            <Badge size="lg" variant="solid" color={"neutral"}>
              <Chip size="lg">Inactive</Chip>
            </Badge>
          </ListItem>
        </List>
      </Sheet>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      >
        {courses.map((info, i) => (
          <Badge
            key={i}
            size="lg"
            variant="solid"
            color={
              info.status === CourseStatusBadge.InProgress
                ? "success"
                : info.status === CourseStatusBadge.UnderConstruction
                ? "danger"
                : "neutral"
            }
          >
            <CourseCard {...info}>{info.courseCardDescription}</CourseCard>
          </Badge>
        ))}
      </Sheet>
      <Divider>
        <Chip variant="soft" startDecorator={<FeedIcon />} size="lg">
          Papers
        </Chip>
      </Divider>
      <Typography>Here are some papers I have written...</Typography>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      >
        {selfPapers.map((info, i) => (
          <PaperCard {...info} key={i} />
        ))}
      </Sheet>
      <Typography>
        And here are some ones I've read that I find interesting!
      </Typography>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      ></Sheet>
      <Divider>
        <Chip variant="soft" startDecorator={<AutoStoriesIcon />} size="lg">
          Books
        </Chip>
      </Divider>
      <Typography>
        I haven't written any books but here are some great ones that I highly
        recommend! As a clarification for my students: These are NOT your
        textbooks! Those will be found in the course itself!
      </Typography>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 4,
        }}
      >
        {books.map((info, i) => (
          <BookCard {...info} key={i} />
        ))}
      </Sheet>
      <Divider>
        <Chip variant="soft" startDecorator={<AccountTreeIcon />} size="lg">
          Open Source Projects
        </Chip>
      </Divider>
      <Typography>
        Here are some of the projects I have worked on, am working on currently,
        or just want to show off!
      </Typography>
      <Sheet
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: 4,
        }}
      >
        {projects.map(({}, i) => (
          <ProjectCard key={i} />
        ))}
      </Sheet>
    </Sheet>
  )
}
