"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Calculator } from "lucide-react"
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

  const standardLetter = (points: number, totalPoints: number) => {
    if (!totalPoints) return "N/A"

    const step = totalPoints / 10

    switch (true) {
      case points >= totalPoints:
        return "A"
      case points >= totalPoints - step:
        return "A-"
      case points >= totalPoints - 2 * step:
        return "B+"
      case points >= totalPoints - 3 * step:
        return "B"
      case points >= totalPoints - 4 * step:
        return "B-"
      case points >= totalPoints - 5 * step:
        return "C+"
      case points >= totalPoints - 6 * step:
        return "C"
      case points >= totalPoints - 7 * step:
        return "C-"
      case points >= totalPoints - 8 * step:
        return "D"
      default:
        return "F"
    }
  }

  const courseLetter = (points: number) => {
    const step = coursePointTotal / 10

    switch (true) {
      case points >= coursePointTotal:
        return "A"
      case points >= coursePointTotal - step:
        return "A-"
      case points >= coursePointTotal - 2 * step:
        return "B+"
      case points >= coursePointTotal - 3 * step:
        return "B"
      case points >= coursePointTotal - 4 * step:
        return "B-"
      case points >= coursePointTotal - 5 * step:
        return "C+"
      case points >= coursePointTotal - 6 * step:
        return "C"
      case points >= coursePointTotal - 7 * step:
        return "C-"
      case points >= coursePointTotal - 8 * step:
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
      // If pointTotal is 0, treat as bonus standard with no cap
      const cappedPoints = s.pointTotal === 0
        ? gradedWithPoints
        : gradedWithPoints < (s.pointTotal ?? 0) ? gradedWithPoints : (s.pointTotal ?? 0)
      return {
        ...s,
        currentPoints: cappedPoints,
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
    <div className="bg-muted/50 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-6 flex-wrap items-center">
          <p className="font-semibold text-foreground">{courseID}</p>
          <p className="text-muted-foreground">
            T:{" "}
            {calculatorMode
              ? `${coursePointTotalState}/${coursePointTotal}`
              : coursePointTotal}
          </p>
          {calculatorMode && (
            <p className="font-semibold text-foreground">
              Final Letter Grade:{" "}
              <span
                className={`text-lg ${
                  courseLetter(coursePointTotalState).startsWith("A")
                    ? "text-green-600 dark:text-green-400"
                    : courseLetter(coursePointTotalState).startsWith("B")
                    ? "text-blue-600 dark:text-blue-400"
                    : courseLetter(coursePointTotalState).startsWith("C")
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {courseLetter(coursePointTotalState)}
              </span>
            </p>
          )}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCalculatorMode(!calculatorMode)}
              >
                <Calculator className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Calculator Mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-wrap justify-evenly items-start gap-4">
        {standards.map(({ standardID, pointTotal, homework, exams }, i) => (
          <div
            key={i}
            className="bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-800 p-4 rounded-xl flex flex-col items-center gap-3 min-w-[180px]"
          >
            <p className="font-semibold text-foreground">{standardID}</p>
            {(pointTotal || pointTotal === 0) && calculatorMode && (
              <p className="text-sm text-muted-foreground">
                T:{" "}
                {pointState.find((s) => s.standardID === standardID)
                  ?.currentPoints ?? 0}
                /{pointTotal}
              </p>
            )}
            {pointTotal && !calculatorMode && (
              <p className="text-sm text-muted-foreground">T: {pointTotal}</p>
            )}
            {pointTotal && calculatorMode && (
              <p className="text-sm font-semibold">
                Letter:{" "}
                <span
                  className={
                    standardLetter(
                      pointState.find((s) => s.standardID === standardID)
                        ?.currentPoints ?? 0,
                      pointTotal
                    ).startsWith("A")
                      ? "text-green-600 dark:text-green-400"
                      : standardLetter(
                          pointState.find((s) => s.standardID === standardID)
                            ?.currentPoints ?? 0,
                          pointTotal
                        ).startsWith("B")
                      ? "text-blue-600 dark:text-blue-400"
                      : standardLetter(
                          pointState.find((s) => s.standardID === standardID)
                            ?.currentPoints ?? 0,
                          pointTotal
                        ).startsWith("C")
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-red-600 dark:text-red-400"
                  }
                >
                  {standardLetter(
                    pointState.find((s) => s.standardID === standardID)
                      ?.currentPoints ?? 0,
                    pointTotal
                  )}
                </span>
              </p>
            )}

            {homework?.map(({ id, points }, j) => (
              <div
                key={j}
                className="bg-green-100 dark:bg-green-950 border border-green-300 dark:border-green-800 p-3 rounded-lg flex flex-col items-center gap-2 w-full"
              >
                <p className="text-sm font-medium">{id}</p>
                {calculatorMode ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs">P:</span>
                    <Input
                      onChange={(event) =>
                        handleInputChange(event, standardID, id)
                      }
                      type="number"
                      min="0"
                      max={points}
                      className="w-16 h-8 text-sm"
                    />
                    <span className="text-xs">/{points}</span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">P: {points}</p>
                )}
              </div>
            ))}

            {exams?.map(({ id, points }, j) => (
              <div
                key={j}
                className="bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800 p-3 rounded-lg flex flex-col items-center gap-2 w-full"
              >
                <p className="text-sm font-medium">{id}</p>
                {calculatorMode ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs">P:</span>
                    <Input
                      onChange={(event) =>
                        handleInputChange(event, standardID, id)
                      }
                      type="number"
                      min="0"
                      max={points}
                      className="w-16 h-8 text-sm"
                    />
                    <span className="text-xs">/{points}</span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">P: {points}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
