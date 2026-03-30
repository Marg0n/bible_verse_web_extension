import { useStreak } from '../../hooks/useStreak';

export default function StreakBadge() {
    const streakCount = useStreak();

    if (streakCount === 0) return null;

    return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 group hover:bg-orange-500/20 transition-colors cursor-default">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-bold text-orange-500 tracking-tight">{streakCount}</span>
        </div>
    );
}
