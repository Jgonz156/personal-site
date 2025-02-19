import { Button, Card, CardContent, Sheet, Tooltip, Typography } from "@mui/joy"
import { Link as RouterLink } from "react-router-dom"
import Speak from "./speak"

export default function ActivityCard({
  title,
  description,
  activitySlug,
  sectionRecordings,
}: Readonly<{
  title: string
  description: string
  activitySlug: string
  sectionRecordings?: { url?: string; buttonText: string }[]
}>) {
  return (
    <Card
      color="warning"
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
        color="warning"
        variant="soft"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        {activitySlug ? (
          <Button
            component={RouterLink}
            to={activitySlug}
            color="warning"
            variant="solid"
            sx={{ maxWidth: "1in" }}
          >
            Open
          </Button>
        ) : (
          <Tooltip
            describeChild
            color="warning"
            variant="soft"
            title={<Speak>Under Construction</Speak>}
            arrow
          >
            <Sheet color="warning" variant="soft">
              <Button
                disabled
                color="warning"
                variant="solid"
                sx={{ maxWidth: "1in" }}
              >
                Open
              </Button>
            </Sheet>
          </Tooltip>
        )}
        {sectionRecordings ? (
          sectionRecordings.map(({ url, buttonText }) => {
            return url ? (
              <Button
                component={RouterLink}
                to={url}
                color="warning"
                variant="solid"
                sx={{ maxWidth: "1in" }}
              >
                {buttonText}
              </Button>
            ) : (
              <Tooltip
                describeChild
                color="warning"
                variant="soft"
                title={
                  <Speak>Recording Failed, Please Watch Another Section</Speak>
                }
                arrow
              >
                <Sheet color="warning" variant="soft">
                  <Button
                    disabled
                    color="warning"
                    variant="solid"
                    sx={{ maxWidth: "1in" }}
                  >
                    {buttonText}
                  </Button>
                </Sheet>
              </Tooltip>
            )
          })
        ) : (
          <></>
        )}
      </Sheet>
    </Card>
  )
}
