import EmptyState from '../../../components/common/EmptyState'
import Loader from '../../../components/common/Loader'
import TaskCard from './TaskCard'

const TaskGrid = ({ canSubmit, canUpdateStatus, emptyAction, loading, onStatusChange, onSubmitWork, tasks, updating }) => {
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
          canUpdateStatus={canUpdateStatus}
          canSubmit={canSubmit}
          key={task._id}
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
