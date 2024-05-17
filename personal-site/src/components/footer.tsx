import { Chip, Divider, Sheet, Stack, Typography } from "@mui/joy"

import PlaceIcon from "@mui/icons-material/Place"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import SmartphoneIcon from "@mui/icons-material/Smartphone"
import GitHubIcon from "@mui/icons-material/GitHub"

const personalInfo = [
  {
    value: "1 LMU Drive, Los Angeles, CA 90045",
    icon: <PlaceIcon />,
  },
  {
    value: "To be determined",
    icon: <MeetingRoomIcon />,
  },
  {
    value: "jgonz156@lion.lmu.edu",
    icon: <EmailIcon />,
  },
  {
    value: "To be determined",
    icon: <PhoneIcon />,
  },
  {
    value: "+1 (310) 606-9557",
    icon: <SmartphoneIcon />,
  },
  {
    value: "jgonz156",
    icon: <GitHubIcon />,
  },
]

export default function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <Sheet
      sx={{
        p: 4,
        gap: 4,
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <Sheet sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <img
          src="/lmu-identity/LMU-University-Logo.png"
          alt="LMU Logo"
          width={"400px"}
        />
        <Typography level="body-sm">
          Some cool copyright information idk
        </Typography>
      </Sheet>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" />}
        spacing={2}
        justifyContent="center"
      >
        {personalInfo.map(({ value, icon }) => (
          <Chip
            variant="outlined"
            color="neutral"
            size="lg"
            startDecorator={icon}
            //endDecorator={<CheckIcon fontSize="md" />}
            //onClick={() => alert("You clicked the Joy Chip!")}
          >
            <Typography level="body-sm" fontWeight="md">
              {value}
            </Typography>
          </Chip>
        ))}
      </Stack>
      {children ? <Sheet>{children}</Sheet> : <></>}
    </Sheet>
  )
}
