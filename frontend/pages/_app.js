import "../styles/globals.css";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { useRouter } from "next/router";
import store from "../store";
import Navbar from "../components/Navbar"; //Import Navbar

function AuthGuard({ children }) {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const authRequired = !["/login", "/register"].includes(router.pathname);

  useEffect(() => {
    if (authRequired && !userInfo) {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [userInfo, authRequired]);

  return children;
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const authPages = ["/login", "/register"]; //  login/register pages

  return (
    <Provider store={store}>
      {!authPages.includes(router.pathname) && <Navbar />} {/*Shows Navbar only on authenticated pages */}
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </Provider>
  );
}
