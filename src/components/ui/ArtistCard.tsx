import { Heart } from "lucide-react";
import type { Artist } from "../../types";
import { Link } from "react-router";

interface ArtistCardProps {
  artist: Artist;
  isFavorite: boolean;
  onFavorite: () => void;
}

export default function ArtistCard({
  artist,
  isFavorite,
  onFavorite,
}: ArtistCardProps) {
  return (
    <article className="group min-w-32">
      <div className="relative aspect-square overflow-hidden rounded-full bg-surface-hover">
        <Link to={`/artist/${artist.name}`} aria-label={`View ${artist.name}`}>
          {artist.image ? (
            <img
              src={artist.image}
              alt={artist.name}
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
              ? `Remove ${artist.name} from favorites`
              : `Add ${artist.name} to favorites`
          }
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-black/60 text-primary-text backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/80 cursor-pointer"
        >
          <Heart
            size={17}
            className={isFavorite ? "fill-accent text-accent" : ""}
          />
        </button>
      </div>
    </article>
  );
}
