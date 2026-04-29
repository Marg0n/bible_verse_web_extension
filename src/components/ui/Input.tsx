import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, className = "", ...props }: Props) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider px-0.5">{label}</label>}
      <input
        className={`flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 text-zinc-100 ${className}`}
        {...props}
      />
    </div>
  );
}
