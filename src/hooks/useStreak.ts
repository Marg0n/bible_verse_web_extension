import { useState } from "react";

export function useStreak() {
  const [streak] = useState(() => {
    const saved = localStorage.getItem("streak");
    const prev = saved ? JSON.parse(saved) : { count: 0, lastVisit: "" };

    const today = new Date().toDateString();

    //? If user already visited today => do nothing
    if (prev.lastVisit === today) {
      return prev;
    }

    const lastDate = prev.lastVisit ? new Date(prev.lastVisit) : null;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let newCount = prev.count;

    //? First visit OR visited yesterday
    if (!lastDate || lastDate.toDateString() === yesterday.toDateString()) {
      newCount += 1;
    } else {
      newCount = 1; //? Missed a day
    }

    const newStreak = { count: newCount, lastVisit: today };
    localStorage.setItem("streak", JSON.stringify(newStreak));

    return newStreak;
  });

  return streak.count;
}
