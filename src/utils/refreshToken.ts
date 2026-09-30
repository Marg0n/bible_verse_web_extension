import { baseUrl } from "../helper/BaseUrl";

//* Call on 401
export async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${baseUrl}/auth/refresh`, {
      method: "POST",
      credentials: "include", //? browser auto-sends the httpOnly cookie
    });

    if (!res.ok) return null;

    const jsonData = await res.json();
    const newToken = jsonData.data.access_token;
    sessionStorage.setItem("access_token", newToken);
    return newToken;
  } catch {
    return null;
  }
}
