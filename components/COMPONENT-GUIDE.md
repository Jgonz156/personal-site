# Component Guide

This document captures the design philosophy, naming conventions, authoring
patterns, and technical constraints that govern components on this site.
It is intentionally principle-based rather than catalog-based — nothing here
should need updating when a component is added or removed.

For lecture content conventions (section structure, density targets, component
usage norms), see the per-course `STYLE-REFERENCE.md` files in each
`content/cmsi-*/` directory.

---

## 1. Component Philosophy

Components on this site are **bespoke interactive figures**, not a reusable
UI library. Each one is purpose-built for a specific pedagogical moment in a
specific lecture — the way a textbook illustration is drawn for the page it
appears on.

**The default is a one-off.** When a component is created, assume it serves
exactly one lecture and will never be imported elsewhere. Its interface can be
as specific and opinionated as it needs to be. There is no pressure to
generalize, parameterize, or abstract.

**Reusability is explicitly designed for.** When a component genuinely needs
to appear across multiple lectures or courses, that decision is made
deliberately. Reusable components have generic, domain-free names and accept
a broad interface. They are the exception, not the rule.

This philosophy means the `components/` directory is flat and large. That is
acceptable — the naming conventions below make it navigable without
subdirectory hierarchy.

---

## 2. Naming Conventions

A component's filename encodes two things: **what it teaches** and **how it
behaves**. Together these tell you whether the component is bespoke or
reusable, and what interaction model to expect, without opening the file.

### Bespoke vs. Reusable

**Bespoke components** have domain-specific names that read like a topic:

```
bankers-algorithm.tsx
euler-path-explorer.tsx
hoare-triple-stepper.tsx
pascal-triangle-builder.tsx
```

**Reusable components** have generic functional names that read like a tool:

```
math.tsx
practice-box.tsx
question-box.tsx
graph-visualization.tsx
code-comparison.tsx
```

If you can tell *which lecture* a component belongs to from its name alone,
it is bespoke. If the name describes a *kind of thing* rather than a
*specific thing*, it is reusable.

### Interaction Suffixes

The suffix describes the component's interaction model:

| Suffix | Meaning | Example |
|--------|---------|---------|
| `-stepper` | Guided step-through with forward/back controls | `hoare-triple-stepper.tsx` |
| `-explorer` | Open-ended interactive sandbox | `euler-path-explorer.tsx` |
| `-demo` | Self-contained simulation or sandbox | `paging-demo.tsx` |
| `-diagram` | Primarily visual, limited interactivity | `memory-layout-diagram.tsx` |
| `-visualizer` | Data-driven rendering | `bijection-visualizer.tsx` |
| `-chart` | Quantitative or graphical display | `birthday-paradox-chart.tsx` |
| `-table` | Tabular data presentation | `prime-factorization-table.tsx` |
| `-builder` | Construct-and-explore interaction | `pascal-triangle-builder.tsx` |
| `-tag` | Small inline label or badge | `memory-tag.tsx` |
| `-panel` | Information card or grouped display | `pcb-panel.tsx` |
| `-animation` | Motion-based illustration | `context-switch-animation.tsx` |
| `-runner` | Execute-and-observe interaction | `finite-automaton-runner.tsx` |
| *(no suffix)* | Utility or reusable primitive | `math.tsx`, `practice-box.tsx` |

When creating a new component, pick the suffix that best describes how a
student will interact with it. If none fits, omit the suffix — this
naturally signals a utility or reusable component.

---

## 3. MathJax Architecture

The site renders LaTeX through **two independent systems** that must
coexist without visual glitches. This is the single most important
technical constraint to understand before writing a component that
involves math.

### Server-Side Rendering (build time)

Raw `$...$` and `$$...$$` syntax written directly in MDX is rendered to
static HTML at build time by the `rehype-mathjax/chtml` plugin in
`next.config.ts`. This produces fully-formed MathJax CHTML markup that
requires no client-side JavaScript — it is already rendered when the
page arrives.

**No component work is needed** for this path. Just write LaTeX in your
MDX and it works.

### Client-Side Rendering (runtime)

Components like `DisplayMath`, `InlineMath`, and any bespoke stepper or
visualizer that embeds LaTeX must render math **client-side** using the
MathJax library loaded in the root layout. This introduces a race
condition: the component mounts before MathJax has loaded, and the raw
`$$...$$` text would flash on screen.

To prevent this, the site uses a coordinated system:

1. **Auto-typesetting is disabled.** The root layout configures MathJax
   with `startup: { typeset: false }`, preventing it from scanning and
   typesetting the entire page on load. Without this, MathJax would
   double-render server-side math and race with client-side components.

2. **Components wait for MathJax explicitly.** Every component that
   renders math client-side must call `waitForMathJax()` (exported from
   `@/components/math`) before invoking `window.MathJax.typesetPromise`.

3. **Content is hidden until typeset.** While waiting, the raw LaTeX
   is hidden with `visibility: hidden` and `position: absolute` (to
   prevent layout shifts), and a shimmer placeholder is shown in its
   place using `MathShimmer`.

### The Rendering Contract

Any component that typesets LaTeX client-side **must** follow this pattern:

```tsx
import { waitForMathJax, MathShimmer } from "@/components/math"

function MathBlock({ formula }: { formula: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let mounted = true
    setRendered(false)

    waitForMathJax().then(() => {
      if (mounted && ref.current && window.MathJax?.typesetPromise) {
        window.MathJax.typesetPromise([ref.current]).then(() => {
          if (mounted) setRendered(true)
        })
      }
    })

    return () => { mounted = false }
  }, [formula])

  return (
    <div className="relative">
      {!rendered && <MathShimmer block />}
      <div
        ref={ref}
        style={{
          visibility: rendered ? "visible" : "hidden",
          position: rendered ? "static" : "absolute",
        }}
      >
        {`$$${formula}$$`}
      </div>
    </div>
  )
}
```

**Critical rules:**

- **Always import `waitForMathJax` from `@/components/math`.** Never
  define a local copy. The shared version ensures consistent behavior
  and a single place to update the polling logic if MathJax's API
  changes.
- **Always use `MathShimmer`** from the same module. Use `block` for
  display-level math and omit it for inline math.
- **Always use `visibility: hidden` + `position: absolute`**, not
  `opacity: 0` or `display: none`. This ensures MathJax can measure
  and typeset the element while it remains invisible, and prevents
  layout shifts when it appears.
- **Always guard with the `mounted` flag.** The `useEffect` cleanup
  sets `mounted = false` to prevent state updates on unmounted
  components.
- **Reset `rendered` to `false`** when the formula prop changes (via
  the dependency array) so the shimmer reappears during re-typesetting.

### When to Use Which

| Scenario | What to use |
|----------|-------------|
| Inline math in MDX prose | Raw `$...$` syntax (server-rendered) |
| Inline math with curly braces (`{}`) in MDX | `<InlineMath formula="..." />` |
| Block math in MDX prose | `<DisplayMath formula="..." />` |
| Math inside a bespoke component's JSX | The rendering contract above |

---

## 4. Component Authoring Patterns

### Every MDX Component is a Client Component

Components imported into MDX lecture files must use the `"use client"`
directive. MDX content is server-rendered, but interactive components
need client-side React features (state, effects, refs, event handlers).

```tsx
"use client"

import { useState } from "react"
```

### The Standard State Pattern

Bespoke components that involve async rendering (MathJax, dynamic
imports like `vis-network`, or other client-only libraries) follow
a consistent lifecycle:

```tsx
const ref = useRef<HTMLElement>(null)
const [mounted, setMounted] = useState(false)

useEffect(() => {
  let mounted = true

  // async setup (import library, wait for MathJax, etc.)
  someAsyncSetup().then(() => {
    if (mounted) {
      // safe to update state and DOM
      setMounted(true)
    }
  })

  return () => { mounted = false }
}, [/* dependencies */])
```

The `mounted` flag prevents React state updates after unmount (common
during fast navigation). This pattern appears in nearly every component
and should be followed mechanically.

### Dynamic Imports

Some libraries (notably `vis-network` for graph rendering) cannot run
on the server. These are imported dynamically inside `useEffect`:

```tsx
useEffect(() => {
  import("vis-network/standalone/esm/vis-network").then((vis) => {
    // use vis.Network, vis.DataSet, etc.
  })
}, [])
```

The `vis-network` and `vis-data` packages are also excluded from
server-side bundling via `next.config.ts` webpack externals.

### Stepper Navigation

Components with the `-stepper` suffix share a common navigation
pattern: a `currentStep` index, forward/back buttons, and a reset
button. The standard layout is:

- **Header bar** with title and step counter (`Step X of Y`)
- **Content area** showing the current step's state
- **Footer bar** with Previous, Reset, and Next buttons

Use `@/components/ui/button` for the navigation controls.

### Container Styling

All interactive components are wrapped in a bordered container to
visually separate them from prose:

```tsx
<div className="my-6 border rounded-lg overflow-hidden">
  <div className="px-4 py-3 bg-muted/50 border-b">
    {/* header */}
  </div>
  <div className="p-4">
    {/* content */}
  </div>
</div>
```

The `my-6` margin, `border rounded-lg`, and `bg-muted/50` header
pattern are consistent across the site. New components should match
this visual language.

---

## 5. Visual Design Principles

### Color Carries Meaning

Color and visual styling are reserved for components that demand student
attention. The hierarchy:

| Element | Styling | Purpose |
|---------|---------|---------|
| `DefinitionBox` | Styled container with icon | Formal term introduction |
| `PracticeBox` | Colored feedback states | Active recall |
| Interactive components | Bordered container, muted header | Exploration |
| Blockquotes | Default monochrome | Asides and context |
| Tables, code blocks | Default monochrome | Reference material |

Do not add color or emoji to elements that don't warrant focal
attention. Prose, blockquotes, tables, and code blocks stay in the
default theme. The visual weight of the page should guide the
student's eye to definitions, practice, and interactive figures.

### Dark Mode Compatibility

All components must work in both light and dark themes. Use Tailwind's
semantic color classes (`bg-muted`, `text-muted-foreground`,
`border`, etc.) rather than hard-coded colors. When a specific color
is needed for semantic purposes (e.g., highlighting an active line),
use opacity-based variants that adapt to both themes:

```tsx
// Good: works in both themes
className="bg-amber-500/15 border-l-2 border-amber-500"

// Avoid: hard-coded colors that may not adapt
className="bg-yellow-100 border-l-2 border-yellow-400"
```

For text that must be a specific hue, provide both light and dark
variants:

```tsx
className="text-purple-600 dark:text-purple-400"
```

### Responsive Layout

Components should be usable on mobile viewports. Use responsive
grid breakpoints (`grid-cols-1 md:grid-cols-2`) for side-by-side
layouts, and ensure interactive elements have adequate touch targets.
Horizontally wide content (math, tables, code) should use
`overflow-x-auto` to scroll rather than break the page layout.
