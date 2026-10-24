import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4fa",
          100: "#dbe5f5",
          200: "#bcd0ee",
          300: "#8cb3e2",
          400: "#5591d3",
          500: "#2d70c0",
          600: "#1f56a3",
          700: "#164182",
          800: "#102f61",
          900: "#0b2046",
          950: "#061530", // Official deep logo navy
        },
        green: {
          50: "#f2fbf0",
          100: "#e1f7dc",
          200: "#c4efbc",
          300: "#9ae18e",
          400: "#69ce5b",
          500: "#43b02a", // Official logo fresh green
          600: "#34911f",
          700: "#2a731b",
          800: "#245b19",
          900: "#1f4b17",
          950: "#0d2909",
        },
        // Keep teal mapped for backward compatibility while matching brand
        teal: {
          50: "#f2fbf0",
          100: "#e1f7dc",
          200: "#c4efbc",
          300: "#9ae18e",
          400: "#69ce5b",
          500: "#43b02a",
          600: "#34911f",
          700: "#2a731b",
          800: "#245b19",
          900: "#1f4b17",
        },
        warm: {
          50: "#fcfcfb",
          100: "#f6f6f4",
          200: "#ededeb",
          300: "#dededb",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "float": "float 4s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
