import { Sheet, Button } from "@mui/joy"
import BackpackIcon from "@mui/icons-material/Backpack"
import DescriptionIcon from "@mui/icons-material/Description"
import HomeIcon from "@mui/icons-material/Home"
import { Link as RouterLink } from "react-router-dom"

export default function CourseNavBar({
  courseName,
  courseNumber,
}: {
  courseName: string
  courseNumber: string | number
}) {
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
      <Button
        component={RouterLink}
        to={`/cmsi-${courseNumber}`}
        color="primary"
        startDecorator={<HomeIcon />}
      >
        {courseName}
      </Button>
      <Button
        component={RouterLink}
        to={`/cmsi-${courseNumber}/cheat-sheet`}
        color="success"
        startDecorator={<BackpackIcon />}
      >
        Course Info Cheat Sheet!
      </Button>
      <Button
        component={RouterLink}
        to={`/cmsi-${courseNumber}/syllabus`}
        color="warning"
        startDecorator={<DescriptionIcon />}
      >
        Syllabus
      </Button>
    </Sheet>
  )
}
