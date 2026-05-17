const Input = ({ error, label, registration, className = '', ...props }) => {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span> : null}
      <input
        className={`h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100 ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-50' : ''} ${className}`}
        {...registration}
        {...props}
      />
      {error ? <span className="mt-1.5 block text-sm text-red-600">{error}</span> : null}
    </label>
  )
}

export default Input
