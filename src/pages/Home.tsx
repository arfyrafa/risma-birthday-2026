import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  LayoutGrid,
  Mail,
  Maximize2,
  Rows3,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { content } from "../data/content";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function Home() {
  const { hero, gallery, footer } = content;
  const [viewMode, setViewMode] = useState<"grid" | "row">("grid");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollRow = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev === 0 ? gallery.photos.length - 1 : prev - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev === gallery.photos.length - 1 ? 0 : prev + 1) : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, gallery.photos.length]);

  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        {/* background photo */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        >
          <img
            src={hero.image}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: hero.imagePosition }}
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0 bg-black/10" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-netflix-black via-netflix-black/70 to-transparent"
        />

        <motion.div
          className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-10 sm:pb-28"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={item} className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
            <span aria-hidden="true" className="h-5 w-1 rounded-full bg-netflix-red" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-3xl font-display text-6xl leading-[0.95] tracking-wide text-white drop-shadow-lg sm:text-8xl lg:text-9xl"
          >
            {hero.title}
          </motion.h1>

          <motion.div variants={item} className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-200">
            <span className="font-bold text-[#46d369]">{hero.meta.match}</span>
            <span>{hero.meta.year}</span>
            <span className="rounded-sm border border-white/60 px-1.5 py-0.5 text-xs font-medium">
              {hero.meta.badge}
            </span>
            {hero.meta.genres.map((g) => (
              <span key={g}>{g}</span>
            ))}
          </motion.div>

          <motion.p variants={item} className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-100 sm:text-xl">
            {hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <Link
              to="/letter"
              className="inline-flex items-center gap-2 rounded bg-netflix-red px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-netflix-redHover"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              {hero.cta}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {gallery.photos.length > 0 && (
        <section aria-labelledby="moments-title" className="relative z-10 -mt-10 pb-20 sm:-mt-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-10">
            {/* Header & View Switcher */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 id="moments-title" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {gallery.title}
                </h2>
                <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                  {gallery.photos.length} momen berharga yang tersimpan rapi
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-neutral-900/80 p-1 backdrop-blur">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    viewMode === "grid"
                      ? "bg-netflix-red text-white shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  aria-label="Tampilan Grid"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("row")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    viewMode === "row"
                      ? "bg-netflix-red text-white shadow-sm"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  aria-label="Tampilan Carousel"
                >
                  <Rows3 className="h-3.5 w-3.5" />
                  <span>Carousel</span>
                </button>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {gallery.photos.map((p, i) => (
                  <div
                    key={`${p.src}-${i}`}
                    onClick={() => setSelectedPhotoIndex(i)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-netflix-red/60 hover:shadow-netflix-red/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPhotoIndex(i);
                      }
                    }}
                  >
                    <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                      <img
                        src={p.src}
                        alt={p.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Gradient Overlay & Details */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-block rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-netflix-red backdrop-blur-sm">
                          Moment {String(i + 1).padStart(2, "0")}
                        </span>
                        <Maximize2 className="h-3.5 w-3.5 text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs font-medium text-white sm:text-sm drop-shadow">
                        {p.alt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Carousel / Row View */
              <div className="relative group/carousel">
                <button
                  type="button"
                  onClick={() => scrollRow("left")}
                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/70 p-2.5 text-white shadow-xl backdrop-blur transition-all hover:bg-netflix-red hover:scale-110 focus-visible:outline-none"
                  aria-label="Geser ke kiri"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div
                  ref={rowRef}
                  className="no-scrollbar flex snap-x gap-4 overflow-x-auto py-2 scroll-smooth"
                >
                  {gallery.photos.map((p, i) => (
                    <div
                      key={`${p.src}-${i}`}
                      onClick={() => setSelectedPhotoIndex(i)}
                      className="group relative w-56 sm:w-64 shrink-0 snap-start cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-neutral-900/60 shadow-lg transition-all duration-300 hover:border-netflix-red/60 hover:shadow-netflix-red/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-netflix-red"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedPhotoIndex(i);
                        }
                      }}
                    >
                      <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                        <img
                          src={p.src}
                          alt={p.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      </div>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-block rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-netflix-red backdrop-blur-sm">
                            Moment {String(i + 1).padStart(2, "0")}
                          </span>
                          <Maximize2 className="h-3.5 w-3.5 text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs font-medium text-white sm:text-sm drop-shadow">
                          {p.alt}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollRow("right")}
                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/70 p-2.5 text-white shadow-xl backdrop-blur transition-all hover:bg-netflix-red hover:scale-110 focus-visible:outline-none"
                  aria-label="Geser ke kanan"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] max-w-4xl flex-col items-center overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 p-3 sm:p-5 shadow-2xl"
            >
              {/* Lightbox Header */}
              <div className="mb-3 flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-netflix-red/20 px-2.5 py-0.5 text-xs font-semibold text-netflix-red">
                    Moment {String(selectedPhotoIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-neutral-400">
                    ({selectedPhotoIndex + 1} dari {gallery.photos.length})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="rounded-full bg-white/10 p-1.5 text-white transition hover:bg-white/20 focus-visible:outline-none"
                  aria-label="Tutup"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Lightbox Image Container */}
              <div className="relative flex max-h-[72vh] w-full items-center justify-center overflow-hidden rounded-lg bg-black">
                <img
                  src={gallery.photos[selectedPhotoIndex].src}
                  alt={gallery.photos[selectedPhotoIndex].alt}
                  className="max-h-[72vh] w-auto max-w-full rounded object-contain"
                />

                {/* Lightbox Prev / Next Buttons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhotoIndex((prev) =>
                      prev !== null
                        ? prev === 0
                          ? gallery.photos.length - 1
                          : prev - 1
                        : null
                    );
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2.5 text-white backdrop-blur transition hover:bg-netflix-red hover:scale-110"
                  aria-label="Foto sebelumnya"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhotoIndex((prev) =>
                      prev !== null
                        ? prev === gallery.photos.length - 1
                          ? 0
                          : prev + 1
                        : null
                    );
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2.5 text-white backdrop-blur transition hover:bg-netflix-red hover:scale-110"
                  aria-label="Foto berikutnya"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Caption */}
              <p className="mt-3 text-center text-sm font-medium text-neutral-200">
                {gallery.photos[selectedPhotoIndex].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-neutral-400">
        <p className="inline-flex items-center gap-2">
          <Heart className="h-4 w-4 fill-netflix-red text-netflix-red" aria-hidden="true" />
          {footer}
        </p>
      </footer>
    </>
  );
}
