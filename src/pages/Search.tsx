import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ArtistCard from "../components/ui/ArtistCard";
import AlbumCard from "../components/ui/AlbumCard";
import TrackItem from "../components/ui/TrackItem";
import EmptyState from "../components/ui/EmptyState";
import { searchAlbums, searchArtists, searchTracks } from "../services/lastfm";
import {
  mapLastFmAlbum,
  mapLastFmArtist,
  mapLastFmTrack,
} from "../services/mappers";
import type { Album, Artist, FavoritesContext, Track } from "../types";
import { useOutletContext } from "react-router";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

export default function Search() {
  const { favorites, toggleFavorite } = useOutletContext<FavoritesContext>();

  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState({
    artists: false,
    albums: false,
    tracks: false,
  });
  const [error, setError] = useState({
    artists: "",
    albums: "",
    tracks: "",
  });

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(query.toLowerCase().trim()),
  );

  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(query.toLowerCase().trim()) ||
      album.artist.toLowerCase().includes(query.toLowerCase().trim()),
  );

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query.toLowerCase().trim()) ||
      track.artist.toLowerCase().includes(query.toLowerCase().trim()),
  );

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    async function fetchArtists() {
      setIsLoading((prev) => ({
        ...prev,
        artists: true,
      }));

      setError((prev) => ({
        ...prev,
        artists: "",
      }));

      try {
        const artists = await searchArtists(query);

        const mappedArtists = artists.map((artist) => {
          return mapLastFmArtist(artist);
        });

        setArtists(mappedArtists);
      } catch {
        setError((prev) => ({
          ...prev,
          artists: "Failed to search artists",
        }));
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          artists: false,
        }));
      }
    }

    async function fetchAlbums() {
      setIsLoading((prev) => ({
        ...prev,
        albums: true,
      }));

      setError((prev) => ({
        ...prev,
        albums: "",
      }));

      try {
        const albums = await searchAlbums(query);

        const mappedAlbums = albums.map((album) => {
          return mapLastFmAlbum(album);
        });

        setAlbums(mappedAlbums);
      } catch {
        setError((prev) => ({
          ...prev,
          albums: "Failed to search albums",
        }));
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          albums: false,
        }));
      }
    }

    async function fetchTracks() {
      setIsLoading((prev) => ({
        ...prev,
        tracks: true,
      }));

      setError((prev) => ({
        ...prev,
        tracks: "",
      }));

      try {
        const tracks = await searchTracks(query);

        const mappedTracks = tracks.map((track) => {
          return mapLastFmTrack(track);
        });

        setTracks(
          [...mappedTracks]
            .sort((a, b) => b.listeners - a.listeners)
            .slice(0, 10),
        );
      } catch {
        setError((prev) => ({
          ...prev,
          tracks: "Failed to search tracks",
        }));
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          tracks: false,
        }));
      }
    }

    const timeoutId = setTimeout(() => {
      fetchArtists();
      fetchAlbums();
      fetchTracks();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <section className="px-5 py-6 md:px-8 md:py-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Explore
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary-text md:text-4xl">
          Search music
        </h1>

        <p className="mt-3 max-w-2xl text-secondary-text">
          Find artists, albums and tracks.
        </p>
      </div>

      <div className="relative mt-8 max-w-2xl">
        <SearchIcon
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-text"
        />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for an artist, album or track..."
          className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-4 text-primary-text outline-none placeholder:text-muted-text focus:border-accent"
        />
      </div>

      <div className="mt-10">
        {!query.trim() ? (
          <p className="text-secondary-text">
            Start typing to search for music.
          </p>
        ) : (
          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-semibold text-primary-text">
                Artists
              </h2>
              {isLoading.artists ? (
                <LoadingState message="Searching artists..." />
              ) : error.artists ? (
                <ErrorState message={error.artists} />
              ) : filteredArtists.length > 0 ? (
                <div className="scrollbar-dark mt-5 flex gap-6 overflow-x-auto pb-2">
                  {filteredArtists.map((artist) => (
                    <ArtistCard
                      key={artist.id}
                      artist={artist}
                      isFavorite={favorites.artists.some(
                        (favorite) => favorite.id === artist.id,
                      )}
                      onFavorite={() => toggleFavorite(artist, "artists")}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <EmptyState
                    title="No artists found"
                    description="Try searching for another artist."
                  />
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary-text">
                Albums
              </h2>

              {isLoading.albums ? (
                <LoadingState message="Searching albums..." />
              ) : error.albums ? (
                <ErrorState message={error.albums} />
              ) : filteredAlbums.length > 0 ? (
                <div className="scrollbar-dark mt-5 flex gap-5 overflow-x-auto pb-2">
                  {filteredAlbums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      isFavorite={favorites.albums.some(
                        (favorite) => favorite.id === album.id,
                      )}
                      onFavorite={() => toggleFavorite(album, "albums")}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <EmptyState
                    title="No albums found"
                    description="Try searching for another album."
                  />
                </div>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold text-primary-text">
                Tracks
              </h2>

              {isLoading.tracks ? (
                <LoadingState message="Searching tracks..." />
              ) : error.tracks ? (
                <ErrorState message={error.tracks} />
              ) : filteredTracks.length > 0 ? (
                <div className="mt-5 divide-y divide-border rounded-xl border border-border">
                  {filteredTracks.map((track, index) => (
                    <TrackItem
                      key={track.id}
                      position={index + 1}
                      track={track}
                      isFavorite={favorites.tracks.some(
                        (favorite) => favorite.id === track.id,
                      )}
                      onFavorite={() => toggleFavorite(track, "tracks")}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <EmptyState
                    title="No tracks found"
                    description="Try searching for another track."
                  />
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
