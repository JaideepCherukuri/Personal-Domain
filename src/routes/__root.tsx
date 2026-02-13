import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import SmoothScroll from "../components/SmoothScroll";
import { Analytics } from "@vercel/analytics/react"

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <SmoothScroll>
      <div className="mx-auto max-w-[90rem] min-h-screen bg-black text-[#FBFDE2]">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <Analytics />
    </SmoothScroll>
  );
}
