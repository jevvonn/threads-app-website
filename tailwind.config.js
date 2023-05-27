/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
            lineHeight: "1.3",
          },
        },
      },
      animation: {
        "zoom-in-down": "zoom-in-down .5s",
        "down-up": "down-up .5s",
        "up-up": "up-up .8s",
        "down-down": "down-down .8s",
      },
      keyframes: {
        "zoom-in-down": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.3)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "down-up": {
          "0%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(5px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "up-up": {
          "0%": {
            transform: "translateY(0)",
          },
          "25%": {
            transform: "translateY(-5px)",
          },
          "45%": {
            transform: "translateY(-5px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        "down-down": {
          "0%": {
            transform: "translateY(0)",
          },
          "25%": {
            transform: "translateY(5px)",
          },
          "45%": {
            transform: "translateY(5px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#645CAA",
          secondary: "#CED7F6",
          accent: "#1FB2A5",
          neutral: "#191D24",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
