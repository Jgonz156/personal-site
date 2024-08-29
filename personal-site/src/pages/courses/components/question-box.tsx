import { Chip, Sheet, Typography } from "@mui/joy"
import React from "react"

export default function QuestionBox({
  points,
  qid,
  children,
}: {
  points: string | number
  qid: string | number
  children?: React.ReactNode
}) {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet>
        <Chip>({points})pts</Chip>
        <Chip>{qid}:</Chip>
      </Sheet>
      <Typography level="body-md">{children}</Typography>
    </Sheet>
  )
}
