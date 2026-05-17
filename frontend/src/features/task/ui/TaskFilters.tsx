import { TASK_STATUSES } from '../../../utils/tasks'
import type { TaskState } from '../../../types/store'

const options: Array<{ label: string; value: TaskState['activeStatus'] }> = [
  { label: 'All', value: 'all' },
  ...TASK_STATUSES,
]

interface TaskFiltersProps {
  activeStatus: TaskState['activeStatus']
  onChange: (status: TaskState['activeStatus']) => void
}

const TaskFilters = ({ activeStatus, onChange }: TaskFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          className={`h-9 rounded-md px-3 text-sm font-medium transition ${activeStatus === option.value ? 'bg-gray-950 text-white' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'}`}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilters
