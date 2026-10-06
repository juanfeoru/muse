import { ArrowRight } from "lucide-react";
import ArtistCard from "../components/ui/ArtistCard";
import SectionHeader from "../components/ui/SectionHeader";
import AlbumCard from "../components/ui/AlbumCard";
import TrackItem from "../components/ui/TrackItem";
import type { Album, Artist, Track } from "../types";
import { useOutletContext } from "react-router";
import type { FavoritesContext } from "../types/favorite";
import { searchArtists } from "../services/lastfm";

const artists: Artist[] = [
  {
    id: "1",
    name: "Ariana Grande",
    genre: "Pop",
    image: "URL_DE_IMAGEN",
  },
  {
    id: "2",
    name: "The Weeknd",
    genre: "R&B",
    image: "URL_DE_IMAGEN",
  },
  {
    id: "3",
    name: "Dua Lipa",
    genre: "Pop",
    image: "URL_DE_IMAGEN",
  },
  {
    id: "4",
    name: "Frank Ocean",
    genre: "R&B",
    image: "URL_DE_IMAGEN",
  },
];

const albums: Album[] = [
  {
    id: "1",
    title: "Eternal Sunshine",
    artist: "Ariana Grande",
    year: 2024,
    image: "URL_DE_IMAGEN",
  },
  {
    id: "2",
    title: "Hurry Up Tomorrow",
    artist: "The Weeknd",
    year: 2025,
    image: "URL_DE_IMAGEN",
  },
  {
    id: "3",
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    year: 2020,
    image: "URL_DE_IMAGEN",
  },
  {
    id: "4",
    title: "Blonde",
    artist: "Frank Ocean",
    year: 2016,
    image: "URL_DE_IMAGEN",
  },
];

const tracks: Track[] = [
  {
    id: "1",
    title: "we can't be friends",
    artist: "Ariana Grande",
    duration: "3:48",
  },
  {
    id: "2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:20",
  },
  {
    id: "3",
    title: "Houdini",
    artist: "Dua Lipa",
    duration: "3:05",
  },
  {
    id: "4",
    title: "Pink + White",
    artist: "Frank Ocean",
    duration: "3:04",
  },
  {
    id: "5",
    title: "Supercut",
    artist: "Lorde",
    duration: "4:11",
  },
];

export default function Home() {
  const { favorites, toggleFavorite } = useOutletContext<FavoritesContext>();

  searchArtists("cher").then((data) => {
    console.log(data);
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
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-medium text-background transition-colors hover:bg-accent-hover cursor-pointer"
          >
            Explore music
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <section className="mt-10">
        <SectionHeader title="Trending Artists" action="See all" />

        <div className="flex gap-6 overflow-x-auto pb-2">
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
      </section>

      <section className="mt-12">
        <SectionHeader title="Popular Albums" action="See all" />

        <div className="flex gap-5 overflow-x-auto pb-2">
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
      </section>

      <section className="mt-12">
        <SectionHeader title="Popular Tracks" action="See all" />

        <div className="divide-y divide-border rounded-xl border border-border">
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
      </section>
    </section>
  );
}
