import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import App from "./pages/App.tsx"
import { CssVarsProvider } from "@mui/joy"
import CMSI2820 from "./pages/courses/cmsi-2820-discrete-mathematics-for-cs.tsx"
import { SiteContextProvider } from "./components/site-context.tsx"
import "./index.css"

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/cmsi-2820", element: <CMSI2820 /> },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SiteContextProvider>
      <CssVarsProvider defaultMode="dark">
        <RouterProvider router={router} />
      </CssVarsProvider>
    </SiteContextProvider>
  </React.StrictMode>
)
