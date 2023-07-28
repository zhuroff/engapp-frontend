import { makeAutoObservable, runInAction } from 'mobx'
import { get } from 'lodash-es'
import * as ru from './ru'
import * as en from './en'

export type LocaleCodes = 'ru' | 'en'

class Locale {
  messages = { ru, en }
  currentLocale: LocaleCodes = 'ru'

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  text<T>(path: string): T {
    return get(this.messages[this.currentLocale]?.messages, path) || path
  }

  setLocale(locale: LocaleCodes) {
    runInAction(() => {
      localStorage.setItem('locale', locale)
      this.currentLocale = locale
    })
  }
}

export default new Locale()