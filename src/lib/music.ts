export interface MusicEngine {
  play: () => Promise<void>;
  pause: () => void;
  dispose: () => void;
}

/** Pemutar file audio (jika `music.src` diisi). */
function fileEngine(src: string): MusicEngine {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.5;
  return {
    play: () => audio.play(),
    pause: () => audio.pause(),
    dispose: () => audio.pause(),
  };
}

/** Pad ambient lembut yang dibuat dengan Web Audio — tanpa file, tanpa hak cipta. */
function ambientEngine(): MusicEngine {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let suspendTimer: number | undefined;

  const build = () => {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const c = new AC();
    const m = c.createGain();
    m.gain.value = 0;
    m.connect(c.destination);

    // Cmaj7: C3 G3 C4 E4 G4 B4
    const freqs = [130.81, 196.0, 261.63, 329.63, 392.0, 493.88];
    freqs.forEach((freq, i) => {
      [-6, 6].forEach((detune) => {
        const osc = c.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.detune.value = detune;

        const voice = c.createGain();
        voice.gain.value = 0.035;

        const lfo = c.createOscillator();
        lfo.frequency.value = 0.07 + i * 0.031;
        const depth = c.createGain();
        depth.gain.value = 0.025;
        lfo.connect(depth);
        depth.connect(voice.gain);

        osc.connect(voice);
        voice.connect(m);
        osc.start();
        lfo.start();
      });
    });

    ctx = c;
    master = m;
  };

  return {
    async play() {
      window.clearTimeout(suspendTimer);
      if (!ctx || !master) build();
      await ctx!.resume();
      const now = ctx!.currentTime;
      master!.gain.cancelScheduledValues(now);
      master!.gain.setTargetAtTime(0.3, now, 0.8);
    },
    pause() {
      if (!ctx || !master) return;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(0, now, 0.4);
      const c = ctx;
      suspendTimer = window.setTimeout(() => {
        void c.suspend();
      }, 1800);
    },
    dispose() {
      window.clearTimeout(suspendTimer);
      if (ctx && ctx.state !== "closed") void ctx.close();
      ctx = null;
      master = null;
    },
  };
}

export function createMusicEngine(src: string): MusicEngine {
  return src ? fileEngine(src) : ambientEngine();
}
