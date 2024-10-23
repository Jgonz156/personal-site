import { Button, Sheet } from "@mui/joy"
import RouterLink from "next/link"

export default function LinkButton({
  to,
  children,
  color,
}: {
  to: string
  children: any
  color: "neutral" | "warning" | "success" | "danger" | "primary"
}) {
  return (
    <>
      <Sheet
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button component={RouterLink} href={to} color={color}>
          {children}
        </Button>
      </Sheet>
    </>
  )
}
