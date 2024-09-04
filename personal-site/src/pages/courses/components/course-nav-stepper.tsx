import { Sheet, Stepper, Step, StepIndicator, Button } from "@mui/joy"
import { Link as RouterLink } from "react-router-dom"

export default function CourseNavStepper({
  stepperInfo,
}: Readonly<{
  stepperInfo: {
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
}>) {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        p: 4,
        borderRadius: 12,
        gap: 4,
      }}
    >
      <Stepper sx={{ width: "100%", "--StepIndicator-size": "3rem" }}>
        {stepperInfo.left ? (
          <Step
            orientation="vertical"
            indicator={
              <StepIndicator variant="solid">
                {stepperInfo.left.lectureId}
              </StepIndicator>
            }
          >
            <Button
              component={RouterLink}
              color={stepperInfo.left.buttonColor}
              to={stepperInfo.left.buttonSlug}
            >
              {stepperInfo.left.buttonName}
            </Button>
          </Step>
        ) : (
          <Step
            orientation="vertical"
            indicator={<StepIndicator variant="solid">#</StepIndicator>}
          ></Step>
        )}
        {stepperInfo.middle ? (
          <Step
            orientation="vertical"
            indicator={
              <StepIndicator variant="solid">
                {stepperInfo.middle.lectureId}
              </StepIndicator>
            }
          >
            <Button
              component={RouterLink}
              color={stepperInfo.middle.buttonColor}
              to={stepperInfo.middle.buttonSlug}
            >
              {stepperInfo.middle.buttonName}
            </Button>
          </Step>
        ) : (
          <Step
            orientation="vertical"
            indicator={<StepIndicator variant="solid">#</StepIndicator>}
          ></Step>
        )}
        {stepperInfo.right ? (
          <Step
            orientation="vertical"
            indicator={
              <StepIndicator variant="solid">
                {stepperInfo.right.lectureId}
              </StepIndicator>
            }
          >
            <Button
              component={RouterLink}
              color={stepperInfo.right.buttonColor}
              to={stepperInfo.right.buttonSlug}
            >
              {stepperInfo.right.buttonName}
            </Button>
          </Step>
        ) : (
          <Step
            orientation="vertical"
            indicator={<StepIndicator variant="solid">#</StepIndicator>}
          ></Step>
        )}
      </Stepper>
    </Sheet>
  )
}
