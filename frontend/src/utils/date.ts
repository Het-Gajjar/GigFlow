export const formatDate = (value?: string | Date | null) => {
  if (!value) return 'Not set'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}
