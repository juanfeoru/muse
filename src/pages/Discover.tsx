import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import ArtistCard from "../components/ui/ArtistCard";
import AlbumCard from "../components/ui/AlbumCard";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

import { useFavoritesContext } from "../context/useFavoritesContext";

import type { Artist, Album } from "../types";

import {
  getTopAlbumsByTag,
  getTopArtistsByTag,
  getTopTags,
} from "../services/lastfm";

import {
  mapLastFmArtist,
  mapLastFmTopAlbum,
  mapLastFmTopTag,
} from "../services/mappers";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";
import GenreChips from "../components/ui/GenreChips";

export default function Discover() {
  const [selectedGenre, setSelectedGenre] = useState<string>();

  const { favoriteArtistIds, favoriteAlbumIds, toggleFavorite } =
    useFavoritesContext();

  const {
    data: tags = [],
    isLoading: isLoadingTags,
    error: tagsError,
  } = useQuery<string[]>({
    queryKey: ["topTags"],
    queryFn: async ({ signal }) => {
      const tags = await getTopTags(signal);

      return tags.map(mapLastFmTopTag).slice(0, 15);
    },
  });

  const activeGenre = selectedGenre ?? tags[0];

  const {
    data: artists = [],
    isLoading: isLoadingArtists,
    error: artistsError,
  } = useQuery<Artist[]>({
    queryKey: ["topArtistsByTag", activeGenre],
    queryFn: async ({ signal }) => {
      const artists = await getTopArtistsByTag(activeGenre!, signal);

      return artists.map(mapLastFmArtist);
    },
    enabled: Boolean(activeGenre),
    placeholderData: keepPreviousData,
  });

  const {
    data: albums = [],
    isLoading: isLoadingAlbums,
    error: albumsError,
  } = useQuery<Album[]>({
    queryKey: ["topAlbumsByTag", activeGenre],
    queryFn: async ({ signal }) => {
      const albums = await getTopAlbumsByTag(activeGenre!, signal);

      return albums.map(mapLastFmTopAlbum);
    },
    enabled: Boolean(activeGenre),
    placeholderData: keepPreviousData,
  });

  return (
    <section className="px-5 py-6 md:px-8 md:py-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Explore
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary-text md:text-4xl">
          Discover music
        </h1>

        <p className="mt-3 max-w-2xl text-secondary-text">
          Explore artists and albums across different genres.
        </p>
      </div>

      <div className="mt-8">
        {isLoadingTags && <LoadingState message="Loading genres..." />}
        {tagsError && <ErrorState message="Failed to fetch genres" />}
        {!isLoadingTags && !tagsError && tags.length > 0 && (
          <GenreChips
            genres={tags}
            selectedGenre={activeGenre ?? ""}
            onSelect={setSelectedGenre}
            bordered
          />
        )}
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-text">Artists</p>

            <h2 className="mt-1 text-2xl font-semibold capitalize text-primary-text">
              {activeGenre}
            </h2>
          </div>

          {!isLoadingArtists && !artistsError && artists.length > 0 && (
            <span className="text-sm text-muted-text">
              {artists.length} results
            </span>
          )}
        </div>

        <div className="mt-6">
          {isLoadingArtists && <LoadingState message="Loading artists..." />}

          {artistsError && <ErrorState message="Failed to fetch artists" />}

          {!isLoadingArtists && !artistsError && artists.length === 0 && (
            <p className="rounded-xl border border-border bg-surface p-6 text-secondary-text">
              No artists found for this genre.
            </p>
          )}

          {!isLoadingArtists && !artistsError && artists.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {artists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  isFavorite={favoriteArtistIds.has(artist.id)}
                  onFavorite={() => toggleFavorite(artist, "artists")}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-16 border-t border-border pt-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-text">Albums</p>

            <h2 className="mt-1 text-2xl font-semibold capitalize text-primary-text">
              {activeGenre}
            </h2>
          </div>

          {!isLoadingAlbums && !albumsError && albums.length > 0 && (
            <span className="text-sm text-muted-text">
              {albums.length} results
            </span>
          )}
        </div>

        <div className="mt-6">
          {isLoadingAlbums && <LoadingState message="Loading albums..." />}

          {albumsError && <ErrorState message="Failed to fetch albums" />}

          {!isLoadingAlbums && !albumsError && albums.length === 0 && (
            <p className="rounded-xl border border-border bg-surface p-6 text-secondary-text">
              No albums found for this genre.
            </p>
          )}

          {!isLoadingAlbums && !albumsError && albums.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  album={album}
                  isFavorite={favoriteAlbumIds.has(album.id)}
                  onFavorite={() => toggleFavorite(album, "albums")}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ScrollToTopButton />
    </section>
  );
}
