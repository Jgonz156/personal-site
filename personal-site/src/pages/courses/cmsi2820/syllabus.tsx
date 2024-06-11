import { Sheet } from "@mui/joy"
import Footer from "../../../components/footer"
import CourseNavBar from "../components/course-nav-bar"

export default function Syllabus() {
  return (
    <>
      <Sheet
        color="warning"
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
      </Sheet>
      <Footer />
    </>
  )
}
