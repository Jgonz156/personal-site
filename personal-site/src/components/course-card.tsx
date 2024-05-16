import { Link } from "@mui/joy"
import AspectRatio from "@mui/joy/AspectRatio"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import CardOverflow from "@mui/joy/CardOverflow"
import Typography from "@mui/joy/Typography"
import { Link as RouterLink } from "react-router-dom"

export default function CourseCard({
  Title,
  Code,
  ImageUrl,
  slug,
}: {
  Title: string
  Code: string
  ImageUrl: string
  slug: string
}) {
  return (
    <Card orientation="horizontal" variant="outlined" sx={{ width: 350 }}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 110 }}>
          <img src={ImageUrl} loading="lazy" alt="" />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor">
          {Title}
        </Typography>
        <Typography level="body-sm">
          <Link
            overlay
            underline="none"
            component={RouterLink}
            to={slug}
            sx={{ color: "text.tertiary" }}
          >
            California, USA
          </Link>
        </Typography>
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
  )
}
