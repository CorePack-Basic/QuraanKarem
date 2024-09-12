/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./surah.html",
    "./detailsSuruh.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "zzz" : "red",
        "darkMode" : "#171717",
      },
      container : {
        center : true
      },
    },
  },
  plugins: [],
}

