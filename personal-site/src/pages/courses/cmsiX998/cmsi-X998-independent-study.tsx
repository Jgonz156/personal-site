import { Sheet } from "@mui/joy";

import CourseNavBar from "../components/course-nav-bar";

export default function CMSIX998() {
  return (
    <Sheet
      color="primary"
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
      ></Sheet>
    </Sheet>
  );
}
