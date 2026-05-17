import { ClipboardList } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Button from './Button'

interface EmptyStateAction {
  icon?: LucideIcon
  label: string
  onClick: () => void
}

interface EmptyStateProps {
  action?: EmptyStateAction
  description?: string
  icon?: LucideIcon
  title: string
}

const EmptyState = ({ action, description, icon: Icon = ClipboardList, title }: EmptyStateProps) => {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-gray-950">{title}</h3>
      {description ? <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p> : null}
      {action ? (
        <Button className="mt-5" icon={action.icon} onClick={action.onClick}>
          {action.label}
        </Button>
      ) : null}
    </div>
  )
}

export default EmptyState
