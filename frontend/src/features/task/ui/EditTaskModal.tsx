import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/app/hooks'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import Modal from '../../../components/common/Modal'
import Select from '../../../components/common/Select'
import Textarea from '../../../components/common/Textarea'
import { useUsers } from '../../user/hooks/useUsers'
import { fetchUsers } from '../../user/state/userSlice'
import { useTasks } from '../hooks/useTasks'
import { updateTaskDetails } from '../state/taskSlice'
import { TASK_PRIORITIES, TASK_STATUSES } from '../../../utils/tasks'
import type { Task } from '../../../types/domain'
import type { TaskFormValues } from '../../../types/forms'

const toDateInputValue = (value?: string) => {
  if (!value) return ''
  return new Date(value).toISOString().slice(0, 10)
}

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdated?: () => void
  task: Partial<Task>
}

const EditTaskModal = ({ isOpen, onClose, onUpdated, task }: EditTaskModalProps) => {
  const dispatch = useAppDispatch()
  const { updating } = useTasks()
  const { error: usersError, items: users, loading: usersLoading } = useUsers()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TaskFormValues>()

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUsers())
      reset({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'pending',
        priority: task?.priority || 'medium',
        assignedTo: typeof task?.assignedTo === 'object' ? task.assignedTo._id : '',
        dueDate: toDateInputValue(task?.dueDate),
      })
    }
  }, [dispatch, isOpen, reset, task])

  const onSubmit = async (values: TaskFormValues) => {
    if (!task._id) return
    const result = await dispatch(updateTaskDetails({ id: task._id, updates: values }))

    if (updateTaskDetails.fulfilled.match(result)) {
      onUpdated?.()
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit task">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.title?.message}
          label="Title"
          registration={register('title', { required: 'Title is required' })}
        />
        <Textarea
          error={errors.description?.message}
          label="Description"
          registration={register('description', { required: 'Description is required' })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Status" registration={register('status')}>
            {TASK_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </Select>
          <Select label="Priority" registration={register('priority')}>
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority.value} value={priority.value}>{priority.label}</option>
            ))}
          </Select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            error={errors.dueDate?.message}
            label="Due date"
            registration={register('dueDate', { required: 'Due date is required' })}
            type="date"
          />
          <Select
            disabled={usersLoading}
          error={errors.assignedTo?.message || usersError || undefined}
            label="Assigned user"
            registration={register('assignedTo', { required: 'Assigned user is required' })}
          >
            <option value="">{usersLoading ? 'Loading users...' : 'Select user'}</option>
            {users.map((user) => (
              <option key={user._id || user.id} value={user._id || user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </Select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button onClick={onClose} variant="secondary">Cancel</Button>
          <Button isLoading={updating} type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  )
}

export default EditTaskModal
