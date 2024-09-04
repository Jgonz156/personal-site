import { Sheet, Typography } from "@mui/joy"
import ImageBox from "./image-box"

export default function StandardsDiagram({
  standards,
  courseID,
  coursePointTotal,
}: Readonly<{
  courseID: string
  coursePointTotal: string | number
  standards: {
    standardID: string | number
    pointTotal?: string | number
    assignments?: { id: string | number; points: string | number }[]
    exams?: {
      id: string | number
      points: string | number
      standards: string | number
    }[]
  }[]
}>) {
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
        <Typography>{courseID}</Typography>
        <Typography>T: {coursePointTotal}</Typography>
        <Sheet
          variant="soft"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: 4,
          }}
        >
          {standards.map(
            ({ standardID, pointTotal, assignments, exams }, i) => (
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
                {pointTotal ? <Typography>T: {pointTotal}</Typography> : <></>}

                {assignments ? (
                  assignments.map(({ id, points }, j) => (
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
                  exams.map(({ id, points, standards }, j) => (
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
                      <Typography>S: {standards}</Typography>
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
      <ImageBox
        images={[
          {
            url: "/cmsi-2820/InitialGradingTable.jpg",
            caption:
              "Temporary Grading Table. The Grading system isn't temporary, just this awful image from a whiteboard in my office.",
          },
        ]}
      />
    </>
  )
}
