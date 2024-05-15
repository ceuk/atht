'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useStorePath } from '@lib/store'
import { ChangeEvent, FC } from 'react'

interface LibrarySearchProps {
  label: string
  placeholder: string
}

/**
 * A text input component for filtering the asset library.
 */
export const LibrarySearch: FC<LibrarySearchProps> = ({
  label,
  placeholder,
}) => {
  const setSearchQuery = useStorePath('library.setSearchQuery')
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  return (
    <div className="relative mt-9">
      <label htmlFor="search" className="sr-only">
        {label}
      </label>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        autoComplete="off"
        onChange={handleChange}
        className="block w-full rounded-lg border-0 px-4 py-3 pl-12 text-lg placeholder-gray-400 ring-1 ring-inset ring-gray-200"
        placeholder={placeholder}
      />
    </div>
  )
}

export default LibrarySearch
