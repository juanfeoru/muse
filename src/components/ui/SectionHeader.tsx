import { Link } from "react-router";

interface SectionHeaderProps {
  title: string;
  action?: string;
  to?: string;
}

export default function SectionHeader({
  title,
  action,
  to,
}: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-primary-text">{title}</h2>

      {action && to && (
        <Link
          to={to}
          className="text-sm font-medium text-secondary-text transition-colors hover:text-primary-text"
        >
          {action}
        </Link>
      )}
    </div>
  );
}
