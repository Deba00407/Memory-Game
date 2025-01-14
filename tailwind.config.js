/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "custom-black": "#181C14"
      },
      fontFamily: {
        "jet": ["JetBrains Mono", "monospace"]
      }
    },
  },
  darkMode: "class",
  plugins: [],
}

