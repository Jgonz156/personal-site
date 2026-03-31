# CMSI 5850 — Lecture Style Reference

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
(Bulleted list of 5-8 topics with brief one-line descriptions)

---

## [Content Section 1]
### [Subsection 1a]
### [Subsection 1b]

---

## [Content Section 2]
...

---

## Summary
(3-5 paragraphs recapping key ideas and previewing next lecture)

<LectureNotes>
**Key Definitions:**
(Bulleted list of every formal term introduced, with compact definitions)

**Key Connections:**
(Bulleted list mapping today's concepts to previous lectures)
</LectureNotes>

<LectureResources>
### Additional Resources
(Bulleted list of 4-8 external links: mentor notes, textbook chapters,
papers, tools)
</LectureResources>
```

### Section Rules

- Use `---` horizontal rules between every major `##` section.
- Target **5-8 major `##` sections**, each with **2-4 `###` subsections**.
- The `## Recap` should explicitly name what was covered and why it matters today.
- The `## Today's Agenda` should read like a table of contents students can scan.
- The `## Summary` should restate the 3-4 most important takeaways and preview
  the next lecture with a forward-looking sentence.

---

## Component Usage

### DefinitionBox

**Import:** `import { DefinitionBox } from "@/components/interactive-example"`

**Prop:** `term` (NOT `title` — the component accepts `term`).

```mdx
<DefinitionBox term="Semantic Domain">
A mathematical set that serves as the codomain of a meaning function...
</DefinitionBox>
```

**Rules:**
- Every new formal concept gets its own DefinitionBox at the point of first use.
- Can contain `<DisplayMath>` inside for formal notation.
- Target: **5-15 per lecture** depending on term density.
  - Math-heavy lectures (LN2, LN3, LN7, LN11, LN12): 10-24
  - Survey/narrative lectures (LN1, LN6, LN14): 2-5

### DisplayMath

**Import:** `import { DisplayMath } from "@/components/math"`

```mdx
<DisplayMath formula="\langle e, \sigma \rangle \Downarrow v" />
```

**Rules:**
- Use for every formal definition, inference rule, equation, or standalone notation.
- Never use raw `$$...$$` blocks — always use the component.
- Target: **10-30** for math-heavy lectures, **1-5** for narrative lectures.

### InlineMath

**Import:** `import { InlineMath } from "@/components/math"`

- Rarely needed — raw `$...$` syntax works for most inline math.
- Reserve `<InlineMath>` for cases where raw syntax causes MDX parsing issues
  (e.g., curly braces interpreted as JSX).

### Interactive Steppers and Visualizers

**Rules:**
- When a stepper/visualizer is introduced, provide **at least 2-3 instances**
  with different inputs to reinforce the mechanism.
- The first instance: simple, fully walkable example.
- Subsequent instances: increase complexity, show edge cases, or contrast behavior.
- Target: **4-10 instances** for component-heavy lectures (LN4, LN7-LN9).
- Target: **2-4 instances** for lighter lectures (LN10, LN13).
- Each instance must have a descriptive `title` (or `term`) prop.

### LectureNotes

Always the second-to-last element. Contains:
- **Key Definitions:** bulleted, compact restatements of every formal term.
- **Key Connections:** bulleted, mapping today's concepts to specific prior lectures.

### LectureResources

Always the last element. Contains:
- `### Additional Resources` subheading.
- 4-8 bulleted links: mentor notes, textbook chapters, seminal papers, tools.

---

## Content Elements

### Code Blocks

- When a concept has a programming language analog, show it in **2-4 languages**.
- Preferred set: Python, JavaScript, Haskell, Rust (established in LN4).
- Use labeled fences (e.g., ` ```python `). Unlabeled fences are acceptable for
  pseudocode, grammar rules, and generic notation.
- Target: **5-15 code blocks per lecture** depending on content.

### Blockquotes

Use `>` blockquotes for:
- Historical context and attributions (researcher names, years, significance).
- "Why this matters" asides connecting theory to practice.
- Important caveats, warnings, or non-obvious implications.
- Memorable quotes from researchers or language designers.

Target: **4-10 per lecture**. Do NOT use blockquotes for formal definitions
(use DefinitionBox instead).

### Tables

Use markdown tables for:
- Comparison charts (e.g., small-step vs big-step, language feature matrices).
- Reference summaries inside `<LectureNotes>`.
- Side-by-side feature or property matrices.

Target: **2-5 tables** in prose, plus additional tables inside `<LectureNotes>`.

### Horizontal Rules

- Place `---` between every major `##` section.
- Target: **8-15 per lecture** depending on section count.

---

## Content Density Targets

| Metric | Minimum | Target Range | Maximum |
|--------|---------|-------------|---------|
| Total lines | 700 | 900-1300 | ~1400 |
| DefinitionBoxes | 2 | 5-15 | 24 |
| DisplayMath | 1 | 5-30 | 39 |
| Interactive instances | 1 | 2-10 | 18 |
| Code blocks | 1 | 5-15 | 27 |
| Blockquotes | 2 | 4-10 | 25 |
| Tables | 1 | 2-5 | 34 |
| Horizontal rules | 6 | 8-15 | 67 |

---

## Established Lecture Metrics (Reference)

| Lecture | Lines | DefBoxes | DisplayMath | Interactives | Code | Blockquotes | Tables |
|---------|-------|----------|-------------|-------------|------|-------------|--------|
| LN1 | 680 | 2 | 0 | 0 | 26 | 12 | 9 |
| LN2 | 960 | 17 | 13 | 0 | 6 | 21 | 34 |
| LN3 | 1148 | 24 | 30 | 0 | 3 | 22 | 26 |
| LN4 | 1370 | 11 | 39 | 11 | 27 | 25 | 25 |
| LN5 | 711 | 9 | 0 | 2 | 3 | 14 | 17 |
| LN6 | 975 | 3 | 1 | 0 | 24 | 13 | 7 |
| LN7 | 1290 | 16 | 9 | 18 | 15 | 4 | 1 |
| LN8 | 1377 | 10 | 14 | 9 | 22 | 0 | 1 |
| LN9 | 1069 | 3 | 1 | 6 | 16 | 1 | 2 |

---

## Checklist (Use Before Submitting a Lecture)

- [ ] `## Recap` present and bridges from previous lecture
- [ ] `## Today's Agenda` present with bulleted topic list
- [ ] `## Summary` present with forward-looking preview
- [ ] `<LectureNotes>` with **Key Definitions** and **Key Connections**
- [ ] `<LectureResources>` with `### Additional Resources`
- [ ] Every new formal term has a `<DefinitionBox term="...">`
- [ ] All standalone math uses `<DisplayMath formula="..." />`
- [ ] No raw `$$...$$` blocks remain
- [ ] All `DefinitionBox` instances use `term=` prop (not `title=`)
- [ ] Interactive components have 2+ instances with different inputs
- [ ] Concepts with programming analogs shown in 2-4 languages
- [ ] Blockquotes used for historical context and asides (4+ per lecture)
- [ ] `---` between every major section
- [ ] Total line count in 700-1400 range
