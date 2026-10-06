import { LoaderCircle } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-secondary-text">
      <LoaderCircle size={20} className="animate-spin text-accent" />
      <p>{message}</p>
    </div>
  );
}
