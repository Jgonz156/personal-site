# Course Skeleton Duplication Summary

Successfully duplicated the CMSI-2820 folder structure for two new courses:

- **CMSI-3510: Operating Systems**
- **CMSI-5850: Programming Languages Foundations**

## 📁 Directory Structure Created

### App Routes (Frontend Pages)

```
app/(landing)/(courses)/
├── cmsi-2820/          # Original - Discrete Mathematics
│   ├── [id]/
│   │   └── page.tsx    # Dynamic route for ln, hw, ex content
│   ├── cheat-sheet/
│   │   └── page.tsx
│   ├── syllabus/
│   │   └── page.tsx
│   └── page.tsx        # Main course page
│
├── cmsi-3510/          # NEW - Operating Systems
│   ├── [id]/
│   │   └── page.tsx    # ✅ Adapted for cmsi-3510
│   ├── cheat-sheet/
│   │   └── page.tsx    # ✅ Placeholder page
│   ├── syllabus/
│   │   └── page.tsx    # ✅ Placeholder page
│   └── page.tsx        # ✅ Adapted with OS-specific standards
│
└── cmsi-5850/          # NEW - Programming Languages Foundations
    ├── [id]/
    │   └── page.tsx    # ✅ Adapted for cmsi-5850
    ├── cheat-sheet/
    │   └── page.tsx    # ✅ Placeholder page
    ├── syllabus/
    │   └── page.tsx    # ✅ Placeholder page
    └── page.tsx        # ✅ Adapted with PL-specific standards
```

### Content (MDX Files & Templates)

```
content/
├── cmsi-2820/          # Original course content
│   ├── notes/
│   ├── homeworks/
│   └── exams/
│
├── cmsi-3510/          # NEW - Operating Systems
│   ├── notes/
│   │   └── TEMPLATE.mdx          # ✅ Lecture template
│   ├── homeworks/
│   │   └── HOMEWORK-TEMPLATE.mdx # ✅ Homework template
│   ├── exams/
│   │   └── EXAM-TEMPLATE.mdx     # ✅ Exam template
│   └── README.md                 # ✅ Course setup guide
│
└── cmsi-5850/          # NEW - Programming Languages Foundations
    ├── notes/
    │   └── TEMPLATE.mdx          # ✅ Lecture template
    ├── homeworks/
    │   └── HOMEWORK-TEMPLATE.mdx # ✅ Homework template
    ├── exams/
    │   └── EXAM-TEMPLATE.mdx     # ✅ Exam template
    └── README.md                 # ✅ Course setup guide
```

### Public Assets

```
public/
├── cmsi-2820/
│   ├── homeworks/
│   └── notes/
│
├── cmsi-3510/          # NEW - Operating Systems
│   ├── homeworks/      # ✅ Ready for homework images/files
│   └── notes/          # ✅ Ready for lecture images/files
│
└── cmsi-5850/          # NEW - Programming Languages Foundations
    ├── homeworks/      # ✅ Ready for homework images/files
    └── notes/          # ✅ Ready for lecture images/files
```

### Course Data (Backend)

```
lib/courses/
├── cmsi-2820-data.ts   # ✅ Extracted from original course-data.ts
├── cmsi-3510-data.ts   # ✅ Empty array ready for events
├── cmsi-5850-data.ts   # ✅ Empty array ready for events
└── README.md           # ✅ Documentation for adding courses
```

## 🎯 Course-Specific Configurations

### CMSI-3510: Operating Systems

**Standards/Units** (in `app/(landing)/(courses)/cmsi-3510/page.tsx`):

1. Syllabus
2. Introduction - Operating Systems Concepts
3. Processes - Process Management and Scheduling
4. Threads - Multithreading and Concurrency
5. Synchronization - Process Synchronization and Deadlocks
6. Memory - Memory Management and Virtual Memory
7. Storage - File Systems and I/O Systems

**Course ID**: `cmsi-3510`

### CMSI-5850: Programming Languages Foundations

**Standards/Units** (in `app/(landing)/(courses)/cmsi-5850/page.tsx`):

1. Syllabus
2. Syntax & Semantics - Formal Syntax, Grammars, and Operational Semantics
3. Type Systems - Type Theory, Type Checking, and Type Inference
4. Functional Programming - Lambda Calculus, Higher-Order Functions, and Closures
5. Object-Oriented - Objects, Classes, Inheritance, and Polymorphism
6. Concurrency - Concurrent Programming Models and Actors
7. Advanced Topics - Program Analysis, Verification, and Language Design

**Course ID**: `cmsi-5850`

## 📝 Next Steps to Populate Your Courses

### Step 1: Add Course Events

Edit the course data files to add your lectures, homework, and exams:

**For CMSI-3510**: `lib/courses/cmsi-3510-data.ts`
**For CMSI-5850**: `lib/courses/cmsi-5850-data.ts`

Example:

```typescript
export const cmsi3510Events: CourseEvent[] = [
  {
    id: "ln1",
    title: "LN 1: Introduction to Operating Systems",
    type: "lecture",
    date: DateTime.fromObject({ year: 2026, month: 1, day: 15 }),
    description: "Overview of OS concepts and course introduction",
    courseId: "cmsi-3510",
    standard: "Introduction",
    contentUrl: "/cmsi-3510/ln1",
  },
  // Add more events...
]
```

### Step 2: Update Content Type Totals

Once you know how many lectures, homeworks, and exams you'll have, update the totals in:

- `app/(landing)/(courses)/cmsi-3510/[id]/page.tsx`
- `app/(landing)/(courses)/cmsi-5850/[id]/page.tsx`

Find the `CONTENT_TYPES` object and update:

```typescript
const CONTENT_TYPES: Record<string, ContentTypeConfig> = {
  lecture: {
    // ...
    total: 20, // Update this!
  },
  homework: {
    // ...
    total: 5, // Update this!
  },
  exam: {
    // ...
    total: 3, // Update this!
  },
}
```

### Step 3: Create Content Files

Use the templates to create your content:

**For lectures**:

```bash
cp content/cmsi-3510/notes/TEMPLATE.mdx content/cmsi-3510/notes/ln1.mdx
```

**For homeworks**:

```bash
cp content/cmsi-3510/homeworks/HOMEWORK-TEMPLATE.mdx content/cmsi-3510/homeworks/hw0.mdx
```

**For exams**:

```bash
cp content/cmsi-3510/exams/EXAM-TEMPLATE.mdx content/cmsi-3510/exams/ex0.mdx
```

### Step 4: Customize Course Pages (Optional)

You can further customize:

- **Standards/Units**: Edit the `STANDARDS` array in `page.tsx`
- **Syllabus**: Edit `syllabus/page.tsx` with your actual syllabus
- **Cheat Sheet**: Edit `cheat-sheet/page.tsx` with course references

### Step 5: Add Assets

Place images, PDFs, and other assets in the public directories:

- `/public/cmsi-3510/notes/` for lecture images
- `/public/cmsi-3510/homeworks/` for homework files
- `/public/cmsi-5850/notes/` for PL lecture images
- `/public/cmsi-5850/homeworks/` for PL homework files

Reference them in MDX using:

```markdown
![Image](/cmsi-3510/notes/my-image.png)
```

## ✅ What's Already Working

1. ✅ Routes are live at:
   - `/cmsi-3510` - Operating Systems main page
   - `/cmsi-5850` - Programming Languages main page
2. ✅ Dynamic content routes ready:

   - `/cmsi-3510/ln1`, `/cmsi-3510/hw0`, `/cmsi-3510/ex0`
   - `/cmsi-5850/ln1`, `/cmsi-5850/hw0`, `/cmsi-5850/ex0`

3. ✅ Course data architecture supports multiple courses

4. ✅ All helper functions accept optional `courseId` parameter

5. ✅ Templates ready for content creation

## 📚 Key Files to Remember

| Purpose                    | File Path                                                     |
| -------------------------- | ------------------------------------------------------------- |
| Add CMSI-3510 events       | `lib/courses/cmsi-3510-data.ts`                               |
| Add CMSI-5850 events       | `lib/courses/cmsi-5850-data.ts`                               |
| Update 3510 content totals | `app/(landing)/(courses)/cmsi-3510/[id]/page.tsx`             |
| Update 5850 content totals | `app/(landing)/(courses)/cmsi-5850/[id]/page.tsx`             |
| Customize 3510 standards   | `app/(landing)/(courses)/cmsi-3510/page.tsx`                  |
| Customize 5850 standards   | `app/(landing)/(courses)/cmsi-5850/page.tsx`                  |
| Course setup guides        | `content/cmsi-3510/README.md` & `content/cmsi-5850/README.md` |

## 🎨 Customization Tips

1. **Change the units/standards**: Edit the `STANDARDS` array in the main course `page.tsx`
2. **Adjust color schemes**: The event cards use type-based colors (lecture=blue, homework=green, exam=red)
3. **Add more content types**: You can add projects, labs, etc. by extending the `CONTENT_TYPES` object
4. **Update course descriptions**: Edit the header text in the main course `page.tsx`

## 🚀 Quick Start Checklist

- [ ] Add at least one event to `lib/courses/cmsi-3510-data.ts`
- [ ] Update content totals in `app/(landing)/(courses)/cmsi-3510/[id]/page.tsx`
- [ ] Create your first lecture: `content/cmsi-3510/notes/ln1.mdx`
- [ ] Test the route: Visit `http://localhost:3000/cmsi-3510`
- [ ] Repeat for CMSI-5850

---

**All systems ready! 🎉** Your course skeleton is complete and waiting for content.
