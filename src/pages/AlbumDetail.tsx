import { ArrowLeft, Heart, Headphones, Play, Disc3 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import type { AlbumDetail } from "../types/album";
import { useState } from "react";
import { useFavoritesContext } from "../context/useFavoritesContext";
import { useQuery } from "@tanstack/react-query";
import { getAlbumInfo } from "../services/lastfm";
import { mapLastFmAlbumInfo } from "../services/mappers";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import TrackItem from "../components/ui/TrackItem";

export default function AlbumDetail() {
  const [imageError, setImageError] = useState(false);

  const { artistId, albumId } = useParams<{
    artistId: string;
    albumId: string;
  }>();

  const decodedArtist = artistId ? decodeURIComponent(artistId) : undefined;

  const decodedAlbum = albumId ? decodeURIComponent(albumId) : undefined;

  const navigate = useNavigate();

  const { favoriteAlbumIds, favoriteTrackIds, toggleFavorite } =
    useFavoritesContext();

  const {
    data: album,
    isLoading: isLoadingAlbum,
    error: albumError,
  } = useQuery<AlbumDetail>({
    queryKey: ["album", decodedArtist, decodedAlbum],
    queryFn: async ({ signal }) => {
      const data = await getAlbumInfo(decodedArtist!, decodedAlbum!, signal);

      return mapLastFmAlbumInfo(data);
    },
    enabled: Boolean(decodedArtist && decodedAlbum),
  });

  console.error("album query error", albumError);

  if (isLoadingAlbum) {
    return <LoadingState message="Loading album..." />;
  }

  if (!album) {
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
          {albumError ? (
            <ErrorState message="Failed to fetch album info" />
          ) : (
            <ErrorState message="Album not found" />
          )}
        </div>
      </section>
    );
  }

  const isFavorite = favoriteAlbumIds.has(album.id);

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

      <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="mx-auto size-40 shrink-0 overflow-hidden rounded-xl bg-surface-hover sm:mx-0 sm:size-44 lg:size-56">
            {album.image && !imageError ? (
              <img
                src={album.image}
                alt={album.name}
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-text">
                <Disc3 size={40} />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              Album
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary-text sm:text-4xl lg:text-5xl">
              {album.name}
            </h1>

            <p className="mt-2 inline-block text-lg text-secondary-text transition-colors hover:text-accent">
              <Link to={`/artist/${encodeURIComponent(album.artist)}`}>
                {album.artist}
              </Link>
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {album.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-hover px-3 py-1 text-sm text-secondary-text capitalize"
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
                    id: album.id,
                    title: album.name,
                    artist: album.artist,
                    image: album.image,
                  },
                  "albums",
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
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-muted-text">
            <Headphones size={17} />
            <span className="text-sm">Listeners</span>
          </div>

          <p className="mt-2 text-2xl font-semibold text-primary-text">
            {album.listeners.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-muted-text">
            <Play size={17} />
            <span className="text-sm">Scrobbles</span>
          </div>

          <p className="mt-2 text-2xl font-semibold text-primary-text">
            {album.playcount.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-muted-text">
            <Disc3 size={17} />
            <span className="text-sm">Tracks</span>
          </div>

          <p className="mt-2 text-2xl font-semibold text-primary-text">
            {album.tracks.length ?? 0}
          </p>
        </div>
      </section>

      {album.summary && (
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-primary-text">About</h2>

          <p className="mt-4 max-w-3xl leading-7 text-secondary-text">
            {album.summary}
          </p>
      </section>

      )}


      {album.tracks.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-primary-text">Tracklist</h2>

          <div className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
            {album.tracks.map((track) => (
              <TrackItem
                key={track.id}
                track={track}
                position={track.rank}
                isFavorite={favoriteTrackIds.has(track.id)}
                onFavorite={() => toggleFavorite(track, "tracks")}
              />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
