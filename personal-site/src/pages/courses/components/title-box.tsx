import { Link, Sheet, Typography } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";

export default function TitleBox({
  title,
  quote,
  link,
}: {
  title: string;
  quote: string;
  link?: string;
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
      {link ? <Link overlay component={RouterLink} to={link} /> : <></>}
    </Sheet>
  );
}
