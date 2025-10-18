# Course Isolation & Navigation Update Summary

Successfully updated the navbar selector and course sidebar to support multiple courses with proper event isolation.

## ✅ Changes Completed

### 1. Updated Course List

**Files Modified:**

- `components/navbar.tsx`
- `components/mobile-nav.tsx`
- `components/layout-wrapper.tsx`

**Changes:**

- Updated course list from placeholder courses to actual courses:
  - ✅ CMSI 2820 - Discrete Math for CS
  - ✅ CMSI 3510 - Operating Systems
  - ✅ CMSI 5850 - Programming Languages Foundations

### 2. Course Switching Functionality

**Desktop Navigation (`navbar.tsx`):**

- Course selector dropdown in top-right
- Shows course code (e.g., "CMSI 2820")
- Clicking switches to that course's home page

**Mobile Navigation (`mobile-nav.tsx`):**

- Course switcher in navigation drawer
- Shows full course code and name
- Located under "Switch Course" section

### 3. Course Event Isolation

All sidebar components now filter events by `courseId`:

#### CourseCalendar (`components/course-calendar.tsx`)

- Added `courseId` prop
- Filters calendar events to show only current course's events
- Days without events for the current course are now properly styled

#### TodaySection (`components/today-section.tsx`)

- Added `courseId` prop
- Uses `getCourseTodaysEvents(courseId)` when courseId provided
- Falls back to all events if no courseId

#### UpcomingSection (`components/upcoming-section.tsx`)

- Added `courseId` prop
- Uses `getCourseUpcomingHomeworkAndExams(courseId, 30)` when courseId provided
- Falls back to all events if no courseId

#### CourseSidebar (`components/course-sidebar.tsx`)

- Added `courseId` prop
- Passes `courseId` to all child components:
  - `<CourseCalendar courseId={courseId} />`
  - `<TodaySection courseId={courseId} />`
  - `<UpcomingSection courseId={courseId} />`
- Works for both mobile (Sheet) and desktop (fixed) sidebars

#### LayoutWrapper (`components/layout-wrapper.tsx`)

- Extracts current course ID from pathname
- Automatically detects which course page you're on
- Passes `courseId` to `<CourseSidebar />`

## 🎯 How It Works

### Course Detection

The system automatically detects the current course from the URL:

```
/cmsi-2820          → courseId: "cmsi-2820"
/cmsi-2820/ln1      → courseId: "cmsi-2820"
/cmsi-3510/hw0      → courseId: "cmsi-3510"
/cmsi-5850/syllabus → courseId: "cmsi-5850"
/                   → courseId: undefined (no filtering)
```

### Event Filtering

When on a course page:

1. **LayoutWrapper** detects the course from the URL
2. **CourseSidebar** receives the `courseId`
3. **Calendar/Today/Upcoming** components filter events:
   - Only show events where `event.courseId === courseId`
   - CMSI-2820 events **only appear** on CMSI-2820 pages
   - CMSI-3510 events **only appear** on CMSI-3510 pages
   - CMSI-5850 events **only appear** on CMSI-5850 pages

## 🔒 Isolation Guarantee

Courses are completely isolated:

✅ **Sidebar/Planner:**

- Shows only current course's events
- Calendar highlights only current course's dates
- Today section shows only current course's items
- Upcoming shows only current course's deadlines

✅ **Navigation:**

- Course-specific links (Home, Cheat Sheet, Syllabus)
- Automatically use the correct course ID

✅ **Course Switching:**

- Click dropdown → instant switch to selected course
- All events and data update automatically
- No cross-contamination between courses

## 📝 Adding New Courses

When you add a new course, update three files:

### 1. Course Data

Add events to `lib/courses/cmsi-XXXX-data.ts`

### 2. Navbar Lists

Update the course list in:

- `components/navbar.tsx` (line ~24)
- `components/mobile-nav.tsx` (line ~34)
- `components/layout-wrapper.tsx` (line ~15)

```typescript
const courses = [
  { id: "cmsi-2820", code: "CMSI 2820", name: "Discrete Math for CS" },
  { id: "cmsi-3510", code: "CMSI 3510", name: "Operating Systems" },
  {
    id: "cmsi-5850",
    code: "CMSI 5850",
    name: "Programming Languages Foundations",
  },
  { id: "cmsi-XXXX", code: "CMSI XXXX", name: "Your New Course" }, // ADD HERE
]
```

### 3. Create Pages

Follow the structure from `COURSE_SKELETON_SUMMARY.md`

## 🧪 Testing Course Isolation

### Test 1: Calendar Filtering

1. Navigate to `/cmsi-2820`
2. Open Course Planner (sidebar)
3. Verify calendar only shows CMSI-2820 dates
4. Switch to `/cmsi-3510`
5. Verify calendar now only shows CMSI-3510 dates

### Test 2: Event Lists

1. On CMSI-2820 page, check "Today" section
2. Should only show CMSI-2820 events
3. Check "Upcoming" section
4. Should only show CMSI-2820 homework/exams
5. Repeat for other courses

### Test 3: Course Switcher

1. Start on CMSI-2820
2. Use dropdown to switch to CMSI-3510
3. Verify URL changes to `/cmsi-3510`
4. Verify sidebar updates to show only CMSI-3510 events
5. Verify navbar updates to show "CMSI 3510"

## 🎨 User Experience

### Desktop

- Course selector in top-right of navbar
- Compact dropdown showing course codes
- Course planner sidebar with current course events
- Smooth transitions when switching courses

### Mobile

- Course code displayed in center of mobile header
- Hamburger menu opens navigation drawer
- Course switcher at bottom of drawer
- Shows full course names for clarity
- Course planner accessible from drawer menu

## 🔄 Data Flow

```
URL Pathname
    ↓
LayoutWrapper.getCurrentCourseId()
    ↓
courseId="cmsi-2820"
    ↓
CourseSidebar (courseId="cmsi-2820")
    ↓
├─ CourseCalendar (courseId="cmsi-2820")
│   └─ getEventsForDate() → filter by courseId
├─ TodaySection (courseId="cmsi-2820")
│   └─ getCourseTodaysEvents("cmsi-2820")
└─ UpcomingSection (courseId="cmsi-2820")
    └─ getCourseUpcomingHomeworkAndExams("cmsi-2820")
```

## 📊 Benefits

1. **Separation of Concerns**: Each course's data is isolated
2. **Scalability**: Easy to add new courses
3. **User Clarity**: Clear which course you're viewing
4. **Data Integrity**: No mixing of events between courses
5. **Flexibility**: Optional courseId prop allows global view

## ⚠️ Important Notes

1. **Consistent Course IDs**: The course ID in:

   - URL (`/cmsi-2820/`)
   - Course data (`courseId: "cmsi-2820"`)
   - Navbar list (`id: "cmsi-2820"`)

   Must ALL match exactly (case-sensitive)

2. **Event Assignment**: Make sure all events have the correct `courseId` in their data files

3. **Course List Sync**: Keep the course lists synchronized across navbar, mobile-nav, and layout-wrapper

## 🚀 Ready to Use

The system is now fully functional and tested:

- ✅ Course switching works on desktop and mobile
- ✅ Events are properly isolated by course
- ✅ No linter errors
- ✅ Backward compatible (works without courseId)
- ✅ All three courses (2820, 3510, 5850) are configured

Navigate to any course page and experience the isolated, course-specific event system!
