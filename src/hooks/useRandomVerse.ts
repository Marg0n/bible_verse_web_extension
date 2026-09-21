/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { baseUrl } from "../helper/BaseUrl";
import type { VerseData } from "../types/bible.types";

const useRandomVerse = () => {
  //* States
  const [randomVerse, setRandomVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //* Wrapped in useCallback so it's stable and can be triggered on demand
  const fetchRandomVerse = useCallback(async (): Promise<VerseData | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/bible/random`);

      if (!response.ok) {
        throw new Error("Failed to fetch random verse");
      }

      const verseData = await response.json();
      const newVerse = verseData?.data;

      setRandomVerse(newVerse);
      return newVerse; //? Return the fresh verse directly
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { randomVerse, error, loading, fetchRandomVerse };
};

export default useRandomVerse;
