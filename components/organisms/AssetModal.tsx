'use client'

import Modal from '@components/molecules/Modal'
import { useStorePath } from '@lib/store'

export const AssetModal = () => {
  const selectedAsset = useStorePath('library.selectedAsset')
  const setSelectedAsset = useStorePath('library.setSelectedAsset')
  const isOpen = !!selectedAsset

  return (
    <Modal open={isOpen} onClose={() => setSelectedAsset(null)}>
      <h1 className="mb-9 text-center text-5xl font-extrabold">
        {selectedAsset?.name}
      </h1>
    </Modal>
  )
}

export default AssetModal
