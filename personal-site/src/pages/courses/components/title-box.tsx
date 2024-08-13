import { Sheet, Typography } from "@mui/joy"

export default function TitleBox({
  title,
  quote,
}: {
  title: string
  quote: string
}) {
  return (
    <Sheet
      color="neutral"
      variant="soft"
      sx={{
        p: 4,
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Typography level="h1">{title}</Typography>
      <Typography level="h4">{quote}</Typography>
    </Sheet>
  )
}
