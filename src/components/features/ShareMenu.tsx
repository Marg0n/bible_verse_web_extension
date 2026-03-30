import Button from '../ui/Button';
import type { Verse } from '../../types';

interface Props {
    verse: Verse;
}

export default function ShareMenu({ verse }: Props) {
    const handleShare = (platform: 'twitter' | 'copy') => {
        const text = `"${verse.verse}" - ${verse.reference}`;
        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(text);
            alert('Copied to clipboard!');
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 w-10 p-0 rounded-full transition-all duration-200 active:scale-125 text-white hover:text-blue-400 group"
                onClick={() => handleShare('twitter')}
                title="Share on Twitter"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-colors">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" x2="12" y1="2" y2="15"/>
                </svg>
            </Button>
            <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 w-10 p-0 rounded-full transition-all duration-200 active:scale-125 text-white hover:text-zinc-200 group"
                onClick={() => handleShare('copy')}
                title="Copy to Clipboard"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-colors">
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                </svg>
            </Button>
        </div>
    );
}
