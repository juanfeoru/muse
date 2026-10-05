import ArtistCard from "../components/ui/ArtistCard";
import AlbumCard from "../components/ui/AlbumCard";
import EmptyState from "../components/ui/EmptyState";
import TrackItem from "../components/ui/TrackItem";
import { useOutletContext } from "react-router";
import type { FavoritesContext } from "../types/favorite";

export default function Favorites() {
  const { favorites, toggleFavorite } = useOutletContext<FavoritesContext>();

  return (
    <section className="px-5 py-6 md:px-8 md:py-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Your collection
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary-text md:text-4xl">
          Favorites
        </h1>

        <p className="mt-3 max-w-2xl text-secondary-text">
          Keep your favorite music in one place.
        </p>
      </div>

      <div className="mt-10 space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-primary-text">Artists</h2>

          {favorites.artists.length > 0 ? (
            <div className="mt-5 flex gap-6 overflow-x-auto pb-2">
              {favorites.artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  isFavorite={true}
                  onFavorite={() => toggleFavorite(artist, "artists")}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <EmptyState title="You don't have any favorite artists yet" />
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary-text">Albums</h2>

          {favorites.albums.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {favorites.albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  isFavorite={true}
                  onFavorite={() => toggleFavorite(album, "albums")}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <EmptyState title="You don't have any favorite albums yet" />
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-primary-text">Tracks</h2>

          {favorites.tracks.length > 0 ? (
            <div className="mt-5 divide-y divide-border rounded-xl border border-border">
              {favorites.tracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  position={index + 1}
                  track={track}
                  isFavorite={true}
                  onFavorite={() => toggleFavorite(track, "tracks")}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <EmptyState title="You don't have any favorite tracks yet" />
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
