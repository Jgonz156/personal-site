import { Sheet } from "@mui/joy"
import Footer from "../../../components/footer"
import CourseNavBar from "./course-nav-bar"

export default function CoursePage({
  type,
  children,
}: {
  type: "notes" | "assignment" | "exam" | "syllabus" | "cheat-sheet"
  children: React.ReactNode
}) {
  return (
    <>
      <Sheet
        color={
          type === "notes"
            ? "primary"
            : type === "assignment" || type === "cheat-sheet"
            ? "success"
            : type === "syllabus"
            ? "warning"
            : "danger"
        }
        variant="solid"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: "100vh",
          p: 4,
          gap: 4,
        }}
      >
        <CourseNavBar />
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            borderRadius: 12,
            gap: 4,
          }}
        >
          {children}
        </Sheet>
      </Sheet>
      <Footer />
    </>
  )
}
