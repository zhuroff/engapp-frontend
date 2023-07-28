import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { localeMessages } from '../locales'
import { LocaleCodes } from '../types/common'
import { get } from 'lodash-es'

interface LocaleContext {
  localeMessages: typeof localeMessages
  currentLocale: LocaleCodes
  setCurrentLocale: Dispatch<SetStateAction<LocaleCodes>>
  localize: (path: string, ...rest: Array<string | number>) => string
}

const LocaleContext = createContext<LocaleContext>({
  localeMessages,
  currentLocale: 'en',
  setCurrentLocale: () => {},
  localize: (path: string, ...rest: Array<string | number>) => ''
})

export const useLocale = () => useContext(LocaleContext)

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocale, setCurrentLocale] = useState<LocaleCodes>('en')

  const localize = useCallback((path: string, ...rest: Array<string | number>) => {
    const message: string = String(get(localeMessages, `${currentLocale}.${path}`))
    return !rest.length ?
      message :
      message.split(' ').reduce((acc, next) => {
        acc.push(
          next.includes('{param}') ?
            next.replace('{param}', String(rest.shift())) :
            next
        )
        return acc
      }, [] as Array<string | number>).join(' ')
  }, [currentLocale])


  useEffect(() => {
    const cachedLocale = localStorage.getItem('locale')
    if (cachedLocale && Object.keys(localeMessages.en.languages).includes(cachedLocale)) {
      setCurrentLocale(cachedLocale as LocaleCodes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('locale', currentLocale)
  }, [currentLocale])

  return (
    <LocaleContext.Provider value={{
      localeMessages,
      currentLocale,
      setCurrentLocale,
      localize
    }}>
      {children}
    </LocaleContext.Provider>
  )
}
