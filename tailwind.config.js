/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
        popin: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#5F35F5",
        dPrimary: "#11175D",
        vdPrimary: "#03014C",
        iconColor: "#BAD1FF",
      },
      // screens: {
      //   // sm: '375px',
      //   sml: "614px",
      //   md: "767px",
      //   onlysml: { min: "614px", max: "767px" },
      // },
    },
  },
  plugins: [],
};
