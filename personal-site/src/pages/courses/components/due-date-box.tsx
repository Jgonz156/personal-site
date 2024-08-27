import { Avatar, Chip, Divider, Sheet } from "@mui/joy";
import TopicBreak from "./topic-break";

export default function DueDateBox({
  daysOfWeek,
  dueTime,
}: {
  daysOfWeek: string[];
  dueTime: string;
}) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return (
    <>
      <TopicBreak title="Due date" />
      <Sheet
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Sheet style={{ display: "flex" }}>
          {days.map((day, i) => (
            <Avatar
              key={i}
              color={daysOfWeek.includes(day) ? "primary" : "neutral"}
            >
              {day.substring(0, 2)}
            </Avatar>
          ))}
        </Sheet>
        <Chip>Due Time: {dueTime}</Chip>
      </Sheet>
      <Divider />
    </>
  );
}
