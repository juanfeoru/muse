import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ArtistCard from "../components/ui/ArtistCard";
import AlbumCard from "../components/ui/AlbumCard";
import TrackItem from "../components/ui/TrackItem";
import EmptyState from "../components/ui/EmptyState";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

import { searchAlbums, searchArtists, searchTracks } from "../services/lastfm";

import {
  mapLastFmAlbum,
  mapLastFmArtist,
  mapLastFmTrack,
} from "../services/mappers";

import type { Album, Artist, Track } from "../types";
import { useFavoritesContext } from "../context/useFavoritesContext";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default function Search() {
  const {
    favoriteArtistIds,
    favoriteAlbumIds,
    favoriteTrackIds,
    toggleFavorite,
  } = useFavoritesContext();

  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query.trim(), 500);

  const {
    data: artists = [],
    isLoading: isLoadingArtists,
    error: artistsError,
  } = useQuery<Artist[]>({
    queryKey: ["search", "artists", debouncedQuery],
    queryFn: async ({ signal }) => {
      const artists = await searchArtists(debouncedQuery, signal);

      return artists
        .map(mapLastFmArtist)
        .sort((a, b) => b.listeners - a.listeners);
    },
    enabled: debouncedQuery.length > 0,
  });

  const {
    data: albums = [],
    isLoading: isLoadingAlbums,
    error: albumsError,
  } = useQuery<Album[]>({
    queryKey: ["search", "albums", debouncedQuery],
    queryFn: async ({ signal }) => {
      const albums = await searchAlbums(debouncedQuery, signal);

      return albums.map(mapLastFmAlbum);
    },
    enabled: debouncedQuery.length > 0,
  });

  const {
    data: tracks = [],
    isLoading: isLoadingTracks,
    error: tracksError,
  } = useQuery<Track[]>({
    queryKey: ["search", "tracks", debouncedQuery],
    queryFn: async ({ signal }) => {
      const tracks = await searchTracks(debouncedQuery, signal);

      return tracks
        .map(mapLastFmTrack)
        .sort((a, b) => b.listeners - a.listeners)
        .slice(0, 10);
    },
    enabled: debouncedQuery.length > 0,
  });

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

              {isLoadingArtists ? (
                <LoadingState message="Searching artists..." />
              ) : artistsError ? (
                <ErrorState message="Failed to search artists" />
              ) : artists.length > 0 ? (
                <div className="scrollbar-dark mt-5 flex gap-6 overflow-x-auto pb-2">
                  {artists.map((artist) => (
                    <ArtistCard
                      key={artist.id}
                      artist={artist}
                      isFavorite={favoriteArtistIds.has(artist.id)}
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

              {isLoadingAlbums ? (
                <LoadingState message="Searching albums..." />
              ) : albumsError ? (
                <ErrorState message="Failed to search albums" />
              ) : albums.length > 0 ? (
                <div className="scrollbar-dark mt-5 flex gap-5 overflow-x-auto pb-2">
                  {albums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      isFavorite={favoriteAlbumIds.has(album.id)}
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

              {isLoadingTracks ? (
                <LoadingState message="Searching tracks..." />
              ) : tracksError ? (
                <ErrorState message="Failed to search tracks" />
              ) : tracks.length > 0 ? (
                <div className="mt-5 divide-y divide-border rounded-xl border border-border">
                  {tracks.map((track, index) => (
                    <TrackItem
                      key={track.id}
                      position={index + 1}
                      track={track}
                      isFavorite={favoriteTrackIds.has(track.id)}
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
