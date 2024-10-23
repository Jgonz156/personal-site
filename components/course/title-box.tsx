import { Link, Sheet, Typography } from "@mui/joy"
import RouterLink from "next/link"

export default function TitleBox({
  title,
  quote,
  link,
}: {
  title: string
  quote?: string
  link?: string
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
      {quote ? <Typography level="h4">{quote}</Typography> : <></>}
      {link ? <Link overlay component={RouterLink} href={link} /> : <></>}
    </Sheet>
  )
}
