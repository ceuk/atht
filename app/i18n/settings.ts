import { InitOptions } from 'i18next'

export const fallbackLocale = 'en'
export const languages = [fallbackLocale]
export const cookieName = 'i18n'
export const defaultNs = 'common'

export function getOptions(
  locale = fallbackLocale,
  ns = defaultNs
): InitOptions {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng: fallbackLocale,
    lng: locale,
    fallbackNS: defaultNs,
    defaultNS: defaultNs,
    ns,
  }
}
