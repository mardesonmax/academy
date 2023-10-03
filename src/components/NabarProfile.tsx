"use client";

import { useAuth } from "~/hooks/useAuth";

export function NavbarProfile() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center">
      <span className="text-zinc-700 font-bold text-2xl">{user.name}</span>
      <span className="text-zinc-500">{user.role}</span>
    </div>
  );
}
