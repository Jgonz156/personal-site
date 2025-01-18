import { Avatar, Sheet, Typography } from "@mui/joy"
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers"
import { DateTime } from "luxon"
import { RefAttributes, useState } from "react"
import TitleBox from "../components/title-box"
import Speak from "../components/speak"
import { JSX } from "react/jsx-runtime"
import { SxProps } from "@mui/material"

function ScheduleDay(
  props: JSX.IntrinsicAttributes &
    PickersDayProps<DateTime<boolean>> &
    RefAttributes<HTMLButtonElement> & {
      schedule?: {
        date: DateTime
        quote: string
        dayType: string
        dayInfo: any
      }[]
    }
) {
  const { schedule, day, ...otherProps } = props
  const dayInfo = schedule?.find(
    ({ date }) =>
      date.startOf("day").toISODate() === day.startOf("day").toISODate()
  )
  const scheduleDaySX: SxProps = { borderRadius: 100 }
  return dayInfo?.dayType === "lecture" ? (
    <Sheet color="primary" variant="soft" sx={scheduleDaySX}>
      <PickersDay day={day} {...otherProps} />
    </Sheet>
  ) : dayInfo?.dayType === "homework" ? (
    <Sheet color="success" variant="soft" sx={scheduleDaySX}>
      <PickersDay day={day} {...otherProps} />
    </Sheet>
  ) : dayInfo?.dayType === "midterm" || dayInfo?.dayType === "finals" ? (
    <Sheet color="danger" variant="soft" sx={scheduleDaySX}>
      <PickersDay day={day} {...otherProps} />
    </Sheet>
  ) : dayInfo?.dayType === "holiday" || dayInfo?.dayType === "NO CLASS" ? (
    <Sheet color="warning" variant="soft" sx={scheduleDaySX}>
      <PickersDay day={day} {...otherProps} />
    </Sheet>
  ) : dayInfo?.dayType === "office hours" ? (
    <Sheet color="neutral" variant="soft" sx={scheduleDaySX}>
      <PickersDay day={day} {...otherProps} />
    </Sheet>
  ) : (
    <PickersDay day={day} {...otherProps} />
  )
}

export default function CourseSchedule() {
  const schedule = [
    {
      date: DateTime.local(2025, 1, 16).startOf("day"),
      quote: "Lecture Day (The Study of Programming Languages)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 1, 20).startOf("day"),
      quote: "Martin Luther King Jr Day!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 1, 23).startOf("day"),
      quote: "Lecture Day (Theories of Computer Science)",
      dayType: "lecture",
      dayInfo: <></>,
    },

    {
      date: DateTime.local(2025, 1, 30).startOf("day"),
      quote: "Lecture Day (Logic)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 6).startOf("day"),
      quote: "Lecture Day (Mathematical Foundations)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 7).startOf("day"),
      quote: "HW1 Released",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 13).startOf("day"),
      quote: "Lecture Day (Language Theory)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 20).startOf("day"),
      quote: "Lecture Day (Syntax)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 21).startOf("day"),
      quote: "HW1 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 27).startOf("day"),
      quote: "Lecture Day (Semantics)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 28).startOf("day"),
      quote: "HW2 Released",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 3).startOf("day"),
      quote: "Spring Break!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 4).startOf("day"),
      quote: "Spring Break!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 5).startOf("day"),
      quote: "Spring Break!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 6).startOf("day"),
      quote: "Spring Break!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 7).startOf("day"),
      quote: "Spring Break!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 13).startOf("day"),
      quote: "Lecture Day (Case Studies: Astro and Bella)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 20).startOf("day"),
      quote: "Lecture Day (Operational Semantics)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 21).startOf("day"),
      quote: "HW2 and OHW1 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 27).startOf("day"),
      quote: "Lecture Day (Lambda Calculus)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 28).startOf("day"),
      quote: "HW3 Released",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 31).startOf("day"),
      quote: "Cesar Chavez Day!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 3).startOf("day"),
      quote: "Lecture Day (Denotational Semantics)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 4).startOf("day"),
      quote: "HW4 and HW5 Released",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 10).startOf("day"),
      quote: "Work Day (NO MATERIAL)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 11).startOf("day"),
      quote: "HW3 and OHW2 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 16).startOf("day"),
      quote: "Easter Break!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 17).startOf("day"),
      quote: "Easter Break!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 18).startOf("day"),
      quote: "Easter Break!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 24).startOf("day"),
      quote: "Work Day (NO MATERIAL)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 25).startOf("day"),
      quote: "HW4 and OHW3 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 5, 1).startOf("day"),
      quote: "Work Day (NO MATERIAL)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 5, 8).startOf("day"),
      quote: "Final Release Day",
      dayType: "finals",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 5, 9).startOf("day"),
      quote: "HW5 and OHW4 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 5, 13).startOf("day"),
      quote: "OHW5 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 5, 14).startOf("day"),
      quote: "Final Due",
      dayType: "finals",
      dayInfo: <></>,
    },
  ]

  const [currentDate, setCurrentDate] = useState(
    DateTime.local().startOf("day")
  )

  let currentDateInfo = schedule?.find(
    ({ date }) =>
      date.startOf("day").toISODate() === currentDate.startOf("day").toISODate()
  )

  return (
    <>
      <Sheet
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: 12,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          Legend
          <Sheet sx={{ display: "flex", alignItems: "center" }}>
            <Avatar color="primary"> </Avatar>
            <Typography> : Lecture Day</Typography>
          </Sheet>
          <Sheet sx={{ display: "flex", alignItems: "center" }}>
            <Avatar color="success"> </Avatar>
            <Typography> : Homework Due Day</Typography>
          </Sheet>
          <Sheet sx={{ display: "flex", alignItems: "center" }}>
            <Avatar color="danger"> </Avatar>
            <Typography> : Exam Release/Due Day</Typography>
          </Sheet>
          <Sheet sx={{ display: "flex", alignItems: "center" }}>
            <Avatar color="warning"> </Avatar>
            <Typography> : Holiday</Typography>
          </Sheet>
          <Sheet sx={{ display: "flex", alignItems: "center" }}>
            <Avatar color="neutral"> </Avatar>
            <Typography> : Office Hours</Typography>
          </Sheet>
        </Sheet>
        <DateCalendar
          showDaysOutsideCurrentMonth
          fixedWeekNumber={6}
          views={["day"]}
          displayWeekNumber
          value={currentDate}
          onChange={(selectedDate) => {
            setCurrentDate(selectedDate.startOf("day"))
            currentDateInfo = schedule?.find(
              ({ date }) =>
                date.startOf("day").toISODate() ===
                currentDate.startOf("day").toISODate()
            )
          }}
          sx={{ m: 0 }}
          slots={{ day: ScheduleDay }}
          slotProps={{ day: { schedule } as any }}
        />

        {currentDateInfo ? (
          <Sheet sx={{ display: "flex", gap: 4, flexDirection: "column" }}>
            <TitleBox
              title={`${currentDateInfo.date.toFormat("DDD")}`}
              quote={`${currentDateInfo.quote}`}
            />
            <Speak>{currentDateInfo.dayInfo}</Speak>
          </Sheet>
        ) : (
          <Sheet sx={{ display: "flex", gap: 4, flexDirection: "column" }}>
            <TitleBox
              title={`${currentDate.toFormat("DDD")}`}
              quote={`No Info On Selected Date`}
            />
          </Sheet>
        )}
      </Sheet>
    </>
  )
}
