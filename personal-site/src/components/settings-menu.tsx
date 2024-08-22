import Menu from "@mui/joy/Menu"
import MenuItem from "@mui/joy/MenuItem"
import MenuButton from "@mui/joy/MenuButton"
import Dropdown from "@mui/joy/Dropdown"
import SettingsIcon from "@mui/icons-material/Settings"
import { ModeToggle } from "./site-mode"
import { Tooltip } from "@mui/joy"

export default function SettingsMenu() {
  return (
    <Dropdown>
      <MenuButton variant="plain" color="neutral">
        <Tooltip title="Site Settings">
          <SettingsIcon />
        </Tooltip>
      </MenuButton>
      <Menu
        variant="solid"
        invertedColors
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
