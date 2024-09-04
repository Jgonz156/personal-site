import { Button, Card, CardContent, Sheet, Typography } from "@mui/joy"
import { Link as RouterLink } from "react-router-dom"

export default function NotesCard({
  title,
  description,
  notesSlug,
  sectionRecordings,
}: Readonly<{
  title: string
  description: string
  notesSlug: string
  sectionRecordings?: { url: string; buttonText: string }[]
}>) {
  return (
    <Card
      color="primary"
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
        color="primary"
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
          to={notesSlug}
          color="primary"
          variant="solid"
          sx={{ maxWidth: "1in" }}
        >
          Open
        </Button>
        {sectionRecordings ? (
          sectionRecordings.map(({ url, buttonText }) => (
            <Button
              component={RouterLink}
              to={url}
              color="primary"
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
