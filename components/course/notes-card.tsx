import { Button, Card, CardContent, Sheet, Tooltip, Typography } from "@mui/joy"
import RouterLink from "next/link"
import Speak from "./speak"

export default function NotesCard({
  title,
  description,
  notesSlug,
  sectionRecordings,
}: Readonly<{
  title: string
  description: string
  notesSlug: string
  sectionRecordings?: { url?: string; buttonText: string }[]
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
        {notesSlug ? (
          <Button
            component={RouterLink}
            href={notesSlug}
            color="primary"
            variant="solid"
            sx={{ maxWidth: "1in" }}
          >
            Open
          </Button>
        ) : (
          <Tooltip
            describeChild
            color="primary"
            variant="soft"
            title={<Speak>Under Construction</Speak>}
          >
            <Sheet color="primary" variant="soft">
              <Button
                disabled
                color="primary"
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
                href={url}
                color="primary"
                variant="solid"
                sx={{ maxWidth: "1in" }}
              >
                {buttonText}
              </Button>
            ) : (
              <Tooltip
                describeChild
                color="primary"
                variant="soft"
                title={
                  <Speak>Recording Failed, Please Watch Another Section</Speak>
                }
              >
                <Sheet color="primary" variant="soft">
                  <Button
                    disabled
                    color="primary"
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
