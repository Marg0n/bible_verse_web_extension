import bgImage from "../../assets/images/jesus.webp";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className = "" }: Props) {
    return (
        <div 
        style={{ backgroundImage: `url(${bgImage})` }}
        className={`w-95 h-145 flex flex-col bg-zinc-950 overflow-hidden border border-zinc-800 rounded-lg shadow-2xl bg-cover bg-center bg-no-repeat ${className}`}>
            {children}
        </div>
    );
}
