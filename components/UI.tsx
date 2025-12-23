
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "h-11 px-6 rounded-card font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50";
  const variants = {
    primary: "bg-primary text-white hover:bg-secondary shadow-md focus:ring-2 focus:ring-primary/20",
    secondary: "bg-secondary text-white hover:bg-blue-700",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "text-neutral-500 hover:bg-neutral-100"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-card shadow-sm border border-neutral-100 p-4 ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }> = ({ label, error, className = '', ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    {label && <label className="text-sm font-medium text-neutral-500">{label}</label>}
    <input 
      className={`h-11 px-4 rounded-card border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all ${error ? 'border-error' : ''} ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-error mt-0.5">{error}</span>}
  </div>
);

export const Badge: React.FC<{ status: string; children: React.ReactNode }> = ({ status, children }) => {
  const colors: Record<string, string> = {
    pending: "bg-warning/10 text-warning border-warning/20",
    active: "bg-success/10 text-success border-success/20",
    expired: "bg-error/10 text-error border-error/20",
    rejected: "bg-neutral-100 text-neutral-500 border-neutral-200"
  };
  return (
    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${colors[status] || colors.rejected}`}>
      {children}
    </span>
  );
};
