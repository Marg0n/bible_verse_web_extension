import bgImage from "../../assets/images/jesus.webp";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className={`w-95 h-160 flex flex-col bg-zinc-950 overflow-hidden border border-zinc-800 rounded-lg shadow-2xl bg-cover bg-center bg-no-repeat ${className} relative`}
    >
      {/* Dark gradient overlay layer to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/40 pointer-events-none" />

      {/* Content wrapper to keep children above the overlay */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  );
}
