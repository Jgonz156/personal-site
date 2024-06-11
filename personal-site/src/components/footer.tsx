import {
  Chip,
  Divider,
  Sheet,
  Stack,
  Typography,
  useColorScheme,
} from "@mui/joy"

import PlaceIcon from "@mui/icons-material/Place"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import SmartphoneIcon from "@mui/icons-material/Smartphone"
import GitHubIcon from "@mui/icons-material/GitHub"
import SettingsMenu from "./settings-menu"

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
  const { mode } = useColorScheme()

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
      <Sheet
        sx={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 400 }}
      >
        <img
          src={`/lmu-identity/LMU-University-Logo-${
            mode === "light" ? "LM" : "DM"
          }.png`}
          alt="LMU Logo"
          width={"100%"}
        />
        {/*<Typography level="body-sm"> Some cool copyright information idk</Typography>*/}
        <SettingsMenu />
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
