/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        netflix: { red: "#E50914", redHover: "#F6121D", black: "#141414" },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "sans-serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        glow: "glow 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
