import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalCarouselProps {
  children: React.ReactNode;
  label: string;
  className?: string;
}

export default function HorizontalCarousel({
  children,
  label,
  className = "",
}: HorizontalCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollButtons = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth <
          container.scrollWidth - 1,
      );
    };

    updateScrollButtons();

    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
      resizeObserver.disconnect();
    };
  }, [children]);

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const amount = container.clientWidth * 0.8;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label={`Scroll ${label} left`}
          className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-primary-text transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label={`Scroll ${label} right`}
          className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-primary-text transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        ref={containerRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={`scrollbar-dark flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 focus-visible:outline-2 focus-visible:outline-accent ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
