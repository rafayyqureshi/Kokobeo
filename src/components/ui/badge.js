import React from "react"

const getBadgeClasses = (variant = 'default') => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors"
  
  const variantClasses = {
    default: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    destructive: "bg-red-100 text-red-800 hover:bg-red-200",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    success: "bg-green-100 text-green-800 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    info: "bg-blue-100 text-blue-800 hover:bg-blue-200"
  }

  return `${baseClasses} ${variantClasses[variant] || variantClasses.default}`
}

const Badge = ({ 
  children,
  variant,
  className = "",
  ...props 
}) => {
  return (
    <div 
      className={`${getBadgeClasses(variant)} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export { Badge }