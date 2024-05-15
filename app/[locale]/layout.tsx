import { PropsWithChildren, Suspense } from 'react'
import { dir } from 'i18next'
import { languages } from '../i18n/settings'
import { I18nParams, useTranslation } from '@i18n'
import { AssetCategory } from '@lib/models/asset.model'
import type { Metadata } from 'next'

import './globals.css'
import CategoryTabs from '@components/molecules/CategoryTabs'
import LibrarySearch from '@components/molecules/LibrarySearch'
import { zipObj } from 'ramda'
import AssetModal from '@components/organisms/AssetModal'

export const metadata: Metadata = {
  title: 'Project',
  description: 'Pharmeceutical R&D',
}

export async function generateStaticParams() {
  return languages.map((locale) => {
    locale
  })
}

export default async function RootLayout({
  children,
  params: { locale },
}: PropsWithChildren<I18nParams>) {
  const { t } = await useTranslation(locale, 'library')
  const categories = Object.values(AssetCategory)
  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <main className="container mx-auto max-w-2xl px-2">
          <h1 className="mb-9 text-center text-5xl font-extrabold">
            {t('heading')}
          </h1>
          <p className="text-center font-medium">{t('subheading')}</p>
          <Suspense fallback="">
            <LibrarySearch
              label={t('searchA11yLabel')}
              placeholder={t('searchPlaceholder')}
            />
          </Suspense>
          <Suspense fallback="">
            <CategoryTabs
              locale={locale}
              categories={zipObj(
                categories,
                categories.map((category) => t(`tabs.${category}`))
              )}
            />
          </Suspense>
          {children}
        </main>
        <AssetModal />
      </body>
      {/** TODO: Analytics */}
    </html>
  )
}
