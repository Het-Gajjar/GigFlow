import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import { registerUser } from '../state/authSlice'
import { useAuth } from '../hooks/useAuth'
import type { RegisterFormValues } from '../../../types/forms'

const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading } = useAuth()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterFormValues>({ defaultValues: { name: '', email: '', password: '', role: 'user' } })

  const onSubmit = async (values: RegisterFormValues) => {
    const result = await dispatch(registerUser(values))

    if (registerUser.fulfilled.match(result)) {
      const role = result.payload.user?.role
      navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard', { replace: true })
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        error={errors.name?.message}
        label="Name"
        placeholder="Full name"
        registration={register('name', { required: 'Name is required' })}
      />
      <Input
        error={errors.email?.message}
        label="Email"
        placeholder="you@example.com"
        registration={register('email', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
        })}
        type="email"
      />
      <Input
        error={errors.password?.message}
        label="Password"
        placeholder="Minimum 6 characters"
        registration={register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' },
        })}
        type="password"
      />

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-gray-700">Role</legend>
        <div className="grid grid-cols-2 gap-3">
          {['admin', 'user'].map((role) => (
            <label className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium capitalize text-gray-700 has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-700" key={role}>
              <input className="h-4 w-4 accent-brand-600" type="radio" value={role} {...register('role')} />
              {role}
            </label>
          ))}
        </div>
      </fieldset>

      <Button className="w-full" isLoading={loading} size="lg" type="submit">
        Register
      </Button>
      <p className="text-center text-sm text-gray-500">
        Already have an account? <Link className="font-medium text-brand-700 hover:underline" to="/login">Login</Link>
      </p>
    </form>
  )
}

export default RegisterForm
