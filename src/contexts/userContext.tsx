"use client";

import logout from "@/actions/logout";
import validateToken from "@/actions/validate-token";
import {
  ReactNode,
  useContext,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";

interface UserInterface {
  id: number;
  nome: string;
  username: string;
  email: string;
}

interface UserContextInterface {
  user: UserInterface | null;
  setUser: Dispatch<SetStateAction<UserInterface | null>>;
}

const UserContext = createContext<UserContextInterface | null>(null);

export function UserContextProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserInterface | null;
}) {
  const [userState, setUser] = useState<UserInterface | null>(user);

  useEffect(() => {
    async function validate() {
      const { ok } = await validateToken();
      if (!ok) await logout();
    }
    if (userState) validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Erro no UserContext");
  return context;
}
