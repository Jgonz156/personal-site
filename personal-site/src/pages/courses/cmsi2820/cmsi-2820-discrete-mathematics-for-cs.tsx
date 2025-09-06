import { Chip, Divider, Sheet } from "@mui/joy";
import Footer from "../../../components/footer";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CourseNavBar from "../components/course-nav-bar";
import AssignmentCard from "../components/assignment-card";
import ExamCard from "../components/exam-card";
import NotesCard from "../components/notes-card";
import Standard from "../components/standard";
import Speak from "../components/speak";

export default function CMSI2820() {
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
          courseName="CMSI 2820: Discrete Mathematics for CS"
          courseNumber={2820}
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
                notesSlug="/cmsi-2820/ln0"
                sectionRecordings={[
                  {
                    buttonText: "Morning Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/3iEbR7PiI_dBr3oDvLGwqYmSA0qGqs_9kocP4XGCWv5SxRJnvRHelkyE4igMzfiq.nIdDB2ZvC91Qvqro",
                  },
                  {
                    buttonText: "Night Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/9qmFdR3h-5cFv4MjIwiZKEc2m0fJmMeCkdby0Uu-ZEIVtAXdWL1o3K0MaQuNqZgk.1kF7BKtlrqS0rQ6p",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 0: Practicing Homework"
                description="This is a small assignment to get you familiar with
                            the process of receiving and submitting assignments!"
                assignmentSlug="/cmsi-2820/hw0"
              />
              <ExamCard
                title="EX 0: Syllabus"
                description="Exams are an important part of how you communicate
                            your understanding of the material! Here you will
                            take one on the most vital parts of the course
                            syllabus! I promise its not hard."
                examSlug="/cmsi-2820/ex0"
              />
            </Standard>
            <Standard
              number={1}
              title="Logic"
              description="In this standard we will investigate the mathematical
              underpinnings of logical argumentation, deductive reasoning,
              and the symbology that is used to represent these ideas. This
              means taking a brief look at different systems of logic, a deeper
              dive into intuitionistic logic, and what that means for
              propositional and predicate reasoning"
            >
              <NotesCard
                title="LN 1: Information and Its Consequences..."
                description="This lecture will cover the basics of many different 
                systems of logic, where they came from, how they were used, and 
                what it even means to craft a valid line of reasoning."
                notesSlug={""} //"/cmsi-2820/ln1"
                sectionRecordings={[
                  {
                    buttonText: "Morning Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/la1mVbpnFfHVRdVJe_vdt_WHC-LDcuIF4ivMezQHrBq6W-MSLYHbMlDHwSn1fIlr.VSrqNa_WtWEt1VI8",
                  },
                  {
                    buttonText: "Night Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/Us5GGUeYdLSG5WDWjtft6SEZNtD5MkjHSUQpDXcDddv838vIgFSxT7kv0SF4efva.-AdnoFRwX86rah5s",
                  },
                ]}
              />
              <NotesCard
                title="LN 2: Making Logical Connections"
                description="This lecture will be an introduction to 
                  intuitionistic logic more formally. We will cover propositions, their 
                  variables, compound formulas, and logical connectives."
                notesSlug="" //"/cmsi-2820/ln2"
                sectionRecordings={[
                  {
                    buttonText: "Morning Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/5ACLmSUYpzWpazd-ZQ4RqJfYuqh0_sf8DPfsLQMeUD_UfwRIFyEQ14Xt0K1v2tH3.xROcwPRCEZ8r4pMy",
                  },
                  {
                    buttonText: "Night Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/creQEn57bmIyHHDjGKuddsuQCcLlWZ8iGfx6x8yjXZcwhB55_fSBtCiPQ7HDi2b2.fdx39azQk01i5Mke",
                  },
                ]}
              />

              <NotesCard
                title="LN 3: Assumptions Make an Argument out of You and Me"
                description="This lecture expands on propositional logic by 
                  extending our inferential abilities for each of our logical
                   connectives by exploring Natural Deduction"
                notesSlug="" //"/cmsi-2820/ln3"
                sectionRecordings={[
                  {
                    buttonText: "Morning Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/oxiLgZxaAisLZyMTGM6xTv4-94B3EFDjMq5EVFZmyw1vJrcdS673xSf-uyKKZBFJ.rXdaBSVWCIl1rPsT",
                  },
                  {
                    buttonText: "Night Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/LV_VKhAAQjlzb6bFjxJXz2Vz6ttU-2kNJRdrIvsysGYleweYPu4fo5MmFqNpXxJq.mxszqiD1yaT8KECa",
                  },
                ]}
              />

              <AssignmentCard
                title="HW 1: Think Class! Think!"
                description="In this homework you will get practice with logical 
                  terminology, evaluating propositions in finite contexts, creating propositional and predicate logic statements, 
                  translating natural language into logic, and natural deduction proofs!"
                assignmentSlug="/cmsi-2820/hw1"
                //homeworkHelpRecordings={[
                //  {
                //    buttonText: "Answers and Explanations",
                //    url: "https://lmula.zoom.us/rec/share/BqXixRrtgA-gcYEGKF-U4UuFLjRDqBw_CnYjK5zuPwOErfmR5jbmeKPkPnc5t7g.iR2liSP0tOHfH827",
                //  },
                //]}
              />
            </Standard>
            {/*
            <Standard
              number={2}
              title="Numbers"
              description="In this standard we will investigate the mathematical
                  underpinnings of numbers! Yep, you heard me right! We will be 
                  going over the arithmetic of the Booleans and the Integers."
            >
              <NotesCard
                title="LN 4: Primitive Beginnings"
                description="In this lecture we will stroll through a brief history lesson that covers the foundations of mathematics (Set, Category, and Type Theory) and then we will see a small formal introduction to Type Theory"
                notesSlug="" //"/cmsi-2820/ln4"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/CkztfjgKK_68NCSGwAkdgO-a3I7WddLyWAhXSY5laQsAwqMs9CXKweHEl2w8oGZV.BqyxNG51s1wuIG_c",
                  },
                ]}
              />

              <NotesCard
                title="LN 5: Meet The Booleans, Don't Worry There's only Two of Them"
                description="In this lecture, we begin building up our grasp on types by investigating 0 and 1, better known as the Booleans. We will look at the Booleans algebraically and graphically to discover unique properties, underlying patterns, and learn what it looks like to investigate within the foundation of Type Theory."
                notesSlug="/cmsi-2820/ln5"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/0rNh3gTT7xvJRIot2uPsBBfRWFfQRWYE93UQHBbNMt5ym0WZ1jtwUFbag6bl7Oo.Jlbr5DZI_7oIgT1s",
                  },
                ]}
              />

              <NotesCard
                title="LN 6: The Integers, The Booleans' Infinite In-laws"
                description="In this lecture we use the integer type to investigate the larger, hidden world of operators on types. We cover associativity, commutativity, identity, and closure for the integers."
                notesSlug="/cmsi-2820/ln6"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/koUOf8nrpH5_LRUdzEZHYrHW41P8GZCB3303CrxBUvS0M00lOaJa2HE04Q2lwUyr.lSgwwn985OC8Ld2N",
                  },
                ]}
              />

              <NotesCard
                title="LN 7: Division without Decimals? Positive Numbers that Add 
                  to Zero? What is this Place?!?"
                description="In this lecture, we investigate what really drives the Integer type to be so unique. We will be looking at integer division, primes, and modular arithmetic."
                notesSlug="" //"/cmsi-2820/ln7"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/7i9_86GIbu8nRZVx44xT4pP3vE3AnJHO4543WyrhoIiLbcz1nxmPYdoqxBiQkCWu.44k5Cm8slhu2Ms6Z",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 2: Counting Sheep"
                description="In this homework you will get practice with the many topics covered in the notes for this standard. This includes the Booleans, the Integers, and the many operations that can be performed on them!"
                assignmentSlug="/cmsi-2820/hw2"
                homeworkHelpRecordings={[
                  {
                    buttonText: "Answers and Explanations",
                    url: "https://lmula.zoom.us/rec/share/3hFRr2it1PXbG-XgburFJrBgqNH1WbFR-5HLkL8Gntb7c7XFWqxuo0tBMLY7nDOl.6O02MMbeyPAT9ikz",
                  },
                ]}
              />
            </Standard>

            <Standard
              number={3}
              title="Collections"
              description="In this standard we will investigate the mathematical
                  underpinnings of mathematical structures that hold other primitives! 
                  This includes working with tuples, sets, and their many operations."
            >
              <NotesCard
                title="LN 8: Getting Our Types in a Row"
                description="In this lecture we formally investigate tuples (also known as product types in type theory)
                 including their properties, operations, and how they are used to build up more complex types."
                notesSlug="" //"/cmsi-2820/ln8"
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/ZSlLoZv-VMFSJ9LT-ClURz3b3o6qnczv2eakacrfOB7I9kbiMonr68AKMsi-JGQY.mJbD75iYfvZc598k",
                  },
                ]}
              />

              <NotesCard
                title="LN 9: Settling In"
                description="In this lecture we investigate the Tuples older sibling, the Set. We'll investigate it formally by defining it, exploring some innate properties, and a few basic operators."
                notesSlug="" //"/cmsi-2820/ln9"
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/RRnG6wlSbvo8EXS62M6WEH1O1CWkZQ3wT55_nHoAEr7hmEzuDrk21ltPH88HlBsF.f31z5f_N6NeiuR97",
                  },
                ]}
              />
              <NotesCard
                title="LN 10: Settling Down"
                description="We continue our investigation of Sets by practicing some of the many common operations found between them."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/N-FBU7ygSP3JbFiAjtFg9V6HAhrLgZJMBCMNbHL7O5PAXONDov_Doxy2SSBNK46J.QkG1SNcEz-nGM69V",
                  },
                ]}
              />
              <NotesCard
                title="LN 11: Relationship Counseling"
                description="We end our look at Collections by learning about relations. Typically represented as sets of tuples, we will investigate the properties of relationships between instances within a type."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/u1SNLHehsuPm4WK18vCWMix4fCd4LCHFlmAe7sIRL2DkHUp-V1XZ8i21TvGQAd9M.Y2WX7tQz76qAy4I6",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 3: Storage Wars"
                description="In this homework we practice tuples, sets, their operations, and even a little more in the programming portion..."
                assignmentSlug="/cmsi-2820/hw3"
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
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/k37q2Q4dJIqhkJYtbIWPdiL5DjppV2xj1-PfXZUiqXxqvuo0IycAT014ROqN9tDI.iVT4VGhYiyfxmSWm",
                  },
                ]}
              />

              <NotesCard
                title="LN 13: Free Range Variables"
                description="In this lecture we continue our work with Lambdas by investigating how variables interact with functions. We discover being bound and free, how to substitute variables, and how to reduce functions formally using proper substitution."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/RqNhhrFejA0PN0IGrM8vCx6nKhXemjmx_-NnMgdn9qLtTytRsPYhP9ppmc50g8A.jSPzprYITpbWKXGn",
                  },
                ]}
              />
              <NotesCard
                title="LN 14: Supplying and Consuming Lambdas"
                description="In this lecture we start by recapping proper substitution and then officially define the formal alpha, beta, and gamma conversion rules. After we go over some nomenclature for functions and how to identify suppliers, consumers, and the like."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Last Semester Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/M-Q4w9o-9ZwAkkZ8aFQJQln7gLKvVkkAcZOwBCPXQ1R7qLAIM6eo9Hb2oUrYl7RT.53DRR5KWubqPDt1A?startTime=1729011698000",
                  },
                  {
                    buttonText: "Last Semester Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/MBsV4n6c941fnIe9z17qKhz-ZqhQmYp6LROyRc1VKA0TCpdacT4bIHitWxPGhNXb.N-f2cND7NSiCPUZI?startTime=1729025363000",
                  },
                  {
                    buttonText: "Last Semester Section 3 Video",
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
                    buttonText: "Last Semester Section 1 Video",
                    url: "https://lmula.zoom.us/rec/share/HIdQ6-URRZZCuTjhTQcY_DIxZLYHoEVJenFNVgemiQv-e6Ika8mdqAjmeP9R_4V3.mefUEt9tHARLzW4_?startTime=1729184582000",
                  },
                  {
                    buttonText: "Last Semester Section 2 Video",
                    url: "https://lmula.zoom.us/rec/share/81I4FSyqGlphg499OH6K7SGm0GJkNcKzKLyUAG3hewAApI12S5WuKW1qlhp0UMNd.I6Qwggd9GnsSVcDj?startTime=1729198100000",
                  },
                  {
                    buttonText: "Last Semester Section 3 Video",
                    url: "https://lmula.zoom.us/rec/share/tevUmc_LCdP9UZJSXX98LysG5F9x5TEjwQAIv1dL-xbXquUPK-cIRBnF7AvyKse3.6_fBLQ3U4TIzHomt?startTime=1729213895000",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 4: Silence of the Lambdas"
                description="In this homework we practice lambdas, their reductions, their properties, and their creation!"
                assignmentSlug="/cmsi-2820/hw4"
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
                examSlug="/cmsi-2820/ex1"
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
                    buttonText: "Last Semester Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/Znj8oZh4iFYH-55h2IQaCwPJiJKmrj-RfsIybETYR_8765SOA-BhkmR6d4lZtIo3.W_DGK5Rxqa87ymFC?startTime=1729652001000",
                  },
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/UnuJG28F--9trHhmg323C4Bwb_fFWiOjVN5QvZUFBr6vdKURS19DVh8e1YrJbqo5.xjrslAazWYU78mOF",
                  },
                ]}
              />

              <NotesCard
                title="LN 17: Factorialing in Evidence"
                description="In this lecture we will investigate factorials, permutations, and combinations with and without repeats allowed!"
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Last Semester Lecture Video",
                    url: "https://lmula.zoom.us/rec/share/Yl7uACGPQUyKOWb6z11fMeMiEkNR-DBctVPKRQAtZ33AgFcFTdUdJf7xMeamaLAE.txpI1KGSkHbTQret",
                  },
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/XzXNtDLlIyYH7xs7xviknQklAcjryxvuIp0fdQJdop5C0IMwXCL1kV6Dy__sBI9r.LjoqGEdtsbxCQ9q6",
                  },
                ]}
              />
              <NotesCard
                title="LN 18: Double Jeopardy"
                description="In this lecture we investigate Pascal's triangle and many of its hidden properties and patterns. We develop our understanding of combinations using Pascal's Triangle to explore a new proof technique called Double Counting."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/jf1V879kfVv-tQ267L6zqB1Qy0yipn_nnGAsEU0AlhbucafzjSCeMLkJ6IR1gkB9.QeKimwuZyyOot89V",
                  },
                ]}
              />
              <NotesCard
                title="LN 19: Bijection Your Honor!"
                description="In this lecture we learn how to leverage bijective functions to solve an interesting class of combinatorics problems and introduce the pigeonhole principle."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/mAX-CELZ_41JkKGoZvof6gdUOey_dgrDgPfmkfcaGEjbanKWEisYfrpKrX9531gJ._qJDARP3IcALOmcw",
                  },
                  {
                    buttonText: "Pigeonhole Principle Video Skip To 01:01:50",
                    url: "https://lmula.zoom.us/rec/share/pS2cFHtY9itqFQOnR562Uu-MXVYsNFejIjkaKa_QCShu-GOHG8nt0Z9ld7ICybxA.Gs5IBv5YLlRhMTtM?startTime=1730544531000",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 5: Order in the Court!"
                description="In this homework we investigate counting, combinations, permutations, and the many tools and intuitions that can be pulled from them!"
                assignmentSlug="/cmsi-2820/hw5"
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
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/OMtZk2P-o9n1JNoeB3s8LrEMVu7jltKoo5JdzpiCBXI59dZpklt4Jaj0E5L8yow.8wZyq_ugnlYra1Pw",
                  },
                ]}
              />

              <NotesCard
                title="LN 21: Connecting with Nature"
                description="In this lecture we investigate how the alterations to the formal graph definition propagate to change our visuals. We take a look at isomorphisms, connectedness, and the handshaking Lemma."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/a5IHTtaqxUisu3Q1sMtHIbjrJHEtBSkaDyMhc5n6wNnlVU6EXSHogVmjKjXiHOSC.FEf7rYYSxW4f2tuG",
                  },
                ]}
              />

              <NotesCard
                title="LN 22: Looking Over Edges"
                description="In this lecture we take a look at special graphs (Complete, Bipartite, Euler, Hamiltonian) and their special properties. We also take a look at cycles as a useful tool for analyzing graph properties."
                notesSlug=""
                sectionRecordings={[
                  {
                    buttonText: "Class Video",
                    url: "https://lmula.zoom.us/rec/share/5glOexOxHO-Njtau_6WjBd0pSDLZJRLqU9TtU7aQdpnqem6Yd1fJQNlMT00K4h1t.pqhPW_USaJWQS2BZ",
                  },
                ]}
              />

              <NotesCard
                title="LN 23: Spanning the Globe"
                description="In this lecture we cover a few more special graphs in the form of trees and forests. We then end the graph theory unit by investigating minimum spanning trees and how their solutions and structures represent many real-world problems."
                notesSlug="/cmsi-2820/ln23"
                sectionRecordings={[
                  {
                    buttonText: "Last Class Video!",
                    url: "https://lmula.zoom.us/rec/share/o3ZQUz9I48qTurfLe0zJDzKxA5hPgMI9ffJeG3FbGfpyM4TgSRYzW7n6vgf3fcAG.s4Ks3fa_DAK_J73e",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 6: (Warning: Graphic Content)"
                description="In this homework we investigate all things Graph theory! This includes many types of graphs such as complete, bipartite, trees, and forests. We also investigate many of the properties and operations that can be performed such as isomorphisms, connectedness, and cycles."
                assignmentSlug="/cmsi-2820/hw6"
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
                  assignmentSlug="/cmsi-2820/hw5"
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
                  notesSlug="/cmsi-2820/ln25"
                />
                <NotesCard
                  title="LN 28: Games and Systems Architecture Pipelines"
                  description=""
                  notesSlug="/cmsi-2820/ln26"
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
                  examSlug="/cmsi-2820/ex2"
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
