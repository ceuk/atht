import { AssetCardList } from '@components/organisms/AssetCardList'
import { AssetType } from '@lib/models/asset.model'
import { getAssetsByType } from '@lib/services/asset.service'
import { notFound } from 'next/navigation'

interface FeaturedTabProps {
  params: {
    assetType: AssetType
  }
}

/**
 * Page component to display a list of assets of a specific type
 */
const FeaturedTab = async ({ params: { assetType } }: FeaturedTabProps) => {
  if (!Object.values(AssetType).includes(assetType)) {
    return notFound()
  }

  const assets = await getAssetsByType(assetType)

  return <AssetCardList assets={assets} />
}

export default FeaturedTab
