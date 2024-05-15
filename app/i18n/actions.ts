'use server'

import { initI18next } from '.'

export async function getTranslation(
  locale: string,
  ns: string,
  key: string,
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(locale, ns)
  return i18nextInstance.t(key, options)
}
