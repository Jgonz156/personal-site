# CMSI 5850 — Lecture Outline (LN10-LN14)

This document provides a comprehensive topic skeleton for the remaining lectures,
ensuring thematic cohesion across the full course. Each lecture builds directly on
the previous, and the running mini-language **Petal** (introduced in LN8) grows in
complexity as we add semantic features.

## Course Arc Overview

```
Arc 1: Mathematical Foundations (LN1-LN4)
  Logic → Set Theory → Lambda Calculus
  "Build the tools"

Arc 2: Theory Bridge (LN5-LN6)
  Four Pillars → Pragmatics
  "Survey the landscape"

Arc 3: Syntax (LN7-LN9)
  Language Theory → Syntax Design → Parsing
  "Define how languages LOOK"

Arc 4: Semantics (LN10-LN13)
  Semantics Overview → Operational → Denotational → Axiomatic & Beyond
  "Define what languages MEAN"

Arc 5: Synthesis (LN14)
  Modern Applications → Full Pipeline
  "Bring it all together"
```

### Guiding Principles

- **Petal as the constant:** Every lecture opens with the same Petal program and shows
  what the new technique reveals about it. Petal grows (if-else, while) in LN11 and
  carries forward.
- **Specification first, implementation second:** Present formal rules as the
  *specification*, then reveal the JavaScript implementation as a "witness" that the
  rules are mechanizable.
- **Three implementation strategies:** LN11 = interpreter (run it), LN12 = transpiler
  (translate it), LN13 = verifier (prove it without running).
- **Reuse visual vocabulary:** New components use the same Tailwind card chrome, step
  navigation, vis.js tree rendering, and MathJax formula patterns students already know.
- **Cross-lecture callbacks:** Explicitly connect to LN2 (logic for inference rules),
  LN3 (sets for domains), LN4 (lambda calculus for meaning functions; Y combinator for
  fixed points; beta reduction = small-step), LN5 (computability limits on verification),
  LN6 (pragmatics of error handling, scoping).

---

## LN10: Semantics — What Does It All Mean?

**Bridge from LN9:** "We can read and structure programs. But what do they MEAN?"

**Reference:** https://cs.lmu.edu/~ray/notes/semantics/

**Textbook:** Slonneger & Kurtz, Chapters 5-7 (overview of semantic approaches)

### Topics

1. **The Central Question**
   - We have ASTs. What do they compute?
   - Informal semantics: English descriptions (and why they fail)
   - The meaning function: `M : AST → Semantic Domain`
   - Connection to LN3 (functions as mappings) and LN4 (lambda abstractions)

2. **Semantic Domains**
   - What are the "outputs" of meaning?
   - Numbers, truth values, strings (for expressions)
   - Environments/memory states (for statements)
   - Input/output streams (for programs)
   - Connection to LN3 sets and LN4 functions

3. **Informal Semantics of Petal** (≈70% of lecture)
   - What does each AST node type mean?
   - Expressions evaluate to numbers
   - Assignments update an environment (a map from names to values)
   - Print statements produce output
   - Walk through several examples with `SemanticEvaluator`

4. **Scoping Rules**
   - Lexical vs. Dynamic scope
   - Why closures need captured environments (tying back to LN4 free/bound variables)
   - Use `ScopeChainVisualizer` to contrast the two resolution strategies

5. **Errors and Undefined Behavior**
   - Division by zero, undeclared variables
   - How different semantic approaches handle errors
   - Connection to LN6's pragmatics: error messages as design decisions

6. **Preview of Three Formal Approaches** (≈30% of lecture)
   - **Operational**: define meaning by showing how programs execute → *the interpreter*
   - **Denotational**: define meaning as mathematical functions → *the transpiler*
   - **Axiomatic**: define meaning by what can be proved about programs → *the verifier*
   - Tiny examples of each applied to a single Petal expression
   - "Each of these gives us a *different implementation strategy*."

### Suggested Interactive Components
- `SemanticEvaluator`: step through AST evaluation showing environment changes
  (vis.js AST on left, environment table + output stream on right)
- `ScopeChainVisualizer`: tabbed comparison (Lexical / Dynamic) showing the same
  program resolving variables differently through linked scope chains

### Key Deliverable
Students understand the meaning function concept and can informally describe
what any Petal program computes. They see previews of all three formal approaches
and understand that each maps to a different implementation strategy.

---

## LN11: Operational Semantics — Meaning by Running

**Bridge from LN10:** "One way to define meaning: show how programs execute on an
abstract machine."

**Reference:** https://cs.lmu.edu/~ray/notes/opsem/

**Textbook:** Slonneger & Kurtz, Chapter 8

### Topics

1. **The Operational Intuition**
   - Meaning as simulation: define an abstract machine, show how it runs
   - Brief mention of concrete operational semantics (stack machines) as one flavor
   - Focus on the two formal approaches: small-step and big-step

2. **Structural Operational Semantics (SOS) — Small-Step**
   - Plotkin (1981): configurations and transitions
   - The transition relation: ⟨e, σ⟩ → ⟨e', σ'⟩
   - Inference rules as the building blocks
   - Apply to Petal expressions and statements
   - Connection to LN4: beta reduction IS small-step operational semantics

3. **Natural Semantics — Big-Step**
   - Kahn (1987): configurations and final values
   - The evaluation relation: ⟨e, σ⟩ ⇓ v
   - Inference rules for big-step evaluation
   - Apply to Petal: every expression evaluates to a value in one "big step"
   - Comparison with small-step: when does each shine?

4. **Extending Petal**
   - Add if-else statements: `if e { s* } else { s* }`
   - Add while loops: `while e { s* }`
   - Show operational rules for each
   - The `while` rule in big-step is self-referential — allowed in operational
     semantics (but will cause problems in denotational, foreshadowing LN12)

5. **From Rules to Code: The Interpreter**
   - Each big-step inference rule maps to a `case` in a recursive
     `evaluate(ast, env)` function in JavaScript
   - Show interpreter code alongside the rules — specification becomes implementation
   - Use `OperationalSemanticsStepper` for dual-panel (rules ↔ code) experience
   - This is the first implementation of Petal's meaning

6. **Proof Trees**
   - How inference rules compose into derivation proofs
   - Proving that a specific program produces a specific result
   - Connection to LN2 logic: inference rules ARE logical deduction

### Suggested Interactive Components
- `OperationalSemanticsStepper`: dual-panel stepper with small-step and big-step
  modes operating on the SAME Petal program. Left: AST with highlighted redex (vis.js).
  Right: inference rule applied (MathJax) + environment state.

### Key Deliverable
Students can write small-step and big-step inference rules for Petal constructs
and use them to prove evaluation results. They see the connection between
lambda calculus reduction and operational semantics, and they see that the
interpreter IS the inference rules turned into code.
*(Course Capstone Connection: The operational execution mechanisms here map directly
to HW5, where students will build the Petal Evaluator/Interpreter.)*

---

## LN12: Denotational Semantics — Meaning by Translating

**Bridge from LN11:** "Instead of simulating execution, define meaning as
mathematical FUNCTIONS."

**Reference:** https://cs.lmu.edu/~ray/notes/densem/

**Textbook:** Slonneger & Kurtz, Chapters 9-10

### Topics

1. **The Denotational Intuition**
   - Meaning as mathematical objects, not execution traces
   - Every program denotes a function from inputs to outputs
   - Connection to LN3 functions and LN4 lambda calculus

2. **Semantic Domains**
   - Num (numbers), Bool (booleans), State (memory), Output (print stream)
   - Domain constructors: products, sums, function spaces
   - Modeling Errors: The bottom element ⊥ (divergence/crashing) and partial functions
   - Connection to LN4: ⊥ is the mathematical representation of the Ω combinator
   - Connection to LN3: domains are sets with additional structure

3. **Semantic Functions**
   - E⟦e⟧ : State → Num (expression meaning)
   - S⟦s⟧ : State → State × Output (statement meaning)
   - P⟦p⟧ : Output (program meaning)
   - Compositionality: meaning of a compound = function of meanings of parts
   - Apply to all Petal constructs

4. **Compositionality: The Key Principle**
   - Why denotational semantics requires compositionality
   - How the tree structure of ASTs enables compositional definitions
   - Connection to LN4: Church encodings are denotational semantics for arithmetic

5. **From Equations to Code: The Transpiler**
   - Each semantic equation maps to a clause in a `compile(ast)` function
     that produces JavaScript source code
   - E⟦e₁ + e₂⟧ = E⟦e₁⟧ + E⟦e₂⟧ becomes
     `case "BinaryOp": return \`(\${compile(ast.left)} \${ast.op} \${compile(ast.right)})\``
   - Same program from LN11's interpreter, now transpiled — same result,
     different mechanism
   - Use `TranspilerOutput` to show the compositional code generation

6. **Fixed Points and Recursion**
   - How to give meaning to while loops
   - The fixed-point equation: S⟦while e { s }⟧ = fix(F) where F is...
   - Connection to LN4's Y combinator: the same mathematical trick
   - Use `FixedPointUnroller` to show the approximation sequence
   - Domain theory intuition: CPOs, monotonicity, continuity (intuitive, not proofs)
   - Kleene's fixed-point theorem

7. **Comparing Operational and Denotational**
   - Same language, two perspectives, two implementations
   - Operational: "how does it run?" → interpreter
   - Denotational: "what function does it compute?" → transpiler
   - Equivalence theorems: they agree on all terminating programs
   - When operational is more natural (concurrency, debugging)
   - When denotational is more natural (optimization, verification)

### Suggested Interactive Components
- `TranspilerOutput`: split-panel showing Petal source → generated JavaScript,
  highlighting corresponding regions and showing semantic equations alongside
- `FixedPointUnroller`: adapted from `ReductionStepper`, showing the approximation
  sequence F(⊥), F(F(⊥)), F(F(F(⊥))), ... with descriptions of what each covers

### Key Deliverable
Students can write denotational semantic equations for Petal and understand the
fixed-point construction for loops. They see the deep connection between the
Y combinator (LN4) and loop semantics, and they see that a transpiler IS the
semantic equations turned into code.

---

## LN13: Beyond Execution — Proving Programs Correct

**Bridge from LN12:** "Operational tells us how programs RUN. Denotational tells us
what they COMPUTE. But can we know things about programs WITHOUT running them?"

**Reference:** No mentor notes. Slonneger & Kurtz, Chapters 11-13; supplementary research.

### Topics

1. **The Third Perspective**
   - Recap the three-method table:
     | Approach | Question | Implementation |
     |----------|----------|---------------|
     | Operational | How does it run? | Interpreter |
     | Denotational | What does it compute? | Transpiler |
     | Axiomatic | What can we guarantee? | Static Verifier |
   - Axiomatic semantics lets us reason about programs using logic alone

2. **Hoare Logic: Programs as Logical Propositions**
   - C.A.R. Hoare (1969): programs as logical propositions
   - Hoare triples: {P} C {Q} — preconditions, programs, postconditions
   - Assignment axiom: {Q[x/e]} x = e {Q}
   - Sequencing rule, conditional rule, loop rule
   - All connect to LN2 logic: these ARE logical deduction rules

3. **Weakest Preconditions**
   - Given a postcondition, propagate backward through the program
   - Use `HoareTripleStepper` to watch a proof construct itself
   - "We just PROVED correctness without running a single line."

4. **Loop Invariants**
   - The key challenge of axiomatic reasoning about iteration
   - Show 2-3 candidate invariants; walk through why some work and others fail
   - Connection to LN12: the invariant IS the property preserved by each
     fixed-point approximation

5. **Partial vs. Total Correctness**
   - Partial: "IF it terminates, the postcondition holds"
   - Total: "It terminates AND the postcondition holds"
   - Connection to LN5 computability: Rice's Theorem means total correctness
     is undecidable in general

6. **Real-World Static Verification**
   - Type checkers (TypeScript, Rust) as lightweight axiomatic systems
   - Rust's borrow checker: proving memory safety at compile time
   - Formal verification: SPARK Ada (aviation), Frama-C (nuclear),
     CompCert (verified compiler)
   - Proof assistants: Coq, Lean
   - The Halting Problem sets limits (LN5), but within those limits we can
     guarantee remarkable properties

7. **The Broader Landscape (Brief Survey)**
   - Algebraic semantics: ADTs as algebras, signatures + axioms, initial algebras
     (connect to LN3)
   - Action semantics: Mosses (1992), designed for real-language specifications
     (connect to LN6 pragmatics)
   - Modern directions: game semantics, categorical semantics, probabilistic
     semantics, effect systems (1-2 paragraphs each, motivation not formalism)

8. **Choosing the Right Tool**
   - Verification and correctness → Axiomatic
   - Library/API design → Algebraic
   - Language specification → Action or Operational
   - Theoretical foundations → Denotational or Categorical
   - No single approach is "best" — each illuminates different aspects

### Suggested Interactive Components
- `HoareTripleStepper`: backward-propagation stepper showing weakest preconditions
  flowing through a Petal program. Left: annotated program. Right: Hoare rule applied
  (MathJax). Final step: precondition reduces to `true`, completing the proof.

### Key Deliverable
Students understand that formal specification gives the power to prove properties
without execution. They can write simple Hoare triples, understand loop invariants,
and appreciate the landscape of semantic methods. They see that type checkers and
verification tools are axiomatic semantics made practical.

---

## LN14: Modern Applications — The Full Pipeline

**Bridge from LN13:** "We've built the entire intellectual stack. Now see it at work."

**Reference:** Course synthesis — drawing connections across all lectures.

### Topics

1. **The Full Compilation Pipeline**
   - Source code → Characters → Tokens → CST → AST → IR → Optimization → Output
   - Map each stage to the lecture that taught it:
     - Characters to Tokens: LN8 (lexical syntax, regular expressions)
     - Tokens to CST: LN8-9 (phrase syntax, parsing)
     - CST to AST: LN8-9 (tree grammars, semantic actions)
     - AST to meaning: LN10-12 (semantics)
     - Verification: LN13 (axiomatic semantics)
   - Use `FullPipelineVisualizer` with interpreter/transpiler toggle
   - Petal comes full circle: designed (LN8), parsed (LN9), given meaning (LN10-12)

2. **Type Systems in Depth**
   - Type checking as a semantic analysis (context constraints from LN8)
   - Type inference: Hindley-Milner and the unification algorithm
   - Use `TypeInferenceStepper` to visualize constraint generation and unification
   - Gradual typing: bridging static and dynamic (TypeScript, Python)
   - Dependent types: types that depend on values (Idris, Agda)
   - Connection to LN4: Simply Typed Lambda Calculus as the foundation

3. **Modern Language Design Trends**
   - Algebraic effects and handlers (replacing monads; connect to LN13)
   - Pattern matching and algebraic data types
   - Ownership and borrowing (Rust; connect to LN10 scoping, LN13 verification)
   - First-class concurrency primitives
   - Domain-specific languages (DSLs) and embedded DSLs
   - Connection to LN6: these are all pragmatic innovations

4. **Formal Verification in Practice**
   - From LN13's Hoare Logic to real verification tools
   - Model checkers (TLA+, Alloy)
   - Proof assistants (Coq, Lean, Agda)
   - Verified compilers (CompCert) — the ultimate synthesis of syntax and semantics
   - Connection to LN5: verification pushes against computability limits

5. **The Relationship Between Theory and Industry**
   - Regex engines (LN7 Type 3) in every text editor
   - Parser generators (LN7 Type 2) in every compiler
   - Type systems (LN4, LN13) in TypeScript, Rust, Haskell
   - Formal methods (LN13) in hardware verification, aerospace, finance
   - The lambda calculus (LN4) in every functional language

6. **Reflection: The Course Arc**
   - Petal's journey as the closing argument
   - LN1-4: we built mathematical tools (logic, sets, functions)
   - LN5-6: we surveyed what those tools can describe (theories, pragmatics)
   - LN7-9: we used the tools to define and parse languages (syntax)
   - LN10-13: we used the tools to define meaning (semantics)
   - LN14: we see it all working together in real systems
   - The central thesis: programming languages are formal mathematical objects,
     and understanding their foundations makes you a better designer, implementer,
     and user of languages

### Suggested Interactive Components
- `FullPipelineVisualizer`: show a Petal program flowing through every stage.
  At the AST-to-Result stage, a toggle switches between interpreter path (LN11)
  and transpiler path (LN12). Reuses visual vocabulary from all prior steppers.
- `TypeInferenceStepper`: given an AST, assign type variables, generate constraint
  equations (MathJax), and step through unification. Left: AST with type labels.
  Right: constraint list with resolved constraints highlighted.

### Key Deliverable
Students see the full picture: every concept from the course maps to a real
component of language implementation. They leave with both the theoretical
foundations and the practical intuition to design, parse, and give meaning
to their own programming languages.

---

## Cross-Lecture Connections

The following table maps key concepts to their first introduction and subsequent
reuse, demonstrating the thematic cohesion of the course:

| Concept | Introduced | Reused In |
|---------|-----------|-----------|
| Propositional/Predicate Logic | LN1-2 | LN7 (quantifiers), LN11 (inference rules), LN13 (Hoare triples) |
| Set Theory | LN3 | LN7 (languages as sets), LN10 (semantic domains), LN12 (domain theory), LN13 (algebraic semantics) |
| Lambda Calculus | LN4 | LN9 (semantic actions), LN10 (meaning functions), LN11 (beta = small-step), LN12 (fixed points, compositionality), LN14 (type inference) |
| Chomsky Hierarchy | LN7 | LN8 (lexical=Type3, phrase=Type2), LN9 (parser architecture) |
| Pragmatics | LN6 | LN8 (syntax choices), LN10 (error handling), LN13 (verification tools), LN14 (modern design trends) |
| Ambiguity | LN7 | LN8 (dangling else), LN9 (PEG determinism) |
| ASTs | LN8 | LN9-14 (input to all semantic phases) |
| Petal (mini-language) | LN8 | LN9 (parse), LN10 (informal semantics), LN11 (operational + interpreter), LN12 (denotational + transpiler), LN13 (axiomatic proofs), LN14 (full pipeline) |
| Fixed Points / Y combinator | LN4 | LN12 (loop semantics via fix), LN13 (loop invariants as preserved properties) |
| DFAs / PDAs / TMs | LN5, LN7 | LN8 (scanner=DFA, parser=PDA), LN9 (parser implementation) |
| Free/Bound Variables | LN4 | LN10 (scoping rules: lexical vs. dynamic) |
| Computability Limits | LN5 | LN13 (Rice's Theorem limits total correctness), LN14 (verification boundaries) |

---

## Petal Language Growth Roadmap

The mini-language grows across lectures:

| Lecture | Petal Features | Implementation |
|---------|---------------|----------------|
| LN8 | Expressions (arithmetic), assignments, print | Design only |
| LN9 | Same features, now with Ohm.js parser producing ASTs | Parser |
| LN10 | Same features, with informal semantics defined | Hand evaluation |
| LN11 | Add if-else, while loops; operational semantics for all | Interpreter (JS) |
| LN12 | Same features; denotational semantics (fixed points for while) | Transpiler (JS) |
| LN13 | Same features; axiomatic reasoning about correctness | Proof (no execution) |
| LN14 | Full pipeline demonstration with all features | Both paths + verification |

---

## Component Summary

| Lecture | Component | Pattern Source | Key Tech |
|---------|-----------|---------------|----------|
| LN10 | `SemanticEvaluator` | `DerivationTreeStepper` + table | vis.js + environment table |
| LN10 | `ScopeChainVisualizer` | New (tabbed comparison) | Tailwind tables + linked chain |
| LN11 | `OperationalSemanticsStepper` | `RecursiveDescentStepper` dual-panel | vis.js + MathJax rules |
| LN12 | `TranspilerOutput` | `CSTtoASTStepper` split-panel | Code highlighting + MathJax |
| LN12 | `FixedPointUnroller` | `ReductionStepper` | MathJax + keyed formula |
| LN13 | `HoareTripleStepper` | New (backward propagation) | MathJax + annotated code |
| LN14 | `FullPipelineVisualizer` | Composite (reuses visual vocabulary) | Multi-stage stepper |
| LN14 | `TypeInferenceStepper` | `DerivationTreeStepper` + constraints | vis.js + MathJax |
