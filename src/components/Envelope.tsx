import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
  label: string;
}

const flapClip = "polygon(0 0, 100% 0, 50% 100%)";

export default function Envelope({ isOpen, onOpen, label }: EnvelopeProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={isOpen}
      aria-label={label}
      animate={isOpen ? { y: 0 } : { y: [0, -7, 0] }}
      transition={isOpen ? { duration: 0.3 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={isOpen ? undefined : { scale: 1.03 }}
      whileTap={isOpen ? undefined : { scale: 0.98 }}
      className="relative block aspect-[3/2] w-[min(86vw,400px)] rounded-md [perspective:1100px] disabled:cursor-default"
    >
      {/* back of envelope */}
      <div className="absolute inset-0 rounded-md bg-[#6d0a11] shadow-[0_30px_90px_-20px_rgba(229,9,20,0.6)]" />

      {/* paper sliding out */}
      <motion.div
        className="absolute left-[7%] right-[7%] top-[8%] z-[1] h-[78%] rounded-sm bg-[#f3ead9] px-5 pt-5"
        animate={{ y: isOpen ? "-62%" : "0%" }}
        transition={{ delay: isOpen ? 0.45 : 0, duration: 0.9, ease: "easeOut" }}
      >
        <div className="mb-2 h-1 w-2/5 rounded bg-black/15" />
        <div className="mb-2 h-1 w-3/5 rounded bg-black/10" />
        <div className="h-1 w-1/2 rounded bg-black/10" />
      </motion.div>

      {/* front pocket */}
      <div className="absolute inset-0 z-[2]">
        <div className="absolute inset-0 bg-[#8d0f18]" style={{ clipPath: "polygon(0 0, 52% 56%, 0 100%)" }} />
        <div className="absolute inset-0 bg-[#8d0f18]" style={{ clipPath: "polygon(100% 0, 48% 56%, 100% 100%)" }} />
        <div
          className="absolute inset-0 rounded-b-md bg-[#a5131d]"
          style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
        />
      </div>

      {/* flap */}
      <motion.div
        className="absolute left-0 top-0 h-[58%] w-full origin-top bg-[#b3141f]"
        style={{ clipPath: flapClip, transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 3 }}
        transition={{
          rotateX: { duration: 0.7, ease: "easeInOut" },
          zIndex: { duration: 0, delay: isOpen ? 0.3 : 0 },
        }}
      />

      {/* wax seal */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[58%] z-[4] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.span
          className="flex h-12 w-12 items-center justify-center rounded-full bg-netflix-red shadow-lg"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <Heart className="h-5 w-5 fill-white text-white" />
        </motion.span>
      </span>
    </motion.button>
  );
}
