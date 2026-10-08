import { createContext } from "react";
import type { Album, Artist, Track } from "../types";
import type { FavoriteState } from "../types/favorite";

interface FavoritesContextValue {
  favorites: FavoriteState;
  toggleFavorite: (
    item: Artist | Album | Track,
    type: "artists" | "albums" | "tracks",
  ) => void;
  favoriteArtistIds: Set<string>;
  favoriteAlbumIds: Set<string>;
  favoriteTrackIds: Set<string>;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);
