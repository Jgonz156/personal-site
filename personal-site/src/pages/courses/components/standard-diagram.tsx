import { Sheet, Typography } from "@mui/joy"

export default function StandardsDiagram({
  standards,
}: {
  standards: {
    standardID: string | number
    assignments?: string[]
    exams?: string[]
  }[]
}) {
  return (
    <>
      <Sheet
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
        {standards.map(({ standardID, assignments, exams }, i) => (
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
            {assignments ? (
              assignments.map((name, j) => (
                <Sheet
                  key={j}
                  color="success"
                  variant="soft"
                  sx={{
                    p: 2,
                    borderRadius: 12,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {name}
                </Sheet>
              ))
            ) : (
              <></>
            )}
            {exams ? (
              exams.map((name, j) => (
                <Sheet
                  key={j}
                  color="danger"
                  variant="soft"
                  sx={{
                    p: 2,
                    borderRadius: 12,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {name}
                </Sheet>
              ))
            ) : (
              <></>
            )}
          </Sheet>
        ))}
      </Sheet>
    </>
  )
}
