'use client'
import { FC, HTMLAttributes, useEffect } from 'react'
import FocusTrap from 'focus-trap-react'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  accessibleName?: string
  children: React.ReactNode
}

/**
 * A modal dialog that can be toggled open/closed.
 * The user cannot interact with the parent window until the dialog is
 * closed (hence the "modal" part :P)
 */
export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  accessibleName = 'Dialog',
  ...otherProps
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  if (!open) {
    return null
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <FocusTrap>
      <div
        onClick={handleOverlayClick}
        aria-label={accessibleName}
        className="overflow-y auto fixed left-0 top-0 z-50 flex h-full w-full justify-center bg-black bg-opacity-30 px-10 py-12"
      >
        <div
          className="height-auto relative max-w-prose basis-48 self-start rounded-lg bg-fill-tertiary px-5 py-8 shadow-md"
          {...otherProps}
        >
          <button
            onClick={onClose}
            tabIndex={0}
            role="button"
            aria-label="Close this popup"
            title="Close this popup"
            className="absolute right-2 top-2"
          >
            <XMarkIcon className="h-10 w-10 text-text-secondary" />
          </button>
          {children}
        </div>
      </div>
    </FocusTrap>
  )
}

export default Modal
