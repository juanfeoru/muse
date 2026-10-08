import { ArrowLeft, Music2 } from "lucide-react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <Music2 size={48} className="text-accent" />

      <p className="mt-6 text-6xl font-bold text-primary-text">404</p>

      <h1 className="mt-4 text-2xl font-semibold text-primary-text">
        Page not found
      </h1>

      <p className="mt-2 max-w-md text-secondary-text">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <button
        type="button"
        onClick={() => navigate("/")}
        className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
      >
        <ArrowLeft size={18} />
        Back to home
      </button>
    </section>
  );
}
