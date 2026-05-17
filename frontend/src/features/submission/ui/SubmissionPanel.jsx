import { ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../../components/common/Button'
import Card from '../../../components/common/Card'
import EmptyState from '../../../components/common/EmptyState'
import Loader from '../../../components/common/Loader'
import Textarea from '../../../components/common/Textarea'
import { formatDate } from '../../../utils/date'
import { useSubmissions } from '../hooks/useSubmissions'
import { fetchSubmissions, reviewSubmission } from '../state/submissionSlice'

const fileHref = (fileUrl) => {
  if (!fileUrl) return ''
  if (fileUrl.startsWith('http')) return fileUrl
  return `${import.meta.env.VITE_SERVER_URL || 'http://localhost:5000'}${fileUrl}`
}

const SubmissionPanel = () => {
  const dispatch = useDispatch()
  const { items, loading, reviewing } = useSubmissions()
  const [feedbackById, setFeedbackById] = useState({})

  useEffect(() => {
    dispatch(fetchSubmissions())
  }, [dispatch])

  const handleReview = (id, status) => {
    dispatch(reviewSubmission({ id, status, feedback: feedbackById[id] || '' }))
  }

  if (loading) return <Loader label="Loading submissions" />

  if (!items.length) {
    return <EmptyState title="No submissions yet" description="Submitted user work will appear here for review." />
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {items.map((submission) => (
        <Card className="p-5" key={submission._id}>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-gray-950">{submission.taskId?.title}</p>
              <p className="mt-1 text-sm text-gray-500">{submission.submittedBy?.name} · {submission.submittedBy?.email}</p>
            </div>
            <span className="w-fit rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold capitalize text-gray-700">
              {submission.status}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-gray-600">{submission.description}</p>
          {submission.comments ? <p className="mt-3 text-sm text-gray-500">Comments: {submission.comments}</p> : null}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span>Submitted {formatDate(submission.submittedAt)}</span>
            {submission.fileUrl ? (
              <a className="inline-flex items-center gap-1 font-medium text-brand-700 hover:underline" href={fileHref(submission.fileUrl)} rel="noreferrer" target="_blank">
                View file <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
          <div className="mt-4">
            <Textarea
              label="Feedback"
              onChange={(event) => setFeedbackById((current) => ({ ...current, [submission._id]: event.target.value }))}
              placeholder="Add feedback before approving or rejecting."
              value={feedbackById[submission._id] || submission.feedback || ''}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button isLoading={reviewing} onClick={() => handleReview(submission._id, 'rejected')} variant="danger">Reject</Button>
            <Button isLoading={reviewing} onClick={() => handleReview(submission._id, 'approved')}>Approve</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default SubmissionPanel
