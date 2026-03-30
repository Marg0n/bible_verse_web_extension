interface Props {
    title: string;
    rightAction?: React.ReactNode;
}

export default function Header({ title, rightAction }: Props) {
    return (
        <header className="h-14 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 px-4 flex items-center justify-between">
            <h1 className="text-sm font-semibold text-zinc-100 tracking-tight">{title}</h1>
            {rightAction && <div className="flex items-center gap-2">{rightAction}</div>}
        </header>
    );
}
