import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import { InitialLoaderProvider } from "../components/InitialLoader";
import { Analytics } from "@vercel/analytics/react"

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <SmoothScroll>
      <InitialLoaderProvider>
        <div className="mx-auto max-w-[90rem] min-h-screen bg-white text-black">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
        <Analytics />
      </InitialLoaderProvider>
    </SmoothScroll>
  );
}
