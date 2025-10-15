# Adding New Content Types Guide

This guide explains how to add new content types (exams, projects, activities, etc.) to your course website.

## Current Architecture

The website now uses a unified, configuration-based system that makes it easy to add any new MDX content type.

### Current Content Types

- **Lecture Notes** (`ln`) - Located in `content/cmsi-2820/notes/`
- **Homeworks** (`hw`) - Located in `content/cmsi-2820/homeworks/`

## How to Add a New Content Type

### Example: Adding Exams

#### Step 1: Update the Configuration

In `app/(landing)/(courses)/cmsi-2820/[id]/page.tsx`, add your new content type to the `CONTENT_TYPES` object:

```typescript
const CONTENT_TYPES: Record<string, ContentTypeConfig> = {
  lecture: {
    /* ... */
  },
  homework: {
    /* ... */
  },

  // Add your new type here:
  exam: {
    prefix: "ex", // URL will be /cmsi-2820/ex1, ex2, etc.
    folder: "exams", // Files in content/cmsi-2820/exams/
    total: 3, // Total number of exams
    label: "Exam", // Display as "Exam 1", "Exam 2"
    shortLabel: "EX", // Navigation shows "EX 1", "EX 2"
    gridColumns: "grid-cols-3", // Layout for quick navigation grid
    topLevelSectionClass: "exam-header", // Optional: custom CSS class for sections
  },
}
```

#### Step 2: Create the Content Folder

Create a new folder in your content directory:

```
content/cmsi-2820/exams/
```

#### Step 3: Add Your MDX Files

Create MDX files following the naming pattern:

```
content/cmsi-2820/exams/ex1.mdx
content/cmsi-2820/exams/ex2.mdx
content/cmsi-2820/exams/ex3.mdx
```

#### Step 4: (Optional) Add Metadata

If you want custom metadata, add an examMetadata object:

```typescript
const examMetadata: Record<
  number,
  { title: string; date: string; topics: string[] }
> = {
  1: {
    title: "Midterm Exam",
    date: "March 15, 2025",
    topics: ["Logic", "Set Theory", "Proofs"],
  },
}
```

Then update the main component to use it.

#### Step 5: That's It!

The system will automatically:

- ✅ Generate routes for `/cmsi-2820/ex1`, `/cmsi-2820/ex2`, etc.
- ✅ Load MDX content from the exams folder
- ✅ Create navigation between exams
- ✅ Extract headings for in-page navigation
- ✅ Build the quick navigation grid

## Other Content Type Examples

### Projects

```typescript
project: {
  prefix: "pj",
  folder: "projects",
  total: 5,
  label: "Project",
  shortLabel: "PJ",
  gridColumns: "grid-cols-5",
}
```

### Activities

```typescript
activity: {
  prefix: "act",
  folder: "activities",
  total: 20,
  label: "Activity",
  shortLabel: "ACT",
  gridColumns: "grid-cols-10",
}
```

### Lab Exercises

```typescript
lab: {
  prefix: "lab",
  folder: "labs",
  total: 12,
  label: "Lab",
  shortLabel: "LAB",
  gridColumns: "grid-cols-6",
  topLevelSectionClass: "lab-section",
}
```

## Advanced: Custom Section Handling

If your content type has special sections (like homeworks have "Written Section" and "Programming Section"), you can:

1. Set the `topLevelSectionClass` in the config
2. Use that CSS class in your MDX components
3. The navigation will automatically treat those as top-level sections

Example in your MDX:

```tsx
<h2 className="lab-section">Part 1: Setup</h2>
<h2 className="lab-section">Part 2: Implementation</h2>
```

These will appear as top-level navigation items instead of subsections.

## Benefits of This Architecture

- 🚀 **Scalable**: Add unlimited content types
- 🔧 **Maintainable**: One configuration point
- 🎨 **Flexible**: Customize per content type
- 📁 **Organized**: Each type in its own folder
- 🔄 **Automatic**: Routes and navigation generated automatically
- 🎯 **Type-safe**: TypeScript ensures correct configuration
