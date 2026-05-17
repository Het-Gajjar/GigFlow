import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import ConfirmModal from '../components/common/ConfirmModal'
import TaskGrid from '../features/task/ui/TaskGrid'
import StatsCards from '../features/task/ui/StatsCards'
import { deleteTask, fetchTasks } from '../features/task/state/taskSlice'
import { useTasks } from '../features/task/hooks/useTasks'
import SubmissionPanel from '../features/submission/ui/SubmissionPanel'
import EditTaskModal from '../features/task/ui/EditTaskModal'

const AdminDashboardPage = () => {
  const dispatch = useDispatch()
  const { openCreateTask } = useOutletContext()
  const { deleting, items, loading } = useTasks()
  const [activePanel, setActivePanel] = useState('tasks')
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)

  useEffect(() => {
    dispatch(fetchTasks({ role: 'admin' }))
  }, [dispatch])

  const handleDelete = async () => {
    const result = await dispatch(deleteTask(deletingTask._id))

    if (deleteTask.fulfilled.match(result)) {
      setDeletingTask(null)
      dispatch(fetchTasks({ role: 'admin' }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-brand-700">Admin Dashboard</p>
          <h2 className="mt-1 text-2xl font-semibold text-gray-950">Team task overview</h2>
          <p className="mt-2 text-sm text-gray-500">Track assigned CRM work, ownership, and progress across the team.</p>
        </div>
      </div>

      <StatsCards tasks={items} />

      <div className="flex gap-2">
        {[
          { label: 'Tasks', value: 'tasks' },
          { label: 'Submissions', value: 'submissions' },
        ].map((item) => (
          <button
            className={`h-9 rounded-md px-3 text-sm font-medium transition ${activePanel === item.value ? 'bg-gray-950 text-white' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'}`}
            key={item.value}
            onClick={() => setActivePanel(item.value)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      {activePanel === 'tasks' ? <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-950">Recent tasks</h3>
        </div>
        <TaskGrid
          canManage
          emptyAction={{ label: 'Add Task', icon: Plus, onClick: openCreateTask }}
          loading={loading}
          onDelete={setDeletingTask}
          onEdit={setEditingTask}
          tasks={items}
        />
      </section> : <SubmissionPanel />}
      <EditTaskModal
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        onUpdated={() => dispatch(fetchTasks({ role: 'admin' }))}
        task={editingTask || {}}
      />
      <ConfirmModal
        confirmLabel="Delete Task"
        description={`Delete "${deletingTask?.title || 'this task'}"? This action cannot be undone.`}
        isLoading={deleting}
        isOpen={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDelete}
        title="Delete task"
      />
    </div>
  )
}

export default AdminDashboardPage
