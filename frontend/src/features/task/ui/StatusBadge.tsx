import { readableStatus, statusStyles } from '../../../utils/tasks'
import type { TaskStatus } from '../../../types/domain'

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[status] || 'bg-gray-100 text-gray-700 ring-1 ring-gray-200'}`}>
      {readableStatus(status)}
    </span>
  )
}

export default StatusBadge
