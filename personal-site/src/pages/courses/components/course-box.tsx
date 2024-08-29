import { Sheet } from "@mui/joy"
import CourseNavStepper from "./course-nav-stepper"

export default function CourseBox({
  children,
  stepperInfo,
}: {
  children: React.ReactNode
  stepperInfo?: {
    left?: {
      lectureId: string | number
      buttonName: any
      buttonSlug: string
      buttonColor: "danger" | "success" | "primary" | "warning" | "neutral"
    }
    middle?: {
      lectureId: string | number
      buttonName: any
      buttonSlug: string
      buttonColor: "danger" | "success" | "primary" | "warning" | "neutral"
    }
    right?: {
      lectureId: string | number
      buttonName: any
      buttonSlug: string
      buttonColor: "danger" | "success" | "primary" | "warning" | "neutral"
    }
  }
}) {
  return (
    <>
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
      {stepperInfo ? <CourseNavStepper stepperInfo={stepperInfo} /> : <></>}
    </>
  )
}
