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
  ref: string;
  setRef: Function;
  user: UserType | null;
  signIn: (data: SignInType) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserType | null>(null);
  const [ref, setRef] = useState<string>("");

  const isAuthenticated = !!user;

  useEffect(() => {
    if (document) {
      setRef(document.location.href);
    }

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

    api.defaults.headers["Authorization"] = `bearer ${token}`;

    setUser(user);

    Router.push("dashboard");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, ref, setRef }}
    >
      {children}
    </AuthContext.Provider>
  );
}
