"use client";

import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useAuth } from "~/hooks/useAuth";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    redirect("/courses");
  }

  return <div>{children}</div>;
}
