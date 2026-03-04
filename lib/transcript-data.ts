export interface CourseProject {
  name: string
  description: string
  technologies?: string[]
  link?: string
}

export interface TranscriptCourse {
  subject: string
  courseNumber: string
  title: string
  grade: string
  creditHours: number
  qualityPoints: number
  level: "UG" | "GR"
  term: string
  description: string
  projects: CourseProject[]
  crossLink?: string
  languages?: string[]
}

export interface TranscriptDegree {
  id: string
  name: string
  major: string
  minor?: string
  degreeDate: string
  overallGPA: number
  totalCredits: number
  deansListSemesters?: number
  courses: TranscriptCourse[]
}

export interface GeneralEducationCourse {
  subject: string
  courseNumber: string
  title: string
  grade: string
  creditHours: number
  term: string
  description?: string
  projects?: CourseProject[]
  languages?: string[]
}

export const transcript: TranscriptDegree[] = [
  {
    id: "ms",
    name: "Master of Science",
    major: "Computer Science",
    degreeDate: "May 2024",
    overallGPA: 4.0,
    totalCredits: 27,
    courses: [
      {
        subject: "CMSI",
        courseNumber: "696",
        title: "Master's Thesis II",
        grade: "CR",
        creditHours: 3,
        qualityPoints: 0,
        level: "GR",
        term: "Spring 2024",
        description:
          "Continuing research and development of a thesis project for a second semester.",
        projects: [],
        languages: ["Python", "C", "Intel Assembly"],
      },
      {
        subject: "CMSI",
        courseNumber: "6998",
        title: "SS: Computational Biology Seminar",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "GR",
        term: "Spring 2024",
        description:
          "Graduate special studies seminar exploring computational approaches to biological problems.",
        projects: [
          {
            name: "VQE for Predictive Protein Folding",
            description:
              "Cross-listed project with Quantum Computing. Built a React-based interactive tutorial application using MUI for UI components, guiding users through variational quantum eigensolver (VQE) implementation for predictive protein folding on IBM Osaka quantum hardware via Qiskit. Featured vis-network force-directed graphs illustrating biological computing concepts including Levinthal's paradox, codon matching, and the combinatorial optimization landscape of protein conformation search. Demonstrated how molecular Hamiltonians map to quantum circuit ansatz construction for optimal VQE search space while mitigating Barren Plateaus. Embedded Jupyter notebooks provided executable Python examples progressing from combinatorial problems (Vertex Cover) to full VQE protein folding pipelines using NumPy and SciPy for classical pre/post-processing.",
            technologies: ["React", "TypeScript", "MUI", "vis-network", "Python", "Qiskit", "IBM Quantum", "NumPy", "SciPy", "Matplotlib", "Jupyter"],
          },
        ],
        languages: ["JavaScript", "Python"],
      },
      {
        subject: "CMSI",
        courseNumber: "6998",
        title: "SS: Quantum Computing",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "GR",
        term: "Spring 2024",
        description:
          "Graduate special studies seminar on quantum computing principles and algorithms.",
        projects: [
          {
            name: "VQE for Predictive Protein Folding",
            description:
              "Cross-listed project with Computational Biology. Researched variational quantum eigensolvers for predictive protein folding, mapping molecular Hamiltonians to parameterized quantum circuits executed on IBM Osaka hardware via Qiskit. Built a React and MUI interactive tutorial application with vis-network force-directed graphs visualizing protein conformation search spaces, ansatz construction, and Barren Plateau mitigation strategies. Embedded Jupyter notebooks with progressive code examples from combinatorial optimization (Vertex Cover) to full VQE protein folding pipelines, leveraging NumPy and SciPy for classical simulation components.",
            technologies: ["React", "TypeScript", "MUI", "vis-network", "Python", "Qiskit", "IBM Quantum", "NumPy", "SciPy", "Matplotlib", "Jupyter"],
          },
        ],
        languages: ["Python"],
      },
      {
        subject: "CMSI",
        courseNumber: "6999",
        title: "IS: Concatenative Programming",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "GR",
        term: "Spring 2024",
        description:
          "Investigation of concatenative programming languages such as Forth to improve the programmatic efficiency of certain algorithms like Voronoi tessellations. Covered combinators, point-free programming, and programming language theory.",
        projects: [
          {
            name: "Combinator Birds Interpreter",
            description:
              "Mapped the lambda calculus definitions of 40+ combinators from Raymond Smullyan's \"To Mock a Mockingbird\" to JavaScript anonymous functions, including their S/K combinator normal forms. Implemented each bird (Bluebird, Cardinal, Starling, Kestrel, Mockingbird, etc.) as composable higher-order functions with an Ohm.js-based parser for combinator expression evaluation. Tested with Mocha and measured coverage with c8.",
            technologies: ["JavaScript", "Ohm.js", "Mocha", "c8"],
          },
        ],
        languages: ["Forth", "JavaScript"],
      },
      {
        subject: "CMSI",
        courseNumber: "620",
        title: "Database Systems",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "GR",
        term: "Fall 2023",
        description:
          "Fundamental concepts in database technology. Database system structure, semantic data modeling, relational, document, key-value, object-oriented, and graph databases. Formal query languages, integrity, normalization, security, physical database design, indexing and hashing, query processing and optimization, transaction processing, concurrency, and crash recovery.",
        projects: [
          {
            name: "Alternative MySQL Engine Design Analysis",
            description:
              "Comparative analysis of MySQL storage engine architectures and their impact on query execution performance. Benchmarked InnoDB, Federated, Memory, CSV, and other engines using MySQL Workbench, examining trade-offs in B-tree indexing, row-level vs. table-level locking, buffer pool utilization, and query execution plan optimization. Demonstrated how engine selection affects throughput for read-heavy, write-heavy, and mixed workloads with representative SQL query patterns.",
            technologies: ["MySQL", "SQL", "InnoDB", "MySQL Workbench"],
          },
        ],
        languages: ["Python", "JavaScript"],
      },
      {
        subject: "CMSI",
        courseNumber: "695",
        title: "Master's Thesis I",
        grade: "CR",
        creditHours: 3,
        qualityPoints: 0,
        level: "GR",
        term: "Fall 2023",
        description:
          "Research and development of a thesis project in compliance with the Frank R. Seaver College of Science and Engineering Master's Thesis Requirements.",
        projects: [],
        languages: ["Python", "C", "Intel Assembly"],
      },
      {
        subject: "CMSI",
        courseNumber: "6999",
        title: "Modern Approaches to OS Development",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "GR",
        term: "Fall 2023",
        description:
          "Independent graduate study on modern operating systems development techniques and paradigms.",
        projects: [
          {
            name: "Rust User-Level System Calls for Linux",
            description:
              "Extended the Linux kernel system call table with a custom Rust-implemented command, compiled against kernel headers using GCC and Make for kernel module integration. Tested in a QEMU-emulated Ubuntu environment to validate system call registration, user-space invocation via syscall wrappers, and safe FFI boundaries between Rust and the C-based kernel ABI. Managed Rust toolchain and dependencies through Cargo.",
            technologies: ["Rust", "Cargo", "Linux", "C", "GCC", "Make", "QEMU"],
          },
        ],
        languages: ["C", "Rust"],
      },
      {
        subject: "CMSI",
        courseNumber: "583",
        title: "Computability & Complexity",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "GR",
        term: "Summer 2023 Session II",
        description:
          "Introduction to the study of computability and computational complexity. Models for computation such as finite automata, pushdown automata, Turing machines, Post canonical systems, partial recursive functions, and phrase structure grammars. Complexity classes such as P, NP, RP, and NC. NP-Completeness.",
        projects: [
          {
            name: "Complexity Analysis of Real-Time Bidding Algorithms",
            description:
              "Formal resource and algorithmic complexity analysis of real-time bidding (RTB) and micro-bidding systems within programmatic advertising infrastructure. Examined demand-side platform (DSP) and supply-side platform (SSP) architectures, second-price auction mechanisms, and the sub-millisecond latency constraints governing bid computation. Analyzed amortized complexity of bid landscape optimization strategies and constructed formal proofs mapping profitability metrics (click-through rate, return on ad spend) to computational variables for constrained optimization under auction-theoretic frameworks.",
          },
        ],
      },
      {
        subject: "CMSI",
        courseNumber: "662",
        title: "Secure Software Development",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "GR",
        term: "Summer 2023 Session I",
        description:
          "Theoretical foundations and best practices in secure software development. Application of security techniques in all phases of the software lifecycle with emphasis on writing secure software. Threat modeling, cryptography, digital signatures, defense against common attack vectors, web security, and testing best practices.",
        projects: [
          {
            name: "Secure Shopping Cart Application",
            description:
              "Investigated Java-specific design decisions affecting application security in a consumer-facing shopping cart, targeting OWASP Top 10 vulnerabilities. Applied parameterized queries to prevent SQL injection, input sanitization and output encoding to mitigate cross-site scripting (XSS), defensive copying to preserve object invariants, and strict type validation with null-safety patterns. Validated security properties through JUnit 5 test suites covering boundary conditions, malformed input, and adversarial payloads.",
            technologies: ["Java", "JUnit 5"],
          },
          {
            name: "Secure Language Stacks",
            description:
              "Implemented expandable stack data structures in C, C++, and Java to compare language-specific secure memory management patterns. Demonstrated manual heap allocation with malloc/realloc/free and bounds checking in C, RAII via unique_ptr with move semantics and custom exception handling in C++, and Objects.requireNonNull validation with type-safe generics in Java.",
            technologies: ["C", "C++", "Java"],
          },
          {
            name: "Secure Bank Site",
            description:
              "Collaborative project demonstrating cross-site scripting (XSS) attack vectors and session token hijacking in a banking web application. Implemented CSRF token validation and session expiration policies to prevent unauthorized authenticated actions from unattended browser sessions.",
            technologies: ["JavaScript"],
          },
          {
            name: "AES-256-CBC Encrypt/Decrypt Console",
            description:
              "CLI tool implementing AES-256-CBC symmetric encryption and decryption using Node.js's crypto module. Demonstrated proper key derivation, initialization vector (IV) generation, PKCS7 padding schemes, and ciphertext encoding for secure message handling.",
            technologies: ["JavaScript", "Node.js"],
          },
        ],
        languages: ["Python", "JavaScript", "Java", "C", "C++"],
      },
    ],
  },
  {
    id: "bs",
    name: "Bachelor of Science",
    major: "Computer Science",
    minor: "Applied Mathematics",
    degreeDate: "May 2023",
    overallGPA: 3.46,
    totalCredits: 125,
    deansListSemesters: 5,
    courses: [
      {
        subject: "CMSI",
        courseNumber: "4082",
        title: "Senior Thesis II",
        grade: "A",
        creditHours: 4,
        qualityPoints: 16,
        level: "UG",
        term: "Spring 2023",
        description:
          "Authorship and presentation of a paper, backed by the conception, design, and construction of a software project demonstrating mastery of the computer science curriculum.",
        projects: [
          {
            name: "Plumb Language Compiler & Research Paper",
            description:
              "Authored a 13-page research paper examining the intersection of programming language pragmatics and programmer intuition for parallel programming. Investigated how language-level abstractions can better expose shared-resource contention, race conditions, and deadlock potential in threaded programming models. Implemented a companion compiler for the Plumb programming language in pure Java (no external libraries), featuring a handcrafted regex-based tokenization pipeline, recursive-descent parser derived from a formal context-free grammar specification, and abstract syntax tree construction. Validated correctness through JUnit 5 test suites.",
            technologies: ["Java", "JUnit 5"],
          },
        ],
        languages: ["Java"],
      },
      {
        subject: "CMSI",
        courseNumber: "533",
        title: "Data Science",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "UG",
        term: "Spring 2023",
        description:
          "Basic mathematical concepts of data science and their implementation in various programming languages. Methods for obtaining and massaging data. Data life cycle, optimization, cost functions, and stochastic gradient descent.",
        projects: [
          {
            name: "UNICEF Resource Mapping in Brazil",
            description:
              "Built a geospatial clustering pipeline using scikit-learn's K-means implementation to map UNICEF support resources across impoverished regions of Brazil, addressing gaps in official Brazilian government county data for legally unincorporated high-poverty areas. Performed exploratory data analysis and feature engineering with pandas and NumPy, applied SciPy for distance metrics, and evaluated cluster quality via silhouette scoring. Visualized geographic distributions using Matplotlib, Seaborn, and Tableau on the Python side, with ggplot2 and tidyverse for complementary R-based analysis.",
            technologies: ["Python", "R", "scikit-learn", "pandas", "NumPy", "Matplotlib", "Seaborn", "SciPy", "ggplot2", "tidyverse", "Tableau"],
          },
          {
            name: "Web Scraping Data Collection",
            description:
              "Built a web scraping pipeline using Python requests and BeautifulSoup for HTML parsing with http.client for API access. Extracted, cleaned, and structured data into tabular format using pandas, exporting results to CSV for downstream analysis.",
            technologies: ["Python", "requests", "BeautifulSoup", "pandas"],
          },
        ],
        languages: ["R", "Python"],
      },
      {
        subject: "CMSI",
        courseNumber: "585",
        title: "Programming Language Semantics",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "UG",
        term: "Spring 2023",
        description:
          "Mechanisms for the definition of syntax and semantics of programming languages, covering binding, scope, type systems, control flow, subroutines and coroutines, asynchronous and parallel execution, modularity, and metaprogramming. Denotational, operational, and axiomatic semantics.",
        projects: [],
        crossLink: "/cmsi-5850",
      },
      {
        subject: "CMSI",
        courseNumber: "4081",
        title: "Senior Thesis I",
        grade: "A",
        creditHours: 4,
        qualityPoints: 16,
        level: "UG",
        term: "Fall 2022",
        description:
          "Authorship and presentation of a paper, backed by the conception, design, and construction of a software project demonstrating mastery of the computer science curriculum.",
        projects: [
          {
            name: "Plumb Language Compiler & Research Paper",
            description:
              "Authored a 13-page research paper examining the intersection of programming language pragmatics and programmer intuition for parallel programming. Investigated how language-level abstractions can better expose shared-resource contention, race conditions, and deadlock potential in threaded programming models. Implemented a companion compiler for the Plumb programming language in pure Java (no external libraries), featuring a handcrafted regex-based tokenization pipeline, recursive-descent parser derived from a formal context-free grammar specification, and abstract syntax tree construction. Validated correctness through JUnit 5 test suites.",
            technologies: ["Java", "JUnit 5"],
          },
        ],
        languages: ["Java"],
      },
      {
        subject: "MATH",
        courseNumber: "251",
        title: "Applied Linear Algebra",
        grade: "A-",
        creditHours: 4,
        qualityPoints: 14.8,
        level: "UG",
        term: "Fall 2022",
        description:
          "An introduction to matrix methods with an emphasis on modern computational techniques. Topics include Gaussian elimination, LU factorization, vector spaces and subspaces, orthogonality, determinant, eigenvalues and eigenvectors, diagonalization, least square optimization, and singular value decomposition.",
        projects: [],
        languages: ["R"],
      },
      {
        subject: "MATH",
        courseNumber: "357",
        title: "Complex Variables",
        grade: "B",
        creditHours: 3,
        qualityPoints: 9,
        level: "UG",
        term: "Fall 2022",
        description:
          "Complex arithmetic, functions of complex variables, analytic functions, integration in the complex plane, Taylor and Laurent expansions and residues; conformal mappings, evaluation of real integrals by residues; integral transforms.",
        projects: [],
      },
      {
        subject: "CMSI",
        courseNumber: "3710",
        title: "Computer Graphics",
        grade: "B+",
        creditHours: 4,
        qualityPoints: 13.2,
        level: "UG",
        term: "Spring 2022",
        description:
          "The study and development of algorithms for synthesizing, manipulating, and displaying visual information. Representation, modeling, and creation of visual information in digital form. Manipulation and rendering via color, composition, vectors, matrices, projection, lighting, clipping, and hidden surface removal. Use and development of graphics APIs at different levels of abstraction.",
        projects: [
          {
            name: "Custom 3D Graphics with Three.js",
            description:
              "Constructed custom 3D meshes by directly manipulating vertex buffer objects and triangle indices using Three.js, computing UV coordinates and texture mappings from scratch to achieve precise surface detail control. Rendered within a React application harness.",
            technologies: ["JavaScript", "Three.js", "React"],
          },
          {
            name: "2D Rasterization Engine",
            description:
              "Implemented rasterization algorithms from scratch using the HTML5 Canvas API, including scanline fill for gradient rendering on arbitrary 2D polygons and convolution kernel-based image filters operating on raw ImageData pixel arrays.",
            technologies: ["JavaScript", "React", "HTML5 Canvas"],
          },
          {
            name: "Custom 3D Modeling Library",
            description:
              "Built a web-based 3D modeling library implementing the full model-view-projection pipeline with a handwritten matrix engine supporting homogeneous coordinate transformations, a lighting engine implementing the Phong reflection model, and custom GLSL vertex and fragment shaders for the WebGL graphics pipeline. Rendered within a React application using raw WebGL API calls.",
            technologies: ["JavaScript", "GLSL", "WebGL", "React"],
          },
        ],
        languages: ["JavaScript", "GLSL"],
      },
      {
        subject: "CMSI",
        courseNumber: "3802",
        title: "Languages & Automata II",
        grade: "A",
        creditHours: 4,
        qualityPoints: 16,
        level: "UG",
        term: "Spring 2022",
        description:
          "Applications of the classical theory of computation in the implementation of compilers, transpilers, and interpreters for high-level programming languages. Scanner construction, parser construction, intermediate representations, virtual machines, code generation, and optimization.",
        projects: [
          {
            name: "Plumb Language Compiler",
            description:
              "Designed and built a compiler for Plumb, a low-level imperative, modular systems language with custom syntax for threaded pipeline orchestration. Implemented as a syntax-directed transpilation pipeline to JavaScript using Ohm.js PEG grammars for parsing, with semantic actions driving code generation. Plumb's thread safety semantics were mapped to JavaScript's event loop concurrency model, using asynchronous primitives for concurrent execution in lieu of true OS-level parallelism. Tested with Mocha and measured code coverage with c8.",
            technologies: ["JavaScript", "Ohm.js", "Node.js", "Mocha", "c8"],
          },
        ],
        languages: ["JavaScript"],
      },
      {
        subject: "CMSI",
        courseNumber: "4320",
        title: "Cognitive Systems Design",
        grade: "A-",
        creditHours: 4,
        qualityPoints: 14.8,
        level: "UG",
        term: "Spring 2022",
        description:
          "Topics at the intersection of cognitive psychology, experimental design, philosophy of science, and machine learning. Causal formalizations for higher cognitive processes. Automation of reasoning using tools from reinforcement and causal learning, including Structural Causal Models, Multi-armed Bandit Agents, Markov Decision Processes, and approaches to Q-Learning.",
        projects: [
          {
            name: "Multi-Armed Bandit Reinforcement Learning",
            description:
              "Implemented reinforcement learning agents for uniform multi-armed bandit problems, comparing epsilon-greedy, UCB1, and softmax action selection strategies. Evaluated regret minimization and reward distribution estimation across varying arm configurations. Parallelized Monte Carlo simulations using joblib and visualized convergence behavior with Plotly interactive charts.",
            technologies: ["Python", "NumPy", "Plotly", "joblib"],
          },
          {
            name: "Q-Learning Agents for Pac-Man",
            description:
              "Implemented Exact Q-learning, Approximate Q-learning, and Deep Q-learning agents within the Berkeley AI Pac-Man framework. Deep Q-network trained using PyTorch with experience replay buffers and temporal difference learning to approximate state-action value functions. Built Bayesian network inference using pomegranate for causal reasoning, and particle filter-based belief state estimation to track ghost positions from noisy sensor observations. Visualized training metrics with Matplotlib and managed replay datasets with pandas.",
            technologies: ["Python", "NumPy", "PyTorch", "pandas", "Matplotlib", "Pillow", "pomegranate", "Berkeley AI Pac-Man"],
          },
          {
            name: "Pac-Man Capture the Flag",
            description:
              "Trained a multi-agent team using Approximate Q-learning with custom feature extraction to compete in an adversarial 2v2 Pac-Man capture-the-flag tournament within the Berkeley AI framework. Designed offensive and defensive heuristics for dual-role agents simultaneously pursuing opponent capture and point maximization while avoiding being captured. Competed against other students' trained agents.",
            technologies: ["Python", "Berkeley AI Pac-Man"],
          },
        ],
        languages: ["Python"],
      },
      {
        subject: "EECE",
        courseNumber: "2242",
        title: "Logic & Computer Design",
        grade: "A-",
        creditHours: 4,
        qualityPoints: 14.8,
        level: "UG",
        term: "Spring 2022",
        description:
          "A study of computer architecture including the design and analysis of functional computer subsystems. Machine instructions and instruction formats, assemblers and assembly languages. Various microarchitectures are compared and contrasted. Advanced topics in pipelining, micro-coding, cache memory, virtual memory and I/O systems.",
        projects: [
          {
            name: "ARM Assembly Algorithms",
            description:
              "Developed handcrafted ARM assembly programs in ARMSim# to implement high-level algorithms at the instruction level, including greedy change-making with optimal register allocation and multi-word arithmetic using carry propagation for scaling integer operations beyond single-register capacity.",
            technologies: ["ARM Assembly", "ARMSim#"],
          },
        ],
        languages: ["ARM Assembly"],
      },
      {
        subject: "CMSI",
        courseNumber: "3300",
        title: "Artificial Intelligence",
        grade: "B",
        creditHours: 4,
        qualityPoints: 12,
        level: "UG",
        term: "Fall 2021",
        description:
          "Introduction to the foundational mathematics and concepts behind the implementation of autonomous reasoning, prediction, and decision-making. Logical and symbolic reasoning, probability theory and inference. Markov models, information and utility theory, sampling and approximation, machine learning, and introduction to deep learning.",
        projects: [
          {
            name: "Knowledge Base Inference Engine",
            description:
              "Built an automated inference engine using propositional resolution over a conformal knowledge base to guide an agent through a minesweeper-like game. Constructed well-formed classical logic formulas encoding game state, then applied model checking and resolution refutation to determine knowledge base satisfiability, validating whether agent actions would yield optimal or suboptimal outcomes.",
            technologies: ["Python"],
          },
          {
            name: "Particle Filter for Pac-Man",
            description:
              "Implemented a sequential Monte Carlo particle filter within the Berkeley AI Pac-Man framework to perform belief state estimation of ghost positions under noisy sensor observations. Applied importance weighting and resampling to maintain accurate posterior distributions over possible ghost locations, enabling informed decision-making despite imperfect information.",
            technologies: ["Python"],
          },
          {
            name: "Naive Bayes Spam Classifier",
            description:
              "Built a multinomial Naive Bayes classifier for email spam detection using scikit-learn, trained on text message corpora to identify colloquial language patterns and profanity. Applied bag-of-words representation with TF-IDF vectorization via sklearn.feature_extraction, Laplace smoothing for posterior probability estimation, and evaluated precision/recall via confusion matrices. Performed exploratory data analysis with pandas and visualized feature distributions using Seaborn.",
            technologies: ["Python", "scikit-learn", "pandas", "NumPy", "Seaborn"],
          },
          {
            name: "Linear Perceptrons for Spam Classification",
            description:
              "Implemented linear perceptron classifiers using scikit-learn's linear models for the same spam classification task, establishing binary decision boundaries via stochastic gradient descent. Compared convergence behavior and classification accuracy against the Naive Bayes baseline, with feature scaling via sklearn.preprocessing to improve training stability.",
            technologies: ["Python", "scikit-learn", "NumPy", "pandas"],
          },
        ],
        languages: ["Python"],
      },
      {
        subject: "CMSI",
        courseNumber: "3550",
        title: "Networks and Internets",
        grade: "A",
        creditHours: 4,
        qualityPoints: 16,
        level: "UG",
        term: "Fall 2021",
        description:
          "Introduction to fundamental networking principles and their applications from local networks to the global Internet. Physical networking components, layered abstractions of Internet architecture, protocols enabling end-to-end data communication. Client and server network programming. Security, scalability, resource allocation, and availability.",
        projects: [
          {
            name: "Los Angeles Network Architecture Map",
            description:
              "Mapped the physical network topology of Los Angeles by conducting on-site hop count analysis using traceroute, nmap, and ipconfig at multiple locations. Performed reverse DNS resolution and autonomous system (AS) identification to trace routing paths from LMU's campus network through regional ISP infrastructure to the broader LA internet backbone. Documented topology with Lucidchart diagrams and supplemented with a Scapy-based Python packet sniffer for traffic inspection.",
            technologies: ["Scapy", "Lucidchart", "traceroute", "nmap"],
          },
          {
            name: "Server/Client Load Testing",
            description:
              "Built a TCP server and client from scratch using Node.js's net module, manually constructing and parsing protocol buffers with UTF-8 encoding and raw buffer manipulation. Load-tested the server using Python's Locust framework, simulating thousands of concurrent connections with varying request complexities to benchmark throughput, measure response latency distributions, and identify bottlenecks for bandwidth optimization.",
            technologies: ["JavaScript", "Node.js net module", "Python", "Locust"],
          },
          {
            name: "Network Packet Analysis and Visualization",
            description:
              "Built a PCAP analysis pipeline using Scapy for packet dissection and dnspython for reverse DNS resolution of destination IP addresses extracted from captured traffic. Used TLS master keys to decrypt encrypted session data and examine packet internals for security-relevant content, including URI extraction for image resource tracking. Created a React and MUI visualization dashboard deployed via GitHub Pages to present filtered network data interactively.",
            technologies: ["Python", "Scapy", "dnspython", "Wireshark", "React", "MUI"],
          },
        ],
        languages: ["JavaScript", "Python"],
      },
      {
        subject: "CMSI",
        courseNumber: "3801",
        title: "Languages & Automata I",
        grade: "A",
        creditHours: 4,
        qualityPoints: 16,
        level: "UG",
        term: "Fall 2021",
        description:
          "A comparative study of the rationale, concepts, design, and features of several major programming languages, including bindings, scope, control flow, type systems, subroutines and coroutines, modules, objects, asynchronous programming, concurrency, and metaprogramming. Compiler architecture and its relationship to formal models of computation.",
        projects: [
          {
            name: "Multi-Language Problem Set",
            description:
              "Implemented the same 10 algorithm and data structure problems across Python, JavaScript, C++, Java, and Swift, highlighting each language's idioms, type systems, and concurrency models. Problems included a Turing machine simulator, recursive say function, greedy change-making, and generator-based power sequences. Tested with Mocha for JavaScript and JUnit for Java.",
            technologies: ["Python", "JavaScript", "C++", "Java", "Swift", "Mocha", "JUnit"],
          },
        ],
        languages: ["Python", "JavaScript", "C++", "Java", "Swift"],
      },
      {
        subject: "MATH",
        courseNumber: "234",
        title: "Calculus III",
        grade: "C",
        creditHours: 4,
        qualityPoints: 8,
        level: "UG",
        term: "Fall 2021",
        description:
          "Partial derivatives, multiple integrals, three-dimensional space, vectors in two- and three-dimensional space, line integrals, Green's theorem.",
        projects: [],
      },
      {
        subject: "CMSI",
        courseNumber: "282",
        title: "Algorithms",
        grade: "C+",
        creditHours: 3,
        qualityPoints: 6.9,
        level: "UG",
        term: "Spring 2021",
        description:
          "The study of algorithm paradigms, including divide-and-conquer, greedy methods, dynamic programming, backtracking, and randomization, with emphasis on combinatorial search. String processing, advanced sorting, constraint satisfaction, hill climbing, optimization, graph algorithms, and computational geometry.",
        projects: [],
        languages: ["Java"],
      },
      {
        subject: "CMSI",
        courseNumber: "284",
        title: "Computer Systems Organization",
        grade: "C",
        creditHours: 3,
        qualityPoints: 6,
        level: "UG",
        term: "Spring 2021",
        description:
          "Exploration of computing system operation with a focus on programming at levels with minimal translation between the code and what the computer can access and manipulate directly. Bit representations, the C programming language, assembly language, calling conventions, and system calls.",
        projects: [],
        languages: ["x86-64 Assembly"],
      },
      {
        subject: "ELEC",
        courseNumber: "281",
        title: "Logic Design",
        grade: "B",
        creditHours: 3,
        qualityPoints: 9,
        level: "UG",
        term: "Spring 2021",
        description:
          "Design and analysis of digital systems. Topics include number systems, Boolean algebra, combinational and sequential logic design, minimization and analysis techniques as well as basic computer architecture.",
        projects: [
          {
            name: "Digital Circuit Design",
            description:
              "Designed and simulated combinational logic circuits in Multisim, including multiplexers, ripple-carry adders, and array multipliers. Verified functional correctness via truth table simulation and propagation delay analysis. Culminated in physical implementation on breadboards using discrete logic ICs, LEDs, and jumper wires to validate circuit behavior against simulation results.",
            technologies: ["Multisim"],
          },
        ],
      },
      {
        subject: "MATH",
        courseNumber: "245",
        title: "Ordinary Differential Equations",
        grade: "B-",
        creditHours: 3,
        qualityPoints: 8.1,
        level: "UG",
        term: "Spring 2021",
        description:
          "Systems of linear algebraic equations, Gaussian elimination, matrices, and matrix algebra. Linear dynamical systems and equilibrium. Analytical solutions of linear differential equations, including Laplace transform and linear time-domain analysis. Eigenvalues, eigenvectors and the matrix exponential.",
        projects: [],
      },
      {
        subject: "MATH",
        courseNumber: "366",
        title: "Discrete Methods",
        grade: "B-",
        creditHours: 3,
        qualityPoints: 8.1,
        level: "UG",
        term: "Spring 2021",
        description:
          "An introduction to graph theory; trees; coloring; Eulerian circuits. Combinatorics; permutations and combinations; recurrence relations; algorithmic approaches to combinatorics problems.",
        projects: [],
        crossLink: "/cmsi-2820",
        languages: ["Python"],
      },
      {
        subject: "CMSI",
        courseNumber: "281",
        title: "Data Structures",
        grade: "B-",
        creditHours: 3,
        qualityPoints: 8.1,
        level: "UG",
        term: "Fall 2020",
        description:
          "Specification and design of data types, information structures, and their associated algorithms. Collection classes for sets, lists, stacks, queues, hierarchies, heaps, and dictionaries. Implementation via arrays, linked lists, hash tables, and tree structures. Introduction to asymptotic computational complexity.",
        projects: [],
        languages: ["Java"],
      },
      {
        subject: "MATH",
        courseNumber: "248",
        title: "Introduction to Methods of Proof",
        grade: "B",
        creditHours: 3,
        qualityPoints: 9,
        level: "UG",
        term: "Fall 2020",
        description:
          "Number theory, sets, functions, equivalence relations, cardinality, methods of proof, induction, contradiction, contraposition.",
        projects: [],
        crossLink: "/cmsi-2820",
      },
      {
        subject: "CMSI",
        courseNumber: "186",
        title: "Programming Lab",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "UG",
        term: "Spring 2020",
        description:
          "Lab companion to introductory computer programming, emphasizing hands-on practice with software development tools, debugging, testing, and collaborative coding workflows.",
        projects: [],
        languages: ["Java"],
      },
      {
        subject: "CMSI",
        courseNumber: "399",
        title: "App Development Practicum",
        grade: "CR",
        creditHours: 2,
        qualityPoints: 0,
        level: "UG",
        term: "Spring 2020",
        description:
          "Practicum culminating in the development of an application, covering full-stack systems architecture, version control, continuous integration, and software development best practices.",
        projects: [
          {
            name: "Web Game with Procedural Level Generation",
            description:
              "Built a web-based game using Create React App featuring procedural level generation for replayability. Managed global game state through a Redux store with actions and reducers for player state, level progression, and scoring. Styled with CSS Modules for component-scoped styling.",
            technologies: ["JavaScript", "React", "Redux", "Create React App", "CSS Modules"],
          },
        ],
        languages: ["JavaScript", "CSS", "HTML"],
      },
      {
        subject: "MATH",
        courseNumber: "132",
        title: "Calculus II",
        grade: "B",
        creditHours: 4,
        qualityPoints: 12,
        level: "UG",
        term: "Spring 2020",
        description:
          "Techniques of integration, numerical methods of integration with error analysis, applications of the integral, improper integral, infinite series, an introduction to parametric equations and polar coordinates.",
        projects: [],
      },
      {
        subject: "CMSI",
        courseNumber: "185",
        title: "Computer Programming",
        grade: "A",
        creditHours: 3,
        qualityPoints: 12,
        level: "UG",
        term: "Fall 2019",
        description:
          "Foundational course on computer programming, stressing software development best practices. Topics include values and types, functions, objects, iteration, recursion, event-driven programming, and graphics and animation. Basic data structures and selected algorithmic paradigms are introduced.",
        projects: [],
        languages: ["Python"],
      },
      {
        subject: "MATH",
        courseNumber: "131",
        title: "Calculus I",
        grade: "A-",
        creditHours: 4,
        qualityPoints: 14.8,
        level: "UG",
        term: "Fall 2019",
        description:
          "Limits, continuity, derivatives of algebraic and transcendental functions, applications of the derivative, antiderivatives, introduction to the definite integral, Fundamental Theorem of Calculus.",
        projects: [],
      },
    ],
  },
]

export const generalEducation: GeneralEducationCourse[] = [
  {
    subject: "BIOE",
    courseNumber: "1000",
    title: "Introduction to Bioethics",
    grade: "A",
    creditHours: 4,
    term: "Fall 2019",
  },
  {
    subject: "FFYS",
    courseNumber: "1000",
    title: "FYS: War & Peace in German Lit & Film",
    grade: "A-",
    creditHours: 4,
    term: "Fall 2019",
  },
  {
    subject: "ORNT",
    courseNumber: "1000",
    title: "Intro to LMU for Freshmen",
    grade: "CR",
    creditHours: 0,
    term: "Fall 2019",
  },
  {
    subject: "PHIL",
    courseNumber: "1800",
    title: "Philosophical Inquiry",
    grade: "A-",
    creditHours: 4,
    term: "Spring 2020",
  },
  {
    subject: "RHET",
    courseNumber: "1000",
    title: "RA: Speaking & Writing for Social Justice",
    grade: "A",
    creditHours: 4,
    term: "Spring 2020",
  },
  {
    subject: "CHEM",
    courseNumber: "110",
    title: "General Chemistry I",
    grade: "B",
    creditHours: 3,
    term: "Fall 2020",
  },
  {
    subject: "HIST",
    courseNumber: "1050",
    title: "Modern World History",
    grade: "A",
    creditHours: 4,
    term: "Fall 2020",
    description: "Survey of modern world history from the early modern period to the present.",
    projects: [
      {
        name: "Cartographer Exploration Game",
        description:
          "Built a 2D exploration game in Java using the LibGDX game engine simulating the experience of being an exploring cartographer. Used LibGDX's Box2D physics, Ashley ECS framework, and LWJGL desktop backend for rendering.",
        technologies: ["Java", "LibGDX", "Box2D", "Gradle"],
      },
    ],
    languages: ["Java"],
  },
  {
    subject: "PHIL",
    courseNumber: "3115",
    title: "Ethics for Engineering/Science",
    grade: "B+",
    creditHours: 4,
    term: "Fall 2022",
  },
  {
    subject: "ASPA",
    courseNumber: "2100",
    title: "Asian Civilizations",
    grade: "A-",
    creditHours: 4,
    term: "Spring 2023",
  },
  {
    subject: "PHIL",
    courseNumber: "3712",
    title: "Augustine",
    grade: "A-",
    creditHours: 4,
    term: "Spring 2023",
  },
]
