import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgb(255 255 255 / 0.06), 0 18px 48px rgb(0 0 0 / 0.28)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(255, 255, 255, 0.1), transparent 30%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.18), transparent 30%)",
      },
    },
  },
  plugins: [animate],
};

export default config;
