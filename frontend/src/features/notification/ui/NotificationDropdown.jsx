import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../../components/common/Button'
import { formatDate } from '../../../utils/date'
import { useNotifications } from '../hooks/useNotifications'
import { fetchNotifications, markNotificationsRead } from '../state/notificationSlice'

const NotificationDropdown = () => {
  const dispatch = useDispatch()
  const { items, unreadCount } = useNotifications()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  return (
    <div className="relative">
      <button
        aria-label="Notifications"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-white text-gray-700 ring-1 ring-gray-200 transition hover:bg-gray-50"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <Bell className="h-4 w-4" />
        {unreadCount ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
            {unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-semibold text-gray-950">Notifications</p>
            <Button onClick={() => dispatch(markNotificationsRead('all'))} size="sm" variant="ghost">
              Mark read
            </Button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {items.length ? (
              items.map((item) => (
                <button
                  className={`block w-full border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50 ${item.read ? 'bg-white' : 'bg-brand-50'}`}
                  key={item._id}
                  onClick={() => dispatch(markNotificationsRead(item._id))}
                  type="button"
                >
                  <p className="text-sm font-semibold text-gray-950">{item.title}</p>
                  <p className="mt-1 text-sm text-gray-600">{item.message}</p>
                  <p className="mt-2 text-xs text-gray-400">{formatDate(item.createdAt)}</p>
                </button>
              ))
            ) : (
              <p className="px-4 py-8 text-center text-sm text-gray-500">No notifications yet.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default NotificationDropdown
