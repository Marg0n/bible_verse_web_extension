import React, { useMemo, useState } from "react";
import { BsCalendar2Month, BsPersonBoundingBox } from "react-icons/bs";
import { GiCrossMark } from "react-icons/gi";
import { Login } from "../components/auth/Login";
import Registration from "../components/auth/Registration";
import FavoritesSection from "../components/features/FavoritesSection";
import ShareMenu from "../components/features/ShareMenu";
import StreakBadge from "../components/features/StreakBadge";
import VerseCard from "../components/features/VerseCard";
import PopupLayout from "../components/layout/PopupLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { useDailyVerse } from "../hooks/useDailyVerse";
import { useFavorites } from "../hooks/useFavorites";
import useRandomVerse from "../hooks/useRandomVerse";
import { useVerseSearch } from "../hooks/useVerseSearch";
import type { VerseData } from "../types/bible.types";

//* Define the views will be showing
type AuthView = "home" | "login" | "register";

export default function Popup() {
  //* Start on "home" (public view) or check if they have a saved token
  const [authView, setAuthView] = useState<AuthView>("home");
  //* Check initial login status from storage on load
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const token = localStorage.getItem("auth_token");
    return !!token; //? Returns true if token exists, false if null
  });

  //* Hooks
  const { bibleVerse, loading, error } = useDailyVerse();
  const { fetchRandomVerse } = useRandomVerse();

  const [overrideVerse, setOverrideVerse] = useState<VerseData | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  //* Search
  const {
    searchResults,
    searchLoading: apiSearchLoading,
    setSearchResults,
  } = useVerseSearch(searchQuery);

  //* Favorites
  const { favorites } = useFavorites();

  //* Constants
  const verse = overrideVerse ?? bibleVerse;

  const handleNewVerse = async (type: "random" | "daily") => {
    setSearchLoading(true);
    if (type === "daily") {
      setOverrideVerse(null);
      setSearchLoading(false);
      setSearchResults([]); //? Clearing search results
      return;
    }
    const newRandom = await fetchRandomVerse();
    if (newRandom) setOverrideVerse(newRandom);
    setSearchLoading(false);
  };

  //* Date formatting as MMM DD YYYY
  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  if (loading)
    return (
      <Card className="animate-pulse p-6">
        <div className="space-y-4">
          <div className="h-4 bg-zinc-800 rounded w-1/3 mb-6"></div>
          <div className="h-5 bg-zinc-800 rounded w-full"></div>
          <div className="h-5 bg-zinc-800 rounded w-5/6"></div>
          <div className="h-4 bg-zinc-800 rounded w-3/4 pt-4 border-t border-zinc-800/20"></div>
        </div>
      </Card>
    );

  if (error) return <div className="p-4 text-red-400">Error: {error}</div>;

  //* ==========================================
  //* CONDITIONAL RENDERING BASED ON authView
  //* ==========================================

  if (authView === "login") {
    return (
      <PopupLayout
        title="Bible Verse"
        className="flex flex-col justify-center items-center"
      >
        <div className="p-2 flex justify-center">
          <Login
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setAuthView("home"); //? Return to home after login
            }}
            switchToRegister={() => setAuthView("register")}
            switchToHome={() => setAuthView("home")}
          />
        </div>
      </PopupLayout>
    );
  }

  if (authView === "register") {
    return (
      <PopupLayout
        title="Bible Verse"
        className="flex flex-col justify-center items-center"
      >
        <div className="p-2 flex justify-center">
          <Registration
            onRegisterSuccess={() => {
              setIsLoggedIn(true);
              setAuthView("home"); // Return to home after registration
            }}
            switchToLogin={() => setAuthView("login")}
            switchToHome={() => setAuthView("home")}
          />
        </div>
      </PopupLayout>
    );
  }

  //* ==========================================
  //* NORMAL HOME VIEW (Accessible to Everyone)
  //* ==========================================
  return (
    <PopupLayout
      title="Bible Verse"
      className="flex flex-col justify-center items-center"
      headerAction={
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <BsPersonBoundingBox
              className="text-lg text-zinc-400 hover:text-white cursor-pointer transition-colors duration-200"
              onClick={() => {
                // Logout logic
                localStorage.removeItem("auth_token");
                setIsLoggedIn(false);
              }}
              title="Logout"
            />
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setAuthView("login")}
              className="text-xs text-blue-400 hover:text-white cursor-pointer"
            >
              Login
            </Button>
          )}
          <StreakBadge />
        </div>
      }
      footer={
        <div className="flex w-full items-center justify-center gap-3 px-0.5 py-1">
          <ShareMenu verse={verse!} />
          {/* Favorites buttons */}
          {/* {isLoggedIn && <FavoriteButton verse={verse} />} */}
          {/* Random Verse */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 rounded-full transition-all duration-200 active:scale-125 text-white hover:text-zinc-200 group cursor-pointer"
            onClick={() => handleNewVerse("random")}
            title="Random Verse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
            >
              <path d="M21 2v6h-6" />
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M3 22v-6h6" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
            </svg>
          </Button>

          {/* Daily Verse */}
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 p-0 rounded-full transition-all duration-200 active:scale-125 text-white hover:text-zinc-200 group"
          >
            <BsCalendar2Month
              className=" text-lg cursor-pointer"
              onClick={() => handleNewVerse("daily")}
            />
          </Button>
        </div>
      }
    >
      {/* Body Content */}
      <div className="flex flex-col gap-3">
        {/* Search & Date Compact Layout */}
        <div className="flex items-center justify-between gap-4 px-1">
          <div className="flex-1 max-w-35 relative">
            <Input
              placeholder="Search verses..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="h-8 text-[11px] border-zinc-800/50 focus:bg-zinc-900/50"
            />
            <GiCrossMark
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
            />
          </div>
          <p className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest opacity-80 whitespace-nowrap">
            {today}
          </p>
        </div>

        {/* Search Results Dropdown */}
        {searchQuery.trim() !== "" && (
          <div className="flex flex-col gap-2 max-h-32 overflow-y-auto px-1">
            {/* ⌛ Show loading status while fetching search results from API */}
            {apiSearchLoading ? (
              <p className="text-xs text-zinc-300 font-medium py-1">
                Searching...
              </p>
            ) : searchResults.length === 0 ? (
              <p className="text-xs text-zinc-300 font-medium py-1">
                No verses found.
              </p>
            ) : (
              searchResults.map((v) => (
                <div
                  key={v.verseId}
                  onClick={() => {
                    setOverrideVerse(v);
                    setSearchQuery("");
                    (document.activeElement as HTMLElement)?.blur(); //? remove input focus
                  }}
                  className="p-2 rounded-lg bg-zinc-900/30 border border-zinc-800/30 hover:border-zinc-700/50 hover:bg-zinc-900/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold text-zinc-100 group-hover:text-zinc-200 transition-colors line-clamp-1 flex-1 leading-none">
                      {v.text_en}
                    </p>
                    <span className="text-[9px] font-bold text-yellow-600 group-hover:text-yellow-500 uppercase flex-shrink-0 tracking-wider">
                      {v.book_en} {v.chapter} : {v.verse}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Main Verse Display */}
        <VerseCard verse={verse!} loading={searchLoading} />

        {/* Favorites Section (Restrict or prompt login if not logged in) */}
        <div className="pt-2 border-t border-zinc-800/20">
          {isLoggedIn ? (
            /* Favorites Section (Collapsible) */
            <div className="pt-2 border-t border-zinc-800/20">
              <button
                onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                className="flex items-center justify-between w-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1 hover:text-zinc-300 transition-colors"
              >
                <span>Saved Verses ({favorites.length})</span>
                <span
                  className={`transition-transform duration-300 ${isFavoritesOpen ? "rotate-180" : "rotate-0"}`}
                >
                  ▼
                </span>
              </button>
              {isFavoritesOpen && (
                <FavoritesSection
                  favorites={favorites}
                  setVerse={setOverrideVerse}
                />
              )}
            </div>
          ) : (
            <div className="text-center py-3 bg-zinc-900/40 rounded-lg border border-zinc-800/40">
              <p className="text-[11px] text-zinc-400 mb-2">
                Login to save and view your favorite verses!
              </p>
              <Button
                size="sm"
                onClick={() => setAuthView("login")}
                className="text-xs cursor-pointer"
              >
                Login / Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </PopupLayout>
  );
}
