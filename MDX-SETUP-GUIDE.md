# MDX Lecture Notes Setup Guide

This guide explains the complete MDX setup for your CMSI 2820 lecture notes.

## ✅ What Was Set Up

### 1. MDX Dependencies Installed

- `@next/mdx` - Next.js MDX support
- `@mdx-js/loader` - MDX loader
- `@mdx-js/react` - MDX React integration
- `@types/mdx` - TypeScript types for MDX

### 2. Next.js Configuration (`next.config.ts`)

- Configured to support `.mdx` file extensions
- MDX plugin integrated with build process
- **GitHub Flavored Markdown (GFM)** plugin enabled for tables, strikethrough, autolinks, footnotes, and tasklists
- **LaTeX Math Support** via remark-math and rehype-mathjax for beautiful mathematical notation
- Ready for additional custom remark/rehype plugins

### 3. MDX Components (`/mdx-components.tsx`)

- Custom styled components for all markdown elements
- Consistent theming with your site's design system
- Proper dark mode support
- Responsive tables and code blocks

### 4. Dynamic Route (`app/(landing)/(courses)/cmsi-2820/ln[id]/page.tsx`)

- Handles URLs like `/cmsi-2820/ln1`, `/cmsi-2820/ln2`, etc.
- Dynamically loads MDX files from the `notes` directory
- Includes navigation (previous/next buttons)
- Quick navigation grid for all 28 lectures
- Metadata system for titles, dates, and topics
- Graceful fallback for missing lecture notes

### 5. Content Directory (`app/(landing)/(courses)/cmsi-2820/notes/`)

- Dedicated folder for all lecture note MDX files
- Example files: `ln1.mdx`, `ln2.mdx`, `ln3.mdx`
- Template file: `TEMPLATE.mdx`
- Documentation: `README.md`

### 6. Interactive Components (`components/interactive-example.tsx`)

- Reusable interactive components for lectures
- Examples: Counter, Truth Table, Collapsible Definitions
- Ready to use in any MDX file

---

## 📝 How to Create a New Lecture Note

### Step 1: Create the MDX File

Create a new file in `content/cmsi-2820/`:

```bash
# File must be named: lnX.mdx where X is the lecture number (1-28)
content/cmsi-2820/ln4.mdx
```

### Step 2: Add Content

Use the `TEMPLATE.mdx` as a starting point:

```mdx
# Your Lecture Title

Introduction paragraph...

## Section 1

Your content here...

### Subsection

More details...
```

### Step 3: Update Metadata

Edit `app/(landing)/(courses)/cmsi-2820/[id]/page.tsx`:

```typescript
const lectureMetadata: Record<
  number,
  { title: string; date: string; topics: string[] }
> = {
  1: {
    title: "Lecture Note 1: Introduction to Discrete Math",
    date: "Spring 2025",
    topics: ["Course overview", "Mathematical reasoning", "Basic logic"],
  },
  4: {
    // Add your new lecture here
    title: "Lecture Note 4: Your Title",
    date: "Spring 2025",
    topics: ["Topic 1", "Topic 2", "Topic 3"],
  },
  // ... continue for all 28 lectures
}
```

### Step 4: Test Locally

Visit `http://localhost:3000/cmsi-2820/ln4` in your browser.

---

## 🎨 MDX Syntax Reference

### Basic Markdown

```mdx
# H1 Heading

## H2 Heading

### H3 Heading

**Bold text**
_Italic text_
`Inline code`

- Bullet list
- Item 2

1. Numbered list
2. Item 2

[Link text](URL)
```

### Code Blocks

````mdx
```javascript
function example() {
  console.log("Hello!")
}
```
````

### Tables

Tables are supported via GitHub Flavored Markdown:

```mdx
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
```

You can also align columns:

```mdx
| Left | Center | Right |
| :--- | :----: | ----: |
| L    |   C    |     R |
```

### Blockquotes

```mdx
> **Important**: This is a note
```

### Strikethrough

```mdx
~~This text is crossed out~~
```

### Autolinks

URLs and email addresses are automatically converted to links:

```mdx
Visit https://example.com or email contact@example.com
```

### Tasklists

```mdx
- [ ] Todo item
- [x] Completed item
```

### Footnotes

```mdx
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.
```

### Math (LaTeX)

**Inline math** (use single `$`):

```mdx
The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.
```

**Display math** (use double `$$`):

```mdx
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

**Common examples**:

```mdx
- Sets: $A = \{1, 2, 3\}$
- Logic: $\forall x \in \mathbb{N}, x \geq 0$
- Summation: $\sum_{k=1}^{n} k^2$
- Integrals: $\int_a^b f(x) \, dx$
```

See `content/cmsi-2820/MATH-EXAMPLES.mdx` for comprehensive examples!

### Interactive Components

```mdx
import { TruthTableDemo } from "@/components/interactive-example"

Regular markdown here...

<TruthTableDemo />

More markdown here...
```

---

## 🎯 File Structure

```
personal-site/
├── app/
│   └── (landing)/
│       └── (courses)/
│           └── cmsi-2820/
│               ├── [id]/
│               │   └── page.tsx           # Dynamic route handler
│               └── page.tsx               # Course home page
├── content/
│   └── cmsi-2820/
│       ├── ln1.mdx                        # Lecture 1 content
│       ├── ln2.mdx                        # Lecture 2 content
│       ├── ln3.mdx                        # Lecture 3 content
│       ├── ln4.mdx                        # Create these...
│       ├── ...
│       ├── ln28.mdx                       # Lecture 28 content
│       ├── TEMPLATE.mdx                   # Template for new notes
│       ├── INTERACTIVE-EXAMPLE.mdx        # Component examples
│       └── README.md                      # Documentation
├── components/
│   ├── interactive-example.tsx            # Reusable components
│   └── ui/
│       └── ...                            # UI components
├── mdx-components.tsx                     # MDX styling
├── next.config.ts                         # MDX configuration
└── package.json                           # Dependencies
```

---

## 🚀 URLs and Navigation

### Lecture Note URLs

- Lecture 1: `http://localhost:3000/cmsi-2820/ln1`
- Lecture 2: `http://localhost:3000/cmsi-2820/ln2`
- ...
- Lecture 28: `http://localhost:3000/cmsi-2820/ln28`

### Navigation Features

- **Back to Course**: Returns to `/cmsi-2820`
- **Previous/Next**: Navigate between sequential lectures
- **Quick Grid**: Jump to any of the 28 lectures
- **Topics Section**: Shows covered topics from metadata

---

## 💡 Tips & Best Practices

### Content Organization

1. Start with a clear title and introduction
2. Use hierarchical headings (H2, H3)
3. Break content into digestible sections
4. Include examples and practice problems
5. End with a summary and preview of next lecture

### Mathematical Notation

- Use Unicode symbols: ∀, ∃, ∈, ⊆, ∧, ∨, →, ↔, ¬
- For complex math, consider adding a plugin like `remark-math` and `rehype-katex`

### Code Examples

- Always specify the language for syntax highlighting
- Keep examples concise and relevant
- Add comments to explain complex code

### Interactive Elements

- Use sparingly where they add value
- Test on mobile devices
- Provide keyboard navigation
- Consider loading time

### Accessibility

- Use semantic headings in order (don't skip levels)
- Add descriptive link text
- Include alt text for images
- Test with screen readers

---

## 🔧 Advanced Features

### GitHub Flavored Markdown (Already Enabled!)

Your setup includes `remark-gfm` which provides:

- ✅ **Tables** - with column alignment
- ✅ **Strikethrough** - ~~crossed out text~~
- ✅ **Autolinks** - automatic URL and email linking
- ✅ **Footnotes** - reference-style footnotes
- ✅ **Tasklists** - checkboxes for todo items

See the [remark-gfm documentation](https://github.com/remarkjs/remark-gfm) for more details.

### Math Support (Already Enabled!)

Your setup includes `remark-math` and `rehype-mathjax` for LaTeX-style math rendering powered by [MathJax](http://docs.mathjax.org/).

**Interactive Features**: MathJax includes a **right-click context menu** on all math expressions that allows users to:

- 📋 **Copy LaTeX source** (Show Math As → TeX Commands)
- 🔍 **Zoom in/out** on equations
- ⚙️ **Adjust rendering settings** (font size, scaling, etc.)
- ♿ **Accessibility options** (screen reader support)

**Inline math** (single `$`):

```mdx
The formula $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ is useful.
```

**Display math** (double `$$`):

```mdx
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

**Discrete math examples**:

```mdx
- Sets: $A = \{1, 2, 3\}$ and $B = \{x \mid x > 0\}$
- Logic: $\forall x \in \mathbb{N}, x \geq 0$
- Combinatorics: $\binom{n}{k} = \frac{n!}{k!(n-k)!}$
- Number theory: $a \equiv b \pmod{n}$
```

See `content/cmsi-2820/MATH-EXAMPLES.mdx` for comprehensive examples and [MDX math guide](https://mdxjs.com/guides/math/) for more details.

### Creating Custom Components

Create a new component in `components/`:

```typescript
"use client"

export function MyCustomComponent() {
  return <div>Custom content</div>
}
```

Use in MDX:

```mdx
import { MyCustomComponent } from "@/components/my-custom-component"

<MyCustomComponent />
```

---

## 🐛 Troubleshooting

### "Could not parse expression with acorn" error

This is the **most common error** when writing MDX! It happens when you use curly braces `{}` without escaping them.

**Problem**: In MDX, curly braces are reserved for JavaScript expressions. When you want literal braces (like in set notation), you must escape them.

❌ **Wrong**:

```mdx
Let A = {1, 2, 3}
Domain = {2k | k ∈ ℤ}
```

✅ **Correct**:

```mdx
Let A = \{1, 2, 3\}
Domain = \{2k | k ∈ ℤ\}
```

**Solution**: Search your MDX file for any `{` characters and add a backslash before them: `\{`

### MDX files not loading / "Unknown module type" error

This happens when using Turbopack (Next.js's new bundler) which doesn't fully support MDX yet. The solution is to use Webpack instead:

```bash
# Instead of: npm run dev
# Use:
next dev
```

Or update your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev"
  }
}
```

**Note**: The MDX files are stored in `content/cmsi-2820/` (outside the `app` directory) to avoid conflicts with Next.js routing.

### "Content coming soon" shows instead of my note

- ✅ Check filename: must be exactly `lnX.mdx` (no leading zeros)
- ✅ Verify location: `content/cmsi-2820/`
- ✅ Restart dev server: `npm run dev`

### MDX syntax errors

- ✅ Ensure all JSX tags are closed: `<Component />`
- ✅ Check for unescaped special characters in code blocks
- ✅ Use proper import syntax at top of file

### Styling not applied

- ✅ Verify `mdx-components.tsx` exists in root directory
- ✅ Check that Next.js config includes MDX setup
- ✅ Clear `.next` cache and rebuild

### Import errors

- ✅ Use `@/` alias for absolute imports from root
- ✅ Check component file paths
- ✅ Ensure component is exported

---

## 📚 Resources

- [MDX Documentation](https://mdxjs.com/)
- [Next.js MDX Guide](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [Markdown Guide](https://www.markdownguide.org/)
- [React Components in MDX](https://mdxjs.com/docs/using-mdx/#components)

---

## 📋 Checklist for 28 Lectures

Track your progress creating all lecture notes:

- [x] ln1.mdx - Introduction to Discrete Math
- [x] ln2.mdx - Propositional Logic
- [x] ln3.mdx - Predicate Logic and Quantifiers
- [ ] ln4.mdx
- [ ] ln5.mdx
- [ ] ln6.mdx
- [ ] ln7.mdx
- [ ] ln8.mdx
- [ ] ln9.mdx
- [ ] ln10.mdx
- [ ] ln11.mdx
- [ ] ln12.mdx
- [ ] ln13.mdx
- [ ] ln14.mdx
- [ ] ln15.mdx
- [ ] ln16.mdx
- [ ] ln17.mdx
- [ ] ln18.mdx
- [ ] ln19.mdx
- [ ] ln20.mdx
- [ ] ln21.mdx
- [ ] ln22.mdx
- [ ] ln23.mdx
- [ ] ln24.mdx
- [ ] ln25.mdx
- [ ] ln26.mdx
- [ ] ln27.mdx
- [ ] ln28.mdx

---

## 🎉 You're All Set!

Your MDX lecture notes system is fully configured and ready to use. Start creating your remaining 25 lecture notes using the template and examples provided.

If you run into any issues, refer to the troubleshooting section or check the example files for reference.

Happy teaching! 📖
