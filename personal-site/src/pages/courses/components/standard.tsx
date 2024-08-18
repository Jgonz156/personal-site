import { IconButton, Sheet } from "@mui/joy";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Standard({
  number,
  title,
  description,
  children,
}: Readonly<{
  number: number | string;
  title: string;
  description: string;
  children: React.ReactNode;
}>) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <tr>
        <td>
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td>{number}</td>
        <td>{title}</td>
        <td>{description}</td>
      </tr>
      <tr>
        {open ? (
          <td colSpan={4}>
            <Sheet
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                gap: 2,
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              {children}
            </Sheet>
          </td>
        ) : null}
      </tr>
    </>
  );
}
