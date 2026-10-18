/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import type { FavoritesDataType } from "../types/favorite.types";
import api from "../utils/api"; //? ← fetch wrapper with interceptors

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritesDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //? Wrapped in useCallback so it can be safely reused across effects and triggers
  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const { access_token } = await chrome.storage.session.get("access_token");
      
      //? If no token, clear favorites and ensure loading stops immediately
      if (!access_token) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      //? api() auto-attaches the Bearer token + handles 401 refresh
      const response = await api("/favorites");
      setFavorites(response?.data?.data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  //? Fetch favorites from the backend on mount
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  //? Listen for login event to automatically fetch favorites (matches your auth:logout pattern)
  useEffect(() => {
    const handleLogin = () => {
      fetchFavorites();
    };
    window.addEventListener("auth:login", handleLogin);
    return () => window.removeEventListener("auth:login", handleLogin);
  }, [fetchFavorites]);

  //? Listen for forced logout (refresh token expired)
  useEffect(() => {
    const handleLogout = () => {
      setFavorites([]);
      setError(null);
    };
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, []);

  //* Add favorite
  const addFavorite = useCallback(async (verseId: number) => {
    try {
      const response = await api.post("/favorites", {
        verseId: String(verseId),
      }); //? axios auto-stringifies
      if (response?.data?.data) {
        setFavorites((prev) => [...prev, response.data.data]);
      }
    } catch (err: any) {
      console.error("Add favorite error:", err.message);
    }
  }, []);

  //* Remove favorite
  const removeFavorite = useCallback(async (verseId: string) => {
    try {
      await api(`/favorites/${verseId}`, { method: "DELETE" });
      setFavorites((prev) => prev.filter((item) => item.verseId !== verseId)); //? "18110009" !=  18110009 false (loose equality coerces types, they "match")
    } catch (err: any) {
      console.error("Remove favorite error:", err.message);
    }
  }, []);

  //* Check if a verse is favorited
  const isFavorite = (verseId: number) => {
    //? convert to int for check
    const convertVerseId = verseId.toString();

    return favorites.some((item) => item.verseId === convertVerseId);
  };

  return { favorites, loading, error, addFavorite, removeFavorite, isFavorite, refetchFavorites: fetchFavorites };
}
