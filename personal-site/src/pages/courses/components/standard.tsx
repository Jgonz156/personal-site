import { Button, Divider, Link, Sheet } from "@mui/joy"
import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Speak from "./speak"

export default function Standard({
  number,
  title,
  description,
  children,
}: Readonly<{
  number: number | string
  title: string
  description: string
  children: React.ReactNode
}>) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Divider />
      <Link
        underline="none"
        component={Button}
        onClick={() => setOpen(!open)}
        sx={{ width: "100%" }}
      >
        <Sheet
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Sheet
            sx={{
              m: 1,
              width: "2rem",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Sheet>
          <Sheet
            sx={{
              m: 1,
              width: "6rem",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Speak>{number}</Speak>
          </Sheet>
          <Sheet
            sx={{
              m: 1,
              width: "10rem",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Speak>{title}</Speak>
          </Sheet>
          <Sheet
            sx={{
              m: 1,
              width: "50rem",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Speak>{description}</Speak>
          </Sheet>
        </Sheet>
      </Link>
      <Sheet>
        {open ? (
          <>
            <Divider />
            <Sheet
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                gap: 2,
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              {children}
            </Sheet>
          </>
        ) : null}
      </Sheet>
    </>
  )
}
