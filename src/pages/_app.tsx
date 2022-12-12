import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/navigation/Navigation";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { useContext } from "react";
import { NavigationProvider } from "../contexts/SidebarContext";

export default function App({ Component, pageProps }: AppProps) {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
