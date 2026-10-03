import { useState } from "react";
import AlbumCard from "../components/ui/AlbumCard";

const genres = [
  "All",
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Electronic",
  "Jazz",
  "Indie",
];

const albums = [
  {
    title: "Eternal Sunshine",
    artist: "Ariana Grande",
    genre: "Pop",
    year: 2024,
    image: "URL_DE_IMAGEN",
  },
  {
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    genre: "Pop",
    year: 2020,
    image: "URL_DE_IMAGEN",
  },
  {
    title: "Blonde",
    artist: "Frank Ocean",
    genre: "R&B",
    year: 2016,
    image: "URL_DE_IMAGEN",
  },
  {
    title: "DAMN.",
    artist: "Kendrick Lamar",
    genre: "Hip-Hop",
    year: 2017,
    image: "URL_DE_IMAGEN",
  },
  {
    title: "Currents",
    artist: "Tame Impala",
    genre: "Indie",
    year: 2015,
    image: "URL_DE_IMAGEN",
  },
  {
    title: "Discovery",
    artist: "Daft Punk",
    genre: "Electronic",
    year: 2001,
    image: "URL_DE_IMAGEN",
  },
];

export default function Discover() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredAlbums =
    selectedGenre === "All"
      ? albums
      : albums.filter((album) => album.genre === selectedGenre);

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

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            onClick={() => setSelectedGenre(genre)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              selectedGenre === genre
                ? "bg-accent text-background"
                : "bg-surface text-secondary-text hover:bg-surface-hover hover:text-primary-text"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-primary-text">
          {selectedGenre === "All"
            ? "Popular right now"
            : `${selectedGenre} music`}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredAlbums.map((album) => (
            <AlbumCard
              key={album.title}
              title={album.title}
              artist={album.artist}
              year={album.year}
              image={album.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
