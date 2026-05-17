import AuthLayout from '../features/auth/ui/AuthLayout'
import LoginForm from '../features/auth/ui/LoginForm'

const LoginPage = () => {
  return (
    <AuthLayout subtitle="Sign in to manage your CRM tasks and team follow-ups." title="Login">
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage
