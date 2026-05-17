import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import TopNavbar from '../components/layout/TopNavbar'
import CreateTaskModal from '../features/task/ui/CreateTaskModal'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar onCreateTask={() => setTaskModalOpen(true)} onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 px-4 py-6 lg:px-8">
            <Outlet context={{ openCreateTask: () => setTaskModalOpen(true) }} />
          </main>
        </div>
      </div>
      <CreateTaskModal isOpen={taskModalOpen} onClose={() => setTaskModalOpen(false)} />
    </div>
  )
}

export default DashboardLayout
