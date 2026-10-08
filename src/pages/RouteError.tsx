import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function RouteError() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <AlertTriangle size={48} className="text-accent" />

      <h1 className="mt-6 text-2xl font-semibold text-primary-text">
        Something went wrong
      </h1>

      <p className="mt-2 max-w-md text-secondary-text">
        An unexpected error occurred while loading this page.
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
