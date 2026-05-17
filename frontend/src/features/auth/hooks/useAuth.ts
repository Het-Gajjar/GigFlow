import { useAppSelector } from '../../../app/hooks'

export const useAuth = () => useAppSelector((state) => state.auth)
