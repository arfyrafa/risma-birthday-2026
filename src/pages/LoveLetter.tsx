import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Envelope from "../components/Envelope";
import MusicToggle from "../components/MusicToggle";
import Stars from "../components/Stars";
import { content } from "../data/content";

const letterBody: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.6, staggerChildren: 1.1 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: "easeOut" } },
};

export default function LoveLetter() {
  const { letter, birthday } = content;
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const article = useRef<HTMLElement | null>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (showLetter) article.current?.focus({ preventScroll: true });
  }, [showLetter]);

  const openEnvelope = () => {
    if (opened) return;
    setOpened(true);
    timer.current = window.setTimeout(() => setShowLetter(true), reduce ? 0 : 1700);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* soft red light */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 animate-glow bg-[radial-gradient(ellipse_at_50%_38%,rgba(229,9,20,0.26),transparent_62%)] motion-reduce:animate-none"
      />
      <Stars />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center px-5 pb-16 pt-28">
        <h1 className="text-center font-display text-5xl tracking-wide sm:text-7xl">{letter.title}</h1>

        <div className="flex w-full flex-1 flex-col items-center justify-center py-10">
          <AnimatePresence mode="wait">
            {!showLetter ? (
              <motion.div
                key="envelope"
                className="flex flex-col items-center pt-32"
                exit={{ opacity: 0, y: 24, scale: 0.96 }}
                transition={{ duration: 0.5 }}
              >
                <Envelope isOpen={opened} onOpen={openEnvelope} label={letter.hint} />
                <p className="mt-10 text-center text-sm text-neutral-300" aria-live="polite">
                  {opened ? "" : letter.hint}
                </p>
              </motion.div>
            ) : (
              <motion.article
                key="letter"
                ref={article}
                tabIndex={-1}
                aria-label={letter.title}
                className="w-full rounded-lg border border-white/10 bg-neutral-950/85 px-6 py-10 shadow-[0_0_80px_-20px_rgba(229,9,20,0.5)] outline-none backdrop-blur sm:px-12 sm:py-14"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="font-serif text-lg leading-[1.85] text-[#f3ead9]"
                  variants={letterBody}
                  initial={reduce ? "show" : "hidden"}
                  animate="show"
                >
                  <motion.p variants={line} className="mb-6 text-sm text-neutral-400">
                    {birthday.date}
                  </motion.p>
                  <motion.p variants={line} className="mb-6 text-2xl italic">
                    {letter.greeting}
                  </motion.p>
                  {letter.paragraphs.map((text, i) => (
                    <motion.p key={i} variants={line} className="mb-5">
                      {text}
                    </motion.p>
                  ))}
                  <motion.p variants={line} className="mb-8 mt-8 text-xl italic">
                    {letter.closing}
                  </motion.p>
                  <motion.div variants={line}>
                    <p className="text-base text-neutral-300">{letter.signoff}</p>
                    <p className="mt-1 text-2xl italic text-white">{letter.signature}</p>
                  </motion.div>
                </motion.div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/15"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          {letter.back}
        </Link>
      </div>

      <MusicToggle />
    </div>
  );
}
