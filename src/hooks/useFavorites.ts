import type { FavoriteState } from "../types/favorite";
import type { Album, Artist, Track } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteState>(
    "muse-favorites",
    { artists: [], albums: [], tracks: [] },
  );

  const toggleFavorite = (
    item: Artist | Album | Track,
    type: "artists" | "albums" | "tracks",
  ) => {
    const exists = favorites[type].some((favorite) => favorite.id === item.id);

    if (exists) {
      setFavorites((prev) => ({
        ...prev,
        [type]: prev[type].filter((favorite) => favorite.id !== item.id),
      }));
    } else {
      setFavorites((prev) => ({
        ...prev,
        [type]: [...prev[type], item],
      }));
    }
  };

  return { favorites, toggleFavorite };
}
