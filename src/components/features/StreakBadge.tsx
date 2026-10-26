import type { UserData } from "../../types/UserData.types";

export default function StreakBadge({ user }: { user: UserData | null }) {
  // const streakCount = useStreak();
  const streakCount = user?.streakCount || 0;

  // if (streakCount === 0) return null;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 group hover:bg-orange-500/20 transition-colors cursor-default">
      <span className="text-sm">🔥</span>
      <span className="text-xs font-bold text-orange-500 tracking-tight">
        {streakCount}
      </span>
    </div>
  );
}
