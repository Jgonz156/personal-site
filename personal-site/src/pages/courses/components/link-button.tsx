import { Button, Sheet } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";

export default function LinkButton({
  to,
  children,
  color,
}: {
  to: string;
  children: any;
  color: "neutral" | "warning" | "success" | "danger" | "primary";
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
        <Button component={RouterLink} to={to} color={color}>
          {children}
        </Button>
      </Sheet>
    </>
  );
}
