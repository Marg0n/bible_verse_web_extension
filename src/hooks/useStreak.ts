import { useEffect } from "react";
import { baseUrl } from "../helper/BaseUrl";

export const useUpdateStreak = (
  isLoggedIn: boolean,
  onStreakUpdated?: (newStreak: number) => void,
) => {
  useEffect(() => {
    if (!isLoggedIn) return;

    const recordStreak = async () => {
      try {
        //? Retrieve the access token from chrome.storage.session
        const { access_token } =
          await chrome.storage.session.get("access_token");
        if (!access_token) return;

        const res = await fetch(`${baseUrl}/streak`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!res.ok) return;

        const data = await res.json();
        // Assuming your StreakResponseDto returns the updated streak count (e.g., { streakCount: 5 })
        if (data?.success && data?.data?.streakCount !== undefined) {
          onStreakUpdated?.(data.data.streakCount);
        }
      } catch (err) {
        console.error("Failed to update streak:", err);
      }
    };

    recordStreak();
  }, [isLoggedIn]);
};
