/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: "#0f2d2a",
          800: "#124037"
        },
        gold: {
          400: "#e6c98d",
          500: "#d7b46a"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 15px 60px rgba(0,0,0,0.08)"
      },
      backgroundImage: {
        "emerald-radial":
          "radial-gradient(circle at 20% 20%, rgba(30, 88, 72, 0.35), transparent 30%), radial-gradient(circle at 80% 0%, rgba(203, 169, 99, 0.35), transparent 25%)"
      }
    }
  },
  plugins: []
};
