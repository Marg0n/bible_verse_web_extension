/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import type { VerseData } from "../types/bible.types";

export function useDailyVerse() {
  //* States
  const [bibleVerse, setBibleVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //* Base url
  const baseUrl = import.meta.env.VITE_API_URL;

  useMemo(() => {
    const fetchDailyVerse = async () => {
      try {
        const response = await fetch(`${baseUrl}/bible`);

        if (!response.ok) {
          throw new Error("Failed to fetch the daily verse");
        }

        const data = await response.json();

        setBibleVerse(data?.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      }
      finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, [baseUrl]);

//   console.log(bibleVerse)

  return { bibleVerse, loading, error };
}
