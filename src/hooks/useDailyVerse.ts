/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import type { VerseData } from "../types/bible.types";
import { baseUrl } from "../helper/BaseUrl";

export function useDailyVerse() {
  //* States
  const [bibleVerse, setBibleVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useMemo(() => {
    const fetchDailyVerse = async () => {
      try {
        const today = new Date().toISOString().split("T")[0]; //? e.g., "2026-09-16"
        const cachedDate = localStorage.getItem("daily_verse_date");
        const cachedVerse = localStorage.getItem("daily_verse_data");

        // If today's verse is already saved, use it and skip the API call!
        if (cachedDate === today && cachedVerse) {
          setBibleVerse(JSON.parse(cachedVerse));
          setLoading(false);
          return;
        }

        //? Otherwise, fetch a fresh one for the new day
        const response = await fetch(`${baseUrl}/bible`);
        if (!response.ok) throw new Error("Failed to fetch the daily verse");

        const data = await response.json();
        const verseData = data?.data;

        //? Update state and store it in localStorage with today's date
        setBibleVerse(verseData);
        localStorage.setItem("daily_verse_date", today);
        localStorage.setItem("daily_verse_data", JSON.stringify(verseData));
      } 
      catch (err: any) {
        setError(err.message || "Something went wrong");
      }
      finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, []);

//   console.log(bibleVerse)

  return { bibleVerse, loading, error };
}
