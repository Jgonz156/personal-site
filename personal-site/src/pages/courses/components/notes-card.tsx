import { Button, Card, CardActions, CardContent, Typography } from "@mui/joy"
import { Link as RouterLink } from "react-router-dom"

export default function NotesCard({
  title,
  description,
  notesSlug,
}: Readonly<{
  title: string
  description: string
  notesSlug: string
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
      <CardActions>
        <Button
          component={RouterLink}
          to={notesSlug}
          color="primary"
          variant="solid"
          sx={{ maxWidth: "1in" }}
        >
          Open
        </Button>
      </CardActions>
    </Card>
  )
}
