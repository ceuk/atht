'use server'
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { getOptions } from './settings'

export type I18nParams = {
  params: {
    locale: string
  }
}

export const initI18next = async (locale: string, ns: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (locale: string, namespace: string) =>
          import(`./locales/${locale}/${namespace}.json`)
      )
    )
    .init(getOptions(locale, ns))
  return i18nInstance
}

export async function useTranslation(
  locale: string,
  ns: string,
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(locale, ns)
  return {
    t: i18nextInstance.getFixedT(
      locale,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),

    i18n: i18nextInstance,
  }
}
