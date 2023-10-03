"use client";

import { FiLogOut } from "react-icons/fi";
import { useAuth } from "~/hooks/useAuth";

export function ButtonSignOnt() {
  const { signOut } = useAuth();

  return (
    <button
      onClick={signOut}
      className="flex items-center gap-1 py-1 text-lg text-zinc-500"
    >
      <FiLogOut />
      Sair
    </button>
  );
}
