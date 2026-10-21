/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export async function logout() {
  try {
    //? Call backend to clear the httpOnly cookie + revoke server-side
    // await fetch(`${baseUrl}/auth/logout`, {
    //   method: "POST",
    //   credentials: "include", //? sends the cookie so the server can clear it
    // });
    // Call backend using your custom api instance (automatically attaches the Authorization header)
    await api.post("/auth/logout");
  } catch (error: any) {
    //? Even if the call fails, clear local state
    console.error("Logout request failed, clearing local state anyway:", error);
  } finally {
    // sessionStorage.removeItem("access_token");
    // sessionStorage.removeItem("user");

    //? Clear Chrome extension session storage
    await chrome.storage.session.remove(["access_token", "user"]);
    //? Notify the UI
    window.dispatchEvent(new Event("auth:logout"));
  }
}
