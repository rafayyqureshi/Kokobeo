import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const variants = {
  default: {
    card: "bg-white border-gray-100",
    title: "text-gray-800",
    description: "text-gray-500",
  },
  colored: {
    primary: {
      card: "bg-blue-50 border-blue-100",
      title: "text-blue-900",
      description: "text-blue-600",
    },
    success: {
      card: "bg-green-50 border-green-100",
      title: "text-green-900",
      description: "text-green-600",
    },
    warning: {
      card: "bg-yellow-50 border-yellow-100",
      title: "text-yellow-900",
      description: "text-yellow-600",
    },
    danger: {
      card: "bg-red-50 border-red-100",
      title: "text-red-900",
      description: "text-red-600",
    },
  },
  gradient: {
    primary: {
      card: "bg-gradient-to-br from-blue-500 to-indigo-600 border-transparent",
      title: "text-white",
      description: "text-blue-100",
    },
    success: {
      card: "bg-gradient-to-br from-green-500 to-emerald-600 border-transparent",
      title: "text-white",
      description: "text-green-100",
    },
    warning: {
      card: "bg-gradient-to-br from-yellow-500 to-orange-600 border-transparent",
      title: "text-white",
      description: "text-yellow-100",
    },
    danger: {
      card: "bg-gradient-to-br from-red-500 to-rose-600 border-transparent",
      title: "text-white",
      description: "text-red-100",
    },
  },
};

export const Card = ({ 
  className = '',
  variant = 'default',
  color,
  hover = true,
  interactive = false,
  loading = false,
  children,
  ...props 
}) => {
  const baseStyles = "rounded-xl border shadow-lg transition-all duration-300";
  const hoverStyles = hover ? "hover:shadow-xl hover:-translate-y-1" : "";
  const interactiveStyles = interactive ? "cursor-pointer active:scale-[0.98]" : "";
  const variantStyles = color ? variants[variant][color].card : variants.default.card;

  return (
    <motion.div
      initial={false}
      animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
      className={`${baseStyles} ${hoverStyles} ${interactiveStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ 
  className = '', 
  variant = 'default',
  color,
  divider = false,
  children, 
  ...props 
}) => {
  const baseStyles = "flex flex-col space-y-1.5 px-6 py-6";
  const dividerStyles = divider ? "border-b border-gray-100" : "";
  
  return (
    <div
      className={`${baseStyles} ${dividerStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ 
  className = '', 
  variant = 'default',
  color,
  size = 'default',
  children, 
  ...props 
}) => {
  const baseStyles = "font-semibold leading-none tracking-tight";
  const sizeStyles = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-3xl"
  }[size];
  const variantStyles = color ? variants[variant][color].title : variants.default.title;

  return (
    <h3
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ 
  className = '', 
  variant = 'default',
  color,
  children, 
  ...props 
}) => {
  const baseStyles = "text-sm";
  const variantStyles = color ? variants[variant][color].description : variants.default.description;

  return (
    <p
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

export const CardContent = ({ 
  className = '', 
  padded = true,
  children, 
  ...props 
}) => {
  const baseStyles = padded ? "px-6 py-4" : "";

  return (
    <div
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  className = '', 
  divider = false,
  actions = false,
  children, 
  ...props 
}) => {
  const baseStyles = "px-6 py-4";
  const dividerStyles = divider ? "border-t border-gray-100" : "";
  const actionStyles = actions ? "flex items-center justify-end space-x-2" : "flex items-center";

  return (
    <div
      className={`${baseStyles} ${dividerStyles} ${actionStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Additional utility components
export const CardAction = ({ 
  className = '', 
  arrow = false,
  chevron = false,
  children, 
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 
        text-sm font-medium transition-colors
        bg-blue-600 text-white hover:bg-blue-700
        disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
      {arrow && <ArrowRight className="ml-2 h-4 w-4" />}
      {chevron && <ChevronRight className="ml-2 h-4 w-4" />}
    </motion.button>
  );
};

export const CardBadge = ({ 
  className = '', 
  variant = 'default',
  color = 'primary',
  children, 
  ...props 
}) => {
  const variants = {
    default: {
      primary: "bg-blue-100 text-blue-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-yellow-100 text-yellow-700",
      danger: "bg-red-100 text-red-700",
    },
    outlined: {
      primary: "border border-blue-200 text-blue-700",
      success: "border border-green-200 text-green-700",
      warning: "border border-yellow-200 text-yellow-700",
      danger: "border border-red-200 text-red-700",
    },
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        ${variants[variant][color]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Example usage:
/*
<Card variant="gradient" color="primary" interactive>
  <CardHeader divider>
    <CardTitle size="large">Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter divider actions>
    <CardBadge variant="outlined" color="warning">Status</CardBadge>
    <CardAction arrow>Action</CardAction>
  </CardFooter>
</Card>
*/

export default Card;