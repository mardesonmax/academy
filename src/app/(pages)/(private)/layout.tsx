"use client";

import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "~/components/Navbar";
import { useAuth } from "~/hooks/useAuth";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    redirect("login");
  }

  return (
    <div className="h-screen flex">
      <Navbar />

      <div className="flex flex-col p-4 flex-1">{children}</div>
    </div>
  );
}
