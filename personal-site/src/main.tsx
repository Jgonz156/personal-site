import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import App from "./pages/App.tsx"
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles"
import {
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
} from "@mui/joy"
import { SiteContext, SiteContextProvider } from "./components/site-context.tsx"
import "./index.css"
import { MathJaxContext } from "better-react-mathjax"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"

import CMSI2820Routes from "./pages/courses/cmsi2820/routes.tsx"
import CMSIX998 from "./pages/courses/cmsiX998/cmsi-X998-independent-study.tsx"
import CMSI3510Routes from "./pages/courses/cmsi3510/routes.tsx"

const router = [
  { path: "/", element: <App /> },
  ...CMSI2820Routes,
  { path: "/cmsi-X998", element: <CMSIX998 /> },
  ...CMSI3510Routes,
]

const materialTheme = materialExtendTheme()

const joyTheme = joyExtendTheme({
  colorSchemes: {
    light: { palette: { warning: { 500: "#c46d0a" } } },
    dark: { palette: { warning: { 500: "#c46d0a" } } },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SiteContextProvider>
      <MathJaxContext>
        <MaterialCssVarsProvider
          theme={{ [MATERIAL_THEME_ID]: materialTheme }}
          defaultMode="dark"
        >
          <JoyCssVarsProvider theme={joyTheme} defaultMode="dark">
            <LocalizationProvider
              dateAdapter={AdapterLuxon}
              adapterLocale="en"
              localeText={{
                calendarWeekNumberHeaderText: "School Week",
                calendarWeekNumberText: (weekNumber) => {
                  const { settings } = React.useContext(SiteContext)
                  const weekOffset = settings.FallSemester
                    ? (weekNumber + 34) % 34
                    : (weekNumber + 32) % 34
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
              <Router>
                <Routes>
                  {router.map(({ path, element }, i) => (
                    <Route key={i} path={path} element={element} />
                  ))}
                </Routes>
              </Router>
            </LocalizationProvider>
          </JoyCssVarsProvider>
        </MaterialCssVarsProvider>
      </MathJaxContext>
    </SiteContextProvider>
  </React.StrictMode>
)
