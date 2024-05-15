'use client'

import { FC } from 'react'
import { AssetCategory, AssetType } from '@lib/models/asset.model'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

interface CategoryTabsProps {
  categories: Record<AssetCategory, string>
  locale: string
}

const categoryToAssetType = {
  [AssetCategory.featured]: null,
  [AssetCategory.kpi]: AssetType.KPI,
  [AssetCategory.layouts]: AssetType.Layout,
  [AssetCategory.storyboards]: AssetType.Storyboard,
}

/**
 * A list of tabs for navigating between asset categories
 */
export const CategoryTabs: FC<CategoryTabsProps> = ({ categories, locale }) => {
  const pathname = usePathname()
  const isFeaturePage = pathname === `/${locale}`
  return (
    <ul className="mt-6 flex w-full rounded-lg bg-fill-secondary p-1 [&:has(:focus-visible)]:ring-2">
      {Object.values(AssetCategory).map((category) => (
        <li className="relative w-full" key={category}>
          <div className="flex items-center">
            <Link
              className={clsx(
                'focused:ring-1 w-full cursor-pointer rounded-lg py-2 text-center font-semibold text-text-secondary transition hover:text-text-primary',
                {
                  '0hadow-sm bg-fill-tertiary text-text-primary':
                    (isFeaturePage && category === AssetCategory.featured) ||
                    (category !== AssetCategory.featured &&
                      pathname.includes(categoryToAssetType[category])),
                }
              )}
              href={`/${locale}/${categoryToAssetType[category] ?? ''}`}
            >
              {categories[category]}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CategoryTabs
