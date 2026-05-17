import { LogOut, Menu, Plus, UserCircle } from 'lucide-react'
import { useAppDispatch } from '@/app/hooks'
import Button from '../common/Button'
import { logout } from '../../features/auth/state/authSlice'
import { useAuth } from '../../features/auth/hooks/useAuth'
import NotificationDropdown from '../../features/notification/ui/NotificationDropdown'

interface TopNavbarProps {
  onCreateTask: () => void
  onMenuClick: () => void
}

const TopNavbar = ({ onCreateTask, onMenuClick }: TopNavbarProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <Button aria-label="Open sidebar" className="lg:hidden" icon={Menu} onClick={onMenuClick} size="sm" variant="ghost" />
        <div>
          <p className="text-sm font-medium text-gray-500">Welcome back</p>
          <h1 className="text-lg font-semibold text-gray-950">{user?.name || 'Team member'}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isAdmin ? (
          <Button className="hidden sm:inline-flex" icon={Plus} onClick={onCreateTask}>
            Add Task
          </Button>
        ) : null}
        <NotificationDropdown />
        <div className="hidden items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 md:flex">
          <UserCircle className="h-5 w-5 text-gray-500" />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs capitalize text-gray-500">{user?.role}</p>
          </div>
        </div>
        <Button icon={LogOut} onClick={() => dispatch(logout())} size="sm" variant="ghost">
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  )
}

export default TopNavbar
