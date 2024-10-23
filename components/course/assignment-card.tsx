import { Button, Card, CardContent, Sheet, Typography } from "@mui/joy"
import RouterLink from "next/link"

export default function AssignmentCard({
  title,
  description,
  assignmentSlug,
  homeworkHelpRecordings,
}: {
  title: string
  description: string
  assignmentSlug: string
  homeworkHelpRecordings?: { url: string; buttonText: string }[]
}) {
  return (
    <Card
      color="success"
      orientation="vertical"
      size="md"
      variant="soft"
      sx={{ maxWidth: "40%", minWidth: "2in" }}
    >
      <CardContent>
        <Typography level="title-sm">{title}</Typography>
        <Typography level="body-sm">{description}</Typography>
      </CardContent>
      <Sheet
        color="success"
        variant="soft"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        <Button
          component={RouterLink}
          href={assignmentSlug}
          color="success"
          variant="solid"
          sx={{ maxWidth: "1in" }}
        >
          Open
        </Button>
        {homeworkHelpRecordings ? (
          homeworkHelpRecordings.map(({ url, buttonText }) => (
            <Button
              component={RouterLink}
              href={url}
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
      </Sheet>
    </Card>
  )
}
