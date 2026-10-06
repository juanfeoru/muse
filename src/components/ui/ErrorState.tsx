import { CircleAlert } from "lucide-react";

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = "Something went wrong. Please try again.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <CircleAlert size={24} className="text-danger" />

      <p className="mt-3 text-secondary-text">{message}</p>
    </div>
  );
}
