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

export default function SpringCourseSchedule() {
  const schedule = [
    {
      date: DateTime.local(2025, 1, 13).startOf("day"),
      quote: "Lecture Day (LN0)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 1, 15).startOf("day"),
      quote: "Lecture Day (LN1)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 1, 20).startOf("day"),
      quote: "Martin Luther King Jr Day! HW0 Released!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 1, 22).startOf("day"),
      quote: "Lecture Day (LN2)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 1, 27).startOf("day"),
      quote: "Lecture Day (LN3), HW0, OHW0, and EX0 Released",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 1, 29).startOf("day"),
      quote: "Lecture Day (LN4)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 1, 31).startOf("day"),
      quote: "HW0, OHW0, and EX0 Due, HW1 Released",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 3).startOf("day"),
      quote: "Lecture Day (LN5)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 5).startOf("day"),
      quote: "Lecture Day (LN6)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 10).startOf("day"),
      quote: "Lecture Day (LN7)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 12).startOf("day"),
      quote: "Lecture Day (LN8)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 14).startOf("day"),
      quote: "HW1 Due and HW2 Released",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 17).startOf("day"),
      quote: "Lecture Day (LN9)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 19).startOf("day"),
      quote: "Lecture Day (LN10)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 24).startOf("day"),
      quote: "Lecture Day (LN11)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 26).startOf("day"),
      quote: "Lecture Day (LN12)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 2, 28).startOf("day"),
      quote: "HW2 and OHW1 Due, HW3 Released",
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
      date: DateTime.local(2025, 3, 12).startOf("day"),
      quote: "Lecture Day (LN13)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 12).startOf("day"),
      quote: "Lecture Day (LN14)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 17).startOf("day"),
      quote: "Lecture Day (LN15)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 19).startOf("day"),
      quote: "Lecture Day (LN16)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 21).startOf("day"),
      quote: "HW3 and OHW2 Due, HW4 Released",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 24).startOf("day"),
      quote: "Lecture Day (LN17)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 26).startOf("day"),
      quote: "Lecture Day (LN18)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 3, 31).startOf("day"),
      quote: "Cesar Chavez Day!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 2).startOf("day"),
      quote: "Lecture Day (LN19)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 4).startOf("day"),
      quote: "HW4 and OHW3 Due, HW5 Released",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 7).startOf("day"),
      quote: "Lecture Day (LN20)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 9).startOf("day"),
      quote: "Lecture Day (LN21)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 14).startOf("day"),
      quote:
        "NO CLASS! Normally There Is Class Today, However Enjoy Easter Break!",
      dayType: "holiday",
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
      date: DateTime.local(2025, 4, 21).startOf("day"),
      quote: "Lecture Day (LN22)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 23).startOf("day"),
      quote: "Lecture Day (LN23)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 25).startOf("day"),
      quote: "HW5 and OHW4 Due, HW6 Released",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 28).startOf("day"),
      quote: "Lecture Day (LN24)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 4, 30).startOf("day"),
      quote: "Lecture Day (LN25)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 5, 2).startOf("day"),
      quote: "HW6 and OHW5 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 5, 5).startOf("day"),
      quote: "Lecture Day (LN26)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2025, 5, 7).startOf("day"),
      quote: "Lecture Day (LN27)",
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
      date: DateTime.local(2025, 5, 13).startOf("day"),
      quote: "OHW6 Due",
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
            <Typography> : Lecture</Typography>
          </Sheet>
          <Sheet sx={{ display: "flex", alignItems: "center" }}>
            <Avatar color="success"> </Avatar>
            <Typography> : Homework</Typography>
          </Sheet>
          <Sheet sx={{ display: "flex", alignItems: "center" }}>
            <Avatar color="danger"> </Avatar>
            <Typography> : Exam</Typography>
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
