import { useState } from 'react'
import Header from './components/Header'
import VerseCard from './components/VerseCard'
import { getDailyVerse, getRandomVerse } from './services/api'
import type { Verse } from './types'

export default function App() {
    const [verse, setVerse] = useState<Verse>(getDailyVerse())

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
            <Header />
            <VerseCard verse={verse} loading={false} />
            <div className="flex gap-4 mt-6">
                <button
                    onClick={() => setVerse(getRandomVerse())}
                    className="bg-yellow-400 text-gray-950 font-bold px-6 py-2 rounded-lg hover:bg-yellow-300 transition"
                >
                    🔀 Random Verse
                </button>
                <button
                    onClick={() => setVerse(getDailyVerse())}
                    className="border border-yellow-400 text-yellow-400 font-bold px-6 py-2 rounded-lg hover:bg-yellow-400 hover:text-gray-950 transition"
                >
                    📅 Daily Verse
                </button>
            </div>
        </div>
    )
}