import type { CourseEvent } from "../../course-data"
import { createSchedule } from "../schedule-generator"
import { cmsi3510Fall2025Schedule } from "./schedule"

// Create schedule generator with Fall 2025 configuration
const schedule = createSchedule(cmsi3510Fall2025Schedule)

// Generate all course events with schedule-based dates
const allEvents: CourseEvent[] = [
  {
    id: "3510-ln0",
    title: "LN 0: Reading Course Material!",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln0"),
    description:
      "Here is a sample of what the lecture notes will look like! This one just explains the color coding I use for information and displays the small interactive modules I might have throughout the notes.",
    courseId: "cmsi-3510",
    standard: "Syllabus",
    contentUrl: "/cmsi-3510/ln0",
    recordings: [],
  },
  {
    id: "3510-ln1",
    title: "LN 1: Shaking on the Rust",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln1"),
    description:
      "In this lecture, we begin by getting a context for what Syntax and Semantics are in programming languages to appropriately set ourselves up for learning Rust. We then take a 'sneak peak' at the Rust language as is solves the Change Making Problem.",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/ln1",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/4SAbrt2tDKdvgfyT2JM4o2s6zUuUTRFAgdK5M8B5a3-zH4VzJe5WYRhcVWOAFYIu.IrnfAEAivlXg4VLg",
      },
    ],
  },
  {
    id: "3510-hol0",
    title: "Labor Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 9, 1, "3510-hol0", true),
    description: "Happy Labor Day!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-ln2",
    title: "LN 2: Variable Variables",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln2"),
    description:
      "In this lecture, we begin our full investigation of Rust by looking at the syntax and semantics of Variable Declarations. We cover on many topics including memory management, ownership, scope, and mutability. We then turn to VSCode to see examples.",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/ln2",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/kjMnUIcFQVQ7QrMh5UrnymAG0V095yx8-TWOHypDAZdBDLL_S49LlAve2vn2SEZy.I_AsMpWdjIhr2-eO",
      },
    ],
  },
  {
    id: "3510-ln3",
    title: "LN 3: What's in Your Memory?",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln3"),
    description:
      "In this lecture, we take a deeper look at memory handling in rust with the stack and the heap. We also investigate the concept of references and how they are used in Rust's Ownership system to manage memory.",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/ln3",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/vIHJBrCLXM8ebcnX31HA740Zb4qvQVLnKvDBmsBWG3grlpuCrE1VB-1JKpSnorix.LZcOx0vuDeDf4pIA",
      },
    ],
  },
  {
    id: "3510-hw0",
    title: "HW 0: Simple Rust Calculator",
    type: "homework",
    date: schedule.getSpecificDate(2025, 9, 5, "3510-hw0"),
    availableDate: schedule.getSpecificDate(2025, 8, 26, "3510-hw0-available"),
    dueTime: "11:59 PM",
    description:
      "This is a small assignment to get you familiar with the process of receiving and submitting assignments!",
    courseId: "cmsi-3510",
    standard: "Syllabus",
    contentUrl: "/cmsi-3510/hw0",
  },
  {
    id: "3510-ex0",
    title: "EX 0: Syllabus",
    type: "exam",
    date: schedule.getSpecificDate(2025, 9, 6, "3510-ex0"),
    dueTime: "11:59 PM",
    description:
      "Exams are an important part of how you communicate your understanding of the material! Here you will take one on the most vital parts of the course syllabus! I promise its not hard.",
    courseId: "cmsi-3510",
    standard: "Syllabus",
    contentUrl: "/cmsi-3510/ex0",
  },
  {
    id: "3510-ln4",
    title: "LN 4: Functionally Perfect",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln4"),
    description:
      "In this lecture, we see all that functions have to offer in Rust and their unique Ownership management. Everything from associated functions, to closures, and more!",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/ln4",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/A3hNYuklxD_Ta0IXrOACt82YzZKSP_v_DUH7_GQ93mqcVNNCujlsffNezt-kj24K.uSrxcSad1PmCMNCE",
      },
    ],
  },
  {
    id: "3510-ln5",
    title: "LN 5: Optimal Struct Structure",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln5"),
    description:
      "In this lecture we round off our foundational knowledge of Rust itself with structs, traits, and lifetimes. We investigate how they interact with one another to create a memory safe and comprehensive OOP system.",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/ln5",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/OQI117FLojWHMdFLc3XEUH69yrz7lO9EgftO9ZJv7LAEfzHR3DmkXlOblkh-DcY.VfsxXO-aDToMQNUY",
      },
    ],
  },
  {
    id: "3510-ln6",
    title: "LN 6: Hanging by a Thread",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln6"),
    description:
      "In this lecture we begin our investigation of concurrent programming by starting from the beginning with a brief history of computer hardware as it relates to the OS and a large picture of how our hardware makes it all the way down to threads. We then investigate how to create threads in Rust and briefly introduce some of the oddities of Concurrent Programming.",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/ln6",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/JBQr6zj69IcYmYWp_NpT29EQhx88tfJ73vfXLDoaXFnxuYi3fWR-4HsA_wpdn_nz.6LPnDIhOBgc-1tec",
      },
    ],
  },
  {
    id: "3510-ln7",
    title: "LN 7: Out of Order",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln7"),
    description:
      "In this lecture we sharpen our understanding of threads by investigating parallel and concurrent programming theory. By investigating Partitioning, Communication, Synchronization, and Load Balancing we can identify, summarize, and alleviate the many pitfalls of out of order programming.",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/ln7",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/W_7Y5iVD3Z2kfL2UVfJQxl-yjmmKuBu6BdeoG4F_wIXlcj4KRbmNzJ91SP6nbERf._zRYL6DCIN58YWPK",
      },
    ],
  },
  {
    id: "3510-ac1",
    title: "AC 1: Getting Folded",
    type: "activity",
    date: schedule.getNextRecurringDate("3510-ac1"),
    dueTime: "11:59 PM",
    description:
      "In this in class activity, we use Competitive Origami to learn data and task partitioning for parallel programming.",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/ac1",
  },
  {
    id: "3510-ln8",
    title: "LN 8: ICUP, I See You Process",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln8"),
    description:
      "In this lecture we begin our deep dive into computer hardware by breaking down the CPU! We will discover ISAs, Registers, ALUs, and more!",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln8",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/sWThYyA7d8MbHZvqW640TYU8aGx8jAKrl0h3eS29L35Q5lVYB8YADMHQEn1UVnpG.Rfk8oU6Pr0wT1Dcq",
      },
    ],
  },
  {
    id: "3510-ln9",
    title: "LN 9: ...Processing Title...",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln9"),
    description:
      "In this lecture we view the many different, unique yet important perspectives of different portions of the OS and hardware to answer the most important question about our OSs, what is a process?",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln9",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/y3wYT30KNH7CaUhJK8THxLrgFcCnRYl97UJVhQQKm2gyIKNge14VP5HXqsvFvFax.yOgyIChMArVEhygo",
      },
    ],
  },
  {
    id: "3510-ln10",
    title: "LN 10: Out of Context",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln10"),
    description:
      "In this lecture we dive into the intricacies of when and when not to context switch between processes. This problem concerns our users expectations, our processes to complete, and the direct hardware we are using! This is the Scheduling problem!",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln10",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/_VFxLk5A4GO1Kothoojne2xvHh3hr0aSjyi157aIOPevlyJzdpGyDBbvaPXZrz_k.58GVD1XGjQES7mTO",
      },
    ],
  },
  {
    id: "3510-hw1",
    title: "HW 1: Doughmain Expansion",
    type: "homework",
    date: schedule.getSpecificDate(2025, 10, 3, "3510-hw1"),
    availableDate: schedule.getSpecificDate(2025, 9, 4, "3510-hw1-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you are tasked with solidifying your Rust programming skills by taking on a small file system simulator and its incomplete terminal commands! You'll get to practice structs, ownership, and references!",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/hw1",
  },
  {
    id: "3510-ln11",
    title: "LN 11: Scheduling Calls",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln11"),
    description:
      "In this lecture we continue our investigation of scheduling by learning many of the techniques used by Batch, Interactive, and even Real time systems! These include straightforward techniques like using a simple queue (FCFS) all the way to using multi-queue round robin techniques that rely on an internal lottery!",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln11",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/blw8g4gGyc_nywsu6RutPigdGK18tHBBMEu44Zx_GmC7vplKfXofDmecnFUNKV8x.HUZMz4rCW7bwNl1p",
      },
    ],
  },
  {
    id: "3510-ln12",
    title: "LN 12: Don't Starve",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln12"),
    description:
      "In this lecture we spend some time investigating how processes interact with limited resources! Namely, how they interact with them incorrectly to form a new universe of problems referred to as Deadlocking!",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln12",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/T1ITG3-39HbeR-7X62CXlu5bM3vt0T2MiPb3m_CP7M0imBsZMogpBXK1plHJ0UQ7.1vhK88krGH428vX0",
      },
    ],
  },
  {
    id: "3510-hol1",
    title: "Autumn Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 10, 10, "3510-hol1", true),
    description: "Enjoy your Autumn Day!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-ln13",
    title: "LN 13: How I Met Your Memory",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln13"),
    description:
      "In this lecture we investigate different memory hardware technologies, how they are used, their advantages, and their disadvantages to set up a foundation for understanding Processes fit into memory. This includes volatility, speed, size, cost, and more!",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln13",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/sKCR2P-dvKeY334YKsk51ImKRzafg7yCr4JHHwJ7BiEfqC0-SYS5UfhAZEndz8EL.g6ENsZyYvtnnuFDb",
      },
    ],
  },
  {
    id: "3510-ln14",
    title: "LN 14: Continuous Fragmentation",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln14"),
    description:
      "In this lecture we investigate memory allocation! We begin with studying contiguous memory allocation techniques like fixed and dynamic partitioning. We then use these techniques to investigate the problem of fragmentation and setup the foundation for virtual memory!",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln14",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/b8a-Mtt0DpwOXz1gFFOe3lm4Ot3RwjvRx3WWT8LX_mi5hnegYTk-0zYmI6TpSzwd.jN7qvZkP-hpbqHJl",
      },
    ],
  },
  {
    id: "3510-hw2",
    title: "HW 2: Life of Pie",
    type: "homework",
    date: schedule.getSpecificDate(2025, 10, 17, "3510-hw2"),
    availableDate: schedule.getSpecificDate(2025, 9, 18, "3510-hw2-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will get practice with concurrent programming paradigms in the form of making pizza from scratch! Prepare to engage with threads, synchronization primitives, async/await, and more!",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/hw2",
  },
  {
    id: "3510-ac2",
    title: "AC 2: Saved by The Schedule",
    type: "activity",
    date: schedule.getNextRecurringDate("3510-ac2"),
    dueTime: "11:59 PM",
    description:
      "In this in class activity, we use grade school worksheets as a vehicle for learning all about job timing!",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ac2",
  },
  {
    id: "3510-ln15",
    title: "LN 15: Infinite Memory... Sort of",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln15"),
    description:
      "In this lecture we continue looking into memory allocation. We begin with Virtual Memory and how it is used to create the illusion of infinite memory! We then investigate how this illusion is created, and maintained, by a new non-contiguous allocation technique called paging!",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln15",
    recordings: [
      {
        name: "Class Video",
        url: "https://lmula.zoom.us/rec/share/b7LYFJknPXpAvWfnbMN5yktMTiKYA-g2xeMc57mFT5UvnDQWqz4rGUXA1h_U_sn9.TdKdllpBDbnMuIwp",
      },
    ],
  },
  {
    id: "3510-ln16",
    title: "LN 16: Paging Dr. Seg",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln16"),
    description:
      "In this lecture we finish our investigation of memory allocation by covering a comprehensive example of paging and seeing some real world examples of how modern systems must adapt the paging technique to work with current hardware and LAS sizes. Lastly, we finish by briefly covering segmentation and how it is used with paging to create our modern systems.",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln16",
    recordings: [
      {
        name: "Class Video",
        url: "https://lmula.zoom.us/rec/share/ytTcMxNEReEfUF7S-RycWjoOpz6aTFzx20FLhRrLJ6vwZ1v4TUX15K6FiCFIzfT5.VewM1G_22tdztE7z",
      },
    ],
  },
  {
    id: "3510-ln17",
    title: "LN 17: Hindsight's on Port 2020",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln17"),
    description:
      "In this lecture we cover the final topic of this standard, I/O devices! We'll start with a brief history of data transfer standards, cover the major techniques (Block, Character, Network, etc), upgrade our visual model of the hardware, and finish by laying the foundation for the use of direct memory access (DMA) in modern systems!",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln17",
    recordings: [
      {
        name: "Class Video",
        url: "https://lmula.zoom.us/rec/share/VCXLqT5j7Uu2AnqpdzFFAMChp9_hvDFAoLwoUAUTzLdzevk9lqVnU_q-xyGcSIkV.RsCHfe34PHsvCuU4",
      },
    ],
  },
  {
    id: "3510-ln18",
    title: "LN 18: IOU",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln18"),
    description:
      "In this lecture we cover the software fundamentals of developing I/O systems. We cover the critical software principles we follow, the approaches used to make those ideals real, and then the implementation of those principals on modern systems. We cover device independence, buffering, spooling, and more.",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln18",
    recordings: [
      {
        name: "Lecture Video",
        url: "https://lmula.zoom.us/rec/share/16t0RtM5rJLTQ00kvgG2pbY6pvS-pU9YmWk5Y1WNKUPagqORf7Rxk2qA82A3yssg.RWthfGVf-Dqkj0Wo",
      },
    ],
  },
  {
    id: "3510-ln19",
    title: "LN 19: Advanced Topics",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln19"),
    description:
      "Exploring advanced operating systems topics and modern system architectures.",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln19",
    recordings: [],
  },
  {
    id: "3510-ln20",
    title: "LN 20: Systems Integration",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln20"),
    description:
      "Understanding how all the hardware components work together in modern operating systems.",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln20",
    recordings: [],
  },
  {
    id: "3510-ln21",
    title: "LN 21: Performance Optimization",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln21"),
    description:
      "Techniques for optimizing operating system performance and resource utilization.",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln21",
    recordings: [],
  },
  {
    id: "3510-ln22",
    title: "LN 22: System Design Patterns",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln22"),
    description:
      "Common design patterns in operating systems and their applications.",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln22",
    recordings: [],
  },
  {
    id: "3510-ln23",
    title: "LN 23: Case Studies",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln23"),
    description:
      "Real-world case studies of operating system implementations and architectures.",
    courseId: "cmsi-3510",
    standard: "Computer Hardware",
    contentUrl: "/cmsi-3510/ln23",
    recordings: [],
  },
  {
    id: "3510-hol2",
    title: "Thanksgiving Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 11, 25, "3510-hol2", true),
    description:
      "Normally there would be class on this day, but enjoy the day off in thanks for Thanksgiving!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol3",
    title: "Thanksgiving Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 11, 26, "3510-hol3", true),
    description: "Enjoy your Thanksgiving break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol4",
    title: "Thanksgiving Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 11, 27, "3510-hol4", true),
    description: "Enjoy your Thanksgiving break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol5",
    title: "Thanksgiving Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2025, 11, 28, "3510-hol5", true),
    description: "Enjoy your Thanksgiving break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-ln24",
    title: "LN 24: Course Review",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln24"),
    description:
      "Comprehensive review of concurrent programming and computer hardware topics covered throughout the semester.",
    courseId: "cmsi-3510",
    standard: "Review",
    contentUrl: "/cmsi-3510/ln24",
    recordings: [],
  },
  {
    id: "3510-ac3",
    title: "AC 3: Final Activity",
    type: "activity",
    date: schedule.getNextRecurringDate("3510-ac3"),
    dueTime: "11:59 PM",
    description:
      "Comprehensive hands-on activity synthesizing all course concepts.",
    courseId: "cmsi-3510",
    standard: "Review",
    contentUrl: "/cmsi-3510/ac3",
  },
  {
    id: "3510-final-release",
    title: "Final Exam Release",
    type: "exam",
    date: schedule.getSpecificDate(2025, 12, 8, "3510-final-release", true),
    description: "Final exam released and available for completion.",
    courseId: "cmsi-3510",
    standard: "Final",
    contentUrl: "/cmsi-3510/final",
    pinned: true,
  },
  {
    id: "3510-final",
    title: "Final Exam Due",
    type: "exam",
    date: schedule.getSpecificDate(2025, 12, 12, "3510-final", true),
    dueTime: "11:59 PM",
    description:
      "Comprehensive final exam covering all course material. Good luck!",
    courseId: "cmsi-3510",
    standard: "Final",
    contentUrl: "/cmsi-3510/final",
    pinned: true,
  },
]

// Filter events based on cutoff date
export const cmsi3510Events: CourseEvent[] = allEvents.filter(
  (event) => !schedule.shouldFilterEvent(event.date, event.pinned)
)
