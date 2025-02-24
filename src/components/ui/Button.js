import React from 'react';

const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  success: "bg-green-600 text-white hover:bg-green-700",
  ghost: "hover:bg-gray-100",
  link: "text-blue-600 underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-8 px-3",
  lg: "h-12 px-8",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef(({
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  children,
  ...props
}, ref) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md text-sm font-medium
        transition-colors focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50
        ${buttonVariants[variant]}
        ${buttonSizes[size]}
        ${className}
      `}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;