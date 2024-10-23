import {
  Button,
  Chip,
  Divider,
  Link,
  Sheet,
  Stack,
  Tooltip,
  Typography,
  useColorScheme,
} from "@mui/joy"

import RouterLink from "next/link"

import PlaceIcon from "@mui/icons-material/Place"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
//import SmartphoneIcon from "@mui/icons-material/Smartphone"
import GitHubIcon from "@mui/icons-material/GitHub"
import HomeIcon from "@mui/icons-material/Home"
import SettingsMenu from "./settings-menu"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

const personalInfo = [
  {
    value: "1 LMU Drive, Los Angeles, CA 90045",
    icon: <PlaceIcon />,
    link: "https://www.bing.com/maps?q=lmu&FORM=HDRSC7&cp=33.968972%7E-118.418584&lvl=16.0",
  },
  {
    value: "Foley Annex 139",
    icon: <MeetingRoomIcon />,
  },
  {
    value:
      "Office Hours: M 5PM-7PM (Keck Lab), W 2PM-5PM, F 5PM-7PM (Keck Lab)",
    icon: <AccessTimeIcon />,
  },
  {
    value: "Julian.Gonzalez@lmu.edu",
    icon: <EmailIcon />,
  },
  {
    value: "(310)-338-7353",
    icon: <PhoneIcon />,
  },
  //{
  //  value: "+1 (310) 606-9557",
  //  icon: <SmartphoneIcon />,
  //},
  {
    value: "jgonz156",
    icon: <GitHubIcon />,
    link: "https://github.com/Jgonz156",
  },
]

export default function Footer({
  children,
}: Readonly<{ children?: React.ReactNode }>) {
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
        <Link href={"https://www.lmu.edu/"}>
          <img
            src={`/lmu-identity/LMU-University-Logo-${
              mode === "light" ? "LM" : "DM"
            }.png`}
            alt="LMU Logo"
            width={"100%"}
          />
        </Link>
        <Typography level="body-sm"></Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" />}
          spacing={2}
          justifyContent="space-evenly"
        >
          <SettingsMenu />

          <Button
            component={RouterLink}
            variant="plain"
            color="neutral"
            href={"/"}
          >
            <Tooltip title="Homepage">
              <HomeIcon />
            </Tooltip>
          </Button>
        </Stack>
      </Sheet>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" />}
        spacing={2}
        justifyContent="center"
      >
        {personalInfo.map(({ value, icon, link }, i) =>
          link ? (
            <Link key={i} href={link}>
              <Chip
                //key={i}
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
            </Link>
          ) : (
            <Chip
              key={i}
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
          )
        )}
      </Stack>
      {children ? <Sheet>{children}</Sheet> : <></>}
    </Sheet>
  )
}
