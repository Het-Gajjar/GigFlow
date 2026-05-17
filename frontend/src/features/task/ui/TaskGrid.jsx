import EmptyState from '../../../components/common/EmptyState'
import Loader from '../../../components/common/Loader'
import TaskCard from './TaskCard'

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
}) => {
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
