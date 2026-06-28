import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"]
      },
      colors: {
        primary: "#042D6D",
        accent: "#FCB005",
        light: "#ffffff"
      },
      boxShadow: {
        premium: "0 20px 60px rgba(4, 45, 109, 0.15)"
      }
    }
  },
  plugins: []
};

export default config;
