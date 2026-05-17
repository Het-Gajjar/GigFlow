import { X } from 'lucide-react'
import Button from './Button'

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-950/40 p-0 sm:items-center sm:p-4">
      <div className="max-h-[92svh] w-full overflow-hidden rounded-t-lg bg-white shadow-2xl sm:max-w-2xl sm:rounded-lg">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-950">{title}</h2>
          <Button aria-label="Close modal" icon={X} onClick={onClose} size="sm" variant="ghost" />
        </div>
        <div className="max-h-[calc(92svh-68px)] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  )
}

export default Modal
