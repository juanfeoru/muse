import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import type { FavoriteState } from "../../types/favorite";
import type { Album, Artist, Track } from "../../types";

interface AppLayoutProps {
  favorites: FavoriteState;
  toggleFavorite: (
    item: Artist | Album | Track,
    type: "artists" | "albums" | "tracks",
  ) => void;
}

export default function AppLayout({
  favorites,
  toggleFavorite,
}: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary-text md:flex-row">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Outlet context={{ favorites, toggleFavorite }} />
      </main>
    </div>
  );
}
