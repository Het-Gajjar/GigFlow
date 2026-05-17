import { AlertTriangle } from 'lucide-react'
import Button from './Button'
import Modal from './Modal'

const ConfirmModal = ({
  confirmLabel = 'Confirm',
  description,
  isLoading = false,
  isOpen,
  onClose,
  onConfirm,
  title,
  variant = 'danger',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm leading-6 text-gray-600">{description}</p>
          <div className="mt-6 flex justify-end gap-3">
            <Button onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button isLoading={isLoading} onClick={onConfirm} variant={variant}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmModal
