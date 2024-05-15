import { AssetCard } from '@components/molecules/AssetCard'
import { range } from 'ramda'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  return (
    <ul className="mt-9 grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
      {range(0, 8).map((i) => (
        <li key={i}>
          <AssetCard loading />
        </li>
      ))}
    </ul>
  )
}
