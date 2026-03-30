import { useState, useEffect } from 'react';

export function useStreak() {
    const [streak, setStreak] = useState(() => {
        const saved = localStorage.getItem('streak');
        return saved ? JSON.parse(saved) : { count: 0, lastVisit: '' };
    });

    useEffect(() => {
        const today = new Date().toDateString();
        if (streak.lastVisit !== today) {
            const lastDate = streak.lastVisit ? new Date(streak.lastVisit) : null;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            let newCount = streak.count;
            if (!lastDate || lastDate.toDateString() === yesterday.toDateString()) {
                newCount += 1;
            } else if (lastDate.toDateString() !== today) {
                newCount = 1;
            }

            const newStreak = { count: newCount, lastVisit: today };
            setStreak(newStreak);
            localStorage.setItem('streak', JSON.stringify(newStreak));
        }
    }, []);

    return streak.count;
}
