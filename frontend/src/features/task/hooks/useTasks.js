import { useSelector } from 'react-redux'

export const useTasks = () => useSelector((state) => state.tasks)
