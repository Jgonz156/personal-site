import { Chip, Divider, Sheet } from "@mui/joy"
import Footer from "../../../components/footer"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import CourseNavBar from "../components/course-nav-bar"
import AssignmentCard from "../components/assignment-card"
//import ExamCard from "../components/exam-card"
import NotesCard from "../components/notes-card"
import Standard from "../components/standard"
import Speak from "../components/speak"

export default function CMSI5850() {
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
          courseName="CMSI 5850: Programming Language Foundations"
          courseNumber={5850}
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
              number={1}
              title="Theory, Logic, and Math"
              description="In this standard we will investigate 4 major aspects of learning about programming languages: The study itself, the major theories of computer science it represents, the foundational math its built on, and the logic that it represents."
            >
              <NotesCard
                title="The Study of Programming Languages"
                description="In these notes we will cover the basics of what a programming language is, the different types of programming languages, their many constituent components, and the meta aspects we use to evaluate them."
                notesSlug="/cmsi-5850/the-study-of-programming-languages"
                sectionRecordings={[
                  {
                    url: "https://lmula.zoom.us/rec/share/wDVHaa0UTzgHlK62gKl7inWJB3NqtQqwRz0KHvika5NZO25IYym6LoMSQhZc38bS.Oai9Yh1kdPT4i4SB",
                    buttonText: "Audio Recording",
                  },
                ]}
              />
              <NotesCard
                title="Theories in Computer Science"
                description="In these notes we will cover the major theories of computer science. This includes Language, Automata, Computability, and Complexity Theory."
                notesSlug="/cmsi-5850/theories-in-computer-science"
                sectionRecordings={[
                  {
                    url: "https://lmula.zoom.us/rec/share/ZipenMRIxbpF7uodT5oK3f-3GbAzyWoAfJXsjdkynckrZJAtqznUWJn6pLzS7YWv.jGzunmjIEcOVkEVA",
                    buttonText: "Class Recording",
                  },
                ]}
              />
              <NotesCard
                title="Logic"
                description="In these notes we will cover a wide basis of logic. This includes different Modal logics based on Higher order Classical Logic. We will also cover important measures of logical systems such as soundness, completeness, and decidability."
                notesSlug="/cmsi-5850/logic"
                sectionRecordings={[
                  {
                    url: "https://lmula.zoom.us/rec/share/HLB-CWGlc7FSiWoUh4ZvE1MglBdfKA-_nBO7c4Sd0L1wRTCERATx7HUHQIe_a4mj.0qw_jAYuTQMJb68W",
                    buttonText: "Class Recording",
                  },
                  {
                    url: "https://lmula.zoom.us/rec/share/yRldtFSKZLC2L3BMDQBS7hE7NptYZt3G66j-o-e-eOJXdX5WTTXejXMVEAB0Px0L.tfpo9P0k1ZTOk0st",
                    buttonText: "Helper Video",
                  },
                ]}
              />
              <NotesCard
                title="Foundations of Mathematics"
                description="In these notes we will cover the foundational discrete mathematics that are used in computer science. This includes Set Theory, Relations, Functions, and more."
                notesSlug="/cmsi-5850/foundations-of-mathematics"
                sectionRecordings={[
                  {
                    url: "https://lmula.zoom.us/rec/share/g89z2nwqVnbZYRwAxOquW4RFAo4gTxG8NRZzl7V3Ho6-aK8zV13msI5l_agCmSci.Ny09bw5nGOuxKBLH",
                    buttonText: "Class Recording",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 1: Digging to Bedrock"
                description="In this homework you will get practice all the foundational tools (Sets, Functions, Numbers, Logic) we need to build up our future formal mechanisms that define Programming Languages."
                assignmentSlug="/cmsi-5850/hw1"
                homeworkHelpRecordings={[
                  {
                    buttonText: "Answers",
                    url: "/cmsi-5850/hw1-ans",
                  },
                ]}
              />
            </Standard>

            <Standard
              number={2}
              title="Language Theory"
              description="In this standard we will investigate the foundation of languages through generative and recognition based techniques."
            >
              <NotesCard
                title="Language Theory"
                description="In this lecture we recap the fundamental components of a language and use it as a spring board to introduce new tools
                for formally defining the utterances that make them up. This includes Generative techniques like Generative Grammars and Recognition techniques like Finite Automata."
                notesSlug="/cmsi-5850/language-theory"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/JJNAARUw8j-5u9tbDPTOGxNvIlAzmtROVqKGK-yB59t9tALqdIb7lS-r5LwlUJsJ.mmkHOxAmYp2hzk7B",
                  },
                ]}
              />

              <NotesCard
                title="Syntax"
                description="In this lecture we perform a deep dive into the study of Syntax. We directly use CFGs for building
                 up our programming languages as opposed to formal ones. We'll see how syntax defines Lexical and Phrase structures, ASTs, CSTs, and more!"
                notesSlug="/cmsi-5850/syntax"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/9sfzpX4g9uLK7FM90CniOf03-dE1vhTSwYCb_FGAULaHOWvbRYvACQ09y2Au4s4d.Js18zfX0cbHMavVd",
                  },
                  {
                    buttonText: "Video Recording",
                    url: "https://lmula.zoom.us/rec/share/WbVlyDl52PECsVgGy5Bw9UHXCQk2V3JvH4Cn7OCjcwMLzxLVmpF7qCAOVo51SI4y.IP7ZtG_SMP8_m4Be",
                  },
                ]}
              />

              <NotesCard
                title="Semantics"
                description="In this lecture we build on our skills creating, organizing, and delineating between our utterances, we can now see how to
                 assign them meaning! In Semantics we will investigate the many formal mechanisms for assigning meaning to our Syntax. This includes 
                 different versions of Operational and Denotational Semantics."
                notesSlug="/cmsi-5850/semantics"
                sectionRecordings={[
                  {
                    buttonText: "Video Recording",
                    url: "https://lmula.zoom.us/rec/share/FwGAv46tr5O9iam-dlbRA9YygN4ZOcz4r6A24LjxVp1L6Ku10bOp74g7laV6XQe4.T5jMbQ4KeI6O_RtM",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 2: Syntax R Us"
                description="In this homework you will get practice with grammars, ASTs, and error checking!"
                assignmentSlug="/cmsi-5850/hw2"
                homeworkHelpRecordings={[
                  {
                    buttonText: "Answers",
                    url: "/cmsi-5850/hw2-ans",
                  },
                ]}
              />
            </Standard>

            <Standard
              number={3}
              title="Syntax"
              description="In this standard we will take the previously learned language theory as a formalization tool
              for creating processes to standardize our approach to learning and making programming language syntax."
            >
              <NotesCard
                title="Ohm"
                description="In these notes a full, top-to-bottom, coverage of the Ohm Js library is given. This includes the syntax, the rules, the semantics, and the many tools that can be used to create and manipulate grammars."
                notesSlug="/cmsi-5850/ohm"
              />

              <NotesCard
                title="Astro"
                description="In these notes is a case-study of the Astro programming language. We will use it as a real-world example of how to put grammars, ASTs, and Semantics into practice."
                notesSlug="/cmsi-5850/astro"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/nmHIGbna8phlXuNAYUELQiLK7kwl_Nf2h8sGCplKJ97C34PIOaO0pQtA4-eb4Meb.uWLPwAIgq2E1gG8X",
                  },
                ]}
              />

              <NotesCard
                title="Bella"
                description="In these notes is another case-study. This time for the Bella programming language. We will use it as a real-world example of how handle a syntactically and semantically more complex use case for our tools."
                notesSlug="/cmsi-5850/bella"
              />

              <NotesCard
                title="Operational Semantics"
                description="In this lecture we perform a deep dive into the operational approach of defining the meaning of programs. This includes 3 different major approaches called COS, SOS (small-step), and Natural Semantics (Big-Step)."
                notesSlug="/cmsi-5850/operational-semantics"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/BznVBBZJG1YxmxhXbEaW37e6OqxAvfStlRMFpmGBW3tS1BIX7BMpIE1a71OcFom6.GgDuTkUvy9VPTGvP",
                  },
                ]}
              />
              <NotesCard
                title="Denotational Semantics"
                description="In this lecture we take a look at a denotational approach of defining the meaning of programs. This includes defining syntactic and semantics domains and the functions that map between them."
                notesSlug="/cmsi-5850/denotational-semantics"
                sectionRecordings={[
                  {
                    buttonText: "Last Class Recording!",
                    url: "https://lmula.zoom.us/rec/share/XN5KZ2qCNlPXW9G-szmNbgd6nMAtc86niC7HNCQjoAdhI-CPFQpPdPeKQet1Gwk2.qVZIxxmMcEN3PPv0",
                  },
                ]}
              />
              <NotesCard
                title="Lambda Calculus"
                description="In this lecture, we walk in the footsteps of Alonzo Church (Alan Turing's PhD advisor) and investigate a formal theory for functions. Church's formal theory is called the lambda calculus and seeks to define all of mathematics formally with only functions. (Take that Set Theory!)"
                notesSlug="/cmsi-5850/lambda-calculus"
                sectionRecordings={[
                  {
                    buttonText: "Class Recording",
                    url: "https://lmula.zoom.us/rec/share/dD23eJ_bLAW9tsefxz_p6gKmp0vcpb4PeubSdI2C9h0XmRZ7OUgwfdpxpIVUuBBL.yU58pRMNadlOCLWP",
                  },
                  {
                    buttonText: "Class Recording - Continued",
                    url: "https://lmula.zoom.us/rec/share/1ZFG_lGP_p8VVmXEscZg9Bxk_TdoW-cAaZ_6BGxMDVQfoXaeCV3qokNwEtj3zyUe.QC-AIBoLxd-7I2Ir",
                  },
                ]}
              />
              <AssignmentCard
                title="HW 3: Do Semantics Dream of Electric Lambdas?"
                description="In this homework we practice the Lambda Calculus, its reductions, and its properties. We also practice writing Natural (Big-Step) and Structural (small-step) operational semantics."
                assignmentSlug="/cmsi-5850/hw3"
                homeworkHelpRecordings={[
                  {
                    buttonText: "Answers",
                    url: "/cmsi-5850/hw3-ans",
                  },
                ]}
              />
            </Standard>
            {/* 
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
                assignmentSlug="/cmsi-2820/hw4"
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
                notesSlug="/cmsi-2820/ln23"
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
  )
}
