import { Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import Discover from "./pages/Discover";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { useFavorites } from "./hooks/useFavorites";
import ArtistDetail from "./pages/ArtistDetail";

export default function App() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <Routes>
      <Route
        element={
          <AppLayout favorites={favorites} toggleFavorite={toggleFavorite} />
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/artist/:identifier" element={<ArtistDetail />} />
      </Route>
    </Routes>
  );
}
