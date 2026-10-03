interface AlbumCardProps {
  title: string;
  artist: string;
  image: string;
  year: number;
}

export default function AlbumCard({
  title,
  artist,
  image,
  year,
}: AlbumCardProps) {
  return (
    <article className="group min-w-40">
      <div className="aspect-square overflow-hidden rounded-xl bg-surface-hover">
        <img
          src={image}
          alt={`${title} by ${artist}`}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3">
        <h3 className="truncate font-medium text-primary-text">{title}</h3>

        <p className="mt-0.5 truncate text-sm text-secondary-text">
          {artist} · {year}
        </p>
      </div>
    </article>
  );
}
