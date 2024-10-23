// components/ui/Alert.js
import React from 'react';

const Alert = ({ children, variant, className }) => {
  const variantClasses = variant === 'destructive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  
  return (
    <div className={`p-4 rounded-md shadow-md ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

// Exporting Alert as default
export default Alert;
