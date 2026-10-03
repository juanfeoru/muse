interface TrackItemProps {
  position: number;
  title: string;
  artist: string;
  duration: string;
}

export default function TrackItem({
  position,
  title,
  artist,
  duration,
}: TrackItemProps) {
  return (
    <div className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface-hover">
      <span className="w-5 text-center text-sm text-muted-text">
        {position}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-primary-text">{title}</p>
        <p className="truncate text-sm text-secondary-text">{artist}</p>
      </div>

      <span className="text-sm text-muted-text">{duration}</span>
    </div>
  );
}
