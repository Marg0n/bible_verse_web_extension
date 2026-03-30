interface Props {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
}

export default function Card({ children, className = "", title, subtitle }: Props) {
    return (
        <div className={`p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm transition-all hover:border-zinc-700/50 group ${className}`}>
            {(title || subtitle) && (
                <div className="mb-3 space-y-0.5">
                    {title && <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors tracking-tight">{title}</h3>}
                    {subtitle && <p className="text-xs text-zinc-500 font-medium">{subtitle}</p>}
                </div>
            )}
            <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
                {children}
            </div>
        </div>
    );
}
