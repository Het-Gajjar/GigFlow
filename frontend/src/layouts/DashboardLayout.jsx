import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Sidebar from '../components/layout/Sidebar'
import TopNavbar from '../components/layout/TopNavbar'
import { useAuth } from '../features/auth/hooks/useAuth'
import { notificationReceived } from '../features/notification/state/notificationSlice'
import CreateTaskModal from '../features/task/ui/CreateTaskModal'
import { connectSocket, disconnectSocket } from '../services/socket/socketClient'

const DashboardLayout = () => {
  const dispatch = useDispatch()
  const { token, user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)

  useEffect(() => {
    if (user?._id || user?.id) {
      connectSocket({
        userId: user._id || user.id,
        token,
        onNotification: (notification) => dispatch(notificationReceived(notification)),
      })
    }

    return () => disconnectSocket()
  }, [dispatch, token, user])

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
