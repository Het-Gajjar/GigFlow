import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold text-brand-700">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-950">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-gray-500">The page you are looking for does not exist or has moved.</p>
        <Link
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-brand-600 px-4 text-sm font-medium text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          to="/login"
        >
          Back to login
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
