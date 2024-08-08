import { Avatar, Chip, Divider, Sheet } from "@mui/joy"

export default function CourseInfoDump({
  sectionNumber,
  daysOfWeek,
  timeStart,
  timeEnd,
  building,
  roomNumber,
}: {
  sectionNumber: number
  daysOfWeek: string[]
  timeStart: string
  timeEnd: string
  building: string
  roomNumber: number
}) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  return (
    <>
      <Divider>
        <Chip>Section {sectionNumber}</Chip>
      </Divider>
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
        <Sheet>
          Time: {timeStart} - {timeEnd}
        </Sheet>
        <Sheet>Building: {building}</Sheet>
        <Sheet>Room #: {roomNumber}</Sheet>
      </Sheet>
    </>
  )
}
