/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { VerseData } from "../types/bible.types";
import { baseUrl } from "../helper/BaseUrl";

export function useDailyVerse() {
  //* States
  const [bibleVerse, setBibleVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  //* UTC Date
  // const today = new Date().toISOString().split("T")[0]; //? e.g., "2026-09-16"

  //? Local date, not UTC
  const today = new Intl.DateTimeFormat("en-CA").format(new Date());
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        const cachedDate = localStorage.getItem("daily_verse_date");
        const cachedVerse = localStorage.getItem("daily_verse_data");
        const cachedTz = localStorage.getItem("daily_verse_tz");

        //? If today's verse is already saved, use it and skip the API call!
        if (cachedDate === today && cachedVerse && cachedTz === tz) {
          setBibleVerse(JSON.parse(cachedVerse));
          setLoading(false);
          return;
        }

        //? Otherwise, fetch a fresh one for the new day
        const response = await fetch(`${baseUrl}/bible`, {
          headers: { "X-Timezone": tz },
        });
        if (!response.ok) throw new Error("Failed to fetch the daily verse");

        const data = await response.json();
        const verseData = data?.data;

        //? Update state and store it in localStorage with today's date
        setBibleVerse(verseData);
        localStorage.setItem("daily_verse_date", today);
        localStorage.setItem("daily_verse_data", JSON.stringify(verseData));
        localStorage.setItem("daily_verse_tz", tz);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, [today, tz]);

  //   console.log(bibleVerse)

  return { bibleVerse, loading, error };
}
