/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { VerseData } from "../types/bible.types";
import { baseUrl } from "../helper/BaseUrl";

const useRandomVerse = () => {
  //* States
  const [randomVerse, setRandomVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomVerse = async () => {
      try {
        const response = await fetch(`${baseUrl}/bible/random`);

        if (!response.ok) {
          throw new Error("Failed to fetch random verse");
        }

        const verseData = await response.json();

        setRandomVerse(verseData?.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomVerse();
  }, []);

  return { randomVerse, error, loading };
};

export default useRandomVerse;
