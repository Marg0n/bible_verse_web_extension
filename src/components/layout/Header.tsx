interface Props {
    title: string;
    rightAction?: React.ReactNode;
}

export default function Header({ title, rightAction }: Props) {
    return (
        <header className="h-14 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img src="/icons/icon-48.png" alt="Icon" className="w-6 h-6 rounded border border-zinc-800/50 shadow-sm" />
                <h1 className="text-sm font-semibold text-zinc-100 tracking-tight">{title}</h1>
            </div>
            {rightAction && <div className="flex items-center gap-2">{rightAction}</div>}
        </header>
    );
}
