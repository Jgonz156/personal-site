import { DateTime } from "luxon"
import CourseBox from "../../components/course-box"
import CoursePage from "../../components/course-page"
import DirectoryTree from "../../components/directory-tree"
import DueDateCalendar from "../../components/due-date-calendar"
import LinkButton from "../../components/link-button"
import QuestionBox from "../../components/question-box"
import Speak from "../../components/speak"
import TitleBox from "../../components/title-box"
import TopicBox from "../../components/topic-box"
import TopicBreak from "../../components/topic-break"
import { MathJax } from "better-react-mathjax"
import SimpleGraph from "../../components/simple-graph"

const HW_BS_WRITTEN_TURN_IN_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802249/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277"
const HW_GH_ASSIGNMENT_LINK = "https://classroom.github.com/a/k0J0EtQ3"
const HW_BS_PROGRAMMING_TURN_IN_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802250/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277"
const HW_BS_OPTIONAL_TURN_IN_LINK =
  "https://brightspace.lmu.edu/d2l/le/calendar/283545/event/802252/detailsview?searchString=&year=2025&month=8&day=27&typefilterguid=c103f27d-8e7a-4296-9d19-7f08175c8277"

export default function Homework6() {
  return (
    <CoursePage
      type="homework"
      courseName="CMSI 2820: Discrete Mathematics for CS"
      courseNumber={2820}
    >
      <CourseBox>
        <TitleBox title="HW6: (Warning: Graphic Content)" />
        <DueDateCalendar dueDate={DateTime.local(2024, 12, 13, 23, 59)} />
        <TopicBox
          topics={[
            "Graph Theory",
            "Special Graphs",
            "Isomorphism",
            "Graph Operations",
          ]}
        />
        <Speak></Speak>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Written Section" quote="Points: 70" />
        <QuestionBox qid={"Q1"} points={"10 total"}>
          When Euler was young he visited Königsberg and saw seven magnificent
          bridges. He came up with a game that we investigated in class, can you
          find a way to cross every bridge only once? We saw that in Königsberg
          this could not be done, however an interesting note is that in modern
          day Kaliningrad it can be due to some "remodeling" that took place. In
          this problem we will get practice with "Euler's Game" on these
          "cities" and their "bridges"! Below, give the path that uses every
          edge only once or state why it is impossible.
          <QuestionBox qid={"Q1 a"} points={"2"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "A" },
                  { name: "B" },
                  { name: "C" },
                  { name: "D" },
                  { name: "E" },
                ],
                links: [
                  { source: "A", target: "E" },
                  { source: "B", target: "E" },
                  { source: "C", target: "E" },
                  { source: "D", target: "E" },
                ],
              }}
            />
          </QuestionBox>
          <QuestionBox qid={"Q1 b"} points={"3"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "A" },
                  { name: "B" },
                  { name: "C" },
                  { name: "D" },
                  { name: "E" },
                  { name: "F" },
                  { name: "G" },
                ],
                links: [
                  { source: "A", target: "B" },
                  { source: "A", target: "C" },
                  { source: "C", target: "D" },
                  { source: "D", target: "B" },
                  { source: "C", target: "E" },
                  { source: "E", target: "D" },
                  { source: "E", target: "F" },
                  { source: "E", target: "G" },
                  { source: "D", target: "G" },
                ],
              }}
            />
          </QuestionBox>
          <QuestionBox qid={"Q1 c"} points={"5"}>
            <MathJax>{`$$
            G = (V, E) \\quad V = \\{A, B, C, D\\} \\quad E = \\{\\{A, B\\}, \\{A, C\\}, \\{A, D\\}, \\{B, C\\}, \\{D, C\\}\\}
            $$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <QuestionBox qid={"Q2"} points={"10 total"}>
          When two graphs are "structurally" similar we say they are isomorphic
          to one another. This means that the two graphs have the same number of
          vertices and edges, and the edges are connected in the same way. This
          is done via a labelling argument that models pair-making. In the
          following sub-problems, investigate whether the two graphs are
          isomorphic to one another.
          <QuestionBox qid={"Q2 a"} points={"2"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "A" },
                  { name: "B" },
                  { name: "C" },
                  { name: "D" },
                  { name: "E" },
                  { name: "F" },
                  { name: "G" },
                  { name: "H" },
                ],
                links: [
                  { source: "A", target: "B" },
                  { source: "B", target: "C" },
                  { source: "C", target: "D" },
                  { source: "E", target: "F" },
                  { source: "F", target: "G" },
                  { source: "G", target: "H" },
                  { source: "H", target: "E" },
                ],
              }}
            />
          </QuestionBox>
          <QuestionBox qid={"Q2 b"} points={"3"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "A" },
                  { name: "B" },
                  { name: "C" },
                  { name: "D" },
                  { name: "E" },
                  { name: "F" },
                  { name: "G" },
                  { name: "H" },
                ],
                links: [
                  { source: "A", target: "B" },
                  { source: "B", target: "C" },
                  { source: "C", target: "D" },
                  { source: "D", target: "B" },
                  { source: "E", target: "F" },
                  { source: "F", target: "G" },
                  { source: "G", target: "H" },
                  { source: "G", target: "E" },
                ],
              }}
            />
          </QuestionBox>
          <QuestionBox qid={"Q2 c"} points={"5"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "A" },
                  { name: "B" },
                  { name: "C" },
                  { name: "D" },
                  { name: "E" },
                  { name: "F" },
                  { name: "G" },
                  { name: "H" },
                  { name: "I" },
                  { name: "J" },
                ],
                links: [
                  { source: "A", target: "C" },
                  { source: "A", target: "D" },
                  { source: "A", target: "E" },
                  { source: "B", target: "C" },
                  { source: "B", target: "D" },
                  { source: "B", target: "E" },
                  { source: "F", target: "H" },
                  { source: "F", target: "I" },
                  { source: "F", target: "J" },
                  { source: "G", target: "H" },
                  { source: "G", target: "I" },
                ],
              }}
            />
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END LN20" />
        <QuestionBox qid={"Q3"} points={"10 total"}>
          Connected and disconnected graphs are those that are defined by the
          ability to express them as a Graph Union or not. Formally, graphs are
          an ordered pair of sets and to display a graph as disconnected more
          clearly, we write them in terms of their connected components. Express
          the following graphs formally as a union of two graphs or as normal.
          <QuestionBox qid={"Q3 EX"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "A" },
                  { name: "B" },
                  { name: "C" },
                  { name: "D" },
                ],
                links: [
                  { source: "A", target: "B" },
                  { source: "C", target: "D" },
                ],
              }}
            />
            <MathJax>{`$$
            \\text{Answer: }(\\{A, B\\}, \\{\\{A, B\\}\\}) \\cup (\\{C, D\\}, \\{\\{C, D\\}\\})
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q3 a"} points={"2"}>
            <SimpleGraph
              graph={{
                nodes: [{ name: "A" }, { name: "B" }, { name: "C" }],
                links: [{ source: "A", target: "B" }],
              }}
            />
          </QuestionBox>
          <QuestionBox qid={"Q3 b"} points={"3"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "A" },
                  { name: "B" },
                  { name: "C" },
                  { name: "D" },
                ],
                links: [
                  { source: "A", target: "B" },
                  { source: "A", target: "C" },
                  { source: "A", target: "D" },
                  { source: "B", target: "C" },
                  { source: "B", target: "D" },
                  { source: "C", target: "D" },
                ],
              }}
            />
          </QuestionBox>
          <QuestionBox qid={"Q3 c"} points={"5"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "A" },
                  { name: "B" },
                  { name: "C" },
                  { name: "D" },
                ],
                links: [],
              }}
            />
          </QuestionBox>
        </QuestionBox>
        <QuestionBox qid={"Q4"} points={"10 total"}>
          We saw a number of Graph operations in class that can be used to
          create new graphs from old ones. In the following problem, you are
          given a graph and are asked to perform a number of operations on it.
          Draw the resulting graph.
          <QuestionBox qid={"Q4 a"} points={"2"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "a" },
                  { name: "b" },
                  { name: "c" },
                  { name: "d" },
                  { name: "e" },
                  { name: "f" },
                  { name: "g" },
                ],
                links: [
                  { source: "a", target: "b" },
                  { source: "b", target: "c" },
                  { source: "c", target: "d" },
                  { source: "d", target: "e" },
                  { source: "e", target: "f" },
                  { source: "f", target: "a" },
                  { source: "g", target: "f" },
                  { source: "g", target: "e" },
                  { source: "g", target: "b" },
                  { source: "g", target: "c" },
                ],
              }}
            />
            Perform the following operations on the graph above:
            <MathJax>{`$$\\begin{matrix}
            G-a \\\\
            G-\\{g,b\\} \\\\
            G~\\backslash~\\{g,e\\}
            \\end{matrix}$$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q4 b"} points={"3"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "a" },
                  { name: "b" },
                  { name: "c" },
                  { name: "d" },
                  { name: "e" },
                  { name: "x" },
                  { name: "y" },
                  { name: "z" },
                ],
                links: [
                  { source: "a", target: "e" },
                  { source: "b", target: "e" },
                  { source: "c", target: "e" },
                  { source: "d", target: "e" },
                  { source: "x", target: "y" },
                  { source: "y", target: "z" },
                ],
              }}
            />
            NOTE: Graph G is made up of "a" through "e" and graph L "x" through
            "y". Perform the following operations on the graph above:
            <MathJax>{`$$
            G \\cup L
            $$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q4 c"} points={"5"}>
            <SimpleGraph
              graph={{
                nodes: [
                  { name: "a1" },
                  { name: "b1" },
                  { name: "b2" },
                  { name: "b3" },
                  { name: "b4" },
                  { name: "c1" },
                  { name: "c2" },
                  { name: "c3" },
                  { name: "c4" },
                ],
                links: [
                  { source: "a1", target: "b1" },
                  { source: "a1", target: "b2" },
                  { source: "a1", target: "b3" },
                  { source: "a1", target: "b4" },
                  { source: "b1", target: "b2" },
                  { source: "b2", target: "b3" },
                  { source: "b3", target: "b4" },
                  { source: "b4", target: "b1" },
                  { source: "c1", target: "b1" },
                  { source: "c2", target: "b2" },
                  { source: "c3", target: "b3" },
                  { source: "c4", target: "b4" },
                ],
              }}
            />
            Perform the following operations on the graph above:
            <MathJax>{`$$\\begin{matrix}
            \\text{On G vertex cleave a1} \\\\
            G~\\backslash~\\{b1, b2\\} \\\\
            G~\\backslash~\\{b3, b4\\} \\\\
            \\end{matrix}$$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END LN21" />
        <QuestionBox qid={"Q5"} points={"10 total"}>
          Graphs can take on different properties and characteristics that can
          alter there visual representation. These "special" graphs can be
          complete, bipartite, tripartite, n-partite, etc. In the following
          problem you are asked to draw a graph the adheres to the given
          properties.
          <QuestionBox qid={"Q5 a"} points={"1"}>
            <MathJax>{`$$\\begin{matrix}
            \\text{Draw } k_{5} \\\\
            \\end{matrix}$$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q5 b"} points={"1"}>
            <MathJax>{`$$\\begin{matrix}
            \\text{Draw } k_{1,2} \\text{(With all possible edges)} \\\\
            \\end{matrix}$$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q5 c"} points={"3"}>
            <MathJax>{`$$\\begin{matrix}
            \\text{Draw } k_{1,1,1} \\text{(With all possible edges)} \\cup k_{3} \\\\
            \\end{matrix}$$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q5 d"} points={"5"}>
            <MathJax>{`$$\\begin{matrix}
            \\text{Draw a Hamiltonian Graph of order and size 8}
            \\end{matrix}$$`}</MathJax>
          </QuestionBox>
        </QuestionBox>
        <TopicBreak title="END LN22" />
        <QuestionBox qid={"Q6"} points={"10 total"}>
          Trees and forests are special types of graphs that are cycle free. In
          the following problem you will be asked to argue in your own words why
          certain statements are true or false.
          <QuestionBox qid={"Q6 a"} points={"2"}>
            There is a tree of order 8 and size 10.
          </QuestionBox>
          <QuestionBox qid={"Q6 b"} points={"3"}>
            There is a forrest with 3 connected components comprised of the
            following:
            <MathJax>{`$$\\begin{matrix}
            k_{3} \\\\
            k_{1,1} \\\\
            (\\{A,B\\},\\{\\})
            \\end{matrix}$$`}</MathJax>
          </QuestionBox>
          <QuestionBox qid={"Q6 c"} points={"5"}>
            For all trees of order n and size n-1, there is a way to add an edge
            that leaves the tree acyclic.
          </QuestionBox>
        </QuestionBox>
        <QuestionBox qid={"Q7"} points={"10 total"}>
          Trees are sometimes investigated as the way to span an area minimally
          (or equivalently, the way to connect all the vertices with the fewest
          edges). This leads to a very important problem known as the "Minimum
          Spanning Tree" problem. Describe the problem in your own words and
          then solve a small example to illustrate your description.
        </QuestionBox>
        <TopicBreak title="END LN23" />
        <LinkButton color="success" to={HW_BS_WRITTEN_TURN_IN_LINK}>
          Written HW6 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox title="Programming Section" quote="Points: 30" />
        <DirectoryTree
          filesAsJSON={{
            "CMSI-2820-HW6": {
              ".gitignore": <></>,
              "README.md": <></>,
              "cycles.py": <></>,
              "prim.py": <></>,
              "kruskal.py": <></>,
              "boruvka.py": <></>,
              "test_rangers.py": <></>,
            },
          }}
        />
        <Speak>
          As a refresher, here is the helper video that goes from complete start
          to finish for the process of receiving, setting up, and turning in
          your programming portion of the HW.
        </Speak>
        <LinkButton
          color="success"
          to="https://lmula.zoom.us/rec/share/LHMwk2fFto5pKnfMEKK5ZBdiwkRO0WacAkDyfbdqMrDz8Eo9dwyFlnYq5a_I8iX3.aa-YDE0MpCpp2sK8"
        >
          Helper Video
        </LinkButton>
        <Speak>
          Linked below is the GitHub Classroom assignment link and the
          Brightspace turn in link both as buttons
        </Speak>
        <LinkButton color="success" to={HW_GH_ASSIGNMENT_LINK}>
          GitHub Assignment
        </LinkButton>
        <LinkButton color="success" to={HW_BS_PROGRAMMING_TURN_IN_LINK}>
          Programming HW6 Turn In
        </LinkButton>
      </CourseBox>
      <CourseBox>
        <TitleBox
          title="Optional Section For Combinatorics"
          quote="Points: 20"
        />
        <Speak>
          As with the other creative endeavors from the previous Optional HW's,
          integrate your learning into a real world event/experience/memory!
          (However always remember that you can work out an alternate creative
          endeavour if you want to involve your hobbies! You can make creative
          works in any form such as games, drawings, paintings, dioramas,
          sculptures, videos, fake blogs, memes, anything!) (Just make sure to
          talk to me first!)
        </Speak>
        <Speak>
          The study of combinatorics, while not defined explicitly, is about
          counting. Whether its counting permutations, combinations, choices, or
          anything else, combinatorics is about understanding the large breadth
          of options before us. In this optional, I would like you to examine
          the combinatorics of your hobby! Part of what makes our hobbies so
          engaging and interesting is the number of options to explore. Wether
          its how many things we can construct, the number of experiences that
          are possible, or even just how often we can engage with it.
        </Speak>
        <Speak>
          With this in mind, I would like you to find the direct number that
          represents the number of combinations/permutations for something in
          your hobby. Just how expressive is that element of your hobby? For
          instance, if you write sheet music, how many different 10 note songs
          can be made? If you cook food, how many different meals can be made
          using just 4 ingredients? If you are interested in stocks, how many
          different "good" ways can you invest $1000?
        </Speak>
        <Speak>
          To help ground this investigation, i'll provide two examples. The
          first example stems from a story driven video game I played about a
          year ago called Detroit Become Human. This game involves a very
          complex net of interconnected/branching story lines and decisions to
          make. The game has such an extensive number of choices that it uses
          trees to display the possible outcomes of the game. An interesting
          investigation would be to solve the following problem. Given that I
          only take "pacifist" actions the entire game, how many choices can be
          considered "pacifist"? How many different story ending do I still have
          access to? This optional is fulfilled by providing an explanation of
          the process I followed to solve this problem. This would include a
          strong definition for what a "pacifist" choice is, a clear explanation
          of how I counted the number of choices, and a final answer to the
          problem.
        </Speak>
        <Speak>
          The second example is about wardrobes. Do you ever wake up feeling
          like you "have nothing to wear". Trying to make "fashionable" outfits
          for the day is a very complex problem and is very personal! An
          interesting investigation would be to find the number of outfits I can
          actually make. By altering, or removing all together, the
          "fashionable" requirements, how does your number of outfits change?
          This optional is fulfilled by providing an explanation of completing
          this investigation. This would include a strong definition for what a
          "fashionable" outfit is, a clear explanation of how I counted the
          number of outfits, and a final answer to the problem.
        </Speak>
        <Speak>
          You will not be graded on how high of a number you get, but rather the
          quality of your explanation and the clarity of your process.
        </Speak>
        <Speak>
          Once you have completed your investigation, you can turn it in via
          brightspace with the button below! If you have any questions about
          this optional feel free to ask me!
        </Speak>
        <LinkButton color="success" to={HW_BS_OPTIONAL_TURN_IN_LINK}>
          Optional HW5 Turn in
        </LinkButton>
      </CourseBox>
    </CoursePage>
  )
}
