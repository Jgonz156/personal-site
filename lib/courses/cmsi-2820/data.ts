import type { CourseEvent } from "../../course-data"
import { createSchedule } from "../schedule-generator"
import { cmsi2820Fall2025Schedule } from "./schedule"

// Create schedule generator with Fall 2025 configuration
const schedule = createSchedule(cmsi2820Fall2025Schedule)

// Generate all course events with schedule-based dates
const allEvents: CourseEvent[] = [
  {
    id: "2820-hol0",
    title: "Martin Luther King Jr. Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 1, 19, "2820-hol0", true),
    description: "Happy Martin Luther King Jr. Day!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol1",
    title: "Ceasar Chavez Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 31, "2820-hol1", true),
    description: "Enjoy your Ceasar Chavez Day!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol3",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 2, "2820-hol3", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol4",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 3, "2820-hol4", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol5",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 4, "2820-hol5", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol6",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 5, "2820-hol6", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol7",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 6, "2820-hol7", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol8",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 4, 1, "2820-hol8", true),
    description: "Enjoy your Easter break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol9",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 4, 2, "2820-hol9", true),
    description: "Enjoy your Easter break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol10",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 4, 3, "2820-hol10", true),
    description: "Enjoy your Easter break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol11",
    title: "Reading Day",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 5, 6, "2820-hol11", true),
    description: "Enjoy your Reading Day!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-ln0",
    title: "LN 0: Reading Course Material!",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln0"),
    description:
      "Here is a sample of what the lecture notes will look like! This one just explains the color coding I use for information and displays the small interactive modules I might have throughout the notes.",
    courseId: "cmsi-2820",
    standard: "Syllabus",
    contentUrl: "/cmsi-2820/ln0",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/kjBAIt-2Nptu6f79rCOC3wMgdrdq9mT-5Go0bOPh7McI0zgNhTzMjTH4X89e2Jch.bsOw3dB8Vjmfuthx",
      }
    ]
  },
  {
    id: "2820-hw0",
    title: "HW 0: Practicing Homework",
    type: "homework",
    date: schedule.getSpecificDate(2026, 1, 23, "2820-hw0"),
    availableDate: schedule.getSpecificDate(2026, 1, 11, "2820-hw0-available"),
    dueTime: "11:59 PM",
    description:
      "This is a small assignment to help you get familiar with the process of receiving and submitting assignments!",
    courseId: "cmsi-2820",
    standard: "Syllabus",
    contentUrl: "/cmsi-2820/hw0",
    hwTopics: [
      "Getting familiar with homework format",
      "GitHub Classroom workflow",
      "Python and PyTest setup",
    ],
    hwPoints: { written: 1, programming: 1, optional: 1 },
    hwGithubClassroomUrl: "https://classroom.github.com/a/NFLIc0ul",
    hwBrightspaceUrl: "",
  },
  {
    id: "2820-ex0-release",
    title: "EX 0 Release",
    type: "exam",
    date: schedule.getSpecificDate(2026, 1, 18, "2820-ex0-release", true),
    description: "Syllabus exam released and available for completion.",
    courseId: "cmsi-2820",
    standard: "Syllabus",
    //contentUrl: "/cmsi-2820/ex0",
  },
  {
    id: "2820-ex0",
    title: "EX 0: Syllabus Exam",
    type: "exam",
    date: schedule.getSpecificDate(2026, 1, 24, "2820-ex0"),
    dueTime: "11:59 PM",
    description:
      "Exams are an important part of how you communicate your understanding of the material! Here you will take one on the most vital parts of the course syllabus! I promise its not hard.",
    courseId: "cmsi-2820",
    standard: "Syllabus",
    contentUrl: "/cmsi-2820/ex0",
    exTopics: [
      "Classroom rules",
      "Contact information",
      "Course standards",
      "LMU student services",
    ],
    exTotalPoints: 2,
    exTotalQuestions: 5,
    exHasTimer: false,
    exAllowedAttempts: "Unlimited",
    exExamUrl: "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802312/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277",
  },
  {
    id: "2820-ln1",
    title: "LN 1: Information and Its Consequences...",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln1"),
    description:
      "This lecture will cover the basics of many different systems of logic, where they came from, how they were used, and what it even means to craft a valid line of reasoning.",
    courseId: "cmsi-2820",
    standard: "Logic",
    lnTopics: [
      "Logic",
      "Intuitionism",
    ],
    contentUrl: "/cmsi-2820/ln1",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/cXDitOecSPt644d3ncSYnn0sHZBTlekVIgJY_ifQ5HdX19LjexSjNP6LWlid6woW.CAARUfAvWAoCYGqS"
      }
    ],
  },
  {
    id: "2820-ln2",
    title: "LN 2: Making Logical Connections",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln2"),
    description:
      "This lecture will be an introduction to intuitionistic logic more formally. We will cover propositions, their variables, compound formulas, and logical connectives.",
    courseId: "cmsi-2820",
    standard: "Logic",
    contentUrl: "/cmsi-2820/ln2",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/kFKn2f6gesHO9DBJGpPxmPRrJ5z2r_kOwX275MaYdJDuqvJOfpJQ0Gq07W-mEyAb.k8LuWN0m8QmRTqVZ",
      }
    ],
  },
  {
    id: "2820-ln3",
    title: "LN 3: Assumptions Make an Argument out of You and Me",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln3"),
    description:
      "This lecture expands on propositional logic by extending our inferential abilities for each of our logical connectives by exploring Natural Deduction",
    courseId: "cmsi-2820",
    standard: "Logic",
    contentUrl: "/cmsi-2820/ln3",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/CDuENn0Neh5GK3uy3znwAtKwLdVpXYWFRJMpwtXM1wxHUPN5sdH6rl-dhhIf7qPA.vst94jhbcrVepfai"
      }
    ],
  },
  {
    id: "2820-hw1",
    title: "HW 1: Think Class! Think!",
    type: "homework",
    date: schedule.getSpecificDate(2026, 2, 6, "2820-hw1"),
    availableDate: schedule.getSpecificDate(2026, 1, 23, "2820-hw1-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will get practice with logical terminology, evaluating propositions in finite contexts, creating propositional and predicate logic statements, translating natural language into logic, and natural deduction proofs!",
    courseId: "cmsi-2820",
    standard: "Logic",
    contentUrl: "/cmsi-2820/hw1",
    hwTopics: [
      "Intuitionistic Logic",
      "Propositional Logic",
      "First Order Logic",
      "Natural Deduction",
      "Higher Order Logic",
    ],
    hwPoints: { written: 75, programming: 5 },
    hwGithubClassroomUrl: "https://classroom.github.com/a/bE384tPa",
    hwBrightspaceUrl: "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802237/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277",
  },
  {
    id: "2820-ln4",
    title: "LN 4: Primitive Beginnings",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln4"),
    description:
      "In this lecture we will stroll through a brief history lesson that covers the foundations of mathematics (Set, Category, and Type Theory) and then we will see a small formal introduction to Type Theory",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "/cmsi-2820/ln4",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/jNs7D16Hxy2J4vmiKFfaML5HwJ6Q3p5SNo1FRZviKkWHk_Q8lEgcoKvlWK3-rNwn.UPEXDg4mkjHkgwm7",
      }
    ],
  },
  {
    id: "2820-ln5",
    title: "LN 5: Meet The Booleans, Don't Worry There's only Two of Them",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln5"),
    description:
      "In this lecture, we begin building up our grasp on types by investigating 0 and 1, better known as the Booleans. We will look at the Booleans algebraically and graphically to discover unique properties, underlying patterns, and learn what it looks like to investigate within the foundation of Type Theory.",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "/cmsi-2820/ln5",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/c9tIubtSiVf-t1UmAUKlgMuLao0pR4BqsMVFGFicVSFJylXTbVPb7cXQfmJc592W.a9iEkEitRxV5O1Ok",
      }
    ],
  },
  {
    id: "2820-ln6",
    title: "LN 6: The Integers, The Booleans' Infinite In-laws",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln6"),
    description:
      "In this lecture we use the integer type to investigate the larger, hidden world of operators on types. We cover associativity, commutativity, identity, and closure for the integers.",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "/cmsi-2820/ln6",
    recordings: [
    ],
  },
  {
    id: "2820-ln7",
    title:
      "LN 7: Division without Decimals? Positive Numbers that Add to Zero? What is this Place?!?",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln7"),
    description:
      "In this lecture, we investigate what really drives the Integer type to be so unique. We will be looking at integer division, primes, and modular arithmetic.",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "/cmsi-2820/ln7",
    recordings: [
      
    ],
  },
  {
    id: "2820-hw2",
    title: "HW 2: Counting Sheep",
    type: "homework",
    date: schedule.getSpecificDate(2026, 2, 20, "2820-hw2"),
    availableDate: schedule.getSpecificDate(2026, 2, 6, "2820-hw2-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will get practice with the many topics covered in the notes for this standard. This includes the Booleans, the Integers, and the many operations that can be performed on them!",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "/cmsi-2820/hw2",
    hwTopics: [
      "Type Theory",
      "Boolean Algebra",
      "Venn Diagrams",
      "Integer Arithmetic",
      "Modular Arithmetic",
    ],
    hwPoints: { written: 60, programming: 40, optional: 20 },
    hwGithubClassroomUrl: "https://classroom.github.com/a/UB2L6HVO",
    hwBrightspaceUrl: "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802239/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277",
  },
  {
    id: "2820-ln8",
    title: "LN 8: Getting Our Types in a Row",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln8"),
    description:
      "In this lecture we formally investigate tuples (also known as product types in type theory) including their properties, operations, and how they are used to build up more complex types.",
    courseId: "cmsi-2820",
    standard: "Collections",
    contentUrl: "/cmsi-2820/ln8",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/imbrdZl74I0fltcnIhOPTOzbbrA0bWNAgYFM_jPi0AcUF7ZrtaNSO9dAHLyPYP37.z59k5spVg6Qkq5PS",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/ZKHpLWk-N235Iix0i89NGRHmwDIbLo6F9plKWq3Nqc3tO3Yp7cm8prPb1iVpYyUI.1Q9hppiesoSuu7La",
      },
    ],
  },
  {
    id: "2820-ln9",
    title: "LN 9: Settling In",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln9"),
    description:
      "In this lecture we investigate the Tuples older sibling, the Set. We'll investigate it formally by defining it, exploring some innate properties, and a few basic operators.",
    courseId: "cmsi-2820",
    standard: "Collections",
    contentUrl: "/cmsi-2820/ln9",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/ET9vj2YYYUqk4HYlSzqc0mckRSjtY53Ad1H2Vpr4lnc7cK8MyWQSyzvnqWwSjF2h.HfWKWl5j5e-su3oj",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/ICQNejqDeCzt2xB0nqzjaMmKXmoalManRFG-P7s9IcgTv7AayjnuvoNBqYIyzyd5.VhX4S3ffQEzigHWA",
      },
    ],
  },
  {
    id: "2820-ln10",
    title: "LN 10: Settling Down",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln10"),
    description:
      "We continue our investigation of Sets by practicing some of the many common operations found between them.",
    courseId: "cmsi-2820",
    standard: "Collections",
    contentUrl: "/cmsi-2820/ln10",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/IwDztL9vPRJBPiX9yaIfvK1ILH2VSPoBYRZZJ7nwIOHAt2LTEvonpNWh2bZ6jjgU.y8wQ4lIIjYjJoKwT",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/sKqX7ShRhWS2KNWTspDnjZBp5mYTj4FVYzIQenE3OGiTjeo0Ry_X13v8jp_aZQ.8FQqNOepXYdSOySO",
      },
    ],
  },
  {
    id: "2820-ln11",
    title: "LN 11: Relationship Counseling",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln11"),
    description:
      "We end our look at Collections by learning about relations. Typically represented as sets of tuples, we will investigate the properties of relationships between instances within a type.",
    courseId: "cmsi-2820",
    standard: "Collections",
    contentUrl: "/cmsi-2820/ln11",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/UqAl9mjtGDdxPNXRYdEoDD4RMjg4dYsasfwDh3jpCxwbR6S9iGjILho5iV0Pvw.VolcdDa3Ev54QuWT",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/S4BDDtyO2bCyCvwUqfaPlyVCjcuNIg4klJb07PUaFdC5m4YR6ACHjr67JBQ4u3ta.l_p1ZOVJstMzh5Wm",
      },
    ],
  },
  {
    id: "2820-hw3",
    title: "HW 3: Storage Wars",
    type: "homework",
    date: schedule.getSpecificDate(2026, 3, 13, "2820-hw3"),
    availableDate: schedule.getSpecificDate(2026, 2, 20, "2820-hw3-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework we practice tuples, sets, their operations, and even a little more in the programming portion...",
    courseId: "cmsi-2820",
    standard: "Collections",
    contentUrl: "/cmsi-2820/hw3",
    hwTopics: ["Collections", "Abstract Algebra", "Relations", "Operations"],
    hwPoints: { written: 20, programming: 80, optional: 20 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "2820-ln12",
    title: "LN 12: This Lamb Don't Baa",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln12"),
    description:
      "In this lecture we introduce the lambda calculus, a system that is used to define functions in a formal way. We will cover the syntax, the rules, and the reductions that can be made to simplify functions.",
    courseId: "cmsi-2820",
    standard: "Functions",
    contentUrl: "/cmsi-2820/ln12",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/2-LIWvNpdk5v4Fx12g5RbUWyC42f2mZWYjVAyUrpJkp5wrBJvwqeCZNY_t6bz5jN.GZDnU6XdxH7wk50S",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/4b_pdY7mS5U9EN_krOvusBTFe2ofZt5u_41PBfVr7pmfF8ciFFNpnfGNTv8kbkg4.AOXcuNPBbxtSDCes",
      },
    ],
  },
  {
    id: "2820-ln13",
    title: "LN 13: Free Range Variables",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln13"),
    description:
      "In this lecture we continue our work with Lambdas by investigating how variables interact with functions. We discover being bound and free, how to substitute variables, and how to reduce functions formally using proper substitution.",
    courseId: "cmsi-2820",
    standard: "Functions",
    contentUrl: "/cmsi-2820/ln13",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/drWYcEtyEQQ1egPoy-cyxmVrMr9lKf6E4rTG0jLtfikJu8FJJ8Z69H_FteeZg09m._5l6Z5YAQmGjU131",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/C7oyRK8CO8yVJbz2Q34hBI41ENOuQIvdkFpcIGF76K3lTUxCnM-hP5dQlXlDrcZ6.oDTYaM4ODOYmHkXy",
      },
    ],
  },
  {
    id: "2820-ln14",
    title: "LN 14: Supplying and Consuming Lambdas",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln14"),
    description:
      "In this lecture we start by recapping proper substitution and then officially define the formal alpha, beta, and gamma conversion rules. After we go over some nomenclature for functions and how to identify suppliers, consumers, and the like.",
    courseId: "cmsi-2820",
    standard: "Functions",
    contentUrl: "/cmsi-2820/ln14",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/hi13d34BW1RjU67HNXfY8q-wVd9-vgr1Vwn2gHAW7H0knMeC9xxZh2dhSUs5X8oa.lGfBIvGvpb5O9nIc",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/IWbl4i3meT8kQ0qNIsWmUqubDC9btr0dD5oPH09VtcmwXuBUC--QSKRcRodoZXM.of_tddulAtDJeTTz",
      },
    ],
  },
  {
    id: "2820-ln15",
    title: "LN 15: In the Domain of Sheep",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln15"),
    description:
      "In this lecture we investigate the patterns that can be found in a lambdas inputs and outputs. We cover domain, codomain, image, pre-image and how an investigation into them gives us three function classes: Injective, Surjective, and Bijective",
    courseId: "cmsi-2820",
    standard: "Functions",
    contentUrl: "/cmsi-2820/ln15",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/fDtSCZFBvPiv5jGudSD5GiPtqcex-9-QD6ALLg7p4hBiS07EvkGD6ColRm8A79B5.EvrqVXEO7jxgpBlV",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/6BfTlhf5Ow8bpsz8LCMal6aePJkNcokdTDnQ_gpPrKCgweNBzWUEqFRmHx_sbzDg.vQbcMIKDK3pG3QpG",
      },
    ],
  },
  {
    id: "2820-hw4",
    title: "HW 4: Silence of the Lambdas",
    type: "homework",
    date: schedule.getSpecificDate(2026, 3, 27, "2820-hw4"),
    availableDate: schedule.getSpecificDate(2026, 3, 13, "2820-hw4-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework we practice lambdas, their reductions, their properties, and their creation!",
    courseId: "cmsi-2820",
    standard: "Functions",
    contentUrl: "/cmsi-2820/hw4",
    hwTopics: [
      "Lambda Calculus",
      "Reductions",
      "Free and Bound Variables",
      "Function Classes",
      "Function Properties",
    ],
    hwPoints: { written: 100, optional: 20 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "2820-ex1-release",
    title: "EX 1 Release",
    type: "exam",
    date: schedule.getSpecificDate(2026, 3, 22, "2820-ex1-release", true),
    description: "Exam released and available for completion.",
    courseId: "cmsi-2820",
    standard: "Logic",
    //contentUrl: "/cmsi-2820/ex1",
  },
  {
    id: "2820-ex1",
    title: "EX 1: Logic Exam",
    type: "exam",
    date: schedule.getSpecificDate(2026, 3, 28, "2820-ex1", true),
    availableDate: schedule.getSpecificDate(
      2026,
      3,
      22,
      "2820-ex1-available",
      true
    ),
    pinned: true,
    dueTime: "11:59 PM",
    description:
      "Optional midterm exam covering Standard 1: Logic. 5 questions, 10 points, 30-minute timer.",
    courseId: "cmsi-2820",
    standard: "Logic",
    contentUrl: "/cmsi-2820/ex1",
    exTopics: [
      "Logical Connectives",
      "Propositional Logic",
      "Intuitionistic Logic",
      "Natural Deduction",
    ],
    exTotalPoints: 10,
    exTotalQuestions: 5,
    exHasTimer: true,
    exAllowedAttempts: "1",
    exExamUrl: "",
  },
  {
    id: "2820-ex2",
    title: "EX 2: Numbers Exam",
    type: "exam",
    date: schedule.getSpecificDate(2026, 3, 28, "2820-ex2", true),
    availableDate: schedule.getSpecificDate(
      2026,
      3,
      22,
      "2820-ex2-available",
      true
    ),
    pinned: true,
    dueTime: "11:59 PM",
    description:
      "Optional midterm exam covering Standard 2: Numbers. 5 questions, 10 points, 30-minute timer.",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "/cmsi-2820/ex2",
    exTopics: [
      "Constructive Proofs",
      "Abstract Algebra",
      "Integers",
      "Booleans",
      "Arithmetic Evaluation",
    ],
    exTotalPoints: 10,
    exTotalQuestions: 5,
    exHasTimer: true,
    exAllowedAttempts: "1",
    exExamUrl: "",
  },
  {
    id: "2820-ex3",
    title: "EX 3: Collections Exam",
    type: "exam",
    date: schedule.getSpecificDate(2026, 3, 28, "2820-ex3", true),
    availableDate: schedule.getSpecificDate(
      2026,
      3,
      22,
      "2820-ex3-available",
      true
    ),
    pinned: true,
    dueTime: "11:59 PM",
    description:
      "Optional midterm exam covering Standard 3: Collections. 5 questions, 10 points, 30-minute timer.",
    courseId: "cmsi-2820",
    standard: "Collections",
    contentUrl: "/cmsi-2820/ex3",
    exTopics: ["Tuples", "Sets", "Collection Operations", "Logical Quantification"],
    exTotalPoints: 10,
    exTotalQuestions: 5,
    exHasTimer: true,
    exAllowedAttempts: "1",
    exExamUrl: "",
  },
  {
    id: "2820-ln16",
    title: "LN 16: Laws and Orders",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln16"),
    description:
      "In this lecture we will introduce a more formal manner of counting, define disjoint-ness, the rule of sums and products, and practice some combinatorics problems!",
    courseId: "cmsi-2820",
    standard: "Combinatorics",
    contentUrl: "/cmsi-2820/ln16",
    recordings: [
      {
        name: "Replacement Lecture Video",
        url: "https://lmula.zoom.us/rec/share/jdnNvgZGDdVwOjhDXlOX-JfAPsMX6vbjNMs_WPj-U6PtDiDKkkExqwYQ1meQf8bL.cGmayObRRgyizkLD",
      },
    ],
  },
  {
    id: "2820-ln17",
    title: "LN 17: Factorialing in Evidence",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln17"),
    description:
      "In this lecture we will investigate factorials, permutations, and combinations with and without repeats allowed!",
    courseId: "cmsi-2820",
    standard: "Combinatorics",
    contentUrl: "/cmsi-2820/ln17",
    recordings: [
      {
        name: "Replacement Lecture Video",
        url: "https://lmula.zoom.us/rec/share/uRE2ThHCvKqXrIal6EyORVpxJFLDXkGPwryVnp0DeT1O4nNsOzK8LIdao-bIvFXP.BRIugwWqnqcK0nsd",
      },
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/aOikiaWWVtur7SJn3ukwRQunuu2qlVGNAxTHVfd_jx1ySsHOmqjm6Q--GQAnhb7O.hYwgelN7QKAc0_a9",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/ief1PzW2e8xpmszSPWg_e0SbqGU8SPeFMDOwEOQZGlpp9y9Y4Gg-g5R0YdyAzz5W.OhM8sCCQj3TzvMdS",
      },
    ],
  },
  {
    id: "2820-ln18",
    title: "LN 18: Double Jeopardy",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln18"),
    description:
      "In this lecture we investigate Pascal's triangle and many of its hidden properties and patterns. We develop our understanding of combinations using Pascal's Triangle to explore a new proof technique called Double Counting.",
    courseId: "cmsi-2820",
    standard: "Combinatorics",
    contentUrl: "/cmsi-2820/ln18",
    recordings: [
      {
        name: "Replacement Lecture Video",
        url: "https://lmula.zoom.us/rec/share/IrXOLyp3O_Cph9G1sn6Gy3K5pdTOU9g9gNi_C-hbCsJ_GqTcdXx9BeOzjZrgdINa.H1Bji-3bjcRrcR8U?startTime=1744145227000",
      },
    ],
  },
  {
    id: "2820-ln19",
    title: "LN 19: Bijection Your Honor!",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln19"),
    description:
      "In this lecture we learn how to leverage bijective functions to solve an interesting class of combinatorics problems and introduce the pigeonhole principle.",
    courseId: "cmsi-2820",
    standard: "Combinatorics",
    contentUrl: "/cmsi-2820/ln19",
    recordings: [
      {
        name: "Replacement Lecture Video",
        url: "https://lmula.zoom.us/rec/share/Hp-EqnnsI7Flfq9DO3ttOPuTEwo64OPFj4lx2JUQWUGXxnUJVVpthY15K_lL_wa7.pLtaZ9omjL82ZRet",
      },
    ],
  },
  {
    id: "2820-hw5",
    title: "HW 5: Order in the Court!",
    type: "homework",
    date: schedule.getSpecificDate(2026, 4, 17, "2820-hw5"),
    availableDate: schedule.getSpecificDate(2026, 3, 27, "2820-hw5-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework we investigate counting, combinations, permutations, and the many tools and intuitions that can be pulled from them!",
    courseId: "cmsi-2820",
    standard: "Combinatorics",
    contentUrl: "/cmsi-2820/hw5",
    hwTopics: [
      "Rule of Sums and Products",
      "Inclusion-Exclusion Principle",
      "Permutations",
      "Combinations",
      "Double Counting",
      "Bijective Proof",
      "Pigeonhole Principle",
    ],
    hwPoints: { written: 80, programming: 20, optional: 20 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "2820-ln20",
    title: "LN 20: Going for a Walk",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln20"),
    description:
      "In this lecture we follow in the footsteps of Euler and complete the Seven Bridges of Konigsberg problem to introduce graphs formally.",
    courseId: "cmsi-2820",
    standard: "Graph Theory",
    contentUrl: "/cmsi-2820/ln20",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/yS52nBNF811ET7QsScfoYaw04TJpp7tAHqWqqllpwN4AlETxzAvyHv1on2xcQGsH.uE-dvcz2AIEjHFa0",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/TqfYcgkOMCJepyTbG6xxzWlB2loXMIjDl2Q1wyxqiHoQkmBj52HRTHSBRwVaJfL-.eHPHtFXKQZkodFAT",
      },
    ],
  },
  {
    id: "2820-ln21",
    title: "LN 21: Connecting with Nature",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln21"),
    description:
      "In this lecture we investigate how the alterations to the formal graph definition propagate to change our visuals. We take a look at isomorphisms, connectedness, and the handshaking Lemma.",
    courseId: "cmsi-2820",
    standard: "Graph Theory",
    contentUrl: "/cmsi-2820/ln21",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/bXaSl3vXmnj_6mRqwRZaUE8DbVK6pP2eR_dkFAzMaoqKQ6IWyDWQO9x3IRWcK8k1.vrHzaiy8ZQ4pZBFi",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/tGWZySUBivCGQ09X9LjqEDAUMhQ9AwPRxEDpmAcoAfvgbZr8jlg3_8hDQk1-X81V.UM2tMSVrhA8U5Kyu",
      },
    ],
  },
  {
    id: "2820-ln22",
    title: "LN 22: Looking Over Edges",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln22"),
    description:
      "In this lecture we take a look at special graphs (Complete, Bipartite, Euler, Hamiltonian) and their special properties. We also take a look at cycles as a useful tool for analyzing graph properties.",
    courseId: "cmsi-2820",
    standard: "Graph Theory",
    contentUrl: "/cmsi-2820/ln22",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/f-Z4lV-b5e7yxB88dhGmL93qtLoB06NPjpPHY7R5gP6mDr2L-tJBZQVMI0Zuzm5-.WoW-bJt1BHt07IWM",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/kN5Z9rUKrZB4tv0rxgx7Gjnb2Ug45_Of-yuwTcDywXQxTP1ZyJcjK0AXqDH-ySWG.Ja2TFiSMtBiY64lw",
      },
    ],
  },
  {
    id: "2820-ln23",
    title: "LN 23: Spanning the Globe",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln23"),
    description:
      "In this lecture we cover a few more special graphs in the form of trees and forests. We then end the graph theory unit by investigating minimum spanning trees and how their solutions and structures represent many real-world problems.",
    courseId: "cmsi-2820",
    standard: "Graph Theory",
    contentUrl: "/cmsi-2820/ln23",
    recordings: [{
      name: "Morning Lecture Video",
      url: "https://lmula.zoom.us/rec/share/jSCGR8zpceMC20WVE_VBdiUtQqeuVLyMC_KEtfBEnMVEto1kJhkVggRTNsZPb_Vt.J9s-lh332GXnTS0E"
    },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/xRct1kJalvAdhSd-QXxVS4D5zUCn4kZ4fqhO5J1OhyHNzqcoTmtT5FDNzz1ARtIo.27_g-Mh-ZUgfRLsG"
      },
    ],
  },
  {
    id: "2820-hw6",
    title: "HW 6: (Warning: Graphic Content)",
    type: "homework",
    date: schedule.getSpecificDate(2026, 5, 1, "2820-hw6", true),
    availableDate: schedule.getSpecificDate(
      2026,
      4,
      17,
      "2820-hw6-available",
      true
    ),
    pinned: true,
    dueTime: "11:59 PM",
    description:
      "In this homework we investigate all things Graph theory! This includes many types of graphs such as complete, bipartite, trees, and forests. We also investigate many of the properties and operations that can be performed such as isomorphisms, connectedness, and cycles.",
    courseId: "cmsi-2820",
    standard: "Graph Theory",
    contentUrl: "/cmsi-2820/hw6",
    hwTopics: ["Graph Theory", "Special Graphs", "Isomorphism", "Graph Operations"],
    hwPoints: { written: 70, programming: 30, optional: 20 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "2820-ln24",
    title: "LN 24: Setting the Record Straight",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln24"),
    description:
      "In this lecture we recap the semester of work to tie up our investigation of Type theory. We then contrast it against Set theory.",
    courseId: "cmsi-2820",
    standard: "Set Theory",
    contentUrl: "/cmsi-2820/ln24",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/l-GqR0KiC6gazJmmzXYfFuDZxnII2O4AuNdBwiqhH2i3oMHthZjLbfswzAac78lF.lAcYrljqUYS3qob7"
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/FxgRdibQQSF62ZB53elkmCpJdkfzOBebMwwq0TbaT2l6ILtwjEdutUMzeFPm7mrD.Pe6GceEI99SrCVVd"
      },
    ],
  },
  {
    id: "2820-ln25",
    title: "LN 25: Arguing the Point",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln25"),
    description:
      "In this lecture we piece together all the proof techniques we learned to summarize argumentation and learn two more: Proof by Contradiction and Proof by Induction.",
    courseId: "cmsi-2820",
    standard: "Set Theory",
    contentUrl: "/cmsi-2820/ln25",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/7qTxu8eRbNFdhmirDqEFw2h9M_llGrmauk7HBvI7Fc7P4MoG0MWrBXYRRNbF8b8r.kNJRpvqeC5K-5t7J"
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/mm95Snfd52As_02SHqACxmBmwgPdngRn4RMhYzVG3SuN_2wQJgZivqvKyIKKcrPs.Hp6Ke6UPRW-ixEDA"
      },
    ],
  },
  {
    id: "2820-ln26",
    title: "LN 26: Pure Discrete Mathematics and Artificial Intelligence",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln26"),
    description:
      "Special lecture on how discrete mathematics concepts apply to artificial intelligence and machine learning.",
    courseId: "cmsi-2820",
    standard: "Extensions",
    contentUrl: "/cmsi-2820/ln26",
  },
  {
    id: "2820-ln27",
    title: "LN 27: Games and Systems Architecture Pipelines",
    type: "lecture",
    date: schedule.getNextRecurringDate("2820-ln27"),
    description:
      "Special lecture on how discrete mathematics is used in game development and systems architecture.",
    courseId: "cmsi-2820",
    standard: "Extensions",
    contentUrl: "/cmsi-2820/ln27",
  },
  {
    id: "2820-ex4-release",
    title: "Final Exam Release",
    type: "exam",
    date: schedule.getSpecificDate(2026, 5, 7, "2820-ex4-release", true),
    description: "Final exam released and available for completion.",
    courseId: "cmsi-2820",
    standard: "Functions, Combinatorics, and Graph Theory",
    //contentUrl: "/cmsi-2820/ex4",
    pinned: true,
  },
  {
    id: "2820-ex4",
    title: "EX 4: FINAL Exam",
    type: "exam",
    date: schedule.getSpecificDate(2026, 5, 13, "2820-ex4", true),
    availableDate: schedule.getSpecificDate(
      2026,
      5,
      7,
      "2820-ex4-available",
      true
    ),
    dueTime: "11:59 PM",
    description:
      "This is the optional final exam that covers the last three standards: Functions, Combinatorics, and Graph Theory.",
    courseId: "cmsi-2820",
    standard: "Final",
    contentUrl: "/cmsi-2820/ex4",
    pinned: true,
    exTopics: [
      "Lambda Calculus",
      "Function Properties",
      "Permutations",
      "Combinations",
      "Graph Operations",
      "Graph Theory",
    ],
    exTotalPoints: 30,
    exTotalQuestions: 15,
    exHasTimer: true,
    exAllowedAttempts: "1 per section",
    exExamUrl: "https://brightspace.lmu.edu/d2l/lms/quizzing/user/quizzes_list.d2l?ou=283545"
  },
]

// Filter events based on cutoff date
export const cmsi2820Events: CourseEvent[] = allEvents.filter(
  (event) => !schedule.shouldFilterEvent(event.date, event.pinned)
)
