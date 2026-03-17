import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import {
  NavigationProvider,
  useNavigationLoading,
} from "./contexts/NavigationContext";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import MobileFooter from "./assets/components/Footer/MobileFooter";
import Main from "./assets/components/Main";
import ProductDetail from "./pages/ProductDetail";
import { Spinner } from "flowbite-react";

function RouterLoader() {
  const { isLoading, stopLoading } = useNavigationLoading();
  const location = useLocation();

  useEffect(() => {
    // Stop loading on route change (for back/forward or direct link).
    stopLoading();
  }, [location, stopLoading]);

  if (!isLoading) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/90 px-6 py-4 shadow-xl">
        <Spinner aria-label="Loading" />
        <span className="text-sm font-medium text-gray-700">Loading…</span>
      </div>
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mql.matches);
    mql.addEventListener?.("change", handleChange);
    mql.addListener?.(handleChange);

    return () => {
      mql.removeEventListener?.("change", handleChange);
      mql.removeListener?.(handleChange);
    };
  }, []);

  return isMobile;
}

function AppRouter() {
  const isMobile = useIsMobile();

  return (
    <BrowserRouter>
      <Header />
      <RouterLoader />

      <div className="pt-28 pb-32 lg:pt-0 lg:pb-0">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Main showHero />
                <Footer />
                {isMobile && <MobileFooter />}
              </>
            }
          />
          <Route
            path="/shop"
            element={
              <>
                <Main showHero={false} />
                <Footer />
                {isMobile && <MobileFooter />}
              </>
            }
          />
          <Route
            path="/products/:id"
            element={
              <>
                <ProductDetail />
                <Footer />
                {isMobile && <MobileFooter />}
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppRouter />
    </NavigationProvider>
  );
}
