import { AspectRatio, Card, Divider } from "@mui/joy";

export default function BookCard() {
  return (
    <>
      <Card variant="soft" sx={{ width: 300 }}>
        <AspectRatio ratio="8.5/11">
          <img
            src={"/lmu-identity/LMU-Campus-Ariel.jpg"}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <Divider orientation="horizontal" />
      </Card>
    </>
  );
}
