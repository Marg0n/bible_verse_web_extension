import type { Verse } from '../types'

interface Props {
    verse: Verse | null
    loading?: boolean
}

export default function VerseCard({ verse, loading }: Props) {
    if (loading) return (
        <div className="bg-gray-900 border-l-4 border-yellow-400 rounded-xl p-8 max-w-xl w-full shadow-lg animate-pulse">
            <div className="h-4 bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-800 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        </div>
    )

    if (!verse) return (
        <p className="text-gray-400">No verse found.</p>
    )

    return (
        <div className="bg-gray-900 border-l-4 border-yellow-400 rounded-xl p-8 max-w-xl w-full shadow-lg">
            <p className="text-yellow-400 font-bold text-sm mb-4">{verse.reference}</p>
            <p className="text-lg italic text-gray-100 leading-relaxed mb-4">
                "{verse.verse}"
            </p>
            <p className="text-base text-gray-300 leading-relaxed border-t border-gray-700 pt-4">
                "{verse.text}"
            </p>
        </div>
    )
}