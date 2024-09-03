import { Sheet, Typography } from "@mui/joy";
import { DateCalendar } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

export default function DueDateCalendar({ dueDate }: { dueDate: DateTime }) {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Sheet color="neutral" variant="soft" sx={{ p: 4, borderRadius: 12 }}>
        <Typography level="h3">Due Date and Time</Typography>
      </Sheet>
      <DateCalendar
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        views={["day"]}
        displayWeekNumber
        minDate={DateTime.local()}
        maxDate={dueDate}
        // @ts-ignore
        value={dueDate}
        sx={{ m: 0 }}
      />
      <Sheet color="neutral" variant="soft" sx={{ p: 4, borderRadius: 12 }}>
        <Typography level="h3">11:59 PM</Typography>
      </Sheet>
    </Sheet>
  );
}
