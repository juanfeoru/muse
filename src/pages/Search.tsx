import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

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
        {query ? (
          <p className="text-secondary-text">
            Searching for:{" "}
            <span className="font-medium text-primary-text">{query}</span>
          </p>
        ) : (
          <p className="text-secondary-text">
            Start typing to search for music.
          </p>
        )}
      </div>
    </section>
  );
}
