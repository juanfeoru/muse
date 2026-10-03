import { ArrowRight } from "lucide-react";
import ArtistCard from "../components/ui/ArtistCard";
import SectionHeader from "../components/ui/SectionHeader";
import AlbumCard from "../components/ui/AlbumCard";
import TrackItem from "../components/ui/TrackItem";

const artists = [
  {
    name: "Ariana Grande",
    genre: "Pop",
    image: "URL_DE_IMAGEN",
  },
  {
    name: "The Weeknd",
    genre: "R&B",
    image: "URL_DE_IMAGEN",
  },
  {
    name: "Dua Lipa",
    genre: "Pop",
    image: "URL_DE_IMAGEN",
  },
  {
    name: "Frank Ocean",
    genre: "R&B",
    image: "URL_DE_IMAGEN",
  },
];

const albums = [
  {
    title: "Eternal Sunshine",
    artist: "Ariana Grande",
    year: 2024,
    image: "URL_DE_IMAGEN",
  },
  {
    title: "Hurry Up Tomorrow",
    artist: "The Weeknd",
    year: 2025,
    image: "URL_DE_IMAGEN",
  },
  {
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    year: 2020,
    image: "URL_DE_IMAGEN",
  },
  {
    title: "Blonde",
    artist: "Frank Ocean",
    year: 2016,
    image: "URL_DE_IMAGEN",
  },
];

const tracks = [
  {
    title: "we can't be friends",
    artist: "Ariana Grande",
    duration: "3:48",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:20",
  },
  {
    title: "Houdini",
    artist: "Dua Lipa",
    duration: "3:05",
  },
  {
    title: "Pink + White",
    artist: "Frank Ocean",
    duration: "3:04",
  },
  {
    title: "Supercut",
    artist: "Lorde",
    duration: "4:11",
  },
];

export default function Home() {
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
              key={artist.name}
              name={artist.name}
              genre={artist.genre}
              image={artist.image}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader title="Popular Albums" action="See all" />

        <div className="flex gap-5 overflow-x-auto pb-2">
          {albums.map((album) => (
            <AlbumCard
              key={album.title}
              title={album.title}
              artist={album.artist}
              year={album.year}
              image={album.image}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader title="Popular Tracks" action="See all" />

        <div className="divide-y divide-border rounded-xl border border-border">
          {tracks.map((track, index) => (
            <TrackItem
              key={track.title}
              position={index + 1}
              title={track.title}
              artist={track.artist}
              duration={track.duration}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
