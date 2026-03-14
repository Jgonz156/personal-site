# CMSI 5850 — Lecture Outline (LN9-LN14)

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
  Semantics Overview → Operational → Denotational → Other Methods
  "Define what languages MEAN"

Arc 5: Synthesis (LN14)
  Modern Applications → Full Pipeline
  "Bring it all together"
```

---

## LN9: Parsing — Building the Reader

**Bridge from LN8:** "We know what trees should look like. Now we build the machine
that produces them."

**Reference:** No direct mentor page — this is a hands-on workshop lecture.

**Connection to prior work:** Students have already built a lambda calculus parser
(HW2). Now they see the same principles applied to a richer language using a
professional tool.

### Topics

1. **Recap: The Parsing Problem and the Hierarchy**
   - The goal: Token Stream (Type 3) $\to$ CST (Type 2)
   - The problem: Full Type 2 parsing (CYK algorithm) is $O(n^3)$. We need $O(n)$ algorithms, which means restricting our grammars.

2. **Top-Down Parsing (The LL Family)**
   - *Strategy:* Start at the root, guess the rules (Left-to-right, Leftmost derivation)
   - *Implementation:* Recursive Descent (by hand)
   - How precedence climbing works in code
   - *The fatal flaw:* Left-recursion causes infinite loops (requires grammar rewriting)

3. **Bottom-Up Parsing (The LR Family)**
   - *Strategy:* Start at the leaves, push to a stack, and reduce (Shift-Reduce)
   - *The connection:* This is the literal implementation of the Pushdown Automaton (PDA) from LN5!
   - *The trade-off:* Handles left-recursion beautifully, but extremely hard to write by hand (requires tools like Yacc/Bison)
   - *Industry impact:* The standard for decades (C/C++)

4. **The Pragmatic Shift: Analytic Grammars & Packrat Parsing**
   - *The modern solution:* Sidestep the LL vs LR generative debate entirely
   - *Algorithm:* Packrat Parsing with memoization
   - *Complexity:* $O(n)$ time guarantee, at the cost of higher memory

5. **Building Petal's Parser Step-by-Step (with Ohm.js)**
   - Installing and using Ohm.js
   - Lexical rules (tokens) vs Phrase rules (expressions)
   - Handling left recursion with Ohm's left-recursive PEG extension
   - Semantic actions: how Ohm bridges parse trees and ASTs
   - Testing with real Petal programs

6. **From CST to AST in Code**
   - Writing semantic actions that transform CST nodes into AST nodes
   - The visitor/action pattern
   - Producing JSON AST output for inspection

7. **Interactive Components (potential)**
   - Live Ohm grammar editor embedded in the page (iframe to Ohm Editor)
   - Side-by-side: source → CST → AST for user-provided Petal programs

### Suggested Interactive Components
- `OhmEditorEmbed`: iframe embedding of the Ohm Editor with our Petal grammar
- Extend `CSTtoASTStepper` with user-provided expressions

### Key Deliverable
By the end of LN9, students have a working parser that takes Petal source code
and produces an AST. This AST becomes the input for LN10's semantics.

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

2. **Semantic Domains**
   - What are the "outputs" of meaning?
   - Numbers, truth values, strings (for expressions)
   - Environments/memory states (for statements)
   - Input/output streams (for programs)
   - Connection to LN3 sets and LN4 functions

3. **Three Approaches to Formal Semantics**
   - **Operational**: define meaning by showing how programs execute
   - **Denotational**: define meaning as mathematical functions
   - **Axiomatic**: define meaning by what can be proved about programs
   - When to use each, and their complementary strengths

4. **Informal Semantics of Petal**
   - What does each AST node type mean?
   - Expressions evaluate to numbers
   - Assignments update an environment (a map from names to values)
   - **Scoping Rules**: Lexical vs. Dynamic scope (why closures need environments, tying back to LN4)
   - Print statements produce output
   - Walk through several examples

5. **Errors and Undefined Behavior**
   - Division by zero, undeclared variables
   - How different semantic approaches handle errors
   - Connection to LN6's pragmatics: error messages as design decisions

6. **Preview of Formal Approaches**
   - Tiny examples of each approach applied to Petal
   - Set the stage for LN11 (operational) and LN12 (denotational)

### Suggested Interactive Components
- `SemanticEvaluator`: step through AST evaluation showing environment changes
- Side-by-side: AST node → semantic rule → result

### Key Deliverable
Students understand the meaning function concept and can informally describe
what any Petal program computes. They see previews of all three formal approaches.

---

## LN11: Operational Semantics — How Programs Run

**Bridge from LN10:** "One way to define meaning: show how programs execute on an
abstract machine."

**Reference:** https://cs.lmu.edu/~ray/notes/opsem/

**Textbook:** Slonneger & Kurtz, Chapter 8

### Topics

1. **The Operational Intuition**
   - Meaning as simulation: define an abstract machine, show how it runs
   - Three flavors with increasing formality

2. **Concrete Operational Semantics**
   - Stack machines and code generation
   - Translation functions: AST → machine instructions
   - Running the machine: step-by-step execution
   - Apply to Petal: compile expressions to stack operations

3. **Structural Operational Semantics (SOS) — Small-Step**
   - Plotkin (1981): configurations and transitions
   - The transition relation: ⟨e, σ⟩ → ⟨e', σ'⟩
   - Inference rules as the building blocks
   - Apply to Petal expressions and statements
   - Connection to LN4: beta reduction IS small-step operational semantics

4. **Natural Semantics — Big-Step**
   - Kahn (1987): configurations and final values
   - The evaluation relation: ⟨e, σ⟩ ⇓ v
   - Inference rules for big-step evaluation
   - Apply to Petal: every expression evaluates to a value in one "big step"
   - Comparison with small-step: when does each shine?

5. **Extending Petal**
   - Add if-else statements: `if e { s* } else { s* }`
   - Add while loops: `while e { s* }`
   - Show operational rules for each
   - Nondeterminism: what happens with concurrent features?

6. **Proof Trees**
   - How inference rules compose into derivation proofs
   - Proving that a specific program produces a specific result
   - Connection to LN2 logic: inference rules ARE logical deduction

### Suggested Interactive Components
- `StackMachineStepper`: visualize stack-based evaluation of expressions
- `OperationalSemanticsStepper`: given a Petal AST, provide `[Take Small Step]` (Structural, evaluates one piece of the tree) and `[Take Big Step]` (Natural, collapses entire subtree to value) buttons to visually compare transition vs. evaluation relations.

### Key Deliverable
Students can write small-step and big-step inference rules for Petal constructs
and use them to prove evaluation results. They see the connection between
lambda calculus reduction and operational semantics.
*(Course Capstone Connection: The operational execution mechanisms here map directly to HW5, where students will build the Petal Evaluator/Interpreter.)*

---

## LN12: Denotational Semantics — Meaning as Mathematics

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
   - Modeling Errors: The bottom element $\bot$ (divergence/crashing) and partial functions
   - Connection to LN4: $\bot$ is the mathematical representation of the $\Omega$ combinator
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

5. **Fixed Points and Recursion**
   - How to give meaning to while loops
   - The fixed-point equation: S⟦while e { s }⟧ = fix(F) where F is...
   - Connection to LN4's Y combinator: the same mathematical trick
   - Domain theory foundations: CPOs, monotonicity, continuity
   - Kleene's fixed-point theorem

6. **Comparing Operational and Denotational**
   - Same language, two perspectives
   - Operational: "how does it run?"
   - Denotational: "what function does it compute?"
   - Equivalence theorems: they agree on all terminating programs
   - When operational semantics is more natural (concurrency)
   - When denotational semantics is more natural (optimization, verification)

### Suggested Interactive Components
- `DenotationalEvaluator`: show the mathematical function computed by an expression
- Side-by-side: operational derivation vs. denotational computation for same program

### Key Deliverable
Students can write denotational semantic equations for Petal and understand the
fixed-point construction for loops. They see the deep connection between the
Y combinator (LN4) and loop semantics.

---

## LN13: Other Semantic Methods — The Broader Landscape

**Bridge from LN12:** "Operational and denotational aren't the only games in town."

**Reference:** No mentor notes. Slonneger & Kurtz, Chapters 11-13; supplementary research.

### Topics

1. **Beyond Operational and Denotational**
   - LN11 and LN12 gave us two complete semantic frameworks
   - But the field has developed several more, each with unique strengths
   - Today: a survey of the broader landscape

2. **Axiomatic Semantics (Hoare Logic)**
   - C.A.R. Hoare (1969): programs as logical propositions
   - Hoare triples: {P} C {Q} — preconditions, programs, postconditions
   - Assignment axiom, sequencing rule, conditional rule, loop rule
   - Loop invariants: the key to reasoning about iteration
   - Partial correctness vs. total correctness
   - Apply to Petal: prove properties of simple programs
   - **Strength**: reasoning about program correctness; verification tools
   - Connection to LN2 logic: Hoare triples ARE logical statements

3. **Algebraic Semantics**
   - Abstract data types as algebras
   - Signatures, sorts, operations
   - Axioms as equational constraints
   - Initial algebras and their universal property
   - Apply to Petal: define the "number" type algebraically
   - **Strength**: modular, compositional specifications; library design
   - Connection to LN3 sets: algebras generalize set-theoretic structures

4. **Action Semantics**
   - Peter Mosses (1992): a more programmer-friendly formalism
   - Actions as first-class semantic entities
   - Three "facets": functional, imperative, declarative
   - Combines operational and denotational intuitions
   - **Strength**: readability; practical language specification
   - Why Action Semantics was designed to scale to real languages

5. **Modern Directions (Brief Survey)**
   - **Game semantics**: meaning as strategies in a game between program and environment
   - **Categorical semantics**: meaning in terms of category theory (functors, monads)
   - **Probabilistic semantics**: meaning for randomized programs
   - **Effect systems**: tracking side effects in types (algebraic effects, monads)
   - Why modern PL research uses each approach

6. **Choosing the Right Tool**
   - Verification and correctness → Axiomatic
   - Library/API design → Algebraic
   - Language specification → Action or Operational
   - Theoretical foundations → Denotational or Categorical
   - Probabilistic programming → Probabilistic semantics
   - No single approach is "best" — each illuminates different aspects

### Key Deliverable
Students understand the landscape of semantic methods beyond operational and
denotational. They can write simple Hoare triples, understand algebraic
specifications, and appreciate why different semantic methods exist.

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
   - Petal comes full circle: we designed it (LN8), parsed it (LN9),
     and gave it meaning (LN10-12)

2. **Type Systems in Depth**
   - Type checking as a semantic analysis (context constraints from LN8)
   - Type inference: Hindley-Milner and Algorithm W
   - Gradual typing: bridging static and dynamic (TypeScript, Python)
   - Dependent types: types that depend on values (Idris, Agda)
   - Connection to LN4: Simply Typed Lambda Calculus as the foundation

3. **Modern Language Design Trends**
   - Algebraic effects and handlers (replacing monads)
   - Pattern matching and algebraic data types
   - Ownership and borrowing (Rust's approach to memory safety)
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
   - LN1-4: we built mathematical tools (logic, sets, functions)
   - LN5-6: we surveyed what those tools can describe (theories, pragmatics)
   - LN7-9: we used the tools to define and parse languages (syntax)
   - LN10-13: we used the tools to define meaning (semantics)
   - LN14: we see it all working together in real systems
   - The central thesis: programming languages are formal mathematical objects,
     and understanding their foundations makes you a better designer, implementer,
     and user of languages

### Suggested Interactive Components
- `FullPipelineVisualizer`: show a Petal program flowing through every stage
- `TypeInferenceStepper`: Given an AST, generate "Type Equations" (e.g., $T_1 = T_2 \to T_3$) and let the user step through a **Unification Algorithm** that visually connects variables together into equivalence classes.
- Side-by-side: Petal source → tokens → CST → AST → evaluation result

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
| Propositional/Predicate Logic | LN1-2 | LN7 (quantifiers in definitions), LN11 (inference rules), LN13 (Hoare triples) |
| Set Theory | LN3 | LN7 (languages as sets), LN10 (semantic domains), LN12 (domain theory) |
| Lambda Calculus | LN4 | LN9 (semantic actions), LN11 (beta = small-step), LN12 (fixed points) |
| Chomsky Hierarchy | LN7 | LN8 (lexical=Type3, phrase=Type2), LN9 (parser architecture) |
| Pragmatics | LN6 | LN8 (concrete syntax choices), LN14 (modern design trends) |
| Ambiguity | LN7 | LN8 (dangling else), LN9 (PEG determinism) |
| ASTs | LN8 | LN9-14 (input to all semantic phases) |
| Petal (mini-language) | LN8 | LN9 (parse), LN10 (informal semantics), LN11 (operational), LN12 (denotational), LN13 (axiomatic), LN14 (full pipeline) |
| Fixed Points / Y combinator | LN4 | LN12 (loop semantics) |
| DFAs / PDAs / TMs | LN5, LN7 | LN8 (scanner=DFA, parser=PDA), LN9 (parser implementation) |

---

## Petal Language Growth Roadmap

The mini-language grows across lectures:

| Lecture | Petal Features |
|---------|---------------|
| LN8 | Expressions (arithmetic, unary, binary, calls), assignments, print |
| LN9 | Same features, but now with a working parser producing ASTs |
| LN10 | Same features, with informal semantics defined |
| LN11 | Add if-else, while loops; operational semantics for all |
| LN12 | Same features; denotational semantics (fixed points for while) |
| LN13 | Same features; axiomatic reasoning about correctness |
| LN14 | Full pipeline demonstration with all features |
