import { useState } from 'react';
import PopupLayout from '../components/layout/PopupLayout';
import Button from '../components/ui/Button';
import VerseCard from '../components/features/VerseCard';
import Input from '../components/ui/Input';
import StreakBadge from '../components/features/StreakBadge';
import FavoriteButton from '../components/features/FavoriteButton';
import ShareMenu from '../components/features/ShareMenu';
import { useFavorites } from '../hooks/useFavorites';
import { getDailyVerse, getRandomVerse } from '../services/api';
import type { Verse } from '../types';

export default function Popup() {
    const [verse, setVerse] = useState<Verse>(getDailyVerse());
    const [loading, setLoading] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const { favorites } = useFavorites();

    const handleNewVerse = (type: 'random' | 'daily') => {
        setLoading(true);
        setTimeout(() => {
            setVerse(type === 'random' ? getRandomVerse() : getDailyVerse());
            setLoading(false);
        }, 300); // Artificial delay for smooth transition
    };

    return (
        <PopupLayout 
            title="Bible Verse"
            headerAction={
                <div className="flex items-center gap-3">
                    <StreakBadge />
                </div>
            }
            footer={
                <div className="flex w-full items-center justify-center gap-3 px-0.5 py-1">
                    <ShareMenu verse={verse} />
                    <FavoriteButton verse={verse} />
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-10 w-10 p-0 rounded-full transition-all duration-200 active:scale-125 text-white hover:text-zinc-200 group"
                        onClick={() => handleNewVerse('random')}
                        title="Random Verse"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500">
                            <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
                        </svg>
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-3">
                {/* Search & Date Compact Layout */}
                <div className="flex items-center justify-between gap-4 px-1">
                    <div className="flex-1 max-w-[140px]">
                        <Input 
                            placeholder="Quick search..." 
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            className="h-8 text-[11px] border-zinc-800/50 focus:bg-zinc-900/50"
                        />
                    </div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-80 whitespace-nowrap">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                {/* Main Verse Display */}
                <VerseCard verse={verse} loading={loading} />

                {/* Favorites Section (Collapsible) */}
                <div className="pt-2 border-t border-zinc-800/20">
                    <button 
                        onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                        className="flex items-center justify-between w-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1 hover:text-zinc-300 transition-colors"
                    >
                        <span>Saved Verses ({favorites.length})</span>
                        <span className={`transition-transform duration-300 ${isFavoritesOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
                    </button>
                    
                    {isFavoritesOpen && (
                        <div className="mt-4 space-y-3 px-1">
                            {favorites.length === 0 ? (
                                <p className="text-xs text-zinc-600 font-medium py-2">No saved verses yet.</p>
                            ) : (
                                favorites.map((v) => (
                                    <div 
                                        key={v.reference}
                                        onClick={() => setVerse(v)}
                                        className="p-3 rounded-lg bg-zinc-900/30 border border-zinc-800/30 hover:border-zinc-700/50 hover:bg-zinc-900/50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors line-clamp-1 flex-1 leading-none">
                                                {v.verse}
                                            </p>
                                            <span className="text-[9px] font-bold text-zinc-600 group-hover:text-zinc-500 uppercase flex-shrink-0 tracking-wider">
                                                {v.reference}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PopupLayout>
    );
}
