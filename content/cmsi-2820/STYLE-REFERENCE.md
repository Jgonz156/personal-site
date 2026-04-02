# CMSI 2820 — Lecture Style Reference

This document captures the structural patterns, component usage norms, and content
density standards established by the course lectures. Use it as a checklist when
writing or revising any lecture.

---

## Required Section Structure

Every lecture follows this skeleton:

```
## Recap
(Bridge from previous lecture: 2-4 paragraphs restating key takeaways
and connecting to today's topic. LN1 is exempt.)

## Today's Agenda
(Bulleted list of 3-6 topics with brief one-line descriptions)

---

## [Content Section 1]
### [Subsection 1a]
### [Subsection 1b]

---

## [Content Section 2]
...

---

## Coming Up Next
(1-2 paragraphs previewing the next lecture and connecting forward)

## Key Takeaways

<LectureNotes>
**[Topic Group 1]:**
(Bulleted definitions and key results)

**[Topic Group 2]:**
...

**Callbacks Across the Course:**
(Table mapping this lecture's concepts to specific prior lectures)
</LectureNotes>

<LectureResources>
### Recommended Viewing
(2-4 video links)

### Further Reading
(3-6 reference links)

### Historical Context
(Named mathematicians, origin stories, etymology)

### Connection to Programming
(Python analogs, real-world applications, course connections)
</LectureResources>
```

### Section Rules

- Use `---` horizontal rules between every major `##` section.
- Target **4-8 major `##` sections**, each with **1-4 `###` subsections**.
- The `## Recap` should explicitly name what was covered and why it matters today.
- The `## Today's Agenda` should read like a scannable table of contents.
- The `## Coming Up Next` should preview the next lecture topic and connect it
  to what was just learned. This section is exempt for the final lecture.
- The `## Key Takeaways` heading immediately precedes `<LectureNotes>`.

---

## Component Usage

### DefinitionBox

**Import:** `import { DefinitionBox } from "@/components/interactive-example"`

**Prop:** `term` (NOT `title`).

```mdx
<DefinitionBox term="Graph">
A graph is an ordered pair $G = (V, E)$ where $V$ is a set of vertices
and $E$ is a set of edges connecting pairs of vertices.
</DefinitionBox>
```

**Rules:**
- Every new formal concept gets its own `DefinitionBox` at the point of first use.
- Can contain `<DisplayMath>` inside for formal notation.
- Target: **3-8 per lecture** depending on term density.
  - Definition-heavy lectures (LN9, LN10, LN20): 9-13
  - Lighter lectures (LN2, LN14, LN18): 3-4

### DisplayMath

**Import:** `import { DisplayMath } from "@/components/math"`

```mdx
<DisplayMath formula="P(n, r) = \frac{n!}{(n - r)!}" />
```

**Rules:**
- Use for every formal definition, equation, or standalone notation.
- Prefer `<DisplayMath>` over raw `$$...$$` blocks.
- Target: **3-18 per lecture** depending on mathematical density.

### InlineMath

**Import:** `import { InlineMath } from "@/components/math"`

```mdx
We write <InlineMath formula="\mathcal{P}(A)" /> for the power set of A.
```

**Rules:**
- Prefer `<InlineMath>` over raw `$...$` syntax for consistency.
- **Required** when the LaTeX contains curly braces (`{}`), since MDX interprets
  bare `{}` as JSX expressions. Expressions like `\mathcal{P}(A)`, `\{a, b\}`,
  or `\binom{n}{k}` must use the component form.
- Raw `$...$` is acceptable only for very simple expressions without braces
  (e.g., `$n$`, `$k + 1$`), though the component form is always preferred.

### PracticeBox

**Import:** `import { PracticeBox } from "@/components/interactive-example"`

```mdx
<PracticeBox
  question="What is the degree of vertex A in graph G?"
  options={["1", "2", "3", "4"]}
  correctIndex={2}
  hint="Count the number of edges incident to vertex A."
  explanation="Vertex A has edges to B, C, and D, so deg(A) = 3."
/>
```

**Rules:**
- Multiple-choice format with `hint` and `explanation` props.
- Interleave with content — don't cluster all practice at the end.
- Target: **3-8 per lecture** for active recall throughout.

### Interactive Visualizers

**Rules:**
- When a custom visualizer is introduced, provide **at least 2 instances**
  with different inputs to reinforce the mechanism.
- The first instance: simple, fully walkable example.
- Subsequent instances: increase complexity, show edge cases, or contrast behavior.
- Target: **2-10 instances** depending on the component.
- Each instance should have a descriptive `title` or label.

Available components (use where content-appropriate):
- `GraphVisualization` — graph theory lectures
- `VennDiagram` — set theory lectures
- `NumberLine` — operator/number lectures
- `PascalTriangleBuilder`, `PascalTrianglePatterns`, `PascalTriangleChoose` — combinatorics
- `BijectionVisualizer`, `PigeonholeDiagram` — proof technique lectures
- `EulerPathExplorer`, `SubgraphExplorer`, `EdgeContractionStepper` — graph theory
- `HashTableVisualizer`, `BirthdayParadoxChart` — hashing/pigeonhole lectures

### LectureNotes

Always immediately follows the `## Key Takeaways` heading. Contains:
- **Topic-organized sections** with bulleted definitions and key results.
- **Callbacks Across the Course** table mapping concepts to specific prior lectures.

The callbacks table format:

```mdx
**Callbacks Across the Course:**

| This Lecture | Previous Lecture |
| :--- | :--- |
| Trees as CS data structures | LN12-14: lambda expressions parsed into trees |
| Weighted graph representations | LN20: adjacency lists for unweighted graphs |
```

### LectureResources

Always the last element. Contains four subsections:
- `### Recommended Viewing` — 2-4 curated video links with one-line descriptions.
- `### Further Reading` — 3-6 reference links (Wikipedia, textbooks, papers).
- `### Historical Context` — Named mathematicians with birth/death years and contributions.
- `### Connection to Programming` — Python analogs and real-world applications.

---

## Content Elements

### Blockquotes

Use `>` blockquotes for three purposes:
- **Historical callouts** — named mathematicians, origin stories, etymology.
- **Fun side tangents** — surprising connections, "did you know" moments.
- **"Human moments"** — reflections, motivation, encouragement, real-world relevance.

```mdx
> **Historical Note:** Euler solved the Königsberg bridge problem in 1736,
> founding graph theory as a discipline — all because he wanted to prove
> a pleasant Sunday walk was impossible.

> **Side Note:** The Cartesian product is named after René Descartes,
> the same philosopher who said "I think, therefore I am." His coordinate
> system paired two number lines — the original product of two sets.

> This doesn't work very well because the information we're considering is
> significantly more complex and dense than we have tools for at the moment.
```

**Rules:**
- **Do NOT use emoji prefixes.** Color is reserved for styled visual components
  (`DefinitionBox`, `PracticeBox`, interactive visualizers). Blockquotes should
  use bold text headers where appropriate (e.g., `> **Historical Note:**`,
  `> **Key Insight:**`, `> **Side Note:**`).
- Do NOT use blockquotes for formal definitions (use `DefinitionBox` instead).
- Target: **4-10 per lecture**. Distribute throughout the content, not clustered.

### Code Blocks

- When a concept has a programming analog, show it in Python (primary language).
- Use labeled fences (e.g., ` ```python `).
- Target: **3-10 code blocks per lecture** depending on content.
  - Implementation-heavy lectures (LN9, LN12): 14-20
  - Theory-heavy lectures (LN14, LN22): 2-4

### Tables

Use markdown tables for:
- Comparison charts (e.g., operator properties, graph families).
- Truth tables and operation tables.
- Property summary matrices.
- Reference tables inside `<LectureNotes>`.

Target: **3-8 tables** in prose, plus additional tables inside `<LectureNotes>`.

### Horizontal Rules

- Place `---` between every major `##` section.
- Target: **6-15 per lecture** depending on section count.

---

## Visual Design Principle

**Color carries meaning.** Reserve color and visual styling for components that
demand student attention: `DefinitionBox` (formal terms), `PracticeBox` (active
recall), and interactive visualizers (exploration). All other content — including
blockquotes, tables, and code blocks — uses the default monochrome rendering.
Do not add emojis to blockquotes or headings.

---

## Content Density Targets

| Metric | Minimum | Target Range | Maximum |
|--------|---------|-------------|---------|
| Total lines | 400 | 550-800 | ~1100 |
| DefinitionBoxes | 3 | 4-8 | 13 |
| DisplayMath | 3 | 5-15 | 18 |
| PracticeBoxes | 2 | 3-8 | 11 |
| Code blocks | 2 | 3-10 | 20 |
| Blockquotes | 4 | 4-10 | 23 |
| Tables | 1 | 3-8 | 17 |
| Horizontal rules | 6 | 8-12 | 15 |

---

## Established Lecture Metrics (Reference)

| Lecture | Lines | DefBoxes | DisplayMath | Interactives | Code | Blockquotes | Tables | PracticeBoxes |
|---------|-------|----------|-------------|-------------|------|-------------|--------|---------------|
| LN1 | 418 | 5 | 9 | 1 | 3 | 6 | 17 | 0 |
| LN2 | 392 | 3 | 3 | 0 | 5 | 15 | 6 | 0 |
| LN4 | 430 | 5 | 5 | 0 | 7 | 6 | 10 | 0 |
| LN5 | 467 | 5 | 5 | 18 | 4 | 14 | 0 | 0 |
| LN6 | 553 | 4 | 8 | 16 | 6 | 8 | 9 | 0 |
| LN7 | 584 | 4 | 11 | 1 | 6 | 3 | 10 | 0 |
| LN8 | 619 | 4 | 8 | 0 | 5 | 5 | 17 | 0 |
| LN9 | 804 | 9 | 12 | 0 | 20 | 8 | 14 | 0 |
| LN10 | 727 | 13 | 18 | 13 | 5 | 5 | 12 | 0 |
| LN11 | 685 | 6 | 15 | 0 | 7 | 23 | 7 | 0 |
| LN12 | 653 | 8 | 15 | 0 | 14 | 6 | 6 | 0 |
| LN13 | 605 | 5 | 6 | 0 | 5 | 1 | 8 | 0 |
| LN14 | 296 | 3 | 8 | 0 | 4 | 8 | 5 | 0 |
| LN15 | 481 | 4 | 3 | 0 | 3 | 6 | 8 | 0 |
| LN16 | 649 | 6 | 7 | 0 | 6 | 8 | 4 | 8 |
| LN17 | 673 | 8 | 14 | 0 | 7 | 1 | 4 | 5 |
| LN18 | 601 | 3 | 6 | 3 | 5 | 2 | 5 | 5 |
| LN19 | 573 | 6 | 5 | 2 | 5 | 2 | 4 | 7 |
| LN20 | 747 | 9 | 12 | 6 | 4 | 0 | 2 | 11 |
| LN21 | 1102 | 7 | 15 | 3 | 4 | 0 | 2 | 5 |
| LN22 | 569 | 5 | 4 | 8 | 2 | 0 | 1 | 2 |
| LN23 | 734 | 5 | 8 | 2 | 3 | 0 | 2 | 2 |

---

## Checklist (Use Before Submitting a Lecture)

- [ ] `## Recap` present and bridges from previous lecture (exempt: LN1)
- [ ] `## Today's Agenda` present with bulleted topic list
- [ ] `## Coming Up Next` present with forward-looking preview (exempt: final lecture)
- [ ] `## Key Takeaways` heading immediately precedes `<LectureNotes>`
- [ ] `<LectureNotes>` with topic-organized bullets and **Callbacks** table
- [ ] `<LectureResources>` with Viewing, Reading, History, and Programming sections
- [ ] Every new formal term has a `<DefinitionBox term="...">`
- [ ] All standalone math uses `<DisplayMath formula="..." />`
- [ ] All inline math with curly braces uses `<InlineMath formula="..." />`
- [ ] No raw `$$...$$` blocks remain
- [ ] All `DefinitionBox` instances use `term=` prop (not `title=`)
- [ ] Interactive components have 2+ instances with different inputs
- [ ] `PracticeBox` instances (3+) distributed throughout, not clustered
- [ ] Blockquotes used for history, tangents, and human moments (4+ per lecture)
- [ ] No emoji prefixes on blockquotes or headings
- [ ] Python code shown for concepts with programming analogs
- [ ] Tables used for comparisons and property summaries (3+ per lecture)
- [ ] `---` between every major section
- [ ] Total line count in 400-1100 range
