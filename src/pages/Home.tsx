import { ArrowRight } from "lucide-react";
import ArtistCard from "../components/ui/ArtistCard";
import SectionHeader from "../components/ui/SectionHeader";
import AlbumCard from "../components/ui/AlbumCard";
import TrackItem from "../components/ui/TrackItem";
import type { Album, Artist, Track } from "../types";
import { useOutletContext } from "react-router";
import type { FavoritesContext } from "../types/favorite";
import { getTopAlbums, getTopArtists, getTopTracks } from "../services/lastfm";
import { useEffect, useState } from "react";
import {
  mapLastFmArtist,
  mapLastFmChartTrack,
  mapLastFmTopAlbum,
} from "../services/mappers";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

export default function Home() {
  const { favorites, toggleFavorite } = useOutletContext<FavoritesContext>();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("pop");
  const [loading, setLoading] = useState({
    artists: false,
    tracks: false,
    albums: false,
  });
  const [error, setError] = useState({
    artists: "",
    tracks: "",
    albums: "",
  });

  useEffect(() => {
    async function fetchTopArtists() {
      setLoading((prev) => ({
        ...prev,
        artists: true,
      }));

      setError((prev) => ({
        ...prev,
        artists: "",
      }));

      try {
        const artists = await getTopArtists();

        const mappedArtists = artists.map(mapLastFmArtist).slice(0, 15);

        setArtists(mappedArtists);
      } catch {
        setError((prev) => ({
          ...prev,
          artists: "Failed to get top artists",
        }));
      } finally {
        setLoading((prev) => ({
          ...prev,
          artists: false,
        }));
      }
    }

    async function fetchTopTracks() {
      setLoading((prev) => ({
        ...prev,
        tracks: true,
      }));

      setError((prev) => ({
        ...prev,
        tracks: "",
      }));

      try {
        const tracks = await getTopTracks();

        const mappedTracks = tracks.map(mapLastFmChartTrack).slice(0, 15);

        setTracks(mappedTracks);
      } catch {
        setError((prev) => ({
          ...prev,
          tracks: "Failed to get top tracks",
        }));
      } finally {
        setLoading((prev) => ({
          ...prev,
          tracks: false,
        }));
      }
    }

    fetchTopTracks();
    fetchTopArtists();
  }, []);

  useEffect(() => {
    async function fetchTopAlbums() {
      setLoading((prev) => ({
        ...prev,
        albums: true,
      }));

      setError((prev) => ({
        ...prev,
        albums: "",
      }));

      try {
        const albums = await getTopAlbums(selectedGenre);

        const mappedAlbums = albums.map(mapLastFmTopAlbum).slice(0, 15);

        setAlbums(mappedAlbums);
      } catch {
        setError((prev) => ({
          ...prev,
          albums: "Failed to get top albums",
        }));
      } finally {
        setLoading((prev) => ({
          ...prev,
          albums: false,
        }));
      }
    }

    fetchTopAlbums();
  }, [selectedGenre]);

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
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-medium text-background transition-colors hover:bg-accent-hover cursor-pointer"
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
          {loading.artists && <LoadingState message="Loading artists..." />}

          {error.artists && <ErrorState message={error.artists} />}

          {!loading.artists && !error.artists && artists && (
            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-dark">
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
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors cursor-pointer ${
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
            {loading.albums && <LoadingState message="Loading albums..." />}

            {error.albums && <ErrorState message={error.albums} />}

            {!loading.albums && !error.albums && albums && (
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
          {loading.tracks && <LoadingState message="Loading tracks..." />}

          {error.tracks && <ErrorState message={error.tracks} />}

          {!loading.tracks && !error.tracks && tracks && (
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
