import { lensPath, over, path } from 'ramda'

import { create } from 'zustand'
import type { Join, NestedPath, PathValue } from '../types/utility'
import { Asset } from './models/asset.model'

interface AppState {
  library: {
    searchQuery: string
    selectedAsset: Asset | null
    setSearchQuery: (query: string) => void
    setSelectedAsset: (asset: Asset | null) => void
  }
}

export const useStore = create<AppState>((set) => {
  // Initial state
  return {
    library: {
      searchQuery: '',
      selectedAsset: null,
      setSearchQuery: setWithPath(['library', 'searchQuery']),
      setSelectedAsset: setWithPath(['library', 'selectedAsset']),
    },
  }
  // Helper to set a nested value at a given path to the argument received
  function setWithPath<T>(path: string[]) {
    return (value: T) => set(over(lensPath(path), () => value))
  }
})

/**
 * Convenience hook to access a value at a given (string) path in the store in
 * a type-safe manner
 *
 * Example:
 * ```typescript
 *   const searchQuery = useStorePath('library.searchQuery')`
 * ```
 */
export const useStorePath = <Path extends Join<NestedPath<AppState>, '.'>>(
  storePath: Path
): PathValue<AppState, Path> => useStore(path(storePath.split('.')))!
