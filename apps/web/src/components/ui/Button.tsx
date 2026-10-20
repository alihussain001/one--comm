import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'dark' | 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5003C0] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-[13px] md:text-sm px-5 py-2.5 gap-2',
    lg: 'text-sm md:text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    dark: 'bg-[#000000] text-white hover:bg-neutral-900 shadow-md',
    primary: 'bg-[#5003C0] text-white hover:bg-[#4302a2] shadow-[0_4px_16px_rgba(80,3,192,0.25)]',
    outline:
      'border border-[#5003C0] text-[#5003C0] bg-transparent hover:bg-[#5003C0] hover:text-white',
    ghost: 'text-[#6B7280] hover:text-[#111827] hover:bg-neutral-100',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
