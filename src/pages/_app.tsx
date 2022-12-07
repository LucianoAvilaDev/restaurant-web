import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Navigation from "../components/navigation/Navigation";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { useContext } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <AuthProvider>
      {isAuthenticated ? (
        <Navigation>
          <Component {...pageProps} />
        </Navigation>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}
