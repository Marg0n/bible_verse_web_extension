import { useEffect, useState } from "react";

//* Global Date-Time
function getLocalDayKey() {
  const now = new Date();

  //? Normalize to local midnight
  const localMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  return localMidnight.getTime(); //? number = stable comparison
}

function calculateStreak(prev: { lastVisit: number; count: number }) {
  const today = getLocalDayKey();

  //? If user already visited today => do nothing
  if (prev.lastVisit === today) return prev;

  const oneDay = 24 * 60 * 60 * 1000; //? 86400000

  const yesterday = today - oneDay; //? 1 day in ms

  let newCount = prev.count;

  //? First visit OR visited yesterday
  if (!prev.lastVisit || prev.lastVisit === yesterday) {
    newCount += 1;
  } else {
    newCount = 1; //? Missed a day
  }

  return { count: newCount, lastVisit: today };
}

export function useStreak() {
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    const prev = saved ? JSON.parse(saved) : { count: 0, lastVisit: 0 };

    const updated = calculateStreak(prev);
    localStorage.setItem("streak", JSON.stringify(updated));

    return updated;
  });

  //? Sync across tabs
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === "streak" && e.newValue) {
        setStreak(JSON.parse(e.newValue));
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  //? Midnight update
  useEffect(() => {
    function schedule() {
      const now: Date = new Date();
      const nextMidnight: Date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
      );

      const delay = nextMidnight.getTime() - now.getTime();

      const timer = setTimeout(() => {
        setStreak((prev) => {
          const updated = calculateStreak(prev);
          localStorage.setItem("streak", JSON.stringify(updated));
          return updated;
        });

        schedule(); //? loop
      }, delay);

      return timer;
    }

    const timer = schedule();
    return () => clearTimeout(timer);
  }, []);

  return streak.count;
}
