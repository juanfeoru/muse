import { ArrowLeft, Headphones, Heart, Play } from "lucide-react";
import ArtistCard from "../components/ui/ArtistCard";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { getArtistInfo } from "../services/lastfm";
import { useEffect, useState } from "react";
import type { ArtistDetail } from "../types/artist";
import { maplastFmArtistInfo } from "../services/mappers";
import type { FavoritesContext } from "../types";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

export default function ArtistDetail() {
  const [artist, setArtist] = useState<ArtistDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { identifier } = useParams<{ identifier: string }>();

  const navigate = useNavigate();

  const { favorites, toggleFavorite } = useOutletContext<FavoritesContext>();

  useEffect(() => {
    async function loadArtistInfo() {
      setLoading(true);
      setError(null);

      if (!identifier) {
        setError("Artist not found");
        setLoading(false);
        return;
      }

      try {
        const data = await getArtistInfo(identifier);

        const artist = maplastFmArtistInfo(data);

        setArtist(artist);
      } catch {
        setError("Failed to fetch artist info");
      } finally {
        setLoading(false);
      }
    }

    loadArtistInfo();
  }, [identifier]);

  if (loading) {
    return <LoadingState message="Loading artist..." />;
  }

  if (error || !artist) {
    return (
      <section className="px-5 py-6 md:px-8 md:py-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex cursor-pointer items-center gap-2 text-sm text-secondary-text transition-colors hover:text-primary-text"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="mt-8">
          <ErrorState message={error ?? "Artist not found"} />
        </div>
      </section>
    );
  }

  const isFavorite = favorites.artists.some(
    (favorite) => favorite.id === artist.id,
  );

  return (
    <section className="px-5 py-6 md:px-8 md:py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-secondary-text transition-colors hover:text-primary-text cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="mx-auto size-40 shrink-0 overflow-hidden rounded-full bg-surface-hover sm:mx-0 sm:size-44 lg:size-56">
            {artist.image ? (
              <img
                src={artist.image}
                alt={artist.name}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-text">
                <Headphones size={40} />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              Artist
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary-text sm:text-4xl lg:text-5xl">
              {artist.name}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {artist.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-hover px-3 py-1 text-sm text-secondary-text"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                toggleFavorite(
                  {
                    id: artist.id,
                    name: artist.name,
                    image: artist.image,
                    listeners: Number(artist.listeners),
                  },
                  "artists",
                )
              }
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-primary-text transition-colors hover:bg-surface-hover"
            >
              <Heart
                size={17}
                className={isFavorite ? "fill-accent text-accent" : ""}
              />

              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>
          </div>
        </div>{" "}
      </section>

      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:max-w-xl">
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-muted-text">
            <Headphones size={17} />

            <span className="text-sm">Listeners</span>
          </div>

          <p className="mt-2 text-2xl font-semibold text-primary-text">
            {Number(artist.listeners).toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-muted-text">
            <Play size={17} />

            <span className="text-sm">Scrobbles</span>
          </div>

          <p className="mt-2 text-2xl font-semibold text-primary-text">
            {Number(artist.playcount).toLocaleString()}
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-primary-text">About</h2>

        <p className="mt-4 max-w-3xl leading-7 text-secondary-text">
          {artist.bio}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-primary-text">
          Similar Artists
        </h2>

        <div className="scrollbar-dark mt-5 flex gap-6 overflow-x-auto pb-2">
          {artist.similar.map((similarArtist) => {
            const similarArtistData = {
              id: similarArtist.name,
              name: similarArtist.name,
              image: similarArtist.image,
              listeners: 0,
            };

            return (
              <ArtistCard
                key={similarArtist.name}
                artist={similarArtistData}
                isFavorite={favorites.artists.some(
                  (favorite) => favorite.id === similarArtistData.id,
                )}
                onFavorite={() => toggleFavorite(similarArtistData, "artists")}
              />
            );
          })}
        </div>
      </section>
    </section>
  );
}
