import type { ReactNode } from "react";

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-md mx-auto min-h-[40svh] p-6 bg-white rounded-xl shadow-md animate-fade-in">
      {children}
    </div>
  );
}
