import { Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import Discover from "./pages/Discover";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ArtistDetail from "./pages/ArtistDetail";
import AlbumDetail from "./pages/AlbumDetail";
import { FavoritesProvider } from "./context/FavoritesProvider";
import NotFound from "./pages/NotFound";
import RouteError from "./pages/RouteError";

export default function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route element={<AppLayout />} errorElement={<RouteError />}>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/artist/:identifier" element={<ArtistDetail />} />
          <Route path="/album/:artistId/:albumId" element={<AlbumDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}
