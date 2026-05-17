import AuthLayout from '../features/auth/ui/AuthLayout'
import RegisterForm from '../features/auth/ui/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthLayout subtitle="Create an admin or user account and continue into the right workspace." title="Create account">
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage
