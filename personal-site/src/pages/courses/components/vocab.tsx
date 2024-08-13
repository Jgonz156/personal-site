import { Tooltip, Typography } from "@mui/joy"

export default function Vocab({
  definition,
  children,
}: {
  definition: any
  children: any
}) {
  return (
    <>
      <Tooltip describeChild title={definition} variant="soft" color="success">
        <Typography variant="soft" color="success" sx={{ borderRadius: 6 }}>
          {children}
        </Typography>
      </Tooltip>
    </>
  )
}
