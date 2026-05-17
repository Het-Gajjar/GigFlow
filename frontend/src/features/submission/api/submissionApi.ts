import api from '../../../services/api'
import type { ApiResponse, CreateSubmissionPayload, ReviewSubmissionPayload, Submission } from '../../../types/domain'

export const createSubmissionRequest = async (payload: CreateSubmissionPayload): Promise<Submission> => {
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (value) formData.append(key, value)
  })

  const { data } = await api.post<ApiResponse<Submission>>('/submissions/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return (data.submission || data.data) as Submission
}

export const fetchSubmissionsRequest = async (): Promise<Submission[]> => {
  const { data } = await api.get<ApiResponse<Submission[]>>('/submissions')
  return data.submissions || data.data || []
}

export const reviewSubmissionRequest = async ({ id, status, feedback }: ReviewSubmissionPayload): Promise<Submission> => {
  const { data } = await api.patch<ApiResponse<Submission>>(`/submissions/${id}/review`, { status, feedback })
  return (data.submission || data.data) as Submission
}
