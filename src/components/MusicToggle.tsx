import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { content } from "../data/content";
import { createMusicEngine, type MusicEngine } from "../lib/music";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const engine = useRef<MusicEngine | null>(null);

  // Hentikan musik saat meninggalkan halaman surat.
  useEffect(() => {
    return () => {
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);

  const toggle = async () => {
    if (!engine.current) engine.current = createMusicEngine(content.music.src);
    if (playing) {
      engine.current.pause();
      setPlaying(false);
      return;
    }
    try {
      await engine.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const label = playing ? content.music.pauseLabel : content.music.playLabel;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={label}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-3 text-sm text-white backdrop-blur transition-colors hover:border-white/50 hover:bg-black/90"
    >
      {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Music className="h-4 w-4" aria-hidden="true" />}
      <span className="hidden sm:inline">{playing ? "Pause" : "Play music"}</span>
    </button>
  );
}
