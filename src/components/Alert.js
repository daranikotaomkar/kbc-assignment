import React from 'react';

export const Alert = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'p-4 rounded-md mb-4';
  const variantClasses = {
    default: 'bg-blue-100 text-blue-700',
    destructive: 'bg-red-100 text-red-700',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const AlertTitle = ({ children, className = '' }) => (
  <h4 className={`font-bold ${className}`}>{children}</h4>
);

export const AlertDescription = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);