interface SectionHeaderProps {
  title: string;
  action?: string;
}

export default function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-primary-text">{title}</h2>

      {action && (
        <button
          type="button"
          className="text-sm font-medium text-secondary-text transition-colors hover:text-primary-text cursor-pointer"
        >
          {action}
        </button>
      )}
    </div>
  );
}
