import React, { useEffect } from "react"

export enum LightMode {
  Dark,
  Light,
}

export enum HomeNavBarState {
  Home,
  AboutMe,
  CV,
}

export enum CourseStatusBadge {
  InProgress = "In-Progress",
  UnderConstruction = "Under Construction",
  Waiting = "Waiting",
}

const initialSettingsState = {
  LightMode: LightMode.Dark,
  Home: {
    NavBarState: HomeNavBarState.Home,
    Courses: {
      CMSI2820: {
        ModalVisible: false,
        StatusBadge: CourseStatusBadge.InProgress,
      },
      CMSI3510: {
        ModalVisible: false,
        StatusBadge: CourseStatusBadge.InProgress,
      },
      CMSIX998: {
        ModalVisible: false,
        StatusBadge: CourseStatusBadge.UnderConstruction,
      },
    },
  },
  About: {},
  CurriculumVitae: {},
  FallSemester: false,
}

type SettingsState = typeof initialSettingsState
type SettingsUpdateAction = { field: keyof SettingsState; value: any }

const reducer = (state: SettingsState, action: SettingsUpdateAction) => {
  const newState = { ...state, [action.field]: action.value }
  if (action.field === "LightMode") {
    localStorage.setItem("LightMode", JSON.stringify(newState.LightMode))
  }
  return newState
}

type SettingsContextType = {
  settings: SettingsState
  dispatch: React.Dispatch<SettingsUpdateAction>
}

const initialContext: SettingsContextType = {
  settings: initialSettingsState,
  dispatch: () => {},
}

export const SiteContext = React.createContext(initialContext)

export function SiteContextProvider({ children }: Readonly<{ children: any }>) {
  const [settings, dispatch] = React.useReducer(reducer, initialSettingsState)
  useEffect(() => {
    const savedLightMode = localStorage.getItem("LightMode")
    if (savedLightMode) {
      dispatch({ field: "LightMode", value: JSON.parse(savedLightMode) })
    }
  }, [])
  return (
    <SiteContext.Provider value={{ settings, dispatch }}>
      {children}
    </SiteContext.Provider>
  )
}
