import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-soft ${className}`}>
      {children}
    </div>
  )
}

export default Card
