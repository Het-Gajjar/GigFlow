import api from '../../../services/api'

export const createSubmissionRequest = async (payload) => {
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value) formData.append(key, value)
  })

  const { data } = await api.post('/submissions/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data.submission || data.data || data
}

export const fetchSubmissionsRequest = async () => {
  const { data } = await api.get('/submissions')
  return data.submissions || data.data || data
}

export const reviewSubmissionRequest = async ({ id, status, feedback }) => {
  const { data } = await api.patch(`/submissions/${id}/review`, { status, feedback })
  return data.submission || data.data || data
}
