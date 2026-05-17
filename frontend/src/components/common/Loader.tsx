import { Loader2 } from 'lucide-react'

interface LoaderProps {
  label?: string
}

const Loader = ({ label = 'Loading' }: LoaderProps) => {
  return (
    <div className="flex min-h-48 items-center justify-center gap-2 text-sm font-medium text-gray-500">
      <Loader2 className="h-5 w-5 animate-spin text-brand-600" />
      <span>{label}</span>
    </div>
  )
}

export default Loader
