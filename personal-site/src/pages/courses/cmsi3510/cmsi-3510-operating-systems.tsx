import { Chip, Divider, Sheet } from "@mui/joy"
import Footer from "../../../components/footer"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import CourseNavBar from "../components/course-nav-bar"
import AssignmentCard from "../components/assignment-card"
import ExamCard from "../components/exam-card"
import NotesCard from "../components/notes-card"
import Standard from "../components/standard"
import Speak from "../components/speak"
import ActivityCard from "../components/activity-card"

export default function CMSI3510() {
  return (
    <>
      <Sheet
        color="primary"
        variant="solid"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
          p: 4,
          gap: 4,
        }}
      >
        <CourseNavBar
          courseName="CMSI 3510: Operating Systems"
          courseNumber={3510}
        />
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            borderRadius: 12,
            gap: 4,
          }}
        >
          <Divider>
            <Chip variant="soft" startDecorator={<AutoStoriesIcon />} size="lg">
              Course Information
            </Chip>
          </Divider>
          <Speak>
            Below is a large table the represents a "one stop shop" for
            everything in this course from notes, lecture recordings,
            assignments, dates, etc. This is a "living" page. It will continue
            to expand as we move forward into the semester!
          </Speak>
          <Speak>
            The table is interactive to help reduce clutter on the homepage.
            Click on a row in the table to have it expand its relevant course
            modules!
          </Speak>
          <Sheet
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              justifyContent: "center",
            }}
          >
            <Sheet
              sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <Sheet
                sx={{
                  m: 1,
                  width: "2rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></Sheet>
              <Sheet
                sx={{
                  m: 1,
                  width: "6rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                #
              </Sheet>
              <Sheet
                sx={{
                  m: 1,
                  width: "10rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Standard
              </Sheet>
              <Sheet
                sx={{
                  m: 1,
                  width: "50rem",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Description
              </Sheet>
            </Sheet>
            <Standard
              number={0}
              title="Syllabus"
              description="This standard is here to familiarize yourself with the layout
                  of course information! It is not graded for quality but
                  demonstrates where and how information is accessed! Clicking
                  on any part of this row will dropdown the relevant
                  information for the standard that is being covered in class."
            >
              <NotesCard
                title="LN 0: Reading Course Material!"
                description="Here is a sample of what the lecture notes will look
                            like! This one just explains the color coding I use
                            for information and displays the small interactive
                            modules I might have throughout the notes."
                notesSlug="/cmsi-3510/ln0"
              />

              <AssignmentCard
                title="HW 0: Simple Rust Calculator"
                description="This is a small assignment to get you familiar with
                            the process of receiving and submitting assignments!"
                assignmentSlug="/cmsi-3510/hw0"
              />
              <ExamCard
                title="EX 0: Syllabus"
                description="Exams are an important part of how you communicate
                            your understanding of the material! Here you will
                            take one on the most vital parts of the course
                            syllabus! I promise its not hard."
                examSlug="/cmsi-3510/ex0"
              />
            </Standard>

            <Standard
              number={1}
              title="Concurrent Programming"
              description="In this standard we will learn a brand new programming language called Rust!
                Learning Rust requires us to engage with systems programming, memory management, and, most importantly, concurrency!
                We will investigate, in Rust, how to create threads, synchronization primitives used to protect shared data, and modern concurrency
                patterns to avoid common pitfalls, such as deadlocks, livelocks, data races, and more!"
            >
              <NotesCard
                title="LN 1: Shaking on the Rust"
                description="In this lecture, we begin by getting a context for what Syntax and Semantics are in programming languages to 
                    appropriately set ourselves up for learning Rust. We then take a 'sneak peak' at the Rust language as is solves the 
                    Change Making Problem."
                notesSlug="" //"/cmsi-3510/ln1"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/4SAbrt2tDKdvgfyT2JM4o2s6zUuUTRFAgdK5M8B5a3-zH4VzJe5WYRhcVWOAFYIu.IrnfAEAivlXg4VLg",
                  },
                ]}
              />

              <NotesCard
                title="LN 2: Variable Variables"
                description="In this lecture, we begin our full investigation of Rust by looking at the syntax and semantics of Variable Declarations.
                    We cover on many topics including memory management, ownership, scope, and mutability. We then turn to VSCode to see examples."
                notesSlug="" //"/cmsi-3510/ln2"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/t1gABkU0lL08yFbLsvjebh3-NqhtBJxXXUwQAZfhuXJ_J6Z5Y5HrliQfDImwq88.tlwFBTqGt12lfOtX",
                  },
                ]}
              />

              <NotesCard
                title="LN 3: What's in Your Memory?"
                description="In this lecture, we take a deeper look at memory handling in rust with the stack and the heap. We also investigate the
                    concept of references and how they are used in Rust's Ownership system to manage memory."
                notesSlug="" //"/cmsi-3510/ln3"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/YvSIlIIb0-J_RumpDYa6dwnXqakZrBJL8niULm1nr82YNpCmOlHkpxclvUpnlAjz.8MeI0i1MdqcNWkgA",
                  },
                ]}
              />
              <NotesCard
                title="LN 4: Functionally Perfect"
                description="In this lecture, we see all that functions have to offer in Rust and their unique Ownership management. Everything from associated functions, to closures, and more!"
                notesSlug="" //"/cmsi-3510/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/2Q3r7IktcYGQ8ViojFh3rjdxnSxjz8eWGoyYqPiB4yZS15AOkYPD8mYpJV_fcKc7.TN9z82Jg04W99qAD",
                  },
                ]}
              />
              <NotesCard
                title="LN 5: Optimal Struct Structure"
                description="In this lecture we round off our foundational knowledge of Rust itself with structs, traits, and lifetimes. We investigate how they interact with one another to create a memory safe and comprehensive OOP system."
                notesSlug="" //"/cmsi-3510/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Office Recording",
                    url: "https://lmula.zoom.us/rec/share/63bvw49CF5MnE-GkkFQrE2cUbcVg1KwB-Tongk3LH6Mz1vxdvBhi53Lw3p0Xt54f.Naur2iSVWxwUrHLD",
                  },
                ]}
              />
              <NotesCard
                title="LN 6: Hanging by a Thread"
                description="In this lecture we begin our investigation of concurrent programming by starting from the beginning 
                with a brief history of computer hardware as it relates to the OS and a large picture of how our hardware makes it
                 all the way down to threads. We then investigate how to create threads in Rust and briefly introduce some of the 
                 oddities of Concurrent Programming."
                notesSlug="" //"/cmsi-3510/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/B7avnb0HLyqGqvZqo3RqitEfpOxD81Zu0U-W1bZYJqu3yRgVi5691XcTUC5SeTyh.HAj4GfCt3mtMIyMh",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 1: Doughmain Expansion"
                description="In this homework you are tasked with solidifying your Rust programming skills by taking on a small file system
                simulator and its incomplete terminal commands! You'll get to practice structs, ownership, and references!"
                assignmentSlug="/cmsi-3510/hw1"
              />
              <NotesCard
                title="LN 7: Out of Order"
                description="In this lecture we sharpen our understanding of threads by investigating parallel and concurrent programming theory. 
                By investigating Partitioning, Communication, Synchronization, and Load Balancing we can identify, summarize, and alleviate
                the many pitfalls of out of order programming."
                notesSlug="" //"/cmsi-3510/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/RsBnzDn_jjW9uqCfNL8x7hrBPXi-HVxYpz0BjfiEALw7SFbcN7nExN-Iql4oNAnD.LFmrzqrKPlNFkpob",
                  },
                ]}
              />
              <ActivityCard
                title="AC 1: Getting Folded"
                description="In this in class activity, we use Competitive Origami to learn data and task partitioning for parallel programming."
                activitySlug="/cmsi-3510/ac1"
              />
            </Standard>

            <Standard
              number={2}
              title="Computer Hardware"
              description="In this standard we will investigate the major hardware components of our computers that OSs are built to manage! This includes the CPU, Memory, Storage, and I/O devices!"
            >
              <NotesCard
                title="LN 8: ICUP, I See You Process"
                description="In this lecture we begin our deep dive into computer hardware by breaking down the CPU! We will discover ISAs, Registers, ALUs, and more!"
                notesSlug="" //"/cmsi-3510/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Office Recording",
                    url: "https://lmula.zoom.us/rec/share/dAyaVTji9fAzNWLI2y2fZNLoucRVt42e0f3wCz-rd0DUJr1pOq79vrt_GHYhMUfu.BYxgTadtvhvWbLmD",
                  },
                ]}
              />
              <NotesCard
                title="LN 9: ...Processing Title..."
                description="In this lecture we view the many different, unique yet important perspectives of different portions of the OS and hardware to answer
                the most important question about our OSs, what is a process?"
                notesSlug="" //"/cmsi-3510/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Home Recording",
                    url: "https://lmula.zoom.us/rec/share/smE98r67BEta7uTdfWrkFpqiKyPKzjAwbck3RoGCdYFuIGCR5I3BJKxoWDpXT8KT.ueG3O7kqC0Iy73U-",
                  },
                ]}
              />
              <NotesCard
                title="LN 10: Out of Context"
                description="In this lecture we dive into the intricacies of when and when not to context switch between processes. This problem
                concerns our users expectations, our processes to complete, and the direct hardware we are using! This is the Scheduling problem!"
                notesSlug="" //"/cmsi-3510/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/45aT98S27iQ7490z9_FOB1uBFoZqnERCfHQs70DPQtyWUT2XtFJgWA0TmQ4UGr2i.Gje4CAkIBfxNJ0Vq",
                  },
                ]}
              />
              <NotesCard
                title="LN 11: Scheduling Calls"
                description="In this lecture we continue our investigation of scheduling by learning many of the techniques used by Batch, Interactive, and even Real time systems!
                These include straightforward techniques like using a simple queue (FCFS) all the way to using multi-queue round robin techniques that rely
                on an internal lottery!"
                notesSlug="" //"/cmsi-3510/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/R-gLVoDjrwfxKJuHAo_UEFb7llFcTurqAoLlhx7ZffPB0rdRBtxDF7eJbJ_EPkJR.g9sFSIHPLuYmMYn9",
                  },
                ]}
              />
              <NotesCard
                title="LN 12: Don't Starve"
                description="In this lecture we spend some time investigating how processes interact with limited resources! Namely, how they interact
                with them incorrectly to form a new universe of problems referred to as Deadlocking!
                "
                notesSlug="" //"/cmsi-3510/ln12"
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/mjhyMtqzKS-Lw3e1AbTATQE86NS93sgBtmjuZxIFXtJJGaRjIJ2owRhO5vsnd9tr.nMizuUreLDV3x3ye",
                  },
                ]}
              />
              <NotesCard
                title="LN 13: How I Met Your Memory"
                description="In this lecture we investigate different memory hardware technologies, how they are used, their advantages, and their disadvantages to
                set up a foundation for understanding Processes fit into memory. This includes volatility, speed, size, cost, and more!"
                notesSlug="" //"/cmsi-3510/ln13"
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/EELBDsdX9tvxFkQ1mRoqrDN5jtrqi9oCOc713K7iOk8Jqe1AA2K68U9iUaMpwCC1.HO4P_1zh6dqlglb8",
                  },
                ]}
              />
              <NotesCard
                title="LN 14: Continuous Fragmentation"
                description="In this lecture we investigate memory allocation! We begin with studying contiguous memory allocation techniques like fixed and dynamic partitioning.
                We then use these techniques to investigate the problem of fragmentation and setup the foundation for virtual memory!"
                notesSlug="" //"/cmsi-3510/ln13"
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/NiQ9Dn92YMJWQb12sSWJwXHuN_3tDem86UQymlXSf_vPILcXTw2Qh1TzQlluxzC2.gMCpnMvcdhXgJa4E",
                  },
                ]}
              />
              <NotesCard
                title="LN 15: Infinite Memory... Sort of"
                description="In this lecture we continue looking into memory allocation. We begin with Virtual Memory and how it is used to
                create the illusion of infinite memory! We then investigate how this illusion is created, and maintained, by a new non-contiguous allocation technique called paging!"
                notesSlug="" //"/cmsi-3510/ln13"
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/b7LYFJknPXpAvWfnbMN5yktMTiKYA-g2xeMc57mFT5UvnDQWqz4rGUXA1h_U_sn9.TdKdllpBDbnMuIwp",
                  },
                ]}
              />
              <NotesCard
                title="LN 16: Paging Dr. Seg"
                description="In this lecture we finish our investigation of memory allocation by covering a comprehensive example of paging and seeing some real world examples of how
                modern systems must adapt the paging technique to work with current hardware and LAS sizes. Lastly, we finish by briefly covering segmentation and how it is used with paging to create our modern systems."
                notesSlug="" //"/cmsi-3510/ln13"
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/ytTcMxNEReEfUF7S-RycWjoOpz6aTFzx20FLhRrLJ6vwZ1v4TUX15K6FiCFIzfT5.VewM1G_22tdztE7z",
                  },
                ]}
              />
              <NotesCard
                title="LN 17: Hindsight's on Port 2020"
                description="In this lecture we cover the final topic of this standard, I/O devices! We'll start with a brief history of data transfer standards, cover the major techniques (Block, Character, Network, etc), 
                upgrade our visual model of the hardware, and finish by laying the foundation for the use of direct memory access (DMA) in modern systems!"
                notesSlug="" //"/cmsi-3510/ln13"
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/VCXLqT5j7Uu2AnqpdzFFAMChp9_hvDFAoLwoUAUTzLdzevk9lqVnU_q-xyGcSIkV.RsCHfe34PHsvCuU4",
                  },
                ]}
              />

              <NotesCard
                title="LN 18: IOU"
                description="In this lecture we cover the software fundamentals of developing I/O systems. We cover the critical software principles we follow, the approaches used to make those ideals real, and then the implementation of those principals on modern systems.
                We cover device independence, buffering, spooling, and more."
                notesSlug="" //"/cmsi-3510/ln13"
                sectionRecordings={[
                  {
                    buttonText: "Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/16t0RtM5rJLTQ00kvgG2pbY6pvS-pU9YmWk5Y1WNKUPagqORf7Rxk2qA82A3yssg.RWthfGVf-Dqkj0Wo",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 2: Life of Pie"
                description="In this homework you will get practice with concurrent programming paradigms in the form of making pizza from scratch! Prepare to 
                engage with threads, synchronization primitives, async/await, and more!"
                assignmentSlug="/cmsi-3510/hw2"
              />
              <ActivityCard
                title="AC 2: Saved by The Schedule"
                description="In this in class activity, we use grade school worksheets as a vehicle for learning all about job timing!"
                activitySlug="/cmsi-3510/ac2"
              />
            </Standard>
            {/* 
            <Standard
              number={3}
              title="Collections"
              description="In this standard we will investigate the mathematical
                  underpinnings of mathematical structures that hold other primitives! 
                  This includes working with tuples, sets, and their many operations."
            >
              <NotesCard
                title="LN 8: Getting Our Types in a Row"
                description="In this lecture we formally investigate product types in type theory including their properties, operations, and how they are used to build up more complex types."
                notesSlug="/cmsi-3510/ln8"
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/Bbvz-ndaWE15IMuqdU_wW3vrsWRSExQxruGrDMQAkmXEPbgmjEU-DkTwfTgOUZQi.aWuxRPu06-Wz-hCO?startTime=1727197036000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/i-XmrkrF02aYQY2-UvCR1A_DxJYnlQyRdU4Czq6kY3aBcWi0jdnxcujZ2bFT4UrK.mlFvyG810yMMV-05?startTime=1727210730000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/33Kdp481DquJZRqKZPYiMh5TEkFRZ7bNwu6aHntLJu3b9Qtd99yBmiL8_q6urLFp.Da2vD4LhVUW_CqBS?startTime=1727226146000",
                  },
                ]}
              />

              <NotesCard
                title="LN 9: Settling In"
                description="In this lecture we investigate the Tuples older sibling, the Set. We'll investigate it formally by defining it, exploring some innate properties, and a few basic operators."
                notesSlug="/cmsi-3510/ln9"
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/erdo4qPD6oZSrFKmmzTem33djxaYIa2oG3LJy0e4l4bKC1_f4mZSoKgBFbC-xRdt.mdplW412Khj3FV7i?startTime=1727370035000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/9QQu1DhsecGIaIEd6fCXNmWm28jB24khPgD96aiEQUaIt7BLu2QLW1Juf2kpilxF.i1_hyU-C9fA6CykF?startTime=1727383354000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/6Gk4s0BKwJXi2fQq7zKspqEcxfjKtC49pW33eB4WveiQPRpW0owPZDtpbVskttlY.7DL0i-PFs6IQAUeE?startTime=1727398767000",
                  },
                ]}
              />
              <NotesCard
                title="LN 10: Settling Down"
                description="We continue our investigation of Sets by practicing some of the many common operations found between."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/LhY2fBS8tI7v2Y5xKJOQKLNYmuCMpeUQjbjxanPepH3RtOC1ORgMuBnk7hYV2V0v.l18jmOgltVIPcVc5?startTime=1727801980000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/XY1wXoXTAs75dqMJ_IXvErcGG6NNCT7r4XeokH9DIkN_X09yeDKTyH6SWyWkatpI.fzSNRI3CPXoq_CED?startTime=1727815510000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/Y2XgeF3nXN0sVjjowBh2DvYMpSYOt9Z_RQXWEHMsRjf_XPHMM_FHVUEroIGq_aZz.mdb31HubOWe4GcZk?startTime=1727830787000",
                  },
                ]}
              />
              <NotesCard
                title="LN 11: Relationship Counseling"
                description="We end our look at Collections by learning about relations. Typically represented as sets of tuples, we will investigate the properties of relationships between instances within a type."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/q9pc-SZYFPqCfIRHLN34TETFFIQr5X2WyQfUoVWZCgz8rgMlTnbD5aoXp1Wwad5F.faOp366tebP8UMf2?startTime=1727984621000",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 3: Storage Wars"
                description="In this homework we practice tuples, sets, their operations, and even a little more in the programming portion..."
                assignmentSlug="/cmsi-3510/hw3"
              />
            </Standard>

            <Standard
              number={"MIDTERM"}
              title="Standards 1-3"
              description="This is the optional midterm exam that covers the first 
                three standards."
            >
              <ExamCard
                title="EX 1: Midterm Exam"
                description="This exam is 15 questions total and worth 30 points. It covers logic, numbers, and collections."
                examSlug="/cmsi-3510/ex1"
              />
            </Standard>

            <Standard
              number={4}
              title="Functions"
              description="In this standard we will investigate functions. This 
                includes their formalized mathematical definition in the lambda 
                calculus, their reductions, their properties, and how they are 
                used in conjunction with our previous tools to further formalize Type Theory."
            >
              <NotesCard
                title="LN 12: This Lamb Don't Baa"
                description="In this lecture we introduce the lambda calculus, a system that is used to define functions in a formal way. We will cover the syntax, the rules, and the reductions that can be made to simplify functions."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/vXeGKyE1dLZe6K_tbgkpKgcc2V8BAPOomC3e-NRKOo_vaezz90u6IFHCyurdMrej.QigqUt9W4guooHrC?startTime=1728406977000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/GjsEvU6dNc5v-g0ij4EcYNW399P_W9p44VkPMIeXPHRphQl0OeaedT9RiZk5qC_b.ggOaWWYYrFQROyT-?startTime=1728420502000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/5mf2e5YfCoTOHrH6P0aA8dshV46cgPsplJ8ocjSFp6ksfFc6WeOr36sgOx5wtTpP.a-4WERd0px2BkpZ3?startTime=1728435902000",
                  },
                ]}
              />
              <NotesCard
                title="LN 13: Free Range Variables"
                description="In this lecture we continue our work with Lambdas by investigating how variables interact with functions. We discover being bound and free, how to substitute variables, and how to reduce functions formally using proper substitution."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/St_K0PfQZKZCwbJHtWcrcvuqov7bHYY7a_xdkD1AP7XNkzAN9JU_0BQS6gBJU8O4.BqY94Ww9mpaDTZK8?startTime=1728579589000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/08EmA-M1MXWNJoZb-xRLHt8S6U6auBbMMD2vF2HZJGgK4YWrFcRdH-bIPeP7xGU.UUoNwDD5gLAZnrGq?startTime=1728593388000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/y2YT25T9k-ygUZXmDg29qjvvxa77KiElZU-PbWyWJCrEQpotZvDoAT-yE9pVwp_E.eiEPGVQ1YCZF7QOr?startTime=1728608796000",
                  },
                ]}
              />
              <NotesCard
                title="LN 14: Supplying and Consuming Lambdas"
                description="In this lecture we start by recapping proper substitution and then officially define the formal alpha, beta, and gamma conversion rules. After we go over some nomenclature for functions and how to identify suppliers, consumers, and the like."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/M-Q4w9o-9ZwAkkZ8aFQJQln7gLKvVkkAcZOwBCPXQ1R7qLAIM6eo9Hb2oUrYl7RT.53DRR5KWubqPDt1A?startTime=1729011698000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/MBsV4n6c941fnIe9z17qKhz-ZqhQmYp6LROyRc1VKA0TCpdacT4bIHitWxPGhNXb.N-f2cND7NSiCPUZI?startTime=1729025363000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/5mVa6kDx_8ozDqSmZvN1DXasjGRrZv2Yf5-pjsY4FAzwXATNkCtstHzL02N7Mh41.oAKBo7LxhNVpFw5o",
                  },
                ]}
              />

              <NotesCard
                title="LN 15: In the Domain of Sheep"
                description="In this lecture we investigate the patterns that can be found in a lambdas inputs and outputs. We cover domain, codomain, image, pre-image and how an investigation into them gives us three function classes: Injective, Surjective, and Bijective"
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/HIdQ6-URRZZCuTjhTQcY_DIxZLYHoEVJenFNVgemiQv-e6Ika8mdqAjmeP9R_4V3.mefUEt9tHARLzW4_?startTime=1729184582000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/81I4FSyqGlphg499OH6K7SGm0GJkNcKzKLyUAG3hewAApI12S5WuKW1qlhp0UMNd.I6Qwggd9GnsSVcDj?startTime=1729198100000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/tevUmc_LCdP9UZJSXX98LysG5F9x5TEjwQAIv1dL-xbXquUPK-cIRBnF7AvyKse3.6_fBLQ3U4TIzHomt?startTime=1729213895000",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 4: Silence of the Lambdas"
                description="In this homework we practice lambdas, their reductions, their properties, and their creation!"
                assignmentSlug="/cmsi-3510/hw4"
              />
            </Standard>
            <Standard
              number={5}
              title="Combinatorics"
              description="In this standard we will investigate counting, combinations, permutations, and more."
            >
              <NotesCard
                title="LN 16: Laws and Orders"
                description="In this lecture we will introduce a more formal manner of counting, define disjoint-ness, the rule of sums and products, and practice some combinatorics problems!"
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/Znj8oZh4iFYH-55h2IQaCwPJiJKmrj-RfsIybETYR_8765SOA-BhkmR6d4lZtIo3.W_DGK5Rxqa87ymFC?startTime=1729652001000",
                  },
                ]}
              />

              <NotesCard
                title="LN 17: Factorialing in Evidence"
                description="In this lecture we will investigate factorials, permutations, and combinations with and without repeats allowed!"
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/Yl7uACGPQUyKOWb6z11fMeMiEkNR-DBctVPKRQAtZ33AgFcFTdUdJf7xMeamaLAE.txpI1KGSkHbTQret",
                  },
                ]}
              />

              <NotesCard
                title="LN 18: Double Jeopardy"
                description="In this lecture we investigate Pascal's triangle and many of its hidden properties and patterns. We develop our understanding of combinations using Pascal's Triangle to explore a new proof technique called Double Counting."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/qskFNAeKoGCs2I1mbaZZ4yeKWyA19urXjekBcolV6aj9em5e_mkkuPaaK0Vj2tIW.idzQGwGUvCvukfAf?startTime=1730221148000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/6ETWci7YYQhFbXPcvAnhOY5ncpXZU8ld2m-fmLOnCfbvR1NHDV4ntMt1DftTRcgN.aDxDgfo02_IPbqOP?startTime=1730234887000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/BgHVZfTLrM3pBEIgYSpwASnMnCcALwYWfI7qan8RvnrG2yUKkCL6EqaW2zGR15Xg.W4h3jC0NP5mxSdha?startTime=1730250507000",
                  },
                ]}
              />

              <NotesCard
                title="LN 19: Bijection Your Honor!"
                description="In this lecture we learn how to leverage bijective functions to solve an interesting class of combinatorics problems and introduce the pigeonhole principle."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/UeUrUcJASOdXuromubzXAUa-an3Eic5TJ958lIH4XEuozDoXWVvVPgBBj56IFnmM.xQhqXL16cAXK0jye",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 5: Order in the Court!"
                description="In this homework we investigate counting, combinations, permutations, and the many tools and intuitions that can be pulled from them!"
                assignmentSlug="/cmsi-3510/hw5"
              />
            </Standard>

            <Standard
              number={6}
              title="Graph Theory"
              description="In this standard we will investigate the mathematical 
                underpinnings of Graph Theory."
            >
              <NotesCard
                title="LN 20: Going for a Walk"
                description="In this lecture we follow in the footsteps of Euler and complete the Seven Bridges of Konigsberg problem to introduce graphs formally."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/gh9M9Mr8vWy2cZ7QkxYhp7mT_dZMeDcyv-3cZaEivvElSvP4IRAUrUKw-vt-r_np.wqKczhxy-oiTjdMG?startTime=1730829588000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/LuyleXemMtEysQSbZhxmvPWHoknhP3iemSTfaOj6awnxwsoq90FPAyYewx-_5EZZ.sYNGb_KIJIi9Qusl?startTime=1730843339000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/hc4JSVNUzrhtr0WYWvFZ5mdOpD2yeCHIdgIvX2xjpw_Qocmg8rdrDq8cgSR4G8Su.mP-QZuUQ6ZtN3bZJ?startTime=1730858832000",
                  },
                ]}
              />
              <NotesCard
                title="LN 21: Connecting with Nature"
                description="In this lecture we investigate how the alterations to the formal graph definition propagate to change our visuals. We take a look at isomorphisms, connectedness, and the handshaking Lemma."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/m7fGV1QaucjdlM3mFPtKo2TDk0hCNNRcLq3iUYPo17VWXbN-Ys9bvuXkG9I1OnEX.OTpNPVmppGSjEmw8?startTime=1731002382000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/hVQw21hJ2xVJfxhbp3_HA_a9ragRjI0IxxxbIdq1tFLj-7g3781jQPBI753TC4-i.UX7321B4hCmggABv?startTime=1731016162000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/LBhF400-cSb8A-0LGu6NQ1rZuGtXSPx88IdOLrFb1fg4w3rd7kRSpcyO_Twc72J5.48wnJyuYC_QYCFg8?startTime=1731031580000",
                  },
                ]}
              />

              <NotesCard
                title="LN 22: Looking Over Edges"
                description="In this lecture we take a look at special graphs (Complete, Bipartite, Euler, Hamiltonian) and their special properties. We also take a look at cycles as a useful tool for analyzing graph properties."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/l-B17k-nJJAOfiR2Ct-oz8uDLq56MTYE53N2lumA_taa9XFG9PqOhl0GqJQ6bfbG.vstJjz0QAxHt_kWn?startTime=1731434403000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/owgtVAQQq5GgP9kbGKY3B1o1ER1mKknVbBlRlhtyjz2bOfUNzt6PNURIZTwAaCay.waBdAuT9kEDlOrTB?startTime=1731448352000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/5CD5XlM3IVQfEYTMFdSYTO_WAFkxkScR2qWwz8saBDQCTw6YCypGVlhaF_l9I3da.9czCZsfer3BEl1B3?startTime=1731463566000",
                  },
                ]}
              />

              <NotesCard
                title="LN 23: Spanning the Globe"
                description="In this lecture we cover a few more special graphs in the form of trees and forests. We then end the graph theory unit by investigating minimum spanning trees and how their solutions and structures represent many real-world problems."
                notesSlug="/cmsi-3510/ln23"
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/WHssoPHNAHXnDgnDzuCM7ee5YGFD6mSbK12KbX62wlyQ4Wp0DdGzMGbClSjjL2kU.V0vs1azQv0rWy3aV?startTime=1731607327000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/BLSe-vT1XJfZ7sy6YaUz--QJMvt9bzG-LfFt5_6KAMTPiBXqVz6Y0dGO59yE2DZ_.9mhrJcBEKWc7Y25l?startTime=1731621005000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/3BKQ0snBCjL1wAmawNk2r32AhGo75po0qkqxb8SXdeVId1W7s5S08YJl-rU2Id3s.CiCjb8OGTorZ0I_H?startTime=1731636345000",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 6: (Warning: Graphic Content)"
                description="In this homework we investigate all things Graph theory! This includes many types of graphs such as complete, bipartite, trees, and forests. We also investigate many of the properties and operations that can be performed such as isomorphisms, connectedness, and cycles."
                assignmentSlug="/cmsi-3510/hw6"
              />
            </Standard>

            <Standard
              number={7}
              title="Set Theory"
              description="In this standard we will investigate the mathematical 
                underpinnings of Set theory."
            >
              <NotesCard
                title="LN 24: Setting the Record Straight"
                description="In this lecture we recap the semester of work to tie up our investigation of Type theory. We then contrast it against Set theory."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/4DKmD7MaesufPb5tPXdc2aPBHRs5vmxqlO0o5QgNGkJHq9rC_P2uG_frrxAUDNgE.MUqwBzeYVyhWCH25?startTime=1732039249000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/jcJX3szcmYoJmjIQzowl70cBH38QS1JKIbFoSrC2lUvPi2HdHgOtTsov-gFNwOvI.BvMPpQqc5_h4ihob?startTime=1732053050000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/qQ8X2i4GzZgF_QQecM7P3J22sfEq2q1DO62dUZLFEWsC2wgxKVaOMHCbOmkwdZTv.GGwH8uDMQTDV28kI?startTime=1732068619000",
                  },
                ]}
              />
              <NotesCard
                title="LN 25: Arguing the Point"
                description="In this lecture we piece together all the proof techniques we learned to summarize argumentation and learn two more: Proof by Contradiction and Proof by Induction."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/t-sVwRN5_n0asbcBD_cWlwD4Vzl_GzDCjeojFlcP7yoS2q1SYYaTIxdVZ8vZqBJT.S1exyVVC8GH8aWNq?startTime=1732212174000",
                  },
                  {
                    buttonText: "Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/0WSyGtRsA5xALt4srXzef6jLYGkHhTD21ntl84xQxaqtAhYMn6fDt3FuLw0dHYkV.jdQRPmspz2iKe-BZ?startTime=1732225744000",
                  },
                  {
                    buttonText: "Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/1oD31tvjBGmgcPLv1hs-0R5azK_kHpozSw74VVPjToGbulomYoFvc0twJLjZwbo7.WBk8DHgbrzCZ1vkK?startTime=1732241376000",
                  },
                ]}
              />
                <AssignmentCard
                  title="HW 7: Set Theory!"
                  description=""
                  assignmentSlug="/cmsi-3510/hw5"
                />
            </Standard>
              <Standard
                number={"SPECIAL"}
                title="Extensions"
                description="Not a true standard, this section houses the notes for 
                the special non-graded topics that are covered in class."
              >
                <NotesCard
                  title="LN 27: Pure Discrete Mathematics and Artificial Intelligence"
                  description=""
                  notesSlug="/cmsi-3510/ln25"
                />
                <NotesCard
                  title="LN 28: Games and Systems Architecture Pipelines"
                  description=""
                  notesSlug="/cmsi-3510/ln26"
                />
              </Standard>
              <Standard
                number={"FINAL"}
                title="Standards 4-7"
                description="This is the optional final exam that covers the last 
                four standards."
              >
                <ExamCard
                  title="EX 2: FINAL Exam"
                  description=""
                  examSlug="/cmsi-3510/ex2"
                />
              </Standard>
              */}
          </Sheet>
        </Sheet>
      </Sheet>
      <Footer />
    </>
  )
}
