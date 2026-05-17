import { useSelector } from 'react-redux'

export const useSubmissions = () => useSelector((state) => state.submissions)
