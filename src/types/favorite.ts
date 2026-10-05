import type { Album } from "./album";
import type { Artist } from "./artist";
import type { Track } from "./track";

export interface FavoriteState {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface FavoritesContext {
  favorites: FavoriteState;
  toggleFavorite: (
    item: Artist | Album | Track,
    type: "artists" | "albums" | "tracks",
  ) => void;
}
