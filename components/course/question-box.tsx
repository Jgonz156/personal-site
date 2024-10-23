import { Chip, Sheet } from "@mui/joy"
import React from "react"

export default function QuestionBox({
  points,
  qid,
  children,
}: {
  points?: string | number
  qid: string | number
  children?: React.ReactNode
}) {
  return (
    <Sheet
      variant="outlined"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        borderWidth: 4,
        p: 4,
        gap: 2,
      }}
    >
      <Sheet sx={{ display: "flex", gap: 2 }}>
        {points ? <Chip>{points} pts</Chip> : <></>}
        <Chip>{qid}</Chip>
      </Sheet>
      {children}
    </Sheet>
  )
}
