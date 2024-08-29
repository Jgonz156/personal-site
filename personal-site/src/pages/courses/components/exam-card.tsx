import { Button, Card, CardActions, CardContent, Typography } from "@mui/joy"
import { Link as RouterLink } from "react-router-dom"

export default function ExamCard({
  title,
  description,
  examSlug,
  studyHelpRecordings,
}: Readonly<{
  title: string
  description: string
  examSlug: string
  studyHelpRecordings?: { url: string; buttonText: string }[]
}>) {
  return (
    <Card
      color="danger"
      orientation="vertical"
      size="md"
      variant="soft"
      sx={{ maxWidth: "40%", minWidth: "2in" }}
    >
      <CardContent>
        <Typography level="title-sm">{title}</Typography>
        <Typography level="body-sm">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={examSlug}
          color="danger"
          variant="solid"
          sx={{ maxWidth: "1in" }}
        >
          Open
        </Button>
        {studyHelpRecordings ? (
          studyHelpRecordings.map(({ url, buttonText }) => (
            <Button
              component={RouterLink}
              to={url}
              color="success"
              variant="solid"
              sx={{ maxWidth: "1in" }}
            >
              {buttonText}
            </Button>
          ))
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  )
}
