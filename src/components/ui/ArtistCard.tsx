interface ArtistCardProps {
  name: string;
  image: string;
  genre: string;
}

export default function ArtistCard({ name, image, genre }: ArtistCardProps) {
  return (
    <article className="group min-w-32">
      <div className="aspect-square overflow-hidden rounded-full bg-surface-hover">
        <img
          src={image}
          alt={name}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-3">
        <h3 className="truncate font-medium text-primary-text">{name}</h3>
        <p className="mt-0.5 truncate text-sm text-secondary-text">{genre}</p>
      </div>
    </article>
  );
}
