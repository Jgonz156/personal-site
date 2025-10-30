import type { CourseEvent } from "../../course-data"
import { createSchedule } from "../schedule-generator"
import { cmsi2820Fall2025Schedule } from "./schedule"

// Create schedule generator with Fall 2025 configuration
const schedule = createSchedule(cmsi2820Fall2025Schedule)

// Generate all course events with schedule-based dates
const allEvents: CourseEvent[] = [
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
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/3iEbR7PiI_dBr3oDvLGwqYmSA0qGqs_9kocP4XGCWv5SxRJnvRHelkyE4igMzfiq.nIdDB2ZvC91Qvqro",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/9qmFdR3h-5cFv4MjIwiZKEc2m0fJmMeCkdby0Uu-ZEIVtAXdWL1o3K0MaQuNqZgk.1kF7BKtlrqS0rQ6p",
      },
    ],
  },
  {
    id: "2820-hw0",
    title: "HW 0: Practicing Homework",
    type: "homework",
    date: schedule.getSpecificDate(2025, 9, 5, "2820-hw0"),
    availableDate: schedule.getSpecificDate(2025, 8, 26, "2820-hw0-available"),
    dueTime: "11:59 PM",
    description:
      "This is a small assignment to help you get familiar with the process of receiving and submitting assignments!",
    courseId: "cmsi-2820",
    standard: "Syllabus",
    contentUrl: "/cmsi-2820/hw0",
  },
  {
    id: "2820-ex0",
    title: "EX 0: Syllabus Exam",
    type: "exam",
    date: schedule.getSpecificDate(2025, 9, 6, "2820-ex0"),
    dueTime: "11:59 PM",
    description:
      "Exams are an important part of how you communicate your understanding of the material! Here you will take one on the most vital parts of the course syllabus! I promise its not hard.",
    courseId: "cmsi-2820",
    standard: "Syllabus",
    contentUrl: "/cmsi-2820/ex0",
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
    contentUrl: "/cmsi-2820/ln1",
    recordings: [
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/la1mVbpnFfHVRdVJe_vdt_WHC-LDcuIF4ivMezQHrBq6W-MSLYHbMlDHwSn1fIlr.VSrqNa_WtWEt1VI8",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/Us5GGUeYdLSG5WDWjtft6SEZNtD5MkjHSUQpDXcDddv838vIgFSxT7kv0SF4efva.-AdnoFRwX86rah5s",
      },
    ],
  },
  {
    id: "2820-hol0",
    title: "Labor Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 9, 1, "2820-hol0", true),
    description: "Happy Labor Day!",
    courseId: "cmsi-2820",
    pinned: true,
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
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/5ACLmSUYpzWpazd-ZQ4RqJfYuqh0_sf8DPfsLQMeUD_UfwRIFyEQ14Xt0K1v2tH3.xROcwPRCEZ8r4pMy",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/creQEn57bmIyHHDjGKuddsuQCcLlWZ8iGfx6x8yjXZcwhB55_fSBtCiPQ7HDi2b2.fdx39azQk01i5Mke",
      },
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
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/oxiLgZxaAisLZyMTGM6xTv4-94B3EFDjMq5EVFZmyw1vJrcdS673xSf-uyKKZBFJ.rXdaBSVWCIl1rPsT",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/LV_VKhAAQjlzb6bFjxJXz2Vz6ttU-2kNJRdrIvsysGYleweYPu4fo5MmFqNpXxJq.mxszqiD1yaT8KECa",
      },
    ],
  },
  {
    id: "2820-hw1",
    title: "HW 1: Think Class! Think!",
    type: "homework",
    date: schedule.getSpecificDate(2025, 9, 19, "2820-hw1"),
    availableDate: schedule.getSpecificDate(2025, 9, 4, "2820-hw1-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will get practice with logical terminology, evaluating propositions in finite contexts, creating propositional and predicate logic statements, translating natural language into logic, and natural deduction proofs!",
    courseId: "cmsi-2820",
    standard: "Logic",
    contentUrl: "/cmsi-2820/hw1",
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
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/Lb_LZ6WOZs0MeuUwCf3A2e5KF_wWmbRbroBfHzOGlq24qXRW20mUK1cHQhOAF9fR.eq0ZcPNFLnjraHsI",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/QVGQu1SAebQejVLFWSnpIx6O3QQhlw19knqVimXvHLh81fICquV7ZYTooKdf341J.s0AYbvthUbK33CB-",
      },
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
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/rtu2cddWBUsCvvN5ql0XY9wlIgwWckxumi3wvjv1bETt9I-AEeTt_v-tHavCq_Jj.GJpvl1qwfq7kdk1W",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/e9EbKJF21fd8PfnyR4uJolVh4MSga_zbFwcIk6atPhAb3fIalkw5Ey25G9V0MbJl.np-_-OvGtieC8mhs",
      },
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
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/EOGh2fRn4DqTeVaDBjf_a5gDckGumvDOUDNnw-dCSq4io_la_2zH_Ht-k4rHClQ8.Uf5ihc5X5EKLwa1P",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/h9nvLsxLLjsimH3GVHydgT7P2ogHm4rasBnTMLUbo0RhH-qSZ5-64JpGJlX6i8Bw.741pQDhxkpElX9lO",
      },
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
      {
        name: "Morning Lecture Video",
        url: "https://lmula.zoom.us/rec/share/WuP8OV8CPZ6rl0sWZGfj7Cld1pv9m32sbwb0H_g6L1XCqDOaenAyvvDgkCB8iJV-.H6jC25aM85O4F9Z0",
      },
      {
        name: "Night Lecture Video",
        url: "https://lmula.zoom.us/rec/share/ElRucWr1E9XN-gKUKj3HIf0ZCMyk5CGt1ax8mfEapf1XS198HeNUxoy5dQlIqWt9.ddUMoiyR49zSo3Rl",
      },
    ],
  },
  {
    id: "2820-hw2",
    title: "HW 2: Counting Sheep",
    type: "homework",
    date: schedule.getSpecificDate(2025, 10, 3, "2820-hw2"),
    availableDate: schedule.getSpecificDate(2025, 9, 18, "2820-hw2-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will get practice with the many topics covered in the notes for this standard. This includes the Booleans, the Integers, and the many operations that can be performed on them!",
    courseId: "cmsi-2820",
    standard: "Numbers",
    contentUrl: "/cmsi-2820/hw2",
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
    date: schedule.getSpecificDate(2025, 10, 17, "2820-hw3"),
    availableDate: schedule.getSpecificDate(2025, 10, 2, "2820-hw3-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework we practice tuples, sets, their operations, and even a little more in the programming portion...",
    courseId: "cmsi-2820",
    standard: "Collections",
    contentUrl: "/cmsi-2820/hw3",
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
    id: "2820-hol1",
    title: "Autumn Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 10, 10, "2820-hol1", true),
    description: "Enjoy your Autumn Day!",
    courseId: "cmsi-2820",
    pinned: true,
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
    date: schedule.getSpecificDate(2025, 10, 31, "2820-hw4"),
    availableDate: schedule.getSpecificDate(2025, 10, 16, "2820-hw4-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework we practice lambdas, their reductions, their properties, and their creation!",
    courseId: "cmsi-2820",
    standard: "Functions",
    contentUrl: "/cmsi-2820/hw4",
  },
  {
    id: "2820-ex1",
    title: "EX 1: Logic Exam",
    type: "exam",
    date: schedule.getSpecificDate(2025, 10, 18, "2820-ex1", true),
    availableDate: schedule.getSpecificDate(
      2025,
      10,
      13,
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
  },
  {
    id: "2820-ex2",
    title: "EX 2: Numbers Exam",
    type: "exam",
    date: schedule.getSpecificDate(2025, 10, 18, "2820-ex2", true),
    availableDate: schedule.getSpecificDate(
      2025,
      10,
      13,
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
  },
  {
    id: "2820-ex3",
    title: "EX 3: Collections Exam",
    type: "exam",
    date: schedule.getSpecificDate(2025, 10, 18, "2820-ex3", true),
    availableDate: schedule.getSpecificDate(
      2025,
      10,
      13,
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
    recordings: [],
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
    recordings: [],
  },
  {
    id: "2820-hw5",
    title: "HW 5: Order in the Court!",
    type: "homework",
    date: schedule.getSpecificDate(2025, 11, 14, "2820-hw5"),
    availableDate: schedule.getSpecificDate(2025, 10, 30, "2820-hw5-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework we investigate counting, combinations, permutations, and the many tools and intuitions that can be pulled from them!",
    courseId: "cmsi-2820",
    standard: "Combinatorics",
    contentUrl: "/cmsi-2820/hw5",
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
    recordings: [],
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
    recordings: [],
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
    recordings: [],
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
    recordings: [],
  },
  {
    id: "2820-hw6",
    title: "HW 6: (Warning: Graphic Content)",
    type: "homework",
    date: schedule.getSpecificDate(2025, 12, 12, "2820-hw6", true),
    availableDate: schedule.getSpecificDate(
      2025,
      11,
      27,
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
    recordings: [],
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
    recordings: [],
  },
  {
    id: "2820-hol2",
    title: "Thanksgiving Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 11, 25, "2820-hol2", true),
    description:
      "Normally there would be class on this day, but I'm giving it back to you all in thanks for Thanksgiving!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol3",
    title: "Thanksgiving Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 11, 26, "2820-hol3", true),
    description: "Enjoy your Thanksgiving break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol4",
    title: "Thanksgiving Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 11, 27, "2820-hol4", true),
    description: "Enjoy your Thanksgiving break!",
    courseId: "cmsi-2820",
    pinned: true,
  },
  {
    id: "2820-hol5",
    title: "Thanksgiving Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 11, 28, "2820-hol5", true),
    description: "Enjoy your Thanksgiving break!",
    courseId: "cmsi-2820",
    pinned: true,
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
    id: "2820-ex4",
    title: "EX 4: FINAL Exam",
    type: "exam",
    date: schedule.getSpecificDate(2025, 12, 13, "2820-ex4", true),
    dueTime: "11:59 PM",
    description:
      "This is the optional final exam that covers the last three standards: Functions, Combinatorics, and Graph Theory.",
    courseId: "cmsi-2820",
    standard: "Final",
    contentUrl: "/cmsi-2820/ex4",
    pinned: true,
  },
]

// Filter events based on cutoff date
export const cmsi2820Events: CourseEvent[] = allEvents.filter(
  (event) => !schedule.shouldFilterEvent(event.date, event.pinned)
)
