import { useAppSelector } from '../../../app/hooks'

export const useUsers = () => useAppSelector((state) => state.users)
