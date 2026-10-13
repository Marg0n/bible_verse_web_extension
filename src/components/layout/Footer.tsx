interface Props {
    children: React.ReactNode;
}

export default function Footer({ children }: Props) {
    return (
        <footer className="h-14 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky bottom-0 z-50 px-4 flex items-center justify-between">
            {children}
        </footer>
    );
}
