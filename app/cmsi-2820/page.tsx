import AssignmentCard from "@/components/course/assignment-card"
import CourseNavBar from "@/components/course/course-nav-bar"
import ExamCard from "@/components/course/exam-card"
import NotesCard from "@/components/course/notes-card"
import Speak from "@/components/course/speak"
import Standard from "@/components/course/standard"
import Footer from "@/components/global/footer"
import { Chip, Divider, Sheet, Table } from "@mui/joy"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"

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
        <CourseNavBar />
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
          <Table>
            <thead>
              <tr>
                <th style={{ width: "5%" }}></th>
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "15%" }}>Standard</th>
                <th style={{ width: "50%" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <Standard
                number={0}
                title="Syllabus"
                description="This standard is here to familiarize yourself with the layout
                  of course information! It is not graded for quality but
                  demonstrates where and how information is accessed! Clicking
                  on the chevron in this row will dropdown the relevant
                  information for the standard that is being covered in class."
              >
                <NotesCard
                  title="LN 0: Reading Course Material!"
                  description="Here is a sample of what the lecture notes will look
                            like! This one just explains the color coding I use
                            for information and displays the small interactive
                            modules I might have throughout the notes."
                  notesSlug="/cmsi-2820/ln0"
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
                  notesSlug="/cmsi-2820/ln1"
                  sectionRecordings={[
                    {
                      buttonText: "Section 1 Video",
                      url: "https://lmula.zoom.us/rec/share/PLwKIyzTMabBtCxm-aT-7vswCLzer2D1mT-xySwyg6gL9K6m9aqzRo6F14o2zb4R.AFLsJSASj4l4z3LW?startTime=1724950470000",
                    },
                    {
                      buttonText: "Section 2 Video",
                      url: "https://lmula.zoom.us/rec/share/jP73Zfg7O5sNzdquC72oUJ-1tPPjWPAhLB6S2Pxq4amaWcGmbxgZ66HsV0zPHOOo.tG4mpP4ukk7WgvFT?startTime=1724964485000",
                    },
                    {
                      buttonText: "Section 3 Video",
                      url: "https://lmula.zoom.us/rec/share/Tk5oWLFy66y96M5gOnO9Zp2E--QOQYPtkCt4skZXSw0qukH5q3IdQnVyz2VJwyp2.Hsgmo0dA0SOOO4zR?startTime=1724979866000",
                    },
                  ]}
                />

                <NotesCard
                  title="LN 2: Making Logical Connections"
                  description="This lecture will be an introduction to 
                  intuitionistic logic more formally. We will cover propositions, their 
                  variables, compound formulas, and logical connectives."
                  notesSlug="/cmsi-2820/ln2"
                  sectionRecordings={[
                    {
                      buttonText: "Section 1 Video",
                      url: "https://lmula.zoom.us/rec/share/fYWflXiG0AQXlPMc-euVOauehDFiDyteNmdSggFmGXySfoU_sC_0dt4iGNb0fwTL.FLWNuYlzW16_IRRX?startTime=1725382524000",
                    },
                    {
                      buttonText: "Section 2 Video",
                      url: "https://lmula.zoom.us/rec/share/3zceh-ULXuGwuRHuwuRoBpk14_gD9a_7Y9_EvZ4xyqMvH9Hx2nhzrAp6FYnezKxh.YkXxb-iXG6SHTVqA?startTime=1725396418000",
                    },
                    {
                      buttonText: "Section 3 Video",
                      url: "https://lmula.zoom.us/rec/share/Yf2GeeYwf3JFYh8tPNIBDuKbziJINqM-wloM7VWSzFII2qQ5EWhSfEULZDQLZzE.QVTY5ZR5896GpR53?startTime=1725411758000",
                    },
                  ]}
                />
                <NotesCard
                  title="LN 3: Assumptions Make an Argument out of You and Me"
                  description="This lecture expands on propositional logic by 
                  extending our inferential abilities for each of our logical
                   connectives by exploring Natural Deduction"
                  notesSlug="/cmsi-2820/ln3"
                  sectionRecordings={[
                    {
                      buttonText: "Section 1 Video",
                      url: "https://lmula.zoom.us/rec/share/dUCxOlsnVgN30RaGnVABOG9ROXdCHEPhiO3DnieCOchspc5KHan_EYb6W_FqXp6z.u4qHArf88JxIhk3u?startTime=1725555439000",
                    },
                    { buttonText: "Section 2 Video", url: undefined },
                    {
                      buttonText: "Section 3 Video",
                      url: "https://lmula.zoom.us/rec/share/Rg__u6lYojd0L3PQ_TJh6Gyjq0Ky4-_NozQQ7anGA2TAK1FFrp3hsuN_EDR4uapZ.G1RaYcvHM3MfLBkN?startTime=1725584600000",
                    },
                  ]}
                />
                <AssignmentCard
                  title="HW 1: Think Class! Think!"
                  description="In this homework you will get practice with logical 
                  terminology, evaluating propositions in finite contexts, creating propositional and predicate logic statements, 
                  translating natural language into logic, and natural deduction proofs!"
                  assignmentSlug="/cmsi-2820/hw1"
                />
              </Standard>

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
                  notesSlug="/cmsi-2820/ln4"
                  sectionRecordings={[
                    {
                      buttonText: "Section 1 Video",
                      url: "https://lmula.zoom.us/rec/share/Nnq1vR_A7N0udysBLXGO5i_R1Rw7tCt51aI_qQlTFt0SkLURe_BO3t8kxLID2AGR.ik5kYUMp6v6AXfPM?startTime=1725987844000",
                    },
                    { buttonText: "Section 2 Video", url: undefined },
                    {
                      buttonText: "Section 3 Video",
                      url: "https://lmula.zoom.us/rec/share/dSZvWy6wjuW-AJqTSVBICPpe3nbNuQ4K1C75ibNieCiv23D8hWclWZHJGTK22j5r.k1umb0BaJKrwLxIY?startTime=1726016703000",
                    },
                  ]}
                />

                <NotesCard
                  title="LN 5: Meet The Booleans, Don't Worry There's only Two of Them"
                  description="In this lecture, we begin building up our grasp on types by investigating 0 and 1, better known as the Booleans. We will look at the Booleans algebraically and graphically to discover unqie properties, underlying patterns, and learn what it looks like to investigate within the foundation of Type Theory."
                  notesSlug="/cmsi-2820/ln5"
                  sectionRecordings={[
                    {
                      buttonText: "Section 1 Video",
                      url: "https://lmula.zoom.us/rec/share/NAHDMgiuE48tbICq4YlGrkzlSkfhhkzMSYg1SaSPtQYRgqRDVnhSFsf8rXbo-5z6.cK2Q3xRad8ZNxBFW?startTime=1726160876000",
                    },
                    {
                      buttonText: "Section 2 Video",
                      url: "https://lmula.zoom.us/rec/share/qay0FeEkmNL2ed4_F7GnxcItuvSx3o2GfdXYG0KVUx3Rk85g2UfXk5IrUWKnmS4C.0AVSCeqJT5QcuyI4?startTime=1726173876000",
                    },
                    {
                      buttonText: "Section 3 Video",
                      url: "https://lmula.zoom.us/rec/share/OkdHJey2Y11oJXbmoBT7z3p_uz0bucBrkhT9CE0IG0UB73F9rSYvzzxjUqgeR57h.kTt6m5331rq8T5UF?startTime=1726189501000",
                    },
                  ]}
                />

                <NotesCard
                  title="LN 6: The Integers, The Booleans' Infinite In-laws"
                  description="In this lecture we use the integer type to investigate the larger, hidden world of operators on types. We cover associativity, commutativity, identity, and closure for the integers."
                  notesSlug="/cmsi-2820/ln6"
                  sectionRecordings={[
                    {
                      buttonText: "Section 1 Video",
                      url: "https://lmula.zoom.us/rec/share/uBKHYk01Mb8dvxse5WFs-47eaBpH72XfHHFaPgPGJEv2GYBbcY6jOiUgMtw7ts2H.gHkahQAfPSlDtqqk?startTime=1726592078000",
                    },
                    {
                      buttonText: "Section 2 Video",
                      url: undefined,
                    },
                    {
                      buttonText: "Section 3 Video",
                      url: undefined,
                    },
                  ]}
                />

                <NotesCard
                  title="LN 7: Division without Decimals? Positive Numbers that Add 
                  to Zero? What is this Place?!?"
                  description="In this lecture, we investigate what really drives the Integer type to be so unique. We will be looking at integer division, primes, and modular arithmetic."
                  notesSlug="/cmsi-2820/ln7"
                  sectionRecordings={[
                    {
                      buttonText: "Section 1 Video",
                      url: "https://lmula.zoom.us/rec/share/VcEoNu-g8JPooH3-cGYnk43Irnge4ssGNKcp4Hvw23fi-g9WAtwRl4AsIeuAaj-h.6r84e9a6x5Pg0KYW?startTime=1726765262000",
                    },
                    {
                      buttonText: "Section 2 Video",
                      url: "https://lmula.zoom.us/rec/share/y6aeTwpsdfBMd55omdG9vknGQjT_U9bNaxCWt4xmyH8B9KpuDYX2iXhs6jysTObQ.WfaL-kVTcXFgCpSw?startTime=1726778516000",
                    },
                    {
                      buttonText: "Section 3 Video",
                      url: "https://lmula.zoom.us/rec/share/ncGAMmwVCpCWXPCgmceRLHL07FVA_vD6a31HMEFTUytHkBzHEoGW-00teeoUZt6k.0IlFidW3IJ_OaZcO?startTime=1726794112000",
                    },
                  ]}
                />
                <AssignmentCard
                  title="HW 2: Counting Sheep"
                  description="In this homework you will get practice with the many topics covered in the notes for this standard. This includes the Booleans, the Integers, and the many operations that can be performed on them!"
                  assignmentSlug="/cmsi-2820/hw2"
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
                  description="In this lecture we formally investigate product types in type theory including their properties, operations, and how they are used to build up more complex types."
                  notesSlug="/cmsi-2820/ln8"
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
                  notesSlug="/cmsi-2820/ln9"
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
                  assignmentSlug="/cmsi-2820/hw3"
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
                {/*
                <AssignmentCard
                  title="HW 4: Silence of the Lambdas"
                  description=""
                  assignmentSlug="/cmsi-2820/hw4"
                />
                */}
              </Standard>
              {/*
              <Standard
                number={5}
                title="Combinatorics"
                description="In this standard we will investigate combinations and 
                permutations."
              >
                <NotesCard
                  title="LN 17: Combinatorics 1"
                  description=""
                  notesSlug="/cmsi-2820/ln17"
                />
                <NotesCard
                  title="LN 18: Combinatorics 2"
                  description=""
                  notesSlug="/cmsi-2820/ln18"
                />
                <NotesCard
                  title="LN 19: Combinatorics 3"
                  description=""
                  notesSlug="/cmsi-2820/ln19"
                />
                <NotesCard
                  title="LN 20: Combinatorics 4"
                  description=""
                  notesSlug="/cmsi-2820/ln20"
                />
                <AssignmentCard
                  title="HW 5: Combinatorics!"
                  description=""
                  assignmentSlug="/cmsi-2820/hw5"
                />
              </Standard>
              <Standard
                number={6}
                title="Graph Theory"
                description="In this standard we will investigate the mathematical 
                underpinnings of graph theory."
              >
                <NotesCard
                  title="LN 21: Graph Theory 1"
                  description=""
                  notesSlug="/cmsi-2820/ln21"
                />
                <NotesCard
                  title="LN 22: Graph Theory 2"
                  description=""
                  notesSlug="/cmsi-2820/ln22"
                />
                <NotesCard
                  title="LN 23: Graph Theory 3"
                  description=""
                  notesSlug="/cmsi-2820/ln23"
                />
                <NotesCard
                  title="LN 24: Graph Theory 4"
                  description=""
                  notesSlug="/cmsi-2820/ln24"
                />
                <AssignmentCard
                  title="HW 6: Graph Theory!"
                  description=""
                  assignmentSlug="/cmsi-2820/hw5"
                />
              </Standard>
              <Standard
                number={7}
                title="Set Theory"
                description="In this standard we will investigate the mathematical 
                underpinnings of Set theory."
              >
                <NotesCard
                  title="LN 25: Set Theory 1"
                  description=""
                  notesSlug="/cmsi-2820/ln25"
                />
                <NotesCard
                  title="LN 26: Set Theory 2"
                  description=""
                  notesSlug="/cmsi-2820/ln26"
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
            </tbody>
          </Table>
        </Sheet>
      </Sheet>
      <Footer />
    </>
  )
}
