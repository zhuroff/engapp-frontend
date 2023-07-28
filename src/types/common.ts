import { ReactNode } from "react"

export interface RouteItem {
  path: string
  element: ReactNode
  title?: string
}
