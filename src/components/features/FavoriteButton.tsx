import type { FavoriteButtonProps } from "../../types/favorite.types";
import Button from "../ui/Button";

export default function FavoriteButton({
  verseId,
  isFavorite,
  addFavorite,
  removeFavorite,
}: FavoriteButtonProps) {
  // const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const active = isFavorite(verseId);

  //? convert veerseId to string
  const convertedVerseId = verseId.toString();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-10 w-10 p-0 rounded-full transition-all duration-200 active:scale-125 ${
        active ? "text-yellow-500" : "text-white hover:text-zinc-200"
      } cursor-pointer`}
      onClick={() => (active ? removeFavorite(convertedVerseId) : addFavorite(verseId))} //? toggle
      title={active ? "Remove from Favorites" : "Save to Favorites"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    </Button>
  );
}
