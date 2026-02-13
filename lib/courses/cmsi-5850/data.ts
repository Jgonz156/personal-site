import type { CourseEvent } from "../../course-data"
import { createSchedule } from "../schedule-generator"
import { cmsi5850Schedule } from "./schedule"

// Create schedule generator (template for future use)
const schedule = createSchedule(cmsi5850Schedule)

// Template for course events - populate when course is taught
const allEvents: CourseEvent[] = [
  {
    id: "5850-hol0",
    title: "Martin Luther King Jr. Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 1, 19, "5850-hol0", true),
    description: "Happy Martin Luther King Jr. Day!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol1",
    title: "Ceasar Chavez Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 31, "5850-hol1", true),
    description: "Enjoy your Ceasar Chavez Day!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol3",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 2, "5850-hol3", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol4",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 3, "5850-hol4", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol5",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 4, "5850-hol5", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol6",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 5, "5850-hol6", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol7",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 6, "5850-hol7", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol8",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 4, 1, "5850-hol8", true),
    description: "Enjoy your Easter break!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol9",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 4, 2, "5850-hol9", true),
    description: "Enjoy your Easter break!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol10",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 4, 3, "5850-hol10", true),
    description: "Enjoy your Easter break!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-hol11",
    title: "Reading Day",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 5, 6, "5850-hol11", true),
    description: "Enjoy your Reading Day!",
    courseId: "cmsi-5850",
    pinned: true,
  },
  {
    id: "5850-ln0",
    title: "LN 0: Reading Course Material!",
    type: "lecture",
    date: schedule.getSpecificDate(2026, 1, 15, "5850-ln0", true),
    description:
      "Here is a sample of what the lecture notes will look like! This one just explains the color coding I use for information and displays the small interactive modules I might have throughout the notes.",
    courseId: "cmsi-5850",
    standard: "Syllabus",
    contentUrl: "/cmsi-5850/ln0",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/akkA1PiPJ6ZyQoy1EAVUG01gbVZuQ6Pog-_hSnRYnNJ79_-zClBXn8wbwmlM4mH5.FgAgK2axx8tXFYmd"
      }
    ],
    pinned: true,
  },
  {
    id: "5850-ln1",
    title: "LN 1: The Study of Programming Languages",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln1"),
    description:
      "In this lecture, we begin by exploring what its like to study programming languages as a field and how it has evolved over time.",
    courseId: "cmsi-5850",
    standard: "Mathematical Foundations",
    lnTopics: [
      "History",
      "Theoretical Foundations",
      "Pragmatics",
    ],
    contentUrl: "/cmsi-5850/ln1",
    recordings: [
      {
        name: "Class Recording (Same as LN 0)",
        url: "https://lmula.zoom.us/rec/share/akkA1PiPJ6ZyQoy1EAVUG01gbVZuQ6Pog-_hSnRYnNJ79_-zClBXn8wbwmlM4mH5.FgAgK2axx8tXFYmd"
      }
    ],
  },
  {
    id: "5850-hw0",
    title: "HW 0: Practicing Homework",
    type: "homework",
    date: schedule.getSpecificDate(2026, 1, 30, "5850-hw0"),
    availableDate: schedule.getSpecificDate(2026, 1, 11, "5850-hw0-available"),
    dueTime: "11:59 PM",
    description:
      "This is a small assignment to get you familiar with the process of receiving and submitting assignments!",
    courseId: "cmsi-5850",
    standard: "Syllabus",
    contentUrl: "/cmsi-5850/hw0",
    hwTopics: [
      "There are no particular topics for this HW",
      "However if there were multiple topics",
      "They would show up here",
    ],
    hwPoints: { written: 3, programming: 1, optional: 1 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "5850-ex0-release",
    title: "EX 0 Release",
    type: "exam",
    date: schedule.getSpecificDate(2026, 1, 25, "5850-ex0-release", true),
    description: "Syllabus exam released and available for completion.",
    courseId: "cmsi-5850",
    standard: "Syllabus",
    //contentUrl: "/cmsi-5850/ex0",
  },
  {
    id: "5850-ln2",
    title: "LN 2: Classical Logic and Proofs",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln2"),
    description:
      "In this lecture, we cover the foundations of classical logic and how it can be used to prove statements in mathematics.",
    courseId: "cmsi-5850",
    standard: "Mathematical Foundations",
    lnTopics: ["Classical Logic", "Proofs"],
    contentUrl: "/cmsi-5850/ln2",
    recordings: [
      {
        name: "Class Recording",
        url:"https://lmula.zoom.us/rec/share/NNKNOAikosL01lgb3KNjxoOKbD2wOsKLgmsvxntyoVag1SxnW7F0_PBhx65aFiYv.t_Kr2i8VXJLbUI-C"
      }
    ],
  },
  {
    id: "5850-ex0",
    title: "EX 0: Syllabus",
    type: "exam",
    date: schedule.getSpecificDate(2026, 1, 31, "5850-ex0"),
    dueTime: "11:59 PM",
    description:
      "Exams are an important part of how you communicate your understanding of the material! Here you will take one on the most vital parts of the course syllabus! I promise its not hard.",
    courseId: "cmsi-5850",
    standard: "Syllabus",
    contentUrl: "/cmsi-5850/ex0",
    exAllowedAttempts: "Unlimited",
    exTotalPoints: 2,
    exTotalQuestions: 5,
    exHasTimer: false,
    exExamUrl: "https://brightspace.lmu.edu/d2l/lms/quizzing/user/quiz_summary.d2l?ou=295659&qi=127432&cfql=0",
    exTopics: [
      "Syllabus",
    ]
  },
  {
    id: "5850-ln3",
    title: "LN 3: Set Theory",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln3"),
    description:
      "In this lecture, we cover the foundational mathematics that we need to justify, design, and reason about programming languages.",
    courseId: "cmsi-5850",
    standard: "Mathematical Foundations",
    lnTopics: [
      "Sets",
      "Relations",
      "Operations on Sets",
      "Functions",
    ],
    contentUrl: "/cmsi-5850/ln3",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/Iu--lzs6BOq4imbJogZZ9elivF_qxJNC3oRhEtWQKzjxBOsFS3SahgCZaGU3alht.At5x-KcYMznW0ti3",
      }
    ],
  },
  {
    id: "5850-ln4",
    title: "LN 4: Lambda Calculus",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln4"),
    description:
      "In this lecture, we investigate the Lambda Calculus, a formal system for representing and reasoning about functions.",
    courseId: "cmsi-5850",
    standard: "Mathematical Foundations",
    lnTopics: ["Lambda Calculus", "Reductions", "Free and Bound Variables"],
    contentUrl: "/cmsi-5850/ln4",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/k5DCrVAwzisN3moKSiqVWU4BTTLv-dG4dAmSjaxRiZh2qfBcCLlN6FFHVOp86bH8.clyVIXy4zH0L2iVC"
      }
    ],
  },
  {
    id: "5850-hw1",
    title: "HW 1",
    type: "homework",
    date: schedule.getSpecificDate(2026, 2, 6, "5850-hw1"),
    availableDate: schedule.getSpecificDate(2026, 1, 23, "5850-hw1-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will get practice with describing programming langauges and classical logic!",
    courseId: "cmsi-5850",
    standard: "Mathematical Foundations",
    contentUrl: "/cmsi-5850/hw1",
    hwTopics: [
      "Classical Logic",
      "Programming Languages",
    ],
    hwPoints: { written: 100, programming: 0, optional: 0 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "5850-ln5",
    title: "LN 5: Foundational Theories of Computation",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln5"),
    description:
      "In this lecture, we summarize the four foundational theories of computation: Language Theory, Automata Theory, Computability Theory, and Complexity Theory.",
    courseId: "cmsi-5850",
    standard: "Syntax",
    lnTopics: [
      "Language Theory",
      "Automata Theory",
      "Computability Theory",
      "Complexity Theory",
    ],
    contentUrl: "/cmsi-5850/ln5",
    recordings: [
    ],
  },
  {
    id: "5850-ln6",
    title: "LN 6: Classifying Programming Languages",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln6"),
    description:
      "In this lecture, we classify programming language features and design into different categories such as: Functional, Imperative, Logical, and Object-Oriented.",
    courseId: "cmsi-5850",
    standard: "Syntax",
    lnTopics: [
      "Language Design",
      "Paradigms",
      "Pragmatics",
    ],
    contentUrl: "/cmsi-5850/ln6",
    recordings: [
    ],
  },
  {
    id: "5850-hw2",
    title: "HW 2",
    type: "homework",
    date: schedule.getSpecificDate(2026, 2, 20, "5850-hw2"),
    availableDate: schedule.getSpecificDate(2026, 2, 6, "5850-hw2-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will operationalize Set Theory by building a Relation and Function Analyzer, and bring the Lambda Calculus to life by building a parser and interpreter with both CBN and CBV evaluation — in any language of your choice!",
    courseId: "cmsi-5850",
    standard: "Mathematical Foundations",
    contentUrl: "/cmsi-5850/hw2",
    hwTopics: [
      "Set Theory",
      "Lambda Calculus",
    ],
    hwPoints: { written: 0, programming: 100, optional: 0 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "5850-ln7",
    title: "LN 7: Language Theory",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln7"),
    description:
      "In this lecture, we dive into Language Theory and study its major components: Formal Languages and Grammars.",
    courseId: "cmsi-5850",
    standard: "Syntax",
    lnTopics: ["Formal Languages", "Grammars"],
    contentUrl: "/cmsi-5850/ln7",
    recordings: [
    ],
  },
  {
    id: "5850-ln8",
    title: "LN 8: Syntax",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln8"),
    description:
      "In this lecture, we look at how languages 'look' and how concrete syntax can be abstracted into trees.",
    courseId: "cmsi-5850",
    standard: "Syntax",
    lnTopics: ["CST", "AST"],
    contentUrl: "/cmsi-5850/ln8",
    recordings: [
    ],
  },
  {
    id: "5850-hw3",
    title: "HW 3",
    type: "homework",
    date: schedule.getSpecificDate(2026, 3, 13, "5850-hw3"),
    availableDate: schedule.getSpecificDate(2026, 2, 20, "5850-hw3-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will practice reasoning about the four foundational theories of computation and how they relate to the classification of programming languages!",
    courseId: "cmsi-5850",
    standard: "Syntax",
    contentUrl: "/cmsi-5850/hw3",
    hwTopics: [
      "Language Theory",
      "Automata Theory",
      "Computability Theory",
      "Complexity Theory",
    ],
    hwPoints: { written: 100, programming: 0, optional: 0 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "5850-ln9",
    title: "LN 9: Parsing",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln9"),
    description:
      "In this lecture, we look at how we can operationalize the reading of languages and how to do so efficiently.",
    courseId: "cmsi-5850",
    standard: "Syntax",
    lnTopics: [
      "Recursive Descent Parsing",
      "Analytic Grammars",
      "Ohm",
    ],
    contentUrl: "/cmsi-5850/ln9",
    recordings: [
    ],
  },
  {
    id: "5850-ln10",
    title: "LN 10: Semantics",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln10"),
    description:
      "In this lecture, we explore how to take our well-defined syntax and give it meaning.",
    courseId: "cmsi-5850",
    standard: "Semantics",
    lnTopics: [
      "Operational Semantics",
      "Denotational Semantics",
      "Small-Step Semantics",
      "Big-Step Semantics",
    ],
    contentUrl: "/cmsi-5850/ln10",
    recordings: [
    ],
  },
  {
    id: "5850-hw4",
    title: "HW 4",
    type: "homework",
    date: schedule.getSpecificDate(2026, 3, 27, "5850-hw4"),
    availableDate: schedule.getSpecificDate(2026, 3, 13, "5850-hw4-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will operationalize our syntax and create a parser for a simple language in JavaScript!",
    courseId: "cmsi-5850",
    standard: "Syntax",
    contentUrl: "/cmsi-5850/hw4",
    hwTopics: [
      "Syntax",
      "Parsing",
      "Ohm"
    ],
    hwPoints: { written: 0, programming: 100, optional: 0 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "5850-ln11",
    title: "LN 11: Operational Semantics",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln11"),
    description:
      "In this lecture, we dive into forming our semantics around a hypothetical machine.",
    courseId: "cmsi-5850",
    standard: "Semantics",
    lnTopics: [
      "Operational Semantics",
      "Small-Step Semantics",
      "Big-Step Semantics",
    ],
    contentUrl: "/cmsi-5850/ln11",
    recordings: [
    ],
  },
  {
    id: "5850-ln12",
    title: "LN 12: Denotational Semantics",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln12"),
    description:
      "In this lecture, we dive into forming our semantics around mappings to direct mathematical objects.",
    courseId: "cmsi-5850",
    standard: "Semantics",
    lnTopics: [
      "Denotational Semantics",
      "Domain Theory",
    ],
    contentUrl: "/cmsi-5850/ln12",
    recordings: [
    ],
  },
  {
    id: "5850-hw5",
    title: "HW 5",
    type: "homework",
    date: schedule.getSpecificDate(2026, 4, 17, "5850-hw5"),
    availableDate: schedule.getSpecificDate(2026, 3, 27, "5850-hw5-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you must add interpretation and meaning to the parser we created in HW4!",
    courseId: "cmsi-5850",
    standard: "Mathematical Foundations",
    contentUrl: "/cmsi-5850/hw1",
    hwTopics: [
      "Semantics",
      "Interpretation",
    ],
    hwPoints: { written: 0, programming: 100, optional: 0 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "5850-ln13",
    title: "LN 13: Additional Topics in Semantics",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln13"),
    description:
      "In this lecture, we'll cap off our understanding of formal meaning by looking at a few other methods like Axiomatic, Algebraic, and Action Semantics.",
    courseId: "cmsi-5850",
    standard: "Semantics",
    lnTopics: [
      "Axiomatic Semantics",
      "Algebraic Semantics",
      "Action Semantics",
    ],
    contentUrl: "/cmsi-5850/ln13",
    recordings: [
    ],
  },
  {
    id: "5850-ln14",
    title: "LN 14: Modern Applications",
    type: "lecture",
    date: schedule.getNextRecurringDate("5850-ln14"),
    description:
      "In this lecture, we cover how formal language theory is used in modern applications like compilers, interpreters, and more.",
    courseId: "cmsi-5850",
    standard: "Semantics",
    lnTopics: [
      "Compilers",
      "Interpreters",
      "Type Systems",
      "Logic Programming",
    ],
    contentUrl: "/cmsi-5850/ln14",
    recordings: [
    ],
  },
  {
    id: "5850-hw6",
    title: "HW 6",
    type: "homework",
    date: schedule.getSpecificDate(2026, 5, 1, "5850-hw6"),
    availableDate: schedule.getSpecificDate(2026, 4, 17, "5850-hw6-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will reason about operational and denotational semantics for some small languages!",
    courseId: "cmsi-5850",
    standard: "Mathematical Foundations",
    contentUrl: "/cmsi-5850/hw1",
    hwTopics: [
      "Operational Semantics",
      "Denotational Semantics",
    ],
    hwPoints: { written: 100, programming: 0, optional: 0 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "5850-final-release",
    title: "Final Exam Release",
    type: "exam",
    date: schedule.getSpecificDate(2026, 5, 7, "5850-final-release", true),
    description: "Final exam released and available for completion.",
    courseId: "cmsi-5850",
    standard: "Final",
    //contentUrl: "/cmsi-5850/final",
    pinned: true,
  },
  {
    id: "5850-final",
    title: "Final Exam Due",
    type: "exam",
    date: schedule.getSpecificDate(2026, 5, 13, "5850-final", true),
    dueTime: "11:59 PM",
    description:
      "Comprehensive final exam covering all course material. Good luck!",
    courseId: "cmsi-5850",
    standard: "Final",
    contentUrl: "/cmsi-5850/ex1",
    pinned: true,
    exExamUrl: ""
  },
]

// Filter events based on cutoff date
export const cmsi5850Events: CourseEvent[] = allEvents.filter(
  (event) => !schedule.shouldFilterEvent(event.date, event.pinned)
)
