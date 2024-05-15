import { getFeaturedAssets } from '@lib/services/asset.service'
import { I18nParams, useTranslation } from '../i18n'
import { AssetCardList } from '@components/organisms/AssetCardList'

/**
 * The "Featured" library tab
 */
const FeaturedTab = async ({ params: { locale } }: I18nParams) => {
  const { t } = await useTranslation(locale, 'library')
  const assets = await getFeaturedAssets()

  return (
    <>
      <h2 className="mt-10 text-3xl font-semibold">{t('featured')}</h2>
      <p className="text-text-secondary">{t('featuredSubheading')}</p>
      <AssetCardList assets={assets.featured} />
      <h2 className="mt-10 text-3xl font-semibold">{t('trending')}</h2>
      <p className="text-text-secondary">{t('trendingSubheading')}</p>
      <AssetCardList assets={assets.featured} />
    </>
  )
}

export default FeaturedTab
