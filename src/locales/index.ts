import * as ru from './ru'
import * as en from './en'

export const localeMessages = {
  ru: {
    ...ru.messages,
    languages: {
      ru: 'Русский',
      en: 'Английский'
    }
  },
  en: {
    ...en.messages,
    languages: {
      ru: 'Russian',
      en: 'English'
    }
  }
}


