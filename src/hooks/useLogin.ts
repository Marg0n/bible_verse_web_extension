import { useState, useCallback } from "react";
import { baseUrl } from "../helper/BaseUrl";
import type { LoginResponse } from "../types/LoginResponse.types";

export const useLogin = (onLoginSuccess: () => void) => {
  //* States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //* Handle Login
  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", //? sends/receives cookies
          body: JSON.stringify({ email, password }),
        });

        const data: LoginResponse = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.description || "Login failed");
        }

        const { user, access_token } = data.data;

        //? chrome.storage.session survives popup close/reopen + SW eviction
        await chrome.storage.session.set({
          access_token,
          user,
        });

        // sessionStorage.setItem("access_token", access_token);
        // sessionStorage.setItem("user", JSON.stringify(user));
        //? Refresh token Already in the httpOnly cookie. Nothing to do.

        // console.log(data);

        onLoginSuccess();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Login failed");
      } finally {
        setLoading(false);
      }
    },
    [email, password, onLoginSuccess],
  );

  const reset = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  return {
    email,
    password,
    error,
    loading,
    handleLogin,
    reset,
    setEmail,
    setPassword,
  };
};
