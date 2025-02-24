import React from 'react';

const Switch = React.forwardRef(({ className = '', checked, onCheckedChange, disabled = false, ...props }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full
        transition-colors focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${checked ? 'bg-blue-600' : 'bg-gray-200'}
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${className}
      `}
      {...props}
    >
      <span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full
          bg-white shadow-lg ring-0 transition-transform
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
});

Switch.displayName = 'Switch';

export { Switch };