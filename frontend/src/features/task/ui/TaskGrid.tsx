import EmptyState from '../../../components/common/EmptyState'
import type { LucideIcon } from 'lucide-react'
import type { Task, TaskStatus } from '../../../types/domain'
import Loader from '../../../components/common/Loader'
import TaskCard from './TaskCard'

interface TaskGridProps {
  canManage?: boolean
  canSubmit?: boolean
  canUpdateStatus?: boolean
  emptyAction?: {
    icon?: LucideIcon
    label: string
    onClick: () => void
  }
  loading: boolean
  onDelete?: (task: Task) => void
  onEdit?: (task: Task) => void
  onStatusChange?: (id: string, status: TaskStatus) => void
  onSubmitWork?: (task: Task) => void
  tasks: Task[]
  updating?: boolean
}

const TaskGrid = ({
  canManage,
  canSubmit,
  canUpdateStatus,
  emptyAction,
  loading,
  onDelete,
  onEdit,
  onStatusChange,
  onSubmitWork,
  tasks,
  updating,
}: TaskGridProps) => {
  if (loading) return <Loader label="Loading tasks" />

  if (!tasks.length) {
    return (
      <EmptyState
        action={emptyAction}
        description="Tasks will appear here as soon as they are assigned or created."
        title="No tasks found"
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          canManage={canManage}
          canUpdateStatus={canUpdateStatus}
          canSubmit={canSubmit}
          key={task._id}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          onSubmitWork={onSubmitWork}
          task={task}
          updating={updating}
        />
      ))}
    </div>
  )
}

export default TaskGrid
