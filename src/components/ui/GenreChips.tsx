interface GenreChipsProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
  bordered?: boolean;
}

export default function GenreChips({
  genres,
  selectedGenre,
  onSelect,
  bordered = false,
}: GenreChipsProps) {
  return (
    <div
      role="group"
      aria-label="Music genres"
      className={`scrollbar-dark flex gap-2 overflow-x-auto ${
        bordered ? "border-b border-border pb-4" : "pb-2"
      }`}
    >
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          onClick={() => onSelect(genre)}
          aria-pressed={selectedGenre === genre}
          className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
            selectedGenre === genre
              ? "bg-accent text-background"
              : "bg-surface text-secondary-text hover:bg-surface-hover hover:text-primary-text"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
