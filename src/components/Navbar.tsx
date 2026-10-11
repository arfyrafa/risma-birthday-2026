import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart } from "lucide-react";
import { content } from "../data/content";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/letter", label: "Love Letter", end: false },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-netflix-black/95 backdrop-blur" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 sm:gap-10 sm:px-10">
        <Link to="/" aria-label={`${content.logoText} — Home`} className="flex items-center gap-2 text-netflix-red">
          <Heart className="h-6 w-6 fill-current" aria-hidden="true" />
          <span className="font-display text-3xl leading-none tracking-[0.12em]">{content.logoText}</span>
        </Link>
        <ul className="flex items-center gap-5 text-sm sm:gap-7">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-white"
                    : "text-neutral-300 transition-colors hover:text-white"
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
