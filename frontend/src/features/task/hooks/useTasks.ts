import { useAppSelector } from '../../../app/hooks'

export const useTasks = () => useAppSelector((state) => state.tasks)
