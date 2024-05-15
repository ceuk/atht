'use client'
import { ChartPieIcon } from '@heroicons/react/24/outline'
import type { Asset } from '@lib/models/asset.model'
import { useStorePath } from '@lib/store'
import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

type AssetCardProps =
  | {
    asset: Asset
    loading?: boolean
  }
  // overload props to allow the creation of a loading skeleton without the
  // need to pass an asset
  | {
    asset?: Asset
    loading: true
  }

/**
 * A card-style list item component to display a single asset
 */
export const AssetCard: FC<AssetCardProps> = ({ asset, loading }) => {
  const setSelectedAsset = useStorePath('library.setSelectedAsset')
  return (
    <button
      onClick={() => asset && setSelectedAsset(asset)}
      className="flex w-full cursor-pointer items-center rounded-lg border-2 border-fill-secondary bg-fill-primary bg-fill-tertiary p-4 text-left shadow-sm transition hover:-translate-y-1 focus:outline-none focus:ring-2"
    >
      <div className="mr-4 flex h-20 w-20 flex-none items-center justify-center rounded-lg bg-fill-secondary">
        <ChartPieIcon className="h-14 w-14 text-text-secondary" />
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-semibold">
          {loading ? <Skeleton /> : asset.name}
        </h3>
        <p className="text-sm font-light leading-tight">
          {loading ? <Skeleton count={2} /> : asset.description}
        </p>
        {!!asset?.modified && !loading && (
          <p className="mt-1 text-sm font-medium text-text-secondary">
            {new Date(asset.modified).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    </button>
  )
}
