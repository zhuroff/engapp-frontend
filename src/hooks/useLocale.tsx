import { ReactNode, createContext, useContext } from 'react'
import localeInstance from '../locales'

export type LocaleProviderProps = {
  value?: typeof localeInstance
  children: ReactNode
}

const LocaleContext = createContext(localeInstance)

export const useLocale = () => useContext(LocaleContext)

export const LocaleProvider = ({ value = localeInstance, children }: LocaleProviderProps) => {
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}
