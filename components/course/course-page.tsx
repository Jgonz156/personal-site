import { Sheet } from "@mui/joy";
import Footer from "@/components/global/footer";
import CourseNavBar from "./course-nav-bar";
import CourseNavStepper from "./course-nav-stepper";

export default function CoursePage({
  type,
  children,
  stepperInfo,
  footerInfo,
}: {
  type: "notes" | "homework" | "exam" | "syllabus" | "cheat-sheet";
  children: React.ReactNode;
  stepperInfo?: {
    left?: {
      lectureId: string | number;
      buttonName: any;
      buttonSlug: string;
      buttonColor: "danger" | "success" | "primary" | "warning" | "neutral";
    };
    middle?: {
      lectureId: string | number;
      buttonName: any;
      buttonSlug: string;
      buttonColor: "danger" | "success" | "primary" | "warning" | "neutral";
    };
    right?: {
      lectureId: string | number;
      buttonName: any;
      buttonSlug: string;
      buttonColor: "danger" | "success" | "primary" | "warning" | "neutral";
    };
  };
  footerInfo?: any;
}) {
  return (
    <>
      <Sheet
        color={
          type === "notes"
            ? "primary"
            : type === "homework" || type === "cheat-sheet"
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
        {children}
        {stepperInfo ? <CourseNavStepper stepperInfo={stepperInfo} /> : <></>}
      </Sheet>
      <Footer>{footerInfo}</Footer>
    </>
  );
}
