import { Avatar, Sheet, Typography } from "@mui/joy"
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers"
import { DateTime } from "luxon"
import { RefAttributes, useState } from "react"
import TitleBox from "./title-box"
import Speak from "./speak"
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
      date: DateTime.local(2024, 8, 27).startOf("day"),
      quote: "Lecture Day (LN0)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 8, 28).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 8, 29).startOf("day"),
      quote: "Lecture Day (LN1)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 2).startOf("day"),
      quote: "Labor Day!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 3).startOf("day"),
      quote: "Lecture Day (LN2)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 4).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 5).startOf("day"),
      quote: "Lecture Day (LN3)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 8).startOf("day"),
      quote: "HW0 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 10).startOf("day"),
      quote: "Lecture Day (LN4)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 11).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 12).startOf("day"),
      quote: "Lecture Day (LN5)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 17).startOf("day"),
      quote: "Lecture Day (LN6)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 18).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 19).startOf("day"),
      quote: "Lecture Day (LN7)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 20).startOf("day"),
      quote: "HW1 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 24).startOf("day"),
      quote: "Lecture Day (LN8)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 25).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 9, 26).startOf("day"),
      quote: "Lecture Day (LN9)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 1).startOf("day"),
      quote: "Lecture Day (LN10)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 2).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 3).startOf("day"),
      quote: "Lecture Day (LN11)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 4).startOf("day"),
      quote: "HW2 Due",
      dayType: "homework",
      dayInfo: <></>,
    },

    {
      date: DateTime.local(2024, 10, 8).startOf("day"),
      quote: "Lecture Day (LN12)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 9).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 10).startOf("day"),
      quote: "Lecture Day (LN13)",
      dayType: "lecture",
      dayInfo: <></>,
    },

    {
      date: DateTime.local(2024, 10, 11).startOf("day"),
      quote: "Autumn Day!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 14).startOf("day"),
      quote: "Midterm Release Day",
      dayType: "midterm",
      dayInfo: <></>,
    },

    {
      date: DateTime.local(2024, 10, 15).startOf("day"),
      quote: "Lecture Day (LN14)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 16).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 17).startOf("day"),
      quote: "Lecture Day (LN15)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 18).startOf("day"),
      quote: "HW3 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 20).startOf("day"),
      quote: "Midterm Due",
      dayType: "midterm",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 22).startOf("day"),
      quote: "Lecture Day (LN16)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 23).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 24).startOf("day"),
      quote: "Lecture Day (LN17)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 29).startOf("day"),
      quote: "Lecture Day (LN18)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 30).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 10, 31).startOf("day"),
      quote: "Lecture Day (LN19)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 1).startOf("day"),
      quote: "HW4 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 5).startOf("day"),
      quote: "Lecture Day (LN20)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 6).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 7).startOf("day"),
      quote: "Lecture Day (LN21)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 12).startOf("day"),
      quote: "Lecture Day (LN22)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 13).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 14).startOf("day"),
      quote: "Lecture Day (LN23)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 15).startOf("day"),
      quote: "HW5 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 19).startOf("day"),
      quote: "Lecture Day (LN24)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 20).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 21).startOf("day"),
      quote: "Lecture Day (LN25)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 22).startOf("day"),
      quote: "HW6 Due",
      dayType: "homework",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 26).startOf("day"),
      quote:
        "Normally There Is Class Today, but Have The Day Off In Thanks. Enjoy Thanksgiving!",
      dayType: "NO CLASS",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 27).startOf("day"),
      quote: "Thanksgiving!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 11, 28).startOf("day"),
      quote: "Thanksgiving!",
      dayType: "holiday",
      dayInfo: <></>,
    },

    {
      date: DateTime.local(2024, 11, 29).startOf("day"),
      quote: "Thanksgiving!",
      dayType: "holiday",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 12, 3).startOf("day"),
      quote: "Lecture Day (LN26)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 12, 4).startOf("day"),
      quote: "Office Hours 9 AM - 12 PM, 2 PM - 5 PM",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 12, 5).startOf("day"),
      quote: "Lecture Day (LN27)",
      dayType: "lecture",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 12, 9).startOf("day"),
      quote: "Final Release Day",
      dayType: "finals",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 12, 10).startOf("day"),
      quote: "Finals Study Day 6 PM - 8 PM Seaver 304",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 12, 12).startOf("day"),
      quote:
        "Finals Study Day 8 AM - 10 AM Pereira 201 , 11 AM - 1 PM Pereira 109",
      dayType: "office hours",
      dayInfo: <></>,
    },
    {
      date: DateTime.local(2024, 12, 13).startOf("day"),
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
