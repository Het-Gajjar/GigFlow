import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import Modal from '../../../components/common/Modal'
import Textarea from '../../../components/common/Textarea'
import { useSubmissions } from '../hooks/useSubmissions'
import { createSubmission } from '../state/submissionSlice'

const SubmitWorkModal = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch()
  const { submitting } = useSubmissions()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({ defaultValues: { description: '', fileUrl: '', comments: '', file: null } })

  const onSubmit = async (values) => {
    const result = await dispatch(createSubmission({
      taskId: task._id,
      description: values.description,
      fileUrl: values.fileUrl,
      comments: values.comments,
      file: values.file?.[0],
    }))

    if (createSubmission.fulfilled.match(result)) {
      reset()
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit work">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-sm font-semibold text-gray-950">{task?.title}</p>
          <p className="mt-1 text-sm text-gray-500">{task?.description}</p>
        </div>
        <Textarea
          error={errors.description?.message}
          label="Work description"
          placeholder="Summarize what you completed."
          registration={register('description', { required: 'Work description is required' })}
        />
        <Input label="File URL" placeholder="https://..." registration={register('fileUrl')} type="url" />
        <Input
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
          label="Upload file"
          registration={register('file')}
          type="file"
        />
        <Textarea label="Comments" placeholder="Optional notes for the reviewer." registration={register('comments')} />
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} variant="secondary">Cancel</Button>
          <Button isLoading={submitting} type="submit">Submit Work</Button>
        </div>
      </form>
    </Modal>
  )
}

export default SubmitWorkModal
