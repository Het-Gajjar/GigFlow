const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-soft ${className}`}>
      {children}
    </div>
  )
}

export default Card
