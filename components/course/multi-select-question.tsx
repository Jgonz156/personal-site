"use client"
import { Checkbox, List, ListItem, Sheet, Switch, Typography } from "@mui/joy"
import { useState } from "react"
import ChecklistIcon from "@mui/icons-material/Checklist"

export default function MultiSelectQuestion({
  question,
  image,
  choices,
  answers,
  correctMessage,
  incorrectMessage,
}: {
  question: string
  image?: any
  choices: any[]
  answers: number[]
  correctMessage: any
  incorrectMessage: any
}) {
  const userSelections = choices.map(() => useState(0))
  const [displayAnswer, setDisplayAnswer] = useState(false)
  return (
    <Sheet
      color="danger"
      variant="soft"
      sx={{
        p: 4,
        borderRadius: 12,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Typography level="h1">Multi-Select Question</Typography>
      <ChecklistIcon />
      <Typography color="danger" variant="soft" level="h4">
        {question}
      </Typography>
      <>{image}</>
      <List wrap orientation="horizontal">
        {choices.map((a, i) => (
          <ListItem key={i}>
            <Checkbox
              value={userSelections[i][0]}
              onChange={() =>
                userSelections[i][1](userSelections[i][0] ? 0 : 1)
              }
              variant="soft"
              disableIcon
              label={a}
              sx={{ p: 1 }}
            />
          </ListItem>
        ))}
      </List>
      <>
        <Typography>Check Answers</Typography>
        <Switch
          checked={displayAnswer}
          onChange={() => setDisplayAnswer(!displayAnswer)}
          variant="solid"
          size="lg"
        />
      </>
      {displayAnswer ? (
        answers
          .map((a, i) => userSelections[i][0] === a)
          .reduce((a, b) => a && b, true) === true ? (
          <>{correctMessage}</>
        ) : (
          <>{incorrectMessage}</>
        )
      ) : (
        <></>
      )}
    </Sheet>
  )
}
