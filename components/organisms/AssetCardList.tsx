'use client'
import { AssetCard } from '@components/molecules/AssetCard'
import type { Asset } from '@lib/models/asset.model'
import { useStorePath } from '@lib/store'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getTranslation } from '@app//i18n/actions'

/**
 * A collection of AssetCard components, filtered by search query if present
 */
export const AssetCardList = ({ assets }: { assets: Asset[] }) => {
  const [notFoundMessage, setNotFoundMessage] = useState('No results found')
  const { locale } = useParams<{ locale: string }>()
  const searchQuery = useStorePath('library.searchQuery')
  const filteredAssets = searchQuery
    ? assets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          asset.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : assets

  useEffect(() => {
    getTranslation(locale, 'common', 'No results found')
      .then(setNotFoundMessage)
      .catch(console.error)
  }, [locale])
  return (
    <>
      {!!filteredAssets.length ? (
        <ul className="mt-9 grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
          {filteredAssets.map((asset) => (
            <li key={asset.id}>
              <AssetCard asset={asset} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 flex w-full items-center justify-center rounded-lg bg-fill-secondary p-10 italic text-text-secondary">
          {notFoundMessage}
        </p>
      )}
    </>
  )
}
