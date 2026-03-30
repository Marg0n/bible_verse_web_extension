import type { Verse } from '../types'

const MOCK_VERSES: Verse[] = [
    {
        reference: "Jeremiah 29:11",
        verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        text: "কারণ আমি জানি তোমাদের জন্য আমার কী পরিকল্পনা আছে, সদাপ্রভু বলেন, সেগুলো শান্তির পরিকল্পনা, অনিষ্টের নয়।"
    },
    {
        reference: "John 3:16",
        verse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        text: "কারণ ঈশ্বর জগতকে এত ভালোবাসলেন যে তিনি তাঁর একমাত্র পুত্রকে দিলেন।"
    },
    {
        reference: "Philippians 4:13",
        verse: "I can do all this through him who gives me strength.",
        text: "যিনি আমাকে শক্তি দেন তাঁর মাধ্যমে আমি সব কিছু করতে পারি।"
    },
    {
        reference: "Psalm 23:1",
        verse: "The Lord is my shepherd, I lack nothing.",
        text: "সদাপ্রভু আমার মেষপালক, আমার কোনো অভাব নেই।"
    },
    {
        reference: "Isaiah 40:31",
        verse: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
        text: "কিন্তু যারা সদাপ্রভুর প্রতীক্ষায় থাকে তারা নতুন শক্তি পাবে, তারা ঈগলের মতো ডানা মেলে উড়বে।"
    }
]

export function getDailyVerse(): Verse {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    return MOCK_VERSES[dayOfYear % MOCK_VERSES.length]
}

export function getRandomVerse(): Verse {
    return MOCK_VERSES[Math.floor(Math.random() * MOCK_VERSES.length)]
}