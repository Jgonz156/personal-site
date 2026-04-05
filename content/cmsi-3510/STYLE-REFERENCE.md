# CMSI 3510 — Lecture Style Reference

This document captures the structural patterns, component usage norms, and content
density standards established by the course lectures. Use it as a checklist when
writing or revising any lecture.

---

## Required Section Structure

Every lecture follows this skeleton:

```
## Recap
(Bridge from previous lecture: bulleted list of prior topics followed by
1-2 paragraphs connecting forward. LN1 is exempt.)

## Today's Agenda
(Numbered list of 4-9 topics with bold titles and em-dash descriptions)

---

## [Content Section 1]
### [Subsection 1a]
### [Subsection 1b]

---

## [Content Section 2]
...

---

## Summary
(Bulleted or prose recap of key ideas from the lecture)

<LectureNotes>
**Key Definitions:**
(Table format: | Term | Definition |)

(Optional supplemental sections: **Key Comparisons:**, **Quick Reference:**,
additional summary bullets, etc.)
</LectureNotes>

<LectureResources>
### Recommended Reading
(2-4 textbook/OSTEP links with one-line descriptions)

### [Topic-Specific Category]
(2-4 specialized references — name the category to match the lecture topic,
e.g., "Hardware References", "Safety-Critical Case Studies",
"Architecture References", "Linux Tools")

### Historical Context
(2-4 historical links: seminal papers, origin stories, notable events)

### Rust Systems Programming
(2-3 Rust-specific links — include when the lecture has Rust code examples)
</LectureResources>
```

### Section Rules

- Use `---` horizontal rules between every major `##` section.
- Target **5-10 major `##` sections**, each with **1-4 `###` subsections**.
- The `## Recap` should explicitly name what was covered and why it matters today.
  Use a bulleted list of prior topics (bold titles with em-dash descriptions)
  followed by 1-2 paragraphs of connective prose.
- The `## Today's Agenda` should read like a scannable table of contents.
  Use a numbered list with bold titles and em-dash descriptions.
- The `## Summary` should restate the key takeaways from the lecture. Use a
  consistent heading — not variant titles like "Summary So Far" or
  "Key Takeaways." A summary table (| Component | Role | Key Insight |) is
  a strong closing pattern established in later lectures.
- All imports must appear at the top of the file, before any content.

---

## Component Usage

### DefinitionBox

**Import:** `import { DefinitionBox } from "@/components/interactive-example"`

**Prop:** `term` (NOT `title`).

```mdx
<DefinitionBox term="Interrupt">

An **interrupt** is a signal that causes the CPU to suspend its current
execution, save its state, and jump to a special handler routine. After
handling the interrupt, the CPU restores its state and resumes where it
left off.

</DefinitionBox>
```

**Rules:**
- Every new formal concept gets its own `DefinitionBox` at the point of first use.
- Can contain `<DisplayMath>` or tag components (e.g., `<MemoryTag>`) inside.
- Target: **3-8 per lecture** depending on term density.
  - Definition-heavy lectures (LN7, LN11, LN12): 8-13
  - Lighter lectures (LN1, LN6, LN16): 2-3

### DisplayMath / InlineMath

**Import:** `import { DisplayMath, InlineMath } from "@/components/math"`

```mdx
<DisplayMath formula="U = \sum_{i=1}^{n} \frac{C_i}{T_i} \leq n(2^{1/n} - 1)" />
```

**Rules:**
- Use only when mathematical formulas genuinely arise (scheduling utilization
  bounds, address calculations, Amdahl's Law, etc.).
- Not expected in every lecture — this is an OS course, not a math course.
- Prefer `<DisplayMath>` over raw `$$...$$` blocks when used.
- `<InlineMath>` is **required** when LaTeX contains curly braces (`{}`), since
  MDX interprets bare `{}` as JSX expressions.
- Target: **0-6 per lecture**. Most lectures use 0-3.

### Tag / Legend Systems

When a lecture introduces a cross-cutting categorization scheme, create a
bespoke `*Tag` / `*TagLegend` component pair. Introduce the legend near the
top of the content (typically right after the first content section heading or
within the agenda).

Established tag systems:
- `ManagerTag` / `ManagerLegend` — process manager perspectives (LN9)
- `ScheduleTag` / `ScheduleTagLegend` — scheduling algorithm categories (LN11)
- `DeadlockTag` / `DeadlockTagLegend` — deadlock concept categories (LN12)
- `MemoryTag` / `MemoryTagLegend` — memory type categories (LN13-LN16)
- `IOTag` / `IOTagLegend` — I/O device type categories: block, character, network (LN17+)

```mdx
<DeadlockTagLegend />

...

The four <DeadlockTag type="condition">Coffman conditions</DeadlockTag> must
all hold simultaneously for <DeadlockTag type="danger">deadlock</DeadlockTag>
to occur.
```

**Rules:**
- Tags are inline colored labels that categorize concepts within prose.
- The legend provides a key explaining the color-category mapping.
- A tag system is lecture-specific or spans a unit (e.g., `MemoryTag` across
  the memory unit). Not every lecture needs one.

### Interactive Visualizers and Steppers

**Rules:**
- When a custom visualizer is introduced, provide contextual surrounding prose
  explaining **what to look for** and **what to try**.
- Progressive reveal is a strong pattern for building up complex systems —
  show the same component multiple times with incrementally more parts visible
  (cf. LN8's `ProgressiveCPU` used 7 times across the lecture).
- Interactive components should have descriptive props (`title`, `label`,
  `caption`, etc.) to orient the student.
- Target: **2-8 instances per lecture** in OS-concept lectures (LN6+).
  Rust-language lectures (LN1-LN5) may have 0.

Established bespoke components (representative, not exhaustive):
- `-demo` suffix: `PagingDemo`, `DiningPhilosophersDemo`, `SegmentationDemo`
- `-stepper` suffix: `ResourceAllocationStepper`, `MMUTranslationStepper`
- `-diagram` suffix: `MemoryLayoutDiagram`, `ISAComparisonDiagram`
- `-animation` suffix: `ContextSwitchAnimation`
- `-panel` suffix: `PCBPanel`, `CoffmanConditionsPanel`

### LectureNotes

Always appears near the end of the lecture, immediately before `<LectureResources>`.
Contains:

- **Key Definitions:** — a `| Term | Definition |` table restating every formal
  term introduced in the lecture. This is the dominant format for OS-concept
  lectures (LN6+).
- Optional supplemental sections: **Key Comparisons:**, **Quick Reference:**,
  summary code blocks, or additional bulleted takeaways.

Bulleted `**Key Takeaways:**` format (without a definition table) is acceptable
for lectures that introduce fewer formal terms (e.g., Rust-language lectures,
memory hardware overview).

```mdx
<LectureNotes>

**Key Definitions:**

| Term | Definition |
| :--- | :--- |
| **ISA** | Instruction Set Architecture — the contract between software and hardware |
| **ALU** | Arithmetic Logic Unit — performs arithmetic, logic, and comparison operations |

**ISA Comparison:**

| Property | CISC | RISC |
| :--- | :--- | :--- |
| Instructions | Many, complex | Few, simple |
| Length | Variable | Fixed |

</LectureNotes>
```

### LectureResources

Always the last element. Contains **categorized `###` subsections** with bulleted
links. Each link includes a one-line description after an em-dash.

The subsection names adapt to the lecture topic, but the general pattern is:

1. `### Recommended Reading` — textbooks, OSTEP chapters, survey references
2. `### [Topic-Specific]` — specialized references matching the lecture subject
3. `### Historical Context` — seminal papers, notable events, origin stories
4. `### Rust Systems Programming` — Rust-specific links (when applicable)

Target: **3-5 subsections** with **2-4 links each**.

```mdx
<LectureResources>

### Recommended Reading

- [OSTEP Chapter 32: Concurrency Bugs](https://pages.cs.wisc.edu/~remzi/OSTEP/) — Free textbook covering deadlock, livelock, and race conditions
- [Modern Operating Systems (Tanenbaum) Ch. 6](https://www.pearson.com/...) — Comprehensive deadlock coverage

### Safety-Critical Case Studies

- [What Really Happened on Mars](https://www.microsoft.com/...) — The Pathfinder priority inversion story
- [An Investigation of the Therac-25 Accidents](https://ieeexplore.ieee.org/...) — Radiation incident analysis

### Historical Context

- [The Dining Philosophers Problem (Dijkstra, 1971)](https://www.cs.utexas.edu/...) — Original formulation

</LectureResources>
```

---

## Content Elements

### Blockquotes

Use `>` blockquotes as the **human voice** of the lecture — moments where the
instructor steps out of the technical exposition to offer perspective, history,
humor, or encouragement. Blockquotes are the **only place emojis appear** in the
lecture content. The emoji prefix is part of what gives these asides their
distinctive, approachable character.

**Three purposes:**

1. **Historical context** — origin stories, named researchers, notable events
   and failures.
2. **Fun reinterpretations** — surprising connections, analogies, "did you know"
   moments, and playful takes on technical concepts.
3. **Instructor asides** — key insights, warnings, cross-lecture connections,
   practical tips, and motivational framing.

```mdx
> **📚 Historical Note:** Edsger Dijkstra first formalized deadlocks in 1965
> alongside his invention of semaphores. The term "deadly embrace" was used
> in early IBM documentation before "deadlock" became standard.

> **💡 Connection to LN7:** This is task parallelism at the hardware level —
> exactly the **car wash** analogy! Each pipeline stage is a "station" doing
> one specialized job.

> **💀 Historical Disaster — The Itanium:** Intel bet billions on IA-64, a
> VLIW architecture. The bet was that compilers could schedule parallelism
> better than hardware. They couldn't.

> **🤔 The Problem:** We want our program to reduce its memory usage! Not
> increase it!
```

**Established emoji vocabulary:**

| Emoji | Label Pattern | Purpose |
|-------|--------------|---------|
| 💡 | `**💡 Key Insight:**`, `**💡 Connection to LNX:**` | Conceptual connections, important observations |
| 📌 | `**📌 Key Point:**`, `**📌 Callback to...**` | Anchoring statements, important notes |
| 🤔 | `**🤔 The Dilemma:**`, `**🤔 But wait...**` | Provocative questions, tensions, puzzles |
| ⚠️ | `**⚠️ Gotcha:**`, `**⚠️ Lesson:**` | Warnings, common pitfalls, caveats |
| 📚 | `**📚 Historical Note:**`, `**📚 Moore's Law:**` | Historical context, scholarly references |
| 💀 | `**💀 Historical Disaster:**`, `**💀 The Fork Bomb:**` | Cautionary tales, notable failures |
| 💻 | `**💻 The `nice` Command:**` | Practical terminal/tool tips |
| 🍽️ | `**🍽️ The Restaurant Metaphor:**` | Extended analogies (use sparingly) |

**Rules:**
- Blockquotes are the **only** location for emojis. Do not use emojis in
  headings, definition boxes, tables, code blocks, prose, or any other element.
- Every blockquote should use a **bold emoji-prefixed label** from the vocabulary
  above. Plain blockquotes (no label) are acceptable for short quoted definitions
  or brief asides, but the labeled form is strongly preferred.
- Do NOT use blockquotes for formal definitions (use `DefinitionBox` instead).
- Target: **4-15 per lecture**. Distribute throughout the content, not clustered.

### Code Blocks

- Primary language: **Rust**. Use labeled fences (` ```rust `).
- Unlabeled fences are acceptable for pseudocode, ASCII diagrams, assembly
  snippets, and ISA-level examples.
- Python, Bash, and C are acceptable where topic-appropriate.
- Target: **3-20 code blocks per lecture** for Rust/implementation lectures.
  **0 is acceptable** for hardware-theory lectures (LN13-LN16 have none).

### Tables

Use markdown tables for:
- Comparison charts (e.g., CISC vs RISC, paging vs segmentation).
- Property summaries (e.g., register tables, interrupt priority).
- Feature matrices and tradeoff analyses.
- Reference tables inside `<LectureNotes>`.

Target: **3-8 tables** in prose, plus additional tables inside `<LectureNotes>`.

### Horizontal Rules

- Place `---` between every major `##` section.
- Target: **8-15 per lecture** depending on section count.

---

## Visual Design Principle

**Emojis are the human voice; color carries technical meaning.** Emojis appear
exclusively in blockquotes, where they signal that the instructor is stepping
outside the formal exposition to share context, insight, or personality. Color
and visual styling are reserved for components that demand structured student
attention: `DefinitionBox` (formal terms), tag/legend systems (categorization),
and interactive visualizers (exploration). All other content — including tables,
code blocks, and prose — uses the default monochrome rendering.

Do not add emojis to headings, tables, definition boxes, or prose paragraphs.

---

## Content Density Targets

| Metric | Minimum | Target Range | Maximum |
|--------|---------|-------------|---------|
| Total lines | 500 | 600-900 | ~1700 |
| DefinitionBoxes | 1 | 3-8 | 13 |
| DisplayMath | 0 | 0-3 | 6 |
| Interactive instances | 0 | 2-8 | 10+ |
| Code blocks | 0 | 3-15 | 69 |
| Blockquotes | 1 | 4-15 | 56 |
| Tables | 0 | 3-8 | 15+ |
| Horizontal rules | 8 | 9-16 | 32 |

---

## Established Lecture Metrics (Reference)

| Lecture | Lines | DefBoxes | DisplayMath | Interactives | Code | Blockquotes | Tables |
|---------|-------|----------|-------------|-------------|------|-------------|--------|
| LN1 | 314 | 2 | 0 | 0 | 10 | 5 | 5 |
| LN2 | 513 | 1 | 0 | 0 | 18 | 17 | 8 |
| LN3 | 534 | 3 | 0 | 0 | 17 | 11 | 7 |
| LN4 | 1258 | 7 | 0 | 0 | 42 | 56 | 13 |
| LN5 | 1699 | 3 | 0 | 0 | 69 | 18 | 14 |
| LN6 | 675 | 3 | 0 | 6 | 13 | 9 | 6 |
| LN7 | 903 | 13 | 0 | 2 | 22 | 32 | 13 |
| LN8 | 745 | 6 | 0 | 9 | 13 | 31 | 12 |
| LN9 | 598 | 2 | 0 | 8 | 9 | 19 | 10 |
| LN10 | 416 | 5 | 0 | 5 | 3 | 11 | 8 |
| LN11 | 819 | 12 | 9 | 6 | 1 | 6 | 11 |
| LN12 | 867 | 8 | 2 | 5 | 7 | 7 | 8 |
| LN13 | 350 | 7 | 0 | 4 | 0 | 4 | 3 |
| LN14 | 307 | 6 | 0 | 5 | 0 | 7 | 1 |
| LN15 | 270 | 6 | 0 | 6 | 0 | 5 | 0 |
| LN16 | 355 | 2 | 0 | 5 | 0 | 10 | 3 |
| LN17 | 440 | 10 | 0 | 10 | 0 | 14 | 8 |

---

## Checklist (Use Before Submitting a Lecture)

- [ ] `## Recap` present and bridges from previous lecture (exempt: LN1)
- [ ] `## Today's Agenda` present with numbered topic list
- [ ] `## Summary` present with consistent heading
- [ ] `<LectureNotes>` with **Key Definitions** table (or **Key Takeaways** bullets)
- [ ] `<LectureResources>` with categorized `###` subsections
- [ ] All imports at the top of the file
- [ ] Every new formal term has a `<DefinitionBox term="...">`
- [ ] All `DefinitionBox` instances use `term=` prop (not `title=`)
- [ ] Standalone math (when present) uses `<DisplayMath formula="..." />`
- [ ] Inline math with curly braces uses `<InlineMath formula="..." />`
- [ ] Interactive components have contextual prose explaining what to observe
- [ ] Tag/Legend pairs introduced early when cross-cutting categorization is used
- [ ] Blockquotes use emoji-prefixed bold labels from established vocabulary
- [ ] Emojis appear **only** in blockquotes — nowhere else in the lecture
- [ ] Rust code shown for concepts with programming analogs (where applicable)
- [ ] Tables used for comparisons and property summaries
- [ ] `---` between every major section
- [ ] Total line count in 250-1700 range (target 400-900)
