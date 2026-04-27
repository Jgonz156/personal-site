import type { CourseEvent } from "../../course-data"
import { createSchedule } from "../schedule-generator"
import { cmsi3510Fall2025Schedule } from "./schedule"

// Create schedule generator with Fall 2025 configuration
const schedule = createSchedule(cmsi3510Fall2025Schedule)

// Generate all course events with schedule-based dates
const allEvents: CourseEvent[] = [
  {
    id: "3510-hol0",
    title: "Martin Luther King Jr. Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 1, 19, "3510-hol0", true),
    description: "Happy Martin Luther King Jr. Day!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol1",
    title: "Ceasar Chavez Day!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 31, "3510-hol1", true),
    description: "Enjoy your Ceasar Chavez Day!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol3",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 2, "3510-hol3", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol4",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 3, "3510-hol4", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol5",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 4, "3510-hol5", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol6",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 5, "3510-hol6", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol7",
    title: "Spring Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 6, "3510-hol7", true),
    description: "Enjoy your Spring break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol8",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 4, 1, "3510-hol8", true),
    description: "Enjoy your Easter break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol9",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 4, 2, "3510-hol9", true),
    description: "Enjoy your Easter break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol10",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 4, 3, "3510-hol10", true),
    description: "Enjoy your Easter break!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol11",
    title: "Reading Day",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 5, 6, "3510-hol11", true),
    description: "Enjoy your Reading Day!",
    courseId: "cmsi-3510",
    pinned: true,
  },
  {
    id: "3510-hol12",
    title: "Easter Break!",
    type: "holiday",
    date: schedule.getSpecificDate(2026, 3, 30, "3510-hol12", true),
    description: "Normally there would be class on this day, but I'm giving it back to you all in thanks for Easter!",
    courseId: "cmsi-3510",
    pinned: true,
  },
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
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/kKkc6mBYnD4Vn5GH7-5y84KaMYhAbk-U9recOzgVPkTI1VD9Mb_KtrFZJvt31x_8.oQP3BqR8DvOX0dA3",
      }
    ],
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
    lnTopics: [
      "Syntax",
      "Semantics",
      "Python vs Rust",
      "Change Making Problem",
    ],
    contentUrl: "/cmsi-3510/ln1",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/X-mXVzjR4YmmOP_JtoR-3pgh5AtO5elt2gvbvia1LCxqR4oavYQDI4wCQCW4Jbk9.EaMEh1awbbaPqFGh"
      }
    ],
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
    lnTopics: [
      "Variables",
      "Mutability",
      "Scope",
      "Stack and Heap",
      "Data Types",
    ],
    contentUrl: "/cmsi-3510/ln2",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/qYdrnDSMZMgqhFYhl2LMhg6A7AWY0yKZfWGlRxMJRhWtXZJCAW9KsJJWEu3BLO59.2pUacM1DnZO-wRmL"
      }
    ]
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
    lnTopics: [
      "Memory Management",
      "Ownership",
      "Borrowing",
      "Moves",
    ],
    contentUrl: "/cmsi-3510/ln3",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/Z8bkJ-O_FUOA502wnvOiO8Z6S6bYp1VPgqSupvmYCkKLftFmScg9BmoHvc80yDwx.PyCum_G79_cLg9B3"
      }
    ],
  },
  {
    id: "3510-hw0",
    title: "HW 0: Simple Rust Calculator",
    type: "homework",
    date: schedule.getSpecificDate(2026, 1, 23, "3510-hw0"),
    availableDate: schedule.getSpecificDate(2026, 1, 11, "3510-hw0-available"),
    dueTime: "11:59 PM",
    description:
      "This is a small assignment to get you familiar with the process of receiving and submitting assignments!",
    courseId: "cmsi-3510",
    standard: "Syllabus",
    contentUrl: "/cmsi-3510/hw0",
    hwTopics: [
      "There are no particular topics for this HW",
      "However if there were multiple",
      "They would show up here",
    ],
    hwPoints: { reading: 0, programming: 3, optional: 1 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "3510-ex0-release",
    title: "EX 0 Release",
    type: "exam",
    date: schedule.getSpecificDate(2026, 1, 18, "3510-ex0-release", true),
    description: "Syllabus exam released and available for completion.",
    courseId: "cmsi-3510",
    standard: "Syllabus",
    //contentUrl: "/cmsi-3510/ex0",
  },
  {
    id: "3510-ex0",
    title: "EX 0: Syllabus",
    type: "exam",
    date: schedule.getSpecificDate(2026, 1, 24, "3510-ex0"),
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
    lnTopics: [
      "Functions",
      "Closures",
      "Associated Functions",
      "Higher-Order Functions",
      "Dynamic Dispatch",
    ],
    contentUrl: "/cmsi-3510/ln4",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/8iSCzg95CURyKWdN9Qfw3uMOq7_i0ji7i06znXdLTYv2jKUTYNXf6hATymo54Dc.sdP1fsepHoyIEzvi",
      }
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
    lnTopics: [
      "Structs",
      "Enums",
      "Traits",
      "Standard Library Types",
    ],
    contentUrl: "/cmsi-3510/ln5",
    recordings: [
      {name: "Class Recording", url: "https://lmula.zoom.us/rec/share/Wpn41QXBcS1AJb_ri-EaGb9yBLnYK1xK9I-D1P4eorinK5A3Qx6mE4AHx7z4ginT.QwooTvEDONIXDZLX"}
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
    lnTopics: [
      "OS History",
      "Processes",
      "Threads",
      "Kernel vs User Threads",
      "Rust Threading",
    ],
    contentUrl: "/cmsi-3510/ln6",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/Hvxb_sFZHp3BPvvXBjvUsRqpdyucpW12lrGWWboGX_CBxXnUypA_aIAxZQYQWKuv.T3LeiSTTM2yhzmb1"
      }
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
    lnTopics: [
      "Sequential vs Concurrent vs Parallel",
      "Partitioning",
      "Communication",
      "Synchronization",
      "Load Balancing",
    ],
    contentUrl: "/cmsi-3510/ln7",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/X8ppXszRDrnMortVgerW5l-sxqZ_5sxQMcSc23nvw3cxw5YjcFElTcufiHckOtp2.GJDGKOmXksOnDgVU"
      }
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
    acLearningObjectives: [
      "Understand data parallelism (batching) vs task parallelism (pipelining)",
      "Experience load balancing and coordination challenges in parallel systems",
      "Identify trade-offs between different parallelization strategies",
      "Apply partitioning concepts to concurrent programming",
    ],
    acEstimatedTime: "80 minutes",
    acMaterials: [
      "Printer paper (1-2 reams)",
      "Scissors (enough for half the class)",
      "Origami instructions (Sanbou-box and Tulip)",
      "Timer",
      "Trash cans for failed attempts",
    ],
  },
  {
    id: "3510-ln8",
    title: "LN 8: ICUP, I See You Process",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln8"),
    description:
      "In this lecture we begin our deep dive into computer hardware by breaking down the CPU! We will discover ISAs, Registers, ALUs, and more!",
    courseId: "cmsi-3510",
    standard: "CPU",
    lnTopics: [
      "CPU Architecture",
      "ISAs",
      "Registers",
      "ALU",
      "Privilege Rings",
      "Interrupts",
    ],
    contentUrl: "/cmsi-3510/ln8",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/6HCF3d7FZaeTrFclLMjQ-LDQPc-O7KE6tSg4TzJBD03KTNAMLaPTProycBIyyezo.hhbYV-p-nPUDweY0"
      }
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
    standard: "CPU",
    lnTopics: [
      "Process Control Block",
      "Process Address Space",
      "Process State",
      "Inter-Process Communication",
      "Context Switching",
    ],
    contentUrl: "/cmsi-3510/ln9",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/jDlhy3kixB8J0_Dz-aTtfGdkARbiQuPNZ0kbXUUhA25_m3YeI4SAAehAHLAUKSZq.L3OGAGKkPunXPJf2"
      }
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
    standard: "CPU",
    lnTopics: [
      "The Scheduling Problem",
      "Compute-Bound vs I/O-Bound",
      "Cooperative vs Preemptive",
      "System Types",
    ],
    contentUrl: "/cmsi-3510/ln10",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/AAJ-JNpY34VBUYD4tJl_MjVt4FKH9p9d71CLigmRa0ksqlddqYH2OH36-CNLG_m1.CsHHkuemPgBYP6yo"
      }
    ],
  },
  {
    id: "3510-hw1",
    title: "HW 1: Doughmain Expansion",
    type: "homework",
    date: schedule.getSpecificDate(2026, 2, 13, "3510-hw1"),
    availableDate: schedule.getSpecificDate(2026, 2, 1, "3510-hw1-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you are tasked with solidifying your Rust programming skills by taking on a small file system simulator and its incomplete terminal commands! You'll get to practice structs, ownership, and references!",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/hw1",
    hwTopics: ["Structs", "Ownership", "References"],
    hwPoints: { reading: 0, programming: 30, optional: 20 },
    hwGithubClassroomUrl: "https://classroom.github.com/a/qN_FYjrX",
    hwBrightspaceUrl: "https://brightspace.lmu.edu/d2l/le/calendar/283548/event/802210/detailsview?searchString=&year=2025&month=9&day=3&typefilterguid=a2d8e13e-30f9-4dfb-a907-cba23f3502bf",
  },
  {
    id: "3510-ln11",
    title: "LN 11: Scheduling Calls",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln11"),
    description:
      "In this lecture we continue our investigation of scheduling by learning many of the techniques used by Batch, Interactive, and even Real time systems! These include straightforward techniques like using a simple queue (FCFS) all the way to using multi-queue round robin techniques that rely on an internal lottery!",
    courseId: "cmsi-3510",
    standard: "CPU",
    lnTopics: [
      "Batch Scheduling",
      "Interactive Scheduling",
      "Real-Time Scheduling",
      "Linux CFS",
    ],
    contentUrl: "/cmsi-3510/ln11",
    recordings: [
      {
        name: "Class Recording",
        url: " https://lmula.zoom.us/rec/share/DeQWQhjFu2DB9qB2jz-FG2LEau1uVj76DAP77PSyj3boYzGqNtNgP1LL0hTf-YP0.mlNG3QnxWazMkA6a"
      }
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
    standard: "CPU",
    lnTopics: [
      "Deadlock",
      "Coffman Conditions",
      "Resource Allocation Graphs",
      "Dining Philosophers",
      "Deadlock Handling",
    ],
    contentUrl: "/cmsi-3510/ln12",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/hv72T8IJZM22UxFlIUh2wqJk44KY-C3isjm39BQOZUk9RNuJPkDB_1WcMDzt_4MW.yoHzPWAxf3f_EI72"
      }
    ],
  },
  {
    id: "3510-ln13",
    title: "LN 13: How I Met Your Memory",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln13"),
    description:
      "In this lecture we investigate different memory hardware technologies, how they are used, their advantages, and their disadvantages to set up a foundation for understanding Processes fit into memory. This includes volatility, speed, size, cost, and more!",
    courseId: "cmsi-3510",
    standard: "Memory",
    lnTopics: [
      "Volatile Memory",
      "Non-Volatile Memory",
      "Memory Hierarchy",
      "Memory Abstraction Layers",
    ],
    contentUrl: "/cmsi-3510/ln13",
    recordings: [
      {
        name:"Class Recording",
        url: "https://lmula.zoom.us/rec/share/RrnD12zduJ_2jMEUK1Ng9IxJFkOwIy6nS8QuTH5qqXle02DGbhwms3HLeWUqfvey.jL-li40hxM8EIiyx"
      }
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
    standard: "Memory",
    lnTopics: [
      "Contiguous Allocation",
      "Fixed Partitioning",
      "Dynamic Partitioning",
      "Fragmentation",
      "Logical vs Physical Addresses",
    ],
    contentUrl: "/cmsi-3510/ln14",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/rKIcsQn_HXmWI8jEvmlKSZSbqkqAy-8mrjiqI4_Qg2mRgxIRJmEJpzTa8OBIUPzq.q6OgMygLPN1eQJG8"
      }
    ],
  },
  {
    id: "3510-hw2",
    title: "HW 2: Life of Pie",
    type: "homework",
    date: schedule.getSpecificDate(2026, 2, 27, "3510-hw2"),
    availableDate: schedule.getSpecificDate(2026, 2, 15, "3510-hw2-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will get practice with concurrent programming paradigms in the form of making pizza from scratch! Prepare to engage with threads, synchronization primitives, async/await, and more!",
    courseId: "cmsi-3510",
    standard: "Concurrent Programming",
    contentUrl: "/cmsi-3510/hw2",
    hwTopics: ["Concurrency", "Threads", "Mutual Exclusion"],
    hwPoints: { reading: 0, programming: 30, optional: 20 },
    hwGithubClassroomUrl: "https://classroom.github.com/a/gu_K8XCD",
    hwBrightspaceUrl: "https://brightspace.lmu.edu/d2l/le/calendar/283548/event/802217/detailsview?searchString=&year=2025&month=9&day=3&typefilterguid=a2d8e13e-30f9-4dfb-a907-cba23f3502bf",
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
    standard: "CPU",
    contentUrl: "/cmsi-3510/ac2",
    acLearningObjectives: [
      "Experience the priorities of Batch, Interactive, and Real-Time systems",
      "Understand FCFS, Round Robin, and EDF scheduling algorithms",
      "Feel the impact of time quanta, deadlines, and context switching",
      "Compare throughput vs responsiveness vs deadline constraints",
    ],
    acEstimatedTime: "75 minutes",
    acMaterials: [
      "Simple math worksheets (printed, 1-2 reams worth)",
      "Writing utensils (different colors per student if possible)",
      "Timer and bell/alert system",
      "4 collection buckets (one per team)",
    ],
  },
  {
    id: "3510-ln15",
    title: "LN 15: Infinite Memory... Sort of",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln15"),
    description:
      "In this lecture we continue looking into memory allocation. We begin with Virtual Memory and how it is used to create the illusion of infinite memory! We then investigate how this illusion is created, and maintained, by a new non-contiguous allocation technique called paging!",
    courseId: "cmsi-3510",
    standard: "Memory",
    lnTopics: [
      "Virtual Memory",
      "Paging",
      "Page Faults",
      "Page Tables",
      "MMU",
    ],
    contentUrl: "/cmsi-3510/ln15",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/s2EyUPfj5QZIKbXFUfwS6CqOQrZoHbLRS9Y69E-malVdpKZhA_H8kiZX_I92EMh7.vAyYoKl2mr_xPEx-"
      }
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
    standard: "Memory",
    lnTopics: [
      "Multi-Level Page Tables",
      "Page Replacement",
      "Segmentation",
      "Paging vs Segmentation",
    ],
    contentUrl: "/cmsi-3510/ln16",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/_J42z6z4AiXDegvRn6Y4zeq22rBT6YfSlu8mMD-vwhYtQ_q9NkBqoSkd9g0Yb1zS.JjYr8j-uuxmcVMpp"
      }
    ],
  },
  {
    id: "3510-ln17",
    title: "LN 17: Hindsight's on Port 2020",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln17"),
    description:
      "In this lecture we cover I/O devices! We'll start with a brief history of data transfer standards, cover the major techniques (Block, Character, Network, etc), upgrade our visual model of the hardware, and finish by laying the foundation for the use of direct memory access (DMA) in modern systems!",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    lnTopics: [
      "I/O Devices",
      "Block vs Character vs Network",
      "Interrupts vs Polling",
      "Memory-Mapped I/O",
      "DMA",
    ],
    contentUrl: "/cmsi-3510/ln17",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/LmDxRcmMvChFQEbxOBDxacC1_NuKajieQew5p9vX4LOPoghtX8WxmIqVBnaVk0k.0UyByV_1DBVCAnRo"
      }
    ],
  },
  {
    id: "3510-ln18",
    title: "LN 18: IO and U",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln18"),
    description:
      "In this lecture we cover the software fundamentals of developing I/O systems. We cover the critical software principles we follow, the approaches used to make those ideals real, and then the implementation of those principals on modern systems. We cover device independence, buffering, spooling, and more.",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    lnTopics: [
      "I/O Software Principles",
      "Device Independence",
      "Buffering",
      "Device Drivers",
    ],
    contentUrl: "/cmsi-3510/ln18",
    recordings: [
      {
        name: "Class Recording",
        url:"https://lmula.zoom.us/rec/share/iHk08qktK7VrQ1owI8_D3ND3p_Kt-4G9TwgXTlGZ9gn2VQA3hl51AG-jzmyJW-Wx.oTAdlLsIVgsxQE1N"
      }
    ],
  },

  {
    id: "3510-ln19",
    title: "LN 19: Read Between the Lines",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln19"),
    description:
      "In this lecture we deepen our driver story from LN18 and make the boundary lines explicit. We trace a single read() request end to end across user space, kernel space, the driver, and back, examining syscall paths, interrupt context, deferred work, and why driver code is uniquely dangerous.",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    lnTopics: [
      "Kernel Space vs User Space",
      "Syscalls and Traps",
      "Driver Dispatch",
      "Interrupt Context",
      "Deferred Work",
    ],
    contentUrl: "/cmsi-3510/ln19",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/psCLztfD2o8RJD8ujbO-MFYU_wPQQWy84m-3z21JBl74AMmBSr56NQJgOsXZyGD-.EyTybHLQXExhrEEl"
      }
    ],
  },
  {
    id: "3510-ln20",
    title: "LN 20: Pipe Dreams",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln20"),
    description:
      "In this lecture we turn communication into the central lens. We investigate how isolated processes communicate without breaking the OS's protection model, exploring pipes, signals, message queues, shared memory, and Unix domain sockets as a spectrum of IPC tradeoffs.",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    lnTopics: [
      "IPC",
      "Pipes and FIFOs",
      "Signals",
      "Message Queues",
      "Shared Memory",
      "Unix Domain Sockets",
    ],
    contentUrl: "/cmsi-3510/ln20",
    recordings: [
      {
        name: "Class Recording",
        url: "https://lmula.zoom.us/rec/share/Mo71E3OvHrRPeNdXZmvEK12ucIpm0v2BZj3HbZyc7pKUhZzLiF8nJdYmovUjBoRk.3zt9y91NZ5ONcwPy"
      }
    ],
  },
  {
    id: "3510-ln21",
    title: "LN 21: Lost in Transmission",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln21"),
    description:
      "In this lecture we explore what changes when communication leaves the machine. We treat the NIC as an I/O device, explain why packets exist as discrete metadata-rich transfer units, introduce addressing and forwarding, and trace the send and receive paths through the kernel's network stack.",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    lnTopics: [
      "Network Interface Cards",
      "Packets and Frames",
      "MAC and IP Addressing",
      "Protocol Layering",
      "Send and Receive Paths",
    ],
    contentUrl: "/cmsi-3510/ln21",
    recordings: [],
  },
  {
    id: "3510-ln22",
    title: "LN 22: It's Not Socket Science",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln22"),
    description:
      "In this lecture we discover how the OS turns raw packet movement into something applications can program against. We cover sockets as kernel-managed endpoints, port-based multiplexing, UDP and TCP as contrasting transport contracts, and blocking versus readiness-based waiting models.",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    lnTopics: [
      "Sockets and Endpoints",
      "Ports and Multiplexing",
      "UDP",
      "TCP",
      "Blocking and Nonblocking I/O",
    ],
    contentUrl: "/cmsi-3510/ln22",
    recordings: [],
  },
  {
    id: "3510-hw3",
    title: "HW 3: Hot Pie-tato",
    type: "homework",
    date: schedule.getSpecificDate(2026, 3, 27, "3510-hw3", true),
    availableDate: schedule.getSpecificDate(2026, 2, 8, "3510-hw3-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will get practice with scheduling, batch systems, interactive systems, and real-time systems!",
    courseId: "cmsi-3510",
    standard: "CPU",
    contentUrl: "/cmsi-3510/hw3",
    hwTopics: ["Scheduling", "Batch Systems", "Interactive Systems", "Real-Time Systems"],
    hwPoints: { reading: 0, programming: 30, optional: 20 },
    pinned: true,
    hwGithubClassroomUrl: "https://classroom.github.com/a/ZRyafgQZ",
    hwBrightspaceUrl: "",
  },
  {
    id: "3510-ac3",
    title: "AC 3: Ring Around the I/Osie",
    type: "activity",
    date: schedule.getNextRecurringDate("3510-ac3"),
    dueTime: "11:59 PM",
    description:
      "In this in class activity, we will be exploring the different major forms of I/O communication and how they are used in modern systems!",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    contentUrl: "/cmsi-3510/ac3",
    acLearningObjectives: [
      "Apply concurrent programming concepts to solve real-world problems",
      "Analyze system behavior using hardware knowledge",
      "Design solutions that consider both concurrency and hardware constraints",
      "Synthesize multiple course concepts in an integrated way",
    ],
    acEstimatedTime: "75 minutes",
    acMaterials: [
      "Computer with Rust installed",
      "Activity worksheet",
      "Whiteboard/paper for planning",
    ],
  },
  {
    id: "3510-ln23",
    title: "LN 23: Linus Tech Tips",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln23"),
    description:
      "In this lecture we stop speaking in pure abstraction and inspect a real operating system. We trace two end-to-end Linux walkthroughs, one device-oriented and one network-oriented, and use /proc, /sys, /dev, strace, dmesg, ip, and ss to recognize the semester's abstractions in a living system.",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    lnTopics: [
      "Linux Walkthroughs",
      "VFS and Device Nodes",
      "/proc, /sys, /dev",
      "Syscall Tracing",
      "Observability Tools",
    ],
    contentUrl: "/cmsi-3510/ln23",
    recordings: [],
  },
  {
    id: "3510-ln24",
    title: "LN 24: C You Later!",
    type: "lecture",
    date: schedule.getNextRecurringDate("3510-ln24"),
    description:
      "In this final lecture we connect the semester's Rust foundation to real systems development. We examine the bug classes that make kernel work dangerous, what Rust prevents and what it does not, how small kernel-space contributions work in practice, and the safe experimentation workflow that makes participation possible.",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    lnTopics: [
      "Memory Safety",
      "Rust for Linux",
      "Kernel Modules",
      "Safe Contribution",
      "Systems Engineering Workflow",
    ],
    contentUrl: "/cmsi-3510/ln24",
    recordings: [],
  },
  {
    id: "3510-hw4",
    title: "HW 4: Hot and Not Ready Yet!",
    type: "homework",
    date: schedule.getSpecificDate(2026, 4, 17, "3510-hw4", true),
    availableDate: schedule.getSpecificDate(2026, 4, 5, "3510-hw4-available"),
    dueTime: "11:59 PM",
    description:
      "In this homework you will get practice with memory constrained programming and allocation!",
    courseId: "cmsi-3510",
    standard: "Memory",
    contentUrl: "/cmsi-3510/hw4",
    hwTopics: ["Memory Allocation", "Memory Management"],
    hwPoints: { reading: 0, programming: 30, optional: 20 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
  },
  {
    id: "3510-hw5",
    title: "HW 5: Hand-Tossed in Rust",
    type: "homework",
    date: schedule.getSpecificDate(2026, 5, 8, "3510-hw5", true),
    availableDate: schedule.getSpecificDate(2026, 4, 19, "3510-hw5-available"),
    dueTime: "11:59 PM",
    description:
      "In this capstone you'll build and publish a small Linux kernel module of your own — a character device written in safe Rust, hand-tossed end-to-end from VM setup through public GitHub repo.",
    courseId: "cmsi-3510",
    standard: "I/O and Networking",
    contentUrl: "/cmsi-3510/hw5",
    hwTopics: ["Linux Kernel Modules", "Rust", "Character Devices"],
    hwPoints: { reading: 0, programming: 30, optional: 20 },
    hwGithubClassroomUrl: "",
    hwBrightspaceUrl: "",
    pinned: true,
  },
  {
    id: "3510-final-release",
    title: "Final Exam Release",
    type: "exam",
    date: schedule.getSpecificDate(2026, 5, 7, "3510-final-release", true),
    description: "Final exam released and available for completion.",
    courseId: "cmsi-3510",
    standard: "Final",
    //contentUrl: "/cmsi-3510/final",
    pinned: true,
  },
  {
    id: "3510-final",
    title: "Final Exam Due",
    type: "exam",
    date: schedule.getSpecificDate(2026, 5, 13, "3510-final", true),
    dueTime: "11:59 PM",
    description:
      "Comprehensive final exam covering all course material. Good luck!",
    courseId: "cmsi-3510",
    standard: "Final",
    contentUrl: "/cmsi-3510/ex1",
    pinned: true,
    exExamUrl: "https://brightspace.lmu.edu/d2l/lms/quizzing/user/quizzes_list.d2l?ou=283548"
  },
]

// Filter events based on cutoff date
export const cmsi3510Events: CourseEvent[] = allEvents.filter(
  (event) => !schedule.shouldFilterEvent(event.date, event.pinned)
)
