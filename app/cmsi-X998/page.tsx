import { Sheet, Button } from "@mui/joy"
import DescriptionIcon from "@mui/icons-material/Description"
import HomeIcon from "@mui/icons-material/Home"
import Speak from "@/components/course/speak"
import Footer from "@/components/global/footer"
import RouterLink from "next/link"

export default function CMSIX998() {
  return (
    <>
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
            href="/cmsi-X998"
            color="primary"
            startDecorator={<HomeIcon />}
          >
            CMSI X998: Independent Study
          </Button>
          <Button
            component={RouterLink}
            href="/cmsi-X998/lmu-is-form"
            color="success"
            startDecorator={<DescriptionIcon />}
          >
            Independent Study Form
          </Button>
          <Button
            component={RouterLink}
            href="/cmsi-X998/project-outline"
            color="warning"
            startDecorator={<DescriptionIcon />}
          >
            Project Outline
          </Button>
        </Sheet>
        <Sheet
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 4,
            borderRadius: 12,
            gap: 4,
          }}
        >
          <Speak>
            Welcome to Independent Study, a course designed to allow you to
            ideate your own project or learning goals within the CS curriculum.
          </Speak>
        </Sheet>
      </Sheet>
      <Footer />
    </>
  )
}
