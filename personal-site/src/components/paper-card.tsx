import { AspectRatio, Card, Divider } from "@mui/joy";

export default function PaperCard() {
  return (
    <Card orientation="horizontal" variant="soft" sx={{ width: 400 }}>
      <AspectRatio ratio="8.5/11" sx={{ width: 100 }}>
        <img src={"/lmu-identity/LMU-Campus-Ariel.jpg"} loading="lazy" alt="" />
      </AspectRatio>
      <Divider orientation="vertical" />
    </Card>
  );
}
