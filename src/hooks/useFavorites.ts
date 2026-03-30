import { useState } from 'react';
import type { Verse } from '../types';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Verse[]>(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    const isFavorite = (verse: Verse) => favorites.some(v => v.reference === verse.reference);

    const toggleFavorite = (verse: Verse) => {
        const newFavorites = isFavorite(verse)
            ? favorites.filter(v => v.reference !== verse.reference)
            : [...favorites, verse];
        
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    return { favorites, toggleFavorite, isFavorite };
}
