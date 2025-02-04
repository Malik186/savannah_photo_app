import "../styles/globals.css";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { useRouter } from "next/router";
import store from "../store";

function AuthGuard({ children }) {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const authRequired = !["/login", "/register"].includes(router.pathname);

  useEffect(() => {
    if (authRequired && !userInfo) {
      router.push("/login"); //Redirect if user is not authenticated
    }
  }, [userInfo, authRequired]);

  return children;
}

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </Provider>
  );
}
