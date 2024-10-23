import { useColorScheme as useMaterialColorScheme } from "@mui/material/styles"
import { useColorScheme as useJoyColorScheme, Button } from "@mui/joy"
import React from "react"

export function ModeToggle() {
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme()
  const { setMode: setJoyMode } = useJoyColorScheme()
  const [mounted, setMounted] = React.useState(false)

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMaterialMode(mode === "light" ? "dark" : "light")
        setJoyMode(mode === "light" ? "dark" : "light")
      }}
    >
      {mode === "light" ? "Activate Dark Mode" : "Activate Light Mode"}
    </Button>
  )
}
