"use client"
import React, { use } from "react"

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
        StatusBadge: CourseStatusBadge.UnderConstruction,
      },
      CMSIX998: {
        ModalVisible: false,
        StatusBadge: CourseStatusBadge.UnderConstruction,
      },
    },
  },
  About: {},
  CurriculumVitae: {},
  CMSI2820: {},
}

type SettingsState = typeof initialSettingsState
type SettingsUpdateAction = { field: keyof SettingsState; value: any }

const reducer = (state: SettingsState, action: SettingsUpdateAction) => {
  return { ...state, [action.field]: action.value }
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

  return (
    <SiteContext.Provider value={{ settings, dispatch }}>
      {children}
    </SiteContext.Provider>
  )
}
