import { Sheet, Button } from "@mui/joy";
import BackpackIcon from "@mui/icons-material/Backpack";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import RouterLink from "next/link";

export default function CourseNavBar() {
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
        href="/cmsi-2820"
        color="primary"
        startDecorator={<HomeIcon />}
      >
        CMSI 2820: Discrete Mathematics for CS
      </Button>
      <Button
        component={RouterLink}
        href="/cmsi-2820/cheat-sheet"
        color="success"
        startDecorator={<BackpackIcon />}
      >
        Course Info Cheat Sheet!
      </Button>
      <Button
        component={RouterLink}
        href="/cmsi-2820/syllabus"
        color="warning"
        startDecorator={<DescriptionIcon />}
      >
        Syllabus
      </Button>
    </Sheet>
  );
}
