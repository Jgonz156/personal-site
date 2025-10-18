# CMSI 5850: Programming Languages Foundations - Course Content

This directory contains all the course materials for CMSI 5850.

## Directory Structure

- `notes/` - Lecture notes (ln1.mdx, ln2.mdx, etc.)
- `homeworks/` - Homework assignments (hw0.mdx, hw1.mdx, etc.)
- `exams/` - Exam information pages (ex0.mdx, ex1.mdx, etc.)

## Getting Started

1. **Update the course data**: Edit `lib/courses/cmsi-5850-data.ts` to add your course events (lectures, homeworks, exams)
2. **Update content type totals**: Edit `app/(landing)/(courses)/cmsi-5850/[id]/page.tsx` and update the `CONTENT_TYPES` object with the correct totals for lectures, homeworks, and exams
3. **Create content files**: Use the templates provided in each subdirectory to create your content

## Template Files

- `notes/TEMPLATE.mdx` - Template for lecture notes
- `homeworks/HOMEWORK-TEMPLATE.mdx` - Template for homework assignments
- `exams/EXAM-TEMPLATE.mdx` - Template for exam information pages

## Adding Content

### Lectures

1. Copy `notes/TEMPLATE.mdx` to `notes/ln1.mdx` (or the appropriate number)
2. Update the metadata at the top of the file
3. Write your content using MDX (Markdown + React components)
4. Add the lecture event to `lib/courses/cmsi-5850-data.ts`

### Homeworks

1. Copy `homeworks/HOMEWORK-TEMPLATE.mdx` to `homeworks/hw0.mdx` (or appropriate number)
2. Update the metadata
3. Write your assignment content
4. Add the homework event to `lib/courses/cmsi-5850-data.ts`

### Exams

1. Copy `exams/EXAM-TEMPLATE.mdx` to `exams/ex0.mdx` (or appropriate number)
2. Update the metadata
3. Write your exam information
4. Add the exam event to `lib/courses/cmsi-5850-data.ts`

## Course Standards/Units

The course is organized by these units (update in `app/(landing)/(courses)/cmsi-5850/page.tsx` if needed):

- Syntax & Semantics
- Type Systems
- Functional Programming
- Object-Oriented
- Concurrency
- Advanced Topics

## Assets

Place images, PDFs, and other assets in `/public/cmsi-5850/`:

- `/public/cmsi-5850/notes/` - Images for lecture notes
- `/public/cmsi-5850/homeworks/` - Images and files for homework

Reference them in MDX using `/cmsi-5850/notes/your-image.png`
