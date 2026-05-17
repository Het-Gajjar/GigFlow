import { useAppSelector } from '../../../app/hooks'

export const useSubmissions = () => useAppSelector((state) => state.submissions)
