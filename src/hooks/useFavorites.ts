/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import type { FavoritesDataType } from "../types/favorite.types";
import api from "../utils/api"; //? ← fetch wrapper with interceptors

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoritesDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //* Wrapped in useCallback so it can be safely reused across effects and triggers
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

      //? Ensure verseId is always a string for safe comparisons
      const normalizedFavorites = (response?.data?.data || []).map(
        (item: any) => ({
          ...item,
          verseId: String(item.verseId),
        }),
      );

      // setFavorites(response?.data?.data || []);
      setFavorites(normalizedFavorites);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  //* Fetch favorites from the backend on mount
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  //* Listen for login event to automatically fetch favorites (matches auth:logout pattern)
  useEffect(() => {
    const handleLogin = () => {
      fetchFavorites();
    };
    window.addEventListener("auth:login", handleLogin);
    return () => window.removeEventListener("auth:login", handleLogin);
  }, [fetchFavorites]);

  //* Listen for forced logout (refresh token expired)
  useEffect(() => {
    const handleLogout = () => {
      setFavorites([]);
      setError(null);
    };
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, []);

  //* Add favorite with error boundary protection
  const addFavorite = useCallback(async (verseId: string | number) => {
    try {
      const stringId = String(verseId);

      const response = await api.post("/favorites", {
        // verseId: String(verseId),
        verseId: stringId,
      }); //? axios auto-stringifies

      if (response?.data?.data) {
        // setFavorites((prev) => [...prev, response.data.data]);
        
        const newItem = {
          ...response.data.data,
          verseId: String(response.data.data.verseId),
        };

        setFavorites((prev) => [...prev, newItem]);
      }
    } catch (err: any) {
      console.error("Add favorite error:", err.message);
    }
  }, []);

  //* Remove favorite with strict string matching
  const removeFavorite = useCallback(async (verseId: string | number) => {
    try {
      const stringId = String(verseId);

      // await api(`/favorites/${verseId}`, { method: "DELETE" });
      await api(`/favorites/${stringId}`, { method: "DELETE" });

      setFavorites((prev) => prev.filter((item) => item.verseId !== verseId)); //? "18110009" !=  18110009 false (loose equality coerces types, they "match")
    } catch (err: any) {
      console.error("Remove favorite error:", err.message);
    }
  }, []);

  //* Check if a verse is favorited
  const isFavorite = (verseId: string| number) => {
    //? convert to int for check
    // const convertVerseId = verseId.toString();
    // const convertVerseId = parseInt(verseId);

    // return favorites.some((item) => item.verseId === verseId);

    const stringId = String(verseId);
    
    return favorites.some((item) => String(item.verseId) === stringId);
  };

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
    refetchFavorites: fetchFavorites,
  };
}
