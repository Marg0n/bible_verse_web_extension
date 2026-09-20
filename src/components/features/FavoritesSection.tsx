import type { VerseData } from "../../types/bible.types";

interface FavoritesSectionProps {
  favorites: VerseData[];
  setVerse: (verse: VerseData) => void;
}

const FavoritesSection = ({ favorites, setVerse }: FavoritesSectionProps) => {
  return (
    <div className="mt-4 space-y-3 px-1">
      {favorites.length === 0 ? (
        <p className="text-xs text-zinc-600 font-medium py-2">
          No saved verses yet.
        </p>
      ) : (
        favorites.map((v) => (
          <div
            key={v.verseId}
            onClick={() => setVerse(v)}
            className="p-3 rounded-lg bg-zinc-900/30 border border-zinc-800/30 hover:border-zinc-700/50 hover:bg-zinc-900/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors line-clamp-1 flex-1 leading-none">
                {v.text_en}
              </p>
              <span className="text-[9px] font-bold text-zinc-600 group-hover:text-zinc-500 uppercase flex-shrink-0 tracking-wider">
                — {v.book_en} {v.chapter} : {v.verse}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesSection;
