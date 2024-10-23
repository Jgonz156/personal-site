import { Chip, Divider } from "@mui/joy"

export default function TopicBreak({ title }: { title: string }) {
  return (
    <Divider>
      <Chip size="lg">{title}</Chip>
    </Divider>
  )
}
