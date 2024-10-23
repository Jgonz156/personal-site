import { Button, Card, CardContent, Sheet, Typography } from "@mui/joy"
import RouterLink from "next/link"

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
      <Sheet
        color="danger"
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
          href={examSlug}
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
              href={url}
              color="danger"
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
