import type { VerseData } from "./bible.types";

export interface FavoriteButtonProps {
  verseId: number;
  isFavorite: (id: number) => boolean;
  addFavorite: (id: number) => void;
  removeFavorite: (id: string) => void;
}

export interface FavoritesDataType {
  verse: VerseData;
  verseId: string;
  id: string;
  createdAt: Date;
  userId: string;
}
