import { CheckCircle2, Clock3, ListChecks, Timer } from 'lucide-react'
import Card from '../../../components/common/Card'

const statsConfig = [
  { label: 'Pending Tasks', status: 'pending', icon: Clock3, color: 'text-amber-600 bg-amber-50' },
  { label: 'In Progress Tasks', status: 'in-progress', icon: Timer, color: 'text-blue-600 bg-blue-50' },
  { label: 'Completed Tasks', status: 'completed', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Total Tasks', status: 'all', icon: ListChecks, color: 'text-gray-700 bg-gray-100' },
]

const StatsCards = ({ tasks }) => {
  const countByStatus = (status) => {
    if (status === 'all') return tasks.length
    return tasks.filter((task) => task.status === status).length
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statsConfig.map((stat) => (
        <Card className="p-5" key={stat.label}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-gray-950">{countByStatus(stat.status)}</p>
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-md ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default StatsCards
