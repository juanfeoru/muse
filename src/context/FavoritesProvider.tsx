import { useMemo } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { FavoritesContext } from "./favorites-context";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteArtistIds = useMemo(
    () => new Set(favorites.artists.map((artist) => artist.id)),
    [favorites.artists],
  );

  const favoriteAlbumIds = useMemo(
    () => new Set(favorites.albums.map((album) => album.id)),
    [favorites.albums],
  );

  const favoriteTrackIds = useMemo(
    () => new Set(favorites.tracks.map((track) => track.id)),
    [favorites.tracks],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        favoriteArtistIds,
        favoriteAlbumIds,
        favoriteTrackIds,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
