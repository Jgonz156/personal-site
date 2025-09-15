import { Chip, Divider, Sheet } from "@mui/joy";
import Footer from "../../../components/footer";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CourseNavBar from "../components/course-nav-bar";
import AssignmentCard from "../components/assignment-card";
import ExamCard from "../components/exam-card";
import NotesCard from "../components/notes-card";
import Standard from "../components/standard";
import Speak from "../components/speak";
//import ActivityCard from "../components/activity-card"

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
                    url: "https://lmula.zoom.us/rec/share/kjMnUIcFQVQ7QrMh5UrnymAG0V095yx8-TWOHypDAZdBDLL_S49LlAve2vn2SEZy.I_AsMpWdjIhr2-eO",
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
                    url: "https://lmula.zoom.us/rec/share/vIHJBrCLXM8ebcnX31HA740Zb4qvQVLnKvDBmsBWG3grlpuCrE1VB-1JKpSnorix.LZcOx0vuDeDf4pIA",
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
                    url: "https://lmula.zoom.us/rec/share/A3hNYuklxD_Ta0IXrOACt82YzZKSP_v_DUH7_GQ93mqcVNNCujlsffNezt-kj24K.uSrxcSad1PmCMNCE",
                  },
                ]}
              />

              <NotesCard
                title="LN 5: Optimal Struct Structure"
                description="In this lecture we round off our foundational knowledge of Rust itself with structs, traits, and lifetimes. We investigate how they interact with one another to create a memory safe and comprehensive OOP system."
                notesSlug="" //"/cmsi-3510/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/OQI117FLojWHMdFLc3XEUH69yrz7lO9EgftO9ZJv7LAEfzHR3DmkXlOblkh-DcY.VfsxXO-aDToMQNUY",
                  },
                ]}
              />
              {/*
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
              */}
            </Standard>
            {/*
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
            */}
          </Sheet>
        </Sheet>
      </Sheet>
      <Footer />
    </>
  );
}
