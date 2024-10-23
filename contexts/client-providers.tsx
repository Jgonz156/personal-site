"use client"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { SiteContextProvider } from "@/contexts/site-context"
import { MathJaxContext } from "better-react-mathjax"
import {
  extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles"
import {
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
} from "@mui/joy"

const materialTheme = materialExtendTheme()

const joyTheme = joyExtendTheme({
  colorSchemes: {
    light: { palette: { warning: { 500: "#c46d0a" } } },
    dark: { palette: { warning: { 500: "#c46d0a" } } },
  },
})

export default function ClientProviders({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MaterialCssVarsProvider
      theme={{ [MATERIAL_THEME_ID]: materialTheme }}
      defaultMode="dark"
    >
      <JoyCssVarsProvider theme={joyTheme} defaultMode="dark">
        <MathJaxContext>
          <LocalizationProvider
            dateAdapter={AdapterLuxon}
            adapterLocale="en"
            localeText={{
              calendarWeekNumberHeaderText: "School Week",
              calendarWeekNumberText: (weekNumber) => {
                const weekOffset = (weekNumber + 34) % 34
                return weekOffset <= 0 || weekOffset > 16
                  ? ""
                  : weekOffset % 10 === 1 && weekOffset !== 11
                  ? `${weekOffset}st`
                  : weekOffset % 10 === 2 && weekOffset !== 12
                  ? `${weekOffset}nd`
                  : weekOffset % 10 === 3 && weekOffset !== 13
                  ? `${weekOffset}rd`
                  : `${weekOffset}th`
              },
            }}
          >
            <SiteContextProvider>{children}</SiteContextProvider>
          </LocalizationProvider>
        </MathJaxContext>
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  )
}
