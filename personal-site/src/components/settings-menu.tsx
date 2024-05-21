import Menu from "@mui/joy/Menu"
import MenuItem from "@mui/joy/MenuItem"
import MenuButton from "@mui/joy/MenuButton"
import Apps from "@mui/icons-material/Apps"
import Dropdown from "@mui/joy/Dropdown"
import SettingsIcon from "@mui/icons-material/Settings"
import { ModeToggle } from "./site-mode"

export default function SettingsMenu() {
  return (
    <Dropdown>
      <MenuButton
        endDecorator={<SettingsIcon />}
        size="lg"
        slots={{ root: SettingsIcon }}
        slotProps={{ root: { variant: "solid", color: "neutral", size: "lg" } }}
        sx={{ borderRadius: 40 }}
      >
        <Apps />
      </MenuButton>
      <Menu
        variant="solid"
        invertedColors
        aria-labelledby="apps-menu-demo"
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <MenuItem orientation="vertical">
          <ModeToggle />
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
