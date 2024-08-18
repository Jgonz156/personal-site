import { Link } from "@mui/joy";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import CourseModal from "./course-modal";

export default function CourseCard({
  Title,
  Code,
  ImageUrl,
  slug,
  openModal,
  closeModal,
  modalState,
  children,
}: {
  Title: string;
  Code: string;
  ImageUrl: string;
  slug: string;
  openModal: () => void;
  closeModal: () => void;
  modalState: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <Card orientation="horizontal" variant="soft" sx={{ width: 350 }}>
        <CardOverflow>
          <AspectRatio ratio="1" sx={{ width: 110 }}>
            <img src={ImageUrl} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Link overlay onClick={openModal} />
          <Typography fontWeight="md" textColor="neutral">
            {Title}
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
          CMSI {Code}
        </CardOverflow>
      </Card>
      <CourseModal dispatchClose={closeModal} visible={modalState} slug={slug}>
        {children}
      </CourseModal>
    </>
  );
}
