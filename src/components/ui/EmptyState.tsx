import { SearchX, type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export default function EmptyState({
  title,
  description,
  icon,
}: EmptyStateProps) {
  const Icon = icon ?? SearchX;
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-10 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon size={22} />
      </div>

      <h3 className="mt-4 font-medium text-primary-text">{title}</h3>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-secondary-text">
          {description}
        </p>
      )}
    </div>
  );
}
