import { useAppSelector } from '../../../app/hooks'

export const useNotifications = () => {
  const state = useAppSelector((store) => store.notifications)
  return {
    ...state,
    unreadCount: state.items.filter((item) => !item.read).length,
  }
}
