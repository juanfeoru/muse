import { Heart } from "lucide-react";
import type { Track } from "../../types";

interface TrackItemProps {
  position: number;
  track: Track;
  isFavorite: boolean;
  onFavorite: () => void;
}

export default function TrackItem({
  position,
  track,
  isFavorite,
  onFavorite,
}: TrackItemProps) {
  return (
    <div className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface-hover">
      <span className="w-5 text-center text-sm text-muted-text">
        {position}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-primary-text">{track.title}</p>

        <p className="truncate text-sm text-secondary-text">{track.artist}</p>
      </div>

      <button
        type="button"
        onClick={onFavorite}
        aria-label={
          isFavorite
            ? `Remove ${track.title} from favorites`
            : `Add ${track.title} to favorites`
        }
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-secondary-text transition-all hover:scale-105 hover:bg-surface-hover hover:text-primary-text cursor-pointer"
      >
        <Heart
          size={17}
          className={isFavorite ? "fill-accent text-accent" : ""}
        />
      </button>
    </div>
  );
}
