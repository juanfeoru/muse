import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import ArtistCard from "../components/ui/ArtistCard";
import AlbumCard from "../components/ui/AlbumCard";
import TrackItem from "../components/ui/TrackItem";
import EmptyState from "../components/ui/EmptyState";

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
];

export default function Search() {
  const [query, setQuery] = useState("");

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

              {filteredArtists.length > 0 ? (
                <div className="mt-5 flex gap-6 overflow-x-auto pb-2">
                  {filteredArtists.map((artist) => (
                    <ArtistCard
                      key={artist.name}
                      name={artist.name}
                      genre={artist.genre}
                      image={artist.image}
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

              {filteredAlbums.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

              {filteredTracks.length > 0 ? (
                <div className="mt-5 divide-y divide-border rounded-xl border border-border">
                  {filteredTracks.map((track, index) => (
                    <TrackItem
                      key={track.title}
                      position={index + 1}
                      title={track.title}
                      artist={track.artist}
                      duration={track.duration}
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
