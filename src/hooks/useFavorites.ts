/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import type { VerseData } from "../types/bible.types";
import { baseUrl } from "../helper/BaseUrl";

export function useFavorites() {
  const [favorites, setFavorites] = useState<VerseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //* Helper to get authorization headers if using localStorage token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("auth_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  //* Fetch favorites from the backend on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        // 🛠️ Fixed: Changed to GET request and added auth headers
        const response = await fetch(`${baseUrl}/favorites`, {
          method: "GET",
          headers: getAuthHeaders(),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await response.json();
        setFavorites(data?.data || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites(); //? Invoking the fetch function on mount!
  }, []);

  //* Add favorite via backend API
  const addFavorite = useCallback(async (verseId: number) => {
    try {
      const response = await fetch(`${baseUrl}/favorites`, {
        method: "POST",
        headers: getAuthHeaders(), //? Added auth headers here too
        credentials: "include",
        body: JSON.stringify({ verseId }),
      });

      if (!response.ok) throw new Error("Failed to add favorite");

      const data = await response.json();
      
      //? Fixed: Optimistically update local state so the UI updates instantly
      //? (Assumes backend returns the added verse or it can refetch/append)
      if (data?.data) {
        setFavorites((prev) => [...prev, data.data]);
      }
    } catch (err: any) {
      console.error("Add favorite error:", err.message);
    }
  }, []);

  //* Remove favorite via backend API
  const removeFavorite = useCallback(async (verseId: number) => {
    try {
      const response = await fetch(`${baseUrl}/favorites/${verseId}`, {
        method: "DELETE",
        headers: getAuthHeaders(), //? Added auth headers here too
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to remove favorite");

      //? Update local state instantly to remove it from UI list
      setFavorites((prev) => prev.filter((item) => item.verseId !== verseId));
    } catch (err: any) {
      console.error("Remove favorite error:", err.message);
    }
  }, []);

  //* Check if a verse is favorited
  const isFavorite = (verseId: number) => {
    return favorites.some((item) => item.verseId === verseId);
  };

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}