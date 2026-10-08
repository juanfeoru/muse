import { useEffect, useState } from "react";
import { Compass, Heart, Home, Menu, Music2, Search, X } from "lucide-react";
import { NavLink } from "react-router";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
      isActive
        ? "bg-accent/10 text-accent before:absolute before:left-0 before:h-5 before:w-0.5 before:rounded-full before:bg-accent"
        : "text-secondary-text hover:bg-surface-hover hover:text-primary-text"
    }`;

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-5 md:hidden">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-background">
            <Music2 size={20} strokeWidth={2.5} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-primary-text">
            Muse
          </span>
        </NavLink>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer rounded-lg p-2 text-secondary-text transition-colors hover:bg-surface-hover hover:text-primary-text"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-sidebar"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-label="Close menu"
        />
      )}

      <aside
        id="mobile-sidebar"
        inert={isMobile && !isOpen ? true : undefined}
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-border bg-surface p-5 transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex justify-between">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-accent text-background">
              <Music2 size={20} strokeWidth={2.5} />
            </div>

            <span className="text-2xl font-bold tracking-tight text-primary-text">
              Muse
            </span>
          </NavLink>

          {isOpen && (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-secondary-text md:hidden"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            <Home size={20} />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/discover"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            <Compass size={20} />
            <span>Discover</span>
          </NavLink>

          <NavLink
            to="/search"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            <Search size={20} />
            <span>Search</span>
          </NavLink>

          <NavLink
            to="/favorites"
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
          >
            <Heart size={20} />
            <span>Favorites</span>
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
