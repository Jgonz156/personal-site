import { IconButton, Input, Sheet, Tooltip, Typography } from "@mui/joy"
import CalculateIcon from "@mui/icons-material/Calculate"
import { useState } from "react"

export default function StandardsDiagram({
  courseID,
  coursePointTotal,
  standards,
}: Readonly<{
  courseID: string
  coursePointTotal: number
  standards: {
    standardID: string
    pointTotal?: number
    homework?: { id: string; points: number; gradedWith: string }[]
    exams?: { id: string; points: number; gradedWith: string }[]
  }[]
}>) {
  const [calculatorMode, setCalculatorMode] = useState(false)
  const [coursePointTotalState, setCoursePointTotalState] = useState(0)
  const [pointState, setPointState] = useState(
    standards.map((s) => ({
      standardID: s.standardID,
      pointTotal: s.pointTotal,
      currentPoints: 0,
      assignments: (s.homework ?? [])
        .map((a) => ({
          id: a.id,
          points: a.points,
          currentPoints: 0,
          gradedWith: a.gradedWith,
        }))
        .concat(
          s.exams
            ? s.exams.map((a) => ({
                id: a.id,
                points: a.points,
                currentPoints: 0,
                gradedWith: a.gradedWith,
              }))
            : []
        ),
    }))
  )

  const standardLetter = (points: number) => {
    switch (true) {
      case points === 80:
        return "A"
      case points >= 72:
        return "A-"
      case points >= 64:
        return "B+"
      case points >= 56:
        return "B"
      case points >= 48:
        return "B-"
      case points >= 40:
        return "C+"
      case points >= 32:
        return "C"
      case points >= 24:
        return "C-"
      case points >= 16:
        return "D"
      default:
        return "F"
    }
  }

  const courseLetter = (points: number) => {
    const courseFactor =
      4 *
      standards.filter(
        (s) => !["Syllabus", "Midterm", "Final"].includes(s.standardID)
      ).length
    switch (true) {
      case points === coursePointTotal:
        return "A"
      case points >= coursePointTotal - courseFactor:
        return "A-"
      case points >= coursePointTotal - 2 * courseFactor:
        return "B+"
      case points >= coursePointTotal - 3 * courseFactor:
        return "B"
      case points >= coursePointTotal - 4 * courseFactor:
        return "B-"
      case points >= coursePointTotal - 5 * courseFactor:
        return "C+"
      case points >= coursePointTotal - 6 * courseFactor:
        return "C"
      case points >= coursePointTotal - 7 * courseFactor:
        return "C-"
      case points >= coursePointTotal - 8 * courseFactor:
        return "D"
      default:
        return "F"
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    standardID: string,
    assignmentID: string
  ) => {
    const newState = pointState.map((s) => {
      if (s.standardID === standardID) {
        return {
          ...s,
          assignments: s.assignments?.map((a) => {
            if (a.id === assignmentID) {
              return {
                ...a,
                currentPoints:
                  Number(event.target.value) < a.points
                    ? Number(event.target.value)
                    : a.points,
              }
            } else {
              return a
            }
          }),
        }
      } else {
        return s
      }
    })
    const updatedFullAssignmentList = newState
      .map((s) => s.assignments)
      .reduce((p, c) => p?.concat(c ?? []) ?? [], [])
    const afterGradedWith = newState.map((s) => {
      const gradedWithPoints =
        updatedFullAssignmentList
          ?.filter((a) => a.gradedWith === s.standardID)
          ?.reduce((p, c) => p + c.currentPoints, 0) ?? 0
      return {
        ...s,
        currentPoints: gradedWithPoints < 80 ? gradedWithPoints : 80,
      }
    })

    setPointState(afterGradedWith)
    setCoursePointTotalState(
      afterGradedWith.reduce((p, c) => p + c.currentPoints, 0) <
        coursePointTotal
        ? afterGradedWith.reduce((p, c) => p + c.currentPoints, 0)
        : coursePointTotal
    )
  }

  return (
    <>
      <Sheet
        variant="soft"
        sx={{
          p: 4,
          borderRadius: 12,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "left",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Sheet
          variant="soft"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Sheet variant="soft" sx={{ display: "flex", gap: 4 }}>
            <Typography>{courseID}</Typography>
            <Typography>
              T:{" "}
              {calculatorMode
                ? coursePointTotalState + "/" + coursePointTotal
                : coursePointTotal}
            </Typography>
            <Typography>
              {calculatorMode
                ? "Final Letter Grade: " + courseLetter(coursePointTotalState)
                : ""}
            </Typography>
          </Sheet>
          <Tooltip title="Toggle Calculator Mode" placement="top">
            <IconButton onClick={() => setCalculatorMode(!calculatorMode)}>
              <CalculateIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Sheet>
        <Sheet
          variant="soft"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: 4,
          }}
        >
          {calculatorMode
            ? standards.map(
                ({ standardID, pointTotal, homework, exams }, i) => (
                  <Sheet
                    key={i}
                    color="primary"
                    variant="soft"
                    sx={{
                      p: 2,
                      borderRadius: 12,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography>{standardID}</Typography>
                    {pointTotal || pointTotal === 0 ? (
                      <Typography>
                        T:{" "}
                        {pointState.find((s) => s.standardID === standardID)
                          ?.currentPoints ?? 0}
                        /{pointTotal}
                      </Typography>
                    ) : (
                      <></>
                    )}
                    {pointTotal ? (
                      <Typography>
                        Letter Grade:{" "}
                        {standardLetter(
                          pointState.find((s) => s.standardID === standardID)
                            ?.currentPoints ?? 0
                        )}
                      </Typography>
                    ) : (
                      <></>
                    )}
                    {homework ? (
                      homework.map(({ id, points }, j) => (
                        <Sheet
                          key={j}
                          color="success"
                          variant="soft"
                          sx={{
                            p: 2,
                            borderRadius: 12,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Typography>{id}</Typography>
                          <Sheet
                            color="success"
                            variant="soft"
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography>P: </Typography>
                            <Input
                              onChange={(event) =>
                                handleInputChange(event, standardID, id)
                              }
                              type="number"
                              size="sm"
                              required
                              sx={{
                                width: "4rem",
                              }}
                            />
                            <Typography>/{points}</Typography>
                          </Sheet>
                        </Sheet>
                      ))
                    ) : (
                      <></>
                    )}
                    {exams ? (
                      exams.map(({ id, points }, j) => (
                        <Sheet
                          key={j}
                          color="danger"
                          variant="soft"
                          sx={{
                            p: 2,
                            borderRadius: 12,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Typography>{id}</Typography>
                          <Sheet
                            color="danger"
                            variant="soft"
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography>P: </Typography>
                            <Input
                              onChange={(event) =>
                                handleInputChange(event, standardID, id)
                              }
                              type="number"
                              size="sm"
                              required
                              sx={{
                                width: "4rem",
                              }}
                            />
                            <Typography>/{points}</Typography>
                          </Sheet>
                        </Sheet>
                      ))
                    ) : (
                      <></>
                    )}
                  </Sheet>
                )
              )
            : standards.map(
                ({ standardID, pointTotal, homework, exams }, i) => (
                  <Sheet
                    key={i}
                    color="primary"
                    variant="soft"
                    sx={{
                      p: 2,
                      borderRadius: 12,
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography>{standardID}</Typography>
                    {pointTotal ? (
                      <Typography>T: {pointTotal}</Typography>
                    ) : (
                      <></>
                    )}

                    {homework ? (
                      homework.map(({ id, points }, j) => (
                        <Sheet
                          key={j}
                          color="success"
                          variant="soft"
                          sx={{
                            p: 2,
                            borderRadius: 12,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Typography>{id}</Typography>
                          <Typography>P: {points}</Typography>
                        </Sheet>
                      ))
                    ) : (
                      <></>
                    )}
                    {exams ? (
                      exams.map(({ id, points }, j) => (
                        <Sheet
                          key={j}
                          color="danger"
                          variant="soft"
                          sx={{
                            p: 2,
                            borderRadius: 12,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Typography>{id}</Typography>
                          <Typography>P: {points}</Typography>
                        </Sheet>
                      ))
                    ) : (
                      <></>
                    )}
                  </Sheet>
                )
              )}
        </Sheet>
      </Sheet>
    </>
  )
}
