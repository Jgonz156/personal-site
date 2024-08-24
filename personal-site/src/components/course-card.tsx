import { Link } from "@mui/joy"
import AspectRatio from "@mui/joy/AspectRatio"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import CardOverflow from "@mui/joy/CardOverflow"
import Typography from "@mui/joy/Typography"
import CourseModal from "./course-modal"

export default function CourseCard({
  title,
  code,
  imageUrl,
  slug,
  openModal,
  closeModal,
  modalState,
  children,
}: {
  title: string
  code: string
  imageUrl: string
  slug: string
  openModal: () => void
  closeModal: () => void
  modalState: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <Card orientation="horizontal" variant="soft" sx={{ width: 350 }}>
        <CardOverflow>
          <AspectRatio ratio="1" sx={{ width: 110 }}>
            <img src={imageUrl} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Link overlay onClick={openModal} />
          <Typography fontWeight="md" textColor="neutral">
            {title}
          </Typography>
          <Typography level="body-sm">California, USA</Typography>
        </CardContent>
        <CardOverflow
          variant="soft"
          color="primary"
          sx={{
            px: 0.2,
            writingMode: "vertical-rl",
            justifyContent: "center",
            fontSize: "xs",
            fontWeight: "xl",
            letterSpacing: "1px",
            textTransform: "uppercase",
            borderLeft: "1px solid",
            borderColor: "divider",
          }}
        >
          CMSI {code}
        </CardOverflow>
      </Card>
      <CourseModal dispatchClose={closeModal} visible={modalState} slug={slug}>
        {children}
      </CourseModal>
    </>
  )
}
