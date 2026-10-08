import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import ScrollToTop from "./ScrollToTop";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary-text md:flex-row">
      <ScrollToTop />
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
