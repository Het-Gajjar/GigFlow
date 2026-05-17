import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/app/hooks'
import Button from '../../../components/common/Button'
import Modal from '../../../components/common/Modal'
import Select from '../../../components/common/Select'
import Input from '../../../components/common/Input'
import Textarea from '../../../components/common/Textarea'
import { useUsers } from '../../user/hooks/useUsers'
import { fetchUsers } from '../../user/state/userSlice'
import { createTask } from '../state/taskSlice'
import { useTasks } from '../hooks/useTasks'
import { TASK_PRIORITIES, TASK_STATUSES } from '../../../utils/tasks'
import type { TaskFormValues } from '../../../types/forms'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateTaskModal = ({ isOpen, onClose }: CreateTaskModalProps) => {
  const dispatch = useAppDispatch()
  const { creating } = useTasks()
  const { error: usersError, items: users, loading: usersLoading } = useUsers()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      assignedTo: '',
      dueDate: '',
    },
  })

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUsers())
    }
  }, [dispatch, isOpen])

  const onSubmit = async (values: TaskFormValues) => {
    const result = await dispatch(createTask(values))

    if (createTask.fulfilled.match(result)) {
      reset()
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create task">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          error={errors.title?.message}
          label="Title"
          placeholder="Call new enterprise lead"
          registration={register('title', { required: 'Title is required' })}
        />
        <Textarea
          error={errors.description?.message}
          label="Description"
          placeholder="Add the task context, expected outcome, and next step."
          registration={register('description', { required: 'Description is required' })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Select label="Status" registration={register('status')}>
            {TASK_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </Select>
          <Select label="Priority" registration={register('priority')}>
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority.value} value={priority.value}>{priority.label}</option>
            ))}
          </Select>
        </div>
        <Input
          error={errors.dueDate?.message}
          label="Due date"
          registration={register('dueDate', { required: 'Due date is required' })}
          type="date"
        />
        <Select
          disabled={usersLoading}
          error={errors.assignedTo?.message || usersError || undefined}
          label="Assign to"
          registration={register('assignedTo', { required: 'Assigned user is required' })}
        >
          <option value="">{usersLoading ? 'Loading users...' : 'Select user'}</option>
          {users.map((user) => (
            <option key={user._id || user.id} value={user._id || user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </Select>
        <div className="flex justify-end gap-3 pt-2">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button isLoading={creating} type="submit">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateTaskModal
