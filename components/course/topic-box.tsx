import { Chip, Sheet } from "@mui/joy"

export default function TopicBox({ topics }: { topics: any[] }) {
  return (
    <Sheet
      color="neutral"
      variant="soft"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        p: 4,
        gap: 4,
      }}
    >
      {topics.map((topic) => (
        <Chip>{topic}</Chip>
      ))}
    </Sheet>
  )
}
