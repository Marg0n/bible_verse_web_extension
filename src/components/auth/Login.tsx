import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { LiaBibleSolid } from "react-icons/lia";
import type { LoginProps } from "../../types/auth.types";

export const Login = ({
  onLoginSuccess,
  switchToRegister,
  switchToHome,
}: LoginProps) => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call backend login API
    localStorage.setItem("auth_token", "mock_token_123");
    onLoginSuccess();
  };

  return (
    <Card
      title="Login"
      subtitle="Welcome back! Please login to continue."
      className="p-5 space-y-5! group/card relative overflow-hidden w-80"
    >
      <form
        onSubmit={handleLogin}
        className="p-2 flex items-center flex-col gap-4 justify-center"
      >
        <div className="w-full relative">
          <MdOutlineMail className="absolute top-3.5 left-3 text-[1.2rem] text-slate-400" />
          <input
            type="email"
            placeholder="Email address"
            required
            className="peer border-[#e5eaf2] dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] dark:border-slate-600 border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
          />
        </div>

        <div className="w-full relative">
          <RiLockPasswordLine className="absolute top-3.5 left-3 text-[1.2rem] text-slate-400" />
          <input
            type="password"
            placeholder="Password"
            required
            className="peer border-[#e5eaf2] dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] dark:border-slate-600 border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
          />
        </div>

        <div className="flex flex-col items-center gap-3 w-full mt-2">
          <Button
            type="submit"
            className="w-full hover:bg-gradient-to-t hover:from-green-100 hover:to-violet-200 hover:text-zinc-900 hover:font-semibold transition-all duration-300 hover:cursor-pointer"
            variant="ghost"
          >
            Login
          </Button>

          <button
            type="button"
            onClick={switchToRegister}
            className="text-xs text-blue-400 hover:underline hover:cursor-pointer"
          >
            Don't have an account? Register
          </button>
        </div>
      </form>

      <div
        onClick={switchToHome}
        className="flex justify-center items-center pt-3 mt-4 border-t border-zinc-800/20 flex-col gap-1 cursor-pointer group/home opacity-70 hover:opacity-100 transition-opacity duration-300"
        title="Back to Home"
      >
        <LiaBibleSolid
          size={24}
          className="text-zinc-400 group-hover/home:text-white transition-colors"
        />
        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider group-hover/home:text-zinc-200 transition-colors">
          Home
        </span>
      </div>
    </Card>
  );
};
