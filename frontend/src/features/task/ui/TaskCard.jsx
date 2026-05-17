import { CalendarDays, UserCircle } from 'lucide-react'
import Card from '../../../components/common/Card'
import Select from '../../../components/common/Select'
import { formatDate } from '../../../utils/date'
import { getAssignedUserName, TASK_STATUSES } from '../../../utils/tasks'
import StatusBadge from './StatusBadge'

const TaskCard = ({ canUpdateStatus = false, onStatusChange, task, updating = false }) => {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-950">{task.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">{task.description}</p>
        </div>
        <StatusBadge status={task.status} />
      </div>

      <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <UserCircle className="h-4 w-4 text-gray-400" />
          <span>{getAssignedUserName(task.assignedTo)}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-gray-400" />
          <span>Created {formatDate(task.createdAt)}</span>
        </div>
      </div>

      {canUpdateStatus ? (
        <div className="mt-4">
          <Select
            disabled={updating}
            label="Update status"
            onChange={(event) => onStatusChange(task._id, event.target.value)}
            value={task.status}
          >
            {TASK_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </Select>
        </div>
      ) : null}
    </Card>
  )
}

export default TaskCard
