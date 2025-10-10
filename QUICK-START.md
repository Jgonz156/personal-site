# Quick Start Guide - MDX Lecture Notes

## ✅ System is Ready!

Your MDX lecture notes system is fully set up and working. Here's what you need to know:

## 📍 Important Files

- **Content Directory**: `content/cmsi-2820/` - All your lecture notes go here
- **Template**: `content/cmsi-2820/TEMPLATE.mdx` - Copy this for new lectures
- **Route Handler**: `app/(landing)/(courses)/cmsi-2820/[id]/page.tsx` - Handles the URLs

## 🚀 Quick Start: Create a New Lecture

```bash
# 1. Navigate to content directory
cd content/cmsi-2820

# 2. Copy the template
cp TEMPLATE.mdx ln4.mdx

# 3. Edit the file (use your favorite editor)
# Remember: Escape curly braces! \{like this\}

# 4. Update metadata in app/(landing)/(courses)/cmsi-2820/[id]/page.tsx
# Add your lecture's title, date, and topics

# 5. Visit http://localhost:3000/cmsi-2820/ln4
```

## ⚠️ Most Important Rule: ESCAPE CURLY BRACES!

This is **the #1 cause of errors**:

### ❌ WRONG (causes crash):

```mdx
Let A = {1, 2, 3}
Domain = {2k | k ∈ ℤ}
```

### ✅ CORRECT:

```mdx
Let A = \{1, 2, 3\}
Domain = \{2k | k ∈ ℤ\}
```

**Why?** In MDX, `{}` means "run JavaScript code here". To show literal braces, use `\{` and `\}`.

## 📝 Writing Tips

### Set Notation

```mdx
- Empty set: ∅
- Finite set: \{1, 2, 3\}
- Set builder: \{x | x > 0\}
- Even numbers: \{2k | k ∈ ℤ\}
```

### Code Examples

````mdx
```javascript
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1)
}
```
````

### Tables

```mdx
| P   | Q   | P ∧ Q |
| --- | --- | ----- |
| T   | T   | T     |
| T   | F   | F     |
```

### Blockquotes

```mdx
> **Important**: Use blockquotes for key insights!
```

## 🎯 URLs

Your lectures are accessible at:

- Lecture 1: `http://localhost:3000/cmsi-2820/ln1`
- Lecture 2: `http://localhost:3000/cmsi-2820/ln2`
- Lecture N: `http://localhost:3000/cmsi-2820/lnN`

## 🐛 Troubleshooting

### Error: "Could not parse expression with acorn"

→ You have unescaped `{}` braces somewhere. Search for them and add `\` before each one.

### Page shows "Content coming soon"

→ Check:

1. File is named correctly: `ln4.mdx` (no leading zeros)
2. File is in: `content/cmsi-2820/`
3. Dev server is running: `npm run dev`

### Changes not showing

→ Save the file and refresh your browser. Hot reload should work automatically.

## 📚 Current Lectures

- ✅ `ln1.mdx` - Introduction to Discrete Mathematics
- ✅ `ln2.mdx` - Propositional Logic
- ✅ `ln3.mdx` - Predicate Logic and Quantifiers
- 📝 `ln4.mdx` through `ln28.mdx` - Create these!

## 📖 Documentation

- **Full Guide**: `MDX-SETUP-GUIDE.md` - Complete setup documentation
- **Content Guide**: `content/cmsi-2820/README.md` - Content-specific help
- **MDX Tips**: `content/cmsi-2820/.mdx-tips.md` - Writing tips and gotchas

## 🎨 Customization

### Update Metadata

Edit `app/(landing)/(courses)/cmsi-2820/[id]/page.tsx`:

```typescript
const lectureMetadata: Record<
  number,
  { title: string; date: string; topics: string[] }
> = {
  4: {
    title: "Lecture Note 4: Mathematical Proofs",
    date: "Spring 2025",
    topics: ["Direct proof", "Proof by contradiction", "Induction"],
  },
  // Add more...
}
```

### Add Interactive Components

```mdx
import { TruthTableDemo } from "@/components/interactive-example"

<TruthTableDemo />
```

## ✨ Features

- ✅ 28 lecture slots ready
- ✅ Previous/Next navigation
- ✅ Quick navigation grid
- ✅ Topics section per lecture
- ✅ Beautiful styling with dark mode
- ✅ Mobile responsive
- ✅ Interactive React components
- ✅ Code syntax highlighting
- ✅ Math notation support (Unicode)
- ✅ **LaTeX Math Support** (MathJax for beautiful equations)
- ✅ **GitHub Flavored Markdown** (tables, strikethrough, autolinks, footnotes, tasklists)

## 🚦 Getting Started Checklist

- [x] MDX dependencies installed
- [x] Next.js configured
- [x] Dynamic route created
- [x] Example lectures created
- [x] Template provided
- [x] Documentation written
- [ ] Create your 25 remaining lectures!

## 💡 Pro Tips

1. **Start from the template** - It has all the right structure
2. **Test as you write** - Keep your browser open to `/cmsi-2820/lnX`
3. **Use Unicode symbols** - Copy from existing lectures: ∀, ∃, ∈, ⊆, ∧, ∨, →, ↔
4. **Keep it organized** - Use consistent heading structure
5. **Add practice problems** - Students love them!

## 🎓 You're Ready!

Everything is set up and working. Start creating your lecture notes!

```bash
# Run the dev server (if not already running)
npm run dev

# Visit your first lecture
# http://localhost:3000/cmsi-2820/ln1
```

Happy teaching! 🚀
