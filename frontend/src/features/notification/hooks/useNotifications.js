import { useSelector } from 'react-redux'

export const useNotifications = () => {
  const state = useSelector((store) => store.notifications)
  return {
    ...state,
    unreadCount: state.items.filter((item) => !item.read).length,
  }
}
