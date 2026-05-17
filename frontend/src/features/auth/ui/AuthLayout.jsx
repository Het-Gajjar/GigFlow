const AuthLayout = ({ children, subtitle, title }) => {
  return (
    <main className="flex min-h-screen bg-gray-50">
      <section className="hidden flex-1 border-r border-gray-200 bg-white px-10 py-12 lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-xl font-semibold text-gray-950">GigFlow</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">A clean operational workspace for assigning, tracking, and closing tasks across your CRM team.</p>
        </div>
        <div className="max-w-lg">
          <div className="grid grid-cols-2 gap-3">
            {['Lead follow-ups', 'Internal tasks', 'Status reviews', 'Team ownership'].map((item) => (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4" key={item}>
                <p className="text-sm font-semibold text-gray-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <p className="text-xl font-semibold text-gray-950">GigFlow</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-950">{title}</h1>
              <p className="mt-2 text-sm leading-6 text-gray-500">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
