import { Button, Card, CardActions, CardContent, Typography } from "@mui/joy"
import { Link as RouterLink } from "react-router-dom"

export default function AssignmentCard({
  title,
  description,
  assignmentSlug,
}: {
  title: string
  description: string
  assignmentSlug: string
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
      <CardActions>
        <Button
          component={RouterLink}
          to={assignmentSlug}
          color="success"
          variant="solid"
          sx={{ maxWidth: "1in" }}
        >
          Open
        </Button>
      </CardActions>
    </Card>
  )
}
