import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StarsProps {
  count?: number;
}

export default function Stars({ count = 40 }: StarsProps) {
  const reduce = useReducedMotion();
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      })),
    [count],
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {stars.map((s) => {
        const style = { left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size };
        return reduce ? (
          <span key={s.id} className="absolute rounded-full bg-white opacity-40" style={style} />
        ) : (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-white"
            style={style}
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.9, 0.15] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
