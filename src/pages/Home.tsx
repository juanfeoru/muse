import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router";

import ArtistCard from "../components/ui/ArtistCard";
import SectionHeader from "../components/ui/SectionHeader";
import AlbumCard from "../components/ui/AlbumCard";
import TrackItem from "../components/ui/TrackItem";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

import type { Album, Artist, Track } from "../types";
import type { FavoritesContext } from "../types/favorite";

import { getTopAlbums, getTopArtists, getTopTracks } from "../services/lastfm";

import {
  mapLastFmArtist,
  mapLastFmChartTrack,
  mapLastFmTopAlbum,
} from "../services/mappers";

export default function Home() {
  const { favorites, toggleFavorite } = useOutletContext<FavoritesContext>();

  const [selectedGenre, setSelectedGenre] = useState("pop");

  const {
    data: artists = [],
    isLoading: isLoadingArtists,
    error: artistsError,
  } = useQuery<Artist[]>({
    queryKey: ["topArtists"],
    queryFn: async ({ signal }) => {
      const artists = await getTopArtists(signal);
      return artists.map(mapLastFmArtist).slice(0, 15);
    },
  });

  const {
    data: albums = [],
    isLoading: isLoadingAlbums,
    error: albumsError,
  } = useQuery<Album[]>({
    queryKey: ["topAlbums", selectedGenre],
    queryFn: async ({ signal }) => {
      const albums = await getTopAlbums(selectedGenre, signal);

      return albums.map(mapLastFmTopAlbum).slice(0, 15);
    },
  });

  const {
    data: tracks = [],
    isLoading: isLoadingTracks,
    error: tracksError,
  } = useQuery<Track[]>({
    queryKey: ["topTracks"],
    queryFn: async ({ signal }) => {
      const tracks = await getTopTracks(signal);

      return tracks.map(mapLastFmChartTrack).slice(0, 10);
    },
  });

  return (
    <section className="px-5 py-6 md:px-8 md:py-8">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 md:p-10">
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
            Music discovery
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-primary-text md:text-5xl">
            Discover something worth listening to.
          </h1>

          <p className="mt-4 max-w-lg text-secondary-text">
            Explore artists, albums and tracks from every corner of music.
          </p>

          <button
            type="button"
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Explore music
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <section className="mt-10">
        <SectionHeader title="Popular Artists" action="See all" />

        <div className="mt-5">
          {isLoadingArtists && <LoadingState message="Loading artists..." />}

          {artistsError && <ErrorState message="Failed to get top artists" />}

          {!isLoadingArtists && !artistsError && (
            <div className="scrollbar-dark flex gap-6 overflow-x-auto pb-2">
              {artists.map((artist) => (
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
          )}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader title="Popular Albums" action="See all" />

        <div className="mt-5">
          <div className="scrollbar-dark flex gap-2 overflow-x-auto pb-2">
            {["pop", "rock", "disco", "electronic", "hip-hop", "jazz"].map(
              (genre) => (
                <button
                  key={genre}
                  type="button"
                  className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    selectedGenre === genre
                      ? "border-accent bg-accent text-background"
                      : "border-border bg-surface text-secondary-text hover:border-accent/50 hover:text-primary-text"
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ),
            )}
          </div>

          <div className="mt-5">
            {isLoadingAlbums && <LoadingState message="Loading albums..." />}

            {albumsError && <ErrorState message="Failed to get top albums" />}

            {!isLoadingAlbums && !albumsError && (
              <div className="scrollbar-dark flex gap-5 overflow-x-auto pb-2">
                {albums.map((album) => (
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
            )}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader title="Popular Tracks" action="See all" />

        <div className="mt-5">
          {isLoadingTracks && <LoadingState message="Loading tracks..." />}

          {tracksError && <ErrorState message="Failed to get top tracks" />}

          {!isLoadingTracks && !tracksError && (
            <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
              {tracks.map((track, index) => (
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
          )}
        </div>
      </section>
    </section>
  );
}
