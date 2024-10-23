import { Typography } from "@mui/joy"
import React from "react"

export default function Speak({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Typography level="body-md">{children}</Typography>
    </>
  )
}
