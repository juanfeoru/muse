import { Heart } from "lucide-react";
import type { Album } from "../../types";
import { useState } from "react";
import { Link } from "react-router";

interface AlbumCardProps {
  album: Album;
  isFavorite: boolean;
  onFavorite: () => void;
  layout?: "carousel" | "grid";
}

export default function AlbumCard({
  album,
  isFavorite,
  onFavorite,
  layout,
}: AlbumCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className={`group ${
        layout === "grid"
          ? "w-full min-w-0"
          : "w-36 shrink-0 snap-start sm:w-40"
      }`}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-hover">
        <Link
          to={`/album/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.title)}`}
          aria-label={`View ${album.title}`}
        >
          {album.image && !imageError ? (
            <img
              src={album.image}
              alt={`${album.title} by ${album.artist}`}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-text">
              <span className="text-3xl">♪</span>
            </div>
          )}
        </Link>
        <button
          type="button"
          onClick={onFavorite}
          aria-label={
            isFavorite
              ? `Remove ${album.title} from favorites`
              : `Add ${album.title} to favorites`
          }
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-black/60 text-primary-text backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/80 cursor-pointer"
        >
          <Heart
            size={17}
            className={isFavorite ? "fill-accent text-accent" : ""}
          />
        </button>
      </div>

      <div className="mt-3">
        <h3 className="truncate font-medium text-primary-text">
          {album.title}
        </h3>

        <p className="mt-0.5 truncate text-sm text-secondary-text">
          {album.artist}
        </p>
      </div>
    </article>
  );
}
