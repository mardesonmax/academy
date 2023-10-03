"use client";

import { User } from "@prisma/client";
import { useCookies } from "next-client-cookies";
import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { api } from "~/services/api";

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User;
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

interface Props {
  children: ReactNode;
}

interface SignInParams {
  email: string;
  password: string;
}

export function AuthProvider({ children }: Props) {
  const cookiesStore = useCookies();

  const [user, setUser] = useState(() => {
    const userExists = cookiesStore.get("@academy-account");

    if (userExists) {
      return JSON.parse(userExists) as User;
    }

    return {} as User;
  });

  const isAuthenticated = !!user?.id;

  const signOut = useCallback(() => {
    cookiesStore.remove("@academy-account");

    setUser({} as User);
  }, [cookiesStore]);

  const signIn = useCallback(
    async (params: SignInParams) => {
      const response = await api<User>("/account/auth", {
        method: "POST",
        body: JSON.stringify(params),
      });

      cookiesStore.set("@academy-account", JSON.stringify(response));

      setUser(response);
    },
    [cookiesStore]
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      signIn,
      signOut,
    }),
    [isAuthenticated, user, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
