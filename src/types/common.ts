import { ReactNode } from 'react'

export type LocaleCodes = 'ru' | 'en'

export interface RouteItem {
  path: string
  element: ReactNode
  title?: string
}
