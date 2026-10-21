import type { VerseData } from "./bible.types";

export interface FavoriteButtonProps {
  verseId: string;
  isFavorite: (id: string) => boolean;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export interface FavoritesDataType {
  verse: VerseData;
  verseId: string;
  id: string;
  createdAt: Date;
  userId: string;
}
