import type { VerseData } from "../types/bible.types";

const MOCK_VERSES = [
  {
    book_bn: "যেরেমিয়া",
    book_en: "Jeremiah",
    chapter: 29,
    date: "2026-09-22",
    text_bn:
      "কারণ আমি জানি তোমাদের জন্য আমার কী পরিকল্পনা আছে, সদাপ্রভু বলেন, সেগুলো শান্তির পরিকল্পনা, অনিষ্টের নয়।",
    text_en:
      "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    verse: 11,
    verseId: 24029011,
  },
  {
    book_bn: "যোহন",
    book_en: "John",
    chapter: 3,
    date: "2026-09-22",
    text_bn:
      "কারণ ঈশ্বর জগতকে এত ভালোবাসলেন যে তিনি তাঁর একমাত্র পুত্রকে দিলেন।",
    text_en:
      "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    verse: 16,
    verseId: 43003016,
  },
  {
    book_bn: "ফিলিপ্পীয়",
    book_en: "Philippians",
    chapter: 4,
    date: "2026-09-22",
    text_bn: "যিনি আমাকে শক্তি দেন তাঁর মাধ্যমে আমি সব কিছু করতে পারি।",
    text_en: "I can do all this through him who gives me strength.",
    verse: 13,
    verseId: 50004013,
  },
  {
    book_bn: "সামসংগীত",
    book_en: "Psalm",
    chapter: 23,
    date: "2026-09-22",
    text_bn: "সদাপ্রভু আমার মেষপালক, আমার কোনো অভাব নেই।",
    text_en: "The Lord is my shepherd, I lack nothing.",
    verse: 1,
    verseId: 19023001,
  },
  {
    book_bn: "ইসাইয়া",
    book_en: "Isaiah",
    chapter: 40,
    date: "2026-09-22",
    text_bn:
      "কিন্তু যারা সদাপ্রভুর প্রতীক্ষায় থাকে তারা নতুন শক্তি পাবে, তারা ঈগলের মতো ডানা মেলে উড়বে।",
    text_en:
      "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
    verse: 31,
    verseId: 23040031,
  },
  {
    book_bn: "২ যোহন",
    book_en: "2 John",
    chapter: 1,
    date: "2026-09-21",
    text_bn:
      "যদি কেউ যীশুর বিষয়ে এই সত্য শিক্ষা না নিয়ে তোমাদের কাছে শিক্ষা দিতে আসে, তবে তাকে বাড়িতে গ্রহণ করো না, কোন রকম শুভেচ্ছাও তাকে জানিও না৷",
    text_en:
      "If there come any unto you, and bring not this doctrine, receive him not into your house, neither bid him God speed:",
    verse: 10,
    verseId: 62000009,
  },
];

export function getDailyVerse(): VerseData {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // "2026-09-22"   

  // Simple hash function for the date string
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return MOCK_VERSES[Math.abs(hash) % MOCK_VERSES.length];
}

export function getRandomVerse(): VerseData {
  return MOCK_VERSES[Math.floor(Math.random() * MOCK_VERSES.length)];
}

/**
 * One edge case: an empty string query ("") matches everything since "anything".includes("") is true. A guard is needed.
 */
export function searchVerses(query: string): VerseData[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return MOCK_VERSES.filter(
    (v) =>
      v.book_en.toLowerCase().includes(lowerQuery) ||
      v.book_bn.toLowerCase().includes(lowerQuery) ||
      v.text_en.toLowerCase().includes(lowerQuery) ||
      v.text_bn.toLowerCase().includes(lowerQuery),
  );
}   
