interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className = "" }: Props) {
    return (
        <div className={`w-[360px] h-[500px] flex flex-col bg-zinc-950 overflow-hidden border border-zinc-800 rounded-lg shadow-2xl ${className}`}>
            {children}
        </div>
    );
}
