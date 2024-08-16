module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-r": "linear-gradient(to right, #f06, #6cf)",
      },
      fontFamily: {
        consolas: "Consolas",
        menlo: "Menlo",
      },
      flex: {
        128: "32rem",
      },
    },
  },
  variants: {},
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        ".text-gradient": {
          "-webkit-background-clip": "text",
          "background-clip": "text",
          color: "transparent",
        },
      })
    },
  ],
}
