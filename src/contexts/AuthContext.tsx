import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

type SignInType = { email: string; password: string };

type UserType = {
  id: string | number;
  name: string;
  email: string;
  permissions: string[];
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  signIn: (data: SignInType) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserType | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "restaurantApp.token": token } = parseCookies();

    if (token)
      api.post("get-auth-user").then(({ data }: AxiosResponse<any, any>) => {
        setUser(data);
      });
  }, []);

  const signIn = async (data: SignInType) => {
    const { token, user } = await api
      .post("login", {
        ...data,
      })
      .then((response: AxiosResponse) => response.data);

    setCookie(undefined, "restaurantApp.token", token, {
      maxAge: 60 * 60,
    });

    setUser(user);

    Router.push("dashboard");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
