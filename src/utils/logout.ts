import { baseUrl } from "../helper/BaseUrl";

export async function logout() {
  try {
    //? Call backend to clear the httpOnly cookie + revoke server-side
    await fetch(`${baseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include", //? sends the cookie so the server can clear it
    });
  } catch {
    //? Even if the call fails, clear local state
  } finally {
    // sessionStorage.removeItem("access_token");
    // sessionStorage.removeItem("user");
    await chrome.storage.session.remove(["access_token", "user"]);
    //? Notify the UI
    window.dispatchEvent(new Event("auth:logout"));
  }
}
