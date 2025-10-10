# CMSI 2820 Lecture Notes

This directory contains all 28 lecture notes for CMSI 2820: Discrete Mathematics for CS.

## File Structure

- `ln1.mdx` through `ln28.mdx` - Individual lecture note files
- `TEMPLATE.mdx` - Template for creating new lecture notes
- `README.md` - This file

## Creating New Lecture Notes

To create a new lecture note:

1. **Navigate to this directory**:

   ```bash
   cd content/cmsi-2820
   ```

2. **Copy the template**:

   ```bash
   cp TEMPLATE.mdx ln4.mdx  # Replace 4 with your lecture number
   ```

3. **Edit the content** using MDX syntax (Markdown + React components)

4. **Update metadata** in `app/(landing)/(courses)/cmsi-2820/[id]/page.tsx`:
   ```typescript
   const lectureMetadata: Record<
     number,
     { title: string; date: string; topics: string[] }
   > = {
     4: {
       title: "Lecture Note 4: Your Title Here",
       date: "Spring 2025",
       topics: ["Topic 1", "Topic 2", "Topic 3"],
     },
     // ... more entries
   }
   ```

## MDX Features

Your setup includes **GitHub Flavored Markdown** and **LaTeX Math** support:

### GitHub Flavored Markdown

- ✅ **Tables** with column alignment
- ✅ **Strikethrough** (~~text~~)
- ✅ **Autolinks** (URLs become clickable automatically)
- ✅ **Footnotes** (reference-style)
- ✅ **Tasklists** (checkboxes)

### LaTeX Math (MathJax)

- ✅ **Inline math**: `$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`
- ✅ **Display math**: `$$\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$$`
- ✅ **All LaTeX symbols**: Sets, logic, summations, integrals, matrices, etc.
- ✅ See `MATH-EXAMPLES.mdx` for comprehensive examples!

MDX also allows you to use:

### 1. Standard Markdown

- Headings, paragraphs, lists
- Code blocks with syntax highlighting
- Tables, blockquotes, links
- Images

### 2. React Components (Advanced)

You can import and use React components directly in your MDX files:

```mdx
import { Button } from "@/components/ui/button"

# My Lecture

Regular markdown content here...

<Button>Click me for interactive content!</Button>
```

### 3. Custom Styling

All MDX content is automatically styled using the custom components defined in `/mdx-components.tsx`.

## Best Practices

### Content Organization

- Start with an introduction paragraph
- Use clear section headings (##, ###)
- Include examples for each concept
- End with practice problems
- Preview the next lecture

### Mathematical Notation

- Use Unicode symbols: ∀, ∃, ∈, ⊆, ∧, ∨, →, ↔
- For complex equations, use code blocks or consider adding a math plugin

### Code Examples

Always specify the language for syntax highlighting:

\`\`\`javascript
console.log("Hello, world!");
\`\`\`

\`\`\`python
print("Hello, world!")
\`\`\`

### Accessibility

- Use descriptive link text
- Add alt text to images
- Use semantic HTML structure

## File Naming Convention

Files must be named exactly as: `ln[number].mdx`

- ✅ `ln1.mdx`, `ln2.mdx`, `ln28.mdx`
- ❌ `lecture1.mdx`, `ln01.mdx`, `ln_1.mdx`

## URLs

The lecture notes are accessible at:

- Lecture 1: `/cmsi-2820/ln1`
- Lecture 2: `/cmsi-2820/ln2`
- ...
- Lecture 28: `/cmsi-2820/ln28`

## Navigation

Each lecture note page includes:

- Back to course button
- Previous/Next lecture buttons
- Quick navigation grid for all 28 lectures
- Topics covered section

## Important: MDX Syntax Gotchas

### Curly Braces Must Be Escaped!

In MDX, curly braces `{}` are special characters for JavaScript expressions. When writing set notation or any literal braces, **you must escape them**:

❌ **Wrong**: `A = {1, 2, 3}`  
✅ **Correct**: `A = \{1, 2, 3\}`

This is the most common error! See `.mdx-tips.md` for more details.

## Troubleshooting

### "Could not parse expression with acorn" error

This usually means you have unescaped curly braces `{}` in your MDX file. Search for any set notation like `{1, 2, 3}` and add backslashes: `\{1, 2, 3\}`.

### "Content coming soon" message

- Make sure your file is named correctly: `lnX.mdx` (no leading zeros)
- Check that the file is in the correct directory: `content/cmsi-2820/`
- Restart your dev server after creating new MDX files

### Styling not applied

- Check that `/mdx-components.tsx` exists in the root directory
- Verify Next.js config includes MDX support

### Build errors

- Ensure all MDX files have valid syntax
- Close all JSX tags properly
- Check for unescaped special characters

## Need Help?

- Review the example files: `ln1.mdx`, `ln2.mdx`, `ln3.mdx`
- Check the MDX documentation: https://mdxjs.com/
- Review Next.js MDX docs: https://nextjs.org/docs/app/building-your-application/configuring/mdx
