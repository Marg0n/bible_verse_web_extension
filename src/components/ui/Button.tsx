import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = "", 
    ...props 
}: Props) {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
        primary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 active:scale-95",
        outline: "border border-zinc-800 bg-transparent hover:bg-zinc-900 hover:text-zinc-100 active:scale-95 text-zinc-400",
        ghost: "bg-transparent hover:bg-zinc-900 hover:text-zinc-100 active:scale-95 text-zinc-400"
    };

    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 py-2 text-sm",
        lg: "h-10 px-8 text-base"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
