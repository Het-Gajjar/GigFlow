import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import { login } from '../state/authSlice'
import { useAuth } from '../hooks/useAuth'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading } = useAuth()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ defaultValues: { email: '', password: '' } })

  const onSubmit = async (values) => {
    const result = await dispatch(login(values))

    if (login.fulfilled.match(result)) {
      const role = result.payload.user?.role
      const fallback = role === 'admin' ? '/admin/dashboard' : '/dashboard'
      navigate(location.state?.from?.pathname || fallback, { replace: true })
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
        placeholder="Enter password"
        registration={register('password', {
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' },
        })}
        type="password"
      />
      <Button className="w-full" isLoading={loading} size="lg" type="submit">
        Login
      </Button>
      <p className="text-center text-sm text-gray-500">
        New to GigFlow? <Link className="font-medium text-brand-700 hover:underline" to="/register">Create an account</Link>
      </p>
    </form>
  )
}

export default LoginForm
