import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import TaskFilters from '../features/task/ui/TaskFilters'
import TaskGrid from '../features/task/ui/TaskGrid'
import { fetchTasks, setActiveStatus, updateTask } from '../features/task/state/taskSlice'
import { useTasks } from '../features/task/hooks/useTasks'

const UserDashboardPage = () => {
  const dispatch = useDispatch()
  const { activeStatus, items, loading, updating } = useTasks()

  useEffect(() => {
    dispatch(fetchTasks({ role: 'user' }))
  }, [dispatch])

  const filteredTasks = useMemo(() => {
    if (activeStatus === 'all') return items
    return items.filter((task) => task.status === activeStatus)
  }, [activeStatus, items])

  const handleStatusChange = (id, status) => {
    dispatch(updateTask({ id, updates: { status } }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-medium text-brand-700">User Dashboard</p>
          <h2 className="mt-1 text-2xl font-semibold text-gray-950">My assigned tasks</h2>
          <p className="mt-2 text-sm text-gray-500">Review your queue, open task details, and move work through each status.</p>
        </div>
        <TaskFilters activeStatus={activeStatus} onChange={(status) => dispatch(setActiveStatus(status))} />
      </div>

      <TaskGrid
        canUpdateStatus
        loading={loading}
        onStatusChange={handleStatusChange}
        tasks={filteredTasks}
        updating={updating}
      />
    </div>
  )
}

export default UserDashboardPage
